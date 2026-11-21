const recetasIniciales = [
    {
        id: 1,
        titulo: "Tacos al Pastor Caseros",
        cocina: "mexicana",
        dificultad: "media",
        descripcion: "Carne de cerdo marinada en adobo de achiote y especias, servida con piña asada, cilantro y cebolla.",
        ingredientes: [
            "500g de lomo de cerdo en láminas delgadas",
            "3 chiles guajillo hidratados",
            "20g de pasta de achiote",
            "1/4 taza de jugo de naranja",
            "Tortillas de maíz, piña, cilantro y cebolla"
        ],
        instrucciones: "Licúa los chiles con el achiote, jugo de naranja, ajo y comino. Marina la carne por 2 horas. Asa en sartén caliente con trozos de piña y sirve en tortillas calientes."
    },
    {
        id: 2,
        titulo: "Pasta Carbonara Auténtica",
        cocina: "italiana",
        dificultad: "facil",
        descripcion: "Espaguetis cremosos elaborados con yemas de huevo, queso Pecorino Romano, guanciale y pimienta negra.",
        ingredientes: [
            "250g de espagueti",
            "100g de guanciale o panceta en cubos",
            "3 yemas de huevo",
            "60g de queso Pecorino Romano rallado",
            "Pimienta negra recién molida"
        ],
        instrucciones: "Dora el guanciale sin aceite hasta que esté crujiente. Mezcla las yemas con el queso y pimienta. Añade la pasta caliente al sartén fuera del fuego, agrega la mezcla de huevo y un poco de agua de cocción para emulsionar."
    },
    {
        id: 3,
        titulo: "Ramen Tonkotsu Tradicional",
        cocina: "japonesa",
        dificultad: "dificil",
        descripcion: "Caldo cremoso de cerdo cocido a fuego lento durante horas, acompañado de fideos, chashu y huevo marinado.",
        ingredientes: [
            "1 kg de huesos de cerdo",
            "Fideos frescos para ramen",
            "2 huevos cocidos marinados en soya",
            "Panceta de cerdo braseada (Chashu)",
            "Cebollín picado y alga nori"
        ],
        instrucciones: "Hierve los huesos a fuego alto durante 6 a 8 horas hasta obtener un caldo blanco y espeso. Sirve sobre una base de salsa de soya (tare), añade los fideos cocidos y decora con el cerdo, huevo y cebollín."
    },
    {
        id: 4,
        titulo: "Boeuf Bourguignon",
        cocina: "francesa",
        dificultad: "dificil",
        descripcion: "Estofado clásico francés de carne de res cocida lentamente en vino tinto de Borgoña con champiñones y cebollitas.",
        ingredientes: [
            "800g de carne de res para guisar",
            "1 botella de vino tinto seco",
            "150g de tocino ahumado",
            "200g de champiñones",
            "Zanahorias, ajo, tomillo y laurel"
        ],
        instrucciones: "Sella la carne enharinada en una olla pesada. Agrega las verduras, el tocino y cubre con el vino tinto. Hornea tapado a 160°C durante 3 horas hasta que la carne se deshaga."
    },
    {
        id: 5,
        titulo: "Guacamole Tradicional en Molcajete",
        cocina: "mexicana",
        dificultad: "facil",
        descripcion: "Aguacate machacado con chile serrano, jitomate, cebolla morada, cilantro fresco y jugo de limón.",
        ingredientes: [
            "3 aguacates maduros",
            "1/2 cebolla morada picada",
            "1 jitomate sin semillas en cubos",
            "1 chile serrano picado",
            "Jugo de 1 limón, cilantro y sal"
        ],
        instrucciones: "Machaca ligeramente el chile con cilantro y sal. Añade la pulpa de aguacate y tritura dejando algunos trozos enteros. Integra la cebolla, el jitomate y el limón."
    },
    {
        id: 6,
        titulo: "Risotto ai Funghi",
        cocina: "italiana",
        dificultad: "media",
        descripcion: "Arroz arborio cremoso cocinado lentamente con caldo de verduras, vino blanco, hongos silvestres y parmesano.",
        ingredientes: [
            "300g de arroz Arborio",
            "250g de hongos variados",
            "1 litro de caldo de verduras caliente",
            "1/2 copa de vino blanco seco",
            "50g de mantequilla y queso parmesano"
        ],
        instrucciones: "Sofríe chalota y los hongos. Añade el arroz y tuéstalo 2 minutos. Agrega el vino y ve incorporando el caldo cucharón por cucharón sin dejar de remover hasta que esté al dente. Termina con mantequilla y queso."
    }
];

let recetas = JSON.parse(localStorage.getItem('recetasEmpire')) || recetasIniciales;

const recipesGrid = document.getElementById('recipes-grid');
const searchInput = document.getElementById('search-input');
const cuisineFilter = document.getElementById('cuisine-filter');
const difficultyFilter = document.getElementById('difficulty-filter');
const newRecipeForm = document.getElementById('new-recipe-form');
const modal = document.getElementById('recipe-modal');
const closeBtn = document.querySelector('.close-btn');

// Variables del temporizador
let timerInterval = null;
let tiempoRestante = 300;
const timerDisplay = document.getElementById('timer-display');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');

