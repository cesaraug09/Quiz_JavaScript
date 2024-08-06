let min = 1; let max = 40;
let questoes = 0;
let vetor = [];
let i = 0;
const quiz = 'Perguntas_QUIZ.json';
const container = document.querySelector('.container');
var linkFotoUser;
localStorage.getItem('lvlUser');
localStorage.getItem('diasCont');
localStorage.getItem('porcAcertos');

main();

function RegistrarUsuario(){
    return localStorage.getItem('nomeGuardado');
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GerarQuestoesAleatorias() {
    while (i < 10) {
        let RandomID = obterNumeroAleatorio(min, max);
        if (!vetor.includes(RandomID)) {
            vetor[i] = RandomID;
            i++;
        }
    }
}

function ImprimirPergunta(pergunta){
        const h1 = document.createElement('h1');
        h1.innerText = pergunta.pergunta;
        quadrado.appendChild(h1);
}

function TelaComeçar(){
    const logo = document.createElement('img');
    logo.setAttribute('src', 'js.png');
    logo.setAttribute('class', 'logo');
    container.appendChild(logo);

    botaoStart = document.createElement('div');
    botaoStart.innerHTML = `>> COMEÇAR <<`;
    botaoStart.setAttribute('class', 'botaoComeçar');
    container.appendChild(botaoStart);
    return botaoStart;

}

const inputNome = document.createElement('input');
const botaoOk = document.createElement('div');
const contTexto = document.createElement('div');
function Register(){

    localStorage.setItem('lvlUser', '0');
    localStorage.setItem('diasCont', '0');
    localStorage.setItem('porcAcertos', '0');

    ApagarTela();
    const titulo = document.createElement('h1');
    contTexto.setAttribute('class', 'contTexto');
    titulo.setAttribute('class', 'texto');
    titulo.innerHTML = `Vamos lá, <br>qual é o seu nome?`;
    container.appendChild(titulo);
    inputNome.setAttribute('type', 'text');
    inputNome.setAttribute('class', 'textNome');
    container.appendChild(contTexto);
    contTexto.appendChild(inputNome);
    container.style.justifyContent= 'center';

    botaoOk.innerHTML = `Ok!`;
    botaoOk.setAttribute('id', 'botaoConfirm');
    let i = 0;
    inputNome.addEventListener('keydown', function(){
        if(i==0){
        botaoOk.setAttribute('class', 'botaoConfirm');
        contTexto.appendChild(botaoOk);}
        i++;
        })

    botaoOk.addEventListener('click', function(){
        if(inputNome.value==''){
            alert('Por favor, digite seu nome para continuar');
        }else{
        localStorage.setItem('nomeGuardado', `${inputNome.value}`);
        AdicionarFoto(inputNome);
        }
    })
}

function AdicionarFoto(){
    ApagarTela();
    const titulo = document.createElement('h1');
    contTexto.setAttribute('class', 'contTexto');
    titulo.setAttribute('class', 'texto');
    titulo.innerHTML = `Olá, ${localStorage.getItem("nomeGuardado")}!<br>Por favor, escolha sua foto.`;
    container.appendChild(titulo);

    container.style.justifyContent= 'space-evenly';
    divFoto = document.createElement('div');
    divFoto.setAttribute('class', 'divFoto');
    container.appendChild(divFoto);
    divFoto.style.margin='0px';
    var img = renderizarFoto();

    botaoEnviar = document.createElement('div');
    botaoEnviar.innerHTML = `ENVIAR FOTO`;
    botaoEnviar.setAttribute('class', 'botaoComeçar');
    botaoEnviar.style.background = 'linear-gradient(to left, green, #29c029)';
    divFoto.appendChild(botaoEnviar);

    const inputFoto = document.createElement('input');
    inputFoto.setAttribute('type', 'file');
    inputFoto.setAttribute('class', 'inputfoto');
    inputFoto.style.display = 'none';
    container.appendChild(inputFoto);

    botaoEnviar.addEventListener('click', function(){
        inputFoto.click();
    })

    inputFoto.addEventListener('change', function(event) {
        const arquivoFOTO = event.target.files[0];
        if (arquivoFOTO) {
            const novaFoto = new FileReader();
            novaFoto.onload = function(e) {
                linkFotoUser = e.target.result;
                localStorage.setItem('fotoUser', linkFotoUser);
                img.setAttribute('src', `${linkFotoUser}`);
                localStorage.setItem("fotoUser", `${linkFotoUser}`);
            };
            novaFoto.readAsDataURL(arquivoFOTO);
        }})


    botaoStart = document.createElement('div');
    botaoStart.innerHTML = `CONTINUAR`;
    botaoStart.setAttribute('class', 'botaoComeçar');
    divFoto.appendChild(botaoStart);

    botaoStart.addEventListener('click', function(){
            BemVindo();
    })
}

function BemVindo(){
    ApagarTela();
    
    const titulo = document.createElement('h1');
    contTexto.setAttribute('class', 'contTexto');
    titulo.setAttribute('class', 'texto');
    titulo.innerHTML = `Bem vindo.`;
    container.appendChild(titulo);

    container.style.justifyContent= 'center';
    divFoto = document.createElement('div');
    divFoto.setAttribute('class', 'divFoto');
    divFoto.style.height= '300px';
    divFoto.style.width= '360px';
    divFoto.style.margin='80px';
    divFoto.style.background= '#ffffff71';
    container.appendChild(divFoto);

    var img = renderizarFoto();
    img.style.marginTop='-200px';

    const nomeUsuario = document.createElement('h1');
    nomeUsuario.setAttribute('class', 'contTexto');
    nomeUsuario.setAttribute('class', 'texto');
    nomeUsuario.innerHTML = `${localStorage.getItem("nomeGuardado")}`;
    nomeUsuario.style.color='#3e2a86';
    nomeUsuario.style.marginTop='-120px';
    divFoto.appendChild(nomeUsuario);

    divEstats = document.createElement('div');
    divEstats.setAttribute('class', 'divStatus');
    container.appendChild(divEstats);

    var nivel = document.createElement('h1');
    nivel.setAttribute('class', 'textoSTATUS');
    nivel.innerHTML = `Lvl:<br><br>${localStorage.getItem('lvlUser')}`;
    divEstats.appendChild(nivel);

    var divEstatsplus = document.createElement('div');
    divEstatsplus.setAttribute('class', 'divStatusplus');
    divEstats.appendChild(divEstatsplus);

    var nivel = document.createElement('h1');
    nivel.setAttribute('class', 'textoSTATUS');
    nivel.innerHTML = `SEQUÊNCIA:<br><br>${localStorage.getItem('diasCont')}`;
    divEstats.appendChild(nivel);

    var divEstatsplus1 = document.createElement('div');
    divEstatsplus1.setAttribute('class', 'divStatusplus');
    divEstats.appendChild(divEstatsplus1);

    var nivel = document.createElement('h1');
    nivel.setAttribute('class', 'textoSTATUS');
    nivel.innerHTML = `Acertos:<br><br>${localStorage.getItem('porcAcertos')}%`;
    divEstats.appendChild(nivel);



    botaoStart = document.createElement('div');
    botaoStart.innerHTML = `PLAY QUIZ`;
    botaoStart.setAttribute('class', 'botaoComeçar');
    botaoStart.style.background = 'linear-gradient(to left, green, #29c029)';
    container.appendChild(botaoStart);


    img.addEventListener('click', function(){
        AdicionarFoto();
    })


    botaoStart.addEventListener('click', function(){
        PLAY();
    })

}

let porcentagemCarregado = 0;
function PLAY(){
        ApagarTela();
        console.log(vetor[questoes]);

        divCarregando = document.createElement('div');
        divCarregando.setAttribute('class', 'carregando');
        container.appendChild(divCarregando);
        Carregado = document.createElement('div');
        Carregado.setAttribute('class', 'carregado');
        porcentagemCarregado+=9.8;
        Carregado.style.width = `${porcentagemCarregado}%`;
        divCarregando.appendChild(Carregado);

        divPerguntas = document.createElement('div');
        divPerguntas.setAttribute('class', 'divPerguntas');
        container.appendChild(divPerguntas);

        var numeroQuestao = document.createElement('h1');
        numeroQuestao.setAttribute('class', 'texto');
        numeroQuestao.style.fontSize = '20px';
        numeroQuestao.innerHTML = `Pergunta ${questoes+1}/10`;
        divPerguntas.appendChild(numeroQuestao);

        var PerguntaText = document.createElement('h1');
        PerguntaText.setAttribute('class', 'texto');
        PerguntaText.style.fontSize = '30px';
        PerguntaText.style.marginBlock = '50px';
        PerguntaText.innerHTML = `Pergunta Foda?`;
        divPerguntas.appendChild(PerguntaText);
////////////////////// ALTERNATIVAS
        var btn1 = document.createElement('div');
        btn1.innerHTML = `Talvez eu saiba`;
        btn1.setAttribute('class', 'botaoComeçar');
        btn1.style.margin='5px';
        divPerguntas.appendChild(btn1);

        var btn2 = document.createElement('div');
        btn2.innerHTML = `Seu sabo`;
        btn2.setAttribute('class', 'botaoComeçar');
        btn2.style.margin='5px';
        divPerguntas.appendChild(btn2);

        var btn3 = document.createElement('div');
        btn3.innerHTML = `Num sei`;
        btn3.setAttribute('class', 'botaoComeçar');
        btn3.style.margin='5px';
        divPerguntas.appendChild(btn3);

        var btn4 = document.createElement('div');
        btn4.innerHTML = `Seila`;
        btn4.setAttribute('class', 'botaoComeçar');
        btn4.style.margin='5px';
        divPerguntas.appendChild(btn4);
////////////////////// ALTERNATIVAS
        botaoProxima = document.createElement('div');
        botaoProxima.innerHTML = `Próximo`;
        botaoProxima.setAttribute('class', 'botaoComeçar');
        botaoProxima.style.margin='40px';
        container.appendChild(botaoProxima);

    botaoProxima.addEventListener('click', function(){
        if(questoes<9){
            questoes++;
            PLAY();
        }else{
            perguntaText.innerHTML = 'fim de jogo.';
            var lvlUser = parseInt(localStorage.getItem('lvlUser'));
            lvlUser+=1;
            localStorage.setItem('lvlUser', `${lvlUser}`);
        }

    })
}

function renderizarFoto(){
    const img = document.createElement('img');
    img.setAttribute('src', `${localStorage.getItem('fotoUser')}`);
    if(!localStorage.getItem('fotoUser')){
        img.setAttribute('src', 'profile-circle.png');
        console.log('nenhuma')
    }
    img.setAttribute('class', 'imgprofile');

    divFoto.appendChild(img);
    return img;
}

function ApagarTela(){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function main() {
    let botaoStart = TelaComeçar();
    GerarQuestoesAleatorias();
    botaoStart.addEventListener('click', function(){
        if(!RegistrarUsuario()){
        Register();}
        else{
            BemVindo();

        }
    })

}
