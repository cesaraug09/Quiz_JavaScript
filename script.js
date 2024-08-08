let min = 1; let max = 40;
let questoes = 0;
let pergunta;
let vetor = [];
let vetorPerguntas = [];
let alternativasA=[];
let alternativasB=[];
let alternativasC=[];
let alternativasD=[];
const container = document.querySelector('.container');
var linkFotoUser;
let porcentagemCarregado = 0;
let settingsbtn = document.querySelector('.icoconfig img');
settingsbtn.style.top="-100px"

let settingsarea = document.querySelector('.areanoclick');
let settingsclick = false;
let vetorContadordeDias = [];

let CorBotaoPrincipal = '#3A0E6F';
let CorBotaoSecundario = 'linear-gradient(to right, rgb(27, 192, 27), rgb(38, 156, 38))';
let CorDivPrincipal = '#7B7787';
let CorDivSecundaria = '#6120AA';
let CorTextoPrincipal = '#FFFFFF';
let CorTextoSecundario = '#3E2A86';
const naoclicavel = document.querySelector('.areanoclick');


let agora = new Date();
let diaHoje = `${agora.getDate()}${agora.getMonth()+1}${agora.getFullYear()}`

main();
////////////////// PARTE DO CÓDIGO DEDICADA AO LOCALSTORAGE

localStorage.setItem('lvlUser', '0');
localStorage.setItem('diasCont', '0');
localStorage.setItem('porcAcertos', '0');

function RegistraDiasJogados(){
    vetorContadordeDias = parseInt(localStorage.getItem('DiasJogados'));
    if(!vetorContadordeDias.includes(diaHoje)){
        vetorContadordeDias.push(diaHoje);
    }
}

function RegistraQuestoesRespondidas(num){
    localStorage.setItem('Questoes',  num);
    console.log(localStorage.getItem('Questoes'))
}

function localStorageNomeUsuario(){
    return localStorage.getItem('nomeGuardado');
}

function ChecaTemRegistro(){
    if(!localStorageNomeUsuario()){
        Register();}
    else{
        BemVindo();
    }
}

function LimpaLocalStorage(){
    localStorage.clear();
    naoclicavel.removeChild(menu);
    naoclicavel.style.width='0%';
    naoclicavel.style.height='0%';
    settingsclick = false;
    location.reload();
}

function PlacarEstatisticas(){
    nomeUsuario = ImprimeTexto(`${localStorage.getItem('nomeGuardado')}`, 'texto', divFoto,  CorTextoSecundario);
    nomeUsuario.style.marginTop='-120px';

    divEstats = Imprime('div', null, 'divStatus', container, CorTextoSecundario, CorDivPrincipal);

    ImprimeTexto(`Acertos:<br><br>${localStorage.getItem('lvlUser')}` , 'textoSTATUS' , divEstats, CorTextoSecundario);

    var divEstatsplus = document.createElement('div');
    divEstatsplus.setAttribute('class', 'divStatusplus');
    divEstats.appendChild(divEstatsplus);

    ImprimeTexto(`SEQUÊNCIA:<br><br>${localStorage.getItem('diasCont')}` , 'textoSTATUS' , divEstats, CorTextoSecundario);

    var divEstatsplus1 = document.createElement('div');
    divEstatsplus1.setAttribute('class', 'divStatusplus');
    divEstats.appendChild(divEstatsplus1);

    ImprimeTexto(`Acertos:<br><br>${localStorage.getItem('porcAcertos')}%` , 'textoSTATUS' , divEstats, CorTextoSecundario);
}

////////////////// PARTE DO CÓDIGO DEDICADA AO LOCALSTORAGE

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GerarQuestoesAleatorias() {
    while (questoes < 10){
        let RandomID = obterNumeroAleatorio(min, max);
        if (!vetor.includes(RandomID)) {
            vetor[questoes] = RandomID;
            questoes++;
        }
    }
    questoes=0;
}

////////////////// PARTE PARA GERAR VETORES COM NUMEROS ALEATORIOS

function ImprimeIMG(src, classe, ElementoPai){
    const img = document.createElement('img');
        img.setAttribute('src', src);
            img.setAttribute('class', classe);
                ElementoPai.appendChild(img);
}

function Imprime(tipo, texto, classe, ElementoPai, corText, corBackGround){
    div = document.createElement(`${tipo}`);
    div.setAttribute('class', classe);
    div.style.background=corBackGround;
    if(corText){
        div.style.color=corText;
    }
    if(texto){
        div.innerHTML = texto;
    }
    ElementoPai.appendChild(div);
    return div;
}


function ImprimeTexto(texto,classe,ElementoPai, corText){
    const titulo = document.createElement('h1');
    titulo.setAttribute('class', classe);
    titulo.innerHTML = texto;
    titulo.style.color=corText;
    ElementoPai.appendChild(titulo);
    return titulo;
}

function renderizarFoto(){
    const img = document.createElement('img');
    img.setAttribute('class', 'imgprofile');
        img.setAttribute('src', `${localStorage.getItem('fotoUser')}`);
    if(!localStorage.getItem('fotoUser')){
        img.setAttribute('src', 'profile-circle.png');
    }

    divFoto.appendChild(img);
        return img;
}

