let minJSON = 1; let maxJSON = 40;
let questoes = 0;
let vetor = [];
let vetorPerguntas = [];
let alternativa1=[];
let alternativa2=[];
let alternativa3=[];
let alternativa4=[];
var linkFotoUser;
const container = document.querySelector('.container');
let settingsbtn = document.querySelector('.icoconfig i');
let settingsarea = document.querySelector('.areanoclick');
let settingsclick = false;
let vetorContadordeDias = [];
let prosseguir = 'false';
let CorBotaoPrincipal;
let CorBotaoSecundario;
let CorDivPrincipal;
let CorDivSecundaria;
let CorTextoPrincipal;
let CorTextoSecundario;

const naoclicavel = document.querySelector('.areanoclick');

let agora = new Date();
let diaHoje = `${agora.getDate()}${agora.getMonth()+1}${agora.getFullYear()}`

main();
////////////////// PARTE DO CÓDIGO DEDICADA AO LOCALSTORAGE
if(localStorage.getItem('Tema')!='Padrão' && localStorage.getItem('Tema')!='Dark'){
    localStorage.setItem('Questoes', 0); ////// mudar de lugar depois
    localStorage.setItem('VetorQuestoesDiarias', 0); ////// mudar de lugar depois
    localStorage.setItem('Tema','Padrão');
    MudarTema();
}

localStorage.setItem('lvlUser', '0');
localStorage.setItem('diasCont', '0');
localStorage.setItem('porcAcertos', '0');

function RegistraDiasJogados(){
    diaHoje = parseInt(diaHoje);
    console.log(diaHoje)
    console.log(localStorage.getItem('DiasJogados'))

    localStorage.getItem('DiasJogados');

    if(parseInt(localStorage.getItem('DiasJogados'))==diaHoje){
        console.log('voce ja jogou hoje');
    } else{
        console.log("pode jogar")
        localStorage.setItem('DiasJogados', null);
    }
}

function RegistraQuestoesRespondidas(questoes){
    localStorage.setItem('Questoes',  questoes);
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

    ImprimeTexto(`A/E:<br><br>${localStorage.getItem('porcAcertos')}%` , 'textoSTATUS' , divEstats, CorTextoSecundario);
}

function ChecarRespostaMaxima(){
    let MaiorRespondida = parseInt(localStorage.getItem('Questoes'));
    if(MaiorRespondida>=questoes){
        questoes = MaiorRespondida;
    }
}

////////////////// PARTE DO CÓDIGO DEDICADA AO LOCALSTORAGE

function obterNumeroAleatorio(minJSON, maxJSON) {
    return Math.floor(Math.random() * (maxJSON - minJSON + 1)) + minJSON;
}

