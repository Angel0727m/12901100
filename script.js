/* ==================== DATOS DE LUADRIX ==================== */

const conceptos = [
    {
        nombre: "Condicionales",
        id: "condicionales",
        descripcion: "if, then, else, elseif y comparaciones."
    },
    {
        nombre: "Booleanos",
        id: "booleanos",
        descripcion: "true, false, and, or y not."
    },
    {
        nombre: "Bucles",
        id: "bucles",
        descripcion: "while, repeat, for, break y goto."
    },
    {
        nombre: "Funciones",
        id: "funciones",
        descripcion: "Parámetros, return, closures y varargs."
    },
    {
        nombre: "Tablas",
        id: "tablas",
        descripcion: "Listas, claves, campos e iteración."
    },
    {
        nombre: "Strings",
        id: "strings",
        descripcion: "Texto, patrones, búsqueda y UTF-8."
    },
    {
        nombre: "Operadores",
        id: "operadores",
        descripcion: "Aritméticos, lógicos, comparación y bits."
    },
    {
        nombre: "Variables y alcance",
        id: "variables",
        descripcion: "local, global, const, close y _ENV."
    },
    {
        nombre: "Tipos de datos",
        id: "tipos",
        descripcion: "Los tipos de valores de Lua."
    },
    {
        nombre: "Funciones básicas",
        id: "funcionesbasicas",
        descripcion: "print, type, tonumber, pcall y más."
    },
    {
        nombre: "Librerías estándar",
        id: "funcionesextras",
        descripcion: "string, table, math, io, os, package y más."
    },
    {
        nombre: "Metatables",
        id: "metatables",
        descripcion: "Metamethods y comportamiento personalizado."
    },
    {
        nombre: "Coroutines",
        id: "coroutines",
        descripcion: "Suspender y reanudar código."
    },
    {
        nombre: "Errores y protección",
        id: "errores",
        descripcion: "error, assert, pcall, xpcall y warn."
    },
    {
        nombre: "Módulos",
        id: "modulos",
        descripcion: "require, package y organización del código."
    },
    {
        nombre: "Conceptos avanzados",
        id: "avanzado",
        descripcion: "GC, weak tables, load, debug, _G y más."
    },
    {
        nombre: "Diccionario completo",
        id: "completo",
        descripcion: "Todos los conceptos de LuaDrix."
    },
    {
        nombre: "Quiz de Lua",
        id: "quiz",
        descripcion: "Pon a prueba lo que aprendiste."
    },
    {
        nombre: "Ejercicios",
        id: "ejercicios",
        descripcion: "Practica lo aprendido."
    },
    {
        nombre: "Laboratorio",
        id: "interactivo",
        descripcion: "Prueba conceptos básicos."
    }
];


/* ==================== FUNCIONES AUXILIARES ==================== */

function escapeHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ==================== NAVEGACIÓN ==================== */

function mostrarTema(tema) {

    const paginas = document.querySelectorAll(".pagina");

    paginas.forEach(function(pagina) {
        pagina.style.display = "none";
    });

    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "none";
    }

    const pagina = document.getElementById(tema);

    if (!pagina) {
        console.warn("No existe la página:", tema);
        return;
    }

    pagina.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (tema === "quiz") {
        iniciarQuiz();
    }

    if (tema === "completo") {
        generarDiccionario();
    }
}


