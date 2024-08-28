document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let memory = 0;
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (!isFinite(key) && key !== '+' && key !== '-' && key !== '*' && key !== '/' && key !== '%' && key !== 'Enter' && key !== 'Backspace') {
            alert('Only numbers are allowed');
            return;
        }
        handleKeyInput(key);
    });
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonInput(value);
        });
    });
    function handleKeyInput(key) {
        if (isFinite(key)) {
            currentInput += key;
        } else if (key === 'Enter') {
            evaluateExpression();
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput += ` ${key} `;
        }
        display.value = currentInput;
    }
    function handleButtonInput(value) {
        if (isFinite(value)) {
            currentInput += value;
        } else if (value === 'C') {
            currentInput = '';
        } else if (value === '=') {
            evaluateExpression();
        } else if (value === 'M+') {
            memory += evaluateExpression();
        } else if (value === 'M-') {
            memory -= evaluateExpression();
        } else if (value === 'MC') {
            memory = 0;
        } else {
            currentInput += ` ${value} `;
        }
        display.value = currentInput;
    }
    function evaluateExpression() {
        try {
            const result = eval(currentInput.replace('%', '/100*'));
            display.value = result;
            currentInput = result.toString();
            return result;
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
            return 0;
        }
    }
});









