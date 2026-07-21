//Sons do Site
const somButton = new Audio("Sons/dragon-studio-button-press-382713.mp3");
const winSound = new Audio("Sons/u_3bsnvt0dsu-spin-complete-295086.mp3");
const loseSound = new Audio("Sons/freesound_community-failure-1-89170.mp3");
const rightSound = new Audio("Sons/chrisiex1-correct-156911.mp3");
const wrongSound = new Audio("Sons/freesound_community-wrong-47985.mp3");
const drawSound = new Audio("Sons/freesound_community-draw-sound-43894.mp3");

function SoundButton() {
    somButton.currentTime = 0;
    somButton.play();
}

document.getElementById("title").classList.add("h1-1");

const butoes = document.querySelectorAll("button");
butoes.forEach(botao => {
    botao.addEventListener("click", () => {
        somButton.currentTime = 0;
        somButton.play();
    });
});

//ENTER para jogar
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (document.getElementById("Ad").style.display === "flex") {
            jogarAD();
        }
        if (document.getElementById("ppt").style.display === "flex") {
            Ppt();
        }
        if (document.getElementById("forca").style.display === "flex") {
            JogarForcaComp();
        }
         if (document.getElementById("forca2").style.display === "flex") {
            JogarForcaFriend();
        }
    }
});

//TRANSIÇÃO ENTRE TELAS 
function trocarTela(show, hide) {
    document.getElementById(show).style.display = "flex";
    document.getElementById(hide).style.display = "none";
}

let modoForca = "";
//modoForca para modoComputador
function JogarComp() {
    modoForca = "computador";

    document.getElementById("Forca-Jogo").style.display = "none";
    document.getElementById("tema-box").style.display = "flex";
}
//modoForca para modoAmigo
function JogarAmigo() {
    modoForca = "amigo";

    document.getElementById("Forca-Jogo").style.display = "none";
    document.getElementById("tema-boxFriend").style.display = "flex";
}
//tela de temas para modoForca
function Back3() {
    if (modoForca === "computador") {
        document.getElementById("tema-box").style.display = "none";
        document.getElementById("Forca-Jogo").style.display = "flex";
    } else if (modoForca === "amigo") {
        document.getElementById("tema-boxFriend").style.display = "none";
        document.getElementById("Forca-Jogo").style.display = "flex";
    }
}
//Nomeação dos players jogo da velha
function JogarVelha() {
    name1 = document.getElementById("Jogador1").value.trim();
    name2 = document.getElementById("Jogador2").value.trim();
    if (name1 === "" || name2 === "") {
        document.getElementById("nameP1").textContent = "Jogador 1";
        document.getElementById("nameP2").textContent = "Jogador 2";
        name1 = "Jogador 1";
        name2 = "Jogador 2";
    } else {
        document.getElementById("nameP1").textContent = name1;
        document.getElementById("nameP2").textContent = name2;
    }
    document.getElementById("symbol1").textContent = "(" + p1 + ")";
    document.getElementById("symbol2").textContent = "(" + p2 + ")";

    document.getElementById("Velha-Jogo").style.display = "none";
    document.getElementById("JDVelha").style.display = "flex";
}

//ADIVINHE O NÚMERO
// Variáveis globais para o jogo
let max = 100;
let tent = 0;
let tentMax = 10;
let v = Math.floor(Math.random() * max) + 1;
//Função para jogar Adivinhe o Número
function jogarAD() {
    let p = parseInt(document.getElementById("Jogada").value);
    let msg = document.getElementById("msgDV");
    let btn = document.getElementById("btnJogar");
    document.getElementById("Jogada").value = "";

    //verifica se a tentativa é válida
    if (isNaN(p) || p < 1 || p > max) {
        msg.textContent = "Por favor, insira um número entre 1 e " + max + ".";
        wrongSound.currentTime = 0;
        wrongSound.play();
        return;
    }
    tent++;
    document.getElementById("Ntent").getElementsByTagName("span")[0].innerText = tent;

    //verifica se o palpite é correto
    if (p == v) {
        msg.textContent = "Parabéns! Você acertou: n° " + v;
        document.getElementById("msgDV").classList.add("win");
        btn.disabled = true;
        winSound.currentTime = 0;
        winSound.play();
        return;
    } else if (p < v) {
        msg.textContent = "Mais alto!";
    } else {
        msg.textContent = "Mais baixo!";
    }

    //verifica se ultrapassou o limite de tentativas
    if (tent >= tentMax) {
       if (p == v) {
          msg.textContent = "Parabéns! Você acertou: n° " + v;
          document.getElementById("msgDV").classList.add("win");
          winSound.currentTime = 0;
          winSound.play();
       } else {
          msg.textContent = "Game Over! O número era: " + v;
          document.getElementById("msgDV").classList.add("lose");
          loseSound.currentTime = 0;
          loseSound.play();
       }
       btn.disabled = true;
       return;
    }
}

