(function calculator() {
    let input = document.getElementById("inputText");
    let inputText;
    let operator;
    let num;

    // Calculator buttons mapping.

    let firstClick = true;
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            if (firstClick) { // If first click not be a number or be a number.
                btn.className === "isNotNumber"
                    ? inputText = input.value + btn.value
                    : inputText = input.value = "";

                firstClick = false; // Exiting the first click.
            }
            inputText = input.value += btn.value;

        });
    });

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

    // Clear button.
    document.getElementById("clear").addEventListener("click", clear);
    function clear() {
        input.value = 0;
    }

    // Backspace button.
    document.getElementById("backspace").addEventListener("click", backspace);
    function backspace() {
        let backspace = inputText.split(inputText[inputText.length - 1]);
        return input.value = backspace[0];
    }

    // Determines which operator should be used based on the expression.
    function getOperator() {
        let matchOperator = inputText.match(/\*\*|[\+\-\*\/]/g);
        matchOperator.unshift("+");
        num = inputText.split(/\*\*|[\+\-\*\/]/);
        let num2;
        let num3 = 0;
        let num4 = 0
        let numbers = [];

        for (let i = 0; i < num.length; i++) {
            num2 = Number(num[i]);
            matchOperator[i] != "-" ? numbers.push(num2) : numbers.push(-num2);
            //num3 += numbers[i];
        }

        for (let j = 0; j < matchOperator.length; j++) {
            console.log("aqui primeiro");
            if (matchOperator[j] === "*") {
                num4 = num[j-1] * num[j];
                console.log(num4)
            }
        }
        // matchOperator.forEach((operator, index) => {
        //     console.log(`${index}: ${operator}`);
        // });

        input.value = num3;
        console.log(numbers);
        console.log(matchOperator);

        // if (matchOperator[0] === "-" && matchOperator.length >= 2) { // If expression be iniciated with negative number.
        //     num[0] = -num[1];
        //     num[1] = num[2];
        //     return operator = matchOperator[1];
        // } else if (matchOperator.length >= 2) { // If expression has more than two operators.
        //     num[0] = num[1];
        //     num[1] = num[2];
        //     return operator = matchOperator[1];
        // } else { // If expression has one operator.
        //     return operator = matchOperator[0];
        // }
    }
    // Equality button.
    document.getElementById("equal").addEventListener("click", equality);
    function equality() {
        // // Calling the function to get the operator.
        getOperator();
        // // Logic to handle the correct operation.
        // if (operator) {
        //     operator === "+" ? input.value = addition() :
        //         operator === "-" ? input.value = subtraction() :
        //             operator === "*" ? input.value = multiplication() :
        //                 operator === "**" ? input.value = exponentiation() :
        //                     input.value = division();
        // }
    };
})();
