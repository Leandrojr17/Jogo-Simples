document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const scoreDisplay = document.querySelector('.score-display');

    // Inicializa o texto de pontuação
    scoreDisplay.textContent = 'Canos Pulados: 0';

    let pipeCount = 0;
    let lastPipePosition = 0;
    let pipePassed = false;

    //Lógica do Pulo
    const jump = () => {
        if (!mario.classList.contains('jump')) {
            mario.classList.add('jump');

            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);
        }
    };

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');
        
        // Detecta quando o cano passa pela posição do Mario (120px)
        if (lastPipePosition > 120 && pipePosition <= 120) {
            pipePassed = true;
        }

        // Verifica se o Mario pulou o cano com sucesso
        if (pipePassed && pipePosition < 0) {
            pipeCount++;
            scoreDisplay.textContent = `Canos Pulados: ${pipeCount}`;
            pipePassed = false;
        }

        //Lógica pro Mario realizar o pulo pelo cano e se fez isso com sucesso
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            scoreDisplay.textContent = `Game Over!! Canos Pulados: ${pipeCount}`;
            clearInterval(loop);
        }
        
        // Atualiza a última posição do cano para a próxima verificação
        lastPipePosition = pipePosition;
    }, 10);

    document.addEventListener('keydown', jump);
});