const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function numberValue(id) {
  return Number($(`#${id}`).value);
}

function setResult(element, text, success) {
  element.textContent = text;
  element.classList.toggle("ok", success === true);
  element.classList.toggle("no", success === false);
}

function setCheck(id, success, detail) {
  const row = $(`#${id}`);
  row.classList.toggle("ok", success);
  row.classList.toggle("no", !success);
  $(".check-icon", row).textContent = success ? "OK" : "X";
  $("code", row).textContent = detail;
}

function init1039() {
  const lab = $("[data-lab='1039']");
  if (!lab) return;

  function update() {
    const r1 = Math.max(0, numberValue("r1-1039"));
    const x1 = numberValue("x1-1039");
    const y1 = numberValue("y1-1039");
    const r2 = Math.max(0, numberValue("r2-1039"));
    const x2 = numberValue("x2-1039");
    const y2 = numberValue("y2-1039");
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance2 = dx * dx + dy * dy;
    const limit = r1 - r2;
    const fits = r2 <= r1 && distance2 <= limit * limit;

    const padding = Math.max(1, r1, r2) * .18 + 1;
    const minX = Math.min(x1 - r1, x2 - r2) - padding;
    const minY = Math.min(y1 - r1, y2 - r2) - padding;
    const maxX = Math.max(x1 + r1, x2 + r2) + padding;
    const maxY = Math.max(y1 + r1, y2 + r2) + padding;
    const svg = $("#svg-1039");
    svg.setAttribute("viewBox", `${minX} ${minY} ${Math.max(1, maxX - minX)} ${Math.max(1, maxY - minY)}`);

    const hunter = $("#hunter-1039");
    hunter.setAttribute("cx", x1);
    hunter.setAttribute("cy", y1);
    hunter.setAttribute("r", r1);

    const flower = $("#flower-1039");
    flower.setAttribute("cx", x2);
    flower.setAttribute("cy", y2);
    flower.setAttribute("r", r2);
    flower.classList.toggle("ok", fits);
    flower.classList.toggle("no", !fits);

    const centerLine = $("#centers-1039");
    centerLine.setAttribute("x1", x1);
    centerLine.setAttribute("y1", y1);
    centerLine.setAttribute("x2", x2);
    centerLine.setAttribute("y2", y2);

    $("#distance2-1039").textContent = distance2.toFixed(2);
    $("#limit2-1039").textContent = limit < 0 ? "raio da flor maior" : (limit * limit).toFixed(2);
    $("#test-1039").textContent = limit < 0
      ? `${r2} > ${r1}`
      : `${distance2.toFixed(2)} ≤ ${(limit * limit).toFixed(2)}`;
    setResult($("#result-1039"), fits ? "RICO" : "MORTO", fits);
  }

  $("#calculate-1039").addEventListener("click", update);
  $$("input", lab).forEach((input) => input.addEventListener("input", update));
  update();
}

function init1124() {
  const lab = $("[data-lab='1124']");
  if (!lab) return;

  function update() {
    const width = Math.max(1, numberValue("width-1124"));
    const height = Math.max(1, numberValue("height-1124"));
    const r1 = Math.max(0, numberValue("r1-1124"));
    const r2 = Math.max(0, numberValue("r2-1124"));
    const firstFits = 2 * r1 <= width && 2 * r1 <= height;
    const secondFits = 2 * r2 <= width && 2 * r2 <= height;
    const dx = width - r1 - r2;
    const dy = height - r1 - r2;
    const distance2 = dx * dx + dy * dy;
    const required2 = (r1 + r2) ** 2;
    const separated = distance2 >= required2;
    const fits = firstFits && secondFits && separated;
    const padding = Math.max(width, height) * .08;

    const svg = $("#svg-1124");
    svg.setAttribute("viewBox", `${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`);
    const elevator = $("#elevator-1124");
    elevator.setAttribute("width", width);
    elevator.setAttribute("height", height);

    const circle1 = $("#circle1-1124");
    circle1.setAttribute("cx", r1);
    circle1.setAttribute("cy", height - r1);
    circle1.setAttribute("r", r1);
    const circle2 = $("#circle2-1124");
    circle2.setAttribute("cx", width - r2);
    circle2.setAttribute("cy", r2);
    circle2.setAttribute("r", r2);
    const line = $("#centers-1124");
    line.setAttribute("x1", r1);
    line.setAttribute("y1", height - r1);
    line.setAttribute("x2", width - r2);
    line.setAttribute("y2", r2);

    setCheck("check-r1-1124", firstFits, `2·${r1} ≤ ${width} e 2·${r1} ≤ ${height}`);
    setCheck("check-r2-1124", secondFits, `2·${r2} ≤ ${width} e 2·${r2} ≤ ${height}`);
    setCheck("check-distance-1124", separated, `${distance2.toFixed(2)} ≥ ${required2.toFixed(2)}`);
    $("#distance2-1124").textContent = distance2.toFixed(2);
    $("#required2-1124").textContent = required2.toFixed(2);
    setResult($("#result-1124"), fits ? "S" : "N", fits);
  }

  $("#calculate-1124").addEventListener("click", update);
  $$("input", lab).forEach((input) => input.addEventListener("input", update));
  update();
}

