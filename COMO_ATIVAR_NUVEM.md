# Bipador Universal V46 — Ativação do catálogo compartilhado

Esta V46 **está pronta no código**, mas a sincronização depende de um projeto Firebase SEU.
Enquanto `firebase-config.js` estiver com `null`, o aplicativo continua funcionando em modo local, sem compartilhar o catálogo.

## 1. Criar Firebase

1. Abra https://console.firebase.google.com/ e crie um projeto (ex.: `bipador-multiplo-mix`).
2. Dentro do projeto, adicione um **aplicativo Web** (`</>`). Pode usar o nome `Bipador Universal`.
3. Copie o objeto `firebaseConfig` da configuração Web.
4. Abra `firebase-config.js` e substitua `null` por esse objeto JavaScript. Exemplo:

```js
window.BIPADOR_FIREBASE_CONFIG = {
  apiKey: 'CHAVE_DO_SEU_PROJETO',
  authDomain: 'SEU-PROJETO.firebaseapp.com',
  projectId: 'SEU-PROJETO',
  appId: 'ID_DO_APP_WEB'
};
```

`firebaseConfig` identifica o projeto e **não é senha**; NUNCA coloque senhas ou chaves de conta de serviço no GitHub.

## 2. Criar banco e acesso

5. No Firebase > **Firestore Database**, crie o banco na edição Standard. Escolha uma região e NÃO deixe regras públicas de teste.
6. No Firebase > **Authentication > Sign-in method**, ative **E-mail/Senha**.
7. Em Authentication > **Users**, clique em **Add user** e crie um e-mail e senha para a equipe. A senha deve ficar só com os funcionários, não no GitHub.
8. Em Firestore Database > **Rules**, copie o conteúdo do arquivo `firestore.rules`, substituindo `EMAIL_DA_EQUIPE@EXEMPLO.COM` pelo e-mail do usuário criado. Clique em **Publish**.
9. Em Authentication > **Settings > Authorized domains**, verifique/adicione `multiplomix.github.io` caso necessário para autenticação na origem GitHub Pages.

**Importante:** por enquanto, todos que conhecem esse login têm permissão de editar o catálogo. Isso é uma proteção básica, não equivale a uma gestão de usuários por funcionário. Para retirar um acesso, troque a senha.

## 3. Publicar e carregar os dados anteriores

10. Envie os arquivos da V46 diretamente para uma pasta de teste no repositório GitHub, por exemplo `Bipador_Universal_V46_TESTE`. Mantenha a V45 em funcionamento.
11. Abra a V46 via GitHub Pages (HTTPS). Entre em **Gerenciar EANs e SKUs** e faça login com o e-mail e senha criados.
12. O aplicativo carrega as associações da nuvem automaticamente. Antes da primeira sincronização, salva uma cópia dos EANs locais anteriores.
13. **No aparelho que já tem o catálogo completo**, pressione **Enviar meus EANs** para importá-los uma única vez. Ele acrescenta os cadastros ausentes sem apagar os existentes na nuvem.
14. Nos demais aparelhos, abra a V46 e entre com o mesmo login. Não será necessário importar as planilhas novamente.

## Funcionamento e limites

- Cadastros de EAN/SKU atualizam automaticamente entre aparelhos conectados pelo Firestore.
- O navegador guarda uma cópia do catálogo para continuar **conferindo** produtos se a internet cair.
- Alterações de cadastro precisam de conexão e confirmação de salvamento; não são aceitas offline para evitar conflitos.
- Históricos, pedidos, sessões e listas continuam locais em cada aparelho (não sincronizados).
- Fazer **Backup completo JSON** periodicamente continua recomendado.
- O cadastro é sincronizado **por associação individual**, para evitar que a alteração de um SKU substitua o catálogo inteiro.
- As contas e operações estão sujeitas às cotas e possíveis cobranças do Firebase. Consulte o painel Usage.
- O Firestore recebe apenas os dados do catálogo; não envie nomes de clientes, endereços ou pedidos ao banco de produtos.

## Se algo não funcionar

- `Modo local`: `firebase-config.js` ainda está `null` ou não carregou; confira seu commit e recarregue.
- `Acesso não autorizado`: confira Authentication (e-mail/senha).
- `Missing or insufficient permissions`: publique as regras e confira o e-mail na cláusula `equipe()`.
- `Sem conexão`: o iPhone usa sua última cópia local para conferir produtos, mas novas edições aguardam internet.

### Cuidados de sincronização

- Restaurar um backup JSON enquanto estiver conectado à nuvem **acrescenta** associações ausentes; não exclui outros cadastros.
- Se duas pessoas editarem o **mesmo registro** simultaneamente, a última gravação poderá prevalecer. Evite edições simultâneas do mesmo SKU.
- A V46 usa chaves locais de teste separadas para NÃO sobrescrever sessão, histórico e catálogo da V45.
- O catálogo de trabalho é carregado para o navegador antes de começar a bipagem. Assim a conferência não depende de uma consulta remota a cada produto.