function volverInicio() {

    document.querySelectorAll(".pagina").forEach(
        function(pagina) {
            pagina.style.display = "none";
        }
    );

    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==================== PROGRESO ==================== */

function obtenerProgreso() {

    const guardado =
        localStorage.getItem("luaDrixProgreso");

    if (!guardado) {
        return [];
    }

    try {
        const progreso = JSON.parse(guardado);

        if (!Array.isArray(progreso)) {
            return [];
        }

        return progreso;

    } catch (error) {
        return [];
    }
}


function guardarProgreso(progreso) {

    localStorage.setItem(
        "luaDrixProgreso",
        JSON.stringify(progreso)
    );
}


function marcarAprendido(nombre) {

    let progreso = obtenerProgreso();

    if (!progreso.includes(nombre)) {
        progreso.push(nombre);
        guardarProgreso(progreso);
    }

    const boton = document.querySelector(
        `.aprendido[onclick="marcarAprendido('${nombre}')"]`
    );

    if (boton) {
        boton.classList.add("aprendido-activo");
        boton.textContent = "✓ Aprendido";
    }

    actualizarProgreso();
}


function actualizarProgreso() {

    const progreso = obtenerProgreso();

    const texto =
        document.getElementById("textoProgreso");

    const barra =
        document.getElementById("barraProgreso");

    const total = conceptos.length;

    const aprendidos =
        progreso.filter(function(nombre) {
            return conceptos.some(function(concepto) {
                return concepto.id === nombre;
            });
        }).length;

    const porcentaje =
        total === 0
            ? 0
            : Math.round((aprendidos / total) * 100);

    if (texto) {
        texto.textContent =
            `${aprendidos} de ${total} conceptos aprendidos (${porcentaje}%)`;
    }

    if (barra) {
        barra.style.width =
            `${porcentaje}%`;

        barra.setAttribute(
            "aria-valuenow",
            porcentaje
        );
    }

    document.querySelectorAll(".aprendido").forEach(
        function(boton) {

            const coincidencia =
                boton.getAttribute("onclick");

            if (!coincidencia) {
                return;
            }

            const resultado =
                coincidencia.match(
                    /marcarAprendido\('([^']+)'\)/
                );

            if (!resultado) {
                return;
            }

            const id = resultado[1];

            if (progreso.includes(id)) {
                boton.classList.add("aprendido-activo");
                boton.textContent = "✓ Aprendido";
            }
        }
    );
}


/* ==================== MODO OSCURO ==================== */

function alternarModo() {

    const activado =
        document.body.classList.toggle("oscuro");

    localStorage.setItem(
        "luaDrixModoOscuro",
        activado ? "true" : "false"
    );

    actualizarBotonModo();
}


function actualizarBotonModo() {

    const boton =
        document.getElementById("modoOscuro");

    if (!boton) {
        return;
    }

    const activado =
        document.body.classList.contains("oscuro");

    boton.textContent =
        activado
            ? "☀️ Modo claro"
            : "🌙 Modo oscuro";
}


function cargarModoOscuro() {

    const guardado =
        localStorage.getItem("luaDrixModoOscuro");

    if (guardado === "true") {
        document.body.classList.add("oscuro");
    }

    actualizarBotonModo();
}


/* ==================== BUSCADOR ==================== */

function buscarConcepto() {

    const input =
        document.getElementById("busqueda");

    const resultados =
        document.getElementById("resultadosBusqueda");

    if (!input || !resultados) {
        return;
    }

    const texto =
        input.value
            .trim()
            .toLowerCase();

    if (texto === "") {
        resultados.innerHTML = "";
        resultados.style.display = "none";
        return;
    }

    const encontrados =
        conceptos.filter(function(concepto) {

            return (
                concepto.nombre
                    .toLowerCase()
                    .includes(texto) ||

                concepto.descripcion
                    .toLowerCase()
                    .includes(texto)
            );

        });

    resultados.style.display = "block";

    if (encontrados.length === 0) {

        resultados.innerHTML =
            '<p class="sin-resultados">No se encontró ningún concepto.</p>';

        return;
    }

    let html = "";

    encontrados.forEach(function(concepto) {

        html += `
            <button
                class="resultado-busqueda"
                onclick="mostrarTema('${escapeHTML(concepto.id)}')"
            >
                <strong class="resultado-titulo">
                    ${escapeHTML(concepto.nombre)}
                </strong>

                <span class="resultado-descripcion">
                    ${escapeHTML(concepto.descripcion)}
                </span>
            </button>
        `;

    });

    resultados.innerHTML = html;
}


/* ==================== DICCIONARIO COMPLETO ==================== */

function generarDiccionario() {

    const contenedor =
        document.getElementById("diccionarioCompleto");

    if (!contenedor) {
        return;
    }

    let html = "";

    conceptos.forEach(function(concepto) {

        html += `
            <div class="concepto-card">

                <h3>
                    ${escapeHTML(concepto.nombre)}
                </h3>

                <p>
                    ${escapeHTML(concepto.descripcion)}
                </p>

                <button
                    onclick="mostrarTema('${escapeHTML(concepto.id)}')"
                >
                    Ver tema
                </button>

            </div>
        `;

    });

    contenedor.innerHTML = html;
}


