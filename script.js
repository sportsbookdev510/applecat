const CONFIG = {
  ca: "0xComingSoon",
  links: {
    x: "https://x.com/applecatxyz",
    buy: "https://app.uniswap.org/swap?chain=robinhood&inputCurrency=NATIVE&outputCurrency=0xComingSoon",
    chart: "",
  },
};

function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 1600);
}

const caValue = document.getElementById("caValue");
if (caValue && CONFIG.ca) {
  caValue.textContent = CONFIG.ca;
}

document.querySelectorAll("[data-social]").forEach((el) => {
  const key = el.dataset.social;
  const href = CONFIG.links[key];
  if (href) {
    el.setAttribute("href", href);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  } else {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      toast("Link coming soon");
    });
  }
});

const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const value = CONFIG.ca || caValue?.textContent || "";
    if (!value || value === "TBA" || value === "0xComingSoon") {
      toast("CA not live yet");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      toast("Copied");
    } catch {
      toast("Copy failed");
    }
  });
}

const navToggle = document.getElementById("navToggle");
const navBackdrop = document.getElementById("navBackdrop");

function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (navBackdrop) navBackdrop.hidden = !open;
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!document.body.classList.contains("nav-open"));
  });
}

if (navBackdrop) {
  navBackdrop.addEventListener("click", () => setNavOpen(false));
}

document.querySelectorAll(".nav__links a").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("show"));
}
