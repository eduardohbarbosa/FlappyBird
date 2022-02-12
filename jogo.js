console.log('[Eduardo] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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
        contexto.fillRect(0,0, canvas.width, canvas.height);

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
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
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

//Personagem
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    desenha() {
        contexto.drawImage( //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            sprites, //imagem que será utilizada
            flappyBird.spriteX, flappyBird.spriteY,     //Posição do Sprite na posição X e Y.
            flappyBird.largura, flappyBird.altura,     //Tamanho do recorte na sprite.
            flappyBird.x, flappyBird.y,               //Posição X e Y da sprite na tela.
            flappyBird.largura, flappyBird.altura    //Tamanho do sprite na tela.
        );
    }
}
;

function loop(){
    planoDeFundo.desenha();
    chao.desenha()/
    flappyBird.desenha();

    //flappyBird.x = flappyBird.x + 1;
    //flappyBird.y = flappyBird.y + 1;
    
    requestAnimationFrame(loop);
}

loop()