/* ==================== EJERCICIOS ==================== */

const respuestasEjercicios = {

    respuesta1: {
        respuesta:
`local nombre = "Angel"
local edad = 15

print(nombre)
print(edad)`,
        explicacion:
            "local crea variables locales. En este ejemplo nombre guarda un string y edad guarda un número."
    },

    respuesta2: {
        respuesta:
`local edad = 15

if edad >= 18 then
    print("Adulto")
else
    print("Menor")
end`,
        explicacion:
            "if comprueba la condición. Como 15 no es mayor o igual a 18, se ejecuta el bloque else."
    },

    respuesta3: {
        respuesta:
`for i = 1, 5 do
    print(i)
end`,
        explicacion:
            "El for numérico comienza en 1 y continúa hasta 5. La variable i cambia en cada vuelta."
    },

    respuesta4: {
        respuesta:
`local function sumar(a, b)
    return a + b
end

print(sumar(5, 3))`,
        explicacion:
            "La función recibe dos parámetros y devuelve su suma mediante return."
    },

    respuesta5: {
        respuesta:
`local frutas = {
    "manzana",
    "banana",
    "pera"
}

print(frutas[1])`,
        explicacion:
            "Las tablas usadas como secuencias comienzan normalmente en el índice 1. Por eso frutas[1] contiene manzana."
    }
};


function mostrarRespuesta(id) {

    const datos =
        respuestasEjercicios[id];

    if (!datos) {
        console.warn(
            "No existe una respuesta para:",
            id
        );
        return;
    }

    const contenedor =
        document.getElementById(id);

    if (!contenedor) {
        console.warn(
            "No existe el elemento:",
            id
        );
        return;
    }

    const visible =
        contenedor.dataset.mostrando === "true";

    if (visible) {

        contenedor.innerHTML =
            "Pista: usa el ejercicio como guía.";

        contenedor.dataset.mostrando = "false";
        contenedor.style.display = "none";

        return;
    }

    contenedor.innerHTML = `
        <h4>Respuesta</h4>

        <pre><code>${escapeHTML(datos.respuesta)}</code></pre>

        <p>
            <strong>¿Por qué?</strong>
            ${escapeHTML(datos.explicacion)}
        </p>
    `;

    contenedor.dataset.mostrando = "true";
    contenedor.style.display = "block";
}


/* ==================== LABORATORIO ==================== */

function ejecutarLaboratorio() {

    const valorA =
        document.getElementById("valorA");

    const valorB =
        document.getElementById("valorB");

    const operacion =
        document.getElementById("operacion");

    const salida =
        document.getElementById("salidaLaboratorio");

    if (!valorA || !valorB || !operacion || !salida) {
        return;
    }

    if (
        valorA.value.trim() === "" ||
        valorB.value.trim() === ""
    ) {

        salida.textContent =
            "Escribe los dos valores primero.";

        return;
    }

    const a =
        Number(valorA.value);

    const b =
        Number(valorB.value);

    if (
        Number.isNaN(a) ||
        Number.isNaN(b)
    ) {

        salida.textContent =
            "Los valores deben ser números.";

        return;
    }

    let resultado;

    switch (operacion.value) {

        case "suma":

            resultado =
                a + b;

            break;

        case "resta":

            resultado =
                a - b;

            break;

        case "multiplicacion":

            resultado =
                a * b;

            break;

        case "division":

            if (b === 0) {

                salida.textContent =
                    "No se puede dividir entre cero.";

                return;
            }

            resultado =
                a / b;

            break;

        case "mayor":

            resultado =
                a > b
                    ? `${a} es mayor que ${b}`
                    : a < b
                        ? `${b} es mayor que ${a}`
                        : "Los dos valores son iguales.";

            break;

        default:

            salida.textContent =
                "Operación no reconocida.";

            return;
    }

    salida.textContent =
        `Resultado: ${resultado}`;
}


/* ==================== LIBRERÍAS ==================== */

