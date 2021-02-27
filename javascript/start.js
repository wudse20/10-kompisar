function swapPage(path) {
    window.location = path;
}

function startGame() {
    let ten = document.getElementById("10");
    let add = document.getElementById("add");
    let sub = document.getElementById("sub");
    let doubHalf = document.getElementById("doubHalf");
    let sym = document.getElementById("sym");
    let neighbours = document.getElementById("neighbours");
    let multiMode = document.getElementById("multiMode");
    
    if (ten.checked)
        swapPage(".\\html\\10Buddies.html");
    else if (add.checked)
        swapPage(".\\html\\add.html");
    else if (sub.checked)
        swapPage(".\\html\\sub.html");
    else if (doubHalf.checked)
        swapPage(".\\html\\doubHalf.html");
    else if (sym.checked)
        swapPage(".\\html\\sym.html");
    else if (neighbours.checked)
        swapPage(".\\html\\neighbours.html");
    else if (multiMode.checked)
        swapPage(".\\html\\multiMode.html");
    else
        console.log("Wierd input form user");
}
