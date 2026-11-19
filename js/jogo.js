// ===== Lógica do jogo (não precisas de mexer aqui) =====
const E = { sala: 0, des: 0, dicas: 0, est: [], pistas: [], tempo: TEMPO_TOTAL, cron: false, mudo: false, equipa: '', t: null, sel: null, prox: 0 };
const $ = s => document.querySelector(s), palco = $('#palco');
const totalDes = JOGO.salas.reduce((n, s) => n + s.desafios.length, 0);

// ----- Som (bips simples, sem ficheiros) -----
let ac;
function bip(f, d = .15) {
  if (E.mudo) return;
  try {
    ac = ac || new AudioContext();
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = f; g.gain.value = .08; o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + d);
  } catch (e) {}
}
const certo = () => { bip(700); setTimeout(() => bip(950), 120); };
const errado = () => bip(200, .3);
$('#som').onclick = () => { E.mudo = !E.mudo; $('#som').textContent = E.mudo ? '🔇' : '🔊'; };

// ----- Utilitários -----
function fala(t) {
  $('#fala').textContent = t;
  $('#avatar').classList.remove('fala'); void $('#avatar').offsetWidth; $('#avatar').classList.add('fala');
}
const mistura = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
function mostra(html) { palco.innerHTML = `<div class="cartao">${html}</div>`; window.scrollTo(0, 0); }
function atualizaBarra() {
  const feitos = JOGO.salas.slice(0, E.sala).reduce((n, s) => n + s.desafios.length, 0) + E.des;
  $('#prog').style.width = feitos / totalDes * 100 + '%';
  $('#estrelas').textContent = '⭐ ' + E.est.reduce((a, b) => a + b, 0);
  $('#chaves').textContent = E.pistas.length ? '🔑 ' + E.pistas.join(' · ') : '';
}
function fundo(s) {
  const r = document.documentElement.style;
  r.setProperty('--c1', s.cores[0]); r.setProperty('--c2', s.cores[1]);
  document.querySelectorAll('.deco').forEach(x => x.remove());
  s.deco.forEach((e, i) => {
    const d = document.createElement('span');
    d.className = 'deco'; d.textContent = e; d.style.left = 8 + i * 24 + '%';
    d.style.animationDuration = 9 + i * 3 + 's'; d.style.animationDelay = -i * 3 + 's';
    document.body.appendChild(d);
  });
}
function confete() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('span');
    c.className = 'conf'; c.textContent = ['🎉', '⭐', '✨', '🎊'][i % 4];
    c.style.left = Math.random() * 100 + 'vw'; c.style.animationDuration = 2 + Math.random() * 2 + 's';
    document.body.appendChild(c); setTimeout(() => c.remove(), 4500);
  }
}
function cronometro() {
  clearInterval(E.t); $('#relogio').textContent = '';
  if (!E.cron) return;
  E.t = setInterval(() => {
    E.tempo--;
    const m = Math.floor(E.tempo / 60), s = E.tempo % 60;
    $('#relogio').textContent = `⏱️ ${m}:${String(s).padStart(2, '0')}`;
    if (E.tempo <= 0) { clearInterval(E.t); $('#relogio').textContent = '⏰'; fala('O tempo acabou, mas não faz mal: continuem a explorar!'); }
  }, 1000);
}

