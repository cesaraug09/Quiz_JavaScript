let CorBotaoPrincipal;
let CorBotaoSecundario;
let CorDivPrincipal;
let CorDivSecundaria;
let CorTextoPrincipal;
let CorTextoSecundario;
var Marcados;
var Pergunta; var A; var B; var C; var D; var Certa; var Explicação;
let minJSON = 1; let maxJSON = 40;
let questoes = 0;
let settingsclick = false;
let prosseguir = 'false';
let vetorContadordeDias = [];
let vetor = [];
const container = document.querySelector('.container');
let settingsbtn = document.querySelector('.icoconfig i');
let settingsarea = document.querySelector('.areanoclick');
const naoclicavel = document.querySelector('.areanoclick');

var acertos = parseInt(localStorage.getItem('qntAcertos'));
var diasJogados = parseInt(localStorage.getItem('diasJogados'));

////////////////// PARTE DO CÓDIGO DEDICADA AO LOCALSTORAGE

if(localStorage.getItem('Tema')!='Padrão' && localStorage.getItem('Tema')!='Dark'){
    localStorage.setItem('Tema','Padrão');
    MudarTema();
}

if(!localStorage.getItem('qntAcertos')){
    localStorage.setItem('qntAcertos', 0);
    acertos = parseInt(localStorage.getItem('qntAcertos'));
    localStorage.setItem('qntAcertos', acertos);
}

function qntAcertos(){
        localStorage.setItem('qntAcertos', acertos+=1);
}

function ChecaJogouHoje(){
    let agora = new Date();
    let diaHoje = `${agora.getDate()}${agora.getMonth()+1}${agora.getFullYear()}`

    if(parseInt(localStorage.getItem('diaHoje'))==diaHoje){
        let vetorStrings = localStorage.getItem('QuestoesAleatdoDia')
        vetor = vetorStrings.split(',').map(Number);
    } else if(parseInt(localStorage.getItem('diaHoje'))!=parseInt(diaHoje)){
        LimpaCache();
        GerarQuestoesAleatorias();
        localStorage.setItem('diaHoje', diaHoje);
    }
}

function DiasJogados(){
    if(localStorage.getItem('diasJogados')==null){
        localStorage.setItem('diasJogados', 0);
        diasJogados = parseInt(localStorage.getItem('diasJogados'));
    } else{
        localStorage.setItem('diasJogados', diasJogados)
    }
}

function LimpaCache(){
    localStorage.removeItem('QuestoesAleatdoDia');
    localStorage.removeItem('Questoes');
    localStorage.removeItem(`terminou`)
    localStorage.removeItem('MarcadosPeloUsuario')
    localStorage.removeItem('qntAcertos');
}

