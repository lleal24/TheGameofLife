const rows = 40; //filas
const cols = 40; //Columnas

//Array 1D, se necesita 2D
let currGen = [rows];
let nextGen = [rows];

//controls View
let started = false; //Set to true when use click start
let timer; //To control evolutions
let evolutionSpeed=1000; //One second betwenn generations

//#region Crear array bidimensional
//Create two-dimensional arrays
/*por cada posicion de los arreglos genera otro de 40 elementos es decir:
currGen
rows         cols
0  [ , , , ...40],
1  [ , , , ...40],
2  [ , , , ...40],
3  [ , , , ...40]... ,
40 [ , , , ...40]      

*/
function createGenArrays(){
    for(let i=0; i < rows ; i++){
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}
//#endregion Crear array bidimensional

//Inicializar las células en muertas
//Recorre primero el array inicial -> luego el contenido
function initGenArrays(){
    for(let i=0; i < rows; i++){
        for(let j=0; j < cols; j++){
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}


function createWorld(){
    let world = document.querySelector('#world');

    let tbl = document.createElement('table');
    tbl.setAttribute('id', 'worldGrid');

    for (let i=0; i < rows; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < cols; j++){
            let cell = document.createElement('td');
            cell.setAttribute('id', i+'_'+j ); //0_0, 0_1
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click', cellClick);
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function cellClick(){
    let loc = this.id.split("_");
    let row = Number(loc[0]); //Get i
    let col = Number(loc[1]); //Get j

    //Alterna celda viva o muerta
    if(this.className === 'alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0; //0 = dead
    }else{
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1; //1 = alive
    }
}

window.onload=()=>{
    createWorld();
    createGenArrays();
    initGenArrays();
}

//#region Contedo de vecinos VIVOS
// Funcion para el conteo de los vecinos de una célula
// como parametros recibe las coordenadas de la célula
// se cuentan los 8
// * * *
// *   *
// * * *
function getNeighborCount(row, col){
    let count = 0;
    let nrow = Number(row);
    let ncol = Number(col);

    //Make sure we are not at the firts row
    if(nrow - 1 >= 0){
        // Check top neighbor
        if(currGen[nrow - 1][ncol] == 1)
        count ++;
    } 

    //Make sure we are not in the firts cell
    //Upper left corner
    if(nrow -1 >= 0 && ncol -1 >= 0){
        //Check Upper left neighbor
        if(currGen[nrow -1][ncol - 1] == 1)
        count++;
    }

    //Make sure where are not on the first row last column
    if(nrow - 1 >= 0 && ncol + 1 < cols ){
        //Check upper right neighbor
        if(currGen[nrow - 1][ncol + 1] == 1)
        count++;
    }

    //Make sure we are not on the first column
    if(ncol - 1 >= 0){
        //Check left neighbor
        if(currGen[nrow][ncol - 1] == 1)
        count++;
    }

    //Make sure we are not on the last colum
    if(ncol + 1 < cols ){
        //Check right neighbor
        if(currGen[nrow][ncol + 1] == 1)
        count ++;
    }

    //Make sure we are not on the bottom left corner
    if(nrow + 1 < rows && ncol - 1 >= 0){
        //Check bottom left neighbor
        if(currGen[nrow + 1 ][ncol - 1] == 1)
        count ++;
    }

    //Make sure we are not on the bottom right
    if(nrow + 1 < rows && ncol + 1 < cols){
        //Ckeck bottom right neighbor
        if(currGen[nrow + 1][ncol + 1] == 1)
            count ++; 
    }

    //Make sure we are not on the last row
    if(nrow + 1 < rows){
        //Check bottom neighbor
        if(currGen[nrow + 1][ncol] == 1)
        count ++;
    }
    return count;
}
//#endregion Contedo de vecinos VIVOS

//#region crear la siguiente generacion
// esta funcion recorre cada celda y obtiene el conteo de los vecinos
// usando getNeighborCount y aplicando las siguientes reglas para determinar si
// la celula vive o muere
function createNextGen(){
    for(row in currGen){
        for(col in currGen[row]){
            let neighbors = getNeighborCount(row, col);
            //Check the rules
            //if ALIVE
            if(currGen[row][col] == 1){
                if(neighbors < 2){
                    nextGen[row][col] = 0;
                }else if (neighbors == 2 || neighbors == 3){
                    nextGen[row][col] = 1;
                }else if (neighbors > 3){
                    nextGen[row][col] = 0;
                }
            }else if(currGen[row][col] == 0){
                //If DEAR or EMPTY
                if(neighbors == 3){
                    nextGen[row][col] == 1;
                }
            }
        }
    }
}
//#endregion crear la siguiente generacion

//#region Actualizar mundo actual
// funcion que cambia los valores de la generacion actual 
// por los de la proxima 
function updateCurrGen(){
    for(row in currGen){
        for(col in currGen){
            //Update the current generation with
        //the results of createNextGen function
        currGen[row][col] = nextGen [row][col];
        //Set the next back to empty
        nextGen[row][col] = 0;
        }
    }
}
//#endregion Actualizar mundo actual

//#region Actualizar mundo vista
function updateWorld(){
    let cell = '';
    for(row in currGen){
        for(col in currGen[row]){
            cell = document.getElementById(row + '_' + col);
            if(currGen[row][col] == 0){
                cell.setAttribute('class', 'dead');
            }else{
                cell.setAttribute('class', 'alive');
            }
        }
    }
}
//#endregion Actualizar mundo vista

function envolve(){
    createNextGen();
    updateCurrGen();
    updateWorld();
    if(started){
        timer = setTimeout(envolve, evolutionSpeed);
    }
}

function startStopGol(){
    let startstop = document.querySelector('#btnstartstop');
    if(!started){
        started = true;
        startstop.value = 'Stop Reproducing';
        envolve();
    }else{
        started = false;
        startstop.value = 'Start Reproducing';
        clearTimeout(timer);// borra temporizacion configurado con setTimeOut();
    }
}

function resetWorld(){
    location.reload();
}


/*
ArreglosMultidimencionales = un arreglo dentro de otro
let matriz = [
    "Juan",
    10,
    ["lunes","martes","miercoles","jueves","viernes"
        ["azul","verde","blanco"]
    ]
]
matriz[2][3] -> miercoles
matriz[2][5][2] -> blanco

*/ 