// ── PETALS ──
(function () {
  const pb = document.getElementById("petals");
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${6 + Math.random() * 8}px;
      height:${6 + Math.random() * 8}px;
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${0.1 + Math.random() * 0.2};
    `;
    pb.appendChild(p);
  }
})();

// ── OPEN INVITATION ──
function openInvitation() {
  document.getElementById("envelope-wrapper").classList.add("hidden");
  const inv = document.getElementById("invitation");
  inv.classList.add("visible");
  setTimeout(initScrollReveal, 600);
  startCountdown();
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("shown");
      });
    },
    { threshold: 0.08 },
  );
  els.forEach((el) => obs.observe(el));
  // show first few immediately
  document.querySelectorAll(".reveal").forEach((el, i) => {
    if (i < 3) el.classList.add("shown");
  });
}

// ── COUNTDOWN ──
function startCountdown() {
  const target = new Date("2026-06-26T17:30:00").getTime();
  function tick() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      ["days", "hours", "mins", "secs"].forEach(
        (id) => (document.getElementById("cd-" + id).textContent = "00"),
      );
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("cd-days").textContent = String(d).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(h).padStart(
      2,
      "0",
    );
    document.getElementById("cd-mins").textContent = String(m).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(s).padStart(2, "0");
    setTimeout(tick, 1000);
  }
  tick();
}

// ── GUESTS STORAGE (localStorage key) ──
const STORAGE_KEY = "wedding_guests_pedro_ruth_2026";

function getGuests() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}
function saveGuests(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list, null, 2));
}

// ── CONFIRM ATTENDANCE ──


function confirmAttendance() {
  const name = document.getElementById("f-name").value.trim();
  const attend = document.getElementById("f-attend").value;

  if (!name) {
    alert("Por favor ingresa tu nombre.");
    return;
  }

  const entry = {
    id: Date.now(),
    nombre: name,
    asistira: attend,
    fecha_confirmacion: new Date().toLocaleString("es-DO"),
  };

  const guests = getGuests();
  guests.push(entry);
  saveGuests(guests);

  // reset form
  document.getElementById("f-name").value = "";
  document.getElementById("f-attend").value = "Si";

  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}
