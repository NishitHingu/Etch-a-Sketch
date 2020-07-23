const container = document.querySelector('#container');
const main = document.querySelector('#main');
const btn = document.querySelector('#reset');
const btnNormal = document.querySelector('#normal');
const btnRandom = document.querySelector('#random');
const btnDarken = document.querySelector('#darken');
const textBox = document.querySelector('#textbox');
let gridSize = 16;

gridSize = 16;
textBox.placeholder = gridSize + ' X ' + gridSize;
createGrid();
transition();
let mode = 'normal';
btnDarken.addEventListener('click', () => {mode = 'darken';reset();});
btnNormal.addEventListener('click', () => {mode = 'normal';reset();});
btnRandom.addEventListener('click', () => {mode = 'random';reset();});
btn.addEventListener('click', reset);

function reset(){
    removeGrid();
    textBox.value != '' ? (gridSize = textBox.value): gridSize = gridSize ;
    textBox.value = '';
    textBox.placeholder = gridSize + ' X ' + gridSize;
    createGrid();
    transition();
}


function removeGrid(){
    const div = document.querySelectorAll('.box');
    div.forEach(box => container.removeChild(box));
}

function createGrid(){
    for (let i = 0; i < (gridSize*gridSize); i++){
        const div = document.createElement('div');
        div.classList.add('box');
        container.appendChild(div);
    }   
    document.documentElement.style.setProperty('--grid-size',gridSize);

}

function backGroundColor(){
    let bgColor = "rgba(" + 0 + "," + 0 + "," + 0 + "," + 1 + ")"; 
    switch (mode){
    case 'darken':
        let oldbgColor = this.getAttribute('style', 'background-color');
        let alpha = 0.1;
        if (typeof(oldbgColor) == 'string') {
            alpha = oldbgColor.slice(-5,-2);
            if(alpha < 1){
                alpha = +alpha + 0.1;
            }
        }
        bgColor = "rgba(" + 0 + "," + 0 + "," + 0 + "," + alpha + ")";
        break;
    case 'random':
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        const a = 1;
        bgColor = "rgba(" + x + "," + y + "," + z + "," + a + ")"; 
        break;
    default:
        break;
    };
    this.style.backgroundColor = bgColor;

}

/*function addclass(){
    if (this.getAttribute('class') == 'box hovering') {
        console.log(this.getAttribute('class'));
        return;
    }
    this.classList.add('hovering'); 
    backGroundColor();
}*/

function transition(){
const div = document.querySelectorAll('.box');
div.forEach(box => box.addEventListener('mouseover', backGroundColor));
}
