// ========== PROJECT DATA (EDIT HERE ONLY) ==========

const projects = [
  {
    title: "Job Data Dashboard",
    tech: "Excel · Tableau",
    description:
      "Interactive dashboard analyzing job postings by skills, location, and salary bands to highlight hiring patterns and demand.",
    tag: "Data Analytics",
    link: "#", // Replace with live URL when ready
  },
  {
    title: "Personal Portfolio",
    tech: "HTML · CSS · JavaScript",
    description:
      "Responsive personal portfolio website designed for quick scanning by recruiters, with clear call-to-actions and section hierarchy.",
    tag: "Frontend",
    link: "#",
  },
  {
    title: "Data Cleaning Automation",
    tech: "Python · Pandas",
    description:
      "Script to clean and normalize raw CSV data, handling missing values and formatting to reduce manual prep time.",
    tag: "Automation",
    link: "#",
  },
];

// ========== RENDER PROJECTS ==========

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "card card-fade";
    card.style.animationDelay = `${0.08 * index}s`;

    const headerRow = document.createElement("div");
    headerRow.style.display = "flex";
    headerRow.style.justifyContent = "space-between";
    headerRow.style.alignItems = "flex-start";
    headerRow.style.marginBottom = "0.45rem";
    headerRow.style.gap = "0.4rem";

    const title = document.createElement("h3");
    title.textContent = project.title;
    title.style.marginBottom = "0.2rem";

    const tag = document.createElement("span");
    tag.className = "project-tag";
    tag.textContent = project.tag;

    headerRow.appendChild(title);
    headerRow.appendChild(tag);

    const tech = document.createElement("p");
    tech.className = "project-tech";
    tech.textContent = project.tech;

    const desc = document.createElement("p");
    desc.textContent = project.description;
    desc.style.fontSize = "0.88rem";
    desc.style.color = "var(--text-muted)";
    desc.style.marginBottom = "0.75rem";

    const link = document.createElement("a");
    const noLink = !project.link || project.link === "#";
    link.href = noLink ? "#" : project.link;
    link.target = noLink ? "_self" : "_blank";
    link.rel = "noreferrer";
    link.textContent = noLink ? "Live link coming soon" : "View project →";
    link.className = "project-link" + (noLink ? " disabled" : "");

    card.appendChild(headerRow);
    card.appendChild(tech);
    card.appendChild(desc);
    card.appendChild(link);

    grid.appendChild(card);
  });
}

// ========== FOOTER YEAR ==========

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ========== SMOOTH SCROLL ==========

function enableSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 64;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}

// ========== THEME TOGGLE ==========

const THEME_KEY = "aftab-theme";

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove("light");
  if (theme === "light") {
    body.classList.add("light");
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else {
    applyTheme("dark"); // default
  }

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

// ========== INIT ==========

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setYear();
  enableSmoothScroll();
  initTheme();
});
