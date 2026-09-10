/* =========================================================
   LUALEX — script.js
   Lua 5.5 — buscador, diccionario, quiz, progreso, etc.
   ========================================================= */

const temas = {
    condicionales: "Condicionales",
    booleanos: "Booleanos",
    bucles: "Bucles",
    funciones: "Funciones",
    tablas: "Tablas",
    strings: "Strings",
    operadores: "Operadores",
    variables: "Variables y alcance",
    tipos: "Tipos de datos",
    funcionesbasicas: "Funciones básicas",
    funcionesextras: "Librerías estándar",
    metatables: "Metatables",
    coroutines: "Coroutines",
    errores: "Errores y protección",
    modulos: "Módulos",
    avanzado: "Conceptos avanzados"
};

/* ==================== DICCIONARIO ==================== */

const conceptos = [
    ["if", "Condicionales", "Ejecuta un bloque cuando una condición es verdadera.", "if edad >= 18 then print('Adulto') end"],
    ["then", "Condicionales", "Indica el comienzo del bloque de un if o elseif.", "if listo then print('Sí') end"],
    ["elseif", "Condicionales", "Permite probar otra condición si la anterior no se cumplió.", "if x > 10 then print('A') elseif x > 5 then print('B') end"],
    ["else", "Condicionales", "Bloque que se ejecuta cuando ninguna condición anterior se cumple.", "if vivo then print('Sí') else print('No') end"],

    ["true", "Booleanos", "Valor booleano que representa verdadero.", "local activo = true"],
    ["false", "Booleanos", "Valor booleano que representa falso.", "local activo = false"],
    ["and", "Booleanos", "Devuelve un resultado basado en dos expresiones lógicas.", "if vida > 0 and activo then print('OK') end"],
    ["or", "Booleanos", "Permite combinar expresiones lógicas y elegir un valor alternativo.", "local nombre = dado or 'Sin nombre'"],
    ["not", "Booleanos", "Invierte el valor de verdad de una expresión.", "print(not false)"],

    ["while", "Bucles", "Repite un bloque mientras una condición sea verdadera.", "while x < 5 do x = x + 1 end"],
    ["repeat", "Bucles", "Inicia un bucle que se ejecuta al menos una vez.", "repeat x = x + 1 until x >= 5"],
    ["until", "Bucles", "Indica la condición de finalización de repeat.", "repeat print(x) until x == 0"],
    ["for numérico", "Bucles", "Repite usando un contador, límite y paso opcional.", "for i = 1, 10, 2 do print(i) end"],
    ["for genérico", "Bucles", "Recorre valores producidos por una función iteradora.", "for k, v in pairs(t) do print(k, v) end"],
    ["in", "Bucles", "Se usa en el for genérico para obtener el iterador y sus valores.", "for k, v in pairs(t) do end"],
    ["break", "Bucles", "Termina inmediatamente el bucle actual.", "for i = 1, 10 do if i == 5 then break end end"],
    ["goto", "Bucles", "Salta hacia una etiqueta dentro de un bloque permitido.", "goto continuar ::continuar:: print('OK')"],
    ["etiqueta", "Bucles", "Nombre precedido por :: que puede ser destino de goto.", "::inicio:: print('Hola')"],

    ["function", "Funciones", "Declara una función o representa una expresión de función.", "local function sumar(a, b) return a + b end"],
    ["return", "Funciones", "Devuelve valores desde una función o termina la ejecución de un chunk.", "local function doble(x) return x * 2 end"],
    ["parámetro", "Funciones", "Nombre local que recibe un argumento al llamar una función.", "local function saludar(nombre) print(nombre) end"],
    ["argumento", "Funciones", "Valor proporcionado al llamar una función.", "saludar('Lua')"],
    ["varargs", "Funciones", "Permiten recibir una cantidad variable de argumentos mediante ... .", "local function contar(...) return select('#', ...) end"],
    ["...", "Funciones", "Expresión usada para acceder a los argumentos variables de una función.", "local function f(...) print(...) end"],
    ["select", "Funciones", "Consulta o selecciona valores de una lista de varargs.", "select('#', 10, 20, 30)"],
    ["closure", "Funciones", "Función que conserva acceso a variables locales de su entorno externo.", "local function crear() local x = 0 return function() x=x+1 return x end end"],
    ["upvalue", "Funciones", "Variable local externa capturada por una función interna.", "local x = 10; local function f() return x end"],
    ["función anónima", "Funciones", "Función creada sin darle un nombre directamente.", "local f = function(x) return x * 2 end"],

    ["local", "Variables y alcance", "Declara una variable local al bloque actual.", "local vidas = 3"],
    ["global", "Variables y alcance", "En Lua 5.5 permite declarar explícitamente nombres globales.", "global contador"],
    ["<const>", "Variables y alcance", "Atributo de Lua 5.5 para declarar una variable local cuyo valor no puede reasignarse.", "local <const> PI = 3.14159"],
    ["<close>", "Variables y alcance", "Atributo de Lua 5.5 para una variable que debe cerrarse al salir de su alcance.", "local <close> recurso = obtenerRecurso()"],
    ["alcance", "Variables y alcance", "Región del código donde una variable puede ser utilizada.", "local x = 10"],
    ["bloque", "Variables y alcance", "Grupo de instrucciones con un alcance léxico propio.", "do local x = 1 end"],
    ["chunk", "Variables y alcance", "Porción de código Lua que puede ser cargada y ejecutada.", "local x = 10"],
    ["_ENV", "Variables y alcance", "Entorno usado para resolver accesos a variables globales.", "print(_ENV.print)"],
    ["_G", "Variables y alcance", "Referencia convencional a la tabla del entorno global.", "print(_G.print)"],

    ["nil", "Tipos", "Valor que representa ausencia de valor.", "local x = nil"],
    ["boolean", "Tipos", "Tipo cuyos valores son true y false.", "local activo = true"],
    ["number", "Tipos", "Tipo numérico de Lua, con números enteros y de coma flotante.", "local x = 10.5"],
    ["string", "Tipos", "Secuencia inmutable de bytes usada normalmente para representar texto.", "local nombre = 'Lua'"],
    ["table", "Tipos", "Estructura principal de datos de Lua; funciona como arreglo asociativo.", "local t = {nombre='Lua'}"],
    ["function (tipo)", "Tipos", "Las funciones son valores y pueden almacenarse, pasarse y devolverse.", "local f = print"],
    ["userdata", "Tipos", "Valor usado principalmente para representar datos administrados por código externo.", "print(type(valor))"],
    ["thread", "Tipos", "Tipo de valor asociado al mecanismo de coroutines de Lua.", "local co = coroutine.create(function() end)"],

    ["type", "Funciones básicas", "Devuelve el nombre del tipo de un valor.", "print(type(123))"],
    ["print", "Funciones básicas", "Imprime valores en la salida estándar.", "print('Hola')"],
    ["tostring", "Funciones básicas", "Convierte un valor a una representación string.", "print(tostring(123))"],
    ["tonumber", "Funciones básicas", "Convierte un valor a número cuando es posible.", "local n = tonumber('123')"],

    ["assert", "Errores y protección", "Comprueba una condición y genera un error si es falsa o nil.", "assert(x ~= nil, 'Falta x')"],
    ["error", "Errores y protección", "Genera un error desde el código Lua.", "error('Algo salió mal')"],
    ["pcall", "Errores y protección", "Ejecuta una función en modo protegido y devuelve su estado y resultados.", "local ok, r = pcall(f)"],
    ["xpcall", "Errores y protección", "Como pcall, pero permite indicar una función de manejo del error.", "xpcall(f, manejador)"],
    ["warn", "Errores y protección", "Emite una advertencia sin lanzar un error normal.", "warn('Cuidado')"],

    ["rawget", "Metatables", "Obtiene un valor de una tabla sin activar su metamétodo __index.", "local x = rawget(t, 'nombre')"],
    ["rawset", "Metatables", "Asigna directamente en una tabla sin activar __newindex.", "rawset(t, 'nombre', 'Lua')"],
    ["rawequal", "Metatables", "Compara dos valores sin usar metamétodos de igualdad.", "print(rawequal(a, b))"],
    ["rawlen", "Metatables", "Obtiene la longitud sin usar un metamétodo __len.", "print(rawlen(t))"],
    ["getmetatable", "Metatables", "Obtiene la metatable de un valor cuando está disponible.", "local meta = getmetatable(t)"],
    ["setmetatable", "Metatables", "Asigna una metatable a una tabla.", "setmetatable(t, meta)"],
    ["metatable", "Metatables", "Tabla especial que define comportamientos personalizados para otra tabla o valor.", "setmetatable(t, meta)"],

    ["__index", "Metatables", "Metamétodo usado al acceder a una clave ausente.", "meta.__index = otraTabla"],
    ["__newindex", "Metatables", "Metamétodo usado al asignar una clave ausente.", "meta.__newindex = function(t,k,v) end"],
    ["__call", "Metatables", "Permite definir qué sucede al tratar un valor con metatable como función.", "meta.__call = function(t) end"],
    ["__tostring", "Metatables", "Personaliza la conversión de un valor a string.", "meta.__tostring = function(t) return t.nombre end"],
    ["__len", "Metatables", "Personaliza el operador # para un valor.", "meta.__len = function(t) return 10 end"],
    ["__eq", "Metatables", "Personaliza la igualdad == en los casos permitidos.", "meta.__eq = function(a,b) return true end"],
    ["__lt", "Metatables", "Personaliza la comparación menor que.", "meta.__lt = function(a,b) return a.x < b.x end"],
    ["__le", "Metatables", "Personaliza la comparación menor o igual.", "meta.__le = function(a,b) return a.x <= b.x end"],

    ["__add", "Metatables", "Metamétodo para la suma.", "meta.__add = function(a,b) end"],
    ["__sub", "Metatables", "Metamétodo para la resta.", "meta.__sub = function(a,b) end"],
    ["__mul", "Metatables", "Metamétodo para la multiplicación.", "meta.__mul = function(a,b) end"],
    ["__div", "Metatables", "Metamétodo para la división.", "meta.__div = function(a,b) end"],
    ["__idiv", "Metatables", "Metamétodo para la división entera.", "meta.__idiv = function(a,b) end"],
    ["__mod", "Metatables", "Metamétodo para el resto.", "meta.__mod = function(a,b) end"],
    ["__pow", "Metatables", "Metamétodo para la exponenciación.", "meta.__pow = function(a,b) end"],
    ["__unm", "Metatables", "Metamétodo para el menos unario.", "meta.__unm = function(a) end"],
    ["__concat", "Metatables", "Metamétodo para concatenación .. .", "meta.__concat = function(a,b) end"],

    ["__band", "Metatables", "Metamétodo para AND bit a bit.", "meta.__band = function(a,b) end"],
    ["__bor", "Metatables", "Metamétodo para OR bit a bit.", "meta.__bor = function(a,b) end"],
    ["__bxor", "Metatables", "Metamétodo para XOR bit a bit.", "meta.__bxor = function(a,b) end"],
    ["__bnot", "Metatables", "Metamétodo para NOT bit a bit.", "meta.__bnot = function(a) end"],
    ["__shl", "Metatables", "Metamétodo para desplazamiento de bits a la izquierda.", "meta.__shl = function(a,b) end"],
    ["__shr", "Metatables", "Metamétodo para desplazamiento de bits a la derecha.", "meta.__shr = function(a,b) end"],
    ["__gc", "Metatables", "Metamétodo relacionado con la finalización de objetos recolectables.", "meta.__gc = function(t) end"],
    ["__close", "Metatables", "Metamétodo llamado para valores to-be-closed al cerrar su alcance.", "meta.__close = function(t, err) end"],
    ["__mode", "Metatables", "Configura claves o valores débiles en tablas débiles.", "meta.__mode = 'k'"],
    ["__name", "Metatables", "Nombre asociado a una metatable para ciertos mensajes y operaciones.", "meta.__name = 'Persona'"],

    ["=", "Operadores", "Asigna un valor a una variable o campo.", "local x = 10"],
    ["==", "Operadores", "Comprueba igualdad.", "if x == 10 then end"],
    ["~=", "Operadores", "Comprueba desigualdad.", "if x ~= 10 then end"],
    [">", "Operadores", "Comprueba si el primer valor es mayor.", "if x > 5 then end"],
    ["<", "Operadores", "Comprueba si el primer valor es menor.", "if x < 5 then end"],
    [">=", "Operadores", "Comprueba si el primer valor es mayor o igual.", "if x >= 5 then end"],
    ["<=", "Operadores", "Comprueba si el primer valor es menor o igual.", "if x <= 5 then end"],
    ["+", "Operadores", "Suma valores.", "local x = 2 + 3"],
    ["-", "Operadores", "Resta valores o aplica negación unaria.", "local x = 5 - 2"],
    ["*", "Operadores", "Multiplica valores.", "local x = 2 * 3"],
    ["/", "Operadores", "Divide valores.", "local x = 10 / 2"],
    ["//", "Operadores", "Realiza división entera.", "local x = 7 // 2"],
    ["%", "Operadores", "Obtiene el resto de una división.", "local x = 7 % 2"],
    ["^", "Operadores", "Eleva un valor a una potencia.", "local x = 2 ^ 3"],
    ["..", "Operadores", "Concatena strings.", "local s = 'Hola ' .. 'Lua'"],
    ["#", "Operadores", "Operador de longitud para strings y tablas en los casos definidos por Lua.", "print(#'Lua')"],
    ["&", "Operadores", "AND bit a bit.", "local x = 6 & 3"],
    ["|", "Operadores", "OR bit a bit.", "local x = 6 | 3"],
    ["~ bitwise", "Operadores", "XOR bit a bit; también participa en la negación unaria de bits según el contexto.", "local x = 6 ~ 3"],
    ["<<", "Operadores", "Desplaza bits hacia la izquierda.", "local x = 1 << 3"],
    [">>", "Operadores", "Desplaza bits hacia la derecha.", "local x = 8 >> 2"],
    ["precedencia", "Operadores", "Orden en que Lua agrupa operadores dentro de una expresión.", "local x = 2 + 3 * 4"],

    ["tabla constructor", "Tablas", "Sintaxis entre llaves para crear una tabla.", "local t = {10, 20, 30}"],
    ["índice", "Tablas", "Clave numérica usada para acceder a una posición de una secuencia.", "print(t[1])"],
    ["clave", "Tablas", "Valor usado para identificar un campo de una tabla.", "t['nombre'] = 'Lua'"],
    ["campo", "Tablas", "Par clave-valor almacenado en una tabla.", "local t = {nombre='Lua'}"],
    ["table.insert", "Tablas", "Inserta un valor en una posición de una secuencia.", "table.insert(t, 'Lua')"],
    ["table.remove", "Tablas", "Elimina y devuelve un elemento de una secuencia.", "table.remove(t, 1)"],
    ["table.sort", "Tablas", "Ordena una secuencia usando un criterio opcional.", "table.sort(t)"],
    ["table.concat", "Tablas", "Concatena elementos de una secuencia con un separador opcional.", "print(table.concat(t, ', '))"],
    ["table.move", "Tablas", "Copia un rango de elementos entre tablas.", "table.move(a, 1, 3, 1, b)"],
    ["table.pack", "Tablas", "Empaqueta argumentos en una tabla, conservando n.", "local t = table.pack(10, 20)"],
    ["table.unpack", "Tablas", "Devuelve los elementos de una secuencia como múltiples resultados.", "print(table.unpack(t))"],
    ["table.create", "Tablas", "Crea una tabla con capacidad preasignada en implementaciones que proporcionan esta función.", "local t = table.create(100)"],
    ["pairs", "Tablas", "Iterador para recorrer pares clave-valor de una tabla.", "for k,v in pairs(t) do print(k,v) end"],
    ["ipairs", "Tablas", "Iterador para recorrer una secuencia desde el índice 1.", "for i,v in ipairs(t) do print(i,v) end"],
    ["next", "Tablas", "Obtiene el siguiente par clave-valor de una tabla.", "local k,v = next(t)"],
    ["longitud de tabla", "Tablas", "Resultado del operador # sobre una tabla; su significado depende de la secuencia y reglas de Lua.", "print(#t)"],

    ["string.len", "Strings", "Obtiene la longitud en bytes de un string.", "print(string.len('Lua'))"],
    ["string.sub", "Strings", "Extrae una parte de un string usando índices.", "print(string.sub('LuaLex', 1, 3))"],
    ["string.upper", "Strings", "Convierte letras a mayúsculas según las reglas de bytes de Lua.", "print(string.upper('lua'))"],
    ["string.lower", "Strings", "Convierte letras a minúsculas según las reglas de bytes de Lua.", "print(string.lower('LUA'))"],
    ["string.find", "Strings", "Busca un patrón o texto y devuelve sus posiciones cuando lo encuentra.", "local a,b = string.find('Hola Lua', 'Lua')"],
    ["string.match", "Strings", "Busca un patrón y devuelve las capturas correspondientes.", "local n = string.match('Edad 15', '%d+')"],
    ["string.gmatch", "Strings", "Crea un iterador para coincidencias de un patrón.", "for palabra in string.gmatch(texto, '%w+') do end"],
    ["string.gsub", "Strings", "Reemplaza coincidencias de un patrón.", "local s = string.gsub('Lua Lua', 'Lua', 'Lex')"],
    ["string.format", "Strings", "Crea un string usando un formato.", "print(string.format('%d puntos', 10))"],
    ["string.rep", "Strings", "Repite un string una cantidad determinada de veces.", "print(string.rep('=', 5))"],
    ["string.reverse", "Strings", "Devuelve un string con sus bytes en orden inverso.", "print(string.reverse('Lua'))"],
    ["string.byte", "Strings", "Obtiene códigos numéricos de bytes de un string.", "print(string.byte('A'))"],
    ["string.char", "Strings", "Crea un string a partir de códigos numéricos de bytes.", "print(string.char(65))"],
    ["string.dump", "Strings", "Devuelve una representación binaria de una función Lua.", "local bin = string.dump(f)"],
    ["string.pack", "Strings", "Empaqueta valores en una cadena binaria usando un formato.", "local s = string.pack('i4', 100)"],
    ["string.unpack", "Strings", "Desempaqueta valores de una cadena binaria.", "local n = string.unpack('i4', s)"],
    ["string.packsize", "Strings", "Calcula el tamaño de un formato de string.pack.", "print(string.packsize('i4'))"],

    ["patrones de strings", "Strings", "Sintaxis de patrones usada por find, match, gmatch y gsub.", "string.match(texto, '%a+')"],
    ["%d", "Strings", "Clase de patrón que representa dígitos.", "string.match('123', '%d+')"],
    ["%a", "Strings", "Clase de patrón para letras.", "string.match('Lua', '%a+')"],
    ["%s", "Strings", "Clase de patrón para espacios.", "string.match('hola mundo', '%s')"],
    ["%w", "Strings", "Clase de patrón para caracteres alfanuméricos.", "string.match('Lua55', '%w+')"],
    ["frontier pattern", "Strings", "Patrón de frontera que permite detectar un cambio entre clases de caracteres.", "'%f[%a]'"],
    ["string inmutable", "Strings", "Los strings no se modifican directamente; las operaciones producen otros strings.", "local s = 'Lua'"],

    ["math.abs", "Math", "Valor absoluto.", "print(math.abs(-5))"],
    ["math.ceil", "Math", "Redondea hacia arriba.", "print(math.ceil(2.3))"],
    ["math.floor", "Math", "Redondea hacia abajo.", "print(math.floor(2.9))"],
    ["math.max", "Math", "Devuelve el mayor de sus argumentos.", "print(math.max(3, 8))"],
    ["math.min", "Math", "Devuelve el menor de sus argumentos.", "print(math.min(3, 8))"],
    ["math.random", "Math", "Genera números pseudoaleatorios según sus argumentos.", "print(math.random(1, 10))"],
    ["math.randomseed", "Math", "Inicializa la semilla del generador pseudoaleatorio.", "math.randomseed(123)"],
    ["math.sqrt", "Math", "Calcula una raíz cuadrada.", "print(math.sqrt(25))"],
    ["math.exp", "Math", "Calcula e elevado a un valor.", "print(math.exp(1))"],
    ["math.log", "Math", "Calcula logaritmos con la base permitida por sus argumentos.", "print(math.log(10))"],
    ["math.sin", "Math", "Calcula el seno de un ángulo en radianes.", "print(math.sin(0))"],
    ["math.cos", "Math", "Calcula el coseno de un ángulo en radianes.", "print(math.cos(0))"],
    ["math.tan", "Math", "Calcula la tangente de un ángulo en radianes.", "print(math.tan(0))"],
    ["math.asin", "Math", "Arcoseno.", "print(math.asin(0))"],
    ["math.acos", "Math", "Arcocoseno.", "print(math.acos(1))"],
    ["math.atan", "Math", "Arcotangente; acepta las formas definidas por Lua.", "print(math.atan(1))"],
    ["math.deg", "Math", "Convierte radianes a grados.", "print(math.deg(math.pi))"],
    ["math.rad", "Math", "Convierte grados a radianes.", "print(math.rad(180))"],
    ["math.pi", "Math", "Constante matemática pi.", "print(math.pi)"],
    ["math.huge", "Math", "Valor numérico que representa infinito positivo.", "print(math.huge)"],
    ["math.type", "Math", "Indica si un número es integer, float o no es un número.", "print(math.type(10))"],
    ["math.tointeger", "Math", "Convierte un valor a integer si es representable como tal.", "print(math.tointeger(10.0))"],
    ["math.ult", "Math", "Compara representaciones unsigned de enteros según la especificación de Lua.", "print(math.ult(1, 2))"],

    ["coroutine.create", "Coroutines", "Crea una coroutine a partir de una función.", "local co = coroutine.create(f)"],
    ["coroutine.resume", "Coroutines", "Reanuda una coroutine.", "coroutine.resume(co)"],
    ["coroutine.yield", "Coroutines", "Suspende la coroutine actual y puede devolver valores a resume.", "coroutine.yield()"],
    ["coroutine.status", "Coroutines", "Obtiene el estado de una coroutine.", "print(coroutine.status(co))"],
    ["coroutine.running", "Coroutines", "Obtiene la coroutine en ejecución y datos asociados.", "print(coroutine.running())"],
    ["coroutine.wrap", "Coroutines", "Crea una función que reanuda una coroutine al llamarla.", "local f = coroutine.wrap(g)"],
    ["coroutine.isyieldable", "Coroutines", "Indica si la coroutine actual puede suspenderse.", "print(coroutine.isyieldable())"],
    ["coroutine.close", "Coroutines", "Cierra una coroutine suspendida o terminada cuando corresponde.", "coroutine.close(co)"],

    ["require", "Módulos", "Carga un módulo usando el sistema de paquetes.", "local modulo = require('miModulo')"],
    ["package.path", "Módulos", "Ruta usada para buscar módulos Lua.", "print(package.path)"],
    ["package.cpath", "Módulos", "Ruta usada para buscar módulos compilados.", "print(package.cpath)"],
    ["package.loaded", "Módulos", "Tabla de módulos que ya han sido cargados.", "print(package.loaded['miModulo'])"],
    ["package.preload", "Módulos", "Tabla de cargadores previos para módulos.", "package.preload['x'] = function() return {} end"],
    ["package.searchers", "Módulos", "Lista de buscadores/cargadores usados por require.", "print(package.searchers)"],
    ["package.config", "Módulos", "Cadena con información de configuración del sistema de paquetes.", "print(package.config)"],

    ["dofile", "Funciones básicas", "Carga y ejecuta un archivo Lua.", "dofile('archivo.lua')"],
    ["loadfile", "Funciones básicas", "Carga un archivo como función sin ejecutarlo inmediatamente.", "local f = loadfile('archivo.lua')"],
    ["load", "Funciones básicas", "Carga un chunk desde una cadena u otra fuente compatible.", "local f = load('return 2 + 2')"],
    ["_VERSION", "Funciones básicas", "String que identifica la versión de Lua en ejecución.", "print(_VERSION)"],

    ["collectgarbage", "Avanzado", "Controla o consulta aspectos del recolector de basura.", "collectgarbage('collect')"],
    ["garbage collector", "Avanzado", "Mecanismo que recupera memoria de objetos Lua que ya no son alcanzables.", "collectgarbage('collect')"],
    ["GC incremental", "Avanzado", "Modo de recolección que reparte el trabajo del GC en pasos.", "collectgarbage('incremental')"],
    ["GC generacional", "Avanzado", "Modo de GC que organiza la recolección según generaciones de objetos.", "collectgarbage('generational')"],
    ["finalizer", "Avanzado", "Código asociado a un objeto para realizar acciones antes de su recolección cuando corresponde.", "meta.__gc = function(obj) end"],
    ["weak table", "Avanzado", "Tabla cuyos valores o claves pueden ser recolectados cuando no existen otras referencias fuertes.", "meta.__mode = 'v'"],
    ["ephemeron", "Avanzado", "Comportamiento de tablas débiles de claves y valores que depende de la alcanzabilidad de las claves.", "meta.__mode = 'k'"],
    ["to-be-closed", "Avanzado", "Variable marcada con <close> cuyo valor recibe cierre automático al salir del alcance.", "local <close> f = recurso"],
    ["const local", "Avanzado", "Variable local con atributo <const> que no puede recibir una nueva asignación.", "local <const> x = 10"],
    ["named vararg table", "Avanzado", "Característica de Lua 5.5 que permite asociar un nombre a la tabla que contiene varargs.", "local function f(...args) print(args.n) end"],

    ["io.open", "IO", "Abre un archivo y devuelve un objeto de archivo o un error.", "local f = io.open('datos.txt', 'r')"],
    ["io.close", "IO", "Cierra un archivo abierto.", "io.close(f)"],
    ["io.read", "IO", "Lee datos desde la entrada o un archivo según el receptor y formatos.", "local x = io.read()"],
    ["io.write", "IO", "Escribe datos en la salida o un archivo.", "io.write('Hola')"],
    ["io.lines", "IO", "Crea un iterador para leer líneas de un archivo o entrada.", "for linea in io.lines('datos.txt') do end"],
    ["io.input", "IO", "Obtiene o cambia el archivo de entrada predeterminado.", "io.input('datos.txt')"],
    ["io.output", "IO", "Obtiene o cambia el archivo de salida predeterminado.", "io.output('salida.txt')"],
    ["io.flush", "IO", "Vacía los buffers de salida.", "io.flush()"],

    ["file:read", "IO", "Lee datos desde un objeto de archivo.", "local linea = f:read('*l')"],
    ["file:write", "IO", "Escribe datos mediante un objeto de archivo.", "f:write('Hola')"],
    ["file:close", "IO", "Cierra un objeto de archivo.", "f:close()"],
    ["file:lines", "IO", "Devuelve un iterador de líneas del archivo.", "for linea in f:lines() do end"],

    ["os.clock", "OS", "Obtiene tiempo de CPU usado por el programa.", "print(os.clock())"],
    ["os.date", "OS", "Formatea o devuelve información de fecha y hora.", "print(os.date())"],
    ["os.difftime", "OS", "Calcula la diferencia entre dos tiempos.", "print(os.difftime(t2, t1))"],
    ["os.execute", "OS", "Solicita la ejecución de un comando del sistema operativo.", "os.execute('comando')"],
    ["os.exit", "OS", "Termina el programa Lua.", "os.exit()"],
    ["os.getenv", "OS", "Obtiene el valor de una variable de entorno.", "print(os.getenv('PATH'))"],
    ["os.remove", "OS", "Elimina un archivo o directorio vacío cuando el sistema lo permite.", "os.remove('archivo.txt')"],
    ["os.rename", "OS", "Cambia el nombre de un archivo o directorio.", "os.rename('a.txt', 'b.txt')"],
    ["os.setlocale", "OS", "Obtiene o establece la configuración regional del programa.", "print(os.setlocale())"],
    ["os.time", "OS", "Obtiene un tiempo representado por el sistema o convierte una tabla de fecha.", "print(os.time())"],
    ["os.tmpname", "OS", "Devuelve un nombre temporal adecuado según el sistema.", "print(os.tmpname())"],

    ["debug.getinfo", "Debug", "Obtiene información sobre una función o nivel de ejecución.", "print(debug.getinfo(1))"],
    ["debug.traceback", "Debug", "Construye información de seguimiento de la pila.", "print(debug.traceback())"],
    ["debug.getlocal", "Debug", "Obtiene información sobre variables locales de un nivel de ejecución.", "debug.getlocal(1, 1)"],
    ["debug.setlocal", "Debug", "Cambia una variable local mediante la API de debug.", "debug.setlocal(1, 1, 'valor')"],
    ["debug.getupvalue", "Debug", "Obtiene información de un upvalue de una función.", "debug.getupvalue(f, 1)"],
    ["debug.setupvalue", "Debug", "Cambia un upvalue de una función.", "debug.setupvalue(f, 1, 10)"],
    ["debug.getmetatable", "Debug", "Obtiene una metatable mediante la librería debug.", "debug.getmetatable(t)"],
    ["debug.setmetatable", "Debug", "Cambia una metatable mediante la librería debug.", "debug.setmetatable(t, meta)"],
    ["debug.sethook", "Debug", "Establece un hook de depuración para eventos de ejecución.", "debug.sethook(hook, 'c')"],
    ["debug.gethook", "Debug", "Obtiene la configuración actual del hook de depuración.", "debug.gethook()"],
    ["debug.getregistry", "Debug", "Accede a la tabla de registro usada por Lua.", "debug.getregistry()"],

    ["comentarios", "Sintaxis", "Texto ignorado por el intérprete y usado para explicar código.", "-- Esto es un comentario"],
    ["comentario largo", "Sintaxis", "Comentario delimitado mediante corchetes largos.", "--[[ comentario ]]"],
    ["string largo", "Sintaxis", "String que puede ocupar varias líneas usando corchetes largos.", "local s = [[Hola]]"],
    ["do ... end", "Sintaxis", "Crea un bloque explícito con alcance léxico.", "do local x = 1 end"],
    ["múltiple asignación", "Sintaxis", "Permite asignar varios valores a varias variables en una instrucción.", "local a, b = 10, 20"],
    ["múltiples retornos", "Funciones", "Una función puede devolver más de un resultado.", "return 10, 20"],
    ["first-class values", "Funciones", "Los valores de Lua pueden almacenarse y pasar como datos; las funciones también.", "local f = function() end"],
    ["expresión", "Sintaxis", "Fragmento de código que produce un valor.", "2 + 3"],
    ["sentencia", "Sintaxis", "Instrucción que forma parte de un chunk Lua.", "local x = 10"],
    ["semántica de nil", "Tipos", "Una variable global o campo puede dejar de existir como entrada al asignarle nil.", "t.nombre = nil"],
    ["igualdad raw", "Metatables", "Comparación que evita metamétodos mediante rawequal.", "rawequal(a, b)"],
    ["iterador", "Tablas", "Función o mecanismo que produce sucesivamente valores para un recorrido.", "for k,v in pairs(t) do end"]
];

