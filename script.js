```css
/* =========================================================
   LUALEX — DICCIONARIO DE LUA 5.5
   ========================================================= */


/* ==================== BASE ==================== */

* {
    box-sizing: border-box;
}


html {
    scroll-behavior: smooth;
}


body {

    font-family: Arial, sans-serif;

    background-color: #f4f5f4;

    margin: 0;

    color: #222222;

    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}


button,
input,
select {

    font-family: inherit;
}


/* ==================== ENCABEZADO ==================== */

header {

    background-color: white;

    padding: 35px 25px;

    text-align: center;

    border-bottom: 3px solid #2f9e44;

    transition:
        background-color 0.2s ease;
}


.header-etiqueta {

    margin: 0 0 8px 0;

    font-size: 13px;

    font-weight: bold;

    letter-spacing: 1.5px;

    text-transform: uppercase;

    color: #2f9e44;
}


header h1 {

    margin: 0;

    font-size: 48px;

    line-height: 1.1;
}


header p {

    color: #666666;

    font-size: 16px;
}


.controles-header {

    margin-top: 20px;
}


.boton-header {

    padding: 10px 16px;

    background-color: white;

    border: 1px solid #cccccc;

    border-radius: 6px;

    color: #333333;

    cursor: pointer;

    transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
}


.boton-header:hover {

    background-color: #f1f1f1;

    border-color: #999999;
}


/* ==================== CONTENIDO ==================== */

main {

    max-width: 1100px;

    margin: 40px auto;

    background-color: white;

    padding: 40px;

    border: 1px solid #dddddd;

    box-sizing: border-box;

    transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
}


/* ==================== BUSCADOR ==================== */

.buscador {

    margin-bottom: 20px;
}


.buscador input {

    width: 100%;

    padding: 15px 18px;

    border: 1px solid #cccccc;

    border-radius: 7px;

    font-size: 16px;

    outline: none;

    transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
}


.buscador input:focus {

    border-color: #2f9e44;

    box-shadow:
        0 0 0 3px rgba(47, 158, 68, 0.12);
}


/* ==================== RESULTADOS ==================== */

.resultados-busqueda {

    display: none;

    margin-bottom: 25px;
}


.resultado-busqueda {

    display: block;

    width: 100%;

    padding: 16px;

    margin-bottom: 10px;

    text-align: left;

    background-color: #fafafa;

    border: 1px solid #dddddd;

    border-left: 4px solid #2f9e44;

    border-radius: 5px;

    cursor: pointer;

    transition:
        background-color 0.15s ease,
        transform 0.15s ease;
}


.resultado-busqueda:hover {

    background-color: #f0f7f1;

    transform: translateX(3px);
}


.resultado-titulo {

    display: block;

    font-size: 17px;

    font-weight: bold;

    margin-bottom: 5px;
}


.resultado-categoria {

    display: block;

    color: #2f9e44;

    font-size: 12px;

    font-weight: bold;

    text-transform: uppercase;

    margin-bottom: 5px;
}


.resultado-descripcion {

    display: block;

    color: #666666;

    font-size: 14px;

    line-height: 1.4;
}


.sin-resultados {

    padding: 18px;

    color: #666666;

    text-align: center;

    border: 1px dashed #cccccc;

    border-radius: 5px;
}


/* ==================== PROGRESO ==================== */

.progreso-caja {

    padding: 18px;

    margin-bottom: 30px;

    background-color: #f8faf8;

    border: 1px solid #dfe5df;

    border-radius: 7px;
}


.progreso-textos {

    display: flex;

    justify-content: space-between;

    gap: 15px;

    margin-bottom: 10px;

    font-size: 14px;
}


.progreso-textos span {

    color: #666666;
}


.barra-progreso {

    width: 100%;

    height: 10px;

    background-color: #dddddd;

    border-radius: 20px;

    overflow: hidden;
}


#barraProgreso {

    width: 0%;

    height: 100%;

    background-color: #2f9e44;

    border-radius: 20px;

    transition: width 0.3s ease;
}


/* ==================== TÍTULOS ==================== */

main h2 {

    font-size: 34px;

    margin-top: 0;

    margin-bottom: 10px;
}


main h3 {

    margin-top: 30px;

    margin-bottom: 10px;
}


main p {

    line-height: 1.6;
}


/* ==================== MENÚ ==================== */

.menu {

    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(250px, 1fr));

    gap: 20px;

    margin-top: 30px;
}


/* ==================== TARJETAS ==================== */

.tarjeta {

    min-height: 190px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: flex-start;

    gap: 12px;

    padding: 25px;

    background-color: white;

    border: 1px solid #dddddd;

    border-top: 4px solid #2f9e44;

    border-radius: 6px;

    cursor: pointer;

    text-align: left;

    color: #222222;

    transition:
        transform 0.15s ease,
        box-shadow 0.15s ease,
        background-color 0.15s ease;
}


.tarjeta:hover {

    transform: translateY(-5px);

    box-shadow:
        0 6px 15px rgba(47, 158, 68, 0.25);

    background-color: #fafafa;
}


.tarjeta:active {

    transform: translateY(-2px);
}


/* TARJETAS ESPECIALES */

.tarjeta.especial {

    border-top-color: #1f7a37;

    background-color: #f8fbf8;
}


/* ==================== ÍCONOS ==================== */

.tarjeta-icono {

    font-size: 38px;

    line-height: 1;
}


/* ==================== TÍTULO TARJETA ==================== */

.tarjeta-titulo {

    font-size: 22px;

    font-weight: bold;
}


/* ==================== DESCRIPCIÓN TARJETA ==================== */

.tarjeta-descripcion {

    font-size: 15px;

    color: #666666;

    line-height: 1.4;
}


/* ==================== PÁGINAS ==================== */

.pagina {

    display: none;
}


.pagina h2 {

    font-size: 36px;

    border-bottom: 3px solid #2f9e44;

    padding-bottom: 12px;

    display: inline-block;
}


/* ==================== BREADCRUMB ==================== */

.breadcrumb {

    color: #888888;

    font-size: 13px;

    margin-top: 20px;

    margin-bottom: 5px;
}


/* ==================== BOTÓN VOLVER ==================== */

.volver {

    padding: 10px 15px;

    background-color: white;

    border: 1px solid #2f9e44;

    border-radius: 5px;

    color: #1f7a37;

    cursor: pointer;

    font-size: 14px;

    transition:
        background-color 0.15s ease;
}


.volver:hover {

    background-color: #e8f5ea;
}


/* ==================== CÓDIGO ==================== */

pre {

    background-color: #1b2420;

    padding: 20px;

    overflow-x: auto;

    border-left: 4px solid #2f9e44;

    border-radius: 5px;

    margin: 18px 0;
}


pre code {

    color: #d7e4dc;

    background-color: transparent;

    padding: 0;

    border-radius: 0;

    font-family: Consolas, monospace;

    font-size: 14px;

    line-height: 1.6;
}


code {

    font-family: Consolas, monospace;

    background-color: #e8f5ea;

    color: #1f7a37;

    padding: 2px 6px;

    border-radius: 3px;
}


/* ==================== REGLAS ==================== */

.regla {

    padding: 16px 18px;

    margin: 25px 0;

    background-color: #f1f8f2;

    border-left: 4px solid #2f9e44;

    border-radius: 4px;

    line-height: 1.6;
}


/* ==================== MARCAR APRENDIDO ==================== */

.aprendido {

    margin-top: 25px;

    padding: 11px 17px;

    background-color: #2f9e44;

    border: 1px solid #287c38;

    border-radius: 5px;

    color: white;

    cursor: pointer;

    font-weight: bold;

    transition:
        background-color 0.15s ease,
        transform 0.15s ease;
}


.aprendido:hover {

    background-color: #287c38;

    transform: translateY(-1px);
}


.aprendido.aprendido-activo {

    background-color: #1f7a37;

}


/* ==================== LISTA DE CONCEPTOS ==================== */

.lista-conceptos {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin: 20px 0;
}


.lista-conceptos span {

    padding: 9px 12px;

    background-color: #f1f8f2;

    border: 1px solid #cfe3d2;

    border-radius: 5px;

    color: #1f7a37;

    font-family: Consolas, monospace;

    font-size: 14px;
}


.lista-conceptos.grande span {

    font-size: 13px;
}


/* ==================== LIBRERÍAS ==================== */

.bibliotecas-grid {

    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(130px, 1fr));

    gap: 10px;

    margin: 25px 0;
}


.bibliotecas-grid button {

    padding: 12px;

    background-color: white;

    border: 1px solid #cccccc;

    border-radius: 5px;

    cursor: pointer;

    color: #333333;

    transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
}


.bibliotecas-grid button:hover {

    border-color: #2f9e44;

    background-color: #f1f8f2;
}


.biblioteca-resultado {

    min-height: 100px;

    padding: 20px;

    margin-bottom: 25px;

    background-color: #f8faf8;

    border: 1px solid #dddddd;

    border-radius: 6px;

    line-height: 1.6;
}


.biblioteca-titulo {

    font-size: 22px;

    font-weight: bold;

    margin-bottom: 12px;
}


.biblioteca-funciones {

    display: flex;

    flex-wrap: wrap;

    gap: 8px;
}


.biblioteca-funciones span {

    padding: 7px 10px;

    background-color: white;

    border: 1px solid #d7ddd8;

    border-radius: 4px;

    font-family: Consolas, monospace;

    font-size: 13px;
}


/* ==================== DICCIONARIO COMPLETO ==================== */

.diccionario-controles {

    display: flex;

    gap: 10px;

    flex-wrap: wrap;

    margin: 20px 0;
}


.diccionario-controles input,
.diccionario-controles select {

    padding: 10px 12px;

    border: 1px solid #cccccc;

    border-radius: 5px;

    font-size: 14px;
}


.diccionario-lista {

    display: grid;

    gap: 12px;

    margin-top: 20px;
}


.concepto-card {

    padding: 18px;

    border: 1px solid #dddddd;

    border-left: 4px solid #2f9e44;

    border-radius: 5px;

    background-color: #ffffff;
}


.concepto-card h3 {

    margin: 0 0 8px 0;

    font-size: 18px;
}


.concepto-categoria {

    display: inline-block;

    margin-bottom: 8px;

    color: #2f9e44;

    font-size: 12px;

    font-weight: bold;

    text-transform: uppercase;
}


.concepto-card p {

    margin: 8px 0;

    color: #555555;
}


/* ==================== QUIZ ==================== */

.quiz-caja {

    padding: 25px;

    border: 1px solid #dddddd;

    border-radius: 7px;

    background-color: #fafafa;
}


.quiz-numero {

    color: #2f9e44;

    font-size: 13px;

    font-weight: bold;

    text-transform: uppercase;

    margin-bottom: 10px;
}


.quiz-pregunta {

    font-size: 21px;

    font-weight: bold;

    line-height: 1.4;

    margin-bottom: 20px;
}


.quiz-opciones {

    display: grid;

    gap: 10px;
}


.quiz-opcion {

    width: 100%;

    padding: 13px 15px;

    text-align: left;

    background-color: white;

    border: 1px solid #cccccc;

    border-radius: 5px;

    cursor: pointer;

    font-size: 15px;

    transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
}


.quiz-opcion:hover {

    background-color: #f1f8f2;

    border-color: #2f9e44;
}


.quiz-opcion.correcta {

    background-color: #e4f4e7;

    border-color: #2f9e44;
}


.quiz-opcion.incorrecta {

    background-color: #f8eeee;

    border-color: #c44c4c;
}


.quiz-explicacion {

    padding: 14px;

    margin-top: 18px;

    border-left: 4px solid #2f9e44;

    background-color: #f1f8f2;

    line-height: 1.5;
}


.quiz-siguiente {

    margin-top: 20px;

    padding: 11px 17px;

    background-color: #2f9e44;

    border: 0;

    border-radius: 5px;

    color: white;

    cursor: pointer;

    font-weight: bold;
}


.quiz-resultado {

    padding: 30px;

    text-align: center;

    border: 1px solid #dddddd;

    border-radius: 7px;

    background-color: #fafafa;
}


.quiz-puntuacion {

    font-size: 40px;

    font-weight: bold;

    color: #2f9e44;

    margin: 15px 0;
}


.quiz-reiniciar {

    padding: 11px 18px;

    background-color: #2f9e44;

    border: 0;

    border-radius: 5px;

    color: white;

    cursor: pointer;

    font-weight: bold;
}


/* ==================== EJERCICIOS ==================== */

.ejercicio {

    padding: 20px;

    margin: 20px 0;

    background-color: #fafafa;

    border: 1px solid #dddddd;

    border-left: 4px solid #2f9e44;

    border-radius: 5px;
}


.ejercicio h3 {

    margin-top: 0;
}


.ejercicio button {

    padding: 8px 13px;

    background-color: white;

    border: 1px solid #2f9e44;

    border-radius: 4px;

    color: #1f7a37;

    cursor: pointer;
}


.respuesta {

    display: none;

    padding: 12px;

    margin-top: 15px;

    background-color: #f1f8f2;

    border-radius: 4px;
}


/* ==================== LABORATORIO ==================== */

.laboratorio {

    padding: 25px;

    background-color: #fafafa;

    border: 1px solid #dddddd;

    border-radius: 7px;
}


.laboratorio label {

    display: block;

    margin-top: 15px;

    margin-bottom: 6px;

    font-weight: bold;
}


.laboratorio input,
.laboratorio select {

    width: 100%;

    padding: 11px;

    border: 1px solid #cccccc;

    border-radius: 5px;

    background-color: white;
}


.laboratorio > button {

    margin-top: 20px;

    padding: 11px 18px;

    background-color: #2f9e44;

    border: 0;

    border-radius: 5px;

    color: white;

    cursor: pointer;

    font-weight: bold;
}


#salidaLaboratorio {

    margin-top: 20px;
}


/* ==================== FOOTER ==================== */

footer {

    text-align: center;

    padding: 25px;

    color: #666666;

    font-size: 14px;
}


/* ==================== MODO OSCURO ==================== */

body.oscuro {

    background-color: #151815;

    color: #eeeeee;
}


body.oscuro header {

    background-color: #1d211e;
}


body.oscuro header p {

    color: #aaaaaa;
}


body.oscuro main {

    background-color: #1d211e;

    border-color: #343934;
}


body.oscuro .boton-header {

    background-color: #252a26;

    border-color: #444944;

    color: #eeeeee;
}


body.oscuro .boton-header:hover {

    background-color: #303630;
}


body.oscuro .tarjeta {

    background-color: #222722;

    border-color: #383e38;

    color: #eeeeee;
}


body.oscuro .tarjeta:hover {

    background-color: #282e28;
}


body.oscuro .tarjeta.especial {

    background-color: #202720;
}


body.oscuro .tarjeta-descripcion {

    color: #aaaaaa;
}


body.oscuro .buscador input {

    background-color: #252a26;

    border-color: #444944;

    color: #eeeeee;
}


body.oscuro .progreso-caja {

    background-color: #222722;

    border-color: #383e38;
}


body.oscuro .progreso-textos span {

    color: #aaaaaa;
}


body.oscuro .resultado-busqueda {

    background-color: #252a26;

    border-color: #3b413b;
}


body.oscuro .resultado-busqueda:hover {

    background-color: #2b322b;
}


body.oscuro .resultado-descripcion {

    color: #aaaaaa;
}


body.oscuro .sin-resultados {

    color: #aaaaaa;

    border-color: #444944;
}


body.oscuro .volver {

    background-color: #252a26;

    border-color: #2f9e44;

    color: #8ed49b;
}


body.oscuro .volver:hover {

    background-color: #303630;
}


body.oscuro code {

    background-color: #26352a;

    color: #9bddaa;
}


body.oscuro .regla {

    background-color: #222c24;
}


body.oscuro .lista-conceptos span {

    background-color: #222c24;

    border-color: #38503d;

    color: #9bddaa;
}


body.oscuro .bibliotecas-grid button {

    background-color: #252a26;

    border-color: #444944;

    color: #eeeeee;
}


body.oscuro .bibliotecas-grid button:hover {

    background-color: #303630;

    border-color: #2f9e44;
}


body.oscuro .biblioteca-resultado {

    background-color: #222722;

    border-color: #383e38;
}


body.oscuro .biblioteca-funciones span {

    background-color: #252a26;

    border-color: #444944;
}


body.oscuro .concepto-card {

    background-color: #222722;

    border-color: #383e38;
}


body.oscuro .concepto-card p {

    color: #bbbbbb;
}


body.oscuro .quiz-caja,
body.oscuro .quiz-resultado {

    background-color: #222722;

    border-color: #383e38;
}


body.oscuro .quiz-opcion {

    background-color: #252a26;

    border-color: #444944;

    color: #eeeeee;
}


body.oscuro .quiz-opcion:hover {

    background-color: #303630;
}


body.oscuro .quiz-explicacion {

    background-color: #222c24;
}


body.oscuro .ejercicio {

    background-color: #222722;

    border-color: #383e38;
}


body.oscuro .ejercicio button {

    background-color: #252a26;

    color: #9bddaa;
}


body.oscuro .respuesta {

    background-color: #222c24;
}


body.oscuro .laboratorio {

    background-color: #222722;

    border-color: #383e38;
}


body.oscuro .laboratorio input,
body.oscuro .laboratorio select {

    background-color: #252a26;

    border-color: #444944;

    color: #eeeeee;
}


body.oscuro footer {

    color: #aaaaaa;
}


/* ==================== RESPONSIVE ==================== */

@media (max-width: 700px) {

    header {

        padding: 28px 18px;

    }


    header h1 {

        font-size: 38px;

    }


    header p {

        font-size: 15px;

    }


    main {

        margin: 20px 10px;

        padding: 22px 16px;

    }


    main h2,
    .pagina h2 {

        font-size: 29px;

    }


    .menu {

        grid-template-columns: 1fr;

        gap: 15px;

    }


    .tarjeta {

        min-height: 155px;

        padding: 20px;

    }


    .tarjeta-icono {

        font-size: 32px;

    }


    .tarjeta-titulo {

        font-size: 20px;

    }


    .tarjeta-descripcion {

        font-size: 14px;

    }


    .progreso-textos {

        flex-direction: column;

        gap: 5px;

    }


    pre {

        padding: 15px;

    }


    pre code {

        font-size: 13px;

    }


    .quiz-pregunta {

        font-size: 18px;

    }


    .bibliotecas-grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

}


/* ==================== PANTALLAS MUY PEQUEÑAS ==================== */

@media (max-width: 400px) {

    main {

        margin: 10px 6px;

        padding: 18px 12px;

    }


    header h1 {

        font-size: 34px;

    }


    .bibliotecas-grid {

        grid-template-columns: 1fr;

    }


    .lista-conceptos span {

        font-size: 12px;

    }

}
```
