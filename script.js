let lorem = [ "Lorem",  "ipsum", "dolor", "sit", "amet,", "consectetur",
                "adipisicing", "elit.", "Aut", "itaque", "est", "eos", "voluptas,",
                 "maxime", "corrupti", "illo", "assumenda", "cum", "consectetur", "vero."];

window.onload = function() {
    refreshCount();
}

function refreshCount() {
    let board = document.getElementById("board");
    let count = document.getElementById("countRange").value;
    let currentCount = board.children.length;
    if (count > currentCount) {
        for (let i=0; i<count-currentCount; i++) {
            createPiece();
        }
    }
    else if (count < currentCount){
        for (let i=0; i<currentCount-count; i++) {
            board.removeChild(board.lastChild);
        }
    }
}

function randomInt(a, b) {
    return a + Math.round(Math.random()*(b-a));
}

function createPiece() {
    let board = document.getElementById("board");
    let newPiece = document.createElement("div");
    newPiece.className = "piece";
    // Choosing decoration:
    let size = randomInt(1, 3);
    let paddingV = size * randomInt(10, 20) + "px";
    randomInt(10, 20);
    let paddingH = size * randomInt(10, 20) + "px";
    let rand = Math.random();
    if (rand < 0.33) {
        newPiece.style.fontSize = size + "em";
        newPiece.style.padding = paddingV + " " + paddingH;
        newPiece.innerHTML = String.fromCharCode(randomInt(0, 0x10FFFF));
    }
    else if (rand < 0.66){
        newPiece.style.fontSize = size/3 + "em";
        // newPiece.style.paddingTop = paddingV;
        // newPiece.style.paddingBottom = paddingV;
        newPiece.style.padding = paddingV + " " + paddingH;
        newPiece.innerHTML = lorem.slice(0, randomInt(3, 7)).join(" ");
    }
    else {
        newPiece.style.fontSize = 2*size + "em";
        newPiece.style.padding = paddingV + " " + paddingH;
        newPiece.innerHTML = String.fromCharCode(randomInt(9632,9727));
        newPiece.style.color = "hsl(" + randomInt(0,360) + ", 100%, 50%)";
        newPiece.style.borderColor = "black";
    }
    board.appendChild(newPiece);
    let hoverMenu = document.getElementById("hoverTemplate").cloneNode(true);
    hoverMenu.id = "";
    let count = document.getElementsByClassName("hoverMenu").length - 1;
    let countString = "-" + count;
    hoverMenu.children[0].children[0].children[1].children[0].id += countString;
    hoverMenu.children[0].children[1].children[1].id += countString;
    let alignSelfDiv = hoverMenu.children[0].children[2].children[0];
    for (let i=1; i<=6; i++) {
        alignSelfDiv.children[i].children[0].id += countString;
        alignSelfDiv.children[i].children[0].name += countString;
        alignSelfDiv.children[i].children[1].htmlFor += countString;
    }
    newPiece.appendChild(hoverMenu);

}

function radioClick(myRadio) {
    document.getElementById("board").style[myRadio.name] = myRadio.value;
}

function updatePiece(input) {
    let pieceIndex = input.id.substr(input.id.length - 1 ,1);
    if (input.name.includes("order") || input.name.includes("flex")) {
        document.getElementsByClassName("piece")[pieceIndex].style[input.name] = input.value;
    }
    else {
        let styleName = input.name.substring(0, input.name.length - 2);
        document.getElementsByClassName("piece")[pieceIndex].style[styleName] = input.value;
    }
}