/* =========================================================
   PARTE 2/3 — LIBRERÍAS + NAVEGACIÓN + BUSCADOR
   ========================================================= */

/* ==================== LIBRERÍAS ESTÁNDAR ==================== */

const bibliotecas = {
    basic: {
        nombre: "Biblioteca básica",
        descripcion: "Funciones disponibles directamente en Lua.",
        funciones: [
            ["assert", "Comprueba una condición y genera un error si es falsa o nil."],
            ["collectgarbage", "Controla o consulta el recolector de basura."],
            ["dofile", "Carga y ejecuta un archivo Lua."],
            ["error", "Genera un error."],
            ["getmetatable", "Obtiene la metatable de un valor."],
            ["ipairs", "Crea un iterador para recorrer una secuencia."],
            ["load", "Carga un chunk de Lua."],
            ["loadfile", "Carga un archivo como función."],
            ["next", "Obtiene el siguiente elemento de una tabla."],
            ["pairs", "Recorre pares clave-valor de una tabla."],
            ["pcall", "Ejecuta una función de forma protegida."],
            ["print", "Escribe valores en la salida estándar."],
            ["rawequal", "Compara valores sin usar metamétodos."],
            ["rawget", "Obtiene un campo sin usar __index."],
            ["rawlen", "Obtiene la longitud sin usar __len."],
            ["rawset", "Asigna un campo sin usar __newindex."],
            ["select", "Selecciona valores de una lista de argumentos."],
            ["setmetatable", "Asigna una metatable."],
            ["tonumber", "Convierte un valor a número."],
            ["tostring", "Convierte un valor a string."],
            ["type", "Devuelve el tipo de un valor."],
            ["warn", "Genera una advertencia."],
            ["xpcall", "Ejecuta una función protegida con manejador de errores."]
        ]
    },

    coroutine: {
        nombre: "Biblioteca coroutine",
        descripcion: "Herramientas para crear y controlar coroutines.",
        funciones: [
            ["coroutine.create", "Crea una coroutine."],
            ["coroutine.isyieldable", "Comprueba si la coroutine puede suspenderse."],
            ["coroutine.resume", "Reanuda una coroutine."],
            ["coroutine.running", "Obtiene la coroutine que está ejecutándose."],
            ["coroutine.status", "Obtiene el estado de una coroutine."],
            ["coroutine.wrap", "Crea una función que reanuda una coroutine."],
            ["coroutine.yield", "Suspende temporalmente una coroutine."],
            ["coroutine.close", "Cierra una coroutine."]
        ]
    },

    package: {
        nombre: "Biblioteca package",
        descripcion: "Sistema utilizado para cargar módulos.",
        funciones: [
            ["require", "Carga un módulo."],
            ["package.config", "Contiene información de configuración del sistema de paquetes."],
            ["package.cpath", "Ruta usada para buscar módulos compilados."],
            ["package.loaded", "Contiene los módulos que ya fueron cargados."],
            ["package.loadlib", "Carga una biblioteca dinámica."],
            ["package.path", "Ruta usada para buscar módulos Lua."],
            ["package.preload", "Contiene cargadores previos de módulos."],
            ["package.searchpath", "Busca un archivo siguiendo una ruta."],
            ["package.searchers", "Contiene los buscadores utilizados por require."]
        ]
    },

    string: {
        nombre: "Biblioteca string",
        descripcion: "Funciones para trabajar con strings y patrones.",
        funciones: [
            ["string.byte", "Obtiene códigos numéricos de bytes."],
            ["string.char", "Crea un string usando códigos de bytes."],
            ["string.dump", "Convierte una función en una representación binaria."],
            ["string.find", "Busca un patrón dentro de un string."],
            ["string.format", "Construye strings usando formatos."],
            ["string.gmatch", "Crea un iterador para coincidencias."],
            ["string.gsub", "Reemplaza coincidencias de un patrón."],
            ["string.len", "Obtiene la longitud en bytes."],
            ["string.lower", "Convierte letras a minúsculas."],
            ["string.match", "Busca un patrón y devuelve coincidencias."],
            ["string.pack", "Empaqueta valores en un string binario."],
            ["string.packsize", "Calcula el tamaño de un formato de pack."],
            ["string.rep", "Repite un string."],
            ["string.reverse", "Invierte los bytes de un string."],
            ["string.sub", "Extrae una parte de un string."],
            ["string.unpack", "Desempaqueta valores de un string binario."],
            ["string.upper", "Convierte letras a mayúsculas."]
        ]
    },

    utf8: {
        nombre: "Biblioteca utf8",
        descripcion: "Funciones para trabajar con texto codificado en UTF-8.",
        funciones: [
            ["utf8.char", "Crea un string a partir de puntos de código."],
            ["utf8.charpattern", "Patrón utilizado para reconocer caracteres UTF-8."],
            ["utf8.codes", "Crea un iterador sobre códigos UTF-8."],
            ["utf8.codepoint", "Obtiene puntos de código de un string."],
            ["utf8.len", "Obtiene la cantidad de caracteres UTF-8."],
            ["utf8.offset", "Obtiene el byte donde comienza un carácter."]
        ]
    },

    table: {
        nombre: "Biblioteca table",
        descripcion: "Funciones para manipular tablas y secuencias.",
        funciones: [
            ["table.concat", "Concatena elementos de una secuencia."],
            ["table.create", "Crea una tabla con capacidad preasignada."],
            ["table.insert", "Inserta un elemento."],
            ["table.move", "Mueve o copia elementos entre tablas."],
            ["table.pack", "Empaqueta valores en una tabla."],
            ["table.remove", "Elimina un elemento."],
            ["table.sort", "Ordena una secuencia."],
            ["table.unpack", "Devuelve los elementos de una tabla como múltiples resultados."]
        ]
    },

    math: {
        nombre: "Biblioteca math",
        descripcion: "Funciones y constantes matemáticas.",
        funciones: [
            ["math.abs", "Valor absoluto."],
            ["math.acos", "Arcocoseno."],
            ["math.asin", "Arcoseno."],
            ["math.atan", "Arcotangente."],
            ["math.ceil", "Redondea hacia arriba."],
            ["math.cos", "Coseno."],
            ["math.deg", "Convierte radianes a grados."],
            ["math.exp", "Calcula e elevado a un valor."],
            ["math.floor", "Redondea hacia abajo."],
            ["math.fmod", "Obtiene el resto usando aritmética de punto flotante."],
            ["math.huge", "Representa infinito positivo."],
            ["math.log", "Calcula logaritmos."],
            ["math.max", "Obtiene el mayor valor."],
            ["math.min", "Obtiene el menor valor."],
            ["math.modf", "Obtiene las partes entera y fraccionaria."],
            ["math.pi", "Constante π."],
            ["math.rad", "Convierte grados a radianes."],
            ["math.random", "Genera números pseudoaleatorios."],
            ["math.randomseed", "Inicializa el generador pseudoaleatorio."],
            ["math.sin", "Seno."],
            ["math.sqrt", "Raíz cuadrada."],
            ["math.tan", "Tangente."],
            ["math.tointeger", "Convierte un valor a integer cuando es posible."],
            ["math.type", "Indica el subtipo numérico."],
            ["math.ult", "Compara enteros como unsigned."]
        ]
    },

    io: {
        nombre: "Biblioteca io",
        descripcion: "Entrada, salida y archivos.",
        funciones: [
            ["io.close", "Cierra un archivo."],
            ["io.flush", "Vacía los buffers de salida."],
            ["io.input", "Obtiene o cambia la entrada predeterminada."],
            ["io.lines", "Crea un iterador de líneas."],
            ["io.open", "Abre un archivo."],
            ["io.output", "Obtiene o cambia la salida predeterminada."],
            ["io.popen", "Abre una tubería con un comando del sistema."],
            ["io.read", "Lee datos."],
            ["io.tmpfile", "Crea un archivo temporal."],
            ["io.type", "Comprueba si un valor es un archivo válido."],
            ["io.write", "Escribe datos."]
        ]
    },

    os: {
        nombre: "Biblioteca os",
        descripcion: "Funciones relacionadas con el sistema operativo.",
        funciones: [
            ["os.clock", "Obtiene tiempo de CPU."],
            ["os.date", "Obtiene o formatea fecha y hora."],
            ["os.difftime", "Calcula diferencias entre tiempos."],
            ["os.execute", "Ejecuta un comando del sistema."],
            ["os.exit", "Termina el programa."],
            ["os.getenv", "Obtiene una variable de entorno."],
            ["os.remove", "Elimina un archivo o directorio."],
            ["os.rename", "Cambia el nombre de un archivo o directorio."],
            ["os.setlocale", "Obtiene o establece la configuración regional."],
            ["os.time", "Obtiene o convierte valores de tiempo."],
            ["os.tmpname", "Obtiene un nombre temporal."]
        ]
    },

    debug: {
        nombre: "Biblioteca debug",
        descripcion: "Herramientas avanzadas para inspeccionar y depurar programas.",
        funciones: [
            ["debug.debug", "Entra en un intérprete interactivo de depuración."],
            ["debug.gethook", "Obtiene información del hook actual."],
            ["debug.getinfo", "Obtiene información de una función o nivel."],
            ["debug.getlocal", "Obtiene información sobre una variable local."],
            ["debug.getmetatable", "Obtiene una metatable mediante debug."],
            ["debug.getregistry", "Obtiene la tabla de registro."],
            ["debug.getupvalue", "Obtiene información sobre un upvalue."],
            ["debug.sethook", "Configura un hook de depuración."],
            ["debug.setlocal", "Modifica una variable local."],
            ["debug.setmetatable", "Modifica una metatable mediante debug."],
            ["debug.setupvalue", "Modifica un upvalue."],
            ["debug.traceback", "Construye un traceback de la ejecución."]
        ]
    }
};