function EnviaEMudaFoto(img){
    const inputFoto = document.createElement('input');
    inputFoto.setAttribute('type', 'file');
    inputFoto.setAttribute('class', 'inputfoto');
    inputFoto.style.display = 'none';
    container.appendChild(inputFoto);

    inputFoto.click();

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
        }
    })
}

function GeraInputTexto(){
    inputNome.setAttribute('class', 'textNome');
    contTexto.setAttribute('class', 'contTexto');
    contTexto.appendChild(inputNome);
    container.appendChild(contTexto);
    botaoOk.innerHTML = `Ok!`;
    botaoOk.setAttribute('id', 'botaoConfirm');
}

////////////////// PARTE VISUAL DO FRONT


function TelaComeçar(){
    ImprimeIMG('js.png', 'logo', container);
    obterPergunta();

    var btnComeçar = Imprime('div','>> COMEÇAR <<', 'botaoComeçar', container, CorTextoPrincipal, CorBotaoPrincipal);

    btnComeçar.addEventListener('click', function(){
        settingsbtn.style.top="0"; ///// Faz o botao Settings Aparecer
        ChecaTemRegistro();
    })
}

const inputNome = document.createElement('input');
const contTexto = document.createElement('div');
const botaoOk = document.createElement('div');


function Register(){
    container.style.justifyContent= 'center';
    ApagarTela();
    ImprimeTexto(`Vamos lá, <br>qual é o seu nome?`, 'texto', container, CorTextoPrincipal);
    GeraInputTexto();

    let i = 0;
    inputNome.addEventListener('keydown', function(){
        if(i==0){
            botaoOk.setAttribute('class', 'botaoConfirm');
            contTexto.appendChild(botaoOk);
            }
        i++;
    })
}

function AdicionarFoto(){
    container.style.justifyContent= 'center';
    ApagarTela();

    ImprimeTexto(`Olá, ${localStorage.getItem('nomeGuardado')}!<br>Por favor, escolha sua foto.`, 'texto', container, CorTextoPrincipal);

    divFoto = Imprime('div',null, 'divFoto', container, null, CorDivPrincipal);
    divFoto.style.margin='20px';

    var img = renderizarFoto();
    botaoEnviar = Imprime('div',`ENVIAR FOTO`, 'botaoComeçar', divFoto, CorTextoPrincipal, CorBotaoSecundario);
    botaoEnviar.addEventListener('click', function(){
        EnviaEMudaFoto(img);
    })
    const btnContinue = Imprime('div', `CONTINUAR`, 'botaoComeçar', divFoto, CorTextoPrincipal, CorBotaoPrincipal);
    btnContinue.addEventListener('click', function(){
        BemVindo();
    })
}

function BemVindo(){
    container.style.justifyContent= 'center';
    ApagarTela();

    ImprimeTexto(`Bem vindo.`, 'texto', container, '');

    divFoto = Imprime('div',null, 'divFoto', container, CorTextoPrincipal, CorDivPrincipal);
    divFoto.style.height= '300px';
    divFoto.style.width= '360px';
    divFoto.style.margin='80px';

    var img = renderizarFoto();
    img.style.marginTop='-200px';
    PlacarEstatisticas();
    botaoComeçaraJogar = Imprime('div', `PLAY QUIZ`, `botaoComeçar`, container, CorTextoPrincipal, CorBotaoSecundario);

    botaoComeçaraJogar.addEventListener('click', function(){
        ChecarRespostaMaxima();
        PLAY();
    })
    img.addEventListener('click', function(){
        AdicionarFoto();
    })

}


async function obterPergunta(){
        quiz = await fetchQuizData("quiz.json");
        while(questoes<10){
                vetorPerguntas[questoes] = quiz[vetor[questoes]].pergunta;
                alternativasA[questoes] = quiz[vetor[questoes]].respostas[0]["1"];
                alternativasB[questoes] = quiz[vetor[questoes]].respostas[0]["2"];
                alternativasC[questoes] = quiz[vetor[questoes]].respostas[0]["3"];
                alternativasD[questoes] = quiz[vetor[questoes]].respostas[0]["4"];
                questoes++;
                    }
        questoes=0;
}

async function fetchQuizData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}



