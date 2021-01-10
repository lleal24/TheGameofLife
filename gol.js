const rows = 40; //filas
const cols = 40; //Columnas

//Array 1D, se necesita 2D
let currGen = [rows];
let nextGen = [rows];

//Create two-dimensional arrays
/*por cada posicion de los arreglos genera otro de 40 elementos es decir:
currGen
      0              1              2              3                 40
[ , , , ...40],[ , , , ...40],[ , , , ...40],[ , , , ...40]... ,[ , , , ...40]      

*/


function createGenArrays(){
    for(let i=0; i < row; i++){
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
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
        this.setAttribute('class', 'dead')
    }else{
        this.setAttribute('class', 'alive')
    }
}

window.onload=()=>{
    createWorld();
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