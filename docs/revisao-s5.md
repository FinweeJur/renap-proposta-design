# Revisão do texto da tela 2 pelo S5

> 🌐 **Português** (este documento) · [English version ↓](#english-version)

> Registro do que foi pedido, do que voltou e do que foi aceito.
> Feito em 19/11/2026, com o modelo **S5** da Maritaca.

## Como foi chamado

```json
{
  "model": "s5",
  "reasoning_effort": "medium",
  "max_tokens": 9000,
  "messages": [ ... ]
}
```

- O parâmetro de raciocínio é `reasoning_effort` (o nome `thinking` é recusado
  com erro 422).
- O S5 recusa `temperature` diferente do padrão (erro 400).
- `max_tokens` é teto, não meta: o raciocínio conta ali dentro. Com 3.200, o
  modelo gastou tudo pensando e devolveu texto vazio. Com 9.000 e esforço
  `medium`, gastou 4.502 tokens e devolveu 1.551 caracteres de JSON.
- Custo estimado da chamada: menos de R$ 0,05.

## O que foi pedido

Reescrever a tela "quatro pontos em aberto" do ponto de vista de secretaria de
reunião: ponto em aberto, duas opções, exemplo prático, orações diretas, sujeito
identificado, concordância correta, sem jargão e sem adjetivo de opinião.

## O que mudou no texto

| Antes | Depois |
|---|---|
| "Achado ou admirado?" | "O que a pessoa precisa encontrar primeiro?" |
| "Quem publica?" | "Quem publica conteúdo no dia a dia?" |
| "Sigilo entra na busca?" | "Quem pode descobrir que um documento restrito existe?" |
| "Internet ruim?" | "O site precisa funcionar em internet lenta?" |

As opções deixaram de ser adjetivos e passaram a ser frases com sujeito:
"A pessoa encontra o documento em dois cliques" em vez de "o documento, em dois
cliques".

## Um ajuste feito à mão no retorno do modelo

O modelo escreveu "Rede Nacional de Advogadas e Advogados Populares". A ordem
oficial é **"Rede Nacional de Advogados e Advogadas Populares"** — corrigido.

## Limite

O modelo não conhece o contexto da RENAP além do que foi enviado. Quem decide
se a revisão serve é a Articulação, na reunião.

## English version

**Summary.** Screen 2 was rewritten by the Maritaca S5 model with reasoning
enabled through `reasoning_effort: medium`. The API rejects the parameter name
`thinking` (422) and any non-default `temperature` (400). `max_tokens` is a
ceiling: with 3,200 the model spent everything thinking and returned empty text;
with 9,000 it used 4,502 tokens and returned the JSON. Cost: under R$ 0.05.
The model wrote the network name in the wrong order and the text was fixed by
hand. The model does not know RENAP's context beyond what was sent.
