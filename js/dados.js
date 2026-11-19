// ===== DADOS DO JOGO – é aqui que editas perguntas, animais e dicas =====
// Tipos de desafio:
//  "classificar": cats = nomes das caixas; itens = [emoji, nº da caixa certa (começa em 0), nome]
//  "escolha":     ops = opções; certa = nº da opção certa (começa em 0)
//  "ordenar":     itens = [emoji, nome] já pela ORDEM CERTA
// Todos os desafios têm: texto, dica, expl (explicação que aparece quando acertam).
// Cada sala tem: pista (algarismo do código final), cores, deco (emojis que flutuam no fundo).
// Matéria: resumos de Ciências Naturais (5.º ano) – formas corporais, locomoção, regimes
// alimentares, revestimento, obtenção de alimento e dentição.

const TEMPO_TOTAL = 30 * 60; // segundos (só conta se ativarem o cronómetro)

const JOGO = {
  titulo: 'Fuga do Museu da Vida Selvagem',
  historia: 'O guarda-noturno fechou as portas do museu e vocês ficaram lá dentro! Para sair, resolvam os enigmas das 6 salas. Cada sala esconde um número. Juntem os 6 números pela ordem das salas e abram a porta final. Trabalhem em equipa!',
  salas: [
    { nome: 'Sala das Formas Corporais', icone: '🐟', cores: ['#1abc9c', '#0a6e5c'], deco: ['🌊', '🫧', '🐚', '🦋'], pista: 3,
      intro: 'A forma do corpo está adaptada ao modo como o animal vive e explora o seu meio.',
      desafios: [
        { tipo: 'classificar', texto: 'Toca num animal e depois na forma do seu corpo.',
          cats: ['Fusiforme', 'Cilíndrico', 'Globoso'],
          itens: [['🐟', 0, 'Atum'], ['🐧', 0, 'Pinguim'], ['🐍', 1, 'Cobra'], ['🪱', 1, 'Minhoca'], ['🐌', 2, 'Caracol']],
          dica: 'Fusiforme tem forma de fuso. Cilíndrico é como um tubo, sem membros.',
          expl: 'O corpo fusiforme (atum, pinguim) facilita a deslocação na água. O cilíndrico (cobra, minhoca) permite avançar em galerias. O globoso é arredondado (caracol).' },
        { tipo: 'escolha', texto: 'Que forma de corpo é essencial para a velocidade na água ou no ar?',
          ops: ['Fusiforme', 'Achatado', 'Globoso'], certa: 0,
          dica: 'Pensa na forma de um fuso, como o atum e o falcão.',
          expl: 'A forma fusiforme é hidrodinâmica (na água) ou aerodinâmica (no ar) e ajuda a ir mais depressa.' }
      ] },
    { nome: 'Sala da Locomoção', icone: '🦘', cores: ['#3498db', '#1b4f72'], deco: ['🐾', '🍃', '☁️'], pista: 8,
      intro: 'Os animais deslocam-se para procurar alimento, parceiro ou fugir de predadores.',
      desafios: [
        { tipo: 'classificar', texto: 'Como se desloca cada animal no solo?',
          cats: ['Marcha', 'Corrida', 'Salto', 'Reptação'],
          itens: [['🐻', 0, 'Urso'], ['🐆', 1, 'Chita'], ['🐎', 1, 'Cavalo'], ['🐸', 2, 'Rã'], ['🦘', 2, 'Canguru'], ['🐊', 3, 'Crocodilo']],
          dica: 'Na reptação o ventre desliza ou arrasta-se no solo.',
          expl: 'Marcha: apoio de quase toda a planta do pé (urso). Corrida: apoio só nos dedos. Salto: patas de trás compridas. Reptação: arrastar o ventre no solo.' },
        { tipo: 'escolha', texto: 'Tenho ossos ocos e leves, um osso do peito em forma de quilha e músculos peitorais muito fortes. Quem sou?',
          ops: ['🦅 Falcão', '🐢 Tartaruga', '🐻 Urso'], certa: 0,
          dica: 'Estas são adaptações ao voo.',
          expl: 'As aves têm ossos ocos e leves, asas, penas de voo e um esterno em quilha, onde se prendem os músculos do voo.' }
      ] },
    { nome: 'Sala dos Regimes Alimentares', icone: '🍽️', cores: ['#27ae60', '#145a32'], deco: ['🥕', '🍖', '🍎'], pista: 5,
      intro: 'O regime alimentar é o conjunto de alimentos que o animal come para obter nutrientes e energia.',
      desafios: [
        { tipo: 'classificar', texto: 'Toca no animal e depois no seu regime alimentar.',
          cats: ['Herbívoro', 'Carnívoro', 'Omnívoro'],
          itens: [['🐘', 0, 'Elefante'], ['🐰', 0, 'Coelho'], ['🦁', 1, 'Leão'], ['🐺', 1, 'Lobo'], ['🐻', 2, 'Urso'], ['🐗', 2, 'Javali']],
          dica: 'Omnívoros comem plantas e animais.',
          expl: 'Herbívoros comem sobretudo plantas, carnívoros comem outros animais e omnívoros comem plantas e animais.' },
        { tipo: 'escolha', texto: 'Qual destes animais é necrófago, ou seja, alimenta-se de cadáveres?',
          ops: ['Abutre', 'Andorinha', 'Golfinho'], certa: 0,
          dica: 'Voa em círculos à procura de animais mortos.',
          expl: 'O abutre é necrófago. A andorinha é insetívora e o golfinho é piscívoro (come peixe).' }
      ] },
    { nome: 'Sala dos Revestimentos', icone: '🦎', cores: ['#e67e22', '#a04000'], deco: ['🍂', '🐾', '🐚'], pista: 1,
      intro: 'O revestimento protege, ajuda na camuflagem e na locomoção e, em alguns animais, na respiração.',
      desafios: [
        { tipo: 'classificar', texto: 'Vertebrados: toca no animal e depois no revestimento da sua pele.',
          cats: ['Pele nua', 'Escamas', 'Penas', 'Pelos'],
          itens: [['🐸', 0, 'Rela'], ['🐟', 1, 'Dourada'], ['🦎', 1, 'Camaleão'], ['🐦', 2, 'Pintarroxo'], ['🦊', 3, 'Raposa-do-ártico'], ['🐻', 3, 'Urso']],
          dica: 'Os anfíbios têm pele nua e húmida. Peixes e répteis têm escamas.',
          expl: 'Anfíbios: pele nua. Peixes e répteis: escamas. Aves: penas. Mamíferos: pelos. Os répteis fazem a muda porque as escamas não crescem com o animal.' },
        { tipo: 'classificar', texto: 'Invertebrados: toca no animal e depois no tipo de exosqueleto.',
          cats: ['Quitina', 'Quitina e calcário (carapaça)', 'Calcário (concha)'],
          itens: [['🐝', 0, 'Insetos'], ['🦀', 1, 'Caranguejo'], ['🐚', 2, 'Amêijoa'], ['🐌', 2, 'Lapa/caracol']],
          dica: 'A concha é feita só de calcário.',
          expl: 'Insetos: quitina. Caranguejo: carapaça de quitina reforçada com calcário. Lapa e amêijoa: concha de calcário (univalve ou bivalve).' }
      ] },
    { nome: 'Sala dos Bicos e Patas', icone: '🦩', cores: ['#e84393', '#6c1d45'], deco: ['🪶', '🌿', '🐛'], pista: 6,
      intro: 'Nas aves, o bico e as patas estão adaptados ao alimento e ao modo de o obter.',
      desafios: [
        { tipo: 'classificar', texto: 'Toca na ave e depois no que o seu bico faz.',
          cats: ['Rasga presas', 'Filtra a água', 'Quebra sementes', 'Esburaca troncos'],
          itens: [['🦅', 0, 'Águia-pesqueira'], ['🦩', 1, 'Flamingo'], ['🐦', 2, 'Verdilhão'], ['🪵', 3, 'Pica-pau']],
          dica: 'O verdilhão é granívoro: come sementes duras.',
          expl: 'Águia-pesqueira: bico curvo e afiado. Flamingo: bico com membranas filtradoras. Verdilhão: bico curto e cónico. Pica-pau: bico duro e pontiagudo.' },
        { tipo: 'escolha', texto: 'Que animal usa a ecolocalização para localizar e capturar insetos no escuro?',
          ops: ['🦇 Morcego', '🦁 Leão', '🦒 Girafa'], certa: 0,
          dica: 'É um mamífero voador.',
          expl: 'O morcego usa a ecolocalização. A girafa apanha folhas com o pescoço e a língua, e o leão caça com garras compridas e aguçadas.' }
      ] },
    { nome: 'Sala dos Dentes', icone: '🦷', cores: ['#9b59b6', '#4a235a'], deco: ['🦴', '🥕', '🍖'], pista: 2,
      intro: 'Os dentes dizem muito sobre o que o animal come.',
      desafios: [
        { tipo: 'classificar', texto: 'Toca na descrição e depois no tipo de dente.',
          cats: ['Incisivos', 'Caninos', 'Molares'],
          itens: [['✂️', 0, 'Cortam e prendem o alimento'], ['🥩', 1, 'Rasgam o alimento'], ['⚙️', 2, 'Trituram e moem'], ['🦁', 1, 'Grandes e aguçados no leão'], ['🌿', 2, 'Largos e com pregas nos herbívoros']],
          dica: 'Os caninos têm forma aguçada.',
          expl: 'Incisivos: forma de lâmina, cortam. Caninos: aguçados, rasgam. Molares: achatados e rugosos, trituram e moem.' },
        { tipo: 'escolha', texto: 'Os meus incisivos são grandes, quase não tenho caninos e há um espaço vazio (diastema) entre os incisivos e os molares. Qual é o meu regime alimentar?',
          ops: ['Herbívoro', 'Carnívoro', 'Insetívoro'], certa: 0,
          dica: 'Os molares largos com pregas servem para moer vegetais.',
          expl: 'Os herbívoros, como o cavalo e o gnu, têm incisivos grandes, molares largos e um diastema. Os carnívoros têm caninos grandes.' }
      ] }
  ]
};
