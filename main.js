let nrLinii = 10   ;
let nrColoane = 10;

//Datele pentru un avion in functie de orientare
let orientareSusX = [0,1,1,1,1,1,2,3,3,3];
let orientareSusY = [0,-2,-1,0,1,2,0,-1,0,1];

let orientareJosX = [0,-1,-1,-1,-1,-1,-2,-3,-3,-3];
let orientareJosY = [0,-2,-1,0,1,2,0,-1,0,1];

let orientareStangaX = [0,0,0,0,-1,-1,-2,1,1,2];
let orientareStangaY = [0,1,2,3,1,3,1,1,3,1];

let orientareDreaptaX = [0,0,0,0,-1,-1,-2,1,1,2];
let orientareDreaptaY = [0,-1,-2,-3,-1,-3,-1,-1,-3,-1];

function avioaneleMele (tabla, start){
    const tablaMea = document.getElementById(tabla);
    for (let i = (0 + start); i < (nrLinii + start); i++) {
        const row = document.createElement('div');
        row.className = "row";
        tablaMea.append(row);
        for (let j = (0 + start); j < (nrColoane + start); j++) {
            const cell = document.createElement('div');
            cell.className = "cell";
            cell.id = i + "_" + j;
            row.append(cell);
            cell.addEventListener('click',function(){
                handleClick(i,j);
            })
        }
    }
}

avioaneleMele("myPlanes", 0);
avioaneleMele("enemyPlanes", 10);

function plasareAvion(culoare, start){
    var avionOK = false;
    while ( avionOK == false) {
        avionOK = true;
        var orientareAvion = Math.floor(Math.random()*4);
        switch (orientareAvion) {
            case 0:
                var x = start + Math.floor(Math.random() * (nrLinii - 3));
                var y = start + 2 + Math.floor(Math.random() * (nrColoane - 4));
                sirAvionX = orientareSusX;
                sirAvionY = orientareSusY;
                break;
            case 1:
                var x = start + 3 + Math.floor(Math.random() * (nrLinii - 3));
                var y = start + 2 + Math.floor(Math.random() * (nrColoane -4));
                sirAvionX = orientareJosX;
                sirAvionY = orientareJosY;
                break;  
            case 2:
                var x = start + 2 + Math.floor(Math.random() * (nrLinii - 4));
                var y = start + Math.floor(Math.random() * (nrColoane - 3));
                sirAvionX = orientareStangaX;
                sirAvionY = orientareStangaY;
                break;   
            case 3:
                var x = start + 2 + Math.floor(Math.random() * (nrLinii - 4));
                var y = start + 3 + Math.floor(Math.random() * (nrColoane - 3));
                sirAvionX = orientareDreaptaX;
                sirAvionY = orientareDreaptaY;
                break;      
        }
              
        for (let i = (0 + start); i < (10 + start); i++){
            let cellAtThisPosition = document.getElementById((x + sirAvionX[i-start]) + "_" + (y + sirAvionY[i-start]));
            if (cellAtThisPosition.classList.contains('avion')) { avionOK = false;}
        }
    }

    let cellAtThisPosition = document.getElementById(x + "_" + y);
    cellAtThisPosition.classList.add("cap");
    
    for (let i = (0 + start); i < (10 + start); i++) {
        let cellAtThisPosition = document.getElementById((x + sirAvionX[i-start]) + "_" + (y + sirAvionY[i-start]));
        cellAtThisPosition.classList.add("avion");
        cellAtThisPosition.classList.add(culoare);
    }
       
}

plasareAvion("blue", 0);
plasareAvion("greenyellow", 0);
plasareAvion("cyan", 0);

plasareAvion("darkhaki",10);
plasareAvion("darkhaki",10 );
plasareAvion("darkhaki",10);

function handleClick(x, y) {
    let cell = document.getElementById(x + "_" + y);

    if (cell.classList.contains('avion')) {
        cell.classList.add("hit");
        if (checkIfWon(10) == 3) {showEnemyPlanes(10); alert("Game over, you won");}
    }else {cell.classList.add("revealed");}   

    let overHit = false;

    while (overHit==false){
    var x1 = Math.floor(Math.random() * nrLinii);
    var y1 = Math.floor(Math.random() * nrColoane);
    var cellAtThisPosition = document.getElementById(x1 + "_" + y1);
        if (!cellAtThisPosition.classList.contains('hit')&&!cellAtThisPosition.classList.contains('revealed')) { overHit = true;}
    }

    if (cellAtThisPosition.classList.contains('avion')) {
        cellAtThisPosition.classList.add("hit");
        if (checkIfWon(0) == 3) {showEnemyPlanes(10); alert("Game over, you lost");}
    }else {cellAtThisPosition.classList.add("revealed");}
}    

function checkIfWon(start){
    let k = 0; 
    for (let i = start; i < (nrLinii + start) ; i++) {
        for (let j = start; j < (nrColoane+start); j++) {
          let cellAtThisPosition = document.getElementById( i + "_" + j);
             if ((cellAtThisPosition.classList.contains('hit'))&&(cellAtThisPosition.classList.contains('cap'))) {k++;} 
        }
    }
    return k;
}

function showEnemyPlanes(start){
    for (let i = start; i < (nrLinii + start) ; i++) {
        for (let j = start; j < (nrColoane+start); j++) {
          let cellAtThisPosition = document.getElementById( i + "_" + j);
             if ((!cellAtThisPosition.classList.contains('hit'))&&(cellAtThisPosition.classList.contains('avion'))) {cellAtThisPosition.classList.add("revealedEnemy");} 
        }
    }
}