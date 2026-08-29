function mostrarTema(tema) {

    // Ocultar el inicio
    document.getElementById("inicio").style.display = "none";

    // Ocultar todas las páginas
    document.querySelectorAll(".pagina").forEach(function(pagina) {
        pagina.style.display = "none";
    });

    // Mostrar el tema seleccionado
    document.getElementById(tema).style.display = "block";
}


function volverInicio() {

    // Ocultar todas las páginas
    document.querySelectorAll(".pagina").forEach(function(pagina) {
        pagina.style.display = "none";
    });

    // Mostrar el inicio
    document.getElementById("inicio").style.display = "block";
}
