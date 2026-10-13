/* ============================================================
   SOFEIN Procurement — SPA Oficial (SOFEIN Digital)
   4 Players: Admin (SOFEIN), Cliente (Constructor), Proveedor, Destinatario Final (Espectador)
   Constructor de Expedientes Estancos (LMS/Moodle modular) + Gestión de Incidencias + SOFEIN Data
   ============================================================ */

(() => {
  // Configuración de Tema (SaaS B2B Ramp/Holded/Stripe por defecto en Light)
  const savedTheme = localStorage.getItem("sofein-theme") || "light";
  document.documentElement.dataset.theme = savedTheme;

  /* ---------- Iconografía SVG Limpia ---------- */
  const I = {
    grid: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a3 3 0 0 0 3-3V8"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
    folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v9A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11Z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    building: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.23.31.43.65.6 1H20a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-.51 1z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    truck: '<path d="M10 17h4V5H2v12h3"/><path d="M14 17h1"/><path d="M14 8h4l4 4v5h-3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    packageCheck: '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    award: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2 4.5 2-1-9"/>'
  };

  const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;

  /* ---------- Definición de Roles (4 Players) ---------- */
  const PLAYERS = {
    admin: {
      id: "admin",
      label: "SOFEIN Admin",
      badge: "Administración Central",
      entity: "SOFEIN Digital Headquarters",
      avatar: "SF",
      defaultNav: "expedientes",
      nav: [
        { id: "overview", label: "Visión Global", icon: "grid" },
        { id: "expedientes", label: "Expedientes Estancos", icon: "folder", count: 4 },
        { id: "incidencias", label: "Mediación Incidencias", icon: "alert", count: 1 },
        { id: "matching", label: "Matching Proveedores", icon: "users" },
        { id: "sofein_data", label: "SOFEIN Data (Tiempos)", icon: "activity", badge: "Live" },
        { id: "documentos", label: "Bandeja Validación", icon: "file", count: 5 }
      ]
    },
    cliente: {
      id: "cliente",
      label: "Constructor (Cliente)",
      badge: "Constructor de Vía",
      entity: "Infraestructuras del Norte, S.A.",
      avatar: "IN",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Mis Expedientes", icon: "folder", count: 3 },
        { id: "incidencias", label: "Incidencias & Cambios", icon: "alert" },
        { id: "nuevo", label: "Nuevo Expediente", icon: "plus" },
        { id: "inbox", label: "Inbox Requerimientos", icon: "inbox", count: 2 },
        { id: "entidad", label: "Ficha Corporativa", icon: "building" }
      ]
    },
    proveedor: {
      id: "proveedor",
      label: "Proveedor Homologado",
      badge: "Taller & Suministrador",
      entity: "IberRail Components, S.L.",
      avatar: "IR",
      defaultNav: "mis_suministros",
      nav: [
        { id: "mis_suministros", label: "Mis Suministros (Lotes)", icon: "folder", count: 2 },
        { id: "solicitudes", label: "RFQs & Cotizaciones", icon: "file", count: 1 },
        { id: "incidencias", label: "Notificar Incidencia", icon: "alert" },
        { id: "perfil", label: "Capacidad Técnica", icon: "profile" }
      ]
    },
    destinatario: {
      id: "destinatario",
      label: "Destinatario Final",
      badge: "Auditor / Propietario Vía",
      entity: "ADIF / Factoría Volkswagen (Acceso Ferroviario)",
      avatar: "VW",
      defaultNav: "auditoria",
      nav: [
        { id: "auditoria", label: "Visión del Tramo", icon: "eye" },
        { id: "certificaciones", label: "Cumplimiento Normativo", icon: "shield" },
        { id: "pasaporte", label: "Pasaporte Digital", icon: "award" }
      ]
    }
  };

  /* ---------- Fases Estándar del Constructor de Expedientes ---------- */
  const PHASES = [
    { num: 1, id: "alcance", name: "1. Alcance & Requisitos", icon: "file", desc: "Planos de vía, memorias técnicas y condicionantes de instalación." },
    { num: 2, id: "cotizacion", name: "2. Cotización (Fase 1/2)", icon: "users", desc: "Fase 1 (pre-cotización de 3 proveedores) y Fase 2 (ofertas vinculantes)." },
    { num: 3, id: "formalizacion", name: "3. Formalización de Pedido", icon: "file", desc: "Hoja de pedido y acuerdo tripartito con delimitación de responsabilidad SOFEIN." },
    { num: 4, id: "fabricacion", name: "4. Fabricación & Calidad", icon: "cog", desc: "Producción de lote, ensayos mecánicos y certificado de homologación EN 13230." },
    { num: 5, id: "logistica", name: "5. Logística & Despacho", icon: "truck", desc: "Plan de transporte, confirmación de flota y albaranes de salida de taller." },
    { num: 6, id: "recepcion", name: "6. Recepción en Destino", icon: "packageCheck", desc: "Descarga a pie de vía y acta de conformidad del constructor." },
    { num: 7, id: "cierre", name: "7. Cierre & Pasaporte", icon: "award", desc: "Liquidación, cierre documental y emisión del Pasaporte Digital SOFEIN." }
  ];

  /* ---------- Datos Maestros de Expedientes Estancos ---------- */
  const EXPEDIENTES = [
    {
      id: "RFQ-2026-014",
      producto: "Traviesas de hormigón monobloque PR-22",
      tipoMaterial: "Traviesas — Superestructura",
      subtipo: "Hormigón pretensado monobloque",
      unidades: "14.500 unidades (7.250 m de vía)",
      cliente: "Infraestructuras del Norte, S.A.",
      destinatarioFinal: "Línea de Acceso y Vías Factoría Volkswagen (Conexión Red Adif)",
      proveedor: "IberRail Components, S.L.",
      presupuestoTotal: "482.000 €",
      faseActual: 3, // Fabricación
      plazoPactado: "42 días",
      plazoRealEstimado: "48 días",
      desviacionDias: "+6 días (Demora por curado térmico)",
      estado: "review",
      incidencias: [
        {
          id: "INC-014-1",
          fecha: "Hoy, 10:20",
          origen: "Proveedor (IberRail Components)",
          tipo: "Demora en curado por ola de calor",
          impacto: "+6 días en la segunda mitad del lote",
          estado: "En mediación SOFEIN",
          propuestaMediacion: "SOFEIN propone desdoblar en 2 entregas: Lote A (7.000 uds) en fecha pactada (14 días) y Lote B (7.500 uds) 6 días después. El constructor no paraliza el montaje de vía.",
          firmaCliente: false,
          firmaProveedor: true
        }
      ],
      deliverables: {
        0: [ // Alcance
          { name: "Pliego de Prescripciones Técnicas Adif", owner: "Cliente", state: "complete", format: "PDF", file: "PPT-Adif-NAV-2026.pdf", date: "12 jun" },
          { name: "Plano de Replanteo de Vía (Factoría VW)", owner: "Cliente", state: "complete", format: "DWG / PDF", file: "Plano-Acceso-VW-rev03.pdf", date: "12 jun" }
        ],
        1: [ // Cotización
          { name: "Comparativa Fase 1 (3 Proveedores Preseleccionados)", owner: "SOFEIN", state: "complete", format: "PDF", file: "Comparativa-Fase1-Homologados.pdf", date: "14 jun" },
          { name: "Oferta Económica Vinculante IberRail (Fase 2)", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-IberRail-RevFinal.pdf", date: "16 jun" },
          { name: "Elección y Aceptación de Requisitos por Cliente", owner: "Cliente", state: "complete", format: "Digital", file: "Adjudicacion-Formal-Cliente.pdf", date: "17 jun" }
        ],
        2: [ // Formalización
          { name: "Hoja de Pedido Formalizada (Delimitación Responsabilidad)", owner: "SOFEIN", state: "complete", format: "PDF", file: "Hoja-Pedido-SOF-2026-014.pdf", date: "18 jun" },
          { name: "Acuerdo Marco Plataforma Firmado", owner: "Cliente", state: "complete", format: "Digital", file: "Acuerdo-Marco-InfraNorte.pdf", date: "18 jun" }
        ],
        3: [ // Fabricación
          { name: "Orden de Fabricación y Programa de Ensayos", owner: "SOFEIN", state: "complete", format: "PDF", file: "OF-PR22-Lote44.pdf", date: "19 jun" },
          { name: "Ficha Técnica de Lote y Análisis de Material", owner: "Proveedor", state: "complete", format: "PDF", file: "Ficha-Lote-IberRail-44.pdf", date: "Hoy" },
          { name: "Certificado de Ensayos Mecánicos EN 13230", owner: "Proveedor", state: "review", format: "PDF / Lab", file: "Ensayo-Fatiga-EN13230-Lote44.pdf", date: "Subido hace 2h" },
          { name: "Certificado de Lote Homologado", owner: "Proveedor", state: "pending", format: "PDF", file: null, date: "Previsto en 3 días" }
        ],
        4: [ // Logística
          { name: "Plan Logístico y Coordinación de Transporte", owner: "Proveedor", state: "pending", format: "PDF", file: null, date: "Pendiente" },
          { name: "Albaranes de Salida de Fábrica", owner: "Proveedor", state: "pending", format: "PDF", file: null, date: "Pendiente" }
        ],
        5: [ // Recepción
          { name: "Acta de Descarga a Pie de Vía", owner: "SOFEIN", state: "pending", format: "PDF", file: null, date: "Pendiente" },
          { name: "Conformidad Técnica de Recepción", owner: "Cliente", state: "pending", format: "Digital", file: null, date: "Pendiente" }
        ],
        6: [ // Cierre
          { name: "Pasaporte Digital SOFEIN (Trazabilidad Consolidada)", owner: "SOFEIN", state: "pending", format: "Certificado", file: null, date: "Fase final" }
        ]
      }
    },
    {
      id: "RFQ-2026-011",
      producto: "Carril laminado 54E1 Grado R260",
      tipoMaterial: "Carril — Superestructura",
      subtipo: "Laminado caliente 54E1 Adif 03.360.501",
      unidades: "1.200 toneladas (18 km de barra larga)",
      cliente: "Metro de Bilbao",
      destinatarioFinal: "Consorcio de Transportes de Bizkaia (Línea 4)",
      proveedor: "Norte Vía Industrial, S.A.",
      presupuestoTotal: "1.140.000 €",
      faseActual: 1, // Cotización
      plazoPactado: "60 días",
      plazoRealEstimado: "58 días",
      desviacionDias: "-2 días (Ritmo óptimo)",
      estado: "review",
      incidencias: [],
      deliverables: {
        0: [
          { name: "Especificación Técnica Barra Larga Soldada", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-54E1-MetroBilbao.pdf", date: "11 jun" }
        ],
        1: [
          { name: "Comparativa Fase 1 (3 Laminadores Homologados)", owner: "SOFEIN", state: "complete", format: "PDF", file: "Comparativa-Carril-Fase1.pdf", date: "13 jun" },
          { name: "Oferta Económica y Plazo de Entrega Norte Vía", owner: "Proveedor", state: "review", format: "PDF", file: "Oferta-NorteVia-54E1.pdf", date: "Ayer" }
        ],
        2: [], 3: [], 4: [], 5: [], 6: []
      }
    },
    {
      id: "RFQ-2026-009",
      producto: "Sujeciones elásticas y fijaciones SKL-14",
      tipoMaterial: "Fijaciones — Superestructura",
      subtipo: "Clip elástico + Placas de asiento antivibratorias",
      unidades: "29.000 conjuntos completos",
      cliente: "Ferrocarrils de la Generalitat de Catalunya",
      destinatarioFinal: "FGC Infraestructures (Tramo Terrassa - Sabadell)",
      proveedor: "IberRail Components, S.L.",
      presupuestoTotal: "215.000 €",
      faseActual: 5, // Recepción
      plazoPactado: "28 días",
      plazoRealEstimado: "29 días",
      desviacionDias: "+1 día (Retención aduanera resuelta)",
      estado: "review",
      incidencias: [],
      deliverables: {
        0: [{ name: "Pliego Ensayos Fatiga Dinámica", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-SKL14-FGC.pdf", date: "03 jun" }],
        1: [{ name: "Oferta Aprobada y Contrato", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-FGC-IberRail.pdf", date: "07 jun" }],
        2: [{ name: "Hoja de Pedido Formalizada", owner: "SOFEIN", state: "complete", format: "PDF", file: "Pedido-SKL14.pdf", date: "08 jun" }],
        3: [{ name: "Certificado EN 13481 Ensayos Dinámicos", owner: "Proveedor", state: "complete", format: "PDF", file: "Cert-EN13481-Lab.pdf", date: "14 jun" }],
        4: [{ name: "Albarán de Salida de Fábrica", owner: "Proveedor", state: "complete", format: "PDF", file: "Albaran-Transp-089.pdf", date: "18 jun" }],
        5: [{ name: "Acta de Descarga a Pie de Vía", owner: "SOFEIN", state: "review", format: "PDF", file: "Acta-Descarga-FGC.pdf", date: "Ayer" }],
        6: []
      }
    },
    {
      id: "RFQ-2026-022",
      producto: "Traviesas de madera tratada creosotada (3 subtipos)",
      tipoMaterial: "Traviesas de Madera — Especial",
      subtipo: "Roble / Haya creosotada según pliego RENFE/Adif",
      unidades: "3.200 unidades",
      cliente: "Adif Mantenimiento Red Convencional",
      destinatarioFinal: "ADIF Red Convencional (Tramo Medina del Campo)",
      proveedor: "Madera Vía Ibérica, S.A.",
      presupuestoTotal: "198.000 €",
      faseActual: 2, // Formalización
      plazoPactado: "35 días",
      plazoRealEstimado: "35 días",
      desviacionDias: "0 días (En cronograma)",
      estado: "complete",
      incidencias: [],
      deliverables: {
        0: [{ name: "Especificación de Tratamiento Vacío-Presión", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-Creosota.pdf", date: "Ayer" }],
        1: [{ name: "Oferta Aceptada Madera Vía", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-MaderaVia.pdf", date: "Hoy" }],
        2: [{ name: "Hoja de Pedido y Póliza de Suministro", owner: "SOFEIN", state: "review", format: "PDF", file: "Hoja-Pedido-Madera.pdf", date: "Hoy" }],
        3: [], 4: [], 5: [], 6: []
      }
    }
  ];

  /* ---------- Helpers de Estado ---------- */
  const STATUS_BADGES = {
    complete: { label: "Validado y conforme", class: "complete", icon: "check" },
    review: { label: "En revisión SOFEIN", class: "review", icon: "file" },
    pending: { label: "Pendiente de entrega", class: "pending", icon: "alert" },
    rejected: { label: "Rechazado con notas", class: "pending", icon: "alert" }
  };

  function getStatusPill(state) {
    const b = STATUS_BADGES[state] || STATUS_BADGES.pending;
    return `<span class="entity-status ${b.class}"><i></i>${b.label}</span>`;
  }

  function getActiveExpediente(id = "RFQ-2026-014") {
    return EXPEDIENTES.find(e => e.id === id) || EXPEDIENTES[0];
  }

  /* ---------- Enrutador y Estado de Vista ---------- */
  let activeRole = "admin";
  let activeSection = "expedientes";
  let activeParam = "RFQ-2026-014";
  let activeDossierPhase = 3;
  let activeDossierTab = "deliverables"; // deliverables | incidents | passport

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    if (!raw) {
      activeRole = "admin";
      activeSection = "expedientes";
      activeParam = "RFQ-2026-014";
      return;
    }
    const [role, section, param] = raw.split("/");
    if (PLAYERS[role]) {
      activeRole = role;
      activeSection = section || PLAYERS[role].defaultNav;
      activeParam = param || (role === "destinatario" ? "RFQ-2026-014" : (section === "expedientes" || section === "mis_suministros" ? "RFQ-2026-014" : null));
    } else {
      activeRole = "admin";
      activeSection = "expedientes";
      activeParam = "RFQ-2026-014";
    }
  }

  /* ---------- Componente: Barra Superior del Ecosistema ---------- */
  function renderUmbrellaHeader() {
    const player = PLAYERS[activeRole];
    return `
      <header class="procurement-umbrella">
        <div class="procurement-umbrella-brand">
          <span>SOFEIN Digital</span>
          <span style="opacity:0.4">/</span>
          <span class="sub">SOFEIN Procurement</span>
          <span class="procurement-eco-badge" style="margin-left:6px"><b>v2.0 MVP</b></span>
        </div>

        <div class="procurement-role-selector" aria-label="Cambiar de Player / Actor">
          ${Object.values(PLAYERS).map(p => `
            <button class="procurement-role-btn ${p.id === activeRole ? "is-active" : ""}" type="button" data-switch-role="${p.id}">
              ${icon(p.id === "admin" ? "building" : p.id === "cliente" ? "users" : p.id === "proveedor" ? "truck" : "eye", 14)}
              <span>${p.label}</span>
            </button>
          `).join("")}
        </div>

        <div class="procurement-ecosystem-links">
          <a class="procurement-eco-badge" href="consulting.html" title="Servicios de consultoría ad-hoc, ISO y transformación">
            <span>SOFEIN Consulting</span>
            <b style="background:rgba(59,130,246,0.2);color:#93c5fd">Ad-hoc</b>
          </a>
          <button class="procurement-eco-badge" type="button" data-go="#admin/sofein_data" title="Captura de tiempos reales para benchmarking">
            <span>SOFEIN Data</span>
            <b>Lead Times</b>
          </button>
          <button class="procurement-eco-badge" type="button" id="themeToggleBtn" aria-label="Cambiar tema">
            ${icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon", 14)}
          </button>
        </div>
      </header>
    `;
  }

  /* ---------- Componente: Barra Lateral (Sidebar) ---------- */
  function renderSidebar() {
    const player = PLAYERS[activeRole];
    const navItems = player.nav.map(item => `
      <a class="admin-nav-link ${activeSection === item.id ? "is-active" : ""}" data-go="#${activeRole}/${item.id}">
        ${icon(item.icon, 18)}
        <span>${item.label}</span>
        ${item.count ? `<b>${item.count}</b>` : item.badge ? `<b style="background:rgba(0,135,81,0.2);color:#86efac;font-size:0.6rem;padding:0 6px">${item.badge}</b>` : ""}
      </a>
    `).join("");

    return `
      <aside class="admin-sidebar" id="appSidebar">
        <a class="admin-logo" href="index.html" aria-label="Volver a página principal">
          <span><img src="assets/sofein-logo.svg" alt="SOFEIN" /></span>
          <small>${player.badge}</small>
        </a>
        <nav>${navItems}</nav>
        <div class="admin-sidebar-foot">
          <div class="admin-admin-user">
            <span>${player.avatar}</span>
            <div>
              <strong>${player.entity}</strong>
              <small>${player.label}</small>
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  /* ---------- Componente: Topbar Interna ---------- */
  function renderTopbar() {
    const player = PLAYERS[activeRole];
    const sectionName = (player.nav.find(n => n.id === activeSection) || {}).label || activeSection;
    return `
      <header class="admin-topbar">
        <button class="admin-menu" id="menuToggleBtn" type="button" aria-label="Abrir menú">${icon("menu", 20)}</button>
        <div class="admin-crumbs">
          <span>${player.label}</span>
          <i>/</i>
          <b>${sectionName}</b>
          ${activeParam ? `<i>/</i><b style="color:var(--entity-accent)">${activeParam}</b>` : ""}
        </div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:12px">
          <button class="admin-bell" type="button" data-toast="Tienes 1 notificación de actualización en RFQ-2026-014" aria-label="Notificaciones">
            ${icon("bell", 18)}<i></i>
          </button>
        </div>
      </header>
    `;
  }

  /* ============================================================
     EL CONSTRUCTOR DE EXPEDIENTES (LMS/Moodle Modular B2B)
     ============================================================ */
  function renderDossierBuilder(expId) {
    const exp = getActiveExpediente(expId);
    const deliverables = exp.deliverables[activeDossierPhase] || [];
    const isDestinatario = activeRole === "destinatario";

    // Stepper HTML
    const stepperHTML = PHASES.map((p, idx) => {
      const isCurrent = idx === activeDossierPhase;
      const isDone = idx < exp.faseActual;
      return `
        <div class="dossier-step ${isCurrent ? "is-current" : isDone ? "is-done" : ""}" data-select-dossier-phase="${idx}">
          <div class="dossier-step-top">
            <span class="dossier-step-num">Fase ${p.num}</span>
            ${isDone ? `<span style="color:var(--entity-accent)">${icon("check", 14)}</span>` : ""}
          </div>
          <div class="dossier-step-title">${p.name}</div>
          <div class="dossier-step-meta">${idx === exp.faseActual ? "En curso" : idx < exp.faseActual ? "Completada" : "Siguiente"}</div>
        </div>
      `;
    }).join("");

    // Deliverables / Ranuras Documentales
    let tabContent = "";
    if (activeDossierTab === "deliverables") {
      const slotsHTML = deliverables.length ? deliverables.map((del, dIdx) => `
        <article class="deliverable-slot">
          <div class="slot-head">
            <div class="slot-identity">
              <span class="slot-icon">${icon(del.format === "DWG / PDF" ? "route" : del.format === "Digital" ? "shield" : "file", 20)}</span>
              <div class="slot-title">
                <h3>${del.name}</h3>
                <p>Formato requerido: <b>${del.format}</b> · Entregable formal de la fase</p>
              </div>
            </div>
            <div class="slot-badges">
              <span class="slot-party-tag">Responsable: ${del.owner}</span>
              ${getStatusPill(del.state)}
            </div>
          </div>

          ${del.file ? `
            <div class="slot-file-row">
              <div class="slot-file-meta">
                ${icon("file", 18)}
                <div>
                  <strong>${del.file}</strong>
                  <small>Registrado el ${del.date} · Firma digital SOFEIN de verificación</small>
                </div>
              </div>
              <div class="slot-actions">
                <button class="slot-action-btn" type="button" data-download="${del.file}">
                  ${icon("download", 14)} Descargar
                </button>
                ${activeRole === "admin" && del.state === "review" ? `
                  <button class="slot-action-btn approve" type="button" data-admin-approve="${exp.id}" data-slot="${dIdx}">
                    ${icon("check", 14)} Aprobar y Validar
                  </button>
                  <button class="slot-action-btn reject" type="button" data-admin-reject="${exp.id}" data-slot="${dIdx}">
                    ${icon("alert", 14)} Rechazar con Nota
                  </button>
                ` : ""}
              </div>
            </div>
          ` : `
            <div class="slot-dropzone" data-dropzone-exp="${exp.id}" data-slot="${dIdx}">
              <div class="slot-dropzone-copy">
                ${icon("upload", 22)}
                <div>
                  <div><b>Arrastra aquí el archivo</b> o haz clic para subir</div>
                  <span class="sub">Formatos admitidos: .pdf, .dwg, .xlsx (Máx 25 MB)</span>
                </div>
              </div>
              <button class="slot-upload-btn" type="button">
                ${icon("plus", 14)} Seleccionar documento
              </button>
            </div>
          `}
        </article>
      `).join("") : `<div style="padding:32px;background:var(--entity-panel);border:1px solid var(--entity-line);border-radius:10px;text-align:center;color:var(--entity-muted)">No hay entregables documentales asignados a esta fase todavía.</div>`;

      tabContent = `<div class="deliverable-slot-grid">${slotsHTML}</div>`;
    } else if (activeDossierTab === "incidents") {
      // Muro de Incidencias & Modificaciones
      const incidentsHTML = exp.incidencias.length ? exp.incidencias.map((inc) => `
        <article class="incident-card ${inc.estado.includes("mediación") ? "is-mediated" : "is-open"}">
          <div class="incident-card-top">
            <div class="incident-card-title">
              <h3>${inc.tipo}</h3>
              <p>Notificada el ${inc.fecha} por <b>${inc.origen}</b></p>
            </div>
            <span class="entity-status review"><i></i>${inc.estado}</span>
          </div>
          <div>
            <span style="font-size:0.76rem;color:var(--entity-warning);font-weight:600">Impacto detectado:</span>
            <span style="font-size:0.8rem;color:var(--entity-text);margin-left:6px">${inc.impacto}</span>
          </div>

          <div class="incident-mediation-box">
            <h4>${icon("shield", 16)} Propuesta de Mediación SOFEIN (Resolución Proactiva)</h4>
            <p>${inc.propuestaMediacion}</p>
          </div>

          <div class="incident-signoff-bar">
            <div class="incident-sign-status">
              <span>Firma Proveedor: <b class="${inc.firmaProveedor ? "signed" : "pending"}">${inc.firmaProveedor ? "✓ Firmado" : "Pendiente"}</b></span>
              <span>Firma Constructor: <b class="${inc.firmaCliente ? "signed" : "pending"}">${inc.firmaCliente ? "✓ Firmado" : "Pendiente"}</b></span>
            </div>
            ${activeRole === "cliente" && !inc.firmaCliente ? `
              <button class="admin-primary-button" type="button" data-sign-incident="${inc.id}">
                ${icon("check", 14)} Firmar y Aceptar Propuesta
              </button>
            ` : activeRole === "admin" ? `
              <span style="font-size:0.75rem;color:var(--entity-accent);font-weight:600">Mediación activa en curso por SOFEIN</span>
            ` : ""}
          </div>
        </article>
      `).join("") : `<div style="padding:32px;background:var(--entity-panel);border:1px solid var(--entity-line);border-radius:10px;text-align:center;color:var(--entity-muted)">No hay incidencias abiertas en este expediente. Toda la operación transcurre en parámetros estándar.</div>`;

      tabContent = `
        <div class="incident-container">
          <div class="incident-head-bar">
            <div>
              <h3 style="margin:0 0 4px;color:var(--entity-text)">Registro Inmutable de Incidencias & Modificaciones</h3>
              <p style="margin:0;font-size:0.8rem;color:var(--entity-muted)">Cada retraso, cambio de volumen o alteración de pliego queda registrado y mediado por SOFEIN sin riesgo jurídico.</p>
            </div>
            ${activeRole !== "destinatario" ? `
              <button class="admin-quiet-button" type="button" data-open-incident-modal="${exp.id}">
                ${icon("plus", 14)} Notificar Nueva Incidencia / Cambio
              </button>
            ` : ""}
          </div>
          ${incidentsHTML}
        </div>
      `;
    } else if (activeDossierTab === "passport") {
      // Pasaporte Digital SOFEIN
      tabContent = `
        <section class="destinatario-hero">
          <div class="destinatario-hero-badges">
            <span class="entity-status complete"><i></i>Sello Oficial SOFEIN Digital</span>
            <span class="dossier-chip">EN 13230 Acreditada</span>
            <span class="dossier-chip">Trazabilidad Inmutable</span>
          </div>
          <h2 style="margin:0 0 8px;color:var(--entity-text);font-size:1.6rem;letter-spacing:-0.03em">Pasaporte Digital de Suministro Ferroviario</h2>
          <p style="margin:0 0 20px;color:var(--entity-muted);max-width:700px;font-size:0.88rem;line-height:1.6">
            Dossier consolidado que acredita especificaciones técnicas, hitos cronológicos certificados, control de incidencias y cumplimiento de normas europeas para el lote <b>${exp.id}</b>.
          </p>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px">
            <div style="padding:14px;background:var(--entity-panel-2);border-radius:8px;border:1px solid var(--entity-line)">
              <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Material de Vía</span>
              <strong style="display:block;margin-top:4px;color:var(--entity-text);font-size:0.88rem">${exp.producto}</strong>
            </div>
            <div style="padding:14px;background:var(--entity-panel-2);border-radius:8px;border:1px solid var(--entity-line)">
              <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Destino de la Vía</span>
              <strong style="display:block;margin-top:4px;color:var(--entity-text);font-size:0.88rem">${exp.destinatarioFinal}</strong>
            </div>
            <div style="padding:14px;background:var(--entity-panel-2);border-radius:8px;border:1px solid var(--entity-line)">
              <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Garantía y Responsabilidad</span>
              <strong style="display:block;margin-top:4px;color:var(--entity-accent);font-size:0.88rem">Fabricante Homologado</strong>
            </div>
          </div>

          <div style="display:flex;gap:12px">
            <button class="admin-primary-button" type="button" data-toast="Descargando Pasaporte Digital SOFEIN (Dossier PDF Acreditado)">
              ${icon("download", 16)} Descargar Pasaporte Digital (PDF)
            </button>
            <button class="admin-quiet-button" type="button" data-toast="Preparando archivo ZIP con certificados y fichas de laboratorio">
              ${icon("folder", 16)} Descargar Expediente Documental Completo (ZIP)
            </button>
          </div>
        </section>
      `;
    }

    return `
      <div class="dossier-builder">
        <!-- Tarjeta de Metadatos del Expediente Estanco -->
        <section class="dossier-meta-card">
          <div class="dossier-title-area">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="font-size:0.75rem;font-weight:700;color:var(--entity-accent);letter-spacing:0.06em">${exp.id}</span>
              <span style="font-size:0.72rem;color:var(--entity-faint)">·</span>
              <span style="font-size:0.75rem;color:var(--entity-muted)">Expediente Estanco Modular</span>
            </div>
            <h2>${exp.producto}</h2>
            <p>${exp.subtipo} · <b>${exp.unidades}</b></p>
            <div class="dossier-chips">
              <span class="dossier-chip"><strong>Contratista:</strong> ${exp.cliente}</span>
              <span class="dossier-chip"><strong>Destinatario Vía:</strong> ${exp.destinatarioFinal}</span>
              ${!isDestinatario ? `<span class="dossier-chip"><strong>Proveedor:</strong> ${exp.proveedor}</span>` : ""}
              ${!isDestinatario ? `<span class="dossier-chip"><strong>Importe:</strong> ${exp.presupuestoTotal}</span>` : `<span class="dossier-chip" style="color:var(--entity-faint)"><strong>Importe:</strong> [Confidencial Contratista]</span>`}
            </div>
          </div>

          <div class="dossier-quick-stats">
            <div class="dossier-quick-stat">
              <span>Plazo Pactado</span>
              <strong>${exp.plazoPactado}</strong>
            </div>
            <div class="dossier-quick-stat">
              <span>Estimado Real</span>
              <strong class="${exp.desviacionDias.includes("+") ? "warning" : "accent"}">${exp.plazoRealEstimado}</strong>
            </div>
            <div class="dossier-quick-stat">
              <span>Incidencias</span>
              <strong>${exp.incidencias.length} activa</strong>
            </div>
          </div>
        </section>

        <!-- Stepper de las 7 Fases -->
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:0.76rem;font-weight:600;color:var(--entity-faint);text-transform:uppercase;letter-spacing:0.06em">Secuencia de Trazabilidad por Fases</span>
            <span style="font-size:0.76rem;color:var(--entity-accent);font-weight:600">Fase actual: ${PHASES[exp.faseActual].name}</span>
          </div>
          <div class="dossier-stepper">
            ${stepperHTML}
          </div>
        </div>

        <!-- Pestañas Internas del Expediente -->
        <div class="dossier-tabs">
          <button class="dossier-tab-btn ${activeDossierTab === "deliverables" ? "is-active" : ""}" type="button" data-switch-dossier-tab="deliverables">
            ${icon("file", 16)} Ranuras Documentales (Fase ${activeDossierPhase + 1})
          </button>
          <button class="dossier-tab-btn ${activeDossierTab === "incidents" ? "is-active" : ""}" type="button" data-switch-dossier-tab="incidents">
            ${icon("alert", 16)} Incidencias & Modificaciones
            ${exp.incidencias.length ? `<b class="badge">${exp.incidencias.length}</b>` : ""}
          </button>
          <button class="dossier-tab-btn ${activeDossierTab === "passport" ? "is-active" : ""}" type="button" data-switch-dossier-tab="passport">
            ${icon("award", 16)} Pasaporte Digital SOFEIN
          </button>
        </div>

        <!-- Contenido de la Pestaña -->
        ${tabContent}
      </div>
    `;
  }

  /* ============================================================
     VISTAS: SOFEIN ADMIN
     ============================================================ */
  function renderAdminView(section, param) {
    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);
      // Listado de expedientes
      const cards = EXPEDIENTES.map(exp => `
        <article class="admin-exp-card" data-go="#admin/expedientes/${exp.id}" style="cursor:pointer">
          <div>
            <span class="admin-exp-id">${exp.id}</span>
            <h3>${exp.producto}</h3>
            <span style="font-size:0.72rem;color:var(--entity-muted)">Destino: ${exp.destinatarioFinal}</span>
          </div>
          <div>
            <span>Contratista / Proveedor</span>
            <strong>${exp.cliente}</strong>
            <small style="color:var(--entity-muted)">${exp.proveedor}</small>
          </div>
          <div>
            <span>Fase & Plazo</span>
            <strong>${PHASES[exp.faseActual].name}</strong>
            <small class="${exp.desviacionDias.includes("+") ? "admin-due" : ""}">Plazo: ${exp.plazoRealEstimado} (${exp.desviacionDias})</small>
          </div>
          <div class="admin-exp-actions">
            <button class="admin-quiet-button" type="button">Abrir Expediente ${icon("arrow", 14)}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Expedientes Estancos</h1>
            <p>Bandeja operativa central. Supervisa el avance por fases, aprueba entregables técnicos y gestiona el suministro.</p>
          </div>
          <button class="admin-primary-button" type="button" data-open-new-exp-modal>
            ${icon("plus", 16)} Crear Expediente Estanco
          </button>
        </div>
        <div class="admin-exp-list">
          ${cards}
        </div>
      `;
    }

    if (section === "sofein_data") {
      // Panel SOFEIN Data: Captura de tiempos reales
      return `
        <div class="admin-view-head">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span class="procurement-eco-badge"><b>SOFEIN DATA</b></span>
              <span style="font-size:0.76rem;color:var(--entity-accent);font-weight:600">Inteligencia Operativa Ferroviaria</span>
            </div>
            <h1>Captura de Tiempos & Benchmarking</h1>
            <p>Datos reales recopilados de cada hito para auditoría y consultoría estratégica de plazos y fiabilidad.</p>
          </div>
          <button class="admin-quiet-button" type="button" data-toast="Exportando datos de tiempos en formato CSV para analítica">
            ${icon("download", 16)} Exportar Histórico (CSV)
          </button>
        </div>

        <section class="sofein-data-grid">
          <div class="sofein-data-card">
            <span class="label">Lead Time Medio</span>
            <strong class="value">44,2 días</strong>
            <small class="sub">+3,8 días vs estimación inicial de oferta</small>
          </div>
          <div class="sofein-data-card">
            <span class="label">Respuesta Documental</span>
            <strong class="value">3,1 días</strong>
            <small class="sub">Tiempo medio de entrega de certificados requeridos</small>
          </div>
          <div class="sofein-data-card">
            <span class="label">Tasa Aprobación 1ª Revisión</span>
            <strong class="value" style="color:var(--entity-accent)">89,4%</strong>
            <small class="sub">10,6% requirió subsanación o rechazo con nota</small>
          </div>
          <div class="sofein-data-card">
            <span class="label">Tiempo Mediación SOFEIN</span>
            <strong class="value">28 horas</strong>
            <small class="sub">Resolución de discrepancias cliente-proveedor</small>
          </div>
        </section>

        <section class="sofein-data-table-panel">
          <div style="padding:18px 24px;border-bottom:1px solid var(--entity-line);display:flex;align-items:center;justify-content:space-between">
            <h3 style="margin:0;font-size:1rem;color:var(--entity-text)">Registro Comparativo de Proveedores por Material</h3>
            <span style="font-size:0.74rem;color:var(--entity-muted)">Base para recomendaciones en SOFEIN Consulting</span>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Proveedor</th>
                  <th>Material Principal</th>
                  <th>Plazo Medio Prometido</th>
                  <th>Plazo Real de Entrega</th>
                  <th>Desviación Media</th>
                  <th>Fiabilidad Documental</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>IberRail Components</b></td>
                  <td>Traviesas de Hormigón / Clips</td>
                  <td>40 días</td>
                  <td>43 días</td>
                  <td style="color:var(--entity-warning)">+3 días</td>
                  <td><span class="entity-status complete">94%</span></td>
                </tr>
                <tr>
                  <td><b>Norte Vía Industrial</b></td>
                  <td>Carril 54E1 / Aparatos de Vía</td>
                  <td>60 días</td>
                  <td>58 días</td>
                  <td style="color:var(--entity-accent)">-2 días</td>
                  <td><span class="entity-status complete">98%</span></td>
                </tr>
                <tr>
                  <td><b>Madera Vía Ibérica</b></td>
                  <td>Traviesas Creosotadas</td>
                  <td>35 días</td>
                  <td>36 días</td>
                  <td style="color:var(--entity-warning)">+1 día</td>
                  <td><span class="entity-status complete">91%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      `;
    }

    if (section === "incidencias") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Mediación de Incidencias & Modificaciones</h1>
            <p>Bandeja de arbitraje de SOFEIN. Intermediación en plazos, alternativas de suministro y delimitación de responsabilidad.</p>
          </div>
        </div>
        <div class="incident-container">
          <article class="incident-card is-mediated">
            <div class="incident-card-top">
              <div class="incident-card-title">
                <h3>Demora en curado por ola de calor · RFQ-2026-014 (Traviesas PR-22)</h3>
                <p>Afecta a <b>Infraestructuras del Norte</b> y <b>IberRail Components</b></p>
              </div>
              <span class="entity-status review"><i></i>En mediación SOFEIN</span>
            </div>
            <div class="incident-mediation-box">
              <h4>${icon("shield", 16)} Propuesta de Mediación Oficial emitidada por SOFEIN</h4>
              <p>Desdoblar la entrega en dos sub-lotes para mantener el montaje de vía del constructor sin penalización: Lote 1 (7.000 uds) en fecha original y Lote 2 (7.500 uds) 6 días después.</p>
            </div>
            <div class="incident-signoff-bar">
              <div class="incident-sign-status">
                <span>Firma Proveedor: <b class="signed">✓ Aceptada</b></span>
                <span>Firma Constructor: <b class="pending">⏳ Pendiente de validación</b></span>
              </div>
              <button class="admin-quiet-button" type="button" data-toast="Recordatorio formal de firma enviado al cliente">
                ${icon("bell", 14)} Recordar Firma a Cliente
              </button>
            </div>
          </article>
        </div>
      `;
    }

    if (section === "overview") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Visión Global Operativa</h1>
            <p>Control centralizado de expedientes de suministro ferroviario, documentación e incidencias activas.</p>
          </div>
          <button class="admin-primary-button" type="button" data-go="#admin/expedientes">
            Ver Todos los Expedientes
          </button>
        </div>
        <section class="admin-top-insight">
          <div class="admin-metrics">
            <div class="admin-metric">
              <span>Expedientes en Curso</span>
              <strong>4</strong>
            </div>
            <div class="admin-metric warning">
              <span>Incidencias en Mediación</span>
              <strong>1</strong>
            </div>
            <div class="admin-metric">
              <span>Entregables Validados</span>
              <strong>18</strong>
            </div>
          </div>
          <div class="admin-histogram">
            <div class="admin-histogram-head">
              <h2>Estado de Ranuras Documentales</h2>
              <span>18 validados · 5 en revisión · 8 pendientes</span>
            </div>
            <div class="admin-histogram-bars">
              <article>
                <strong>18</strong>
                <div><i style="--bar-height:75%"></i></div>
                <span>Validados</span>
              </article>
              <article class="review">
                <strong>5</strong>
                <div><i style="--bar-height:30%"></i></div>
                <span>En revisión</span>
              </article>
              <article class="pending">
                <strong>8</strong>
                <div><i style="--bar-height:45%"></i></div>
                <span>Pendientes</span>
              </article>
              <article class="not-required">
                <strong>12</strong>
                <div><i style="--bar-height:60%"></i></div>
                <span>Fases futuras</span>
              </article>
            </div>
          </div>
        </section>
      `;
    }

    // Default: mostrar lista de expedientes
    return renderDossierBuilder("RFQ-2026-014");
  }

  /* ============================================================
     VISTAS: CLIENTE (CONSTRUCTOR DE VÍA)
     ============================================================ */
  function renderClienteView(section, param) {
    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);
      const cards = EXPEDIENTES.map(exp => `
        <article class="admin-exp-card" data-go="#cliente/expedientes/${exp.id}" style="cursor:pointer">
          <div>
            <span class="admin-exp-id">${exp.id}</span>
            <h3>${exp.producto}</h3>
            <span style="font-size:0.72rem;color:var(--entity-muted)">Destino de vía: ${exp.destinatarioFinal}</span>
          </div>
          <div>
            <span>Proveedor Adjudicado</span>
            <strong>${exp.proveedor}</strong>
          </div>
          <div>
            <span>Fase y Estado</span>
            <strong>${PHASES[exp.faseActual].name}</strong>
            <small class="${exp.desviacionDias.includes("+") ? "admin-due" : ""}">${exp.desviacionDias}</small>
          </div>
          <div class="admin-exp-actions">
            <button class="admin-quiet-button" type="button">Ver Expediente ${icon("arrow", 14)}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Mis Expedientes de Suministro</h1>
            <p>Supervisa el ciclo de vida de los materiales pedidos para tus obras ferroviarias, sube requisitos y valida el cierre.</p>
          </div>
          <button class="admin-primary-button" type="button" data-go="#cliente/nuevo">
            ${icon("plus", 16)} Nuevo Expediente
          </button>
        </div>
        <div class="admin-exp-list">
          ${cards}
        </div>
      `;
    }

    if (section === "nuevo") {
      // Constructor de Nuevo Expediente
      return `
        <div class="admin-view-head">
          <div>
            <h1>Configurar Nuevo Expediente</h1>
            <p>Selecciona el tipo de material, subtipo, destino de la obra y planos para iniciar la cotización.</p>
          </div>
        </div>
        <section class="admin-drawer" style="position:static;width:100%;max-width:760px;margin:0 auto;box-shadow:none;border:1px solid var(--entity-line);border-radius:12px;padding:32px">
          <form id="newExpedienteForm">
            <label>Tipo de Producto de Vía (Catálogo MVP)
              <select name="producto" required>
                <option value="Traviesas de hormigón monobloque">Traviesas de Hormigón Monobloque (Superestructura)</option>
                <option value="Traviesas de madera tratada">Traviesas de Madera Tratada Creosotada (3 subtipos)</option>
                <option value="Traviesas polimerizadas">Traviesas Polimerizadas Sintéticas</option>
                <option value="Carril laminado 54E1 / 60E1">Carril Laminado 54E1 / 60E1</option>
                <option value="Sujeciones y clips elásticos">Clips y Fijaciones Elásticas (SKL-14 / Pandrol)</option>
                <option value="Placas de asiento">Placas de Asiento Metálicas / Elastómero</option>
                <option value="Balasto silíceo">Balasto Silíceo Certificado Tipo 1</option>
                <option value="Especial a medida">Otros / Elementos a Medida (Siemens, Renfe)</option>
              </select>
            </label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <label>Volumen / Cantidad Requerida
                <input name="unidades" placeholder="Ej: 12.000 traviesas o 800 t" required />
              </label>
              <label>Fecha Objetivo de Llegada a Obra
                <input type="date" name="fechaObjetivo" required />
              </label>
            </div>
            <label>Destino de la Vía / Destinatario Final
              <input name="destino" placeholder="Ej: Línea Adif Madrid-Sevilla o Factoría Volkswagen" required />
            </label>
            <label>Pliego o Planos de Replanteo (.pdf, .dwg)
              <input type="file" name="archivo" />
            </label>
            <div style="margin-top:16px;display:flex;gap:12px">
              <button class="admin-primary-button" type="submit">Iniciar Expediente & Solicitar Cotizaciones</button>
              <button class="admin-quiet-button" type="button" data-go="#cliente/expedientes">Cancelar</button>
            </div>
          </form>
        </section>
      `;
    }

    if (section === "incidencias") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Incidencias & Modificaciones de Obra</h1>
            <p>Revisa y acepta propuestas de mediación de SOFEIN ante retrasos de proveedores o cambios en obra.</p>
          </div>
        </div>
        <div class="incident-container">
          <article class="incident-card is-mediated">
            <div class="incident-card-top">
              <div class="incident-card-title">
                <h3>Demora en curado por ola de calor · RFQ-2026-014</h3>
                <p>Proveedor: <b>IberRail Components</b> · Desviación: +6 días en Lote B</p>
              </div>
              <span class="entity-status review"><i></i>Propuesta SOFEIN Disponible</span>
            </div>
            <div class="incident-mediation-box">
              <h4>${icon("shield", 16)} Mediación Propuesta por SOFEIN:</h4>
              <p>Desdoblar la entrega en dos sub-lotes sin sobrecoste. Recibirás Lote A (7.000 uds) en plazo para no parar la colocación de vía, y Lote B (7.500 uds) 6 días después.</p>
            </div>
            <div class="incident-signoff-bar">
              <span style="font-size:0.75rem;color:var(--entity-muted)">Firma requerida para incorporar adenda al Pasaporte Digital</span>
              <button class="admin-primary-button" type="button" data-sign-incident="INC-014-1">
                ${icon("check", 14)} Aceptar y Firmar Adenda
              </button>
            </div>
          </article>
        </div>
      `;
    }

    // Default: mostrar detalle
    return renderDossierBuilder("RFQ-2026-014");
  }

  /* ============================================================
     VISTAS: PROVEEDOR HOMOLOGADO
     ============================================================ */
  function renderProveedorView(section, param) {
    if (section === "mis_suministros") {
      if (param) return renderDossierBuilder(param);
      return `
        <div class="admin-view-head">
          <div>
            <h1>Mis Suministros Adjudicados</h1>
            <p>Accede a tus lotes en curso, sube fichas técnicas y certificados con drag & drop, y reporta avances.</p>
          </div>
        </div>
        <div class="admin-exp-list">
          <article class="admin-exp-card" data-go="#proveedor/mis_suministros/RFQ-2026-014" style="cursor:pointer">
            <div>
              <span class="admin-exp-id">RFQ-2026-014</span>
              <h3>Traviesas de hormigón monobloque PR-22</h3>
              <span style="font-size:0.72rem;color:var(--entity-muted)">Cliente: Infraestructuras del Norte, S.A.</span>
            </div>
            <div>
              <span>Entregables Pendientes</span>
              <strong style="color:var(--entity-warning)">Certificado de Ensayos EN 13230</strong>
            </div>
            <div>
              <span>Plazo de Fabricación</span>
              <strong>Día 22 de 42</strong>
            </div>
            <div class="admin-exp-actions">
              <button class="admin-quiet-button" type="button">Abrir y Subir Archivos ${icon("arrow", 14)}</button>
            </div>
          </article>
        </div>
      `;
    }

    if (section === "solicitudes") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Solicitudes de Cotización (RFQs)</h1>
            <p>Oportunidades de suministro remitidas por SOFEIN conforme a tus productos homologados.</p>
          </div>
        </div>
        <article class="deliverable-slot" style="padding:24px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <span class="dossier-chip" style="margin-bottom:8px">Fase 2: Cotización Vinculante</span>
              <h3 style="margin:4px 0;font-size:1.15rem;color:var(--entity-text)">Carril laminado 54E1 Grado R260 · RFQ-2026-011</h3>
              <p style="margin:0;color:var(--entity-muted);font-size:0.8rem">Volumen solicitado: 1.200 toneladas · Plazo objetivo cliente: 60 días</p>
            </div>
            <div style="display:flex;gap:10px">
              <button class="admin-primary-button" type="button" data-toast="Oferta económica confirmada y trasladada a SOFEIN">
                ${icon("check", 14)} Enviar Oferta Vinculante
              </button>
            </div>
          </div>
        </article>
      `;
    }

    if (section === "incidencias") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Notificar Incidencia de Fábrica</h1>
            <p>Informa de inmediato a SOFEIN de cualquier alteración en plazos o procesos para mediar con el contratista.</p>
          </div>
        </div>
        <section class="admin-drawer" style="position:static;width:100%;max-width:760px;margin:0 auto;box-shadow:none;border:1px solid var(--entity-line);border-radius:12px;padding:32px">
          <form id="notifyIncidentForm">
            <label>Expediente Asociado
              <select name="expId">
                <option value="RFQ-2026-014">RFQ-2026-014 · Traviesas de hormigón monobloque PR-22</option>
              </select>
            </label>
            <label>Tipo de Incidencia
              <select name="tipo">
                <option value="Demora de curado o producción">Demora imprevista en proceso productivo</option>
                <option value="Rotura de stock materia prima">Retraso en recepción de acero pretensado / árido</option>
                <option value="Fallo de transporte / logística">Incapacidad o huelga de transporte</option>
                <option value="No conformidad en ensayo">Resultado anómalo en laboratorio (requiere repetición)</option>
              </select>
            </label>
            <label>Desviación de Plazo Estimada
              <input name="dias" placeholder="Ej: +5 días laborables" required />
            </label>
            <label>Explicación y Medidas Correctoras Propuestas
              <textarea name="detalle" rows="4" style="width:100%;padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit" placeholder="Detalla la causa y la solución que propones para que SOFEIN medie con el cliente..."></textarea>
            </label>
            <button class="admin-primary-button" type="submit" style="margin-top:16px">Transmitir a Mediación SOFEIN</button>
          </form>
        </section>
      `;
    }

    return renderDossierBuilder("RFQ-2026-014");
  }

  /* ============================================================
     VISTAS: DESTINATARIO FINAL (AUDITOR / ESPECTADOR DE VÍA)
     ============================================================ */
  function renderDestinatarioView() {
    const exp = getActiveExpediente("RFQ-2026-014");

    return `
      <div class="admin-view-head">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span class="dossier-chip" style="background:rgba(0,135,81,0.15);color:var(--entity-accent)">Vista Espectador / Auditoría</span>
            <span style="font-size:0.75rem;color:var(--entity-muted)">Propietario de la Infraestructura</span>
          </div>
          <h1>Estado del Tramo Ferroviario</h1>
          <p>${exp.destinatarioFinal}</p>
        </div>
        <button class="admin-primary-button" type="button" data-toast="Descargando Pasaporte Digital oficial del tramo...">
          ${icon("award", 16)} Descargar Pasaporte de Vía
        </button>
      </div>

      <section class="destinatario-hero">
        <div class="destinatario-hero-badges">
          <span class="entity-status complete"><i></i>Material Homologado Adif</span>
          <span class="dossier-chip">EN 13230 Verificada</span>
          <span class="dossier-chip">Trazabilidad Total</span>
        </div>
        <h2 style="margin:0 0 8px;font-size:1.4rem;color:var(--entity-text)">Suministro: ${exp.producto}</h2>
        <p style="margin:0 0 16px;color:var(--entity-muted);font-size:0.86rem">
          Instalación a cargo del contratista adjudicatario <b>${exp.cliente}</b> con supervisión y soporte documental de <b>SOFEIN Digital</b>.
        </p>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px">
          <div style="padding:14px;background:var(--entity-panel-2);border-radius:8px;border:1px solid var(--entity-line)">
            <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Volumen en Instalación</span>
            <strong style="display:block;margin-top:4px;color:var(--entity-text);font-size:0.92rem">${exp.unidades}</strong>
          </div>
          <div style="padding:14px;background:var(--entity-panel-2);border-radius:8px;border:1px solid var(--entity-line)">
            <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Fase del Suministro</span>
            <strong style="display:block;margin-top:4px;color:var(--entity-accent);font-size:0.92rem">Fabricación e Inspección en Taller</strong>
          </div>
          <div style="padding:14px;background:var(--entity-panel-2);border-radius:8px;border:1px solid var(--entity-line)">
            <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Recepción Prevista en Obra</span>
            <strong style="display:block;margin-top:4px;color:var(--entity-text);font-size:0.92rem">En 18 días hábiles</strong>
          </div>
        </div>

        <div class="destinatario-confidential-notice">
          ${icon("shield", 18)}
          <span><b>Aviso de Confidencialidad Comercial:</b> Como destinatario final de la infraestructura dispones de acceso íntegro a certificaciones técnicas, trazabilidad y normativas. Los datos financieros bilaterales y márgenes entre contratista y proveedor quedan reservados conforme a los acuerdos del expediente.</span>
        </div>
      </section>

      <!-- Verificación Técnica del Tramo -->
      <section class="deliverable-slot" style="padding:24px">
        <h3 style="margin:0 0 14px;font-size:1.05rem;color:var(--entity-text)">Certificaciones Técnicas Vinculadas a este Tramo</h3>
        <div style="display:grid;gap:10px">
          <div class="slot-file-row">
            <div class="slot-file-meta">
              ${icon("shield", 18)}
              <div>
                <strong>Acreditación EN 13230: Traviesas y Soporte Ferroviario</strong>
                <small>Laboratorio Homologado · Cumple pliego Adif NAV</small>
              </div>
            </div>
            <span class="entity-status complete"><i></i>Certificado en Vigor</span>
          </div>
          <div class="slot-file-row">
            <div class="slot-file-meta">
              ${icon("award", 18)}
              <div>
                <strong>Declaración de Conformidad CE de Componentes</strong>
                <small>Marcado reglamentario para interoperabilidad ferroviaria europea</small>
              </div>
            </div>
            <span class="entity-status complete"><i></i>Validado</span>
          </div>
        </div>
      </section>
    `;
  }

  /* ---------- Render Principal ---------- */
  function renderApp() {
    parseHash();

    let viewHTML = "";
    if (activeRole === "admin") {
      viewHTML = renderAdminView(activeSection, activeParam);
    } else if (activeRole === "cliente") {
      viewHTML = renderClienteView(activeSection, activeParam);
    } else if (activeRole === "proveedor") {
      viewHTML = renderProveedorView(activeSection, activeParam);
    } else if (activeRole === "destinatario") {
      viewHTML = renderDestinatarioView();
    }

    const appRoot = document.getElementById("app");
    if (!appRoot) return;

    appRoot.innerHTML = `
      <div style="grid-column:1/-1;width:100%">
        ${renderUmbrellaHeader()}
      </div>
      ${renderSidebar()}
      <div class="admin-main">
        ${renderTopbar()}
        <main class="admin-view">
          ${viewHTML}
        </main>
        <div class="admin-toast" id="globalToast" role="status" aria-live="polite"></div>
        <div id="modalContainer"></div>
      </div>
    `;

    bindEvents();
    window.scrollTo(0, 0);
  }

  /* ---------- Notificaciones Toast ---------- */
  function showToast(msg) {
    const toast = document.getElementById("globalToast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  /* ---------- Asignación de Eventos Interactivos ---------- */
  function bindEvents() {
    // Cambio de Player / Rol desde la barra superior
    document.querySelectorAll("[data-switch-role]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetRole = btn.dataset.switchRole;
        location.hash = `#${targetRole}`;
      });
    });

    // Toggle de Tema (Claro / Oscuro)
    document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("sofein-theme", nextTheme);
      renderApp();
      showToast(`Modo ${nextTheme === "dark" ? "oscuro" : "claro (SaaS B2B)"} activado`);
    });

    // Menú móvil
    document.getElementById("menuToggleBtn")?.addEventListener("click", () => {
      document.getElementById("app")?.classList.toggle("nav-open");
    });

    // Cambio de fase en el Constructor de Expedientes
    document.querySelectorAll("[data-select-dossier-phase]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeDossierPhase = Number(btn.dataset.selectDossierPhase);
        renderApp();
      });
    });

    // Cambio de pestaña dentro del expediente
    document.querySelectorAll("[data-switch-dossier-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeDossierTab = btn.dataset.switchDossierTab;
        renderApp();
      });
    });

    // Drag & Drop simulado en las Ranuras Documentales
    document.querySelectorAll(".slot-dropzone").forEach(dropzone => {
      dropzone.addEventListener("dragover", e => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", e => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        const expId = dropzone.dataset.dropzoneExp;
        const slotIdx = Number(dropzone.dataset.slot);
        simulateFileUpload(expId, slotIdx);
      });
      dropzone.addEventListener("click", () => {
        const expId = dropzone.dataset.dropzoneExp;
        const slotIdx = Number(dropzone.dataset.slot);
        simulateFileUpload(expId, slotIdx);
      });
    });

    // Aprobación y Rechazo Administrativo (SOFEIN Admin)
    document.querySelectorAll("[data-admin-approve]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente(btn.dataset.adminApprove);
        const slot = Number(btn.dataset.slot);
        if (exp.deliverables[activeDossierPhase] && exp.deliverables[activeDossierPhase][slot]) {
          exp.deliverables[activeDossierPhase][slot].state = "complete";
          showToast(`✓ Documento validado y certificado con firma SOFEIN`);
          renderApp();
        }
      });
    });

    document.querySelectorAll("[data-admin-reject]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente(btn.dataset.adminReject);
        const slot = Number(btn.dataset.slot);
        const motivo = prompt("Indica el motivo del rechazo formal (se notificará al responsable):", "Falta el sello del laboratorio acreditado en la página 4.");
        if (motivo) {
          if (exp.deliverables[activeDossierPhase] && exp.deliverables[activeDossierPhase][slot]) {
            exp.deliverables[activeDossierPhase][slot].state = "rejected";
            showToast(`Rechazo notificado: ${motivo}`);
            renderApp();
          }
        }
      });
    });

    // Firma de Incidencia / Mediación por Cliente
    document.querySelectorAll("[data-sign-incident]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente("RFQ-2026-014");
        if (exp.incidencias.length) {
          exp.incidencias[0].firmaCliente = true;
          exp.incidencias[0].estado = "Resuelta y formalizada";
          showToast("✓ Adenda de mediación firmada digitalmente por el constructor");
          renderApp();
        }
      });
    });

    // Formulario de Nuevo Expediente
    document.getElementById("newExpedienteForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const newExp = {
        id: `RFQ-2026-0${EXPEDIENTES.length + 15}`,
        producto: form.get("producto"),
        tipoMaterial: form.get("producto"),
        subtipo: "Especificación formal según pliego",
        unidades: form.get("unidades"),
        cliente: "Infraestructuras del Norte, S.A.",
        destinatarioFinal: form.get("destino"),
        proveedor: "Pendiente de adjudicación (Fase 1/2)",
        presupuestoTotal: "En cotización",
        faseActual: 0,
        plazoPactado: "A determinar",
        plazoRealEstimado: "A determinar",
        desviacionDias: "0 días",
        estado: "review",
        incidencias: [],
        deliverables: {
          0: [{ name: "Pliego y Memoria de Requisitos", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-Inicial.pdf", date: "Hoy" }],
          1: [{ name: "Comparativa Fase 1 de Proveedores", owner: "SOFEIN", state: "pending", format: "PDF", file: null, date: "En curso" }],
          2: [], 3: [], 4: [], 5: [], 6: []
        }
      };
      EXPEDIENTES.unshift(newExp);
      location.hash = `#cliente/expedientes/${newExp.id}`;
      showToast(`Expediente estanco ${newExp.id} creado con éxito`);
    });

    // Formulario de Notificación de Incidencia de Proveedor
    document.getElementById("notifyIncidentForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const exp = getActiveExpediente(form.get("expId"));
      const newInc = {
        id: `INC-014-${exp.incidencias.length + 1}`,
        fecha: "Hoy, ahora",
        origen: "Proveedor (IberRail Components)",
        tipo: form.get("tipo"),
        impacto: form.get("dias"),
        estado: "En mediación SOFEIN",
        propuestaMediacion: "SOFEIN está evaluando la reestructuración de la cadena de suministro para evitar paros en obra.",
        firmaCliente: false,
        firmaProveedor: true
      };
      exp.incidencias.unshift(newInc);
      location.hash = `#proveedor/mis_suministros/${exp.id}`;
      showToast("Incidencia registrada. SOFEIN ha abierto el expediente de mediación.");
    });

    // Modal de Nueva Incidencia (Admin)
    document.querySelectorAll("[data-open-incident-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.openIncidentModal;
        openIncidentModal(expId);
      });
    });

    // Toasts genéricos
    document.querySelectorAll("[data-toast]").forEach(el => {
      el.addEventListener("click", () => showToast(el.dataset.toast));
    });

    document.querySelectorAll("[data-download]").forEach(el => {
      el.addEventListener("click", () => showToast(`Descarga iniciada: ${el.dataset.download}`));
    });
  }

  function simulateFileUpload(expId, slotIdx) {
    const exp = getActiveExpediente(expId);
    showToast("Subiendo entregable a la ranura documental...");
    setTimeout(() => {
      if (exp.deliverables[activeDossierPhase] && exp.deliverables[activeDossierPhase][slotIdx]) {
        exp.deliverables[activeDossierPhase][slotIdx].file = `${exp.deliverables[activeDossierPhase][slotIdx].name.replace(/[^a-zA-Z0-9]/g, "-")}-subido.pdf`;
        exp.deliverables[activeDossierPhase][slotIdx].state = "review";
        exp.deliverables[activeDossierPhase][slotIdx].date = "Hoy, recién subido";
        showToast("✓ Archivo subido. Estado actualizado a: 'En revisión por SOFEIN'");
        renderApp();
      }
    }, 600);
  }

  function openIncidentModal(expId) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="incidentModalBackdrop">
        <div class="procurement-modal">
          <div class="procurement-modal-head">
            <h3>Registrar Incidencia / Variación de Suministro</h3>
            <button type="button" id="closeIncidentModalBtn">×</button>
          </div>
          <form id="modalIncidentForm">
            <div class="procurement-modal-body">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Tipo de Alteración
                <select name="tipo" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text)">
                  <option value="Demora de curado o producción">Demora de producción en fábrica (+ plazos)</option>
                  <option value="Cambio de especificación Adif">Modificación sobrevenida de especificación / plano</option>
                  <option value="Variación de volumen">Aumento / reducción de unidades solicitadas</option>
                  <option value="Retraso de transporte">Incidencia logística de transporte</option>
                </select>
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Impacto en Plazo o Coste
                <input name="impacto" placeholder="Ej: +8 días de plazo estimado" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text)" />
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Propuesta de Mediación de SOFEIN
                <textarea name="propuesta" rows="3" required style="padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit" placeholder="Propuesta de ajuste para someter a firma cruzada entre constructor y taller..."></textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">Publicar Mediación</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeIncidentModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelModalBtn")?.addEventListener("click", close);
    document.getElementById("modalIncidentForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const exp = getActiveExpediente(expId);
      exp.incidencias.unshift({
        id: `INC-014-${exp.incidencias.length + 1}`,
        fecha: "Hoy, ahora",
        origen: "SOFEIN Mediación",
        tipo: form.get("tipo"),
        impacto: form.get("impacto"),
        estado: "En mediación SOFEIN",
        propuestaMediacion: form.get("propuesta"),
        firmaCliente: false,
        firmaProveedor: true
      });
      close();
      showToast("✓ Incidencia registrada con propuesta de mediación activa");
      renderApp();
    });
  }

  // Navegación delegada por hash
  document.addEventListener("click", e => {
    const go = e.target.closest("[data-go]");
    if (go) {
      e.preventDefault();
      location.hash = go.dataset.go;
      document.getElementById("app")?.classList.remove("nav-open");
    }
  });

  window.addEventListener("hashchange", renderApp);

  // Inicializar al cargar
  if (!location.hash) {
    location.hash = "#admin/expedientes/RFQ-2026-014";
  }
  renderApp();
})();
