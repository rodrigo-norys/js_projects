(function calculator() {
    let input = document.getElementById("inputText");
    let inputText;
    let operator;
    let num;

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
    input.value = 0;
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

    // Determines which operator should be used based on the expression.
    function getselectdOperator() {
        let selectdOperator = inputText.match(/\*\*|[\+\-\*\/]/g);
        num = inputText.split(/\*\*|[\+\-\*\/]/);

        if (selectdOperator[0] === "-" && selectdOperator.length >= 2) { // If expression be iniciated with negative number.
            num[0] = -num[1];
            num[1] = num[2];
            return operator = selectdOperator[1];
        } else if (selectdOperator.length >= 2) { // If expression has more than two operators.
            num[0] = num[1];
            num[1] = num[2];
            return operator = selectdOperator[1];
        } else { // If expression has one selectdOperator.
            return operator = selectdOperator[0];
        }
    }
    // Equality button.
    document.getElementById("equal").addEventListener("click", equality);
    function equality() {
        // Calling the function to get the selectdOperator.
        getselectdOperator();

        // Logic to handle the correct operation.
        if (operator) {
            operator === "+" ? input.value = addition() :
                operator === "-" ? input.value = subtraction() :
                    operator === "*" ? input.value = multiplication() :
                        operator === "**" ? input.value = exponentiation() :
                            input.value = division();
        }
    };
})();
