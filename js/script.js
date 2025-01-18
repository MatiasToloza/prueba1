// Function for the slider
function funcionEjecutar(side) {
    let parentTarget = document.getElementById('slider');
    if (!parentTarget) return; // Exit if slider doesn't exist

    let elements = parentTarget.getElementsByTagName('li');
    if (elements.length === 0) return; // Exit if no slides

    let curElement, siguienteElement;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].style.opacity === '1') {
            curElement = i;
            break;
        }
    }

    if (side === 'anterior' || side === 'siguiente') {
        if (side === 'anterior') {
            siguienteElement = (curElement === 0) ? elements.length - 1 : curElement - 1;
        } else {
            siguienteElement = (curElement === elements.length - 1) ? 0 : curElement + 1;
        }
    } else {
        siguienteElement = side;
    }

    let elementSel = document.getElementsByClassName("listslider")[0]?.getElementsByTagName("a"); // Use optional chaining to prevent errors
    if (elementSel) {
        elementSel[curElement]?.classList.remove("item-select-slid"); // Use optional chaining to prevent errors
        elementSel[siguienteElement]?.classList.add("item-select-slid"); // Use optional chaining to prevent errors
    }


    elements[curElement].style.opacity = 0;
    elements[curElement].style.zIndex = 0;
    elements[siguienteElement].style.opacity = 1;
    elements[siguienteElement].style.zIndex = 1;
}

// Automatic slider
if (document.querySelector('#slider')) {
    setInterval(function () { // Correct way to use setInterval
        funcionEjecutar('siguiente');
    }, 5000);
}

// List slider functionality
if (document.querySelector('.listslider')) {
    let link = document.querySelectorAll(".listslider li a");
    link.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let item = this.getAttribute('itlist');
            let arrItem = item.split("_");
            funcionEjecutar(parseInt(arrItem[1], 10)); // Parse the string to an integer
        });
    });
}

// Smooth scrolling functionality (separate from the slider)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Category Buttons
const botonesCategoria = document.querySelectorAll('.categoria-btn');
const contenedoresProductos = document.querySelectorAll('.productos-container');

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesCategoria.forEach(btn => btn.classList.remove('active'));
        contenedoresProductos.forEach(contenedor => contenedor.classList.remove('active'));

        boton.classList.add('active');
        const categoria = boton.dataset.categoria;
        const contenedorActivo = document.getElementById(categoria);

        if (contenedorActivo) {
            contenedorActivo.classList.add('active');
        } else {
            console.error("No se encontró el contenedor con ID:", categoria);
        }
    });
});