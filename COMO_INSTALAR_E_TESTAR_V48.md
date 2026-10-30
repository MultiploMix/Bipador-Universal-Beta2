# Bipador Universal V48 — EAN compartilhado entre modelos diferentes

**Versão de TESTE.** Não sobrescrever a versão usada pela equipe antes da validação no iPhone.

## Publicar no GitHub Pages

1. Entre em `MultiploMix/Bipador-Universal-Beta2` no GitHub.
2. Crie uma pasta `V48_EAN_TESTE` na branch `main`.
3. Extraia o ZIP e envie **os oito arquivos do aplicativo** para dentro dessa pasta (sem outra subpasta): `index.html`, `manifest.webmanifest`, `sw.js`, `leitor-wasm.js`, `catalog-cloud.js`, `firebase-config.js`, `icon.svg`, `logo-multiplo-mix.png`.
4. Confirme em **Commit changes**.
5. Abra `https://multiplomix.github.io/Bipador-Universal-Beta2/V48_EAN_TESTE/` em uma aba anônima para evitar cache.
6. Faça login no catálogo BipaMix para consultar os EANs compartilhados.

## Cadastrar o EAN compartilhado

Cadastre **dois registros**, com o mesmo EAN e SKUs diferentes, cada qual com o nome real do produto:

| EAN | SKU | Produto |
|---|---|---|
| EAN real compartilhado | SKU real Universal | Alicate Universal |
| EAN real compartilhado | SKU real Bico | Alicate de Bico |
| Outro EAN real | SKU real Corte | Alicate de Corte |

Não cadastre Alicate Universal e Alicate de Bico como SKUs equivalentes. Eles são produtos diferentes.

## Funcionamento

- EAN compartilhado -> selecionar fisicamente **qual modelo está na mão**. Nada é pré-selecionado.
- Selecionar modelo do pedido -> marcar a confirmação visual -> uma leitura contabilizada.
- Selecionar outro modelo -> alerta vermelho e **zero unidades contabilizadas**.
- Se o mesmo EAN for usado por dois componentes do kit, cada confirmação contabiliza somente o respectivo componente.
- EAN exclusivo segue o fluxo normal, sem tela adicional.
- A lista inclui uma opção “OUTRO MODELO” para bloquear um item que não corresponda aos cadastros.
- A cor e o tamanho continuam sendo conferidos; EAN compartilhado não prova a identidade física sozinho.

**Atenção:** a escolha do modelo depende da inspeção humana. O aplicativo não consegue distinguir dois produtos que têm exatamente o mesmo código impresso.

## Testes automatizados

- Modelo correto, modelo errado e opção “outro modelo”
- Quantidade excedente bloqueada
- EAN único de modelo diferente
- Kit com dois SKUs e o mesmo EAN
- EAN compartilhado por duas cores
- SKU-base e SKU com sufixo
- EAN desconhecido
- Compatibilidade com kit TikTok, cor e tamanho
- Contagem de conjunto físico com quatro unidades

**O catálogo Firebase e as demais funções da V47 não foram alterados.** A leitura real em iPhone/Android ainda deve ser confirmada pelo usuário na pasta de testes.
