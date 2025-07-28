/**
 * Cria um elemento HTML e adiciona na página.
 *
 * @param {string} tag - A tag do elemento (ex: 'div', 'p', 'section').
 * @param {string} attribute - O nome do atributo. (ex: 'class', 'id').
 * @param {string} attributeContent - O valor do atributo.
 * @param {string} reference - Seletor do elemento de referência (ou "body").
 * @param {"prepend" | "appendChild"} position - Onde inserir: antes(prepend) ou depois(appendChild). 
 * @returns {void}
 */
function createYourHtml(tag, attribute, attributeContent, reference, position) {
    
    // Tratando o retorno do primeiro parâmetro.
    tagErrorTreatment(tag);

    // Tratando o retorno do quinto parâmetro.
    positionErrorTreatment();
    
    const yourElement = document.createElement(tag);
    const yourReference = (reference === "body") ? document.body : document.querySelector(reference);
    
    // Confirmando se a variável yourReference está retornando alguma das condições.
    yourReferenceErrorTreatment();

    // Caso não necessite de um atributo
    if (attribute !== "" || attributeContent !== "") {
        yourElement.setAttribute(attribute, attributeContent);
    }
    
    // Onde sua tag irá ficar, no início ou no final
    if (position === "prepend") {
        yourReference.prepend(yourElement);
    } else if (position === "appendChild") {
        yourReference.appendChild(yourElement);
    }
    
    /* Funções para tratamento de erro */
    function tagErrorTreatment(tag) {
        try {
            if (tag.length === 0 || tag === " ") {
                throw new Error(`Verifique se o primeiro parâmetro está correto`);
            }
        } catch (error) {
            console.log(`Verifique o primeiro parâmetro!\n${error.message}.`);
            return null;
        }
    }
    
    function positionErrorTreatment() {
        try {
            if (position !== "appendChild" && position !== "prepend") {
                throw new Error(`O quinto parâmetro espera um "prepend" ou "appendChild".`);
            }
        } catch (error) {
            console.log(`Verifique o quinto parâmetro!\n${error.message}.`);
            return null;
        }
    }

    function yourReferenceErrorTreatment() {
        try {
            if (!yourReference) {
                throw new Error(`Algum dos parâmetros está retornando erro, fazendo com que o "reference" retorne null`);
            }
        } catch (error) {
            console.log(`Verifique cada um dos parâmetros!\n${error.message}.`);
            return null;
        }
    }
    
    return yourElement;
};