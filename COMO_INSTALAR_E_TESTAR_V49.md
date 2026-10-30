# Bipador Universal V49 — Aliases WL/WJ 1417

## Instalar sem alterar producao

1. Descompacte o ZIP.
2. Crie `V49_WL_WJ_TESTE` no repositório `MultiploMix/Bipador-Universal-Beta2`.
3. Envie os 8 arquivos: `index.html`, `firebase-config.js`, `catalog-cloud.js`, `leitor-wasm.js`, `sw.js`, `icon.svg`, `logo-multiplo-mix.png` e `manifest.webmanifest`.
4. Abra `https://multiplomix.github.io/Bipador-Universal-Beta2/V49_WL_WJ_TESTE/`.
5. Conecte o catálogo BipaMix e confira os registros existentes (não é necessário recadastrar os EANs).

## Testes recomendados

- Etiqueta `WJ-1417-A`; bipa QR/SKU `WL-1417-A`: deve aceitar.
- Etiqueta `WL-1417-B`; bipa QR/SKU `WJ1417B`: deve aceitar.
- Etiqueta `WJ-1417-A`; bipa `WL-1417-B`: deve bloquear.
- Etiqueta `WJ-1417-A`; EAN cadastrado para `WL-1417-A`: deve aceitar conforme regras de EAN.
- EAN compartilhado entre A e B: deve solicitar modelo físico e não aceitar o incorreto.
- Outros modelos (ex.: WJ-2670) e kits continuam com regras anteriores.

**Segurança:** a equivalência é só do prefixo de fornecedor na família 1417. Não alteramos os EANs, nem criamos equivalência entre A e B.