const bibliotecas = {

    basic: {
        nombre: "Basic",
        funciones: [
            "print()",
            "type()",
            "tonumber()",
            "tostring()",
            "pairs()",
            "ipairs()",
            "next()",
            "select()",
            "pcall()",
            "xpcall()",
            "error()",
            "assert()",
            "warn()",
            "load()",
            "loadfile()",
            "dofile()",
            "require()"
        ]
    },

    coroutine: {
        nombre: "Coroutine",
        funciones: [
            "coroutine.create()",
            "coroutine.resume()",
            "coroutine.yield()",
            "coroutine.status()",
            "coroutine.running()",
            "coroutine.wrap()",
            "coroutine.isyieldable()",
            "coroutine.close()"
        ]
    },

    package: {
        nombre: "Package",
        funciones: [
            "package.path",
            "package.cpath",
            "package.loaded",
            "package.preload",
            "package.searchers",
            "package.config"
        ]
    },

    string: {
        nombre: "String",
        funciones: [
            "string.byte()",
            "string.char()",
            "string.dump()",
            "string.find()",
            "string.format()",
            "string.gmatch()",
            "string.gsub()",
            "string.len()",
            "string.lower()",
            "string.match()",
            "string.rep()",
            "string.reverse()",
            "string.sub()",
            "string.upper()"
        ]
    },

    utf8: {
        nombre: "UTF-8",
        funciones: [
            "utf8.char()",
            "utf8.charpattern",
            "utf8.codes()",
            "utf8.codepoint()",
            "utf8.len()",
            "utf8.offset()"
        ]
    },

    table: {
        nombre: "Table",
        funciones: [
            "table.concat()",
            "table.create()",
            "table.insert()",
            "table.move()",
            "table.pack()",
            "table.remove()",
            "table.sort()",
            "table.unpack()"
        ]
    },

    math: {
        nombre: "Math",
        funciones: [
            "math.abs()",
            "math.ceil()",
            "math.floor()",
            "math.max()",
            "math.min()",
            "math.random()",
            "math.randomseed()",
            "math.sqrt()",
            "math.sin()",
            "math.cos()",
            "math.tan()",
            "math.pi"
        ]
    },

    io: {
        nombre: "IO",
        funciones: [
            "io.close()",
            "io.flush()",
            "io.input()",
            "io.lines()",
            "io.open()",
            "io.output()",
            "io.popen()",
            "io.read()",
            "io.tmpfile()",
            "io.type()",
            "io.write()"
        ]
    },

    os: {
        nombre: "OS",
        funciones: [
            "os.clock()",
            "os.date()",
            "os.difftime()",
            "os.execute()",
            "os.exit()",
            "os.getenv()",
            "os.remove()",
            "os.rename()",
            "os.setlocale()",
            "os.time()",
            "os.tmpname()"
        ]
    },

    debug: {
        nombre: "Debug",
        funciones: [
            "debug.debug()",
            "debug.gethook()",
            "debug.getinfo()",
            "debug.getlocal()",
            "debug.getmetatable()",
            "debug.getregistry()",
            "debug.getupvalue()",
            "debug.sethook()",
            "debug.setlocal()",
            "debug.setmetatable()",
            "debug.setupvalue()",
            "debug.traceback()",
            "debug.upvalueid()",
            "debug.upvaluejoin()"
        ]
    }
};


function filtrarBiblioteca(nombre) {

    const contenedor =
        document.getElementById("bibliotecaResultado");

    if (!contenedor) {
        return;
    }

    const biblioteca =
        bibliotecas[nombre];

    if (!biblioteca) {

        contenedor.innerHTML =
            "No se encontró esa librería.";

        return;
    }

    let html = `
        <h3>
            ${escapeHTML(biblioteca.nombre)}
        </h3>

        <div class="lista-conceptos grande">
    `;

    biblioteca.funciones.forEach(function(funcion) {

        html += `
            <span>
                ${escapeHTML(funcion)}
            </span>
        `;

    });

    html += `
        </div>
    `;

    contenedor.innerHTML = html;
}


/* ==================== QUIZ ==================== */

