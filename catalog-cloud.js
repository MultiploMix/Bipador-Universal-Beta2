/* V46 - Firebase Firestore: um documento por associação, sincronização em tempo real.
   Este módulo só é ativado depois que firebase-config.js contém um projeto válido.
   O app não armazena senhas no código e não permite gravar em Firestore sem autenticação. */
const cfg=window.BIPADOR_FIREBASE_CONFIG;
const emit=(type,data={})=>window.BipadorCloudUI?.({type,...data});
if(!cfg?.apiKey||!cfg?.projectId||!cfg?.authDomain){
  emit('configured',{configured:false});
}else{
  emit('configured',{configured:true});
  try{
    // CDN oficial; mantém a implantação simples para GitHub Pages, sem Node/build.
    const [{initializeApp},{getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut},firestore]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js')
    ]);
    const {getFirestore,collection,doc,onSnapshot,writeBatch,serverTimestamp}=firestore;
    const app=initializeApp(cfg);
    const auth=getAuth(app),db=getFirestore(app),coll=collection(db,'catalogo_eans');
    let user=null,unsubscribe=null,snapshot=null,connected=false,writing=false;
    function normalizeRow(row){return {ean:row.ean,sku:row.sku,produto:row.produto||'',cor:row.cor||'',tamanho:row.tamanho||'',variacoes:row.variacoes||'',aleatoria:!!row.aleatoria}}
    function snapshotData(snap){return snap.docs.map(d=>({...d.data(),__cloudId:d.id}))}
    function notifySnapshot(){if(snapshot&&!writing)emit('snapshot',{rows:snapshotData(snapshot),fromCache:snapshot.metadata.fromCache});}
    function watch(){
      unsubscribe?.();connected=false;
      emit('connecting');
      unsubscribe=onSnapshot(coll,{includeMetadataChanges:true},snap=>{
        snapshot=snap;connected=!snap.metadata.fromCache;
        if(!writing){notifySnapshot();if(connected)emit('online')}
      },err=>{connected=false;emit('error',{message:err.message||String(err)})});
    }
    onAuthStateChanged(auth,account=>{
      user=account;
      if(account)watch();else{unsubscribe?.();unsubscribe=null;connected=false;snapshot=null;emit('signedout')}
    },err=>emit('error',{message:err.message||String(err)}));
    window.BipadorCloud={
      currentUser:()=>user,
      canEdit:()=>!!user&&connected&&!writing,
      signIn:(email,password)=>signInWithEmailAndPassword(auth,email,password),
      signOut:()=>signOut(auth),
      pullSnapshot:()=>notifySnapshot(),
      async writeCatalog(before,after){
        if(!user||!connected||writing)throw Error('Sem acesso ou sincronização em andamento.');
        writing=true;
        try{
          const oldMap=new Map(before.filter(x=>x.__cloudId).map(x=>[x.__cloudId,x]));
          const newMap=new Map();const writes=[];
          for(const r of after){
            if(!r.__cloudId){r.__cloudId=doc(coll).id;}
            newMap.set(r.__cloudId,r);
            const previous=oldMap.get(r.__cloudId);
            if(!previous||JSON.stringify(normalizeRow(previous))!==JSON.stringify(normalizeRow(r)))writes.push({action:'set',id:r.__cloudId,row:r});
          }
          for(const [id] of oldMap)if(!newMap.has(id))writes.push({action:'delete',id});
          // Limite conservador para evitar lotes extensos ou indisponibilidade.
          for(let at=0;at<writes.length;at+=300){
            const batch=writeBatch(db);
            for(const w of writes.slice(at,at+300)){
              const ref=doc(coll,w.id);
              if(w.action==='delete')batch.delete(ref);
              else batch.set(ref,{...normalizeRow(w.row),updatedAt:serverTimestamp(),updatedBy:user.uid});
            }
            await batch.commit();
          }
        }finally{writing=false;notifySnapshot();if(connected)emit('online');}
      }
    };
    emit('signedout');
  }catch(err){
    emit('error',{message:'Não foi possível carregar Firebase: '+(err.message||String(err))});
  }
}
