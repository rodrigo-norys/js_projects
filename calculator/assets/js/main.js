(function calculator(num) {
    let input = document.getElementById("inputText");
    let inputText;
    let i = 0;

    // Conventional operations.
    function addition() {
        return Number(num[0]) + Number(num[1]);
    }
    function subtraction() {
        return Number(num[0]) - Number(num[1]);
    }
    function multiplication() {
        return Number(num[0]) * Number(num[1]);
    }
    function division() {
        return Number(num[0]) / Number(num[1]);
    }
    function exponentiation() {
        return Math.pow(Number(num[0]), Number(num[1]));
    }

    // Calculator buttons mapping.
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            inputText = input.value += btn.value;

            if (btn.value === "+") {
                i++
                console.log(i);
            }
            if (i >= 2) {
                equal();
            }

        });
    });

    // Clear button.
    document.getElementById("clear").addEventListener("click", clear);
    function clear() {
        input.value = "";
    }

    // Equal button.
    document.getElementById("equal").addEventListener("click", equal);
    function equal() {
        // If first number be negative.
        num = inputText.split(/\*\*|[\+\-\*\/]/);
        console.log(inputText);
        if (inputText[0] === "-") {
            num[0] = -num[1];
            num[1] = num[2];
        } 
        let operator = inputText.match(/\*\*|[\+\-\*\/]/)[0];

        // Logic to handle the correct operation.
        if (operator) {   
            operator === "+" ? input.value = addition() :
            operator === "-" ? input.value = subtraction() :
            operator === "*" ? input.value = multiplication() :
            operator === "**" ? input.value = exponentiation() :
            input.value = division();
            console.log(operator[0]);
            console.log(num);
        }
    };
})();
