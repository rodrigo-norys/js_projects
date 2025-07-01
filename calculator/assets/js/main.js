(function calculator(num) {
    let input = document.getElementById("inputText");
    let inputText;

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
        });
    });

    // Clear button.
    document.getElementById("clear").addEventListener("click", clear);
    function clear() {
        input.value = "";
    }

    // Backspace button.
    document.getElementById("backspace").addEventListener("click", backspace);
    function backspace() {
        let backspace = inputText.split(inputText[inputText.length - 1]);
        return input.value = backspace[0];
    }

    // Equal button.
    document.getElementById("equal").addEventListener("click", equal);
    function equal() {
        let operator = inputText.match(/\*\*|[\+\-\*\/]/g);
        let operator2;
        num = inputText.split(/\*\*|[\+\-\*\/]/);

        // If expression iniciate with negative number.
        if (operator[0] === "-" && operator.length >= 2) {
            num[0] = -num[1];
            num[1] = num[2];
            operator2 = operator[1];
        } else {
            operator2 = operator[0];
        }

        // Logic to handle the correct operation.
        if (operator2) {
            operator2 === "+" ? input.value = addition() :
            operator2 === "-" ? input.value = subtraction() :
            operator2 === "*" ? input.value = multiplication() :
            operator2 === "**" ? input.value = exponentiation() :
            input.value = division();
        }
    };
})();
