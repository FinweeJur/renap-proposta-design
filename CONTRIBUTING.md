# Como contribuir

> 🌐 **Português** (este documento) · [English version ↓](#english-version)

**Resumo.** Este repositório é uma apresentação estática. Contribuições são
bem-vindas desde que mantenham três coisas: **contraste medido**, **390 px sem
rolagem lateral** e **texto em português claro**.

**Palavras-chave:** contribuição, pull request, commit convencional, revisão,
acessibilidade, licença MIT.

---

## Sumário

- [Antes de abrir o editor](#antes-de-abrir-o-editor)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Padrão de commit](#padrão-de-commit)
- [O que é revisado](#o-que-é-revisado)
- [Como medir](#como-medir)
- [Código de conduta](#código-de-conduta)
- [Segurança](#segurança)

## Antes de abrir o editor

Leia, nesta ordem:

1. [README.md](README.md) — o que é e como abrir.
2. [docs/REGRAS-LAYOUT.md](docs/REGRAS-LAYOUT.md) — respiro e janelas pequenas.
3. [docs/DESIGN.md](docs/DESIGN.md) — tokens, tipografia e contraste.
4. [AGENTS.md](AGENTS.md) — regras para agentes de IA.

## Fluxo de trabalho

```bash
git clone https://github.com/FinweeJur/renap-proposta-design.git
cd renap-proposta-design
python -m http.server 4323     # abre em http://127.0.0.1:4323
```

1. Crie uma branch: `git switch -c docs/ajusta-tela-12`.
2. Faça a mudança em `index.html` (ou no documento certo).
3. Meça: `python docs/medir-contraste.py` e teste 390, 768, 1440 px.
4. Commit em arquivo de mensagem (`git commit -F`), nunca `-m` com parágrafo.
5. Abra o pull request descrevendo **o que muda para quem lê**, não só o código.

## Padrão de commit

Conventional Commits, em português, primeira linha até 60 caracteres:

```text
tipo(escopo): resumo no imperativo

- o que muda, em linhas curtas
- por que muda
```

| Tipo | Quando |
|---|---|
| `feat` | tela, componente ou conteúdo novo |
| `fix` | corrige defeito visível |
| `docs` | só documentação |
| `style` | espaçamento, cor, tipografia |
| `a11y` | acessibilidade |
| `chore` | script, configuração |

## O que é revisado

| Critério | Como se confere |
|---|---|
| Contraste | `docs/medir-contraste.py` com 0 falhas |
| Celular | 390 px sem rolagem lateral |
| Respiro | 12 px entre cards, 20 px entre linhas |
| Texto | frase curta, sujeito identificado, sem jargão |
| Acessibilidade | `Tab`, `Enter`, `Escape`, `aria-label` |
| Licença | peça nova com licença declarada no README |

## Como medir

```bash
python docs/medir-contraste.py                  # 0 falhas
python docs/extrair-texto.py                    # texto visível por tela
```

No navegador, para achar rolagem lateral:

```js
document.querySelectorAll('.tela').forEach(t =>
  t.scrollWidth > t.clientWidth && console.warn(t));
```

## Código de conduta

Este projeto segue o [Contributor Covenant](CODE_OF_CONDUCT.md). Seja direto no
conteúdo e respeitoso com as pessoas.

## Segurança

Não abra issue pública com dado pessoal. Veja [SECURITY.md](SECURITY.md).

## English version

**Summary.** This repository is a static presentation. Contributions are welcome
as long as they keep three things: measured contrast, 390 px without horizontal
scroll, and plain Portuguese text.

### Workflow

```bash
git clone https://github.com/FinweeJur/renap-proposta-design.git
cd renap-proposta-design
python -m http.server 4323
```

1. Create a branch: `git switch -c docs/fix-screen-12`.
2. Edit `index.html` (or the right document).
3. Measure: `python docs/medir-contraste.py`, then test at 390, 768 and 1440 px.
4. Commit using a message file (`git commit -F`).
5. Open a pull request describing **what changes for the reader**.

### Commit style

Conventional Commits, first line up to 60 characters: `type(scope): summary`,
where type is one of `feat`, `fix`, `docs`, `style`, `a11y`, `chore`.

### What gets reviewed

Contrast (0 failures), phone layout, spacing, clarity of the text, keyboard
access, and the licence of any new asset.

### Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Report
security issues privately, as described in [SECURITY.md](SECURITY.md).
