/* Bipador Universal V58 - leitura adaptativa mantendo ZXing WASM e fallback V33.
   Usa o ponyfill BarcodeDetector (Sec-ant) carregado pela pagina.
   Interface compativel com os metodos usados pela V33.
   O modulo e descartado automaticamente se falhar; leitor V33 permanece como reserva.
*/
(function(global){
 'use strict';
 class LeitorWasmBipador {
  constructor(targetId,options={}) {
   this.isWasm=true;
   this.targetId=targetId;
   this.mode=options.mode||'product';
   this.stopped=false;
   this.paused=false;
   this.timer=null;
   this.stream=null;
   this.video=null;
   this.detector=null;
   this.canvas=document.createElement('canvas');
   this.ctx=this.canvas.getContext('2d',{willReadFrequently:true});
   // Segundo canvas mantém o detalhe para QR denso sem realocar a cada tentativa.
   this.detailCanvas=document.createElement('canvas');
   this.detailCtx=this.detailCanvas.getContext('2d',{willReadFrequently:true});
   this.frameCount=0;
   this.lastFrameAt=0;
   this.failures=0;
   this.firstResult=false;
   this.onRuntimeError=null;
   this.stats={motor:'ZXing WebAssembly',tentativas:0,tempoCameraMs:0,tempoLeituraMs:0};
  }
  _formats(){
   return this.mode==='order'||this.mode==='list' ? ['qr_code']:
    this.mode==='ean-catalog'?['ean_13','ean_8','upc_a','code_128']:
    ['qr_code','ean_13','ean_8','upc_a','code_128'];
  }
  async start(camera,constraints,onSuccess,onError){
   if(!navigator.mediaDevices?.getUserMedia)throw Error('Camera nao disponivel no navegador');
   if(!global.BarcodeDetectionAPI?.BarcodeDetector)throw Error('Motor WebAssembly nao foi carregado');
   if(!this.ctx)throw Error('Canvas indisponivel');
   this.stopped=false;
   this.paused=false;
   this.onSuccess=onSuccess;
   this.onError=onError;
   this.detector=new global.BarcodeDetectionAPI.BarcodeDetector({formats:this._formats()});
   const begin=performance.now();
   try{
    this.stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'}}});
    if(this.stopped){this.stream.getTracks().forEach(t=>t.stop());throw Error('Leitura interrompida');}
    const target=document.getElementById(this.targetId);
    if(!target)throw Error('Area de camera nao encontrada');
    const v=document.createElement('video');
    v.id='bipadorWasmVideo';
    v.autoplay=true;v.muted=true;v.playsInline=true;
    v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');
    v.setAttribute('aria-label','Camera para leitura de codigos');
    v.style.cssText='display:block;width:100%;height:100%;object-fit:cover;background:#050608';
    v.srcObject=this.stream;
    target.replaceChildren(v);
    this.video=v;
    await v.play();
    if(this.stopped)throw Error('Leitura interrompida');
    this.stats.tempoCameraMs=Math.round(performance.now()-begin);
    this.captureStartedAt=performance.now();
    global.__bipadorV34Leitor={...this.stats};
    this._next(40);
   }catch(e){
    await this.stop();
    throw e;
   }
  }
  _next(delay=95){
   clearTimeout(this.timer);
   if(this.stopped||this.paused)return;
   this.timer=setTimeout(()=>void this._tick(),delay);
  }
  _drawFrame(){
   const v=this.video;
   if(!v||v.readyState<2||!v.videoWidth||!v.videoHeight)return null;
   const vw=v.videoWidth,vh=v.videoHeight;
   let x=0,y=0,w=vw,h=vh;
   if(this.mode==='order'||this.mode==='list'){
    // QR Master conserva a qualidade anterior; nunca reduzir detalhes.
    const side=Math.min(vw*.98,vh*.98);
    x=(vw-side)/2;y=(vh-side)/2;w=h=side;
   }else{
    w=vw*.98;h=vh*.84;x=(vw-w)/2;y=(vh-h)/2;
   }
   this.frameCount++;
   const age=performance.now()-(this.captureStartedAt||performance.now());
   // EAN/QR de produto: tentativas leves alternadas com detalhe; após 1,5s
   // aumenta a proporção de quadros detalhados para códigos pequenos.
   const detail=this.mode==='list'||this.mode==='order'||
    (age>1500?this.frameCount%2===0:this.frameCount%4===0);
   const longest=this.mode==='list'?1500:this.mode==='order'?1250:detail?1150:880;
   const canvas=detail?this.detailCanvas:this.canvas;
   const ctx=detail?this.detailCtx:this.ctx;
   const scale=Math.min(1,longest/Math.max(w,h));
   const cw=Math.max(160,Math.round(w*scale));
   const ch=Math.max(160,Math.round(h*scale));
   if(canvas.width!==cw)canvas.width=cw;
   if(canvas.height!==ch)canvas.height=ch;
   ctx.drawImage(v,x,y,w,h,0,0,cw,ch);
   this.stats.resolucao=(detail?'detalhe':'rapida')+' '+cw+'x'+ch;
   return canvas;
  }
  async _tick(){
   if(this.stopped||this.paused)return;
   // iOS pode manter a aba sem primeiro plano: evita gastar bateria.
   if(document.hidden){this._next(180);return;}
   const frame=this._drawFrame();
   if(!frame){this._next(70);return;}
   const started=performance.now();
   try{
    const found=await this.detector.detect(frame);
    if(this.stopped||this.paused)return;
    this.failures=0;
    this.stats.tentativas++;
    this.stats.tempoLeituraMs=Math.round(performance.now()-started);
    global.__bipadorV34Leitor={...this.stats};
    const code=(found||[]).find(item=>typeof item.rawValue==='string'&&item.rawValue.trim());
    if(code){
     this.paused=true; // Impede leitura duplicada antes de fechar ou pausar a camera.
     this.firstResult=true;
     this.stats.tempoAteLeituraMs=Math.round(performance.now()-this.captureStartedAt);
     global.__bipadorV34Leitor={...this.stats};
     Promise.resolve().then(()=>this.onSuccess(code.rawValue));
     return;
    }
   }catch(e){
    if(this.stopped||this.paused)return;
    this.failures++;
    if(this.failures>=2){
     this.paused=true;
     if(typeof this.onRuntimeError==='function')this.onRuntimeError(e);
     return;
    }
   }
   const elapsed=performance.now()-started;
   // Não aguarda 110ms extras após decodificação; mantém um único decode ativo.
   this._next(Math.max(15,95-elapsed));
  }
  pause(){
   if(this.stopped)throw Error('Camera encerrada');
   this.paused=true;
   clearTimeout(this.timer);
   this.video?.pause();
  }
  resume(){
   if(this.stopped)throw Error('Camera encerrada');
   this.paused=false;
   if(this.video){
    this.video.play().then(()=>this._next(35)).catch(e=>{
     if(typeof this.onRuntimeError==='function')this.onRuntimeError(e);
    });
   }
  }
  getRunningTrackCapabilities(){return this.stream?.getVideoTracks()[0]?.getCapabilities?.()||{}}
  getRunningTrackSettings(){return this.stream?.getVideoTracks()[0]?.getSettings?.()||{}}
  async applyVideoConstraints(c){const t=this.stream?.getVideoTracks()[0];if(!t)throw Error('Camera indisponivel');return t.applyConstraints(c)}
  async stop(){
   this.stopped=true;
   this.paused=true;
   clearTimeout(this.timer);
   if(this.video){this.video.pause();this.video.srcObject=null;}
   if(this.stream){this.stream.getTracks().forEach(t=>{try{t.stop()}catch(e){}});this.stream=null;}
  }
  clear(){
   const host=document.getElementById(this.targetId);
   if(host)host.replaceChildren();
   this.video=null;
  }
 }
 global.LeitorWasmBipador=LeitorWasmBipador;
})(window);
