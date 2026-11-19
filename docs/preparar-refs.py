"""Prepara as capturas dos sites de referência para o deck.

Por que existe: os prints saem em 1012x640; no celular precisam caber sem
pesar. Aqui viram 720 px de largura, JPEG leve, e o nome do arquivo fica igual
ao usado no index.html.

Uso: python docs/preparar-refs.py
Entrada: C:/Users/teste/AppData/Local/Temp/ref-*.jpg
Saída:   assets/ref/<slug>.jpg
"""
import glob
import os

from PIL import Image

ORIGEM = r"C:\Users\teste\AppData\Local\Temp"
DESTINO = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "ref")
LARGURA = 720

os.makedirs(DESTINO, exist_ok=True)

for caminho in sorted(glob.glob(os.path.join(ORIGEM, "ref-*.jpg"))):
    nome = os.path.basename(caminho).replace("ref-", "")
    im = Image.open(caminho).convert("RGB")
    altura = round(im.height * LARGURA / im.width)
    im = im.resize((LARGURA, altura), Image.LANCZOS)
    saida = os.path.join(DESTINO, nome)
    im.save(saida, "JPEG", quality=78, optimize=True)
    print("{:24} {} KB  {}x{}".format(nome, round(os.path.getsize(saida) / 1024), im.width, im.height))
