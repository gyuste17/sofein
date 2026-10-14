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
    award: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2 4.5 2-1-9"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>'
  };

  const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;

  /* ---------- Definición de Roles Oficiales (Apuntes 06 — Tabla 1) ---------- */
  const PLAYERS = {
    admin: {
      id: "admin",
      shortLabel: "Admin (SOFEIN)",
      label: "SOFEIN Admin",
      badge: "Administración Central",
      entity: "SOFEIN Digital HQ",
      avatar: "SF",
      defaultNav: "overview",
      nav: [
        { id: "overview", label: "Visión global", icon: "grid" },
        { id: "expedientes", label: "Expedientes", icon: "folder", count: 4 },
        { id: "inbox", label: "Inbox", icon: "inbox", count: 2 },
        { id: "directorio", label: "Clientes y Proveedores", icon: "users" },
        { id: "configuracion", label: "Configuración", icon: "cog" }
      ]
    },
    cliente: {
      id: "cliente",
      shortLabel: "Cliente (Constructor)",
      label: "Constructor (Cliente)",
      badge: "Constructor de Vía",
      entity: "Infraestructuras del Norte, S.A.",
      avatar: "IN",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Mis expedientes", icon: "folder", count: 3 },
        { id: "inbox", label: "Inbox", icon: "inbox", count: 1 },
        { id: "perfil", label: "Perfil", icon: "profile" }
      ]
    },
    proveedor: {
      id: "proveedor",
      shortLabel: "Proveedor Homologado",
      label: "Proveedor Homologado",
      badge: "Taller & Suministrador",
      entity: "IberRail Components, S.L.",
      avatar: "IR",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Mis expedientes", icon: "folder", count: 2 },
        { id: "cotizaciones", label: "Cotizaciones", icon: "file", count: 1 },
        { id: "inbox", label: "Inbox", icon: "inbox", count: 1 },
        { id: "perfil", label: "Perfil", icon: "profile" }
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

  /* ---------- Avisos Categorizados (Apuntes 06 — Inbox Central) ---------- */
  const NOTICES = [
    {
      id: "AV-01",
      expId: "RFQ-2026-014",
      categoria: "Incidencia / Mediación",
      tagClass: "warning",
      titulo: "Propuesta de mediación de plazo pendiente de firma",
      descripcion: "SOFEIN ha emitido la propuesta para desdoblar la entrega en dos sub-lotes tras la ola de calor. Requiere firma del constructor.",
      fecha: "Hoy, 10:35",
      roles: ["admin", "cliente"],
      accion: "Ver Mediación",
      enlace: "#cliente/expedientes/RFQ-2026-014"
    },
    {
      id: "AV-02",
      expId: "RFQ-2026-014",
      categoria: "Documentación",
      tagClass: "review",
      titulo: "Nuevo ensayo mecánico EN 13230 recibido",
      descripcion: "IberRail Components ha adjuntado los resultados de rotura dinámica en la ranura documental de Fase 4.",
      fecha: "Hoy, 09:15",
      roles: ["admin", "proveedor"],
      accion: "Validar Documento",
      enlace: "#admin/expedientes/RFQ-2026-014"
    },
    {
      id: "AV-03",
      expId: "RFQ-2026-011",
      categoria: "Cotización",
      tagClass: "complete",
      titulo: "Preselección de 3 laminadores completada",
      descripcion: "SOFEIN ha fijado los 3 proveedores de carril 54E1. El cliente debe seleccionar a quién solicitar oferta vinculante.",
      fecha: "Ayer, 16:40",
      roles: ["admin", "cliente"],
      accion: "Revisar Proveedores",
      enlace: "#admin/expedientes/RFQ-2026-011"
    },
    {
      id: "AV-04",
      expId: "RFQ-2026-009",
      categoria: "Logística / Plazo",
      tagClass: "info",
      titulo: "Albarán de salida y despacho confirmado",
      descripcion: "Salida de fábrica autorizada para 29.000 fijaciones SKL-14 con destino al tramo Terrassa-Sabadell (FGC).",
      fecha: "18 jun, 11:00",
      roles: ["admin", "cliente", "proveedor"],
      accion: "Consultar Albarán",
      enlace: "#admin/expedientes/RFQ-2026-009"
    }
  ];

  /* ---------- Directorio: Proveedores y Clientes (Apuntes 06) ---------- */
  const DIRECTORIO_PROVEEDORES = [
    {
      id: "PRV-01",
      nombre: "IberRail Components, S.L.",
      cif: "B-48192837",
      sede: "Amurrio (Álava) / Bilbao",
      materiales: "Traviesas de Hormigón Monobloque PR-22 · Sujeciones SKL-14",
      homologado: true,
      leadTimeMedio: "42 días",
      score: "98% Conforme",
      contacto: "carlos.m@iberrail.es"
    },
    {
      id: "PRV-02",
      nombre: "Norte Vía Industrial, S.A.",
      cif: "A-33291845",
      sede: "Gijón (Asturias)",
      materiales: "Carril Laminado 54E1 / 60E1 · Aparatos de Vía",
      homologado: true,
      leadTimeMedio: "58 días",
      score: "99% Conforme",
      contacto: "ventas@nortevia.es"
    },
    {
      id: "PRV-03",
      nombre: "Madera Vía Ibérica, S.A.",
      cif: "A-47102938",
      sede: "Valladolid",
      materiales: "Traviesas de Madera Tratada Creosotada (3 subtipos)",
      homologado: true,
      leadTimeMedio: "35 días",
      score: "94% Conforme",
      contacto: "pedidos@maderavia.es"
    }
  ];

  const DIRECTORIO_CLIENTES = [
    {
      id: "CLI-01",
      nombre: "Infraestructuras del Norte, S.A.",
      cif: "A-48092311",
      sede: "Madrid / Bilbao",
      expedientesActivos: 3,
      actividad: "Constructora Ferroviaria (Licitaciones Adif / Metro)",
      homologado: true,
      contacto: "proyectos@infraestructurasnorte.es"
    },
    {
      id: "CLI-02",
      nombre: "Ferrocarrils de la Generalitat de Catalunya",
      cif: "Q-0801108J",
      sede: "Barcelona",
      expedientesActivos: 1,
      actividad: "Operador y Gestor Ferroviario Autonómico",
      homologado: true,
      contacto: "infraestructures@fgc.cat"
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
  let activeSection = "overview";
  let activeParam = null;
  let activeDossierPhase = 3;
  let activeDossierTab = "deliverables"; // deliverables | incidents | passport

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    if (!raw) {
      activeRole = "admin";
      activeSection = "overview";
      activeParam = null;
      return;
    }
    const [role, section, param] = raw.split("/");
    if (PLAYERS[role]) {
      activeRole = role;
      activeSection = section || PLAYERS[role].defaultNav;
      activeParam = param || null;
    } else {
      activeRole = "admin";
      activeSection = "overview";
      activeParam = null;
    }
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
          <small>Procurement</small>
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

  /* ---------- Componente: Topbar Interna con Switcher Sutil ---------- */
  function renderTopbar() {
    const player = PLAYERS[activeRole];
    const sectionName = (player.nav.find(n => n.id === activeSection) || {}).label || activeSection;
    const currentTheme = document.documentElement.dataset.theme || "dark";

    return `
      <header class="admin-topbar">
        <button class="admin-menu" id="menuToggleBtn" type="button" aria-label="Abrir menú">${icon("menu", 20)}</button>
        <div class="admin-crumbs">
          <span>${player.label}</span>
          <i>/</i>
          <b>${sectionName}</b>
          ${activeParam ? `<i>/</i><b style="color:var(--entity-accent)">${activeParam}</b>` : ""}
        </div>

        <div class="admin-topbar-actions">
          <!-- Switcher Sutil de Rol (Discreto) -->
          <div class="role-switcher-wrap" id="roleSwitcherWrap">
            <button class="role-switcher-btn" id="roleDropdownBtn" type="button" aria-expanded="false" title="Cambiar actor de la plataforma">
              <span class="role-dot ${activeRole}"></span>
              <span class="role-trigger-label">${player.shortLabel}</span>
              ${icon("chevronDown", 13)}
            </button>
            <div class="role-switcher-popover" id="roleDropdownMenu" hidden>
              <div class="role-popover-title">CAMBIAR ACTOR B2B</div>
              <button class="role-popover-item ${activeRole === "admin" ? "is-active" : ""}" type="button" data-switch-role="admin">
                <span class="role-badge-dot admin"></span>
                <div>
                  <strong>SOFEIN Admin</strong>
                  <small>Administración central y mediación</small>
                </div>
                ${activeRole === "admin" ? icon("check", 14) : ""}
              </button>
              <button class="role-popover-item ${activeRole === "cliente" ? "is-active" : ""}" type="button" data-switch-role="cliente">
                <span class="role-badge-dot cliente"></span>
                <div>
                  <strong>Constructor (Cliente)</strong>
                  <small>Infraestructuras del Norte</small>
                </div>
                ${activeRole === "cliente" ? icon("check", 14) : ""}
              </button>
              <button class="role-popover-item ${activeRole === "proveedor" ? "is-active" : ""}" type="button" data-switch-role="proveedor">
                <span class="role-badge-dot proveedor"></span>
                <div>
                  <strong>Proveedor Homologado</strong>
                  <small>IberRail Components</small>
                </div>
                ${activeRole === "proveedor" ? icon("check", 14) : ""}
              </button>
            </div>
          </div>

          <!-- Selector de Modo Claro / Oscuro -->
          <button class="topbar-icon-btn" id="themeToggleBtn" type="button" aria-label="Cambiar tema" title="${currentTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}">
            ${icon(currentTheme === "dark" ? "sun" : "moon", 16)}
          </button>

          <!-- Notificaciones Bell -->
          <button class="topbar-icon-btn" type="button" data-toast="Tienes 1 notificación de actualización en RFQ-2026-014" aria-label="Notificaciones" title="Notificaciones de inbox">
            ${icon("bell", 16)}<i class="bell-unread-dot"></i>
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
    if (section === "overview") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Visión global</h1>
            <p>Control centralizado de expedientes de suministro ferroviario, documentación e incidencias activas.</p>
          </div>
          <button class="admin-primary-button" type="button" data-go="#admin/expedientes">
            Ver expedientes ${icon("arrow", 14)}
          </button>
        </div>

        <section class="admin-top-insight">
          <div class="admin-metrics">
            <div class="admin-metric">
              <span>Expedientes en curso</span>
              <strong>4</strong>
            </div>
            <div class="admin-metric warning">
              <span>Incidencias en mediación</span>
              <strong>1</strong>
            </div>
            <div class="admin-metric">
              <span>Entregables validados</span>
              <strong>18</strong>
            </div>
            <div class="admin-metric">
              <span>Proveedores homologados</span>
              <strong>6</strong>
            </div>
          </div>
          <div class="admin-histogram">
            <div class="admin-histogram-head">
              <h2>Estado de ranuras documentales</h2>
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

        <section class="admin-alerts">
          <div class="admin-section-head">
            <div>
              <h2>Alertas operativas prioritarias</h2>
              <p>Requerimientos y firmas pendientes ordenados por urgencia de obra.</p>
            </div>
            <span>3 activas</span>
          </div>
          <div class="admin-alert-list">
            <div class="admin-alert-row is-critical">
              <span class="admin-deadline">Urgente</span>
              <strong>Propuesta de mediación (curado Lote B)</strong>
              <span>RFQ-2026-014</span>
              <span>Pendiente firma constructor</span>
              <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/RFQ-2026-014">Revisar</button>
            </div>
            <div class="admin-alert-row is-urgent">
              <span class="admin-deadline">En revisión</span>
              <strong>Certificado de ensayos EN 13230</strong>
              <span>RFQ-2026-014</span>
              <span>IberRail Components</span>
              <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/RFQ-2026-014">Validar</button>
            </div>
            <div class="admin-alert-row">
              <span class="admin-deadline" style="color:var(--entity-accent)">En plazo</span>
              <strong>Preselección de 3 laminadores</strong>
              <span>RFQ-2026-011</span>
              <span>Metro Bilbao</span>
              <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/RFQ-2026-011">Ver ofertas</button>
            </div>
          </div>
        </section>
      `;
    }

    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);
      const cards = EXPEDIENTES.map(exp => `
        <article class="admin-exp-card" data-go="#admin/expedientes/${exp.id}" style="cursor:pointer">
          <div class="admin-exp-card-top">
            <span class="admin-exp-id">${exp.id}</span>
            <span class="admin-phase-mini">${icon("folder", 12)} Fase ${exp.faseActual + 1}: ${PHASES[exp.faseActual].name}</span>
          </div>
          <h3>${exp.producto}</h3>
          <p>${exp.unidades} · Destino: <b>${exp.destinatarioFinal}</b></p>
          <div class="admin-exp-card-meta">
            <div>
              <span>Constructor</span>
              <strong>${exp.cliente}</strong>
            </div>
            <div>
              <span>Proveedor</span>
              <strong>${exp.proveedor}</strong>
            </div>
          </div>
          <div class="admin-exp-actions" style="margin-top:14px;display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.72rem;color:${exp.desviacionDias.includes("+") ? "var(--entity-warning)" : "var(--entity-muted)"}">${exp.plazoRealEstimado} (${exp.desviacionDias})</span>
            <button class="admin-quiet-button" type="button">Abrir expediente ${icon("arrow", 14)}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Expedientes</h1>
            <p>Bandeja operativa central. Supervisa el avance por fases, aprueba entregables técnicos y gestiona el suministro.</p>
          </div>
          <button class="admin-primary-button" type="button" data-open-new-exp-modal>
            ${icon("plus", 16)} Crear expediente estanco
          </button>
        </div>
        <div class="admin-exp-list">
          ${cards}
        </div>
      `;
    }

    if (section === "inbox") {
      const noticeRows = NOTICES.map(n => `
        <article class="admin-doc-row" style="grid-template-columns:36px minmax(180px,1.4fr) 140px 110px auto;gap:16px">
          <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:var(--entity-panel-2)">
            ${icon(n.tagClass === "warning" ? "alert" : n.tagClass === "review" ? "file" : "check", 16)}
          </span>
          <div>
            <strong>${n.titulo}</strong>
            <small style="color:var(--entity-muted)">${n.descripcion}</small>
          </div>
          <div>
            <span class="dossier-chip">${n.expId}</span>
          </div>
          <div>
            <span class="dossier-chip" style="font-size:0.68rem">${n.categoria}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <time style="font-size:0.72rem;color:var(--entity-faint)">${n.fecha}</time>
            <button class="admin-quiet-button" type="button" data-go="${n.enlace}">${n.accion}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Inbox central</h1>
            <p>Registro unificado de avisos, requerimientos de documentación e incidencias de todos los expedientes.</p>
          </div>
        </div>
        <section class="admin-document-list">
          <div class="admin-doc-table-head" style="grid-template-columns:36px minmax(180px,1.4fr) 140px 110px auto;gap:16px">
            <span>Aviso / Actividad</span>
            <span>Expediente</span>
            <span>Categoría</span>
            <span style="text-align:right">Fecha & Acción</span>
          </div>
          ${noticeRows}
        </section>
      `;
    }

    if (section === "directorio") {
      const prvCards = DIRECTORIO_PROVEEDORES.map(p => `
        <article class="admin-client-card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="admin-client-initials">${p.nombre.slice(0, 2).toUpperCase()}</span>
            <span class="admin-verified">${icon("shield", 14)} Homologado</span>
          </div>
          <h2 style="margin:16px 0 4px">${p.nombre}</h2>
          <p style="margin:0 0 14px;color:var(--entity-muted);font-size:0.75rem">${p.sede} · CIF: ${p.cif}</p>
          <dl>
            <div>
              <dt>Suministros</dt>
              <dd style="font-size:0.72rem;text-align:right;max-width:140px;color:var(--entity-muted)">${p.materiales}</dd>
            </div>
            <div>
              <dt>Lead Time medio</dt>
              <dd>${p.leadTimeMedio}</dd>
            </div>
            <div>
              <dt>Fiabilidad</dt>
              <dd style="color:var(--entity-accent)">${p.score}</dd>
            </div>
          </dl>
          <footer>
            <small>${p.contacto}</small>
          </footer>
        </article>
      `).join("");

      const cliCards = DIRECTORIO_CLIENTES.map(c => `
        <article class="admin-client-card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="admin-client-initials" style="background:#1d426b">${c.nombre.slice(0, 2).toUpperCase()}</span>
            <span class="admin-verified" style="color:#60a5fa">${icon("shield", 14)} Contratista Activo</span>
          </div>
          <h2 style="margin:16px 0 4px">${c.nombre}</h2>
          <p style="margin:0 0 14px;color:var(--entity-muted);font-size:0.75rem">${c.sede} · CIF: ${c.cif}</p>
          <dl>
            <div>
              <dt>Actividad</dt>
              <dd style="font-size:0.72rem;text-align:right;max-width:140px;color:var(--entity-muted)">${c.actividad}</dd>
            </div>
            <div>
              <dt>Expedientes en curso</dt>
              <dd>${c.expedientesActivos} activos</dd>
            </div>
          </dl>
          <footer>
            <small>${c.contacto}</small>
          </footer>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Clientes y proveedores</h1>
            <p>Directorio homologado de contratistas de vía y talleres industriales con trazabilidad acreditada.</p>
          </div>
        </div>

        <div style="margin-bottom:28px">
          <h3 style="margin:0 0 14px;font-size:0.95rem;color:var(--entity-text)">Proveedores homologados</h3>
          <div class="admin-client-grid">${prvCards}</div>
        </div>

        <div>
          <h3 style="margin:0 0 14px;font-size:0.95rem;color:var(--entity-text)">Clientes (Constructores de vía)</h3>
          <div class="admin-client-grid" style="grid-template-columns:repeat(2,1fr)">${cliCards}</div>
        </div>
      `;
    }

    if (section === "configuracion") {
      const currentTheme = document.documentElement.dataset.theme || "dark";
      return `
        <div class="admin-view-head">
          <div>
            <h1>Configuración</h1>
            <p>Parámetros operativos de SOFEIN Procurement y personalización del entorno de trabajo.</p>
          </div>
        </div>

        <div class="admin-config-panel">
          <div>
            <h2>Apariencia visual</h2>
            <p>Selecciona el tema de contraste que prefieras. Optimizado para entornos de oficina técnica y obra.</p>
          </div>
          <div style="display:flex;gap:10px">
            <button class="admin-quiet-button ${currentTheme === 'dark' ? 'admin-primary-button' : ''}" type="button" data-set-theme="dark">
              ${icon("moon", 14)} Modo oscuro (Attio)
            </button>
            <button class="admin-quiet-button ${currentTheme === 'light' ? 'admin-primary-button' : ''}" type="button" data-set-theme="light">
              ${icon("sun", 14)} Modo claro
            </button>
          </div>
        </div>

        <div class="admin-config-panel">
          <div>
            <h2>Reglas de mediación y plazos tácitos</h2>
            <p>Configuración de plazos de aprobación automática en silencio administrativo para adendas de mediación (Apuntes 06).</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="dossier-chip">Plazo límite: <b>5 días hábiles</b></span>
            <button class="admin-quiet-button" type="button" data-toast="Parámetro guardado en configuración">Editar regla</button>
          </div>
        </div>

        <div class="admin-config-panel">
          <div>
            <h2>Concurrencia mínima de proveedores</h2>
            <p>Mínimo de 3 proveedores a preseleccionar en Fase 1 conforme a normativa y pliegos públicos.</p>
          </div>
          <div>
            <span class="dossier-chip">Mínimo: <b>3 proveedores concurrentes</b></span>
          </div>
        </div>
      `;
    }

    // Default
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
          <div class="admin-exp-card-top">
            <span class="admin-exp-id">${exp.id}</span>
            <span class="admin-phase-mini">${icon("folder", 12)} Fase ${exp.faseActual + 1}: ${PHASES[exp.faseActual].name}</span>
          </div>
          <h3>${exp.producto}</h3>
          <p>${exp.unidades} · Tramo: <b>${exp.destinatarioFinal}</b></p>
          <div class="admin-exp-card-meta">
            <div>
              <span>Taller adjudicado</span>
              <strong>${exp.proveedor}</strong>
            </div>
            <div>
              <span>Plazo estimado</span>
              <strong class="${exp.desviacionDias.includes("+") ? "admin-due" : ""}">${exp.plazoRealEstimado}</strong>
            </div>
          </div>
          <div class="admin-exp-actions" style="margin-top:14px;display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.72rem;color:var(--entity-muted)">${exp.presupuestoTotal}</span>
            <button class="admin-quiet-button" type="button">Abrir expediente ${icon("arrow", 14)}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Mis expedientes</h1>
            <p>Supervisa el ciclo de vida de los materiales pedidos para tus obras ferroviarias, sube requisitos y valida el cierre.</p>
          </div>
          <button class="admin-primary-button" type="button" data-go="#cliente/nuevo">
            ${icon("plus", 16)} Nuevo expediente
          </button>
        </div>

        <!-- Visión Global Integrada en Cabecera (Apuntes 06 - Tabla 1) -->
        <div class="entity-scope-strip">
          <div class="entity-scope-pill">
            <span class="scope-dot active"></span>
            <span><b>3</b> Expedientes activos</span>
          </div>
          <div class="entity-scope-pill">
            <span class="scope-dot warning"></span>
            <span><b>1</b> Mediación pendiente de firma digital</span>
          </div>
          <div class="entity-scope-pill">
            <span class="scope-dot info"></span>
            <span><b>1</b> Suministro en transporte a pie de vía</span>
          </div>
        </div>

        <div class="admin-exp-list">
          ${cards}
        </div>
      `;
    }

    if (section === "nuevo") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Configurar nuevo expediente</h1>
            <p>Indica los suministros ferroviarios que necesitas, dónde van a instalarse y las especificaciones técnicas.</p>
          </div>
        </div>
        <section class="admin-drawer" style="position:static;width:100%;max-width:760px;margin:0 auto;box-shadow:none;border:1px solid var(--entity-line);border-radius:12px;padding:32px">
          <form id="newExpedienteForm">
            <label>Tipo de Producto de Vía (Catálogo MVP)
              <select name="producto" required>
                <option value="Traviesas de hormigón monobloque">Traviesas de Hormigón Monobloque PR-22 (Superestructura)</option>
                <option value="Traviesas de madera tratada">Traviesas de Madera Tratada Creosotada (3 subtipos)</option>
                <option value="Carril laminado 54E1 / 60E1">Carril Laminado 54E1 / 60E1 Grado R260</option>
                <option value="Sujeciones y clips elásticos">Clips y Fijaciones Elásticas (SKL-14 / Pandrol)</option>
                <option value="Placas de asiento">Placas de Asiento Metálicas / Elastómero</option>
                <option value="Balasto silíceo">Balasto Silíceo Certificado Tipo 1</option>
                <option value="Especial a medida">Otros / Elementos a Medida (Siemens, Renfe)</option>
              </select>
            </label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <label>Volumen / Cantidad Requerida
                <input name="unidades" placeholder="Ej: 14.500 traviesas o 1.200 t" required />
              </label>
              <label>Fecha Objetivo de Llegada a Obra
                <input type="date" name="fechaObjetivo" required />
              </label>
            </div>
            <label>Destino de la Vía / Tramo de Instalación
              <input name="destino" placeholder="Ej: Tramo Medina del Campo o Variante Este" required />
            </label>
            <label>Pliego o Planos de Replanteo (.pdf, .dwg)
              <input type="file" name="archivo" />
            </label>
            <div style="margin-top:16px;display:flex;gap:12px">
              <button class="admin-primary-button" type="submit">Crear Expediente y Enviar a Validación SOFEIN</button>
              <button class="admin-quiet-button" type="button" data-go="#cliente/expedientes">Cancelar</button>
            </div>
          </form>
        </section>
      `;
    }

    if (section === "inbox") {
      const clientNotices = NOTICES.filter(n => n.roles.includes("cliente"));
      const noticeRows = clientNotices.map(n => `
        <article class="admin-doc-row" style="grid-template-columns:36px minmax(180px,1.4fr) 140px 110px auto;gap:16px">
          <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:var(--entity-panel-2)">
            ${icon(n.tagClass === "warning" ? "alert" : n.tagClass === "review" ? "file" : "check", 16)}
          </span>
          <div>
            <strong>${n.titulo}</strong>
            <small style="color:var(--entity-muted)">${n.descripcion}</small>
          </div>
          <div>
            <span class="dossier-chip">${n.expId}</span>
          </div>
          <div>
            <span class="dossier-chip" style="font-size:0.68rem">${n.categoria}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <time style="font-size:0.72rem;color:var(--entity-faint)">${n.fecha}</time>
            <button class="admin-quiet-button" type="button" data-go="${n.enlace}">${n.accion}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Inbox</h1>
            <p>Avisos, requerimientos de documentación y acuerdos de mediación para tus obras.</p>
          </div>
        </div>
        <section class="admin-document-list">
          <div class="admin-doc-table-head" style="grid-template-columns:36px minmax(180px,1.4fr) 140px 110px auto;gap:16px">
            <span>Aviso</span>
            <span>Expediente</span>
            <span>Categoría</span>
            <span style="text-align:right">Fecha & Acción</span>
          </div>
          ${noticeRows}
        </section>
      `;
    }

    if (section === "perfil") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Perfil de constructor</h1>
            <p>Información corporativa y certificaciones registradas en la plataforma SOFEIN.</p>
          </div>
        </div>

        <section class="admin-client-card" style="padding:28px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
            <span class="admin-client-initials" style="width:52px;height:52px;font-size:1.2rem">IN</span>
            <div>
              <h2 style="margin:0;font-size:1.3rem">Infraestructuras del Norte, S.A.</h2>
              <span style="color:var(--entity-accent);font-size:0.75rem">${icon("shield", 14)} Entidad verificada y homologada</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:20px 0;border-top:1px solid var(--entity-line);border-bottom:1px solid var(--entity-line)">
            <div>
              <span style="font-size:0.7rem;color:var(--entity-faint);text-transform:uppercase">CIF</span>
              <strong style="display:block;margin-top:4px">A-48092311</strong>
            </div>
            <div>
              <span style="font-size:0.7rem;color:var(--entity-faint);text-transform:uppercase">Representante Legal</span>
              <strong style="display:block;margin-top:4px">María González López</strong>
            </div>
            <div>
              <span style="font-size:0.7rem;color:var(--entity-faint);text-transform:uppercase">Contacto Técnico</span>
              <strong style="display:block;margin-top:4px">proyectos@infraestructurasnorte.es</strong>
            </div>
          </div>

          <div style="margin-top:20px;display:flex;gap:12px">
            <span class="dossier-chip">${icon("shield", 14)} ISO 9001 Registrada</span>
            <span class="dossier-chip">${icon("shield", 14)} ISO 14001 Registrada</span>
            <span class="dossier-chip">${icon("check", 14)} Acuerdo Marco SOFEIN Firmado</span>
          </div>
        </section>
      `;
    }

    // Default
    return renderDossierBuilder("RFQ-2026-014");
  }

  /* ============================================================
     VISTAS: PROVEEDOR HOMOLOGADO
     ============================================================ */
  function renderProveedorView(section, param) {
    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);
      return `
        <div class="admin-view-head">
          <div>
            <h1>Mis expedientes</h1>
            <p>Accede a tus lotes en curso, sube fichas técnicas y certificados con drag & drop, y reporta avances.</p>
          </div>
        </div>

        <!-- Visión Global Integrada en Cabecera (Apuntes 06 - Tabla 1) -->
        <div class="entity-scope-strip">
          <div class="entity-scope-pill">
            <span class="scope-dot active"></span>
            <span><b>2</b> Suministros adjudicados</span>
          </div>
          <div class="entity-scope-pill">
            <span class="scope-dot warning"></span>
            <span><b>1</b> Solicitud de cotización (RFQ)</span>
          </div>
          <div class="entity-scope-pill">
            <span class="scope-dot info"></span>
            <span><b>1</b> Certificado de ensayo pendiente de carga</span>
          </div>
        </div>

        <div class="admin-exp-list">
          ${EXPEDIENTES.filter(e => e.proveedor.includes("IberRail")).map(exp => `
            <article class="admin-exp-card" data-go="#proveedor/expedientes/${exp.id}" style="cursor:pointer">
              <div class="admin-exp-card-top">
                <span class="admin-exp-id">${exp.id}</span>
                <span class="admin-phase-mini">${icon("folder", 12)} Fase ${exp.faseActual + 1}: ${PHASES[exp.faseActual].name}</span>
              </div>
              <h3>${exp.producto}</h3>
              <p>Cliente: <b>${exp.cliente}</b> · ${exp.unidades}</p>
              <div class="admin-exp-card-meta">
                <div>
                  <span>Plazo acordado</span>
                  <strong>${exp.plazoPactado}</strong>
                </div>
                <div>
                  <span>Entrega estimada</span>
                  <strong class="${exp.desviacionDias.includes("+") ? "admin-due" : ""}">${exp.plazoRealEstimado}</strong>
                </div>
              </div>
              <div class="admin-exp-actions" style="margin-top:14px;display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:0.72rem;color:var(--entity-muted)">${exp.presupuestoTotal}</span>
                <button class="admin-quiet-button" type="button">Abrir y subir entregables ${icon("arrow", 14)}</button>
              </div>
            </article>
          `).join("")}
        </div>
      `;
    }

    if (section === "cotizaciones") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Cotizaciones (RFQs)</h1>
            <p>Oportunidades de suministro remitidas por SOFEIN conforme a tus productos homologados.</p>
          </div>
        </div>
        <article class="deliverable-slot" style="padding:24px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
            <div>
              <span class="dossier-chip" style="margin-bottom:8px">Fase 2: Cotización Vinculante</span>
              <h3 style="margin:4px 0;font-size:1.15rem;color:var(--entity-text)">Carril laminado 54E1 Grado R260 · RFQ-2026-011</h3>
              <p style="margin:0;color:var(--entity-muted);font-size:0.8rem">Volumen solicitado: 1.200 toneladas · Plazo objetivo cliente: 60 días</p>
            </div>
            <div style="display:flex;gap:10px">
              <button class="admin-primary-button" type="button" data-toast="Oferta económica confirmada y trasladada a SOFEIN">
                ${icon("check", 14)} Enviar oferta vinculante
              </button>
            </div>
          </div>
        </article>
      `;
    }

    if (section === "inbox") {
      const prvNotices = NOTICES.filter(n => n.roles.includes("proveedor"));
      const noticeRows = prvNotices.map(n => `
        <article class="admin-doc-row" style="grid-template-columns:36px minmax(180px,1.4fr) 140px 110px auto;gap:16px">
          <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:var(--entity-panel-2)">
            ${icon(n.tagClass === "warning" ? "alert" : n.tagClass === "review" ? "file" : "check", 16)}
          </span>
          <div>
            <strong>${n.titulo}</strong>
            <small style="color:var(--entity-muted)">${n.descripcion}</small>
          </div>
          <div>
            <span class="dossier-chip">${n.expId}</span>
          </div>
          <div>
            <span class="dossier-chip" style="font-size:0.68rem">${n.categoria}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <time style="font-size:0.72rem;color:var(--entity-faint)">${n.fecha}</time>
            <button class="admin-quiet-button" type="button" data-go="${n.enlace}">${n.accion}</button>
          </div>
        </article>
      `).join("");

      return `
        <div class="admin-view-head">
          <div>
            <h1>Inbox</h1>
            <p>Requerimientos documentales, avisos de adjudicación y solicitudes de cotización.</p>
          </div>
        </div>
        <section class="admin-document-list">
          <div class="admin-doc-table-head" style="grid-template-columns:36px minmax(180px,1.4fr) 140px 110px auto;gap:16px">
            <span>Aviso</span>
            <span>Expediente</span>
            <span>Categoría</span>
            <span style="text-align:right">Fecha & Acción</span>
          </div>
          ${noticeRows}
        </section>
      `;
    }

    if (section === "perfil") {
      return `
        <div class="admin-view-head">
          <div>
            <h1>Perfil de proveedor</h1>
            <p>Capacidad industrial, homologaciones vigentes y acreditaciones de laboratorio.</p>
          </div>
        </div>
        <section class="admin-client-card" style="padding:28px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
            <span class="admin-client-initials" style="width:52px;height:52px;font-size:1.2rem;background:#523d1d">IR</span>
            <div>
              <h2 style="margin:0;font-size:1.3rem">IberRail Components, S.L.</h2>
              <span style="color:var(--entity-accent);font-size:0.75rem">${icon("shield", 14)} Proveedor Homologado por SOFEIN</span>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:20px 0;border-top:1px solid var(--entity-line);border-bottom:1px solid var(--entity-line)">
            <div>
              <span style="font-size:0.7rem;color:var(--entity-faint);text-transform:uppercase">CIF</span>
              <strong style="display:block;margin-top:4px">B-48192837</strong>
            </div>
            <div>
              <span style="font-size:0.7rem;color:var(--entity-faint);text-transform:uppercase">Planta Principal</span>
              <strong style="display:block;margin-top:4px">Amurrio (Álava)</strong>
            </div>
            <div>
              <span style="font-size:0.7rem;color:var(--entity-faint);text-transform:uppercase">Contacto Comercial</span>
              <strong style="display:block;margin-top:4px">carlos.m@iberrail.es</strong>
            </div>
          </div>
          <div style="margin-top:20px;display:flex;gap:12px">
            <span class="dossier-chip">${icon("shield", 14)} Homologación Adif NAV Vigente</span>
            <span class="dossier-chip">${icon("shield", 14)} Laboratorio Acreditado ENAC</span>
            <span class="dossier-chip">${icon("check", 14)} AENOR EN 13230</span>
          </div>
        </section>
      `;
    }

    // Default
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
    // Popover del Selector de Rol Sutil
    const roleBtn = document.getElementById("roleDropdownBtn");
    const roleMenu = document.getElementById("roleDropdownMenu");
    roleBtn?.addEventListener("click", e => {
      e.stopPropagation();
      const isHidden = roleMenu.hasAttribute("hidden");
      if (isHidden) {
        roleMenu.removeAttribute("hidden");
        roleBtn.setAttribute("aria-expanded", "true");
      } else {
        roleMenu.setAttribute("hidden", "");
        roleBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", e => {
      if (!e.target.closest("#roleSwitcherWrap")) {
        document.getElementById("roleDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("roleDropdownBtn")?.setAttribute("aria-expanded", "false");
      }
    });

    // Cambio de Player / Rol
    document.querySelectorAll("[data-switch-role]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetRole = btn.dataset.switchRole;
        document.getElementById("roleDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("roleDropdownBtn")?.setAttribute("aria-expanded", "false");
        location.hash = `#${targetRole}`;
      });
    });

    // Cambio de tema desde la configuración
    document.querySelectorAll("[data-set-theme]").forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.setTheme;
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("sofein-theme", theme);
        renderApp();
        showToast(`Modo ${theme === "dark" ? "oscuro (Attio)" : "claro"} activado`);
      });
    });

    // Toggle de Tema (Claro / Oscuro) en Topbar
    document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("sofein-theme", nextTheme);
      renderApp();
      showToast(`Modo ${nextTheme === "dark" ? "oscuro (Attio)" : "claro"} activado`);
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
    location.hash = "#admin/overview";
  }
  renderApp();
})();
