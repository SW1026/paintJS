const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//pixel modifier
//pixel manipulate. canvas size 종류는 2가지 - 그릴 픽셀 사이즈와 CSS표지 사이즈

//css의 .canvas (style부분)이 보여지는 것이고. 이게 기본. 두개가 사이즈가 같아야함.
canvas.width = CANVAS_SIZE; //px단위
canvas.height = CANVAS_SIZE;

//canvas 내부 컨텍스트의 배경색 초기설정 (CSS에서는 HTML화면에 보여주는거고)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//context는 canvas 안에서 pixel을 다루는 것 
ctx.strokeStyle= INITIAL_COLOR; //우리가 그릴 모든 선이 #2c2c2c를 갖는다는 의미.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;    // 그 선의 너비가 2.5 라는 것 


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

//마우스를 움직이는 내내 발생. 멈추지 않는다.
function onMouseMove(event){
    //canvas의 offsetX,Y에 관심있다 우리는.
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();    //path를 만듦
        ctx.moveTo(x, y);   //x,y좌표로 옮김.
    } else{
        ctx.lineTo(x, y);   //마지막 path의 마지막 점부터 잇는다.
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;    //위에 디폴트로 지정된 strokeStyle을 override 해서 클릭한 색깔로 덮어씌운다.
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){   //클릭이 발생했을 때 Fill 모드였으면!
        filling = false;    // 현재 PAINT 모드로 바꿔주기
        mode.innerText = "Fill";    //현재는 PAINT 모드  
    } else {   
        filling = true; // FILL 모드로 변경
        mode.innerText = "PAINT";   //현재는 FILL 모드 
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(){
    //fillRect(x,y,width,height). x,y는 좌표
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){    
    const image = canvas.toDataURL();//우선 이미지 형태 URL 불러오기,인자로  "image/jpeg" 으로 파일 type을 줄 수 있음.
    const link = document.createElement("a");   //anchor 태그
    link.href = image;
    link.download = "PaintJS";  //이름
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);    //마우스를 click할 때 발생하는 것
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
//<div>속성 colors로 부터 array를 형성 후, 각 color에 대해서 addEventListener -click 함
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}