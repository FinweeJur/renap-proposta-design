/**
 * magnet.js — ímã de ponteiro, brilho que segue o cursor e barra animada.
 *
 * POR QUE UM ARQUIVO SÓ: os três efeitos dependem da posição do ponteiro ou do
 * momento em que o bloco entra na tela. Um listener global para todos os
 * elementos custa o mesmo com 1 ou com 40 — o que não acontece se cada
 * elemento montar o próprio listener (foi o defeito do componente original do
 * React Bits: um mousemove em `window` POR INSTÂNCIA e um re-render por pixel).
 *
 * REGRAS DE QUALIDADE:
 * - efeito é decoração: o conteúdo já está no HTML e legível sem JS;
 * - `prefers-reduced-motion` desliga o ímã, o brilho e a animação da barra;
 * - só ponteiro fino (mouse). No dedo, nada se move;
 * - o deslocamento vai direto para o `transform` (sem estado de framework).
 *
 * USO
 *   <script src="efeitos/magnet.js" defer></script>
 *
 *   <a class="magnet" data-magnet data-forca="0.25" data-afastamento="48">…</a>
 *   <div class="brilho" data-brilho>…</div>
 *   <div class="barra"><div class="barra__preenchida" style="--valor:73%"></div></div>
 */
(function () {
  "use strict";

  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)");
  var semMovimento = function () {
    return reduzir.matches || !ponteiroFino.matches;
  };

  /* ───────────────────────────── ÍMÃ + BRILHO ───────────────────────── */

  var imas = [];
  var brilhos = [];
  var ponteiro = null;
  var quadro = 0;

  function registrarImas() {
    document.querySelectorAll("[data-magnet]").forEach(function (el) {
      if (el.__cpMagnet) return;
      el.__cpMagnet = true;
      imas.push({
        el: el,
        forca: Number(el.dataset.forca || 0.25),
        afastamento: Number(el.dataset.afastamento || 48),
        ativo: false,
        x: 0,
        y: 0,
      });
    });
  }

  function registrarBrilhos() {
    document.querySelectorAll("[data-brilho]").forEach(function (el) {
      if (el.__cpBrilho) return;
      el.__cpBrilho = true;
      brilhos.push(el);
    });
  }

  function quadroDePintura() {
    quadro = 0;
    if (!ponteiro || semMovimento()) return;

    imas.forEach(function (i) {
      var r = i.el.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var perto =
        Math.abs(cx - ponteiro.x) < r.width / 2 + i.afastamento &&
        Math.abs(cy - ponteiro.y) < r.height / 2 + i.afastamento;

      if (perto) {
        var x = (ponteiro.x - cx) * i.forca;
        var y = (ponteiro.y - cy) * i.forca;
        if (!i.ativo) {
          i.ativo = true;
          i.el.classList.add("magnet--ativo");
        }
        if (Math.abs(x - i.x) > 0.5 || Math.abs(y - i.y) > 0.5) {
          i.x = x;
          i.y = y;
          i.el.style.transform = "translate3d(" + x + "px," + y + "px,0)";
        }
      } else if (i.ativo) {
        i.ativo = false;
        i.x = 0;
        i.y = 0;
        i.el.classList.remove("magnet--ativo");
        i.el.style.transform = "";
      }
    });

    brilhos.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var dentro =
        ponteiro.x >= r.left &&
        ponteiro.x <= r.right &&
        ponteiro.y >= r.top &&
        ponteiro.y <= r.bottom;
      if (!dentro) return;
      el.style.setProperty("--mx", ((ponteiro.x - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((ponteiro.y - r.top) / r.height) * 100 + "%");
    });
  }

  function agendar() {
    if (!quadro) quadro = requestAnimationFrame(quadroDePintura);
  }

  function aoMover(ev) {
    ponteiro = { x: ev.clientX, y: ev.clientY };
    agendar();
  }

  function aoSair() {
    ponteiro = null;
    imas.forEach(function (i) {
      i.ativo = false;
      i.x = 0;
      i.y = 0;
      i.el.classList.remove("magnet--ativo");
      i.el.style.transform = "";
    });
    agendar();
  }

  /* ─────────────────────────── CONTADOR + BARRA ─────────────────────── */

  function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
    });
  }

  function animarContador(el) {
    var alvo = Number(el.dataset.contador || 0);
    var casas = Number(el.dataset.casas || 0);
    var duracao = Number(el.dataset.duracao || 1600);
    var prefixo = el.dataset.prefixo || "";
    var sufixo = el.dataset.sufixo || "";
    var inicio = 0;
    var t0 = 0;

    function passo(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / duracao);
      var suave = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefixo + formatar(alvo * suave, casas) + sufixo;
      if (p < 1) requestAnimationFrame(passo);
    }

    el.textContent = prefixo + formatar(inicio, casas) + sufixo;
    requestAnimationFrame(passo);
  }

  function revelarBarra(el) {
    var valor = el.style.getPropertyValue("--valor") || "0%";
    el.style.width = "0%";
    // Duas voltas de quadro: o navegador precisa registrar o 0 antes de animar.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.width = valor;
      });
    });
  }

  function preparar() {
    registrarImas();
    registrarBrilhos();

    document.querySelectorAll("[data-contador]").forEach(function (el) {
      if (el.__cpContador) return;
      el.__cpContador = true;
    });

    if (semMovimento()) return; // valores finais já estão no HTML

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          var el = entrada.target;
          observador.unobserve(el);
          if (el.hasAttribute("data-contador")) animarContador(el);
          else revelarBarra(el);
        });
      },
      { rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-contador], .barra__preenchida").forEach(function (el) {
      observador.observe(el);
    });

    if (ponteiroFino.matches) {
      document.addEventListener("pointermove", aoMover, { passive: true });
      document.addEventListener("pointerleave", aoSair);
    }

    // Conteúdo novo (ex.: filtro que re-renderiza) entra sem reiniciar nada.
    var mutacao = new MutationObserver(function () {
      registrarImas();
      registrarBrilhos();
    });
    mutacao.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preparar);
  } else {
    preparar();
  }
})();
