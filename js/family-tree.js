const STORAGE_KEY = "generation-family-trees";

const grid = document.querySelector("[data-record-grid]");
const status = document.getElementById("records-status");
const summary = document.querySelector("[data-record-summary]");
const list = document.querySelector("[data-tree-list]");
const listStatus = document.querySelector("[data-tree-list-status]");
const template = document.getElementById("tree-row-template");
const form = document.querySelector("[data-tree-form]");
const search = document.querySelector("[data-tree-search]");
const filter = document.querySelector("[data-tree-filter]");
const sort = document.querySelector("[data-tree-sort]");
const empty = document.querySelector("[data-tree-empty]");
const tableWrap = document.querySelector(".tree-table-wrap");
const loading = document.querySelector("[data-record-loading]");

let sampleTrees = [];
let trees = [];

function debounce(fn, delay = 300) {
  let id;

  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

function renderMetricDetail(metric) {
  const detail = document.querySelector("[data-record-detail]");
  if (!detail) return;

  detail.replaceChildren();
  detail.id = "record-detail";

  const title = document.createElement("h3");
  const description = document.createElement("p");
  const highlights = document.createElement("ul");

  title.id = "record-detail-title";
  title.textContent = metric.detailTitle;
  description.textContent = metric.detail;

  metric.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    highlights.append(item);
  });

  detail.append(title, description, highlights);
}

function buildMetricCard(metric, index) {
  const card = document.createElement("button");
  const label = document.createElement("h3");
  const value = document.createElement("strong");
  const hint = document.createElement("p");

  card.type = "button";
  card.className = "record-card";
  card.setAttribute("role", "tab");
  card.setAttribute("aria-selected", String(index === 0));
  card.setAttribute("aria-controls", "record-detail");

  label.textContent = metric.label;
  value.textContent = metric.display;
  hint.textContent = "Bấm để xem chi tiết.";
  card.append(label, value, hint);

  card.addEventListener("click", () => {
    [...grid.children].forEach((item) => {
      item.setAttribute("aria-selected", "false");
    });
    card.setAttribute("aria-selected", "true");
    renderMetricDetail(metric);
  });

  return card;
}

function buildTreeRow(tree) {
  const row = template.content.firstElementChild.cloneNode(true);

  row.querySelector('[data-cell="name"]').textContent = tree.name;
  row.querySelector('[data-cell="root"]').textContent = tree.rootMember;
  row.querySelector('[data-cell="generation"]').textContent = `Thế hệ ${tree.generation}`;
  row.querySelector("[data-delete-tree]").dataset.treeId = tree.id;

  return row;
}

function renderTrees() {
  if (!list || !listStatus) return;

  const keyword = search.value.trim().toLocaleLowerCase("vi-VN");
  const generation = filter.value;
  const [sortField, sortDirection] = sort.value.split("-");
  const visibleTrees = trees.filter((tree) => {
    const searchableText = `${tree.name} ${tree.rootMember}`.toLocaleLowerCase("vi-VN");
    return searchableText.includes(keyword) && (generation === "all" || tree.generation === Number(generation));
  });

  visibleTrees.sort((first, second) => {
    const firstValue = sortField === "name" ? first.name : first.generation;
    const secondValue = sortField === "name" ? second.name : second.generation;
    const comparison = typeof firstValue === "string"
      ? firstValue.localeCompare(secondValue, "vi")
      : firstValue - secondValue;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  list.replaceChildren(...visibleTrees.map(buildTreeRow));
  empty.hidden = visibleTrees.length !== 0;
  tableWrap.hidden = visibleTrees.length === 0;
  listStatus.textContent = visibleTrees.length
    ? `Hiển thị ${visibleTrees.length} cây gia phả.`
    : "Không tìm thấy cây gia phả phù hợp.";
}

function saveTrees() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
}

function readSavedTrees() {
  try {
    const savedTrees = localStorage.getItem(STORAGE_KEY);
    return savedTrees ? JSON.parse(savedTrees) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function validateField(field) {
  let message = "";

  if (field.validity.valueMissing) {
    message = "Vui lòng điền mục này.";
  } else if (field.validity.tooShort) {
    message = "Nhập ít nhất 3 ký tự.";
  }

  field.setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById(`${field.id}-error`).textContent = message;

  return !message;
}

function addTree(event) {
  event.preventDefault();

  const fields = [...form.querySelectorAll("input[required]")];
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
    return;
  }

  const tree = {
    id: crypto.randomUUID(),
    name: form.elements.treeName.value.trim(),
    rootMember: form.elements.rootMember.value.trim(),
    generation: Number(form.elements.generation.value),
  };

  trees.unshift(tree);
  saveTrees();
  renderTrees();

  document.querySelector("[data-tree-result]").textContent = `Đã tạo “${tree.name}”.`;
  form.reset();
}

async function loadRecords() {
  if (!grid || !status || !summary) return;

  try {
    const response = await fetch("./data/records.json");
    if (!response.ok) {
      throw new Error(`Máy chủ trả về ${response.status}`);
    }

    const data = await response.json();

    data.metrics.forEach((metric, index) => {
      grid.append(buildMetricCard(metric, index));
    });

    renderMetricDetail(data.metrics[0]);

    const summaryText = document.createElement("p");
    summaryText.textContent = `${data.features.length} tính năng đang sẵn sàng cho gia đình bạn.`;
    summary.replaceChildren(summaryText);

    status.textContent = `Đã tải ${data.metrics.length} chỉ số từ records.json.`;
    loading.hidden = true;
    sampleTrees = data.familyTrees;

    const savedTrees = readSavedTrees();
    trees = savedTrees ?? [...sampleTrees];

    if (!savedTrees) {
      saveTrees();
    }

    renderTrees();
  } catch (error) {
    status.textContent = error.message;
    summary.textContent = "Dữ liệu chưa sẵn sàng.";
    loading.hidden = true;
  }
}

form?.addEventListener("submit", addTree);

form?.addEventListener("input", (event) => {
  if (event.target.matches("input[required]")) {
    validateField(event.target);
  }
});

search?.addEventListener("input", debounce(renderTrees));
filter?.addEventListener("change", renderTrees);
sort?.addEventListener("change", renderTrees);

list?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-tree]");
  if (!button) return;

  trees = trees.filter((tree) => tree.id !== button.dataset.treeId);
  saveTrees();
  renderTrees();
});

document.querySelector("[data-restore-trees]")?.addEventListener("click", () => {
  trees = [...sampleTrees];
  saveTrees();
  renderTrees();
  listStatus.textContent = "Đã khôi phục dữ liệu mẫu.";
});

loadRecords();
