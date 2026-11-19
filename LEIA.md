# Apresentação — novo site da RENAP

Página única, sem build, sem instalação. Dezenove telas para apresentar o
briefing à Articulação Nacional em linguagem simples.

Conteúdo: `Briefing-novo-site-RENAP.docx`, versão de 19/11/2026.
Base visual: design system do
[Controle Popular](https://github.com/FinweeJur/controle-popular-design) (MIT).

## Abrir

Clique duas vezes em `index.html`. Ou, nesta pasta:

```
python -m http.server 4323
```

e abra <http://127.0.0.1:4323>.

## Andar

| Ação | Como |
|---|---|
| Próxima / anterior | setas `←` `→`, espaço, `PageUp`/`PageDown` |
| Primeira / última | `Home` / `End` |
| No celular | deslize o dedo na horizontal |
| Ir direto a uma tela | `#7` no fim do endereço |
| Vira PDF | `Ctrl`+`P` → salvar como PDF |

O tema escolhido fica guardado no navegador.

## Os oito temas

Claro, Escuro, Alto contraste, Pequi, Cerrado, Mata Atlântica, Caatinga e
Pantanal. A tela 9 troca o tema ao vivo: é a demonstração do que o site vai
fazer. O nome do tema aparece escrito — cor nunca é o único sinal.

## O que é de quem

- Código: MIT, ver [LICENSE](LICENSE).
- `temas/temas.css`, `fontes/fontshare.css` e `componentes/select.css` vieram do
  design system do Controle Popular (MIT), sem alteração.
- Textos da proposta: RENAP. O briefing é a fonte.

## Pastas

```
index.html              o deck inteiro (HTML + CSS + JS)
temas/temas.css         tokens dos 8 temas (--cp-*)
temas/temas.json        metadados dos temas (nome, cores, emoji)
fontes/fontshare.css    Clash Display + General Sans
componentes/select.css  seta do <select> com respiro
docs/DESIGN.md          o design system desta apresentação
docs/COMO-EDITAR.md     trocar texto, criar tela, gerar PDF
docs/medir-contraste.py mede os 8 temas e diz onde falha
```
