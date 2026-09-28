/* LuaDrix — lógica principal. LuaDrix usa Lua 5.5 como referencia. */
const SUPABASE_URL = "https://tiwqgwshekjkojpwnksr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Un40MYviqC42PUNTz9yxEQ_l24N2non";
let supabaseClient = null;
try { if (window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY); } catch(e) { console.warn("Supabase no pudo inicializarse:", e); }

const levels = [
 {id:1,name:"Recién empezando",desc:"Tus primeros pasos programando en Lua.",lessons:[
  {id:"l1",title:"Tu primer print",concepts:["print"],explain:"`print()` muestra información en la consola. Es una de las primeras herramientas para comprobar qué está haciendo tu programa.",code:'print("Hola, LuaDrix!")',questions:[{q:"¿Qué función usamos para mostrar texto?",o:["print()","input()","show()"],a:0}],challenge:{prompt:'Escribe un programa que muestre exactamente: Hola Lua',check:/print\s*\(\s*["']Hola Lua["']\s*\)/i}},
  {id:"l2",title:"Variables y local",concepts:["variables","local","asignacion"],explain:"Una variable guarda un valor. En Lua, `local nombre = valor` crea una variable local.",code:'local nombre = "Angel"\nprint(nombre)',questions:[{q:"¿Qué palabra crea una variable local?",o:["local","var","let"],a:0}],challenge:{prompt:'Crea una variable local llamada nombre y asígnale el texto Angel.',check:/local\s+nombre\s*=\s*["']Angel["']/i}},
  {id:"l3",title:"Tipos de valores",concepts:["tipos"],explain:"Lua trabaja con valores como string, number, boolean, nil, table, function, thread y userdata. `type(valor)` te dice su tipo.",code:'local edad = 13\nprint(type(edad))',questions:[{q:"¿Qué devuelve type(123)?",o:["number","string","boolean"],a:0}],challenge:{prompt:'Crea una variable local llamada edad con un número y usa print(type(edad)) para mostrar su tipo.',check:/local\s+edad\s*=\s*\d[\s\S]*print\s*\(\s*type\s*\(\s*edad\s*\)\s*\)/i}},
  {id:"l4",title:"Booleanos y comparaciones",concepts:["booleanos","operadores"],explain:"Los booleanos son `true` y `false`. Comparaciones como `==`, `~=`, `<` y `>` producen booleanos.",code:'local edad = 13\nprint(edad >= 13)',questions:[{q:"¿Qué dos valores representan verdadero y falso?",o:["true y false","yes y no","1 y 0"],a:0}],challenge:{prompt:'Crea una variable local llamada edad con 13 y muestra si edad es mayor o igual que 13.',check:/local\s+edad\s*=\s*13[\s\S]*print\s*\([^\n]*edad\s*>=\s*13/i}}
 ]},
 {id:2,name:"Construyendo bases",desc:"Decisiones, repeticiones y datos.",lessons:[
  {id:"l5",title:"Condicionales if",concepts:["condicionales","if"],explain:"`if condicion then ... end` ejecuta un bloque cuando la condición es verdadera. Puedes añadir `elseif` y `else`.",code:'local edad = 13\nif edad >= 13 then\n  print("Puedes continuar")\nelse\n  print("Aún no")\nend',questions:[{q:"¿Qué palabra termina un if?",o:["end","stop","endif"],a:0}],challenge:{prompt:'Crea un if que compruebe si una variable llamada edad es mayor o igual que 13 y muestre "Sí".',check:/if[\s\S]*edad\s*>=\s*13[\s\S]*then[\s\S]*print\s*\(["']Sí["']\)[\s\S]*end/i}},
  {id:"l6",title:"Bucles for",concepts:["bucles","for"],explain:"Los bucles repiten instrucciones. Un `for` numérico puede recorrer un rango: `for i = 1, 5 do ... end`.",code:'for i = 1, 5 do\n  print(i)\nend',questions:[{q:"¿Qué palabra abre el bloque de un for numérico?",o:["do","then","repeat"],a:0}],challenge:{prompt:'Escribe un for que imprima los números del 1 al 5.',check:/for\s+\w+\s*=\s*1\s*,\s*5\s*do[\s\S]*print\s*\([^)]+\)[\s\S]*end/i}},
  {id:"l7",title:"while y repeat",concepts:["while","repeat"],explain:"`while condicion do` repite mientras la condición sea verdadera. `repeat ... until condicion` ejecuta primero y comprueba después.",code:'local n = 1\nwhile n <= 3 do\n  print(n)\n  n = n + 1\nend',questions:[{q:"¿Cuál comprueba la condición al final?",o:["repeat ... until","while ... do","for ... do"],a:0}],challenge:{prompt:'Crea un while que cuente de 1 a 3 usando una variable n.',check:/local\s+n\s*=\s*1[\s\S]*while\s+n\s*<=\s*3\s*do[\s\S]*n\s*=\s*n\s*\+\s*1[\s\S]*end/i}},
  {id:"l8",title:"Funciones",concepts:["funciones","function"],explain:"Una función agrupa instrucciones reutilizables. Se define con `function nombre() ... end` y se llama con `nombre()`.",code:'function saludar()\n  print("Hola")\nend\nsaludar()',questions:[{q:"¿Cómo llamamos a una función llamada saludar?",o:["saludar()","call saludar","run(saludar)"],a:0}],challenge:{prompt:'Crea una función llamada saludar que muestre "Hola" y después llámala.',check:/function\s+saludar\s*\([)]\s*[\s\S]*print\s*\(["']Hola["']\)[\s\S]*end[\s\S]*saludar\s*\(\s*\)/i}}
 ]},
 {id:3,name:"Primeros retos",desc:"Ahora empiezan los desafíos que mezclan conceptos.",lessons:[
  {id:"l9",title:"Parámetros y return",concepts:["parametros","return"],explain:"Las funciones pueden recibir parámetros y devolver un valor con `return`.",code:'function sumar(a, b)\n  return a + b\nend\nprint(sumar(2, 3))',questions:[{q:"¿Qué palabra devuelve un valor desde una función?",o:["return","give","send"],a:0}],challenge:{prompt:'Crea sumar(a, b) que devuelva a + b y muestra el resultado de sumar(2, 3).',check:/function\s+sumar\s*\(\s*a\s*,\s*b\s*\)[\s\S]*return\s+a\s*\+\s*b[\s\S]*end[\s\S]*sumar\s*\(\s*2\s*,\s*3\s*\)/i}},
  {id:"l10",title:"Tablas",concepts:["tablas"],explain:"Las tablas son la estructura de datos principal de Lua. Pueden funcionar como listas y como pares clave-valor.",code:'local frutas = {"manzana", "pera", "uva"}\nprint(frutas[1])',questions:[{q:"¿En qué índice empieza normalmente una lista Lua?",o:["1","0","-1"],a:0}],challenge:{prompt:'Crea una tabla frutas con "manzana" y "pera" y muestra el primer elemento.',check:/local\s+frutas\s*=\s*\{[\s\S]*["']manzana["'][\s\S]*["']pera["'][\s\S]*\}[\s\S]*print\s*\(\s*frutas\s*\[\s*1\s*\]/i}},
  {id:"l11",title:"Strings y string.find",concepts:["strings","string.find"],explain:"Los strings son texto. La biblioteca `string` incluye funciones como `string.find` para buscar patrones o texto dentro de otro string.",code:'local texto = "Lua es genial"\nlocal inicio = string.find(texto, "genial")\nprint(inicio)',questions:[{q:"¿Qué función busca una coincidencia dentro de un string?",o:["string.find()","string.search()","find.string()"],a:0}],challenge:{prompt:'Crea texto = "Hola Lua" y usa string.find(texto, "Lua").',check:/local\s+texto\s*=\s*["']Hola Lua["'][\s\S]*string\.find\s*\(\s*texto\s*,\s*["']Lua["']\s*\)/i}},
  {id:"l12",title:"Tablas con pares clave-valor",concepts:["tablas","pares"],explain:"Una tabla también puede guardar valores con claves: `{nombre = \"Angel\", edad = 13}`.",code:'local persona = {nombre = "Angel", edad = 13}\nprint(persona.nombre)',questions:[{q:"¿Cómo accedes al campo nombre de persona?",o:["persona.nombre","persona->nombre","persona::nombre"],a:0}],challenge:{prompt:'Crea una tabla persona con nombre = "Angel" y muestra persona.nombre.',check:/local\s+persona\s*=\s*\{[\s\S]*nombre\s*=\s*["']Angel["'][\s\S]*\}[\s\S]*print\s*\(\s*persona\.nombre\s*\)/i}}
 ]},
 {id:4,name:"Construcciones intermedias",desc:"Combina estructuras y empieza a pensar como programador.",lessons:[
  {id:"l13",title:"Operadores lógicos",concepts:["and","or","not"],explain:"`and`, `or` y `not` permiten combinar o invertir condiciones.",code:'local edad = 15\nlocal tienePermiso = true\nprint(edad >= 13 and tienePermiso)',questions:[{q:"¿Cuál operador invierte un booleano?",o:["not","and","or"],a:0}],challenge:{prompt:'Crea edad = 15 y permiso = true; muestra si edad >= 13 y permiso.',check:/local\s+edad\s*=\s*15[\s\S]*local\s+permiso\s*=\s*true[\s\S]*print\s*\([^\n]*edad\s*>=\s*13\s+and\s+permiso/i}},
  {id:"l14",title:"Funciones anónimas y callbacks",concepts:["funciones anonimas","callbacks"],explain:"Una función puede guardarse en una variable y pasarse como valor a otra función.",code:'local doble = function(x)\n  return x * 2\nend\nprint(doble(4))',questions:[{q:"¿Una función puede guardarse en una variable?",o:["Sí","No","Solo en tablas"],a:0}],challenge:{prompt:'Crea una variable doble que contenga una función y devuelva x * 2.',check:/local\s+doble\s*=\s*function\s*\(\s*x\s*\)[\s\S]*return\s+x\s*\*\s*2[\s\S]*end/i}},
  {id:"l15",title:"Iteración con ipairs y pairs",concepts:["ipairs","pairs"],explain:"`ipairs` recorre secuencias numéricas; `pairs` recorre pares clave-valor de una tabla.",code:'local frutas = {"manzana", "pera"}\nfor i, fruta in ipairs(frutas) do\n  print(i, fruta)\nend',questions:[{q:"¿Qué usarías para recorrer una lista secuencial?",o:["ipairs","pairs","loops"],a:0}],challenge:{prompt:'Usa ipairs para recorrer una tabla frutas y mostrar sus valores.',check:/for\s+\w+\s*,\s*\w+\s+in\s+ipairs\s*\([^)]*\)[\s\S]*print\s*\(/i}},
  {id:"l16",title:"Módulos con require",concepts:["modulos","require"],explain:"Los módulos permiten separar código. `require` carga un módulo y devuelve lo que ese módulo expone.",code:'local mathx = require("mathx")',questions:[{q:"¿Qué función se usa normalmente para cargar un módulo?",o:["require()","loadmodule()","include()"],a:0}],challenge:{prompt:'Escribe una línea que cargue un módulo llamado mathx con require.',check:/require\s*\(\s*["']mathx["']\s*\)/i}}
 ]},
 {id:5,name:"Lua en profundidad",desc:"Errores, metatables, coroutines y más.",lessons:[
  {id:"l17",title:"Errores y pcall",concepts:["errores","pcall"],explain:"Los errores pueden manejarse con `pcall`, que ejecuta una función protegida y devuelve si tuvo éxito.",code:'local ok, resultado = pcall(function() return 10 / 2 end)\nprint(ok, resultado)',questions:[{q:"¿Qué función ejecuta código protegido frente a errores?",o:["pcall","try","protect"],a:0}],challenge:{prompt:'Usa pcall con una función que devuelva 10 + 5.',check:/pcall\s*\(\s*function\s*\(\s*\)[\s\S]*return\s+10\s*\+\s*5[\s\S]*end\s*\)/i}},
  {id:"l18",title:"Metatables y metamétodos",concepts:["metatables","metamethods"],explain:"Las metatables permiten cambiar o ampliar el comportamiento de tablas mediante metamétodos como `__add`, `__index` y `__tostring`.",code:'local a = setmetatable({x = 1}, {__tostring = function(t) return "x=" .. t.x end})\nprint(a)',questions:[{q:"¿Qué función asigna una metatable a una tabla?",o:["setmetatable","metatable.set","attachmeta"],a:0}],challenge:{prompt:'Crea una tabla y asígnale una metatable usando setmetatable.',check:/setmetatable\s*\(/i}},
  {id:"l19",title:"Coroutines",concepts:["coroutines"],explain:"Las coroutines permiten suspender y reanudar una ejecución cooperativa con `coroutine.create`, `resume` y `yield`.",code:'local co = coroutine.create(function() coroutine.yield("pausa") end)\nprint(coroutine.resume(co))',questions:[{q:"¿Qué función suspende una coroutine desde dentro?",o:["coroutine.yield","coroutine.pause","yield.now"],a:0}],challenge:{prompt:'Crea una coroutine que use coroutine.yield("pausa").',check:/coroutine\.create\s*\([\s\S]*coroutine\.yield\s*\(["']pausa["']\)/i}},
  {id:"l20",title:"Bibliotecas estándar",concepts:["math","table","string","io","os","debug"],explain:"Lua 5.5 incluye bibliotecas estándar como math, table, string, utf8, io, os, coroutine, package y debug. Aprende a elegir la herramienta correcta.",code:'print(math.floor(3.8))\nprint(string.upper("lua"))\nprint(table.concat({"a", "b"}, "-"))',questions:[{q:"¿Qué biblioteca usarías para operaciones matemáticas?",o:["math","table","string"],a:0}],challenge:{prompt:'Usa math.floor con 3.8 y muestra el resultado.',check:/print\s*\(\s*math\.floor\s*\(\s*3\.8\s*\)\s*\)/i}}
 ]}
];

const library=[
 ["print()","Muestra valores en la salida.","print(\"Hola\")","Básico"],["type()","Devuelve el tipo de un valor.","type(123)","Básico"],["string.find()","Busca una coincidencia en un string.","string.find(\"Lua\", \"u\")","Strings"],["string.upper()","Convierte texto a mayúsculas.","string.upper(\"lua\")","Strings"],["table.insert()","Inserta un valor en una tabla.","table.insert(t, \"x\")","Tablas"],["table.remove()","Elimina un elemento de una tabla.","table.remove(t, 1)","Tablas"],["table.concat()","Une elementos de una tabla en un string.","table.concat(t, \",\")","Tablas"],["math.floor()","Redondea hacia abajo.","math.floor(3.8)","Math"],["math.random()","Genera números pseudoaleatorios.","math.random(1, 10)","Math"],["io.read()","Lee una línea desde la entrada estándar.","local x = io.read()","IO"],["os.date()","Obtiene información de fecha/hora.","os.date()","OS"],["pcall()","Ejecuta una función protegida.","pcall(func)","Errores"],["require()","Carga un módulo.","local x = require(\"x\")","Módulos"],["setmetatable()","Asigna una metatable.","setmetatable(t, meta)","Metatables"],["coroutine.create()","Crea una coroutine.","coroutine.create(func)","Coroutines"]
];
const labExamples={variables:'local nombre = "Angel"\nprint(nombre)',tipos:'local x = 42\nprint(type(x))',operadores:'print(10 + 5)\nprint(10 > 5)',condicionales:'local x = 10\nif x > 5 then\n  print("mayor")\nelse\n  print("menor o igual")\nend',bucles:'for i = 1, 5 do\n  print(i)\nend',funciones:'function sumar(a, b)\n  return a + b\nend\nprint(sumar(2, 3))',tablas:'local t = {"a", "b", "c"}\nfor i, v in ipairs(t) do print(i, v) end',strings:'local texto = "LuaDrix"\nprint(string.upper(texto))\nprint(string.find(texto, "Drix"))',math:'print(math.floor(3.8))\nprint(math.max(4, 9))',errores:'local ok, resultado = pcall(function() return 10 / 2 end)\nprint(ok, resultado)',metatables:'local t = setmetatable({x=2}, {__tostring=function(v) return "x="..v.x end})\nprint(t)',coroutines:'local co = coroutine.create(function() coroutine.yield("pausa") end)\nprint(coroutine.resume(co))',modulos:'-- Ejemplo conceptual:\nlocal modulo = require("mi_modulo")'};


/* =========================================================
   PROGRESO Y GAMIFICACIÓN
   ========================================================= */

const ACHIEVEMENTS = [
  {id:'primer-paso',name:'Primer paso',icon:'🚀',desc:'Completa tu primera lección.',done:()=>state.completed.length>=1},
  {id:'primer-reto',name:'Primer reto',icon:'🎯',desc:'Supera tu primer reto de código.',done:()=>state.challengesCompleted>=1},
  {id:'2500-exp',name:'2500 EXP',icon:'💎',desc:'Consigue 2500 EXP.',done:()=>state.xp>=2500},
  {id:'codigo-maestro',name:'Código maestro',icon:'🧠',desc:'Completa todos los retos de código de la ruta.',done:()=>state.challengesCompleted>=totalLessons()},
  {id:'coleccionista',name:'Coleccionista',icon:'📚',desc:'Descubre todos los conceptos de la Biblioteca.',done:()=>state.librarySeen.length>=library.length},
  {id:'magnate',name:'Magnate',icon:'🪙',desc:'Acumula 500 monedas.',done:()=>state.coins>=500},
  {id:'leyenda',name:'Leyenda',icon:'🏆',desc:'Consigue 2500 EXP y completa la ruta.',done:()=>state.xp>=2500&&state.completed.length>=totalLessons()},
  {id:'bibliotecario',name:'Bibliotecario',icon:'📖',desc:'Visita la Biblioteca.',done:()=>state.libraryVisited},
  {id:'perfil',name:'Perfil',icon:'👤',desc:'Configura tu perfil.',done:()=>state.profileConfigured},
  {id:'racha-3',name:'Constancia',icon:'🔥',desc:'Consigue una racha de 3 días.',done:()=>state.streak>=3},
  {id:'racha-7',name:'Una semana',icon:'🔥',desc:'Consigue una racha de 7 días.',done:()=>state.streak>=7},
  {id:'nivel-3',name:'Subiendo',icon:'⬆️',desc:'Llega al nivel 3.',done:()=>getLevel()>=3},
  {id:'nivel-5',name:'Nivel 5',icon:'🏅',desc:'Llega al nivel 5.',done:()=>getLevel()>=5},
  {id:'laboratorio-10',name:'Experimentador',icon:'🧪',desc:'Ejecuta el laboratorio 10 veces.',done:()=>state.labRuns>=10},
  {id:'sin-pista',name:'A pulso',icon:'💡',desc:'Completa una lección sin usar pistas.',done:()=>state.lessonsWithoutHints>=1},
  {id:'conceptos-10',name:'Explorador',icon:'🗺️',desc:'Aprende 10 conceptos.',done:()=>state.known.length>=10},
  {id:'lua55',name:'Lua 5.5',icon:'🐍',desc:'Completa la ruta completa de LuaDrix.',done:()=>state.completed.length>=totalLessons()},
  {id:'lua-drix',name:'LuaDrix completo',icon:'🌟',desc:'Completa la ruta y configura tu perfil.',done:()=>state.completed.length>=totalLessons()&&state.profileConfigured}
];

const state = {
  xp:Number(localStorage.getItem('luaDrixXP')||0),
  coins:Number(localStorage.getItem('luaDrixCoins')||0),
  lives:Number(localStorage.getItem('luaDrixLives') ?? 5),
  lastLife:Number(localStorage.getItem('luaDrixLifeTime')||Date.now()),
  streak:Number(localStorage.getItem('luaDrixRacha')||0),
  lastDay:localStorage.getItem('luaDrixUltimoDia')||'',
  completed:JSON.parse(localStorage.getItem('luaDrixCompleted')||'[]'),
  known:JSON.parse(localStorage.getItem('luaDrixKnown')||'[]'),
  profile:JSON.parse(localStorage.getItem('luaDrixPerfil')||'null'),
  profileConfigured:localStorage.getItem('luaDrixProfileConfigured')==='1',
  libraryVisited:localStorage.getItem('luaDrixLibraryVisited')==='1',
  librarySeen:JSON.parse(localStorage.getItem('luaDrixLibrarySeen')||'[]'),
  challengesCompleted:Number(localStorage.getItem('luaDrixChallenges')||0),
  labRuns:Number(localStorage.getItem('luaDrixLabRuns')||0),
  lessonsWithoutHints:Number(localStorage.getItem('luaDrixLessonsWithoutHints')||0),
  questionRewards:JSON.parse(localStorage.getItem('luaDrixQuestionRewards')||'[]'),
  reviewRewards:JSON.parse(localStorage.getItem('luaDrixReviewRewards')||'{}'),
  currentLesson:null,
  lessonStep:0,
  answeredQuestions:{},
  usedHint:false,
  surveyStep:0,
  diagnosticDone:localStorage.getItem('luaDrixDiagnostic')==='1',
  quizStep:0,
  quizAnswers:[]
};

function save(){
  localStorage.setItem('luaDrixXP',state.xp);
  localStorage.setItem('luaDrixCoins',state.coins);
  localStorage.setItem('luaDrixLives',state.lives);
  localStorage.setItem('luaDrixLifeTime',state.lastLife);
  localStorage.setItem('luaDrixRacha',state.streak);
  localStorage.setItem('luaDrixUltimoDia',state.lastDay);
  localStorage.setItem('luaDrixCompleted',JSON.stringify(state.completed));
  localStorage.setItem('luaDrixKnown',JSON.stringify(state.known));
  localStorage.setItem('luaDrixProfileConfigured',state.profileConfigured?'1':'0');
  localStorage.setItem('luaDrixLibraryVisited',state.libraryVisited?'1':'0');
  localStorage.setItem('luaDrixLibrarySeen',JSON.stringify(state.librarySeen));
  localStorage.setItem('luaDrixChallenges',state.challengesCompleted);
  localStorage.setItem('luaDrixLabRuns',state.labRuns);
  localStorage.setItem('luaDrixLessonsWithoutHints',state.lessonsWithoutHints);
  localStorage.setItem('luaDrixQuestionRewards',JSON.stringify(state.questionRewards));
  localStorage.setItem('luaDrixReviewRewards',JSON.stringify(state.reviewRewards));
  if(state.profile)localStorage.setItem('luaDrixPerfil',JSON.stringify(state.profile));
}

function totalLessons(){return levels.reduce((n,l)=>n+l.lessons.length,0)}
function xpForLevel(n){return 100+(n-1)*50}
function getLevel(){let n=1,x=state.xp;while(x>=xpForLevel(n)){x-=xpForLevel(n);n++;}return n}
function xpInfo(){const n=getLevel();let before=0;for(let i=1;i<n;i++)before+=xpForLevel(i);const current=state.xp-before,need=xpForLevel(n);return {n,current,need,remaining:Math.max(0,need-current)}}
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function yesterday(){const d=new Date();d.setDate(d.getDate()-1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}

/* 5 vidas. Se recupera 1 cada 2 horas hasta un máximo de 5. */
function updateLives(){
  const now=Date.now();
  if(state.lives>=5){state.lastLife=now;save();return}
  const elapsed=now-state.lastLife;
  const recovered=Math.floor(elapsed/(2*60*60*1000));
  if(recovered>0){
    state.lives=Math.min(5,state.lives+recovered);
    state.lastLife=state.lives>=5?now:state.lastLife+recovered*2*60*60*1000;
    save();
  }
}
function loseLife(){
  updateLives();
  if(state.lives<=0)return false;
  state.lives--;
  state.lastLife=Date.now();
  save();
  return true;
}
function nextLifeText(){
  updateLives();
  if(state.lives>=5)return 'Vidas completas';
  const remaining=2*60*60*1000-(Date.now()-state.lastLife);
  const min=Math.max(0,Math.ceil(remaining/60000));
  return `+1 vida en ${min} min`;
}

function addXP(amount){state.xp+=amount;state.coins+=Math.max(1,Math.floor(amount/5));save();updateUI()}
function markActivity(){
  const t=today();
  if(state.lastDay===t)return;
  if(state.lastDay===yesterday())state.streak++;
  else state.streak=1;
  state.lastDay=t;
  addXP(5);
  save();
}

function updateUI(){
  updateLives();
  const x=xpInfo();
  const n=document.getElementById('nivelTexto'); if(n)n.textContent=`Nivel ${x.n}`;
  const xp=document.getElementById('xpTexto'); if(xp)xp.textContent=`${x.current} / ${x.need} EXP`;
  const bar=document.getElementById('xpBarra'); if(bar)bar.style.width=`${Math.min(100,x.current/x.need*100)}%`;
  const r=document.getElementById('rachaTexto'); if(r)r.textContent=`${state.streak} días`;
  const l=document.getElementById('energiaTexto'); if(l){l.textContent=`${state.lives} / 5`;l.parentElement?.querySelector('small')?.replaceChildren(document.createTextNode('Vidas'));}
  const c=document.getElementById('monedasTexto'); if(c)c.textContent=state.coins;
  renderLevels('homeLevels');
  renderContinue();
}

function mostrarPantalla(id){
  document.querySelectorAll('.pantalla').forEach(x=>x.classList.remove('activa'));
  const el=document.getElementById(id);if(el)el.classList.add('activa');
  if(id==='niveles')renderLevels('levelsPage');
  if(id==='biblioteca'){state.libraryVisited=true;save();buscarBiblioteca();}
  if(id==='laboratorio')initLab();
  if(id==='logros')renderAchievements();
  if(id==='perfil')renderProfile();
  window.scrollTo({top:0,behavior:'smooth'});
}
function volverInicio(){mostrarPantalla('inicio')}
function continuarAprendiendo(){const next=findNextLesson();if(next)openLesson(next.level,next.lesson);else mostrarPantalla('niveles')}
function findNextLesson(){for(const level of levels)for(const lesson of level.lessons)if(!state.completed.includes(lesson.id))return {level,lesson};return null}
function levelUnlocked(index){return index===0||levels[index-1].lessons.every(l=>state.completed.includes(l.id))}
function renderLevels(target){
  const el=document.getElementById(target);if(!el)return;
  el.innerHTML=levels.map((level,i)=>{
    const done=level.lessons.filter(l=>state.completed.includes(l.id)).length,unlocked=levelUnlocked(i);
    return `<div class="level-card ${unlocked?'':'locked'}"><div class="level-main"><div class="level-number">${unlocked?level.id:'🔒'}</div><div><h3>Nivel ${level.id} — ${escapeHTML(level.name)}</h3><p>${escapeHTML(level.desc)}</p><small>${done}/${level.lessons.length} lecciones completadas</small></div></div><div class="level-progress"><small>${Math.round(done/level.lessons.length*100)}%</small><div class="xp-track"><i style="width:${done/level.lessons.length*100}%"></i></div><button ${unlocked?'':'disabled'} onclick="openLevel(${i})" class="${unlocked?'primary':''}">${unlocked?'Abrir nivel':'Bloqueado'}</button></div></div>`;
  }).join('');
}
function openLevel(i){if(!levelUnlocked(i))return;const first=levels[i].lessons.find(l=>!state.completed.includes(l.id))||levels[i].lessons[0];openLesson(levels[i],first)}

/* =========================================================
   LECCIONES POR PASOS
   ========================================================= */

const teaching={
 print:[['¿Qué es print?','print() es una función que muestra un valor en la salida.'],['Cómo se escribe','Se escribe con paréntesis: print("Hola"). El texto entre comillas es un string.'],['Cuándo usarlo','Úsalo para comprobar valores y ver qué está haciendo tu programa.']],
 variables:[['¿Qué es una variable?','Una variable es un nombre que usamos para guardar un valor.'],['local','local crea una variable local: local nombre = "Angel".'],['Asignación','El signo = coloca el valor de la derecha dentro de la variable de la izquierda.']],
 local:[['¿Qué significa local?','local limita una variable al alcance donde fue creada.'],['Crear una variable local','La forma básica es local nombre = valor.'],['Por qué usarlo','Las variables locales suelen ser la opción más segura y clara para datos temporales.']],
 tipos:[['Los tipos','Lua puede trabajar con valores de tipos como string, number, boolean, nil, table y function.'],['number','Los números pertenecen al tipo number: 42, 3.5, -8.'],['type()','type(valor) devuelve el tipo del valor que le pases.']],
 booleanos:[['Dos valores','Los booleanos solo tienen dos valores: true y false.'],['Pensar en condiciones','Una comparación como edad >= 13 produce true o false.'],['Usarlos','Los booleanos son útiles para decidir si algo debe ocurrir.']],
 operadores:[['Comparar','Operadores como ==, ~=, <, >, <= y >= comparan valores.'],['Resultado','Las comparaciones producen un booleano: true o false.'],['Leer la expresión','Primero identifica qué valores comparas y después qué resultado esperas.']],
 condicionales:[['La idea','Un if ejecuta código solo cuando su condición es verdadera.'],['then','then marca el inicio del bloque que pertenece al if.'],['else y elseif','elseif prueba otra condición y else se ejecuta cuando ninguna anterior se cumple.'],['end','end cierra el bloque del if.']],
 if:[['if','if inicia una decisión: if condicion then.'],['then','then indica qué código pertenece a esa decisión.'],['end','end cierra el bloque.']],
 bucles:[['La idea','Un bucle repite instrucciones.'],['for','Un for numérico usa un contador, un inicio y un final.'],['do y end','do abre el bloque del bucle y end lo cierra.']],
 for:[['for numérico','for i = 1, 5 do repite el bloque con i tomando los valores del rango.'],['Contador','La variable i cambia en cada vuelta.'],['Rango','Puedes cambiar el inicio, final y paso según lo que necesites.']],
 while:[['while','while repite mientras su condición sea verdadera.'],['La condición','La condición se comprueba antes de cada vuelta.'],['Evitar bucles infinitos','Normalmente necesitas cambiar algún valor dentro del bucle para que la condición llegue a ser falsa.']],
 repeat:[['repeat','repeat inicia un bucle que se ejecuta al menos una vez.'],['until','until comprueba la condición al final de la vuelta.'],['Diferencia','while comprueba antes; repeat...until comprueba después.']],
 funciones:[['Qué es una función','Una función agrupa instrucciones para poder reutilizarlas.'],['function','function inicia la definición de una función.'],['Llamarla','Después de definirla, escribes su nombre con paréntesis para ejecutarla.']],
 function:[['Definir','function saludar() comienza una función llamada saludar.'],['Bloque','El código de la función queda entre su definición y end.'],['Ejecutar','saludar() llama a la función.']],
 parametros:[['Parámetros','Los parámetros son nombres que reciben valores cuando llamas a una función.'],['Ejemplo','sumar(a, b) tiene dos parámetros: a y b.'],['Usarlos','Dentro de la función puedes usar esos valores como cualquier otra variable.']],
 return:[['return','return devuelve un valor desde una función.'],['Detener la función','Cuando se ejecuta return, esa llamada a la función termina.'],['Usar el resultado','Puedes guardar o imprimir el valor devuelto.']],
 tablas:[['Qué es una tabla','table es la estructura de datos más flexible de Lua.'],['Lista','Una tabla puede guardar valores en posiciones numéricas: {"a", "b"}.'],['Índices','Las listas de Lua normalmente comienzan en el índice 1.']],
 strings:[['Qué es un string','Un string es texto, normalmente escrito entre comillas.'],['Concatenar','El operador .. une strings.'],['Biblioteca string','La biblioteca string ofrece funciones para trabajar con texto.']],
 'string.find':[['Qué hace','string.find busca una coincidencia dentro de otro string.'],['Resultado','Puede devolver la posición donde empieza la coincidencia.'],['Usarlo','string.find("Lua", "u") busca la letra u dentro de Lua.']],
 pares:[['Clave y valor','Una tabla puede relacionar una clave con un valor.'],['Sintaxis','{nombre = "Angel"} crea una entrada cuya clave es nombre.'],['Acceder','persona.nombre accede al valor asociado con la clave nombre.']],
 and:[['and','and combina dos expresiones.'],['Ambas condiciones','En una condición booleana, normalmente necesitas que las dos expresiones sean verdaderas.']],
 or:[['or','or permite que una expresión sea verdadera si una de las partes lo es.'],['Alternativas','También puede servir para elegir un valor alternativo.']],
 not:[['not','not invierte un booleano: not true es false y not false es true.']],
 'funciones anonimas':[['Función anónima','Es una función sin nombre que puedes guardar en una variable.'],['Guardar','local doble = function(x) ... end guarda la función en doble.'],['Usar','Después puedes llamar doble(4) como a una función normal.']],
 callbacks:[['Callback','Un callback es una función que entregas a otra función para que pueda ejecutarla.'],['Funciones como valores','En Lua las funciones pueden guardarse y pasarse como valores.']],
 ipairs:[['ipairs','ipairs recorre una secuencia numérica en orden.'],['Dos variables','for i, valor in ipairs(t) recibe el índice y el valor.']],
 pairs:[['pairs','pairs recorre pares clave-valor de una tabla.'],['Cuándo usarlo','Es útil cuando las claves no forman una lista secuencial.']],
 modulos:[['Módulo','Un módulo separa código para poder reutilizarlo.'],['require','require carga un módulo y recibe lo que ese módulo devuelve.']],
 require:[['require()','require("mathx") intenta cargar un módulo llamado mathx.'],['Resultado','Normalmente guardas lo que devuelve en una variable.']],
 errores:[['Errores','Un error ocurre cuando Lua no puede continuar con una operación.'],['pcall','pcall ejecuta una función protegida y evita que el error detenga esa llamada.']],
 pcall:[['pcall()','pcall(function() ... end) devuelve si la operación tuvo éxito y, según el caso, un resultado o error.'],['Comprobar','Puedes guardar el primer resultado en ok para saber si todo salió bien.']],
 metatables:[['Metatable','Una metatable permite cambiar cómo se comporta una tabla en ciertas operaciones.'],['setmetatable','setmetatable(tabla, meta) asigna la metatable.'],['Metamétodos','Claves como __tostring o __add definen comportamientos especiales.']],
 metamethods:[['Metamétodos','Son funciones especiales que Lua consulta en operaciones concretas.'],['Ejemplo','__tostring puede controlar qué ocurre cuando conviertes una tabla en texto.']],
 coroutines:[['Coroutine','Una coroutine permite pausar y reanudar una ejecución cooperativa.'],['yield','coroutine.yield() pausa la coroutine.'],['resume','coroutine.resume() la vuelve a ejecutar.']],
 math:[['math','La biblioteca math reúne funciones matemáticas.'],['floor','math.floor(3.8) redondea hacia abajo.']],
 table:[['table','La biblioteca table contiene herramientas para modificar y combinar tablas.'],['Ejemplos','table.insert agrega elementos y table.remove elimina elementos.']],
 string:[['string','La biblioteca string reúne funciones para trabajar con texto.'],['Ejemplos','string.upper convierte a mayúsculas y string.find busca texto.']],
 io:[['io','La biblioteca io trabaja con entrada y salida, incluidos archivos.']],
 os:[['os','La biblioteca os ofrece funciones relacionadas con el sistema y la fecha/hora.']],
 debug:[['debug','La biblioteca debug ofrece herramientas para inspeccionar y depurar programas.']]
};

const extraQuestions={
 l1:[{q:'¿Qué parte de print("Hola") contiene el texto?',o:['"Hola"','print','()'],a:0,why:'El texto está dentro de las comillas; print es la función que lo muestra.',hint:'Mira qué parte está entre comillas.'}],
 l2:[{q:'¿Qué hace el signo = en local nombre = "Angel"?',o:['Asigna un valor','Compara valores','Cierra una función'],a:0,why:'= asigna el valor de la derecha a la variable de la izquierda.',hint:'Piensa en “guardar esto dentro de...”.'}],
 l3:[{q:'¿Qué función permite conocer el tipo de un valor?',o:['type()','kind()','value()'],a:0,why:'type(valor) devuelve el tipo del valor.',hint:'Empieza por t y aparece en el ejemplo.'}],
 l4:[{q:'¿Qué devuelve una comparación como 10 > 5?',o:['true o false','Un string','Una tabla'],a:0,why:'Las comparaciones producen un booleano.',hint:'Solo hay dos resultados lógicos posibles.'}],
 l5:[{q:'¿Qué palabra va después de la condición en un if?',o:['then','do','until'],a:0,why:'then inicia el bloque del if.',hint:'El ejemplo usa if condicion ___.'}],
 l6:[{q:'¿Qué palabra abre el cuerpo de un for numérico?',o:['do','then','until'],a:0,why:'do abre el bloque del for.',hint:'if usa then; for usa otra palabra.'}],
 l7:[{q:'¿Cuál comprueba la condición después de ejecutar el bloque?',o:['repeat ... until','while ... do','if ... then'],a:0,why:'repeat ejecuta primero y until comprueba después.',hint:'Busca el bucle que tiene la palabra until.'}],
 l8:[{q:'¿Qué palabra inicia una definición de función?',o:['function','define','func'],a:0,why:'function inicia la definición.',hint:'Es la palabra que aparece antes del nombre.'}],
 l9:[{q:'En sumar(a, b), ¿qué son a y b?',o:['Parámetros','Strings','Módulos'],a:0,why:'Son los parámetros que reciben los valores de la llamada.',hint:'Son nombres que esperan recibir valores.'}],
 l10:[{q:'¿Cuál es el primer índice de una lista Lua?',o:['1','0','-1'],a:0,why:'Las secuencias de Lua normalmente comienzan en 1.',hint:'Lua no usa 0 como inicio habitual de sus listas.'}],
 l11:[{q:'¿Qué busca string.find?',o:['Una coincidencia en texto','Un archivo','Una función'],a:0,why:'Busca texto o patrones dentro de un string.',hint:'Su nombre contiene find: encontrar.'}],
 l12:[{q:'¿Cómo accedes a persona.nombre?',o:['Con la clave nombre','Con persona[0]','Con ->nombre'],a:0,why:'El punto permite acceder a una clave con ese nombre.',hint:'La clave está escrita después del punto.'}],
 l13:[{q:'¿Qué operador invierte un booleano?',o:['not','and','or'],a:0,why:'not invierte true/false.',hint:'Es el operador de negación lógica.'}],
 l14:[{q:'¿Dónde puede guardarse una función anónima?',o:['En una variable','Solo en un archivo','Solo en una tabla'],a:0,why:'Las funciones son valores y pueden guardarse en variables.',hint:'El ejemplo usa local doble = ...'}],
 l15:[{q:'¿Qué iterador se usa para una lista secuencial?',o:['ipairs','pairs','iterate'],a:0,why:'ipairs recorre una secuencia numérica.',hint:'Piensa en “índice + valor”.'}],
 l16:[{q:'¿Qué función carga un módulo?',o:['require()','include()','import()'],a:0,why:'Lua usa require para cargar módulos.',hint:'Es la palabra que aparece en el ejemplo.'}],
 l17:[{q:'¿Qué devuelve pcall en primer lugar?',o:['Si tuvo éxito','El nombre del error','El módulo'],a:0,why:'El primer resultado indica si la llamada protegida tuvo éxito.',hint:'Suele guardarse en una variable llamada ok.'}],
 l18:[{q:'¿Qué función asigna una metatable?',o:['setmetatable()','attach()','meta()'],a:0,why:'setmetatable(tabla, meta) asigna la metatable.',hint:'Su nombre dice exactamente lo que hace.'}],
 l19:[{q:'¿Qué función pausa una coroutine?',o:['coroutine.yield()','coroutine.stop()','coroutine.wait()'],a:0,why:'yield suspende la ejecución cooperativa.',hint:'“yield” es la palabra usada para ceder la ejecución.'}],
 l20:[{q:'¿Qué biblioteca usarías para redondear hacia abajo?',o:['math','string','table'],a:0,why:'math.floor pertenece a la biblioteca math.',hint:'Busca la biblioteca de operaciones matemáticas.'}]
};

function enrichLessons(){
  for(const level of levels){
    for(const lesson of level.lessons){
      lesson.steps=[];
      const seen=new Set();
      for(const concept of lesson.concepts){
        const items=teaching[concept];
        if(items)for(const item of items){
          const key=item[0]+'|'+item[1];
          if(!seen.has(key)){seen.add(key);lesson.steps.push({title:item[0],text:item[1]})}
        }
      }
      if(!lesson.steps.length)lesson.steps=[['Idea principal',lesson.explain]].map(x=>({title:x[0],text:x[1]}));
      lesson.steps.push({title:'Ahora júntalo',text:'Cuando ya entiendas cada pieza, mira el ejemplo completo y trata de explicar con tus propias palabras qué hace cada línea.'});
      lesson.questions=[lesson.questions[0],...(extraQuestions[lesson.id]||[])];
      lesson.questions=lesson.questions.map((q,i)=>({...q,id:`${lesson.id}-q${i+1}`,why:q.why||`La respuesta correcta es ${q.o[q.a]}. Vuelve al paso que explica esta parte y compáralo con el ejemplo.`,hint:q.hint||'Busca la palabra o estructura que aparece literalmente en la explicación.'}));
    }
  }
}
enrichLessons();

function openLesson(level,lesson){
  if(!levelUnlocked(levels.findIndex(x=>x.id===level.id))){alert('Completa el nivel anterior primero.');return}
  const idx=level.lessons.indexOf(lesson);
  if(idx>0&&!state.completed.includes(level.lessons[idx-1].id)){alert('Primero completa la lección anterior.');return}
  updateLives();
  state.currentLesson={level,lesson};
  state.lessonStep=0;
  state.answeredQuestions={};
  state.usedHint=false;
  renderLesson();
  mostrarPantalla('leccion');
}
function renderLesson(){
  const {level,lesson}=state.currentLesson;
  const idx=level.lessons.indexOf(lesson)+1;
  document.getElementById('lessonLevel').textContent=`Nivel ${level.id}`;
  document.getElementById('lessonTitle').textContent=lesson.title;
  document.getElementById('lessonProgress').textContent=`Lección ${idx} de ${level.lessons.length}`;
  const step=lesson.steps[state.lessonStep];
  const stepNumber=state.lessonStep+1;
  const progress=Math.round((stepNumber/lesson.steps.length)*100);
  const allAnswered=lesson.questions.every(q=>state.answeredQuestions[q.id]);
  const questionsHTML=lesson.questions.map((q,i)=>{
    const answered=state.answeredQuestions[q.id];
    return `<div class="question-card ${answered?'answered':''}"><p class="question-number">Pregunta ${i+1}</p><h3>${escapeHTML(q.q)}</h3><div class="options">${q.o.map((o,j)=>`<button class="option" ${answered?'disabled':''} onclick="answerQuestion('${q.id}',${j},this)">${escapeHTML(o)}</button>`).join('')}</div><div id="feedback-${q.id}" class="feedback"></div></div>`;
  }).join('');
  document.getElementById('lessonBody').innerHTML=`
    <div class="lesson-stepper"><div><b>Parte ${stepNumber} de ${lesson.steps.length}</b><span>${progress}%</span></div><div class="step-track"><i style="width:${progress}%"></i></div></div>
    <article class="lesson-card teaching-card"><p class="eyebrow">APRENDE POCO A POCO</p><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.text)}</p>${state.lessonStep===lesson.steps.length-1?`<pre class="code">${escapeHTML(lesson.code)}</pre>`:''}<div class="step-actions">${state.lessonStep>0?'<button onclick="lessonPrevStep()">← Anterior</button>':''}${state.lessonStep<lesson.steps.length-1?'<button class="primary" onclick="lessonNextStep()">Siguiente →</button>':'<button class="primary" onclick="mostrarPreguntasLesson()">Ir a las preguntas →</button>'}</div></article>
    <div id="lessonQuestions" class="${state.lessonStep===lesson.steps.length-1?'':'hidden'}"><article class="lesson-card"><p class="eyebrow">COMPRUEBA LO QUE APRENDISTE</p><h3>Ahora toca comprobarlo</h3><p class="muted">Si fallas una pregunta pierdes 1 vida. Puedes volver a intentarlo mientras tengas vidas.</p>${questionsHTML}</article>
      <article class="lesson-card challenge"><p class="eyebrow">RETO DE CÓDIGO</p><h3>Construye algo tú mismo</h3><p>${escapeHTML(lesson.challenge.prompt)}</p><textarea id="challengeCode" spellcheck="false" placeholder="Escribe tu código Lua aquí..."></textarea><div class="challenge-actions"><button onclick="mostrarPista()">💡 Pista</button><button class="primary" onclick="submitChallenge()">Comprobar reto</button></div><div id="challengeFeedback" class="feedback"></div></article></div>`;
}
function lessonNextStep(){if(!state.currentLesson)return;if(state.lessonStep<state.currentLesson.lesson.steps.length-1){state.lessonStep++;renderLesson();window.scrollTo({top:0,behavior:'smooth'})}}
function lessonPrevStep(){if(state.lessonStep>0){state.lessonStep--;renderLesson();window.scrollTo({top:0,behavior:'smooth'})}}
function mostrarPreguntasLesson(){state.lessonStep=state.currentLesson.lesson.steps.length-1;renderLesson();document.getElementById('lessonQuestions')?.scrollIntoView({behavior:'smooth'})}
function hintFor(lesson){
  const unseen=lesson.concepts.find(c=>!state.known.includes(c));
  if(unseen)return `Pista: vuelve a la parte donde explicamos «${unseen}» y busca esa palabra en el ejemplo.`;
  return 'Pista: divide el reto en pasos pequeños. Primero escribe la estructura y después completa los valores.';
}
function mostrarPista(){
  state.usedHint=true;
  const fb=document.getElementById('challengeFeedback');
  fb.className='feedback show hint';
  fb.textContent=hintFor(state.currentLesson.lesson);
}
function answerQuestion(id,choice,button){
  updateLives();
  if(state.lives<=0){showNoLives();return}
  const q=state.currentLesson.lesson.questions.find(x=>x.id===id);if(!q||state.answeredQuestions[id])return;
  const fb=document.getElementById(`feedback-${id}`);
  if(choice===q.a){
    state.answeredQuestions[id]=true;
    button.classList.add('correcta');
    fb.className='feedback show good';
    fb.innerHTML=`<b>Correcto.</b> ${escapeHTML(q.why)}`;
    const firstTime=!state.questionRewards.includes(id);
    if(firstTime){state.questionRewards.push(id);addXP(10)}
    else{addReviewXP(id)}
    state.known.push(...state.currentLesson.lesson.concepts.filter(c=>!state.known.includes(c)));
    save();
    setTimeout(()=>renderLesson(),350);
  }else{
    loseLife();
    button.classList.add('incorrecta');
    fb.className='feedback show bad';
    fb.innerHTML=`<b>No todavía.</b> Pierdes 1 vida. ${escapeHTML(q.hint)}<br><small>${escapeHTML(q.why)}</small>`;
    updateUI();
    if(state.lives<=0)showNoLives();
  }
}
function addReviewXP(questionId){
  const key=`${today()}-${questionId}`;
  if(!state.reviewRewards[key]){state.reviewRewards[key]=true;addXP(5)}
}
function showNoLives(){
  const fb=document.querySelector('.feedback.bad');
  if(fb)fb.innerHTML='<b>Te quedaste sin vidas.</b> No puedes responder más por ahora. Recuperarás 1 vida cada 30 minutos.';
  document.querySelectorAll('.option').forEach(b=>b.disabled=true);
  updateUI();
}
function submitChallenge(){
  const {lesson}=state.currentLesson;
  if(!lesson.questions.every(q=>state.answeredQuestions[q.id])){const fb=document.getElementById('challengeFeedback');fb.className='feedback show bad';fb.textContent='Primero responde correctamente todas las preguntas de esta lección.';return}
  const code=document.getElementById('challengeCode').value.trim(),fb=document.getElementById('challengeFeedback');
  if(!code){fb.className='feedback show bad';fb.textContent='Escribe algo de código primero.';return}
  if(lesson.challenge.check.test(code)){
    if(!state.completed.includes(lesson.id)){
      state.completed.push(lesson.id);state.challengesCompleted++;lesson.concepts.forEach(c=>{if(!state.known.includes(c))state.known.push(c)});addXP(70);state.coins+=10;
      if(!state.usedHint)state.lessonsWithoutHints++;
      save();fb.className='feedback show good';fb.textContent='¡Reto superado! +70 EXP y +10 monedas.';
      updateUI();
      setTimeout(()=>{const next=findNextLesson();if(next)openLesson(next.level,next.lesson);else{alert('¡Completaste toda la ruta!');mostrarPantalla('niveles')}},700);
    }else{fb.className='feedback show good';fb.textContent='Reto correcto. Esta lección ya estaba completada.'}
  }else{fb.className='feedback show bad';fb.textContent='Aún no coincide. Revisa la consigna y usa la pista si la necesitas.'}
}

function renderContinue(){
  const c=document.getElementById('continuarCard');if(!c)return;
  const n=findNextLesson();
  if(!n){c.innerHTML='<h3>Ruta completada</h3><p>Terminaste todas las lecciones. Ahora puedes repasar y seguir acumulando EXP.</p><button onclick="mostrarPantalla(\'niveles\')">Ver ruta</button>';return}
  c.innerHTML=`<h3>Continúa: Nivel ${n.level.id} · ${escapeHTML(n.lesson.title)}</h3><p>${escapeHTML(n.level.desc)}</p><button onclick="openLesson(levels[${levels.indexOf(n.level)}],levels[${levels.indexOf(n.level)}].lessons[${n.level.lessons.indexOf(n.lesson)}])">Empezar</button>`;
}

/* =========================================================
   BIBLIOTECA
   ========================================================= */
function buscarBiblioteca(){
  state.libraryVisited=true;
  const q=(document.getElementById('librarySearch')?.value||'').toLowerCase().trim();
  const arr=library.filter(x=>x.join(' ').toLowerCase().includes(q));
  const results=document.getElementById('libraryResults');if(!results)return;
  results.innerHTML=arr.map(x=>{
    const concept=x[0];
    if(!state.librarySeen.includes(concept)){state.librarySeen.push(concept);save()}
    return `<article class="library-item"><h3>${escapeHTML(x[0])}</h3><p>${escapeHTML(x[1])}</p><pre class="code">${escapeHTML(x[2])}</pre><small>${escapeHTML(x[3])}</small></article>`;
  }).join('')||'<p>No encontramos ese concepto.</p>';
}

/* =========================================================
   LABORATORIO
   ========================================================= */
function initLab(){
  const s=document.getElementById('labTopic');if(!s)return;
  if(!s.options.length){Object.keys(labExamples).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=k;s.appendChild(o)});cargarEjemploLab()}
}
function cargarEjemploLab(){const key=document.getElementById('labTopic')?.value;if(key&&labExamples[key])document.getElementById('labCode').value=labExamples[key]}
function ejecutarLaboratorio(){
  const code=document.getElementById('labCode').value,out=document.getElementById('labOutput');
  if(!code.trim()){out.textContent='Escribe código primero.';return}
  state.labRuns++;addXP(5);save();
  out.textContent='Código recibido. El laboratorio de LuaDrix prepara la idea y la estructura; para ejecutar Lua real en el navegador habrá que conectar un runtime Lua/WASM.';
  document.getElementById('labNotes').innerHTML='<b>Consejo:</b> usa el laboratorio para experimentar y la ruta para aprender cada concepto paso a paso.';
  renderAchievements();
}
function limpiarLab(){document.getElementById('labCode').value='';document.getElementById('labOutput').textContent='La salida aparecerá aquí.'}

/* =========================================================
   LOGROS
   ========================================================= */
function achievementDone(a){return Boolean(a.done())}
function renderAchievements(){
  const grid=document.getElementById('achievementsGrid');if(!grid)return;
  grid.innerHTML=ACHIEVEMENTS.map(a=>{const done=achievementDone(a);return `<article class="achievement ${done?'unlocked':'locked'}"><div class="icon">${a.icon}</div><b>${escapeHTML(a.name)}</b><small>${done?'Completado':'Bloqueado'}</small><p>${escapeHTML(a.desc)}</p></article>`}).join('');
}

/* =========================================================
   PERFIL / CUENTA
   ========================================================= */
function renderProfile(){
  const x=xpInfo(),name=state.profile?.name||'Invitado',goal=state.profile?.goal||'Aprender Lua desde cero';
  document.getElementById('profileBody').innerHTML=`
    <div class="profile-card">
      <div class="profile-title"><div class="avatar">${escapeHTML((name[0]||'L').toUpperCase())}</div><div><h3>${escapeHTML(name)}</h3><p class="muted">${escapeHTML(goal)}</p></div></div>
      <div class="profile-grid"><div class="profile-box"><b>⭐ Nivel ${x.n}</b><br>${x.current}/${x.need} EXP</div><div class="profile-box"><b>🔥 ${state.streak}</b><br>días de racha</div><div class="profile-box"><b>🪙 ${state.coins}</b><br>monedas</div><div class="profile-box"><b>❤️ ${state.lives}/5</b><br>vidas</div></div>
      <button class="primary" onclick="abrirConfiguracionPerfil()">⚙️ Configurar perfil</button>
    </div>`;
}
function abrirConfiguracionPerfil(){
  const b=document.getElementById('accountBody');
  b.innerHTML=`<h2>Configuración de perfil</h2><p>Personaliza lo básico de tu perfil de LuaDrix.</p><div class="auth-form"><label>Nombre<input id="profileName" maxlength="30" value="${escapeHTML(state.profile?.name||'')}" placeholder="Tu nombre"></label><label>Objetivo<select id="profileGoal"><option ${state.profile?.goal==='Aprender Lua desde cero'?'selected':''}>Aprender Lua desde cero</option><option ${state.profile?.goal==='Mejorar mi programación'?'selected':''}>Mejorar mi programación</option><option ${state.profile?.goal==='Crear juegos'?'selected':''}>Crear juegos</option><option ${state.profile?.goal==='Entender Lua 5.5'?'selected':''}>Entender Lua 5.5</option></select></label><button class="primary" onclick="guardarConfiguracionPerfil()">Guardar perfil</button><p id="profileStatus" class="form-status"></p></div>`;
}
function guardarConfiguracionPerfil(){
  const name=document.getElementById('profileName').value.trim()||'Aprendiz LuaDrix';
  const goal=document.getElementById('profileGoal').value;
  state.profile={...(state.profile||{}),name,goal};state.profileConfigured=true;save();renderProfile();cerrarCuenta();renderAchievements();
}
function abrirCuenta(){document.getElementById('accountModal').classList.add('activo');document.getElementById('accountModal').setAttribute('aria-hidden','false');renderAccount()}
function cerrarCuenta(){document.getElementById('accountModal').classList.remove('activo');document.getElementById('accountModal').setAttribute('aria-hidden','true')}
function renderAccount(){
  const b=document.getElementById('accountBody');
  if(state.profile){
    b.innerHTML=`<h2>Hola, ${escapeHTML(state.profile.name)}</h2><p>Gestiona tu cuenta y tu perfil.</p><div class="account-actions"><button class="primary" onclick="mostrarPantalla('perfil');cerrarCuenta()">Ver perfil</button><button onclick="abrirConfiguracionPerfil()">⚙️ Configurar perfil</button><button onclick="cerrarSesionLocal()">Cerrar sesión</button><button class="danger" onclick="confirmarBorradoCuenta()">Borrar cuenta</button></div>`;
    return;
  }
  b.innerHTML=`<h2>Cuenta LuaDrix</h2><p>Sin cuenta puedes aprender guardando tu progreso en este navegador. Con una cuenta de Supabase puedes iniciar sesión desde otros dispositivos cuando la sincronización esté configurada.</p><div class="auth-form"><input id="authName" placeholder="Nombre"><input id="authEmail" type="email" placeholder="Correo"><input id="authPassword" type="password" placeholder="Contraseña"><button class="primary" onclick="crearCuenta()">Crear cuenta</button><button onclick="iniciarSesion()">Iniciar sesión</button></div><p id="authStatus" class="form-status"></p>`;
}
async function crearCuenta(){
  const name=document.getElementById('authName').value.trim(),email=document.getElementById('authEmail').value.trim(),password=document.getElementById('authPassword').value;
  if(!name||!email||!password){document.getElementById('authStatus').textContent='Completa los campos.';return}
  if(!supabaseClient){state.profile={name,email,goal:'Aprender Lua desde cero'};state.profileConfigured=false;save();renderAccount();renderAchievements();return}
  const {data,error}=await supabaseClient.auth.signUp({email,password,options:{data:{display_name:name}}});
  if(error){document.getElementById('authStatus').textContent=error.message;return}
  state.profile={name,email,userId:data.user?.id||null,goal:'Aprender Lua desde cero'};state.profileConfigured=false;save();renderAccount();renderAchievements();
}
async function iniciarSesion(){
  const email=document.getElementById('authEmail').value.trim(),password=document.getElementById('authPassword').value;
  if(!supabaseClient){document.getElementById('authStatus').textContent='La conexión con Supabase no está disponible.';return}
  const {data,error}=await supabaseClient.auth.signInWithPassword({email,password});
  if(error){document.getElementById('authStatus').textContent=error.message;return}
  state.profile={name:data.user.user_metadata?.display_name||email.split('@')[0],email,userId:data.user.id,goal:state.profile?.goal||'Aprender Lua desde cero'};save();renderAccount();
}
async function cerrarSesionLocal(){
  if(supabaseClient)await supabaseClient.auth.signOut();
  state.profile=null;state.profileConfigured=false;localStorage.removeItem('luaDrixPerfil');localStorage.removeItem('luaDrixProfileConfigured');cerrarCuenta();renderAchievements();
}
function confirmarBorradoCuenta(){
  const ok=confirm('¿Seguro que quieres borrar tu cuenta? Esta acción no se puede deshacer.');
  if(ok)borrarCuenta();
}
async function borrarCuenta(){
  if(!supabaseClient){
    borrarDatosLocales();
    alert('Se borró el perfil y el progreso guardado en este navegador.');
    return;
  }
  const {error}=await supabaseClient.rpc('delete_my_account');
  if(error){
    alert('No se pudo borrar la cuenta de Supabase todavía. Configura la función delete_my_account en Supabase y vuelve a intentarlo.');
    return;
  }
  borrarDatosLocales();
  alert('Cuenta borrada.');
}
function borrarDatosLocales(){
  Object.keys(localStorage).filter(k=>k.startsWith('luaDrix')).forEach(k=>localStorage.removeItem(k));
  location.reload();
}

/* =========================================================
   SUGERENCIAS
   ========================================================= */
async function enviarSugerencia(e){
  e.preventDefault();
  const category=document.getElementById('suggestionCategory').value,text=document.getElementById('suggestionText').value.trim(),status=document.getElementById('suggestionStatus');
  if(!text)return;status.textContent='Enviando...';
  if(!supabaseClient){status.textContent='Supabase no está conectado; no se pudo guardar la sugerencia.';return}
  const {error}=await supabaseClient.from('suggestions').insert({category,message:text,user_id:state.profile?.userId||null});
  status.textContent=error?`No se pudo enviar: ${error.message}`:'Sugerencia enviada. Gracias.';
  if(!error)document.getElementById('suggestionForm').reset();
}

/* =========================================================
   ONBOARDING
   ========================================================= */
function startOnboarding(){if(state.diagnosticDone)return;mostrarPantalla('diagnostico');renderOnboarding()}
const survey=[['¿Cómo descubriste LuaDrix?',['YouTube','Google','Un amigo','Redes sociales','Otro']],['¿Por qué quieres aprender programación?',['Crear juegos','Curiosidad','Colegio','Crear aplicaciones','Otro']],['¿Qué te gustaría crear con Lua?',['Juegos','Bots/IA','Herramientas','Experimentos','Otro']],['¿Qué esperas de LuaDrix?',['Lecciones claras','Muchos retos','Laboratorio','Gamificación','Todo lo anterior']]];
function renderOnboarding(){const title=document.getElementById('onboardingTitle'),body=document.getElementById('onboardingBody');if(state.surveyStep<survey.length){const [q,opts]=survey[state.surveyStep];title.textContent=`Pregunta ${state.surveyStep+1} de ${survey.length}`;body.innerHTML=`<h3>${q}</h3><div class="survey-options">${opts.map((o,i)=>`<button onclick="surveyAnswer(${i})">${escapeHTML(o)}</button>`).join('')}</div>`}else renderDiagnostic()}
async function surveyAnswer(i){state.surveyStep++;localStorage.setItem('luaDrixSurveySeen','1');if(supabaseClient){const q=survey[state.surveyStep-1];try{await supabaseClient.from('survey_responses').insert({question:q[0],answer:q[1][i]})}catch(e){console.warn(e)}}renderOnboarding()}
const diagnostic=[{q:'¿Qué hace print("Hola")?',opts:['Muestra Hola','Crea una variable','Repite el código'],a:0,concept:'print'},{q:'¿Cuál crea una variable local?',opts:['local x = 5','variable x = 5','let x = 5'],a:0,concept:'local'},{q:'¿Qué tipo tiene 42?',opts:['number','string','boolean'],a:0,concept:'tipos'},{q:'¿Qué palabra inicia el bloque de un if?',opts:['then','do','start'],a:0,concept:'if'},{q:'¿Qué estructura sirve para repetir?',opts:['for','if','return'],a:0,concept:'bucles'},{q:'¿Qué palabra devuelve un valor?',opts:['return','yield','give'],a:0,concept:'return'},{q:'¿Cómo defines una función?',opts:['function nombre()','def nombre()','fn nombre()'],a:0,concept:'funciones'},{q:'¿Qué imprime este código? local x=2; print(x+3)',opts:['5','23','x+3'],a:0,concept:'operadores'},{q:'¿Cuál accede al primer elemento de t?',opts:['t[1]','t[0]','t.first'],a:0,concept:'tablas'},{q:'¿Qué función busca texto dentro de un string?',opts:['string.find()','string.search()','find()'],a:0,concept:'string.find'}];
function renderDiagnostic(){const i=state.quizStep,q=diagnostic[i];if(!q){finishDiagnostic();return}document.getElementById('onboardingTitle').textContent=`Diagnóstico ${i+1} de ${diagnostic.length}`;document.getElementById('onboardingBody').innerHTML=`<div class="question-card"><h3>${q.q}</h3><div class="survey-options">${q.opts.map((o,j)=>`<button onclick="diagnosticAnswer(${j})">${escapeHTML(o)}</button>`).join('')}</div></div>`}
function diagnosticAnswer(i){const q=diagnostic[state.quizStep];state.quizAnswers.push({concept:q.concept,correct:i===q.a});if(i===q.a&&!state.known.includes(q.concept))state.known.push(q.concept);state.quizStep++;renderDiagnostic()}
function finishDiagnostic(){state.diagnosticDone=true;localStorage.setItem('luaDrixDiagnostic','1');save();document.getElementById('onboardingTitle').textContent='Tu ruta está lista';document.getElementById('onboardingBody').innerHTML='<div class="lesson-card"><h3>Diagnóstico terminado</h3><p>Ahora las lecciones empiezan desde lo básico y van añadiendo una pieza cada vez.</p><button class="primary" onclick="volverInicio()">Empezar LuaDrix</button></div>';}

/* =========================================================
   MODO OSCURO Y SEGURIDAD HTML
   ========================================================= */
function alternarModo(){document.body.classList.toggle('dark');localStorage.setItem('luaDrixModoOscuro',document.body.classList.contains('dark')?'1':'0')}
function escapeHTML(texto){return String(texto).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}

function init(){
  if(localStorage.getItem('luaDrixModoOscuro')==='1')document.body.classList.add('dark');
  updateUI();initLab();
  if(!state.diagnosticDone&&localStorage.getItem('luaDrixSurveySeen')!=='1')startOnboarding();
  else if(!state.diagnosticDone){state.surveyStep=survey.length;startOnboarding()}
  if(supabaseClient)supabaseClient.auth.getSession().then(({data})=>{if(data.session&&!state.profile){state.profile={name:data.session.user.user_metadata?.display_name||data.session.user.email.split('@')[0],email:data.session.user.email,userId:data.session.user.id,goal:'Aprender Lua desde cero'};save();}});
}
document.addEventListener('DOMContentLoaded',init);
