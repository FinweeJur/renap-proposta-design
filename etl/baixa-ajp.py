"""Baixa o acervo completo do blog Assessoria Jurídica Popular para o Drive.

Etapas:
  feed    — páginas do feed Atom (790 posts, 150 por chamada)
  posts   — HTML de cada post, pelo endereço canônico
  imagens — arquivos de imagem citados no corpo, sem repetir

Tudo grava em `G:\\Meu Drive\\RENAP-AJP\\`. Checkpoint em `_meta/progresso.json`,
então rodar de novo continua de onde parou.

Uso:
  python etl-baixa-ajp.py feed
  python etl-baixa-ajp.py posts
  python etl-baixa-ajp.py imagens
  python etl-baixa-ajp.py tudo
"""
import hashlib
import io
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

UA = "finweejur/github artur colito"
BASE = "https://assessoriajuridicapopular.blogspot.com"
RAIZ = r"G:\Meu Drive\RENAP-AJP"
PASTAS = {
    "raw": os.path.join(RAIZ, "feed"),
    "posts": os.path.join(RAIZ, "posts"),
    "imagens": os.path.join(RAIZ, "imagens"),
    "meta": os.path.join(RAIZ, "_meta"),
}
ESPERA = 1.4          # segundos entre requisições
TENTATIVAS = 3


def garante_pastas():
    for caminho in PASTAS.values():
        os.makedirs(caminho, exist_ok=True)


def baixa(url, destino=None, binario=False):
    pedido = urllib.request.Request(url, headers={"User-Agent": UA})
    for tentativa in range(1, TENTATIVAS + 1):
        try:
            with urllib.request.urlopen(pedido, timeout=60) as resposta:
                dados = resposta.read()
            if destino:
                modo = "wb" if binario else "w"
                with open(destino, modo) as f:
                    f.write(dados)
            return dados
        except Exception as erro:
            if tentativa == TENTATIVAS:
                print("  falhou:", url[:90], erro)
                return None
            time.sleep(2 * tentativa)
    return None


def progresso():
    arquivo = os.path.join(PASTAS["meta"], "progresso.json")
    if os.path.exists(arquivo):
        return json.loads(io.open(arquivo, encoding="utf-8").read())
    return {"feed": [], "posts": [], "imagens": []}


def salva_progresso(p):
    arquivo = os.path.join(PASTAS["meta"], "progresso.json")
    with io.open(arquivo, "w", encoding="utf-8") as f:
        json.dump(p, f, ensure_ascii=False, indent=1)


def etapa_feed(p):
    total = None
    indice = 0
    while True:
        if indice in p["feed"]:
            indice += 150
            continue
        url = "%s/feeds/posts/default?alt=json&max-results=150&start-index=%d" % (BASE, indice + 1)
        dados = baixa(url)
        if not dados:
            break
        pagina = json.loads(dados)
        entradas = pagina["feed"].get("entry", [])
        if total is None:
            total = int(pagina["feed"]["openSearch$totalResults"]["$t"])
            print("total declarado:", total)
        nome = os.path.join(PASTAS["raw"], "feed-%04d.json" % (indice // 150 + 1))
        with io.open(nome, "w", encoding="utf-8") as f:
            json.dump(pagina, f, ensure_ascii=False)
        p["feed"].append(indice)
        salva_progresso(p)
        print("feed: %d/%d posts" % (min(indice + 150, total), total))
        indice += 150
        if indice >= total or not entradas:
            break
        time.sleep(ESPERA)


def entradas_do_feed():
    for nome in sorted(os.listdir(PASTAS["raw"])):
        if not nome.startswith("feed-"):
            continue
        pagina = json.loads(io.open(os.path.join(PASTAS["raw"], nome), encoding="utf-8").read())
        for e in pagina["feed"].get("entry", []):
            yield e


def etapa_posts(p):
    feitos = set(p["posts"])
    for e in entradas_do_feed():
        post_id = e["id"]["$t"].rsplit("-", 1)[-1]
        if post_id in feitos:
            continue
        url = next((l["href"] for l in e.get("link", []) if l.get("rel") == "alternate"), None)
        if not url:
            continue
        destino = os.path.join(PASTAS["posts"], post_id + ".html")
        if os.path.exists(destino) and os.path.getsize(destino) > 2000:
            p["posts"].append(post_id)
            continue
        dados = baixa(url, destino)
        if dados:
            p["posts"].append(post_id)
            if len(p["posts"]) % 20 == 0:
                salva_progresso(p)
                print("posts:", len(p["posts"]))
        time.sleep(ESPERA)
    salva_progresso(p)
    print("posts baixados:", len(p["posts"]))


def etapa_imagens(p):
    feitas = set(p["imagens"])
    vistos = set()
    for nome in sorted(os.listdir(PASTAS["posts"])):
        if not nome.endswith(".html"):
            continue
        html = io.open(os.path.join(PASTAS["posts"], nome), encoding="utf-8", errors="replace").read()
        for src in re.findall(r"<img[^>]+src=['\"]([^'\"]+)['\"]", html):
            if "blogger.googleusercontent" not in src and "bp.blogspot" not in src:
                continue
            if src in vistos:
                continue
            vistos.add(src)
            chave = hashlib.sha1(src.encode("utf-8")).hexdigest()[:16]
            if chave in feitas:
                continue
            extensao = os.path.splitext(src.split("?")[0])[1] or ".jpg"
            destino = os.path.join(PASTAS["imagens"], chave + extensao)
            if os.path.exists(destino) and os.path.getsize(destino) > 1000:
                p["imagens"].append(chave)
                continue
            if baixa(src, destino, binario=True):
                p["imagens"].append(chave)
                if len(p["imagens"]) % 25 == 0:
                    salva_progresso(p)
                    print("imagens:", len(p["imagens"]))
            time.sleep(0.8)
    salva_progresso(p)
    print("imagens baixadas:", len(p["imagens"]))


def main():
    garante_pastas()
    etapa = sys.argv[1] if len(sys.argv) > 1 else "tudo"
    p = progresso()
    if etapa in ("feed", "tudo"):
        etapa_feed(p)
    if etapa in ("posts", "tudo"):
        etapa_posts(p)
    if etapa in ("imagens", "tudo"):
        etapa_imagens(p)
    print("resumo:", {k: len(v) for k, v in p.items()})


if __name__ == "__main__":
    main()
