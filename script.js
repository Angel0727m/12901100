function mostrarTema(tema) {

    document.getElementById("inicio").style.display = "none";

    document.querySelectorAll(".pagina").forEach(function(pagina) {
        pagina.style.display = "none";
    });

    document.getElementById(tema).style.display = "block";
}


function volverInicio() {

    document.querySelectorAll(".pagina").forEach(function(pagina) {
        pagina.style.display = "none";
    });

    document.getElementById("inicio").style.display = "block";
}
