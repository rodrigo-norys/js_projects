// + -> indíce 11
let x;
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        x = document.getElementById("inputText").value += btn.value;

    });
});

document.getElementById("equal").addEventListener("click", () => {
    let operator = x.match(/[\+\-\*\/]/)[0];
    
    let y = x.split(/[\+\-\*\/]/);
    if (operator) {
        let z = Number(y[0]) + Number(y[1]);
        console.log(z);
    }
    // console.log(y);
    // console.log(y[0] + ' e ' + y[1]);
});