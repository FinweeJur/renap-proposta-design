# Índice da documentação

> 🌐 **Português** (este documento) · [English version ↓](#english-version)

**Resumo.** Um ponto de entrada para os documentos técnicos deste repositório.
Cada arquivo abre com resumo, palavras-chave, sumário e links.

**Palavras-chave:** índice, documentação, design, layout, edição, acessibilidade.

---

| Documento | Assunto | Público |
|---|---|---|
| [DESIGN.md](DESIGN.md) | direção de arte, tokens, tipografia, movimento, contraste medido | quem desenha |
| [REGRAS-LAYOUT.md](REGRAS-LAYOUT.md) | respiro, janelas pequenas, checklist de medição | quem monta tela |
| [COMO-EDITAR.md](COMO-EDITAR.md) | trocar texto, criar tela, mudar cor, gerar PDF | quem edita conteúdo |
| [revisao-s5.md](revisao-s5.md) | revisão editorial da tela 2 pelo modelo S5 e custo da chamada | quem revisa texto |

## Scripts de apoio

| Script | O que faz |
|---|---|
| [medir-contraste.py](medir-contraste.py) | mede os nove temas e diz onde falha (meta: 0 falhas) |
| [extrair-texto.py](extrair-texto.py) | lista o texto visível de cada tela, para revisão |
| [preparar-fundos.py](preparar-fundos.py) | reduz e escurece as fotos de fundo |
| [preparar-logo.py](preparar-logo.py) | gera o logo com fundo transparente, nas duas cores |
| [preparar-refs.py](preparar-refs.py) | reduz os prints de referência para 720 px |
| [recortar-print.py](recortar-print.py) | tira a moldura escura de um print |
| [recortar-branco.py](recortar-branco.py) | tira a tarja branca de um print |
| [radio-corpo.js](radio-corpo.js) | corpo do player de rádio, antes de virar `componentes/radio.js` |

## Documentos da raiz

| Documento | Assunto |
|---|---|
| [README.md](../README.md) | visão geral, como abrir, estrutura, licença |
| [AGENTS.md](../AGENTS.md) | regras para agentes de IA |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | como contribuir e padrão de commit |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | convivência |
| [SECURITY.md](../SECURITY.md) | como relatar falha |
| [CHANGELOG.md](../CHANGELOG.md) | histórico de mudanças |

## English version

**Summary.** Entry point for the technical documentation. Each document opens
with a summary, keywords, table of contents and links. Design and layout rules,
editing guide and the editorial review record live here, together with the helper
scripts: contrast meter, text extractor, background and logo preparation,
screenshot cropping, and the radio player source.
