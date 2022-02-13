console.log('[Eduardo] Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let frames = 0;

//Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    }
};

//Chão
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoChao = 1.5;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoChao;

            chao.x = movimentacao % repeteEm;

            // console.log("[chao.x]", chao.x);
            // console.log("[repeteEm]", repeteEm);
            // console.log("[movimentacao]", movimentacao);
        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        }
    };

    return chao;
}

//Personagem
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
};

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        movimentos: [{
                spriteX: 0,
                spriteY: 0,
            },
            {
                spriteX: 0,
                spriteY: 26,
            },
            {
                spriteX: 0,
                spriteY: 52,
            }
        ],
        frameAtual: 0,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                //console.log("Fez colisão");
                som_HIT.play();

                setTimeout(() => {
                    mudaParaTela(telas.INICIO)
                }, 400)
                return;
            };

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames;

            //console.log(passouIntervalo)
            if (passouIntervalo === 0) {
                const baseIncremento = 1; //
                const incremento = baseIncremento + flappyBird.frameAtual; // Incrementa + 1 no valor do frame atual
                const baseRepeticao = flappyBird.movimentos.length; // Limita o incremento de acordo com o tamanho do array "movimentos"
                flappyBird.frameAtual = incremento % baseRepeticao; // Altera o valor do Frame atual
            };

            // console.log("[incremento]", incremento)
            // console.log("[baseRepeticao]", baseRepeticao)
            // console.log("[flappyBird.frameAtual]", flappyBird.frameAtual)
        },
        desenha() {
            flappyBird.atualizaFrameAtual()
            const {
                spriteX,
                spriteY
            } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage( //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                sprites, //imagem que será utilizada
                spriteX, spriteY, //Posição do Sprite na posição X e Y.
                flappyBird.largura, flappyBird.altura, //Tamanho do recorte na sprite.
                flappyBird.x, flappyBird.y, //Posição X e Y da sprite na tela.
                flappyBird.largura, flappyBird.altura //Tamanho do sprite na tela.
            );
        },
        pula() {
            //console.log("Tenho que pular");
            //console.log("[Antes] ", flappyBird.velocidade)
            flappyBird.velocidade = -flappyBird.pulo
            //console.log("[Depois] ", flappyBird.velocidade)
        }
    }

    return flappyBird;
};


//Mensagem da Tela Inicial
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        );
    }
};


//Telas
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    };
};

const telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        },
    },
    JOGO: {
        desenha() {
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
        },
        click() {
            globais.flappyBird.pula();
        },
        atualiza() {
            globais.flappyBird.atualiza();
            globais.chao.atualiza();
        },
    },
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
};

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(telas.INICIO);
loop();