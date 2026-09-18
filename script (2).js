/* =========================================================
   LUADRIX
   Sistema principal de aprendizaje
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
    "https://tiwqgwshekjkojpwnksr.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Un40MYviqC42PUNTz9yxEQ_l24N2non";

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

}


/* =========================================================
   REGRESO DESDE EL ENLACE DE VERIFICACIÓN DE CORREO

   Supabase manda de vuelta a la persona a esta misma página
   con datos extra en la URL (en el "hash" o en los parámetros
   de la URL). Los guardamos apenas carga el archivo, antes de
   que se pierdan o se limpien.
   ========================================================= */

const hashAuth =
    new URLSearchParams(
        window.location.hash.replace("#", "")
    );

const queryAuth =
    new URLSearchParams(
        window.location.search
    );

const errorVerificacion =
    hashAuth.get("error_description") ||
    queryAuth.get("error_description");

const esRegresoDeVerificacion =
    !errorVerificacion &&
    (
        hashAuth.get("type") === "signup" ||
        queryAuth.get("type") === "signup" ||
        queryAuth.has("code")
    );


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const MAX_LLAVES = 3;

const LLAVE_REGEN_MS =
    30 * 60 * 1000;

const XP_POR_LECCION = 50;

const XP_POR_RETO = 25;

const MONEDAS_POR_LECCION = 10;

const MONEDAS_POR_RETO = 5;


