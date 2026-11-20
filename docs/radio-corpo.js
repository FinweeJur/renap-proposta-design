(function () {
  "use strict";

  var raiz = document.querySelector("[data-radio]");
  if (!raiz) return;

  var lista = raiz.querySelector("[data-radio-lista]");
  var busca = raiz.querySelector("[data-radio-busca]");
  var botao = raiz.querySelector("[data-radio-tocar]");
  var volume = raiz.querySelector("[data-radio-volume]");
  var nomeEl = raiz.querySelector("[data-radio-nome]");
  var metaEl = raiz.querySelector("[data-radio-meta]");
  var statusEl = raiz.querySelector("[data-radio-status]");
  var contagem = raiz.querySelector("[data-radio-contagem]");

  var audio = raiz.querySelector("[data-radio-audio]");
  var atual = null;
  var hls = null;
  var hlsPronto = false;

  var ORDEM = ["Norte", "Nordeste", "Centro-Oeste", "Sul", "Sudeste", "America Latina", "Africa", "Asia e Caribe"];
  var ROTULO = {
    federal: "pública federal",
    universitaria: "universitária",
    comunitaria: "comunitária",
    popular: "popular"
  };

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  function aviso(texto) {
    if (statusEl) statusEl.textContent = texto || "";
  }

  /* Cada troca de emissora usa um <audio> novo. Sem isso, o MediaSource do
     hls.js antigo continua preso ao elemento e o som da estação anterior
     segue tocando mesmo depois de destruir a instância. */
  function audioNovo() {
    var antigo = audio;
    var novo = document.createElement("audio");
    novo.setAttribute("data-radio-audio", "");
    novo.preload = "none";
    novo.volume = Number(volume && volume.value ? volume.value : 70) / 100;
    novo.addEventListener("error", function () {
      if (!novo.src) return;
      aviso("Esta estação não abriu. Tente outra.");
      botao.dataset.tocando = "false";
    });
    if (antigo && antigo.parentNode) antigo.parentNode.replaceChild(novo, antigo);
    else raiz.appendChild(novo);
    return novo;
  }

  function limpa() {
    if (hls) { hls.destroy(); hls = null; }
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
  }

  function desenhaLista(filtro) {
    var termo = (filtro || "").toLowerCase().trim();
    lista.innerHTML = "";
    var mostrando = 0;

    ORDEM.forEach(function (regiao) {
      var doRegiao = ESTACOES.filter(function (e) {
        if (e.regiao !== regiao) return false;
        if (!termo) return true;
        var alvo = [e.nome, e.cidade, e.uf, e.tipo, ROTULO[e.tipo]].join(" ").toLowerCase();
        return alvo.indexOf(termo) > -1;
      });
      if (!doRegiao.length) return;

      lista.appendChild(el("p", "rp__grupo", regiao));
      doRegiao.forEach(function (e) {
        mostrando++;
        var b = el("button", "rp__item");
        b.type = "button";
        b.dataset.id = e.id;
        if (atual && atual.id === e.id) b.dataset.tocando = botao.dataset.tocando || "false";

        b.appendChild(el("span", "rp__item-nome", e.nome));
        b.appendChild(el("span", "rp__item-meta", [ROTULO[e.tipo], e.cidade, e.uf].filter(Boolean).join(" · ")));
        b.addEventListener("click", function () { escolhe(e); });
        lista.appendChild(b);
      });
    });

    if (!mostrando) lista.appendChild(el("p", "rp__vazio", "Nenhuma estação com esse nome."));
    if (contagem) contagem.textContent = mostrando + " de " + ESTACOES.length;
  }

  function carregaHls() {
    return new Promise(function (resolve, reject) {
      if (hlsPronto || window.Hls) { hlsPronto = true; resolve(); return; }
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js";
      s.onload = function () { hlsPronto = true; resolve(); };
      s.onerror = function () { reject(new Error("hls")); };
      document.head.appendChild(s);
    });
  }

  function toca(e) {
    limpa();
    audio = audioNovo();
    atual = e;

    nomeEl.textContent = e.nome;
    metaEl.textContent = [ROTULO[e.tipo], e.cidade, e.uf].filter(Boolean).join(" · ");
    aviso("Conectando…");
    botao.dataset.tocando = "false";

    var nativo = audio.canPlayType("application/vnd.apple.mpegurl") !== "";

    function comAudio() {
      audio.src = e.stream;
      audio.play().then(function () {
        botao.dataset.tocando = "true";
        botao.setAttribute("aria-label", "Pausar " + e.nome);
        aviso("Tocando ao vivo.");
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: e.nome,
            artist: "Rádio · RENAP",
            album: [e.cidade, e.uf].filter(Boolean).join(" / ")
          });
        }
      }).catch(function () {
        aviso("O navegador pediu um toque a mais. Toque em tocar.");
      });
    }

    if (e.formato === "hls" && !nativo) {
      carregaHls().then(function () {
        if (window.Hls && window.Hls.isSupported()) {
          hls = new window.Hls({ lowLatencyMode: false });
          hls.loadSource(e.stream);
          hls.attachMedia(audio);
          hls.on(window.Hls.Events.MANIFEST_PARSED, comAudio);
          hls.on(window.Hls.Events.ERROR, function (_evt, dados) {
            if (dados && dados.fatal) aviso("Esta estação não abriu. Tente outra.");
          });
        } else {
          comAudio();
        }
      }).catch(function () { aviso("Sem a biblioteca de HLS: esta estação não toca aqui."); });
      return;
    }

    comAudio();
  }

  function escolhe(e) {
    if (atual && atual.id === e.id) {
      if (botao.dataset.tocando === "true") { pausa(); }
      else { toca(e); }
      return;
    }
    toca(e);
    desenhaLista(busca.value);
  }

  function pausa() {
    audio.pause();
    botao.dataset.tocando = "false";
    botao.setAttribute("aria-label", "Tocar");
    aviso("Pausado.");
    desenhaLista(busca.value);
  }

  botao.addEventListener("click", function () {
    if (!atual) { toca(ESTACOES[0]); desenhaLista(busca.value); return; }
    if (botao.dataset.tocando === "true") pausa(); else toca(atual);
  });

  busca.addEventListener("input", function () { desenhaLista(busca.value); });

  if (volume) {
    volume.addEventListener("input", function () {
      audio.volume = Number(volume.value) / 100;
      try { localStorage.setItem("renap-volume", volume.value); } catch (err) { /* modo privado */ }
    });
    try {
      var v = localStorage.getItem("renap-volume");
      if (v !== null) { volume.value = v; }
    } catch (err) { /* modo privado */ }
    audio.volume = Number(volume.value) / 100;
  }

  desenhaLista("");
})();