function RegistraQuestoesRespondidas(questoes){
    if(questoes>localStorage.getItem('Questoes') && questoes<=9){
    localStorage.setItem('Questoes',  questoes);
}
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


function ChecarRespostaMaxima(){
        let MaiorRespondida = parseInt(localStorage.getItem('Questoes'));
        if(MaiorRespondida>=questoes){
            questoes = MaiorRespondida;
        }
    }


function obterNumeroAleatorio(minJSON, maxJSON) { /////// Uma vez por dia
        return Math.floor(Math.random() * (maxJSON - minJSON + 1)) + minJSON;
    }

function GerarQuestoesAleatorias(){ /////// Uma vez por dia
        while (questoes < 10){
            let randomID = obterNumeroAleatorio(minJSON, maxJSON);
            if (!vetor.includes(randomID)) {
                vetor[questoes] = randomID;
                questoes++;
            }
        }
        localStorage.setItem('QuestoesAleatdoDia', vetor);
        questoes=0;
    }

function RegistraAltMarcadas(resposta){
        if(localStorage.getItem('MarcadosPeloUsuario')!=null){
            ResgataArrayMarcados()
            Marcados.push(resposta)
            if(Marcados.length<=10){
                localStorage.setItem('MarcadosPeloUsuario', Marcados);
            }
        } else{
            localStorage.setItem('MarcadosPeloUsuario', resposta);
        }
    }

function ResgataArrayMarcados(){
        var vetorMarcados = localStorage.getItem('MarcadosPeloUsuario')
        if(localStorage.getItem('MarcadosPeloUsuario')!=null){
            Marcados = vetorMarcados.split(',').map(Number);
        } else{
            Marcados =[];
        }
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
            Cores('#0A0714', '#4A4D54','linear-gradient(to right, #C129EB, #9733DD)', '#313338', '#313338', '#F2F3F5', '#9F9F9F');
            settingsbtn.style.color = '#C129EB';
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
                    var linkFotoUser = e.target.result;
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

    function PlacarEstatisticas(){
        nomeUsuario = ImprimeTexto(`${localStorage.getItem('nomeGuardado')}`, 'texto', divFoto,  CorTextoSecundario);
        nomeUsuario.style.marginTop='-120px';

        divEstats = Imprime('div', null, 'divStatus', container, CorTextoSecundario, CorDivPrincipal);

        ImprimeTexto(`Acertou:<br><br>${localStorage.getItem('qntAcertos')}` , 'textoSTATUS' , divEstats, CorTextoSecundario);

        var divEstatsplus = document.createElement('div');
        divEstatsplus.setAttribute('class', 'divStatusplus');
        divEstats.appendChild(divEstatsplus);

        ImprimeTexto(`SEQUÊNCIA:<br><br>${localStorage.getItem('diasCont')}` , 'textoSTATUS' , divEstats, CorTextoSecundario);

        var divEstatsplus1 = document.createElement('div');
        divEstatsplus1.setAttribute('class', 'divStatusplus');
        divEstats.appendChild(divEstatsplus1);

        ImprimeTexto(`A/E:<br><br>${localStorage.getItem('porcAcertos')}%` , 'textoSTATUS' , divEstats, CorTextoSecundario);
    }
    ////////////////// PARTE VISUAL DO FRONT


    function TelaComeçar(){
        ImprimeIMG('logo.png', 'logo', container);
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
            Pergunta = quiz[vetor[questoes]-1].pergunta;
            A = quiz[vetor[questoes]-1].respostas[0]["1"];
            B = quiz[vetor[questoes]-1].respostas[0]["2"];
            C = quiz[vetor[questoes]-1].respostas[0]["3"];
            D = quiz[vetor[questoes]-1].respostas[0]["4"];
            Certa = quiz[vetor[questoes]-1].verdadeira;
            Explicação = quiz[vetor[questoes]-1].explicação;
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
    num = Imprime('div', `${q}`, 'botaoComeçar', divPerguntas, CorTextoPrincipal, CorBotaoPrincipal);
    StyleTBNAlternativas(num)
    return num;
}

function EscolhaAlternativa(){
    btn1 = GeraAlternativas(1, A);
    btn2 = GeraAlternativas(2, B);
    btn3 = GeraAlternativas(3, C);
    btn4 = GeraAlternativas(4, D);
    if(questoes==parseInt(localStorage.getItem('Questoes')) && localStorage.getItem('Questoes')<= 9 && !localStorage.getItem('terminou')|| localStorage.getItem('Questoes')==null){
        EscutarBotoes(btn1, btn2, btn3, btn4);
    } else{
        Retrospectiva();
    }
}

function Retrospectiva(){
        const buttons = [btn1, btn2, btn3, btn4];
        buttons[Certa-1].style.background = CorBotaoSecundario;
        if(Certa-1 != Marcados[questoes]-1){
            buttons[Marcados[questoes]-1].style.background = '#AB3043'
    }
}

function EscutarBotoes(btn1, btn2, btn3, btn4){
    btn1.addEventListener('click', function(){
        if(!clicou){
        VerdadeiraFalsa(1, btn1)}
    })
    btn2.addEventListener('click', function(){
        if(!clicou){
        VerdadeiraFalsa(2, btn2)}
    })
    btn3.addEventListener('click', function(){
        if(!clicou){
        VerdadeiraFalsa(3, btn3)}
    })
    btn4.addEventListener('click', function(){
        if(!clicou){
        VerdadeiraFalsa(4, btn4)}
    })
}

function VerdadeiraFalsa(num, btnclicou){
    RegistraQuestoesRespondidas(questoes+1);
    const buttons = [btn1, btn2, btn3, btn4];
    clicou = true;
    BtnProsseguir();
    if (num === Certa) {
        btnclicou.style.background = CorBotaoSecundario; // Verde para a resposta correta
        btnclicou.style.animation = 'acertou 1s ease'
        RegistraAltMarcadas(num)
        qntAcertos();
    } else {
        btnclicou.style.background = '#AB3043';
        buttons[Certa-1].style.background = CorBotaoSecundario;
        btnclicou.style.animation = 'errou 1s ease'
        RegistraAltMarcadas(num)
    }
}

function BtnProsseguir(){
    prosseguir = true;
    Proximo.style.opacity='100%';
}

async function PLAY(){
    await obterPerguntaJSON();
    ApagarTela();

    BarraLoad = Imprime('div', null, 'carregando', container, null, null);
    BarraLoad.style.height = '12px';
    BarraFull = Imprime('div', null, 'carregado', BarraLoad, null, CorBotaoSecundario);

    BarraFull.style.width = `${(questoes+1)*9.8}%`;

    divPerguntas = Imprime('div', null, 'divPerguntas', container,null,CorDivSecundaria);

    numeroQuestao = Imprime('h1', `Pergunta ${questoes+1}/10`, 'texto', divPerguntas, CorTextoPrincipal,null);
    numeroQuestao.style.fontSize = '15px';

    PerguntaText = Imprime('h1', `${Pergunta}`, 'texto', divPerguntas, CorTextoPrincipal,null);
    PerguntaText.style.fontSize = '20px';
    PerguntaText.style.marginBlock = '50px';
    PerguntaText.style.maxWidth= '320px';

    clicou = false;
    EscolhaAlternativa();

    BotoesProxx();

}

function DivdosBotoes(){
    divBotoes = Imprime('div', null, 'divPerguntas',container, null, null);
    divBotoes.style.width="100%";
    divBotoes.style.justifyContent='space-around';
    divBotoes.style.background='none';
    divBotoes.style.marginTop='20px';
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
        if(questoes>0 && clicou == false){
            questoes--;
                PLAY();
        }else if(questoes==0){
            BemVindo();
        }
    })

    Proximo.addEventListener('click', function(){
        if(questoes<9 && prosseguir==true){
            questoes++;
            RegistraQuestoesRespondidas(questoes);
            PLAY();
        } else if(questoes==9 && Marcados.length==10){
            BemVindo();
            localStorage.setItem(`terminou`, true)
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
    ResgataArrayMarcados();
    MudarTema();
    TelaComeçar();
    ChecaJogouHoje();
    ChecarRespostaMaxima();
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

main();