function combinations(points) {
  const result = [];
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      for (let k = j + 1; k < points.length; k += 1) result.push([i, j, k]);
    }
  }
  return result;
}

function circumcircle(a, b, c) {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  if (Math.abs(d) < 1e-8) return null;
  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;
  const x = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d;
  const y = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d;
  return { x, y, r: Math.hypot(a.x - x, a.y - y) };
}

function init1137() {
  const lab = $("[data-lab='1137']");
  if (!lab) return;
  const sets = {
    five: [
      { x: 320, y: 55 }, { x: 445, y: 180 }, { x: 320, y: 305 },
      { x: 195, y: 180 }, { x: 408.39, y: 91.61 }, { x: 535, y: 292 }
    ],
    mixed: [
      { x: 155, y: 90 }, { x: 320, y: 55 }, { x: 470, y: 145 },
      { x: 438, y: 285 }, { x: 275, y: 315 }, { x: 120, y: 240 }, { x: 350, y: 205 }
    ],
    collinear: [
      { x: 120, y: 280 }, { x: 220, y: 230 }, { x: 320, y: 180 },
      { x: 420, y: 130 }, { x: 510, y: 285 }
    ]
  };
  let points = sets.five;
  let triples = combinations(points);
  let step = 0;

  function onCircle(point, circle) {
    return Math.abs(Math.hypot(point.x - circle.x, point.y - circle.y) - circle.r) < .8;
  }

  function render() {
    const svg = $("#svg-1137");
    svg.innerHTML = "";
    const triple = triples[step];
    const circle = circumcircle(points[triple[0]], points[triple[1]], points[triple[2]]);
    let count = 0;

    if (circle && circle.r < 900) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      element.setAttribute("cx", circle.x);
      element.setAttribute("cy", circle.y);
      element.setAttribute("r", circle.r);
      element.setAttribute("class", "candidate-circle");
      svg.appendChild(element);
    }

    points.forEach((point, index) => {
      const belongs = circle ? onCircle(point, circle) : false;
      if (belongs) count += 1;
      const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      element.setAttribute("cx", point.x);
      element.setAttribute("cy", point.y);
      element.setAttribute("r", 9);
      const selected = triple.includes(index);
      element.setAttribute("class", `point${belongs ? " on-circle" : ""}${selected ? " selected" : ""}`);
      svg.appendChild(element);
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", point.x + 12);
      label.setAttribute("y", point.y - 10);
      label.setAttribute("class", "geometry-label");
      label.textContent = String.fromCharCode(65 + index);
      svg.appendChild(label);
    });

    let best = Math.min(2, points.length);
    combinations(points).forEach((candidate) => {
      const candidateCircle = circumcircle(points[candidate[0]], points[candidate[1]], points[candidate[2]]);
      if (!candidateCircle) return;
      best = Math.max(best, points.filter((point) => onCircle(point, candidateCircle)).length);
    });

    $("#triple-1137").textContent = triple.map((index) => String.fromCharCode(65 + index)).join(", ");
    $("#count-1137").textContent = circle ? String(count) : "colineares";
    $("#best-1137").textContent = String(best);
    $("#step-1137").textContent = `${step + 1}/${triples.length}`;
    setResult($("#result-1137"), `máximo = ${best}`, true);
  }

  $("#set-1137").addEventListener("change", (event) => {
    points = sets[event.target.value];
    triples = combinations(points);
    step = 0;
    render();
  });
  $("#previous-1137").addEventListener("click", () => {
    step = (step - 1 + triples.length) % triples.length;
    render();
  });
  $("#next-1137").addEventListener("click", () => {
    step = (step + 1) % triples.length;
    render();
  });
  render();
}

function pointSegmentProjection(point, start, end) {
  const vx = end.x - start.x;
  const vy = end.y - start.y;
  const length2 = vx * vx + vy * vy;
  const raw = length2 === 0 ? 0 : ((point.x - start.x) * vx + (point.y - start.y) * vy) / length2;
  const t = Math.max(0, Math.min(1, raw));
  const projection = { x: start.x + t * vx, y: start.y + t * vy };
  return { projection, distance: Math.hypot(point.x - projection.x, point.y - projection.y) };
}

