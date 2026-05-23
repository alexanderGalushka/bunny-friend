const bunny = document.getElementById("bunny");
const bubble = document.getElementById("bubble");

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

// Squeak sound using the Web Audio API (no audio files needed)
let audioCtx = null;
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
  // alternate left and right each time
  hopDirection = 1 - hopDirection;
  const className = hopDirection === 0 ? "hop" : "hop-right";
  bunny.classList.remove("hop", "hop-right");
  // force reflow so the animation restarts
  void bunny.offsetWidth;
  bunny.classList.add(className);
}

document.querySelectorAll(".part").forEach((part) => {
  part.addEventListener("click", (e) => {
    e.stopPropagation();
    const type = part.dataset.part;

    if (type === "nose") {
      squeak();
      showBubble("Squeak! *boop*");
    } else if (type === "ear") {
      showBubble(pickRandom(jokes));
    } else if (type === "paw") {
      hop();
      showBubble("Hop hop hop!");
    } else if (type === "belly") {
      showBubble(pickRandom(questions));
    }
  });
});