// ----- Ecrãs -----
function inicio() {
  Object.assign(E, { sala: 0, des: 0, dicas: 0, est: [], pistas: [], tempo: TEMPO_TOTAL });
  clearInterval(E.t); $('#relogio').textContent = ''; atualizaBarra();
  fundo({ cores: ['#6c5ce7', '#341f97'], deco: ['🦁', '🐘', '🦒', '🐧'] });
  mostra(`<div class="icone">🏛️</div><h1>${JOGO.titulo}</h1><p>${JOGO.historia}</p>
    <p><label>Nome da equipa:<br><input type="text" id="eq" maxlength="30" placeholder="Os Super Exploradores"></label></p>
    <p><label><input type="checkbox" id="cr"> Jogar com cronómetro (30 minutos)</label></p>
    <p style="text-align:center"><button id="go">Começar a aventura! 🚀</button></p>`);
  fala('Olá! Sou a Coruja Sábia. Vou ajudar-vos a fugir do museu!');
  $('#go').onclick = () => {
    E.equipa = $('#eq').value.replace(/[<>&"]/g, '').trim() || 'Os Exploradores';
    E.cron = $('#cr').checked; cronometro(); fala(`Boa sorte, ${E.equipa}!`); sala();
  };
}

function sala() {
  const s = JOGO.salas[E.sala]; E.des = 0; E.dicas = 0; fundo(s); atualizaBarra();
  mostra(`<div class="icone">${s.icone}</div><h2>Sala ${E.sala + 1}: ${s.nome}</h2><p>${s.intro}</p>
    <p style="text-align:center"><button id="go">Entrar 🚪</button></p>`);
  fala('Esta sala tem 2 desafios. Podem pedir até 3 dicas!');
  $('#go').onclick = desafio;
}

function desafio() {
  const s = JOGO.salas[E.sala], d = s.desafios[E.des]; E.sel = null; E.prox = 0; atualizaBarra();
  mostra(`<h2>${s.icone} ${s.nome} (${E.des + 1}/${s.desafios.length})</h2><p>${d.texto}</p><div id="area"></div><div id="fim"></div>
    <p style="text-align:center"><button id="dica">💡 Dica (${3 - E.dicas} restantes)</button></p>`);
  $('#dica').onclick = () => {
    if (E.dicas >= 3) return fala('Já usaram as 3 dicas desta sala. Vocês conseguem! 💪');
    E.dicas++; fala('💡 ' + d.dica); $('#dica').textContent = `💡 Dica (${3 - E.dicas} restantes)`;
  };
  ({ classificar, escolha, ordenar })[d.tipo](d, $('#area'));
}

function concluir(d) {
  const s = JOGO.salas[E.sala], ultimo = E.des === s.desafios.length - 1;
  certo(); fala('Muito bem! 🎉');
  $('#fim').innerHTML = `<div class="expl">✅ ${d.expl}</div>
    <p style="text-align:center"><button id="seg">${ultimo ? 'Descobrir a pista 🔍' : 'Continuar ➜'}</button></p>`;
  $('#seg').onclick = () => { if (ultimo) salaFeita(); else { E.des++; desafio(); } };
  $('#seg').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function salaFeita() {
  const s = JOGO.salas[E.sala], e = Math.max(1, 3 - E.dicas);
  E.est.push(e); E.pistas.push(s.pista); E.sala++; E.des = 0; atualizaBarra(); confete(); certo();
  mostra(`<div class="icone">🔑</div><h2>Sala concluída!</h2>
    <p style="text-align:center;font-size:2rem">${'⭐'.repeat(e)}</p>
    <p style="text-align:center">Encontraram uma pista escondida: o número <span class="pista">${s.pista}</span><br>Apontem-no pela ordem das salas!</p>
    <p style="text-align:center"><button id="go">${E.sala < JOGO.salas.length ? 'Próxima sala ➜' : 'Ir para a porta final 🚪'}</button></p>`);
  fala('Excelente trabalho de equipa! 👏');
  $('#go').onclick = E.sala < JOGO.salas.length ? sala : porta;
}

function porta() {
  fundo({ cores: ['#2d3436', '#0a0a0a'], deco: ['🔒', '🔑', '🚪'] });
  mostra(`<div class="icone">🚪</div><h2>A porta final</h2>
    <p style="text-align:center">Escrevam as ${E.pistas.length} pistas pela ordem das salas.</p>
    <p style="text-align:center"><input class="codigo" id="cod" inputmode="numeric" maxlength="${E.pistas.length}" autocomplete="off"></p>
    <p style="text-align:center"><button id="abre">Abrir 🔓</button></p>`);
  fala('Estão quase a sair! Qual é o código?');
  $('#abre').onclick = () => {
    if ($('#cod').value.trim() === E.pistas.join('')) return final();
    errado(); $('#cod').classList.add('erro'); setTimeout(() => $('#cod').classList.remove('erro'), 400);
    fala('A porta não abriu. Confirmem as pistas, pela ordem das salas!');
  };
}

function final() {
  clearInterval(E.t); fundo({ cores: ['#f9ca24', '#f0932b'], deco: ['🎉', '🏆', '⭐', '🎈'] }); confete(); certo();
  const tot = E.est.reduce((a, b) => a + b, 0);
  mostra(`<div class="icone">🏆</div><h1>Conseguiram fugir!</h1>
    <div class="cert"><h2>Certificado de Explorador</h2><p>Atribuído à equipa</p><p class="eq">${E.equipa}</p>
    <p>por resolver todos os enigmas do Museu da Vida Selvagem</p><p style="font-size:1.8rem">⭐ ${tot} / ${JOGO.salas.length * 3}</p></div>
    <p style="text-align:center"><button id="imp">🖨️ Imprimir certificado</button> <button id="de">🔄 Jogar outra vez</button></p>`);
  fala('Parabéns, Exploradores! Aprenderam imenso sobre os animais! 🦉');
  $('#imp').onclick = () => window.print(); $('#de').onclick = inicio;
}

// ----- Tipos de desafio -----
function classificar(d, a) {
  let falta = d.itens.length;
  a.innerHTML = `<div class="grelha">${d.itens.map((x, i) => `<div class="item" tabindex="0" data-i="${i}"><b>${x[0]}</b>${x[2]}</div>`).join('')}</div>
    <div class="grelha">${d.cats.map((c, i) => `<div class="caixa" tabindex="0" data-c="${i}"><strong>${c}</strong><div class="dentro"></div></div>`).join('')}</div>`;
  a.querySelectorAll('.item').forEach(el => el.onclick = () => {
    a.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); el.classList.add('sel'); E.sel = el;
  });
  a.querySelectorAll('.caixa').forEach(cx => cx.onclick = ev => {
    if (ev.target.closest('.certo')) return;
    const el = E.sel;
    if (!el) return fala('Primeiro toca num animal! 👆');
    if (d.itens[el.dataset.i][1] == cx.dataset.c) {
      el.classList.replace('sel', 'certo'); cx.querySelector('.dentro').appendChild(el); el.onclick = null; E.sel = null;
      if (--falta === 0) concluir(d); else { certo(); fala('Certo! 👏'); }
    } else {
      el.classList.add('erro'); setTimeout(() => el.classList.remove('erro'), 400); errado();
      fala('Quase! Tenta outra caixa, tu consegues. 💪');
    }
  });
}

function escolha(d, a) {
  const bonito = o => { const m = o.match(/^(\p{Extended_Pictographic}+)\s*(.*)$/u); return m ? `<b>${m[1]}</b>${m[2]}` : o; };
  a.innerHTML = `<div class="grelha">${mistura(d.ops.map((o, i) => [o, i])).map(([o, i]) => `<button class="opcao" data-i="${i}">${bonito(o)}</button>`).join('')}</div>`;
  a.querySelectorAll('.opcao').forEach(b => b.onclick = () => {
    if (+b.dataset.i === d.certa) { a.querySelectorAll('.opcao').forEach(x => x.disabled = true); b.classList.add('certo'); concluir(d); }
    else { b.classList.add('erro'); b.disabled = true; errado(); fala('Ainda não! Lê outra vez com calma. 🤔'); }
  });
}

function ordenar(d, a) {
  a.innerHTML = `<div class="grelha">${d.itens.map(() => '<div class="caixa vazio">?</div>').join('<span class="seta">➜</span>')}</div>
    <div class="grelha">${mistura(d.itens.map((x, i) => [x, i])).map(([x, i]) => `<div class="item" tabindex="0" data-i="${i}"><b>${x[0]}</b>${x[1]}</div>`).join('')}</div>`;
  const ranhuras = a.querySelectorAll('.caixa');
  a.querySelectorAll('.item').forEach(el => el.onclick = () => {
    if (+el.dataset.i !== E.prox) {
      el.classList.add('erro'); setTimeout(() => el.classList.remove('erro'), 400); errado();
      return fala('Esse não é o próximo! Quem vem a seguir na cadeia? 🌱');
    }
    ranhuras[E.prox].innerHTML = el.innerHTML; ranhuras[E.prox].classList.add('certo');
    el.style.visibility = 'hidden'; el.onclick = null;
    if (++E.prox === d.itens.length) concluir(d); else certo();
  });
}

inicio();