/* ==================== NAVEGACIÓN ==================== */

function mostrarTema(tema) {
    const inicio = document.getElementById("inicio");
    const pagina = document.getElementById(tema);

    if (!pagina) {
        console.warn("No existe la página:", tema);
        return;
    }

    if (inicio) {
        inicio.style.display = "none";
    }

    document.querySelectorAll(".pagina").forEach(function(elemento) {
        elemento.style.display = "none";
    });

    pagina.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function volverInicio() {
    document.querySelectorAll(".pagina").forEach(function(elemento) {
        elemento.style.display = "none";
    });

    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==================== BUSCADOR ==================== */

function normalizar(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


function buscarConcepto() {
    const input = document.getElementById("busqueda");
    const resultados = document.getElementById("resultadosBusqueda");

    if (!input || !resultados) {
        return;
    }

    const texto = normalizar(input.value);

    resultados.innerHTML = "";

    if (texto.length === 0) {
        resultados.style.display = "none";
        return;
    }

    const encontrados = conceptos.filter(function(concepto) {
        const nombre = normalizar(concepto[0]);
        const categoria = normalizar(concepto[1]);
        const descripcion = normalizar(concepto[2]);

        return (
            nombre.includes(texto) ||
            categoria.includes(texto) ||
            descripcion.includes(texto)
        );
    });

    if (encontrados.length === 0) {
        resultados.innerHTML = `
            <div class="resultado-vacio">
                No encontramos nada con "<strong>${escapeHTML(input.value)}</strong>".
            </div>
        `;

        resultados.style.display = "block";
        return;
    }

    encontrados.slice(0, 12).forEach(function(concepto) {
        const tarjeta = document.createElement("button");

        tarjeta.className = "resultado-busqueda";

        tarjeta.innerHTML = `
            <strong>${escapeHTML(concepto[0])}</strong>
            <span>${escapeHTML(concepto[1])}</span>
            <small>${escapeHTML(concepto[2])}</small>
        `;

        tarjeta.onclick = function() {
            abrirResultado(concepto);
        };

        resultados.appendChild(tarjeta);
    });

    resultados.style.display = "block";
}


function abrirResultado(concepto) {
    const nombre = concepto[0];
    const categoria = concepto[1];
    const descripcion = concepto[2];
    const ejemplo = concepto[3];

    const paginaID = Object.keys(temas).find(function(id) {
        return temas[id] === categoria;
    });

    if (paginaID && document.getElementById(paginaID)) {
        mostrarTema(paginaID);

        setTimeout(function() {
            const pagina = document.getElementById(paginaID);

            if (!pagina) {
                return;
            }

            const existente = pagina.querySelector(".resultado-directo");

            if (existente) {
                existente.remove();
            }

            const bloque = document.createElement("div");

            bloque.className = "resultado-directo";

            bloque.innerHTML = `
                <h3>${escapeHTML(nombre)}</h3>
                <p>${escapeHTML(descripcion)}</p>

                <pre><code>${escapeHTML(ejemplo)}</code></pre>
            `;

            pagina.appendChild(bloque);

            bloque.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }

    const input = document.getElementById("busqueda");
    const resultados = document.getElementById("resultadosBusqueda");

    if (input) {
        input.value = "";
    }

    if (resultados) {
        resultados.innerHTML = "";
        resultados.style.display = "none";
    }
}


/* ==================== DICCIONARIO COMPLETO ==================== */

function generarDiccionario() {
    const contenedor = document.getElementById("diccionarioCompleto");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    const agrupados = {};

    conceptos.forEach(function(concepto) {
        const categoria = concepto[1];

        if (!agrupados[categoria]) {
            agrupados[categoria] = [];
        }

        agrupados[categoria].push(concepto);
    });

    Object.keys(agrupados)
        .sort()
        .forEach(function(categoria) {

            const seccion = document.createElement("section");

            seccion.className = "diccionario-seccion";

            const titulo = document.createElement("h3");

            titulo.textContent = categoria;

            seccion.appendChild(titulo);

            agrupados[categoria].forEach(function(concepto) {

                const elemento = document.createElement("article");

                elemento.className = "entrada-diccionario";

                elemento.innerHTML = `
                    <h4>${escapeHTML(concepto[0])}</h4>
                    <p>${escapeHTML(concepto[2])}</p>

                    <details>
                        <summary>Ver ejemplo</summary>
                        <pre><code>${escapeHTML(concepto[3])}</code></pre>
                    </details>
                `;

                seccion.appendChild(elemento);
            });

            contenedor.appendChild(seccion);
        });
}


function filtrarDiccionario() {
    const input = document.getElementById("filtroDiccionario");

    if (!input) {
        generarDiccionario();
        return;
    }

    const texto = normalizar(input.value);
    const contenedor = document.getElementById("diccionarioCompleto");

    if (!contenedor) {
        return;
    }

    if (texto === "") {
        generarDiccionario();
        return;
    }

    const encontrados = conceptos.filter(function(concepto) {
        return (
            normalizar(concepto[0]).includes(texto) ||
            normalizar(concepto[1]).includes(texto) ||
            normalizar(concepto[2]).includes(texto)
        );
    });

    contenedor.innerHTML = "";

    if (encontrados.length === 0) {
        contenedor.innerHTML = `
            <div class="resultado-vacio">
                No encontramos conceptos que coincidan con
                "<strong>${escapeHTML(input.value)}</strong>".
            </div>
        `;
        return;
    }

    encontrados.forEach(function(concepto) {

        const elemento = document.createElement("article");

        elemento.className = "entrada-diccionario";

        elemento.innerHTML = `
            <span class="categoria-diccionario">
                ${escapeHTML(concepto[1])}
            </span>

            <h4>${escapeHTML(concepto[0])}</h4>

            <p>${escapeHTML(concepto[2])}</p>

            <details>
                <summary>Ver ejemplo</summary>
                <pre><code>${escapeHTML(concepto[3])}</code></pre>
            </details>
        `;

        contenedor.appendChild(elemento);
    });
}


/* ==================== ESCAPAR HTML ==================== */

function escapeHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ==================== FILTRO DE BIBLIOTECAS ==================== */

function filtrarBiblioteca() {
    const select = document.getElementById("filtroBiblioteca");
    const contenedor = document.getElementById("bibliotecaResultado");

    if (!select || !contenedor) {
        return;
    }

    const clave = select.value;

    if (!clave || !bibliotecas[clave]) {
        contenedor.innerHTML = "";
        return;
    }

    const biblioteca = bibliotecas[clave];

    let html = `
        <div class="biblioteca-cabecera">
            <h3>${escapeHTML(biblioteca.nombre)}</h3>
            <p>${escapeHTML(biblioteca.descripcion)}</p>
        </div>

        <div class="lista-funciones">
    `;

    biblioteca.funciones.forEach(function(funcion) {
        html += `
            <article class="funcion-biblioteca">
                <code>${escapeHTML(funcion[0])}</code>
                <p>${escapeHTML(funcion[1])}</p>
            </article>
        `;
    });

    html += "</div>";

    contenedor.innerHTML = html;
}


/* ==================== INICIALIZACIÓN ==================== */

document.addEventListener("DOMContentLoaded", function() {
    generarDiccionario();

    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "block";
    }

    document.querySelectorAll(".pagina").forEach(function(pagina) {
        pagina.style.display = "none";
    });

    actualizarProgreso();
    actualizarBotonModo();
});

/* =========================================================
   PARTE 3/3 — PROGRESO + MODO OSCURO + EJERCICIOS + LABORATORIO + QUIZ
   ========================================================= */


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
        document.body.classList.toggle("modo-oscuro");

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
        document.body.classList.contains("modo-oscuro");

    boton.textContent = activado
        ? "☀️ Modo claro"
        : "🌙 Modo oscuro";
}


function cargarModoOscuro() {
    const guardado =
        localStorage.getItem("luAlexModoOscuro");

    if (guardado === "true") {
        document.body.classList.add("modo-oscuro");
    }

    actualizarBotonModo();
}


/* ==================== EJERCICIOS ==================== */

const respuestasEjercicios = {
    ejercicioVariables: {
        respuesta:
`local nombre = "Angel"
local edad = 15

print(nombre)
print(edad)`,
        explicacion:
            "local crea variables locales. En este ejemplo nombre guarda un string y edad guarda un número."
    },

    ejercicioCondicionales: {
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

    ejercicioBucles: {
        respuesta:
`for i = 1, 5 do
    print(i)
end`,
        explicacion:
            "El for numérico comienza en 1 y continúa hasta 5. La variable i cambia en cada vuelta."
    },

    ejercicioFunciones: {
        respuesta:
`local function sumar(a, b)
    return a + b
end

print(sumar(5, 3))`,
        explicacion:
            "La función recibe dos parámetros y devuelve su suma mediante return."
    },

    ejercicioTablas: {
        respuesta:
`local frutas = {
    "manzana",
    "banana",
    "pera"
}

print(frutas[1])`,
        explicacion:
            "Las tablas usadas como secuencias comienzan normalmente en el índice 1. Por eso frutas[1] contiene manzana."
    },

    ejercicioStrings: {
        respuesta:
`local nombre = "Angel"

print("Hola " .. nombre)`,
        explicacion:
            "El operador .. concatena strings. Aquí une 'Hola ' con el contenido de nombre."
    },

    ejercicioOperadores: {
        respuesta:
`local a = 10
local b = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)`,
        explicacion:
            "Lua permite realizar operaciones matemáticas mediante los operadores +, -, * y /."
    }
};


function mostrarRespuesta(id) {
    const datos = respuestasEjercicios[id];

    if (!datos) {
        return;
    }

    const contenedor =
        document.getElementById(id + "Respuesta");

    if (!contenedor) {
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

    const a = Number(valorA.value);
    const b = Number(valorB.value);

    if (
        valorA.value.trim() === "" ||
        valorB.value.trim() === ""
    ) {
        salida.textContent =
            "Escribe los dos valores primero.";
        return;
    }

    let resultado;

    switch (operacion.value) {

        case "+":
            resultado = a + b;
            break;

        case "-":
            resultado = a - b;
            break;

        case "*":
            resultado = a * b;
            break;

        case "/":
            if (b === 0) {
                salida.textContent =
                    "No se puede dividir entre cero.";
                return;
            }

            resultado = a / b;
            break;

        case "//":
            if (b === 0) {
                salida.textContent =
                    "No se puede dividir entre cero.";
                return;
            }

            resultado = Math.floor(a / b);
            break;

        case "%":
            if (b === 0) {
                salida.textContent =
                    "No se puede calcular el resto con cero.";
                return;
            }

            resultado = a % b;
            break;

        case "^":
            resultado = a ** b;
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
        Math.round((puntos / total) * 100);

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
