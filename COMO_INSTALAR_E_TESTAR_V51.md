# Bipador Universal V51 — correções de SKU 5110, AB-168/XFP-3370 e vestidos

## Publicar uma versão de teste no GitHub Pages
1. Não substitua a versão em uso na expedição.
2. No repositório `MultiploMix/Bipador-Universal-Beta2`, crie a pasta `V51_SKUS_TESTE`.
3. Envie os oito arquivos do app deste ZIP à pasta (diretamente na raiz dela).
4. Acesse `https://multiplomix.github.io/Bipador-Universal-Beta2/V51_SKUS_TESTE/`.
5. Conecte o Firebase BipaMix normalmente e teste primeiro com as etiquetas que falhavam.

## Correções
- `5110-1-1-TOUCA-PRETO-BASICA` é a touca da família `A5110`, com cor PRETO preservada. Se o cadastro do EAN contém somente `A5110`, precisa de confirmação visual da cor. Não aprova outras cores automaticamente.
- `AB-168 = XFP-3370` cadastrado como texto literal no campo SKU é interpretado como a equivalência já autorizada. Para pedido `XFP-3370-4-BEGE-...`, o EAN com cadastro somente no SKU-base exige confirmação visual. A quantidade física continua 4 leituras.
- `VT001PRETO G`, `VT001 G PRETO` e `VT001-PRETO-G` são equivalentes ao ler QR de produto, sem confundir M com G nem PRETO com ROSA. Também funciona nos prefixos de confecção V e R com três dígitos.
- Conservados leitores, Firebase, histórico, kits, proteção contra excedentes e modelos 1417.

## Atenção
- Para EAN sem cor individual cadastrada, o próprio código de barras não comprova a cor; a verificação física continua obrigatória.
- Se o EAN 7820181151109 estiver cadastrado só como A5110, não confirma cor sem seleção visual.
- Backup do catálogo antes de alterações em cadastros. Esta atualização não altera o Firestore.