// Renderizar tarjetas de recetas
function mostrarRecetas(lista) {
    recipesGrid.innerHTML = '';
    
    if (lista.length === 0) {
        recipesGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: #c7bfd4;">No se encontraron recetas que coincidan con tu búsqueda.</p>';
        return;
    }

    lista.forEach(receta => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div>
                <h3>${receta.titulo}</h3>
                <div class="tags">
                    <span class="tag cuisine">${receta.cocina}</span>
                    <span class="tag ${receta.dificultad}">${receta.dificultad}</span>
                </div>
                <p>${receta.descripcion}</p>
            </div>
            <div class="card-actions">
                <button class="btn-ver" onclick="abrirModal(${receta.id})">Ver Receta</button>
                <button class="btn-delete" onclick="eliminarReceta(${receta.id})" title="Eliminar receta">Eliminar</button>
            </div>
        `;
        recipesGrid.appendChild(card);
    });
}

// Eliminar receta
function eliminarReceta(id) {
    const receta = recetas.find(r => r.id === id);
    if (!receta) return;

    if (confirm(`¿Seguro que deseas eliminar "${receta.titulo}" del recetario?`)) {
        recetas = recetas.filter(r => r.id !== id);
        localStorage.setItem('recetasEmpire', JSON.stringify(recetas));
        filtrarRecetas();
    }
}

// Filtrar por cocina, dificultad y búsqueda por texto/ingrediente
function filtrarRecetas() {
    const cocinaSeleccionada = cuisineFilter.value;
    const dificultadSeleccionada = difficultyFilter.value;
    const textoBusqueda = searchInput.value.toLowerCase().trim();

    const filtradas = recetas.filter(receta => {
        const coincideCocina = cocinaSeleccionada === 'todas' || receta.cocina === cocinaSeleccionada;
        const coincideDificultad = dificultadSeleccionada === 'todas' || receta.dificultad === dificultadSeleccionada;
        
        const enTitulo = receta.titulo.toLowerCase().includes(textoBusqueda);
        const enDescripcion = receta.descripcion.toLowerCase().includes(textoBusqueda);
        const enIngredientes = receta.ingredientes.some(ing => ing.toLowerCase().includes(textoBusqueda));
        const coincideTexto = textoBusqueda === '' || enTitulo || enDescripcion || enIngredientes;

        return coincideCocina && coincideDificultad && coincideTexto;
    });

    mostrarRecetas(filtradas);
}

// Guardar nueva receta desde el formulario
newRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('new-title').value.trim();
    const cocina = document.getElementById('new-cuisine').value;
    const dificultad = document.getElementById('new-difficulty').value;
    const descripcion = document.getElementById('new-description').value.trim();
    const ingredientesRaw = document.getElementById('new-ingredients').value;
    const instrucciones = document.getElementById('new-instructions').value.trim();

    const ingredientesArray = ingredientesRaw
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');

    const nuevaReceta = {
        id: Date.now(),
        titulo,
        cocina,
        dificultad,
        descripcion,
        ingredientes: ingredientesArray,
        instrucciones
    };

    recetas.unshift(nuevaReceta);
    localStorage.setItem('recetasEmpire', JSON.stringify(recetas));

    newRecipeForm.reset();
    filtrarRecetas();

    document.getElementById('recetas').scrollIntoView({ behavior: 'smooth' });
});

// Funciones del Temporizador
function actualizarDisplayTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    timerDisplay.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function emitirSonidoAlarma() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 800);
}

timerMinutesInput.addEventListener('change', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    const mins = Math.max(1, parseInt(timerMinutesInput.value) || 1);
    tiempoRestante = mins * 60;
    actualizarDisplayTemporizador();
});

timerStartBtn.addEventListener('click', () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
    if (tiempoRestante > 0) {
        tiempoRestante--;
        actualizarDisplayTemporizador();
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        emitirSonidoAlarma();
        alert("¡Tiempo terminado! Revisa tu preparación.");
    }
}, 1000);
});
timerPauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});
timerResetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
timerInterval = null;
    const mins = Math.max(1, parseInt(timerMinutesInput.value) || 5);
tiempoRestante = mins * 60;
    actualizarDisplayTemporizador();
});
// Abrir y cerrar ventana modal
function abrirModal(id) {
const receta = recetas.find(r => r.id === id);
    if (!receta) return;
        document.getElementById('modal-title').textContent = receta.titulo;
        document.getElementById('modal-cuisine').textContent = receta.cocina;
        document.getElementById('modal-cuisine').className = 'tag cuisine';
const diffTag = document.getElementById('modal-difficulty');
    diffTag.textContent = receta.dificultad;
    diffTag.className = tag #{receta.dificultad};
const ingredientsList = document.getElementById('modal-ingredients');
    ingredientsList.innerHTML = '';
    receta.ingredientes.forEach(ing => {
const li = document.createElement('li');
    li.textContent = ing;
    ingredientsList.appendChild(li);
});
document.getElementById('modal-instructions').textContent = receta.instrucciones;
clearInterval(timerInterval);
timerInterval = null;
tiempoRestante = (parseInt(timerMinutesInput.value) || 5) * 60;
actualizarDisplayTemporizador();
modal.style.display = 'flex';
}
function cerrarModal() {
modal.style.display = 'none';
clearInterval(timerInterval);
timerInterval = null;
}
// Eventos
searchInput.addEventListener('input', filtrarRecetas);
cuisineFilter.addEventListener('change', filtrarRecetas);
difficultyFilter.addEventListener('change', filtrarRecetas);
closeBtn.addEventListener('click', cerrarModal);
window.addEventListener('click', (e) => {
if (e.target === modal) {
cerrarModal();
}
});
// Carga inicial
mostrarRecetas(recetas);