/**
 * shell.js — comportamento da casca: navbar, sumário, tabela, robô e scroll.
 *
 * POR QUE UM ARQUIVO SÓ: são comportamentos pequenos e independentes; separar
 * em cinco arquivos criaria cinco <script> e ordem de carregamento para
 * manter. Tudo é progressivo: sem JS, a página continua legível, a tabela
 * mostra a ordem do HTML e o sumário continua sendo links.
 *
 * USO
 *   <script src="componentes/shell.js" defer></script>
 *
 * CONTRATOS (data attributes)
 *   [data-progresso]            barra de progresso do topo
 *   .sumario__lista a           links do sumário (scrollspy)
 *   [data-acao="topo|anterior|proxima"]   botões do sumário
 *   [data-sumario-toggle]       abre/fecha o sumário no celular
 *   [data-menu-toggle]          abre/fecha a gaveta da navbar
 *   table[data-ordenavel]       tabela ordenável (th > button[data-ordenar])
 *   [data-robo]                 raiz do robô; [data-robo-toggle], [data-robo-form]
 *   [data-revelar]              bloco que aparece ao entrar na tela
 */
(function () {
  "use strict";

  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
  var comportamento = function () {
    return reduzir.matches ? "auto" : "smooth";
  };

  /* ── Barra de progresso da leitura ──────────────────────────────────── */
  function ligarProgresso() {
    var barra = document.querySelector("[data-progresso]");
    if (!barra) return;
    var agendado = false;
    function pintar() {
      agendado = false;
      var altura = document.documentElement.scrollHeight - window.innerHeight;
      var p = altura > 0 ? window.scrollY / altura : 0;
      barra.style.transform = "scaleX(" + Math.min(1, Math.max(0, p)) + ")";
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!agendado) {
          agendado = true;
          requestAnimationFrame(pintar);
        }
      },
      { passive: true }
    );
    pintar();
  }

  /* ── Sumário: scrollspy e botões Topo/Anterior/Próxima ─────────────── */
  function ligarSumario() {
    var sumario = document.querySelector(".sumario");
    if (!sumario) return;

    var links = Array.prototype.slice.call(
      sumario.querySelectorAll('.sumario__lista a[href^="#"]')
    );
    var alvos = links
      .map(function (a) {
        return document.getElementById(a.getAttribute("href").slice(1));
      })
      .filter(Boolean);

    if ("IntersectionObserver" in window && alvos.length) {
      var observador = new IntersectionObserver(
        function (entradas) {
          entradas.forEach(function (e) {
            if (!e.isIntersecting) return;
            links.forEach(function (a) {
              a.classList.toggle(
                "is-ativo",
                a.getAttribute("href") === "#" + e.target.id
              );
            });
          });
        },
        { rootMargin: "-18% 0px -70% 0px" }
      );
      alvos.forEach(function (el) {
        observador.observe(el);
      });
    }

    function irPara(el) {
      if (!el) return;
      el.scrollIntoView({ behavior: comportamento(), block: "start" });
      // Foco por teclado acompanha o salto (o título recebe tabindex no HTML).
      if (el.hasAttribute("tabindex")) el.focus({ preventScroll: true });
    }

    /** Seção visível AGORA, pela posição da rolagem.
     *  O scrollspy é assíncrono (IntersectionObserver) e chegaria atrasado no
     *  clique duplo "Próxima, Próxima" — medido 18/11/2026. */
    function indiceVisivel() {
      var y = window.scrollY + 100;
      var indice = -1;
      alvos.forEach(function (el, i) {
        if (el.getBoundingClientRect().top + window.scrollY <= y) indice = i;
      });
      return indice;
    }

    sumario.querySelectorAll("[data-acao]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        var acao = botao.dataset.acao;
        if (acao === "topo") {
          window.scrollTo({ top: 0, behavior: comportamento() });
          return;
        }
        var atual = indiceVisivel();
        if (atual < 0) {
          // Nada visto ainda: "próxima" vai para a primeira, "anterior" para a última.
          irPara(acao === "proxima" ? alvos[0] : alvos[alvos.length - 1]);
          return;
        }
        var proximo = acao === "proxima" ? atual + 1 : atual - 1;
        if (proximo >= 0 && proximo < alvos.length) irPara(alvos[proximo]);
      });
    });

    var toggle = sumario.querySelector("[data-sumario-toggle]");
    var lista = sumario.querySelector(".sumario__lista");
    if (toggle && lista) {
      // No celular o sumário nasce recolhido: a caixa aberta ocuparia a
      // primeira tela antes do título da página (medido 18/11/2026).
      if (window.matchMedia("(max-width: 1079px)").matches) {
        lista.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
      toggle.addEventListener("click", function () {
        var aberto = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!aberto));
        lista.hidden = aberto;
      });
    }
  }

  /* ── Gaveta da navbar ───────────────────────────────────────────────── */
  function ligarMenu() {
    var botao = document.querySelector("[data-menu-toggle]");
    var gaveta = document.querySelector("[data-gaveta]");
    if (!botao || !gaveta) return;
    botao.addEventListener("click", function () {
      var aberta = gaveta.dataset.aberta === "true";
      gaveta.dataset.aberta = String(!aberta);
      botao.setAttribute("aria-expanded", String(!aberta));
    });
    gaveta.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        gaveta.dataset.aberta = "false";
        botao.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Tabela ordenável ───────────────────────────────────────────────── */
  function valorDaCelula(td) {
    if (td.dataset.valor !== undefined) return td.dataset.valor;
    return td.textContent.trim();
  }

  function comparar(a, b, tipo) {
    if (tipo === "numero") {
      return parseFloat(a.replace(/[^\d,.-]/g, "").replace(",", ".")) -
        parseFloat(b.replace(/[^\d,.-]/g, "").replace(",", "."));
    }
    if (tipo === "data") {
      var da = a.split("/").reverse().join("-");
      var db = b.split("/").reverse().join("-");
      return new Date(da) - new Date(db);
    }
    return a.localeCompare(b, "pt-BR", { sensitivity: "base" });
  }

  function ligarTabela() {
    document.querySelectorAll("table[data-ordenavel]").forEach(function (tabela) {
      var corpo = tabela.tBodies[0];
      if (!corpo) return;

      tabela.querySelectorAll("th button[data-ordenar]").forEach(function (botao) {
        botao.addEventListener("click", function () {
          var th = botao.closest("th");
          var coluna = Array.prototype.indexOf.call(th.parentElement.children, th);
          var tipo = botao.dataset.ordenar || "texto";
          var atual = th.getAttribute("aria-sort");
          var crescente = atual !== "ascending";

          tabela.querySelectorAll("th").forEach(function (outro) {
            outro.removeAttribute("aria-sort");
            var seta = outro.querySelector(".seta");
            if (seta) seta.textContent = "↕";
          });
          th.setAttribute("aria-sort", crescente ? "ascending" : "descending");
          var seta = th.querySelector(".seta");
          if (seta) seta.textContent = crescente ? "↑" : "↓";

          var linhas = Array.prototype.slice.call(corpo.rows);
          linhas.sort(function (la, lb) {
            var va = valorDaCelula(la.cells[coluna]);
            var vb = valorDaCelula(lb.cells[coluna]);
            var r = comparar(va, vb, tipo);
            return crescente ? r : -r;
          });
          linhas.forEach(function (linha) {
            corpo.appendChild(linha);
          });
        });
      });
    });
  }

  /* ── Robô (demonstração de UI; sem API) ─────────────────────────────── */
  function ligarRobo() {
    var raiz = document.querySelector("[data-robo]");
    if (!raiz) return;
    var painel = raiz.querySelector("[data-robo-painel]");
    var toggle = raiz.querySelector("[data-robo-toggle]");
    var form = raiz.querySelector("[data-robo-form]");
    var entrada = raiz.querySelector("[data-robo-input]");
    var mensagens = raiz.querySelector("[data-robo-mensagens]");
    var fechar = raiz.querySelector("[data-robo-fechar]");
    var pensando = raiz.querySelector("[data-robo-pensando]");

    function abrir(estado) {
      painel.dataset.aberto = String(estado);
      toggle.setAttribute("aria-expanded", String(estado));
      if (estado && entrada) entrada.focus();
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        abrir(painel.dataset.aberto !== "true");
      });
    }
    if (fechar) fechar.addEventListener("click", function () { abrir(false); });

    function bolha(texto, deQuem) {
      var p = document.createElement("p");
      p.className = "robo__bolha robo__bolha--" + deQuem;
      p.textContent = texto;
      mensagens.appendChild(p);
      mensagens.scrollTop = mensagens.scrollHeight;
    }

    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var texto = (entrada.value || "").trim();
        if (!texto) return;
        bolha(texto, "pessoa");
        entrada.value = "";
        // O orbe mostra "consultando"; a resposta é demonstração, sem rede.
        if (pensando) pensando.hidden = false;
        setTimeout(function () {
          if (pensando) pensando.hidden = true;
          bolha(
            "Esta é uma demonstração de interface. No portal, o robô consulta o acervo e responde com link para a fonte oficial.",
            "robo"
          );
        }, 700);
      });
    }
  }

  /* ── Revelar ao rolar ───────────────────────────────────────────────── */
  function ligarRevelar() {
    var alvos = document.querySelectorAll("[data-revelar]");
    if (!alvos.length) return;
    if (reduzir.matches || !("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.dataset.visivel = "true"; });
      return;
    }
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.dataset.visivel = "true";
          observador.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    alvos.forEach(function (el) {
      el.classList.add("revelar");
      observador.observe(el);
    });
  }

  function iniciar() {
    ligarProgresso();
    ligarSumario();
    ligarMenu();
    ligarTabela();
    ligarRobo();
    ligarRevelar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
