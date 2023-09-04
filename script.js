const previousOperationText = document.getElementById('previousOperations');
const currentOperationText = document.getElementById('currentOperations');
const buttons = document.querySelectorAll("#buttonContainer button");

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    addDigit(digit){

        if(digit == '.' && currentOperationText.innerText.includes('.')){
            return;
        }

        console.log(digit)
        this.currentOperation = digit
        this.updateScreen()
    }

    processOperations(operation){

        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }

            return;
        }


        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation){
            case "+": 

            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)

            break;

            case "-": 

            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)

            break;

            case "/": 

            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)

            break;

            case "*": 

            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous)

            break;

            case "DEL":

            this.processDelOperator()

            break;
            
            case "CE":

            this.processClearCurrentOperation() 

            break;

            case "C":

            this.processClearAllOperation()

            break;


            case "=":

            this.processEqualOperation()

            break;


            default: return;
        }
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null){

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        }
        else{
            if(previous === 0){
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
        
    }

    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];

        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }

    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }

    processClearAllOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    processEqualOperation(){
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperations(operation)
    }

};

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText
        
        if(+value >= 0 || value == '.'){
            calc.addDigit(value)
        }

        else{
            calc.processOperations(value)
        }

    })
});