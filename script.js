/* ==================== PROGRESO ==================== */

function obtenerProgreso() {
    const guardado = localStorage.getItem("luAlexProgreso");

    if (!guardado) {
        return [];
    }

    try {
        return JSON.parse(guardado);
    } catch (error) {
        return [];
    }
}


function guardarProgreso(progreso) {
    localStorage.setItem(
        "luAlexProgreso",
        JSON.stringify(progreso)
    );
}


function marcarAprendido(nombre) {
    let progreso = obtenerProgreso();

    if (!progreso.includes(nombre)) {
        progreso.push(nombre);
        guardarProgreso(progreso);
    }

    actualizarProgreso();
}


function actualizarProgreso() {
    const progreso = obtenerProgreso();

    const texto = document.getElementById("textoProgreso");
    const barra = document.getElementById("barraProgreso");

    const total = conceptos.length;
    const aprendidos = progreso.length;

    const porcentaje = total === 0
        ? 0
        : Math.round((aprendidos / total) * 100);

    if (texto) {
        texto.textContent =
            `${aprendidos} de ${total} conceptos aprendidos (${porcentaje}%)`;
    }

    if (barra) {
        barra.style.width = `${porcentaje}%`;
        barra.setAttribute("aria-valuenow", porcentaje);
    }
}


/* ==================== MODO OSCURO ==================== */

function alternarModo() {
    const activado =
        document.body.classList.toggle("oscuro");

    localStorage.setItem(
        "luAlexModoOscuro",
        activado ? "true" : "false"
    );

    actualizarBotonModo();
}


function actualizarBotonModo() {
    const boton = document.getElementById("modoOscuro");

    if (!boton) {
        return;
    }

    const activado =
        document.body.classList.contains("oscuro");

    boton.textContent = activado
        ? "☀️ Modo claro"
        : "🌙 Modo oscuro";
}


function cargarModoOscuro() {
    const guardado =
        localStorage.getItem("luAlexModoOscuro");

    if (guardado === "true") {
        document.body.classList.add("oscuro");
    }

    actualizarBotonModo();
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
    const datos = respuestasEjercicios[id];

    if (!datos) {
        console.warn("No existe una respuesta para:", id);
        return;
    }

    const contenedor = document.getElementById(id);

    if (!contenedor) {
        console.warn("No existe el elemento:", id);
        return;
    }

    const visible =
        contenedor.style.display === "block";

    if (visible) {
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

    const a = Number(valorA.value);
    const b = Number(valorB.value);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        salida.textContent =
            "Los valores deben ser números.";
        return;
    }

    let resultado;

    switch (operacion.value) {

        case "suma":
            resultado = a + b;
            break;

        case "resta":
            resultado = a - b;
            break;

        case "multiplicacion":
            resultado = a * b;
            break;

        case "division":
            if (b === 0) {
                salida.textContent =
                    "No se puede dividir entre cero.";
                return;
            }

            resultado = a / b;
            break;

        case "mayor":
            resultado = a > b
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
        <div class="quiz-progreso">
            Pregunta ${preguntaActual + 1}
            de ${preguntasQuiz.length}
        </div>

        <h3>${escapeHTML(pregunta.pregunta)}</h3>

        <div class="quiz-opciones">
    `;

    pregunta.opciones.forEach(function(opcion, indice) {

        html += `
            <button
                class="opcion-quiz"
                onclick="responderQuiz(${indice})"
            >
                ${escapeHTML(opcion)}
            </button>
        `;
    });

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
        contenedor.querySelectorAll(".opcion-quiz");

    botones.forEach(function(boton) {
        boton.disabled = true;
    });

    botones.forEach(function(boton, posicion) {

        if (posicion === pregunta.correcta) {
            boton.classList.add("respuesta-correcta");
        }

        if (
            posicion === indice &&
            posicion !== pregunta.correcta
        ) {
            boton.classList.add("respuesta-incorrecta");
        }
    });

    const explicacion =
        document.createElement("div");

    explicacion.className = "explicacion-quiz";

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
            class="boton-quiz-siguiente"
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

    respuestasQuiz.forEach(function(respuesta) {
        if (respuesta.correcta) {
            puntos++;
        }
    });

    const total = preguntasQuiz.length;

    const porcentaje =
        total === 0
            ? 0
            : Math.round((puntos / total) * 100);

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
            "Todavía hay cosas por reforzar, pero para eso está LuaLex.";
    }

    contenedor.innerHTML = `
        <div class="resultado-quiz">

            <h2>Resultado</h2>

            <div class="puntuacion-quiz">
                ${puntos} / ${total}
            </div>

            <p>
                ${porcentaje}% de respuestas correctas.
            </p>

            <p>
                ${escapeHTML(mensaje)}
            </p>

            <button
                class="boton-quiz-reiniciar"
                onclick="iniciarQuiz()"
            >
                Repetir quiz
            </button>

        </div>
    `;
}


/* ==================== INICIO ==================== */

document.addEventListener("DOMContentLoaded", function() {

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

});
