body {
    font-family: Arial, sans-serif;
    background-color: #f4f5f4;
    margin: 0;
    color: #222222;
}


/* ENCABEZADO */

header {
    background-color: white;
    padding: 30px;
    text-align: center;
    border-bottom: 3px solid #2f9e44;
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
    font-size: 42px;
}

header p {
    color: #666666;
}


/* CONTENIDO */

main {
    max-width: 900px;
    margin: 40px auto;
    background-color: white;
    padding: 35px;
    border: 1px solid #dddddd;
    box-sizing: border-box;
}


/* MENÚ */

.menu {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 30px;
}


/* TARJETAS */

.tarjeta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    min-height: 180px;
    padding: 25px;

    background-color: white;
    border: 1px solid #dddddd;
    border-top: 5px solid #2f9e44;

    cursor: pointer;
    text-align: center;

    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.tarjeta:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 14px rgba(47, 158, 68, 0.25);
}

.tarjeta-icono {
    font-size: 42px;
}

.tarjeta-titulo {
    font-size: 20px;
    font-weight: bold;
}


/* BREADCRUMB */

.breadcrumb {
    font-size: 13px;
    color: #888888;
    margin-bottom: 5px;
}


/* PÁGINAS */

.pagina {
    display: none;
}

.pagina h2 {
    font-size: 32px;
    border-bottom: 3px solid #2f9e44;
    padding-bottom: 10px;
    display: inline-block;
}

.pagina h3 {
    margin-top: 30px;
}


/* BOTÓN VOLVER */

.volver {
    padding: 10px 15px;
    background-color: white;
    border: 1px solid #2f9e44;
    color: #1f7a37;
    cursor: pointer;
}

.volver:hover {
    background-color: #e8f5ea;
}


/* CÓDIGO EN BLOQUE */

pre {
    background-color: #1b2420;
    padding: 20px;
    overflow-x: auto;
    border-left: 4px solid #2f9e44;
    border-radius: 4px;
}

pre code {
    color: #d7e4dc;
    background-color: transparent;
    padding: 0;
}


/* CÓDIGO EN LÍNEA */

code {
    font-family: Consolas, monospace;
    background-color: #e8f5ea;
    color: #1f7a37;
    padding: 2px 6px;
    border-radius: 3px;
}


/* PIE DE PÁGINA */

footer {
    text-align: center;
    padding: 25px;
    color: #666666;
}
