document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const canvasSize = 400;
    const snake = [{ x: 0, y: 0 }];
    let score = 0;
    let direction = 'right';
    let food = generateFood();
    let gameEnded = false;

    //Puntaje
    function updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Puntaje: ${score}`;
    }
    
    //FIN DEL JUEGO
    function endGame() {
        const finalScore = score;
        
        Swal.fire({
            icon: 'error',
            title: 'Game Over',
            text: `Puntaje obtenido: ${finalScore}`,
            showCancelButton: true,
            confirmButtonText: 'Reintentar',
            cancelButtonText: 'Salir',
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            } else {
                // Aquí puedes redirigir al usuario o hacer cualquier otra acción al salir del juego
                window.location.href = '../Game/Menu/menu.html';
            }
        });
        
    }
    
    //GENERAR LA COMIDA
    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
                y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        return newFood;
    }

    function draw() {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar el fondo blanco del tablero
        ctx.fillStyle = '#FFFFFF'; // Color blanco
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar los límites del área de juego
        ctx.strokeStyle = '#000000'; // Color negro
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Dibujar la serpiente
        ctx.fillStyle = '#4CAF50';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

        // Dibujar la comida
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function move() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case 'up':
                head.y -= gridSize;
                break;
            case 'down':
                head.y += gridSize;
                break;
            case 'left':
                head.x -= gridSize;
                break;
            case 'right':
                head.x += gridSize;
                break;
        }

        // Verificar colisión con la comida
        if (head.x === food.x && head.y === food.y) {
            snake.unshift(food);
            food = generateFood();
            score += 10; 
            updateScore();
        } else {
            snake.pop();
            snake.unshift(head);
        }
        
        // Verificar colisión con las paredes
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            endGame();
            resetGame();
        }

        // Verificar colisión con la propia serpiente
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                endGame();
                resetGame();
            }
        }
    }

    function resetGame() {
        snake.length = 0;
        snake.push({ x: 0, y: 0 }); // Agrega la posición inicial de la serpiente
        direction = 'right';
        food = generateFood();
        score = 0;
        updateScore();

        gameEnded = false;
    }

    function gameLoop() {
        if (!gameEnded) {
            move();
            draw();
            setTimeout(gameLoop, 100);
        }
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    });

    gameLoop();
    
});

