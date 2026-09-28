/*
 * LuaDrix
 * Aprende Lua 5.5 jugando.
 */

const STORAGE = "luadrix_v2";

const defaultData = {
    xp: 0,
    monedas: 0,
    vidas: 5,
    maxVidas: 5,

    racha: 0,
    ultimaActividad: null,

    protectores: 0,
    maxProtectores: 2,

    completadas: [],
    logros: [],

    tema: "verde",
    oscuro: false,

    leccionActual: 0
};

let data = cargarDatos();
let currentLesson = null;
let currentStep = 0;


/* =========================
   LECCIONES
========================= */

const levels = [

{
    id:1,
    name:"Primeros pasos",
    desc:"Conoce Lua y aprende a mostrar información.",
    lessons:[

        {
            id:"l1",
            title:"Tu primer print",
            concept:"print()",
            explanation:[
                "Cuando programas, necesitas una forma de decirle al programa que muestre información.",
                "En Lua usamos la función print().",
                "Lo que escribas dentro de los paréntesis aparecerá como resultado."
            ],
            code:'print("Hola, LuaDrix!")',
            questions:[
                {
                    q:"¿Qué función usamos para mostrar texto?",
                    options:["print()","show()","write()"],
                    answer:0
                }
            ],
            challenge:'Escribe un programa que muestre exactamente "Hola Lua".',
            check:/print\s*\(\s*["']Hola Lua["']\s*\)/i
        },

        {
            id:"l2",
            title:"Variables",
            concept:"local",
            explanation:[
                "Una variable es como una pequeña caja donde guardamos información.",
                "En Lua podemos crear variables locales usando la palabra local.",
                "Después podemos utilizar el nombre de la variable para recuperar su valor."
            ],
            code:'local nombre = "Angel"\nprint(nombre)',
            questions:[
                {
                    q:"¿Qué palabra se usa para crear una variable local?",
                    options:["local","var","let"],
                    answer:0
                }
            ],
            challenge:'Crea una variable local llamada nombre y guarda en ella "Lua".',
            check:/local\s+nombre\s*=\s*["']Lua["']/i
        },

        {
            id:"l3",
            title:"Números y tipos",
            concept:"type()",
            explanation:[
                "Lua puede trabajar con diferentes tipos de valores.",
                "Los números son uno de ellos.",
                "La función type() permite descubrir qué tipo de dato tenemos."
            ],
            code:'local edad = 13\nprint(type(edad))',
            questions:[
                {
                    q:"¿Qué devuelve type(123)?",
                    options:["number","string","boolean"],
                    answer:0
                }
            ],
            challenge:'Crea una variable edad con un número y muestra type(edad).',
            check:/local\s+edad\s*=\s*\d[\s\S]*print\s*\(\s*type\s*\(\s*edad\s*\)\s*\)/i
        },

        {
            id:"l4",
            title:"Booleanos",
            concept:"true / false",
            explanation:[
                "Los booleanos representan dos estados.",
                "En Lua son true y false.",
                "Son especialmente útiles cuando necesitamos tomar decisiones."
            ],
            code:'local mayor = true\nprint(mayor)',
            questions:[
                {
                    q:"¿Cuáles son los valores booleanos de Lua?",
                    options:["true y false","yes y no","1 y 0"],
                    answer:0
                }
            ],
            challenge:'Crea una variable llamada terminado con el valor true.',
            check:/local\s+terminado\s*=\s*true/i
        },

        {
            id:"r1",
            title:"🔄 Repaso: primeros conceptos",
            review:true,
            concept:"Repaso",
            explanation:[
                "¡Hora de repasar!",
                "Ya conoces print, variables, números y booleanos.",
                "El objetivo de este repaso es comprobar que recuerdas las bases antes de continuar."
            ],
            code:'local nombre = "LuaDrix"\nlocal activo = true\nprint(nombre)\nprint(activo)',
            questions:[
                {
                    q:"¿Qué función muestra información?",
                    options:["print()","type()","local"],
                    answer:0
                },
                {
                    q:"¿Cuál de estos es un booleano?",
                    options:["true","Lua","123"],
                    answer:0
                }
            ],
            challenge:'Crea una variable local llamada puntos con el número 10 y muéstrala con print().',
            check:/local\s+puntos\s*=\s*10[\s\S]*print\s*\(\s*puntos\s*\)/i
        }
    ]
},

{
    id:2,
    name:"Tomando decisiones",
    desc:"Aprende a hacer que tus programas decidan.",
    lessons:[

        {
            id:"l5",
            title:"if",
            concept:"condicionales",
            explanation:[
                "Un programa puede tomar decisiones.",
                "La estructura if ejecuta código solamente cuando una condición es verdadera.",
                "El bloque termina con end."
            ],
            code:'local edad = 13\n\nif edad >= 13 then\n    print("Puedes continuar")\nend',
            questions:[
                {
                    q:"¿Qué palabra termina un if?",
                    options:["end","stop","endif"],
                    answer:0
                }
            ],
            challenge:'Crea un if que compruebe si edad >= 13 y muestre "Sí".',
            check:/if[\s\S]*edad\s*>=\s*13[\s\S]*then[\s\S]*print\s*\(["']Sí["']\)[\s\S]*end/i
        },

        {
            id:"l6",
            title:"else",
            concept:"if / else",
            explanation:[
                "A veces queremos hacer una cosa si la condición es verdadera y otra si es falsa.",
                "Para eso utilizamos else.",
                "Así podemos crear dos caminos diferentes."
            ],
            code:'local edad = 10\n\nif edad >= 13 then\n    print("Sí")\nelse\n    print("No")\nend',
            questions:[
                {
                    q:"¿Qué bloque se ejecuta cuando if es falso?",
                    options:["else","then","repeat"],
                    answer:0
                }
            ],
            challenge:'Haz un if/else que compruebe si edad >= 18.',
            check:/if[\s\S]*edad\s*>=\s*18[\s\S]*then[\s\S]*else[\s\S]*end/i
        },

        {
            id:"l7",
            title:"Comparaciones",
            concept:"== ~= > <",
            explanation:[
                "Las comparaciones producen true o false.",
                "Puedes comprobar igualdad con ==.",
                "También puedes comprobar si algo es mayor, menor o diferente."
            ],
            code:'local edad = 15\nprint(edad >= 13)',
            questions:[
                {
                    q:"¿Qué operador significa igual a?",
                    options:["==","=","!="],
                    answer:0
                }
            ],
            challenge:'Crea una comparación que compruebe si numero es mayor que 10.',
            check:/numero\s*>\s*10/i
        },

        {
            id:"l8",
            title:"elseif",
            concept:"elseif",
            explanation:[
                "Cuando existen más de dos posibilidades podemos usar elseif.",
                "Lua revisará las condiciones de arriba hacia abajo.",
                "El primer bloque verdadero será el que se ejecute."
            ],
            code:'local nota = 8\n\nif nota >= 9 then\n    print("Excelente")\nelseif nota >= 6 then\n    print("Bien")\nelse\n    print("A estudiar")\nend',
            questions:[
                {
                    q:"¿Qué palabra permite añadir otra condición?",
                    options:["elseif","another","nextif"],
                    answer:0
                }
            ],
            challenge:'Escribe un if con una condición y al menos un elseif.',
            check:/if[\s\S]*then[\s\S]*elseif[\s\S]*then[\s\S]*end/i
        },

        {
            id:"r2",
            title:"🔄 Repaso: decisiones",
            review:true,
            concept:"Repaso",
            explanation:[
                "Antes de continuar, repasemos las decisiones.",
                "Recuerda que las comparaciones producen true o false.",
                "if, elseif y else nos permiten controlar el camino que sigue nuestro programa."
            ],
            code:'local puntos = 80\n\nif puntos >= 100 then\n    print("Perfecto")\nelseif puntos >= 50 then\n    print("Bien")\nelse\n    print("Sigue practicando")\nend',
            questions:[
                {
                    q:"¿Qué palabra añade una condición alternativa?",
                    options:["elseif","repeat","local"],
                    answer:0
                }
            ],
            challenge:'Crea un if que muestre "Ganaste" cuando puntos >= 100.',
            check:/if[\s\S]*puntos\s*>=\s*100[\s\S]*then[\s\S]*print\s*\(["']Ganaste["']\)[\s\S]*end/i
        }
    ]
},

{
    id:3,
    name:"Repeticiones",
    desc:"Haz que Lua repita instrucciones.",
    lessons:[

        {
            id:"l9",
            title:"for",
            concept:"for",
            explanation:[
                "Los bucles permiten repetir código.",
                "Un for numérico puede recorrer un rango de números.",
                "Es muy útil cuando conocemos cuántas veces queremos repetir algo."
            ],
            code:'for i = 1, 5 do\n    print(i)\nend',
            questions:[
                {
                    q:"¿Qué palabra abre el bloque de un for?",
                    options:["do","then","repeat"],
                    answer:0
                }
            ],
            challenge:'Escribe un for que imprima del 1 al 5.',
            check:/for\s+\w+\s*=\s*1\s*,\s*5\s*do[\s\S]*print[\s\S]*end/i
        },

        {
            id:"l10",
            title:"while",
            concept:"while",
            explanation:[
                "while repite un bloque mientras una condición sea verdadera.",
                "Debes tener cuidado de modificar la condición para evitar bucles infinitos."
            ],
            code:'local n = 1\n\nwhile n <= 3 do\n    print(n)\n    n = n + 1\nend',
            questions:[
                {
                    q:"¿Cuándo se repite while?",
                    options:["Mientras la condición sea verdadera","Solo una vez","Nunca"],
                    answer:0
                }
            ],
            challenge:'Crea un while que cuente del 1 al 3.',
            check:/while[\s\S]*<=\s*3[\s\S]*do[\s\S]*n\s*=\s*n\s*\+\s*1[\s\S]*end/i
        },

        {
            id:"l11",
            title:"repeat until",
            concept:"repeat",
            explanation:[
                "repeat ... until es otro tipo de bucle.",
                "A diferencia de while, primero ejecuta el bloque y después comprueba la condición."
            ],
            code:'local n = 1\n\nrepeat\n    print(n)\n    n = n + 1\nuntil n > 3',
            questions:[
                {
                    q:"¿Cuándo comprueba repeat until la condición?",
                    options:["Al final","Antes de empezar","Nunca"],
                    answer:0
                }
            ],
            challenge:'Escribe un repeat ... until que aumente una variable n.',
            check:/repeat[\s\S]*until[\s\S]*/i
        },

        {
            id:"l12",
            title:"break",
            concept:"break",
            explanation:[
                "break permite salir inmediatamente de un bucle.",
                "Es útil cuando ya encontramos lo que buscábamos y no necesitamos continuar."
            ],
            code:'for i = 1, 10 do\n    if i == 5 then\n        break\n    end\n    print(i)\nend',
            questions:[
                {
                    q:"¿Qué hace break?",
                    options:["Sale del bucle","Reinicia el bucle","Crea una variable"],
                    answer:0
                }
            ],
            challenge:'Crea un bucle que utilice break.',
            check:/for[\s\S]*break[\s\S]*end/i
        },

        {
            id:"r3",
            title:"🔄 Repaso: bucles",
            review:true,
            concept:"Repaso",
            explanation:[
                "Los bucles son una de las herramientas más importantes de programación.",
                "Repasemos for, while y break antes de avanzar."
            ],
            code:'for i = 1, 10 do\n    if i == 6 then\n        break\n    end\n    print(i)\nend',
            questions:[
                {
                    q:"¿Qué instrucción detiene el bucle?",
                    options:["break","stop","exitloop"],
                    answer:0
                }
            ],
            challenge:'Escribe un for que recorra del 1 al 3.',
            check:/for\s+\w+\s*=\s*1\s*,\s*3\s*do[\s\S]*end/i
        }
    ]
},

{
    id:4,
    name:"Funciones",
    desc:"Crea bloques reutilizables.",
    lessons:[

        {
            id:"l13",
            title:"Crear funciones",
            concept:"function",
            explanation:[
                "Una función agrupa instrucciones.",
                "Esto permite reutilizar código sin copiarlo muchas veces.",
                "En Lua usamos function para definirla."
            ],
            code:'function saludar()\n    print("Hola")\nend\n\nsaludar()',
            questions:[
                {
                    q:"¿Cómo llamamos a una función llamada saludar?",
                    options:["saludar()","call saludar","run saludar"],
                    answer:0
                }
            ],
            challenge:'Crea una función llamada saludar que muestre "Hola".',
            check:/function\s+saludar\s*\(\s*\)[\s\S]*print\s*\(["']Hola["']\)[\s\S]*end/i
        },

        {
            id:"l14",
            title:"Parámetros",
            concept:"parámetros",
            explanation:[
                "Las funciones pueden recibir información.",
                "Esos valores se llaman parámetros.",
                "Así podemos crear funciones más flexibles."
            ],
            code:'function saludar(nombre)\n    print("Hola " .. nombre)\nend\n\nsaludar("Lua")',
            questions:[
                {
                    q:"¿Para qué sirven los parámetros?",
                    options:["Para recibir datos","Para cerrar funciones","Para borrar variables"],
                    answer:0
                }
            ],
            challenge:'Crea una función llamada sumar que reciba dos parámetros.',
            check:/function\s+sumar\s*\(\s*\w+\s*,\s*\w+\s*\)/i
        },

        {
            id:"l15",
            title:"return",
            concept:"return",
            explanation:[
                "Una función puede devolver un resultado.",
                "Para eso utilizamos return.",
                "Después podemos guardar ese resultado en una variable."
            ],
            code:'function sumar(a, b)\n    return a + b\nend\n\nlocal resultado = sumar(2, 3)\nprint(resultado)',
            questions:[
                {
                    q:"¿Qué palabra devuelve un resultado?",
                    options:["return","give","output"],
                    answer:0
                }
            ],
            challenge:'Crea una función sumar que devuelva a + b.',
            check:/function\s+sumar[\s\S]*return\s+a\s*\+\s*b[\s\S]*end/i
        },

        {
            id:"l16",
            title:"Funciones anónimas",
            concept:"function()",
            explanation:[
                "Lua también permite guardar funciones dentro de variables.",
                "Estas funciones no necesitan tener un nombre propio.",
                "Son muy útiles cuando trabajamos con otras funciones."
            ],
            code:'local saludar = function()\n    print("Hola")\nend\n\nsaludar()',
            questions:[
                {
                    q:"¿Dónde podemos guardar una función?",
                    options:["En una variable","Solo en una tabla","No se puede"],
                    answer:0
                }
            ],
            challenge:'Guarda una función dentro de una variable llamada mensaje.',
            check:/local\s+mensaje\s*=\s*function/i
        },

        {
            id:"r4",
            title:"🔄 Repaso: funciones",
            review:true,
            concept:"Repaso",
            explanation:[
                "Las funciones permiten dividir programas grandes en partes pequeñas.",
                "Recuerda: pueden recibir parámetros y devolver valores."
            ],
            code:'function doble(numero)\n    return numero * 2\nend\n\nprint(doble(5))',
            questions:[
                {
                    q:"¿Qué palabra devuelve un valor?",
                    options:["return","print","local"],
                    answer:0
                }
            ],
            challenge:'Crea una función llamada doble que devuelva numero * 2.',
            check:/function\s+doble[\s\S]*return\s+numero\s*\*\s*2[\s\S]*end/i
        }
    ]
},

{
    id:5,
    name:"Tablas y texto",
    desc:"Trabaja con colecciones y cadenas.",
    lessons:[

        {
            id:"l17",
            title:"Tablas",
            concept:"table",
            explanation:[
                "Las tablas son una de las estructuras de datos más importantes de Lua.",
                "Pueden guardar varios valores.",
                "Se crean normalmente usando llaves."
            ],
            code:'local frutas = {"manzana", "pera", "uva"}\nprint(frutas[1])',
            questions:[
                {
                    q:"¿Cómo se crea normalmente una tabla?",
                    options:["{}","[]","()"],
                    answer:0
                }
            ],
            challenge:'Crea una tabla llamada frutas con tres elementos.',
            check:/local\s+frutas\s*=\s*\{[\s\S]*,[\s\S]*,[\s\S]*\}/i
        },

        {
            id:"l18",
            title:"Índices de tablas",
            concept:"tabla[1]",
            explanation:[
                "Los elementos de una tabla se pueden consultar mediante índices.",
                "En Lua, los índices de las listas suelen comenzar en 1."
            ],
            code:'local colores = {"rojo", "verde", "azul"}\nprint(colores[1])',
            questions:[
                {
                    q:"¿Cuál es normalmente el primer índice de una lista Lua?",
                    options:["1","0","-1"],
                    answer:0
                }
            ],
            challenge:'Crea una tabla numeros y muestra su primer elemento.',
            check:/local\s+numeros\s*=\s*\{[\s\S]*\}[\s\S]*print\s*\(\s*numeros\s*\[\s*1\s*\]/i
        },

        {
            id:"l19",
            title:"Strings",
            concept:"strings",
            explanation:[
                "Los strings representan texto.",
                "Lua permite unir strings utilizando ..",
                "Esto se conoce como concatenación."
            ],
            code:'local nombre = "Lua"\nprint("Hola " .. nombre)',
            questions:[
                {
                    q:"¿Qué operador une strings?",
                    options:["..","+","&&"],
                    answer:0
                }
            ],
            challenge:'Une "Hola " con una variable llamada nombre usando ...',
            check:/Hola[\s\S]*\.\.[\s\S]*nombre/i
        },

        {
            id:"l20",
            title:"Longitud de texto",
            concept:"#",
            explanation:[
                "El operador # puede utilizarse para obtener la longitud de un string.",
                "También se utiliza frecuentemente con listas."
            ],
            code:'local texto = "LuaDrix"\nprint(#texto)',
            questions:[
                {
                    q:"¿Qué operador usamos para obtener una longitud?",
                    options:["#","@","$"],
                    answer:0
                }
            ],
            challenge:'Crea un string llamado texto y muestra su longitud con #texto.',
            check:/print\s*\(\s*#\s*texto\s*\)/i
        },

        {
            id:"r5",
            title:"🔄 Repaso: tablas y strings",
            review:true,
            concept:"Repaso",
            explanation:[
                "Ya conoces dos herramientas fundamentales.",
                "Las tablas almacenan datos y los strings representan texto.",
                "Ahora combinaremos ambas ideas."
            ],
            code:'local juegos = {"LuaDrix", "Roblox", "Otro"}\nprint("Estoy jugando a " .. juegos[1])',
            questions:[
                {
                    q:"¿Qué operador concatena texto?",
                    options:["..","==","=>"],
                    answer:0
                }
            ],
            challenge:'Crea una tabla llamada nombres y muestra su primer elemento.',
            check:/local\s+nombres\s*=\s*\{[\s\S]*\}[\s\S]*print\s*\(\s*nombres\s*\[\s*1\s*\]/i
        }
    ]
},

{
    id:6,
    name:"Lua intermedio",
    desc:"Empieza a trabajar con conceptos más avanzados.",
    lessons:[

        {
            id:"l21",
            title:"Tablas con claves",
            concept:"clave = valor",
            explanation:[
                "Una tabla también puede funcionar como diccionario.",
                "En lugar de usar solo índices numéricos podemos utilizar claves."
            ],
            code:'local jugador = {\n    nombre = "LuaDrix",\n    nivel = 1\n}\n\nprint(jugador.nombre)',
            questions:[
                {
                    q:"¿Qué puede contener una tabla?",
                    options:["Claves y valores","Solo números","Solo strings"],
                    answer:0
                }
            ],
            challenge:'Crea una tabla jugador con una clave nombre.',
            check:/local\s+jugador\s*=\s*\{[\s\S]*nombre\s*=/i
        },

        {
            id:"l22",
            title:"pairs",
            concept:"pairs()",
            explanation:[
                "pairs permite recorrer las claves y valores de una tabla.",
                "Es muy útil cuando no conocemos de antemano todas las claves."
            ],
            code:'local jugador = {nombre="Lua", nivel=5}\n\nfor clave, valor in pairs(jugador) do\n    print(clave, valor)\nend',
            questions:[
                {
                    q:"¿Qué función usamos para recorrer claves de una tabla?",
                    options:["pairs()","each()","loop()"],
                    answer:0
                }
            ],
            challenge:'Recorre una tabla usando pairs().',
            check:/for[\s\S]*pairs\s*\(/i
        },

        {
            id:"l23",
            title:"ipairs",
            concept:"ipairs()",
            explanation:[
                "ipairs se utiliza para recorrer secuencias numéricas de una tabla.",
                "Es especialmente útil para listas ordenadas."
            ],
            code:'local frutas = {"manzana", "pera", "uva"}\n\nfor i, fruta in ipairs(frutas) do\n    print(i, fruta)\nend',
            questions:[
                {
                    q:"¿Para qué sirve ipairs?",
                    options:["Recorrer secuencias","Crear funciones","Comparar strings"],
                    answer:0
                }
            ],
            challenge:'Usa ipairs para recorrer una tabla llamada frutas.',
            check:/ipairs\s*\(\s*frutas\s*\)/i
        },

        {
            id:"l24",
            title:"Módulos básicos",
            concept:"require",
            explanation:[
                "Lua permite dividir programas en diferentes módulos.",
                "require() permite cargar un módulo."
            ],
            code:'local modulo = require("mi_modulo")',
            questions:[
                {
                    q:"¿Qué función se usa normalmente para cargar módulos?",
                    options:["require()","import()","include()"],
                    answer:0
                }
            ],
            challenge:'Escribe una línea que use require para cargar un módulo.',
            check:/require\s*\(/i
        },

        {
            id:"r6",
            title:"🔄 Repaso: Lua intermedio",
            review:true,
            concept:"Repaso",
            explanation:[
                "Has llegado a una parte más avanzada.",
                "Repasa tablas, pairs, ipairs y módulos antes de seguir."
            ],
            code:'local datos = {nombre="Lua", nivel=5}\n\nfor clave, valor in pairs(datos) do\n    print(clave, valor)\nend',
            questions:[
                {
                    q:"¿Qué usamos para cargar módulos?",
                    options:["require()","module()","load()"],
                    answer:0
                }
            ],
            challenge:'Escribe un for que utilice pairs(datos).',
            check:/for[\s\S]*pairs\s*\(\s*datos\s*\)/i
        }
    ]
},

{
    id:7,
    name:"Errores y seguridad",
    desc:"Aprende a controlar errores.",
    lessons:[

        {
            id:"l25",
            title:"pcall",
            concept:"pcall",
            explanation:[
                "Los programas pueden encontrarse con errores.",
                "pcall permite ejecutar una función de manera protegida.",
                "Esto ayuda a evitar que un error detenga todo el programa."
            ],
            code:'local ok, resultado = pcall(function()\n    return 10 + 5\nend)\n\nprint(ok, resultado)',
            questions:[
                {
                    q:"¿Para qué sirve pcall?",
                    options:["Proteger una llamada","Crear una tabla","Crear un bucle"],
                    answer:0
                }
            ],
            challenge:'Escribe un ejemplo que utilice pcall.',
            check:/pcall\s*\(/i
        },

        {
            id:"l26",
            title:"error",
            concept:"error()",
            explanation:[
                "Lua permite generar errores manualmente utilizando error().",
                "Esto resulta útil cuando una condición no es válida."
            ],
            code:'local edad = -1\n\nif edad < 0 then\n    error("Edad inválida")\nend',
            questions:[
                {
                    q:"¿Qué función genera un error?",
                    options:["error()","fail()","stop()"],
                    answer:0
                }
            ],
            challenge:'Escribe una llamada a error() con un mensaje.',
            check:/error\s*\(/i
        },

        {
            id:"l27",
            title:"nil",
            concept:"nil",
            explanation:[
                "nil representa la ausencia de un valor.",
                "Es importante entenderlo porque aparece frecuentemente cuando buscamos datos que no existen."
            ],
            code:'local jugador = nil\nprint(jugador)',
            questions:[
                {
                    q:"¿Qué representa nil?",
                    options:["Ausencia de valor","Un número","Un string"],
                    answer:0
                }
            ],
            challenge:'Crea una variable llamada resultado con valor nil.',
            check:/local\s+resultado\s*=\s*nil/i
        },

        {
            id:"l28",
            title:"Validar datos",
            concept:"type + if",
            explanation:[
                "Podemos combinar type() con if para validar información.",
                "Esto permite comprobar que recibimos el tipo de dato esperado."
            ],
            code:'local edad = 15\n\nif type(edad) == "number" then\n    print("Correcto")\nend',
            questions:[
                {
                    q:"¿Qué podemos combinar para validar tipos?",
                    options:["type() e if","for y print","table y repeat"],
                    answer:0
                }
            ],
            challenge:'Comprueba con type() e if que una variable es number.',
            check:/if[\s\S]*type\s*\([\s\S]*\)[\s\S]*==\s*["']number["']/i
        },

        {
            id:"r7",
            title:"🔄 Repaso: errores",
            review:true,
            concept:"Repaso",
            explanation:[
                "Controlar errores hace que nuestros programas sean más resistentes.",
                "Repasa pcall, error y nil."
            ],
            code:'local ok, resultado = pcall(function()\n    return 5 + 5\nend)\n\nif ok then\n    print(resultado)\nend',
            questions:[
                {
                    q:"¿Qué función ejecuta una operación de forma protegida?",
                    options:["pcall()","safe()","protect()"],
                    answer:0
                }
            ],
            challenge:'Crea un ejemplo que utilice pcall().',
            check:/pcall\s*\(/i
        }
    ]
},

{
    id:8,
    name:"Más allá",
    desc:"Conoce herramientas avanzadas de Lua.",
    lessons:[

        {
            id:"l29",
            title:"Metatables",
            concept:"setmetatable",
            explanation:[
                "Las metatables permiten cambiar o ampliar el comportamiento de las tablas.",
                "Son una de las características más poderosas de Lua."
            ],
            code:'local objeto = {}\nlocal meta = {}\n\nsetmetatable(objeto, meta)',
            questions:[
                {
                    q:"¿Qué función asigna una metatable?",
                    options:["setmetatable()","settable()","metatable()"],
                    answer:0
                }
            ],
            challenge:'Escribe una llamada a setmetatable().',
            check:/setmetatable\s*\(/i
        },

        {
            id:"l30",
            title:"__index",
            concept:"__index",
            explanation:[
                "__index es uno de los metamétodos más utilizados.",
                "Puede indicar dónde buscar un valor cuando no existe directamente en una tabla."
            ],
            code:'local base = {vida = 100}\nlocal jugador = {}\n\nsetmetatable(jugador, {__index = base})',
            questions:[
                {
                    q:"¿Qué metamétodo aparece en el ejemplo?",
                    options:["__index","__value","__table"],
                    answer:0
                }
            ],
            challenge:'Crea una tabla con una clave __index.',
            check:/__index\s*=/i
        },

        {
            id:"l31",
            title:"Coroutines",
            concept:"coroutine",
            explanation:[
                "Las coroutines permiten crear funciones que pueden suspenderse y continuar después.",
                "Son una herramienta avanzada de Lua."
            ],
            code:'local co = coroutine.create(function()\n    print("Hola")\nend)\n\ncoroutine.resume(co)',
            questions:[
                {
                    q:"¿Qué función crea una coroutine?",
                    options:["coroutine.create()","coroutine.new()","createCoroutine()"],
                    answer:0
                }
            ],
            challenge:'Crea una coroutine usando coroutine.create().',
            check:/coroutine\.create\s*\(/i
        },

        {
            id:"l32",
            title:"Proyecto final",
            concept:"integración",
            explanation:[
                "Ahora puedes combinar lo que has aprendido.",
                "Un buen programa no depende de una sola característica.",
                "Combina variables, tablas, funciones, condiciones y bucles para construir algo propio."
            ],
            code:'local jugador = {\n    nombre = "LuaDrix",\n    puntos = 0\n}\n\nfunction ganarPuntos(cantidad)\n    jugador.puntos = jugador.puntos + cantidad\nend\n\nganarPuntos(10)\nprint(jugador.nombre, jugador.puntos)',
            questions:[
                {
                    q:"¿Qué conviene hacer en un proyecto grande?",
                    options:["Combinar varios conceptos","Usar solo print","No usar funciones"],
                    answer:0
                }
            ],
            challenge:'Crea un pequeño programa que use una variable, una función y una condición.',
            check:/local[\s\S]*function[\s\S]*if[\s\S]*end/i
        },

        {
            id:"r8",
            title:"🏆 Repaso final",
            review:true,
            concept:"Repaso final",
            explanation:[
                "¡Llegaste al repaso final!",
                "No necesitas memorizar todo de una vez.",
                "Lo importante es entender cómo funcionan las herramientas y seguir practicando."
            ],
            code:'local puntos = 100\n\nfunction comprobar()\n    if puntos >= 100 then\n        print("LuaDrix completado")\n    end\nend\n\ncomprobar()',
            questions:[
                {
                    q:"¿Cuál es la mejor forma de aprender programación?",
                    options:["Practicar y comprender los conceptos","Memorizar todo","No escribir código"],
                    answer:0
                }
            ],
            challenge:'Crea tu propio pequeño programa en Lua combinando varios conceptos.',
            check:/function[\s\S]*if[\s\S]*end/i
        }
    ]
}

];


/* =========================
   UTILIDADES
========================= */

function cargarDatos(){

    try{

        const saved = JSON.parse(localStorage.getItem(STORAGE));

        if(saved){
            return {...defaultData,...saved};
        }

    }catch(e){
        console.warn(e);
    }

    return {...defaultData};
}


function guardarDatos(){
    localStorage.setItem(STORAGE,JSON.stringify(data));
}


function todasLasLecciones(){

    return levels.flatMap(level => level.lessons);

}


function leccionIndex(){

    return todasLasLecciones().findIndex(
        lesson => !data.completadas.includes(lesson.id)
    );

}


function obtenerNivelActual(){

    const index = leccionIndex();

    if(index < 0){
        return todasLasLecciones().length;
    }

    return index + 1;

}


/* =========================
   NAVEGACIÓN
========================= */

function mostrarPantalla(id){

    document.querySelectorAll(".pantalla").forEach(
        x => x.classList.remove("activa")
    );

    const screen = document.getElementById(id);

    if(screen){
        screen.classList.add("activa");
    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    if(id === "niveles"){
        renderLevels();
    }

    if(id === "tienda"){
        renderTienda();
    }

    if(id === "logros"){
        renderLogros();
    }

    if(id === "perfil"){
        renderPerfil();
    }

    if(id === "biblioteca"){
        renderBiblioteca();
    }

}


function volverInicio(){
    mostrarPantalla("inicio");
    actualizarUI();
}


function continuarAprendiendo(){

    const index = leccionIndex();

    if(index === -1){
        mostrarPantalla("niveles");
        return;
    }

    abrirLeccion(todasLasLecciones()[index]);

}


/* =========================
   PROGRESO
========================= */

function actualizarUI(){

    const total = todasLasLecciones().length;
    const completed = data.completadas.length;

    const nivel = Math.floor(data.xp / 100) + 1;
    const xpActual = data.xp % 100;

    document.getElementById("nivelTexto").textContent =
        "Nivel " + nivel;

    document.getElementById("xpTexto").textContent =
        xpActual + " / 100 EXP";

    document.getElementById("xpBarra").style.width =
        xpActual + "%";

    document.getElementById("rachaTexto").textContent =
        data.racha + " días";

    document.getElementById("energiaTexto").textContent =
        data.vidas + " / " + data.maxVidas;

    document.getElementById("monedasTexto").textContent =
        data.monedas;

    const next = todasLasLecciones()[leccionIndex()];

    const card = document.getElementById("continuarCard");

    if(!next){

        card.innerHTML = `
            <h3>🎉 ¡Completaste LuaDrix!</h3>
            <p>Has terminado todas las lecciones disponibles.</p>
            <button onclick="mostrarPantalla('logros')">
                Ver logros
            </button>
        `;

    }else{

        card.innerHTML = `
            <h3>Continúa aprendiendo</h3>
            <p>
                Siguiente: <strong>${escapeHTML(next.title)}</strong>
            </p>
            <button onclick="abrirLeccionPorId('${next.id}')">
                Continuar
            </button>
        `;

    }

    renderHomeLevels();

}


function ganarXP(cantidad){

    data.xp += cantidad;

    guardarDatos();
    actualizarUI();

}


/* =========================
   RACHAS
========================= */

function actualizarRacha(){

    const today = new Date().toISOString().slice(0,10);

    if(!data.ultimaActividad){

        data.racha = 1;
        data.ultimaActividad = today;
        guardarDatos();
        return;

    }

    if(data.ultimaActividad === today){
        return;
    }

    const previous = new Date(data.ultimaActividad);
    const current = new Date(today);

    const difference =
        Math.floor((current - previous) / 86400000);

    if(difference === 1){

        data.racha++;

    }else if(difference > 1){

        if(data.protectores > 0){

            data.protectores--;
            data.racha++;

        }else{

            data.racha = 1;

        }

    }

    data.ultimaActividad = today;

    guardarDatos();

}


/* =========================
   NIVELES
========================= */

function renderHomeLevels(){

    const container = document.getElementById("homeLevels");

    if(!container) return;

    container.innerHTML = "";

    levels.forEach((level,index)=>{

        const previous =
            index === 0 ||
            levels[index-1].lessons.every(
                l => data.completadas.includes(l.id)
            );

        const completed =
            level.lessons.filter(
                l => data.completadas.includes(l.id)
            ).length;

        const div = document.createElement("div");

        div.className =
            "level-card " + (!previous ? "locked" : "");

        div.innerHTML = `
            <div class="level-main">
                <div class="level-number">${level.id}</div>

                <div>
                    <h3>${escapeHTML(level.name)}</h3>
                    <p>${escapeHTML(level.desc)}</p>
                </div>
            </div>

            <div class="level-progress">
                <small>${completed}/${level.lessons.length}</small>
                <div class="xp-track">
                    <i style="width:${(completed/level.lessons.length)*100}%"></i>
                </div>
            </div>

            <button
                ${!previous ? "disabled" : ""}
                onclick="abrirNivel(${level.id})"
            >
                ${previous ? "Abrir" : "🔒 Bloqueado"}
            </button>
        `;

        container.appendChild(div);

    });

}


function renderLevels(){

    const container = document.getElementById("levelsPage");

    if(!container) return;

    container.innerHTML = "";

    levels.forEach((level,index)=>{

        const unlocked =
            index === 0 ||
            levels[index-1].lessons.every(
                l => data.completadas.includes(l.id)
            );

        const completed =
            level.lessons.filter(
                l => data.completadas.includes(l.id)
            ).length;

        const card = document.createElement("div");

        card.className =
            "level-card " + (!unlocked ? "locked" : "");

        card.innerHTML = `
            <div class="level-main">
                <div class="level-number">${level.id}</div>

                <div>
                    <h3>${escapeHTML(level.name)}</h3>
                    <p>${escapeHTML(level.desc)}</p>
                    <small>${completed}/${level.lessons.length} lecciones</small>
                </div>
            </div>

            <button
                ${!unlocked ? "disabled" : ""}
                onclick="abrirNivel(${level.id})"
            >
                ${unlocked ? "Entrar" : "🔒"}
            </button>
        `;

        container.appendChild(card);

    });

}


function abrirNivel(id){

    const level = levels.find(x => x.id === id);

    if(!level) return;

    const firstIncomplete =
        level.lessons.find(
            l => !data.completadas.includes(l.id)
        );

    abrirLeccion(
        firstIncomplete || level.lessons[0]
    );

}


/* =========================
   LECCIONES
========================= */

function abrirLeccionPorId(id){

    const lesson = todasLasLecciones().find(
        l => l.id === id
    );

    if(lesson){
        abrirLeccion(lesson);
    }

}


function abrirLeccion(lesson){

    currentLesson = lesson;
    currentStep = 0;

    mostrarPantalla("leccion");

    renderLeccion();

}


function renderLeccion(){

    if(!currentLesson) return;

    document.getElementById("lessonTitle").textContent =
        currentLesson.title;

    document.getElementById("lessonLevel").textContent =
        currentLesson.concept;

    document.getElementById("lessonProgress").textContent =
        currentLesson.review
            ? "Repaso"
            : "Lección nueva";

    const body =
        document.getElementById("lessonBody");

    const steps = currentLesson.explanation;

    let html = `

        <div class="lesson-stepper">

            <div>
                <strong>Explicación</strong>
                <span>${currentStep+1}/${steps.length}</span>
            </div>

            <div class="step-track">
                <i style="width:${((currentStep+1)/steps.length)*100}%"></i>
            </div>

        </div>

        <article class="lesson-card">

            <h3>${escapeHTML(currentLesson.title)}</h3>

            <p>
                ${escapeHTML(steps[currentStep])}
            </p>

    `;

    if(currentStep === steps.length-1){

        html += `
            <h4>Ejemplo</h4>

            <pre class="code">${escapeHTML(currentLesson.code)}</pre>

            <button
                class="primary"
                onclick="mostrarPreguntas()"
                style="margin-top:18px;padding:11px 15px;border-radius:10px"
            >
                Continuar
            </button>
        `;

    }else{

        html += `
            <div class="step-actions">

                <button
                    ${currentStep===0 ? "disabled" : ""}
                    onclick="pasoAnterior()"
                >
                    ← Anterior
                </button>

                <button
                    class="primary"
                    onclick="pasoSiguiente()"
                >
                    Siguiente →
                </button>

            </div>
        `;

    }

    html += `</article>`;

    body.innerHTML = html;

}


function pasoSiguiente(){

    if(currentStep < currentLesson.explanation.length-1){

        currentStep++;
        renderLeccion();

    }

}


function pasoAnterior(){

    if(currentStep > 0){

        currentStep--;
        renderLeccion();

    }

}


function mostrarPreguntas(){

    const body =
        document.getElementById("lessonBody");

    let html = `
        <article class="lesson-card">
            <h3>🧠 Comprueba lo que aprendiste</h3>
            <p>Responde las preguntas antes del reto.</p>
    `;

    currentLesson.questions.forEach((q,index)=>{

        html += `
            <div class="question-card">

                <strong>
                    ${index+1}. ${escapeHTML(q.q)}
                </strong>

                <div class="options">
        `;

        q.options.forEach((option,optIndex)=>{

            html += `
                <button
                    class="option"
                    onclick="responderPregunta(
                        ${index},
                        ${optIndex},
                        this
                    )"
                >
                    ${escapeHTML(option)}
                </button>
            `;

        });

        html += `
                </div>

                <div
                    id="questionFeedback${index}"
                    class="feedback"
                ></div>

            </div>
        `;

    });

    html += `
        <button
            class="primary"
            onclick="mostrarReto()"
            style="padding:11px 15px;border-radius:10px"
        >
            Ir al reto →
        </button>

        </article>
    `;

    body.innerHTML = html;

}


function responderPregunta(questionIndex,answer,button){

    const question =
        currentLesson.questions[questionIndex];

    const feedback =
        document.getElementById(
            "questionFeedback"+questionIndex
        );

    if(answer === question.answer){

        button.classList.add("correcta");

        feedback.className =
            "feedback good show";

        feedback.textContent =
            "✅ ¡Correcto!";

        data.monedas += 5;
        guardarDatos();
        actualizarUI();

    }else{

        button.classList.add("incorrecta");

        feedback.className =
            "feedback bad show";

        feedback.textContent =
            "❌ Casi. Piensa en lo explicado anteriormente.";

    }

}


function mostrarReto(){

    const body =
        document.getElementById("lessonBody");

    body.innerHTML = `

        <article class="lesson-card challenge">

            <h3>💻 Reto práctico</h3>

            <p>
                ${escapeHTML(currentLesson.challenge)}
            </p>

            <textarea
                id="challengeCode"
                spellcheck="false"
                placeholder="Escribe tu código aquí..."
            ></textarea>

            <div class="challenge-actions">

                <button
                    class="primary"
                    onclick="comprobarReto()"
                >
                    Comprobar
                </button>

                <button onclick="mostrarPista()">
                    💡 Pista
                </button>

            </div>

            <div id="challengeFeedback" class="feedback"></div>

        </article>

    `;

}


function mostrarPista(){

    const feedback =
        document.getElementById("challengeFeedback");

    feedback.className =
        "feedback hint show";

    feedback.textContent =
        "💡 Piensa en el ejemplo que acabas de estudiar. Intenta escribirlo tú mismo antes de mirar una solución.";

}


function comprobarReto(){

    const code =
        document.getElementById("challengeCode").value;

    const feedback =
        document.getElementById("challengeFeedback");

    if(!data.vidas){

        feedback.className =
            "feedback bad show";

        feedback.textContent =
            "❤️ No tienes vidas. Puedes comprar una en la tienda.";

        return;

    }

    if(currentLesson.check.test(code)){

        if(!data.completadas.includes(currentLesson.id)){

            data.completadas.push(currentLesson.id);

            ganarXP(currentLesson.review ? 30 : 50);

            data.monedas += currentLesson.review ? 20 : 15;

            actualizarRacha();

            comprobarLogros();

            guardarDatos();

        }

        feedback.className =
            "feedback good show";

        feedback.textContent =
            "🎉 ¡Correcto! Has completado esta lección.";

        actualizarUI();

        setTimeout(()=>{

            const next =
                siguienteLeccion(currentLesson.id);

            if(next){

                abrirLeccion(next);

            }else{

                mostrarPantalla("niveles");

            }

        },1200);

    }else{

        data.vidas--;

        guardarDatos();
        actualizarUI();

        feedback.className =
            "feedback bad show";

        feedback.textContent =
            "❌ El reto todavía no está correcto. Has perdido una vida. Revisa la explicación e inténtalo otra vez.";

    }

}


function siguienteLeccion(id){

    const all = todasLasLecciones();

    const index =
        all.findIndex(x => x.id === id);

    if(index < 0 || index >= all.length-1){
        return null;
    }

    return all[index+1];

}


/* =========================
   TIENDA
========================= */

function renderTienda(){

    document.getElementById("shopCoins").textContent =
        data.monedas;

    document.getElementById("protectoresTexto").textContent =
        `Protectores: ${data.protectores}/${data.maxProtectores}`;

    document.getElementById("vidasTienda").textContent =
        `Vidas: ${data.vidas}/${data.maxVidas}`;

}


function comprarProtector(){

    if(data.protectores >= data.maxProtectores){

        alert("Ya tienes el máximo de 2 protectores.");

        return;
    }

    if(data.monedas < 100){

        alert("Necesitas 100 monedas.");

        return;
    }

    data.monedas -= 100;
    data.protectores++;

    guardarDatos();
    actualizarUI();
    renderTienda();

    alert("🔥 Protector de racha comprado.");

}


function comprarVida(){

    if(data.vidas >= data.maxVidas){

        alert("Ya tienes 5 vidas.");

        return;
    }

    if(data.monedas < 50){

        alert("Necesitas 50 monedas.");

        return;
    }

    data.monedas -= 50;
    data.vidas++;

    guardarDatos();
    actualizarUI();
    renderTienda();

    alert("❤️ Has comprado una vida.");

}


/* =========================
   TEMAS
========================= */

function equiparTema(theme){

    document.body.classList.remove(
        "theme-verde",
        "theme-azul",
        "theme-naranja",
        "theme-rosa"
    );

    if(theme !== "verde"){

        document.body.classList.add(
            "theme-"+theme
        );

    }

    data.tema = theme;

    guardarDatos();

}


function cargarTema(){

    if(data.tema && data.tema !== "verde"){

        document.body.classList.add(
            "theme-"+data.tema
        );

    }

}


/* =========================
   MODO OSCURO
========================= */

function alternarModo(){

    data.oscuro = !data.oscuro;

    document.body.classList.toggle(
        "dark",
        data.oscuro
    );

    guardarDatos();

}


/* =========================
   LOGROS
========================= */

const achievements = [

    {
        id:"primer",
        icon:"🌱",
        title:"Primer paso",
        description:"Completa tu primera lección.",
        check:()=>data.completadas.length >= 1
    },

    {
        id:"cinco",
        icon:"📚",
        title:"Estudiante",
        description:"Completa 5 lecciones.",
        check:()=>data.completadas.length >= 5
    },

    {
        id:"diez",
        icon:"🔥",
        title:"En racha",
        description:"Completa 10 lecciones.",
        check:()=>data.completadas.length >= 10
    },

    {
        id:"veinte",
        icon:"💻",
        title:"Programador Lua",
        description:"Completa 20 lecciones.",
        check:()=>data.completadas.length >= 20
    },

    {
        id:"repaso",
        icon:"🔄",
        title:"Repasador",
        description:"Completa 5 repasos.",
        check:()=>data.completadas.filter(
            id => id.startsWith("r")
        ).length >= 5
    },

    {
        id:"tienda",
        icon:"🛒",
        title:"Primer compra",
        description:"Compra un artículo en la tienda.",
        check:()=>data.monedas < 0
    },

    {
        id:"curso",
        icon:"🏆",
        title:"Maestro LuaDrix",
        description:"Completa todo el curso.",
        check:()=>data.completadas.length >= todasLasLecciones().length
    }

];


function comprobarLogros(){

    achievements.forEach(a=>{

        if(a.check() && !data.logros.includes(a.id)){

            data.logros.push(a.id);

            data.monedas += 25;

        }

    });

    guardarDatos();

}


function renderLogros(){

    const grid =
        document.getElementById("achievementsGrid");

    grid.innerHTML = "";

    achievements.forEach(a=>{

        const unlocked =
            data.logros.includes(a.id) ||
            a.check();

        const div =
            document.createElement("div");

        div.className =
            "achievement " +
            (unlocked ? "unlocked" : "locked");

        div.innerHTML = `

            <div class="icon">
                ${a.icon}
            </div>

            <b>
                ${escapeHTML(a.title)}
            </b>

            <small>
                ${escapeHTML(a.description)}
            </small>

            <p>
                ${unlocked ? "✅ Desbloqueado" : "🔒 Bloqueado"}
            </p>

        `;

        grid.appendChild(div);

    });

}


/* =========================
   PERFIL
========================= */

function renderPerfil(){

    const body =
        document.getElementById("profileBody");

    body.innerHTML = `

        <div class="profile-card">

            <h3>👤 Tu progreso</h3>

            <p>
                LuaDrix guarda tu progreso en este navegador.
            </p>

            <div class="profile-grid">

                <div class="profile-box">
                    <b>Lecciones</b>
                    <br>
                    ${data.completadas.length}/${todasLasLecciones().length}
                </div>

                <div class="profile-box">
                    <b>EXP</b>
                    <br>
                    ${data.xp}
                </div>

                <div class="profile-box">
                    <b>Monedas</b>
                    <br>
                    ${data.monedas}
                </div>

                <div class="profile-box">
                    <b>Racha</b>
                    <br>
                    🔥 ${data.racha} días
                </div>

                <div class="profile-box">
                    <b>Protectores</b>
                    <br>
                    🔥 ${data.protectores}/2
                </div>

                <div class="profile-box">
                    <b>Tema</b>
                    <br>
                    ${data.tema}
                </div>

            </div>

            <p style="margin-top:20px">
                💡 Puedes cambiar tus temas desde la tienda.
            </p>

        </div>

    `;

}


/* =========================
   BIBLIOTECA
========================= */

const library = [

    {
        title:"print()",
        text:"Muestra información.",
        code:'print("Hola")'
    },

    {
        title:"Variables",
        text:"Guarda información en variables locales.",
        code:'local nombre = "Lua"'
    },

    {
        title:"if",
        text:"Ejecuta código cuando una condición es verdadera.",
        code:'if edad >= 13 then\n    print("Sí")\nend'
    },

    {
        title:"for",
        text:"Repite código recorriendo un rango.",
        code:'for i = 1, 5 do\n    print(i)\nend'
    },

    {
        title:"function",
        text:"Crea funciones reutilizables.",
        code:'function hola()\n    print("Hola")\nend'
    },

    {
        title:"table",
        text:"Crea una tabla.",
        code:'local frutas = {"manzana", "pera"}'
    },

    {
        title:"pairs()",
        text:"Recorre claves y valores de una tabla.",
        code:'for k,v in pairs(tabla) do\nend'
    },

    {
        title:"type()",
        text:"Obtiene el tipo de un valor.",
        code:'print(type(valor))'
    },

    {
        title:"require()",
        text:"Carga módulos.",
        code:'local modulo = require("modulo")'
    },

    {
        title:"pcall()",
        text:"Ejecuta una función de forma protegida.",
        code:'local ok = pcall(funcion)'
    }

];


function renderBiblioteca(){

    const container =
        document.getElementById("libraryResults");

    if(!container) return;

    container.innerHTML = "";

    library.forEach(item=>{

        const div =
            document.createElement("article");

        div.className = "library-item";

        div.innerHTML = `

            <h3>${escapeHTML(item.title)}</h3>

            <p>${escapeHTML(item.text)}</p>

            <pre class="code">
${escapeHTML(item.code)}
            </pre>

        `;

        container.appendChild(div);

    });

}


function buscarBiblioteca(){

    const query =
        document.getElementById("librarySearch")
        .value
        .toLowerCase();

    const container =
        document.getElementById("libraryResults");

    container.innerHTML = "";

    library
        .filter(item =>
            (item.title+" "+item.text+" "+item.code)
            .toLowerCase()
            .includes(query)
        )
        .forEach(item=>{

            const div =
                document.createElement("article");

            div.className = "library-item";

            div.innerHTML = `

                <h3>${escapeHTML(item.title)}</h3>

                <p>${escapeHTML(item.text)}</p>

                <pre class="code">
${escapeHTML(item.code)}
                </pre>

            `;

            container.appendChild(div);

        });

}


/* =========================
   LABORATORIO
========================= */

function ejecutarLaboratorio(){

    const code =
        document.getElementById("labCode").value;

    const output =
        document.getElementById("labOutput");

    /*
     * El navegador no ejecuta Lua directamente.
     * Este modo reconoce algunos print() sencillos
     * para que el laboratorio siga siendo útil sin
     * introducir un intérprete externo.
     */

    const matches =
        [...code.matchAll(
            /print\s*\(\s*["']([^"']*)["']\s*\)/g
        )];

    if(matches.length){

        output.textContent =
            matches.map(x=>x[1]).join("\n");

        return;

    }

    if(/print\s*\(/i.test(code)){

        output.textContent =
            "El laboratorio detectó print(), pero este ejemplo necesita un intérprete Lua para ejecutarse completamente.";

    }else{

        output.textContent =
            "No se encontró una salida print() sencilla.";

    }

}


function limpiarLab(){

    document.getElementById("labCode").value = "";

    document.getElementById("labOutput").textContent =
        "La salida aparecerá aquí.";

}


/* =========================
   HTML SEGURO
========================= */

function escapeHTML(value){

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


/* =========================
   INICIO
========================= */

function iniciar(){

    cargarTema();

    document.body.classList.toggle(
        "dark",
        data.oscuro
    );

    actualizarRacha();

    comprobarLogros();

    actualizarUI();

    renderBiblioteca();

}


document.addEventListener(
    "DOMContentLoaded",
    iniciar
);