function GerarQuestoesAleatorias() {
    while (questoes < 10){
        let randomID = obterNumeroAleatorio(minJSON, maxJSON);
        if (!vetor.includes(randomID)) {
            vetor[questoes] = randomID;
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
function MudarTema(){
    if(localStorage.getItem('Tema')!='Dark'){
        Cores('linear-gradient(to left, rgb(23, 3, 36), rgb(9, 24, 46))', '#3A0E6F','linear-gradient(to right, rgb(27, 192, 27), rgb(38, 156, 38))', '#7B7787', '#6120AA', '#FFFFFF', '#3E2A86');
        settingsbtn.style.color = '#C576E4';
    } else{
        Cores('#0E0E0E', '#4A4D54','#5662F4', '#313338', '#313338', '#F2F3F5', '#688DA4');
        settingsbtn.style.color = CorBotaoSecundario;
    }

}
function Cores(fundo, cbp, cbs, cdp, cds, ct1, ct2){
    document.body.style.background = fundo;
    CorBotaoPrincipal = cbp;
    CorBotaoSecundario = cbs;
    CorDivPrincipal = cdp;
    CorDivSecundaria = cds;
    CorTextoPrincipal = ct1;
    CorTextoSecundario = ct2;
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
    var btnComeçar = Imprime('div','>> COMEÇAR <<', 'botaoComeçar', container, CorTextoPrincipal, CorBotaoPrincipal);
    btnComeçar.addEventListener('click', function(){
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
    ApagarTela();
    container.style.justifyContent= 'center';
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
    settingsbtn.style.top="0"; ///// Faz o botao Settings Aparecer
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


async function obterPerguntaJSON(){
    try {
        const quiz = await fetchQuizData("quiz.json");

        for (let questoes = 0; questoes < 10; questoes++) {
            vetorPerguntas[questoes] = quiz[vetor[questoes]].pergunta;
            alternativa1[questoes] = quiz[vetor[questoes]].respostas[0]["1"];
            alternativa2[questoes] = quiz[vetor[questoes]].respostas[0]["2"];
            alternativa3[questoes] = quiz[vetor[questoes]].respostas[0]["3"];
            alternativa4[questoes] = quiz[vetor[questoes]].respostas[0]["4"];
        }
    } catch (error) {
        console.log('Erro no JSON');
    }
}

async function fetchQuizData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.log('Erro no fetch JSON');
    }
}


function StyleTBNAlternativas(btn){
    btn.style.margin='2px';
    btn.style.width='360px';
    btn.style.fontSize='13px';
}

function GeraAlternativas(num, q){
    num = Imprime('div', `${q[questoes]}`, 'botaoComeçar', divPerguntas, CorTextoPrincipal, CorBotaoPrincipal);
    StyleTBNAlternativas(num)
    return num;
}

function EscolhaAlternativa(){
    btn1 = GeraAlternativas(1, alternativa1);
    btn2 = GeraAlternativas(2, alternativa2);
    btn3 = GeraAlternativas(3, alternativa3);
    btn4 = GeraAlternativas(4, alternativa4);
    btn1.addEventListener('click', function(){
        BtnProsseguir(btn1);
    })
    btn2.addEventListener('click', function(){
        BtnProsseguir(btn2);
    })
    btn3.addEventListener('click', function(){
        BtnProsseguir(btn3);
    })
    btn4.addEventListener('click', function(){
        BtnProsseguir(btn4);
    })
}

function BtnProsseguir(btn){
    btn1.style.background = CorBotaoPrincipal;
    btn2.style.background = CorBotaoPrincipal;
    btn3.style.background = CorBotaoPrincipal;
    btn4.style.background = CorBotaoPrincipal;
    btn.style.background = CorTextoSecundario;
    prosseguir = true;
    Proximo.style.opacity='100%';
}

async function PLAY(){
    ApagarTela();

    BarraLoad = Imprime('div', null, 'carregando', container, null, null);
    BarraLoad.style.height = '12px';
    BarraFull = Imprime('div', null, 'carregado', BarraLoad, null, CorBotaoSecundario);

    BarraFull.style.width = `${(questoes+1)*9.8}%`;

    divPerguntas = Imprime('div', null, 'divPerguntas', container,null,CorDivSecundaria);

    numeroQuestao = Imprime('h1', `Pergunta ${questoes+1}/10`, 'texto', divPerguntas, CorTextoPrincipal,null);
    numeroQuestao.style.fontSize = '15px';

    PerguntaText = Imprime('h1', `${vetorPerguntas[questoes]}`, 'texto', divPerguntas, CorTextoPrincipal,null);
    PerguntaText.style.fontSize = '20px';
    PerguntaText.style.marginBlock = '50px';
    PerguntaText.style.maxWidth= '320px';

    EscolhaAlternativa();

    BotoesProxx();

}

function DivdosBotoes(){
    divBotoes = Imprime('div', null, 'divPerguntas',container, null, null);
    divBotoes.style.width="100%";
    divBotoes.style.justifyContent='space-around';
    divBotoes.style.background='none';
    divBotoes.style.margin='20px';
    divBotoes.style.flexDirection='row';
    return divBotoes;
}

function BotoesProxx(){

    prosseguir = false;

    DivBotoes = DivdosBotoes();

    Anterior = Imprime('div', 'Voltar', 'botaoComeçar', divBotoes, CorTextoPrincipal, CorBotaoPrincipal);
    Anterior.style.width='45%';

    Proximo = Imprime('div', 'Próximo', 'botaoComeçar', divBotoes, CorTextoPrincipal, CorBotaoPrincipal);
    Proximo.style.width='45%';
    Proximo.style.opacity='35%';

    if(questoes<localStorage.getItem('Questoes')){
        prosseguir = true;
        Proximo.style.opacity='100%';
    }

    Anterior.addEventListener('click', function(){
        if(questoes>0){
            questoes--;
                PLAY();
        }})
    Proximo.addEventListener('click', function(){
        if(questoes<9 && prosseguir==true){
            questoes++;
            if(questoes>parseInt(localStorage.getItem('Questoes'))){
                RegistraQuestoesRespondidas(questoes);
            }
            PLAY();
        } else if(questoes==9){
            localStorage.setItem('DiasJogados', parseInt(diaHoje));
            BemVindo();
        }
    })
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

        btnMudarTema = Imprime('div',`Tema: ${localStorage.getItem('Tema')}`, 'botaoComeçar', menu, CorTextoPrincipal, '#474747');
        btnTrocaNick = Imprime('div',`Alterar nome`, 'botaoComeçar', menu, CorTextoPrincipal, '#474747');
        btnSair = Imprime('div',`Sair`, 'botaoComeçar', menu, CorTextoPrincipal, '#474747');

    btnMudarTema.addEventListener('click', function(){
        if(localStorage.getItem('Tema') == 'Padrão'){
            localStorage.setItem('Tema', 'Dark');
        } else{
            localStorage.setItem('Tema', 'Padrão');
        }
        ApagarTela();
        MudarTema();
        FechaMenu();
        BemVindo();
    })
    btnTrocaNick.addEventListener('click', function(){
            Register();
            FechaMenu();
        })
        settingsclick = true;
    } else{
        FechaMenu();
    }
    btnSair.addEventListener('click', function(){
        if(confirm("Deseja sair da conta? todo o progresso será perdido!")){
            ApagarTela();
         LimpaLocalStorage();
        } else{
            FechaMenu();
        }
    })
}

function FechaMenu(){
    naoclicavel.removeChild(menu)
    naoclicavel.style.width='0%';
    naoclicavel.style.height='0vw';
    settingsclick = false;
}

async function main(){
    MudarTema();
    obterPerguntaJSON();
    TelaComeçar();
    GerarQuestoesAleatorias();
    RegistraDiasJogados();
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