/* =========================================================
   DATOS DE NIVELES
   ========================================================= */

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

                teoria: `
                    <h3>Mostrar información</h3>

                    <p>
                        Una de las primeras cosas que puedes hacer
                        en Lua es mostrar información usando
                        <code>print()</code>.
                    </p>

                    <pre class="example-code">print("Hola, mundo")</pre>

                    <p>
                        El texto que quieras mostrar se coloca entre
                        comillas y dentro de los paréntesis.
                    </p>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función utilizamos para mostrar algo en pantalla?",

                        opciones: [
                            "show()",
                            "print()",
                            "display()",
                            "writeScreen()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué muestra este código?\n\nprint(\"Hola Lua\")",

                        opciones: [
                            "El texto Hola Lua",
                            "Un número",
                            "Un error",
                            "Nada"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Cuál está escrito correctamente?",

                        opciones: [
                            "print Hola",
                            "print(\"Hola\")",
                            "print[Hola]",
                            "print = Hola"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué representan las comillas en print(\"Hola\")?",

                        opciones: [
                            "Un string",
                            "Una variable",
                            "Una función",
                            "Un bucle"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Escribe un código que muestre el texto Hola Lua.",

                validacion: [
                    "print",
                    "Hola Lua"
                ]
            },


            {
                id: "1-2",

                titulo: "Variables",

                concepto: "variables",

                teoria: `
                    <h3>Guardar información</h3>

                    <p>
                        Una variable sirve para guardar un valor.
                    </p>

                    <pre class="example-code">local nombre = "Angel"</pre>

                    <p>
                        <code>local</code> crea una variable local
                        y <code>=</code> le asigna un valor.
                    </p>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué palabra utilizamos normalmente para crear una variable local?",

                        opciones: [
                            "var",
                            "let",
                            "local",
                            "variable"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Qué guarda nombre en este ejemplo?\n\nlocal nombre = \"Angel\"",

                        opciones: [
                            "El texto Angel",
                            "Una función",
                            "Un número",
                            "Nada"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué símbolo asigna un valor?",

                        opciones: [
                            "==",
                            "=",
                            ":=",
                            "=>"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Cuál crea correctamente una variable?",

                        opciones: [
                            "local edad = 13",
                            "variable edad 13",
                            "let edad = 13",
                            "new edad = 13"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea una variable local llamada nombre con el valor Angel.",

                validacion: [
                    "local",
                    "nombre",
                    "=",
                    "Angel"
                ]
            },


            {
                id: "1-3",

                titulo: "Tipos de datos",

                concepto: "tipos",

                teoria: `
                    <h3>Los tipos de datos</h3>

                    <p>
                        Lua tiene distintos tipos de valores.
                    </p>

                    <ul>
                        <li>string → texto</li>
                        <li>number → números</li>
                        <li>boolean → true o false</li>
                        <li>nil → ausencia de valor</li>
                        <li>table → tablas</li>
                    </ul>

                    <pre class="example-code">local edad = 13
local nombre = "Angel"
local activo = true</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Cuál de estos es un valor booleano?",

                        opciones: [
                            "Hola",
                            "25",
                            "true",
                            "nil"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Qué tipo representa texto?",

                        opciones: [
                            "number",
                            "string",
                            "boolean",
                            "nil"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué valor representa ausencia de valor?",

                        opciones: [
                            "empty",
                            "none",
                            "nil",
                            "void"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Qué tipo representa 25?",

                        opciones: [
                            "string",
                            "boolean",
                            "number",
                            "table"
                        ],

                        correcta: 2
                    }

                ],

                reto:
                    "Crea una variable local llamada activo y asígnale true.",

                validacion: [
                    "local",
                    "activo",
                    "=",
                    "true"
                ]
            },


            {
                id: "1-4",

                titulo: "Operadores básicos",

                concepto: "operadores",

                teoria: `
                    <h3>Operaciones</h3>

                    <p>
                        Lua permite realizar operaciones matemáticas
                        utilizando operadores.
                    </p>

                    <pre class="example-code">local resultado = 10 + 5
print(resultado)</pre>

                    <p>
                        Algunos operadores son +, -, *, / y %.
                    </p>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué operador utilizamos para multiplicar?",

                        opciones: [
                            "x",
                            "*",
                            "%",
                            "#"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué operador representa la división?",

                        opciones: [
                            "/",
                            ":",
                            "//",
                            "\\"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué resultado produce 5 + 4?",

                        opciones: [
                            "1",
                            "9",
                            "20",
                            "54"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué operador calcula el resto de una división?",

                        opciones: [
                            "%",
                            "&",
                            "#",
                            "$"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea una variable resultado que contenga 5 multiplicado por 4.",

                validacion: [
                    "local",
                    "resultado",
                    "=",
                    "5",
                    "*",
                    "4"
                ]
            }

        ]
    },


    {
        id: 2,

        nombre: "Tomando el control",

        descripcion: "Condiciones y repetición",

        lecciones: [

            {
                id: "2-1",

                titulo: "Condicionales if",

                concepto: "if",

                teoria: `
                    <h3>Tomar decisiones</h3>

                    <p>
                        <code>if</code> permite ejecutar código
                        solamente cuando una condición es verdadera.
                    </p>

                    <pre class="example-code">if edad >= 18 then
    print("Adulto")
end</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué palabra inicia un condicional?",

                        opciones: [
                            "if",
                            "when",
                            "check",
                            "condition"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué palabra termina un bloque if?",

                        opciones: [
                            "finish",
                            "stop",
                            "end",
                            "endif"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Qué palabra aparece después de la condición?",

                        opciones: [
                            "then",
                            "do",
                            "next",
                            "start"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué ocurre si la condición de un if es verdadera?",

                        opciones: [
                            "Se ejecuta su bloque",
                            "El programa se detiene",
                            "Se crea una tabla",
                            "Se repite automáticamente"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea un if que compruebe si edad es mayor que 10.",

                validacion: [
                    "if",
                    "edad",
                    ">",
                    "10",
                    "then",
                    "end"
                ]
            },


            {
                id: "2-2",

                titulo: "else y elseif",

                concepto: "else",

                teoria: `
                    <h3>Más de una posibilidad</h3>

                    <p>
                        <code>else</code> permite ejecutar otro bloque
                        cuando la condición principal no se cumple.
                    </p>

                    <pre class="example-code">if edad >= 18 then
    print("Adulto")
else
    print("Menor")
end</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué ocurre con el bloque else?",

                        opciones: [
                            "Siempre se ejecuta",
                            "Se ejecuta si el if no se cumple",
                            "Crea una variable",
                            "Repite el código"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué palabra representa una alternativa?",

                        opciones: [
                            "else",
                            "other",
                            "alternative",
                            "otherwise"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Cuál estructura es correcta?",

                        opciones: [
                            "if x then else end",
                            "if x else then end",
                            "if x then else end",
                            "if x do else finish"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué permite elseif?",

                        opciones: [
                            "Comprobar otra condición",
                            "Crear una tabla",
                            "Repetir siempre",
                            "Cerrar el programa"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Escribe un if con una condición y un bloque else.",

                validacion: [
                    "if",
                    "then",
                    "else",
                    "end"
                ]
            },


            {
                id: "2-3",

                titulo: "Bucle while",

                concepto: "while",

                teoria: `
                    <h3>Repetir mientras</h3>

                    <p>
                        Un <code>while</code> repite código mientras
                        una condición sea verdadera.
                    </p>

                    <pre class="example-code">local numero = 1

while numero <= 5 do
    print(numero)
    numero = numero + 1
end</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué palabra crea este tipo de bucle?",

                        opciones: [
                            "repeat",
                            "while",
                            "loop",
                            "again"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Cuándo continúa un while?",

                        opciones: [
                            "Mientras su condición sea verdadera",
                            "Solo una vez",
                            "Cuando es falsa",
                            "Nunca"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué palabra aparece después de la condición?",

                        opciones: [
                            "then",
                            "do",
                            "go",
                            "start"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué palabra termina el while?",

                        opciones: [
                            "end",
                            "stop",
                            "done",
                            "until"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea un while que compruebe si numero es menor que 5.",

                validacion: [
                    "while",
                    "numero",
                    "<",
                    "5",
                    "do",
                    "end"
                ]
            },


            {
                id: "2-4",

                titulo: "Bucle for",

                concepto: "for",

                teoria: `
                    <h3>Contar repeticiones</h3>

                    <pre class="example-code">for i = 1, 5 do
    print(i)
end</pre>

                    <p>
                        Este código ejecuta el bloque varias veces,
                        cambiando el valor de <code>i</code>.
                    </p>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué variable suele utilizarse como contador?",

                        opciones: [
                            "i",
                            "counterOnly",
                            "numberLoop",
                            "forValue"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué palabra crea el bucle?",

                        opciones: [
                            "for",
                            "repeat",
                            "count",
                            "each"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué representa el 1 en for i = 1, 5 do?",

                        opciones: [
                            "El inicio",
                            "El final",
                            "La cantidad de errores",
                            "El resultado"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué representa el 5?",

                        opciones: [
                            "El inicio",
                            "El límite final",
                            "El nombre de la variable",
                            "El operador"
                        ],

                        correcta: 1
                    }

                ],

                reto:
                    "Crea un for que vaya del 1 al 5.",

                validacion: [
                    "for",
                    "i",
                    "=",
                    "1",
                    "5",
                    "do",
                    "end"
                ]
            }

        ]
    },


    {
        id: 3,

        nombre: "Subiendo de nivel",

        descripcion: "Funciones, tablas y strings",

        lecciones: [

            {
                id: "3-1",

                titulo: "Funciones",

                concepto: "funciones",

                teoria: `
                    <h3>Crear funciones</h3>

                    <p>
                        Las funciones permiten guardar instrucciones
                        para reutilizarlas.
                    </p>

                    <pre class="example-code">function saludar()
    print("Hola")
end

saludar()</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué palabra utilizamos para declarar una función?",

                        opciones: [
                            "function",
                            "func",
                            "define",
                            "method"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué palabra termina la función?",

                        opciones: [
                            "stop",
                            "end",
                            "finish",
                            "close"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Cómo llamamos a saludar?",

                        opciones: [
                            "run saludar",
                            "saludar()",
                            "call saludar",
                            "execute saludar"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Para qué sirven las funciones?",

                        opciones: [
                            "Reutilizar instrucciones",
                            "Solo crear números",
                            "Solo crear tablas",
                            "Cerrar bucles"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea una función llamada saludar que imprima Hola.",

                validacion: [
                    "function",
                    "saludar",
                    "print",
                    "Hola",
                    "end"
                ]
            },


            {
                id: "3-2",

                titulo: "Parámetros y return",

                concepto: "return",

                teoria: `
                    <h3>Funciones con información</h3>

                    <pre class="example-code">function sumar(a, b)
    return a + b
end

local resultado = sumar(5, 3)</pre>

                    <p>
                        Los parámetros reciben información y
                        <code>return</code> devuelve un resultado.
                    </p>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué palabra devuelve un resultado?",

                        opciones: [
                            "send",
                            "return",
                            "give",
                            "output"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué son a y b en sumar(a, b)?",

                        opciones: [
                            "Parámetros",
                            "Tablas",
                            "Bucles",
                            "Strings"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué devuelve return a + b?",

                        opciones: [
                            "La suma",
                            "El nombre",
                            "La función completa",
                            "Nada siempre"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué permite un parámetro?",

                        opciones: [
                            "Recibir información",
                            "Cerrar una función",
                            "Crear un comentario",
                            "Detener Lua"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea una función sumar que reciba a y b y devuelva a + b.",

                validacion: [
                    "function",
                    "sumar",
                    "a",
                    "b",
                    "return",
                    "a",
                    "+",
                    "b",
                    "end"
                ]
            },


            {
                id: "3-3",

                titulo: "Tablas",

                concepto: "tablas",

                teoria: `
                    <h3>Las tablas de Lua</h3>

                    <p>
                        Las tablas son una de las estructuras más
                        importantes de Lua.
                    </p>

                    <pre class="example-code">local frutas = {
    "manzana",
    "pera",
    "banana"
}

print(frutas[1])</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué estructura utiliza Lua para almacenar colecciones?",

                        opciones: [
                            "arrays solamente",
                            "tables",
                            "lists",
                            "objects"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Con qué símbolo comienza una tabla?",

                        opciones: [
                            "[",
                            "{",
                            "<",
                            "("
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué posición ocupa normalmente el primer elemento?",

                        opciones: [
                            "0",
                            "1",
                            "-1",
                            "10"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué contiene frutas[1] en el ejemplo?",

                        opciones: [
                            "manzana",
                            "pera",
                            "banana",
                            "nada"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea una tabla llamada frutas con al menos una fruta.",

                validacion: [
                    "local",
                    "frutas",
                    "=",
                    "{"
                ]
            },


            {
                id: "3-4",

                titulo: "Strings",

                concepto: "strings",

                teoria: `
                    <h3>Trabajar con texto</h3>

                    <p>
                        Los strings representan texto.
                        Lua proporciona muchas funciones para trabajar
                        con ellos.
                    </p>

                    <pre class="example-code">local texto = "Hola Lua"

print(string.len(texto))
print(string.find(texto, "Lua"))</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué biblioteca de Lua contiene funciones para strings?",

                        opciones: [
                            "text",
                            "string",
                            "words",
                            "char"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué función puede buscar texto?",

                        opciones: [
                            "string.find()",
                            "string.searchText()",
                            "find.string()",
                            "text.find()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué función obtiene la longitud de un string?",

                        opciones: [
                            "string.len()",
                            "string.size()",
                            "string.length()",
                            "len.string()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué tipo de dato representa \"Hola Lua\"?",

                        opciones: [
                            "number",
                            "boolean",
                            "string",
                            "table"
                        ],

                        correcta: 2
                    }

                ],

                reto:
                    "Usa string.find para buscar Lua dentro de un texto.",

                validacion: [
                    "string.find",
                    "Lua"
                ]
            }

        ]
    },


    {
        id: 4,

        nombre: "Programador en progreso",

        descripcion: "Bibliotecas y programación más elaborada",

        lecciones: [

            {
                id: "4-1",

                titulo: "Biblioteca string",

                concepto: "stringlib",

                teoria: `
                    <h3>Funciones de strings</h3>

                    <p>
                        La biblioteca string permite buscar,
                        transformar y analizar texto.
                    </p>

                    <pre class="example-code">local texto = "LuaDrix"

print(string.upper(texto))
print(string.lower(texto))</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función convierte un string a mayúsculas?",

                        opciones: [
                            "string.big()",
                            "string.upper()",
                            "string.capital()",
                            "string.max()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué función convierte un string a minúsculas?",

                        opciones: [
                            "string.small()",
                            "string.lower()",
                            "string.down()",
                            "string.tolowercase()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué biblioteca estás utilizando?",

                        opciones: [
                            "table",
                            "math",
                            "string",
                            "io"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Qué hace string.upper(\"lua\")?",

                        opciones: [
                            "Convierte a mayúsculas",
                            "Busca lua",
                            "Elimina lua",
                            "Cuenta caracteres"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Usa string.upper con un texto.",

                validacion: [
                    "string.upper"
                ]
            },


            {
                id: "4-2",

                titulo: "Biblioteca table",

                concepto: "tablelib",

                teoria: `
                    <h3>Manipular tablas</h3>

                    <pre class="example-code">local frutas = {
    "manzana",
    "pera"
}

table.insert(frutas, "banana")</pre>

                    <p>
                        Las funciones de table permiten modificar
                        y consultar tablas.
                    </p>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función sirve para insertar un elemento?",

                        opciones: [
                            "table.add()",
                            "table.insert()",
                            "table.push()",
                            "table.put()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué biblioteca utilizamos?",

                        opciones: [
                            "string",
                            "table",
                            "list",
                            "array"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué función elimina normalmente un elemento?",

                        opciones: [
                            "table.delete()",
                            "table.remove()",
                            "table.erase()",
                            "table.destroy()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué hace table.insert?",

                        opciones: [
                            "Agrega un elemento",
                            "Cierra una tabla",
                            "Convierte texto",
                            "Crea un bucle"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Usa table.insert para agregar un valor a una tabla.",

                validacion: [
                    "table.insert"
                ]
            },


            {
                id: "4-3",

                titulo: "Módulos",

                concepto: "modulos",

                teoria: `
                    <h3>Separar programas</h3>

                    <p>
                        Lua permite dividir código en módulos y utilizar
                        <code>require()</code> para cargarlos.
                    </p>

                    <pre class="example-code">local modulo = require("miModulo")</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función se utiliza normalmente para cargar un módulo?",

                        opciones: [
                            "load()",
                            "require()",
                            "module()",
                            "import()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué permite un módulo?",

                        opciones: [
                            "Separar código",
                            "Solo hacer números",
                            "Solo imprimir",
                            "Eliminar variables"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Cuál es una llamada válida?",

                        opciones: [
                            "require(\"miModulo\")",
                            "import Lua",
                            "load module",
                            "module.require"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué palabra aparece en require(\"miModulo\")?",

                        opciones: [
                            "load",
                            "require",
                            "include",
                            "use"
                        ],

                        correcta: 1
                    }

                ],

                reto:
                    "Escribe una línea que utilice require.",

                validacion: [
                    "require"
                ]
            },


            {
                id: "4-4",

                titulo: "Errores",

                concepto: "errores",

                teoria: `
                    <h3>Cuando algo sale mal</h3>

                    <p>
                        Los programas pueden producir errores.
                        Lua ofrece mecanismos como <code>pcall()</code>
                        para ejecutar código protegido.
                    </p>

                    <pre class="example-code">local ok, resultado = pcall(function()
    return 10
end)</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Para qué sirve pcall?",

                        opciones: [
                            "Para crear tablas",
                            "Para ejecutar código protegido contra errores",
                            "Para hacer bucles",
                            "Para imprimir texto"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué biblioteca especial necesita pcall?",

                        opciones: [
                            "No necesita una biblioteca",
                            "table",
                            "errorlib",
                            "safe"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué puede devolver pcall?",

                        opciones: [
                            "Un estado de éxito y resultados",
                            "Solo texto",
                            "Solo una tabla",
                            "Siempre nil"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué intenta evitar pcall?",

                        opciones: [
                            "Que un error detenga directamente la ejecución protegida",
                            "Que existan variables",
                            "Que haya funciones",
                            "Que existan strings"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Escribe una llamada a pcall.",

                validacion: [
                    "pcall"
                ]
            }

        ]
    },


    {
        id: 5,

        nombre: "Programador intermedio",

        descripcion: "Archivos, matemáticas y control avanzado",

        lecciones: [

            {
                id: "5-1",

                titulo: "Biblioteca math",

                concepto: "math",

                teoria: `
                    <h3>Matemáticas</h3>

                    <p>
                        La biblioteca math contiene funciones matemáticas.
                    </p>

                    <pre class="example-code">print(math.floor(4.8))
print(math.ceil(4.2))
print(math.abs(-10))</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué biblioteca contiene funciones matemáticas?",

                        opciones: [
                            "number",
                            "math",
                            "calc",
                            "numeric"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué hace math.floor()?",

                        opciones: [
                            "Redondea hacia abajo",
                            "Redondea hacia arriba",
                            "Convierte a string",
                            "Calcula una tabla"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué hace math.ceil()?",

                        opciones: [
                            "Redondea hacia abajo",
                            "Redondea hacia arriba",
                            "Elimina decimales sin redondear",
                            "Busca texto"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué función obtiene el valor absoluto?",

                        opciones: [
                            "math.abs()",
                            "math.absolute()",
                            "math.positive()",
                            "math.value()"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Usa math.floor con un número decimal.",

                validacion: [
                    "math.floor"
                ]
            },


            {
                id: "5-2",

                titulo: "Archivos",

                concepto: "io",

                teoria: `
                    <h3>Entrada y salida</h3>

                    <p>
                        La biblioteca io permite trabajar con entrada,
                        salida y archivos.
                    </p>

                    <pre class="example-code">local archivo = io.open("datos.txt", "r")</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué biblioteca está relacionada con entrada y salida?",

                        opciones: [
                            "io",
                            "input",
                            "file",
                            "stream"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué función abre un archivo?",

                        opciones: [
                            "io.open()",
                            "io.file()",
                            "file.open()",
                            "open.io()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué representa \"r\" normalmente?",

                        opciones: [
                            "Lectura",
                            "Borrado",
                            "Ejecución",
                            "Repetición"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué biblioteca usamos con io.open?",

                        opciones: [
                            "math",
                            "io",
                            "table",
                            "string"
                        ],

                        correcta: 1
                    }

                ],

                reto:
                    "Escribe una llamada a io.open.",

                validacion: [
                    "io.open"
                ]
            },


            {
                id: "5-3",

                titulo: "Metatables",

                concepto: "metatables",

                teoria: `
                    <h3>Modificar el comportamiento de tablas</h3>

                    <p>
                        Las metatables permiten definir comportamientos
                        especiales para tablas.
                    </p>

                    <pre class="example-code">local persona = {}

setmetatable(persona, {})</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función asigna una metatable a una tabla?",

                        opciones: [
                            "setmetatable()",
                            "settable()",
                            "metatable()",
                            "tablemeta()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué estructura suele recibir una metatable?",

                        opciones: [
                            "Una tabla",
                            "Solo un número",
                            "Solo un string",
                            "Un comentario"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Para qué sirven las metatables?",

                        opciones: [
                            "Definir comportamientos especiales",
                            "Solo imprimir",
                            "Solo hacer bucles",
                            "Solo crear strings"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué función obtiene una metatable?",

                        opciones: [
                            "getmetatable()",
                            "readmetatable()",
                            "table.get()",
                            "metatable.get()"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Usa setmetatable con una tabla.",

                validacion: [
                    "setmetatable"
                ]
            },


            {
                id: "5-4",

                titulo: "Metamétodos",

                concepto: "metamethods",

                teoria: `
                    <h3>Operadores personalizados</h3>

                    <p>
                        Los metamétodos permiten cambiar cómo Lua
                        interpreta ciertas operaciones sobre tablas.
                    </p>

                    <pre class="example-code">__add
__sub
__eq
__tostring</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué metamétodo está relacionado con la suma?",

                        opciones: [
                            "__sum",
                            "__plus",
                            "__add",
                            "__math"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Qué metamétodo está relacionado con igualdad?",

                        opciones: [
                            "__same",
                            "__eq",
                            "__equal",
                            "__equals"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué metamétodo está relacionado con convertir a texto?",

                        opciones: [
                            "__text",
                            "__string",
                            "__tostring",
                            "__convert"
                        ],

                        correcta: 2
                    },

                    {
                        pregunta:
                            "¿Con qué operador se relaciona __sub?",

                        opciones: [
                            "+",
                            "-",
                            "*",
                            "/"
                        ],

                        correcta: 1
                    }

                ],

                reto:
                    "Escribe el nombre del metamétodo utilizado para la suma.",

                validacion: [
                    "__add"
                ]
            }

        ]
    },


    {
        id: 6,

        nombre: "Programador avanzado",

        descripcion: "Coroutines y conceptos avanzados",

        lecciones: [

            {
                id: "6-1",

                titulo: "Coroutines",

                concepto: "coroutines",

                teoria: `
                    <h3>Coroutines</h3>

                    <p>
                        Las coroutines permiten crear tareas que pueden
                        suspenderse y continuar posteriormente.
                    </p>

                    <pre class="example-code">local co = coroutine.create(function()
    print("Hola")
end)

coroutine.resume(co)</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué biblioteca contiene las coroutines?",

                        opciones: [
                            "coroutine",
                            "thread",
                            "task",
                            "process"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué función crea una coroutine?",

                        opciones: [
                            "coroutine.create()",
                            "coroutine.new()",
                            "create.coroutine()",
                            "thread.create()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué función continúa una coroutine?",

                        opciones: [
                            "coroutine.resume()",
                            "coroutine.start()",
                            "coroutine.continue()",
                            "coroutine.run()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué ventaja tienen las coroutines?",

                        opciones: [
                            "Pueden suspenderse y continuar",
                            "Eliminan las variables",
                            "Solo sirven para strings",
                            "Reemplazan todas las funciones"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Crea una coroutine y utiliza coroutine.resume.",

                validacion: [
                    "coroutine.create",
                    "coroutine.resume"
                ]
            },


            {
                id: "6-2",

                titulo: "coroutine.yield()",

                concepto: "yield",

                teoria: `
                    <h3>Pausar una coroutine</h3>

                    <p>
                        <code>coroutine.yield()</code> permite suspender
                        temporalmente una coroutine.
                    </p>

                    <pre class="example-code">local co = coroutine.create(function()
    print("Antes")
    coroutine.yield()
    print("Después")
end)</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función pausa una coroutine?",

                        opciones: [
                            "coroutine.pause()",
                            "coroutine.yield()",
                            "coroutine.stop()",
                            "coroutine.wait()"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿En qué biblioteca está yield?",

                        opciones: [
                            "task",
                            "coroutine",
                            "pause",
                            "thread"
                        ],

                        correcta: 1
                    },

                    {
                        pregunta:
                            "¿Qué puede ocurrir después de yield?",

                        opciones: [
                            "La coroutine puede continuar posteriormente",
                            "Lua se desinstala",
                            "Se borra la función",
                            "Se crea automáticamente una tabla"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué concepto representa yield?",

                        opciones: [
                            "Suspensión temporal",
                            "Multiplicación",
                            "Conversión de texto",
                            "Lectura de archivos"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Escribe una llamada a coroutine.yield().",

                validacion: [
                    "coroutine.yield"
                ]
            },


            {
                id: "6-3",

                titulo: "Garbage Collector",

                concepto: "gc",

                teoria: `
                    <h3>Recolector de basura</h3>

                    <p>
                        Lua tiene un recolector de basura que administra
                        memoria de objetos que ya no son necesarios.
                    </p>

                    <pre class="example-code">collectgarbage()</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué función está relacionada con el recolector de basura?",

                        opciones: [
                            "collectgarbage()",
                            "garbage.collect()",
                            "memory.clean()",
                            "gc.clean()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué administra el garbage collector?",

                        opciones: [
                            "Memoria",
                            "Strings únicamente",
                            "Teclado",
                            "Pantalla"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué biblioteca especial necesitas para collectgarbage()?",

                        opciones: [
                            "No necesita una biblioteca",
                            "gc",
                            "memory",
                            "system"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué significa GC?",

                        opciones: [
                            "Garbage Collector",
                            "Game Controller",
                            "Global Code",
                            "General Coroutine"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Escribe una llamada a collectgarbage().",

                validacion: [
                    "collectgarbage"
                ]
            },


            {
                id: "6-4",

                titulo: "Depuración con debug",

                concepto: "debug",

                teoria: `
                    <h3>Depurar programas</h3>

                    <p>
                        La biblioteca <code>debug</code> contiene herramientas
                        útiles para analizar la ejecución de un programa.
                    </p>

                    <pre class="example-code">print(debug.traceback())</pre>
                `,

                preguntas: [

                    {
                        pregunta:
                            "¿Qué biblioteca se utiliza para herramientas de depuración?",

                        opciones: [
                            "debug",
                            "error",
                            "trace",
                            "inspect"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué función construye información de seguimiento?",

                        opciones: [
                            "debug.traceback()",
                            "debug.track()",
                            "debug.follow()",
                            "debug.stacktrace()"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Para qué sirve la depuración?",

                        opciones: [
                            "Ayudar a encontrar problemas",
                            "Crear imágenes",
                            "Eliminar Lua",
                            "Solo crear tablas"
                        ],

                        correcta: 0
                    },

                    {
                        pregunta:
                            "¿Qué palabra aparece en debug.traceback()?",

                        opciones: [
                            "traceback",
                            "track",
                            "error",
                            "follow"
                        ],

                        correcta: 0
                    }

                ],

                reto:
                    "Escribe una llamada a debug.traceback().",

                validacion: [
                    "debug.traceback"
                ]
            }

        ]
    }

];


/* =========================================================
   ESTADO
   ========================================================= */

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

        diagnosticoSkills: {},

        tema: "normal",

        temasComprados: ["normal"],

        cuenta: false,

        compras: [],

        pistaUsadaHoy: false,

        practicaUsadaHoy: false,

        labUsos: 0,

        practicas: 0,

        bibliotecaVisitada: false,

        sugerenciasEnviadas: 0,

        recordatorioVisto: "",

        practicaRondas: 0,

        tutorialVisto: false,

        modoOscuro:
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches

    };

}


function cargarEstado() {

    const guardado =
        localStorage.getItem(
            "luaDrixEstado"
        );


    if (!guardado) {

        return estadoInicial();

    }


    try {

        const viejo =
            JSON.parse(guardado);


        const nuevoEstado = {

            ...estadoInicial(),

            ...viejo,

            llaves:
                Math.min(
                    MAX_LLAVES,
                    Number(viejo.llaves ?? MAX_LLAVES)
                )

        };


        // Compatibilidad: si venía de una partida vieja que ya
        // tenía un tema equipado (antes de existir el inventario),
        // nos aseguramos de que ese tema quede en su inventario.

        if (
            nuevoEstado.tema &&
            !nuevoEstado.temasComprados.includes(nuevoEstado.tema)
        ) {

            nuevoEstado.temasComprados.push(
                nuevoEstado.tema
            );

        }


        return nuevoEstado;

    } catch {

        return estadoInicial();

    }

}


function guardarEstado() {

    localStorage.setItem(
        "luaDrixEstado",
        JSON.stringify(estado)
    );

}


function requiereCuenta() {

    if (estado.cuenta) return true;


    mostrarToast(
        "Regístrate o inicia sesión para usar amigos y guardar tu progreso en la nube."
    );

    mostrarPagina(
        "perfil"
    );

    return false;

}


/* =========================================================
   NIVEL / XP
   ========================================================= */

function obtenerNivel(xp = estado.xp) {

    return Math.floor(xp / 100) + 1;

}


function xpNivelActual() {

    return estado.xp % 100;

}


function tituloNivel(nivel) {

    if (nivel >= 25) return "Maestro de Lua";

    if (nivel >= 20) return "Experto de Lua";

    if (nivel >= 15) return "Programador avanzado";

    if (nivel >= 10) return "Programador experto";

    if (nivel >= 5) return "Programador en progreso";

    return "Recién empezando";

}


function actualizarXP() {

    const nivel =
        obtenerNivel();


    document
        .querySelectorAll(
            "#nivelTop, #nivelInicio, #profileLevel"
        )
        .forEach(
            el => el.textContent = nivel
        );


    document.getElementById(
        "tituloNivelInicio"
    ).textContent =
        tituloNivel(nivel);


    document.getElementById(
        "profileTitle"
    ).textContent =
        tituloNivel(nivel);


    document.getElementById(
        "profileXP"
    ).textContent =
        estado.xp;


    const actual =
        xpNivelActual();


    document.getElementById(
        "xpTextoInicio"
    ).textContent =
        `${actual} / 100 EXP`;


    document.getElementById(
        "profileXPText"
    ).textContent =
        `${actual} / 100 EXP`;


    document.getElementById(
        "profileXPRemaining"
    ).textContent =
        actual === 0
            ? "Te faltan 100 EXP"
            : `Te faltan ${100 - actual} EXP`;


    document.getElementById(
        "xpBarInicio"
    ).style.width =
        `${actual}%`;


    document.getElementById(
        "profileXPBar"
    ).style.width =
        `${actual}%`;

}


/* =========================================================
   LLAVES
   ========================================================= */

function actualizarLlaves() {

    const ahora =
        Date.now();


    if (estado.llaves < MAX_LLAVES) {

        const transcurrido =
            ahora - estado.ultimaRecarga;


        const puntos =
            Math.floor(
                transcurrido /
                LLAVE_REGEN_MS
            );


        if (puntos > 0) {

            estado.llaves =
                Math.min(
                    MAX_LLAVES,
                    estado.llaves + puntos
                );


            estado.ultimaRecarga +=
                puntos * LLAVE_REGEN_MS;


            guardarEstado();

        }

    } else {

        estado.ultimaRecarga =
            ahora;

    }


    document
        .querySelectorAll(
            "#llavesTop, #llavesInicio"
        )
        .forEach(
            el =>
                el.textContent =
                    estado.llaves
        );


    const recarga =
        document.getElementById(
            "recargaTexto"
        );


    if (!recarga) return;


    if (
        estado.llaves >=
        MAX_LLAVES
    ) {

        recarga.textContent =
            "Llaves completas";

    } else {

        const restante =
            LLAVE_REGEN_MS -
            (
                Date.now() -
                estado.ultimaRecarga
            );


        const minutos =
            Math.max(
                0,
                Math.ceil(
                    restante / 60000
                )
            );


        recarga.textContent =
            `+1 llave en ${minutos} min`;

    }

}


function gastarLlaves(cantidad = 1) {

    actualizarLlaves();


    if (
        estado.llaves <
        cantidad
    ) {

        mostrarToast(
            "No te quedan llaves."
        );

        return false;

    }


    estado.llaves -=
        cantidad;


    if (
        estado.llaves <
        MAX_LLAVES
    ) {

        estado.ultimaRecarga =
            Date.now();

    }


    guardarEstado();

    actualizarLlaves();

    return true;

}


/* =========================================================
   MONEDAS
   ========================================================= */

function actualizarMonedas() {

    document
        .querySelectorAll(
            "#monedasTop, #monedasInicio, #profileCoins, #shopCoins"
        )
        .forEach(
            el =>
                el.textContent =
                    estado.monedas
        );

}


/* =========================================================
   RACHA
   ========================================================= */

function fechaLocal() {

    const ahora =
        new Date();


    return [

        ahora.getFullYear(),

        String(
            ahora.getMonth() + 1
        ).padStart(2, "0"),

        String(
            ahora.getDate()
        ).padStart(2, "0")

    ].join("-");

}


function actualizarRacha() {

    const hoy =
        fechaLocal();


    document
        .querySelectorAll(
            "#rachaTop, #rachaInicio, #profileStreak"
        )
        .forEach(
            el =>
                el.textContent =
                    estado.racha
        );


    if (!estado.ultimoDia) return;


    if (
        estado.ultimoDia ===
        hoy
    ) return;


    const ultima =
        new Date(
            estado.ultimoDia +
            "T00:00:00"
        );


    const actual =
        new Date(
            hoy +
            "T00:00:00"
        );


    const diferencia =
        Math.round(
            (actual - ultima) /
            86400000
        );


    if (
        diferencia > 1 &&
        estado.protectores > 0
    ) {

        estado.protectores--;

        estado.ultimoDia =
            hoy;

        mostrarToast(
            "Usaste un protector de racha."
        );

        guardarEstado();

    } else if (
        diferencia > 1
    ) {

        estado.racha = 0;

        guardarEstado();

    }

}


function mostrarTutorialSiHaceFalta() {

    if (estado.tutorialVisto) return;


    const overlay =
        document.getElementById(
            "tutorialOverlay"
        );


    if (!overlay) return;


    overlay.classList.remove(
        "hidden"
    );

}


function cerrarTutorial() {

    estado.tutorialVisto =
        true;


    guardarEstado();


    document
        .getElementById(
            "tutorialOverlay"
        )
        .classList.add(
            "hidden"
        );


    if (
        !estado.encuestaTerminada ||
        !estado.diagnosticoTerminado
    ) {

        iniciarOnboarding();

    }

}


function revisarRachaEnRiesgo() {

    const hoy =
        fechaLocal();


    if (
        estado.racha > 0 &&
        estado.ultimoDia !== hoy &&
        estado.recordatorioVisto !== hoy
    ) {

        mostrarToast(
            `🔥 Llevas ${estado.racha} día(s) de racha. ¡Practica hoy para no perderla!`
        );

        estado.recordatorioVisto =
            hoy;

        guardarEstado();

    }

}


function registrarActividad() {

    const hoy =
        fechaLocal();


    if (
        estado.ultimoDia ===
        hoy
    ) {

        return;

    }


    if (!estado.ultimoDia) {

        estado.racha = 1;

    } else {

        const anterior =
            new Date(
                estado.ultimoDia +
                "T00:00:00"
            );


        const actual =
            new Date(
                hoy +
                "T00:00:00"
            );


        const diferencia =
            Math.round(
                (actual - anterior) /
                86400000
            );


        if (
            diferencia === 1
        ) {

            estado.racha++;

        } else if (
            diferencia > 1
        ) {

            if (
                estado.protectores > 0
            ) {

                estado.protectores--;

                estado.racha++;

                mostrarToast(
                    "Tu protector mantuvo la racha."
                );

            } else {

                estado.racha = 1;

            }

        }

    }


    estado.ultimoDia =
        hoy;


    guardarEstado();

    actualizarRacha();

}


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function mostrarPagina(id) {

    document
        .querySelectorAll(".pagina")
        .forEach(
            pagina =>
                pagina.classList.remove(
                    "activa"
                )
        );


    const pagina =
        document.getElementById(id);


    if (!pagina) return;


    pagina.classList.add("activa");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "niveles")
        renderizarNiveles();


    if (id === "logros")
        renderizarLogros();


    if (id === "biblioteca") {

        estado.bibliotecaVisitada =
            true;

        guardarEstado();

        renderizarBiblioteca();

    }


    if (id === "practica")
        renderizarPractica();


    if (id === "perfil")
        actualizarPerfil();


    if (id === "amigos")
        cargarSocial();


    if (id === "diagnostico")
        actualizarEstadoOnboarding();

}


/* =========================================================
   NIVELES
   ========================================================= */

function nivelDesbloqueado(indice) {

    if (indice === 0)
        return true;


    const anterior =
        niveles[indice - 1];


    return anterior.lecciones.every(
        leccion =>
            estado.leccionesCompletadas.includes(
                leccion.id
            )
    );

}


function leccionDesbloqueada(
    nivelIndex,
    leccionIndex
) {

    if (
        !nivelDesbloqueado(
            nivelIndex
        )
    ) {

        return false;

    }


    if (
        leccionIndex === 0
    ) {

        return true;

    }


    const anterior =
        niveles[
            nivelIndex
        ].lecciones[
            leccionIndex - 1
        ];


    return estado.leccionesCompletadas.includes(
        anterior.id
    );

}


function renderizarNiveles() {

    const container =
        document.getElementById(
            "levelsContainer"
        );


    container.innerHTML = "";


    niveles.forEach(
        (
            nivel,
            nivelIndex
        ) => {

            const desbloqueado =
                nivelDesbloqueado(
                    nivelIndex
                );


            const completadas =
                nivel.lecciones.filter(
                    leccion =>
                        estado.leccionesCompletadas.includes(
                            leccion.id
                        )
                ).length;


            const bloque =
                document.createElement(
                    "div"
                );


            bloque.className =
                "level-block";


            const titulo =
                document.createElement(
                    "div"
                );


            titulo.className =
                "level-title";


            titulo.innerHTML = `

                <div>

                    <h3>
                        ${
                            desbloqueado
                                ? "⭐"
                                : "🔒"
                        }

                        Nivel ${nivel.id}
                    </h3>

                    <p>
                        ${nivel.nombre}
                        ·
                        ${nivel.descripcion}
                    </p>

                </div>

                <div class="level-status">
                    ${completadas}/${nivel.lecciones.length}
                </div>

            `;


            const lista =
                document.createElement(
                    "div"
                );


            lista.className =
                "lesson-list";


            nivel.lecciones.forEach(
                (
                    leccion,
                    leccionIndex
                ) => {

                    const completada =
                        estado.leccionesCompletadas.includes(
                            leccion.id
                        );


                    const disponible =
                        leccionDesbloqueada(
                            nivelIndex,
                            leccionIndex
                        );


                    const boton =
                        document.createElement(
                            "button"
                        );


                    boton.className =
                        "lesson-item" +

                        (
                            completada
                                ? " completed"
                                : ""
                        ) +

                        (
                            !disponible
                                ? " locked"
                                : ""
                        );


                    boton.innerHTML = `

                        <div class="lesson-number">

                            ${
                                completada
                                    ? "✓"
                                    : disponible
                                        ? leccionIndex + 1
                                        : "🔒"
                            }

                        </div>

                        <div class="lesson-info">

                            <strong>
                                ${leccion.titulo}
                            </strong>

                            <small>

                                ${
                                    completada
                                        ? "Completada"
                                        : disponible
                                            ? "Disponible"
                                            : "Bloqueada"
                                }

                            </small>

                        </div>

                    `;


                    if (disponible) {

                        boton.onclick =
                            () =>
                                abrirLeccion(
                                    nivelIndex,
                                    leccionIndex
                                );

                    }


                    lista.appendChild(
                        boton
                    );

                }
            );


            bloque.appendChild(
                titulo
            );


            bloque.appendChild(
                lista
            );


            container.appendChild(
                bloque
            );

        }
    );

}


/* =========================================================
   LECCIONES
   ========================================================= */

let leccionActual = null;

let pasoLeccion = 0;

let preguntaRespondida = false;

let respuestasLeccion = 0;


function obtenerPreguntasLeccion(
    leccion
) {

    if (
        leccion.preguntas &&
        leccion.preguntas.length
    ) {

        return leccion.preguntas;

    }


    return [

        {

            pregunta:
                leccion.pregunta,

            opciones:
                leccion.opciones,

            correcta:
                leccion.correcta

        }

    ];

}


function abrirLeccion(
    nivelIndex,
    leccionIndex
) {

    const leccion =
        niveles[
            nivelIndex
        ].lecciones[
            leccionIndex
        ];


    leccionActual = {

        nivelIndex,

        leccionIndex,

        leccion

    };


    pasoLeccion = 0;

    preguntaRespondida = false;

    respuestasLeccion = 0;


    mostrarPagina(
        "leccion"
    );


    renderizarPasoLeccion();

}


function renderizarPasoLeccion() {

    if (!leccionActual)
        return;


    const leccion =
        leccionActual.leccion;


    const nivel =
        niveles[
            leccionActual.nivelIndex
        ];


    const preguntas =
        obtenerPreguntasLeccion(
            leccion
        );


    const totalPasos =
        preguntas.length + 2;


    document.getElementById(
        "lessonLevel"
    ).textContent =
        `Nivel ${nivel.id} · ${nivel.nombre}`;


    document.getElementById(
        "lessonTitle"
    ).textContent =
        leccion.titulo;


    document.getElementById(
        "lessonProgressBar"
    ).style.width =
        `${((pasoLeccion + 1) / totalPasos) * 100}%`;


    const container =
        document.getElementById(
            "lessonContent"
        );


    /* TEORÍA */

    if (
        pasoLeccion === 0
    ) {

        container.innerHTML = `

            <div class="lesson-card">

                ${leccion.teoria}

                <button
                    class="primary-button"
                    onclick="siguientePaso()"
                >
                    Entendido →
                </button>

            </div>

        `;

        return;

    }


    const indicePregunta =
        pasoLeccion - 1;


    /* PREGUNTAS */

    if (
        indicePregunta >= 0 &&
        indicePregunta < preguntas.length
    ) {

        const pregunta =
            preguntas[
                indicePregunta
            ];


        preguntaRespondida =
            false;


        container.innerHTML = `

            <div class="lesson-card">

                <small>
                    Pregunta
                    ${indicePregunta + 1}
                    de
                    ${preguntas.length}
                </small>

                <h3>
                    Comprueba lo que aprendiste
                </h3>

                <p style="white-space: pre-line;">
                    ${pregunta.pregunta}
                </p>

                <div id="questionOptions"></div>

                <div id="questionFeedback"></div>

            </div>

        `;


        const opciones =
            document.getElementById(
                "questionOptions"
            );


        pregunta.opciones.forEach(
            (
                opcion,
                index
            ) => {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.className =
                    "question-option";


                boton.textContent =
                    opcion;


                boton.onclick =
                    () =>
                        responderPregunta(
                            index
                        );


                opciones.appendChild(
                    boton
                );

            }
        );


        return;

    }


    /* RETO */

    container.innerHTML = `

        <div class="lesson-card">

            <h3>
                ⌨️ Reto de código
            </h3>

            <p>
                ${leccion.reto}
            </p>

            <textarea
                id="challengeEditor"
                class="challenge-editor"
                spellcheck="false"
                placeholder="Escribe tu código aquí..."
            ></textarea>

            <div class="hint-box">

                💡
                <strong>Pista:</strong>

                ${obtenerPista(leccion)}

            </div>

            <button
                class="primary-button"
                onclick="comprobarReto()"
            >
                Comprobar código
            </button>

            <div id="challengeFeedback"></div>

        </div>

    `;

}


function siguientePaso() {

    const preguntas =
        obtenerPreguntasLeccion(
            leccionActual.leccion
        );


    const ultimoPaso =
        preguntas.length + 1;


    if (
        pasoLeccion <
        ultimoPaso
    ) {

        pasoLeccion++;

        renderizarPasoLeccion();

    }

}


function responderPregunta(
    index
) {

    if (
        preguntaRespondida
    ) {

        return;

    }


    const preguntas =
        obtenerPreguntasLeccion(
            leccionActual.leccion
        );


    const indice =
        pasoLeccion - 1;


    const pregunta =
        preguntas[indice];


    const botones =
        document.querySelectorAll(
            ".question-option"
        );


    preguntaRespondida =
        true;


    if (
        index ===
        pregunta.correcta
    ) {

        botones[index].classList.add(
            "correct"
        );


        respuestasLeccion++;


        aprenderConcepto(
            leccionActual.leccion.concepto
        );


        const ultimo =
            indice >=
            preguntas.length - 1;


        document.getElementById(
            "questionFeedback"
        ).innerHTML = `

            <div class="feedback success">

                ✓ Correcto.

                <br><br>

                ${
                    ultimo
                        ? "Has terminado las preguntas."
                        : "Vamos con la siguiente."
                }

                <br><br>

                <button
                    class="primary-button"
                    onclick="siguientePaso()"
                >
                    ${
                        ultimo
                            ? "Ir al reto →"
                            : "Continuar →"
                    }
                </button>

            </div>

        `;

        return;

    }


    botones[index].classList.add(
        "incorrect"
    );


    document.getElementById(
        "questionFeedback"
    ).innerHTML = `

        <div class="feedback error">

            ✗ No exactamente.

            <br><br>

            Revisa la explicación
            y vuelve a intentarlo.

        </div>

    `;


    setTimeout(
        () => {

            preguntaRespondida =
                false;

            botones[index].classList.remove(
                "incorrect"
            );

        },

        900
    );

}


/* =========================================================
   CONCEPTOS
   ========================================================= */

function aprenderConcepto(
    concepto
) {

    estado.conceptosAprendidos[
        concepto
    ] = 100;


    guardarEstado();

}


/* =========================================================
   PISTAS
   ========================================================= */

function obtenerPista(
    leccion
) {

    const aprendido =
        estado.conceptosAprendidos[
            leccion.concepto
        ] >= 80;


    if (!aprendido)
        return pistaFacil(leccion);


    return pistaDificil(leccion);

}


function pistaFacil(
    leccion
) {

    const mapa = {

        print:
            "Necesitas la función que aprendiste para mostrar información.",

        variables:
            "Necesitas local y el operador =.",

        tipos:
            "Necesitas local, el nombre de la variable y true.",

        operadores:
            "Necesitas una variable, = y el operador de multiplicación.",

        if:
            "Necesitas if, una condición, then y end.",

        else:
            "Necesitas if, then, else y end.",

        while:
            "Necesitas while, una condición, do y end.",

        for:
            "Necesitas for, un contador, =, dos números, do y end.",

        funciones:
            "Necesitas function, un nombre, paréntesis y end.",

        return:
            "Necesitas function, parámetros, return y end.",

        tablas:
            "Necesitas local, el nombre de la tabla, = y llaves.",

        strings:
            "Busca la función de strings que viste en la explicación.",

        stringlib:
            "Busca una función que empiece por string.",

        tablelib:
            "Busca una función que empiece por table.",

        modulos:
            "Necesitas la función utilizada para cargar módulos.",

        errores:
            "Piensa en la función utilizada para ejecutar código protegido.",

        math:
            "Busca la biblioteca matemática y una de sus funciones.",

        io:
            "Busca la biblioteca de entrada y salida.",

        metatables:
            "Busca la función que asigna una metatable.",

        metamethods:
            "El metamétodo de suma comienza y termina con dos guiones bajos.",

        coroutines:
            "Necesitas la biblioteca coroutine y su función create.",

        yield:
            "Busca la función yield dentro de coroutine.",

        gc:
            "Busca la función relacionada con collectgarbage.",

        debug:
            "Busca la biblioteca debug y su función traceback."

    };


    return mapa[
        leccion.concepto
    ] ||
        "Revisa la explicación de esta lección.";

}


function pistaDificil(
    leccion
) {

    const mapa = {

        print:
            "Recuerda la función que utilizaste desde tu primera lección.",

        variables:
            "Recuerda qué palabra utilizaste para declarar variables locales.",

        tipos:
            "Piensa en el valor booleano que aprendiste.",

        operadores:
            "Recuerda el símbolo que representa multiplicación.",

        if:
            "Recuerda cómo terminaban los bloques condicionales.",

        else:
            "Piensa en la alternativa del if.",

        while:
            "Recuerda la estructura que repetía mientras una condición era verdadera.",

        for:
            "Piensa en el contador que utilizaste en el ejemplo.",

        funciones:
            "Recuerda la palabra con la que comenzabas una función.",

        return:
            "Recuerda qué palabra utilizabas para devolver resultados.",

        tablas:
            "Piensa en la estructura que usaste para guardar varios valores.",

        strings:
            "Recuerda la biblioteca que utilizaste para buscar texto.",

        stringlib:
            "Piensa en la función que convierte texto a mayúsculas.",

        tablelib:
            "Recuerda la función que agrega elementos a una tabla.",

        modulos:
            "Piensa en cómo se cargaba otro archivo o módulo.",

        errores:
            "Recuerda la función que protegía la ejecución.",

        math:
            "Piensa en la biblioteca que empieza con math.",

        io:
            "Recuerda la biblioteca que usabas con archivos.",

        metatables:
            "Recuerda la función que comenzaba con set.",

        metamethods:
            "Piensa en el operador +.",

        coroutines:
            "Recuerda la biblioteca que contiene create.",

        yield:
            "Recuerda la función que pausaba la coroutine.",

        gc:
            "Piensa en el recolector de basura.",

        debug:
            "Recuerda la biblioteca dedicada a depuración."

    };


    return mapa[
        leccion.concepto
    ] ||
        "Piensa en lo que aprendiste anteriormente.";

}


/* =========================================================
   RETOS
   ========================================================= */

function comprobarReto() {

    const editor =
        document.getElementById(
            "challengeEditor"
        );


    if (!editor) return;


    const codigo =
        editor.value.toLowerCase();


    const leccion =
        leccionActual.leccion;


    const feedback =
        document.getElementById(
            "challengeFeedback"
        );


    const requisitos =
        leccion.validacion;


    const cumple =
        requisitos.every(
            requisito =>
                codigo.includes(
                    requisito.toLowerCase()
                )
        );


    if (
        !gastarLlaves(1)
    ) {

        return;

    }


    if (cumple) {

        completarLeccion();


        feedback.innerHTML = `

            <div class="feedback success">

                ✓ ¡Reto superado!

                <br>

                +${XP_POR_RETO} EXP

                <br>

                +${MONEDAS_POR_RETO} 🪙

                <br><br>

                <button
                    class="primary-button"
                    onclick="terminarLeccion()"
                >
                    Terminar lección
                </button>

            </div>

        `;

    } else {

        feedback.innerHTML = `

            <div class="feedback error">

                ✗ Todavía no cumple el reto.

                <br>

                Revisa la pista y vuelve a intentarlo.

            </div>

        `;

    }

}


function completarLeccion() {

    const id =
        leccionActual.leccion.id;


    if (
        estado.leccionesCompletadas.includes(
            id
        )
    ) {

        return;

    }


    estado.leccionesCompletadas.push(
        id
    );


    estado.xp +=
        XP_POR_LECCION +
        XP_POR_RETO;


    estado.monedas +=
        MONEDAS_POR_LECCION +
        MONEDAS_POR_RETO;


    registrarActividad();

    comprobarLogros();

    guardarEstado();

    actualizarTodo();


    mostrarToast(
        `+${XP_POR_LECCION + XP_POR_RETO} EXP`
    );

}


function terminarLeccion() {

    mostrarPagina(
        "niveles"
    );


    renderizarNiveles();

}


/* =========================================================
   CONTINUAR APRENDIENDO
   ========================================================= */

function continuarAprendiendo() {

    for (
        let nivelIndex = 0;
        nivelIndex < niveles.length;
        nivelIndex++
    ) {

        for (
            let leccionIndex = 0;
            leccionIndex <
            niveles[nivelIndex].lecciones.length;
            leccionIndex++
        ) {

            const leccion =
                niveles[nivelIndex]
                    .lecciones[leccionIndex];


            if (
                !estado.leccionesCompletadas.includes(
                    leccion.id
                ) &&
                leccionDesbloqueada(
                    nivelIndex,
                    leccionIndex
                )
            ) {

                abrirLeccion(
                    nivelIndex,
                    leccionIndex
                );

                return;

            }

        }

    }


    mostrarPagina(
        "niveles"
    );

}


/* =========================================================
   PRÁCTICA
   ========================================================= */

const ejerciciosPractica = [

    {
        pregunta:
            "¿Qué palabra crea una variable local?",

        respuesta:
            "local",

        concepto:
            "variables"
    },

    {
        pregunta:
            "¿Qué función muestra texto?",

        respuesta:
            "print",

        concepto:
            "print"
    },

    {
        pregunta:
            "¿Qué palabra termina un if?",

        respuesta:
            "end",

        concepto:
            "if"
    },

    {
        pregunta:
            "¿Qué palabra devuelve un resultado?",

        respuesta:
            "return",

        concepto:
            "return"
    },

    {
        pregunta:
            "¿Qué biblioteca trabaja con strings?",

        respuesta:
            "string",

        concepto:
            "stringlib"
    },

    {
        pregunta:
            "¿Qué biblioteca contiene funciones matemáticas?",

        respuesta:
            "math",

        concepto:
            "math"
    },

    {
        pregunta:
            "¿Qué función carga módulos?",

        respuesta:
            "require",

        concepto:
            "modulos"
    },

    {
        pregunta:
            "¿Qué biblioteca contiene las coroutines?",

        respuesta:
            "coroutine",

        concepto:
            "coroutines"
    },

    {
        pregunta:
            "¿Qué función inserta elementos en una tabla?",

        respuesta:
            "table.insert",

        concepto:
            "tablelib"
    },

    {
        pregunta:
            "¿Qué función ejecuta código protegido?",

        respuesta:
            "pcall",

        concepto:
            "errores"
    }

];


let practicaActual = null;

let practicaRonda = [];

let practicaIndice = 0;

let practicaAciertos = 0;

const PREGUNTAS_POR_RONDA = 5;


function mezclarArray(lista) {

    const copia =
        [...lista];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [copia[i], copia[j]] =
            [copia[j], copia[i]];

    }


    return copia;

}


function renderizarPractica() {

    const conocidos =
        ejerciciosPractica.filter(
            ejercicio =>
                estado.conceptosAprendidos[
                    ejercicio.concepto
                ] >= 80
        );


    if (conocidos.length === 0) {

        document.getElementById(
            "practiceContainer"
        ).innerHTML = `

            <div class="lesson-card">

                <h3>
                    🔒 Todavía no hay nada que practicar
                </h3>

                <p>
                    Termina al menos una lección para
                    desbloquear preguntas de práctica
                    sobre lo que ya aprendiste.
                </p>

                <button
                    class="primary-button"
                    onclick="mostrarPagina('niveles')"
                >
                    Ir a lecciones →
                </button>

            </div>

        `;

        return;

    }


    practicaRonda =
        mezclarArray(
            conocidos
        ).slice(
            0,
            PREGUNTAS_POR_RONDA
        );

    practicaIndice = 0;

    practicaAciertos = 0;


    mostrarPreguntaPractica();

}


function mostrarPreguntaPractica() {

    const container =
        document.getElementById(
            "practiceContainer"
        );


    if (
        practicaIndice >=
        practicaRonda.length
    ) {

        estado.practicaRondas =
            (estado.practicaRondas || 0) + 1;


        guardarEstado();

        comprobarLogros();


        container.innerHTML = `

            <div class="lesson-card">

                <h3>
                    🏁 Ronda terminada
                </h3>

                <p>
                    Acertaste ${practicaAciertos}
                    de ${practicaRonda.length}.
                </p>

                <button
                    class="primary-button"
                    onclick="renderizarPractica()"
                >
                    Otra ronda →
                </button>

            </div>

        `;

        return;

    }


    practicaActual =
        practicaRonda[
            practicaIndice
        ];


    container.innerHTML = `

        <div class="lesson-card">

            <h3>
                🎯 Reto rápido (${practicaIndice + 1}/${practicaRonda.length})
            </h3>

            <p>
                ${practicaActual.pregunta}
            </p>

            <input
                id="practiceAnswer"
                class="search-input"
                placeholder="Escribe tu respuesta..."
            >

            <button
                class="primary-button"
                onclick="comprobarPractica()"
            >
                Comprobar
            </button>

            <div id="practiceFeedback"></div>

        </div>

    `;

}


function comprobarPractica() {

    const respuesta =
        document.getElementById(
            "practiceAnswer"
        ).value
        .trim()
        .toLowerCase();


    const feedback =
        document.getElementById(
            "practiceFeedback"
        );


    const acerto =
        respuesta ===
        practicaActual.respuesta
            .toLowerCase();


    if (acerto) {

        practicaAciertos++;

    }


    feedback.innerHTML = `

        <div class="feedback ${acerto ? "success" : "error"}">

            ${
                acerto
                    ? "✓ Correcto."
                    : `✗ Incorrecto. Era "${practicaActual.respuesta}".`
            }

        </div>

    `;


    setTimeout(
        () => {

            practicaIndice++;

            mostrarPreguntaPractica();

        },

        1200
    );

}


/* =========================================================
   LABORATORIO
   ========================================================= */

const ejemplosLab = {

    variables:
`local nombre = "Angel"
print(nombre)`,

    tipos:
`local numero = 25
local texto = "Lua"
local activo = true

print(type(numero))
print(type(texto))
print(type(activo))`,

    operadores:
`local resultado = 10 + 5 * 2
print(resultado)`,

    condicionales:
`local edad = 13

if edad >= 18 then
    print("Adulto")
else
    print("Menor")
end`,

    bucles:
`for i = 1, 5 do
    print(i)
end`,

    funciones:
`function saludar(nombre)
    return "Hola " .. nombre
end

print(saludar("Angel"))`,

    tablas:
`local frutas = {
    "manzana",
    "pera",
    "banana"
}

print(frutas[1])`,

    strings:
`local texto = "LuaDrix"

print(string.upper(texto))
print(string.len(texto))`,

    errores:
`local ok, resultado = pcall(function()
    return 10
end)

print(ok)`,

    metatables:
`local persona = {}

setmetatable(persona, {})

print(type(persona))`,

    coroutines:
`local co = coroutine.create(function()
    print("Hola desde una coroutine")
end)

coroutine.resume(co)`,

    modulos:
`local modulo = require("miModulo")
print(modulo)`

};


function insertarEjemplo(
    tipo
) {

    document.getElementById(
        "luaEditor"
    ).value =
        ejemplosLab[tipo] ||
        "";

}


function limpiarEditor() {

    document.getElementById(
        "luaEditor"
    ).value =
        "";


    document.getElementById(
        "labOutput"
    ).textContent =
        "Aquí aparecerá la salida simulada...";

}


function ejecutarLaboratorio() {

    const codigo =
        document.getElementById(
            "luaEditor"
        ).value;


    const output =
        document.getElementById(
            "labOutput"
        );


    if (!codigo.trim()) {

        output.textContent =
            "No hay código para ejecutar.";

        return;

    }


    registrarActividad();


    estado.labUsos =
        (estado.labUsos || 0) + 1;


    const lineas =
        codigo.split("\n");


    const salida = [];


    lineas.forEach(
        linea => {

            const limpia =
                linea.trim();


            const printMatch =
                limpia.match(
                    /^print\s*\(\s*["'](.*?)["']\s*\)/
                );


            if (printMatch) {

                salida.push(
                    printMatch[1]
                );

                return;

            }


            const variablePrint =
                limpia.match(
                    /^print\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/
                );


            if (variablePrint) {

                const variable =
                    variablePrint[1];


                const regex =
                    new RegExp(
                        `local\\s+${variable}\\s*=\\s*["'](.*?)["']`
                    );


                const encontrada =
                    codigo.match(regex);


                if (encontrada) {

                    salida.push(
                        encontrada[1]
                    );

                } else {

                    salida.push(
                        `[simulación] ${variable}`
                    );

                }

                return;

            }


            const mathPrint =
                limpia.match(
                    /^print\s*\(\s*(\d+)\s*([+\-*\/])\s*(\d+)\s*\)/
                );


            if (mathPrint) {

                const a =
                    Number(
                        mathPrint[1]
                    );


                const operador =
                    mathPrint[2];


                const b =
                    Number(
                        mathPrint[3]
                    );


                let resultado;


                if (
                    operador === "+"
                )
                    resultado =
                        a + b;


                if (
                    operador === "-"
                )
                    resultado =
                        a - b;


                if (
                    operador === "*"
                )
                    resultado =
                        a * b;


                if (
                    operador === "/"
                )
                    resultado =
                        a / b;


                salida.push(
                    String(resultado)
                );

            }

        }
    );


    if (
        salida.length === 0
    ) {

        salida.push(
            "[simulación] Código procesado correctamente."
        );

        salida.push(
            "LuaDrix no ejecuta Lua real en el navegador."
        );

    }


    output.textContent =
        salida.join("\n");


    guardarEstado();

    actualizarMonedas();

    comprobarLogros();

}


/* =========================================================
   BIBLIOTECA
   ========================================================= */

const biblioteca = [

    {
        nombre: "print()",
        categoria: "Básico",
        descripcion:
            "Muestra valores o texto en la salida."
    },

    {
        nombre: "local",
        categoria: "Variables",
        descripcion:
            "Declara una variable local."
    },

    {
        nombre: "type()",
        categoria: "Básico",
        descripcion:
            "Devuelve el tipo de un valor."
    },

    {
        nombre: "string.find()",
        categoria: "String",
        descripcion:
            "Busca un patrón o texto dentro de un string."
    },

    {
        nombre: "string.len()",
        categoria: "String",
        descripcion:
            "Obtiene la longitud de un string."
    },

    {
        nombre: "string.upper()",
        categoria: "String",
        descripcion:
            "Convierte un string a mayúsculas."
    },

    {
        nombre: "string.lower()",
        categoria: "String",
        descripcion:
            "Convierte un string a minúsculas."
    },

    {
        nombre: "table.insert()",
        categoria: "Table",
        descripcion:
            "Inserta un elemento en una tabla."
    },

    {
        nombre: "table.remove()",
        categoria: "Table",
        descripcion:
            "Elimina un elemento de una tabla."
    },

    {
        nombre: "math.floor()",
        categoria: "Math",
        descripcion:
            "Redondea un número hacia abajo."
    },

    {
        nombre: "math.ceil()",
        categoria: "Math",
        descripcion:
            "Redondea un número hacia arriba."
    },

    {
        nombre: "math.abs()",
        categoria: "Math",
        descripcion:
            "Obtiene el valor absoluto de un número."
    },

    {
        nombre: "io.open()",
        categoria: "IO",
        descripcion:
            "Abre un archivo."
    },

    {
        nombre: "os.date()",
        categoria: "OS",
        descripcion:
            "Obtiene información relacionada con fechas y horas."
    },

    {
        nombre: "require()",
        categoria: "Package",
        descripcion:
            "Carga un módulo."
    },

    {
        nombre: "pcall()",
        categoria: "Errores",
        descripcion:
            "Ejecuta una función protegida contra errores."
    },

    {
        nombre: "xpcall()",
        categoria: "Errores",
        descripcion:
            "Ejecuta una función protegida utilizando un manejador de errores."
    },

    {
        nombre: "setmetatable()",
        categoria: "Metatables",
        descripcion:
            "Asigna una metatable a una tabla."
    },

    {
        nombre: "getmetatable()",
        categoria: "Metatables",
        descripcion:
            "Obtiene la metatable de un valor."
    },

    {
        nombre: "coroutine.create()",
        categoria: "Coroutines",
        descripcion:
            "Crea una coroutine."
    },

    {
        nombre: "coroutine.resume()",
        categoria: "Coroutines",
        descripcion:
            "Continúa una coroutine."
    },

    {
        nombre: "coroutine.yield()",
        categoria: "Coroutines",
        descripcion:
            "Suspende una coroutine."
    },

    {
        nombre: "collectgarbage()",
        categoria: "Garbage Collector",
        descripcion:
            "Permite controlar o consultar el recolector de basura."
    },

    {
        nombre: "debug.traceback()",
        categoria: "Debug",
        descripcion:
            "Construye información de seguimiento para depuración."
    }

];


function renderizarBiblioteca() {

    const container =
        document.getElementById(
            "libraryContainer"
        );


    renderizarResultadosBiblioteca(
        biblioteca,
        container
    );

}


function renderizarResultadosBiblioteca(
    datos,
    container
) {

    container.innerHTML = "";


    if (
        datos.length === 0
    ) {

        container.innerHTML = `

            <div class="library-item">

                <h3>
                    No encontrado
                </h3>

                <p>
                    No encontramos ese concepto.
                </p>

            </div>

        `;

        return;

    }


    datos.forEach(
        item => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "library-item";


            div.innerHTML = `

                <small>
                    ${item.categoria}
                </small>

                <h3>
                    ${item.nombre}
                </h3>

                <p>
                    ${item.descripcion}
                </p>

            `;


            container.appendChild(
                div
            );

        }
    );

}


function buscarBiblioteca() {

    const texto =
        document.getElementById(
            "librarySearch"
        ).value
        .toLowerCase()
        .trim();


    const resultados =
        biblioteca.filter(
            item =>

                item.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                item.categoria
                    .toLowerCase()
                    .includes(texto)

                ||

                item.descripcion
                    .toLowerCase()
                    .includes(texto)
        );


    renderizarResultadosBiblioteca(
        resultados,
        document.getElementById(
            "libraryContainer"
        )
    );

}


/* =========================================================
   LOGROS
   ========================================================= */

const logros = [

    ["🌱", "Primer paso", "Completa tu primera lección."],
    ["📚", "Estudiante", "Completa 3 lecciones."],
    ["📖", "Aprendiz", "Completa 5 lecciones."],
    ["🎓", "Conocedor", "Completa 10 lecciones."],
    ["🏆", "Maestro del camino", "Completa 20 lecciones."],

    ["⭐", "100 EXP", "Consigue 100 EXP."],
    ["⭐", "250 EXP", "Consigue 250 EXP."],
    ["⭐", "500 EXP", "Consigue 500 EXP."],
    ["⭐", "1000 EXP", "Consigue 1000 EXP."],
    ["⭐", "2500 EXP", "Consigue 2500 EXP."],

    ["🔥", "Racha de 2", "Mantén una racha de 2 días."],
    ["🔥", "Racha de 3", "Mantén una racha de 3 días."],
    ["🔥", "Racha de 7", "Mantén una racha de 7 días."],
    ["🔥", "Racha de 14", "Mantén una racha de 14 días."],
    ["🔥", "Racha de 30", "Mantén una racha de 30 días."],

    ["💻", "Primer código", "Completa un reto de código."],
    ["💻", "Código en progreso", "Completa 5 retos."],
    ["💻", "Constructor", "Completa 10 retos."],
    ["💻", "Programador", "Completa 20 retos."],
    ["💻", "Código maestro", "Completa 30 retos."],

    ["🧠", "Variables", "Aprende variables."],
    ["🧠", "Condiciones", "Aprende if."],
    ["🧠", "Bucles", "Aprende while."],
    ["🧠", "Funciones", "Aprende funciones."],
    ["🧠", "Tablas", "Aprende tablas."],

    ["🧪", "Primer experimento", "Usa el laboratorio."],
    ["🧪", "Experimentador", "Usa el laboratorio 5 veces."],
    ["🧪", "Científico Lua", "Usa el laboratorio 15 veces."],

    ["📈", "Nivel 2", "Alcanza el nivel 2."],
    ["📈", "Nivel 3", "Alcanza el nivel 3."],
    ["📈", "Nivel 5", "Alcanza el nivel 5."],
    ["📈", "Nivel 10", "Alcanza el nivel 10."],
    ["📈", "Nivel 15", "Alcanza el nivel 15."],

    ["🪙", "Ahorrador", "Consigue 100 monedas."],
    ["🪙", "Coleccionista", "Consigue 500 monedas."],
    ["🪙", "Magnate", "Consigue 1000 monedas."],

    ["🔑", "Superviviente", "Completa un reto con pocas llaves."],
    ["🛡️", "Protegido", "Usa un protector de racha."],
    ["🎯", "Práctica", "Completa un ejercicio de práctica."],
    ["📖", "Bibliotecario", "Consulta la biblioteca."],
    ["🔬", "Explorador", "Prueba 5 áreas del laboratorio."],
    ["🎨", "Personalizador", "Compra un tema."],
    ["👤", "Perfil", "Configura tu perfil."],
    ["🚀", "Despegue", "Completa el Nivel 1."],
    ["🔥", "Constante", "Haz actividades durante varios días."],
    ["🧩", "Resolutor", "Supera 10 retos."],
    ["🧑‍💻", "Desarrollador", "Llega al Nivel 6."],
    ["👑", "Leyenda", "Llega al Nivel 20."],
    ["💡", "Curioso", "Envía una sugerencia."],
    ["🏁", "LuaDrix completo", "Explora todo el camino disponible."]

];


function renderizarLogros() {

    const container =
        document.getElementById(
            "achievementsContainer"
        );


    container.innerHTML = "";


    logros.forEach(
        (
            logro,
            index
        ) => {

            const desbloqueado =
                estado.logros.includes(
                    index
                );


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "achievement" +
                (
                    desbloqueado
                        ? ""
                        : " locked"
                );


            div.innerHTML = `

                <div class="achievement-icon">
                    ${logro[0]}
                </div>

                <h3>
                    ${logro[1]}
                </h3>

                <p>
                    ${logro[2]}
                </p>

                <small>
                    ${
                        desbloqueado
                            ? "✓ Desbloqueado"
                            : "🔒 Bloqueado"
                    }
                </small>

            `;


            container.appendChild(
                div
            );

        }
    );

}


function comprobarLogros() {

    const completadas =
        estado.leccionesCompletadas.length;


    const checks = [

        completadas >= 1,
        completadas >= 3,
        completadas >= 5,
        completadas >= 10,
        completadas >= 20,

        estado.xp >= 100,
        estado.xp >= 250,
        estado.xp >= 500,
        estado.xp >= 1000,
        estado.xp >= 2500,

        estado.racha >= 2,
        estado.racha >= 3,
        estado.racha >= 7,
        estado.racha >= 14,
        estado.racha >= 30,

        completadas >= 1,
        completadas >= 5,
        completadas >= 10,
        completadas >= 20,
        completadas >= 30,

        estado.conceptosAprendidos.variables >= 80,
        estado.conceptosAprendidos.if >= 80,
        estado.conceptosAprendidos.while >= 80,
        estado.conceptosAprendidos.funciones >= 80,
        estado.conceptosAprendidos.tablas >= 80,

        (estado.labUsos || 0) >= 1,
        (estado.labUsos || 0) >= 5,
        (estado.labUsos || 0) >= 15,

        obtenerNivel() >= 2,
        obtenerNivel() >= 3,
        obtenerNivel() >= 5,
        obtenerNivel() >= 10,
        obtenerNivel() >= 15,

        estado.monedas >= 100,
        estado.monedas >= 500,
        estado.monedas >= 1000,

        estado.llaves <= 1 &&
            completadas > 0,

        estado.protectores < 2,

        (estado.practicaRondas || 0) >= 1,

        estado.bibliotecaVisitada === true,

        (estado.labUsos || 0) >= 5,

        estado.tema !== "normal",

        estado.cuenta === true,

        completadas >= 4,

        estado.racha >= 3,

        completadas >= 10,

        obtenerNivel() >= 6,

        obtenerNivel() >= 20,

        estado.sugerenciasEnviadas > 0,

        completadas >= 24

    ];


    checks.forEach(
        (
            cumplido,
            index
        ) => {

            if (
                cumplido &&
                !estado.logros.includes(
                    index
                )
            ) {

                estado.logros.push(
                    index
                );


                mostrarToast(
                    `Logro desbloqueado: ${logros[index][1]}`
                );

            }

        }
    );


    guardarEstado();

}


/* =========================================================
   TIENDA
   ========================================================= */

function comprar(
    tipo,
    precio
) {

    if (
        estado.monedas <
        precio
    ) {

        mostrarToast(
            "No tienes suficientes monedas."
        );

        return;

    }


    if (
        tipo === "llave"
    ) {

        if (
            estado.llaves >=
            MAX_LLAVES
        ) {

            mostrarToast(
                "Tus llaves ya están completas."
            );

            return;

        }


        estado.monedas -=
            precio;


        estado.llaves =
            Math.min(
                MAX_LLAVES,
                estado.llaves + 1
            );


        estado.ultimaRecarga =
            Date.now();

    }


    if (
        tipo === "pista"
    ) {

        if (
            estado.pistaUsadaHoy
        ) {

            mostrarToast(
                "Ya utilizaste una pista extra hoy."
            );

            return;

        }


        estado.monedas -=
            precio;


        estado.pistaUsadaHoy =
            true;


        mostrarToast(
            "Pista extra desbloqueada por hoy."
        );

    }


    if (
        tipo === "practica"
    ) {

        if (
            estado.practicaUsadaHoy
        ) {

            mostrarToast(
                "Ya compraste la práctica extra de hoy."
            );

            return;

        }


        estado.monedas -=
            precio;


        estado.practicaUsadaHoy =
            true;


        mostrarToast(
            "Práctica extra desbloqueada."
        );

    }


    guardarEstado();

    actualizarTodo();

}


const TEMAS_COLOR = [
    "azul",
    "esmeralda",
    "cyberpunk",
    "ambar",
    "rubi"
];


function comprarTema(
    tema,
    precio
) {

    // Si ya lo tiene comprado, "comprar" simplemente lo equipa
    // (no le cobramos dos veces por el mismo tema).

    if (
        estado.temasComprados.includes(tema)
    ) {

        equiparTema(tema);

        return;

    }


    if (
        estado.monedas <
        precio
    ) {

        mostrarToast(
            "No tienes suficientes monedas."
        );

        return;

    }


    estado.monedas -=
        precio;


    estado.temasComprados.push(
        tema
    );


    equiparTema(tema);


    mostrarToast(
        "Tema comprado y equipado."
    );

}


function equiparTema(tema) {

    if (
        !estado.temasComprados.includes(tema)
    ) {

        mostrarToast(
            "Todavía no tienes este tema."
        );

        return;

    }


    estado.tema =
        tema;


    aplicarTema();

    guardarEstado();

    actualizarTodo();

}


function aplicarTema() {

    TEMAS_COLOR.forEach(
        t =>
            document.body.classList.remove(
                `theme-${t}`
            )
    );


    if (
        estado.tema !== "normal" &&
        TEMAS_COLOR.includes(estado.tema)
    ) {

        document.body.classList.add(
            `theme-${estado.tema}`
        );

    }

}


function actualizarBotonesTema() {

    TEMAS_COLOR.forEach(tema => {

        const boton =
            document.getElementById(
                `temaBoton-${tema}`
            );

        const tarjeta =
            document.getElementById(
                `temaTarjeta-${tema}`
            );

        if (!boton || !tarjeta) return;


        const comprado =
            estado.temasComprados.includes(tema);

        const equipado =
            estado.tema === tema;


        tarjeta.classList.toggle(
            "equipped",
            equipado
        );


        if (equipado) {

            boton.textContent = "Equipado ✓";
            boton.className = "equipped-button";

        } else if (comprado) {

            boton.textContent = "Equipar";
            boton.className = "owned-button";

        } else {

            boton.textContent =
                boton.dataset.precio + " 🪙";

            boton.className = "";

        }

    });

}


/* =========================================================
   PERFIL / CUENTAS
   ========================================================= */

function actualizarPerfil() {

    document.getElementById(
        "profileName"
    ).textContent =
        estado.nombre;


    actualizarXP();

    actualizarEstadoCuenta();

}


async function obtenerUsuarioActual() {

    if (!supabaseClient)
        return null;


    const {
        data,
        error
    } =
        await supabaseClient.auth.getUser();


    if (error)
        return null;


    return data.user || null;

}


function actualizarEstadoCuenta() {

    const status =
        document.getElementById(
            "accountStatus"
        );


    const logout =
        document.getElementById(
            "logoutButton"
        );


    if (
        !status ||
        !logout
    ) return;


    if (estado.cuenta) {

        status.textContent =
            `Cuenta activa como @${estado.username || estado.nombre}.`;

        logout.classList.remove(
            "hidden"
        );

    } else {

        status.textContent =
            "Inicia sesión para poder buscar y agregar amigos.";

        logout.classList.add(
            "hidden"
        );

    }

}


async function registrarCuenta() {

    if (!supabaseClient) {

        mostrarToast(
            "Supabase no está disponible."
        );

        return;

    }


    const username =
        document.getElementById(
            "accountUsername"
        ).value.trim();


    const email =
        document.getElementById(
            "accountEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "accountPassword"
        ).value;


    if (
        !username ||
        !email ||
        !password
    ) {

        mostrarToast(
            "Completa usuario, correo y contraseña."
        );

        return;

    }


    if (
        username.length < 3
    ) {

        mostrarToast(
            "El nombre de usuario debe tener al menos 3 caracteres."
        );

        return;

    }


    if (
        password.length < 6
    ) {

        mostrarToast(
            "La contraseña debe tener al menos 6 caracteres."
        );

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({

            email,

            password,

            options: {

                data: {
                    username
                },

                emailRedirectTo:
                    window.location.origin +
                    window.location.pathname

            }

        });


    if (error) {

        mostrarToast(
            error.message
        );

        return;

    }


    if (!data.user) {

        mostrarToast(
            "No se pudo crear la cuenta."
        );

        return;

    }


    const user =
        data.user;


    const {
        error: profileError
    } =
        await supabaseClient
            .from("profiles")
            .insert({

                id: user.id,

                username:
                    username,

                display_name:
                    username,

                level:
                    obtenerNivel(),

                xp:
                    estado.xp,

                avatar:
                    "👤"

            });


    if (
        profileError &&
        profileError.code !== "23505"
    ) {

        mostrarToast(
            profileError.message
        );

        return;

    }


    estado.cuenta = true;

    estado.username =
        username;

    estado.nombre =
        username;


    guardarEstado();

    actualizarTodo();


    mostrarToast(
        "Cuenta creada."
    );

}


async function iniciarSesionConProveedor(proveedor) {

    if (!supabaseClient) {

        mostrarToast(
            "Supabase no está disponible."
        );

        return;

    }


    const {
        error
    } =
        await supabaseClient.auth.signInWithOAuth({

            provider: proveedor,

            options: {

                redirectTo:
                    window.location.origin +
                    window.location.pathname

            }

        });


    if (error) {

        mostrarToast(
            error.message
        );

    }

    // Si no hay error, el navegador redirige a Google/Apple
    // y luego vuelve automáticamente a esta página ya con sesión.

}


async function iniciarSesion() {

    if (!supabaseClient) {

        mostrarToast(
            "Supabase no está disponible."
        );

        return;

    }


    const email =
        document.getElementById(
            "accountEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "accountPassword"
        ).value;


    if (
        !email ||
        !password
    ) {

        mostrarToast(
            "Escribe tu correo y contraseña."
        );

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({

            email,

            password

        });


    if (error) {

        mostrarToast(
            error.message
        );

        return;

    }


    await cargarPerfilSupabase(
        data.user
    );


    mostrarToast(
        "Sesión iniciada."
    );

}


async function cargarPerfilSupabase(
    user
) {

    if (!user)
        return;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "username, display_name, level, xp, avatar"
            )
            .eq(
                "id",
                user.id
            )
            .maybeSingle();


    if (
        error ||
        !data
    ) {

        return;

    }


    estado.cuenta = true;

    estado.username =
        data.username || "";

    estado.nombre =
        data.display_name ||
        data.username ||
        "Angel";


    guardarEstado();

    actualizarPerfil();

}


async function cerrarSesion() {

    if (
        !supabaseClient
    ) return;


    await supabaseClient.auth.signOut();


    estado.cuenta =
        false;

    estado.username =
        "";


    guardarEstado();

    actualizarPerfil();


    mostrarToast(
        "Sesión cerrada."
    );

}


/* =========================================================
   SUGERENCIAS
   ========================================================= */

function enviarSugerencia() {

    const categoria =
        document.getElementById(
            "suggestionCategory"
        ).value;


    const texto =
        document.getElementById(
            "suggestionText"
        ).value.trim();


    if (!texto) {

        mostrarToast(
            "Escribe una sugerencia primero."
        );

        return;

    }


    const sugerencias =
        JSON.parse(
            localStorage.getItem(
                "luaDrixSugerencias"
            ) ||
            "[]"
        );


    sugerencias.push({

        categoria,

        texto,

        fecha:
            new Date().toISOString()

    });


    localStorage.setItem(
        "luaDrixSugerencias",
        JSON.stringify(
            sugerencias
        )
    );


    estado.sugerenciasEnviadas =
        (
            estado.sugerenciasEnviadas ||
            0
        ) + 1;


    guardarEstado();

    comprobarLogros();


    document.getElementById(
        "suggestionText"
    ).value = "";


    mostrarToast(
        "Sugerencia guardada."
    );

}


/* =========================================================
   ENCUESTA
   ========================================================= */

const encuesta = [

    {
        pregunta:
            "¿Cómo conociste LuaDrix?",

        opciones: [
            "YouTube",
            "Google",
            "Un amigo",
            "Redes sociales",
            "Otro"
        ]
    },

    {
        pregunta:
            "¿Por qué quieres aprender programación?",

        opciones: [
            "Crear juegos",
            "Curiosidad",
            "Colegio",
            "Crear aplicaciones",
            "Aprender algo nuevo"
        ]
    },

    {
        pregunta:
            "¿Qué te gustaría crear?",

        opciones: [
            "Juegos",
            "Aplicaciones",
            "Páginas web",
            "Herramientas",
            "Todavía no sé"
        ]
    },

    {
        pregunta:
            "¿Cuánta programación conoces?",

        opciones: [
            "Nada",
            "Un poco",
            "Nivel básico",
            "Nivel intermedio",
            "Bastante"
        ]
    },

    {
        pregunta:
            "¿Qué esperas de LuaDrix?",

        opciones: [
            "Aprender desde cero",
            "Practicar",
            "Aprender Lua avanzado",
            "Crear proyectos",
            "Todo lo anterior"
        ]
    }

];


let encuestaRespuestas = {};

let encuestaPaso = 0;


function actualizarEstadoOnboarding() {

    const activo =
        !estado.encuestaTerminada ||
        !estado.diagnosticoTerminado;


    document.body.classList.toggle(
        "onboarding-active",
        activo
    );

}


function iniciarOnboarding() {

    actualizarEstadoOnboarding();


    if (
        estado.encuestaTerminada &&
        estado.diagnosticoTerminado
    ) {

        return;

    }


    if (
        !estado.encuestaTerminada
    ) {

        mostrarPagina(
            "diagnostico"
        );

        renderizarEncuesta();

    } else {

        mostrarPagina(
            "diagnostico"
        );

        renderizarDiagnosticoLua();

    }

}


function renderizarEncuesta() {

    const container =
        document.getElementById(
            "surveyContainer"
        );


    if (
        encuestaPaso >=
        encuesta.length
    ) {

        renderizarDiagnosticoLua();

        return;

    }


    const pregunta =
        encuesta[
            encuestaPaso
        ];


    container.innerHTML = `

        <div class="survey-card">

            <h3>
                Pregunta
                ${encuestaPaso + 1}
                de
                ${encuesta.length}
            </h3>

            <p>
                ${pregunta.pregunta}
            </p>

            <div id="surveyOptions"></div>

        </div>

    `;


    const opciones =
        document.getElementById(
            "surveyOptions"
        );


    pregunta.opciones.forEach(
        (
            opcion,
            index
        ) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "survey-option";


            boton.textContent =
                opcion;


            boton.onclick =
                () => {

                    encuestaRespuestas[
                        encuestaPaso
                    ] = opcion;


                    encuestaPaso++;


                    renderizarEncuesta();

                };


            opciones.appendChild(
                boton
            );

        }
    );

}


function renderizarDiagnosticoLua() {

    const container =
        document.getElementById(
            "surveyContainer"
        );


    container.innerHTML = `

        <div class="survey-card">

            <h3>
                Parte 2 — Diagnóstico de Lua
            </h3>

            <p>
                Ahora comprobaremos qué conceptos ya conoces.
                No ganas ni pierdes XP ni llaves.
            </p>

            <button
                class="primary-button"
                onclick="comenzarDiagnostico()"
            >
                Comenzar diagnóstico
            </button>

        </div>

    `;

}


function comenzarDiagnostico() {

    const preguntas = [

        {
            skill: "print",

            pregunta:
                "¿Cuál muestra texto?",

            opciones: [
                "print()",
                "show()",
                "display()"
            ],

            correcta: 0
        },

        {
            skill: "variables",

            pregunta:
                "¿Cuál crea una variable local?",

            opciones: [
                "local nombre = Angel",
                "var nombre = Angel",
                "let nombre = Angel"
            ],

            correcta: 0
        },

        {
            skill: "tipos",

            pregunta:
                "¿Cuál de estos valores es booleano?",

            opciones: [
                "true",
                "\"Hola\"",
                "25"
            ],

            correcta: 0
        },

        {
            skill: "if",

            pregunta:
                "¿Qué estructura sirve para tomar decisiones?",

            opciones: [
                "if",
                "loop",
                "table"
            ],

            correcta: 0
        },

        {
            skill: "while",

            pregunta:
                "¿Qué estructura repite mientras una condición sea verdadera?",

            opciones: [
                "while",
                "if",
                "function"
            ],

            correcta: 0
        },

        {
            skill: "funciones",

            pregunta:
                "¿Qué palabra declara una función?",

            opciones: [
                "function",
                "method",
                "func"
            ],

            correcta: 0
        },

        {
            skill: "tablas",

            pregunta:
                "¿Qué estructura permite guardar varios valores?",

            opciones: [
                "table",
                "boolean",
                "number"
            ],

            correcta: 0
        },

        {
            skill: "strings",

            pregunta:
                "¿Qué biblioteca trabaja con strings?",

            opciones: [
                "string",
                "text",
                "words"
            ],

            correcta: 0
        }

    ];


    let puntuacion = {};

    let actual = 0;


    function siguiente() {

        if (
            actual >=
            preguntas.length
        ) {

            finalizar();

            return;

        }


        const p =
            preguntas[
                actual
            ];


        const container =
            document.getElementById(
                "surveyContainer"
            );


        container.innerHTML = `

            <div class="survey-card">

                <h3>
                    Diagnóstico
                    ${actual + 1}/${preguntas.length}
                </h3>

                <p>
                    ${p.pregunta}
                </p>

                <div id="diagOptions"></div>

            </div>

        `;


        const opciones =
            document.getElementById(
                "diagOptions"
            );


        p.opciones.forEach(
            (
                opcion,
                index
            ) => {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.className =
                    "survey-option";


                boton.textContent =
                    opcion;


                boton.onclick =
                    () => {

                        puntuacion[
                            p.skill
                        ] =
                            index ===
                            p.correcta
                                ? 100
                                : 0;


                        actual++;


                        siguiente();

                    };


                opciones.appendChild(
                    boton
                );

            }
        );

    }


    function finalizar() {

        estado.encuestaTerminada =
            true;


        estado.diagnosticoTerminado =
            true;


        estado.diagnosticoSkills =
            puntuacion;


        estado.conceptosAprendidos =
            {

                ...estado.conceptosAprendidos,

                ...puntuacion

            };


        localStorage.setItem(
            "luaDrixEncuesta",
            JSON.stringify(
                encuestaRespuestas
            )
        );


        guardarEstado();


        actualizarEstadoOnboarding();


        mostrarToast(
            "Diagnóstico terminado."
        );


        mostrarPagina(
            "inicio"
        );


        actualizarTodo();

    }


    siguiente();

}


/* =========================================================
   AMIGOS / SOCIAL
   ========================================================= */

async function cargarSocial() {

    if (
        !supabaseClient
    ) {

        mostrarToast(
            "No se pudo conectar con el sistema de amigos."
        );

        return;

    }


    const user =
        await obtenerUsuarioActual();


    if (!user) {

        document.getElementById(
            "socialSearchResults"
        ).innerHTML = `

            <div class="empty-social">

                Necesitas iniciar sesión para
                utilizar el sistema de amigos.

                <br><br>

                Ve a
                <strong>Perfil → Cuenta</strong>
                para iniciar sesión.

            </div>

        `;


        document.getElementById(
            "friendRequests"
        ).innerHTML = `

            <div class="empty-social">
                Inicia sesión para ver solicitudes.
            </div>

        `;


        document.getElementById(
            "friendsList"
        ).innerHTML = `

            <div class="empty-social">
                Inicia sesión para ver tus amigos.
            </div>

        `;


        return;

    }


    await cargarSolicitudes();

    await cargarAmigos();

}


function escapeHTML(
    texto
) {

    return String(
        texto ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


async function buscarUsuarios() {

    if (!requiereCuenta()) return;


    const input =
        document.getElementById(
            "userSearch"
        );


    const query =
        input.value
            .trim()
            .toLowerCase();


    const container =
        document.getElementById(
            "socialSearchResults"
        );


    if (
        query.length < 2
    ) {

        container.innerHTML = `

            <div class="empty-social">
                Escribe al menos 2 caracteres.
            </div>

        `;

        return;

    }


    const user =
        await obtenerUsuarioActual();


    if (!user) {

        container.innerHTML = `

            <div class="empty-social">
                Inicia sesión primero para buscar usuarios.
            </div>

        `;

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, username, display_name, level, xp, avatar"
            )
            .ilike(
                "username",
                `%${query}%`
            )
            .neq(
                "id",
                user.id
            )
            .limit(20);


    if (error) {

        container.innerHTML = `

            <div class="empty-social">
                Error buscando usuarios.
                <br><br>
                ${escapeHTML(error.message)}
            </div>

        `;

        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-social">
                No encontramos usuarios con ese nombre.
            </div>

        `;

        return;

    }


    const resultados =
        [];


    for (
        const perfil of data
    ) {

        const estadoAmistad =
            await obtenerEstadoAmistad(
                user.id,
                perfil.id
            );


        resultados.push({

            ...perfil,

            estadoAmistad

        });

    }


    container.innerHTML =
        resultados
            .map(
                crearTarjetaUsuario
            )
            .join("");

}


async function obtenerEstadoAmistad(
    userId,
    otherId
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("friendships")
            .select(
                "id, requester_id, addressee_id, status"
            )
            .or(
                `and(requester_id.eq.${userId},addressee_id.eq.${otherId}),and(requester_id.eq.${otherId},addressee_id.eq.${userId})`
            )
            .limit(1)
            .maybeSingle();


    if (
        error ||
        !data
    ) {

        return null;

    }


    return data;

}


function crearTarjetaUsuario(
    perfil
) {

    let accion = "";


    if (
        !perfil.estadoAmistad
    ) {

        accion = `

            <button
                class="social-add"
                onclick="enviarSolicitud('${perfil.id}')"
            >
                Agregar
            </button>

        `;

    } else if (
        perfil.estadoAmistad.status ===
        "accepted"
    ) {

        accion = `

            <span class="social-status">
                ✓ Amigos
            </span>

        `;

    } else if (
        perfil.estadoAmistad.requester_id ===
        perfil.id
    ) {

        accion = `

            <span class="social-status">
                Solicitud recibida
            </span>

        `;

    } else {

        accion = `

            <span class="social-status">
                Solicitud enviada
            </span>

        `;

    }


    return `

        <div class="social-card">

            <div class="social-user">

                <div class="social-avatar">
                    ${escapeHTML(
                        perfil.avatar || "👤"
                    )}
                </div>

                <div class="social-user-info">

                    <strong>
                        @${escapeHTML(
                            perfil.username
                        )}
                    </strong>

                    <small>
                        Nivel
                        ${Number(
                            perfil.level || 1
                        )}
                    </small>

                </div>

            </div>

            <div class="social-actions">

                ${accion}

            </div>

        </div>

    `;

}


async function enviarSolicitud(
    addresseeId
) {

    const user =
        await obtenerUsuarioActual();


    if (!user) {

        mostrarToast(
            "Inicia sesión primero."
        );

        return;

    }


    if (
        user.id ===
        addresseeId
    ) {

        return;

    }


    const existente =
        await obtenerEstadoAmistad(
            user.id,
            addresseeId
        );


    if (existente) {

        mostrarToast(
            "Ya existe una solicitud o amistad."
        );

        return;

    }


    const {
        error
    } =
        await supabaseClient
            .from("friendships")
            .insert({

                requester_id:
                    user.id,

                addressee_id:
                    addresseeId,

                status:
                    "pending"

            });


    if (error) {

        mostrarToast(
            error.message
        );

        return;

    }


    mostrarToast(
        "Solicitud enviada."
    );


    await buscarUsuarios();

}


async function cargarSolicitudes() {

    const user =
        await obtenerUsuarioActual();


    if (!user) return;


    const container =
        document.getElementById(
            "friendRequests"
        );


    const {
        data,
        error
    } =
        await supabaseClient
            .from("friendships")
            .select(
                "id, requester_id, status, profiles:requester_id(id, username, display_name, level, avatar)"
            )
            .eq(
                "addressee_id",
                user.id
            )
            .eq(
                "status",
                "pending"
            );


    if (error) {

        container.innerHTML = `

            <div class="empty-social">
                ${escapeHTML(
                    error.message
                )}
            </div>

        `;

        return;

    }


    const solicitudes =
        data || [];


    document.getElementById(
        "requestCount"
    ).textContent =
        solicitudes.length;


    if (
        solicitudes.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-social">
                No tienes solicitudes pendientes.
            </div>

        `;

        return;

    }


    container.innerHTML =
        solicitudes
            .map(
                solicitud => {

                    const perfil =
                        solicitud.profiles;


                    return `

                        <div class="social-card">

                            <div class="social-user">

                                <div class="social-avatar">
                                    ${escapeHTML(
                                        perfil?.avatar ||
                                        "👤"
                                    )}
                                </div>

                                <div class="social-user-info">

                                    <strong>
                                        @${escapeHTML(
                                            perfil?.username ||
                                            "Usuario"
                                        )}
                                    </strong>

                                    <small>
                                        Nivel
                                        ${Number(
                                            perfil?.level ||
                                            1
                                        )}
                                    </small>

                                </div>

                            </div>

                            <div class="social-actions">

                                <button
                                    class="social-accept"
                                    onclick="responderSolicitud('${solicitud.id}', 'accepted')"
                                >
                                    Aceptar
                                </button>

                                <button
                                    class="social-reject"
                                    onclick="responderSolicitud('${solicitud.id}', 'rejected')"
                                >
                                    Rechazar
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


async function responderSolicitud(
    friendshipId,
    nuevoEstado
) {

    const {
        error
    } =
        await supabaseClient
            .from("friendships")
            .update({
                status:
                    nuevoEstado
            })
            .eq(
                "id",
                friendshipId
            );


    if (error) {

        mostrarToast(
            error.message
        );

        return;

    }


    mostrarToast(
        nuevoEstado === "accepted"
            ? "Amigo agregado."
            : "Solicitud rechazada."
    );


    await cargarSolicitudes();

    await cargarAmigos();

}


async function cargarAmigos() {

    const user =
        await obtenerUsuarioActual();


    if (!user) return;


    const container =
        document.getElementById(
            "friendsList"
        );


    const {
        data,
        error
    } =
        await supabaseClient
            .from("friendships")
            .select(
                "id, requester_id, addressee_id, status, requester:requester_id(id, username, display_name, level, avatar), addressee:addressee_id(id, username, display_name, level, avatar)"
            )
            .eq(
                "status",
                "accepted"
            )
            .or(
                `requester_id.eq.${user.id},addressee_id.eq.${user.id}`
            );


    if (error) {

        container.innerHTML = `

            <div class="empty-social">
                ${escapeHTML(
                    error.message
                )}
            </div>

        `;

        return;

    }


    const amigos =
        (data || [])
            .map(
                amistad =>
                    amistad.requester_id === user.id
                        ? amistad.addressee
                        : amistad.requester
            )
            .filter(Boolean);


    document.getElementById(
        "friendCount"
    ).textContent =
        amigos.length;


    if (
        amigos.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-social">
                Todavía no tienes amigos.
            </div>

        `;

        return;

    }


    container.innerHTML =
        amigos
            .map(
                amigo => `

                    <div class="social-card">

                        <div class="social-user">

                            <div class="social-avatar">
                                ${escapeHTML(
                                    amigo.avatar ||
                                    "👤"
                                )}
                            </div>

                            <div class="social-user-info">

                                <strong>
                                    @${escapeHTML(
                                        amigo.username
                                    )}
                                </strong>

                                <small>
                                    Nivel
                                    ${Number(
                                        amigo.level ||
                                        1
                                    )}
                                </small>

                            </div>

                        </div>

                        <div class="social-actions">

                            <span class="social-status">
                                ✓ Amigo
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   TEMA
   ========================================================= */

function alternarTema() {

    document.body.classList.toggle(
        "dark"
    );


    const oscuro =
        document.body.classList.contains(
            "dark"
        );


    estado.modoOscuro =
        oscuro;


    guardarEstado();

}


function aplicarTemaInicial() {

    if (
        estado.modoOscuro
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    aplicarTema();

}


/* =========================================================
   TOAST
   ========================================================= */

function mostrarToast(
    mensaje
) {

    const container =
        document.getElementById(
            "toastContainer"
        );


    if (!container) return;


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        mensaje;


    container.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },

        3000
    );

}


/* =========================================================
   ACTUALIZACIÓN GENERAL
   ========================================================= */

function actualizarTodo() {

    actualizarXP();

    actualizarLlaves();

    actualizarMonedas();

    actualizarRacha();

    actualizarPerfil();

    actualizarBotonesTema();


    const continueLesson =
        document.getElementById(
            "continueLesson"
        );


    if (
        continueLesson
    ) {

        const siguiente =
            obtenerSiguienteLeccion();


        continueLesson.innerHTML = `

            <div>

                <small>
                    TU SIGUIENTE PASO
                </small>

                <h3>
                    ${
                        siguiente?.titulo ||
                        "Has completado todo"
                    }
                </h3>

                <p>
                    ${
                        siguiente?.descripcion ||
                        "Explora el laboratorio y la biblioteca."
                    }
                </p>

            </div>

            <button
                onclick="continuarAprendiendo()"
            >
                Continuar
            </button>

        `;

    }

}


function obtenerSiguienteLeccion() {

    for (
        let nivelIndex = 0;
        nivelIndex < niveles.length;
        nivelIndex++
    ) {

        for (
            let leccionIndex = 0;
            leccionIndex <
            niveles[nivelIndex].lecciones.length;
            leccionIndex++
        ) {

            const leccion =
                niveles[nivelIndex]
                    .lecciones[
                        leccionIndex
                    ];


            if (
                !estado.leccionesCompletadas.includes(
                    leccion.id
                ) &&
                leccionDesbloqueada(
                    nivelIndex,
                    leccionIndex
                )
            ) {

                return {

                    titulo:
                        leccion.titulo,

                    descripcion:
                        `Nivel ${niveles[nivelIndex].id} · ${niveles[nivelIndex].nombre}`

                };

            }

        }

    }


    return null;

}


/* =========================================================
   CONTADORES
   ========================================================= */

function actualizarContadores() {

    if (!estado.labUsos)
        estado.labUsos = 0;


    if (!estado.practicas)
        estado.practicas = 0;


    if (!estado.sugerenciasEnviadas)
        estado.sugerenciasEnviadas = 0;

}


/* =========================================================
   ARRANQUE
   ========================================================= */

async function manejarRegresoDeVerificacion(user) {

    if (errorVerificacion) {

        mostrarToast(
            "No se pudo verificar el enlace: " +
            decodeURIComponent(
                errorVerificacion.replace(/\+/g, " ")
            )
        );

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

        return;

    }


    if (!esRegresoDeVerificacion) return;


    if (user) {

        mostrarToast(
            "✅ ¡Tu correo fue verificado con éxito! Ya iniciaste sesión."
        );

        mostrarPagina("perfil");

    } else {

        mostrarToast(
            "✅ Tu correo fue verificado. Ya puedes iniciar sesión."
        );

    }


    history.replaceState(
        null,
        "",
        window.location.pathname
    );

}


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        actualizarContadores();

        aplicarTemaInicial();

        actualizarEstadoOnboarding();

        actualizarTodo();

        renderizarNiveles();

        renderizarBiblioteca();

        comprobarLogros();


        if (
            supabaseClient
        ) {

            const user =
                await obtenerUsuarioActual();


            if (user) {

                await cargarPerfilSupabase(
                    user
                );

            }


            await manejarRegresoDeVerificacion(
                user
            );

        }


        mostrarTutorialSiHaceFalta();


        if (
            estado.tutorialVisto &&
            (
                !estado.encuestaTerminada ||
                !estado.diagnosticoTerminado
            )
        ) {

            setTimeout(
                iniciarOnboarding,
                300
            );

        }


        revisarRachaEnRiesgo();


        setInterval(
            actualizarLlaves,
            30000
        );


        setInterval(
            guardarEstado,
            10000
        );

    }
);