//aumento do intervalo do jogo
function aumento() {
    let newMax = document.getElementById("ex").value;

    if (newMax == "x") {
        let Op = prompt("Digite o novo valor máximo: ");
        if (isNaN(Op) || parseInt(Op) < 1) {
            alert("Valor inválido. O intervalo permanecerá em " + max + ".");
            return;
        }
        max = parseInt(Op);
    } else {
        max = parseInt(newMax);
    }
    document.getElementById("Jogada").max = max;
    document.getElementById("intervalo").textContent = "Intervalo: 1 a " + max;
    reiniciarAD();
    console.log(max);
    console.log(v);
}

//aumento da dificuldade
function dif() {
    let dif = document.getElementById("Dif").value;
    tentMax = parseInt(dif);
    document.getElementById("maxT").getElementsByTagName("span")[0].innerText = tentMax;
    reiniciarAD();
}

//reinício do jogo
function reiniciarAD() {
     tent = 0;
     v = Math.floor(Math.random()*max) + 1;
     document.getElementById("Ntent").getElementsByTagName("span")[0].innerText = "0";
     document.getElementById("msgDV").innerText = "";
     document.getElementById("Jogada").value = "";
     document.getElementById("Jogada").focus();
     document.getElementById("btnJogar").disabled = false;
     document.getElementById("msgDV").classList.remove("win", "lose");
}

//PEDRA, PAPEL E TESOURA
// Variáveis globais para o jogo de Pedra, Papel e Tesoura
let Sjogador = 0;
let Scomputador = 0;
let maxScore = 5;
let btnP = document.getElementById("btnPPT");

function add(choice) {
    document.getElementById("JogadaPPT").value = choice;
}
// Função para jogar Pedra, Papel e Tesoura
function Ppt() {
    const opcoes = ["Pedra", "Papel", "Tesoura"];
    let Jplayer = document.getElementById("JogadaPPT").value.toLowerCase();
    let Jcomp = opcoes[Math.floor(Math.random() * opcoes.length)].toLowerCase();

    if (!["pedra", "papel", "tesoura"].includes(Jplayer)) {
        document.getElementById("resultPPT").textContent = "Jogada inválida! Por favor, escolha Pedra, Papel ou Tesoura.";
        return;
    }
    
    if (Jplayer === Jcomp) {
        document.getElementById("resultPPT").textContent = "Empate! Ambos escolheram " + Jplayer;
    } else if ((Jplayer === "pedra" && Jcomp === "tesoura") ||
               (Jplayer === "papel" && Jcomp === "pedra") ||
               (Jplayer === "tesoura" && Jcomp === "papel")) {
        document.getElementById("resultPPT").textContent = "Você venceu! Computador jogou: " + Jcomp;
        Sjogador++;
        rightSound.currentTime = 0;
        rightSound.play();
    } else {
        document.getElementById("resultPPT").textContent = "Você perdeu! Computador jogou: " + Jcomp;
        Scomputador++;
        wrongSound.currentTime = 0;
        wrongSound.play();
    }
     document.getElementById("scorePPT").getElementsByTagName("span")[0].innerText = Sjogador;
     document.getElementById("scorePPT").getElementsByTagName("span")[1].innerText = Scomputador;

     if (Sjogador >= maxScore) {
        let result = document.getElementById("resultPPT");
        result.classList.remove("lose");
        result.classList.add("win");
        document.getElementById("resultPPT").textContent = "Parabéns! Você venceu o jogo pelo placar de " + Sjogador + " a " + Scomputador + "!";
        winSound.currentTime = 0;
        winSound.play();
        btnP.disabled = true;
     } 
     if (Scomputador >= maxScore) {
        let result = document.getElementById("resultPPT");
        result.classList.remove("win");
        result.classList.add("lose");
        document.getElementById("resultPPT").textContent = "Game over! O computador venceu o jogo pelo placar de " + Scomputador + " a " + Sjogador + "! Tente novamente.";
        loseSound.currentTime = 0;
        loseSound.play();
        btnP.disabled = true;
     }
}

