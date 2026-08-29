function mostrarTema(tema) {

    // Ocultamos el inicio
    document.getElementById("inicio").style.display = "none";


    // Ocultamos todas las páginas
    document.querySelectorAll(".pagina").forEach(function(pagina) {

        pagina.style.display = "none";

    });


    // Mostramos solamente el tema elegido
    document.getElementById(tema).style.display = "block";
}



function volverInicio() {

    // Ocultamos todas las páginas
    document.querySelectorAll(".pagina").forEach(function(pagina) {

        pagina.style.display = "none";

    });


    // Mostramos nuevamente el menú
    document.getElementById("inicio").style.display = "block";
}