function ChecarRespostaMaxima(){
    let MaiorRespondida = parseInt(localStorage.getItem('Questoes'));
    if(MaiorRespondida>=questoes){
        questoes = MaiorRespondida;
    }
}
async function PLAY(){
    ApagarTela();


        divCarregando = document.createElement('div');
            divCarregando.setAttribute('class', 'carregando');
                container.appendChild(divCarregando);
                    Carregado = document.createElement('div');
                        Carregado.setAttribute('class', 'carregado');
                    divCarregando.appendChild(Carregado);
           porcentagemCarregado=`${(questoes+1)*9.8}`
            divCarregando.appendChild(Carregado);

        Carregado.style.width = `${porcentagemCarregado}%`;

                divPerguntas = document.createElement('div');
            divPerguntas.setAttribute('class', 'divPerguntas');
        container.appendChild(divPerguntas);

        var numeroQuestao = document.createElement('h1');
            numeroQuestao.setAttribute('class', 'texto');
                numeroQuestao.style.fontSize = '15px';
                    numeroQuestao.innerHTML = `Pergunta ${questoes+1}/10`;
                        divPerguntas.appendChild(numeroQuestao);

                            var PerguntaText = document.createElement('h1');
                        PerguntaText.setAttribute('class', 'texto');
                    PerguntaText.style.fontSize = '20px';
                PerguntaText.style.marginBlock = '50px';
                PerguntaText.innerHTML = `${vetorPerguntas[questoes]}`;
                PerguntaText.style.maxWidth= '320px';
                divPerguntas.appendChild(PerguntaText);

////////////////////// ALTERNATIVAS
        var btn1 = document.createElement('div');
            btn1.innerHTML = `${alternativasA[questoes]}`;
                btn1.setAttribute('class', 'botaoComeçar');
                    btn1.style.margin='2px';
                    btn1.style.width='360px';
                    btn1.style.fontSize='13px';
                        divPerguntas.appendChild(btn1);

                    var btn2 = document.createElement('div');
                btn2.innerHTML = `${alternativasB[questoes]}`;
            btn2.setAttribute('class', 'botaoComeçar');
        btn2.style.margin='2px';
        btn2.style.width='350px';
        btn2.style.fontSize='13px';
        divPerguntas.appendChild(btn2);

        var btn3 = document.createElement('div');
            btn3.innerHTML = `${alternativasC[questoes]}`;
                btn3.setAttribute('class', 'botaoComeçar');
            btn3.style.margin='2px';
            btn3.style.width='350px';
            btn3.style.fontSize='13px';
        divPerguntas.appendChild(btn3);

        var btn4 = document.createElement('div');
            btn4.innerHTML = `${alternativasD[questoes]}`;
                btn4.setAttribute('class', 'botaoComeçar');
            btn4.style.margin='2px';
            btn4.style.width='390px';
            btn4.style.fontSize='13px';
        divPerguntas.appendChild(btn4);
////////////////////// ALTERNATIVAS

        divBotoes = document.createElement('div');
        divBotoes.setAttribute('class', 'divPerguntas');
        divBotoes.style.width="100%";
        divBotoes.style.justifyContent='space-around';
        divBotoes.style.background='none';
        divBotoes.style.margin='20px';
        divBotoes.style.flexDirection='row';
        container.appendChild(divBotoes);

        botaoAnterior = document.createElement('div');
        botaoAnterior.innerHTML = `Voltar`;
        botaoAnterior.style.width='45%';
        botaoAnterior.setAttribute('class', 'botaoComeçar');
            divBotoes.appendChild(botaoAnterior);

        botaoProxima = document.createElement('div');
            botaoProxima.innerHTML = `Próximo`;
            botaoProxima.style.width='45%';
                botaoProxima.setAttribute('class', 'botaoComeçar');
            divBotoes.appendChild(botaoProxima);
    botaoProxima.addEventListener('click', function(){
        if(questoes<9){
            questoes++;
            RegistraQuestoesRespondidas(questoes);
            PLAY();
        } else{
            BemVindo();
        }
    })
    botaoAnterior.addEventListener('click', function(){
        if(questoes>0){
            questoes--;
                PLAY();
        }})
}


function ApagarTela(){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function ChamaMenu(){
    if(settingsclick==false){
        naoclicavel.style.width='100vw';
        naoclicavel.style.height='100%';

        menu = Imprime('div', null, 'divFoto', naoclicavel, CorTextoPrincipal, '#262626');
        menu.style.boxShadow='0px 0px 90px black';
        menu.style.position = "absolute";

        titulo = ImprimeTexto(`Configurações`, 'texto', menu, CorTextoPrincipal);

        btnMudarTema = Imprime('div',`Mudar Tema`, 'botaoComeçar', menu, CorTextoPrincipal, '#474747');
        btnTrocaNick = Imprime('div',`Trocar nickname`, 'botaoComeçar', menu, CorTextoPrincipal, '#474747');
        btnSair = Imprime('div',`Deslogar da conta`, 'botaoComeçar', menu, CorTextoPrincipal, '#474747');

    btnSair.addEventListener('click', function(){
        ApagarTela();
         LimpaLocalStorage();
    })

    btnTrocaNick.addEventListener('click', function(){
        Register();
        FechaMenu();
        })
    settingsclick = true;
    } else{
    FechaMenu();
    }
}

function FechaMenu(){
    naoclicavel.removeChild(menu)
    naoclicavel.style.width='0%';
    naoclicavel.style.height='0%';
    settingsclick = false;
}

async function main(){
    TelaComeçar();
    GerarQuestoesAleatorias();
}


settingsbtn.addEventListener('click', function(){
    ChamaMenu();
})

botaoOk.addEventListener('click', function(){
    if(inputNome.value!=''){
        localStorage.setItem('nomeGuardado', `${inputNome.value}`);
        AdicionarFoto(inputNome);
    }
})