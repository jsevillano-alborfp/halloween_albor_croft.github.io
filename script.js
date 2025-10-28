const liquid = document.getElementById('liquid');

const timeDisplay = document.getElementById('time-display');

const sparksContainer = document.getElementById('sparks');

const lightning = document.getElementById('lightning');

const pumpkin = document.querySelector('.pumpkin');

const body = document.body;

let currentHeightPercent = 0.5; 

let dayCounter = 1;

const DAYS_IN_YEAR = 100;

let startTime;

const DURATION_MS = 3000; 

/* ===== Función de Animación Principal (requestAnimationFrame) ===== */

function animateFill(timestamp) {

  if (!startTime) startTime = timestamp;

  const elapsed = timestamp - startTime;

  let progress = elapsed / DURATION_MS;

  if (progress > 1) progress = 1;

  currentHeightPercent = 0.5 + progress * 99.5; 

  liquid.style.height = `${currentHeightPercent}%`;

  const tintOpacity = (currentHeightPercent - 0.5) / 99.5 * 0.3;

  pumpkin.style.setProperty('--tint-opacity', tintOpacity);

  

  dayCounter = Math.min(DAYS_IN_YEAR, Math.floor(progress * DAYS_IN_YEAR) + 1 );

  if (dayCounter <= 1) {

    timeDisplay.textContent = 'HOY';

  } else if (dayCounter < DAYS_IN_YEAR) {

    timeDisplay.textContent = `CARGANDO ${dayCounter}`;

  } else if (dayCounter === DAYS_IN_YEAR) {

    timeDisplay.textContent = '¡HALLOWEEN!';

    // Crear el nuevo <a>
    var a = document.createElement("a");
    a.href = "./fantasma.html"; // Cambia por tu enlace
    a.textContent = "Ir al enlace";
    a.id = "time-display";

    // Reemplaza el <p> con el <a>
    timeDisplay.parentNode.replaceChild(a, timeDisplay);

    liquid.style.background = 'linear-gradient(180deg, #ff6600, #ff3300)';

    liquid.style.boxShadow = '0 0 40px #ff6600, 0 0 80px #ff3300';

  }

  createSpark();

  triggerLightning();

  if (progress < 1) {

    requestAnimationFrame(animateFill);

  }

}

/* ===== Función de susto (Mutación al hacer clic) ===== */

function triggerScare() {

  pumpkin.classList.add('scared');

  body.classList.add('scare-bg');

  

  pumpkin.style.animation = 'none'; 

  liquid.style.transition = 'height 0.1s ease'; 

  liquid.style.height = `${currentHeightPercent + 5}%`; // Sube ligeramente el nivel

  setTimeout(() => {

    pumpkin.classList.remove('scared');

    body.classList.remove('scare-bg');

    

    liquid.style.transition = 'height 0.6s ease-in-out, background 0.5s, box-shadow 0.5s';

    liquid.style.height = `${currentHeightPercent}%`;

    if (dayCounter < DAYS_IN_YEAR) {

      pumpkin.style.animation = 'pulse 3s infinite ease-in-out';

    } else {

      pumpkin.style.animation = 'none';

    }

  }, 300); 

}

pumpkin.addEventListener('click', triggerScare);

/* ===== Chispas mágicas (Optimizadas con probabilidad) ===== */

function createSpark() {

  if (Math.random() < 0.2) { 

    const spark = document.createElement('div');

    spark.style.left = Math.random() * window.innerWidth + 'px';

    spark.style.top = Math.random() * window.innerHeight + 'px';

    spark.style.animationDuration = `${2 + Math.random() * 2}s`;

    sparksContainer.appendChild(spark);

    

    setTimeout(() => spark.remove(), 4000);

  }

}

/* ===== Relámpagos aleatorios ===== */

function triggerLightning() {

  if (Math.random() < 0.02) {

    lightning.style.opacity = 0.8;

    

    setTimeout(() => {

      lightning.style.opacity = 0;

    }, 100 + Math.random() * 100);

  }

}

// Iniciar la animación

requestAnimationFrame(animateFill);