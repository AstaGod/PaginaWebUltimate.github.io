document.addEventListener("DOMContentLoaded", function () {
    // Carrusel de imágenes
    const carrusel = document.querySelector(".carrusel");
    const totalCards = document.querySelectorAll(".card").length;
    const cardsPerSlide = 2; // Mostrar dos imágenes por vez
    let currentIndex = 0;

    // Función para mover el carrusel a la derecha
    function moveRight() {
        // Si no hemos llegado al final, seguimos sumando
        if (currentIndex < totalCards - cardsPerSlide) {
            currentIndex++;
        } else {
            currentIndex = 0; // Vuelve al principio al llegar al final
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

    // Modal
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const contactForm = document.getElementById('contactForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    // Variable para almacenar el índice de la fila seleccionada para actualizar
    let editingRow = null;

    // Abrir ventana emergente
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Cerrar ventana emergente
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Cerrar al hacer clic fuera de la ventana
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Agregar datos a la tabla cuando se envía el formulario
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (editingRow) {
            // Si estamos editando, actualizamos la fila
            editingRow.cells[0].textContent = name;
            editingRow.cells[1].textContent = email;
            editingRow.cells[2].textContent = phone;

            // Resetear la fila en edición
            editingRow = null;
        } else {
            // Crear una nueva fila en la tabla
            const row = dataTable.insertRow();

            // Insertar las celdas de datos
            const nameCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            const phoneCell = row.insertCell(2);
            const actionCell = row.insertCell(3);

            nameCell.textContent = name;
            emailCell.textContent = email;
            phoneCell.textContent = phone;

            // Crear los botones de acción (Eliminar y Actualizar)
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete');
            deleteBtn.onclick = function () {
                // Eliminar la fila
                dataTable.deleteRow(row.rowIndex - 1);
            };

            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Actualizar';
            updateBtn.classList.add('update');
            updateBtn.onclick = function () {
                // Llenar el formulario con los datos de la fila seleccionada
                document.getElementById('name').value = name;
                document.getElementById('email').value = email;
                document.getElementById('phone').value = phone;

                // Guardar la fila actual como la fila a actualizar
                editingRow = row;
            };

            // Agregar los botones a la celda de acciones
            actionCell.appendChild(deleteBtn);
            actionCell.appendChild(updateBtn);
        }

        // Limpiar el formulario
        contactForm.reset();
    });
});


// Selección de filas
const deleteButton = document.querySelector('.delete');
const updateButton = document.querySelector('.update');
const checkboxes = document.querySelectorAll('.selectRow');

// Función para actualizar la fila seleccionada
updateButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            // Aquí puedes agregar la lógica para actualizar la fila seleccionada
            alert('Actualizar fila: ' + (index + 1)); // Placeholder para actualización
        }
    });
});

// Función para eliminar la fila seleccionada
deleteButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            row.remove(); // Elimina la fila seleccionada
        }
    });
});
