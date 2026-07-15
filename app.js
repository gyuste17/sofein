/* ============================================================
   SOFEIN - SPA mockup (vanilla JS, hash router, dark Attio UI)
   ============================================================ */

/* ---------- Icons ---------- */
const ICONS = {
  grid: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a3 3 0 0 0 3-3V8"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.23.31.43.65.6 1H20a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-.51 1z"/>',
  truck: '<path d="M10 17h4V5H2v12h3"/><path d="M14 17h1"/><path d="M14 8h4l4 4v5h-3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  packageCheck: '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  clipboardCheck: '<path d="M9 5h6"/><path d="M9 3h6v4H9z"/><path d="M5 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1"/><path d="m9 14 2 2 4-4"/>',
  tree: '<path d="M12 21V12"/><path d="m12 3-5 7h3l-4 6h12l-4-6h3l-5-7Z"/><path d="M5 21h14"/>',
};

function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}

/* ---------- Data ---------- */
const ROLES = {
  cliente: {
    label: "Portal cliente",
    org: "Adif Compras",
    sub: "Cliente",
    avatar: "AC",
    default: "resumen",
    nav: [
      { id: "resumen", label: "Resumen", icon: "grid" },
      { id: "trazabilidad", label: "Trazabilidad", icon: "route" },
      { id: "documentos", label: "Documentos", icon: "file", count: 3 },
      { id: "informes", label: "Informes", icon: "download" },
    ],
  },
  proveedor: {
    label: "Portal proveedor",
    org: "IberRail Components",
    sub: "Proveedor homologado",
    avatar: "IR",
    default: "solicitudes",
    nav: [
      { id: "solicitudes", label: "Solicitudes", icon: "inbox", count: 1 },
      { id: "perfil", label: "Perfil", icon: "profile" },
      { id: "documentacion", label: "Documentacion", icon: "file", count: 2 },
    ],
  },
  admin: {
    label: "Administracion",
    org: "SOFEIN",
    sub: "Maria Gomez",
    avatar: "MG",
    default: "expedientes",
    nav: [
      { id: "expedientes", label: "Expedientes", icon: "building", count: 18 },
      { id: "matching", label: "Matching proveedor", icon: "users" },
      { id: "trazabilidad", label: "Trazabilidad", icon: "route" },
      { id: "documentos", label: "Documentos", icon: "inbox", count: 11 },
    ],
  },
};

const ROLE_LABELS = { cliente: "Cliente", proveedor: "Proveedor", admin: "Administracion" };
const SECTION_LABELS = {
  resumen: "Resumen",
  trazabilidad: "Trazabilidad",
  documentos: "Documentos",
  informes: "Informes",
  solicitudes: "Solicitudes",
  perfil: "Perfil",
  documentacion: "Documentacion",
  expedientes: "Expedientes",
  matching: "Matching proveedor",
};

const STATUS_LABELS = {
  pending: "Pendiente",
  delivered: "Entregado",
  validated: "Validado",
  rejected: "Rechazado",
  signed: "Firmado",
};

const CURRENT_PHASE = 3;

const phases = [
  { title: "Inicio del tramite", date: "12 jun", state: "done", icon: "file", text: "Solicitud creada por el cliente y requisitos iniciales revisados por SOFEIN.",
    docs: [["Solicitud inicial", "validated"], ["Requisitos tecnicos", "validated"]] },
  { title: "Validacion proveedor", date: "14 jun", state: "done", icon: "users", text: "Proveedor recomendado y seleccionado tras validar requisitos y capacidades.",
    docs: [["Comparativa proveedores", "validated"], ["Ficha IberRail Components", "validated"]] },
  { title: "Presupuesto entregado", date: "17 jun", state: "done", icon: "doc", text: "Presupuesto entregado, revisado y firmado por cliente y proveedor.",
    docs: [["Oferta economica", "validated"], ["Condiciones de suministro", "validated"], ["Presupuesto firmado", "signed"]] },
  { title: "Fabricacion", date: "Hoy", state: "current", icon: "cog", text: "El lote PR-22 esta en produccion. SOFEIN espera certificado de lote y plan logistico.",
    docs: [["Orden de fabricacion", "validated"], ["Ficha tecnica de lote", "delivered"], ["Certificado de lote", "pending"], ["Plan logistico", "pending"]] },
  { title: "Salida de fabrica", date: "Pendiente", state: "", icon: "truck", text: "Se notificara al cliente automaticamente cuando el proveedor confirme la salida.",
    docs: [["Albaran de salida", "pending"], ["Confirmacion de transporte", "pending"]] },
  { title: "Entrega", date: "Pendiente", state: "", icon: "packageCheck", text: "Recepcion en destino y conformidad del cliente sobre el material entregado.",
    docs: [["Acta de entrega", "pending"], ["Conformidad cliente", "pending"]] },
  { title: "Cierre y reporte", date: "Pendiente", state: "", icon: "clipboardCheck", text: "Cierre del expediente y generacion del reporte final de trazabilidad.",
    docs: [["Reporte final de trazabilidad", "pending"]] },
];

const expedientes = [
  { id: "RFQ-2026-014", producto: "Traviesas PR-22", cliente: "Adif Compras", proveedor: "IberRail Components", fase: "Fabricacion", estado: "delivered" },
  { id: "RFQ-2026-011", producto: "Carril laminado 54E1", cliente: "Metro de Bilbao", proveedor: "Norte Via Industrial", fase: "Presupuesto", estado: "pending" },
  { id: "RFQ-2026-009", producto: "Sujeciones elasticas", cliente: "FGC", proveedor: "IberRail Components", fase: "Entrega", estado: "validated" },
  { id: "RFQ-2026-007", producto: "Traviesas mixtas", cliente: "Adif Compras", proveedor: "GreenTrack Supply", fase: "Salida de fabrica", estado: "signed" },
  { id: "RFQ-2026-004", producto: "Aparatos de via", cliente: "Euskotren", proveedor: "Pendiente", fase: "Validacion proveedor", estado: "rejected" },
  { id: "RFQ-2026-002", producto: "Balasto certificado", cliente: "Metro de Madrid", proveedor: "Norte Via Industrial", fase: "Cierre", estado: "validated" },
];

const allDocs = [
  { name: "Certificado de lote", exp: "RFQ-2026-014", owner: "IberRail Components", phase: "Fabricacion", state: "pending", date: "Hoy" },
  { name: "Plan logistico", exp: "RFQ-2026-014", owner: "IberRail Components", phase: "Fabricacion", state: "pending", date: "Hoy" },
  { name: "Ficha tecnica de lote", exp: "RFQ-2026-014", owner: "IberRail Components", phase: "Fabricacion", state: "delivered", date: "Ayer" },
  { name: "Presupuesto firmado", exp: "RFQ-2026-014", owner: "Adif Compras", phase: "Presupuesto", state: "signed", date: "17 jun" },
  { name: "Oferta economica", exp: "RFQ-2026-011", owner: "Norte Via Industrial", phase: "Presupuesto", state: "delivered", date: "16 jun" },
  { name: "Marcado CE", exp: "RFQ-2026-004", owner: "Pendiente", phase: "Validacion proveedor", state: "rejected", date: "15 jun" },
  { name: "Certificado EN 13230", exp: "RFQ-2026-009", owner: "IberRail Components", phase: "Entrega", state: "validated", date: "14 jun" },
  { name: "Acta de entrega", exp: "RFQ-2026-009", owner: "SOFEIN", phase: "Entrega", state: "validated", date: "14 jun" },
];

const suppliers = [
  { name: "IberRail Components", scope: "Traviesas, sujeciones y documentacion EN", base: 94, badges: ["EN 13230", "Plazo corto", "ISO 9001"] },
  { name: "Norte Via Industrial", scope: "Material de via y fabricacion nacional", base: 87, badges: ["Coste competitivo", "Marcado CE"] },
  { name: "GreenTrack Supply", scope: "Proveedor con reporting ambiental ampliado", base: 82, badges: ["Baja huella CO2", "ISO 14001"] },
];

/* ---------- Shared render helpers ---------- */
function statusPill(state, label) {
  return `<span class="status-pill ${state}">${label || STATUS_LABELS[state] || state}</span>`;
}

function railTracker(activeIndex = CURRENT_PHASE) {
  const progress = (CURRENT_PHASE / (phases.length - 1)) * 86;
  const dots = phases
    .map(
      (p, i) => `
      <button class="phase-button ${p.state} ${i === activeIndex ? "active" : ""}" type="button" data-phase="${i}">
        <span class="phase-dot">${icon(p.icon, 17)}</span>
        <strong>${p.title}</strong>
        <small>${p.date}</small>
      </button>`,
    )
    .join("");
  return `<div class="rail-scroll"><div class="rail-tracker" style="--progress:${progress}%">${dots}</div></div>`;
}