const preguntasQuiz = [

    {
        pregunta:
            "¿Cuál de estos valores es falso en una condición de Lua?",

        opciones: [
            "0",
            "\"\"",
            "nil",
            "{}"
        ],

        correcta: 2,

        explicacion:
            "En Lua, solamente nil y false son valores falsos en condiciones. Incluso 0 y strings vacíos cuentan como verdaderos."
    },

    {
        pregunta:
            "¿Qué palabra se utiliza para declarar una variable local?",

        opciones: [
            "var",
            "local",
            "let",
            "define"
        ],

        correcta: 1,

        explicacion:
            "local declara una variable con alcance léxico local."
    },

    {
        pregunta:
            "¿Qué operador se utiliza para concatenar strings?",

        opciones: [
            "+",
            "&",
            "..",
            "concat"
        ],

        correcta: 2,

        explicacion:
            "Lua utiliza .. para concatenar strings."
    },

    {
        pregunta:
            "¿Qué estructura permite repetir código mientras una condición sea verdadera?",

        opciones: [
            "while",
            "repeat",
            "if",
            "switch"
        ],

        correcta: 0,

        explicacion:
            "while ejecuta su bloque mientras la condición sea verdadera."
    },

    {
        pregunta:
            "¿Cuál es el índice inicial habitual de una secuencia en una tabla Lua?",

        opciones: [
            "0",
            "1",
            "-1",
            "Depende siempre del programa"
        ],

        correcta: 1,

        explicacion:
            "Las secuencias convencionales de Lua empiezan en 1."
    },

    {
        pregunta:
            "¿Qué función devuelve el tipo de un valor?",

        opciones: [
            "typeof",
            "kind",
            "type",
            "gettype"
        ],

        correcta: 2,

        explicacion:
            "type(valor) devuelve información sobre el tipo del valor."
    },

    {
        pregunta:
            "¿Qué palabra permite devolver valores desde una función?",

        opciones: [
            "send",
            "give",
            "return",
            "output"
        ],

        correcta: 2,

        explicacion:
            "return devuelve uno o varios valores desde una función."
    },

    {
        pregunta:
            "¿Qué función se utiliza normalmente para recorrer pares clave-valor de una tabla?",

        opciones: [
            "pairs",
            "loop",
            "each",
            "table.for"
        ],

        correcta: 0,

        explicacion:
            "pairs(tabla) proporciona un iterador para recorrer sus pares clave-valor."
    },

    {
        pregunta:
            "¿Qué función busca un patrón dentro de un string?",

        opciones: [
            "string.search",
            "string.find",
            "string.look",
            "string.scan"
        ],

        correcta: 1,

        explicacion:
            "string.find busca una coincidencia y puede devolver sus posiciones."
    },

    {
        pregunta:
            "¿Qué función permite ejecutar otra función de forma protegida?",

        opciones: [
            "safe",
            "protect",
            "pcall",
            "try"
        ],

        correcta: 2,

        explicacion:
            "pcall ejecuta una función en modo protegido y devuelve si tuvo éxito junto con sus resultados."
    },

    {
        pregunta:
            "¿Qué estructura de Lua se utiliza como su principal estructura de datos?",

        opciones: [
            "table",
            "array",
            "object",
            "struct"
        ],

        correcta: 0,

        explicacion:
            "table es la estructura de datos principal de Lua y puede representar secuencias, diccionarios y estructuras más complejas."
    },

    {
        pregunta:
            "¿Qué característica de Lua 5.5 permite marcar una variable local para que no pueda reasignarse?",

        opciones: [
            "<fixed>",
            "<const>",
            "<final>",
            "<static>"
        ],

        correcta: 1,

        explicacion:
            "Lua 5.5 incorpora el atributo <const> para variables locales constantes."
    }
];


let preguntaActual = 0;
let respuestasQuiz = [];
let quizTerminado = false;


function iniciarQuiz() {

    preguntaActual = 0;
    respuestasQuiz = [];
    quizTerminado = false;

    mostrarPreguntaQuiz();
}


