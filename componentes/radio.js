/**
 * RÁDIO — player estático com o acervo do Controle Popular.
 *
 * Fonte do acervo: apps/web/lib/radio/estacoes.ts do portal
 * (streams conferidos em 2026-10-03; só HTTPS, por causa de conteúdo misto).
 *
 * Por que sem framework: a apresentação é um HTML só e precisa abrir no
 * celular. HLS (.m3u8) não toca no Chrome: o hls.js entra sob demanda, só
 * quando alguém escolhe uma emissora nesse formato.
 *
 * Contratos: [data-radio] raiz, [data-radio-audio] <audio>, [data-radio-lista],
 * [data-radio-busca], [data-radio-tocar], [data-radio-volume], [data-radio-nome].
 */
var ESTACOES = [{"id":"radio-nacional-rio","nome":"Rádio Nacional do Rio de Janeiro","tipo":"federal","regiao":"Sudeste","uf":"RJ","cidade":"Rio de Janeiro","stream":"https://radionacionalrio-stream.ebc.com.br/ebc/radionacionalriodejaneiro/playlist.m3u8","formato":"hls","site":"https://radionacional.ebc.com.br/"},{"id":"radio-nacional-amazonia","nome":"Rádio Nacional da Amazônia","tipo":"federal","regiao":"Norte","cidade":"Brasília","stream":"https://radionacionalamazonia-stream.ebc.com.br/ebc/radionacionalamazonia/playlist.m3u8","formato":"hls","site":"https://radionacional.ebc.com.br/"},{"id":"radio-nacional-brasilia","nome":"Rádio Nacional de Brasília","tipo":"federal","regiao":"Centro-Oeste","uf":"DF","cidade":"Brasília","stream":"https://radionacionalfm-stream.ebc.com.br/ebc/radionacionalfm/playlist.m3u8","formato":"hls","site":"https://radionacional.ebc.com.br/"},{"id":"radio-nacional-alto-solimoes","nome":"Rádio Nacional do Alto Solimões","tipo":"federal","regiao":"Norte","uf":"AM","cidade":"Tabatinga","stream":"https://radionacionalaltosolimoes-stream.ebc.com.br/ebc/radionacionalaltosolimoes/playlist.m3u8","formato":"hls","site":"https://radionacional.ebc.com.br/"},{"id":"radio-mec-fm","nome":"Rádio MEC FM","tipo":"federal","regiao":"Sudeste","uf":"RJ","cidade":"Rio de Janeiro","stream":"https://radiomecfm-stream.ebc.com.br/ebc/radiomecfm/playlist.m3u8","formato":"hls","site":"https://radiomec.ebc.com.br/"},{"id":"radio-mec-am","nome":"Rádio MEC AM","tipo":"federal","regiao":"Sudeste","uf":"RJ","cidade":"Rio de Janeiro","stream":"https://radiomec-stream.ebc.com.br/ebc/radiomec/playlist.m3u8","formato":"hls","site":"https://radiomec.ebc.com.br/"},{"id":"radio-camara","nome":"Rádio Câmara","tipo":"federal","regiao":"Centro-Oeste","uf":"DF","cidade":"Brasília","stream":"https://stream3.camara.gov.br/radiocamara1t64/manifest.m3u8","formato":"hls","site":"https://www.camara.leg.br/radio/"},{"id":"radio-senado","nome":"Rádio Senado","tipo":"federal","regiao":"Centro-Oeste","uf":"DF","cidade":"Brasília","stream":"https://www12.senado.leg.br/radiosenado/fmaac/playlist.m3u8","formato":"hls","site":"https://www12.senado.leg.br/radiosenado"},{"id":"radio-ufmg-educativa","nome":"Rádio UFMG Educativa","tipo":"universitaria","regiao":"Sudeste","uf":"MG","cidade":"Belo Horizonte","stream":"https://www3.ufmg.br/streamingradioaovivo/aovivo.mp3","formato":"mp3","site":"https://www.ufmg.br/comunicacao/radio-ufmg-educativa/"},{"id":"radio-ufrj","nome":"Rádio UFRJ","tipo":"universitaria","regiao":"Sudeste","uf":"RJ","cidade":"Rio de Janeiro","stream":"https://servidor21.brlogic.com:7712/live","formato":"mp3","site":"https://radio.ufrj.br/"},{"id":"radio-usp","nome":"Rádio USP","tipo":"universitaria","regiao":"Sudeste","uf":"SP","cidade":"São Paulo","stream":"https://flow.emm.usp.br:8008/radiousp-128.mp3","formato":"mp3","site":"https://jornal.usp.br/radio/"},{"id":"radio-ufvjm","nome":"Rádio Universitária 99.7 FM (UFVJM)","tipo":"universitaria","regiao":"Sudeste","uf":"MG","cidade":"Diamantina","stream":"https://radio.garden/api/ara/content/listen/NBaC2vIa/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/radio-universitaria-99-7-fm-ufvjm/NBaC2vIa"},{"id":"radio-ufop","nome":"Rádio UFOP 103.5 FM","tipo":"universitaria","regiao":"Sudeste","uf":"MG","cidade":"Mariana","stream":"https://radio.garden/api/ara/content/listen/Wze7tSY1/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/radio-ufop-103-5-fm/Wze7tSY1"},{"id":"radio-ufv","nome":"Rádio Universitária 100.7 FM (UFV)","tipo":"universitaria","regiao":"Sudeste","uf":"MG","cidade":"Viçosa","stream":"https://radio.garden/api/ara/content/listen/pb1zPC0G/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/radio-universitaria-fm-100-7/pb1zPC0G"},{"id":"radio-ufu","nome":"Rádio Universitária 107.5 FM (UFU)","tipo":"universitaria","regiao":"Sudeste","uf":"MG","cidade":"Uberlândia","stream":"https://servidor33.brlogic.com:7006/live","formato":"aac","site":"https://www.ufu.br/"},{"id":"radio-ufes","nome":"Universitária 104.7 FM (UFES)","tipo":"universitaria","regiao":"Sudeste","uf":"ES","cidade":"Vitória","stream":"https://everest.radionanet.com:8990/stream","formato":"mp3","site":"https://www.ufes.br/"},{"id":"radio-ufg","nome":"Rádio Universitária UFG","tipo":"universitaria","regiao":"Centro-Oeste","uf":"GO","cidade":"Goiânia","stream":"https://streaming.ufg.br:8443/radiouniversitaria","formato":"aac","site":"https://radio.ufg.br/"},{"id":"radio-ufal","nome":"Rádio UFAL","tipo":"universitaria","regiao":"Nordeste","uf":"AL","cidade":"Maceió","stream":"https://directradios.net/proxy/ufal?mp=/stream","formato":"mp3","site":"https://www.ufal.br/"},{"id":"radio-ufc","nome":"Rádio Universitária 107.9 FM (UFC)","tipo":"universitaria","regiao":"Nordeste","uf":"CE","cidade":"Fortaleza","stream":"https://radio.garden/api/ara/content/listen/CB-dhyZV/channel.mp3","formato":"aac","site":"https://radio.garden/listen/radio-universitaria-fm-107-9/CB-dhyZV"},{"id":"radio-ufdpar","nome":"Rádio Universitária UFDPar","tipo":"universitaria","regiao":"Nordeste","uf":"PI","cidade":"Parnaíba","stream":"https://radio.garden/api/ara/content/listen/5P4kx2Bu/channel.mp3","formato":"aac","site":"https://radio.garden/listen/radio-universitaria-ufd-par/5P4kx2Bu"},{"id":"radio-ufpb","nome":"Universidade FM 105.1 (UFPB)","tipo":"universitaria","regiao":"Nordeste","uf":"PB","cidade":"Patos","stream":"https://radio.garden/api/ara/content/listen/QQmPYkiU/channel.mp3","formato":"aac","site":"https://radio.garden/listen/universidade-fm-105-1/QQmPYkiU"},{"id":"radio-ufpel","nome":"Rádio Universidade AM 1160 (UFPel)","tipo":"universitaria","regiao":"Sul","uf":"RS","cidade":"Pelotas","stream":"https://radio.garden/api/ara/content/listen/mycJhvB2/channel.mp3","formato":"aac","site":"https://radio.garden/listen/radio-universidade-am-1160/mycJhvB2"},{"id":"radio-ufms","nome":"Rádio Educativa UFMS","tipo":"universitaria","regiao":"Centro-Oeste","uf":"MS","cidade":"Campo Grande","stream":"https://radio.garden/api/ara/content/listen/vJV74IgR/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/radio-educativa-ufms/vJV74IgR"},{"id":"radio-ufscar","nome":"Rádio UFSCar 95.3 FM","tipo":"universitaria","regiao":"Sudeste","uf":"SP","cidade":"São Carlos","stream":"https://radio.garden/api/ara/content/listen/d8BXRQos/channel.mp3","formato":"ogg","site":"https://radio.garden/listen/radio-ufs-car-95-3-fm/d8BXRQos"},{"id":"radio-ufcg","nome":"Web Rádio UFCG Conecta","tipo":"universitaria","regiao":"Nordeste","uf":"PB","cidade":"Campina Grande","stream":"https://radio.garden/api/ara/content/listen/UufypBoG/channel.mp3","formato":"aac","site":"https://radio.garden/listen/web-radio-ufcg-conecta/UufypBoG"},{"id":"radio-uff","nome":"Rádio Pop Goiaba (UFF)","tipo":"universitaria","regiao":"Sudeste","uf":"RJ","cidade":"Niterói","stream":"https://radio.garden/api/ara/content/listen/tTxCph6T/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/radio-pop-goiaba-uff/tTxCph6T"},{"id":"radio-udesc","nome":"Rádio UDESC FM 100.1","tipo":"universitaria","regiao":"Sul","uf":"SC","cidade":"Florianópolis","stream":"https://radio.garden/api/ara/content/listen/OoNClJ3c/channel.mp3","formato":"aac","site":"https://radio.garden/listen/radio-udesc-fm-100-1/OoNClJ3c"},{"id":"radio-ufabc","nome":"Web Rádio UFABC","tipo":"universitaria","regiao":"Sudeste","uf":"SP","cidade":"Santo André","stream":"https://radio.garden/api/ara/content/listen/2w6sZC7l/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/web-radio-ufabc-electronic-mix/2w6sZC7l"},{"id":"radio-uel","nome":"UEL FM 107.9","tipo":"universitaria","regiao":"Sul","uf":"PR","cidade":"Londrina","stream":"https://radio.garden/api/ara/content/listen/Ugy0RBwG/channel.mp3","formato":"mp3","site":"https://radio.garden/listen/uel-fm-107-9/Ugy0RBwG"},{"id":"radio-favela","nome":"Autêntica Favela FM (Rádio Favela)","tipo":"comunitaria","regiao":"Sudeste","uf":"MG","cidade":"Belo Horizonte","stream":"https://radio.garden/api/ara/content/listen/9nuoTjkL/channel.mp3","formato":"mp3","site":"https://www.autenticafavelafm106-7.com"},{"id":"radio-brasil-de-fato","nome":"Rádio Brasil de Fato","tipo":"comunitaria","regiao":"Sudeste","cidade":"Nacional","stream":"https://s09.hstbr.net:8238/live","formato":"mp3","site":"https://www.brasildefato.com.br/"},{"id":"radio-rebelde","nome":"Radio Rebelde","tipo":"popular","regiao":"America Latina","cidade":"Havana","stream":"https://icecast.teveo.cu/kHKL7tWd","formato":"mp3","site":"https://www.radiorebelde.cu/"},{"id":"radio-nacional-argentina","nome":"LRA1 Radio Nacional Argentina","tipo":"popular","regiao":"America Latina","cidade":"Buenos Aires","stream":"https://sa.mp3.icecast.magma.edge-access.net/sc_rad1","formato":"mp3","site":"https://www.radionacional.com.ar/"},{"id":"fm-la-tribu","nome":"FM La Tribu","tipo":"comunitaria","regiao":"America Latina","cidade":"Buenos Aires","stream":"https://icecast.zeclogiccloud.com.de/fmlatribu","formato":"mp3","site":"https://fmlatribu.com/"},{"id":"radio-cuyum","nome":"Radio Comunitaria Cuyum","tipo":"comunitaria","regiao":"America Latina","cidade":"Mendoza","stream":"https://radios.liberaturadio.org/Cuyum","formato":"mp3","site":"https://radios.liberaturadio.org/"},{"id":"radio-yaravi","nome":"Radio Yaraví","tipo":"comunitaria","regiao":"America Latina","cidade":"Arequipa","stream":"https://tupanel.info/stream/radioyaravi/stream","formato":"aac","site":"https://www.radioyaravi.com/"},{"id":"radio-cumbia-mix","nome":"Radio Cumbia Mix","tipo":"popular","regiao":"America Latina","cidade":"Lima","stream":"https://mdstrm.com/audio/6598b6ab95a235085823b24f/icecast.audio","formato":"aac","site":"https://radiocumbiamix.com/"},{"id":"lm-radio-mocambique","nome":"LM Radio Moçambique","tipo":"popular","regiao":"Africa","cidade":"Maputo","stream":"https://edge.iono.fm/xice/392_medium.mp3","formato":"mp3","site":"https://lmradio.co.mz/"},{"id":"timtimol-fm","nome":"Timtimol FM","tipo":"comunitaria","regiao":"Africa","cidade":"Ourossogui","stream":"https://stream.zeno.fm/4yx608hnu1duv","formato":"mp3","site":"https://zeno.fm/radio/timtimol-fm/"},{"id":"oroko-radio","nome":"Oroko Radio","tipo":"comunitaria","regiao":"Africa","cidade":"Acra","stream":"https://oroko-radio.radiocult.fm/stream","formato":"mp3","site":"https://oroko-radio.radiocult.fm/"},{"id":"helderberg-fm","nome":"Helderberg FM","tipo":"comunitaria","regiao":"Africa","cidade":"Somerset West","stream":"https://helderberg.highquality.radiostream.co.za/","formato":"mp3","site":"https://www.helderbergfm.co.za/"},{"id":"lagosjump-radio","nome":"LagosJump Radio","tipo":"popular","regiao":"Africa","cidade":"Lagos","stream":"https://radio.lagosjumpradio.com/listen/lagosjump_radio/radio.mp3","formato":"mp3","site":"https://lagosjumpradio.com/"},{"id":"radio-alhara","nome":"Radio Al Hara","tipo":"comunitaria","regiao":"Asia e Caribe","cidade":"Ramallah","stream":"https://n02.radiojar.com/78cxy6wkxtzuv","formato":"mp3","site":"https://www.radioalhara.net/"},{"id":"irie-fm","nome":"Irie FM","tipo":"popular","regiao":"Asia e Caribe","cidade":"Ocho Rios","stream":"https://stream.iriefm.net:8008/stream","formato":"mp3","site":"https://iriefm.net/"},{"id":"fe-y-alegria-puerto-la-cruz","nome":"Fe y Alegría Puerto La Cruz 101.3 FM","tipo":"comunitaria","regiao":"America Latina","cidade":"Puerto La Cruz","stream":"https://radio.garden/api/ara/content/listen/6L79J6xl/channel.mp3","formato":"mp3","site":"https://radios.feyalegrianoticias.com/puerto-la-cruz/"},{"id":"fe-y-alegria-maracaibo","nome":"Fe y Alegría Maracaibo 88.1 FM","tipo":"comunitaria","regiao":"America Latina","cidade":"Maracaibo","stream":"https://radio.garden/api/ara/content/listen/oynXOcov/channel.mp3","formato":"mp3","site":"https://radios.feyalegrianoticias.com/maracaibo-fm/"},{"id":"radio-folclorllanero","nome":"Radio Folclorllanero","tipo":"popular","regiao":"America Latina","stream":"https://stream.zeno.fm/hcvjvmprjveuv","formato":"mp3","site":"https://www.radiofolclorllanero.com/"},{"id":"radio-comunitaria-gurupa","nome":"Rádio Comunitária de Gurupá 87.9 FM","tipo":"comunitaria","regiao":"Norte","uf":"PA","cidade":"Gurupá","stream":"https://radio.garden/api/ara/content/listen/BDGUBB5D/channel.mp3","formato":"mp3","site":"https://radiocomunitariagurupa87.minharadio.fm"},{"id":"radio-comunitaria-voz-popular","nome":"Rádio Comunitária Voz Popular","tipo":"comunitaria","regiao":"Nordeste","uf":"PB","cidade":"João Pessoa","stream":"https://radio.garden/api/ara/content/listen/19QyXe1G/channel.mp3","formato":"mp3","site":"https://institutovozpopular.webnode.page"},{"id":"portal-roots-reggae","nome":"Portal Roots Reggae","tipo":"popular","regiao":"Nordeste","uf":"MA","cidade":"São Luís","stream":"https://radio.garden/api/ara/content/listen/xTBSA1nh/channel.mp3","formato":"mp3","site":"https://portalradiorootsreggae.blogspot.com"},{"id":"radio-clube-fm-recife","nome":"Rádio Clube de Pernambuco 99.1 FM","tipo":"popular","regiao":"Nordeste","uf":"PE","cidade":"Recife","stream":"https://radio.saopaulo01.com.br/8016/stream","formato":"aac","site":"https://clubepe.fm/"},{"id":"radio-comunitaria-aconchego","nome":"Rádio Comunitária Aconchego","tipo":"comunitaria","regiao":"Nordeste","uf":"PE","cidade":"Recife","stream":"https://fm.radioaconchego.org","formato":"mp3","site":"https://radioaconchego.org/"}];

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

  /* Para TODO áudio da página. É o cinto de segurança: se sobrou um elemento
     de uma troca anterior (ou de outra aba interna), ele cala aqui. */
  function pararTudo() {
    limpa();
    var todos = document.querySelectorAll("audio");
    for (var i = 0; i < todos.length; i++) {
      try {
        todos[i].pause();
        if (todos[i] !== audio) { todos[i].removeAttribute("src"); todos[i].load(); }
      } catch (err) { /* elemento já descartado */ }
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
    pararTudo();
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

  var parar = raiz.querySelector("[data-radio-parar]");
  if (parar) {
    parar.addEventListener("click", function () {
      pararTudo();
      audio = audioNovo();
      botao.dataset.tocando = "false";
      botao.setAttribute("aria-label", "Tocar rádio");
      aviso("Parado.");
      desenhaLista(busca.value);
    });
  }

  /* Saiu da página? O áudio não pode continuar no fone de ninguém. */
  window.addEventListener("pagehide", pararTudo);
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