function phaseDetailHTML(index) {
  const p = phases[index];
  const filt = (states) => {
    const rows = p.docs.filter(([, s]) => states.includes(s));
    if (!rows.length) return `<div class="row"><span class="name">Nada en esta categoria</span>${statusPill("validated", "-")}</div>`;
    return rows.map(([n, s]) => `<div class="row"><span class="name">${icon("doc", 16)}${n}</span>${statusPill(s)}</div>`).join("");
  };
  return `
    <div class="phase-copy">
      <p class="label">Fase ${index + 1} de ${phases.length}</p>
      <h2>${p.title}</h2>
      <p>${p.text}</p>
    </div>
    <div class="doc-columns">
      <div class="doc-box">
        <h4>Entregados / en regla</h4>
        <div class="doc-list">${filt(["delivered", "validated", "signed"])}</div>
      </div>
      <div class="doc-box">
        <h4>Pendientes / rechazados</h4>
        <div class="doc-list">${filt(["pending", "rejected"])}</div>
      </div>
    </div>`;
}

function trackerPanel(title, sub, pill) {
  return `
    <section class="panel">
      <div class="panel-head">
        <div><span class="label">${sub}</span><h2>${title}</h2></div>
        ${pill || ""}
      </div>
      <div class="panel-body">
        ${railTracker()}
        <div class="phase-detail" data-phase-detail>${phaseDetailHTML(CURRENT_PHASE)}</div>
      </div>
    </section>`;
}

function docRow(d) {
  return `<div class="row" data-state="${d.state}">
    <span class="name">${icon("doc", 16)}${d.name}<span class="meta">&middot; ${d.exp}</span></span>
    ${statusPill(d.state)}
  </div>`;
}

function supplierCards(offset = 0) {
  return suppliers
    .map((s, i) => {
      const score = Math.max(68, Math.min(98, s.base - offset + i * 2));
      return `
      <article class="supplier-card">
        <div class="top"><strong>${s.name}</strong></div>
        <small>${s.scope}</small>
        <div class="badges">${s.badges.map((b) => `<span class="badge">${b}</span>`).join("")}</div>
        <div class="match">
          <div class="match-bar"><i style="width:${score}%"></i></div>
          <b>${score}%</b>
        </div>
      </article>`;
    })
    .join("");
}

/* ---------- Views ---------- */
const VIEWS = {
  cliente: {
    resumen: () => `
      <div class="view-head">
        <div><h1>Tu pedido, sin incertidumbre.</h1><p>Estado actual, documentos clave y siguientes pasos del expediente activo.</p></div>
        <div class="view-actions"><a class="button primary" data-go="#cliente/trazabilidad">Ver trazabilidad</a></div>
      </div>
      <div class="kpis">
        <div class="kpi"><span class="label">Expediente activo</span><strong>RFQ-2026-014</strong><small>Traviesas PR-22</small></div>
        <div class="kpi"><span class="label">Fase actual</span><strong>Fabricacion</strong><small>4 de 7 fases</small></div>
        <div class="kpi"><span class="label">Documentacion</span><strong>7 / 10</strong><small>3 documentos pendientes</small></div>
      </div>
      <div class="two-col">
        <section class="panel">
          <div class="panel-head"><div><span class="label">Pedido principal</span><h2>Traviesas PR-22</h2></div>${statusPill("delivered", "Fabricacion")}</div>
          <div class="panel-body">
            <div class="req-list">
              <div class="row"><span class="name">Proveedor</span><span>IberRail Components</span></div>
              <div class="row"><span class="name">Ultima actualizacion</span><span>Ficha tecnica entregada</span></div>
              <div class="row"><span class="name">Siguiente paso</span><span>Validar certificado de lote</span></div>
            </div>
          </div>
        </section>
        <section class="panel">
          <div class="panel-head"><div><span class="label">Acciones</span><h2>Lo importante ahora</h2></div></div>
          <div class="panel-body">
            <div class="banner">${icon("info", 18)} SOFEIN ha detectado 3 documentos pendientes antes de cerrar fabricacion.</div>
            <div class="report-list" style="margin-top:14px">
              <button class="report-item" data-go="#cliente/documentos"><span class="ri-left">${icon("file", 18)} Revisar documentos</span>${statusPill("pending", "3 pendientes")}</button>
              <button class="report-item" data-go="#cliente/informes"><span class="ri-left">${icon("download", 18)} Descargar reportes</span></button>
            </div>
          </div>
        </section>
      </div>`,

    trazabilidad: () =>
      `<div class="view-head"><div><h1>Trazabilidad del expediente</h1><p>Pulsa una fase para ver documentos entregados, pendientes y firmados.</p></div></div>` +
      trackerPanel("RFQ-2026-014 &middot; Traviesas PR-22", "Linea de fases", statusPill("warning", "Requiere revision")),

    documentos: () => `
      <div class="view-head"><div><h1>Documentos</h1><p>Todos los documentos de tu expediente y su estado.</p></div></div>
      <section class="panel">
        <div class="panel-head">
          <div class="chips" data-filter-group>
            <button class="chip is-active" data-filter="all">Todos</button>
            <button class="chip" data-filter="pending">Pendientes</button>
            <button class="chip" data-filter="delivered">Entregados</button>
            <button class="chip" data-filter="validated">Validados</button>
            <button class="chip" data-filter="signed">Firmados</button>
          </div>
        </div>
        <div class="panel-body"><div class="doc-list" data-doc-list>${allDocs.filter((d) => d.exp === "RFQ-2026-014").map(docRow).join("")}</div></div>
      </section>`,

    informes: () => `
      <div class="view-head"><div><h1>Informes</h1><p>Reportes descargables de tu expediente.</p></div></div>
      <section class="panel">
        <div class="panel-head"><div><span class="label">Disponibles</span><h2>Reportes</h2></div></div>
        <div class="panel-body">
          <div class="report-list">
            <button class="report-item"><span class="ri-left">${icon("download", 18)} Reporte de trazabilidad (PDF)</span>${statusPill("validated", "Disponible")}</button>
            <button class="report-item"><span class="ri-left">${icon("download", 18)} Expediente documental completo (ZIP)</span>${statusPill("validated", "Disponible")}</button>
            <button class="report-item"><span class="ri-left">${icon("download", 18)} Informe de sostenibilidad / CO2</span>${statusPill("premium", "Add-on")}</button>
          </div>
        </div>
      </section>`,
  },

  proveedor: {
    solicitudes: () => `
      <div class="view-head"><div><h1>Solicitud compatible</h1><p>Una oportunidad clara, con requisitos y documentos necesarios desde el inicio.</p></div></div>
      <section class="panel">
        <div class="panel-head"><div><span class="label">Nueva oportunidad</span><h2>Traviesas de hormigon &middot; RFQ-2026-014</h2></div>${statusPill("validated", "92% compatible")}</div>
        <div class="panel-body">
          <div class="req-list">
            <div class="row"><span class="name">Certificacion requerida</span><span>EN 13230</span></div>
            <div class="row"><span class="name">Plazo objetivo</span><span>6 semanas</span></div>
            <div class="row"><span class="name">Documentos necesarios</span><span>Ficha tecnica, presupuesto, certificado de lote</span></div>
          </div>
          <div class="view-actions" style="margin-top:16px">
            <button class="button primary">Aceptar y aportar documentacion</button>
            <button class="button ghost">Declinar</button>
          </div>
        </div>
      </section>`,

    perfil: () => `
      <div class="view-head">
        <div><h1>Perfil de homologacion</h1><p>Mantente visible como opcion ante clientes cuando encajes.</p></div>
        <div class="view-actions"><button class="button">Actualizar capacidad</button></div>
      </div>
      <div class="two-col">
        <section class="panel">
          <div class="panel-head"><div><span class="label">Completitud</span><h2>Estado del perfil</h2></div></div>
          <div class="panel-body"><div class="score-ring"><strong>86%</strong><span>perfil completo</span></div></div>
        </section>
        <section class="panel">
          <div class="panel-head"><div><span class="label">Capacidades</span><h2>Que ofreces</h2></div></div>
          <div class="panel-body">
            <div class="req-list">
              <div class="row"><span class="name">Productos</span><span>Traviesas, sujeciones, material de via</span></div>
              <div class="row"><span class="name">Certificaciones</span><span>EN 13230, ISO 9001</span></div>
              <div class="row"><span class="name">Zona de servicio</span><span>Peninsula iberica</span></div>
              <div class="row"><span class="name">Plazo medio</span><span>5-6 semanas</span></div>
            </div>
          </div>
        </section>
      </div>`,

    documentacion: () => `
      <div class="view-head">
        <div><h1>Documentacion</h1><p>Lo que debes aportar para el expediente RFQ-2026-014.</p></div>
        <div class="view-actions"><button class="button primary">${icon("plus", 16)} Subir documento</button></div>
      </div>
      <section class="panel">
        <div class="panel-head"><div><span class="label">Accion pendiente</span><h2>Tus entregables</h2></div></div>
        <div class="panel-body">
          <div class="doc-list">
            <div class="row"><span class="name">${icon("doc", 16)} Presupuesto firmado</span>${statusPill("signed")}</div>
            <div class="row"><span class="name">${icon("doc", 16)} Ficha tecnica de lote</span>${statusPill("delivered")}</div>
            <div class="row"><span class="name">${icon("doc", 16)} Certificado de lote</span>${statusPill("pending")}</div>
            <div class="row"><span class="name">${icon("doc", 16)} Plan logistico</span>${statusPill("pending")}</div>
          </div>
        </div>
      </section>`,
  },

  admin: {
    expedientes: (param) => {
      if (param) return expedienteDetail(param);
      const rows = expedientes
        .map(
          (e) => `
        <tr data-go="#admin/expedientes/${e.id}">
          <td class="cell-id">${e.id}</td>
          <td><div class="cell-main"><span class="cell-ic">${icon("building", 15)}</span><span class="strong">${e.producto}</span></div></td>
          <td class="muted">${e.cliente}</td>
          <td class="muted">${e.proveedor}</td>
          <td class="muted">${e.fase}</td>
          <td>${statusPill(e.estado, e.fase)}</td>
        </tr>`,
        )
        .join("");
      return `
        <div class="view-head">
          <div><h1>Expedientes bajo control.</h1><p>Prioriza validaciones, abre expedientes y mantiene informado al cliente.</p></div>
          <div class="view-actions"><button class="button primary">${icon("plus", 16)} Nuevo expediente</button></div>
        </div>
        <div class="kpis">
          <div class="kpi"><span class="label">Activos</span><strong>18</strong><small>6 requieren accion</small></div>
          <div class="kpi"><span class="label">Validaciones pendientes</span><strong>11</strong><small>3 criticas</small></div>
          <div class="kpi"><span class="label">Avisos enviados</span><strong>42</strong><small>Ultimos 7 dias</small></div>
        </div>
        <section class="panel">
          <div class="panel-head"><div><span class="label">Bandeja operativa</span><h2>Expedientes activos</h2></div><button class="button compact ghost">${icon("search", 15)} Buscar</button></div>
          <div class="panel-body flush">
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>ID</th><th>Producto</th><th>Cliente</th><th>Proveedor</th><th>Fase</th><th>Estado</th></tr></thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </div>
        </section>`;
    },

    matching: () => `
      <div class="view-head"><div><h1>Matching proveedor</h1><p>Compara opciones sin convertir la fase 1 en un marketplace complejo.</p></div></div>
      <section class="panel">
        <div class="panel-head"><div><span class="label">Busqueda guiada</span><h2>Requisitos del pedido</h2></div><button class="button compact" id="recalc">Recalcular</button></div>
        <div class="panel-body">
          <div class="requirement-grid">
            <label class="field">Producto<select><option>Traviesas de hormigon</option><option>Carril laminado</option><option>Sujeciones ferroviarias</option></select></label>
            <label class="field">Certificacion<select><option>EN 13230</option><option>ISO 9001</option><option>Marcado CE</option></select></label>
            <label class="field">Prioridad<select><option>Plazo corto</option><option>Coste competitivo</option><option>Baja huella CO2</option></select></label>
          </div>
          <div class="supplier-list" data-supplier-list>${supplierCards()}</div>
        </div>
      </section>`,

    trazabilidad: () =>
      `<div class="view-head"><div><h1>Trazabilidad operativa</h1><p>Edita fases, valida documentos y deja constancia del avance real.</p></div><div class="view-actions"><button class="button">${icon("send", 16)} Enviar aviso</button><button class="button primary">Generar reporte</button></div></div>` +
      trackerPanel("RFQ-2026-014 &middot; Traviesas PR-22", "Trazabilidad editable", statusPill("warning", "Fabricacion")),

    documentos: () => `
      <div class="view-head"><div><h1>Bandeja documental</h1><p>Revisa entregas, rechaza errores y valida lo que ya esta en regla.</p></div></div>
      <section class="panel">
        <div class="panel-head"><div><span class="label">Bandeja</span><h2>Documentos a revisar</h2></div><button class="button compact">${icon("plus", 15)} Subir</button></div>
        <div class="panel-body flush">
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th>Documento</th><th>Expediente</th><th>Responsable</th><th>Fase</th><th>Estado</th><th>Fecha</th></tr></thead>
              <tbody>${allDocs
                .map(
                  (d) => `<tr>
                    <td><div class="cell-main"><span class="cell-ic">${icon("doc", 15)}</span><span class="strong">${d.name}</span></div></td>
                    <td class="cell-id">${d.exp}</td>
                    <td class="muted">${d.owner}</td>
                    <td class="muted">${d.phase}</td>
                    <td>${statusPill(d.state)}</td>
                    <td class="muted">${d.date}</td>
                  </tr>`,
                )
                .join("")}</tbody>
            </table>
          </div>
        </div>
      </section>`,
  },
};

