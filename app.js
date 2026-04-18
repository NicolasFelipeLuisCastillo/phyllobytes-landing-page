const projects = [
  {
    id: "nails",
    name: "Nails",
    badge: "React / Node.js",
    description:
      "Landing page de belleza con enfoque comercial. La estructura es ideal para presentar servicios, catálogo y contacto rápido.",
    path: "../nails/",
    entry: "../nails/index.html",
    tags: ["Landing page", "React", "Docker"],
    color: "#f4c84a",
  },
  {
    id: "vet",
    name: "VetNova",
    badge: "HTML / CSS / JS",
    description:
      "Sitio de clínica veterinaria con una composición clara, hero visual y secciones pensadas para conversión local.",
    path: "../prototipo landing page vet/",
    entry: "../prototipo%20landing%20page%20vet/index.html",
    tags: ["Clínica", "Servicios", "Responsive"],
    color: "#61d6c8",
  },
  {
    id: "remodelaciones",
    name: "Remodelaciones",
    badge: "HTML / CSS / JS",
    description:
      "Plantilla de remodelaciones con estilo premium, texto de alto impacto y navegación orientada a ventas.",
    path: "../remodelaciones-plantilla-1/",
    entry: "../remodelaciones-plantilla-1/index.html",
    tags: ["Remodelación", "Portfolio", "Hero visual"],
    color: "#f58f4c",
  },
];

const select = document.getElementById("project-select");
const preview = document.getElementById("panel-preview");
const meta = document.getElementById("selector-meta");
const grid = document.getElementById("project-grid");
const openButton = document.getElementById("open-project");
const selectedCount = document.getElementById("selected-count");

const projectById = new Map(projects.map((project) => [project.id, project]));

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderProject(project) {
  const tagMarkup = project.tags
    .map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`)
    .join("");

  return `
    <article class="project-card" data-project-id="${project.id}">
      <span class="project-badge" style="box-shadow: 0 12px 30px ${project.color}26;">${escapeHtml(project.badge)}</span>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="project-specs">${tagMarkup}</div>
      <div class="project-actions">
        <a class="project-action" href="${project.entry}">Abrir proyecto</a>
        <button class="project-action project-action-secondary" type="button" data-copy-path="${escapeHtml(project.path)}">Copiar ruta</button>
      </div>
    </article>
  `;
}

function updatePreview(projectId) {
  const project = projectById.get(projectId) ?? projects[0];
  const projectIndex = projects.findIndex((item) => item.id === project.id) + 1;

  preview.innerHTML = `
    <p class="preview-kicker">Plantilla ${projectIndex}</p>
    <h2>${escapeHtml(project.name)}</h2>
    <p>${escapeHtml(project.description)}</p>
    <div class="project-specs" style="margin-top: 18px;">
      <span class="project-tag">${escapeHtml(project.badge)}</span>
      <span class="project-tag">Ruta: ${escapeHtml(project.path)}</span>
    </div>
    <a class="button button-primary" style="margin-top: 12px; align-self: flex-start;" href="${project.entry}">Abrir ${escapeHtml(project.name)}</a>
  `;

  meta.innerHTML = `
    <strong>${escapeHtml(project.name)}</strong>
    <span>${escapeHtml(project.path)}</span>
    <span>${escapeHtml(project.badge)}</span>
  `;

  select.value = project.id;
  openButton.dataset.target = project.entry;
  selectedCount.textContent = `${projects.length} proyectos`;

  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.projectId === project.id);
  });
}

function copyPath(path) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(path).catch(() => {});
  }
}

select.innerHTML = projects
  .map((project) => `<option value="${project.id}">${escapeHtml(project.name)}</option>`)
  .join("");

grid.innerHTML = projects.map(renderProject).join("");

select.addEventListener("change", () => {
  updatePreview(select.value);
});

openButton.addEventListener("click", () => {
  const target = openButton.dataset.target;
  if (target) {
    window.location.href = target;
  }
});

grid.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy-path]");
  if (!copyButton) {
    return;
  }

  copyPath(copyButton.dataset.copyPath ?? "");
});

const hashId = window.location.hash.replace("#", "");
const initialProject = projectById.has(hashId) ? hashId : projects[0].id;

updatePreview(initialProject);