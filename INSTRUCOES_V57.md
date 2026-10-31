# BipaMix V57 — Compatibilidade de SKUs TikTok e cor aleatória

## Instalação de TESTE

1. Crie a pasta `V57_SKUS_TESTE` no repositório `MultiploMix/Bipador-Universal-Beta2`.
2. Envie os 8 arquivos do aplicativo desta pasta (não envie a instrução).
3. Faça commit e abra `https://multiplomix.github.io/Bipador-Universal-Beta2/V57_SKUS_TESTE/`.
4. Confirme que o cabeçalho mostra `V57 TESTE`.
5. Teste a etiqueta da touca preta adulto, a regata Azul Caneta M e a touca aleatória adulto com conferência visual da cor e tamanho.
6. Teste também uma COR ERRADA e um TAMANHO ERRADO, que devem continuar bloqueados.

O catálogo Firebase (`bipamix` / `catalogo_eans`) não foi editado. Não reimporte a planilha.
O modo de cor aleatória deve solicitar a escolha da cor real; cadastrar `CorAleatoria=SIM` não permite ignorar cor fixa de outro pedido.

### Casos cobertos
- WJ-2670-PRETO-ADULTO-1UN-TOUCA-NATACAO-PRETO-ADULTO ↔ WJ-2670-PRETO (adulto exige verificação visual se ausente na identificação do produto).
- R003-AZUL CANETA-M-1UN-REGATA-AZUL-CANETA--M ↔ R003-AZ CANETA-M (somente mesma cor e tamanho).
- WJ-2670 ALEATORIA ADULTO ↔ EAN da família WJ-2670; escolha e confirmação obrigatória de cor e tamanho físicos.
- Mantidas todas as regras anteriores da V56: kits, alicates, AB/XFP, conjuntos múltiplos e importação segura.
