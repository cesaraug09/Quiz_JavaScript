

let min = 1; let max = 40;
let vetor = [];
let i = 0;
var nome = '';
const quiz = 'Perguntas_QUIZ.json';
const container = document.querySelector('.container');
var linkFotoUser = ''
var lvlUser = '0';
var diasCont = '0';
var porcAcertos='0';




main();

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
    RegistrarQuestoes();
}

function ImprimirPergunta(pergunta){
        const h1 = document.createElement('h1');
        h1.innerText = pergunta.pergunta;
        quadrado.appendChild(h1);
}

async function RegistrarQuestoes() {
        const response = await fetch(quiz);
        const arquivoJSON = await response.json();

        arquivoJSON.forEach(pergunta => {
            if (vetor.includes(pergunta.id)) {
                ImprimirPergunta(pergunta);
            }
        });
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
        nome = inputNome.value;
        AdicionarFoto(inputNome);
        }
    })
}

function AdicionarFoto(){
    ApagarTela();
    const titulo = document.createElement('h1');
    contTexto.setAttribute('class', 'contTexto');
    titulo.setAttribute('class', 'texto');
    titulo.innerHTML = `Olá, ${nome}!<br>Por favor, escolha sua foto.`;
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
                img.setAttribute('src', `${linkFotoUser}`);
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
    nomeUsuario.innerHTML = `${nome}`;
    nomeUsuario.style.color='#3e2a86';
    nomeUsuario.style.marginTop='-120px';
    divFoto.appendChild(nomeUsuario);

    divEstats = document.createElement('div');
    divEstats.setAttribute('class', 'divStatus');
    container.appendChild(divEstats);

    var nivel = document.createElement('h1');
    nivel.setAttribute('class', 'textoSTATUS');
    nivel.innerHTML = `Lvl:<br><br>${lvlUser}`;
    divEstats.appendChild(nivel);

    var divEstatsplus = document.createElement('div');
    divEstatsplus.setAttribute('class', 'divStatusplus');
    divEstats.appendChild(divEstatsplus);

    var nivel = document.createElement('h1');
    nivel.setAttribute('class', 'textoSTATUS');
    nivel.innerHTML = `SEQUÊNCIA:<br><br>${diasCont}`;
    divEstats.appendChild(nivel);

    var divEstatsplus1 = document.createElement('div');
    divEstatsplus1.setAttribute('class', 'divStatusplus');
    divEstats.appendChild(divEstatsplus1);

    var nivel = document.createElement('h1');
    nivel.setAttribute('class', 'textoSTATUS');
    nivel.innerHTML = `Acertos:<br><br>${porcAcertos}%`;
    divEstats.appendChild(nivel);



    botaoStart = document.createElement('div');
    botaoStart.innerHTML = `PLAY QUIZ`;
    botaoStart.setAttribute('class', 'botaoComeçar');
    botaoStart.style.background = 'linear-gradient(to left, green, #29c029)';
    container.appendChild(botaoStart);


    img.addEventListener('click', function(){
        AdicionarFoto(nome);
    })

}

function renderizarFoto(){
    const img = document.createElement('img');
    img.setAttribute('src', `${linkFotoUser}`);
    if(linkFotoUser!=''){
        img.setAttribute('src', `${linkFotoUser}`);
    } else{
        img.setAttribute('src', 'profile-circle.png');
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
    botaoStart.addEventListener('click', function(){
        if(nome==''){
        Register();}
        else{
            BemVindo();
        }
    })

}