function expedienteDetail(id) {
  const e = expedientes.find((x) => x.id === id) || expedientes[0];
  return `
    <div class="view-head">
      <div>
        <p class="label">Expediente ${e.id}</p>
        <h1>${e.producto}</h1>
        <p>${e.cliente} &middot; ${e.proveedor} &middot; ${e.fase}</p>
      </div>
      <div class="view-actions">
        <button class="button">${icon("send", 16)} Enviar aviso</button>
        <button class="button primary">Generar reporte</button>
      </div>
    </div>
    ${trackerPanel("Trazabilidad por fases", "Haz clic en una fase", statusPill("warning", "4 de 7 fases"))}`;
}

/* ---------- Shell ---------- */
function sidebarHTML(role, section) {
  const r = ROLES[role];
  const links = r.nav
    .map(
      (n) => `
      <a class="nav-link ${n.id === section ? "is-active" : ""}" data-go="#${role}/${n.id}">
        ${icon(n.icon)}<span>${n.label}</span>${n.count ? `<span class="count">${n.count}</span>` : ""}
      </a>`,
    )
    .join("");

  const switches = Object.keys(ROLES)
    .map((k) => `<a class="nav-link ${k === role ? "is-active" : ""}" data-go="#${k}">${icon(k === "admin" ? "building" : k === "proveedor" ? "users" : "profile")}<span>${ROLE_LABELS[k]}</span></a>`)
    .join("");

  return `
    <aside class="sidebar" id="sidebar">
      <div class="workspace-switch">
        <img class="workspace-logo" src="assets/sofein-logo.svg" alt="SOFEIN" />
        <small>${r.label}</small>
      </div>
      <div class="nav-group">Menu</div>
      ${links}
      <div class="nav-group">Cambiar de portal</div>
      ${switches}
      <div class="sidebar-foot">
        <a class="user" href="index.html">
          <span class="avatar">${r.avatar}</span>
          <div><strong>${r.org}</strong><small>${r.sub}</small></div>
        </a>
      </div>
    </aside>`;
}

function breadcrumb(role, section, param) {
  const parts = [`<span>${ROLE_LABELS[role]}</span>`];
  if (section) {
    parts.push(`<span class="sep">/</span>`);
    parts.push(param ? `<span>${SECTION_LABELS[section] || section}</span>` : `<span class="here">${SECTION_LABELS[section] || section}</span>`);
  }
  if (param) {
    parts.push(`<span class="sep">/</span><span class="here">${param}</span>`);
  }
  return parts.join("");
}

function topbarHTML(role, section, param) {
  return `
    <header class="app-topbar">
      <button class="menu-button" id="menuBtn" type="button" aria-label="Abrir menu">${icon("menu", 20)}</button>
      <nav class="crumbs">${breadcrumb(role, section, param)}</nav>
      <div class="spacer"></div>
      <button class="icon-button" type="button" aria-label="Buscar">${icon("search", 18)}</button>
      <button class="icon-button" type="button" aria-label="Notificaciones">${icon("bell", 18)}<span class="dot"></span></button>
    </header>`;
}

/* ---------- Router ---------- */
function parseRoute() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [role, section, param] = raw.split("/");
  const safeRole = ROLES[role] ? role : "cliente";
  const safeSection = ROLES[safeRole].nav.some((n) => n.id === section) ? section : ROLES[safeRole].default;
  return { role: safeRole, section: safeSection, param };
}

function render() {
  if (location.hash.startsWith("#cliente") || location.hash.startsWith("#admin")) return;
  const { role, section, param } = parseRoute();
  const viewFn = (VIEWS[role] && VIEWS[role][section]) || (() => `<div class="banner">${icon("info", 18)} Vista no encontrada.</div>`);

  document.getElementById("app").innerHTML = `
    ${sidebarHTML(role, section)}
    <div class="scrim" data-close-nav></div>
    <div class="main">
      ${topbarHTML(role, section, param)}
      <main class="view">${viewFn(param)}</main>
    </div>`;

  wire(role, section);
  document.querySelector(".view")?.scrollTo?.(0, 0);
  window.scrollTo(0, 0);
}

/* ---------- Interactions ---------- */
function selectPhase(index) {
  document.querySelectorAll(".phase-button").forEach((b, i) => b.classList.toggle("active", i === index));
  const detail = document.querySelector("[data-phase-detail]");
  if (detail) detail.innerHTML = phaseDetailHTML(index);
}

function wire(role, section) {
  // phase selection
  document.querySelectorAll("[data-phase]").forEach((b) => {
    b.addEventListener("click", () => selectPhase(Number(b.dataset.phase)));
  });

  // matching recalc
  document.getElementById("recalc")?.addEventListener("click", () => {
    const list = document.querySelector("[data-supplier-list]");
    if (list) list.innerHTML = supplierCards(Math.floor(Math.random() * 9));
  });

  // document filter chips
  const group = document.querySelector("[data-filter-group]");
  if (group) {
    group.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const f = chip.dataset.filter;
        document.querySelectorAll("[data-doc-list] .row").forEach((row) => {
          row.style.display = f === "all" || row.dataset.state === f ? "" : "none";
        });
      });
    });
  }

  // mobile drawer
  document.getElementById("menuBtn")?.addEventListener("click", () => {
    document.getElementById("app").classList.toggle("nav-open");
  });
}