function init1223() {
  const lab = $("[data-lab='1223']");
  if (!lab) return;
  const width = 600;
  const height = 360;
  const fins = [
    [{ x: 0, y: 58 }, { x: 385, y: 105 }],
    [{ x: width, y: 135 }, { x: 255, y: 178 }],
    [{ x: 0, y: 220 }, { x: 425, y: 264 }],
    [{ x: width, y: 305 }, { x: 335, y: 335 }]
  ];
  const candidates = [];
  fins.forEach((fin, index) => {
    const startsLeft = fin[0].x === 0;
    const wallPoint = { x: startsLeft ? width : 0, y: fin[1].y };
    candidates.push({ type: "haste", index, point: wallPoint, distance: Math.abs(wallPoint.x - fin[1].x) });
    if (index + 1 < fins.length) {
      const result = pointSegmentProjection(fin[1], fins[index + 1][0], fins[index + 1][1]);
      candidates.push({ type: "aleta", index, point: result.projection, distance: result.distance });
    }
  });
  let step = 0;

  function render() {
    const svg = $("#svg-1223");
    svg.innerHTML = `
      <line class="wall" x1="0" y1="15" x2="0" y2="345"></line>
      <line class="wall" x1="600" y1="15" x2="600" y2="345"></line>
    `;
    const candidate = candidates[step];
    fins.forEach((fin, index) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", fin[0].x);
      line.setAttribute("y1", fin[0].y);
      line.setAttribute("x2", fin[1].x);
      line.setAttribute("y2", fin[1].y);
      const related = candidate.type === "aleta" && index === candidate.index + 1;
      line.setAttribute("class", `segment${index === candidate.index ? " active" : ""}${related ? " related" : ""}`);
      svg.appendChild(line);
    });

    const tip = fins[candidate.index][1];
    const measure = document.createElementNS("http://www.w3.org/2000/svg", "line");
    measure.setAttribute("x1", tip.x);
    measure.setAttribute("y1", tip.y);
    measure.setAttribute("x2", candidate.point.x);
    measure.setAttribute("y2", candidate.point.y);
    measure.setAttribute("class", "measure");
    svg.appendChild(measure);
    const projection = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    projection.setAttribute("cx", candidate.point.x);
    projection.setAttribute("cy", candidate.point.y);
    projection.setAttribute("r", 7);
    projection.setAttribute("class", "projection");
    svg.appendChild(projection);

    const minimum = Math.min(...candidates.slice(0, step + 1).map((item) => item.distance));
    const globalMinimum = Math.min(...candidates.map((item) => item.distance));
    $("#candidate-1223").textContent = candidate.type === "haste"
      ? `aleta ${candidate.index + 1} → haste oposta`
      : `aleta ${candidate.index + 1} → próxima aleta`;
    $("#distance-1223").textContent = candidate.distance.toFixed(2);
    $("#minimum-1223").textContent = minimum.toFixed(2);
    $("#step-1223").textContent = `${step + 1}/${candidates.length}`;
    setResult($("#result-1223"), `resposta = ${globalMinimum.toFixed(2)}`, true);
  }

  $("#previous-1223").addEventListener("click", () => {
    step = (step - 1 + candidates.length) % candidates.length;
    render();
  });
  $("#next-1223").addEventListener("click", () => {
    step = (step + 1) % candidates.length;
    render();
  });
  render();
}

function calculate1291(side) {
  const square = side * side;
  const quarter = Math.PI * square / 4;
  const complement = square - quarter;
  const segment = square * (4 * Math.PI - 3 * Math.sqrt(3)) / 24;
  const a3 = 8 * segment + 8 * complement - 4 * square;
  const a2 = 4 * complement - 2 * a3;
  return [square - a2 - a3, a2, a3];
}

function init1291() {
  const lab = $("[data-lab='1291']");
  if (!lab) return;
  const range = $("#range-1291");
  const input = $("#side-1291");

  function update(value) {
    const side = Math.max(.1, Number(value));
    range.value = side;
    input.value = side;
    const areas = calculate1291(side);
    const total = side * side;
    areas.forEach((area, index) => {
      const part = $(`#area-${index + 1}-1291`);
      part.style.width = `${area / total * 100}%`;
      $("strong", part).textContent = area.toFixed(3);
    });
    $("#square-1291").textContent = total.toFixed(3);
    $("#segment-1291").textContent = (total * (4 * Math.PI - 3 * Math.sqrt(3)) / 24).toFixed(3);
    $("#sum-1291").textContent = areas.reduce((sum, area) => sum + area, 0).toFixed(3);
    setResult($("#result-1291"), areas.map((area) => area.toFixed(3)).join("  "), true);
  }

  range.addEventListener("input", (event) => update(event.target.value));
  input.addEventListener("input", (event) => update(event.target.value));
  update(input.value);
}

function init1292() {
  const lab = $("[data-lab='1292']");
  if (!lab) return;
  const range = $("#range-1292");
  const input = $("#side-1292");

  function update(value) {
    const f = Math.max(.1, Number(value));
    range.value = f;
    input.value = f;
    const sin108 = Math.sin(108 * Math.PI / 180);
    const sin63 = Math.sin(63 * Math.PI / 180);
    const side = f * sin108 / sin63;
    $("#f-label-1292").textContent = `F = ${f.toFixed(2)}`;
    $("#l-label-1292").textContent = `L = ${side.toFixed(4)}`;
    $("#sin108-1292").textContent = sin108.toFixed(6);
    $("#sin63-1292").textContent = sin63.toFixed(6);
    $("#ratio-1292").textContent = (sin108 / sin63).toFixed(10);
    setResult($("#result-1292"), side.toFixed(10), true);
  }

  range.addEventListener("input", (event) => update(event.target.value));
  input.addEventListener("input", (event) => update(event.target.value));
  update(input.value);
}

init1039();
init1124();
init1137();
init1223();
init1291();
init1292();
