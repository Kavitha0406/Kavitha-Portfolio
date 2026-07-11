/* =====================================================
   KAVITHA K — PORTFOLIO SCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavToggle();
  initScrollReveal();
  initConsole();
});

/* ---------- Footer year ---------- */
function setYear(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav ---------- */
function initNavToggle(){
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(t => observer.observe(t));
}


const TEST_SUITE = [
  { type: "prompt", text: "run --suite core-profile" },
  { type: "pass",   text: "✓ Java fundamentals ............. PASS" },
  { type: "pass",   text: "✓ SQL (Oracle · MySQL) ........... PASS" },
  { type: "pass",   text: "✓ HTML · CSS · React .............  PASS" },
  { type: "pass",   text: "✓ Git & GitHub workflow .......... PASS" },
  { type: "pass",   text: "✓ Manual test case design ........ PASS" },
  { type: "pass",   text: "✓ Selenium WebDriver .............  PASS" },
  { type: "muted",  text: "6 passed, 0 failed — 0.42s" },
  { type: "prompt", text: "status: available for hire ✓" },
];

let consoleTyping = false;

function initConsole(){
  const body = document.getElementById("consoleBody");
  const caption = document.querySelector(".console-caption");
  if (!body) return;

  runConsole(body);

  if (caption){
    caption.addEventListener("click", () => runConsole(body));
  }
}

function runConsole(body){
  if (consoleTyping) return;
  consoleTyping = true;
  body.innerHTML = "";

  let i = 0;
  const next = () => {
    if (i >= TEST_SUITE.length){
      consoleTyping = false;
      appendCursorLine(body);
      return;
    }
    const item = TEST_SUITE[i];
    appendLine(body, item, i * 60);
    i++;
    const delay = item.type === "pass" ? 260 : 420;
    setTimeout(next, delay);
  };
  next();
}

function appendLine(container, item, delayMs){
  const line = document.createElement("div");
  line.className = `console-line ${item.type}`;
  line.style.animationDelay = `${delayMs}ms`;
  line.textContent = item.text;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

function appendCursorLine(container){
  const line = document.createElement("div");
  line.className = "console-line prompt";
  line.style.opacity = "1";
  line.innerHTML = `kavitha@qa:~$ <span class="cursor"></span>`;
  container.appendChild(line);
}


(function highlightActiveNav(){
  const sections = document.querySelectorAll("main .section, .hero");
  const navAnchors = document.querySelectorAll("[data-nav]");
  if (!sections.length || !navAnchors.length) return;

  const map = new Map();
  navAnchors.forEach(a => {
    const id = a.getAttribute("href").replace("#", "");
    if (id) map.set(id, a);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting){
        navAnchors.forEach(a => a.style.color = "");
        link.style.color = "var(--ink)";
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => { if (s.id) observer.observe(s); });
})();