//definição da pontuação máxima
function maxScorePPT() {
    let mS = document.getElementById("maxS").value;
    maxScore = parseInt(mS);

    document.getElementById("mScore").getElementsByTagName("span")[0].innerText = maxScore;
    reiniciarPPT();
}

//reinício do jogo de Pedra, Papel e Tesoura
function reiniciarPPT() {
    Sjogador = 0;
    Scomputador = 0;
    document.getElementById("scorePPT").getElementsByTagName("span")[0].innerText = Sjogador;
    document.getElementById("scorePPT").getElementsByTagName("span")[1].innerText = Scomputador;
    document.getElementById("resultPPT").textContent = "";
    document.getElementById("JogadaPPT").value = "";
    document.getElementById("JogadaPPT").focus();
    document.getElementById("resultPPT").classList.remove("win", "lose");
    btnP.disabled = false;
}

//FORCA
//função jogar forca (computador ou amigo)
async function JogarJF() {
    document.getElementById("tema-box").style.display = "none";
    let tema = document.getElementById("tema").value;
    let tema2 = document.getElementById("tema2").value;
    let exibicao1 = "";
    let exibicao2 = "";

    //seleção da palavra para o modo computador
    if (modoForca === "computador") {
        try { 
            //se tema for países 
            if (tema === "Países") {
                const response = await fetch('paises.json');
                const paises = await response.json();
                const continentes = Object.keys(paises);

                const continente = continentes[Math.floor(Math.random() * continentes.length)];
                const pContinente = paises[continente];

                const pais = Math.floor(Math.random() * pContinente.length);
                word = pContinente[pais].toLowerCase();
                word = Npalavra(word);
                document.getElementById("temaForca").innerText = tema;
            }
        } catch (error) {
            console.error("Erro ao buscar países:", error);
            word = "brasil"; // Palavra padrão caso a API falhe
            return;
        }
        //se tema for profissões
        if (tema === "Profissão") {
            const profissoes = [
                    "Administrador", "Tradutor", "Taxista", "Bombeiro",
                    "Advogado", "Arquiteto", "Ator", "Artista",
                    "Analista de Sistemas", "Astronauta", "Cirurgião", "Chef", 
                    "Contador", "Dentista", "Cientista", "Designer",
                    "Engenheiro", "Eletricista", "Economista", "Escritor",
                    "Médico", "Massagista", "Enfermeiro", "Fotógrafo", "Físico",
                    "Programador", "Policial", "Segurança",  "Motorista",
                    "Professor", "Pedreiro", "Psicólogo", "Pintor", "Piloto",
                    "Veterinário", "Vendedor", "Vereador", "Mecânico",
                    "Zelador", "Cabeleireiro", "Jardineiro", "Garçom"
                ];
            word = profissoes[Math.floor(Math.random() * profissoes.length)].toLowerCase();
            word = Npalavra(word);
            document.getElementById("temaForca").innerText = tema;
        }
        //se tema for animais
        else if (tema === "Animais") {
            const animais = [
                 "Cachorro", "Gato", "Elefante", "Leão", "Tigre", "Girafa",
                 "Zebra", "Cavalo", "Coelho", "Urso", "Panda", "Macaco",
                 "Rinoceronte", "Hipopótamo", "Crocodilo", "Lobo", "Tartaruga",
                 "Hipopotamo", "Canguru", "Pinguim", "Coruja", "Falcão", "Águia",
                 "Peixe", "Golfinho", "Baleia", "Polvo", "Caranguejo", "Arraia",
                 "Formiga", "Abelha", "Borboleta", "Grilo", "Cigarra",
                 "Sapo", "Rã", "Serpente", "Cobra", "Jacaré", "Cavalo Marinho",
                "Lula", "Estrela do Mar", "Água-viva", "Caracol", "Lesma",
                "Tubarão", "Orca", "Morcego", "Corvo", "Pomba", "Galo"
               ];
            word = animais[Math.floor(Math.random() * animais.length)].toLowerCase();
            Npalavra(word);
            document.getElementById("temaForca").innerText = tema;
            }
        //se tema for frutas
        else if (tema === "Frutas") {
            const frutas = [
                "banana", "maçã", "laranja", "uva", "abacaxi", "manga",
                "pera", "melancia", "morango", "kiwi", "abacate", "cereja",
                "pêssego", "ameixa", "framboesa", "mirtilo", "goiaba",
                "maracujá", "limão", "tangerina", "carambola", "figo",
                "jabuticaba", "graviola", "pitanga", "caju", "acerola",
                "amora", "uvaia", "physalis", "nectarina", "romã",
                "coco", "açaí", "cupuaçu", "abiu", "bacaba", "biribá",
                "cambuci", "cajá", "camapu", "camu-camu"
            ];
            word = frutas[Math.floor(Math.random() * frutas.length)].toLowerCase();
            word = Npalavra(word);
            document.getElementById("temaForca").innerText = tema;
        }

        for (let letra2 of word) {
            if (letra2 === " ") {
                exibicao1 += "   ";
            } else {
                exibicao1 += "__ ";
            }
        }
        document.getElementById("wordComp").textContent = exibicao1;
        document.getElementById("forca").style.display = "flex";
    } 

    //seleção da palavra para o modo amigo
    else if (modoForca === "amigo") {
        word2 = document.getElementById("palavra").value.toLowerCase();
        word2 = Npalavra(word2);

        for (let letra of word2) {
            if (letra === " ") {
                exibicao2 += "   ";
            } else {
                exibicao2 += "__ ";
            }
    }
        document.getElementById("word").textContent = exibicao2;
        document.getElementById("tema-boxFriend").style.display = "none";
        document.getElementById("forca2").style.display = "flex";
        document.getElementById("temaForca2").innerText = tema2;
    }
}