// delegated navigation + drawer close
document.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (go) {
    e.preventDefault();
    location.hash = go.dataset.go;
    document.getElementById("app").classList.remove("nav-open");
    return;
  }
  if (e.target.closest("[data-close-nav]")) {
    document.getElementById("app").classList.remove("nav-open");
  }
});

window.addEventListener("hashchange", render);

if (!location.hash) location.hash = "#cliente";
render();

/* ============================================================
   SOFEIN Digital · Portal Entidad
   The original demo routes remain in this file for future use,
   while this shell takes over the visible client experience.
   ============================================================ */
(() => {
  const E = {
    building: '<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M8 10h2M8 14h2M8 18h2M15 14h2M15 18h2"/>',
    inbox: '<path d="M22 12h-6l-2 3H10l-2-3H2M5.5 5.2 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.8A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.2Z"/>',
    folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v9A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11Z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 .6v.1a2 2 0 1 1-4 0V20a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9c.2.4.4.7.6 1h.1a2 2 0 1 1 0 4H20c-.2.3-.4.6-.6 1Z"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>', bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M10 21h4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', factory: '<path d="M3 21h18M5 21V10l5 3V8l5 3V5h4v16M9 17h1M14 17h1M18 9h1"/>',
    award: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2 4.5 2-1-9"/>', leaf: '<path d="M20.8 3.2C13.2 3.5 6.5 7.1 6.5 13.4A6.5 6.5 0 0 0 13 20c6.3 0 7.8-8.9 7.8-16.8Z"/><path d="M4 21c3.5-5.5 7.5-8.5 13-11"/>',
    rail: '<path d="M7 3v18M17 3v18M4 7h16M4 17h16M8 12h8"/>', clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 12h6M9 16h4"/>',
    truck: '<path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  const eIcon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${E[name] || ""}</svg>`;
  const PHASES = [
    ["Solicitud", "clipboard", "12 jun", "SOFEIN ha revisado el alcance inicial y los requisitos de suministro."], ["Validación", "shield", "14 jun", "La capacidad técnica y documental han sido contrastadas por el equipo SOFEIN."], ["Oferta", "file", "17 jun", "La oferta y condiciones de suministro están confirmadas."], ["Fabricación", "factory", "Hoy", "El lote está en producción conforme a la planificación acordada."], ["Logística", "truck", "Próximamente", "La salida de fábrica y el transporte se comunicarán automáticamente."], ["Entrega", "rail", "Pendiente", "Recepción del material y validación de conformidad en destino."], ["Cierre", "check", "Pendiente", "SOFEIN consolidará la documentación y el reporte final."]
  ];
  const EXPS = [
    { id: "RFQ-2026-014", name: "Traviesas PR-22", phase: 3, image: "assets/product-traviesas.png", update: "Actualizado hoy, 10:35", next: "Certificado de lote", responsible: "Producción y Calidad SOFEIN" },
    { id: "RFQ-2026-011", name: "Carril laminado 54E1", phase: 2, image: "assets/product-carril.png", update: "Actualizado ayer, 16:20", next: "Confirmación de oferta", responsible: "Equipo técnico SOFEIN" },
    { id: "RFQ-2026-009", name: "Sujeciones elásticas", phase: 5, image: "assets/product-sujeciones.png", update: "Actualizado 18 jun, 09:12", next: "Acta de entrega", responsible: "Logística SOFEIN" }
  ];
  const DOCS = {
    "RFQ-2026-014": [["Solicitud inicial", "Alcance", 0, "signed", "12 jun 2026"], ["Ficha de homologación", "Validación", 1, "complete", "14 jun 2026"], ["Oferta económica", "Oferta", 2, "signed", "17 jun 2026"], ["Presupuesto aprobado", "Oferta", 2, "signed", "18 jun 2026"], ["Orden de fabricación", "Producción", 3, "complete", "19 jun 2026"], ["Ficha técnica de lote", "Producción", 3, "review", "Hoy"], ["Certificado de lote", "Producción", 3, "pending", "—"], ["Plan logístico", "Logística", 4, "pending", "—"], ["Albarán de salida", "Logística", 4, "not-required", "—"], ["Acta de entrega", "Entrega", 5, "not-required", "—"], ["Conformidad de recepción", "Entrega", 5, "not-required", "—"], ["Reporte final de trazabilidad", "Cierre", 6, "not-required", "—"]],
    "RFQ-2026-011": [["Solicitud de suministro", "Alcance", 0, "signed", "11 jun 2026"], ["Ficha de validación", "Validación", 1, "complete", "13 jun 2026"], ["Memoria técnica", "Oferta", 2, "complete", "17 jun 2026"], ["Oferta económica", "Oferta", 2, "review", "Ayer"], ["Condiciones de suministro", "Oferta", 2, "pending", "—"]],
    "RFQ-2026-009": [["Solicitud validada", "Alcance", 0, "signed", "03 jun 2026"], ["Certificado EN 13230", "Validación", 1, "signed", "05 jun 2026"], ["Oferta aprobada", "Oferta", 2, "signed", "07 jun 2026"], ["Certificado de lote", "Producción", 3, "complete", "11 jun 2026"], ["Albarán de salida", "Logística", 4, "complete", "15 jun 2026"], ["Acta de entrega", "Entrega", 5, "review", "18 jun 2026"], ["Conformidad de recepción", "Entrega", 5, "pending", "—"]]
  };
  const NAV = [["ficha", "Entidad", "building"], ["inbox", "Inbox", "inbox", 3], ["expedientes", "Mis expedientes", "folder"], ["documentacion", "Documentación", "file"]];
  const STATUS = { signed: ["Firmado y completado", "signed"], complete: ["Completado", "complete"], review: ["En revisión", "review"], pending: ["Pendiente de aportar", "pending"], "not-required": ["Por realizar", "not-required"] };
  const getExp = id => EXPS.find(item => item.id === id) || EXPS[0];
  const docs = id => DOCS[id] || [];
  const done = id => docs(id).filter(([, , , state]) => ["signed", "complete", "review"].includes(state)).length;
  const pending = id => docs(id).filter(([, , , state]) => state === "pending").length;
  const phase = exp => PHASES[exp.phase];
  const pill = status => `<span class="entity-status ${STATUS[status][1]}"><i></i>${STATUS[status][0]}</span>`;
  const title = exp => `${exp.id} <span>·</span> ${exp.name}`;
  const head = (heading, copy, action = "") => { const detailAction = action || (heading.startsWith("RFQ-") ? `<a class="entity-button entity-button-quiet" data-go="#cliente/expedientes">Volver a mis expedientes</a>` : ""); return `<div class="entity-view-head"><div><h1>${heading}</h1><p>${copy}</p></div>${detailAction}</div>`; };
  const docRow = ([name, category, , state, date]) => `<div class="entity-document-row"><span class="entity-document-icon">${eIcon("file", 19)}</span><div><strong>${name}</strong><small>${category} · ${date}</small></div><span class="entity-document-state">${pill(state)}</span>${["signed", "complete"].includes(state) ? `<button class="entity-download" type="button" data-download="${name}" aria-label="Descargar ${name}">${eIcon("download", 18)}</button>` : `<span class="entity-download is-disabled">${eIcon("download", 18)}</span>`}</div>`;
  const sidebar = section => `<aside class="entity-sidebar" id="sidebar"><a class="entity-logo" href="index.html" aria-label="SOFEIN Digital, volver al inicio"><span><img src="assets/sofein-logo.svg" alt="SOFEIN" /></span><small>Digital</small></a><nav class="entity-nav" aria-label="Navegación principal">${NAV.map(([id, label, ico, count]) => `<a class="entity-nav-link ${section === id ? "is-active" : ""}" data-go="#cliente/${id}">${eIcon(ico)}<span>${label}</span>${count ? `<b>${count}</b>` : ""}</a>`).join("")}</nav><div class="entity-sidebar-bottom"><a class="entity-nav-link ${section === "configuracion" ? "is-active" : ""}" data-go="#cliente/configuracion">${eIcon("cog")}<span>Configuración</span></a><div class="entity-user">${eIcon("user", 18)}<div><strong>Infraestructuras del Norte</strong><small>Entidad verificada</small></div></div></div></aside>`;
  const topbar = (section, param) => `<header class="entity-topbar"><button class="entity-menu-button" id="entityMenuBtn" type="button" aria-label="Abrir menú">${eIcon("menu", 20)}</button><div class="entity-crumbs"><span>Entidad</span><i>/</i><b>${({ ficha:"Entidad", inbox:"Inbox", expedientes:"Mis expedientes", documentacion:"Documentación", configuracion:"Configuración" })[section]}</b>${param ? `<i>/</i><b>${param}</b>` : ""}</div><div class="entity-topbar-actions"><button class="entity-icon-button" type="button" data-toast="Tienes 3 notificaciones pendientes" aria-label="Notificaciones">${eIcon("bell", 18)}<i></i></button></div></header>`;
  const ficha = () => `${head("Entidad", "La información que SOFEIN mantiene al día para la gestión de tus expedientes.")}<section class="entity-profile-panel"><div class="entity-profile-main"><div class="entity-avatar">IN</div><div><div class="entity-title-row"><h2>Infraestructuras del Norte, S.A.</h2><span class="entity-verified">${eIcon("shield", 15)} Entidad verificada</span></div><p>Entidad cliente · Madrid, España</p></div></div><div class="entity-profile-grid"><div><span>NIF</span><strong>A-48092311</strong></div><div><span>Representante legal</span><strong>María González López</strong></div><div><span>Correo de contacto</span><strong>proyectos@infraestructurasnorte.es</strong></div><div><span>Teléfono</span><strong>+34 915 678 910</strong></div><div><span>Domicilio fiscal</span><strong>C/ Orense, 58 · 28020 Madrid</strong></div><div><span>Actividad</span><strong>Infraestructura y movilidad ferroviaria</strong></div></div><div class="entity-compliance"><div><span>${eIcon("shield", 18)}</span><div><b>Documentación corporativa verificada</b><small>Revisión documental vigente hasta 15 nov 2026</small></div></div><div><span>${eIcon("check", 18)}</span><div><b>ISO 9001 e ISO 14001 registradas</b><small>Información disponible para los expedientes activos</small></div></div><div><span>${eIcon("clock", 18)}</span><div><b>Sin incidencias documentales</b><small>SOFEIN avisará por Inbox y correo si requiere una actualización</small></div></div></div></section>`;
  const inbox = () => `${head("Inbox", "Avisos de tus expedientes. Cada actualización se comunica también al correo de la entidad.")}<section class="entity-inbox-list">${[["Documento subido", "Ficha técnica de lote", "RFQ-2026-014 · Traviesas PR-22", "Hoy, 10:35", "file", "complete"], ["Documento requerido", "Certificado de lote", "RFQ-2026-014 · Traviesas PR-22", "Hoy, 09:20", "clock", "pending"], ["Nueva fase en curso", "Entrega", "RFQ-2026-009 · Sujeciones elásticas", "18 jun, 09:12", "rail", "review"]].map(([label, detail, exp, time, ico, state]) => `<article class="entity-inbox-row"><span class="entity-inbox-icon ${state}">${eIcon(ico, 20)}</span><div class="entity-inbox-copy"><strong>${label}</strong><p>${detail} <span>·</span> ${exp}</p></div><time>${time}</time><span class="entity-unread"></span></article>`).join("")}</section>`;
  const expCard = exp => `<article class="entity-exp-card" data-go="#cliente/expedientes/${exp.id}"><div class="entity-exp-image"><img src="${exp.image}" alt="${exp.name}"/><span>${eIcon("folder", 16)} Expediente ferroviario</span></div><div class="entity-exp-card-body"><p class="entity-reference">${exp.id}</p><h2>${exp.name}</h2><div class="entity-exp-meta"><span>Fase actual: ${phase(exp)[0]}</span><span>${done(exp.id)}/${docs(exp.id).length} documentos actualizados</span><span>${pending(exp.id) ? `${pending(exp.id)} pendiente${pending(exp.id)>1?"s":""}` : "Sin pendientes"}</span></div><div class="entity-card-footer"><small>${exp.update}</small>${eIcon("chevron", 18)}</div></div></article>`;
  const expedientes = () => `${head("Mis expedientes", "Consulta en qué fase se encuentra cada proyecto y qué documentación queda por completar.")}<section class="entity-exp-grid">${EXPS.map(expCard).join("")}</section>`;
  const phaseTracker = exp => `<div class="entity-phase-scroll"><div class="entity-phase-tracker" style="--phase-progress:${(exp.phase / (PHASES.length - 1)) * 100}%">${PHASES.map(([label, ico, date], index) => `<button class="entity-phase ${index < exp.phase ? "is-done" : ""} ${index === exp.phase ? "is-current" : ""}" type="button" data-entity-phase="${index}" aria-pressed="${index === exp.phase}"><span>${eIcon(ico, 18)}</span><b>${label}</b><small>${date}</small></button>`).join("")}</div></div>`;
  const phaseDocs = (exp, index = exp.phase) => { const [label, ico, , text] = PHASES[index], rows = docs(exp.id).filter(([, , p]) => p === index); return `<section class="entity-phase-detail" data-entity-phase-detail><div class="entity-phase-detail-head"><div><span>${eIcon(ico, 18)}</span><div><h2>${label}</h2><p>${text}</p></div></div><small>Fase ${index + 1} de ${PHASES.length}</small></div><div class="entity-phase-docs">${rows.length ? rows.map(docRow).join("") : `<div class="entity-empty-docs">${eIcon("file", 20)} Todavía no hay documentos asignados a esta fase.</div>`}</div></section>`; };
  const certificate = (key, heading, text, image, ico) => `<article class="entity-certificate-card entity-certificate-card--${key}"><div class="entity-certificate-art"><img src="${image}" alt=""/><span class="entity-certificate-seal-word" aria-hidden="true">SOFEIN</span></div><div class="entity-certificate-copy"><span>${eIcon(ico, 18)}</span><h2>${heading}</h2><p>${text}</p><button class="entity-button" type="button" data-certificate="${key}">Solicitar certificación ${eIcon("arrow", 16)}</button></div></article>`;
  const expDetail = id => { const exp = getExp(id); return `${head(title(exp), "Seguimiento en directo de la gestión de SOFEIN. Selecciona una fase para revisar su documentación.")}<section class="entity-trace-panel"><div class="entity-trace-summary"><div><span>Hito actual</span><strong>${phase(exp)[0]} en curso</strong><small>${phase(exp)[3]}</small></div><div><span>Última actualización</span><strong>${exp.update.replace("Actualizado ", "")}</strong><small>Ficha técnica recibida y en revisión</small></div><div><span>Responsable SOFEIN</span><strong>${exp.responsible}</strong><small>Gestión y coordinación del expediente</small></div><div><span>Próximo entregable</span><strong>${exp.next}</strong><small>Te avisaremos por Inbox y correo</small></div></div>${phaseTracker(exp)}${phaseDocs(exp)}</section><section class="entity-certificates"><div class="entity-section-title"><h2>Certificaciones disponibles</h2><p>Completa el expediente con acreditaciones SOFEIN vinculadas a tu suministro.</p></div><div class="entity-certificate-grid">${certificate("calidad", "Certificación SOFEIN", "Obtén una acreditación de calidad y conformidad vinculada a este expediente.", "assets/certificate-seal-v4.png", "award")}${certificate("sostenibilidad", "Certificado SOFEIN Sostenibilidad", "Acredita las prácticas y la documentación ambiental del suministro.", "assets/certificate-seal-v4.png", "leaf")}</div></section>`; };
  const docProject = exp => `<article class="entity-doc-project" data-go="#cliente/documentacion/${exp.id}"><div class="entity-doc-product-image"><img src="${exp.image}" alt="${exp.name}"/></div><div class="entity-doc-project-content"><div class="entity-doc-project-top"><span>${eIcon("folder", 20)}</span><b>${exp.id}</b></div><h2>${exp.name}</h2><p>${phase(exp)[0]} · ${exp.update.replace("Actualizado ", "")}</p><div class="entity-doc-progress"><div><span>Documentación</span><strong>${done(exp.id)}/${docs(exp.id).length}</strong></div><i><em style="width:${Math.round(done(exp.id)/docs(exp.id).length*100)}%"></em></i></div><div class="entity-doc-project-bottom"><small>${pending(exp.id) ? `${pending(exp.id)} pendiente${pending(exp.id)>1?"s":""}` : "Sin documentos pendientes"}</small>${eIcon("chevron", 18)}</div></div></article>`;
  const documentacion = () => `${head("Documentación", "Accede a los expedientes y revisa el estado de cada archivo asociado.")}<section class="entity-doc-project-grid">${EXPS.map(docProject).join("")}</section>`;
  const documentacionDetail = id => { const exp = getExp(id); return `${head(title(exp), "Documentación asociada al expediente. Las descargas estarán disponibles una vez completadas.", `<a class="entity-button entity-button-quiet" data-go="#cliente/documentacion">Volver a documentación</a>`)}<section class="entity-document-panel"><div class="entity-document-panel-head"><div><span>${eIcon("folder",20)}</span><div><h2>${exp.name}</h2><p>${phase(exp)[0]} · ${done(exp.id)}/${docs(exp.id).length} documentos actualizados</p></div></div><div class="entity-completion"><b>${done(exp.id)}/${docs(exp.id).length}</b><span>completados</span></div></div><div class="entity-document-list">${docs(exp.id).map(docRow).join("")}</div></section>`; };
  const configuracion = () => { const current = document.documentElement.dataset.theme; return `${head("Configuración", "Personaliza la visualización de la plataforma para tu equipo.")}<section class="entity-settings-panel"><div><h2>Apariencia</h2><p>Elige el tema que prefieras. Tu selección se guardará para próximas visitas.</p></div><div class="entity-theme-options">${[["dark","moon","Modo oscuro","Predeterminado · verde SOFEIN profundo"],["light","sun","Modo claro","Superficies limpias para lectura documental"]].map(([value,ico,label,copy]) => `<button class="entity-theme-option ${current===value?"is-selected":""}" data-theme-choice="${value}" type="button"><span>${eIcon(ico,19)}</span><div><b>${label}</b><small>${copy}</small></div>${current===value?eIcon("check",18):""}</button>`).join("")}</div></section>`; };
  const views = { ficha, inbox, expedientes, documentacion, configuracion };
  const route = () => { const [, section, param] = location.hash.replace(/^#\/?/, "").split("/"); return { section: [...NAV.map(([id])=>id), "configuracion"].includes(section) ? section : "ficha", param }; };
  const renderEntity = () => { if(!location.hash.startsWith("#cliente")) return; const { section, param } = route(); let content = views[section](); if(section === "expedientes" && param) content = expDetail(param); if(section === "documentacion" && param) content = documentacionDetail(param); document.getElementById("app").innerHTML = `${sidebar(section)}<div class="entity-scrim" data-entity-close></div><div class="entity-main">${topbar(section,param)}<main class="entity-view">${content}</main><div class="entity-toast" role="status" aria-live="polite"></div></div>`; bind(); };
  const toast = message => { const node = document.querySelector(".entity-toast"); if(!node) return; node.textContent = message; node.classList.add("is-visible"); window.setTimeout(() => node.classList.remove("is-visible"), 2800); };
  const bind = () => { document.getElementById("entityMenuBtn")?.addEventListener("click", () => document.getElementById("app").classList.toggle("nav-open")); document.querySelectorAll("[data-entity-phase]").forEach(button => button.addEventListener("click", () => { const exp = getExp(route().param), index = Number(button.dataset.entityPhase), detail = document.querySelector("[data-entity-phase-detail]"); document.querySelectorAll("[data-entity-phase]").forEach(item => item.setAttribute("aria-pressed", item===button ? "true" : "false")); if(detail) detail.outerHTML = phaseDocs(exp,index); })); document.querySelectorAll("[data-theme-choice]").forEach(button => button.addEventListener("click", () => { localStorage.setItem("sofein-theme",button.dataset.themeChoice); document.documentElement.dataset.theme=button.dataset.themeChoice; renderEntity(); toast(`Modo ${button.dataset.themeChoice === "dark" ? "oscuro" : "claro"} activado`); })); document.querySelectorAll("[data-download]").forEach(button => button.addEventListener("click", () => toast(`Descarga preparada: ${button.dataset.download}`))); document.querySelectorAll("[data-certificate]").forEach(button => button.addEventListener("click", () => toast(`Solicitud de certificación ${button.dataset.certificate} registrada`))); document.querySelectorAll("[data-toast]").forEach(button => button.addEventListener("click", () => toast(button.dataset.toast))); };
  document.documentElement.dataset.theme = localStorage.getItem("sofein-theme") || "dark";
  document.addEventListener("click", event => { const target=event.target.closest("[data-go]"); if(target) { event.preventDefault(); location.hash=target.dataset.go; document.getElementById("app")?.classList.remove("nav-open"); } if(event.target.closest("[data-entity-close]")) document.getElementById("app")?.classList.remove("nav-open"); });
  window.addEventListener("hashchange", renderEntity);
  if(!location.hash || location.hash === "#cliente") location.hash="#cliente/ficha";
  renderEntity();
})();

/* ============================================================
   SOFEIN Digital · Admin workspace (front-end demonstration)
   ============================================================ */
(() => {
  const ADMIN_NAV = [
    ["overview", "Visión global", "grid"], ["clients", "Clientes", "users"],
    ["matching", "Matching de proveedores", "route"], ["inbox", "Inbox", "inbox", 2], ["config", "Configuración", "cog"]
  ];
  const A_PHASES = [["Solicitud", "file"], ["Validación", "users"], ["Oferta", "doc"], ["Fabricación", "cog"], ["Logística", "truck"], ["Entrega", "packageCheck"], ["Cierre", "clipboardCheck"]];
  const CLIENTS = [
    { id:"CLI-0247", initials:"IN", name:"Infraestructuras del Norte, S.A.", active:3, pending:5, activity:"Hoy, 10:35", city:"Madrid", image:"assets/product-traviesas.png" },
    { id:"CLI-0218", initials:"MB", name:"Metro de Bilbao", active:2, pending:1, activity:"Ayer, 16:20", city:"Bilbao", image:"assets/product-carril.png" },
    { id:"CLI-0189", initials:"FG", name:"Ferrocarrils de la Generalitat", active:1, pending:0, activity:"18 jun, 09:12", city:"Barcelona", image:"assets/product-sujeciones.png" },
    { id:"CLI-0173", initials:"ET", name:"Euskotren", active:1, pending:2, activity:"17 jun, 12:40", city:"Donostia", image:"assets/digital-hero.png" }
  ];
  const ADMIN_EXPS = [
    { id:"RFQ-2026-014", client:"CLI-0247", name:"Traviesas PR-22", phase:3, due:"En 5 días", responsible:"IberRail Components", updated:"Hoy, 10:35", image:"assets/product-traviesas.png" },
    { id:"RFQ-2026-011", client:"CLI-0247", name:"Carril laminado 54E1", phase:2, due:"En 8 días", responsible:"Norte Vía Industrial", updated:"Ayer, 16:20", image:"assets/product-carril.png" },
    { id:"RFQ-2026-009", client:"CLI-0247", name:"Sujeciones elásticas", phase:5, due:"En 10 días", responsible:"IberRail Components", updated:"18 jun, 09:12", image:"assets/product-sujeciones.png" },
    { id:"RFQ-2026-007", client:"CLI-0218", name:"Material de vía LAV", phase:1, due:"En 12 días", responsible:"Rail Core Europe", updated:"17 jun, 11:08", image:"assets/product-carril.png" },
    { id:"RFQ-2026-005", client:"CLI-0189", name:"Placas de asiento", phase:4, due:"En 14 días", responsible:"GreenTrack Supply", updated:"16 jun, 15:05", image:"assets/product-sujeciones.png" }
  ];
  const ADMIN_DOCS = {
    "RFQ-2026-014": [["Orden de fabricación",3,"Completado","19 jun 2026","SOFEIN"],["Ficha técnica de lote",3,"En revisión","Hoy","IberRail Components"],["Certificado de lote",3,"Pendiente", "En 5 días","IberRail Components"],["Plan logístico",4,"Pendiente","En 8 días","IberRail Components"]],
    "RFQ-2026-011": [["Oferta económica",2,"Completado","17 jun 2026","Norte Vía Industrial"],["Condiciones de suministro",2,"Pendiente","En 8 días","Norte Vía Industrial"],["Marcado CE",2,"Pendiente","En 10 días","Norte Vía Industrial"]],
    "RFQ-2026-009": [["Acta de entrega",5,"En revisión","18 jun 2026","SOFEIN"],["Conformidad de recepción",5,"Pendiente","En 10 días","Infraestructuras del Norte, S.A."]]
  };
  const CERTIFICATE_REQUESTS = [
    { client:"Metro de Bilbao", certificate:"Certificado SOFEIN Sostenibilidad", state:"Nueva", date:"Hoy, 09:15", icon:"tree" },
    { client:"Infraestructuras del Norte, S.A.", certificate:"Certificación SOFEIN", state:"En revisión", date:"Ayer, 16:40", icon:"clipboardCheck" }
  ];
  const aIcon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const aExp = id => ADMIN_EXPS.find(item => item.id === id) || ADMIN_EXPS[0];
  const aClient = id => CLIENTS.find(item => item.id === id) || CLIENTS[0];
  const aDocs = id => ADMIN_DOCS[id] || [];
  const phaseName = exp => A_PHASES[exp.phase][0];
  const stateClass = state => state === "Pendiente" ? "pending" : state === "En revisión" ? "review" : "complete";
  const statePill = state => `<span class="admin-state ${stateClass(state)}"><i></i>${state}</span>`;
  const aHead = (title, copy, action = "") => { const isClientDetail = CLIENTS.some(client => client.name === title); const detailAction = isClientDetail ? `<div class="admin-detail-actions"><a class="admin-quiet-button" data-go="#admin/clients">Volver a clientes</a>${action}</div>` : action; return `<div class="admin-view-head"><div><h1>${title}</h1><p>${copy}</p></div>${detailAction}</div>`; };
  const sidebar = section => `<aside class="admin-sidebar" id="adminSidebar"><a class="admin-logo" href="index.html"><span><img src="assets/sofein-logo.svg" alt="SOFEIN" /></span><small>Digital · Administración</small></a><nav>${ADMIN_NAV.map(([id,label,ico,count]) => `<a class="admin-nav-link ${section===id?"is-active":""}" data-go="#admin/${id}">${aIcon(ico)}<span>${label}</span>${count?`<b>${count}</b>`:""}</a>`).join("")}</nav><div class="admin-sidebar-foot"><div class="admin-admin-user"><span>AD</span><div><strong>SOFEIN Admin</strong><small>Administración</small></div></div><a data-go="#cliente/configuracion" class="admin-return">${aIcon("chevron",15)} Volver a Entidad</a></div></aside>`;
  const topbar = (section,param) => `<header class="admin-topbar"><button class="admin-menu" id="adminMenu" type="button" aria-label="Abrir menú">${aIcon("menu",20)}</button><div class="admin-crumbs"><span>Administración</span><i>/</i><b>${param||({overview:"Visión global",clients:"Clientes",documents:"Documentos",matching:"Matching de proveedores",inbox:"Inbox",config:"Configuración"})[section]}</b></div><button class="admin-bell" type="button" data-admin-toast="Tienes 2 solicitudes nuevas" aria-label="Notificaciones">${aIcon("bell",18)}<i></i></button></header>`;
  const metric = (label,value,tone="") => `<div class="admin-metric ${tone}"><span>${label}</span><strong>${value}</strong></div>`;
  const histogram = () => `<section class="admin-histogram"><div class="admin-histogram-head"><h2>Documentos por estado</h2><span>Estado actual</span></div><div class="admin-histogram-bars" role="img" aria-label="128 documentos entregados, 24 en revisión, 37 pendientes y 19 no requeridos">${[["Entregados",128,"delivered"],["En revisión",24,"review"],["Pendientes",37,"pending"],["No requeridos",19,"not-required"]].map(([label,value,tone])=>`<article class="${tone}"><strong>${value}</strong><div><i style="--bar-height:${Math.round((value / 128) * 100)}%"></i></div><span>${label}</span></article>`).join("")}</div></section>`;
  const alerts = () => `<section class="admin-alerts"><div class="admin-section-head"><div><h2>Alertas documentales</h2><p>Entregas previstas en los próximos diez días.</p></div><span>Ordenadas por urgencia</span></div><div class="admin-alert-list">${[["En 5 días","Certificado de lote","RFQ-2026-014","IberRail Components"],["En 8 días","Condiciones de suministro","RFQ-2026-011","Norte Vía Industrial"],["En 10 días","Conformidad de recepción","RFQ-2026-009","Infraestructuras del Norte"]].map(([due,doc,exp,target],index) => `<div class="admin-alert-row ${index===0?"is-critical":"is-urgent"}"><span class="admin-deadline">${due}</span><strong>${doc}</strong><span>${exp}</span><span>${target}</span><button class="admin-quiet-button" type="button" data-quick-request="${doc}">Solicitar</button></div>`).join("")}</div></section>`;
  const overview = () => `${aHead("Visión global", "El estado esencial de la operación ferroviaria.")}<section class="admin-top-insight"><div class="admin-metrics">${metric("Proyectos cerrados", "24")}${metric("Documentos firmados", "128")}${metric("Documentos pendientes", "37", "warning")}</div>${histogram()}</section>${alerts()}<div class="admin-activity"><span>Actividad reciente</span><p><b>Ficha técnica de lote</b> actualizada en RFQ-2026-014</p><small>Hoy, 10:35</small></div>`;
  const clientCard = client => `<article class="admin-client-card" data-go="#admin/clients/${client.id}"><div><span class="admin-client-initials"><img src="${client.image}" alt=""/><b>${client.initials}</b></span><span class="admin-verified">${aIcon("shield",14)} Verificada</span></div><h2>${client.name}</h2><p>${client.city} · ${client.id}</p><dl><div><dt>Expedientes activos</dt><dd>${client.active}</dd></div><div><dt>Documentos pendientes</dt><dd>${client.pending}</dd></div></dl><footer><small>Actividad: ${client.activity}</small>${aIcon("chevron",18)}</footer></article>`;
  const clientForm = () => `<aside class="admin-drawer" data-admin-drawer><div><h2>Nueva entidad</h2><button type="button" data-close-drawer aria-label="Cerrar">×</button></div><form id="entityCreateForm"><label>Razón social<input name="company" required placeholder="Nombre de la entidad" /></label><label>NIF<input name="nif" required placeholder="A-00000000" /></label><label>Persona de contacto<input name="contact" required placeholder="Nombre y apellidos" /></label><label>Correo electrónico<input name="email" required type="email" placeholder="correo@entidad.es" /></label><label>Teléfono<input name="phone" required placeholder="600 000 000" /></label><label>Actividad<select name="activity"><option>Infraestructura ferroviaria</option><option>Operador ferroviario</option><option>Administración pública</option></select></label><button class="admin-primary-button" type="submit">Crear entidad</button></form></aside>`;
  const clients = () => `${aHead("Clientes", "Entidades activas y su estado operativo.", `<div class="admin-toolbar-action"><button class="admin-primary-button" data-open-drawer>+ Añadir entidad</button></div>`)}<div class="admin-filterbar"><label>${aIcon("search",17)}<input id="clientSearch" placeholder="Buscar entidad" /></label><select><option>Todos los estados</option><option>Con documentos pendientes</option><option>Verificadas</option></select><select><option>Todas las actividades</option><option>Infraestructura</option><option>Operador</option></select></div><section class="admin-client-grid" id="clientGrid">${CLIENTS.map(clientCard).join("")}</section><div class="admin-drawer-wrap"></div>`;
  const expCard = exp => `<article class="admin-exp-card"><div class="admin-exp-card-top"><span class="admin-exp-id">${exp.id}</span><span class="admin-phase-mini">${aIcon(A_PHASES[exp.phase][1],14)} ${phaseName(exp)}</span></div><img class="admin-exp-product-image" src="${exp.image}" alt="${exp.name}"/><h3>${exp.name}</h3><p>${exp.responsible}</p><div class="admin-exp-card-meta"><div><span>Próximo plazo</span><strong class="admin-due">${exp.due}</strong></div><div><span>Actualización</span><strong>${exp.updated}</strong></div></div><div class="admin-exp-actions"><a class="admin-quiet-button" data-go="#admin/documents/${exp.id}">${aIcon("file",15)} Documentos</a><a class="admin-quiet-button" data-go="#admin/trace/${exp.id}">${aIcon("route",15)} Trazabilidad</a></div></article>`;
  const clientDetail = id => { const client=aClient(id), exps=ADMIN_EXPS.filter(exp=>exp.client===client.id); return `${aHead(client.name, `${client.id} · ${client.city} · Entidad verificada`, `<button class="admin-primary-button" data-admin-toast="Creación de expediente preparada">+ Crear expediente</button>`)}<div class="admin-client-summary"><div class="admin-client-detail-avatar"><img src="${client.image}" alt=""/><b>${client.initials}</b></div><div><span>${client.active}</span><small>expedientes activos</small></div><div><span>${client.pending}</span><small>documentos pendientes</small></div><p>La entidad dispone de toda su actividad centralizada en una única vista administrativa.</p></div><section class="admin-exp-list"><div class="admin-list-head"><h2>Expedientes</h2><span>${exps.length} activos</span></div>${exps.map(expCard).join("")}</section>`; };
  const docRow = ([name,phase,state,due,target], id) => `<div class="admin-doc-row"><span>${aIcon("doc",18)}</span><div><strong>${name}</strong><small>${id} · ${A_PHASES[phase][0]} · ${target}</small></div>${statePill(state)}<b class="admin-due">${due}</b><button class="admin-row-action" data-quick-request="${name}" type="button">Solicitar</button></div>`;
  const documents = (id) => { const exp=id?aExp(id):null, all=id?aDocs(id):ADMIN_EXPS.flatMap(item=>aDocs(item.id).map(doc=>[...doc,item.id])); const rows=id?all.map(doc=>docRow(doc,id)):all.sort((a,b)=>a[3].includes("5")?-1:1).map(doc=>docRow(doc.slice(0,5),doc[5])); const title=id?`${id} · Documentos` : "Documentos"; const back=exp?`<a class="admin-quiet-button" data-go="#admin/clients/${exp.client}">Volver a la entidad</a>`:""; return `${aHead(title, id?"Archivos necesarios para la fase actual del expediente.":"Prioriza documentos por vencimiento, entidad responsable y estado.",back)}<div class="admin-filterbar compact"><select><option>Todos los expedientes</option></select><select><option>Todos los estados</option><option>Pendientes</option><option>En revisión</option></select><span>Mostrando por prioridad</span></div><section class="admin-document-list"><div class="admin-doc-table-head"><span>Documento</span><span>Estado</span><span>Plazo</span><span></span></div>${rows.join("")}</section>`; };
  const phaseTracker = (exp) => `<div class="admin-phase-scroll"><div class="admin-phase-tracker" style="--admin-progress:${(exp.phase/(A_PHASES.length-1))*100}%">${A_PHASES.map(([label,ico],index)=>`<button class="admin-phase ${index<exp.phase?"is-done":""} ${index===exp.phase?"is-current":""}" data-admin-phase="${index}" type="button" aria-pressed="${index===exp.phase}"><span>${aIcon(ico,17)}</span><b>${label}</b></button>`).join("")}</div></div>`;
  const traceDocs = (exp,index=exp.phase) => { const rows=aDocs(exp.id).filter(([,phase])=>phase===index); return `<section class="admin-trace-docs" data-admin-phase-docs><div><h2>Documentos de esta fase</h2><p>${A_PHASES[index][0]} · selección y control administrativo</p></div>${rows.length?rows.map(doc=>docRow(doc,exp.id)).join(""):`<p class="admin-empty">No hay documentos asignados a esta fase.</p>`}</section>`; };
  const requestComposer = (exp) => { const pending=aDocs(exp.id).filter(([, ,state])=>state!=="Completado"); return `<section class="admin-request-composer"><div><h2>Solicitar documentación</h2><p>Selecciona los documentos y los destinatarios. Se generará un correo automático de demostración.</p><div class="admin-request-checks">${pending.map(([name])=>`<label><input type="checkbox" checked name="request-doc" value="${name}"/>${name}</label>`).join("")}</div><div class="admin-recipient"><button class="is-selected" data-recipient="Entidad cliente" type="button">Entidad cliente</button><button data-recipient="Proveedor" type="button">Proveedor</button></div></div><div class="admin-email-preview"><span>Vista previa del correo</span><p><b>Asunto:</b> Solicitud de documentación — ${exp.id}</p><p>Solicitamos la documentación seleccionada para la fase actual <b>${phaseName(exp)}</b>. Por favor, remítela antes del plazo indicado.</p><button class="admin-primary-button" data-send-request="${exp.id}" type="button">${aIcon("send",16)} Enviar solicitud</button></div></section>`; };
  const trace = id => { const exp=aExp(id); return `${aHead(`${exp.id} · ${exp.name}`, "Supervisión administrativa del avance, documentos y próximos hitos.", `<a class="admin-quiet-button" data-go="#admin/clients/${exp.client}">Volver a la entidad</a>`)}<section class="admin-trace-summary"><div><span>Hito actual</span><strong>${phaseName(exp)}</strong></div><div><span>Última actualización</span><strong>${exp.updated}</strong></div><div><span>Próximo entregable</span><strong>Certificado de lote</strong></div></section>${phaseTracker(exp)}${traceDocs(exp)}${requestComposer(exp)}`; };
  const matching = () => `${aHead("Matching de proveedores", "Opciones compatibles para RFQ-2026-014 · Traviesas PR-22.", `<button class="admin-quiet-button" data-match-refresh>${aIcon("cog",15)} Actualizar</button>`)}<div class="admin-match-requirements"><span>EN 13230</span><span>Producción nacional</span><span>Plazo menor de 6 semanas</span></div><section class="admin-match-list">${[["IberRail Components",94,"EN 13230 · ISO 9001","5 semanas","3/3 requisitos"],["Norte Vía Industrial",87,"Marcado CE · ISO 14001","6 semanas","3/3 requisitos"],["GreenTrack Supply",82,"EN 13230 · Reporte ambiental","6 semanas","2/3 requisitos"]].map(([name,score,standards,lead,criteria])=>`<article class="admin-match-card"><div class="admin-match-card-head"><div><strong>${name}</strong><small>${standards}</small></div><b class="admin-score">${score}%<small>compatibilidad</small></b></div><div class="admin-match-meter" aria-label="${score}% de compatibilidad"><i style="width:${score}%"></i></div><div class="admin-match-card-meta"><span><b>${criteria}</b> criterios cubiertos</span><span><b>${lead}</b> plazo estimado</span><button class="admin-quiet-button" data-admin-toast="Propuesta abierta para ${name}">Ver propuesta</button></div></article>`).join("")}</section>`;
  const inbox = () => `${aHead("Inbox", "Solicitudes de certificación recibidas de las entidades.")}<section class="admin-cert-inbox"><div class="admin-section-head"><div><h2>Solicitudes de certificación</h2><p>Revisa y gestiona las peticiones iniciadas desde el Portal de Cliente.</p></div><span>2 pendientes de revisión</span></div><div class="admin-cert-inbox-list">${CERTIFICATE_REQUESTS.map(item=>`<article class="${item.icon === "tree" ? "is-sustainability" : ""}"><span class="admin-cert-inbox-icon ${item.icon}">${aIcon(item.icon,20)}</span><div><strong>${item.certificate}</strong><p>${item.client}</p></div><time>${item.date}</time><span class="admin-state review"><i></i>${item.state}</span><button class="admin-quiet-button" data-admin-toast="Solicitud de certificación abierta">Revisar</button></article>`).join("")}</div></section>`;
  const config = () => `${aHead("Configuración", "Preferencias del entorno de administración.")}<section class="admin-config-panel"><div><h2>Apariencia</h2><p>El área Admin utiliza el modo oscuro SOFEIN para concentrar el trabajo operativo.</p></div><a class="admin-quiet-button" data-go="#cliente/configuracion">Abrir configuración de Entidad</a></section>`;
  const views = {overview,clients,documents,matching,inbox,config};
  const parse = () => { let [,section,param]=location.hash.replace(/^#\/?/,"").split("/"); if(section === "requests") section = "inbox"; return { section:[...ADMIN_NAV.map(([id])=>id),"documents","trace"].includes(section)?section:"overview", param }; };
  const toast = message => { const el=document.querySelector(".admin-toast"); if(!el)return; el.textContent=message; el.classList.add("is-visible"); setTimeout(()=>el.classList.remove("is-visible"),2800); };
  const renderAdmin = () => { if(!location.hash.startsWith("#admin")) { injectAdminEntry(); return; } const {section,param}=parse(); let content=section==="trace"?trace(param):views[section](); if(section==="clients"&&param)content=clientDetail(param); if(section==="documents"&&param)content=documents(param); document.getElementById("app").innerHTML=`${sidebar(section)}<div class="admin-scrim" data-admin-close></div><div class="admin-main">${topbar(section,param)}<main class="admin-view">${content}</main><div class="admin-toast" role="status" aria-live="polite"></div></div>`; bindAdmin(); window.scrollTo(0,0); };
  const injectAdminEntry = () => { if(!location.hash.startsWith("#cliente/configuracion"))return; const panel=document.querySelector(".entity-settings-panel"); if(panel&&!panel.querySelector("[data-admin-entry]")){const entry=document.createElement("section"); entry.className="entity-admin-entry"; entry.dataset.adminEntry="true"; entry.innerHTML=`<div><h2>Administración</h2><p>Accede a la visión global, entidades y operación documental de SOFEIN.</p></div><a class="entity-button" data-go="#admin/overview">Abrir Admin ${aIcon("arrow",16)}</a>`; panel.after(entry);} };
  const bindAdmin = () => { document.getElementById("adminMenu")?.addEventListener("click",()=>document.getElementById("app").classList.toggle("admin-nav-open")); document.querySelector("[data-open-drawer]")?.addEventListener("click",()=>document.querySelector(".admin-drawer-wrap").innerHTML=clientForm()); document.querySelector("[data-close-drawer]")?.addEventListener("click",()=>document.querySelector(".admin-drawer-wrap").innerHTML=""); document.getElementById("entityCreateForm")?.addEventListener("submit",event=>{event.preventDefault(); const form=new FormData(event.currentTarget), name=form.get("company"); CLIENTS.unshift({id:"CLI-0251",initials:String(name).split(" ").map(x=>x[0]).slice(0,2).join(""),name,active:0,pending:0,activity:"Ahora",city:"Nueva entidad",image:"assets/digital-hero.png"}); renderAdmin(); toast("Entidad creada en esta demostración");}); document.getElementById("clientSearch")?.addEventListener("input",event=>{const query=event.target.value.toLowerCase(); document.querySelectorAll(".admin-client-card").forEach(card=>card.hidden=!card.textContent.toLowerCase().includes(query));}); document.querySelectorAll("[data-admin-phase]").forEach(button=>button.addEventListener("click",()=>{const exp=aExp(parse().param), index=Number(button.dataset.adminPhase), slot=document.querySelector("[data-admin-phase-docs]"); document.querySelectorAll("[data-admin-phase]").forEach(item=>item.setAttribute("aria-pressed",item===button?"true":"false")); if(slot)slot.outerHTML=traceDocs(exp,index);})); document.querySelectorAll("[data-recipient]").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll("[data-recipient]").forEach(item=>item.classList.toggle("is-selected",item===button));})); document.querySelectorAll("[data-send-request]").forEach(button=>button.addEventListener("click",()=>{const docs=[...document.querySelectorAll("[name='request-doc']:checked")].map(item=>item.value); toast(`Solicitud preparada para ${docs.length} documento${docs.length!==1?"s":""}`);})); document.querySelectorAll("[data-quick-request]").forEach(button=>button.addEventListener("click",()=>toast(`Solicitud automática preparada: ${button.dataset.quickRequest}`))); document.querySelectorAll("[data-admin-toast]").forEach(button=>button.addEventListener("click",()=>toast(button.dataset.adminToast))); document.querySelector("[data-match-refresh]")?.addEventListener("click",()=>toast("Matching actualizado con los requisitos actuales")); };
  document.addEventListener("click",event=>{const target=event.target.closest("[data-go]"); if(target&&target.dataset.go.startsWith("#admin")){event.preventDefault();location.hash=target.dataset.go;document.getElementById("app")?.classList.remove("admin-nav-open");}if(event.target.closest("[data-admin-close]"))document.getElementById("app")?.classList.remove("admin-nav-open");});
  window.addEventListener("hashchange",renderAdmin);
  renderAdmin();
})();
