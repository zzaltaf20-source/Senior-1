/* ==========================================================================
   BIRTHDAY QUEST — RELIABLE LOGIC & 12-CARD MATCH
   ========================================================================== */

const SECRET_CODE = "WISH";
const letters = ["", "", "", ""];

const screens = {
  0: document.getElementById('screenIntro'),
  1: document.getElementById('screenLvl1'),
  2: document.getElementById('screenLvl2'),
  3: document.getElementById('screenLvl3'),
  4: document.getElementById('screenLvl4'),
  5: document.getElementById('screenUnlock')
};

function goToScreen(num) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  if (screens[num]) {
    screens[num].classList.add('active');
  }

  if (num === 2) setupCards();
  if (num === 4) setupScratch();
  if (num === 5) setupInputs();
}

function recordLetter(index, char) {
  letters[index] = char;
  const slot = document.getElementById(`slot${index + 1}`);
  if (slot) {
    slot.textContent = char;
    slot.classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   LEVEL 1: POP THE BUBBLES (100% BULLETPROOF TOUCH & CLICK)
   -------------------------------------------------------------------------- */
let bubblesRemaining = 6;

function popBubble(btn) {
  if (btn.classList.contains('popped')) return;
  btn.classList.add('popped');
  bubblesRemaining--;

  const counter = document.getElementById('bubbleCounter');
  if (counter) {
    counter.textContent = bubblesRemaining > 0 ? `${bubblesRemaining} remaining` : 'All bubbles popped!';
  }

  if (bubblesRemaining <= 0) {
    setTimeout(() => {
      document.getElementById('reward1').classList.remove('hide');
      recordLetter(0, 'W');
      triggerSparkles();
    }, 350);
  }
}

/* --------------------------------------------------------------------------
   LEVEL 2: 12 CARDS / 6 PAIRS (CLEAN INLINE SVGS)
   -------------------------------------------------------------------------- */
const iconSVGs = {
  gift: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="14" rx="2"/><path d="M12 8v14M3 13h18M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none"><polygon points="12 2 15 8.5 22 9.5 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.5 9 8.5 12 2"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 18h18l-2-11-5 4-2-7-2 7-5-4z"/></svg>`,
  gem: `<svg viewBox="0 0 24 24" fill="none"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`
};

function setupCards() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';

  const types = Object.keys(iconSVGs);
  // 6 pairs = 12 cards
  const deck = [...types, ...types].sort(() => 0.5 - Math.random());

  let flipped = [];
  let pairsSolved = 0;

  deck.forEach((type) => {
    const card = document.createElement('div');
    card.classList.add('card-item');
    card.dataset.type = type;

    card.innerHTML = `
      <div class="card-side card-back">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      </div>
      <div class="card-side card-front">
        ${iconSVGs[type]}
      </div>
    `;

    card.addEventListener('click', () => {
      if (card.classList.contains('flipped') || flipped.length >= 2) return;

      card.classList.add('flipped');
      flipped.push(card);

      if (flipped.length === 2) {
        if (flipped[0].dataset.type === flipped[1].dataset.type) {
          flipped[0].classList.add('matched');
          flipped[1].classList.add('matched');
          flipped = [];
          pairsSolved++;

          if (pairsSolved === 6) {
            setTimeout(() => {
              document.getElementById('reward2').classList.remove('hide');
              recordLetter(1, 'I');
              triggerSparkles();
            }, 450);
          }
        } else {
          setTimeout(() => {
            flipped.forEach(c => c.classList.remove('flipped'));
            flipped = [];
          }, 800);
        }
      }
    });

    grid.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   LEVEL 3: 5 CANDLES
   -------------------------------------------------------------------------- */
let candlesRemaining = 5;

function extinguishCandle(candleEl) {
  if (candleEl.classList.contains('out')) return;
  candleEl.classList.add('out');
  candlesRemaining--;

  const counter = document.getElementById('candleCounter');
  if (counter) {
    counter.textContent = candlesRemaining > 0 ? `${candlesRemaining} candles lit` : 'All candles out! Wish made.';
  }

  if (candlesRemaining <= 0) {
    setTimeout(() => {
      document.getElementById('reward3').classList.remove('hide');
      recordLetter(2, 'S');
      triggerSparkles();
    }, 400);
  }
}

/* --------------------------------------------------------------------------
   LEVEL 4: SCRATCH CARD
   -------------------------------------------------------------------------- */
function setupScratch() {
  const canvas = document.getElementById('scratchCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 220;
  canvas.height = 125;

  // Clean Gold Brushed Coating
  ctx.fillStyle = '#d97706';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fef08a';
  ctx.font = '600 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCRATCH TO REVEAL', 110, 68);

  let isDragging = false;
  let scratched = 0;

  function scratch(e) {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    scratched++;
    if (scratched > 35) {
      document.getElementById('reward4').classList.remove('hide');
      recordLetter(3, 'H');
    }
  }

  canvas.addEventListener('mousedown', () => isDragging = true);
  canvas.addEventListener('mouseup', () => isDragging = false);
  canvas.addEventListener('mousemove', scratch);

  canvas.addEventListener('touchstart', (e) => { isDragging = true; scratch(e); });
  canvas.addEventListener('touchend', () => isDragging = false);
  canvas.addEventListener('touchmove', scratch);
}

/* --------------------------------------------------------------------------
   LEVEL 5: UNLOCK & SHOW ONLY MAIN PHOTO
   -------------------------------------------------------------------------- */
function setupInputs() {
  const inputs = [
    document.getElementById('c1'),
    document.getElementById('c2'),
    document.getElementById('c3'),
    document.getElementById('c4')
  ];

  inputs.forEach((input, idx) => {
    input.value = '';
    input.addEventListener('input', () => {
      if (input.value.length === 1 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && idx > 0) {
        inputs[idx - 1].focus();
      }
    });
  });
}

function checkCode() {
  const code = [
    document.getElementById('c1').value.trim().toUpperCase(),
    document.getElementById('c2').value.trim().toUpperCase(),
    document.getElementById('c3').value.trim().toUpperCase(),
    document.getElementById('c4').value.trim().toUpperCase()
  ].join('');

  if (code === SECRET_CODE) {
    document.getElementById('unlockPanel').style.display = 'none';
    const boxArea = document.getElementById('giftBoxArea');
    boxArea.classList.add('opened');

    startConfetti();

    setTimeout(() => {
      const photo = document.getElementById('photoReveal');
      photo.classList.add('show');
    }, 350);
  } else {
    alert("Incorrect code. Check your letters: " + letters.join(' - '));
  }
}

/* --------------------------------------------------------------------------
   CONFETTI ENGINE
   -------------------------------------------------------------------------- */
const fxCanvas = document.getElementById('fxCanvas');
const fxCtx = fxCanvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  fxCanvas.width = window.innerWidth;
  fxCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function triggerSparkles() {
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      size: Math.random() * 4 + 2,
      color: ['#f59e0b', '#fbbf24', '#fde68a'][Math.floor(Math.random() * 3)],
      alpha: 1
    });
  }
}

function startConfetti() {
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 5 + 3,
      size: Math.random() * 6 + 3,
      color: ['#f59e0b', '#fbbf24', '#fde68a', '#e2e8f0'][Math.floor(Math.random() * 4)],
      alpha: 1
    });
  }
}

function runParticles() {
  fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.007;

    fxCtx.globalAlpha = Math.max(0, p.alpha);
    fxCtx.fillStyle = p.color;
    fxCtx.fillRect(p.x, p.y, p.size, p.size);

    if (p.alpha <= 0 || p.y > window.innerHeight) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(runParticles);
}
requestAnimationFrame(runParticles);
/* ==========================================================================
   PERSONAL MESSAGE INJECTION (Paste at bottom of script.js)
   ========================================================================== */
(function attachPersonalMessage() {
  // ✏️ TYPE YOUR PERSONAL MESSAGE HERE:
  const myMessage = " a very happy birthday senior, Wishing you a wonderful year ahead with alot joy and success. ones again a very Happy Birthday!";

  const photoStage = document.getElementById('photoReveal');
  if (photoStage) {
    let existingNote = photoStage.querySelector('.personal-birthday-note');
    if (!existingNote) {
      const noteEl = document.createElement('p');
      noteEl.className = 'personal-birthday-note';
      noteEl.textContent = myMessage;
      photoStage.appendChild(noteEl);
    } else {
      existingNote.textContent = myMessage;
    }
  }
})();