//variáveis globais da Forca
let word = "";
let word2 = "";
let letters = [];
let letters2 = [];
let score2 = 6;
let score = 6;
let btnFC = document.getElementById("btnForcaComp");
let btnFF = document.getElementById("btnForcaFriend");
//Jogar forca modo computador
function JogarForcaComp() {
    let guess = document.getElementById("JogadaForcaComp").value.toLowerCase();
    let win = false;
    
    //verifica se digitou apenas uma letra
    if (guess.length !== 1) {
        alert("Digite apenas uma letra!");
        wrongSound.currentTime = 0;
        wrongSound.play();
        return;
    }

    //verifica se a letra ja foi utilizada
    if (letters.includes(guess)) {
        document.getElementById("result2").textContent = "Você já tentou esta letra! Tente novamente.";
        return;
    } else {
        letters.push(guess);
        document.getElementById("result2").textContent = "";
    }
    //verifica se a letra esta na palavra
    if (word.includes(guess)) {
        rightSound.currentTime = 0;
        rightSound.play();
    }
    else if (!word.includes(guess)) {
        score2 -= 1;
        document.getElementById("result2").textContent = "A letra " + guess + " não está na palavra.";
        wrongSound.currentTime = 0;
        wrongSound.play();
        switch(score2) {
            case 5:
                document.querySelector("#forca .cabeca").style.opacity = 1;
                break;
            case 4:
                document.querySelector("#forca .tronco").style.opacity = 1;
                break;
            case 3:
                document.querySelector("#forca .braco-direito").style.opacity = 1;
                break;
            case 2:
                document.querySelector("#forca .braco-esquerdo").style.opacity = 1;
                break;
            case 1:
                document.querySelector("#forca .perna-direita").style.opacity = 1;
                break;
            case 0:
                document.querySelector("#forca .perna-esquerda").style.opacity = 1;
                break;
        }
        document.getElementById("score2").getElementsByTagName("span")[0].innerText = score2;
        if (score2 === 0) {
        document.getElementById("result2").textContent = "Você perdeu! A palavra era: " + word;
        document.getElementById("JogadaForcaComp").disabled = true;
        document.getElementById("forca").classList.remove("win2");
        document.getElementById("forca").classList.add("lose2");
        btnFC.disabled = true;
        loseSound.currentTime = 0;
        loseSound.play();
        return;
    }  
    }

    //exibe a palavra na tela
    let palavra = "";
    for (let letra of word) {
        if (letra === " ") {
            palavra += "   ";
        } else if (letters.includes(letra)) {
            palavra += letra + " ";
        } else {
            palavra += "__ ";
        }
    }
    document.getElementById("wordComp").textContent = palavra;
    document.getElementById("JogadaForcaComp").value = "";

    //verifica se o jogador ganhou
    win = true;
    for (let letra of word) {
        if (letra !== " " && !letters.includes(letra)) {
            win = false;
    }
    }

    if (win === true) {
        document.getElementById("result2").textContent = "Parabéns! Você ganhou! Palavra: " + word;
        document.getElementById("JogadaForcaComp").disabled = true;
        document.getElementById("forca").classList.remove("lose2");
        document.getElementById("forca").classList.add("win2");
        winSound.currentTime = 0;
        winSound.play();
        btnFC.disabled = true;
    }  
}

