# Design system da apresentação

> Menos é mais: este documento explica **por que** cada escolha existe.
> Se um número aparecer aqui, ele foi medido. Rodar: `python docs/medir-contraste.py`.

## 1. Direção de arte

**Editorial cívico.** Parece ata de reunião, não anúncio de software.

| Elemento | Escolha | Por quê |
|---|---|---|
| Título | Clash Display | geométrica, ocupa pouco, aguenta corpo grande |
| Corpo | General Sans | leitura confortável em 1,5 de entrelinha |
| Ritmo | 4 · 8 · 12 · 20 · 32 · 56 px | escala curta, fácil de manter |
| Raia de bioma | 4 faixas de 10 px à esquerda | dá território à página sem pesar |
| Marca do olho | quadrado de 10 px | cor nunca é o único sinal: o texto existe |

**Âncora de diferenciação:** a própria apresentação troca de tema, ao vivo,
na tela 9. Quem assiste vê o recurso funcionando, não lê que ele existe.

## 2. Tokens

Nada de cor solta no CSS. Tudo vem de `temas/temas.css`:

| Token | Uso nesta apresentação |
|---|---|
| `--cp-bg` | fundo da tela |
| `--cp-surface` | cartão, botão secundário, `<select>` |
| `--cp-surface-2` | ficha arredondada, tecla `kbd` |
| `--cp-text` | texto principal e título |
| `--cp-text-soft` | resumo, olho, legenda, rodapé da tela |
| `--cp-primary` | barra de progresso, marcador da lista, botão |
| `--cp-primary-ink` | texto dentro do botão |
| `--cp-accent` | quadrado do olho (muda no modo daltonismo) |
| `--cp-border` | toda borda |
| `--cp-focus` | anel de foco |

Regra herdada: **o nome do token é o contrato; o valor muda por tema.**

## 3. Tipografia

Tudo em `clamp`, celular primeiro. Piso absoluto de 12 px.

| Papel | Tamanho |
|---|---|
| Capa | `clamp(2.1rem, 7vw, 4.2rem)` |
| Título de tela | `clamp(1.5rem, 4.4vw, 2.5rem)` |
| Corpo | `clamp(1rem, 2.3vw, 1.15rem)` |
| Olho da seção | `clamp(.75rem, 1.8vw, .82rem)` |
| Menor texto aceito | `.75rem` = 12 px |

## 4. Movimento

Personagem **corporativo premium**: entra rápido, assenta sem quique.

| Uso | Duração | Curva |
|---|---|---|
| Troca de tela | 420 ms | `cubic-bezier(.2, 0, 0, 1)` |
| Entrada de conteúdo | 420 ms, 70 ms entre itens | a mesma |
| Hover e toque | 160–320 ms | a mesma |

Regras:

1. Entrada desacelera; saída acelera. Nunca `linear` para deslocamento.
2. No máximo **três** elementos se movem juntos.
3. Deslocamento curto: 20 px. Nada atravessa a tela.
4. `prefers-reduced-motion` zera tudo (1 ms).
5. Movimento nunca é o único sinal de estado.

## 5. Contraste medido

Rode `python docs/medir-contraste.py`. Resultado de 19/11/2026:

| Tema | Texto | Texto suave | Botão | Situação |
|---|---|---|---|---|
| Claro | 16,9:1 | 7,1:1 | 9,6:1 | ok |
| Escuro | 15,5:1 | 8,3:1 | 5,7:1 | ok |
| Alto contraste | 21:1 | 21:1 | 11,2:1 | ok |
| Pequi | 17,4:1 | 10,7:1 | 6,5:1 | ok |
| Cerrado | 15,1:1 | 8,2:1 | 5,8:1 | ok |
| Mata Atlântica | 16,3:1 | 10,0:1 | 6,3:1 | ok |
| Caatinga | 16,3:1 | 9,6:1 | 6,0:1 | ok |
| Pantanal | 16,4:1 | 10,4:1 | **4,1:1** | ver nota |

> **Nota Pantanal.** Branco sobre `#0284c7` dá 4,10:1 — abaixo do piso de
> 4,5:1 para texto pequeno. Por isso o rótulo do botão é grande (19,2 px em
> negrito), faixa em que o piso do WCAG é 3:1. Se o site for usar botão pequeno
> nesse tema, escureça `--cp-primary` para `#0369a1` (5,8:1) ou troque a tinta.
> Isso é uma decisão de token, não de CSS solto.

## 6. O que o deck não faz, de propósito

- Não usa biblioteca de animação: 19 telas não justificam 17 KB de JS.
- Não usa carrossel automático: quem lê no celular decide o ritmo.
- Não usa imagem de fundo: peso e contraste pagam a conta.
- Não esconde a barra de navegação no celular: toque grande ganha de gesto secreto.

## 7. Checklist para tela nova

1. Cabe em 390 × 700 sem rolagem lateral?
2. O olho tem texto, não só cor?
3. O texto mais fraco passa de 4,5:1 no tema mais claro e no mais escuro?
4. Funciona com `Tab`, `Enter` e `Escape`?
5. Alvo de toque com 36 px ou mais?
6. Sem `prefers-reduced-motion`, ainda faz sentido?
