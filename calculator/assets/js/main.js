(function calculator() {

    /**
     * ANOTAÇÃO PESSOAL!!!
     * AINDA NECESSÁRIO CRIAR UMA TRAVA PARA QUE O USUÁRIO NÃO CRIE EXPRESSÕES LONGAS. QUANDO QUE NO PROGRAMA SÓ SERÃO PERMITION NO MÁXIMO 3 NÚMEROS.
     */
    let input = document.getElementById("inputText");
    let inputText;
    let result = 0;

    // Calculator buttons mapping.
    input.value = 0;
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

    // Operations
    function addition() {
        return parsedNumber[0] + parsedNumber[1];
    }
    function multiplication() {
        return parsedNumber[0] * parsedNumber[1];
    }
    function division() {
        return parsedNumber[0] / parsedNumber[1];
    }
    function exponentiation() {
        return Math.pow(parsedNumber[0], parsedNumber[1]);
    }

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
    let matchOperator;
    function getSign() {
        matchOperator = inputText.match(/\*\*|[\+\-\*\/\(\)]/g);
        console.log(matchOperator);
    }

    // To apply the correct sign (+ or -).
    let stringOperands;
    let numericValue;
    let parsedNumber = [];
    function applySign() {
        stringOperands = inputText.split(/\*\*|[\+\-\*\/\(\)]/);

        for (let i = 0; i < stringOperands.length; i++) { // Populating the array.
            numericValue = Number(stringOperands[i]);

            if (matchOperator[i - 1] === "-") { // [i - 1] it's because the sign comes after first number.
                parsedNumber.push(-numericValue);
            } else {
                parsedNumber.push(numericValue);
            }

            const indice = parsedNumber.indexOf(0); // Cut off zero returns.
            if (indice !== -1) {
                parsedNumber.splice(indice, 1);
            }
        } 
    }

    // To define the correct operator, to equality() know what it needs to do.
    function defineOperator() {
        for (let j = 0; j < parsedNumber.length; j++) {
            if (matchOperator[j] === "*") {
                matchOperator.length = 0;
                matchOperator.push("*");
            }
            else if (matchOperator[j] === "/") {
                matchOperator.length = 0;
                matchOperator.push("/");
            }
            else if (matchOperator[j] === "**") {
                matchOperator.length = 0;
                matchOperator.push("**");
            }
        }
    }
    
    // To work with parentheses.
    let prefixNumber = [];
    function parentheses() {
        prefixNumber = parsedNumber.splice(0,1);      
    }
    
    // Equality button.
    document.getElementById("equal").addEventListener("click", equality);
    function equality() {
        
        // Capturing the sign.
        getSign();
        
        // Applying the sign.
        applySign();
        
        // Separating numbers inside and outside parentheses (if it exists).
        if (parsedNumber.length === 3) {
            parentheses();
        }

        // Defining the correct operator.
        defineOperator();


        // Doing the operations.
        for (let j = 0; j < matchOperator.length; j++) {
            matchOperator[j] === "*" ? result = multiplication() :
                matchOperator[j] === "/" ? result = division() :
                    matchOperator[j] === "**" ? result = exponentiation() :
                        result = addition();

                    }

                    // Applies implicit multiplication if there's a number before the parentheses.
                    if (prefixNumber[0]) {
                        result *= prefixNumber[0];

                        prefixNumber = []
                    } 
                    
        parsedNumber = [];
        input.value = result;

    };
})();
