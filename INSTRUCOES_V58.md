# BipaMix V58 — Leitura adaptativa e SKUs de marketplace

## Instalação em paralelo
1. No GitHub `MultiploMix/Bipador-Universal-Beta2`, crie a pasta `V58_CAMERA_TESTE`.
2. Extraia o ZIP e envie somente os OITO arquivos de aplicativo para essa pasta, na raiz da pasta (sem subpastas).
3. Faça Commit changes e abra `https://multiplomix.github.io/Bipador-Universal-Beta2/V58_CAMERA_TESTE/`.
4. Confirme `V58 TESTE` no cabeçalho e teste nos iPhones antes de colocar em produção.

## O que muda
- ZXing WASM usa quadros leves intercalados com quadros detalhados, mantendo QR Master em alta resolução e fallback de câmera.
- Não modifica as constraints da câmera nem remove zoom/lanterna.
- Índice de EAN em memória e cache limitado de normalização dos SKUs: sem mudança no Firebase.
- Camada genérica e CONSERVADORA para SKU com `1UN/1PC` e descrição comercial repetida, apenas quando modelo, cor e tamanho continuam iguais.
- Todas as regras específicas V57 e anteriores ficam intactas; em dúvida, o app bloqueia, não inventa equivalência.

## Limites e cuidados
- O ganho de velocidade depende do aparelho, da iluminação e do tamanho dos códigos; não se promete leitura instantânea em qualquer iPhone.
- Os casos conhecidos de kits/conjuntos e equivalências especiais usam as regras antigas.
- Códigos com mais de uma unidade por pacote ou cores diferentes não entram na regra genérica.
- Não importe o CSV novamente e não mexa nas regras Firebase.

## Testes importantes
1. Pedido com QR Master grande e QR de etiquetas da Shopee.
2. EAN no iPhone com zoom e lanterna; teste também erro de EAN.
3. Kit com dois componentes; quantidade 3 ou 4 unidades; variações compartilhadas.
4. Touca WJ-2670, Regata R003, alicates WJ/WL 1417, XFP/AB-168, fita WJ-211, mochila CG248 e peças VT001.
5. SKU genérico de outra loja: `ABC123-PRETO-M-1UN-CAMISETA-PRETO-M` corresponde a `ABC123-M-PRETO`, mas `ABC123-PRETO-G` ou `ABC123-AZUL-M` não.

O backup do catálogo Firebase deve ser preservado independentemente de testes, mas esta atualização não grava nem altera o catálogo.
