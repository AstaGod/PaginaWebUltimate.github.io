document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector(".carrusel");
    const totalCards = document.querySelectorAll(".card").length;
    const cardsPerSlide = 2;  // Mostrar dos imágenes por vez
    let currentIndex = 0;

    // Función para mover el carrusel a la derecha
    function moveRight() {
        // Si no hemos llegado al final, seguimos sumando
        if (currentIndex < totalCards - cardsPerSlide) {
            currentIndex++;
        } else {
            currentIndex = 0;  // Vuelve al principio al llegar al final
        }
        updateCarruselPosition();
    }

    // Función para actualizar la posición del carrusel
    function updateCarruselPosition() {
        const newTransformValue = `translateX(-${currentIndex * (100 / cardsPerSlide)}%)`;
        carrusel.style.transform = newTransformValue;
    }

    // Desplazamiento automático
    setInterval(moveRight, 3000); // Desplaza cada 3 segundos (3000 ms)
});
