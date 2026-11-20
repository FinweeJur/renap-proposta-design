"""Lista o texto visível de cada tela para revisão de repetição.

Uso: python docs/extrair-texto.py
Saída: um bloco por tela, com olho, título, resumo, itens e rodapé.
"""
import io
import re

with io.open("index.html", encoding="utf-8") as f:
    html = f.read()

partes = re.split(r"(?=<section class=\"tela\")", html)[1:]

for i, bloco in enumerate(partes, start=1):
    corpo = bloco.split("</section>")[0]
    # Remove tags, mas preserva quebra entre elementos de bloco.
    corpo = re.sub(r"<(p|li|h1|h2|h3|div|summary|span|b|figcaption)[^>]*>", "\n", corpo)
    corpo = re.sub(r"<[^>]+>", " ", corpo)
    corpo = re.sub(r"&nbsp;", " ", corpo)
    linhas = [re.sub(r"\s+", " ", l).strip() for l in corpo.split("\n")]
    linhas = [l for l in linhas if l]
    print("\n=== TELA %d (%d linhas)" % (i, len(linhas)))
    for l in linhas[:16]:
        print("   ", l[:150].encode("ascii", "replace").decode())
