console.log('[Eduardo] Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_hit.wav';

const som_PULO = new Audio();
som_PULO.src = './efeitos/efeitos_pulo.wav';

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

                mudaParaTela(telas.GAME_OVER)

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

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
    
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                //Cano do Céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                );
    
                //Cano do Chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                );

                par.canoCeu = {
                    x: canoCeuX,
                    y: canoCeuY + canos.altura,
                }

                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY,
                }

            })
        },
        pares: [ ],
        atualiza(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                //console.log("[passou100Frames]", passou100Frames)
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1 )
                });
            }

            canos.pares.forEach(function(par){
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)){
                    console.log('Você Perdeu')
                    mudaParaTela(telas.GAME_OVER)
                }

                if(par.x + canos.largura<= 0){
                    canos.pares.shift()
                }
            })
        },
        temColisaoComOFlappyBird(par){
            const cabecaFlappy = globais.flappyBird.y;
            const peFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
                //console.log("Flappy Bird invadiu a área dos canos")

                if(cabecaFlappy <= par.canoCeu.y){
                    //console.log("Bateu cano ceu")
                    som_HIT.play();
                    return true;
                }
                
                if(peFlappy >= par.canoChao.y){
                    //console.log("Bateu cano chao")
                    som_HIT.play();
                    return true;
                }
            }

            return false
        },
    }

    return canos;
}

function criaPlacar(){
    const placar = {
        pontuacao : 0,
        desenha(){
            contexto.font = `24px 'Press Start 2P'`
            contexto.textAlign = `right`
            contexto.fillStyle = 'white'
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35)
            
        },
        atualiza(){
            const intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames === 0;

            if(passouIntervalo){
                placar.pontuacao = placar.pontuacao + 1
            }
        },
    }

    return placar
}


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

    //Mensagem da Tela de Game Over
    const mensagemGameOver = {
        spriteX: 133,
        spriteY: 153,
        largura: 233,
        altura: 202,
        x: (canvas.width / 2) - 233 / 2,
        y: 50,
        desenha(){
            contexto.drawImage(
                sprites,
                mensagemGameOver.spriteX, mensagemGameOver.spriteY,
                mensagemGameOver.largura, mensagemGameOver.altura,
                mensagemGameOver.x, mensagemGameOver.y,
                mensagemGameOver.largura, mensagemGameOver.altura
            );
        }
    }


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
                globais.canos = criaCanos();
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
            inicializa() {
                globais.placar = criaPlacar();
            },
            desenha() {
                planoDeFundo.desenha();
                globais.canos.desenha();
                globais.chao.desenha();
                globais.flappyBird.desenha();
                globais.placar.desenha();
            },
            click() {
                globais.flappyBird.pula();
                som_PULO.play();
            },
            atualiza() {
                globais.flappyBird.atualiza();
                globais.chao.atualiza();
                globais.canos.atualiza();
                globais.placar.atualiza();
            },
        },
        GAME_OVER : {
            desenha() {
                mensagemGameOver.desenha();
            },
            click() {
                mudaParaTela(telas.INICIO);
            },
            atualiza() {

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