//Jogar forca modo amigo
function JogarForcaFriend() {
    let guess1 = document.getElementById("JogadaForcaFriend").value.toLowerCase();
    let win = false;
    
    //verifica se digitou apenas uma letra
    if (guess1.length !== 1) {
        alert("Digite apenas uma letra!");
        wrongSound.currentTime = 0;
        wrongSound.play();
        return;
    }

    //verifica se a letra ja foi utilizada
    if (letters2.includes(guess1)) {
        document.getElementById("result").textContent = "Você já tentou esta letra! Tente novamente.";
    } else {
        letters2.push(guess1);
        document.getElementById("result").textContent = "";
    }
    //verifica se a letra esta na palavra
    if (word2.includes(guess1)) {
        rightSound.currentTime = 0;
        rightSound.play();
    }
    else if (!word2.includes(guess1)) {
        score -= 1;
        document.getElementById("result").textContent = "A letra " + guess1 + " não está na palavra.";
        wrongSound.currentTime = 0;
        wrongSound.play();
        switch(score) {
            case 5:
                document.querySelector("#forca2 .cabeca").style.opacity = 1;
                break;
            case 4:
                document.querySelector("#forca2 .tronco").style.opacity = 1;
                break;
            case 3:
                document.querySelector("#forca2 .braco-direito").style.opacity = 1;
                break;
            case 2:
                document.querySelector("#forca2 .braco-esquerdo").style.opacity = 1;
                break;
            case 1:
                document.querySelector("#forca2 .perna-direita").style.opacity = 1;
                break;
            case 0:
                document.querySelector("#forca2 .perna-esquerda").style.opacity = 1;
                break;
        }  
    }

    //exibe a palavra na tela
    let palavra2 = "";
    for (let letra of word2) {
        if (letra === " ") {
            palavra2 += "   ";
        } else if (letters2.includes(letra)) {
            palavra2 += letra + " ";
        } else {
            palavra2 += "__ ";
        }
    }
    document.getElementById("word").textContent = palavra2;
    document.getElementById("score").getElementsByTagName("span")[0].innerText = score;
    document.getElementById("JogadaForcaFriend").value = "";

    //verifica se o jogador ganhou
    win = true;
    for (let letra of word2) {
        if (letra !== " " && !letters2.includes(letra)) {
            win = false;
    }
    }

    if (win === true) {
        document.getElementById("result").textContent = "Parabéns! Você ganhou! Palavra: " + word2;
        document.getElementById("JogadaForcaFriend").disabled = true;
        document.getElementById("forca2").classList.remove("lose2");
        document.getElementById("forca2").classList.add("win2");
        winSound.currentTime = 0;
        winSound.play();
        btnFF.disabled = true;
    } else if (score === 0) {
        document.getElementById("result").textContent = "Você perdeu! A palavra era: " + word2;
        document.getElementById("JogadaForcaFriend").disabled = true;
        document.getElementById("forca2").classList.remove("win2");
        document.getElementById("forca2").classList.add("lose2");
        loseSound.currentTime = 0;
        loseSound.play();
        btnFF.disabled = true;
        return;
    }
}

