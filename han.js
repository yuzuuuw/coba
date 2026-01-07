/* =====================
   ELEMENTS
===================== */
const buttons = document.querySelectorAll(".action-btn");
const grids = document.querySelectorAll(".grid360");
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("modal360");
const iframe = document.getElementById("iframe360");

/* =====================
   SWITCH VIEW + ANIMATION
===================== */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    if (!targetId) return;

    // active button
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // hide all grids
    grids.forEach(grid => grid.classList.add("hidden"));

    // show target grid
    const targetGrid = document.getElementById(targetId);
    if (!targetGrid) return;

    emptyState.style.display = "none";
    targetGrid.classList.remove("hidden");

    // ANIMATE CARDS (SEMUA GRID)
    const cards = targetGrid.querySelectorAll(".card");
    cards.forEach((card, i) => {
      card.style.animation = "none";
      card.offsetHeight; // force reflow
      card.style.setProperty("--i", i);
      card.style.animation = "";
    });
  });
});

/* =====================
   MODAL 360 ONLY
===================== */
const grid360 = document.getElementById("grid360");
if (grid360) {
  grid360.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.dataset.link;
      if (!link) return;

      iframe.src = link;
      modal.classList.add("active");
    });
  });
}

/* =====================
   CLOSE MODAL
===================== */
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modal.classList.remove("active");
  iframe.src = "";
}
