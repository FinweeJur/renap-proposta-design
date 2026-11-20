"""Mede o contraste dos oito temas com a camada de marca da RENAP.

Por que existe: a regra Ã© "contraste medido, nunca estimado".
Base: temas/temas.css (design system do Controle Popular, MIT).
Marca: temas/renap.css â€” vermelho da RENAP, com tom prÃ³prio por fundo.

Uso: python docs/medir-contraste.py
"""

VERMELHO_CLARO = dict(primary="#b00020", ink="#ffffff")
VERMELHO_ESCURO = dict(primary="#f2666a", ink="#1a0505")

TEMAS = {
    "light":          dict(bg="#f7f8fa", surface="#ffffff", text="#0e1726", soft="#4a5568", accent="#0e8f6e", **VERMELHO_CLARO),
    "dark":           dict(bg="#0b1220", surface="#141c2b", text="#e6eaf0", soft="#a0aec0", accent="#2fbf9a", **VERMELHO_ESCURO),
    "brasil":         dict(bg="#0b3d2e", surface="#104a37", text="#fdf6e3", soft="#cfe3b8", accent="#009c3b", primary="#ffd700", ink="#12250f"),
    "high-contrast":  dict(bg="#ffffff", surface="#ffffff", text="#000000", soft="#000000", accent="#006644", primary="#990000", ink="#ffffff"),
    "pequi":          dict(bg="#0d0b08", surface="#171310", text="#f7f0e6", soft="#cbbda9", accent="#e4b33c", **VERMELHO_ESCURO),
    "cerrado":        dict(bg="#1a1208", surface="#231a0f", text="#f5e6d0", soft="#c4a882", accent="#3a6b35", **VERMELHO_ESCURO),
    "mata-atlantica": dict(bg="#0a1208", surface="#111a0f", text="#e8f0e4", soft="#a8c4a0", accent="#ffd700", **VERMELHO_ESCURO),
    "caatinga":       dict(bg="#161007", surface="#1e170c", text="#f7ede1", soft="#cbb696", accent="#2e8b57", **VERMELHO_ESCURO),
    "pantanal":       dict(bg="#071318", surface="#0e1e24", text="#e0f2fe", soft="#93c5fd", accent="#10b981", **VERMELHO_ESCURO),
}

# (rÃ³tulo, frente, fundo, mÃ­nimo WCAG, conta como falha?)
# A marca de acento do olho Ã© decorativa: nÃ£o carrega informaÃ§Ã£o.
CHECAGENS = [
    ("texto / fundo",                        "text", "bg", 4.5, True),
    ("texto / cartÃ£o",                       "text", "surface", 4.5, True),
    ("texto suave / fundo",                  "soft", "bg", 4.5, True),
    ("texto suave / cartÃ£o",                 "soft", "surface", 4.5, True),
    ("tinta sobre a primÃ¡ria (botÃ£o)",       "ink", "primary", 4.5, True),
    ("primÃ¡ria como texto (preÃ§o barato)",   "primary", "surface", 4.5, True),
    ("acento / fundo (marca decorativa)",    "accent", "bg", 3.0, False),
]


def luminancia(hexcor):
    h = hexcor.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))

    def canal(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)


def razao(a, b):
    la, lb = luminancia(a), luminancia(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


falhas = 0
for tema, c in TEMAS.items():
    print("\n" + tema)
    for rotulo, frente, fundo, minimo, conta in CHECAGENS:
        r = razao(c[fundo], c[frente])
        ok = r >= minimo
        if not ok and conta:
            falhas += 1
        aviso = "" if conta or ok else "  (decorativo: sÃ³ informa)"
        print("  {:38} {:5.2f}:1  piso {:.1f}  {}{}".format(
            rotulo, r, minimo, "ok" if ok else "ABAIXO", aviso))

print("\nfalhas:", falhas)
