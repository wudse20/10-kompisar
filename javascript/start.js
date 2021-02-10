function swapPage(path) 
{
    window.location = path;
}

function startGame()
{
    let ten = document.getElementById("10");
    let add = document.getElementById("add");

    if (ten.checked)
        swapPage(".\\html\\10Buddies.html");
    else if (add.checked)
        swapPage(".\\html\\add.html");
    else
        console.log("Wierd input form user");
}
