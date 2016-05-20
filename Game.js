var Game = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var stateChange = false;
    var achieved2048flag=false;

    function moveLeft() {
        for (var i = 0; i < 4; i++) {
            var k =0;
            for (var j = 1; j < 4; j++) {
                if(mat[i][k] === 0 && mat[i][j] !== 0){
                    mat[i][k]=mat[i][j];
                    mat[i][j]=0;
                    stateChange = true;
                    continue;
                }
                else if(mat[i][k] === mat[i][j] && mat[i][k] !== 0){
                    mat[i][k] = 2*mat[i][k];
                    score += mat[i][k];
                    mat[i][j]=0;
                    ++k;
                    stateChange = true;
                    continue;
                }
                else if(mat[i][k] !== mat[i][j] && mat[i][k] !==0 && mat[i][j] !==0){
                    if(k == j-1){
                        ++k;
                        continue;
                    }
                    else
                    {
                        ++k;
                        mat[i][k] = mat[i][j];
                        mat[i][j]=0;
                        stateChange = true;
                        continue;
                    }
                }
            }
        }
    }

    function moveRight() {
        for (var i = 0; i < 4; i++) {
            var k =3;
            for (var j = 2; j >= 0; j--) {
                if(mat[i][k] === 0 && mat[i][j]!== 0){
                    mat[i][k] =mat[i][j];
                    mat[i][j]=0;
                    stateChange = true;
                    continue;
                }
                else if(mat[i][k] === mat[i][j] && mat[i][k] !== 0){
                    mat[i][k] = 2*mat[i][k];
                    score += mat[i][k];
                    mat[i][j]=0;
                    --k;
                    stateChange = true;
                    continue;
                }
                else if(mat[i][k] !== mat[i][j] && mat[i][k] !==0 && mat[i][j] !==0){
                    if(k == j+1){
                        --k;
                        continue;
                    }
                    else
                    {
                        --k;
                        mat[i][k] = mat[i][j];
                        mat[i][j]=0;
                        stateChange = true;
                        continue;
                    }
                }
            }
        }
    }

    function moveTop() {
        for (var i = 0; i < 4; i++) {
            var k =0;
            for (var j = 1; j < 4; j++) {
                if(mat[k][i] === 0 && mat[j][i]!== 0){
                    mat[k][i] =mat[j][i];
                    mat[j][i]=0;
                    stateChange = true;
                    continue;
                }
                else if(mat[k][i] === mat[j][i] && mat[k][i] !== 0){
                    mat[k][i] = 2*mat[k][i];
                    score += mat[k][i];
                    mat[j][i]=0;
                    ++k;
                    stateChange = true;
                    continue;
                }
                else if(mat[k][i] !== mat[j][i] && mat[k][i] !==0 && mat[j][i] !==0){
                    if(k == j-1){
                        ++k;
                        continue;
                    } else {
                        ++k;
                        mat[k][i] = mat[j][i];
                        mat[j][i]=0;
                        stateChange = true;
                        continue;
                    }
                }
            }
        }
    }

    function moveDown() {
        for (var i = 0; i < 4; i++) {
            var k =3;
            for (var j = 2; j >= 0; j--) {
                if(mat[k][i] === 0 && mat[j][i]!== 0){
                    mat[k][i] =mat[j][i];
                    mat[j][i]=0;
                    stateChange = true;
                    continue;
                }
                else if(mat[k][i] === mat[j][i] && mat[k][i] !== 0){
                    mat[k][i] = 2* mat[k][i];
                    score += mat[k][i];
                    mat[j][i]=0;
                    --k;
                    stateChange = true;
                    continue;
                }
                else if(mat[k][i] !== mat[j][i] && mat[k][i] !==0 && mat[j][i] !==0){
                    if(k == j+1){
                        --k;
                        continue;
                    } else {
                        --k;
                        mat[k][i] = mat[j][i];
                        mat[j][i]=0;
                        stateChange = true;
                        continue;
                    }
                }
            }
        }
    }

    function redraw() {
        $("#score").html(score);
        var x = $("#game").children();
      
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var k = mat[i][j];
                x[4*i + j].classList.add('tile_'+k);
            }
        }
    }

    function getRandomValue() {
        return Math.random() * 10 > 7 ? 4:2;   
    }

    function getRandomEmptyCell() {
        var emptyArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var k=0;
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(mat[i][j] === 0){
                    emptyArray[k] =(4*i) + j;
                    ++k;
                }
            }
        }
        var l = Math.floor(Math.random() * k);
        var x = emptyArray[l];
        var index = {"x":Math.floor(x/4) , "y":x%4};
        return index;
    }

    function fillOneRandomEmptyCell() {
        var coord = getRandomEmptyCell();
        var value = getRandomValue();
        mat[coord.x][coord.y] = value;
    }

    function isGameOver() {
        return isGridFull() && !isMovePossible();
    }

    function isGridFull() {
      for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                if (mat[x][y]===0) {
                    return false;
                }
            }
        }
        return true;
    }

    function isMovePossible() {
      var y,x;
      for (x = 0; x < 4; x++) {
            for (y = 0; y < 3; y++) {
                var yy = y + 1;
                if (mat[x][y] === mat[x][yy]) {
                    return true;
                }
            }
        }
        for (y = 0; y < 4; y++) {
            for (x = 0; x < 3; x++) {
                var xx = x + 1;
                if (mat[x][y] === mat[xx][y]) {
                    return true;
                }
            }
        }
        return false;
    }

    function achieved2048tile() {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(mat[i][j]===2048){
                    return true;
                }                
            }
        }
        return false;
    }

    function showGameOverDialog() {
        document.getElementById("gameOver").style.display="flex";
        var z = document.getElementById('reset1');
        z.addEventListener('click',reset);
    }

    function show2048Dialog() {
        document.getElementById("achieved2048").style.display="flex";
        var zz = document.getElementById('reset2');
        zz.addEventListener('click',reset);
        var y = document.getElementById('continue');
        y.addEventListener('click', remove2048Notification);
    }

    function remove2048Notification(){
        document.getElementById("achieved2048").style.display="none";
    }

    function removeClass() {
        var x =$("#game").children();
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var k = mat[i][j];
                x[4*i + j].classList.remove('tile_'+k);
            }
        }
    }

    function move(e) {
        stateChange = false;
        e.preventDefault();
        removeClass();
        if(e.keyCode === 37){
            moveLeft();
        }
        if(e.keyCode === 38){
            moveTop();
        }
        if(e.keyCode === 39){
            moveRight();
        }
        if(e.keyCode === 40){
            moveDown();
        }
        if(stateChange === false){
            redraw();
            return;
        }
        fillOneRandomEmptyCell();
        redraw();
        if (isGameOver()) {
            showGameOverDialog();
        }
        if (achieved2048tile()) {
            if(achieved2048flag===false){
                show2048Dialog();
                achieved2048flag = true;
            }
        }
    }

    function reset(e) {
        document.getElementById("gameOver").style.display="none";
        document.getElementById("achieved2048").style.display="none";
        if (e !== undefined) {
            e.preventDefault();
            removeClass();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        achieved2048flag=false;
        fillOneRandomEmptyCell();
        fillOneRandomEmptyCell();
        redraw();
    }
    function init() {
        reset();
        var z = document.getElementById('reset');
        z.addEventListener('click',reset);
        window.addEventListener('keydown', move);
    }
    return {
        init : init
    };
})();