function mostrarPreguntaQuiz() {

    const contenedor =
        document.getElementById("quizContenedor");

    if (!contenedor) {
        return;
    }

    if (preguntaActual >= preguntasQuiz.length) {
        mostrarResultadoQuiz();
        return;
    }

    const pregunta =
        preguntasQuiz[preguntaActual];

    let html = `
        <div class="quiz-numero">
            Pregunta ${preguntaActual + 1}
            de ${preguntasQuiz.length}
        </div>

        <div class="quiz-pregunta">
            ${escapeHTML(pregunta.pregunta)}
        </div>

        <div class="quiz-opciones">
    `;

    pregunta.opciones.forEach(
        function(opcion, indice) {

            html += `
                <button
                    class="quiz-opcion"
                    onclick="responderQuiz(${indice})"
                >
                    ${escapeHTML(opcion)}
                </button>
            `;

        }
    );

    html += `
        </div>
    `;

    contenedor.innerHTML = html;
}


function responderQuiz(indice) {

    if (quizTerminado) {
        return;
    }

    const pregunta =
        preguntasQuiz[preguntaActual];

    if (!pregunta) {
        return;
    }

    const correcta =
        indice === pregunta.correcta;

    respuestasQuiz.push({
        correcta: correcta,
        respuestaUsuario: indice
    });

    const contenedor =
        document.getElementById("quizContenedor");

    if (!contenedor) {
        return;
    }

    const botones =
        contenedor.querySelectorAll(".quiz-opcion");

    botones.forEach(function(boton) {
        boton.disabled = true;
    });

    botones.forEach(
        function(boton, posicion) {

            if (posicion === pregunta.correcta) {
                boton.classList.add("correcta");
            }

            if (
                posicion === indice &&
                posicion !== pregunta.correcta
            ) {
                boton.classList.add("incorrecta");
            }
        }
    );

    const explicacion =
        document.createElement("div");

    explicacion.className =
        "quiz-explicacion";

    explicacion.innerHTML = `
        <p>
            <strong>
                ${correcta ? "Correcto." : "Incorrecto."}
            </strong>
        </p>

        <p>
            ${escapeHTML(pregunta.explicacion)}
        </p>

        <button
            class="quiz-siguiente"
            onclick="siguientePreguntaQuiz()"
        >
            ${
                preguntaActual === preguntasQuiz.length - 1
                    ? "Ver resultado"
                    : "Siguiente pregunta"
            }
        </button>
    `;

    contenedor.appendChild(explicacion);
}


function siguientePreguntaQuiz() {

    preguntaActual++;

    mostrarPreguntaQuiz();
}


function mostrarResultadoQuiz() {

    const contenedor =
        document.getElementById("quizContenedor");

    if (!contenedor) {
        return;
    }

    quizTerminado = true;

    let puntos = 0;

    respuestasQuiz.forEach(
        function(respuesta) {

            if (respuesta.correcta) {
                puntos++;
            }

        }
    );

    const total =
        preguntasQuiz.length;

    const porcentaje =
        total === 0
            ? 0
            : Math.round(
                (puntos / total) * 100
            );

    let mensaje;

    if (porcentaje === 100) {

        mensaje =
            "Perfecto. Dominaste este quiz.";

    } else if (porcentaje >= 80) {

        mensaje =
            "Muy buen resultado. Ya tienes una buena base.";

    } else if (porcentaje >= 60) {

        mensaje =
            "Vas bien. Un repaso de algunos conceptos te vendría bien.";

    } else {

        mensaje =
            "Todavía hay cosas por reforzar, pero para eso está LuaDrix.";
    }

    contenedor.innerHTML = `
        <div class="quiz-resultado">

            <h2>
                Resultado
            </h2>

            <div class="quiz-puntuacion">
                ${puntos} / ${total}
            </div>

            <p>
                ${porcentaje}% de respuestas correctas.
            </p>

            <p>
                ${escapeHTML(mensaje)}
            </p>

            <button
                class="quiz-reiniciar"
                onclick="iniciarQuiz()"
            >
                Repetir quiz
            </button>

        </div>
    `;
}


/* ==================== INICIO ==================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        cargarModoOscuro();

        generarDiccionario();

        actualizarProgreso();

        const inicio =
            document.getElementById("inicio");

        if (inicio) {
            inicio.style.display = "block";
        }

        document.querySelectorAll(".pagina").forEach(
            function(pagina) {
                pagina.style.display = "none";
            }
        );

    }
);
