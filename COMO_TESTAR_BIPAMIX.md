# Bipador Universal V46 — BipaMix conectado

O arquivo `firebase-config.js` ja esta configurado com os dados publicos do projeto Firebase BipaMix, fornecidos anteriormente nas capturas de tela do console.

## Publicar no GitHub Pages

1. Faca backup do catalogo atual na versao anterior.
2. Crie uma pasta de testes `Bipador_Universal_V46_BipaMix_TESTE` no repositorio `Qrcode-Shopee`.
3. Envie os OITO arquivos da aplicacao desta pasta, diretamente na pasta de testes:
   - index.html
   - leitor-wasm.js
   - sw.js
   - logo-multiplo-mix.png
   - icon.svg
   - manifest.webmanifest
   - firebase-config.js
   - catalog-cloud.js
4. Nao e necessario enviar `firestore.rules` ou os arquivos `.md` ao GitHub Pages.
5. Abra: https://multiplomix.github.io/Qrcode-Shopee/Bipador_Universal_V46_BipaMix_TESTE/
6. Abra Gerenciar EANs e SKUs > Catalogo compartilhado > Conectar catalogo.
7. Entre com um usuario de equipe cadastrado no Authentication do Firebase. **Nao compartilhe senhas em chats nem no repositorio.**
8. Aguarde a confirmacao de que o catalogo esta online.
9. No celular que ja contem os EANs antigos, toque UMA VEZ em `Enviar meus EANs` para migrar o catalogo.
10. No segundo aparelho, abra a mesma versao e faca login; confirme que os produtos foram recebidos.

## Firestore

O console do projeto BipaMix ja mostra regras publicadas em `catalogo_eans` com acesso aos dois UIDs autorizados. Nao substitua essas regras pelo arquivo de exemplo `firestore.rules` deste pacote, que ainda usa placeholder de e-mail.

## Validacao e seguranca

- Os EANs/SKUs ficam compartilhados; os pedidos, nomes de clientes e historicos nao vao para o Firestore.
- As regras do banco controlam acesso por UID; o arquivo `firebase-config.js` nao e segredo.
- Nao atualize a versao de producao antes de testar o compartilhamento no PC e no celular.
- Se a sincronizacao falhar, verifique mensagem na tela, regras publicadas e conexao de internet.
- Se um EAN nao aparecer, nao limpe os dados do navegador: verifique o login e use o botao de importacao na origem.
