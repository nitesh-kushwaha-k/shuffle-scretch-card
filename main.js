// List of dishes
const dishes = [
"Butter Chicken",
"Biryani",
"Masala Dosa",
"Dal Makhani",
"Chole Bhature",
"Pani Puri",
"Tandoori Chicken",
"Palak Paneer",
"Vada Pav",
"Gulab Jamun"
];

// Shuffle array function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Assign shuffled dishes to cards
const shuffledDishes = shuffle([...dishes]); // clone & shuffle
const codeDivs = document.querySelectorAll(".code");
codeDivs.forEach((div, index) => {
  div.textContent = shuffledDishes[index];
});

// Scratch card logic
const createScratchCard = (canvasId, color) => {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext("2d");
  let isDragging = false;

  // Initialize scratch overlay
  const init = () => {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "destination-out";
  };

  // Scratch drawing
  const scratch = (x, y) => {
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.fill();
  };

  // Position for mouse/touch
  const getPos = (event) => {
    const rect = canvas.getBoundingClientRect();
    if (event.touches && event.touches[0]) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  // Mouse events
  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    }
  });

  canvas.addEventListener("mouseup", () => (isDragging = false));
  canvas.addEventListener("mouseleave", () => (isDragging = false));

  // Touch events (mobile support)
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDragging = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (isDragging) {
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    }
  });

  canvas.addEventListener("touchend", () => (isDragging = false));

  init();
};

// Create 10 scratch cards
for (let i = 1; i <= 10; i++) {
  createScratchCard(`scratch-card${i}`, "#999999");
}