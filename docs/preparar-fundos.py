"""Prepara as fotos de fundo: grandes, leves e sem exagerar no brilho.

Entrada: C:/Users/teste/Downloads/LOGOS RENAP/Grandes
Saída:   assets/fundo/capa.jpg, home-hero.jpg, fecho.jpg

Por que reduzir: original de 6000x4000 com 8 MB trava o celular. Aqui fica
1800 px de largura e cerca de 200 KB, que é o suficiente para fundo com
sobreposição escura.
"""
import os

from PIL import Image, ImageEnhance

ORIGEM = r"C:\Users\teste\Downloads\LOGOS RENAP\Grandes"
DESTINO = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "fundo")

ALVOS = [
    ("IMG_9341.jpg", "capa.jpg", 1800, 0.62),                                    # auditório
    ("WhatsApp Image 2026-11-13 at 18.43.13.jpeg", "home-hero.jpg", 1800, 0.75),  # panorama do grupo
    ("IMG_9367.jpg", "fecho.jpg", 1600, 0.6),                                     # segunda foto grande
]

os.makedirs(DESTINO, exist_ok=True)

for origem, nome, largura, brilho in ALVOS:
    caminho = os.path.join(ORIGEM, origem)
    if not os.path.exists(caminho):
        print("FALTOU:", origem)
        continue
    im = Image.open(caminho).convert("RGB")
    altura = round(im.height * largura / im.width)
    im = im.resize((largura, altura), Image.LANCZOS)
    im = ImageEnhance.Brightness(im).enhance(brilho)
    im = ImageEnhance.Color(im).enhance(0.85)
    saida = os.path.join(DESTINO, nome)
    im.save(saida, "JPEG", quality=72, optimize=True, progressive=True)
    print("{:14} {}x{}  {} KB".format(nome, im.width, im.height, round(os.path.getsize(saida) / 1024)))
