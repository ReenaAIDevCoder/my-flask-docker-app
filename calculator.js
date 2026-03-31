let input= document.getElementById("inputbox");
let buttons=document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerText;

        if (value === "=") {
            try {
                expression = eval(expression); // Evaluate the expression
            } catch {
                expression = "Error"; // If any error in expression
            }
            input.value = expression;
        }
        else if (value === "AC") {
            expression = "";
            input.value = expression;
        }
        else if (value === "DEL") {
            expression = expression.slice(0, -1); // Remove last character
            input.value = expression;
        }
        else {
            expression += value;
            input.value = expression;
        }
    });
});