//função para tentar adivinhar a palavra completa modo computador
function TentAdComp() {
    let Tent = prompt("Digite a palavra que você acha que é: ").toLowerCase();
    if (Tent === word) {
        document.getElementById("result2").textContent = "Parabéns! Você acertou a palavra: " + word;
        document.getElementById("JogadaForcaComp").disabled = true;
        document.getElementById("wordComp").textContent = word;
        document.getElementById("forca").classList.remove("lose2");
        document.getElementById("forca").classList.add("win2");
        winSound.currentTime = 0;
        winSound.play();
        btnFC.disabled = true;
    } else {
        score -= 1;
        document.getElementById("result2").textContent = "Resposta incorreta! Continue tentando";
    }
}
//função para tentar adivinhar a palavra completa modo amigo
function TentAdFriend() {
    let Tent = prompt("Digite a palavra que você acha que é: ").toLowerCase();
    if (Tent === word2) {
        document.getElementById("result").textContent = "Parabéns! Você acertou a palavra: " + word2;
        document.getElementById("word").textContent = word2;
        document.getElementById("JogadaForcaFriend").disabled = true;
        document.getElementById("forca2").classList.remove("lose2");
        document.getElementById("forca2").classList.add("win2");
        winSound.currentTime = 0;
        winSound.play();
        btnFF.disabled = true;
    } else {
        score2 -= 1;
        document.getElementById("result").textContent = "Resposta incorreta! Continue tentando";
    }
}

//retirando acentos para facilitar a comparação das palavras
function Npalavra(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, " ");
}
function reiniciarForcaComp() {
    score2 = 6;
    letters = [];
    document.getElementById("score2").getElementsByTagName("span")[0].innerText = score2;
    document.getElementById("result2").textContent = "";
    document.getElementById("JogadaForcaComp").value = "";
    document.getElementById("wordComp").textContent = "";
    document.getElementById("JogadaForcaComp").focus();
    document.getElementById("JogadaForcaComp").disabled = false;
    btnFC.disabled = false;
    document.querySelectorAll("#forca .cabeca, #forca .tronco, #forca .braco-direito, #forca .braco-esquerdo, #forca .perna-direita, #forca .perna-esquerda").forEach(part => part.style.opacity = 0);
    
    document.getElementById("forca").classList.remove("win2", "lose2");
    document.getElementById("forca").style.display = "none";
    document.getElementById("tema-box").style.display = "flex";
}
function reiniciarForcaFriend() {
    score = 6;
    letters2 = [];
    document.getElementById("score").getElementsByTagName("span")[0].innerText = score;
    document.getElementById("result").textContent = "";
    document.getElementById("JogadaForcaFriend").value = "";
    document.getElementById("JogadaForcaFriend").focus();
    document.getElementById("word").textContent = "";
    document.getElementById("JogadaForcaFriend").disabled = false;
    btnFF.disabled = false;
    document.querySelectorAll("#forca2 .cabeca, #forca2 .tronco, #forca2 .braco-direito, #forca2 .braco-esquerdo, #forca2 .perna-direita, #forca2 .perna-esquerda").forEach(part => part.style.opacity = 0);

    document.getElementById("forca2").classList.remove("win2", "lose2");
    document.getElementById("forca2").style.display = "none";
    document.getElementById("tema-boxFriend").style.display = "flex";
}

