// Referencia al canvas y su contexto
const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

// Referencia a los elementos de la sección Generar Botones
const buttonCountInput = document.getElementById("button-count");
const generateButtonsButton = document.getElementById("generate-buttons");

let buttons = []
let numeroGanador = 0
let textoNumeroGanador = 0
let randomIndex = 0

// Función para generar botones en el canvas
function generateButtonsOnCanvas(count) {

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const buttonWidth = 80;
    const buttonHeight = 30;
    const padding = 10;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    buttons = []

    for (let i = 0; i < count; i++) {
        const x = (i % Math.floor(canvasWidth / (buttonWidth + padding))) * (buttonWidth + padding);
        const y = Math.floor(i / Math.floor(canvasWidth / (buttonWidth + padding))) * (buttonHeight + padding);

        if (y + buttonHeight > canvasHeight) {
            console.warn("No hay espacio suficiente para todos los botones");
            break;
        }

        // Dibujar un botón
        ctx.fillStyle = "#007BFF";
        ctx.fillRect(x, y, buttonWidth, buttonHeight);
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Botón ${i + 1}`, x + buttonWidth / 2, y + buttonHeight / 2);


        // Almacenar posición y tamaño del botón
        buttons.push({ x, y, width: buttonWidth, height: buttonHeight, label: `Botón ${i + 1}`, index: i });
    }

    
    const botonesTotal = buttons.length ;
    randomIndex = Math.floor(Math.random() * botonesTotal);
    console.log(`Número aleatorio generado: ${parseInt(randomIndex) + 1}`);

}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    buttons.forEach(button => {
        if (
            mouseX >= button.x &&
            mouseX <= button.x + button.width &&
            mouseY >= button.y &&
            mouseY <= button.y + button.height
        ) {
            alert(`¡Has hecho clic en ${button.label}!`);

            if (button.index === randomIndex) {
                alert(`¡Felicidades! Este botón coincide con el número aleatorio (${randomIndex + 1}).`);
            } else {
                alert(`Este botón no coincide con el número aleatorio. Sigue intentando.`);
            }
        }
    });
});

// Evento para generar botones
generateButtonsButton.addEventListener("click", () => {


    const count = parseInt(buttonCountInput.value, 10);


    if (!isNaN(count) && count > 0) {
        generateButtonsOnCanvas(count);


    } else {
        alert("Por favor, ingresa un número válido de botones.");
    }
});
