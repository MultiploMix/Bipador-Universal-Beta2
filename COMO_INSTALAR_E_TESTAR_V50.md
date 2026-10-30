# Bipador Universal V50 — Alicates 1417: WL/WJ e etiquetas TikTok

Esta versão CORRIGE a compatibilidade de identificadores, sem modificar seus cadastros de EAN no Firebase.

## Instalação segura
1. Mantenha a versão principal usada pela equipe inalterada.
2. Abra o repositório `MultiploMix/Bipador-Universal-Beta2` no GitHub.
3. Crie a pasta `V50_ALICATES_TESTE` e envie os OITO arquivos do aplicativo (não a pasta inteira):
   `index.html`, `firebase-config.js`, `catalog-cloud.js`, `leitor-wasm.js`, `sw.js`, `icon.svg`, `logo-multiplo-mix.png`, `manifest.webmanifest`.
4. Abra `https://multiplomix.github.io/Bipador-Universal-Beta2/V50_ALICATES_TESTE/` após o GitHub Pages publicar.
5. Conecte o catálogo BipaMix e faça os testes com os três alicates.

## Equivalências EXATAS da linha 1417
- Universal: `WL-1417`, `WJ-1417`, `WL-1417-1UN--ALICATE-UNIVERSAL`.
- Bico: `WL-1417-A`, `WJ-1417-A`, `WL1417A-1UN--ALICATE-DE-BICO`.
- Corte: `WL 1417B`, `WJ-1417-B`, `WL 1417B-1UN--ALICATE-DE-CORTE`.
- `1417`, `1417-A`, `1417-B` continuam produtos DIFERENTES.
- Uma etiqueta que diga `1417-B ... ALICATE UNIVERSAL` não pode ser considerada correta.

## Testes reais com EANs da loja (conferir antes os produtos físicos)
- EAN `3296371814170` foi cadastrado como `WL-1417` (Universal) no print de 30/10.
- EAN `7890322814170` foi cadastrado como `WJ-1417-A` (Bico).
- EAN `6950322814172` foi cadastrado como `WJ-1417-B` (Corte).
- Pedido Universal + Corte: os EANs Universal e Corte podem ser aprovados separadamente.
- EAN de Bico em pedido somente com Universal + Corte deve ser RECUSADO. Isso NÃO é bug.

## EAN compartilhado
- Se um EAN estiver cadastrado para dois produtos distintos, o Bipador exige a seleção visual do modelo correto.
- EAN individual correto não deve solicitar escolher modelos que não correspondem ao seu cadastro.
- O EAN nunca é validado apenas pelo número nele: precisa existir no catálogo sincronizado.
- Atenção: um item cujo cadastro aparece como `Cor aleatória autorizada` deve ter essa opção desmarcada se o modelo não for realmente comercializado de cor aleatória.

Sem alterações na câmera, autenticação, Firebase ou dados históricos. Teste em outro caminho antes de substituir produção.
