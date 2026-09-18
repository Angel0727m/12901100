/* =========================================================
   LUADRIX - SCRIPT INTERACTIVO TOTALMENTE ACTUALIZADO
   ========================================================= */

const SUPABASE_URL = "https://supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Un40MYviqC42PUNTz9yxEQ_l24N2non";
let supabaseClient = null;

if (window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

// CONFIGURACIÓN ACTUALIZADA (SISTEMA ESTRICTO DE 3 LLAVES)
const MAX_LLAVES = 3;
const LLAVE_REGEN_MS = 30 * 60 * 1000;
const XP_POR_LECCION = 50;
const XP_POR_RETO = 25;
const MONEDAS_POR_LECCION = 10;
const MONEDAS_POR_RETO = 5;

/* BASE DE DATOS DE NIVELES CON PREGUNTAS MEJORADAS */
const niveles = [
    {
        id: 1,
        nombre: "Recién empezando",
        descripcion: "Los fundamentos de Lua",
        lecciones: [
            {
                id: "1-1",
                titulo: "Tu primer print()",
                concepto: "print",
                teoria: `<h3>Mostrar información</h3><p>Usa <code>print()</code> para mostrar texto en pantalla entre comillas.</p><pre class="example-code">print("Hola, mundo")</pre>`,
                preguntas: [
                    { pregunta: "¿Qué función muestra algo en pantalla?", opciones: ["show()", "print()", "display()"], correcta: 1 },
                    { pregunta: "¿Cuál está escrito de forma correcta?", opciones: ["print Hola", "print(\"Hola\")", "print[Hola]"], correcta: 1 }
                ],
                reto: "Escribe un código que muestre el texto Hola Lua.",
                validacion: ["print", "Hola Lua"]
            },
            {
                id: "1-2",
                titulo: "Variables",
                concepto: "variables",
                teoria: `<h3>Guardar información</h3><p>Usa <code>local</code> para crear variables y guardar datos.</p><pre class="example-code">local nombre = "Angel"</pre>`,
                preguntas: [
                    { pregunta: "¿Qué palabra crea una variable local?", opciones: ["var", "let", "local"], correcta: 2 },
                    { pregunta: "¿Qué símbolo asigna un valor?", opciones: ["==", "=", ":="], correcta: 1 }
                ],
                reto: "Crea una variable local llamada nombre con el valor Angel.",
                validacion: ["local", "nombre", "=", "Angel"]
            }
        ]
    }
];

let estado = cargarEstado();

function estadoInicial() {
    return {
        nombre: "Invitado",
        username: "",
        xp: 0,
        monedas: 50,
        llaves: MAX_LLAVES,
        ultimaRecarga: Date.now(),
        racha: 0,
        ultimoDia: null,
        protectores: 2,
        leccionesCompletadas: [],
        conceptosAprendidos: {},
        logros: [],
        encuestaTerminada: false,
        diagnosticoTerminado: false,
        temaEquipado: "normal",
        temasComprados: ["normal"],
        cuenta: false
    };
}

function cargarEstado() {
    const guardado = localStorage.getItem("luaDrixEstado");
    if (!guardado) return estadoInicial();
    try {
        const viejo = JSON.parse(guardado);
        return { ...estadoInicial(), ...viejo, llaves: Math.min(MAX_LLAVES, Number(viejo.llaves ?? MAX_LLAVES)) };
    } catch {
        return estadoInicial();
    }
}

function guardarEstado() {
    localStorage.setItem("luaDrixEstado", JSON.stringify(estado));
}

function obtenerNivel() { return Math.floor(estado.xp / 100) + 1; }

function actualizarTodo() {
    const nivel = obtenerNivel();
    document.querySelectorAll("#nivelTop, #nivelInicio, #profileLevel").forEach(el => el.textContent = nivel);
    document.querySelectorAll("#monedasTop, #monedasInicio, #profileCoins, #shopCoins").forEach(el => el.textContent = estado.monedas);
    document.querySelectorAll("#rachaTop, #rachaInicio, #profileStreak").forEach(el => el.textContent = estado.racha);
    document.querySelectorAll("#bateriaTop, #bateriaInicio").forEach(el => el.textContent = estado.llaves);
    
    const recarga = document.getElementById("recargaTexto");
    if (recarga) {
        if (estado.llaves >= MAX_LLAVES) recarga.textContent = "Llaves completas";
        else recarga.textContent = "+1 llave en camino";
    }

    document.getElementById("profileName").textContent = estado.nombre;
    actualizarEstadoCuenta();
    renderizarNiveles();
}

function gastarLlave(cantidad = 1) {
    if (estado.llaves < cantidad) {
        mostrarToast("❌ ¡No tienes llaves suficientes! Espera a que se recarguen.");
        return false;
    }
    estado.llaves -= cantidad;
    if (estado.llaves < MAX_LLAVES) estado.ultimaRecarga = Date.now();
    guardarEstado();
    actualizarTodo();
    return true;
}

/* SISTEMA MULTITEMA ADQUIRIDO (COMPRAR E INVENTARIO EQUIPABLE) */
window.comprarOEquiparTema = function(tema, precio) {
    if (estado.temasComprados.includes(tema)) {
        estado.temaEquipado = tema;
        aplicarTemaVisual();
        guardarEstado();
        actualizarTodo();
        mostrarToast(`🎨 Tema ${tema} equipado correctamente.`);
        return;
    }

    if (estado.monedas < precio) {
        mostrarToast("🪙 No tienes suficientes monedas.");
        return;
    }

    estado.monedas -= precio;
    estado.temasComprados.push(tema);
    estado.temaEquipado = tema;
    aplicarTemaVisual();
    guardarEstado();
    actualizarTodo();
    mostrarToast(`🎉 ¡Tema ${tema} comprado y equipado!`);
};

function aplicarTemaVisual() {
    document.body.classList.remove("blue-theme", "emerald-theme", "cyberpunk-theme", "amber-theme", "rubi-theme");
    if (estado.temaEquipado !== "normal") {
        document.body.classList.add(`${estado.temaEquipado}-theme`);
    }
}

window.mostrarPagina = function(id) {
    document.querySelectorAll(".pagina").forEach(p => p.classList.remove("activa"));
    const pagina = document.getElementById(id);
    if (pagina) pagina.classList.add("activa");
};

function renderizarNiveles() {
    const container = document.getElementById("levelsContainer");
    if (!container) return;
    container.innerHTML = "";

    niveles.forEach((nivel) => {
        const bloque = document.createElement("div");
        bloque.className = "level-block";
        bloque.innerHTML = `<div class="level-title"><h3>⭐ Nivel ${nivel.id}: ${nivel.nombre}</h3></div>`;
        
        const lista = document.createElement("div");
        lista.className = "lesson-list";

        nivel.lecciones.forEach((leccion, idx) => {
            const boton = document.createElement("button");
            boton.className = "lesson-item";
            boton.innerHTML = `<div class="lesson-number">${idx + 1}</div><div class="lesson-info"><strong>${leccion.titulo}</strong></div>`;
            boton.onclick = () => abrirLeccion(leccion);
            lista.appendChild(boton);
        });

        bloque.appendChild(lista);
        container.appendChild(bloque);
    });
}

let leccionActual = null;
let preguntaIdx = 0;

function abrirLeccion(leccion) {
    leccionActual = leccion;
    preguntaIdx = 0;
    mostrarPagina("leccion");
    document.getElementById("lessonTitle").textContent = leccion.titulo;
    renderizarPregunta();
}

function renderizarPregunta() {
    const container = document.getElementById("lessonContent");
    const preguntas = leccionActual.preguntas;

    if (preguntaIdx < preguntas.length) {
        const q = preguntas[preguntaIdx];
        container.innerHTML = `
            <div class="lesson-card">
                <h3>${q.pregunta}</h3>
                <div id="options"></div>
            </div>`;
        
        const optContainer = document.getElementById("options");
        q.opciones.forEach((opt, idx) => {
            const b = document.createElement("button");
            b.className = "question-option";
            b.textContent = opt;
            b.onclick = () => verificarRespuesta(idx, q.correcta);
            optContainer.appendChild(b);
        });
    } else {
        container.innerHTML = `
            <div class="lesson-card">
                <h3>⌨️ Reto de Código</h3>
                <p>${leccionActual.reto}</p>
                <textarea id="challengeEditor" class="challenge-editor" placeholder="Escribe tu código aquí..."></textarea>
                <button class="primary-button" onclick="verificarReto()">Enviar Código</button>
            </div>`;
    }
}

function verificarRespuesta(elegida, correcta) {
    if (elegida === correcta) {
        mostrarToast("✅ ¡Correcto!");
        preguntaIdx++;
        renderizarPregunta();
    } else {
        mostrarToast("❌ Incorrecto.");
        gastarLlave(1);
    }
}

window.verificarReto = function() {
    const code = document.getElementById("challengeEditor").value.toLowerCase();
    const cumple = leccionActual.validacion.every(req => code.includes(req.toLowerCase()));

    if (cumple) {
        estado.xp += XP_POR_LECCION + XP_POR_RETO;
        estado.monedas += MONEDAS_POR_LECCION + MONEDAS_POR_RETO;
        estado.leccionesCompletadas.push(leccionActual.id);
        guardarEstado();
        actualizarTodo();
        mostrarToast(`🎉 ¡Lección completada! +${MONEDAS_POR_LECCION + MONEDAS_POR_RETO} monedas.`);
        mostrarPagina("inicio");
    } else {
        mostrarToast("❌ El código no cumple los requisitos.");
    }
};

function actualizarEstadoCuenta() {
    const status = document.getElementById("accountStatus");
    if (!status) return;
    if (estado.cuenta) {
        status.textContent = `Cuenta activa como @${estado.username}.`;
    } else {
        status.textContent = "Estás jugando como Invitado. Regístrate para conectar con amigos.";
    }
}

function mostrarToast(msg) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarTemaVisual();
    actualizarTodo();
});

