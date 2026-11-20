# AGENTS.md — regras para agentes de IA

> 🌐 **Português** (este documento) · [English version ↓](#english-version)

**Resumo.** Instruções para qualquer agente que edite este repositório. O
objetivo é não quebrar contraste, responsividade e clareza do texto. Em caso de
dúvida entre “bonito” e “legível”, escolha legível.

**Palavras-chave:** agente, regras, contraste, 390 px, tokens, commit, licença,
sem dado pessoal.

---

## Sumário

- [Contexto em uma frase](#contexto-em-uma-frase)
- [Regras que não se negociam](#regras-que-não-se-negociam)
- [Onde mexer](#onde-mexer)
- [Como verificar](#como-verificar)
- [Commit e publicação](#commit-e-publicação)
- [Privacidade](#privacidade)

## Contexto em uma frase

Página única (`index.html`) que apresenta a proposta do novo site da RENAP a
pessoas leigas; sem build, sem framework, publicada por GitHub Pages.

## Regras que não se negociam

| # | Regra |
|---|---|
| 1 | Contraste medido: rode `docs/medir-contraste.py`. Precisa dar **0 falhas**. |
| 2 | 390 px é a régua: nenhuma tela pode ter rolagem lateral. |
| 3 | Respiro mínimo: 12 px entre cards, 20 px entre linhas, 56 px antes do rodapé. |
| 4 | Texto de interface ≥ 12 px; alvo de toque ≥ 44 px. |
| 5 | Cor nunca é o único sinal de estado. |
| 6 | Todo movimento para em `prefers-reduced-motion`. |
| 7 | Emoji é enfeite: `<span aria-hidden="true">` e o texto ao lado explica. |
| 8 | Peça de terceiro entra com licença declarada no README. |
| 9 | Nada de `--force`, nada de reescrever histórico publicado. |
| 10 | Deploy só com ordem explícita do dono; push não publica por si. |

## Onde mexer

| Quero | Arquivo |
|---|---|
| Texto de uma tela | `index.html`, seção pelo `aria-label` |
| Cor de tema | `temas/renap.css` (marca) ou `temas/temas.css` (base) |
| Componente | `componentes/` (sanfona, select, casca, robô) |
| Efeito | `efeitos/efeitos.css` e `efeitos/magnet.js` |
| Rádio | `componentes/radio.js` (gerado por `docs/radio-corpo.js`) |
| Foto de fundo | `assets/fundo/` + `docs/preparar-fundos.py` |
| Documentação | `docs/` e o README |

## Como verificar

```bash
python docs/medir-contraste.py            # 0 falhas
python docs/extrair-texto.py              # revisar texto visível
npx --yes html-validate index.html        # marcação (opcional)
```

No navegador, antes de entregar:

1. 390 × 844 e 1440 × 950, mais uma janela de ~700 × 500.
2. `document.documentElement.scrollWidth === clientWidth`.
3. Nenhum erro no console.
4. Botões de seta, rádio (play e parar) e sanfonas funcionando.

## Commit e publicação

- Mensagem em arquivo: `git commit -F mensagem.txt`. Trailer com modelo e sessão.
- Um commit por bloco coerente; nada de misturar documentação e estilo.
- **Push não publica.** O GitHub Pages atualiza no push, mas publicar de verdade
  (divulgar o endereço) só com ordem do dono.

## Privacidade

- Nunca coloque CPF, telefone, e-mail pessoal ou dado de saúde no repositório.
- Print de site de terceiro: só página pública, com fonte e data na legenda.
- Antes de commitar imagem nova, rode a varredura de CPF do projeto de origem.

## Origem

- 20/11/2026 — AGENTS.md criado junto com a revisão de documentação do repo.

## English version

**Summary.** Instructions for any agent editing this repository. The goal is to
keep contrast, responsiveness and clarity intact. When in doubt between pretty
and readable, choose readable.

### Non-negotiable rules

1. Measured contrast: `python docs/medir-contraste.py` must report **0 failures**.
2. 390 px is the ruler: no screen may scroll sideways.
3. Minimum spacing: 12 px between cards, 20 px between list lines, 56 px before the footer.
4. Interface text ≥ 12 px; touch targets ≥ 44 px.
5. Colour is never the only signal of state.
6. All motion stops under `prefers-reduced-motion`.
7. Emojis are decoration: wrap them in `<span aria-hidden="true">`.
8. Third-party assets need their licence declared in the README.
9. No `--force`, no rewriting published history.
10. Deployment only on the owner's explicit order; a push does not publish.

### Where to change things

Text lives in `index.html` (find the section by its `aria-label`). Colours live
in `temas/renap.css` (brand) and `temas/temas.css` (base). Components, effects,
radio and background photos each have their own folder, listed in the README.

### How to verify

```bash
python docs/medir-contraste.py
python docs/extrair-texto.py
```

Then, in the browser: 390 × 844, 1440 × 950 and a ~700 × 500 window; confirm no
horizontal scroll, no console errors, and that arrows, radio and accordions work.

### Privacy

Never commit personal data. Screenshots must come from public pages and carry
source and date in the caption.
