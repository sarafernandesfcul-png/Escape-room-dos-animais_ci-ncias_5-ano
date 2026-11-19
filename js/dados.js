// ===== DADOS DO JOGO – é aqui que editas perguntas, animais e dicas =====
// Tipos de desafio:
//  "classificar": cats = nomes das caixas; itens = [emoji, nº da caixa certa (começa em 0), nome]
//  "escolha":     ops = opções; certa = nº da opção certa (começa em 0)
//  "ordenar":     itens = [emoji, nome] já pela ORDEM CERTA
// Todos os desafios têm: texto, dica, expl (explicação que aparece quando acertam).
// Cada sala tem: pista (número do código final), cores, deco (emojis que flutuam no fundo).

const TEMPO_TOTAL = 30 * 60; // segundos (só conta se ativarem o cronómetro)

const JOGO = {
  titulo: 'Fuga do Museu da Vida Selvagem',
  historia: 'O guarda-noturno fechou as portas do museu e vocês ficaram lá dentro! Para sair, resolvam os enigmas das 5 salas. Cada sala esconde um número. Juntem os 5 números e abram a porta final. Trabalhem em equipa!',
  salas: [
    { nome: 'Sala dos Ambientes', icone: '🌍', cores: ['#1abc9c', '#0a6e5c'], deco: ['🌴', '🌊', '🦋', '🐚'], pista: 4,
      intro: 'Cada animal vive no ambiente que lhe dá comida, abrigo e o clima de que precisa.',
      desafios: [
        { tipo: 'classificar', texto: 'Toca num animal e depois no ambiente onde ele vive.',
          cats: ['🌊 Mar', '🌳 Floresta', '🏜️ Deserto', '❄️ Polo Sul'],
          itens: [['🐬', 0, 'Golfinho'], ['🐗', 1, 'Javali'], ['🐪', 2, 'Camelo'], ['🐧', 3, 'Pinguim'], ['🐙', 0, 'Polvo'], ['🦊', 1, 'Raposa']],
          dica: 'O camelo aguenta muito calor e pouca água.',
          expl: 'Os animais têm características que os ajudam a viver no seu ambiente: o pinguim tem uma camada de gordura contra o frio e o camelo aguenta a falta de água.' },
        { tipo: 'escolha', texto: 'Qual destes animais está adaptado a voar no ar?',
          ops: ['🦅 Águia', '🐟 Atum', '🐘 Elefante'], certa: 0,
          dica: 'Precisa de asas e de ossos leves.',
          expl: 'As aves têm asas e penas, por isso conseguem voar (ambiente aéreo).' }
      ] },
    { nome: 'Sala dos Revestimentos', icone: '🦔', cores: ['#e67e22', '#a04000'], deco: ['🍂', '🐾', '🌰'], pista: 7,
      intro: 'O revestimento é a "roupa" natural do animal: protege, aquece e até disfarça!',
      desafios: [
        { tipo: 'classificar', texto: 'Toca num animal e depois no revestimento do seu corpo.',
          cats: ['Pelo', 'Penas', 'Escamas', 'Carapaça'],
          itens: [['🐑', 0, 'Ovelha'], ['🐔', 1, 'Galinha'], ['🐟', 2, 'Peixe'], ['🐢', 3, 'Tartaruga'], ['🦉', 1, 'Coruja'], ['🐍', 2, 'Cobra']],
          dica: 'Os mamíferos têm pelo e as aves têm penas.',
          expl: 'O pelo aquece, as penas isolam e ajudam a voar, e as escamas e a carapaça protegem o corpo.' },
        { tipo: 'escolha', texto: 'Tenho a pele nua, fina e húmida. Quem sou eu?',
          ops: ['🐸 Rã', '🐻 Urso', '🐓 Galo'], certa: 0,
          dica: 'Vivo perto da água e dou saltos.',
          expl: 'Os anfíbios, como a rã, têm a pele nua e húmida.' }
      ] },
    { nome: 'Sala das Patas', icone: '🐾', cores: ['#3498db', '#1b4f72'], deco: ['🐾', '🍃', '☁️'], pista: 2,
      intro: 'As patas, asas e nadadeiras mostram como cada animal se desloca.',
      desafios: [
        { tipo: 'escolha', texto: 'Qual destes animais tem patas com membranas entre os dedos, que o ajudam a nadar?',
          ops: ['🦆 Pato', '🐇 Coelho', '🦅 Águia'], certa: 0,
          dica: 'Pensa num animal que anda no lago.',
          expl: 'As membranas entre os dedos funcionam como remos.' },
        { tipo: 'classificar', texto: 'Como se desloca cada animal? Toca no animal e depois na caixa.',
          cats: ['Correr', 'Voar', 'Nadar'],
          itens: [['🐆', 0, 'Chita'], ['🦉', 1, 'Coruja'], ['🐬', 2, 'Golfinho'], ['🐎', 0, 'Cavalo'], ['🦅', 1, 'Águia'], ['🐟', 2, 'Peixe']],
          dica: 'Peixes e golfinhos têm nadadeiras.',
          expl: 'O corpo adapta-se ao movimento: patas compridas para correr, asas para voar e nadadeiras para nadar.' }
      ] },
    { nome: 'Sala dos Dentes', icone: '🦷', cores: ['#9b59b6', '#4a235a'], deco: ['🦴', '🥕', '🍖'], pista: 9,
      intro: 'Os dentes e o bico contam o que o animal come.',
      desafios: [
        { tipo: 'classificar', texto: 'Toca no animal e depois na sua alimentação.',
          cats: ['Herbívoro', 'Carnívoro', 'Omnívoro'],
          itens: [['🐄', 0, 'Vaca'], ['🦁', 1, 'Leão'], ['🐻', 2, 'Urso'], ['🐇', 0, 'Coelho'], ['🐺', 1, 'Lobo'], ['🐗', 2, 'Javali']],
          dica: 'Dentes largos moem plantas; caninos pontiagudos rasgam carne.',
          expl: 'Herbívoros comem plantas, carnívoros comem carne e omnívoros comem de tudo um pouco.' },
        { tipo: 'ordenar', texto: 'Ordena a cadeia alimentar: toca primeiro em quem produz o alimento e depois em quem come quem.',
          itens: [['🌿', 'Erva'], ['🐇', 'Coelho'], ['🦊', 'Raposa']],
          dica: 'Tudo começa numa planta.',
          expl: 'Numa cadeia alimentar, a seta vai de quem é comido para quem come.' }
      ] },
    { nome: 'Sala-Desafio', icone: '🧩', cores: ['#e84393', '#6c1d45'], deco: ['⭐', '❓', '🔑'], pista: 5,
      intro: 'Última sala! Mostrem tudo o que aprenderam.',
      desafios: [
        { tipo: 'escolha', texto: 'Charada: tenho penas, um bico sem dentes e ponho ovos. Quem sou eu?',
          ops: ['🐔 Galinha', '🐶 Cão', '🐟 Sardinha'], certa: 0,
          dica: 'É uma ave de quinta.',
          expl: 'As aves têm penas e bico, e nascem de ovos.' },
        { tipo: 'escolha', texto: 'Verdadeiro ou falso: todos os animais que vivem na água têm escamas.',
          ops: ['Verdadeiro', 'Falso'], certa: 1,
          dica: 'Pensa no golfinho e no polvo.',
          expl: 'Falso! O golfinho tem pele lisa e o polvo tem o corpo mole, sem escamas.' }
      ] }
  ]
};
