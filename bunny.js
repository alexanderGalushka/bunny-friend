// ── Time-based background ──────────────────────────────────────────────────
const BG_IMAGES = {
  sunrise: "bunny-fluff-sunrise-background.png",
  day:     "bunny-fluff-day-background.png",
  sunset:  "bunny-fluff-sunset-background.png",
  night:   "bunny-fluff-night-background.png",
};

function getTimePeriod() {
  const h = new Date().getHours() + new Date().getMinutes() / 60;
  if (h >= 5  && h < 8)  return "sunrise";
  if (h >= 8  && h < 17) return "day";
  if (h >= 17 && h < 21) return "sunset";
  return "night";
}

function applyBackground() {
  const period = getTimePeriod();
  document.body.style.backgroundImage = `url('${BG_IMAGES[period]}')`;
  document.body.classList.remove("time-sunrise", "time-day", "time-sunset", "time-night");
  document.body.classList.add(`time-${period}`);
}

applyBackground();
setInterval(applyBackground, 60_000);
// ──────────────────────────────────────────────────────────────────────────

const bunny    = document.getElementById("bunny");
const bubble   = document.getElementById("bubble");
const carrotEl = document.getElementById("carrot");

const carrotColors = [
  ["hue-rotate(0deg)   saturate(1.5)",                         "🟠 A classic orange carrot!"],
  ["hue-rotate(42deg)  saturate(3)   brightness(1.1)",         "✨ A golden carrot! So shiny!"],
  ["hue-rotate(80deg)  saturate(2)",                           "🟡 A yellow carrot! Lemon-flavored?"],
  ["hue-rotate(130deg) saturate(1.8)",                         "🟢 A green carrot! Extra healthy!"],
  ["hue-rotate(175deg) saturate(2)",                           "🩵 A teal carrot! Minty fresh!"],
  ["hue-rotate(215deg) saturate(2.2)",                         "🔵 A blue carrot! Never seen that before!"],
  ["hue-rotate(255deg) saturate(2)",                           "🟣 A purple carrot! It must be magic!"],
  ["hue-rotate(295deg) saturate(2.5)",                         "🩷 A pink carrot! So cute!"],
  ["hue-rotate(330deg) saturate(2)   brightness(0.9)",         "❤️ A red carrot! Spicy!"],
  ["saturate(0) brightness(0.15)",                             "⚫ A BLACK carrot... mysterious."],
  ["saturate(0) brightness(2)",                                "🤍 A silver carrot! Very fancy!"],
  ["hue-rotate(20deg)  saturate(4)   brightness(0.85)",        "🟤 A brown carrot! Earthy!"],
  ["sepia(1) saturate(6) hue-rotate(15deg) brightness(1.3)",   "🌈 A RAINBOW carrot! Wow!"],
];

let carrotIndex = 0;

function showCarrot() {
  const [filter, message] = carrotColors[carrotIndex];
  carrotIndex = (carrotIndex + 1) % carrotColors.length;

  carrotEl.style.filter = `drop-shadow(0 6px 12px rgba(0,0,0,0.3)) ${filter}`;

  carrotEl.classList.remove("pop");
  void carrotEl.offsetWidth;
  carrotEl.classList.add("pop");

  showBubble(message);
}

const jokes = [
  "What do you call a bunny with fleas? Bugs Bunny!",
  "How do bunnies stay in shape? Hare-obics!",
  "Why was the bunny so upset? He was having a bad hare day!",
  "What music do bunnies like? Hip-hop!",
  "Where do bunnies go after their wedding? On their bunny-moon!",
  "Why did the bunny cross the road? To prove he wasn't chicken!"
];

const questions = [
  "If you could have any superpower, what would it be?",
  "What's the silliest food you can imagine?",
  "If animals could talk, which would be the funniest?",
  "Would you rather fly or be invisible?",
  "What's your favorite thing to do on a rainy day?",
  "If you had a pet dragon, what would you name it?"
];

let bubbleTimer = null;
let hopDirection = 0;

function showBubble(text) {
  bubble.textContent = text;
  bubble.classList.remove("hidden");
  if (bubbleTimer) clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.add("hidden"), 3500);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let audioCtx = null;
function fart() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const duration = 0.65;
  const buf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * duration), audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const src = audioCtx.createBufferSource();
  src.buffer = buf;

  const lp = audioCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(380, audioCtx.currentTime);
  lp.frequency.exponentialRampToValueAtTime(55, audioCtx.currentTime + duration);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(1.3, audioCtx.currentTime + 0.04);
  gain.gain.setValueAtTime(1.1, audioCtx.currentTime + 0.1);
  gain.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  src.connect(lp).connect(gain).connect(audioCtx.destination);
  src.start();
  src.stop(audioCtx.currentTime + duration);
}

function showRainbowCloud() {
  const fx = document.getElementById("fart-fx");
  fx.classList.remove("boom");
  void fx.getBoundingClientRect();
  fx.classList.add("boom");
}

function squeak() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.15);
  osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function hop() {
  hopDirection = 1 - hopDirection;
  const className = hopDirection === 0 ? "hop" : "hop-right";
  bunny.classList.remove("hop", "hop-right");
  void bunny.offsetWidth;
  bunny.classList.add(className);
}

bunny.addEventListener("click", (e) => {
  let target = e.target;
  while (target && target !== bunny) {
    if (target.classList && target.classList.contains("part")) {
      const type = target.dataset.part;
      if (type === "nose") {
        squeak();
        showBubble("Squeak! *boop*");
      } else if (type === "ear") {
        showBubble(pickRandom(jokes));
      } else if (type === "front-paw") {
        showCarrot();
      } else if (type === "paw") {
        hop();
      } else if (type === "belly") {
        showBubble(pickRandom(questions));
      } else if (type === "tail") {
        fart();
        showRainbowCloud();
        showBubble("💨 *poot* 🌈");
      }
      break;
    }
    target = target.parentElement;
  }
});