//JOGO DA VELHA
//variáveis globais do Jogo da Velha
let p1 = "X";
let p2 = "O";
let player = "X";
let winner = false;
let board = ["", "", "", "", "", "", "", "", ""];
let ScoreP1 = 0;
let ScoreP2 = 0;
let p = document.getElementById("turno");
let jog = 0;
let name1 = "";
let name2 = "";

document.querySelectorAll(".casasV").forEach(casa => 
    casa.addEventListener("click", function() {
        let position = Number(this.dataset.pos);
        goJV(position, this);
    }));

//função para jogar Jogo da Velha
function goJV(position, button) {

    if (board[position] !== "" || winner) {
        return;
    }

    board[position] = player;
    button.textContent = player; 
    jog++;

    if (player === "X") {
        button.style.color = "Indigo";
    } else {
        button.style.color = "darkgreen";
    }
    checkWin();

    if (!winner) {
        player = player === "X" ? "O" : "X";
        p.textContent = "Turno: Jogador " + player;
    } 
    
}

//Verificação de Vitória
function checkWin() {
    let vencedor = (player === p1) ? name1 : name2;
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6] // diagonais
    ];
    if (winCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    })) {
        winner = true;
        document.getElementById("resultV").textContent = "Parabéns! " + vencedor + " ganhou a rodada!";
        document.getElementById("resultV").classList.add("win");
        winSound.currentTime = 0;
        winSound.play();
        document.querySelectorAll(".casasV").forEach(casa => casa.disabled = true);
        if (player === p1) {
            ScoreP1++;
            document.getElementById("placar1").textContent = ScoreP1;
        } else {
            ScoreP2++;
            document.getElementById("placar2").textContent = ScoreP2;
        }
        const casas = document.querySelectorAll(".casasV");
        const winnerCombination = winCombinations.find(combination =>
        combination.every(index => board[index] === player)
        );
             winnerCombination.forEach(ind => {
             casas[ind].classList.add("vitoria");
         });
    }
        if (!winner && jog === 9) {
            document.getElementById("resultV").textContent = "Empate!";
            document.getElementById("resultV").classList.remove("win");
            document.getElementById("resultV").classList.add("draw");
            drawSound.currentTime = 0;
            drawSound.play();
        }
}

//reiniciar partida do jogo da velha
function reiniciarpJV() {
    let button = document.querySelectorAll(".casasV");
    button.forEach(buttons => {
        buttons.textContent = "";
        buttons.style.color = "";
        buttons.classList.remove("vitoria");
    });
    document.getElementById("resultV").textContent = "";
    document.getElementById("resultV").classList.remove("win");
    document.getElementById("resultV").classList.remove("draw");
    document.getElementById("resultV").classList.remove("win");
    document.querySelectorAll(".casasV").forEach(casa => casa.disabled = false);
    board = ["", "", "", "", "", "", "", "", ""];
    p1 = p1 === "O" ? "X" : "O";
    p2 = p2 === "X" ? "O" : "X";
   
    player = player === p2 ? p2 : p1; 
    p.textContent = "Turno: Jogador " + player;
    document.getElementById("symbol1").textContent = "(" + p1 + ")";
    document.getElementById("symbol2").textContent = "(" + p2 + ")";
    jog = 0;
    winner = false;
}

//reiniciar jogo da velha
function reiniciarJV() {
    ScoreP1 = 0;
    ScoreP2 = 0;
    document.getElementById("placar1").textContent = ScoreP1;
    document.getElementById("placar2").textContent = ScoreP2;
    reiniciarpJV();
    player = "X";
    p1 = player;
    p2 = "O";
    p.textContent = "Turno: Jogador " + player;
    document.getElementById("Jogador1").value = "";
    document.getElementById("Jogador2").value = "";
    
    document.getElementById("Velha-Jogo").style.display = "flex";
    document.getElementById("JDVelha").style.display = "none";
}