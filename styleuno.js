var gameboard = document.getElementById('gameboard');
var gameboardW = 1250;
var gameboardH = 750;
var paleta = document.getElementById('paleta');
var paletaW = 200;
var paletaL = 525;
var paletaR = paletaL + paletaW;
var kloc = document.getElementById('kloc');
var kloc2 = document.getElementById('kloc2');
var kloc3 = document.getElementById('kloc3');
var gameOVER = document.getElementById('gameover');
var FPS = 30;
var moveX = 25;
var ballX = 10;
var ballY = 10;
var ballTop = 375;
var ballDown = ballTop + 20;
var ballLeft = 400;
var block = {
    width: 250,
    height: 30,
    top: 50,
    left: 200
};
var block2 = {
    width: 120,
    height: 30,
    top: 150,
    left: 70
};
var block3 = {
    width: 350,
    height: 30,
    top: 250,
    left: 800
};
var blockMoveX = 20;
var block2MoveX = 15;
var block3MoveX = 30;
var score = 0;
var lifeno = 5;
//Load all elements
window.addEventListener('load', function () {
    var paleta = document.getElementById('paleta');
    paleta.style.width = paletaW + 'px';
    paleta.style.top = 700 + 'px';
    paleta.style.left = 525 + 'px';
    var gameboard = document.getElementById('gameboard');
    gameboard.style.width = gameboardW + 'px';
    gameboard.style.height = 750 + 'px';
    var ball = document.getElementById('ball');
    ball.style.top = 375 + 'px';
    ball.style.left = 490 + 'px';
    var kloc = document.getElementById('kloc');
    kloc.style.height = block.height + 'px';
    kloc.style.width = block.width + 'px';
    kloc.style.top = block.top + 'px';
    kloc.style.left = block.left + 'px';
    var kloc2 = document.getElementById('kloc2');
    kloc2.style.height = block2.height + 'px';
    kloc2.style.width = block2.width + 'px';
    kloc2.style.top = block2.top + 'px';
    kloc2.style.left = block2.left + 'px';
    var kloc3 = document.getElementById('kloc3');
    kloc3.style.height = block3.height + 'px';
    kloc3.style.width = block3.width + 'px';
    kloc3.style.top = block3.top + 'px';
    kloc3.style.left = block3.left + 'px';
    var score = document.getElementById('score');
    score.style.top = 800 + 'px';
    score.style.left = 5 + '%';
    var lives = document.getElementById('lives');
    lives.style.top = 800 + 'px';
    lives.style.left = 75 + '%';
    var restart = document.getElementById('restart');
    restart.style.top = 820 + 'px';
    restart.addEventListener('click', function () {
        window.location.reload();
    });
    document.getElementById('life').innerHTML = '' + lifeno;
    setInterval(function () { faster(); }, 5000);
    //time start
    setInterval(function () {
        moveAll();
        moveBall();
        hit();
        blockMove();
        hitBlocks();
    }, 1000 / FPS);
});
//controls
window.addEventListener('keydown', function (e) {
    var paleta = document.getElementById('paleta');
    switch (e.key) {
        case 'ArrowLeft':
            paleta.style.left = parseInt(paleta.style.left) - moveX + 'px';
            if (parseInt(paleta.style.left) < 0) {
                paleta.style.left = 0 + 'px';
                break;
            }
            else {
                break;
            }
        case 'ArrowRight':
            paleta.style.left = parseInt(paleta.style.left) + moveX + 'px';
            var paletaLeft = parseInt(paleta.style.left) + paletaW;
            if (paletaLeft > gameboardW) {
                paleta.style.left = gameboardW - paletaW + "px";
                break;
            }
            else {
                break;
            }
        // case 'ArrowUp':
        //   paleta.style.top = parseInt(paleta.style.top) - moveX + 'px';
        //   break;
        // case 'ArrowDown':
        //   paleta.style.top = parseInt(paleta.style.top) + moveX + 'px';
        //   break;
    }
});
var paletaPos = function () {
    paletaL = paletaL + moveX;
};
var moveAll = function () {
    ballLeft = ballLeft + ballX;
    ballTop = ballTop + ballY;
};
var moveBall = function () {
    var ball = document.getElementById('ball');
    ball.style.left = ballLeft + 'px';
    ball.style.top = ballTop + 'px';
    if (ballLeft > gameboardW - 20) {
        ballX = -ballX;
    }
    if (ballLeft < 0) {
        ballX = -ballX;
    }
    if (ballTop >= gameboardH - 20) {
        ballTop = gameboardH / 2;
        ballY = -ballY;
        livesCount();
    }
    if (ballTop <= 0) {
        ballY = -ballY;
    }
};
var hit = function () {
    var paleta = document.getElementById('paleta');
    var paletaLewa = parseInt(paleta.style.left);
    var paletaPrawa = paletaLewa + paletaW;
    var paletaGora = parseInt(paleta.style.top);
    if (ballLeft > paletaLewa && ballLeft < paletaPrawa && ballTop + 20 >= paletaGora && ballTop + 20 < paletaGora + 20) {
        ballY = -ballY;
        // var deltaX = ballX - (paletaLewa+paletaW/2);
        // ballX = deltaX * 0.02;
    }
};
var blockMove = function () {
    var kloc = document.getElementById('kloc');
    block.left = block.left + blockMoveX;
    kloc.style.left = block.left + 'px';
    if (block.left > gameboardW - block.width) {
        blockMoveX = -blockMoveX;
    }
    if (block.left < 0) {
        blockMoveX = -blockMoveX;
    }
    var kloc2 = document.getElementById('kloc2');
    block2.left = block2.left + block2MoveX;
    kloc2.style.left = block2.left + 'px';
    if (block2.left > gameboardW - block2.width) {
        block2MoveX = -block2MoveX;
    }
    if (block2.left < 0) {
        block2MoveX = -block2MoveX;
    }
    var kloc3 = document.getElementById('kloc3');
    block3.left = block3.left + block3MoveX;
    kloc3.style.left = block3.left + 'px';
    if (block3.left > gameboardW - block3.width) {
        block3MoveX = -block3MoveX;
    }
    if (block3.left < 0) {
        block3MoveX = -block3MoveX;
    }
};
var hitBlocks = function () {
    var ball = document.getElementById('ball');
    var klocek = document.getElementById('kloc');
    var klocek2 = document.getElementById('kloc2');
    var klocek3 = document.getElementById('kloc3');
    var klocekgora = parseInt(klocek.style.top);
    var klocekdol = klocekgora + parseInt(klocek.style.height);
    var kloceklewa = parseInt(klocek.style.left);
    var klocekprawa = kloceklewa + parseInt(klocek.style.width);
    var klocek2gora = parseInt(klocek2.style.top);
    var klocek2dol = klocek2gora + parseInt(klocek2.style.height);
    var klocek2lewa = parseInt(klocek2.style.left);
    var klocek2prawa = klocek2lewa + parseInt(klocek2.style.width);
    var klocek3gora = parseInt(klocek3.style.top);
    var klocek3dol = klocek3gora + parseInt(klocek3.style.height);
    var klocek3lewa = parseInt(klocek3.style.left);
    var klocek3prawa = klocek3lewa + parseInt(klocek3.style.width);
    if (ballLeft > kloceklewa && ballLeft < klocekprawa && ballTop + 20 >= klocekgora && ballTop + 20 < klocekdol - 10) {
        ballY = -ballY;
        klocek.classList.add('animkloc');
        scoreCount(3);
        setTimeout(function () {
            klocek.classList.remove('animkloc');
        }, 500);
    }
    if (ballLeft > kloceklewa && ballLeft < klocekprawa && ballTop >= klocekdol && ballTop < klocekgora + 10) {
        ballY = -ballY;
        klocek.classList.add('animkloc');
        scoreCount(3);
        setTimeout(function () {
            klocek.classList.remove('animkloc');
        }, 500);
    }
    if (ballLeft > klocek2lewa && ballLeft < klocek2prawa && ballTop + 20 >= klocek2gora && ballTop + 20 < klocek2dol - 10) {
        ballY = -ballY;
        klocek2.classList.add('animkloc');
        scoreCount(5);
        setTimeout(function () {
            klocek2.classList.remove('animkloc');
        }, 500);
    }
    if (ballLeft > klocek2lewa && ballLeft < klocek2prawa && ballTop >= klocek2dol && ballTop < klocek2gora + 10) {
        ballY = -ballY;
        klocek2.classList.add('animkloc');
        scoreCount(5);
        setTimeout(function () {
            klocek2.classList.remove('animkloc');
        }, 500);
    }
    if (ballLeft > klocek3lewa && ballLeft < klocek3prawa && ballTop + 20 >= klocek3gora && ballTop + 20 < klocek3dol - 10) {
        ballY = -ballY;
        klocek3.classList.add('animkloc');
        scoreCount(1);
        setTimeout(function () {
            klocek3.classList.remove('animkloc');
        }, 500);
    }
    if (ballLeft > klocek3lewa && ballLeft < klocek3prawa && ballTop >= klocek3dol && ballTop < klocek3gora + 10) {
        ballY = -ballY;
        klocek3.classList.add('animkloc');
        scoreCount(1);
        setTimeout(function () {
            klocek3.classList.remove('animkloc');
        }, 500);
    }
};
var scoreCount = function (a) {
    score = score + a;
    document.getElementById('points').innerHTML = '' + score;
};
var livesCount = function () {
    lifeno--;
    ballX = 10;
    ballY = 10;
    document.getElementById('life').innerHTML = '' + lifeno;
    if (lifeno <= 0) {
        gameover();
    }
};
var gameover = function () {
    var gameOVER = document.getElementById('gameover');
    lifeno = 5;
    document.getElementById('life').innerHTML = '' + lifeno;
    ballX = 0;
    ballY = 0;
    blockMoveX = 0;
    block2MoveX = 0;
    block3MoveX = 0;
    gameOVER.style.opacity = '' + 1;
};
var faster = function () {
    if (ballY > 0) {
        ballY++;
    }
    else {
        ballY--;
    }
};
