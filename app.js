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
    eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    award: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2 4.5 2-1-9"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    table: '<path d="M12 3v18M3 9h18M3 15h18M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
    archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
    refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    arrowDown: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    arrowsSort: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>'
  };

  const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;

  /* ---------- Definición de Roles Oficiales (Apuntes 06 — Tabla 1) ---------- */
  const PLAYERS = {
    admin: {
      id: "admin",
      shortLabel: "SOFEIN (Admin)",
      label: "SOFEIN Admin",
      badge: "Administración Central",
      entity: "SOFEIN Digital HQ",
      avatar: "SF",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Expedientes", icon: "folder", count: 5 },
        { id: "suministros", label: "Suministros", icon: "box", count: 8 },
        { id: "directorio", label: "Clientes y Proveedores", icon: "users" },
        { id: "productos", label: "Productos", icon: "box" },
        { id: "conformidades", label: "Conformidades", icon: "shield" },
        { id: "avisos", label: "Avisos", icon: "inbox", count: 2 }
      ]
    },
    cliente: {
      id: "cliente",
      shortLabel: "Cliente",
      label: "Cliente",
      badge: "Constructor de Vía",
      entity: "Infraestructuras del Norte, S.A.",
      avatar: "IN",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Mis expedientes", icon: "folder", count: 3 },
        { id: "suministros", label: "Suministros", icon: "box", count: 3 },
        { id: "avisos", label: "Avisos", icon: "inbox", count: 1 }
      ]
    },
    proveedor: {
      id: "proveedor",
      shortLabel: "Proveedor",
      label: "Proveedor",
      badge: "Taller & Suministrador",
      entity: "IberRail Components, S.L.",
      avatar: "IR",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Mis expedientes", icon: "folder", count: 2 },
        { id: "suministros", label: "Suministros", icon: "box", count: 3 },
        { id: "cotizaciones", label: "Cotizaciones", icon: "file", count: 1 },
        { id: "avisos", label: "Avisos", icon: "inbox", count: 1 }
      ]
    },
    destinatario: {
      id: "destinatario",
      shortLabel: "Destinatario Final",
      label: "Destinatario Final (Auditor)",
      badge: "Gestor de Infraestructura",
      entity: "Volkswagen Navarra / ADIF",
      avatar: "DF",
      defaultNav: "pasaporte",
      nav: [
        { id: "pasaporte", label: "Pasaporte de Vía", icon: "award" }
      ]
    }
  };

  /* ---------- Fases Estándar del Constructor de Expedientes (4 Fases) ---------- */
  const PHASES = [
    { num: 1, id: "alcance", name: "Alcance", icon: "file", desc: "Planos de vía, memorias técnicas y condicionantes de suministro." },
    { num: 2, id: "proveedores", name: "Proveedores", icon: "users", desc: "Preselección de homologados, cotizaciones vinculantes y elección." },
    { num: 3, id: "pedido", name: "Gestión del pedido", icon: "truck", desc: "Formalización de pedido, fabricación, calidad y logística." },
    { num: 4, id: "cierre", name: "Cierre", icon: "award", desc: "Recepción en destino, liquidación y Pasaporte Digital SOFEIN." }
  ];

  // Generador de identificadores oficiales de expediente (Formato: SFN-YYYY-XXXX alfanumérico)
  function generateExpedienteId(year = 2026) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `SFN-${year}-${code}`;
  }

  /* ---------- Datos Maestros de Expedientes Estancos ---------- */
  const EXPEDIENTES = [
    {
      id: "SFN-2026-H6T4",
      tituloGenerico: "Superestructura y armamento de vía — Ramal Factoría VW",
      producto: "Superestructura y armamento de vía — Ramal Factoría VW",
      tipoMaterial: "Traviesas — Superestructura",
      subtipo: "3 suministros coordinados (Traviesas PR-22, Sujeciones y Balasto)",
      unidades: "14.500 traviesas + 29.000 cjtos sujeción + 8.500 t balasto",
      cliente: "Infraestructuras del Norte, S.A.",
      destinatarioFinal: "Línea de Acceso y Vías Factoría Volkswagen (Conexión Red Adif)",
      proveedor: "IberRail Components, S.L.",
      presupuestoTotal: "482.000 €",
      faseActual: 2, // 3. Gestión del pedido
      plazoPactado: "42 días",
      plazoRealEstimado: "48 días",
      desviacionDias: "+6 días (Demora por curado térmico)",
      estado: "review",
      incidencias: [
        {
          id: "REG-001",
          sumId: "SUM-01",
          titulo: "Demora de curado por ola de calor en factoría",
          descripcion: "Se ha detectado una desaceleración crítica en el proceso de fraguado y curado térmico de las 14.500 traviesas monobloque PR-22 en la factoría de Vitoria debido a temperaturas extremas sostenidas (+39ºC). Desmoldar prematuramente comprometería la resistencia característica a compresión y flexión exigida por la norma EN 13230-2.",
          solucion: "SOFEIN propone articular un suministro fraccionado en dos entregas: Sub-lote A (7.000 unidades) en la fecha original pactada y Sub-lote B (7.500 unidades) 6 días después. Con ello, el constructor mantiene el ritmo de acopio sin paralizar el montaje de vía en la Factoría Volkswagen.",
          fechaRegistro: "16 jun 2026",
          previo: { fechaEntrega: "14 oct 2026", fechaEntregaIso: "2026-10-14", unidades: "14.500", presupuesto: "280.000 €" },
          nuevaFechaEntregaIso: "2026-10-20",
          nuevasUnidades: null,
          nuevoPresupuesto: null,
          adjuntos: [
            { name: "Informe de laboratorio de curado", file: "Informe-Laboratorio-Curado-IberRail.pdf", visibleTo: ["admin", "cliente", "proveedor"] }
          ],
          firmaProveedor: true,
          firmaProveedorFecha: "16 jun 2026, 11:45",
          firmaProveedorUsuario: "Carlos Mendía (IberRail)",
          firmaCliente: false,
          firmaClienteFecha: null,
          firmaClienteUsuario: null,
          adendaId: null,
          adendaFecha: null,
          adendaHash: null
        },
        {
          id: "REG-002",
          sumId: "SUM-02",
          titulo: "Ampliación de placas de asiento para el ramal de acceso",
          descripcion: "El cliente comunica la ampliación del ramal de acceso a la factoría, que requiere 1.500 placas de asiento PR-22 adicionales sobre el pedido inicial.",
          solucion: "SOFEIN acuerda con el proveedor ampliar el pedido en 1.500 unidades al mismo precio unitario, manteniendo la fecha de entrega pactada.",
          fechaRegistro: "02 jun 2026",
          previo: { fechaEntrega: "18 oct 2026", fechaEntregaIso: "2026-10-18", unidades: "27.500", presupuesto: "116.000 €" },
          nuevaFechaEntregaIso: null,
          nuevasUnidades: "29.000",
          nuevoPresupuesto: "122.000 €",
          adjuntos: [],
          firmaProveedor: true,
          firmaProveedorFecha: "03 jun 2026, 09:10",
          firmaProveedorUsuario: "Carlos Mendía (IberRail)",
          firmaCliente: true,
          firmaClienteFecha: "03 jun 2026, 12:30",
          firmaClienteUsuario: "Luis M. Aranzadi (Infraestructuras del Norte)",
          adendaId: "ADENDA-2026-01",
          adendaFecha: "03 jun 2026, 12:30",
          adendaHash: "sha256-7c1e94a0b2f35d6e8a9c0b1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f"
        }
      ],
      deliverables: {
        0: [ // 1. Alcance
          { name: "Pliego de Prescripciones Técnicas Adif", reqDate: "10 jun 2026", owner: "Cliente", state: "complete", format: "PDF", file: "PPT-Adif-NAV-2026.pdf", date: "12 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Pliego base verificado sin reservas" },
          { name: "Plano de Replanteo de Vía (Factoría VW)", reqDate: "10 jun 2026", owner: "Cliente", state: "complete", format: "DWG / PDF", file: "Plano-Acceso-VW-rev03.pdf", date: "12 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Revisión 03 aprobada para ejecución" }
        ],
        1: [ // 2. Proveedores
          { name: "Comparativa de 3 Proveedores Homologados", reqDate: "13 jun 2026", owner: "SOFEIN", state: "complete", format: "PDF", file: "Comparativa-Fase1-Homologados.pdf", date: "14 jun 2026", visibleTo: ["admin", "cliente"], notes: "Preselección conforme a normativa" },
          { name: "Oferta Económica Vinculante IberRail", reqDate: "14 jun 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-IberRail-RevFinal.pdf", date: "16 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Adjudicada · Incluye transporte y grúa" },
          { name: "Conformidad y Elección de Proveedor", reqDate: "16 jun 2026", owner: "Cliente", state: "complete", format: "Digital", file: "Adjudicacion-Formal-Cliente.pdf", date: "17 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Ratificada por dirección de obra" }
        ],
        2: [ // 3. Gestión del pedido
          { name: "Hoja de Pedido Formalizada (Tripartita)", reqDate: "17 jun 2026", owner: "SOFEIN", state: "complete", format: "PDF", file: "Hoja-Pedido-SOF-2026-014.pdf", date: "18 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Firmas digitales completas" },
          { name: "Ficha Técnica de Lote y Análisis de Material", reqDate: "18 jun 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Ficha-Lote-IberRail-44.pdf", date: "19 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Hormigón HP-50 conforme" },
          { name: "Certificado de Ensayos Mecánicos EN 13230", reqDate: "19 jun 2026", owner: "Proveedor", state: "review", format: "PDF / Lab", file: "Ensayo-Fatiga-EN13230-Lote44.pdf", date: "Subido hace 2h", visibleTo: ["admin", "proveedor"], notes: "Pendiente validación SOFEIN" },
          { name: "Plan Logístico y Albaranes de Salida", reqDate: "22 jun 2026", owner: "Proveedor", state: "pending", format: "PDF", file: null, date: "Previsto 25 jun", visibleTo: ["admin", "cliente", "proveedor"], notes: "Requerido antes de expedición" }
        ],
        3: [ // 4. Cierre
          { name: "Acta de Recepción a Pie de Vía", reqDate: "28 jun 2026", owner: "Cliente", state: "pending", format: "PDF", file: null, date: "Al recibir lote", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Se habilita en descarga" },
          { name: "Pasaporte Digital SOFEIN", reqDate: "30 jun 2026", owner: "SOFEIN", state: "pending", format: "Certificado", file: null, date: "Al cierre", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Sello criptográfico final" }
        ]
      },
      matching: {
        faseSelector: "adjudicado",
        proveedoresRecomendados: ["PRV-01", "PRV-06", "PRV-07"],
        proveedoresPreseleccionadosPorAdmin: ["PRV-01", "PRV-06", "PRV-07"],
        proveedoresSeleccionadosPorCliente: ["PRV-01", "PRV-06"],
        cotizaciones: {
          "PRV-01": {
            proveedorId: "PRV-01",
            nombre: "IberRail Components, S.L.",
            cif: "B-48192837",
            sede: "Amurrio (Álava) / Bilbao",
            precioUnitario: "33,24 €/ud",
            precioTotal: "482.000 €",
            plazoSemanas: "6 semanas (42 días)",
            desviacionPlazoDias: 0,
            validezOferta: "60 días",
            condicionesPago: "60 días confirmada",
            garantia: "10 años anticorrosión",
            puntuacionTecnica: "98/100",
            requisitosConfirmados: [
              "Trazabilidad lote a lote con código QR",
              "Ensayos de rotura dinámica en laboratorio ENAC",
              "Transporte y descarga a pie de vía con grúa",
              "Garantía anticorrosión 10 años"
            ],
            archivoOferta: "Oferta-IberRail-RevFinal.pdf",
            estado: "adjudicada",
            fechaEnvio: "16 jun, 10:15"
          },
          "PRV-06": {
            proveedorId: "PRV-06",
            nombre: "Prefabricados Prefarail, S.A.",
            cif: "A-50129384",
            sede: "Zaragoza",
            precioUnitario: "34,50 €/ud",
            precioTotal: "500.250 €",
            plazoSemanas: "6,5 semanas (46 días)",
            desviacionPlazoDias: +4,
            validezOferta: "45 días",
            condicionesPago: "60 días fecha factura",
            garantia: "10 años",
            puntuacionTecnica: "96/100",
            requisitosConfirmados: [
              "Capacidad fabril de 800 traviesas/día",
              "Ensayos de carga estática y dinámica en planta",
              "Transporte especial en bateas homologadas"
            ],
            archivoOferta: "Oferta-Prefarail-PR22.pdf",
            estado: "recibida",
            fechaEnvio: "16 jun, 12:40"
          }
        },
        requisitosExigidosCliente: [
          "Trazabilidad lote a lote con código QR",
          "Ensayos de rotura dinámica en laboratorio ENAC",
          "Transporte y descarga a pie de vía con grúa"
        ],
        proveedorAdjudicado: "IberRail Components, S.L."
      }
    },
    {
      id: "SFN-2026-K9M2",
      tituloGenerico: "Renovación de carril y sujeción — Línea 4 Metro Bilbao",
      producto: "Renovación de carril y sujeción — Línea 4 Metro Bilbao",
      tipoMaterial: "Carril — Superestructura",
      subtipo: "2 suministros (Carril laminado 54E1 y Aparatos de dilatación)",
      unidades: "1.200 t carril 54E1 + 24 parejas aparatos",
      cliente: "Metro de Bilbao",
      destinatarioFinal: "Consorcio de Transportes de Bizkaia (Línea 4)",
      proveedor: "Norte Vía Industrial, S.A.",
      presupuestoTotal: "1.140.000 €",
      faseActual: 1, // 2. Proveedores
      plazoPactado: "60 días",
      plazoRealEstimado: "58 días",
      desviacionDias: "-2 días (Ritmo óptimo)",
      estado: "review",
      incidencias: [],
      deliverables: {
        0: [
          { name: "Especificación Técnica Barra Larga Soldada", reqDate: "09 jun 2026", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-54E1-MetroBilbao.pdf", date: "11 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Perfil 54E1 Grado R260" }
        ],
        1: [
          { name: "Comparativa de 3 Laminadores Homologados", reqDate: "12 jun 2026", owner: "SOFEIN", state: "complete", format: "PDF", file: "Comparativa-Carril-Fase1.pdf", date: "13 jun 2026", visibleTo: ["admin", "cliente"], notes: "3 talleres cumplen pliego" },
          { name: "Oferta Económica y Plazo Norte Vía", reqDate: "13 jun 2026", owner: "Proveedor", state: "review", format: "PDF", file: "Oferta-NorteVia-54E1.pdf", date: "Ayer", visibleTo: ["admin", "proveedor"], notes: "En revisión por SOFEIN antes de compartir" }
        ],
        2: [],
        3: []
      },
      matching: {
        faseSelector: "comparativa",
        proveedoresRecomendados: ["PRV-02", "PRV-04", "PRV-05"],
        proveedoresPreseleccionadosPorAdmin: ["PRV-02", "PRV-04", "PRV-05"],
        proveedoresSeleccionadosPorCliente: ["PRV-02", "PRV-04", "PRV-05"],
        cotizaciones: {
          "PRV-02": {
            proveedorId: "PRV-02",
            nombre: "Norte Vía Industrial, S.A.",
            cif: "A-33291845",
            sede: "Gijón (Asturias)",
            precioUnitario: "945 €/t",
            precioTotal: "1.134.000 €",
            plazoSemanas: "8 semanas (56 días)",
            desviacionPlazoDias: -4,
            validezOferta: "45 días",
            condicionesPago: "60 días fecha factura",
            garantia: "10 años trazabilidad total",
            puntuacionTecnica: "98/100",
            requisitosConfirmados: [
              "Barra larga soldada (tramos hasta 108 m)",
              "Ensayos no destructivos ultrasonidos al 100%",
              "Certificado de colada siderúrgica trazable",
              "Cumplimiento estricto perfil 54E1 Grado R260"
            ],
            archivoOferta: "Oferta-NorteVia-54E1.pdf",
            estado: "recibida",
            fechaEnvio: "13 jun, 16:40"
          },
          "PRV-04": {
            proveedorId: "PRV-04",
            nombre: "Siderúrgica Ferroviaria Ibérica, S.L.",
            cif: "B-46091244",
            sede: "Sagunto (Valencia)",
            precioUnitario: "960 €/t",
            precioTotal: "1.152.000 €",
            plazoSemanas: "7 semanas (49 días)",
            desviacionPlazoDias: -11,
            validezOferta: "60 días",
            condicionesPago: "60 días confirming",
            garantia: "8 años anticorrosión",
            puntuacionTecnica: "95/100",
            requisitosConfirmados: [
              "Suministro en barras de 72m / 108m",
              "Ensayos mecánicos certificados por laboratorio ENAC",
              "Plan logístico coordinado de fletes por ferrocarril"
            ],
            archivoOferta: "Oferta-SFI-Bilbao-54E1.pdf",
            estado: "recibida",
            fechaEnvio: "14 jun, 11:20"
          },
          "PRV-05": {
            proveedorId: "PRV-05",
            nombre: "Rails & Tracks Iberia, S.A.",
            cif: "A-28190342",
            sede: "Madrid / Bilbao",
            precioUnitario: "930 €/t",
            precioTotal: "1.116.000 €",
            plazoSemanas: "9 semanas (63 días)",
            desviacionPlazoDias: +3,
            validezOferta: "30 días",
            condicionesPago: "90 días confirming",
            garantia: "5 años estándar",
            puntuacionTecnica: "91/100",
            requisitosConfirmados: [
              "Control geométrico láser en continuo",
              "Certificado metalográfico por lote"
            ],
            archivoOferta: "Oferta-RailsTracks-54E1.pdf",
            estado: "recibida",
            fechaEnvio: "14 jun, 18:05"
          }
        },
        requisitosExigidosCliente: [
          "Barra larga soldada (tramos hasta 108 m)",
          "Ensayos no destructivos ultrasonidos al 100%",
          "Certificado de colada siderúrgica trazable"
        ],
        proveedorAdjudicado: null
      }
    },
    {
      id: "SFN-2026-B3R8",
      tituloGenerico: "Sistemas de fijación elástica y placas — Tramo Terrassa-Sabadell",
      producto: "Sistemas de fijación elástica y placas — Tramo Terrassa-Sabadell",
      tipoMaterial: "Fijaciones — Superestructura",
      subtipo: "2 suministros (Clip elástico SKL-14 y Suelas antivibratorias)",
      unidades: "29.000 conjuntos SKL-14 + 14.500 suelas",
      cliente: "Ferrocarrils de la Generalitat de Catalunya",
      destinatarioFinal: "FGC Infraestructures (Tramo Terrassa - Sabadell)",
      proveedor: "IberRail Components, S.L.",
      presupuestoTotal: "215.000 €",
      faseActual: 3, // 4. Cierre
      finalizado: true,
      plazoPactado: "28 días",
      plazoRealEstimado: "29 días",
      desviacionDias: "+1 día (Retención aduanera resuelta)",
      estado: "review",
      incidencias: [],
      deliverables: {
        0: [{ name: "Pliego Ensayos Fatiga Dinámica", reqDate: "01 jun 2026", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-SKL14-FGC.pdf", date: "03 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Validado conforme UNE-EN 13481" }],
        1: [{ name: "Oferta Aprobada y Adjudicación", reqDate: "05 jun 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-FGC-IberRail.pdf", date: "07 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Adjudicación directa confirmada" }],
        2: [
          { name: "Hoja de Pedido Formalizada", reqDate: "08 jun 2026", owner: "SOFEIN", state: "complete", format: "PDF", file: "Pedido-SKL14.pdf", date: "08 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Contrato firmado" },
          { name: "Certificado EN 13481 Ensayos Dinámicos", reqDate: "12 jun 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Cert-EN13481-Lab.pdf", date: "14 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Ensayo 3M ciclos superado" },
          { name: "Albarán de Salida de Fábrica", reqDate: "16 jun 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Albaran-Transp-089.pdf", date: "18 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Expedición completa entregada" }
        ],
        3: [
          { name: "Acta de Descarga a Pie de Vía", reqDate: "18 jun 2026", owner: "SOFEIN", state: "review", format: "PDF", file: "Acta-Descarga-FGC.pdf", date: "Ayer", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Pendiente firma cierre final" }
        ]
      }
    },
    {
      id: "SFN-2026-W4P7",
      tituloGenerico: "Suministro de traviesas y aparatos — Tramo Medina del Campo",
      producto: "Suministro de traviesas y aparatos — Tramo Medina del Campo",
      tipoMaterial: "Traviesas de Madera — Especial",
      subtipo: "3 suministros (Traviesas roble, Desvíos y Placas de asiento)",
      unidades: "3.200 traviesas + 4 desvíos + 6.400 placas",
      cliente: "Adif Mantenimiento Red Convencional",
      destinatarioFinal: "ADIF Red Convencional (Tramo Medina del Campo)",
      proveedor: "Madera Vía Ibérica, S.A.",
      presupuestoTotal: "198.000 €",
      faseActual: 2, // 3. Gestión del pedido
      plazoPactado: "35 días",
      plazoRealEstimado: "35 días",
      desviacionDias: "0 días (En cronograma)",
      estado: "review",
      incidencias: [],
      deliverables: {
        0: [{ name: "Especificación de Tratamiento Vacío-Presión", reqDate: "14 jun 2026", owner: "Cliente", state: "complete", format: "PDF", file: "Pliego-Creosota.pdf", date: "15 jun 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Norma UNE-EN 13145" }],
        1: [{ name: "Oferta Aceptada Madera Vía", reqDate: "16 jun 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-MaderaVia.pdf", date: "17 jun 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Condiciones validadas" }],
        2: [{ name: "Hoja de Pedido y Póliza de Suministro", reqDate: "18 jun 2026", owner: "SOFEIN", state: "review", format: "PDF", file: "Hoja-Pedido-Madera.pdf", date: "Hoy", visibleTo: ["admin", "cliente", "proveedor"], notes: "En revisión de firmas" }],
        3: []
      }
    },
    {
      id: "SFN-2026-D8J5",
      tituloGenerico: "Lote de clavazón y fijación metálica — Miranda de Ebro",
      producto: "Lote de clavazón y fijación metálica — Miranda de Ebro",
      tipoMaterial: "Tirafondos — Superestructura",
      subtipo: "2 suministros (Tirafondos TF-24 y Arandelas Fe6)",
      unidades: "62.000 tirafondos + 124.000 arandelas",
      cliente: "Infraestructuras del Norte, S.A.",
      destinatarioFinal: "ADIF Red Convencional (Tramo Miranda de Ebro)",
      proveedor: "IberRail Components, S.L.",
      presupuestoTotal: "74.400 €",
      faseActual: 3, // 4. Cierre
      cerrado: true,
      fechaCierre: "29 abr 2026",
      hitosFechas: ["10 feb 2026", "20 feb 2026", "20 mar 2026", "29 abr 2026"],
      plazoPactado: "45 días",
      plazoRealEstimado: "44 días",
      desviacionDias: "-1 día (Entregado en plazo)",
      estado: "complete",
      incidencias: [],
      deliverables: {
        0: [{ name: "Especificación Técnica de Tirafondos", reqDate: "08 feb 2026", owner: "Cliente", state: "complete", format: "PDF", file: "Espec-TF24-ADIF.pdf", date: "10 feb 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Conforme pliego ADIF" }],
        1: [{ name: "Oferta Económica Vinculante IberRail", reqDate: "15 feb 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Oferta-TF24-IberRail.pdf", date: "20 feb 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Adjudicada" }],
        2: [
          { name: "Hoja de Pedido Formalizada", reqDate: "25 feb 2026", owner: "SOFEIN", state: "complete", format: "PDF", file: "Hoja-Pedido-SOF-2026-003.pdf", date: "27 feb 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Firmada por todas las partes" },
          { name: "Certificado de Ensayos y Lote Homologado", reqDate: "15 mar 2026", owner: "Proveedor", state: "complete", format: "PDF / Lab", file: "Cert-Lote-TF24.pdf", date: "20 mar 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Galvanizado verificado" },
          { name: "Albaranes de Salida de Fábrica", reqDate: "08 abr 2026", owner: "Proveedor", state: "complete", format: "PDF", file: "Albaranes-TF24.pdf", date: "10 abr 2026", visibleTo: ["admin", "cliente", "proveedor"], notes: "Transporte completado" }
        ],
        3: [
          { name: "Acta de Descarga a Pie de Vía", reqDate: "25 abr 2026", owner: "SOFEIN", state: "complete", format: "PDF", file: "Acta-Descarga-TF24.pdf", date: "27 abr 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Recepción conforme en Miranda" },
          { name: "Pasaporte Digital SOFEIN (Trazabilidad Consolidada)", reqDate: "29 abr 2026", owner: "SOFEIN", state: "complete", format: "Certificado", file: "Pasaporte-SOF-2026-003.pdf", date: "29 abr 2026", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Expediente cerrado y sellado" }
        ]
      }
    }
  ];

  /* ---------- Datos Maestros de Suministros Ferroviarios ---------- */
  const INITIAL_SUMINISTROS = [
    {
      id: "SUM-01",
      num: "01",
      tipo: "Traviesas",
      descripcion: "Hormigón monobloque PR-22 (7.250 m)",
      unidades: "14.500",
      unidadesNum: 14500,
      presupuesto: "280.000 €",
      expId: "SFN-2026-H6T4",
      proveedor: "IberRail Components, S.L.",
      cliente: "Infraestructuras del Norte, S.A.",
      destino: "Factoría Volkswagen (Acceso Red Adif)",
      ano: 2026,
      faseActual: 2,
      faseNombre: "3. Gestión del pedido",
      accionesPendientes: 2,
      accionesPendientesRol: { admin: 2, cliente: 1, proveedor: 2 },
      fechaEntrega: "14 oct 2026",
      fechaEntregaIso: "2026-10-14",
      estado: "activo"
    },
    {
      id: "SUM-02",
      num: "02",
      tipo: "Placas",
      descripcion: "Sujeciones elásticas y placas de asiento PR-22",
      unidades: "29.000",
      unidadesNum: 29000,
      presupuesto: "122.000 €",
      expId: "SFN-2026-H6T4",
      proveedor: "IberRail Components, S.L.",
      cliente: "Infraestructuras del Norte, S.A.",
      destino: "Factoría Volkswagen (Acceso Red Adif)",
      ano: 2026,
      faseActual: 2,
      faseNombre: "3. Gestión del pedido",
      accionesPendientes: 1,
      accionesPendientesRol: { admin: 1, cliente: 0, proveedor: 1 },
      fechaEntrega: "18 oct 2026",
      fechaEntregaIso: "2026-10-18",
      estado: "activo"
    },
    {
      id: "SUM-03",
      num: "03",
      tipo: "Balasto",
      descripcion: "Silíceo certificado Tipo 1",
      unidades: "8.500",
      unidadesNum: 8500,
      presupuesto: "80.000 €",
      expId: "SFN-2026-H6T4",
      proveedor: "Por determinar",
      cliente: "Infraestructuras del Norte, S.A.",
      destino: "Factoría Volkswagen (Acceso Red Adif)",
      ano: 2026,
      faseActual: 1,
      faseNombre: "2. Proveedores",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 1, proveedor: 0 },
      fechaEntrega: "28 oct 2026",
      fechaEntregaIso: "2026-10-28",
      estado: "activo"
    },
    {
      id: "SUM-04",
      num: "01",
      tipo: "Otros",
      descripcion: "Carril laminado 54E1 Grado R260 (18 km)",
      unidades: "1.200",
      unidadesNum: 1200,
      presupuesto: "920.000 €",
      expId: "SFN-2026-K9M2",
      proveedor: "Por determinar",
      cliente: "Metro de Bilbao",
      destino: "Consorcio Transportes Bizkaia (Línea 4)",
      ano: 2026,
      faseActual: 1,
      faseNombre: "2. Proveedores",
      accionesPendientes: 1,
      accionesPendientesRol: { admin: 1, cliente: 1, proveedor: 0 },
      fechaEntrega: "04 nov 2026",
      fechaEntregaIso: "2026-11-04",
      estado: "activo"
    },
    {
      id: "SUM-05",
      num: "02",
      tipo: "Otros",
      descripcion: "Aparatos de dilatación y bridas aislantes 54E1",
      unidades: "24",
      unidadesNum: 24,
      presupuesto: "220.000 €",
      expId: "SFN-2026-K9M2",
      proveedor: "Por determinar",
      cliente: "Metro de Bilbao",
      destino: "Consorcio Transportes Bizkaia (Línea 4)",
      ano: 2026,
      faseActual: 0,
      faseNombre: "1. Alcance",
      accionesPendientes: 1,
      accionesPendientesRol: { admin: 1, cliente: 1, proveedor: 0 },
      fechaEntrega: "12 nov 2026",
      fechaEntregaIso: "2026-11-12",
      estado: "activo"
    },
    {
      id: "SUM-06",
      num: "01",
      tipo: "Traviesas",
      descripcion: "Madera tratada creosotada",
      unidades: "3.200",
      unidadesNum: 3200,
      presupuesto: "110.000 €",
      expId: "SFN-2026-W4P7",
      proveedor: "Madera Vía Ibérica, S.A.",
      cliente: "Adif Mantenimiento Red Convencional",
      destino: "ADIF Red Convencional (Medina del Campo)",
      ano: 2026,
      faseActual: 2,
      faseNombre: "3. Gestión del pedido",
      accionesPendientes: 1,
      accionesPendientesRol: { admin: 1, cliente: 0, proveedor: 1 },
      fechaEntrega: "25 oct 2026",
      fechaEntregaIso: "2026-10-25",
      estado: "activo"
    },
    {
      id: "SUM-07",
      num: "02",
      tipo: "Otros",
      descripcion: "Desvíos y cruzamientos monobloque tipo C",
      unidades: "4",
      unidadesNum: 4,
      presupuesto: "58.000 €",
      expId: "SFN-2026-W4P7",
      proveedor: "IberRail Components, S.L.",
      cliente: "Adif Mantenimiento Red Convencional",
      destino: "ADIF Red Convencional (Medina del Campo)",
      ano: 2026,
      faseActual: 2,
      faseNombre: "3. Gestión del pedido",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 1, proveedor: 1 },
      fechaEntrega: "15 nov 2026",
      fechaEntregaIso: "2026-11-15",
      estado: "activo"
    },
    {
      id: "SUM-08",
      num: "03",
      tipo: "Placas",
      descripcion: "Placas de asiento para traviesa de madera",
      unidades: "6.400",
      unidadesNum: 6400,
      presupuesto: "30.000 €",
      expId: "SFN-2026-W4P7",
      proveedor: "Por determinar",
      cliente: "Adif Mantenimiento Red Convencional",
      destino: "ADIF Red Convencional (Medina del Campo)",
      ano: 2026,
      faseActual: 1,
      faseNombre: "2. Proveedores",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 0, proveedor: 0 },
      fechaEntrega: "20 nov 2026",
      fechaEntregaIso: "2026-11-20",
      estado: "activo"
    },
    {
      id: "SUM-09",
      num: "01",
      tipo: "Clips",
      descripcion: "Sujeciones elásticas y fijaciones SKL-14",
      unidades: "29.000",
      unidadesNum: 29000,
      presupuesto: "145.000 €",
      expId: "SFN-2026-B3R8",
      proveedor: "IberRail Components, S.L.",
      cliente: "Ferrocarrils de la Generalitat de Catalunya",
      destino: "FGC Infraestructures (Terrassa - Sabadell)",
      ano: 2025,
      faseActual: 3,
      faseNombre: "4. Cierre",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 0, proveedor: 0 },
      fechaEntrega: "18 oct 2026",
      fechaEntregaIso: "2026-10-18",
      estado: "finalizado"
    },
    {
      id: "SUM-10",
      num: "02",
      tipo: "Otros",
      descripcion: "Suelas bajo traviesa y elastómeros antivibratorios",
      unidades: "14.500",
      unidadesNum: 14500,
      presupuesto: "70.000 €",
      expId: "SFN-2026-B3R8",
      proveedor: "IberRail Components, S.L.",
      cliente: "Ferrocarrils de la Generalitat de Catalunya",
      destino: "FGC Infraestructures (Terrassa - Sabadell)",
      ano: 2025,
      faseActual: 3,
      faseNombre: "4. Cierre",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 0, proveedor: 0 },
      fechaEntrega: "18 oct 2026",
      fechaEntregaIso: "2026-10-18",
      estado: "finalizado"
    },
    {
      id: "SUM-11",
      num: "01",
      tipo: "Tirafondos",
      descripcion: "Acero tratado TF-24",
      unidades: "62.000",
      unidadesNum: 62000,
      presupuesto: "48.400 €",
      expId: "SFN-2026-D8J5",
      proveedor: "IberRail Components, S.L.",
      cliente: "Infraestructuras del Norte, S.A.",
      destino: "ADIF Red Convencional (Miranda de Ebro)",
      ano: 2025,
      faseActual: 3,
      faseNombre: "4. Cierre",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 0, proveedor: 0 },
      fechaEntrega: "29 abr 2026",
      fechaEntregaIso: "2026-04-29",
      estado: "cerrado"
    },
    {
      id: "SUM-12",
      num: "02",
      tipo: "Otros",
      descripcion: "Arandelas elásticas dobles Fe6",
      unidades: "124.000",
      unidadesNum: 124000,
      presupuesto: "26.000 €",
      expId: "SFN-2026-D8J5",
      proveedor: "IberRail Components, S.L.",
      cliente: "Infraestructuras del Norte, S.A.",
      destino: "ADIF Red Convencional (Miranda de Ebro)",
      ano: 2025,
      faseActual: 3,
      faseNombre: "4. Cierre",
      accionesPendientes: 0,
      accionesPendientesRol: { admin: 0, cliente: 0, proveedor: 0 },
      fechaEntrega: "29 abr 2026",
      fechaEntregaIso: "2026-04-29",
      estado: "cerrado"
    }
  ];

  let SUMINISTROS = [...INITIAL_SUMINISTROS];

  /* ---------- Catálogos maestros de SOFEIN (Administración) ----------
     Fuente única de Productos y Conformidades que alimenta los selectores del
     constructor de expedientes, el alta/edición de proveedores y el registro de
     certificados. Se persisten en localStorage para sobrevivir a recargas. */
  const CATALOG_STORAGE_KEYS = {
    productos: "sofein_catalogo_productos_v3",
    conformidades: "sofein_catalogo_conformidades_v1"
  };

  const PRODUCTO_TIPOS = ["Traviesas", "Placas", "Tirafondos", "Clips", "Balasto", "Otros"];
  const DEFAULT_CATALOGO_PRODUCTOS = [
    { id: "PRD-01", tipo: "Traviesas", subtipo: "Hormigón", norma: "EN 13230", activo: true },
    { id: "PRD-02", tipo: "Traviesas", subtipo: "Madera", norma: "UNE-EN 13145", activo: true },
    { id: "PRD-03", tipo: "Placas", subtipo: "", norma: "EN 13481-2", activo: true },
    { id: "PRD-04", tipo: "Tirafondos", subtipo: "", norma: "EN 13481", activo: true },
    { id: "PRD-05", tipo: "Clips", subtipo: "", norma: "EN 13481", activo: true },
    { id: "PRD-06", tipo: "Balasto", subtipo: "", norma: "UNE-EN 13450", activo: true },
    { id: "PRD-07", tipo: "Otros", subtipo: "", norma: "", activo: true }
  ].map(p => ({ ...p, nombre: p.subtipo ? `${p.tipo} · ${p.subtipo}` : p.tipo, etiqueta: p.tipo }));

  const DEFAULT_CATALOGO_CONFORMIDADES = [
    { id: "CNF-01", nombre: "ISO 9001", tipo: "Sistema de gestión", emisor: "ENAC / AENOR", ambito: "Gestión de la calidad", activo: true },
    { id: "CNF-02", nombre: "ISO 14001", tipo: "Sistema de gestión", emisor: "ENAC / AENOR", ambito: "Gestión ambiental", activo: true },
    { id: "CNF-03", nombre: "ISO 45001", tipo: "Sistema de gestión", emisor: "ENAC / AENOR", ambito: "Seguridad y salud laboral", activo: true },
    { id: "CNF-04", nombre: "AENOR EN 13230", tipo: "Norma de producto", emisor: "AENOR", ambito: "Traviesas de hormigón", activo: true },
    { id: "CNF-05", nombre: "EN 13230-2", tipo: "Norma de producto", emisor: "Laboratorio ENAC", ambito: "Traviesas monobloque", activo: true },
    { id: "CNF-06", nombre: "EN 13674-1", tipo: "Norma de producto", emisor: "Laboratorio ENAC", ambito: "Carril", activo: true },
    { id: "CNF-07", nombre: "EN 13481", tipo: "Norma de producto", emisor: "Laboratorio ENAC", ambito: "Sistemas de fijación", activo: true },
    { id: "CNF-08", nombre: "UNE-EN 13450", tipo: "Norma de producto", emisor: "AENOR", ambito: "Balasto", activo: true },
    { id: "CNF-09", nombre: "Tratamiento UNE-EN 13145", tipo: "Norma de producto", emisor: "AENOR", ambito: "Traviesas de madera", activo: true },
    { id: "CNF-10", nombre: "Tratamiento autoclave", tipo: "Norma de producto", emisor: "Laboratorio ENAC", ambito: "Traviesas de madera", activo: true },
    { id: "CNF-11", nombre: "Certificado CE", tipo: "Marcado / Certificado", emisor: "Organismo notificado", ambito: "Producto", activo: true },
    { id: "CNF-12", nombre: "Marcado CE 2+", tipo: "Marcado / Certificado", emisor: "Organismo notificado", ambito: "Áridos y balasto", activo: true },
    { id: "CNF-13", nombre: "Certificado Lloyd's", tipo: "Marcado / Certificado", emisor: "Lloyd's Register", ambito: "Carril", activo: true },
    { id: "CNF-14", nombre: "Cadena FSC/PEFC", tipo: "Sostenibilidad", emisor: "FSC / PEFC", ambito: "Madera", activo: true },
    { id: "CNF-15", nombre: "PEFC Sostenible", tipo: "Sostenibilidad", emisor: "PEFC", ambito: "Madera", activo: true },
    { id: "CNF-16", nombre: "Adif NAV-2026", tipo: "Homologación Adif", emisor: "Adif", ambito: "Traviesas y fijaciones", activo: true },
    { id: "CNF-17", nombre: "Adif 03.360.501", tipo: "Homologación Adif", emisor: "Adif", ambito: "Carril y aparatos", activo: true },
    { id: "CNF-18", nombre: "Adif Normativa Vía", tipo: "Homologación Adif", emisor: "Adif", ambito: "Superestructura", activo: true },
    { id: "CNF-19", nombre: "Adif Homologada", tipo: "Homologación Adif", emisor: "Adif", ambito: "Superestructura", activo: true },
    { id: "CNF-20", nombre: "Adif Tipo 1", tipo: "Homologación Adif", emisor: "Adif", ambito: "Balasto", activo: true },
    { id: "CNF-21", nombre: "Adif Tipo 1 AV", tipo: "Homologación Adif", emisor: "Adif", ambito: "Balasto alta velocidad", activo: true }
  ];

  function loadCatalog(kind, defaults) {
    try {
      const raw = localStorage.getItem(CATALOG_STORAGE_KEYS[kind]);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch (e) { /* catálogo corrupto: se restauran los valores por defecto */ }
    return defaults.map(item => ({ ...item }));
  }

  const CATALOGOS = {
    productos: loadCatalog("productos", DEFAULT_CATALOGO_PRODUCTOS),
    conformidades: loadCatalog("conformidades", DEFAULT_CATALOGO_CONFORMIDADES)
  };

  function saveCatalog(kind) {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEYS[kind], JSON.stringify(CATALOGOS[kind]));
    } catch (e) { /* almacenamiento no disponible: el catálogo sigue vivo en memoria */ }
  }

  const getActiveProductos = () => CATALOGOS.productos.filter(p => p.activo !== false);
  const getActiveConformidades = () => CATALOGOS.conformidades.filter(c => c.activo !== false);

  const escHTML = str => String(str ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

  // Opciones del selector "Tipo de Suministro" del constructor de expedientes
  function renderProductoOptions() {
    const tipos = [...new Set(getActiveProductos().map(p => p.tipo || p.etiqueta || p.nombre))];
    if (!tipos.length) return `<option value="Otros">Otros</option>`;
    return tipos.map(t => `<option value="${escHTML(t)}">${escHTML(t)}</option>`).join("");
  }

  /* ---------- Avisos Categorizados (Apuntes 06 — Inbox Central) ---------- */
  const NOTICES = [
    {
      id: "AV-01",
      expId: "SFN-2026-H6T4",
      sumId: "SUM-01",
      suministro: "01 · Traviesas PR-22",
      categoria: "Incidencia / Mediación",
      tagClass: "warning",
      titulo: "Propuesta de mediación de plazo pendiente de firma",
      descripcion: "SOFEIN ha emitido la propuesta para desdoblar la entrega en dos sub-lotes tras la ola de calor. Requiere firma del constructor.",
      fecha: "Hoy, 10:35",
      roles: ["admin", "cliente"],
      accion: "Ver Mediación",
      enlace: "#cliente/expedientes/SFN-2026-H6T4?tab=incidents&openMediation=REG-001"
    },
    {
      id: "AV-02",
      expId: "SFN-2026-H6T4",
      sumId: "SUM-01",
      suministro: "01 · Traviesas PR-22",
      categoria: "Documentación",
      tagClass: "review",
      titulo: "Nuevo ensayo mecánico EN 13230 recibido",
      descripcion: "IberRail Components ha adjuntado los resultados de rotura dinámica en la ranura documental de Fase 4.",
      fecha: "Hoy, 09:15",
      roles: ["admin", "proveedor"],
      accion: "Validar Documento",
      enlace: "#admin/expedientes/SFN-2026-H6T4?tab=deliverables"
    },
    {
      id: "AV-03",
      expId: "SFN-2026-K9M2",
      sumId: "SUM-04",
      suministro: "04 · Carril 54E1",
      categoria: "Cotización",
      tagClass: "complete",
      titulo: "Preselección de 3 laminadores completada",
      descripcion: "SOFEIN ha fijado los proveedores de carril 54E1. El cliente debe seleccionar a quién solicitar oferta vinculante.",
      fecha: "Ayer, 16:40",
      roles: ["admin", "cliente"],
      accion: "Revisar Proveedores",
      enlace: "#admin/selector/SFN-2026-K9M2"
    },
    {
      id: "AV-04",
      expId: "SFN-2026-B3R8",
      sumId: "SUM-09",
      suministro: "09 · Fijaciones SKL-14",
      categoria: "Logística / Plazo",
      tagClass: "info",
      titulo: "Albarán de salida y despacho confirmado",
      descripcion: "Salida de fábrica autorizada para 29.000 fijaciones SKL-14 con destino al tramo Terrassa-Sabadell (FGC).",
      fecha: "18 jun, 11:00",
      roles: ["admin", "cliente", "proveedor"],
      accion: "Consultar Albarán",
      enlace: "#admin/expedientes/SFN-2026-B3R8?tab=deliverables"
    },
    {
      id: "AV-05",
      expId: "SFN-2026-W4P7",
      sumId: "SUM-06",
      suministro: "06 · Traviesas de madera",
      categoria: "Formalización",
      tagClass: "review",
      titulo: "Póliza de suministro y hoja de pedido emitida",
      descripcion: "SOFEIN ha emitido el documento de formalización para las 3.200 traviesas de madera creosotada.",
      fecha: "Hoy, 08:30",
      roles: ["admin", "cliente"],
      accion: "Revisar Póliza",
      enlace: "#admin/expedientes/SFN-2026-W4P7?tab=deliverables"
    },
    {
      id: "AV-06",
      expId: "SFN-2026-H6T4",
      sumId: "SUM-02",
      suministro: "02 · Sujeciones PR-22",
      categoria: "Calidad / Ensayo",
      tagClass: "complete",
      titulo: "Ficha de lote y análisis de material aprobados",
      descripcion: "SOFEIN ha acreditado la conformidad de la ficha técnica de lote 44 remitida por IberRail.",
      fecha: "Ayer, 12:10",
      roles: ["admin", "proveedor"],
      accion: "Ver Ficha",
      enlace: "#admin/expedientes/SFN-2026-H6T4?tab=deliverables"
    }
  ];

  /* ---------- Directorio: Proveedores y Clientes (Apuntes 06) ---------- */
  const DIRECTORIO_PROVEEDORES = [
    {
      id: "PRV-01",
      nombre: "IberRail Components, S.L.",
      cif: "B-48192837",
      sede: "Amurrio (Álava) / Bilbao",
      categorias: ["Traviesas — Superestructura", "Fijaciones — Superestructura"],
      suministros: ["traviesas", "clips"],
      materiales: "Traviesas de Hormigón Monobloque PR-22 · Sujeciones SKL-14",
      homologado: true,
      homologaciones: ["Adif NAV-2026", "AENOR EN 13230", "Certificado CE"],
      conformidades: ["ISO 9001", "ISO 14001", "AENOR EN 13230", "Adif NAV-2026"],
      leadTimeMedio: "42 días",
      precioEstimado: "32 - 35 €/ud",
      condicionesPago: "60 días confirmada",
      requisitosQueCumple: [
        "Trazabilidad lote a lote con código QR",
        "Ensayos de rotura dinámica en laboratorio ENAC",
        "Transporte y descarga a pie de vía con grúa",
        "Garantía anticorrosión 10 años"
      ],
      score: "98% Conforme",
      email: "carlos.m@iberrail.es",
      telefono: "+34 945 393 210",
      contacto: "carlos.m@iberrail.es"
    },
    {
      id: "PRV-02",
      nombre: "Norte Vía Industrial, S.A.",
      cif: "A-33291845",
      sede: "Gijón (Asturias)",
      categorias: ["Carril — Superestructura", "Aparatos de Vía"],
      suministros: ["otros"],
      materiales: "Carril Laminado 54E1 / 60E1 · Aparatos de Vía",
      homologado: true,
      homologaciones: ["Adif 03.360.501", "EN 13674-1", "ISO 9001 / 14001"],
      conformidades: ["ISO 9001", "ISO 14001", "EN 13674-1", "Adif 03.360.501"],
      leadTimeMedio: "58 días",
      precioEstimado: "940 - 970 €/t",
      condicionesPago: "60 días fecha factura",
      requisitosQueCumple: [
        "Barra larga soldada (tramos hasta 108 m)",
        "Ensayos no destructivos ultrasonidos al 100%",
        "Certificado de colada siderúrgica trazable",
        "Cumplimiento estricto perfil 54E1 Grado R260"
      ],
      score: "99% Conforme",
      email: "ventas@nortevia.es",
      telefono: "+34 985 301 440",
      contacto: "ventas@nortevia.es"
    },
    {
      id: "PRV-03",
      nombre: "Madera Vía Ibérica, S.A.",
      cif: "A-47102938",
      sede: "Valladolid",
      categorias: ["Traviesas de Madera — Especial"],
      suministros: ["traviesas"],
      materiales: "Traviesas de Madera Tratada Creosotada (3 subtipos)",
      homologado: true,
      homologaciones: ["Adif Normativa Vía", "Tratamiento UNE-EN 13145", "Cadena FSC/PEFC"],
      conformidades: ["Tratamiento UNE-EN 13145", "Tratamiento autoclave", "Cadena FSC/PEFC", "Adif Normativa Vía"],
      leadTimeMedio: "35 días",
      precioEstimado: "62 - 68 €/ud",
      condicionesPago: "60 días fecha factura",
      requisitosQueCumple: [
        "Tratamiento autoclave vacío-presión creosota Grado C",
        "Entalladura y barrenado previo según plano cliente",
        "Certificación ambiental de gestión forestal",
        "Garantía de durabilidad biológica 25 años"
      ],
      score: "94% Conforme",
      email: "pedidos@maderavia.es",
      telefono: "+34 983 451 220",
      contacto: "pedidos@maderavia.es"
    },
    {
      id: "PRV-04",
      nombre: "Siderúrgica Ferroviaria Ibérica, S.L.",
      cif: "B-46091244",
      sede: "Sagunto (Valencia)",
      categorias: ["Carril — Superestructura"],
      suministros: ["otros"],
      materiales: "Carril Laminado 54E1 / 60E1 · Acero R260 / R350HT",
      homologado: true,
      homologaciones: ["Adif 03.360.501", "EN 13674-1", "Certificado Lloyd's"],
      conformidades: ["ISO 9001", "Certificado Lloyd's", "EN 13674-1", "Adif 03.360.501"],
      leadTimeMedio: "52 días",
      precioEstimado: "950 - 980 €/t",
      condicionesPago: "60 días confirming",
      requisitosQueCumple: [
        "Suministro en barras de 72m / 108m",
        "Ensayos mecánicos certificados por laboratorio ENAC",
        "Plan logístico coordinado de fletes por ferrocarril",
        "Garantía técnica de fatiga de rodadura"
      ],
      score: "96% Conforme",
      email: "proyectos@siderurgicaferroviaria.es",
      telefono: "+34 962 698 100",
      contacto: "proyectos@siderurgicaferroviaria.es"
    },
    {
      id: "PRV-05",
      nombre: "Rails & Tracks Iberia, S.A.",
      cif: "A-28190342",
      sede: "Madrid / Bilbao",
      categorias: ["Carril — Superestructura"],
      suministros: ["otros"],
      materiales: "Carril Laminado 54E1 / 60E1 · Aparatos y desvíos",
      homologado: true,
      homologaciones: ["Adif 03.360.501", "EN 13674-1"],
      conformidades: ["ISO 9001", "EN 13674-1", "Adif 03.360.501"],
      leadTimeMedio: "62 días",
      precioEstimado: "925 - 950 €/t",
      condicionesPago: "90 días confirming",
      requisitosQueCumple: [
        "Control geométrico láser en continuo",
        "Certificado metalográfico por lote",
        "Acopio intermedio en parque logístico propio"
      ],
      score: "95% Conforme",
      email: "comercial@railsandtracks.es",
      telefono: "+34 918 420 530",
      contacto: "comercial@railsandtracks.es"
    },
    {
      id: "PRV-06",
      nombre: "Prefabricados Prefarail, S.A.",
      cif: "A-50129384",
      sede: "Zaragoza",
      categorias: ["Traviesas — Superestructura"],
      suministros: ["traviesas"],
      materiales: "Traviesas de Hormigón Monobloque y Bibloque",
      homologado: true,
      homologaciones: ["Adif NAV-2026", "AENOR EN 13230", "Certificado CE"],
      conformidades: ["ISO 9001", "AENOR EN 13230", "Certificado CE", "Adif NAV-2026"],
      leadTimeMedio: "46 días",
      precioEstimado: "33 - 36 €/ud",
      condicionesPago: "60 días fecha factura",
      requisitosQueCumple: [
        "Capacidad fabril de 800 traviesas/día",
        "Ensayos de carga estática y dinámica en planta",
        "Acabado superficial con protección antivegetación",
        "Transporte especial en bateas homologadas"
      ],
      score: "97% Conforme",
      email: "ventas@prefarail.es",
      telefono: "+34 976 572 810",
      contacto: "ventas@prefarail.es"
    },
    {
      id: "PRV-07",
      nombre: "Traviesas y Hormigones del Norte, S.L.",
      cif: "B-24109823",
      sede: "León",
      categorias: ["Traviesas — Superestructura"],
      suministros: ["traviesas"],
      materiales: "Traviesas de Hormigón Monobloque PR-22 y Ancho Mixto",
      homologado: true,
      homologaciones: ["Adif NAV-2026", "EN 13230-2"],
      conformidades: ["ISO 9001", "EN 13230-2", "Adif NAV-2026"],
      leadTimeMedio: "40 días",
      precioEstimado: "34 - 37 €/ud",
      condicionesPago: "60 días confirmada",
      requisitosQueCumple: [
        "Curado térmico con control digital de temperatura",
        "Ensayos de laboratorio acreditados ENAC",
        "Suministro escalonado según avance de acopio en vía"
      ],
      score: "95% Conforme",
      email: "contacto@traviesasdelnorte.es",
      telefono: "+34 987 231 900",
      contacto: "contacto@traviesasdelnorte.es"
    },
    {
      id: "PRV-08",
      nombre: "Tratamientos Forestales del Ebro, S.L.",
      cif: "B-31298451",
      sede: "Pamplona (Navarra)",
      categorias: ["Traviesas de Madera — Especial"],
      suministros: ["traviesas"],
      materiales: "Traviesas de Roble y Haya Impregnada",
      homologado: true,
      homologaciones: ["Adif Homologada", "UNE-EN 13145"],
      conformidades: ["Tratamiento UNE-EN 13145", "PEFC Sostenible", "Adif Homologada"],
      leadTimeMedio: "38 días",
      precioEstimado: "64 - 70 €/ud",
      condicionesPago: "60 días fecha factura",
      requisitosQueCumple: [
        "Madera de bosques sostenibles PEFC",
        "Tratamiento protector de larga duración",
        "Mecanizado de placas según planos Adif"
      ],
      score: "93% Conforme",
      email: "info@forestalesebro.es",
      telefono: "+34 948 214 750",
      contacto: "info@forestalesebro.es"
    },
    {
      id: "PRV-09",
      nombre: "Maderas del Guadarrama, S.A.",
      cif: "A-40192837",
      sede: "Segovia",
      categorias: ["Traviesas de Madera — Especial"],
      suministros: ["traviesas"],
      materiales: "Traviesas de Madera para Puentes y Desvíos",
      homologado: true,
      homologaciones: ["Adif Homologada", "UNE-EN 13145"],
      conformidades: ["Tratamiento UNE-EN 13145", "ISO 9001", "Adif Homologada"],
      leadTimeMedio: "42 días",
      precioEstimado: "65 - 72 €/ud",
      condicionesPago: "60 días confirming",
      requisitosQueCumple: [
        "Escuadrías especiales y grandes longitudes",
        "Certificación de secado artificial previo",
        "Ensayos de absorción y penetración"
      ],
      score: "92% Conforme",
      email: "comercial@maderasguadarrama.es",
      telefono: "+34 921 430 880",
      contacto: "comercial@maderasguadarrama.es"
    },
    {
      id: "PRV-10",
      nombre: "Fijaciones Industriales Voss, S.A.",
      cif: "A-01283746",
      sede: "Vitoria (Álava)",
      categorias: ["Fijaciones — Superestructura"],
      suministros: ["clips", "placas", "tirafondos"],
      materiales: "Clips Elásticos · Tirafondos · Placas Antivibratorias",
      homologado: true,
      homologaciones: ["Adif Homologada", "EN 13481"],
      conformidades: ["ISO 9001", "ISO 45001", "EN 13481", "Adif Homologada"],
      leadTimeMedio: "30 días",
      precioEstimado: "7,20 - 7,80 €/conjunto",
      condicionesPago: "60 días fecha factura",
      requisitosQueCumple: [
        "Resistencia a fatiga > 3 millones de ciclos",
        "Tratamiento anticorrosión Dacromet 500h niebla salina",
        "Embalaje en cajas paletizadas retractiladas"
      ],
      score: "97% Conforme",
      email: "pedidos@fijacionesvoss.es",
      telefono: "+34 945 281 600",
      contacto: "pedidos@fijacionesvoss.es"
    },
    {
      id: "PRV-11",
      nombre: "ClipRail Ferrocarriles, S.L.",
      cif: "B-50982341",
      sede: "Zaragoza",
      categorias: ["Fijaciones — Superestructura"],
      suministros: ["clips", "placas"],
      materiales: "Sujeciones SKL-14 / W-14 · Placas elásticas",
      homologado: true,
      homologaciones: ["Adif Homologada", "EN 13481"],
      conformidades: ["ISO 9001", "EN 13481", "Adif Homologada"],
      leadTimeMedio: "28 días",
      precioEstimado: "7,10 - 7,60 €/conjunto",
      condicionesPago: "60 días confirming",
      requisitosQueCumple: [
        "Aisladores de poliamida de alta resistencia dieléctrica",
        "Trazabilidad de colada en acero para muelles",
        "Suministro conjunto con tornillería y arandelas"
      ],
      score: "96% Conforme",
      email: "ventas@cliprail.es",
      telefono: "+34 976 441 320",
      contacto: "ventas@cliprail.es"
    },
    {
      id: "PRV-12",
      nombre: "Canteras Ferroviarias del Centro, S.A.",
      cif: "A-45192834",
      sede: "Toledo",
      categorias: ["Balasto Silíceo Certificado"],
      suministros: ["balasto"],
      materiales: "Balasto Silíceo Tipo 1 según Pliego Adif",
      homologado: true,
      homologaciones: ["Adif Tipo 1", "UNE-EN 13450", "Marcado CE 2+"],
      conformidades: ["ISO 9001", "UNE-EN 13450", "Marcado CE 2+", "Adif Tipo 1"],
      leadTimeMedio: "20 días",
      precioEstimado: "18 - 22 €/t",
      condicionesPago: "60 días confirmada",
      requisitosQueCumple: [
        "Coeficiente Los Ángeles < 14 (alta resistencia al desgaste)",
        "Micro-Deval < 11",
        "Lavado y cribado en vía húmeda",
        "Transporte en tren tolva propio o camión bañera"
      ],
      score: "98% Conforme",
      email: "aridos@canterascentro.es",
      telefono: "+34 925 210 940",
      contacto: "aridos@canterascentro.es"
    },
    {
      id: "PRV-13",
      nombre: "Áridos Silíceos del Cantábrico, S.L.",
      cif: "B-33190283",
      sede: "Oviedo (Asturias)",
      categorias: ["Balasto Silíceo Certificado"],
      suministros: ["balasto"],
      materiales: "Balasto Silíceo Cuarcítico Tipo 1",
      homologado: true,
      homologaciones: ["Adif Tipo 1", "UNE-EN 13450"],
      conformidades: ["ISO 14001", "UNE-EN 13450", "Adif Tipo 1"],
      leadTimeMedio: "22 días",
      precioEstimado: "19 - 23 €/t",
      condicionesPago: "60 días fecha factura",
      requisitosQueCumple: [
        "Densidad aparente > 2,65 t/m3",
        "Ensayos petrográficos y de resistencia al hielo-deshielo",
        "Acopios en tolvas cubiertas"
      ],
      score: "95% Conforme",
      email: "comercial@aridoscantabrico.es",
      telefono: "+34 985 241 110",
      contacto: "comercial@aridoscantabrico.es"
    },
    {
      id: "PRV-14",
      nombre: "Balastos y Gravas Ibéricas, S.A.",
      cif: "A-13098234",
      sede: "Ciudad Real",
      categorias: ["Balasto Silíceo Certificado"],
      suministros: ["balasto"],
      materiales: "Balasto Ofítico / Basáltico Alta Velocidad",
      homologado: true,
      homologaciones: ["Adif Tipo 1 AV", "UNE-EN 13450"],
      conformidades: ["ISO 9001", "UNE-EN 13450", "Adif Tipo 1 AV"],
      leadTimeMedio: "18 días",
      precioEstimado: "21 - 25 €/t",
      condicionesPago: "60 días confirming",
      requisitosQueCumple: [
        "Piedra basáltica de máxima tenacidad",
        "Ausencia total de finos arcillosos",
        "Capacidad de suministro 3.000 t/día"
      ],
      score: "99% Conforme",
      email: "ventas@balastosibericos.es",
      telefono: "+34 926 230 470",
      contacto: "ventas@balastosibericos.es"
    }
  ];

  const DIRECTORIO_CLIENTES = [
    {
      id: "CLI-01",
      nombre: "Infraestructuras del Norte, S.A.",
      cif: "A-48092311",
      sede: "Madrid / Bilbao",
      expedientesActivos: 2,
      actividad: "Constructora Ferroviaria (Licitaciones Adif / Metro)",
      homologado: true,
      email: "proyectos@infraestructurasnorte.es",
      telefono: "+34 914 200 110",
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
      email: "infraestructures@fgc.cat",
      telefono: "+34 933 663 000",
      contacto: "infraestructures@fgc.cat"
    },
    {
      id: "CLI-03",
      nombre: "Metro de Bilbao",
      cif: "A-48493021",
      sede: "Bilbao (Bizkaia)",
      expedientesActivos: 1,
      actividad: "Operador de Ferrocarril Metropolitano",
      homologado: true,
      email: "obras@metrobilbao.eus",
      telefono: "+34 944 252 000",
      contacto: "obras@metrobilbao.eus"
    },
    {
      id: "CLI-04",
      nombre: "Adif Mantenimiento Red Convencional",
      cif: "Q-2801660H",
      sede: "Madrid",
      expedientesActivos: 1,
      actividad: "Administrador de Infraestructuras Ferroviarias",
      homologado: true,
      email: "mantenimiento@adif.es",
      telefono: "+34 917 744 000",
      contacto: "mantenimiento@adif.es"
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

  function getActiveExpediente(id = "SFN-2026-H6T4") {
    return EXPEDIENTES.find(e => e.id === id) || EXPEDIENTES[0];
  }

  /* ---------- Helper: Matching de Proveedores por Expediente (Apuntes 06) ---------- */
  function ensureExpedienteMatching(exp) {
    if (!exp) return null;
    if (exp.matching) return exp.matching;

    const mat = (exp.tipoMaterial || exp.producto || "").toLowerCase();
    let candidates = DIRECTORIO_PROVEEDORES.filter(p => {
      if (!p.categorias) return true;
      return p.categorias.some(c => mat.includes(c.toLowerCase().split(" ")[0]));
    });

    if (candidates.length < 3) {
      candidates = DIRECTORIO_PROVEEDORES.slice(0, 3);
    }
    const ids = candidates.map(c => c.id);

    exp.matching = {
      faseSelector: exp.faseActual > 1 ? "adjudicado" : "preseleccion",
      proveedoresRecomendados: ids,
      proveedoresPreseleccionadosPorAdmin: [...ids],
      proveedoresSeleccionadosPorCliente: ids.slice(0, Math.min(ids.length, 2)),
      cotizaciones: {},
      requisitosExigidosCliente: [
        "Trazabilidad de colada / lote con código individual",
        "Certificación de ensayos en laboratorio acreditado ENAC"
      ],
      proveedorAdjudicado: exp.faseActual > 1 ? exp.proveedor : null
    };

    return exp.matching;
  }

  /* ---------- Helper: Formalización del Acuerdo y Contrato (Pantalla 3 - Apuntes 05 y 06) ---------- */
  function ensureExpedienteFormalizacion(exp) {
    if (!exp) return null;
    if (exp.formalizacion) return exp.formalizacion;

    const isAlreadyPastFormalizacion = exp.faseActual > 2;
    const matching = ensureExpedienteMatching(exp);
    const winningPrv = matching.proveedorAdjudicado || exp.proveedor || "IberRail Components, S.L.";
    const prvObj = DIRECTORIO_PROVEEDORES.find(p => p.nombre === winningPrv) || DIRECTORIO_PROVEEDORES[0];
    const cliObj = DIRECTORIO_CLIENTES.find(c => exp.cliente.includes(c.nombre.split(",")[0])) || DIRECTORIO_CLIENTES[0];

    exp.formalizacion = {
      codigoContrato: `PED-SOF-${exp.id.replace(/^SFN-\d{4}-/, "")}`,
      fechaEmision: isAlreadyPastFormalizacion ? "18 jun 2026" : "Hoy",
      clienteCif: cliObj ? cliObj.cif : "A-48092311",
      proveedorCif: prvObj ? prvObj.cif : "B-48192837",
      condicionesPago: prvObj && prvObj.condicionesPago ? prvObj.condicionesPago : "Confirming 60 días fecha recepción conforme",
      garantiaContractual: "10 años de trazabilidad y garantía técnica directa del fabricante",
      acuerdoMarcoCliente: true,
      acuerdoMarcoProveedor: true,
      firmaCliente: isAlreadyPastFormalizacion,
      fechaFirmaCliente: isAlreadyPastFormalizacion ? "18 jun, 11:20" : null,
      firmaProveedor: isAlreadyPastFormalizacion,
      fechaFirmaProveedor: isAlreadyPastFormalizacion ? "18 jun, 13:05" : null,
      validadoSofein: isAlreadyPastFormalizacion,
      fechaValidacionSofein: isAlreadyPastFormalizacion ? "18 jun, 14:00" : null
    };

    return exp.formalizacion;
  }

  /* ---------- Enrutador y Estado de Vista ---------- */
  let activeRole = "admin";
  let activeSection = "overview";
  let activeParam = null;
  let activeDossierPhase = 3;
  let lastOpenedExpId = null;
  let activeDossierTab = "deliverables"; // deliverables | incidents | passport | comms
  let incidentStatusFilter = "all"; // "all" | "in_mediation" | "pending_signs" | "consolidated"
  let pendingOpenMediation = null;
  let selectorSumParam = null;   // ?sum= del selector de proveedores
  let selectorViewStep = null;   // paso consultado en el selector (null = el paso en curso)
  let lastSelectorSumId = null;
  // Historial de actividad: se sigue registrando todo, pero la pestaña está oculta hasta diseñar el backoffice (decisión 29/10)
  const SHOW_HISTORY_TAB = false;
  let historyPhaseFilter = "all"; // "all" | "0".."3"
  let historySumFilter = "all";   // "all" | "General" | "SUM-xx"
  let historyIncludeNotes = true;

  // Nuevos Estados Interactivos
  let overviewFilter = null; // "validados" | "review" | "pending" | "futuras" | "expedientes" | "incidencias" | "proveedores"
  let expSearchQuery = "";
  let suministrosFilters = {
    suministro: "all",
    tipo: "all",
    descripcion: "all",
    unidades: "all",
    expediente: "all",
    proveedor: "all",
    cliente: "all",
    destino: "all",
    ano: "all",
    fase: "all",
    acciones: "all",
    fechaEntrega: "all"
  };
  let suministrosSortCol = "suministro";
  let suministrosSortDir = "asc";
  let suministrosSearchQuery = "";
  let isColsMenuOpen = false;
  let isClosedTableOpen = false;

  const ALL_SUMINISTROS_COL_DEFS = {
    suministro: { id: "suministro", label: "Suministro", minWidth: "85px" },
    tipo: { id: "tipo", label: "Tipo", minWidth: "115px" },
    descripcion: { id: "descripcion", label: "Descripción", minWidth: "200px" },
    unidades: { id: "unidades", label: "Unidades", minWidth: "90px" },
    expediente: { id: "expediente", label: "Expediente", minWidth: "130px" },
    proveedor: { id: "proveedor", label: "Proveedor", minWidth: "155px" },
    cliente: { id: "cliente", label: "Cliente", minWidth: "155px" },
    destino: { id: "destino", label: "Destino", minWidth: "160px" },
    ano: { id: "ano", label: "Año", minWidth: "75px" },
    fase: { id: "fase", label: "Fase", minWidth: "135px" },
    acciones: { id: "acciones", label: "Acciones", minWidth: "90px" },
    fechaEntrega: { id: "fechaEntrega", label: "Fecha entrega", minWidth: "145px" }
  };

  const DEFAULT_SUMINISTROS_COL_ORDER = [
    "suministro",
    "tipo",
    "descripcion",
    "unidades",
    "expediente",
    "proveedor",
    "cliente",
    "destino",
    "ano",
    "fase",
    "acciones",
    "fechaEntrega"
  ];

  const DEFAULT_SUMINISTROS_HIDDEN_COLS = ["proveedor", "cliente", "descripcion", "destino"];

  let suministrosColumnOrder = [...DEFAULT_SUMINISTROS_COL_ORDER];
  let suministrosHiddenCols = new Set(DEFAULT_SUMINISTROS_HIDDEN_COLS);

  function loadSuministrosColPrefs() {
    try {
      const saved = localStorage.getItem("sofein_suministros_columns_cfg_v3");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.order) && parsed.order.length > 0) {
          const validOrder = parsed.order.filter(id => DEFAULT_SUMINISTROS_COL_ORDER.includes(id));
          DEFAULT_SUMINISTROS_COL_ORDER.forEach(id => {
            if (!validOrder.includes(id)) validOrder.push(id);
          });
          suministrosColumnOrder = validOrder;
        }
        if (Array.isArray(parsed.hidden)) {
          suministrosHiddenCols = new Set(parsed.hidden.filter(id => DEFAULT_SUMINISTROS_COL_ORDER.includes(id)));
        }
      } else {
        suministrosHiddenCols = new Set(DEFAULT_SUMINISTROS_HIDDEN_COLS);
      }
    } catch (e) {
      suministrosColumnOrder = [...DEFAULT_SUMINISTROS_COL_ORDER];
      suministrosHiddenCols = new Set(DEFAULT_SUMINISTROS_HIDDEN_COLS);
    }
  }
  loadSuministrosColPrefs();

  function saveSuministrosColPrefs() {
    try {
      localStorage.setItem("sofein_suministros_columns_cfg_v3", JSON.stringify({
        order: suministrosColumnOrder,
        hidden: Array.from(suministrosHiddenCols)
      }));
    } catch (e) {}
  }
  let avisosGroup = "none"; // "none" | "expediente" | "suministro" | "categoria" | "fecha"
  let avisosSortCol = "fecha"; // "tipo" | "titulo" | "expId" | "suministro" | "categoria" | "fecha"
  let avisosSortDir = "desc"; // "asc" | "desc"
  let completedNotices = new Set();
  let discardedNotices = completedNotices; // Alias retrocompatible
  let showCompletedAvisos = false;
  let showDiscardedAvisos = false; // Alias retrocompatible
  let topbarNotifFilter = "pending"; // "pending" | "all" 

  /* ---------- Avisos: Tonalidades de Categorías y Ordenación ---------- */
  function getCategoryToneInfo(cat) {
    const c = (cat || "").toLowerCase();
    if (c.includes("incidencia") || c.includes("mediación") || c.includes("mediacion")) {
      return { slug: "amber", iconName: "alert", color: "var(--cat-amber)", bg: "var(--cat-amber-bg)", border: "var(--cat-amber-border)" };
    }
    if (c.includes("docum") || c.includes("requerimiento")) {
      return { slug: "blue", iconName: "file", color: "var(--cat-blue)", bg: "var(--cat-blue-bg)", border: "var(--cat-blue-border)" };
    }
    if (c.includes("cotiz") || c.includes("precio") || c.includes("oferta")) {
      return { slug: "purple", iconName: "award", color: "var(--cat-purple)", bg: "var(--cat-purple-bg)", border: "var(--cat-purple-border)" };
    }
    if (c.includes("logíst") || c.includes("logist") || c.includes("plazo") || c.includes("calendario")) {
      return { slug: "teal", iconName: "truck", color: "var(--cat-teal)", bg: "var(--cat-teal-bg)", border: "var(--cat-teal-border)" };
    }
    if (c.includes("formaliz") || c.includes("pedido") || c.includes("póliza") || c.includes("poliza")) {
      return { slug: "green", iconName: "check", color: "var(--cat-green)", bg: "var(--cat-green-bg)", border: "var(--cat-green-border)" };
    }
    if (c.includes("calidad") || c.includes("ensayo") || c.includes("técnic") || c.includes("tecnic")) {
      return { slug: "rose", iconName: "shield", color: "var(--cat-rose)", bg: "var(--cat-rose-bg)", border: "var(--cat-rose-border)" };
    }
    if (c.includes("convocatoria") || c.includes("coordinación") || c.includes("coordinacion")) {
      return { slug: "gold", iconName: "calendar", color: "var(--cat-gold)", bg: "var(--cat-gold-bg)", border: "var(--cat-gold-border)" };
    }
    return { slug: "slate", iconName: "box", color: "var(--cat-slate)", bg: "var(--cat-slate-bg)", border: "var(--cat-slate-border)" };
  }

  function getNoticeDateScore(n) {
    if (n.timestamp) return n.timestamp;
    const f = (n.fecha || "").toLowerCase();
    const now = Date.now();
    if (f.includes("recién") || f.includes("recien") || f.includes("ahora")) return now;
    if (f.includes("hoy")) {
      const m = f.match(/(\d{1,2}):(\d{2})/);
      if (m) {
        const d = new Date();
        d.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
        return d.getTime();
      }
      return now - 3600000;
    }
    if (f.includes("ayer")) {
      const m = f.match(/(\d{1,2}):(\d{2})/);
      const d = new Date(now - 86400000);
      if (m) {
        d.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
        return d.getTime();
      }
      return d.getTime();
    }
    if (f.includes("jun")) {
      return new Date(2026, 5, 18, 11, 0).getTime();
    }
    return 0;
  }

  function sortNotices(list) {
    if (!avisosSortCol) return list;
    const mult = avisosSortDir === "desc" ? -1 : 1;
    return [...list].sort((a, b) => {
      let valA, valB;
      switch (avisosSortCol) {
        case "tipo":
          valA = a.tagClass || "";
          valB = b.tagClass || "";
          return valA.localeCompare(valB, "es") * mult;
        case "titulo":
          valA = a.titulo || "";
          valB = b.titulo || "";
          return valA.localeCompare(valB, "es") * mult;
        case "expId":
          valA = a.expId || "";
          valB = b.expId || "";
          return valA.localeCompare(valB, "es") * mult;
        case "suministro":
          valA = a.suministro || "";
          valB = b.suministro || "";
          return valA.localeCompare(valB, "es") * mult;
        case "categoria":
          valA = a.categoria || "";
          valB = b.categoria || "";
          return valA.localeCompare(valB, "es") * mult;
        case "fecha":
          valA = getNoticeDateScore(a);
          valB = getNoticeDateScore(b);
          return (valA - valB) * mult;
        default:
          return 0;
      }
    });
  }

  function getAvisosSortIndicator(col) {
    if (avisosSortCol !== col) {
      return `<span class="avisos-sort-icon">↕</span>`;
    }
    return `<span class="avisos-sort-icon is-active">${avisosSortDir === "asc" ? "▲" : "▼"}</span>`;
  }
  let directorioViewMode = "table"; // "table" | "grid"
  let directorioTypeFilter = "all"; // "all" | "proveedores" | "clientes"
  let directorioSearchQuery = "";
  let directorioPrvSortCol = "nombre";
  let directorioPrvSortDir = "asc";
  let directorioCliSortCol = "nombre";
  let directorioCliSortDir = "asc";
  let directorioPopoverEntity = "proveedor"; // "proveedor" | "cliente" (para selector en popover en modo 'all')

  const ALL_DIR_PRV_COL_DEFS = {
    nombre: { id: "nombre", label: "Nombre", minWidth: "160px" },
    cif: { id: "cif", label: "CIF", minWidth: "85px" },
    sede: { id: "sede", label: "Sede", minWidth: "95px" },
    suministros: { id: "suministros", label: "Suministros", minWidth: "125px" },
    activos: { id: "activos", label: "Activos", minWidth: "85px" },
    conformidades: { id: "conformidades", label: "Conformidades", minWidth: "140px" },
    contacto: { id: "contacto", label: "Contacto", minWidth: "155px" }
  };
  const DEFAULT_DIR_PRV_COL_ORDER = ["nombre", "cif", "sede", "suministros", "activos", "conformidades", "contacto"];

  const ALL_DIR_CLI_COL_DEFS = {
    nombre: { id: "nombre", label: "Nombre", minWidth: "160px" },
    cif: { id: "cif", label: "CIF", minWidth: "85px" },
    sede: { id: "sede", label: "Sede", minWidth: "95px" },
    actividad: { id: "actividad", label: "Actividad", minWidth: "140px" },
    activos: { id: "activos", label: "Activos", minWidth: "85px" },
    contacto: { id: "contacto", label: "Contacto", minWidth: "155px" }
  };
  const DEFAULT_DIR_CLI_COL_ORDER = ["nombre", "cif", "sede", "actividad", "activos", "contacto"];

  let dirPrvColOrder = [...DEFAULT_DIR_PRV_COL_ORDER];
  let dirPrvHiddenCols = new Set();
  let dirCliColOrder = [...DEFAULT_DIR_CLI_COL_ORDER];
  let dirCliHiddenCols = new Set();
  let isDirColsMenuOpen = false;

  function loadDirColPrefs() {
    try {
      const prvRaw = localStorage.getItem("sofein_dir_prv_col_prefs_v1");
      if (prvRaw) {
        const parsed = JSON.parse(prvRaw);
        if (Array.isArray(parsed.order)) {
          const validCols = parsed.order.filter(id => ALL_DIR_PRV_COL_DEFS[id]);
          DEFAULT_DIR_PRV_COL_ORDER.forEach(id => {
            if (!validCols.includes(id)) validCols.push(id);
          });
          dirPrvColOrder = validCols;
        }
        if (Array.isArray(parsed.hidden)) {
          dirPrvHiddenCols = new Set(parsed.hidden);
        }
      }
      const cliRaw = localStorage.getItem("sofein_dir_cli_col_prefs_v1");
      if (cliRaw) {
        const parsed = JSON.parse(cliRaw);
        if (Array.isArray(parsed.order)) {
          const validCols = parsed.order.filter(id => ALL_DIR_CLI_COL_DEFS[id]);
          DEFAULT_DIR_CLI_COL_ORDER.forEach(id => {
            if (!validCols.includes(id)) validCols.push(id);
          });
          dirCliColOrder = validCols;
        }
        if (Array.isArray(parsed.hidden)) {
          dirCliHiddenCols = new Set(parsed.hidden);
        }
      }
    } catch (e) {
      // ignore
    }
  }

  function saveDirColPrefs() {
    try {
      localStorage.setItem("sofein_dir_prv_col_prefs_v1", JSON.stringify({
        order: dirPrvColOrder,
        hidden: Array.from(dirPrvHiddenCols)
      }));
      localStorage.setItem("sofein_dir_cli_col_prefs_v1", JSON.stringify({
        order: dirCliColOrder,
        hidden: Array.from(dirCliHiddenCols)
      }));
    } catch (e) {
      // ignore
    }
  }

  let directorioExportSnapshot = null;

  const GENERIC_SUMINISTROS = ["traviesas", "placas", "tirafondos", "clips", "balasto", "otros"];
  const GENERIC_SUMINISTROS_SET = new Set(GENERIC_SUMINISTROS);

  function toGenericSuministro(val) {
    if (!val) return "otros";
    const v = String(val).toLowerCase().trim();
    if (GENERIC_SUMINISTROS_SET.has(v)) return v;
    if (v.includes("traviesa")) return "traviesas";
    if (v.includes("placa")) return "placas";
    if (v.includes("tirafondo")) return "tirafondos";
    if (v.includes("clip") || v.includes("fijaci") || v.includes("sujeci")) return "clips";
    if (v.includes("balasto") || v.includes("arido") || v.includes("grava")) return "balasto";
    return "otros";
  }

  function getGenericSuministrosList(suministrosList) {
    if (!suministrosList || !suministrosList.length) return ["otros"];
    const rawItems = Array.isArray(suministrosList) ? suministrosList : String(suministrosList).split(/[·,]/).map(s => s.trim()).filter(Boolean);
    const set = new Set();
    rawItems.forEach(item => {
      set.add(toGenericSuministro(item));
    });
    return Array.from(set);
  }

  function exportDirectorioCSV() {
    const snap = directorioExportSnapshot;
    if (!snap) {
      showToast("No hay datos disponibles para exportar");
      return;
    }
    const isPrv = snap.typeFilter === "all" || snap.typeFilter === "proveedores";
    const isCli = snap.typeFilter === "all" || snap.typeFilter === "clientes";
    const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [];

    if (isPrv && snap.prvList && snap.prvList.length) {
      if (snap.typeFilter === "all") lines.push(esc("PROVEEDORES"));
      const cols = snap.prvCols;
      const header = cols.map(c => esc((ALL_DIR_PRV_COL_DEFS[c] || { label: c }).label));
      lines.push(header.join(";"));

      snap.prvList.forEach(p => {
        const row = cols.map(colId => {
          switch (colId) {
            case "nombre": return esc(p.nombre);
            case "cif": return esc(p.cif);
            case "sede": return esc(p.sede);
            case "suministros": return esc(getGenericSuministrosList(p.suministros || [p.materiales]).join(", "));
            case "activos": return esc(getProveedorActiveExpedientes(p.nombre).map(e => e.id).join(", "));
            case "conformidades": return esc((p.conformidades || p.homologaciones || []).join(", "));
            case "contacto": return esc([p.email || p.contacto, p.telefono].filter(Boolean).join(" | "));
            default: return esc(p[colId] || "");
          }
        });
        lines.push(row.join(";"));
      });
    }

    if (isCli && snap.cliList && snap.cliList.length) {
      if (lines.length) lines.push("");
      if (snap.typeFilter === "all") lines.push(esc("CLIENTES"));
      const cols = snap.cliCols;
      const header = cols.map(c => esc((ALL_DIR_CLI_COL_DEFS[c] || { label: c }).label));
      lines.push(header.join(";"));

      snap.cliList.forEach(c => {
        const row = cols.map(colId => {
          switch (colId) {
            case "nombre": return esc(c.nombre);
            case "cif": return esc(c.cif);
            case "sede": return esc(c.sede);
            case "actividad": return esc(c.actividad || "");
            case "activos": return esc(getClienteActiveExpedientes(c.nombre).map(e => e.id).join(", "));
            case "contacto": return esc([c.email || c.contacto, c.telefono].filter(Boolean).join(" | "));
            default: return esc(c[colId] || "");
          }
        });
        lines.push(row.join(";"));
      });
    }

    if (!lines.length) {
      showToast("No hay registros visibles para exportar");
      return;
    }

    const filename = snap.typeFilter === "proveedores" 
      ? "proveedores-sofein.csv" 
      : (snap.typeFilter === "clientes" ? "clientes-sofein.csv" : "clientes-y-proveedores-sofein.csv");

    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    const totalCount = (isPrv ? snap.prvList.length : 0) + (isCli ? snap.cliList.length : 0);
    showToast(`✓ Exportados ${totalCount} registros a Excel (${filename})`);
  }

  function getProveedorActiveExpedientes(prvName) {
    if (!prvName) return [];
    const query = prvName.toLowerCase().trim();
    return EXPEDIENTES.filter(e => {
      if (e.proveedor && (e.proveedor.toLowerCase().includes(query) || query.includes(e.proveedor.toLowerCase()))) return true;
      if (e.matching && e.matching.proveedorAdjudicado && (e.matching.proveedorAdjudicado.toLowerCase().includes(query) || query.includes(e.matching.proveedorAdjudicado.toLowerCase()))) return true;
      return false;
    }).map(e => ({
      id: e.id,
      titulo: e.tituloGenerico || e.producto,
      subtipo: e.subtipo || e.producto,
      unidades: e.unidades || "",
      fase: typeof e.faseActual === "number" ? e.faseActual : 0,
      cliente: e.cliente || "Constructor",
      presupuesto: e.presupuestoTotal || ""
    }));
  }

  function getClienteActiveExpedientes(cliName) {
    if (!cliName) return [];
    const query = cliName.toLowerCase().trim();
    const basePrv = query.split(",")[0].trim();
    return EXPEDIENTES.filter(e => {
      if (!e.cliente) return false;
      const c = e.cliente.toLowerCase();
      const baseExp = c.split(",")[0].trim();
      return c.includes(query) || query.includes(c) || c.includes(basePrv) || baseExp.includes(basePrv);
    }).map(e => ({
      id: e.id,
      titulo: e.tituloGenerico || e.producto,
      subtipo: e.subtipo || e.producto,
      unidades: e.unidades || "",
      fase: typeof e.faseActual === "number" ? e.faseActual : 0,
      proveedor: e.proveedor || (e.matching && e.matching.proveedorAdjudicado) || "En preselección",
      presupuesto: e.presupuestoTotal || ""
    }));
  }

  function getDirectorioSortIcon(col, currentCol, currentDir) {
    if (col !== currentCol) {
      return `<span class="th-sort-icon">${icon("arrowsSort", 12)}</span>`;
    }
    return `<span class="th-sort-icon is-active">${currentDir === "asc" ? icon("arrowUp", 12) : icon("arrowDown", 12)}</span>`;
  }

  function renderProveedorActivosCell(p, rowIndex, totalRows) {
    const activos = getProveedorActiveExpedientes(p.nombre);
    if (!activos.length) {
      return `<span style="color:var(--entity-faint);font-size:0.75rem">— Sin activos —</span>`;
    }
    const isUpward = rowIndex >= totalRows - 2 && totalRows > 3;
    return `
      <div class="dir-popover-wrapper">
        <span class="dossier-chip is-active-chip dir-popover-trigger" tabindex="0">
          ${icon("box", 12)} <b>${activos.length}</b> ${activos.length === 1 ? 'activo' : 'activos'}
        </span>
        <div class="dir-hover-popover ${isUpward ? 'dir-popover-up' : ''}">
          <div class="dir-popover-head">
            <strong>Suministros en expedientes en curso</strong>
            <span class="dossier-chip">${activos.length} activos</span>
          </div>
          <div class="dir-popover-list">
            ${activos.map(exp => `
              <div class="dir-popover-item">
                <div class="dir-popover-item-top">
                  <span class="entity-code" style="font-size:0.72rem">${exp.id}</span>
                  <span class="entity-status-badge phase-${exp.fase}" style="font-size:0.65rem;padding:2px 6px">${SHORT_PHASE_NAMES[exp.fase] || ('Fase ' + exp.fase)}</span>
                </div>
                <div class="dir-popover-item-title">${exp.titulo}</div>
                <div class="dir-popover-item-sub">${exp.unidades || exp.subtipo}</div>
                <div class="dir-popover-item-footer">
                  <small style="color:var(--entity-muted)">Cliente: ${exp.cliente}</small>
                  <a href="#admin/expedientes/${exp.id}" class="dir-link-action" data-go="#admin/expedientes/${exp.id}">
                    Ver expediente ${icon("arrow", 11)}
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderClienteActivosCell(c, rowIndex, totalRows) {
    const activos = getClienteActiveExpedientes(c.nombre);
    if (!activos.length) {
      return `<span style="color:var(--entity-faint);font-size:0.75rem">— Sin activos —</span>`;
    }
    const isUpward = rowIndex >= totalRows - 2 && totalRows > 3;
    return `
      <div class="dir-popover-wrapper">
        <span class="dossier-chip is-active-chip dir-popover-trigger" tabindex="0">
          ${icon("folder", 12)} <b>${activos.length}</b> ${activos.length === 1 ? 'activo' : 'activos'}
        </span>
        <div class="dir-hover-popover ${isUpward ? 'dir-popover-up' : ''}">
          <div class="dir-popover-head">
            <strong>Expedientes en curso</strong>
            <span class="dossier-chip">${activos.length} activos</span>
          </div>
          <div class="dir-popover-list">
            ${activos.map(exp => `
              <div class="dir-popover-item">
                <div class="dir-popover-item-top">
                  <span class="entity-code" style="font-size:0.72rem">${exp.id}</span>
                  <span class="entity-status-badge phase-${exp.fase}" style="font-size:0.65rem;padding:2px 6px">${SHORT_PHASE_NAMES[exp.fase] || ('Fase ' + exp.fase)}</span>
                </div>
                <div class="dir-popover-item-title">${exp.titulo}</div>
                <div class="dir-popover-item-sub">${exp.subtipo || exp.unidades}</div>
                <div class="dir-popover-item-footer">
                  <small style="color:var(--entity-muted)">Proveedor: ${exp.proveedor}</small>
                  <a href="#admin/expedientes/${exp.id}" class="dir-link-action" data-go="#admin/expedientes/${exp.id}">
                    Ver expediente ${icon("arrow", 11)}
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderSuministrosTags(suministrosList) {
    const items = getGenericSuministrosList(suministrosList);
    if (!items.length) return `<span style="color:var(--entity-faint);font-size:0.75rem">—</span>`;
    return `
      <div class="dir-tags-wrap">
        ${items.map(s => `<span class="dir-tag dir-tag-sum">${s}</span>`).join("")}
      </div>
    `;
  }

  function renderConformidadesTags(conformidadesList) {
    if (!conformidadesList || !conformidadesList.length) return `<span style="color:var(--entity-faint);font-size:0.75rem">—</span>`;
    const items = Array.isArray(conformidadesList) ? conformidadesList : conformidadesList.split(/[·,]/).map(c => c.trim()).filter(Boolean);
    return `
      <div class="dir-tags-wrap">
        ${items.map(c => {
          const cl = c.toLowerCase();
          let tagClass = "";
          if (cl.includes("tratamiento") || cl.includes("creosota") || cl.includes("autoclave")) tagClass = "dir-tag-treatment";
          else if (cl.includes("iso") || cl.includes("ce") || cl.includes("aenor") || cl.includes("en ") || cl.includes("nav-") || cl.includes("tipo 1")) tagClass = "dir-tag-iso";
          return `<span class="dir-tag ${tagClass}">${c}</span>`;
        }).join("")}
      </div>
    `;
  }

  function renderEmailCell(email) {
    if (!email) return `<span style="color:var(--entity-faint);font-size:0.72rem">—</span>`;
    return `<a href="mailto:${email}" class="dir-contact-link" title="${email}" style="font-size:0.72rem;display:inline-flex;align-items:center;gap:4px;max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${icon("mail", 12)} <span>${email}</span></a>`;
  }

  function renderTelefonoCell(tel) {
    if (!tel) return `<span style="color:var(--entity-faint);font-size:0.72rem">—</span>`;
    const cleanTel = tel.replace(/[^+\d]/g, "");
    return `<a href="tel:${cleanTel}" class="dir-contact-link" style="font-size:0.72rem;display:inline-flex;align-items:center;gap:4px;white-space:nowrap">${icon("phone", 12)} <span>${tel}</span></a>`;
  }
  let previousRouteKey = null;
  let suministroRowCount = 1;
  let docScopeMode = "phase"; // "phase" | "all"
  let commsPhaseScope = "all"; // "phase" | "all"
  let commsSumScope = "all"; // "current" | "all"
  let profileCollapseState = {
    prvFicha: true,
    prvCatalog: true,
    prvCerts: true,
    prvSums: true,
    cliFicha: true,
    cliParams: true,
    cliCerts: true,
    cliExps: true
  };
  let dossierCollapseState = {
    suministros: true,
    changesLog: true,
    passportClosure: true
  };
  let docStatusFilter = "all"; // "all" | "complete" | "review" | "pending" | "rejected"
  let expKpiFilter = "all"; // "all" | "activos" | "accion_pendiente" | "completados" | "cerrados"
  let expBandejaCollapseState = {
    activos: true,
    completados: false,
    cerrados: false
  };
  let expCardFilters = {
    fase: "all",
    cliente: "all",
    destino: "all",
    entrega: "all",
    presupuesto: "all"
  };

  /* ---------- Helpers de Vista de Expedientes ---------- */
  let activeDossierSuministroId = null;
  let pendingDossierSumFocus = false;
  let lastAppliedSumIdHash = null;
  let lastAppliedTabHash = null;
  let lastAppliedPhaseHash = null;
  let lastAppliedDirHash = null;

  const SHORT_PHASE_NAMES = [
    "Alcance",
    "Proveedores",
    "Gestión del pedido",
    "Cierre"
  ];
  const EXP_GENERIC_META = {
    "SFN-2026-H6T4": {
      tituloGenerico: "Superestructura y armamento de vía — Ramal Factoría VW",
      numSuministros: 3,
      destinoCorto: "Factoría Volkswagen · Conexión Red Adif",
      proximaEntregaFecha: "14 oct 2026",
      proximaEntregaDiff: "-6 días (retraso)",
      proximaEntregaTone: "overdue",
      forcePendingAction: true
    },
    "SFN-2026-K9M2": {
      tituloGenerico: "Renovación de carril y sujeción — Línea 4 Metro Bilbao",
      numSuministros: 2,
      destinoCorto: "Consorcio Transportes Bizkaia (Línea 4)",
      proximaEntregaFecha: "04 nov 2026",
      proximaEntregaDiff: "En 15 días",
      proximaEntregaTone: "ontime",
      forcePendingAction: true
    },
    "SFN-2026-W4P7": {
      tituloGenerico: "Suministro de traviesas y aparatos — Tramo Medina del Campo",
      numSuministros: 3,
      destinoCorto: "ADIF Red Convencional (Medina del Campo)",
      proximaEntregaFecha: "25 oct 2026",
      proximaEntregaDiff: "En 5 días",
      proximaEntregaTone: "soon",
      forcePendingAction: false
    },
    "SFN-2026-B3R8": {
      tituloGenerico: "Sistemas de fijación elástica y placas — Tramo Terrassa-Sabadell",
      numSuministros: 2,
      destinoCorto: "FGC Infraestructures (Terrassa - Sabadell)",
      proximaEntregaFecha: "18 oct 2026",
      proximaEntregaDiff: "Entregado (hace 2d)",
      proximaEntregaTone: "done",
      isFinalizado: true,
      forcePendingAction: false
    },
    "SFN-2026-D8J5": {
      tituloGenerico: "Lote de clavazón y fijación metálica — Miranda de Ebro",
      numSuministros: 2,
      destinoCorto: "ADIF Red Convencional (Miranda de Ebro)",
      proximaEntregaFecha: "29 abr 2026",
      proximaEntregaDiff: "Entregado (en plazo)",
      proximaEntregaTone: "done",
      forcePendingAction: false
    }
  };

  function parseBudgetNumber(str = "") {
    const digits = String(str).replace(/[^\d]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  }

  /* ---------- Alcance de expedientes y suministros por perfil ---------- */
  function isSuministroOfActiveProveedor(s) {
    return !!s.proveedor && s.proveedor.toLowerCase().includes("iberrail");
  }

  function isExpOfActiveCliente(exp) {
    return exp.cliente === PLAYERS.cliente.entity;
  }

  // Cliente: solo sus expedientes · Proveedor: solo expedientes con ≥1 suministro adjudicado a él
  function getExpedientesForRole(role) {
    if (role === "cliente") {
      return EXPEDIENTES.filter(isExpOfActiveCliente);
    }
    if (role === "proveedor") {
      return EXPEDIENTES.filter(exp => SUMINISTROS.some(s => s.expId === exp.id && isSuministroOfActiveProveedor(s)));
    }
    return EXPEDIENTES;
  }

  // Suministros del expediente relevantes para el perfil (proveedor: solo los adjudicados a él)
  function getExpSuministrosForRole(exp, role) {
    const all = SUMINISTROS.filter(s => s.expId === exp.id);
    if (role === "proveedor") return all.filter(isSuministroOfActiveProveedor);
    return all;
  }

  // Entregables de las fases ya alcanzadas (las futuras aún no son accionables)
  function getReachedDeliverables(exp) {
    const out = [];
    Object.keys(exp.deliverables || {}).forEach(k => {
      if (Number(k) <= exp.faseActual) out.push(...(exp.deliverables[k] || []));
    });
    return out;
  }

  // Acciones pendientes que competen exclusivamente al perfil indicado
  function hasExpPendingActionForRole(exp, role = "admin") {
    if (role === "cliente") {
      const incPendienteFirma = (exp.incidencias || []).some(i => !i.adendaId && !i.firmaCliente && i.firmaSofein);
      const docsPendientes = getReachedDeliverables(exp).some(d => d.owner === "Cliente" && d.state !== "complete");
      const matchingPendiente = SUMINISTROS.some(s => s.expId === exp.id && s.matching && (
        (s.matching.faseSelector === "seleccion_cliente" && !s.matching.seleccionClienteEnviada) ||
        (s.matching.faseSelector === "comparativa" && !s.matching.adjudicacionConfirmadaCliente)
      ));
      return incPendienteFirma || docsPendientes || matchingPendiente;
    }
    if (role === "proveedor") {
      const incPendienteFirma = (exp.incidencias || []).some(i => !i.adendaId && !i.firmaProveedor && i.firmaSofein);
      const docsPendientes = getReachedDeliverables(exp).some(d => d.owner === "Proveedor" && (d.state === "pending" || d.state === "rejected"));
      const sumConAcciones = getExpSuministrosForRole(exp, "proveedor").some(s => (s.accionesPendientes || 0) > 0);
      return incPendienteFirma || docsPendientes || sumConAcciones;
    }
    const preset = EXP_GENERIC_META[exp.id] || {};
    const hasOpenInc = (exp.incidencias || []).some(i => !i.adendaId);
    return preset.forcePendingAction !== undefined
      ? preset.forcePendingAction
      : (exp.estado === "pending_validation" || hasOpenInc || exp.faseActual === 1);
  }

  function getExpVisualMeta(exp, role = "admin") {
    const preset = EXP_GENERIC_META[exp.id] || {};
    const isClosed = !!exp.cerrado;
    const isCompleted = !isClosed && (!!preset.isFinalizado || !!exp.finalizado || exp.faseActual >= 3);
    const hasPendingAction = !isClosed && !isCompleted && hasExpPendingActionForRole(exp, role);

    let kpiGroup = "activos";
    if (isClosed) {
      kpiGroup = "cerrados";
    } else if (isCompleted) {
      kpiGroup = "completados";
    }

    let estadoKey = "activo";
    let estadoLabel = "Activo";
    let estadoDotClass = "is-active";
    if (isClosed) {
      estadoKey = "cerrado";
      estadoLabel = "Cerrado";
      estadoDotClass = "is-closed";
    } else if (isCompleted) {
      estadoKey = "completado";
      estadoLabel = "Completado";
      estadoDotClass = "is-completed";
    } else if (hasPendingAction) {
      estadoKey = "accion_pendiente";
      estadoLabel = "Acción pendiente";
      estadoDotClass = "is-pending-pulse";
    }

    const totalPhases = PHASES.length; // 7
    const currentStep = isClosed ? totalPhases : (exp.faseActual + 1);
    const shortPhase = SHORT_PHASE_NAMES[exp.faseActual] || PHASES[exp.faseActual]?.name || "En curso";

    const tituloGenerico = exp.tituloGenerico || preset.tituloGenerico || `Suministro ferroviario — ${exp.destinatarioFinal.split("(")[0].trim()}`;
    const numSuministros = exp.numSuministros || preset.numSuministros || 2;
    const proximaEntregaFecha = exp.proximaEntregaFecha || preset.proximaEntregaFecha || "02 nov 2026";
    const proximaEntregaDiff = exp.proximaEntregaDiff || preset.proximaEntregaDiff || "En 13 días";
    const proximaEntregaTone = exp.proximaEntregaTone || preset.proximaEntregaTone || "ontime";
    const cardSuministros = getExpSuministrosForRole(exp, role);
    const presupuestoVal = role === "proveedor"
      ? formatSuministrosBudgetSum(cardSuministros, exp.presupuestoTotal)
      : exp.presupuestoTotal;
    const budgetNum = parseBudgetNumber(presupuestoVal);
    const budgetRange = budgetNum < 200000 ? "low" : budgetNum <= 500000 ? "mid" : "high";

    return {
      isClosed,
      isCompleted,
      hasPendingAction,
      kpiGroup,
      estadoKey,
      estadoLabel,
      estadoDotClass,
      totalPhases,
      currentStep,
      shortPhase,
      tituloGenerico,
      numSuministros,
      proximaEntregaFecha,
      proximaEntregaDiff,
      proximaEntregaTone,
      budgetRange,
      presupuesto: presupuestoVal
    };
  }

  function renderVisualExpCard(exp, role = "admin") {
    const v = getExpVisualMeta(exp, role);
    const goTarget = `#${role}/expedientes/${exp.id}`;

    // Suministros relevantes para el perfil (proveedor: solo los adjudicados a él)
    const cardSuministros = getExpSuministrosForRole(exp, role);
    const sumCount = cardSuministros.length || v.numSuministros;
    const sumLabel = role === "proveedor"
      ? `${sumCount} ${sumCount === 1 ? "suministro adjudicado" : "suministros adjudicados"}`
      : `${sumCount} ${sumCount === 1 ? "suministro" : "suministros"}`;
    function buildSumInfoTooltip(extraClass = "") {
      if (cardSuministros.length <= 1) return "";
      return `
        <span class="exp-sum-info ${extraClass}" data-exp-sum-info tabindex="0" role="button" aria-label="Ver fases por suministro">
          ${icon("info", 13)}
          <span class="exp-sum-tooltip" role="tooltip">
            <span class="exp-sum-tooltip-head">Fases por suministro</span>
            ${cardSuministros.map(s => {
              const step = Math.min(s.faseActual + 1, PHASES.length);
              const phaseName = SHORT_PHASE_NAMES[s.faseActual] || PHASES[s.faseActual]?.name || "En curso";
              return `
                <span class="exp-sum-tooltip-row">
                  <span class="exp-sum-tooltip-name" title="${s.tipo}">${s.num ? `<b>${s.num}</b> · ` : ""}${s.tipo}</span>
                  <span class="exp-sum-tooltip-phase phase-tone-${step}">${step}/${PHASES.length} · ${phaseName}</span>
                </span>
              `;
            }).join("")}
          </span>
        </span>
      `;
    }
    const sumInfoHTML = buildSumInfoTooltip();
    const phaseInfoHTML = buildSumInfoTooltip("is-phase-info");

    // Mini gráfico minimalista de fases (ej. 4/7)
    const miniBarsHTML = PHASES.map((p, idx) => {
      const isDone = idx < exp.faseActual || v.isClosed || v.isCompleted;
      const isCurrent = !v.isClosed && !v.isCompleted && idx === exp.faseActual;
      return `<i class="exp-v2-bar ${isDone ? "is-done" : isCurrent ? "is-current" : ""}" title="${p.name}"></i>`;
    }).join("");

    return `
      <article class="admin-exp-card exp-v2-card ${v.hasPendingAction ? "has-pending-action" : ""}" data-go="${goTarget}" style="cursor:pointer">
        <!-- Fila 1: Puntito de estado + Código + Fase en 1 fila sin fondo ni borde y tono progresivo -->
        <div class="exp-v2-top">
          <div class="exp-v2-identity">
            <i class="exp-v2-dot ${v.estadoDotClass}" title="${v.estadoLabel}" aria-label="${v.estadoLabel}"></i>
            <span class="exp-v2-code">${exp.id}</span>
          </div>

          <div class="exp-v2-phase-row phase-tone-${v.currentStep}" title="Fase ${v.currentStep} de ${v.totalPhases}: ${v.shortPhase}">
            <span class="exp-v2-phase-num">${v.currentStep}/${v.totalPhases}</span>
            <span class="exp-v2-phase-name">${v.shortPhase}</span>
            <div class="exp-v2-minichart" aria-label="Fase ${v.currentStep} de ${v.totalPhases}">
              ${miniBarsHTML}
            </div>
            ${phaseInfoHTML}
          </div>
        </div>

        <!-- Fila 2: Título genérico de expediente (tamaño reducido) -->
        <h3 class="exp-v2-title">${v.tituloGenerico}</h3>

        <!-- Fila 3: Datos estructurados -->
        <div class="exp-v2-data-grid">
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Suministros</span>
            <span class="exp-v2-sum-wrap">
              <strong class="exp-v2-val">${sumLabel}</strong>
              ${sumInfoHTML}
            </span>
          </div>
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Cliente</span>
            <strong class="exp-v2-val" title="${exp.cliente}">${exp.cliente}</strong>
          </div>
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Destino</span>
            <strong class="exp-v2-val" title="${exp.destinatarioFinal}">${exp.destinatarioFinal}</strong>
          </div>
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Presupuesto est.</span>
            <strong class="exp-v2-val">${v.presupuesto}</strong>
          </div>
          <div class="exp-v2-data-row is-delivery">
            <span class="exp-v2-label">Próxima entrega</span>
            <div class="exp-v2-delivery-wrap">
              <strong class="exp-v2-delivery-date">${v.proximaEntregaFecha}</strong>
              <span class="exp-v2-delivery-diff is-${v.proximaEntregaTone}">${v.proximaEntregaDiff}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderExpedientesBandejaVisual(role, roleExpedientes) {
    // 1. Calcular contadores de los 4 KPIs sobre la lista del rol
    const enriched = roleExpedientes.map(exp => ({ exp, meta: getExpVisualMeta(exp, role) }));
    const countActivos = enriched.filter(x => x.meta.kpiGroup === "activos").length;
    const countAccionPendiente = enriched.filter(x => x.meta.hasPendingAction).length;
    const countCompletados = enriched.filter(x => x.meta.kpiGroup === "completados").length;
    const countCerrados = enriched.filter(x => x.meta.kpiGroup === "cerrados").length;

    // Opciones dinámicas para los filtros de datos de la tarjeta
    const uniqueClientes = Array.from(new Set(roleExpedientes.map(e => e.cliente)));
    const uniqueDestinos = Array.from(new Set(roleExpedientes.map(e => e.destinatarioFinal)));

    // 2. Filtrar según búsqueda y selectores de datos de tarjeta
    const q = expSearchQuery.trim().toLowerCase();
    const matchesSearchAndSelects = ({ exp, meta }) => {
      if (q) {
        const haystack = `${exp.id} ${meta.tituloGenerico} ${exp.producto} ${exp.cliente} ${exp.destinatarioFinal} ${meta.presupuesto} ${meta.shortPhase} ${meta.proximaEntregaFecha}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (expCardFilters.fase !== "all" && String(exp.faseActual) !== expCardFilters.fase) return false;
      if (expCardFilters.cliente !== "all" && exp.cliente !== expCardFilters.cliente) return false;
      if (expCardFilters.destino !== "all" && exp.destinatarioFinal !== expCardFilters.destino) return false;
      if (expCardFilters.entrega !== "all" && meta.proximaEntregaTone !== expCardFilters.entrega) return false;
      if (expCardFilters.presupuesto !== "all" && meta.budgetRange !== expCardFilters.presupuesto) return false;
      return true;
    };

    const filteredAll = enriched.filter(matchesSearchAndSelects);

    // Separar en activos vs completados (finalizados) vs cerrados
    let activeItems = filteredAll.filter(x => x.meta.kpiGroup === "activos");
    const completedItems = filteredAll.filter(x => x.meta.kpiGroup === "completados");
    const closedItems = filteredAll.filter(x => x.meta.kpiGroup === "cerrados");

    if (expKpiFilter === "accion_pendiente") {
      activeItems = activeItems.filter(x => x.meta.hasPendingAction);
    }

    const hasActiveFilters =
      expKpiFilter !== "all" ||
      expSearchQuery.trim() !== "" ||
      Object.values(expCardFilters).some(v => v !== "all");

    // Tarjetas principales a mostrar según KPI seleccionado
    let mainListToRender = activeItems;
    let mainSectionNotice = "";
    if (expKpiFilter === "completados") {
      mainListToRender = completedItems;
      mainSectionNotice = `<div class="exp-filter-banner">Mostrando expedientes <b>Completados (${completedItems.length})</b> · <button type="button" class="admin-quiet-button" data-reset-exp-filters style="padding:2px 8px;font-size:0.72rem">Ver todos</button></div>`;
    } else if (expKpiFilter === "cerrados") {
      mainListToRender = closedItems;
      mainSectionNotice = `<div class="exp-filter-banner">Mostrando expedientes <b>Cerrados (${closedItems.length})</b> · <button type="button" class="admin-quiet-button" data-reset-exp-filters style="padding:2px 8px;font-size:0.72rem">Ver todos</button></div>`;
    } else if (expKpiFilter === "accion_pendiente") {
      mainSectionNotice = `<div class="exp-filter-banner is-warning">Filtrando por <b>Acción pendiente (${activeItems.length})</b> · <button type="button" class="admin-quiet-button" data-reset-exp-filters style="padding:2px 8px;font-size:0.72rem">Quitar filtro</button></div>`;
    } else if (expKpiFilter === "activos") {
      mainSectionNotice = `<div class="exp-filter-banner">Filtrando por <b>Expedientes activos (${activeItems.length})</b> · <button type="button" class="admin-quiet-button" data-reset-exp-filters style="padding:2px 8px;font-size:0.72rem">Quitar filtro</button></div>`;
    }

    const mainCardsHTML = mainListToRender.length
      ? mainListToRender.map(x => renderVisualExpCard(x.exp, role)).join("")
      : `<div style="grid-column:1/-1;padding:38px 24px;text-align:center;color:var(--entity-muted);background:var(--entity-panel);border-radius:10px;border:1px solid var(--entity-line)">No hay expedientes en este bloque con los filtros actuales.</div>`;

    const completedCardsHTML = completedItems.length
      ? completedItems.map(x => renderVisualExpCard(x.exp, role)).join("")
      : `<div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--entity-muted)">Ningún expediente finalizado coincide con el filtro.</div>`;

    const closedCardsHTML = closedItems.length
      ? closedItems.map(x => renderVisualExpCard(x.exp, role)).join("")
      : `<div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--entity-muted)">Ningún expediente cerrado coincide con el filtro.</div>`;

    const pageTitle = role === "admin" ? "Expedientes" : "Mis expedientes";
    const createBtnHTML = role === "admin"
      ? `<button class="admin-primary-button" type="button" data-go="#admin/nuevo">${icon("plus", 16)} Crear Expediente</button>`
      : role === "cliente"
        ? `<button class="admin-primary-button" type="button" data-go="#cliente/nuevo">${icon("plus", 16)} Nuevo expediente</button>`
        : "";

    return `
      <div class="admin-view-head exp-head-clean">
        <div>
          <h1>${pageTitle}</h1>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          ${createBtnHTML}
        </div>
      </div>

      <!-- Mini Resumen de KPIs (Funciona también como filtro clicable en los 3 usuarios) -->
      <div class="entity-scope-strip exp-kpi-strip" role="region" aria-label="Resumen y filtro por estado de expediente">
        <button type="button" class="entity-scope-pill exp-kpi-btn ${expKpiFilter === "activos" ? "is-active" : ""}" data-exp-kpi="activos">
          <span class="scope-dot active"></span>
          <span><b>${countActivos}</b> Activos</span>
        </button>
        <button type="button" class="entity-scope-pill exp-kpi-btn ${expKpiFilter === "accion_pendiente" ? "is-active" : ""}" data-exp-kpi="accion_pendiente">
          <span class="scope-dot is-pending-pulse"></span>
          <span><b>${countAccionPendiente}</b> Acción pendiente</span>
        </button>
        <button type="button" class="entity-scope-pill exp-kpi-btn ${expKpiFilter === "completados" ? "is-active" : ""}" data-exp-kpi="completados">
          <span class="scope-dot info"></span>
          <span><b>${countCompletados}</b> Completados</span>
        </button>
        <button type="button" class="entity-scope-pill exp-kpi-btn ${expKpiFilter === "cerrados" ? "is-active" : ""}" data-exp-kpi="cerrados">
          <span class="scope-dot closed"></span>
          <span><b>${countCerrados}</b> Cerrados</span>
        </button>
        ${expKpiFilter !== "all" ? `
          <button type="button" class="exp-kpi-reset-link" data-reset-exp-filters>
            ${icon("x", 12)} Mostrar todos
          </button>
        ` : ""}
      </div>

      <!-- Barra de búsqueda + Filtros en una sola fila (solo con su título) -->
      <div class="exp-toolbar-row">
        <div class="exp-search-wrapper is-compact">
          ${icon("search", 15)}
          <input type="search" class="exp-search-input" id="expSearchInput" placeholder="Buscar expediente..." value="${expSearchQuery}">
          ${expSearchQuery ? `<button class="admin-quiet-button" type="button" id="clearExpSearchBtn" style="padding:2px 6px">${icon("x", 13)}</button>` : ""}
        </div>

        <div class="exp-card-filters">
          <select class="exp-filter-select ${expCardFilters.fase !== "all" ? "is-filtered" : ""}" data-exp-card-filter="fase" aria-label="Fase">
            <option value="all" ${expCardFilters.fase === "all" ? "selected" : ""}>Fase</option>
            ${PHASES.map((p, idx) => `<option value="${idx}" ${expCardFilters.fase === String(idx) ? "selected" : ""}>${idx + 1}/${PHASES.length} · ${SHORT_PHASE_NAMES[idx]}</option>`).join("")}
          </select>

          <select class="exp-filter-select ${expCardFilters.cliente !== "all" ? "is-filtered" : ""}" data-exp-card-filter="cliente" aria-label="Cliente">
            <option value="all" ${expCardFilters.cliente === "all" ? "selected" : ""}>Cliente</option>
            ${uniqueClientes.map(c => `<option value="${c}" ${expCardFilters.cliente === c ? "selected" : ""}>${c}</option>`).join("")}
          </select>

          <select class="exp-filter-select ${expCardFilters.destino !== "all" ? "is-filtered" : ""}" data-exp-card-filter="destino" aria-label="Destino">
            <option value="all" ${expCardFilters.destino === "all" ? "selected" : ""}>Destino</option>
            ${uniqueDestinos.map(d => `<option value="${d}" ${expCardFilters.destino === d ? "selected" : ""}>${d}</option>`).join("")}
          </select>

          <select class="exp-filter-select ${expCardFilters.presupuesto !== "all" ? "is-filtered" : ""}" data-exp-card-filter="presupuesto" aria-label="Presupuesto estimado">
            <option value="all" ${expCardFilters.presupuesto === "all" ? "selected" : ""}>Presupuesto</option>
            <option value="low" ${expCardFilters.presupuesto === "low" ? "selected" : ""}>&lt; 200.000 €</option>
            <option value="mid" ${expCardFilters.presupuesto === "mid" ? "selected" : ""}>200.000 € - 500.000 €</option>
            <option value="high" ${expCardFilters.presupuesto === "high" ? "selected" : ""}>&gt; 500.000 €</option>
          </select>

          <select class="exp-filter-select ${expCardFilters.entrega !== "all" ? "is-filtered" : ""}" data-exp-card-filter="entrega" aria-label="Próxima entrega">
            <option value="all" ${expCardFilters.entrega === "all" ? "selected" : ""}>Próxima entrega</option>
            <option value="overdue" ${expCardFilters.entrega === "overdue" ? "selected" : ""}>Con retraso</option>
            <option value="soon" ${expCardFilters.entrega === "soon" ? "selected" : ""}>Próxima (&lt; 7 días)</option>
            <option value="ontime" ${expCardFilters.entrega === "ontime" ? "selected" : ""}>En plazo</option>
            <option value="done" ${expCardFilters.entrega === "done" ? "selected" : ""}>Entregado</option>
          </select>

          ${hasActiveFilters ? `
            <button type="button" class="admin-quiet-button exp-clear-filters-btn" data-reset-exp-filters title="Limpiar filtros">
              ${icon("x", 12)}
            </button>
          ` : ""}
        </div>
      </div>

      <hr class="dossier-section-divider is-subtle" />

      ${mainSectionNotice}

      <!-- Rejilla principal de expedientes activos (desplegable limpio, abierto por defecto y sin caja exterior) -->
      <details class="exp-collapsible-details exp-collapsible-clean" data-exp-collapse="activos" ${expBandejaCollapseState.activos !== false ? "open" : ""}>
        <summary>
          <div class="exp-collapsible-summary-left">
            <span class="scope-dot active"></span>
            <strong>${expKpiFilter === "completados" ? `Expedientes finalizados (${completedItems.length})` : expKpiFilter === "cerrados" ? `Expedientes cerrados (${closedItems.length})` : `Expedientes activos (${activeItems.length})`}</strong>
          </div>
          <span class="exp-collapsible-toggle-text">${icon("chevronDown", 14)}</span>
        </summary>
        <div class="exp-collapsible-content">
          <div class="admin-exp-list">
            ${mainCardsHTML}
          </div>
        </div>
      </details>

      <hr class="dossier-section-divider is-subtle" style="margin: 18px 0 14px" />

      <!-- Dos desplegables inferiores: Expedientes finalizados y Expedientes cerrados -->
      <div class="exp-bottom-collapsibles">
        <details class="exp-collapsible-details" data-exp-collapse="completados" ${expKpiFilter === "completados" || expBandejaCollapseState.completados ? "open" : ""}>
          <summary>
            <div class="exp-collapsible-summary-left">
              <span class="scope-dot info"></span>
              <strong>Expedientes finalizados (${completedItems.length})</strong>
            </div>
            <span class="exp-collapsible-toggle-text">${icon("chevronDown", 14)}</span>
          </summary>
          <div class="exp-collapsible-content">
            <div class="admin-exp-list">
              ${completedCardsHTML}
            </div>
          </div>
        </details>

        <details class="exp-collapsible-details" data-exp-collapse="cerrados" ${expKpiFilter === "cerrados" || expBandejaCollapseState.cerrados ? "open" : ""}>
          <summary>
            <div class="exp-collapsible-summary-left">
              <span class="scope-dot closed"></span>
              <strong>Expedientes cerrados (${closedItems.length})</strong>
            </div>
            <span class="exp-collapsible-toggle-text">${icon("chevronDown", 14)}</span>
          </summary>
          <div class="exp-collapsible-content">
            <div class="admin-exp-list">
              ${closedCardsHTML}
            </div>
          </div>
        </details>
      </div>
    `;
  }

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    if (!raw) {
      activeRole = "admin";
      activeSection = "expedientes";
      activeParam = null;
      return;
    }
    const [pathPart, queryPart] = raw.split("?");
    selectorSumParam = null;
    if (queryPart) {
      const qParams = new URLSearchParams(queryPart);
      selectorSumParam = qParams.get("sum");
      const tabParam = qParams.get("tab");
      if (tabParam && location.hash !== lastAppliedTabHash) {
        lastAppliedTabHash = location.hash;
        const tabAliases = {
          overview: "deliverables",
          documentacion: "deliverables",
          deliverables: "deliverables",
          incidents: "incidents",
          registro: "incidents",
          comms: "comms",
          avisos: "comms",
          history: "history",
          historial: "history",
          passport: "passport",
          pasaporte: "passport",
          notes: "notes",
          anotaciones: "notes"
        };
        activeDossierTab = tabAliases[tabParam] || "deliverables";
      } else if (!tabParam) {
        lastAppliedTabHash = null;
      }

      const phaseParam = qParams.get("phase");
      if (phaseParam && location.hash !== lastAppliedPhaseHash) {
        lastAppliedPhaseHash = location.hash;
        activeDossierPhase = parseInt(phaseParam, 10) || 0;
      } else if (!phaseParam) {
        lastAppliedPhaseHash = null;
      }

      // Directorio filtrado desde un enlace (p. ej. celda Proveedor/Cliente de Suministros): ?dirType=proveedores&q=Nombre
      const dirQueryParam = qParams.get("q");
      if (dirQueryParam !== null && location.hash !== lastAppliedDirHash) {
        lastAppliedDirHash = location.hash;
        directorioSearchQuery = dirQueryParam;
        directorioTypeFilter = qParams.get("dirType") || "all";
      } else if (dirQueryParam === null) {
        lastAppliedDirHash = null;
      }

      if (qParams.get("openMediation")) {
        pendingOpenMediation = qParams.get("openMediation");
      }
      // sumId: se aplica una sola vez por navegación para no bloquear el selector de suministro
      const sumIdParam = qParams.get("sumId");
      if (sumIdParam && location.hash !== lastAppliedSumIdHash) {
        lastAppliedSumIdHash = location.hash;
        activeDossierSuministroId = sumIdParam;
        pendingDossierSumFocus = true;
      } else if (!sumIdParam) {
        lastAppliedSumIdHash = null;
      }
    } else {
      lastAppliedTabHash = null;
      lastAppliedPhaseHash = null;
      lastAppliedSumIdHash = null;
    }
    const [role, rawSection, param] = pathPart.split("/");
    let section = rawSection;
    if (section === "inbox") section = "avisos"; // Alias retrocompatible
    if (PLAYERS[role]) {
      activeRole = role;
      activeSection = section || PLAYERS[role].defaultNav;
      activeParam = param || null;
    } else {
      activeRole = "admin";
      activeSection = "expedientes";
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
        ${getRolePendingCount(activeRole, item.id) ? `<b>${getRolePendingCount(activeRole, item.id)}</b>` : (item.badge ? `<b style="background:rgba(0,135,81,0.2);color:#86efac;font-size:0.6rem;padding:0 6px">${item.badge}</b>` : "")}
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
          <div class="admin-admin-user has-profile-link${((activeRole === "admin" && ADMIN_HUB_SECTIONS.includes(activeSection)) || ((activeRole === "cliente" || activeRole === "proveedor") && activeSection === "perfil")) ? " is-active" : ""}" data-go="#${activeRole === "admin" ? "admin/administracion" : activeRole + "/perfil"}" style="cursor:pointer" title="${activeRole === "admin" ? "Administración de la plataforma" : "Ver perfil corporativo"}">
            <span>${player.avatar}</span>
            <div style="min-width:0;flex:1">
              <strong style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${player.entity}</strong>
              <small>${player.label}</small>
            </div>
            <span class="profile-link-chevron" style="margin-left:auto;flex-shrink:0;color:var(--entity-faint);display:grid;place-items:center">${icon("chevronRight", 14)}</span>
          </div>
        </div>
      </aside>
    `;
  }

  /* ---------- Componente: Popover Flotante de Notificaciones Bell ---------- */
  function getNoticeEffectiveLink(n, role = activeRole) {
    if (n.enlace) {
      return n.enlace.replace(/^#(admin|cliente|proveedor|destinatario)\//, `#${role}/`);
    }
    if (n.expId) {
      return `#${role}/expedientes/${n.expId}?tab=deliverables${n.sumId ? `&sumId=${n.sumId}` : ""}`;
    }
    return `#${role}/avisos`;
  }

  function renderTopbarNotifPopoverHTML() {
    const roleNotices = NOTICES.filter(n => canRoleSeeNotice(n, activeRole));
    const unreadNotices = roleNotices.filter(n => !completedNotices.has(n.id));
    const displayNotices = topbarNotifFilter === "pending" ? unreadNotices : roleNotices;
    const player = PLAYERS[activeRole] || { shortLabel: activeRole };

    return `
      <div class="notif-popover-head">
        <div class="notif-popover-title">
          <strong>Avisos & Notificaciones</strong>
          ${unreadNotices.length > 0 ? `<span class="notif-unread-chip">${unreadNotices.length} pendientes</span>` : `<span class="notif-all-read-chip">${icon("check", 11)} Al día</span>`}
        </div>
        ${unreadNotices.length > 0 ? `
          <button type="button" class="notif-mark-all-btn" id="notifMarkAllReadBtn" title="Marcar todos los avisos como completados">
            ${icon("check", 12)} Marcar leídos
          </button>
        ` : ""}
      </div>

      <div class="notif-filter-tabs">
        <button type="button" class="notif-tab-btn ${topbarNotifFilter === "pending" ? "is-active" : ""}" data-topbar-notif-filter="pending">
          Pendientes (${unreadNotices.length})
        </button>
        <button type="button" class="notif-tab-btn ${topbarNotifFilter === "all" ? "is-active" : ""}" data-topbar-notif-filter="all">
          Todos (${roleNotices.length})
        </button>
      </div>

      <div class="notif-popover-list">
        ${displayNotices.length === 0 ? `
          <div class="notif-empty-state">
            <span class="notif-empty-icon">${icon("check", 22)}</span>
            <strong>Estás al día</strong>
            <p>${topbarNotifFilter === "pending" ? `No tienes avisos pendientes de acción en ${player.shortLabel}.` : "No hay avisos registrados para este perfil."}</p>
          </div>
        ` : displayNotices.slice(0, 8).map(n => {
          const isDone = completedNotices.has(n.id);
          const tone = getCategoryToneInfo(n.categoria);
          const link = getNoticeEffectiveLink(n, activeRole);
          const sumLabel = n.sumId ? (n.suministro || n.sumId) : (n.suministro && n.suministro !== "General del Expediente" ? n.suministro : null);

          return `
            <article class="notif-popover-item ${isDone ? "is-completed" : "is-unread"}" data-notif-id="${n.id}">
              <div class="notif-item-header">
                <span class="notif-cat-tag" style="color:${tone.color};background:${tone.bg};border:1px solid ${tone.border}">
                  ${icon(tone.iconName, 11)} ${escHTML(n.categoria || "Aviso")}
                </span>
                ${n.expId ? `
                  <span class="notif-scope-tag" title="${escHTML(n.expId)}${sumLabel ? ` · ${escHTML(sumLabel)}` : ""}">
                    ${n.expId}${n.sumId ? ` · ${n.sumId}` : ""}
                  </span>
                ` : ""}
                <time class="notif-item-time">${n.fecha || "Reciente"}</time>
              </div>

              <div class="notif-item-content" data-go="${link}" data-mark-notif-on-click="${n.id}" style="cursor:pointer" title="Ir a ${escHTML(n.accion || 'este aviso')}">
                <strong class="notif-item-title">${escHTML(n.titulo)}</strong>
                ${n.descripcion ? `<p class="notif-item-desc">${escHTML(n.descripcion)}</p>` : ""}
              </div>

              <div class="notif-item-footer">
                <button class="notif-action-link" type="button" data-go="${link}" data-mark-notif-on-click="${n.id}">
                  ${escHTML(n.accion || "Ver detalle")} ${icon("arrow", 11)}
                </button>
                <button class="notif-toggle-btn ${isDone ? "is-done" : ""}" type="button" data-topbar-toggle-notice="${n.id}" title="${isDone ? "Reabrir aviso" : "Marcar como completado"}">
                  ${icon(isDone ? "refresh" : "check", 12)}
                  <span>${isDone ? "Reabrir" : "Completar"}</span>
                </button>
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <div class="notif-popover-foot">
        <button type="button" class="notif-view-all-link" data-go="#${activeRole}/avisos">
          <span>Ver bandeja central de avisos</span>
          ${icon("arrow", 13)}
        </button>
      </div>
    `;
  }

  /* ---------- Componente: Topbar Interna con Switcher Sutil ---------- */
  function renderTopbar() {
    const player = PLAYERS[activeRole];
    const roleNotices = NOTICES.filter(n => canRoleSeeNotice(n, activeRole));
    const unreadCount = roleNotices.filter(n => !completedNotices.has(n.id)).length;
    const sectionName = activeSection === "perfil" ? "Perfil corporativo"
      : activeSection === "selector" ? (activeRole === "proveedor" ? "Cotización" : "Selector de Proveedores")
      : ((activeRole === "admin" && ADMIN_HUB_LABELS[activeSection]) || ((player.nav.find(n => n.id === activeSection) || {}).label || activeSection));
    const currentTheme = document.documentElement.dataset.theme || "dark";

    return `
      <header class="admin-topbar">
        <button class="admin-menu" id="menuToggleBtn" type="button" aria-label="Abrir menú">${icon("menu", 20)}</button>
        <div class="admin-crumbs">
          <span>${player.label}</span>
          <i>/</i>
          ${activeRole === "admin" && ADMIN_HUB_SECTIONS.includes(activeSection) && activeSection !== "administracion" ? `<a href="#admin/administracion" data-go="#admin/administracion" style="color:inherit;text-decoration:none">Administración</a><i>/</i>` : ""}
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
                  <strong>Cliente</strong>
                  <small>Infraestructuras del Norte</small>
                </div>
                ${activeRole === "cliente" ? icon("check", 14) : ""}
              </button>
              <button class="role-popover-item ${activeRole === "proveedor" ? "is-active" : ""}" type="button" data-switch-role="proveedor">
                <span class="role-badge-dot proveedor"></span>
                <div>
                  <strong>Proveedor</strong>
                  <small>IberRail Components</small>
                </div>
                ${activeRole === "proveedor" ? icon("check", 14) : ""}
              </button>
              <!-- Vista Destinatario Final (Auditor) temporalmente oculta según solicitud de usuario -->
              <!--
              <button class="role-popover-item ${activeRole === "destinatario" ? "is-active" : ""}" type="button" data-switch-role="destinatario">
                <span class="role-badge-dot destinatario"></span>
                <div>
                  <strong>Destinatario Final (Auditor)</strong>
                  <small>Volkswagen Navarra / ADIF</small>
                </div>
                ${activeRole === "destinatario" ? icon("check", 14) : ""}
              </button>
              -->
            </div>
          </div>

          <!-- Selector de Modo Claro / Oscuro -->
          <button class="topbar-icon-btn" id="themeToggleBtn" type="button" aria-label="Cambiar tema" title="${currentTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}">
            ${icon(currentTheme === "dark" ? "sun" : "moon", 16)}
          </button>

          <!-- Notificaciones Bell Flotante -->
          <div class="notif-dropdown-wrap" id="notifDropdownWrap">
            <button class="topbar-icon-btn notif-bell-btn ${unreadCount > 0 ? "has-unread" : ""}" id="notifDropdownBtn" type="button" aria-expanded="false" aria-label="Notificaciones" title="${unreadCount > 0 ? `${unreadCount} ${unreadCount === 1 ? 'aviso pendiente' : 'avisos pendientes'}` : 'Sin avisos pendientes'}">
              ${icon("bell", 16)}
              ${unreadCount > 0 ? `<span class="bell-count-badge">${unreadCount > 9 ? "9+" : unreadCount}</span>` : ""}
            </button>
            <div class="notif-dropdown-popover" id="notifDropdownMenu" hidden>
              ${renderTopbarNotifPopoverHTML()}
            </div>
          </div>
        </div>
      </header>
    `;
  }

  /* ============================================================
     CONSTRUCTOR DE EXPEDIENTES (PANTALLA 1 - APUNTES 05 Y 06)
     ============================================================ */
  // Bloque de adjuntos del constructor (máx. 3): cada adjunto lleva su nombre y, si crea SOFEIN, quién lo ve
  const CREATE_ATTACH_MAX = 3;

  const getAttachMax = box => Number(box.dataset.attachMax) || Infinity;

  function renderCreateAttachHTML(scope, isRoleAdmin, max = CREATE_ATTACH_MAX) {
    const title = scope === "general" ? "Adjuntos adicionales" : scope === "registro" ? "Adjuntos" : "Adjuntos del suministro";
    return `
      <div class="create-attach" data-attach-scope="${scope}" data-attach-vis="${isRoleAdmin ? "1" : "0"}" data-attach-max="${Number.isFinite(max) ? max : 0}">
        <div class="create-attach-head">
          <span class="create-attach-title">${title}${Number.isFinite(max) ? ` <em>(máx. ${max})</em>` : ""}</span>
          <input type="file" class="create-attach-input" style="display:none" accept=".pdf,.dwg,.xlsx,.docx,.jpg,.png" multiple />
          <button type="button" class="slot-upload-btn create-attach-add">${icon("upload", 13)} Añadir adjunto</button>
        </div>
        <div class="create-attach-list"></div>
        ${!isRoleAdmin ? `<p class="create-attach-hint">SOFEIN decidirá quién puede ver cada adjunto al validar la solicitud.</p>` : ""}
      </div>
    `;
  }

  // Archivo real de cada fila de adjunto (no cabe en el DOM)
  const stagedAttachFiles = new WeakMap();

  function updateCreateAttachAddState(box) {
    const count = box.querySelectorAll(".create-attach-row").length;
    const addBtn = box.querySelector(".create-attach-add");
    if (addBtn) addBtn.style.display = count >= getAttachMax(box) ? "none" : "";
  }

  // file: File nuevo, o un adjunto ya guardado { name, file, fileUrl, visibleTo } al editar
  function addCreateAttachRow(box, file, existing = null) {
    const list = box.querySelector(".create-attach-list");
    if (!list || list.children.length >= getAttachMax(box)) return false;
    const withVis = box.dataset.attachVis === "1";
    const uid = `att${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const fileName = existing ? existing.file : file.name;
    const baseName = existing ? existing.name : file.name.replace(/\.[^.]+$/, "");
    const visRoles = existing && Array.isArray(existing.visibleTo) ? existing.visibleTo : ["admin", "cliente", "proveedor"];
    const row = document.createElement("div");
    row.className = "create-attach-row";
    row.innerHTML = `
      <span class="create-attach-file" title="${escHTML(fileName)}">${icon("file", 13)} <span>${escHTML(fileName)}</span></span>
      <input class="create-exp-input create-attach-name" value="${escHTML(baseName)}" placeholder="Nombre del documento" aria-label="Nombre del documento" required />
      ${withVis ? `
        <div class="create-attach-vis" title="¿Quién puede ver este adjunto?">
          <span class="create-attach-vis-fixed">${icon("eye", 12)} SOFEIN</span>
          <label><input type="checkbox" name="${uid}_cliente" value="cliente" ${visRoles.includes("cliente") ? "checked" : ""} /> Cliente</label>
          <label><input type="checkbox" name="${uid}_proveedor" value="proveedor" ${visRoles.includes("proveedor") ? "checked" : ""} /> Proveedor</label>
        </div>
      ` : ""}
      <button type="button" class="suministro-remove-btn create-attach-remove" title="Quitar adjunto">${icon("x", 12)}</button>
    `;
    stagedAttachFiles.set(row, { file: existing ? null : file, fileName, fileUrl: existing ? existing.fileUrl || null : null });
    row.querySelector(".create-attach-remove").addEventListener("click", () => {
      row.remove();
      updateCreateAttachAddState(box);
    });
    list.appendChild(row);
    updateCreateAttachAddState(box);
    return true;
  }

  function bindCreateAttachments(root = document) {
    root.querySelectorAll(".create-attach").forEach(box => {
      if (box.dataset.bound) return;
      box.dataset.bound = "1";
      const input = box.querySelector(".create-attach-input");
      box.querySelector(".create-attach-add")?.addEventListener("click", () => input?.click());
      input?.addEventListener("change", e => {
        const files = Array.from(e.target.files || []);
        let skipped = 0;
        files.forEach(f => { if (!addCreateAttachRow(box, f)) skipped++; });
        if (skipped) showToast(`Máximo ${getAttachMax(box)} adjuntos: se han descartado ${skipped}.`);
        input.value = "";
      });
    });
  }

  // Lee los adjuntos de un bloque: [{ fileName, fileUrl, nombre, visibleTo|null }]
  // (fileUrl: el ya guardado o un object URL del archivo nuevo)
  function readCreateAttachments(box) {
    if (!box) return [];
    const withVis = box.dataset.attachVis === "1";
    return Array.from(box.querySelectorAll(".create-attach-row")).map(row => {
      const staged = stagedAttachFiles.get(row);
      if (!staged) return null;
      const nombre = row.querySelector(".create-attach-name")?.value.trim() || staged.fileName;
      const visibleTo = withVis
        ? ["admin", ...Array.from(row.querySelectorAll(".create-attach-vis input:checked")).map(i => i.value)]
        : null;
      const fileUrl = staged.fileUrl || (staged.file ? URL.createObjectURL(staged.file) : null);
      return { fileName: staged.fileName, fileUrl, nombre, visibleTo };
    }).filter(Boolean);
  }

  function renderCreateSuministroRowHTML(idx, isRoleAdmin, defaultDate, removable) {
    return `
      <div class="suministro-item" data-suministro-index="${idx}">
        <div class="suministro-item-top">
          <span class="suministro-item-title">${icon("route", 14)} Lote de Suministro <span class="suministro-item-num">${idx}</span></span>
          ${removable ? `<button type="button" class="suministro-remove-btn" data-remove-suministro>${icon("x", 12)} Eliminar lote</button>` : ""}
        </div>
        <div class="create-exp-grid-3" style="margin-bottom:10px">
          <label class="create-exp-label">
            Tipo de Suministro
            <select name="suministro_material_${idx}" class="create-exp-select" required>
              ${renderProductoOptions()}
            </select>
          </label>
          <label class="create-exp-label">
            Volumen / Unidades
            <input name="suministro_unidades_${idx}" class="create-exp-input" required placeholder="Ej: 14.500 unidades" />
          </label>
          <label class="create-exp-label">
            Presupuesto estimado
            <input name="suministro_presupuesto_${idx}" class="create-exp-input" placeholder="Ej: 120.000 €" />
          </label>
        </div>
        <div class="create-exp-grid-3" style="margin-bottom:10px">
          <label class="create-exp-label">
            Fecha objetivo
            <input type="date" name="suministro_fecha_${idx}" class="create-exp-input suministro-fecha-input" value="${defaultDate}" />
          </label>
        </div>
        <label class="create-exp-label" style="margin-bottom:10px">
          Especificaciones
          <textarea name="suministro_especificaciones_${idx}" class="create-exp-input create-exp-textarea" rows="4" placeholder="Describe el suministro con el detalle necesario: material, dimensiones, normativa, tolerancias, condiciones de entrega…"></textarea>
        </label>
        ${renderCreateAttachHTML("suministro", isRoleAdmin)}
      </div>
    `;
  }

  // Destinatarios conocidos (los de siempre + los ya usados en expedientes) para sugerir sin obligar
  function getDestinatarioSuggestions() {
    const base = [
      "Adif Alta Velocidad (Línea Sur)",
      "Adif Red Convencional",
      "Metro de Bilbao (Línea 4)",
      "Ferrocarrils de la Generalitat de Catalunya (FGC)",
      "Línea de Acceso y Vías Factoría Volkswagen (Red Adif)",
      "Consorcio Autonómico de Transportes"
    ];
    return [...new Set([...base, ...EXPEDIENTES.map(e => e.destinatarioFinal).filter(Boolean)])];
  }

  // Lee los suministros del formulario de creación: presupuesto total y primera/última fecha
  function readCreateExpTotals() {
    const rows = Array.from(document.querySelectorAll("#suministrosContainer .suministro-item"));
    const budgets = rows.map(r => parseBudgetNumber(r.querySelector('[name^="suministro_presupuesto"]')?.value || "")).filter(n => n > 0);
    const dates = rows.map(r => r.querySelector('[name^="suministro_fecha"]')?.value).filter(Boolean).sort();
    return {
      count: rows.length,
      budget: budgets.length ? budgets.reduce((a, b) => a + b, 0) : 0,
      first: dates[0] || "",
      last: dates[dates.length - 1] || ""
    };
  }

  function syncCreateExpSummary() {
    const box = document.getElementById("createExpSummary");
    if (!box) return;
    const t = readCreateExpTotals();
    box.querySelector('[data-summary="count"]').textContent = t.count;
    box.querySelector('[data-summary="budget"]').textContent = t.budget ? formatEuro(t.budget) : "-";
    box.querySelector('[data-summary="first"]').textContent = t.first ? formatIsoDateEs(t.first) : "-";
    box.querySelector('[data-summary="last"]').textContent = t.last ? formatIsoDateEs(t.last) : "-";
  }

  function renderCreateExpedienteView(creatorRole) {
    const isRoleAdmin = creatorRole === "admin";
    const breadcrumbBase = isRoleAdmin
      ? `<a href="#admin/overview">Visión global</a> / <a href="#admin/expedientes">Expedientes</a> / <span>Crear expediente</span>`
      : `<a href="#cliente/expedientes">Mis expedientes</a> / <span>Nuevo expediente</span>`;

    return `
      <div class="dossier-breadcrumb" style="margin-bottom:14px">
        ${breadcrumbBase}
      </div>

      <div class="admin-view-head" style="margin-bottom:${isRoleAdmin ? '22px' : '14px'}">
        <div>
          <h1>Crear Expediente</h1>
        </div>
      </div>

      ${!isRoleAdmin ? `
        <div style="display:flex;justify-content:center;margin-bottom:22px">
          <span class="create-exp-badge info" style="font-size:0.78rem;padding:6px 16px">
            ${icon("file", 15)} Solicitud del cliente · Requiere validación SOFEIN
          </span>
        </div>
      ` : ""}

      <form id="createExpedienteFullForm" class="create-exp-wrap">
        <!-- Bloque 1: General -->
        <section class="create-exp-card">
          <div class="create-exp-card-head">
            <div>
              <h3>${icon("folder", 18)} 1. General</h3>
            </div>
          </div>

          <div style="display:grid;gap:14px">
            <label class="create-exp-label">
              Título del Proyecto / Nombre de la Obra
              <input name="titulo" class="create-exp-input" required placeholder="Ej: Renovación de Superestructura Tramo Bobadilla – Algeciras" />
            </label>

            <div class="create-exp-grid-2">
              <label class="create-exp-label">
                Cliente
                ${isRoleAdmin ? `
                  <select name="cliente" class="create-exp-select" required>
                    ${DIRECTORIO_CLIENTES.map(c => `<option value="${c.nombre}">${c.nombre} (${c.cif})</option>`).join("")}
                  </select>
                ` : `
                  <input name="cliente" class="create-exp-input" value="Infraestructuras del Norte, S.A." readonly style="opacity:0.85;cursor:not-allowed;background:var(--entity-panel-2)" />
                `}
              </label>

              <label class="create-exp-label">
                Destinatario final / Administrador de la infraestructura
                <input name="destinatarioFinal" class="create-exp-input" list="destinatarioFinalList" required autocomplete="off" placeholder="Escribe o elige un destinatario" />
                <datalist id="destinatarioFinalList">
                  ${getDestinatarioSuggestions().map(d => `<option value="${escHTML(d)}"></option>`).join("")}
                </datalist>
              </label>
            </div>
          </div>
        </section>

        <!-- Bloque 2: Suministros -->
        <section class="create-exp-card">
          <div class="create-exp-card-head">
            <div>
              <h3>${icon("box", 18)} 2. Suministros</h3>
            </div>
          </div>

          <div id="suministrosContainer" style="display:grid;gap:12px">
            ${renderCreateSuministroRowHTML(1, isRoleAdmin, "2026-11-30", false)}
          </div>

          <button class="suministro-add-btn" type="button" id="addSuministroRowBtn">
            ${icon("plus", 14)} Añadir otro suministro al expediente
          </button>
        </section>

        <!-- Bloque 3: Notas y adjuntos -->
        <section class="create-exp-card">
          <div class="create-exp-card-head">
            <div>
              <h3>${icon("file", 18)} 3. Notas y adjuntos</h3>
            </div>
          </div>

          <div style="display:grid;gap:14px">
            <label class="create-exp-label">
              Notas
              <textarea name="notasExpediente" class="create-exp-input create-exp-textarea" rows="3" placeholder="Añade notas o comentarios adicionales del expediente. Las verán SOFEIN y el cliente en la cabecera del expediente."></textarea>
            </label>

            ${renderCreateAttachHTML("general", isRoleAdmin)}
          </div>
        </section>

        <!-- Resumen calculado a partir de los suministros -->
        <section class="create-exp-card create-exp-summary" id="createExpSummary">
          <div class="create-exp-card-head"><div><h3>${icon("activity", 18)} Resumen del expediente</h3></div></div>
          <div class="create-exp-summary-grid">
            <div><span>Suministros</span><strong data-summary="count">1</strong></div>
            <div><span>Presupuesto total</span><strong data-summary="budget">-</strong></div>
            <div><span>Primera entrega</span><strong data-summary="first">-</strong></div>
            <div><span>Última entrega</span><strong data-summary="last">-</strong></div>
          </div>
        </section>

        <!-- Acciones Finales -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding-top:10px">
          <button class="admin-quiet-button" type="button" data-go="${isRoleAdmin ? '#admin/expedientes' : '#cliente/expedientes'}">
            ← Expedientes
          </button>
          <button class="admin-primary-button" type="submit" id="submitCreateExpBtn" style="padding:10px 22px;font-size:0.85rem">
            ${icon("check", 16)} ${isRoleAdmin ? "Crear Expediente" : "Solicitar Expediente"}
          </button>
        </div>
      </form>
    `;
  }

  /* ============================================================
     PANTALLA 2: SELECTOR Y MATCHING DE PROVEEDORES (FASE DE COTIZACIONES)
     Apuntes 06 - Tablas 2 y 3 (Preselección SOFEIN, Selección Cliente, Cotizaciones, Comparativa)
     ============================================================ */
  /* ============================================================
     SELECTOR DE PROVEEDORES POR SUMINISTRO (Fase 2 del expediente)
     1. Búsqueda (SOFEIN) → 2. Preselección (Cliente; SOFEIN confirma y pide ofertas)
     → 3. Cotización (proveedores; SOFEIN valida) → 4. Selección (Cliente elige; SOFEIN valida y se formaliza)
     ============================================================ */
  const SELECTOR_MY_PROVIDER_ID = "PRV-01"; // proveedor de la demo (IberRail Components)
  const QUOTE_MIN_VALIDEZ_DIAS = 45;
  const SELECTOR_STEPS = [
    { id: "preseleccion", num: 1, title: "1. Búsqueda - SOFEIN" },
    { id: "seleccion_cliente", num: 2, title: "2. Preselección - Cliente" },
    { id: "peticion_cotizaciones", num: 3, title: "3. Cotización - Proveedores" },
    { id: "comparativa", num: 4, title: "4. Selección - Cliente" }
  ];
  const PAYMENT_OPTIONS = ["60 días fecha factura", "60 días confirming", "90 días confirming", "30 días transferencia"];

  const formatEuro = n => (Number(n) || 0).toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const formatEuroUnit = n => (Number(n) || 0).toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sumTipoKey = sum => String(sum?.tipo || "otros").toLowerCase();
  const getSumUnidadesNum = sum => sum?.unidadesNum || parseInt(String(sum?.unidades || "").replace(/\D/g, ""), 10) || 1;
  const getProveedorConformidades = prv => (prv?.conformidades && prv.conformidades.length ? prv.conformidades : (prv?.homologaciones || []));

  function getProveedorCondiciones(prv, sum) {
    const c = (prv?.suministrosCondiciones || {})[sumTipoKey(sum)] || {};
    return {
      leadTime: c.leadTime || prv?.leadTimeMedio || "—",
      condicionesPago: c.condicionesPago || prv?.condicionesPago || "—"
    };
  }

  // Proveedores del directorio que suministran ese tipo (sin mínimo: si no hay ninguno, se muestran todos)
  function getSelectorCandidates(sum) {
    const key = sumTipoKey(sum);
    const list = DIRECTORIO_PROVEEDORES.filter(p => (p.suministros || []).map(x => String(x).toLowerCase()).includes(key));
    return list.length ? list : [...DIRECTORIO_PROVEEDORES];
  }

  function buildDemoQuote(prv, sum, idx = 0) {
    const units = getSumUnidadesNum(sum);
    const budget = parseBudgetNumber(sum.presupuesto) || units * 30;
    const total = Math.round(budget * [1, 1.04, 0.97, 1.08][idx % 4]);
    const fecha = sum.fechaEntregaIso ? new Date(sum.fechaEntregaIso) : new Date();
    fecha.setDate(fecha.getDate() + [-4, 3, -7, 0][idx % 4]);
    const conf = getProveedorConformidades(prv);
    return {
      proveedorId: prv.id,
      nombre: prv.nombre,
      cif: prv.cif,
      sede: prv.sede,
      precioUnitario: Math.round((total / units) * 100) / 100,
      precioTotal: total,
      fechaEntregaIso: fecha.toISOString().slice(0, 10),
      condicionesPago: getProveedorCondiciones(prv, sum).condicionesPago,
      validezDias: [45, 60, 45, 90][idx % 4],
      conformidades: conf.slice(0, Math.max(1, conf.length - (idx % 2))),
      estado: "enviada",
      fechaEnvio: "16 jun, 10:15"
    };
  }

  const emptyQuote = prv => ({ proveedorId: prv.id, nombre: prv.nombre, cif: prv.cif, sede: prv.sede, estado: "pendiente" });

  // Estado del selector guardado en el propio suministro
  function ensureSuministroMatching(exp, sum) {
    if (!sum) return ensureExpedienteMatching(exp);
    if (sum.matching) return sum.matching;
    const cands = getSelectorCandidates(sum);
    const ids = cands.map(c => c.id);
    const done = (sum.faseActual ?? 0) > 1 || sum.estado === "finalizado" || sum.estado === "cerrado";
    const m = {
      faseSelector: done ? "adjudicado" : "preseleccion",
      proveedoresRecomendados: ids,
      proveedoresPreseleccionadosPorAdmin: ids.slice(0, 4),
      proveedoresSeleccionadosPorCliente: [],
      cotizaciones: {},
      requisitosExigidosCliente: [],
      proveedorAdjudicado: null,
      seleccionClienteEnviada: false,
      adjudicacionConfirmadaCliente: false
    };
    if (done) {
      const winner = DIRECTORIO_PROVEEDORES.find(p => p.nombre === sum.proveedor) || cands[0];
      const q = buildDemoQuote(winner, sum, 0);
      q.precioTotal = parseBudgetNumber(sum.presupuesto) || q.precioTotal;
      q.precioUnitario = Math.round((q.precioTotal / getSumUnidadesNum(sum)) * 100) / 100;
      q.estado = "enviada";
      m.proveedoresPreseleccionadosPorAdmin = [...new Set([winner.id, ...m.proveedoresPreseleccionadosPorAdmin])];
      m.proveedoresSeleccionadosPorCliente = [winner.id];
      m.cotizaciones[winner.id] = q;
      m.proveedorAdjudicado = winner.nombre;
      m.requisitosExigidosCliente = q.conformidades.slice(0, 2);
      m.seleccionClienteEnviada = true;
      m.adjudicacionConfirmadaCliente = true;
    } else if (sum.id === "SUM-08") {
      // Demo: SUM-08 (Placas) ya en cotización; IberRail tiene la petición pendiente de responder
      const pedidos = [...new Set([...ids.slice(0, 2), SELECTOR_MY_PROVIDER_ID])];
      m.proveedoresPreseleccionadosPorAdmin = [...new Set([...m.proveedoresPreseleccionadosPorAdmin, ...pedidos])];
      m.proveedoresSeleccionadosPorCliente = pedidos;
      m.seleccionClienteEnviada = true;
      m.faseSelector = "peticion_cotizaciones";
      pedidos.forEach((pid, i) => {
        const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === pid);
        m.cotizaciones[pid] = pid === SELECTOR_MY_PROVIDER_ID ? emptyQuote(prv) : buildDemoQuote(prv, sum, i);
      });
    }
    sum.matching = m;
    return m;
  }

  // Estado de una oferta: pendiente · enviada · rechazada · adjudicada (null si no se pidió)
  function getQuoteEstado(m, prvId) {
    const q = m?.cotizaciones?.[prvId];
    if (!q) return null;
    if (m.faseSelector === "adjudicado" && m.proveedorAdjudicado) return m.proveedorAdjudicado === q.nombre ? "adjudicada" : "rechazada";
    return q.estado === "pendiente" ? "pendiente" : "enviada";
  }
  const QUOTE_ESTADO_META = {
    pendiente: { label: "Pendiente", cls: "pending" },
    enviada: { label: "Enviada", cls: "review" },
    rechazada: { label: "Rechazada", cls: "rejected" },
    adjudicada: { label: "Adjudicada", cls: "complete" }
  };
  const renderQuoteEstadoBadge = estado => {
    const meta = QUOTE_ESTADO_META[estado] || QUOTE_ESTADO_META.pendiente;
    return `<span class="entity-status ${meta.cls}"><i></i>${meta.label}</span>`;
  };

  function getSumDelivMap(exp, sum) {
    return sum && SUMINISTROS.filter(s => s.expId === exp.id).length > 1 ? ensureSuministroDeliverables(exp, sum) : exp.deliverables;
  }

  // Suministro que abre el selector (?sum=), o el primero visible del expediente en fase 2
  function getSelectorSuministro(exp) {
    const visibles = getRoleVisibleExpSuministros(exp, activeRole);
    // El proveedor conserva el acceso a los suministros en los que se le pidió oferta, aunque no se le adjudiquen
    const requested = SUMINISTROS.find(s => s.expId === exp.id && s.id === selectorSumParam);
    if (requested && (activeRole !== "proveedor" || visibles.includes(requested) || getQuoteEstado(ensureSuministroMatching(exp, requested), SELECTOR_MY_PROVIDER_ID))) return requested;
    return visibles.find(s => s.id === selectorSumParam)
      || visibles.find(s => (s.faseActual ?? 0) === 1)
      || visibles[0]
      || null;
  }

  const renderConformidadTags = (list, { muted = false } = {}) => (list || []).length
    ? `<div class="selector-homologations">${list.map(c => `<span class="selector-homologation-chip ${muted ? "is-muted" : ""}">${icon("shield", 12)} ${escHTML(c)}</span>`).join("")}</div>`
    : `<span class="doc-tbl-dash">—</span>`;

  function getQuoteDeliveryDiff(q, sum) {
    if (!q?.fechaEntregaIso || !sum?.fechaEntregaIso) return null;
    const diff = Math.round((new Date(q.fechaEntregaIso) - new Date(sum.fechaEntregaIso)) / 86400000);
    return { diff, text: diff < 0 ? `${Math.abs(diff)} días antes` : diff === 0 ? "En la fecha objetivo" : `+${diff} días`, cls: diff <= 0 ? "complete" : "warning" };
  }

  function renderSelectorSumInfoHTML(exp, sum) {
    if (!sum) return "";
    const map = getSumDelivMap(exp, sum);
    const adjuntos = (map[0] || [])
      .map((d, idx) => ({ d, idx }))
      .filter(({ d }) => d.file && canRoleSeeDeliverable(d, activeRole));
    const item = (label, value, wide = false) => `
      <div class="selector-info-item ${wide ? "is-wide" : ""}">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `;
    return `
      <section class="selector-info-card">
        <div class="selector-info-grid">
          ${item("Tipo", `${icon(getSuministroTypeIcon(sum.tipo, sum.descripcion), 13)} ${escHTML(sum.tipo)}`)}
          ${item("Código de suministro", sum.id)}
          ${item("Unidades", escHTML(sum.unidades || "—"))}
          ${item("Fecha objetivo", sum.fechaEntrega || "—")}
          ${item("Expediente", exp.id)}
          ${item("Nombre del expediente", escHTML(getExpVisualMeta(exp).tituloGenerico))}
          ${item("Cliente", escHTML(sum.cliente || exp.cliente))}
          ${item("Destino", escHTML(sum.destino || exp.destinatarioFinal))}
          ${item("Descripción", escHTML(sum.descripcion || sum.especificaciones || "—"), true)}
          ${item("Especificaciones", escHTML(sum.especificaciones || "—"), true)}
        </div>
        <div class="selector-info-attachments">
          <span class="reg-section-label">${icon("file", 13)} Adjuntos del suministro</span>
          ${adjuntos.length ? adjuntos.map(({ d, idx }) => `
            <div class="reg-attachment">
              <strong>${escHTML(d.name)}</strong>
              <span>${escHTML(d.file)}</span>
              <button class="doc-tbl-action-btn" type="button" data-view-doc data-exp="${exp.id}" data-phase="0" data-slot="${idx}">${icon("eye", 12)} Ver</button>
            </div>
          `).join("") : `<p class="reg-empty">Sin adjuntos.</p>`}
        </div>
      </section>
    `;
  }

  function renderSelectorProviderCard(prv, sum, checkboxHTML) {
    const cond = getProveedorCondiciones(prv, sum);
    return `
      <article class="selector-provider-card ${/checked/.test(checkboxHTML) ? "is-selected" : ""}">
        <div class="selector-card-head">
          <div>
            <strong style="font-size:0.95rem;color:var(--entity-text);display:block">${escHTML(prv.nombre)}</strong>
            <small style="color:var(--entity-muted);font-size:0.72rem">${escHTML(prv.sede)} · CIF ${prv.cif}</small>
          </div>
        </div>
        ${renderConformidadTags(getProveedorConformidades(prv))}
        <div class="selector-metrics-row">
          <div class="selector-metric-item">
            <span>Plazo medio</span>
            <strong>${escHTML(cond.leadTime)}</strong>
          </div>
          <div class="selector-metric-item">
            <span>Condiciones de pago</span>
            <strong>${escHTML(cond.condicionesPago)}</strong>
          </div>
        </div>
        <div class="selector-card-foot">${checkboxHTML}</div>
      </article>
    `;
  }

  const selectorActionBar = (title, subtitle, actionHTML) => `
    <div class="selector-action-bar">
      <div>
        <strong style="display:block;font-size:0.85rem;color:var(--entity-text)">${title}</strong>
        ${subtitle ? `<small style="color:var(--entity-muted);font-size:0.75rem">${subtitle}</small>` : ""}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${actionHTML}</div>
    </div>
  `;

  function renderSelectorProveedoresView(expId = "SFN-2026-K9M2") {
    const exp = getActiveExpediente(expId);
    const sum = getSelectorSuministro(exp);
    if (sum) activeDossierSuministroId = sum.id;
    if ((sum ? sum.id : null) !== lastSelectorSumId) {
      lastSelectorSumId = sum ? sum.id : null;
      selectorViewStep = null;
    }
    const matching = ensureSuministroMatching(exp, sum);
    const isRoleAdmin = activeRole === "admin";
    const isRoleCliente = activeRole === "cliente";
    const isRoleProveedor = activeRole === "proveedor";
    const ref = `data-exp-id="${exp.id}" data-sum-id="${sum ? sum.id : ""}"`;
    const sumTitle = sum ? `${sum.id} (${sum.tipo})` : exp.id;

    const breadcrumbHTML = `
      <div class="dossier-breadcrumb" style="margin-bottom:14px">
        <a href="#${activeRole}/expedientes">← Volver a expedientes</a> /
        <a href="#${activeRole}/expedientes/${exp.id}">${exp.id}</a> /
        <span>${isRoleProveedor ? "Cotización" : "Selector de Proveedores"} · ${sumTitle}</span>
      </div>
    `;

    // ------------------------------------------------------------
    // PROVEEDOR: su cotización para este suministro
    // ------------------------------------------------------------
    if (isRoleProveedor) {
      const myPrv = DIRECTORIO_PROVEEDORES.find(p => p.id === SELECTOR_MY_PROVIDER_ID);
      const q = matching.cotizaciones[SELECTOR_MY_PROVIDER_ID];
      const estado = getQuoteEstado(matching, SELECTOR_MY_PROVIDER_ID);
      const hasOffer = estado && estado !== "pendiente";
      const isClosed = estado === "rechazada" || estado === "adjudicada";
      const units = getSumUnidadesNum(sum);
      const myConf = getProveedorConformidades(myPrv);
      const allConf = [...new Set([...myConf, ...getActiveConformidades().map(c => c.nombre)])];
      const committed = new Set(q?.conformidades || myConf);
      const diff = hasOffer ? getQuoteDeliveryDiff(q, sum) : null;

      return `
        <div class="selector-view-wrap" style="max-width:980px;margin:0 auto">
          ${breadcrumbHTML}
          <div class="admin-view-head" style="margin-bottom:14px"><div><h1>Cotización</h1></div></div>
          ${renderSelectorSumInfoHTML(exp, sum)}

          ${!estado ? `
            <div class="reg-empty-card"><p>SOFEIN no te ha pedido cotización para este suministro.</p></div>
          ` : `
            <section class="selector-quote-status">
              <div class="selector-quote-status-head">
                <span class="reg-section-label">Estado de la oferta</span>
                ${renderQuoteEstadoBadge(estado)}
              </div>
              ${hasOffer ? `
                <div class="selector-info-grid">
                  <div class="selector-info-item"><span>Precio unitario</span><strong>${formatEuroUnit(q.precioUnitario)}</strong></div>
                  <div class="selector-info-item"><span>Precio total</span><strong>${formatEuro(q.precioTotal)}</strong></div>
                  <div class="selector-info-item"><span>Plazo de entrega</span><strong>${formatIsoDateEs(q.fechaEntregaIso)}${diff ? ` <span class="dossier-chip ${diff.cls}" style="font-size:0.66rem">${diff.text}</span>` : ""}</strong></div>
                  <div class="selector-info-item"><span>Condiciones de pago</span><strong>${escHTML(q.condicionesPago)}</strong></div>
                  <div class="selector-info-item"><span>Validez de la oferta</span><strong>${q.validezDias} días naturales</strong></div>
                  <div class="selector-info-item is-wide"><span>Conformidades comprometidas</span>${renderConformidadTags(q.conformidades)}</div>
                </div>
              ` : `<p class="reg-empty">Todavía no has enviado tu oferta.</p>`}
            </section>

            <form id="providerQuoteForm" ${ref} class="selector-quote-form">
              <h2>Enviar/Actualizar Oferta</h2>
              <div class="create-exp-grid-3" style="margin-bottom:14px">
                <label class="create-exp-label">
                  <span>Precio unitario (€)</span>
                  <input type="number" class="create-exp-input" id="quoteUnitPrice" min="0.01" step="0.01" required value="${hasOffer ? q.precioUnitario : ""}" ${isClosed ? "disabled" : ""} placeholder="Ej: 33,50" />
                </label>
                <label class="create-exp-label">
                  <span>Precio total (${escHTML(sum.unidades)} uds)</span>
                  <input type="text" class="create-exp-input" id="quoteTotalPrice" readonly data-units="${units}" value="${hasOffer ? formatEuro(q.precioTotal) : ""}" placeholder="Se calcula solo" style="opacity:0.85;cursor:not-allowed" />
                </label>
                <label class="create-exp-label">
                  <span>Plazo de entrega</span>
                  <input type="date" class="create-exp-input" id="quoteDeliveryDate" required value="${hasOffer ? q.fechaEntregaIso : (sum.fechaEntregaIso || "")}" ${isClosed ? "disabled" : ""} />
                </label>
              </div>
              <div class="create-exp-grid-2" style="margin-bottom:14px">
                <label class="create-exp-label">
                  <span>Condiciones de pago</span>
                  <select class="create-exp-select" id="quotePaymentCond" ${isClosed ? "disabled" : ""}>
                    ${[...new Set([...(hasOffer ? [q.condicionesPago] : []), getProveedorCondiciones(myPrv, sum).condicionesPago, ...PAYMENT_OPTIONS])].filter(x => x && x !== "—").map(o => `<option value="${escHTML(o)}" ${hasOffer && q.condicionesPago === o ? "selected" : ""}>${escHTML(o)}</option>`).join("")}
                  </select>
                </label>
                <label class="create-exp-label">
                  <span>Validez de la oferta (días naturales, mínimo ${QUOTE_MIN_VALIDEZ_DIAS})</span>
                  <input type="number" class="create-exp-input" id="quoteValidity" min="${QUOTE_MIN_VALIDEZ_DIAS}" step="1" required value="${hasOffer ? q.validezDias : QUOTE_MIN_VALIDEZ_DIAS}" ${isClosed ? "disabled" : ""} />
                </label>
              </div>
              <div style="margin-bottom:16px">
                <span class="create-exp-label" style="margin-bottom:8px">Conformidades a las que te comprometes</span>
                <div class="selector-conf-picker">
                  ${allConf.map(c => `
                    <label class="selector-conf-option">
                      <input type="checkbox" name="quoteConf" value="${escHTML(c)}" ${committed.has(c) ? "checked" : ""} ${isClosed ? "disabled" : ""} />
                      <span>${icon("shield", 12)} ${escHTML(c)}</span>
                    </label>
                  `).join("")}
                </div>
              </div>
              <div class="selector-quote-form-foot">
                <span>${hasOffer ? `Última cotización remitida: ${q.fechaEnvio}` : "Todavía no has remitido ninguna cotización"}</span>
                ${isClosed ? `<span class="dossier-chip">${estado === "adjudicada" ? "Oferta adjudicada" : "Oferta no adjudicada"}</span>` : `
                  <button class="admin-primary-button" type="submit">${icon("check", 14)} Enviar/Actualizar Cotización</button>
                `}
              </div>
            </form>
          `}
        </div>
      `;
    }

    // ------------------------------------------------------------
    // SOFEIN y CLIENTE: selector en 4 pasos
    // ------------------------------------------------------------
    const stateIdx = matching.faseSelector === "adjudicado" ? SELECTOR_STEPS.length : SELECTOR_STEPS.findIndex(s => s.id === matching.faseSelector);
    let viewIdx = selectorViewStep !== null ? SELECTOR_STEPS.findIndex(s => s.id === selectorViewStep) : -1;
    if (viewIdx < 0 || viewIdx > stateIdx) viewIdx = Math.min(stateIdx, SELECTOR_STEPS.length - 1);
    if (isRoleCliente && viewIdx === 0) viewIdx = 1; // la búsqueda es interna de SOFEIN
    const viewStep = matching.faseSelector === "adjudicado" && selectorViewStep === null ? "adjudicado" : SELECTOR_STEPS[viewIdx].id;

    const stepperHTML = SELECTOR_STEPS.map((step, idx) => {
      const clientHidden = isRoleCliente && idx === 0;
      const reachable = idx <= stateIdx && !clientHidden;
      const isActive = viewStep === step.id;
      const isDone = idx < stateIdx;
      return `
        <div class="selector-substep ${isActive ? "is-active" : isDone ? "is-done" : ""} ${clientHidden ? "is-disabled-client" : ""}" ${reachable ? `data-switch-selector-step="${step.id}" ${ref} style="cursor:pointer"` : `style="cursor:default;opacity:${clientHidden ? 0.38 : 0.6}"`} title="${clientHidden ? "Paso interno de SOFEIN" : step.title}">
          <span class="selector-substep-num">${isDone ? icon("check", 13) : step.num}</span>
          <div class="selector-substep-text"><strong>${step.title}</strong></div>
        </div>
      `;
    }).join("");

    const candidates = getSelectorCandidates(sum);
    const prvById = id => DIRECTORIO_PROVEEDORES.find(p => p.id === id);
    let contentHTML = "";

    // 1. Búsqueda (SOFEIN)
    if (viewStep === "preseleccion") {
      const pre = new Set(matching.proveedoresPreseleccionadosPorAdmin);
      const editable = isRoleAdmin && matching.faseSelector === "preseleccion";
      contentHTML = `
        <div class="selector-cards-grid">
          ${candidates.map(prv => renderSelectorProviderCard(prv, sum, `
            <label class="selector-include-check">
              <input type="checkbox" data-preselect-prv="${prv.id}" ${ref} ${pre.has(prv.id) ? "checked" : ""} ${editable ? "" : "disabled"} />
              <span>Incluir en la preselección</span>
            </label>
          `)).join("")}
        </div>
        ${selectorActionBar(
          "Validar la búsqueda de proveedores para la preselección",
          "Al validar, el cliente recibirá aviso para preseleccionar a quién solicitar cotización",
          editable ? `<button class="admin-primary-button" id="approvePreselectionBtn" ${ref} type="button">${icon("check", 14)} Validar</button>` : `<span class="dossier-chip complete">Búsqueda validada</span>`
        )}
      `;
    }

    // 2. Preselección (Cliente elige a quién pedir cotización; SOFEIN confirma y pide las ofertas)
    else if (viewStep === "seleccion_cliente") {
      if (matching.faseSelector === "preseleccion") {
        contentHTML = `<div class="reg-empty-card"><p>SOFEIN está buscando proveedores para este suministro.</p><span>Recibirás un aviso cuando puedas preseleccionarlos.</span></div>`;
      } else {
        const sel = new Set(matching.proveedoresSeleccionadosPorCliente);
        const open = matching.faseSelector === "seleccion_cliente";
        const clienteEditable = isRoleCliente && open && !matching.seleccionClienteEnviada;
        const adminEditable = isRoleAdmin && open;
        const preselected = matching.proveedoresPreseleccionadosPorAdmin.map(prvById).filter(Boolean);
        contentHTML = `
          <div class="selector-cards-grid">
            ${preselected.map(prv => renderSelectorProviderCard(prv, sum, `
              <label class="selector-include-check">
                <input type="checkbox" data-client-select-prv="${prv.id}" ${ref} ${sel.has(prv.id) ? "checked" : ""} ${clienteEditable || adminEditable ? "" : "disabled"} />
                <span>${isRoleCliente ? "Pedir cotización" : "Incluir en la preselección"}</span>
              </label>
            `)).join("")}
          </div>
          ${selectorActionBar(
            "Confirmación de preselección y petición de ofertas",
            isRoleCliente ? "Se avisará a SOFEIN para que valide la preselección y pida las cotizaciones" : "Se emitirá la solicitud formal a los proveedores para que coticen el suministro",
            !open ? `<span class="dossier-chip complete">Ofertas solicitadas</span>`
              : isRoleCliente ? (matching.seleccionClienteEnviada
                ? `<span class="dossier-chip info">Preselección enviada a SOFEIN</span>`
                : `<button class="admin-primary-button" id="requestClientQuotesBtn" ${ref} type="button">${icon("file", 14)} Confirmar preselección y solicitar ofertas</button>`)
              : `${matching.seleccionClienteEnviada ? `<span class="dossier-chip info">El cliente ha enviado su preselección</span>` : `<span class="dossier-chip">El cliente aún no ha enviado su preselección</span>`}
                 <button class="admin-primary-button" id="emitRfqOrdersBtn" ${ref} type="button">${icon("file", 14)} Confirmar preselección y solicitar ofertas</button>`
          )}
        `;
      }
    }

    // 3. Cotización
    else if (viewStep === "peticion_cotizaciones") {
      const pedidos = matching.proveedoresSeleccionadosPorCliente.map(prvById).filter(Boolean);
      const open = matching.faseSelector === "peticion_cotizaciones";
      if (isRoleCliente) {
        contentHTML = `
          <div class="selector-quote-list">
            ${pedidos.map(prv => `
              <div class="selector-quote-row">
                <div><strong>${escHTML(prv.nombre)}</strong><small>${escHTML(prv.sede)}</small></div>
                <span class="dossier-chip ${open ? "pending" : "complete"}">${open ? "En espera" : "Oferta validada"}</span>
              </div>
            `).join("")}
          </div>
          ${selectorActionBar("Ofertas en espera", "SOFEIN validará las ofertas recibidas y pasarás directamente a 4. Selección", `<span class="dossier-chip info">${open ? "Pendiente de SOFEIN" : "Validadas"}</span>`)}
        `;
      } else {
        const received = pedidos.filter(prv => getQuoteEstado(matching, prv.id) !== "pendiente");
        contentHTML = `
          ${open && received.length < pedidos.length ? `
            <div style="display:flex;justify-content:flex-end;margin-bottom:10px">
              <button class="admin-quiet-button" type="button" id="simulateAllQuotesBtn" ${ref}>${icon("check", 13)} Simular recepción de las ofertas pendientes</button>
            </div>
          ` : ""}
          <div class="selector-quote-list">
            ${pedidos.map(prv => {
              const q = matching.cotizaciones[prv.id];
              const estado = getQuoteEstado(matching, prv.id);
              const diff = estado !== "pendiente" ? getQuoteDeliveryDiff(q, sum) : null;
              return `
                <article class="selector-quote-card">
                  <div class="selector-quote-card-head">
                    <div><strong>${escHTML(prv.nombre)}</strong><small>${escHTML(prv.sede)} · CIF ${prv.cif}</small></div>
                    ${estado === "pendiente" ? `<span class="dossier-chip pending">Pendiente de respuesta</span>` : renderQuoteEstadoBadge(estado)}
                  </div>
                  ${estado !== "pendiente" ? `
                    <div class="selector-info-grid">
                      <div class="selector-info-item"><span>Precio unitario</span><strong>${formatEuroUnit(q.precioUnitario)}</strong></div>
                      <div class="selector-info-item"><span>Precio total</span><strong>${formatEuro(q.precioTotal)}</strong></div>
                      <div class="selector-info-item"><span>Plazo de entrega</span><strong>${formatIsoDateEs(q.fechaEntregaIso)}${diff ? ` <span class="dossier-chip ${diff.cls}" style="font-size:0.66rem">${diff.text}</span>` : ""}</strong></div>
                      <div class="selector-info-item"><span>Condiciones de pago</span><strong>${escHTML(q.condicionesPago)}</strong></div>
                      <div class="selector-info-item"><span>Validez de la oferta</span><strong class="${q.validezDias < QUOTE_MIN_VALIDEZ_DIAS ? "is-warning-text" : ""}">${q.validezDias} días naturales</strong></div>
                      <div class="selector-info-item is-wide"><span>Conformidades a las que se compromete</span>${renderConformidadTags(q.conformidades)}</div>
                    </div>
                  ` : ""}
                </article>
              `;
            }).join("")}
          </div>
          ${selectorActionBar(
            "Validar ofertas",
            "Al haber recibido todas las ofertas, estas se podrán validar y el cliente podrá compararlas para decidir con qué proveedor formalizar el pedido",
            !open ? `<span class="dossier-chip complete">Ofertas validadas</span>`
              : received.length ? `<button class="admin-primary-button" id="goToComparisonBtn" ${ref} type="button">${icon("check", 14)} Validar cotizaciones</button>`
              : `<span class="dossier-chip">Esperando ofertas</span>`
          )}
        `;
      }
    }

    // 4. Selección (comparativa)
    else if (viewStep === "comparativa") {
      const quotes = matching.proveedoresSeleccionadosPorCliente
        .map(id => matching.cotizaciones[id])
        .filter(q => q && q.estado !== "pendiente");
      const winnerQ = quotes.find(q => q.nombre === matching.proveedorAdjudicado) || null;
      const open = matching.faseSelector === "comparativa";
      const clienteEditable = isRoleCliente && open && !matching.adjudicacionConfirmadaCliente;
      const reqSet = new Set(matching.requisitosExigidosCliente || []);
      const col = (q, html) => `<td class="${q.nombre === matching.proveedorAdjudicado ? "is-winner" : ""}">${html}</td>`;
      const row = (label, fn) => `<tr><td class="selector-matrix-label">${label}</td>${quotes.map(q => col(q, fn(q))).join("")}</tr>`;

      contentHTML = `
        <div class="selector-matrix-wrap">
          <table class="selector-matrix-table">
            <thead>
              <tr>
                <th style="width:170px">Proveedor</th>
                ${quotes.map(q => `
                  <th class="${q.nombre === matching.proveedorAdjudicado ? "is-winner" : ""}">
                    <strong>${escHTML(q.nombre)}</strong>
                    ${q.nombre === matching.proveedorAdjudicado ? `<span class="dossier-chip complete" style="font-size:0.66rem">${matching.faseSelector === "adjudicado" ? "Adjudicado" : "Elegido"}</span>` : ""}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${row("Sede", q => escHTML(q.sede))}
              ${row("CIF", q => q.cif)}
              ${row("Precio unitario", q => `<strong>${formatEuroUnit(q.precioUnitario)}</strong>`)}
              ${row("Precio total", q => `<strong class="selector-quote-price">${formatEuro(q.precioTotal)}</strong>`)}
              ${row("Plazo de entrega", q => { const d = getQuoteDeliveryDiff(q, sum); return `${formatIsoDateEs(q.fechaEntregaIso)}${d ? `<br><span class="dossier-chip ${d.cls}" style="font-size:0.66rem">${d.text}</span>` : ""}`; })}
              ${row("Condiciones de pago", q => escHTML(q.condicionesPago))}
              ${row("Validez de la oferta", q => `<span class="${q.validezDias < QUOTE_MIN_VALIDEZ_DIAS ? "is-warning-text" : ""}">${q.validezDias} días naturales</span>`)}
              ${row("Conformidades", q => renderConformidadTags(q.conformidades))}
              ${isRoleCliente ? row("", q => `
                <button class="admin-primary-button selector-choose-btn ${q.nombre === matching.proveedorAdjudicado ? "is-chosen" : ""}" type="button" data-select-winning-prv="${escHTML(q.nombre)}" ${ref} ${clienteEditable ? "" : "disabled"}>
                  ${q.nombre === matching.proveedorAdjudicado ? `${icon("check", 14)} Elegido` : "Elegir este proveedor"}
                </button>
              `) : ""}
            </tbody>
          </table>
        </div>

        <section class="selector-reqs-box">
          <strong>Requisitos contractuales exigibles al proveedor</strong>
          <small>${isRoleCliente ? "Elige cuáles de las conformidades que ofrece el proveedor elegido deben cumplirse en el pedido." : "Elegidos por el cliente entre las conformidades que ofrece el proveedor."}</small>
          ${winnerQ ? `
            <div class="selector-conf-picker">
              ${(winnerQ.conformidades || []).map(c => clienteEditable ? `
                <label class="selector-conf-option">
                  <input type="checkbox" data-req-exigible-check="${escHTML(c)}" ${ref} ${reqSet.has(c) ? "checked" : ""} />
                  <span>${icon("shield", 12)} ${escHTML(c)}</span>
                </label>
              ` : `<span class="selector-homologation-chip ${reqSet.has(c) ? "is-required" : "is-muted"}">${icon(reqSet.has(c) ? "check" : "shield", 12)} ${escHTML(c)}${reqSet.has(c) ? "" : " · no exigido"}</span>`).join("")}
            </div>
          ` : `<p class="reg-empty">${isRoleCliente ? "Elige primero un proveedor en la tabla." : "El cliente todavía no ha elegido proveedor."}</p>`}
        </section>

        ${isRoleCliente
          ? selectorActionBar("Confirmar adjudicación", "Al confirmar, SOFEIN validará la selección y se formalizará el pedido entre cliente y proveedor",
              !open ? `<span class="dossier-chip complete">Adjudicación validada</span>`
                : matching.adjudicacionConfirmadaCliente ? `<span class="dossier-chip info">Enviada a SOFEIN</span>`
                : `<button class="admin-primary-button" id="confirmAwardBtn" ${ref} type="button" ${winnerQ ? "" : "disabled"}>${icon("award", 14)} Confirmar adjudicación</button>`)
          : selectorActionBar("Validar la adjudicación", "Al validar, se formalizará el pedido entre cliente y proveedor",
              !open ? `<span class="dossier-chip complete">Pedido formalizado</span>`
                : matching.adjudicacionConfirmadaCliente ? `<button class="admin-primary-button" id="formalizePedidoBtn" ${ref} type="button">${icon("check", 14)} Validar adjudicación</button>`
                : `<span class="dossier-chip">Esperando la confirmación del cliente</span>`)}
      `;
    }

    // Selección terminada
    else if (viewStep === "adjudicado") {
      const q = Object.values(matching.cotizaciones).find(x => x.nombre === matching.proveedorAdjudicado);
      contentHTML = `
        <div class="selector-awarded-card">
          <span class="dossier-chip complete">✓ Selección completada</span>
          <h2>Proveedor adjudicatario: ${escHTML(matching.proveedorAdjudicado || sum?.proveedor || "—")}</h2>
          ${q ? `
            <div class="selector-info-grid">
              <div class="selector-info-item"><span>Precio total</span><strong>${formatEuro(q.precioTotal)}</strong></div>
              <div class="selector-info-item"><span>Plazo de entrega</span><strong>${formatIsoDateEs(q.fechaEntregaIso)}</strong></div>
              <div class="selector-info-item"><span>Condiciones de pago</span><strong>${escHTML(q.condicionesPago)}</strong></div>
              <div class="selector-info-item is-wide"><span>Requisitos contractuales exigidos</span>${renderConformidadTags(matching.requisitosExigidosCliente)}</div>
            </div>
          ` : ""}
          <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:16px">
            <button class="admin-quiet-button" type="button" data-switch-selector-step="comparativa" ${ref}>${icon("table", 14)} Ver la comparativa</button>
            <button class="admin-primary-button" type="button" data-go="#${activeRole}/expedientes/${exp.id}?sumId=${sum ? sum.id : ""}">${icon("arrow", 14)} Ir al expediente</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="selector-view-wrap" style="max-width:1200px;margin:0 auto">
        ${breadcrumbHTML}
        <div class="admin-view-head" style="margin-bottom:14px"><div><h1>Selector de Proveedores</h1></div></div>
        ${renderSelectorSumInfoHTML(exp, sum)}
        <div class="selector-stepper-wrap">${stepperHTML}</div>
        ${contentHTML}
      </div>
    `;
  }

  // Cotizaciones del proveedor (todas las peticiones recibidas)
  function renderProveedorCotizacionesView() {
    const rows = [];
    SUMINISTROS.forEach(sum => {
      const exp = EXPEDIENTES.find(e => e.id === sum.expId);
      if (!exp) return;
      const m = ensureSuministroMatching(exp, sum);
      const estado = getQuoteEstado(m, SELECTOR_MY_PROVIDER_ID);
      if (estado) rows.push({ exp, sum, estado });
    });
    const order = { pendiente: 0, enviada: 1, adjudicada: 2, rechazada: 3 };
    rows.sort((a, b) => order[a.estado] - order[b.estado]);
    return `
      <div class="admin-view-head"><div><h1>Cotizaciones</h1></div></div>
      ${rows.length ? `
        <section class="doc-clean-table-card">
          <div class="doc-clean-table-wrap">
            <table class="doc-clean-table quotes-table">
              <thead>
                <tr>
                  <th>Expediente</th>
                  <th>Suministro</th>
                  <th>Unidades</th>
                  <th>Cliente</th>
                  <th>Destino</th>
                  <th>Fecha objetivo</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(({ exp, sum, estado }) => `
                  <tr>
                    <td><span class="dossier-sum-code">${exp.id}</span></td>
                    <td><strong>${escHTML(sum.tipo)}</strong><br><small style="color:var(--entity-muted)">${sum.id}</small></td>
                    <td>${escHTML(sum.unidades || "—")}</td>
                    <td>${escHTML(sum.cliente || exp.cliente)}</td>
                    <td>${escHTML(sum.destino || exp.destinatarioFinal)}</td>
                    <td><span class="doc-tbl-date">${sum.fechaEntrega || "—"}</span></td>
                    <td>${renderQuoteEstadoBadge(estado)}</td>
                    <td><button class="admin-primary-button" type="button" data-go="#proveedor/selector/${exp.id}?sum=${sum.id}" style="white-space:nowrap">${icon("file", 13)} Abrir Cotización</button></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>
      ` : `<div class="reg-empty-card"><p>No tienes peticiones de cotización.</p></div>`}
    `;
  }

  /* ============================================================
     HELPERS DE SUMINISTROS, ICONOS, REGISTRO Y LÓGICA ESTANCA POR PERFILES
     ============================================================ */
  function getSuministroTypeIcon(tipo = "", desc = "") {
    const t = (String(tipo) + " " + String(desc)).toLowerCase();
    if (t.includes("traviesa")) return "route";
    if (t.includes("carril")) return "activity";
    if (t.includes("sujeci") || t.includes("fijaci") || t.includes("clip") || t.includes("tirafondo") || t.includes("placa") || t.includes("arandela") || t.includes("clavaz")) return "cog";
    if (t.includes("balasto") || t.includes("cantera") || t.includes("árido")) return "box";
    if (t.includes("desv") || t.includes("aparato") || t.includes("cruzamiento")) return "shield";
    return "packageCheck";
  }

  function isSuministroRelevantForRole(exp, sum, role) {
    if (!sum) return false;
    if (role === "admin" || role === "cliente" || role === "destinatario") return true;
    if (role === "proveedor") {
      const myEntity = (PLAYERS.proveedor && PLAYERS.proveedor.entity) || "IberRail";
      const myKey = myEntity.split(" ")[0].toLowerCase(); // "iberrail"
      const sumProv = String(sum.proveedor || "").toLowerCase();
      if (sumProv.includes(myKey)) return true;
      // Si el suministro está en fase de cotización (Por determinar) y el tipo encaja con las categorías del proveedor
      if (sumProv.includes("por determinar")) {
        const tipoLower = String(sum.tipo || "").toLowerCase();
        if (tipoLower.includes("traviesa") || tipoLower.includes("sujeci") || tipoLower.includes("fijaci") || tipoLower.includes("placa") || tipoLower.includes("desv")) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  function getRoleVisibleExpSuministros(exp, role = activeRole) {
    if (!exp) return [];
    const all = SUMINISTROS.filter(s => s.expId === exp.id);
    if (role === "proveedor") {
      const filtered = all.filter(s => isSuministroRelevantForRole(exp, s, "proveedor"));
      return filtered.length ? filtered : all.slice(0, 1);
    }
    return all;
  }

  function formatSuministrosBudgetSum(suministrosList, fallbackText = "0 €") {
    if (!suministrosList || !suministrosList.length) return fallbackText;
    const total = suministrosList.reduce((acc, s) => acc + parseBudgetNumber(s.presupuesto || "0"), 0);
    if (!total) return fallbackText;
    return total.toLocaleString("es-ES") + " €";
  }

  function getNoticePhaseIdx(n) {
    if (typeof n.phaseIdx === "number") return n.phaseIdx;
    const cat = String(n.categoria || "").toLowerCase();
    const text = `${n.titulo || ""} ${n.descripcion || ""}`.toLowerCase();
    if (cat.includes("cotizaci") || cat.includes("preselecci") || text.includes("fase 2") || text.includes("selector")) return 1;
    if (cat.includes("cierre") || cat.includes("pasaporte") || text.includes("pasaporte") || text.includes("cerrado")) return 3;
    if (text.includes("fase 1") || text.includes("pliego inicial")) return 0;
    return 2;
  }

  // Historial de actividad del expediente (solo SOFEIN). Cada entrada guarda fase y suministro para poder filtrar.
  function ensureExpedienteRegistroCambios(exp) {
    if (!exp) return [];
    if (Array.isArray(exp.registroCambios)) return exp.registroCambios;

    const faseActual = Math.min(exp.faseActual ?? 0, PHASES.length - 1);
    exp.registroCambios = [
      {
        id: `ACT-${exp.id.slice(-4)}-03`,
        fecha: "16 jun 2026 · 14:20",
        autor: "SOFEIN Admin",
        tipo: "Avance de fase",
        suministro: "General",
        fase: faseActual,
        titulo: `Actualización de fase activa a ${PHASES[faseActual]?.name || "Gestión del pedido"}`,
        detalle: "Verificación de hitos documentales y sincronización del cronograma de entregas."
      },
      {
        id: `ACT-${exp.id.slice(-4)}-02`,
        fecha: "12 jun 2026 · 10:05",
        autor: `Cliente (${exp.cliente})`,
        tipo: "Documentación",
        suministro: "SUM-01",
        fase: 0,
        titulo: "Validación de especificaciones técnicas y pliego base",
        detalle: "Pliego técnico revisado y permisos de lectura asignados a los actores del expediente."
      },
      {
        id: `ACT-${exp.id.slice(-4)}-01`,
        fecha: exp.fechaAlta || "10 jun 2026 · 09:00",
        autor: "SOFEIN Digital",
        tipo: "Alta de expediente",
        suministro: "General",
        fase: 0,
        titulo: `Apertura e inicialización del expediente ${exp.id}`,
        detalle: `Constitución de bandeja estanca para ${exp.destinatarioFinal}.`
      }
    ];
    return exp.registroCambios;
  }

  const isGeneralSuministroRef = ref => !ref || /^(General|Todos|Expediente)$/i.test(ref);

  // fase: índice 0-3; si no se indica, la fase en curso del suministro afectado (o del expediente)
  function addExpedienteCambioLog(exp, { tipo = "Cambio operativo", suministro = "General", titulo, detalle = "", soloAdmin = false, fase = null }) {
    if (!exp) return;
    const list = ensureExpedienteRegistroCambios(exp);
    const now = new Date();
    const nowStr = `${now.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "")} · ${now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;
    const sumRef = isGeneralSuministroRef(suministro) ? "General" : suministro;
    const sum = sumRef !== "General" ? SUMINISTROS.find(x => x.id === sumRef) : null;
    const faseIdx = Number.isInteger(fase) ? fase : Math.min((sum ? sum.faseActual : exp.faseActual) ?? 0, PHASES.length - 1);
    const actorLabel = activeRole === "admin" ? "SOFEIN Admin" : activeRole === "cliente" ? `Cliente (${exp.cliente})` : activeRole === "proveedor" ? `Proveedor (${sum?.proveedor || exp.proveedor})` : "Auditor";
    list.unshift({
      id: `ACT-${exp.id.slice(-4)}-${String(list.length + 1).padStart(2, "0")}`,
      fecha: nowStr,
      autor: actorLabel,
      tipo,
      suministro: sumRef,
      fase: faseIdx,
      titulo,
      detalle,
      soloAdmin: !!soloAdmin
    });
  }

  /* ---------- Avisos automáticos ----------
     Cada evento avisa solo a quien tiene que actuar o enterarse (ver docs/PETICIONES_EXPEDIENTE.md, bloque F).
     roles: subconjunto de ["admin", "cliente", "proveedor"]. */
  function pushAutoNotice({ exp, sumId = null, roles, categoria, titulo, descripcion, accion = "Ver expediente", tab = "comms", ruta = null, tagClass = "warning" }) {
    if (!exp || !roles || !roles.length) return;
    const sum = sumId ? SUMINISTROS.find(s => s.id === sumId) : null;
    NOTICES.unshift({
      id: `AV-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
      expId: exp.id,
      sumId,
      suministro: sum ? `${sum.num} · ${sum.tipo}` : "General del Expediente",
      categoria,
      tagClass,
      titulo,
      descripcion,
      fecha: "Hoy, ahora",
      roles: [...new Set(roles)],
      accion,
      enlace: ruta ? `#${roles[0]}/${ruta}` : `#${roles[0]}/expedientes/${exp.id}?tab=${tab}`,
      auto: true
    });
  }

  // El Cliente solo ve avisos de sus expedientes; el Proveedor, solo los de sus suministros
  function canRoleSeeNotice(n, role) {
    if (!n.roles.includes(role)) return false;
    if (role === "cliente") {
      const e = EXPEDIENTES.find(x => x.id === n.expId);
      if (e && !isExpOfActiveCliente(e)) return false;
    }
    if (role === "proveedor" && n.sumId) {
      const s = SUMINISTROS.find(x => x.id === n.sumId);
      if (s && !isSuministroOfActiveProveedor(s)) return false;
    }
    return true;
  }

  const roleLabel = role => role === "cliente" ? "El cliente" : role === "proveedor" ? "El proveedor" : "SOFEIN";

  // Partes (cliente/proveedor) que pueden ver un documento, sin contar a quien lo subió
  const docAudience = (del, exceptRole = null) =>
    ["cliente", "proveedor"].filter(r => (!Array.isArray(del.visibleTo) || del.visibleTo.includes(r)) && r !== exceptRole);
  const ownerToRole = owner => /cliente/i.test(owner || "") ? "cliente" : /proveedor/i.test(owner || "") ? "proveedor" : null;

  /* ---------- Registro de incidencias y cambios (REG-xxx) ----------
     Solo SOFEIN registra. Cliente y Proveedor firman; con las dos firmas el registro
     se cierra, se emite su adenda (enlazada al pasaporte) y se aplican los nuevos valores al suministro. */
  const isRegistroCerrado = r => !!r.firmaCliente && !!r.firmaProveedor;

  function nextRegistroId(exp) {
    const max = (exp.incidencias || []).reduce((m, r) => {
      const n = parseInt(String(r.id).replace(/^REG-/, ""), 10);
      return /^REG-\d+$/.test(r.id) && n > m ? n : m;
    }, 0);
    return `REG-${String(max + 1).padStart(3, "0")}`;
  }

  const formatIsoDateEs = iso => iso ? new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "") : "";

  // Textos de impacto: plazo, unidades y presupuesto (antes → después)
  function describeRegistroImpact(r) {
    const p = r.previo || {};
    let plazo = "Sin cambios";
    if (r.nuevaFechaEntregaIso && r.nuevaFechaEntregaIso !== p.fechaEntregaIso) {
      const diff = p.fechaEntregaIso ? Math.round((new Date(r.nuevaFechaEntregaIso) - new Date(p.fechaEntregaIso)) / 86400000) : null;
      plazo = `${p.fechaEntrega || "—"} → ${formatIsoDateEs(r.nuevaFechaEntregaIso)}${diff !== null ? ` (${diff > 0 ? "+" : ""}${diff} días)` : ""}`;
    }
    const unidades = r.nuevasUnidades && r.nuevasUnidades !== p.unidades ? `${p.unidades || "—"} → ${r.nuevasUnidades}` : "Sin cambios";
    let coste = "Sin cambios";
    if (r.nuevoPresupuesto && r.nuevoPresupuesto !== p.presupuesto) {
      const delta = parseBudgetNumber(r.nuevoPresupuesto) - parseBudgetNumber(p.presupuesto);
      coste = `${p.presupuesto || "—"} → ${r.nuevoPresupuesto}${p.presupuesto ? ` (${delta >= 0 ? "+" : "−"}${Math.abs(delta).toLocaleString("es-ES")} €)` : ""}`;
    }
    return { plazo, unidades, coste };
  }

  // Campos que siguen usando la adenda oficial y el pasaporte
  function syncRegistroLegacyFields(r) {
    const imp = describeRegistroImpact(r);
    r.tipo = r.titulo;
    r.categoria = "Incidencia / cambio";
    r.fecha = r.fechaRegistro;
    r.origen = "SOFEIN";
    r.propuestaMediacion = r.solucion;
    r.impactoPlazo = imp.plazo;
    r.impactoCoste = imp.coste;
    r.nuevoPlazoAcordado = r.nuevaFechaEntregaIso ? `Nueva fecha de entrega: ${formatIsoDateEs(r.nuevaFechaEntregaIso)}` : "Sin cambio de plazo";
    r.nuevoCosteAcordado = r.nuevoPresupuesto || "Sin alteración económica";
    r.firmaSofein = true;
    r.firmaSofeinFecha = r.fechaRegistro;
    r.firmaSofeinUsuario = "SOFEIN";
    r.estado = isRegistroCerrado(r) ? "Cerrado" : "Pendiente de firmas";
    return r;
  }

  function closeRegistroIfSigned(exp, r) {
    if (!isRegistroCerrado(r) || r.adendaId) return false;
    const sum = SUMINISTROS.find(s => s.id === r.sumId);
    if (sum) {
      if (r.nuevaFechaEntregaIso) {
        sum.fechaEntregaIso = r.nuevaFechaEntregaIso;
        sum.fechaEntrega = formatIsoDateEs(r.nuevaFechaEntregaIso);
      }
      if (r.nuevasUnidades) {
        sum.unidades = r.nuevasUnidades;
        sum.unidadesNum = parseInt(r.nuevasUnidades.replace(/\D/g, ""), 10) || sum.unidadesNum;
      }
      if (r.nuevoPresupuesto) sum.presupuesto = r.nuevoPresupuesto;
    }

    const year = new Date().getFullYear();
    const adendaNum = (exp.incidencias || []).filter(i => i.adendaId).length + 1;
    r.adendaId = `ADENDA-${year}-${String(adendaNum).padStart(2, "0")}`;
    r.adendaFecha = `${todayDocDate()}, ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;
    r.adendaHash = "sha256-" + Array.from({ length: 4 }, () => Math.random().toString(36).slice(2, 10)).join("");
    syncRegistroLegacyFields(r);

    // Documento de adenda en la Documentación del suministro afectado (fase en curso)
    const delivMap = sum && SUMINISTROS.filter(s => s.expId === exp.id).length > 1 ? ensureSuministroDeliverables(exp, sum) : exp.deliverables;
    const phaseIdx = Math.min((sum ? sum.faseActual : exp.faseActual) ?? 0, PHASES.length - 1);
    if (!delivMap[phaseIdx]) delivMap[phaseIdx] = [];
    delivMap[phaseIdx].push({
      name: `Adenda ${r.adendaId} · ${r.id} ${r.titulo}`,
      reqDate: null,
      owner: "SOFEIN",
      uploadedBy: "SOFEIN",
      state: "complete",
      format: "PDF",
      file: `${r.adendaId}-${r.id}.pdf`,
      date: todayDocDate(),
      visibleTo: ["admin", "cliente", "proveedor", "destinatario"],
      notes: "Generada al firmar cliente y proveedor",
      hash: r.adendaHash
    });

    addExpedienteCambioLog(exp, {
      tipo: "Cierre de registro",
      suministro: r.sumId || "General",
      titulo: `${r.id} cerrado con las dos firmas · ${r.adendaId}`,
      detalle: r.titulo
    });
    return true;
  }

  EXPEDIENTES.forEach(e => (e.incidencias || []).forEach(syncRegistroLegacyFields));

  function ensureSuministroDeliverables(exp, sum) {
    if (!sum) return exp.deliverables;
    if (sum.deliverables) return sum.deliverables;

    const cloned = { 0: [], 1: [], 2: [], 3: [] };
    [0, 1, 2, 3].forEach(pIdx => {
      const srcList = (exp.deliverables && exp.deliverables[pIdx]) || [];
      if (pIdx <= sum.faseActual) {
        cloned[pIdx] = srcList.map(d => ({
          ...d,
          visibleTo: Array.isArray(d.visibleTo) ? [...d.visibleTo] : ["admin", "cliente", "proveedor"],
          reqDate: d.reqDate || d.date || "12 jun 2026",
          notes: d.notes || ""
        }));
      }
    });

    if (cloned[0].length === 0) {
      cloned[0].push({
        name: `Especificación Técnica — ${sum.tipo}`,
        reqDate: "10 jun 2026",
        owner: "Cliente",
        state: "complete",
        format: "PDF",
        file: `Pliego-${sum.id}.pdf`,
        date: "12 jun 2026",
        visibleTo: ["admin", "cliente", "proveedor", "destinatario"],
        notes: `Lote ${sum.id} (${sum.unidades})`
      });
    }

    sum.deliverables = cloned;
    return sum.deliverables;
  }

  function getActiveExpSuministro(exp) {
    if (!exp) return null;
    const list = getRoleVisibleExpSuministros(exp, activeRole);
    if (!list.length) return null;
    let found = list.find(s => s.id === activeDossierSuministroId);
    if (!found) {
      found = list[0];
      activeDossierSuministroId = found.id;
    }
    return found;
  }

  function getActiveDeliverablesMap(exp) {
    const sum = getActiveExpSuministro(exp);
    const allList = SUMINISTROS.filter(s => s.expId === exp.id);
    if (sum && allList.length > 1) {
      return ensureSuministroDeliverables(exp, sum);
    }
    [0, 1, 2, 3].forEach(idx => {
      if (!exp.deliverables[idx]) exp.deliverables[idx] = [];
    });
    return exp.deliverables;
  }

  function formatVisibleToLabel(visibleTo) {
    if (!Array.isArray(visibleTo) || visibleTo.length === 0) return "Solo Admin";
    const map = {
      cliente: "Cliente",
      proveedor: "Proveedor",
      destinatario: "Destinatario"
    };
    const others = visibleTo.filter(r => r !== "admin").map(r => map[r] || r);
    if (others.length === 0) return "Solo SOFEIN";
    if (others.length >= 3) return "Todos los actores";
    return others.join(", ");
  }

  function canRoleSeeDeliverable(del, role) {
    if (role === "admin") return true;
    if (Array.isArray(del.visibleTo)) {
      return del.visibleTo.includes(role);
    }
    return true;
  }

  function canRoleUploadToSlot(del, role) {
    if (role === "admin") return true;
    if (role === "destinatario") return false;
    const owner = String(del.owner || "").toLowerCase();
    if (role === "cliente") return owner.includes("cliente");
    if (role === "proveedor") return owner.includes("proveedor");
    return false;
  }

  const todayDocDate = () => new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");

  // Fecha de subida legible: "-" si no hay archivo o si el dato es un estado ("Pendiente", "En curso"…)
  function getDocUploadDateText(del) {
    if (!del.file) return "-";
    const d = del.uploadDate || del.date;
    if (!d || /pendiente|listo|en curso|al cierre/i.test(d)) return "-";
    return d.replace(/, recién indexado$/i, "");
  }

  function getDocUploaderText(del) {
    if (!del.file) return "-";
    return del.uploadedBy || del.owner || "-";
  }

  // PDF mínimo de una página para los documentos de ejemplo (la maqueta no guarda archivos reales)
  const samplePdfUrlCache = new Map();
  function getSamplePdfUrl(title) {
    if (samplePdfUrlCache.has(title)) return samplePdfUrlCache.get(title);
    const ascii = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7E]/g, "?").replace(/([()\\])/g, "\\$1");
    const lines = ["SOFEIN Procurement - Documento de muestra", "", ascii(title), "", "La maqueta no almacena archivos: este PDF sustituye al documento real."];
    const stream = "BT /F1 13 Tf 60 780 Td 18 TL " + lines.map(l => `(${l}) Tj T*`).join(" ") + " ET";
    const objs = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
    ];
    let pdf = "%PDF-1.4\n";
    const offsets = [];
    objs.forEach((o, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const xref = pdf.length;
    pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map(o => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
    pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
    samplePdfUrlCache.set(title, url);
    return url;
  }

  const getDocFileUrl = del => del.fileUrl || getSamplePdfUrl(`${del.name} (${del.file})`);

  function viewDocFile(del) {
    if (!del || !del.file) return;
    const a = document.createElement("a");
    a.href = getDocFileUrl(del);
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadDocFile(del) {
    if (!del || !del.file) return;
    const a = document.createElement("a");
    a.href = getDocFileUrl(del);
    a.download = del.fileUrl ? del.file : del.file.replace(/\.[^.]+$/, "") + ".pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Archivo elegido en un modal → campos del documento
  function applyUploadedFileToDoc(del, file) {
    del.file = file.name;
    del.fileUrl = URL.createObjectURL(file);
    del.format = (file.name.split(".").pop() || "Archivo").toUpperCase();
    del.date = todayDocDate();
    del.uploadDate = del.date;
    del.uploadedBy = activeRole === "admin" ? "SOFEIN" : activeRole === "cliente" ? "Cliente" : activeRole === "proveedor" ? "Proveedor" : "—";
  }

  // Documentos de una fase que no están validados (pendientes, en revisión o con observaciones)
  const getPhaseIncompleteDocs = (delivMap, idx) => (delivMap?.[idx] || []).filter(d => d.state !== "complete");

  function openAdvancePhaseWarningModal(phaseIdx, incompletos, onConfirm) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const label = { pending: "Pendiente", review: "En revisión", rejected: "Con observaciones" };
    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="advanceWarnBackdrop">
        <div class="procurement-modal" style="width:min(520px,100%)">
          <div class="procurement-modal-head">
            <div><h3>Documentación incompleta en la fase ${phaseIdx + 1}</h3></div>
            <button type="button" id="closeAdvanceWarnBtn" aria-label="Cerrar">×</button>
          </div>
          <div class="procurement-modal-body" style="gap:10px">
            <p style="margin:0;font-size:0.82rem;color:var(--entity-text)">Hay ${incompletos.length} documento(s) sin validar. Puedes avanzar igualmente: seguirán marcados en esta fase para completarlos después.</p>
            <ul class="advance-warn-list">
              ${incompletos.map(d => `<li><strong>${escHTML(d.name)}</strong><span>${label[d.state] || "Pendiente"}</span></li>`).join("")}
            </ul>
          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="cancelAdvanceWarnBtn">Cancelar</button>
            <button class="admin-primary-button" type="button" id="confirmAdvanceWarnBtn">${icon("check", 14)} Avanzar de fase</button>
          </div>
        </div>
      </div>
    `;
    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeAdvanceWarnBtn")?.addEventListener("click", close);
    document.getElementById("cancelAdvanceWarnBtn")?.addEventListener("click", close);
    document.getElementById("advanceWarnBackdrop")?.addEventListener("click", e => { if (e.target.id === "advanceWarnBackdrop") close(); });
    document.getElementById("confirmAdvanceWarnBtn")?.addEventListener("click", () => { close(); onConfirm(); });
  }

  function getTableDocStatusBadge(state) {
    if (state === "complete") {
      return `<span class="entity-status complete"><i></i>Validado</span>`;
    }
    if (state === "review") {
      return `<span class="entity-status review"><i></i>En revisión</span>`;
    }
    if (state === "rejected") {
      return `<span class="entity-status pending" style="color:#dc2626"><i></i>Con observaciones</span>`;
    }
    return `<span class="entity-status pending"><i></i>Pendiente</span>`;
  }

  /* ============================================================
     EL CONSTRUCTOR DE EXPEDIENTES (GESTIÓN DEL EXPEDIENTE ADAPTADA POR PERFIL)
     ============================================================ */
  function renderHistoryTableHTML(entries) {
    return `
      <section class="doc-clean-table-card">
        <div class="doc-clean-table-wrap">
          <table class="doc-clean-table history-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Fase</th>
                <th>Suministro</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Autor</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(c => `
                <tr class="${c.soloAdmin ? "is-private" : ""}">
                  <td><span class="doc-tbl-date">${c.fecha}</span></td>
                  <td><span class="doc-tbl-phase">${Number.isInteger(c.fase) ? `${c.fase + 1}. ${SHORT_PHASE_NAMES[c.fase] || ""}` : "—"}</span></td>
                  <td><span class="doc-tbl-phase">${c.suministro && c.suministro !== "General" ? c.suministro : "General"}</span></td>
                  <td>
                    <span class="dossier-chip" style="font-size:0.68rem">${c.tipo}</span>
                    ${c.soloAdmin ? `<span class="dossier-chip history-private-chip" title="Anotación interna visible solo para SOFEIN">${icon("lock", 11)} Interna</span>` : ""}
                  </td>
                  <td>
                    <div class="doc-tbl-name-wrap">
                      <strong class="doc-tbl-name">${escHTML(c.titulo)}</strong>
                      ${c.detalle ? `<span style="font-size:0.72rem;color:var(--entity-muted)">${escHTML(c.detalle)}</span>` : ""}
                    </div>
                  </td>
                  <td><span class="doc-tbl-origin">${c.autor}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // Tarjeta de un registro (abierto o, dentro del historial, cerrado)
  function renderRegistroCardHTML(exp, r, { isRoleAdmin, isRoleCliente, isRoleProveedor, isDestinatario }) {
    const closed = isRegistroCerrado(r);
    const sum = SUMINISTROS.find(s => s.id === r.sumId);
    const imp = describeRegistroImpact(r);
    const adjuntos = (r.adjuntos || []).map((a, idx) => ({ ...a, idx })).filter(a => isRoleAdmin || !Array.isArray(a.visibleTo) || a.visibleTo.includes(activeRole));
    const regRef = `data-exp="${exp.id}" data-reg="${r.id}"`;

    const signerBox = (party, label) => {
      const signed = party === "cliente" ? r.firmaCliente : r.firmaProveedor;
      const fecha = party === "cliente" ? r.firmaClienteFecha : r.firmaProveedorFecha;
      const user = party === "cliente" ? r.firmaClienteUsuario : r.firmaProveedorUsuario;
      const canSign = !closed && !signed && activeRole === party;
      return `
        <div class="incident-signer-card">
          <div class="incident-signer-head">
            <span class="incident-signer-role">${label}</span>
            ${signed
              ? `<span class="incident-signer-status signed">${icon("check", 13)} Firmado</span>`
              : `<span class="incident-signer-status pending">${icon("alert", 13)} Pendiente</span>`}
          </div>
          ${signed ? `
            <div class="incident-signer-user" title="${escHTML(user || "")}">${escHTML(user || label)}</div>
            <div class="incident-signer-date">${fecha || ""}</div>
          ` : canSign ? `
            <button class="admin-primary-button" type="button" data-sign-incident-party="${party}" data-incident-id="${r.id}" data-exp-id="${exp.id}" style="padding:5px 10px;font-size:0.74rem;margin-top:2px">
              ${icon("check", 12)} Firmar
            </button>
          ` : `
            <div class="incident-signer-user" style="color:var(--entity-muted);font-style:italic">Pendiente de firma</div>
          `}
        </div>
      `;
    };

    return `
      <article class="incident-card reg-card ${closed ? "is-consolidated" : "is-pending-signs"}" id="reg-card-${r.id}">
        <div class="incident-card-top">
          <div>
            <div class="incident-card-meta">
              <span class="incident-chip-id">${r.id}</span>
              <span class="dossier-chip" style="font-size:0.68rem">${icon("box", 11)} ${r.sumId || "General"}${sum ? ` · ${escHTML(sum.tipo)}` : ""}</span>
              ${closed
                ? `<span class="entity-status complete"><i></i>Cerrado</span>`
                : `<span class="entity-status review"><i></i>Pendiente de firmas</span>`}
            </div>
            <div class="incident-card-title">
              <h3>${escHTML(r.titulo)}</h3>
              <p>Registrado por <b>SOFEIN</b> el ${r.fechaRegistro}</p>
            </div>
          </div>
          ${isRoleAdmin && !closed ? `
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <button class="admin-quiet-button" type="button" data-reg-edit="${r.id}" data-exp-id="${exp.id}" style="font-size:0.75rem">
                ${icon("edit", 13)} Editar Mediación
              </button>
              <button class="admin-quiet-button reg-delete-btn" type="button" data-reg-delete="${r.id}" data-exp-id="${exp.id}" style="font-size:0.75rem">
                ${icon("x", 13)} Eliminar
              </button>
            </div>
          ` : ""}
        </div>

        <p class="reg-description">${escHTML(r.descripcion || "")}</p>

        <div class="incident-impact-grid">
          <div class="incident-impact-item">
            <span class="impact-label">Impacto en plazo</span>
            <strong class="impact-val">${imp.plazo}</strong>
          </div>
          <div class="incident-impact-item">
            <span class="impact-label">Cambio en unidades</span>
            <strong class="impact-val">${imp.unidades}</strong>
          </div>
          <div class="incident-impact-item">
            <span class="impact-label">Impacto económico</span>
            <strong class="impact-val">${isDestinatario ? "[Reservado]" : imp.coste}</strong>
          </div>
        </div>

        <div class="reg-solution">
          <span class="reg-section-label">${icon("shield", 13)} Solución propuesta por SOFEIN</span>
          <p>${escHTML(r.solucion || "")}</p>
        </div>

        ${adjuntos.length ? `
          <div class="reg-attachments">
            <span class="reg-section-label">${icon("file", 13)} Adjuntos</span>
            ${adjuntos.map(a => `
              <div class="reg-attachment">
                <strong>${escHTML(a.name)}</strong>
                <span>${escHTML(a.file)}</span>
                <button class="doc-tbl-action-btn" type="button" data-reg-view-attach="${a.idx}" ${regRef}>${icon("eye", 12)} Ver</button>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <div class="incident-signers-grid">
          <div class="incident-signer-card">
            <div class="incident-signer-head">
              <span class="incident-signer-role">SOFEIN</span>
              <span class="incident-signer-status signed">${icon("check", 13)} Registrado</span>
            </div>
            <div class="incident-signer-user">SOFEIN</div>
            <div class="incident-signer-date">${r.fechaRegistro}</div>
          </div>
          ${signerBox("proveedor", "Proveedor")}
          ${signerBox("cliente", "Cliente")}
        </div>

        ${closed && r.adendaId ? `
          <div class="incident-consolidation-bar" style="background:rgba(16, 185, 129, 0.05);border-color:rgba(16, 185, 129, 0.28)">
            <div class="incident-consolidated-seal">
              ${icon("check", 18)}
              <span>Adenda <b>${r.adendaId}</b> · ${r.adendaFecha || ""}</span>
            </div>
            <button class="admin-quiet-button" type="button" data-view-addendum="${exp.id}" data-incident-id="${r.id}" style="color:#0F766E;font-weight:600">
              ${icon("file", 14)} Ver adenda
            </button>
          </div>
        ` : ""}
      </article>
    `;
  }

  function renderDossierBuilder(expId) {
    const exp = getActiveExpediente(expId);
    const allExpSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
    const expSuministros = getRoleVisibleExpSuministros(exp, activeRole);
    const cambiosLog = ensureExpedienteRegistroCambios(exp);

    // Suministro pedido desde la tabla de Suministros (?sumId=) si pertenece a este expediente
    const requestedSum = pendingDossierSumFocus ? expSuministros.find(s => s.id === activeDossierSuministroId) : null;
    pendingDossierSumFocus = false;

    if (lastOpenedExpId !== exp.id || requestedSum) {
      lastOpenedExpId = exp.id;
      const focusSum = requestedSum || expSuministros[0];
      activeDossierSuministroId = focusSum ? focusSum.id : null;
      activeDossierPhase = focusSum ? Math.min(focusSum.faseActual, PHASES.length - 1) : Math.min(exp.faseActual, PHASES.length - 1);
    }


    const currentSum = getActiveExpSuministro(exp);
    const activeEntityPhaseActual = (currentSum && allExpSuministros.length > 1)
      ? Math.min(currentSum.faseActual, PHASES.length - 1)
      : Math.min(exp.faseActual, PHASES.length - 1);

    if (activeDossierPhase >= PHASES.length) {
      activeDossierPhase = PHASES.length - 1;
    }

    const delivMap = getActiveDeliverablesMap(exp);
    const rawPhaseDeliverables = delivMap[activeDossierPhase] || [];
    const isDestinatario = activeRole === "destinatario";
    const isRoleAdmin = activeRole === "admin";
    const isRoleCliente = activeRole === "cliente";
    const isRoleProveedor = activeRole === "proveedor";

    // Metadatos visuales resumidos del expediente
    const v = getExpVisualMeta(exp, activeRole);

    const currentSumIconName = currentSum ? getSuministroTypeIcon(currentSum.tipo, currentSum.descripcion) : getSuministroTypeIcon(exp.producto);

    // Datos de la tarjeta de expediente adaptados al perfil (el Proveedor solo ve el alcance e importe de SUS suministros)
    const summaryNumSuministrosLabel = isRoleProveedor ? "Mis suministros asignados" : "Número de suministros";
    const summaryNumSuministrosVal = isRoleProveedor
      ? `${expSuministros.length} de mis suministros`
      : `${allExpSuministros.length || v.numSuministros} suministros`;

    const summaryBudgetLabel = isRoleProveedor ? "Presupuesto de mis suministros" : "Presupuesto estimado";
    const summaryBudgetVal = isDestinatario
      ? "[Reservado]"
      : isRoleProveedor
        ? formatSuministrosBudgetSum(expSuministros, exp.presupuestoTotal)
        : exp.presupuestoTotal;

    const summaryNextDeliveryDate = (isRoleProveedor && currentSum && currentSum.fechaEntrega)
      ? currentSum.fechaEntrega
      : v.proximaEntregaFecha;

    // 1. Sección plegable de Tarjetas por Suministro (filtrada según lo que concierne al perfil)
    const suministrosSectionTitle = isRoleProveedor
      ? `Mis suministros en este expediente (${expSuministros.length})`
      : `Suministros del expediente (${expSuministros.length})`;

    const suministrosCardsHTML = expSuministros.length >= 1 ? `
      <hr class="dossier-section-divider" />
      <details class="dossier-collapsible-block" id="dossierAnchorSums" data-collapse-key="suministros" ${dossierCollapseState.suministros !== false ? "open" : ""}>
        <summary class="dossier-collapsible-summary">
          <div class="dossier-collapsible-summary-left">
            <span class="dossier-section-kicker">${suministrosSectionTitle}</span>
            ${currentSum ? `
              <span class="dossier-active-sum-pill">
                ${icon(currentSumIconName, 12)} Seleccionado: <b>${currentSum.id}</b> · ${currentSum.tipo}
              </span>
            ` : ""}
          </div>
          <span class="dossier-collapsible-chevron" title="Colapsar / Expandir suministros">
            ${icon("chevronDown", 15)}
          </span>
        </summary>
        <div class="dossier-collapsible-body">
          <div class="dossier-suministros-grid">
            ${expSuministros.map(s => {
              const isSelected = currentSum && currentSum.id === s.id;
              const isSumClosed = s.estado === "cerrado" || !!exp.cerrado;
              const sStep = isSumClosed ? PHASES.length : Math.min((s.faseActual ?? 0) + 1, PHASES.length);
              const sPhaseName = SHORT_PHASE_NAMES[Math.min(s.faseActual ?? 0, PHASES.length - 1)] || "Alcance";
              const sDotClass = isSumClosed ? "is-closed" : s.estado === "finalizado" ? "is-completed" : s.accionesPendientes > 0 ? "is-pending-pulse" : "is-active";
              const sumIconName = getSuministroTypeIcon(s.tipo, s.descripcion);
              const sFaseIdx = Math.min(s.faseActual ?? 0, PHASES.length - 1);
              const sIsFinished = isSumClosed || s.estado === "finalizado";
              const sMiniBarsHTML = PHASES.map((p, idx) => {
                const isDone = idx < sFaseIdx || sIsFinished;
                const isCurrent = !sIsFinished && idx === sFaseIdx;
                return `<i class="exp-v2-bar ${isDone ? "is-done" : isCurrent ? "is-current" : ""}" title="${p.name}"></i>`;
              }).join("");
              const sKpi = getDeliveryKpi(s);
              return `
                <article class="dossier-sum-card ${isSelected ? "is-selected" : ""} ${isSumClosed ? "is-closed" : ""}" data-select-exp-suministro="${s.id}">
                  <div class="dossier-sum-card-top">
                    <div class="exp-v2-identity">
                      <i class="exp-v2-dot ${sDotClass}"></i>
                      <span class="sum-type-icon-badge" title="${s.tipo}">${icon(sumIconName, 13)}</span>
                      <span class="dossier-sum-code">${s.id}</span>
                    </div>
                    <div style="display:inline-flex;align-items:center;gap:8px">
                      <div class="exp-v2-phase-row phase-tone-${sStep}" title="Fase ${sStep} de ${PHASES.length}: ${sPhaseName}">
                        <span class="exp-v2-phase-num">${sStep}/${PHASES.length}</span>
                        <span class="exp-v2-phase-name">${sPhaseName}</span>
                        <div class="exp-v2-minichart" aria-label="Fase ${sStep} de ${PHASES.length}">
                          ${sMiniBarsHTML}
                        </div>
                      </div>
                      ${isRoleAdmin ? (
                        !isSumClosed ? `
                          <button type="button" class="btn-close-sum-inline" data-toggle-suministro-closed="${s.id}" data-exp-id="${exp.id}" title="Cerrar este suministro">
                            ${icon("archive", 11)} Cerrar
                          </button>
                        ` : `
                          <button type="button" class="btn-close-sum-inline is-closed-state" data-toggle-suministro-closed="${s.id}" data-exp-id="${exp.id}" title="Haz clic para reabrir este suministro">
                            ${icon("check", 11)} Cerrado · Reabrir
                          </button>
                        `
                      ) : (isSumClosed ? `<span class="sum-closed-pill">Cerrado</span>` : "")}
                    </div>
                  </div>
                  <h4 class="dossier-sum-title">
                    <span class="sum-title-icon-inline">${icon(sumIconName, 14)}</span>
                    <span>${s.tipo}</span>
                  </h4>
                  ${s.descripcion || s.especificaciones ? `<p class="dossier-sum-desc">${s.descripcion || s.especificaciones}</p>` : ""}
                  <div class="dossier-sum-meta-rows">
                    <div class="dossier-sum-meta-row">
                      <span>Código de suministro</span>
                      <strong>${s.id}</strong>
                    </div>
                    <div class="dossier-sum-meta-row">
                      <span>Unidades</span>
                      <strong>${s.unidades || "—"}</strong>
                    </div>
                    <div class="dossier-sum-meta-row">
                      <span>Presupuesto estimado</span>
                      <strong>${!isDestinatario ? (s.presupuesto || exp.presupuestoTotal) : "[Reservado]"}</strong>
                    </div>
                    <div class="dossier-sum-meta-row">
                      <span>Fecha de entrega</span>
                      <span class="suministro-date-wrap">
                        <strong>${s.fechaEntrega}</strong>
                        ${sKpi ? `<span class="suministro-kpi-pill ${sKpi.class}" title="${sKpi.label}">${sKpi.text}</span>` : ""}
                      </span>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      </details>
    ` : "";

    // 2. Stepper de las 4 Fases con icono simple (Alcance, Proveedores, Gestión del pedido, Cierre)
    const isCurrentContextClosed = !!exp.cerrado || (currentSum && currentSum.estado === "cerrado");
    const isCurrentContextFinished = isCurrentContextClosed || !!exp.finalizado || (currentSum && currentSum.estado === "finalizado");

    const stepperHTML = PHASES.map((p, idx) => {
      const isCurrent = idx === activeDossierPhase;
      const isDone = idx < activeEntityPhaseActual || isCurrentContextClosed || (idx === PHASES.length - 1 && isCurrentContextFinished);
      const pendientes = isDone ? getPhaseIncompleteDocs(delivMap, idx).filter(d => canRoleSeeDeliverable(d, activeRole)).length : 0;
      return `
        <div class="dossier-step ${isCurrent ? "is-current" : isDone ? "is-done" : ""} ${pendientes ? "has-pending-docs" : ""}" data-select-dossier-phase="${idx}">
          <div class="dossier-step-top">
            <span class="dossier-step-icon-label">
              ${icon(p.icon, 15)}
              <span class="dossier-step-num">Fase ${p.num}</span>
            </span>
            ${isDone ? (pendientes
              ? `<span class="dossier-step-pending" title="${pendientes} documento(s) sin validar en esta fase">${icon("alert", 13)} ${pendientes}</span>`
              : `<span style="color:var(--entity-accent)">${icon("check", 14)}</span>`) : ""}
          </div>
          <div class="dossier-step-title">${p.name}</div>
          <div class="dossier-step-meta">${isDone ? (pendientes ? `Completada · ${pendientes} sin validar` : "Completada") : idx === activeEntityPhaseActual ? "En curso" : "Pendiente"}</div>
        </div>
      `;
    }).join("");

    // 3. Barra de Estado, Fase, Nombre y Botones DEBAJO de las fases y ENCIMA de las secciones
    // - Si una fase ya está completada, el botón "Completar fase" aparece DESHABILITADO.
    // - Cliente y Proveedor NO pueden completar fases ni requerir ranuras documentales.
    const isSelectedPhaseCompleted =
      activeDossierPhase < activeEntityPhaseActual ||
      isCurrentContextClosed ||
      (activeDossierPhase === PHASES.length - 1 && isCurrentContextFinished);

    const isSelectedPhaseFuture = !isSelectedPhaseCompleted && activeDossierPhase > activeEntityPhaseActual;

    const phaseStateLabel = isSelectedPhaseCompleted
      ? `<span class="entity-status complete"><i></i>Completada</span>`
      : activeDossierPhase === activeEntityPhaseActual
        ? `<span class="entity-status review"><i></i>En curso</span>`
        : `<span class="entity-status pending"><i></i>Pendiente</span>`;

    const adminCompletePhaseBtnHTML = isRoleAdmin ? (
      isSelectedPhaseCompleted ? (isCurrentContextClosed ? `
        <button class="admin-quiet-button is-disabled-phase-btn" type="button" disabled title="Reabre primero el ${exp.cerrado ? "expediente" : "suministro"} para poder reabrir una fase">
          ${icon("refresh", 14)} Reabrir fase
        </button>
      ` : `
        <button class="admin-quiet-button" type="button" data-reopen-dossier-phase="${exp.id}" title="Vuelve a dejar esta fase en curso">
          ${icon("refresh", 14)} Reabrir fase
        </button>
      `) : isSelectedPhaseFuture ? `
        <button class="admin-primary-button is-disabled-phase-btn" type="button" disabled title="Debes completar primero la Fase ${activeEntityPhaseActual + 1}">
          ${icon("check", 14)} Completar fase
        </button>
      ` : `
        <button class="admin-primary-button" type="button" data-advance-dossier-phase="${exp.id}">
          ${icon("check", 14)} Completar fase
        </button>
      `
    ) : "";

    const phaseOpsPanelBelowStepperHTML = !isDestinatario ? `
      <div class="phase-ops-panel is-simplified">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          ${phaseStateLabel}
          <strong style="font-size:0.88rem;color:var(--entity-text)">Fase ${PHASES[activeDossierPhase].num}: ${PHASES[activeDossierPhase].name}</strong>
          ${currentSum ? `
            <span class="dossier-chip" style="font-size:0.72rem;display:inline-flex;align-items:center;gap:5px">
              ${icon(currentSumIconName, 12)} ${currentSum.id} · ${currentSum.tipo}
            </span>
          ` : ""}
        </div>
        <div class="phase-ops-controls">
          ${adminCompletePhaseBtnHTML}
          ${isRoleAdmin && !isCurrentContextClosed ? `
            <button class="admin-quiet-button" type="button" data-open-add-slot-modal="${exp.id}">
              ${icon("plus", 14)} Requerir
            </button>
          ` : ""}
          ${!isCurrentContextClosed ? `
            <button class="admin-quiet-button" type="button" data-open-upload-free-doc="${exp.id}">
              ${icon("upload", 14)} ${isRoleAdmin ? "Subir" : isRoleCliente ? "Subir doc. cliente" : "Subir entregable"}
            </button>
          ` : `
            <span style="font-size:0.73rem;color:var(--entity-muted)">Expediente / suministro cerrado</span>
          `}
        </div>
      </div>
    ` : "";

    // 4. Selector y Matching en Fase 2 (Proveedores, idx === 1) adaptado al perfil
    const selectorAboveMenuHTML = (activeDossierPhase === 1 && !isDestinatario && currentSum) ? `
      <div class="selector-above-menu-bar">
        <div style="display:flex;align-items:center;gap:12px">
          <span class="selector-above-menu-icon">${icon(isRoleProveedor ? "file" : "users", 18)}</span>
          <strong style="color:var(--entity-text);font-size:0.88rem">${isRoleProveedor ? "Cotización" : "Selector de Proveedores"} - ${currentSum.id} (${currentSum.tipo})</strong>
        </div>
        <button class="admin-primary-button" type="button" data-go="#${activeRole}/selector/${exp.id}?sum=${currentSum.id}" style="white-space:nowrap">
          ${icon(isRoleProveedor ? "file" : "users", 14)} ${isRoleProveedor ? "Ver/Presentar Oferta" : "Abrir Selector de Proveedores"}
        </button>
      </div>
    ` : "";

    // 5. Contenido de la sección activa adaptado al perfil
    const canSeePassportTab = isRoleAdmin || isDestinatario || !!exp.cerrado;
    if ((activeDossierTab === "history" && (!isRoleAdmin || !SHOW_HISTORY_TAB)) || (activeDossierTab === "notes" && !isRoleAdmin) || (activeDossierTab === "passport" && !canSeePassportTab)) activeDossierTab = "deliverables";
    let tabContent = "";
    if (activeDossierTab === "deliverables") {
      const allExpDocs = [];
      PHASES.forEach((pObj, pIdx) => {
        const list = delivMap[pIdx] || [];
        list.forEach((delItem, sIdx) => {
          if (canRoleSeeDeliverable(delItem, activeRole)) {
            allExpDocs.push({ del: delItem, phaseIdx: pIdx, phaseName: pObj.name, slotIdx: sIdx });
          }
        });
      });

      const phaseVisibleDocs = [];
      rawPhaseDeliverables.forEach((delItem, sIdx) => {
        if (canRoleSeeDeliverable(delItem, activeRole)) {
          phaseVisibleDocs.push({
            del: delItem,
            phaseIdx: activeDossierPhase,
            phaseName: PHASES[activeDossierPhase].name,
            slotIdx: sIdx
          });
        }
      });

      const baseDocs = docScopeMode === "all" ? allExpDocs : phaseVisibleDocs;

      const countByState = {
        all: baseDocs.length,
        complete: baseDocs.filter(x => x.del.state === "complete").length,
        review: baseDocs.filter(x => x.del.state === "review").length,
        pending: baseDocs.filter(x => x.del.state === "pending").length,
        rejected: baseDocs.filter(x => x.del.state === "rejected").length
      };

      const filteredDocs = docStatusFilter === "all"
        ? baseDocs
        : baseDocs.filter(x => x.del.state === docStatusFilter);

      const allScopeBtnLabel = isRoleProveedor && currentSum
        ? `Todo mi Suministro ${currentSum.id} (${allExpDocs.length})`
        : `Todo el Expediente (${allExpDocs.length})`;

      const docManagerBarHTML = `
        <div class="doc-manager-bar">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span style="font-size:0.74rem;font-weight:650;color:var(--entity-muted)">Alcance documental:</span>
            <div class="avisos-group-buttons">
              <button class="avisos-group-btn ${docScopeMode === "phase" ? "is-active" : ""}" type="button" data-doc-scope="phase">
                Fase ${activeDossierPhase + 1} (${phaseVisibleDocs.length})
              </button>
              <button class="avisos-group-btn ${docScopeMode === "all" ? "is-active" : ""}" type="button" data-doc-scope="all">
                ${allScopeBtnLabel}
              </button>
            </div>
          </div>

          <div class="doc-filter-pills">
            <button class="doc-filter-pill ${docStatusFilter === "all" ? "is-active" : ""}" type="button" data-doc-filter="all">
              Todos (${countByState.all})
            </button>
            <button class="doc-filter-pill ${docStatusFilter === "complete" ? "is-active" : ""}" type="button" data-doc-filter="complete">
              Validados (${countByState.complete})
            </button>
            <button class="doc-filter-pill ${docStatusFilter === "review" ? "is-active" : ""}" type="button" data-doc-filter="review">
              En revisión (${countByState.review})
            </button>
            <button class="doc-filter-pill ${docStatusFilter === "pending" ? "is-active" : ""}" type="button" data-doc-filter="pending">
              Pendientes (${countByState.pending})
            </button>
            ${countByState.rejected > 0 || docStatusFilter === "rejected" ? `
              <button class="doc-filter-pill ${docStatusFilter === "rejected" ? "is-active" : ""}" type="button" data-doc-filter="rejected">
                Con observaciones (${countByState.rejected})
              </button>
            ` : ""}
          </div>
        </div>
      `;

      const tableRowsHTML = filteredDocs.length ? filteredDocs.map(({ del, phaseIdx, phaseName, slotIdx }) => {
        const notesText = del.rejectReason
          ? `⚠️ ${del.rejectReason}`
          : (del.notes || (isDestinatario ? "—" : "Añadir nota..."));
        const hasRealNote = Boolean(del.rejectReason || (del.notes && del.notes.trim()));
        const visLabel = formatVisibleToLabel(del.visibleTo);
        const allowUploadSlot = !isCurrentContextClosed && canRoleUploadToSlot(del, activeRole);
        const docRef = `data-exp="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}"`;

        return `
          <tr>
            <td class="col-doc-name"><strong class="doc-tbl-name">${escHTML(del.name)}</strong></td>
            <td class="col-doc-file">${del.file ? `<span class="doc-tbl-file-cut" title="${escHTML(del.file)}">${icon("file", 11)}<span>${escHTML(del.file)}</span></span>` : `<span class="doc-tbl-dash">-</span>`}</td>
            ${isRoleAdmin ? `<td class="col-doc-vis"><span class="doc-tbl-vis-chip" title="Actores con permiso de lectura">${icon("eye", 11)} ${visLabel}</span></td>` : ""}
            <td class="col-doc-req"><span class="doc-tbl-date">${del.reqDate || "-"}</span></td>
            <td class="col-doc-upload"><span class="doc-tbl-date">${getDocUploadDateText(del)}</span></td>
            <td class="col-doc-origin"><span class="doc-tbl-origin">${getDocUploaderText(del)}</span></td>
            <td class="col-doc-phase"><span class="doc-tbl-phase">${phaseIdx + 1}. ${SHORT_PHASE_NAMES[phaseIdx] || phaseName}</span></td>
            <td class="col-doc-state">${getTableDocStatusBadge(del.state)}</td>
            <td class="col-doc-actions">
              <div class="doc-tbl-actions is-icons">
                ${del.file ? `
                  <button class="doc-tbl-icon-btn" type="button" data-view-doc ${docRef} data-tip="Ver" aria-label="Ver documento">
                    ${icon("eye", 14)}
                  </button>
                  <button class="doc-tbl-icon-btn" type="button" data-download-doc ${docRef} data-tip="Descargar" aria-label="Descargar documento">
                    ${icon("download", 14)}
                  </button>
                  ${!isRoleAdmin && allowUploadSlot ? `
                    <button class="doc-tbl-icon-btn is-upload" type="button" data-upload-slot-doc="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" data-tip="Subsanar" aria-label="Subsanar: sustituir el archivo">
                      ${icon("upload", 14)}
                    </button>
                  ` : ""}
                ` : (allowUploadSlot ? `
                  <button class="doc-tbl-icon-btn is-upload" type="button" data-upload-slot-doc="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" data-tip="Subir" aria-label="Subir archivo requerido">
                    ${icon("upload", 14)}
                  </button>
                ` : `
                  <span class="doc-tbl-waiting">Pendiente de ${del.owner}</span>
                `)}
                ${isRoleAdmin ? `
                  <button class="doc-tbl-icon-btn is-validate" type="button" data-admin-approve="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" data-tip="Validar" aria-label="Validar documento">
                    ${icon("check", 14)}
                  </button>
                  <button class="doc-tbl-icon-btn" type="button" data-edit-doc ${docRef} data-tip="Editar" aria-label="Editar documento">
                    ${icon("edit", 14)}
                  </button>
                  <button class="doc-tbl-icon-btn is-danger" type="button" data-delete-doc ${docRef} data-tip="Eliminar" aria-label="Eliminar documento">
                    ${icon("x", 14)}
                  </button>
                ` : ""}
              </div>
            </td>
            <td class="col-doc-notes">
              ${!isDestinatario ? `
                <button type="button" class="doc-tbl-notes-edit-btn ${hasRealNote ? "" : "is-empty"}" data-edit-doc-note="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" title="Haz clic para editar la nota">
                  <span class="doc-tbl-notes-text">${notesText}</span>
                  <span class="doc-tbl-notes-edit-icon">✎</span>
                </button>
              ` : `
                <span class="doc-tbl-notes-text" style="font-size:0.73rem;color:var(--entity-muted)">${notesText}</span>
              `}
            </td>
          </tr>
        `;
      }).join("") : `
        <tr>
          <td colspan="${isRoleAdmin ? 10 : 9}" style="padding:28px;text-align:center;color:var(--entity-muted)">
            No hay documentos visibles para tu perfil con el filtro seleccionado.
          </td>
        </tr>
      `;

      const docTableHTML = `
        <section class="doc-clean-table-card">
          <div class="doc-clean-table-head">
            <h3>Documentación${currentSum ? ` · ${currentSum.id}` : ""}</h3>
            <span>${filteredDocs.length} documento(s)${!isDestinatario ? " · Haz clic en cualquier nota para editarla" : ""}</span>
          </div>
          <div class="doc-clean-table-wrap">
            <table class="doc-clean-table is-detailed">
              <thead>
                <tr>
                  <th class="col-doc-name">Nombre</th>
                  <th class="col-doc-file">Archivo</th>
                  ${isRoleAdmin ? `<th class="col-doc-vis">Quién lo ve</th>` : ""}
                  <th class="col-doc-req">Requerido</th>
                  <th class="col-doc-upload">Subido</th>
                  <th class="col-doc-origin">Subido por</th>
                  <th class="col-doc-phase">Fase</th>
                  <th class="col-doc-state">Estado</th>
                  <th class="col-doc-actions">Acciones</th>
                  <th class="col-doc-notes">Notas</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHTML}
              </tbody>
            </table>
          </div>
        </section>
      `;

      tabContent = `${docManagerBarHTML}${docTableHTML}`;
    } else if (activeDossierTab === "incidents") {
      // Registro de incidencias y cambios: el Proveedor solo ve los de sus suministros
      const visibleSumIds = new Set(expSuministros.map(s => s.id));
      const roleRegistros = (exp.incidencias || []).filter(r => !isRoleProveedor || !r.sumId || visibleSumIds.has(r.sumId));
      const openRegs = roleRegistros.filter(r => !isRegistroCerrado(r));
      const closedRegs = roleRegistros.filter(isRegistroCerrado);

      const closedHistoryHTML = `
        <details class="dossier-collapsible-block reg-history" data-collapse-key="regHistory" ${dossierCollapseState.regHistory ? "open" : ""}>
          <summary class="dossier-collapsible-summary">
            <div class="dossier-collapsible-summary-left">
              <span class="dossier-section-kicker">${icon("archive", 14)} Historial de incidencias y cambios cerrados (${closedRegs.length})</span>
            </div>
            <span class="dossier-collapsible-chevron">${icon("chevronDown", 15)}</span>
          </summary>
          <div class="dossier-collapsible-body">
            ${closedRegs.length ? closedRegs.map(r => {
              const sum = SUMINISTROS.find(s => s.id === r.sumId);
              return `
                <details class="reg-history-item">
                  <summary>
                    <span class="incident-chip-id">${r.id}</span>
                    <span class="reg-history-date">${r.fechaRegistro}</span>
                    <span class="reg-history-sum">${r.sumId || "General"}${sum ? ` · ${escHTML(sum.tipo)}` : ""}</span>
                    <strong class="reg-history-title">${escHTML(r.titulo)}</strong>
                    <span class="dossier-collapsible-chevron">${icon("chevronDown", 14)}</span>
                  </summary>
                  ${renderRegistroCardHTML(exp, r, { isRoleAdmin, isRoleCliente, isRoleProveedor, isDestinatario })}
                </details>
              `;
            }).join("") : `<p class="reg-empty">Todavía no hay registros cerrados.</p>`}
          </div>
        </details>
      `;

      tabContent = `
        <div class="incident-container">
          <div class="incident-filter-bar">
            <span class="reg-summary-text">
              <b>${openRegs.length}</b> ${openRegs.length === 1 ? "registro abierto" : "registros abiertos"} · <b>${closedRegs.length}</b> ${closedRegs.length === 1 ? "cerrado" : "cerrados"}
            </span>
            ${isRoleAdmin ? `
              <button class="admin-primary-button" type="button" data-open-reg-modal="${exp.id}">
                ${icon("plus", 14)} Registrar incidencia/cambio
              </button>
            ` : ""}
          </div>

          ${openRegs.length ? openRegs.map(r => renderRegistroCardHTML(exp, r, { isRoleAdmin, isRoleCliente, isRoleProveedor, isDestinatario })).join("") : `
            <div class="reg-empty-card">
              <p>No hay incidencias ni cambios abiertos.</p>
              <span>${isRoleAdmin ? "Cuando el cliente o el proveedor comuniquen una incidencia o un cambio, regístralo aquí." : "SOFEIN registrará aquí las incidencias y cambios que requieran tu firma."}</span>
            </div>
          `}

          ${closedHistoryHTML}
        </div>
      `;
    } else if (activeDossierTab === "passport") {
      tabContent = `<div class="passport-print-root">${renderPassportSection(exp, isDestinatario)}</div>`;
    } else if (activeDossierTab === "notes") {
      // Anotaciones internas (solo SOFEIN)
      const notes = cambiosLog.filter(c => c.soloAdmin);
      tabContent = `
        <div class="history-container">
          <div class="incident-filter-bar">
            <span class="reg-summary-text"><b>${notes.length}</b> ${notes.length === 1 ? "anotación interna" : "anotaciones internas"} · Solo las ve SOFEIN</span>
            <button class="admin-primary-button" type="button" data-open-change-log-modal="${exp.id}">
              ${icon("plus", 14)} Añadir anotación interna
            </button>
          </div>
          ${notes.length ? renderHistoryTableHTML(notes) : `<div class="reg-empty-card"><p>Todavía no hay anotaciones internas.</p></div>`}
        </div>
      `;
    } else if (activeDossierTab === "history") {
      // Historial de actividad completo (solo SOFEIN), filtrable por fase y suministro
      const allSums = SUMINISTROS.filter(s => s.expId === exp.id);
      const filtered = cambiosLog.filter(c => {
        if (!historyIncludeNotes && c.soloAdmin) return false;
        if (historyPhaseFilter !== "all" && String(c.fase ?? "") !== historyPhaseFilter) return false;
        if (historySumFilter !== "all" && (c.suministro || "General") !== historySumFilter) return false;
        return true;
      });
      tabContent = `
        <div class="history-container">
          <div class="history-filter-bar">
            <label>
              Fase
              <select data-history-filter="phase">
                <option value="all">Todas las fases</option>
                ${PHASES.map((p, i) => `<option value="${i}" ${historyPhaseFilter === String(i) ? "selected" : ""}>${p.num}. ${p.name}</option>`).join("")}
              </select>
            </label>
            <label>
              Suministro
              <select data-history-filter="sum">
                <option value="all">Todos</option>
                <option value="General" ${historySumFilter === "General" ? "selected" : ""}>General del expediente</option>
                ${allSums.map(su => `<option value="${su.id}" ${historySumFilter === su.id ? "selected" : ""}>${su.id} · ${escHTML(su.tipo)}</option>`).join("")}
              </select>
            </label>
            <label class="history-check">
              <input type="checkbox" data-history-filter="notes" ${historyIncludeNotes ? "checked" : ""} />
              Incluir anotaciones internas
            </label>
            <span class="history-count">${filtered.length} de ${cambiosLog.length} entradas</span>
          </div>
          ${filtered.length ? renderHistoryTableHTML(filtered) : `
            <div class="reg-empty-card"><p>No hay actividad con estos filtros.</p></div>
          `}
        </div>
      `;
    } else if (activeDossierTab === "comms") {
      // Pantalla 6: Avisos & Hitos del Expediente filtrados por perfil y alcance (Fase y Suministro)
      const visibleSumIds = new Set(expSuministros.map(s => s.id));
      const allRoleNotices = NOTICES.filter(n => {
        if (n.expId !== exp.id || !canRoleSeeNotice(n, activeRole)) return false;
        if (isRoleProveedor && n.sumId && !visibleSumIds.has(n.sumId)) return false;
        return true;
      });

      const matchesPhase = (n) => commsPhaseScope === "all" || getNoticePhaseIdx(n) === activeDossierPhase;
      const matchesSum = (n) => {
        if (commsSumScope === "all" || !currentSum) return true;
        if (!n.sumId && (!n.suministro || n.suministro === "General")) return true;
        return n.sumId === currentSum.id || String(n.suministro || "").includes(currentSum.id.replace("SUM-", ""));
      };

      const countThisPhase = allRoleNotices.filter(n => getNoticePhaseIdx(n) === activeDossierPhase && matchesSum(n)).length;
      const countAllPhases = allRoleNotices.filter(n => matchesSum(n)).length;

      const countThisSum = currentSum
        ? allRoleNotices.filter(n => matchesPhase(n) && (n.sumId === currentSum.id || String(n.suministro || "").includes(currentSum.id.replace("SUM-", "")) || !n.sumId)).length
        : allRoleNotices.length;
      const countAllSums = allRoleNotices.filter(n => matchesPhase(n)).length;

      const roleNotices = allRoleNotices.filter(n => matchesPhase(n) && matchesSum(n));
      const activeNotices = roleNotices.filter(n => !completedNotices.has(n.id));
      const completedList = roleNotices.filter(n => completedNotices.has(n.id));

      const commsScopeBarHTML = `
        <div class="doc-manager-bar" style="margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:0.74rem;font-weight:650;color:var(--entity-muted)">Alcance de fase:</span>
              <div class="avisos-group-buttons">
                <button class="avisos-group-btn ${commsPhaseScope === "phase" ? "is-active" : ""}" type="button" data-comms-phase-scope="phase">
                  Fase ${activeDossierPhase + 1}: ${SHORT_PHASE_NAMES[activeDossierPhase] || PHASES[activeDossierPhase].name} (${countThisPhase})
                </button>
                <button class="avisos-group-btn ${commsPhaseScope === "all" ? "is-active" : ""}" type="button" data-comms-phase-scope="all">
                  Todas las fases (${countAllPhases})
                </button>
              </div>
            </div>

            ${expSuministros.length > 1 && currentSum ? `
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span style="font-size:0.74rem;font-weight:650;color:var(--entity-muted)">Suministro:</span>
                <div class="avisos-group-buttons">
                  <button class="avisos-group-btn ${commsSumScope === "current" ? "is-active" : ""}" type="button" data-comms-sum-scope="current">
                    ${currentSum.id} (${countThisSum})
                  </button>
                  <button class="avisos-group-btn ${commsSumScope === "all" ? "is-active" : ""}" type="button" data-comms-sum-scope="all">
                    ${isRoleProveedor ? `Mis suministros (${countAllSums})` : `Todos los suministros (${countAllSums})`}
                  </button>
                </div>
              </div>
            ` : ""}
          </div>

          ${isRoleAdmin ? `
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <button class="admin-primary-button" type="button" data-open-exp-notice-modal="${exp.id}" style="font-size:0.74rem">
                ${icon("plus", 13)} Emitir Aviso
              </button>
            </div>
          ` : ""}
        </div>
      `;

      const tableHeaderHTML = `
        <div class="admin-doc-table-head avisos-grid group-none">
          <span class="avisos-th ${avisosSortCol === 'tipo' ? 'is-sorted' : ''}" data-sort-aviso="tipo" title="Ordenar por tipo/prioridad">
            Tipo ${getAvisosSortIndicator('tipo')}
          </span>
          <span class="avisos-th ${avisosSortCol === 'titulo' ? 'is-sorted' : ''}" data-sort-aviso="titulo" title="Ordenar por aviso/actividad">
            Aviso / Actividad ${getAvisosSortIndicator('titulo')}
          </span>
          <span class="avisos-th ${avisosSortCol === 'expId' ? 'is-sorted' : ''}" data-sort-aviso="expId" title="Ordenar por expediente">
            Expediente ${getAvisosSortIndicator('expId')}
          </span>
          <span class="avisos-th ${avisosSortCol === 'suministro' ? 'is-sorted' : ''}" data-sort-aviso="suministro" title="Ordenar por suministro">
            Suministro ${getAvisosSortIndicator('suministro')}
          </span>
          <span class="avisos-th ${avisosSortCol === 'categoria' ? 'is-sorted' : ''}" data-sort-aviso="categoria" title="Ordenar por categoría">
            Categoría ${getAvisosSortIndicator('categoria')}
          </span>
          <span class="avisos-th ${avisosSortCol === 'fecha' ? 'is-sorted' : ''}" data-sort-aviso="fecha" title="Ordenar por fecha">
            Fecha ${getAvisosSortIndicator('fecha')}
          </span>
          <span style="text-align:right">Acciones</span>
        </div>
      `;

      const renderDossierNoticeRow = (n, isCompleted = false) => {
        const sumLabel = (n.suministro || "General").replace(/^SUM-?/i, "");
        return `
          <article class="admin-doc-row avisos-grid group-none">
            <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:var(--entity-panel-2)">
              ${icon(n.tagClass === "warning" ? "alert" : n.tagClass === "review" ? "file" : "check", 16)}
            </span>
            <div style="min-width:0">
              <strong style="display:block;margin-bottom:2px;cursor:pointer" data-go="${n.enlace}">${n.titulo}</strong>
              <small style="color:var(--entity-muted);display:block;line-height:1.4">${n.descripcion}</small>
            </div>
            <div>
              <button class="avisos-exp-chip-link" type="button" data-go="#${activeRole}/expedientes/${n.expId}" title="Expediente ${n.expId}">
                ${icon("folder", 12)} ${n.expId}
              </button>
            </div>
            <div>
              <button class="avisos-sum-chip" type="button" data-go="#${activeRole}/expedientes/${n.expId}?tab=deliverables${n.sumId ? `&sumId=${n.sumId}` : ""}" title="Suministro: ${sumLabel}">
                ${icon("box", 12)} <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${sumLabel}</span>
              </button>
            </div>
            <div>
              <span class="dossier-chip" style="font-size:0.68rem;white-space:nowrap">${n.categoria}</span>
            </div>
            <div style="white-space:nowrap">
              <time style="font-size:0.72rem;color:var(--entity-faint)">${n.fecha}</time>
            </div>
            <div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;white-space:nowrap">
              ${!isCompleted ? `
                <button class="admin-quiet-button" type="button" data-go="${n.enlace}">${n.accion || "Ver"}</button>
                <button class="admin-quiet-button" type="button" data-complete-notice="${n.id}" data-dismiss-notice="${n.id}" title="Marcar aviso como completado" style="color:var(--entity-accent)">
                  ${icon("check", 12)} Completado
                </button>
              ` : `
                <button class="admin-quiet-button" type="button" data-restore-notice="${n.id}" style="color:var(--entity-accent)" title="Reabrir aviso">
                  ${icon("check", 12)} Reabrir
                </button>
              `}
            </div>
          </article>
        `;
      };

      tabContent = `
        <div class="incident-container">
          ${commsScopeBarHTML}

          <section class="admin-document-list" style="border:1px solid var(--entity-line);border-radius:10px;overflow:hidden;background:var(--entity-panel)">
            ${tableHeaderHTML}
            ${activeNotices.length ? sortNotices(activeNotices).map(n => renderDossierNoticeRow(n)).join("") : `
              <div style="padding:36px;text-align:center;color:var(--entity-muted)">
                No hay avisos pendientes con el filtro de alcance seleccionado.
              </div>
            `}
          </section>

          ${completedList.length ? `
            <details class="admin-discarded-details">
              <summary id="toggleDiscardedSummary">
                <span>${icon("check", 14)} Ver completados de este expediente (${completedList.length})</span>
                <span style="font-size:0.72rem;color:var(--entity-faint)">Desplegar para revisar o reabrir</span>
              </summary>
              <div class="admin-discarded-list">
                ${sortNotices(completedList).map(n => renderDossierNoticeRow(n, true)).join("")}
              </div>
            </details>
          ` : ""}
        </div>
      `;
    }

    const visibleSumIdsForBadge = new Set(expSuministros.map(s => s.id));
    const expNotices = NOTICES.filter(n => {
      if (n.expId !== exp.id || !canRoleSeeNotice(n, activeRole) || completedNotices.has(n.id)) return false;
      if (isRoleProveedor && n.sumId && !visibleSumIdsForBadge.has(n.sumId)) return false;
      return true;
    });
    // Badge: registros abiertos (pendientes de firma) visibles para el perfil
    const totalRegistroBadge = exp.incidencias
      .filter(r => !isRegistroCerrado(r) && (!isRoleProveedor || !r.sumId || visibleSumIdsForBadge.has(r.sumId))).length;

    // Indicador contextual de alcance (solo Destinatario; Cliente y Proveedor no lo necesitan)
    const roleScopeNoticeHTML = isDestinatario ? `
      <div class="dossier-role-scope-strip">
        <span class="dossier-role-scope-badge">
          ${icon("eye", 13)}
          <b>Vista ${PLAYERS[activeRole]?.shortLabel || activeRole}:</b>
          Modo auditoría de trazabilidad para destinatario final (${exp.destinatarioFinal}).
        </span>
      </div>
    ` : "";

    // Cabecera mínima que aparece al hacer scroll: expediente / suministro / fase
    const stickyHTML = `
      <div class="dossier-sticky-anchor">
        <div class="dossier-sticky-bar" id="dossierStickyBar">
          <a href="#${activeRole}/expedientes">Expedientes</a>
          <i>/</i>
          <button type="button" class="dossier-sticky-link dossier-sticky-exp" data-sticky-jump="dossierAnchorExp" title="Ir a la ficha del expediente"><b>${exp.id}</b> ${escHTML(v.tituloGenerico)}</button>
          ${currentSum ? `<i>/</i><button type="button" class="dossier-sticky-link" data-sticky-jump="dossierAnchorSums" title="Ir a los suministros"><b>${currentSum.id}</b> ${escHTML(currentSum.tipo)}</button>` : ""}
          <i>/</i>
          <button type="button" class="dossier-sticky-link dossier-sticky-phase" data-sticky-jump="dossierAnchorPhases" title="Ir al selector de fases">Fase ${PHASES[activeDossierPhase].num} · ${PHASES[activeDossierPhase].name}</button>
          <i>/</i>
          <button type="button" class="dossier-sticky-link" data-sticky-jump="dossierAnchorTabs" title="Ir a las pestañas">${escHTML(({ deliverables: "Documentación", incidents: "Registro", comms: "Avisos", notes: "Anotaciones", passport: "Pasaporte Digital", history: "Historial" })[activeDossierTab] || "Documentación")}</button>
        </div>
      </div>
    `;

    return `
      <div class="dossier-builder">
        ${stickyHTML}
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px">
          <div class="dossier-breadcrumb" style="margin-bottom:0">
            <a href="#${activeRole}/expedientes">← Volver a expedientes</a> / <span>${exp.id}</span>
          </div>
          ${roleScopeNoticeHTML}
        </div>

        ${exp.estado === "pending_validation" ? `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-radius:10px;background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.3);margin-bottom:18px;animation:filterFadeIn 0.2s ease-out">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:rgba(234,179,8,0.15);color:var(--entity-warning)">
                ${icon("shield", 18)}
              </span>
              <div>
                <strong style="color:var(--entity-text);font-size:0.88rem">Expediente pendiente de validación por SOFEIN</strong>
                <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Este expediente fue remitido por el constructor y requiere verificación técnica de pliegos antes de iniciar la fase de proveedores.</p>
              </div>
            </div>
            ${activeRole === "admin" ? `
              <button class="admin-primary-button" type="button" data-validate-exp="${exp.id}" style="white-space:nowrap">
                ${icon("check", 14)} Validar y Activar Expediente
              </button>
            ` : `
              <span style="font-size:0.75rem;color:var(--entity-warning);font-weight:600">En revisión técnica por SOFEIN</span>
            `}
          </div>
        ` : ""}

        ${exp.confirmacionCliente === "pendiente" && (isRoleAdmin || isRoleCliente) ? `
          <div class="exp-confirm-banner">
            <div style="display:flex;align-items:center;gap:12px">
              <span class="exp-confirm-banner-icon">${icon("check", 18)}</span>
              <div>
                <strong>${isRoleCliente ? "SOFEIN ha creado este expediente para ti" : "Pendiente de confirmación del cliente"}</strong>
                <p>${isRoleCliente ? "Revisa los datos, los suministros y los documentos, y confirma que todo está correcto." : `${escHTML(exp.cliente)} todavía no ha confirmado el expediente.`}</p>
              </div>
            </div>
            ${isRoleCliente ? `
              <button class="admin-primary-button" type="button" data-confirm-exp="${exp.id}" style="white-space:nowrap">
                ${icon("check", 14)} Confirmar expediente
              </button>
            ` : `<span class="dossier-chip">Esperando al cliente</span>`}
          </div>
        ` : ""}

        <!-- 1. Tarjeta de Expediente (Adaptada según el perfil activo) -->
        <section class="dossier-exp-summary-card" id="dossierAnchorExp">
          <div class="dossier-exp-summary-top">
            <div class="dossier-exp-summary-left">
              <span class="dossier-exp-state-pill">
                <i class="exp-v2-dot ${v.estadoDotClass}"></i>
                <span>${v.estadoLabel}</span>
              </span>
              <span class="exp-v2-code">${exp.id}</span>
            </div>

            <div class="dossier-exp-summary-actions">
              ${isRoleAdmin ? (
                !exp.cerrado ? `
                  <button type="button" class="btn-close-exp-anytime" data-toggle-exp-closed="${exp.id}" title="Cerrar expediente">
                    ${icon("archive", 13)} Cerrar expediente
                  </button>
                ` : `
                  <button type="button" class="btn-close-exp-anytime is-closed-state" data-toggle-exp-closed="${exp.id}" title="Haz clic para reabrir el expediente">
                    ${icon("check", 13)} Expediente cerrado (${exp.fechaCierre || "Cerrado"}) · Reabrir
                  </button>
                `
              ) : (exp.cerrado ? `
                <span class="dossier-chip" style="background:rgba(100,116,139,0.12);color:var(--entity-muted);font-weight:600">
                  ${icon("check", 12)} Expediente cerrado
                </span>
              ` : "")}
            </div>
          </div>

          <h2 class="dossier-exp-generic-title">${v.tituloGenerico}</h2>

          <div class="dossier-exp-summary-grid">
            <div class="dossier-exp-summary-item">
              <span class="exp-v2-label">${summaryNumSuministrosLabel}</span>
              <strong class="exp-v2-val">${summaryNumSuministrosVal}</strong>
            </div>
            <div class="dossier-exp-summary-item">
              <span class="exp-v2-label">${summaryBudgetLabel}</span>
              <strong class="exp-v2-val">${summaryBudgetVal}</strong>
            </div>
            <div class="dossier-exp-summary-item">
              <span class="exp-v2-label">Destino</span>
              <strong class="exp-v2-val" title="${exp.destinatarioFinal}">${exp.destinatarioFinal}</strong>
            </div>
            <div class="dossier-exp-summary-item">
              <span class="exp-v2-label">Cliente (constructor)</span>
              <strong class="exp-v2-val" title="${exp.cliente}">${exp.cliente}</strong>
            </div>
            <div class="dossier-exp-summary-item">
              <span class="exp-v2-label">Próxima entrega</span>
              <div class="exp-v2-delivery-wrap" style="justify-content:flex-start">
                <strong class="exp-v2-delivery-date">${summaryNextDeliveryDate}</strong>
                <span class="exp-v2-delivery-diff is-${v.proximaEntregaTone}">${v.proximaEntregaDiff}</span>
              </div>
            </div>
          </div>
          ${exp.notas && (isRoleAdmin || isRoleCliente) ? `
            <div class="dossier-exp-notes">
              <span class="exp-v2-label">${icon("edit", 12)} Notas del expediente</span>
              <p>${escHTML(exp.notas)}</p>
            </div>
          ` : ""}
        </section>

        <!-- 2. Suministros del expediente (Filtrados por perfil, con título más legible) -->
        ${suministrosCardsHTML}

        <hr class="dossier-section-divider" />

        <!-- 3. Stepper de las 4 Fases (con título más grande y más oscuro) -->
        <div class="dossier-phases-block" id="dossierAnchorPhases">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <span class="dossier-phases-heading-with-icon">
              <span class="sum-type-icon-badge is-small">${icon(currentSumIconName, 14)}</span>
              <span>Fases${currentSum ? ` del suministro ${currentSum.id} (${currentSum.tipo})` : " del expediente"}</span>
            </span>
            <span style="font-size:0.76rem;color:var(--entity-accent);font-weight:650">
              ${isCurrentContextClosed ? `Cerrado · 4/4 fases completadas` : `Fase activa: ${PHASES[activeEntityPhaseActual].num}. ${PHASES[activeEntityPhaseActual].name}`}
            </span>
          </div>
          <div class="dossier-stepper is-4-phases">
            ${stepperHTML}
          </div>
        </div>

        <!-- 4. Barra de Estado, Fase, Nombre y Botones adaptados al perfil -->
        ${phaseOpsPanelBelowStepperHTML}

        <!-- 5. Selector y Matching ENCIMA del menú (sólo visible en Fase 2: Proveedores) -->
        ${selectorAboveMenuHTML}

        ${(isRoleCliente || isRoleProveedor) && activeDossierPhase === PHASES.length - 1 ? `
          <div class="passport-cta-bar ${exp.cerrado ? "is-ready" : ""}">
            <div class="passport-cta-copy">
              <span class="passport-cta-icon">${icon("award", 20)}</span>
              <div>
                <strong>Pasaporte Digital SOFEIN</strong>
                <small>${exp.cerrado ? "Tu pasaporte con la trazabilidad completa del suministro ya está disponible." : "Se emitirá cuando SOFEIN cierre el expediente."}</small>
              </div>
            </div>
            <button class="passport-cta-btn" type="button" ${exp.cerrado ? `data-switch-dossier-tab="passport"` : `disabled title="Disponible cuando SOFEIN cierre el expediente"`}>
              ${icon(exp.cerrado ? "award" : "lock", 15)} Conseguir Pasaporte Digital
            </button>
          </div>
        ` : ""}

        <hr class="dossier-section-divider" />

        <!-- 6. Menú de Secciones del Expediente -->
        <div class="dossier-tabs" id="dossierAnchorTabs">
          <button class="dossier-tab-btn ${activeDossierTab === "deliverables" ? "is-active" : ""}" type="button" data-switch-dossier-tab="deliverables">
            ${icon("file", 16)} Documentación
          </button>
          <button class="dossier-tab-btn ${activeDossierTab === "incidents" ? "is-active" : ""}" type="button" data-switch-dossier-tab="incidents">
            ${icon("alert", 16)} Registro de incidencias y cambios
            ${totalRegistroBadge ? `<b class="badge">${totalRegistroBadge}</b>` : ""}
          </button>
          <button class="dossier-tab-btn ${activeDossierTab === "comms" ? "is-active" : ""}" type="button" data-switch-dossier-tab="comms">
            ${icon("inbox", 16)} Avisos
            ${expNotices.length ? `<b class="badge">${expNotices.length}</b>` : ""}
          </button>
          ${isRoleAdmin ? `
            <button class="dossier-tab-btn ${activeDossierTab === "notes" ? "is-active" : ""}" type="button" data-switch-dossier-tab="notes">
              ${icon("lock", 16)} Anotaciones
            </button>
          ` : ""}
          ${isRoleAdmin && SHOW_HISTORY_TAB ? `
            <button class="dossier-tab-btn ${activeDossierTab === "history" ? "is-active" : ""}" type="button" data-switch-dossier-tab="history">
              ${icon("activity", 16)} Historial
            </button>
          ` : ""}
          ${canSeePassportTab ? `
            <button class="dossier-tab-btn is-passport-tab ${activeDossierTab === "passport" ? "is-active" : ""}" type="button" data-switch-dossier-tab="passport">
              ${icon("award", 16)} Pasaporte Digital
            </button>
          ` : ""}
        </div>

        <!-- Contenido de la Sección -->
        ${tabContent}
      </div>
    `;
  }

  /* ============================================================
     SECCIÓN REUTILIZABLE: AVISOS (CENTRALIZADO, ALINEADO Y AGRUPABLE)
     ============================================================ */
  function renderAvisosSection(role) {
    const roleNotices = NOTICES.filter(n => canRoleSeeNotice(n, role));
    const activeNotices = roleNotices.filter(n => !completedNotices.has(n.id));
    const completedList = roleNotices.filter(n => completedNotices.has(n.id));

    const renderTableHeaderHTML = (groupMode = "none") => `
      <div class="admin-doc-table-head avisos-grid group-${groupMode}">
        <span class="avisos-th ${avisosSortCol === 'tipo' ? 'is-sorted' : ''}" data-sort-aviso="tipo" title="Ordenar por tipo/prioridad">
          Tipo ${getAvisosSortIndicator('tipo')}
        </span>
        <span class="avisos-th ${avisosSortCol === 'titulo' ? 'is-sorted' : ''}" data-sort-aviso="titulo" title="Ordenar por aviso/actividad">
          Aviso / Actividad ${getAvisosSortIndicator('titulo')}
        </span>
        ${groupMode !== 'expediente' ? `
          <span class="avisos-th ${avisosSortCol === 'expId' ? 'is-sorted' : ''}" data-sort-aviso="expId" title="Ordenar por expediente">
            Expediente ${getAvisosSortIndicator('expId')}
          </span>
        ` : ""}
        ${groupMode !== 'suministro' ? `
          <span class="avisos-th ${avisosSortCol === 'suministro' ? 'is-sorted' : ''}" data-sort-aviso="suministro" title="Ordenar por suministro">
            Suministro ${getAvisosSortIndicator('suministro')}
          </span>
        ` : ""}
        ${groupMode !== 'categoria' ? `
          <span class="avisos-th ${avisosSortCol === 'categoria' ? 'is-sorted' : ''}" data-sort-aviso="categoria" title="Ordenar por categoría">
            Categoría ${getAvisosSortIndicator('categoria')}
          </span>
        ` : ""}
        ${groupMode !== 'fecha' ? `
          <span class="avisos-th ${avisosSortCol === 'fecha' ? 'is-sorted' : ''}" data-sort-aviso="fecha" title="Ordenar por fecha">
            Fecha ${getAvisosSortIndicator('fecha')}
          </span>
        ` : ""}
        <span style="text-align:right">Acciones</span>
      </div>
    `;

    const renderNoticeRow = (n, isCompleted = false, groupMode = "none") => {
      const sumLabel = (n.suministro || "General").replace(/^SUM-?/i, "");
      return `
        <article class="admin-doc-row avisos-grid group-${groupMode}">
          <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:var(--entity-panel-2)">
            ${icon(n.tagClass === "warning" ? "alert" : n.tagClass === "review" ? "file" : "check", 16)}
          </span>
          <div style="min-width:0">
            <strong style="display:block;margin-bottom:2px;cursor:pointer" data-go="${n.enlace}">${n.titulo}</strong>
            <small style="color:var(--entity-muted);display:block;line-height:1.4">${n.descripcion}</small>
          </div>
          ${groupMode !== 'expediente' ? `
            <div>
              <button class="avisos-exp-chip-link" type="button" data-go="#${role}/expedientes/${n.expId}" title="Abrir expediente ${n.expId}">
                ${icon("folder", 12)} ${n.expId}
              </button>
            </div>
          ` : ""}
          ${groupMode !== 'suministro' ? `
            <div>
              <button class="avisos-sum-chip" type="button" data-go="#${role}/expedientes/${n.expId}?tab=deliverables${n.sumId ? `&sumId=${n.sumId}` : ""}" title="Suministro: ${sumLabel}">
                ${icon("box", 12)} <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${sumLabel}</span>
              </button>
            </div>
          ` : ""}
          ${groupMode !== 'categoria' ? `
            <div>
              <span class="dossier-chip" style="font-size:0.68rem;white-space:nowrap">${n.categoria}</span>
            </div>
          ` : ""}
          ${groupMode !== 'fecha' ? `
            <div style="white-space:nowrap">
              <time style="font-size:0.72rem;color:var(--entity-faint)">${n.fecha}</time>
            </div>
          ` : ""}
          <div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;white-space:nowrap">
            ${!isCompleted ? `
              <button class="admin-quiet-button" type="button" data-go="${n.enlace}">${n.accion}</button>
              <button class="admin-quiet-button" type="button" data-complete-notice="${n.id}" data-dismiss-notice="${n.id}" title="Marcar aviso como completado" style="color:var(--entity-accent)">
                ${icon("check", 12)} Completado
              </button>
            ` : `
              <button class="admin-quiet-button" type="button" data-restore-notice="${n.id}" style="color:var(--entity-accent)" title="Reabrir aviso">
                ${icon("check", 12)} Reabrir
              </button>
            `}
          </div>
        </article>
      `;
    };

    let mainAvisosHTML = "";
    if (activeNotices.length === 0) {
      mainAvisosHTML = `
        <div style="padding:40px;text-align:center;color:var(--entity-muted);background:var(--entity-panel);border-radius:10px;border:1px solid var(--entity-line)">
          No hay avisos pendientes en esta bandeja.
        </div>
      `;
    } else if (avisosGroup === "none") {
      const sortedNotices = sortNotices(activeNotices);
      mainAvisosHTML = `
        <section class="admin-document-list" style="border:1px solid var(--entity-line);border-radius:10px;overflow:hidden;background:var(--entity-panel)">
          ${renderTableHeaderHTML("none")}
          ${sortedNotices.map(n => renderNoticeRow(n, false, "none")).join("")}
        </section>
      `;
    } else if (avisosGroup === "expediente") {
      const groups = {};
      activeNotices.forEach(n => {
        if (!groups[n.expId]) groups[n.expId] = [];
        groups[n.expId].push(n);
      });
      mainAvisosHTML = Object.keys(groups).map(expId => {
        const exp = getActiveExpediente(expId);
        const phaseName = PHASES[exp.faseActual] ? PHASES[exp.faseActual].name : "";
        const groupNotices = sortNotices(groups[expId]);
        return `
          <section class="avisos-group-card">
            <div class="avisos-group-card-head">
              <div class="avisos-group-card-title" data-go="#${role}/expedientes/${expId}" style="cursor:pointer" title="Abrir expediente ${expId}">
                ${icon("folder", 16)}
                <span style="text-decoration:underline;text-underline-offset:3px">${expId} · ${exp.producto}</span>
                <span class="avisos-group-card-sub">· ${exp.cliente} (${phaseName})</span>
              </div>
              <div style="display:flex;align-items:center;gap:10px">
                <span class="avisos-group-count-pill">${groupNotices.length} ${groupNotices.length === 1 ? "aviso" : "avisos"}</span>
                <button class="admin-quiet-button" type="button" data-go="#${role}/expedientes/${expId}" style="padding:3px 9px;font-size:0.72rem">
                  Abrir expediente ${icon("arrow", 12)}
                </button>
              </div>
            </div>
            ${renderTableHeaderHTML("expediente")}
            ${groupNotices.map(n => renderNoticeRow(n, false, "expediente")).join("")}
          </section>
        `;
      }).join("");
    } else if (avisosGroup === "suministro") {
      const groups = {};
      activeNotices.forEach(n => {
        const rawKey = n.suministro || "General del Lote";
        const sumKey = rawKey.replace(/^SUM-?/i, "");
        if (!groups[sumKey]) groups[sumKey] = [];
        groups[sumKey].push(n);
      });
      mainAvisosHTML = Object.keys(groups).map(sumKey => {
        const groupNotices = sortNotices(groups[sumKey]);
        const sampleNotice = groupNotices[0];
        return `
          <section class="avisos-group-card">
            <div class="avisos-group-card-head">
              <div class="avisos-group-card-title" data-go="#${role}/suministros" style="cursor:pointer" title="Ver suministros">
                ${icon("box", 16)}
                <span style="text-decoration:underline;text-underline-offset:3px">${sumKey}</span>
                <span class="avisos-group-card-sub">· Expediente ${sampleNotice.expId}</span>
              </div>
              <div style="display:flex;align-items:center;gap:10px">
                <span class="avisos-group-count-pill">${groupNotices.length} ${groupNotices.length === 1 ? "aviso" : "avisos"}</span>
                <button class="admin-quiet-button" type="button" data-go="#${role}/suministros" style="padding:3px 9px;font-size:0.72rem">
                  Ver suministros ${icon("arrow", 12)}
                </button>
              </div>
            </div>
            ${renderTableHeaderHTML("suministro")}
            ${groupNotices.map(n => renderNoticeRow(n, false, "suministro")).join("")}
          </section>
        `;
      }).join("");
    } else if (avisosGroup === "categoria") {
      const groups = {};
      activeNotices.forEach(n => {
        const cat = n.categoria || "General";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(n);
      });
      mainAvisosHTML = Object.keys(groups).map(cat => {
        const groupNotices = sortNotices(groups[cat]);
        return `
          <section class="avisos-group-card">
            <div class="avisos-group-card-head">
              <div class="avisos-group-card-title">
                ${icon("file", 16)}
                <span>Categoría: ${cat}</span>
              </div>
              <span class="avisos-group-count-pill">${groupNotices.length} ${groupNotices.length === 1 ? "aviso" : "avisos"}</span>
            </div>
            ${renderTableHeaderHTML("categoria")}
            ${groupNotices.map(n => renderNoticeRow(n, false, "categoria")).join("")}
          </section>
        `;
      }).join("");
    } else if (avisosGroup === "fecha") {
      const groups = {};
      activeNotices.forEach(n => {
        const dateKey = n.fecha.includes("Hoy") ? "Hoy" : n.fecha.includes("Ayer") ? "Ayer" : "Anteriores";
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(n);
      });
      mainAvisosHTML = Object.keys(groups).map(dateKey => {
        const groupNotices = sortNotices(groups[dateKey]);
        return `
          <section class="avisos-group-card">
            <div class="avisos-group-card-head">
              <div class="avisos-group-card-title">
                ${icon("calendar", 16)}
                <span>Periodo: ${dateKey}</span>
              </div>
              <span class="avisos-group-count-pill">${groupNotices.length} ${groupNotices.length === 1 ? "aviso" : "avisos"}</span>
            </div>
            ${renderTableHeaderHTML("fecha")}
            ${groupNotices.map(n => renderNoticeRow(n, false, "fecha")).join("")}
          </section>
        `;
      }).join("");
    }

    return `
      <div class="admin-view-head">
        <div>
          <h1>Avisos</h1>
        </div>
        ${role === "admin" ? `
          <button class="admin-primary-button" type="button" data-open-create-notice-modal>
            ${icon("plus", 14)} Emitir Aviso
          </button>
        ` : ""}
      </div>

      <div class="avisos-controls">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-size:0.75rem;color:var(--entity-muted);font-weight:600">Agrupar por:</span>
          <div class="avisos-group-buttons">
            <button class="avisos-group-btn ${avisosGroup === 'none' ? 'is-active' : ''}" type="button" data-group-avisos="none">Sin agrupar</button>
            <button class="avisos-group-btn ${avisosGroup === 'expediente' ? 'is-active' : ''}" type="button" data-group-avisos="expediente">Expediente</button>
            <button class="avisos-group-btn ${avisosGroup === 'suministro' ? 'is-active' : ''}" type="button" data-group-avisos="suministro">Suministro</button>
            <button class="avisos-group-btn ${avisosGroup === 'categoria' ? 'is-active' : ''}" type="button" data-group-avisos="categoria">Categoría</button>
            <button class="avisos-group-btn ${avisosGroup === 'fecha' ? 'is-active' : ''}" type="button" data-group-avisos="fecha">Fecha</button>
          </div>
        </div>
        <span style="font-size:0.74rem;color:var(--entity-muted)">${activeNotices.length} aviso(s) activo(s)</span>
      </div>

      ${mainAvisosHTML}

      <details class="admin-discarded-details" ${showCompletedAvisos ? "open" : ""}>
        <summary id="toggleCompletedSummary">
          <span>${icon("check", 14)} Ver completados (${completedList.length})</span>
          <span style="font-size:0.72rem;color:var(--entity-faint)">${showCompletedAvisos ? "Ocultar completados" : "Desplegar para revisar o reabrir"}</span>
        </summary>
        <div class="admin-discarded-list">
          ${completedList.length ? sortNotices(completedList).map(n => renderNoticeRow(n, true, avisosGroup)).join("") : `
            <div style="padding:24px;text-align:center;font-size:0.8rem;color:var(--entity-muted)">No hay avisos completados en esta sesión.</div>
          `}
        </div>
      </details>
    `;
  }

  /* ============================================================
     VISTAS: SOFEIN ADMIN
     ============================================================ */
  /* ============================================================
     SECCIÓN REUTILIZABLE: SUMINISTROS (TABLA B2B, AGRUPABLE Y ORDENABLE)
     ============================================================ */
  function getSuministrosForRole(role) {
    if (role === "cliente") {
      return SUMINISTROS.filter(s => s.cliente.toLowerCase().includes("infraestructuras"));
    }
    if (role === "proveedor") {
      return SUMINISTROS.filter(s => s.proveedor.toLowerCase().includes("iberrail"));
    }
    return SUMINISTROS;
  }

  // Acciones pendientes de un suministro según el rol activo (SOFEIN / cliente / proveedor).
  // Los suministros finalizados o cerrados no tienen acciones; los creados sin desglose por rol
  // solo cuentan para SOFEIN.
  function getSuministroAccionesPendientes(s, role = activeRole) {
    if (!s || (s.estado && s.estado !== "activo")) return 0;
    const byRole = s.accionesPendientesRol;
    if (byRole && typeof byRole[role] === "number") return byRole[role];
    return role === "admin" ? (s.accionesPendientes || 0) : 0;
  }

  // Última vista renderizada de Suministros (columnas visibles + filas filtradas) para exportar
  let suministrosExportSnapshot = null;

  function getSuministroExportValue(s, colId, role) {
    switch (colId) {
      case "suministro": return s.num;
      case "tipo": return s.tipo;
      case "descripcion": return s.descripcion || "";
      case "unidades": return s.unidades;
      case "expediente": return s.expId;
      case "proveedor": return s.proveedor;
      case "cliente": return s.cliente;
      case "destino": return s.destino;
      case "ano": return s.ano;
      case "fase": return s.faseNombre || `Fase ${s.faseActual + 1}`;
      case "acciones": return getSuministroAccionesPendientes(s, role);
      case "fechaEntrega": return s.fechaEntrega;
      default: return "";
    }
  }

  function exportSuministrosCSV() {
    const snap = suministrosExportSnapshot;
    if (!snap || !snap.rows.length) {
      showToast("No hay suministros visibles para exportar");
      return;
    }
    const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const header = snap.cols.map(c => esc((ALL_SUMINISTROS_COL_DEFS[c] || { label: c }).label));
    const lines = [header.join(";")].concat(
      snap.rows.map(s => snap.cols.map(c => esc(getSuministroExportValue(s, c, snap.role))).join(";"))
    );
    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suministros-sofein.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`✓ Exportados ${snap.rows.length} suministros a Excel (CSV)`);
  }

  // Ruta al suministro dentro de su expediente (pestaña de entregables con el suministro activo)
  function getSuministroDossierHash(s, role = activeRole) {
    return `#${role}/expedientes/${s.expId}?tab=deliverables&sumId=${s.id}`;
  }

  // Cálculo reactivo de pendientes para las burbujas del menú lateral (pendientes, no activos)
  function getRolePendingCount(role, navId) {
    if (navId === "suministros") {
      // Cuenta suministros con acciones pendientes en ese rol, o suministros activos pendientes de cierre
      // Ejemplo del usuario: 5 suministros pendientes
      const sumList = getSuministrosForRole(role);
      const withActions = sumList.filter(s => getSuministroAccionesPendientes(s, role) > 0).length;
      if (withActions > 0) return withActions;
      return sumList.filter(s => s.estado === "activo").length;
    }
    if (navId === "expedientes") {
      const roleExps = getExpedientesForRole(role);
      const pendingActionCount = roleExps.filter(e => {
        const meta = getExpVisualMeta(e, role);
        return meta.hasPendingAction;
      }).length;
      return pendingActionCount > 0 ? pendingActionCount : roleExps.filter(e => !e.cerrado).length;
    }
    if (navId === "avisos") {
      return NOTICES.filter(n => canRoleSeeNotice(n, role) && !discardedNotices.has(n.id)).length;
    }
    if (navId === "cotizaciones") {
      return SUMINISTROS.filter(sum => {
        const exp = EXPEDIENTES.find(e => e.id === sum.expId);
        return exp && getQuoteEstado(ensureSuministroMatching(exp, sum), SELECTOR_MY_PROVIDER_ID) === "pendiente";
      }).length;
    }
    const player = PLAYERS[role];
    const item = player ? player.nav.find(n => n.id === navId) : null;
    return item ? (item.count || 0) : 0;
  }

  // Mini KPI de días hasta la fecha de entrega
  function getDeliveryKpi(s) {
    if (!s.fechaEntregaIso && !s.fechaEntrega) return null;
    const isoStr = s.fechaEntregaIso || s.fechaEntrega;
    const target = new Date(isoStr);
    if (isNaN(target.getTime())) return null;
    target.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (s.estado === "finalizado" || s.estado === "cerrado") {
      return {
        days: 0,
        text: s.estado === "cerrado" ? "Cerrado" : "Entregado",
        class: "is-delivered",
        label: s.estado === "cerrado" ? "Suministro cerrado formalmente" : "Lote entregado y conforme"
      };
    }

    if (diffDays > 0) {
      return {
        days: diffDays,
        text: `+${diffDays} d`,
        class: "is-positive",
        label: `Quedan ${diffDays} días para la entrega prevista`
      };
    } else if (diffDays < 0) {
      const abs = Math.abs(diffDays);
      return {
        days: diffDays,
        text: `-${abs} d`,
        class: "is-negative",
        label: `Retraso de ${abs} días sobre la fecha prevista`
      };
    } else {
      return {
        days: 0,
        text: "Hoy",
        class: "is-today",
        label: "Entrega programada para hoy"
      };
    }
  }

  // Opciones dinámicas para el filtro embebido en cabecera TH
  // Opciones facetadas: solo valores presentes en la tabla activa con el buscador y el resto de filtros aplicados.
  // Se ignora el filtro de la propia columna (para poder cambiarlo) y se conserva siempre el valor seleccionado.
  function getColFilterOptions(colId, rows, role, q) {
    const selected = suministrosFilters[colId];
    const optionRows = rows.filter(s => matchesSuministroFilter(s, q, role, { [colId]: "all" }));
    if (selected && selected !== "all") {
      const onlyThisCol = Object.fromEntries(Object.keys(suministrosFilters).map(k => [k, k === colId ? selected : "all"]));
      optionRows.push(...rows.filter(s => matchesSuministroFilter(s, "", role, onlyThisCol)));
    }
    const fixedOptions = opts => opts
      .filter(([v]) => v === selected || rows.some(s => matchesSuministroFilter(s, q, role, { [colId]: v })))
      .map(([v, label]) => `<option value="${v}" ${selected === v ? "selected" : ""}>${label}</option>`)
      .join("");
    switch (colId) {
      case "suministro": {
        const nums = Array.from(new Set(optionRows.map(s => s.num))).sort();
        return nums.map(n => `<option value="${n}" ${suministrosFilters.suministro === n ? "selected" : ""}>Suministro ${n}</option>`).join("");
      }
      case "tipo": {
        const tipos = Array.from(new Set(optionRows.map(s => s.tipo))).sort();
        return tipos.map(t => `<option value="${t}" ${suministrosFilters.tipo === t ? "selected" : ""}>${t}</option>`).join("");
      }
      case "descripcion": {
        const descs = Array.from(new Set(optionRows.map(s => s.descripcion).filter(Boolean))).sort();
        return descs.map(d => `<option value="${d}" ${suministrosFilters.descripcion === d ? "selected" : ""}>${d.length > 28 ? d.slice(0, 26) + "…" : d}</option>`).join("");
      }
      case "unidades": {
        return fixedOptions([["gt10k", "&gt; 10.000"], ["1k-10k", "1.000 – 10.000"], ["lt1k", "&lt; 1.000"]]);
      }
      case "expediente": {
        const exps = Array.from(new Set(optionRows.map(s => s.expId))).sort();
        return exps.map(e => `<option value="${e}" ${suministrosFilters.expediente === e ? "selected" : ""}>${e}</option>`).join("");
      }
      case "proveedor": {
        const provs = Array.from(new Set(optionRows.map(s => s.proveedor))).sort();
        return provs.map(p => `<option value="${p}" ${suministrosFilters.proveedor === p ? "selected" : ""}>${p.length > 22 ? p.slice(0, 20) + "…" : p}</option>`).join("");
      }
      case "cliente": {
        const clis = Array.from(new Set(optionRows.map(s => s.cliente))).sort();
        return clis.map(c => `<option value="${c}" ${suministrosFilters.cliente === c ? "selected" : ""}>${c.length > 22 ? c.slice(0, 20) + "…" : c}</option>`).join("");
      }
      case "destino": {
        const dests = Array.from(new Set(optionRows.map(s => s.destino))).sort();
        return dests.map(d => `<option value="${d}" ${suministrosFilters.destino === d ? "selected" : ""}>${d.length > 24 ? d.slice(0, 22) + "…" : d}</option>`).join("");
      }
      case "ano": {
        const anos = Array.from(new Set(optionRows.map(s => s.ano))).sort((a, b) => b - a);
        return anos.map(a => `<option value="${a}" ${suministrosFilters.ano === String(a) ? "selected" : ""}>Año ${a}</option>`).join("");
      }
      case "fase": {
        const fIndices = Array.from(new Set(optionRows.map(s => s.faseActual))).sort((a, b) => a - b);
        return fIndices.map(fIdx => {
          const name = SHORT_PHASE_NAMES[fIdx] || `Fase ${fIdx + 1}`;
          return `<option value="${fIdx}" ${suministrosFilters.fase === String(fIdx) ? "selected" : ""}>Fase ${fIdx + 1}: ${name}</option>`;
        }).join("");
      }
      case "acciones": {
        return fixedOptions([["has_pending", "Con pendientes"], ["none", "Al día (0)"]]);
      }
      case "fechaEntrega": {
        return fixedOptions([["upcoming", "Próximas (+d)"], ["delayed", "Retrasadas (-d)"], ["today", "Hoy"]]);
      }
      default:
        return "";
    }
  }

  function matchesSuministroFilter(s, q, role, overrides) {
    const f = overrides ? { ...suministrosFilters, ...overrides } : suministrosFilters;
    if (q) {
      const haystack = `${s.num} ${s.tipo} ${s.descripcion || ""} ${s.unidades} ${s.expId} ${s.proveedor} ${s.cliente} ${s.destino} ${s.ano} ${s.faseNombre} ${s.fechaEntrega}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.suministro !== "all" && s.num !== f.suministro) return false;
    if (f.tipo !== "all" && s.tipo !== f.tipo) return false;
    if (f.descripcion !== "all" && s.descripcion !== f.descripcion) return false;
    if (f.unidades !== "all") {
      const num = s.unidadesNum || parseInt(String(s.unidades).replace(/\./g, ""), 10) || 0;
      if (f.unidades === "gt10k" && num <= 10000) return false;
      if (f.unidades === "1k-10k" && (num < 1000 || num > 10000)) return false;
      if (f.unidades === "lt1k" && num >= 1000) return false;
    }
    if (f.expediente !== "all" && s.expId !== f.expediente) return false;
    if (f.proveedor !== "all" && s.proveedor !== f.proveedor) return false;
    if (f.cliente !== "all" && s.cliente !== f.cliente) return false;
    if (f.destino !== "all" && s.destino !== f.destino) return false;
    if (f.ano !== "all" && String(s.ano) !== f.ano) return false;
    if (f.fase !== "all" && String(s.faseActual) !== f.fase) return false;
    if (f.acciones !== "all") {
      const accionesRol = getSuministroAccionesPendientes(s, role);
      if (f.acciones === "has_pending" && accionesRol === 0) return false;
      if (f.acciones === "none" && accionesRol > 0) return false;
    }
    if (f.fechaEntrega !== "all") {
      const kpi = getDeliveryKpi(s);
      if (f.fechaEntrega === "upcoming" && (!kpi || kpi.days <= 0)) return false;
      if (f.fechaEntrega === "delayed" && (!kpi || kpi.days >= 0)) return false;
      if (f.fechaEntrega === "today" && (!kpi || kpi.days !== 0)) return false;
    }
    return true;
  }

  function sortSuministrosList(list, sortCol, sortDir, role) {
    const mult = sortDir === "desc" ? -1 : 1;
    return [...list].sort((a, b) => {
      let valA, valB;
      switch (sortCol) {
        case "suministro":
        case "num":
          return (parseInt(a.num, 10) - parseInt(b.num, 10)) * mult;
        case "tipo":
          return a.tipo.localeCompare(b.tipo, "es") * mult;
        case "descripcion":
          return (a.descripcion || "").localeCompare(b.descripcion || "", "es") * mult;
        case "unidades":
          valA = a.unidadesNum || parseInt(String(a.unidades).replace(/\./g, ""), 10) || 0;
          valB = b.unidadesNum || parseInt(String(b.unidades).replace(/\./g, ""), 10) || 0;
          return (valA - valB) * mult;
        case "expediente":
          valA = a.expId.localeCompare(b.expId, "es");
          if (valA !== 0) return valA * mult;
          return (parseInt(a.num, 10) - parseInt(b.num, 10)) * mult;
        case "proveedor":
          return a.proveedor.localeCompare(b.proveedor, "es") * mult;
        case "cliente":
          return a.cliente.localeCompare(b.cliente, "es") * mult;
        case "destino":
          return a.destino.localeCompare(b.destino, "es") * mult;
        case "ano":
          return ((a.ano || 0) - (b.ano || 0)) * mult;
        case "fase":
          return ((a.faseActual ?? 0) - (b.faseActual ?? 0)) * mult;
        case "acciones":
          return (getSuministroAccionesPendientes(a, role) - getSuministroAccionesPendientes(b, role)) * mult;
        case "fechaEntrega":
          valA = new Date(a.fechaEntregaIso || a.fechaEntrega).getTime() || 0;
          valB = new Date(b.fechaEntregaIso || b.fechaEntrega).getTime() || 0;
          return (valA - valB) * mult;
        default:
          return 0;
      }
    });
  }

  function renderSuministrosSection(role) {
    loadSuministrosColPrefs();
    const roleAll = getSuministrosForRole(role);

    // Separar suministros activos vs finalizados/cerrados
    const activeRoleList = roleAll.filter(s => s.estado !== "finalizado" && s.estado !== "cerrado");
    const closedRoleList = roleAll.filter(s => s.estado === "finalizado" || s.estado === "cerrado");

    const q = suministrosSearchQuery.trim().toLowerCase();

    // Filtrar ambas listas con el buscador y los filtros por cabecera
    const activeFiltered = activeRoleList.filter(s => matchesSuministroFilter(s, q, role));
    const closedFiltered = closedRoleList.filter(s => matchesSuministroFilter(s, q, role));

    // Ordenar listas
    const activeSorted = sortSuministrosList(activeFiltered, suministrosSortCol, suministrosSortDir, role);
    const closedSorted = sortSuministrosList(closedFiltered, suministrosSortCol, suministrosSortDir, role);

    const hasActiveFilters =
      suministrosSearchQuery.trim() !== "" ||
      Object.values(suministrosFilters).some(v => v !== "all");

    // Columnas visibles calculadas
    const visibleCols = suministrosColumnOrder.filter(cId => !suministrosHiddenCols.has(cId));
    if (visibleCols.length === 0) {
      visibleCols.push("suministro", "tipo");
    }

    // Snapshot para exportar a Excel (ambas listas)
    suministrosExportSnapshot = {
      role,
      cols: [...visibleCols],
      rows: activeSorted.concat(closedSorted)
    };

    const renderTableHeadHTML = (includeFilters = true) => `
      <thead>
        <tr>
          ${visibleCols.map(colId => {
            const colDef = ALL_SUMINISTROS_COL_DEFS[colId] || { label: colId };
            const isSorted = suministrosSortCol === colId || (colId === "suministro" && suministrosSortCol === "num");
            const sortIndicator = isSorted
              ? `<span class="suministros-sort-icon is-active">${suministrosSortDir === "asc" ? "↑" : "↓"}</span>`
              : '<span class="suministros-sort-icon">↕</span>';
            const isColFiltered = suministrosFilters[colId] && suministrosFilters[colId] !== "all";
            const filterOptions = includeFilters ? getColFilterOptions(colId, activeRoleList, role, q) : "";
            return `
              <th class="suministros-th ${isSorted ? 'is-sorted' : ''}"
                  data-col-id="${colId}"
                  draggable="true"
                  title="Arrastra para reordenar columna"
                  style="min-width:${colDef.minWidth || '90px'}">
                <div class="suministros-th-inner">
                  <span class="suministros-th-drag-grip" title="Arrastrar para mover columna">⠿</span>
                  <span class="suministros-th-label" data-sort-suministro="${colId}" title="Clic para ordenar por ${colDef.label}">
                    ${colDef.label}
                  </span>
                  <span class="suministros-sort-icon ${isSorted ? 'is-active' : ''}" data-sort-suministro="${colId}">${sortIndicator}</span>
                  <button type="button" class="suministros-th-hide-btn" data-hide-col="${colId}" title="Ocultar columna «${colDef.label}»" aria-label="Ocultar columna «${colDef.label}»">
                    ${icon("eyeOff", 12)}
                  </button>
                </div>
                ${includeFilters ? `
                  <div class="suministros-th-filter-wrap" draggable="false">
                    <select class="suministros-th-filter-select ${isColFiltered ? 'is-filtered' : ''}"
                            data-th-filter="${colId}"
                            title="Filtrar por ${colDef.label}"
                            aria-label="Filtrar por ${colDef.label}">
                      <option value="all">Todos</option>
                      ${filterOptions}
                    </select>
                  </div>
                ` : ""}
              </th>
            `;
          }).join("")}
        </tr>
      </thead>
    `;

    // Celdas Proveedor/Cliente: en admin enlazan al Directorio filtrado por esa entidad
    const dirEntityLinkAttrs = (name, kind) => {
      if (role !== "admin" || !name) return "";
      const list = kind === "proveedor" ? DIRECTORIO_PROVEEDORES : DIRECTORIO_CLIENTES;
      if (!list.some(e => e.nombre === name)) return "";
      const dirType = kind === "proveedor" ? "proveedores" : "clientes";
      const label = kind === "proveedor" ? "Ver proveedor" : "Ver cliente";
      return ` class="suministro-entity-link" data-go="#admin/directorio?dirType=${dirType}&q=${encodeURIComponent(name)}" data-row-hint="${escHTML(label + " " + name)}"`;
    };

    const renderCellHTML = (s, colId) => {
      switch (colId) {
        case "suministro":
          return `
            <td class="suministro-num-cell">
              <span class="suministro-badge-num">${s.num}</span>
            </td>
          `;
        case "tipo":
          return `
            <td class="suministro-tipo-cell">
              <strong>${s.tipo}</strong>
            </td>
          `;
        case "descripcion":
          return `
            <td class="suministro-desc-cell">
              <span>${s.descripcion || '—'}</span>
            </td>
          `;
        case "unidades":
          return `
            <td class="suministro-units">
              <span>${s.unidades}</span>
            </td>
          `;
        case "expediente":
          return `
            <td>
              <a href="#${role}/expedientes/${s.expId}" class="suministro-exp-link" data-row-hint="Abrir expediente ${s.expId}">
                ${s.expId}
              </a>
            </td>
          `;
        case "proveedor":
          return `
            <td class="suministro-prov-cell">
              <span${dirEntityLinkAttrs(s.proveedor, "proveedor")}>${s.proveedor}</span>
            </td>
          `;
        case "cliente":
          return `
            <td class="suministro-cli-cell">
              <span${dirEntityLinkAttrs(s.cliente, "cliente")}>${s.cliente}</span>
            </td>
          `;
        case "destino":
          return `
            <td class="suministro-dest-cell">
              <span>${s.destino}</span>
            </td>
          `;
        case "ano":
          return `
            <td class="suministro-ano-cell">
              <span>${s.ano}</span>
            </td>
          `;
        case "fase": {
          const fInfo = PHASES[s.faseActual] || {};
          const fName = SHORT_PHASE_NAMES[s.faseActual] || fInfo.name || `Fase ${s.faseActual + 1}`;
          return `
            <td>
              <span class="dossier-phase-pill is-active">
                Fase ${s.faseActual + 1}: ${fName}
              </span>
            </td>
          `;
        }
        case "acciones": {
          const accionesRol = getSuministroAccionesPendientes(s, role);
          const expHash = getSuministroDossierHash(s, role);
          if (accionesRol > 0) {
            return `
              <td>
                <a href="${expHash}" class="suministro-acciones-link has-actions" data-row-hint="Ver ${accionesRol} acción${accionesRol > 1 ? "es" : ""} pendiente${accionesRol > 1 ? "s" : ""}">
                  ${icon("alert", 12)}
                  <span>${accionesRol} pendiente${accionesRol > 1 ? "s" : ""}</span>
                </a>
              </td>
            `;
          }
          return `
            <td>
              <span class="suministro-acciones-none">
                ${icon("check", 12)} 0
              </span>
            </td>
          `;
        }
        case "fechaEntrega": {
          const kpi = getDeliveryKpi(s);
          return `
            <td class="suministro-date-cell">
              <div class="suministro-date-wrap">
                <span>${s.fechaEntrega}</span>
                ${kpi ? `<span class="suministro-kpi-pill ${kpi.class}">${kpi.text}</span>` : ""}
              </div>
            </td>
          `;
        }
        default:
          return `<td>-</td>`;
      }
    };

    const renderRowHTML = s => {
      const expHash = getSuministroDossierHash(s, role);
      return `
        <tr class="suministros-row" data-go="${expHash}" data-row-hint="Ver suministro ${s.num} · ${s.expId}" tabindex="0" role="link" aria-label="Ver suministro ${s.num} en expediente ${s.expId}">
          ${visibleCols.map(colId => renderCellHTML(s, colId)).join("")}
        </tr>
      `;
    };

    let mainContentHTML = "";
    if (activeSorted.length === 0) {
      mainContentHTML = `
        <div class="suministros-empty-state">
          ${icon("inbox", 38)}
          <h3>No se encontraron suministros activos</h3>
          <p>Prueba a ajustar o limpiar los filtros por columna o el término de búsqueda.</p>
          ${hasActiveFilters ? `
            <button type="button" class="admin-primary-button" data-reset-suministros-filters style="margin-top:12px">
              Restablecer filtros
            </button>
          ` : ""}
        </div>
      `;
    } else {
      mainContentHTML = `
        <div class="suministros-table-wrap">
          <table class="suministros-table">
            ${renderTableHeadHTML(true)}
            <tbody>
              ${activeSorted.map(s => renderRowHTML(s)).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    const closedContentHTML = closedRoleList.length > 0 ? `
      <div class="suministros-closed-section" style="margin-top:28px">
        <details class="dossier-collapsible-block suministros-closed-block" id="suministrosClosedBlock" ${isClosedTableOpen ? "open" : ""}>
          <summary class="dossier-collapsible-summary">
            <div class="dossier-collapsible-summary-left">
              <span class="dossier-section-kicker">Suministros Finalizados y Cerrados</span>
              <span class="dossier-chip complete" style="font-size:0.72rem;padding:2px 8px">
                ${closedSorted.length} de ${closedRoleList.length} finalizados
              </span>
            </div>
            <span class="dossier-collapsible-chevron" title="Colapsar / Expandir suministros finalizados">
              ${icon("chevronDown", 15)}
            </span>
          </summary>
          <div class="dossier-collapsible-body" style="padding:16px 0 0 0">
            ${closedSorted.length === 0 ? `
              <div class="suministros-empty-closed" style="padding:24px;text-align:center;color:var(--entity-muted);font-size:0.82rem">
                No hay suministros finalizados que coincidan con la búsqueda o filtros aplicados.
              </div>
            ` : `
              <div class="suministros-table-wrap">
                <table class="suministros-table is-closed-table">
                  ${renderTableHeadHTML(false)}
                  <tbody>
                    ${closedSorted.map(s => renderRowHTML(s)).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </details>
      </div>
    ` : "";

    const titles = {
      admin: {
        h1: "Suministros",
        p: "Registro integral de lotes de material ferroviario, unidades, expedientes vinculados y plazos de entrega para facilitar su gestión."
      },
      cliente: {
        h1: "Mis Suministros",
        p: ""
      },
      proveedor: {
        h1: "Mis Suministros",
        p: ""
      }
    };
    const headerInfo = titles[role] || titles.admin;

    return `
      <div class="admin-view-head">
        <div>
          <h1>${headerInfo.h1}</h1>
          ${headerInfo.p ? `<p>${headerInfo.p}</p>` : ""}
        </div>
        ${role === "cliente" ? `
          <button class="admin-primary-button" type="button" data-go="#cliente/nuevo">
            ${icon("plus", 14)} Solicitar Expediente
          </button>
        ` : ""}
      </div>

      <!-- Barra de Filtros, Búsqueda y Columnas -->
      <div class="suministros-controls-bar">
        <div class="suministros-toolbar-left">
          <div class="suministros-search-box">
            ${icon("search", 14)}
            <input type="search" id="suministrosSearchInput" placeholder="Buscar por tipo, exp., taller, destino..." value="${suministrosSearchQuery}">
            ${suministrosSearchQuery ? `<button type="button" id="clearSuministrosSearchBtn" class="admin-quiet-button" style="padding:0 4px">${icon("x", 12)}</button>` : ""}
          </div>
          ${hasActiveFilters ? `
            <button type="button" class="admin-quiet-button" data-reset-suministros-filters style="color:var(--entity-accent);padding:4px 10px;font-size:0.75rem;white-space:nowrap;display:inline-flex;align-items:center;gap:4px" title="Limpiar todos los filtros">
              ${icon("x", 12)} Limpiar filtros
            </button>
          ` : ""}
        </div>

        <div class="suministros-toolbar-right">
          <!-- Gestor de Columnas (Ocultar y Reordenar) -->
          <div class="suministros-cols-wrap" id="suministrosColsWrap">
            <button type="button" class="suministros-cols-btn ${suministrosHiddenCols.size > 0 ? 'is-active' : ''}" id="btnToggleColsMenu" aria-expanded="${isColsMenuOpen}">
              ${icon("columns", 13)}
              <span>Columnas</span>
              <span class="suministros-cols-count">(${visibleCols.length}/${DEFAULT_SUMINISTROS_COL_ORDER.length})</span>
              ${icon("chevronDown", 11)}
            </button>
            <div class="suministros-cols-popover" id="suministrosColsPopover" ${isColsMenuOpen ? '' : 'hidden'}>
              <div class="suministros-cols-popover-head">
                <div>
                  <strong>Personalizar columnas</strong>
                  <p>Arrastra cabeceras o usa flechas para ordenar; desmarca para ocultar.</p>
                </div>
                <button type="button" class="admin-quiet-button" id="btnResetColsConfig" title="Restablecer visibilidad y orden por defecto" style="font-size:0.72rem;color:var(--entity-accent)">
                  Restablecer
                </button>
              </div>
              <div class="suministros-cols-list">
                ${suministrosColumnOrder.map((colId, idx) => {
                  const colDef = ALL_SUMINISTROS_COL_DEFS[colId] || { label: colId };
                  const isVis = !suministrosHiddenCols.has(colId);
                  return `
                    <div class="suministros-col-row" data-popover-col-id="${colId}">
                      <label class="suministros-col-check-label">
                        <input type="checkbox" data-col-toggle="${colId}" ${isVis ? "checked" : ""}>
                        <span>${colDef.label}</span>
                      </label>
                      <div class="suministros-col-arrows">
                        <button type="button" class="col-arrow-btn" data-col-move="up" data-col-id="${colId}" title="Mover hacia arriba" ${idx === 0 ? "disabled" : ""}>↑</button>
                        <button type="button" class="col-arrow-btn" data-col-move="down" data-col-id="${colId}" title="Mover hacia abajo" ${idx === suministrosColumnOrder.length - 1 ? "disabled" : ""}>↓</button>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          </div>

          <button type="button" class="admin-quiet-button" id="btnExportSuministrosExcel" title="Exportar suministros visibles a Excel (CSV)">
            ${icon("download", 13)}
            <span>Exportar Excel</span>
          </button>

          <span class="suministros-count-badge">
            <b>${activeSorted.length}</b> de ${activeRoleList.length} activos
          </span>
        </div>
      </div>

      ${mainContentHTML}
      ${closedContentHTML}
    `;
  }

    const OVERVIEW_FILTER_LABELS = {
    validados: "Entregables técnicos validados y conformes (18)",
    review: "Entregables en revisión por SOFEIN (5)",
    pending: "Entregables pendientes de carga por taller o cliente (8)",
    futuras: "Ranuras de fases futuras (12)",
    expedientes: "Expedientes ferroviarios (5)",
    incidencias: "Incidencias y mediaciones en curso (1)",
    proveedores: "Talleres y proveedores homologados (6)"
  };

  function getOverviewFilterHTML(filter) {
    let filterResultsHTML = "";
    if (filter === "review") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Documentación en Revisión por SOFEIN (5)</h2>
            <p>Entregables subidos que requieren verificación técnica y firma de conformidad.</p>
          </div>
        </div>
        <div class="admin-alert-list">
          <div class="admin-alert-row is-urgent">
            <span class="admin-deadline">En revisión</span>
            <strong>Certificado de ensayos mecánicos EN 13230</strong>
            <span>SFN-2026-H6T4</span>
            <span>IberRail Components</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Validar</button>
          </div>
          <div class="admin-alert-row is-urgent">
            <span class="admin-deadline">En revisión</span>
            <strong>Oferta económica vinculante Norte Vía (54E1)</strong>
            <span>SFN-2026-K9M2</span>
            <span>Norte Vía Industrial</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-K9M2">Validar</button>
          </div>
          <div class="admin-alert-row is-urgent">
            <span class="admin-deadline">En revisión</span>
            <strong>Acta de descarga y pesaje a pie de vía</strong>
            <span>SFN-2026-B3R8</span>
            <span>FGC Terrassa - Sabadell</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-B3R8">Validar</button>
          </div>
          <div class="admin-alert-row is-urgent">
            <span class="admin-deadline">En revisión</span>
            <strong>Póliza de suministro y hoja de pedido formalizada</strong>
            <span>SFN-2026-W4P7</span>
            <span>Madera Vía Ibérica</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-W4P7">Validar</button>
          </div>
          <div class="admin-alert-row is-urgent">
            <span class="admin-deadline">En revisión</span>
            <strong>Conformidad técnica de lote de traviesas</strong>
            <span>SFN-2026-H6T4</span>
            <span>Infraestructuras del Norte</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Validar</button>
          </div>
        </div>
      `;
    } else if (filter === "pending") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Entregables Pendientes de Entrega (8)</h2>
            <p>Ranuras documentales de fases activas con entrega requerida.</p>
          </div>
        </div>
        <div class="admin-alert-list">
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-warning)">Pendiente taller</span>
            <strong>Certificado de lote homologado (Fase 4)</strong>
            <span>SFN-2026-H6T4</span>
            <span>IberRail Components</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Requerir</button>
          </div>
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-warning)">Pendiente taller</span>
            <strong>Plan logístico y transporte ferroviario especial</strong>
            <span>SFN-2026-H6T4</span>
            <span>IberRail Components</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Requerir</button>
          </div>
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-warning)">Pendiente cliente</span>
            <strong>Selección de proveedor para cotización vinculante</strong>
            <span>SFN-2026-K9M2</span>
            <span>Metro de Bilbao</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-K9M2">Avisar</button>
          </div>
        </div>
      `;
    } else if (filter === "validados") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Documentos Técnicos Validados y Conformes (18)</h2>
            <p>Pliegos, planos y certificados con visto bueno y firma de trazabilidad SOFEIN.</p>
          </div>
        </div>
        <div class="admin-alert-list">
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-accent)">✓ Conforme</span>
            <strong>Especificación técnica y trazabilidad Adif 03.360.501</strong>
            <span>SFN-2026-K9M2</span>
            <span>SOFEIN Verificado</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-K9M2">Ver</button>
          </div>
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-accent)">✓ Conforme</span>
            <strong>Ensayo dinámico y fatiga EN 13481 (Sujeciones SKL-14)</strong>
            <span>SFN-2026-B3R8</span>
            <span>Laboratorio Homologado</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-B3R8">Ver</button>
          </div>
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-accent)">✓ Conforme</span>
            <strong>Ficha técnica de lote y análisis de material (PR-22)</strong>
            <span>SFN-2026-H6T4</span>
            <span>IberRail Components</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Ver</button>
          </div>
        </div>
      `;
    } else if (filter === "futuras") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Ranuras de Fases Futuras (12)</h2>
            <p>Requisitos de recepción en obra, liquidación y emisión de Pasaporte Digital SOFEIN.</p>
          </div>
        </div>
        <div class="admin-alert-list">
          <div class="admin-alert-row">
            <span class="admin-deadline">Fase 6: Recepción</span>
            <strong>Acta de Descarga a Pie de Vía (Medina del Campo)</strong>
            <span>SFN-2026-W4P7</span>
            <span>Programada</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-W4P7">Ver</button>
          </div>
          <div class="admin-alert-row">
            <span class="admin-deadline">Fase 7: Cierre</span>
            <strong>Pasaporte Digital SOFEIN (Factoría Volkswagen)</strong>
            <span>SFN-2026-H6T4</span>
            <span>Generación final</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Ver</button>
          </div>
        </div>
      `;
    } else if (filter === "expedientes") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Expedientes Ferroviarios Activos (4)</h2>
            <p>Lotes de superestructura y componentes bajo supervisión SOFEIN.</p>
          </div>
          <button class="admin-quiet-button" type="button" data-go="#admin/expedientes">Ver todos en bandeja ${icon("arrow", 14)}</button>
        </div>
        <div class="admin-alert-list">
          ${EXPEDIENTES.map(e => `
            <div class="admin-alert-row">
              <span class="admin-deadline" style="color:var(--entity-accent)">${e.id}</span>
              <strong>${e.producto}</strong>
              <span>${e.cliente}</span>
              <span>${e.plazoRealEstimado}</span>
              <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/${e.id}">Abrir</button>
            </div>
          `).join("")}
        </div>
      `;
    } else if (filter === "incidencias") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Incidencias en Mediación Activa (1)</h2>
            <p>Alteraciones de fabricación o plazos sometidas al procedimiento de mediación SOFEIN (Apuntes 06).</p>
          </div>
        </div>
        <div class="admin-alert-list">
          <div class="admin-alert-row is-critical">
            <span class="admin-deadline">Mediación</span>
            <strong>Propuesta de mediación (curado Lote B por ola de calor)</strong>
            <span>SFN-2026-H6T4</span>
            <span>Pendiente de firma del constructor</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Gestionar Mediación</button>
          </div>
        </div>
      `;
    } else if (filter === "proveedores") {
      filterResultsHTML = `
        <div class="admin-section-head">
          <div>
            <h2>Proveedores y Talleres Homologados</h2>
            <p>Talleres acreditados con índice de fiabilidad de entrega superior al 94%.</p>
          </div>
          <button class="admin-quiet-button" type="button" data-go="#admin/directorio">Ir al directorio ${icon("arrow", 14)}</button>
        </div>
        <div class="admin-alert-list">
          ${DIRECTORIO_PROVEEDORES.map(p => `
            <div class="admin-alert-row">
              <span class="admin-deadline" style="color:var(--entity-accent)">${p.id}</span>
              <strong>${p.nombre}</strong>
              <span>${p.sede}</span>
              <span>Score: ${p.score}</span>
              <button class="admin-quiet-button" type="button" data-go="#admin/directorio">Ficha</button>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      filterResultsHTML = `
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
            <span>SFN-2026-H6T4</span>
            <span>Pendiente firma constructor</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Revisar</button>
          </div>
          <div class="admin-alert-row is-urgent">
            <span class="admin-deadline">En revisión</span>
            <strong>Certificado de ensayos EN 13230</strong>
            <span>SFN-2026-H6T4</span>
            <span>IberRail Components</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-H6T4">Validar</button>
          </div>
          <div class="admin-alert-row">
            <span class="admin-deadline" style="color:var(--entity-accent)">En plazo</span>
            <strong>Preselección de 3 laminadores</strong>
            <span>SFN-2026-K9M2</span>
            <span>Metro Bilbao</span>
            <button class="admin-quiet-button" type="button" data-go="#admin/expedientes/SFN-2026-K9M2">Ver ofertas</button>
          </div>
        </div>
      `;
    }

    const isFiltered = !!filter;
    return `
      ${isFiltered ? `
        <div class="overview-filter-bar">
          <span>Filtrando vista por: <b>${OVERVIEW_FILTER_LABELS[filter] || filter}</b></span>
          <button class="admin-quiet-button" type="button" data-clear-overview-filter style="color:var(--entity-accent)">
            ${icon("x", 12)} Restablecer filtro (Ver alertas)
          </button>
        </div>
      ` : ""}
      <section class="admin-alerts">
        ${filterResultsHTML}
      </section>
    `;
  }

  /* ============================================================
     ADMINISTRACIÓN SOFEIN (Hub + Catálogos maestros)
     ============================================================ */
  const ADMIN_HUB_SECTIONS = ["administracion", "overview", "configuracion"];
  const ADMIN_HUB_LABELS = {
    administracion: "Administración",
    overview: "Visión global",
    productos: "Productos",
    conformidades: "Conformidades",
    configuracion: "Configuración"
  };

  let catalogEditing = null; // { kind: "productos" | "conformidades", id: string | "__new" }
  const catalogSearch = { productos: "", conformidades: "" };

  const CONFORMIDAD_TIPOS = ["Sistema de gestión", "Norma de producto", "Homologación Adif", "Marcado / Certificado", "Sostenibilidad", "Otra"];

  const CATALOG_DEFS = {
    productos: {
      title: "Productos",
      singular: "producto",
      idPrefix: "PRD",
      intro: "Catálogo base de suministros ferroviarios de SOFEIN. Alimenta el tipo de suministro al crear expedientes y las etiquetas de suministros acreditados de cada proveedor.",
      fields: [
        { key: "tipo", label: "Tipo de producto", type: "tags", single: true, createLabel: "Crear", placeholder: "Elige o crea un tipo", required: true, minWidth: "180px", tag: true,
          suggest: () => uniqueCatalogValues("productos", "tipo", PRODUCTO_TIPOS) },
        { key: "subtipo", label: "Subtipo", placeholder: "Ej: Hormigón", minWidth: "150px" },
        { key: "norma", label: "Norma/s de referencia", type: "tags", createLabel: "Añadir", placeholder: "Añadir norma", minWidth: "220px", tag: true,
          suggest: () => uniqueCatalogValues("productos", "norma") }
      ],
      usageLabel: "Proveedores",
      usage: item => {
        const key = (item.tipo || item.etiqueta || item.nombre || "").toLowerCase();
        if (!key) return 0;
        return DIRECTORIO_PROVEEDORES.filter(p => (p.suministros || []).some(s => s.toLowerCase() === key)).length;
      }
    },
    conformidades: {
      title: "Conformidades",
      singular: "conformidad",
      idPrefix: "CNF",
      intro: "Certificaciones, normas y homologaciones reconocidas por SOFEIN. Alimentan la selección de conformidades en la ficha de cada proveedor y el registro de certificados.",
      fields: [
        { key: "nombre", label: "Conformidad", placeholder: "Ej: ISO 50001", required: true, minWidth: "190px" },
        { key: "tipo", label: "Tipo", type: "tags", single: true, createLabel: "Crear", placeholder: "Elige o crea un tipo", minWidth: "170px", tag: true,
          suggest: () => uniqueCatalogValues("conformidades", "tipo", CONFORMIDAD_TIPOS) },
        { key: "emisor", label: "Entidad emisora", type: "tags", createLabel: "Añadir", placeholder: "Añadir entidad", minWidth: "180px", tag: true,
          suggest: () => uniqueCatalogValues("conformidades", "emisor") },
        { key: "ambito", label: "Ámbito / aplicación", type: "tags", createLabel: "Añadir", placeholder: "Añadir ámbito", minWidth: "200px", tag: true,
          suggest: () => uniqueCatalogValues("conformidades", "ambito", uniqueCatalogValues("productos", "tipo")) }
      ],
      usageLabel: "Proveedores",
      usage: item => DIRECTORIO_PROVEEDORES.filter(p => (p.conformidades || p.homologaciones || []).includes(item.nombre)).length
    }
  };

  function renderAdminHubTabs(active) {
    const tabs = [
      { id: "administracion", label: "Resumen", icon: "grid" },
      { id: "overview", label: "Visión global", icon: "activity" }
    ];
    return `
      <nav class="b2b-dir-type-tabs admin-hub-tabs" aria-label="Secciones de administración">
        ${tabs.map(t => `
          <button type="button" class="dir-type-btn ${active === t.id ? "is-active" : ""}" data-go="#admin/${t.id}">
            ${icon(t.icon, 13)} ${t.label}${t.count != null ? ` <span class="dir-count-pill">${t.count}</span>` : ""}
          </button>
        `).join("")}
      </nav>
    `;
  }

  function renderAdministracionHub() {
    const prodActivos = getActiveProductos().length;
    const confActivas = getActiveConformidades().length;
    const incidenciasAbiertas = EXPEDIENTES.reduce((acc, e) => acc + (e.incidencias || []).filter(i => !/resuelt|cerrad|consolidad/i.test(i.estado || "")).length, 0);
    const cards = [
      {
        go: "#admin/overview",
        icon: "activity",
        title: "Visión global",
        desc: "Métricas de expedientes, incidencias en mediación y estado de ranuras documentales.",
        meta: `<span><b>${EXPEDIENTES.length}</b> ${EXPEDIENTES.length === 1 ? "expediente" : "expedientes"}</span><span><b>${incidenciasAbiertas}</b> ${incidenciasAbiertas === 1 ? "incidencia abierta" : "incidencias abiertas"}</span>`,
        featured: true
      },
      {
        go: "#admin/productos",
        icon: "box",
        title: "Productos",
        desc: "Catálogo base de suministros que usan expedientes y proveedores.",
        meta: `<span><b>${prodActivos}</b> activos</span><span><b>${CATALOGOS.productos.length - prodActivos}</b> inactivos</span>`
      },
      {
        go: "#admin/conformidades",
        icon: "shield",
        title: "Conformidades",
        desc: "Normas, certificaciones y homologaciones seleccionables en la ficha de proveedor.",
        meta: `<span><b>${confActivas}</b> activas</span><span><b>${CATALOGOS.conformidades.length - confActivas}</b> inactivas</span>`
      },
      {
        go: "#admin/configuracion",
        icon: "cog",
        title: "Configuración",
        desc: "Apariencia y parámetros operativos de la plataforma.",
        meta: `<span>Parámetros operativos</span>`
      }
    ];

    return `
      <div class="admin-view-head">
        <div>
          <h1>Administración</h1>
          <p>Panel central de SOFEIN: métricas de la plataforma y catálogos maestros que alimentan expedientes, suministros y directorio.</p>
        </div>
      </div>
      ${renderAdminHubTabs("administracion")}
      <section class="admin-hub-grid">
        ${cards.map(c => `
          <button type="button" class="admin-hub-card ${c.featured ? "is-featured" : ""}" data-go="${c.go}">
            <span class="admin-hub-card-icon">${icon(c.icon, 18)}</span>
            <span class="admin-hub-card-body">
              <strong>${c.title}</strong>
              <span class="admin-hub-card-desc">${c.desc}</span>
              <span class="admin-hub-card-meta">${c.meta}</span>
            </span>
            <span class="admin-hub-card-arrow">${icon("arrow", 15)}</span>
          </button>
        `).join("")}
      </section>
    `;
  }

  // Valores de un campo de catálogo como lista (los antiguos podían ser texto «A / B»)
  const toCatalogList = v => (Array.isArray(v) ? v : String(v || "").split(/\s*\/\s*|\s*;\s*/)).map(x => String(x).trim()).filter(Boolean);

  // Valores ya usados en un campo del catálogo (+ base), sin repetir: alimentan el autocompletado
  function uniqueCatalogValues(kind, key, base = []) {
    const out = [];
    [...base, ...CATALOGOS[kind].flatMap(i => toCatalogList(i[key]))].forEach(v => {
      if (v && !out.some(o => o.toLowerCase() === v.toLowerCase())) out.push(v);
    });
    return out;
  }

  // Etiqueta con la paleta corporativa: el mismo valor siempre sale del mismo tono
  function renderCatalogTag(value) {
    const str = String(value);
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return `<span class="catalog-tag tone-${h % 6}">${escHTML(str)}</span>`;
  }
  const renderCatalogTags = v => toCatalogList(v).map(renderCatalogTag).join(" ");

  // Campo de etiquetas con autocompletado; si el valor no existe ofrece «(Crear)» / «(Añadir)»
  function renderTagInputHTML(field, values) {
    const list = toCatalogList(values);
    return `
      <div class="tag-input" data-tag-field="${field.key}" data-tag-single="${field.single ? "1" : "0"}" data-tag-create="${escHTML(field.createLabel || "Añadir")}" data-tag-suggest="${escHTML(JSON.stringify(field.suggest ? field.suggest() : []))}">
        <div class="tag-input-box">
          ${list.map(v => `<span class="tag-chip" data-tag-value="${escHTML(v)}">${escHTML(v)}<button type="button" data-tag-remove aria-label="Quitar ${escHTML(v)}">×</button></span>`).join("")}
          <input class="tag-input-text" type="text" placeholder="${escHTML(field.placeholder || "")}" aria-label="${escHTML(field.label)}" autocomplete="off" ${field.single && list.length ? 'style="display:none"' : ""} />
        </div>
        <div class="tag-input-suggest" hidden></div>
      </div>
    `;
  }

  const readTagInputValues = box => {
    const vals = Array.from(box.querySelectorAll(".tag-chip")).map(c => c.dataset.tagValue);
    const pending = box.querySelector(".tag-input-text")?.value.trim();
    if (pending && !vals.some(v => v.toLowerCase() === pending.toLowerCase())) vals.push(pending);
    return box.dataset.tagSingle === "1" ? vals.slice(-1) : vals;
  };

  function renderCatalogEditRow(kind, item) {
    const def = CATALOG_DEFS[kind];
    const rowId = item ? item.id : "__new";
    const cells = def.fields.map(f => {
      const val = item ? (item[f.key] ?? "") : (f.type === "select" ? f.options[0] : "");
      if (f.type === "tags") return `<td>${renderTagInputHTML(f, item ? item[f.key] : [])}</td>`;
      const control = f.type === "tags"
        ? renderTagInputHTML(f, item ? item[f.key] : [])
        : f.type === "select"
        ? `<select class="catalog-input" data-cat-field="${f.key}" aria-label="${f.label}">
             ${f.options.map(o => `<option value="${escHTML(o)}" ${o === val ? "selected" : ""}>${escHTML(o)}</option>`).join("")}
           </select>`
        : `<input class="catalog-input" data-cat-field="${f.key}" value="${escHTML(val)}" placeholder="${escHTML(f.placeholder || "")}" aria-label="${f.label}" ${f.required ? "required" : ""} autocomplete="off" />`;
      return `<td>${control}</td>`;
    }).join("");
    return `
      <tr class="catalog-row is-editing" data-cat-row="${rowId}" data-cat-kind="${kind}">
        ${cells}
        <td class="catalog-num">${item ? def.usage(item) : "—"}</td>
        <td>
          <label class="catalog-active-toggle">
            <input type="checkbox" data-cat-field="activo" ${!item || item.activo !== false ? "checked" : ""} /> Activo
          </label>
        </td>
        <td class="catalog-actions">
          <button type="button" class="admin-primary-button catalog-btn" data-cat-save="${rowId}" data-cat-kind="${kind}">${icon("check", 12)} Guardar</button>
          <button type="button" class="admin-quiet-button catalog-btn" data-cat-cancel>Cancelar</button>
        </td>
      </tr>
    `;
  }

  function renderCatalogView(kind) {
    const def = CATALOG_DEFS[kind];
    const list = CATALOGOS[kind];
    const q = (catalogSearch[kind] || "").toLowerCase().trim();
    const isEditing = id => catalogEditing && catalogEditing.kind === kind && catalogEditing.id === id;
    const searchText = item => def.fields.map(f => toCatalogList(item[f.key]).join(" ")).join(" ").toLowerCase();

    const rows = list.map(item => {
      if (isEditing(item.id)) return renderCatalogEditRow(kind, item);
      const hidden = q && !searchText(item).includes(q);
      const inactive = item.activo === false;
      return `
        <tr class="catalog-row ${inactive ? "is-inactive" : ""}" data-cat-row="${item.id}" data-cat-search="${escHTML(searchText(item))}" ${hidden ? "hidden" : ""}>
          ${def.fields.map((f, idx) => `<td>${!toCatalogList(item[f.key]).length ? `<span class="catalog-empty">-</span>`
            : f.tag ? `<div class="catalog-tags">${renderCatalogTags(item[f.key])}</div>`
            : idx === 0 ? `<strong>${escHTML(item[f.key])}</strong>` : escHTML(item[f.key])}</td>`).join("")}
          <td class="catalog-num">${def.usage(item)}</td>
          <td><span class="catalog-status ${inactive ? "is-off" : "is-on"}">${inactive ? "Inactivo" : "Activo"}</span></td>
          <td class="catalog-actions">
            <button type="button" class="admin-quiet-button catalog-btn" data-cat-edit="${item.id}" data-cat-kind="${kind}" title="Editar">${icon("edit", 12)} Editar</button>
            <button type="button" class="admin-quiet-button catalog-btn" data-cat-toggle="${item.id}" data-cat-kind="${kind}" title="${inactive ? "Activar" : "Desactivar"} en selectores">${icon(inactive ? "eye" : "eyeOff", 12)}</button>
            <button type="button" class="admin-quiet-button catalog-btn is-danger" data-cat-delete="${item.id}" data-cat-kind="${kind}" title="Eliminar del catálogo">${icon("x", 12)}</button>
          </td>
        </tr>
      `;
    }).join("");

    const newRow = isEditing("__new") ? renderCatalogEditRow(kind, null) : "";
    const activeCount = list.filter(i => i.activo !== false).length;

    return `
      <div class="admin-view-head">
        <div>
          <h1>${def.title}</h1>
          <p>${def.intro}</p>
        </div>
        <button class="admin-primary-button" type="button" data-cat-add="${kind}" ${isEditing("__new") ? "disabled" : ""}>
          ${icon("plus", 13)} Añadir ${def.singular}
        </button>
      </div>
      <div class="catalog-toolbar">
        <h3>
          ${def.title}
          <span class="dossier-chip" style="font-size:0.7rem">${activeCount} activos · ${list.length} en total</span>
        </h3>
        <div class="b2b-dir-search-wrap" style="max-width:260px;min-width:180px">
          <span class="dir-search-icon" style="left:10px">${icon("search", 14)}</span>
          <input type="search" class="b2b-dir-search-input" data-catalog-search="${kind}" placeholder="Buscar ${def.singular}..." value="${escHTML(catalogSearch[kind])}" autocomplete="off" style="height:32px;font-size:0.77rem;padding-left:32px" />
        </div>
      </div>

      <div class="b2b-dir-table-wrap">
        <table class="b2b-dir-table catalog-table">
          <thead>
            <tr>
              ${def.fields.map(f => `<th style="min-width:${f.minWidth || "100px"}">${f.label}</th>`).join("")}
              <th style="text-align:right">${def.usageLabel}</th>
              <th>Estado</th>
              <th style="text-align:right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${newRow}
            ${rows || ""}
            <tr class="catalog-empty-row" ${list.length && !(q && list.every(i => !searchText(i).includes(q))) ? "hidden" : ""}>
              <td colspan="${def.fields.length + 3}">No hay ${def.title.toLowerCase()} que coincidan.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="catalog-footnote">${icon("info", 13)} Los elementos inactivos dejan de ofrecerse en los selectores, pero se conservan en expedientes y fichas de proveedor existentes. Renombrar un elemento actualiza automáticamente las fichas de proveedor que lo usan.</p>
    `;
  }

  function saveCatalogRow(kind, rowId) {
    const def = CATALOG_DEFS[kind];
    const row = document.querySelector(`[data-cat-row="${rowId}"][data-cat-kind="${kind}"]`);
    if (!row) return;
    const values = {};
    row.querySelectorAll("[data-cat-field]").forEach(el => {
      values[el.dataset.catField] = el.type === "checkbox" ? el.checked : el.value.trim();
    });
    row.querySelectorAll(".tag-input[data-tag-field]").forEach(box => {
      const vals = readTagInputValues(box);
      values[box.dataset.tagField] = box.dataset.tagSingle === "1" ? (vals[0] || "") : vals;
    });
    const missing = def.fields.find(f => f.required && !toCatalogList(values[f.key]).length && f.key !== "nombre");
    if (missing) {
      showToast(`Indica ${missing.label.toLowerCase()}`);
      return;
    }
    if (kind === "productos") {
      values.nombre = values.subtipo ? `${values.tipo} · ${values.subtipo}` : values.tipo;
      values.etiqueta = values.tipo;
    }
    if (!values.nombre) {
      showToast(`Indica el nombre del ${def.singular}`);
      row.querySelector('[data-cat-field="nombre"]')?.focus();
      return;
    }
    const list = CATALOGOS[kind];
    const duplicate = list.find(i => i.id !== rowId && i.nombre.toLowerCase() === values.nombre.toLowerCase());
    if (duplicate) {
      showToast(`Ya existe "${duplicate.nombre}" en el catálogo`);
      return;
    }

    if (rowId === "__new") {
      const maxNum = list.reduce((m, i) => Math.max(m, parseInt(String(i.id).split("-")[1], 10) || 0), 0);
      const item = { id: `${def.idPrefix}-${String(maxNum + 1).padStart(2, "0")}`, ...values };
      list.unshift(item);
      showToast(`✓ ${def.singular.charAt(0).toUpperCase() + def.singular.slice(1)} "${item.nombre}" añadido al catálogo`);
    } else {
      const item = list.find(i => i.id === rowId);
      if (!item) return;
      syncCatalogRename(kind, item, values);
      Object.assign(item, values);
      showToast(`✓ "${item.nombre}" actualizado`);
    }
    saveCatalog(kind);
    catalogEditing = null;
    renderApp();
  }

  // Propaga renombrados del catálogo a las fichas de proveedor que ya usan el valor
  function syncCatalogRename(kind, item, values) {
    if (kind === "conformidades" && values.nombre !== item.nombre) {
      DIRECTORIO_PROVEEDORES.forEach(p => {
        ["conformidades", "homologaciones"].forEach(field => {
          if (Array.isArray(p[field])) p[field] = p[field].map(c => (c === item.nombre ? values.nombre : c));
        });
      });
    }
    if (kind === "productos" && item.etiqueta && values.etiqueta && values.etiqueta !== item.etiqueta) {
      DIRECTORIO_PROVEEDORES.forEach(p => {
        if (Array.isArray(p.suministros)) p.suministros = p.suministros.map(s => (s === item.etiqueta ? values.etiqueta : s));
      });
    }
  }

  function renderAdminView(section, param) {
    if (section === "administracion") {
      return renderAdministracionHub();
    }

    if (section === "productos" || section === "conformidades") {
      return renderCatalogView(section);
    }

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
        ${renderAdminHubTabs("overview")}

        <section class="admin-top-insight">
          <div class="admin-metrics">
            <div class="admin-metric ${overviewFilter === 'expedientes' ? 'is-active-filter' : ''}" data-overview-filter="expedientes">
              <span>Expedientes en curso</span>
              <strong>4</strong>
            </div>
            <div class="admin-metric warning ${overviewFilter === 'incidencias' ? 'is-active-filter' : ''}" data-overview-filter="incidencias">
              <span>Incidencias en mediación</span>
              <strong>1</strong>
            </div>
            <div class="admin-metric ${overviewFilter === 'validados' ? 'is-active-filter' : ''}" data-overview-filter="validados">
              <span>Entregables validados</span>
              <strong>18</strong>
            </div>
            <div class="admin-metric ${overviewFilter === 'proveedores' ? 'is-active-filter' : ''}" data-overview-filter="proveedores">
              <span>Proveedores homologados</span>
              <strong>6</strong>
            </div>
          </div>
          <div class="admin-histogram">
            <div class="admin-histogram-head">
              <h2>Estado de ranuras documentales</h2>
              <span>Haz clic en una barra para filtrar</span>
            </div>
            <div class="admin-histogram-bars">
              <article class="${overviewFilter === 'validados' ? 'is-active-filter' : ''}" data-overview-filter="validados" title="Filtrar por Validados">
                <strong>18</strong>
                <div><i style="--bar-height:75%"></i></div>
                <span>Validados</span>
              </article>
              <article class="review ${overviewFilter === 'review' ? 'is-active-filter' : ''}" data-overview-filter="review" title="Filtrar por En revisión">
                <strong>5</strong>
                <div><i style="--bar-height:30%"></i></div>
                <span>En revisión</span>
              </article>
              <article class="pending ${overviewFilter === 'pending' ? 'is-active-filter' : ''}" data-overview-filter="pending" title="Filtrar por Pendientes">
                <strong>8</strong>
                <div><i style="--bar-height:45%"></i></div>
                <span>Pendientes</span>
              </article>
              <article class="not-required ${overviewFilter === 'futuras' ? 'is-active-filter' : ''}" data-overview-filter="futuras" title="Filtrar por Fases futuras">
                <strong>12</strong>
                <div><i style="--bar-height:60%"></i></div>
                <span>Fases futuras</span>
              </article>
            </div>
          </div>
        </section>

        <div id="overviewDynamicContent">
          ${getOverviewFilterHTML(overviewFilter)}
        </div>
      `;
    }

    if (section === "selector") {
      return renderSelectorProveedoresView(param || "SFN-2026-K9M2");
    }

    if (section === "nuevo" || (section === "expedientes" && param === "nuevo")) {
      return renderCreateExpedienteView("admin");
    }

    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);
      return renderExpedientesBandejaVisual("admin", EXPEDIENTES);
    }

    if (section === "suministros") {
      return renderSuministrosSection("admin");
    }

    if (section === "avisos" || section === "inbox") {
      return renderAvisosSection("admin");
    }

    if (section === "directorio") {
      loadDirColPrefs();
      const q = (directorioSearchQuery || "").toLowerCase().trim();

      const prvActiveList = DIRECTORIO_PROVEEDORES.filter(p => {
        if (!q) return true;
        return (
          (p.nombre && p.nombre.toLowerCase().includes(q)) ||
          (p.cif && p.cif.toLowerCase().includes(q)) ||
          (p.sede && p.sede.toLowerCase().includes(q)) ||
          (p.suministros && p.suministros.some(s => s.toLowerCase().includes(q))) ||
          (p.conformidades && p.conformidades.some(c => c.toLowerCase().includes(q))) ||
          (p.email && p.email.toLowerCase().includes(q)) ||
          (p.contacto && p.contacto.toLowerCase().includes(q)) ||
          (p.telefono && p.telefono.toLowerCase().includes(q))
        );
      }).sort((a, b) => {
        let diff = 0;
        if (directorioPrvSortCol === "nombre") diff = (a.nombre || "").localeCompare(b.nombre || "", "es");
        else if (directorioPrvSortCol === "cif") diff = (a.cif || "").localeCompare(b.cif || "", "es");
        else if (directorioPrvSortCol === "sede") diff = (a.sede || "").localeCompare(b.sede || "", "es");
        else if (directorioPrvSortCol === "suministros") diff = (a.suministros || []).join(", ").localeCompare((b.suministros || []).join(", "), "es");
        else if (directorioPrvSortCol === "activos") diff = getProveedorActiveExpedientes(a.nombre).length - getProveedorActiveExpedientes(b.nombre).length;
        else if (directorioPrvSortCol === "conformidades") diff = (a.conformidades || []).join(", ").localeCompare((b.conformidades || []).join(", "), "es");
        else if (directorioPrvSortCol === "contacto" || directorioPrvSortCol === "email") diff = (a.email || a.contacto || "").localeCompare(b.email || b.contacto || "", "es");
        else if (directorioPrvSortCol === "telefono") diff = (a.telefono || "").localeCompare(b.telefono || "", "es");
        return directorioPrvSortDir === "asc" ? diff : -diff;
      });

      const cliActiveList = DIRECTORIO_CLIENTES.filter(c => {
        if (!q) return true;
        return (
          (c.nombre && c.nombre.toLowerCase().includes(q)) ||
          (c.cif && c.cif.toLowerCase().includes(q)) ||
          (c.sede && c.sede.toLowerCase().includes(q)) ||
          (c.actividad && c.actividad.toLowerCase().includes(q)) ||
          (c.email && c.email.toLowerCase().includes(q)) ||
          (c.contacto && c.contacto.toLowerCase().includes(q)) ||
          (c.telefono && c.telefono.toLowerCase().includes(q))
        );
      }).sort((a, b) => {
        let diff = 0;
        if (directorioCliSortCol === "nombre") diff = (a.nombre || "").localeCompare(b.nombre || "", "es");
        else if (directorioCliSortCol === "cif") diff = (a.cif || "").localeCompare(b.cif || "", "es");
        else if (directorioCliSortCol === "sede") diff = (a.sede || "").localeCompare(b.sede || "", "es");
        else if (directorioCliSortCol === "actividad") diff = (a.actividad || "").localeCompare(b.actividad || "", "es");
        else if (directorioCliSortCol === "activos") diff = getClienteActiveExpedientes(a.nombre).length - getClienteActiveExpedientes(b.nombre).length;
        else if (directorioCliSortCol === "contacto" || directorioCliSortCol === "email") diff = (a.email || a.contacto || "").localeCompare(b.email || b.contacto || "", "es");
        else if (directorioCliSortCol === "telefono") diff = (a.telefono || "").localeCompare(b.telefono || "", "es");
        return directorioCliSortDir === "asc" ? diff : -diff;
      });

      const showProveedores = directorioTypeFilter === "all" || directorioTypeFilter === "proveedores";
      const showClientes = directorioTypeFilter === "all" || directorioTypeFilter === "clientes";

      const visiblePrvCols = dirPrvColOrder.filter(c => !dirPrvHiddenCols.has(c));
      if (!visiblePrvCols.length) visiblePrvCols.push("nombre");

      const visibleCliCols = dirCliColOrder.filter(c => !dirCliHiddenCols.has(c));
      if (!visibleCliCols.length) visibleCliCols.push("nombre");

      const renderPrvCell = (p, colId, idx, total) => {
        switch (colId) {
          case "nombre":
            return `
              <td>
                <div style="display:flex;align-items:center;gap:8px;min-width:0">
                  <span class="admin-client-initials" style="width:26px;height:26px;min-width:26px;min-height:26px;max-width:26px;max-height:26px;flex:0 0 26px;flex-shrink:0;border-radius:50%;font-size:0.68rem;aspect-ratio:1">${p.nombre.slice(0, 2).toUpperCase()}</span>
                  <strong style="font-size:0.78rem">${p.nombre}</strong>
                </div>
              </td>
            `;
          case "cif":
            return `<td><span class="entity-code" style="font-size:0.75rem">${p.cif}</span></td>`;
          case "sede":
            return `<td><span style="color:var(--entity-muted);font-size:0.76rem">${p.sede}</span></td>`;
          case "suministros":
            return `<td>${renderSuministrosTags(p.suministros || [p.materiales])}</td>`;
          case "activos":
            return `<td>${renderProveedorActivosCell(p, idx, total)}</td>`;
          case "conformidades":
            return `<td>${renderConformidadesTags(p.conformidades || p.homologaciones)}</td>`;
          case "contacto":
            return `
              <td class="dir-cell-contact">
                <div style="display:flex;flex-direction:column;gap:3px;min-width:0">
                  ${renderEmailCell(p.email || p.contacto)}
                  ${p.telefono ? renderTelefonoCell(p.telefono) : ''}
                </div>
              </td>
            `;
          default:
            return `<td></td>`;
        }
      };

      const renderCliCell = (c, colId, idx, total) => {
        switch (colId) {
          case "nombre":
            return `
              <td>
                <div style="display:flex;align-items:center;gap:8px;min-width:0">
                  <span class="admin-client-initials" style="width:26px;height:26px;min-width:26px;min-height:26px;max-width:26px;max-height:26px;flex:0 0 26px;flex-shrink:0;border-radius:50%;font-size:0.68rem;aspect-ratio:1;background:#1d426b">${c.nombre.slice(0, 2).toUpperCase()}</span>
                  <strong style="font-size:0.78rem">${c.nombre}</strong>
                </div>
              </td>
            `;
          case "cif":
            return `<td><span class="entity-code" style="font-size:0.75rem">${c.cif}</span></td>`;
          case "sede":
            return `<td><span style="color:var(--entity-muted);font-size:0.76rem">${c.sede}</span></td>`;
          case "actividad":
            return `<td><span style="font-size:0.75rem;color:var(--entity-muted)">${c.actividad}</span></td>`;
          case "activos":
            return `<td>${renderClienteActivosCell(c, idx, total)}</td>`;
          case "contacto":
            return `
              <td class="dir-cell-contact">
                <div style="display:flex;flex-direction:column;gap:3px;min-width:0">
                  ${renderEmailCell(c.email || c.contacto)}
                  ${c.telefono ? renderTelefonoCell(c.telefono) : ''}
                </div>
              </td>
            `;
          default:
            return `<td></td>`;
        }
      };

      directorioExportSnapshot = {
        prvList: prvActiveList,
        cliList: cliActiveList,
        typeFilter: directorioTypeFilter,
        prvCols: visiblePrvCols,
        cliCols: visibleCliCols
      };

      let contentHTML = "";

      const currentTotalCount = (directorioTypeFilter === "proveedores") 
        ? prvActiveList.length 
        : (directorioTypeFilter === "clientes") 
          ? cliActiveList.length 
          : (prvActiveList.length + cliActiveList.length);

      const isOnlyCli = directorioTypeFilter === "clientes";
      const currentPopoverEntity = isOnlyCli ? "cliente" : (directorioTypeFilter === "proveedores" ? "proveedor" : (directorioPopoverEntity || "proveedor"));
      const isPopoverCli = currentPopoverEntity === "cliente";
      const activeColOrder = isPopoverCli ? dirCliColOrder : dirPrvColOrder;
      const activeHiddenCols = isPopoverCli ? dirCliHiddenCols : dirPrvHiddenCols;
      const activeColDefs = isPopoverCli ? ALL_DIR_CLI_COL_DEFS : ALL_DIR_PRV_COL_DEFS;
      const activeDefaultOrder = isPopoverCli ? DEFAULT_DIR_CLI_COL_ORDER : DEFAULT_DIR_PRV_COL_ORDER;
      const visibleColsCount = activeColOrder.filter(c => !activeHiddenCols.has(c)).length;

      const filterBarHTML = `
        <div class="b2b-dir-filter-bar" style="display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-left:auto;flex-wrap:wrap">
          <div class="b2b-dir-search-wrap" style="max-width:240px;min-width:160px">
            <span class="dir-search-icon" style="left:10px">${icon("search", 14)}</span>
            <input 
              type="search" 
              id="directorioSearchInput" 
              class="b2b-dir-search-input" 
              placeholder="Buscar..." 
              value="${directorioSearchQuery.replace(/"/g, '&quot;')}"
              autocomplete="off"
              style="height:32px;font-size:0.77rem;padding-left:32px"
            />
            ${directorioSearchQuery ? `
              <button type="button" id="clearDirectorioSearchBtn" class="dir-search-clear" title="Limpiar búsqueda">
                ${icon("x", 12)}
              </button>
            ` : ''}
          </div>

          <div class="b2b-dir-type-tabs">
            <button type="button" class="dir-type-btn ${directorioTypeFilter === 'all' ? 'is-active' : ''}" data-dir-type="all">
              Todos <span class="dir-count-pill">${DIRECTORIO_PROVEEDORES.length + DIRECTORIO_CLIENTES.length}</span>
            </button>
            <button type="button" class="dir-type-btn ${directorioTypeFilter === 'proveedores' ? 'is-active' : ''}" data-dir-type="proveedores">
              Proveedores <span class="dir-count-pill">${DIRECTORIO_PROVEEDORES.length}</span>
            </button>
            <button type="button" class="dir-type-btn ${directorioTypeFilter === 'clientes' ? 'is-active' : ''}" data-dir-type="clientes">
              Clientes <span class="dir-count-pill">${DIRECTORIO_CLIENTES.length}</span>
            </button>
          </div>

          <!-- Gestor de Columnas de Directorio -->
          <div class="suministros-cols-wrap" id="directorioColsWrap" style="position:relative">
            <button type="button" class="suministros-cols-btn ${(dirPrvHiddenCols.size > 0 || dirCliHiddenCols.size > 0) ? 'is-active' : ''}" id="btnToggleDirColsMenu" aria-expanded="${isDirColsMenuOpen}" style="height:32px;padding:0 10px;font-size:0.75rem">
              ${icon("columns", 13)}
              <span>Columnas</span>
              <span class="suministros-cols-count">(${visibleColsCount}/${activeDefaultOrder.length})</span>
              ${icon("chevronDown", 11)}
            </button>
            <div class="suministros-cols-popover" id="directorioColsPopover" ${isDirColsMenuOpen ? '' : 'hidden'} style="top:calc(100% + 8px);right:0;width:290px;z-index:150">
              <div class="suministros-cols-popover-head">
                <div>
                  <strong>Personalizar columnas</strong>
                  <p>Arrastra cabeceras o usa flechas para ordenar; desmarca para ocultar.</p>
                  ${directorioTypeFilter === "all" ? `
                    <div style="display:flex;gap:4px;margin-top:6px">
                      <button type="button" class="view-mode-btn ${!isPopoverCli ? 'is-active' : ''}" data-dir-pop-entity="proveedor" style="padding:2px 8px;font-size:0.7rem">Proveedores</button>
                      <button type="button" class="view-mode-btn ${isPopoverCli ? 'is-active' : ''}" data-dir-pop-entity="cliente" style="padding:2px 8px;font-size:0.7rem">Clientes</button>
                    </div>
                  ` : ''}
                </div>
                <button type="button" class="admin-quiet-button" id="btnResetDirColsConfig" title="Restablecer visibilidad y orden por defecto" style="font-size:0.72rem;color:var(--entity-accent)">
                  Restablecer
                </button>
              </div>
              <div class="suministros-cols-list">
                ${activeColOrder.map((colId, idx) => {
                  const colDef = activeColDefs[colId] || { label: colId };
                  const isVis = !activeHiddenCols.has(colId);
                  return `
                    <div class="suministros-col-row" data-popover-dir-col="${colId}">
                      <label class="suministros-col-check-label">
                        <input type="checkbox" data-dir-col-toggle="${colId}" data-popover-entity="${isPopoverCli ? 'cliente' : 'proveedor'}" ${isVis ? "checked" : ""}>
                        <span>${colDef.label}</span>
                      </label>
                      <div class="suministros-col-arrows">
                        <button type="button" class="col-arrow-btn" data-dir-col-move="up" data-col-id="${colId}" data-popover-entity="${isPopoverCli ? 'cliente' : 'proveedor'}" title="Mover hacia arriba" ${idx === 0 ? "disabled" : ""}>↑</button>
                        <button type="button" class="col-arrow-btn" data-dir-col-move="down" data-col-id="${colId}" data-popover-entity="${isPopoverCli ? 'cliente' : 'proveedor'}" title="Mover hacia abajo" ${idx === activeColOrder.length - 1 ? "disabled" : ""}>↓</button>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          </div>

          <!-- Botón Exportar a Excel -->
          <button type="button" class="admin-quiet-button" id="btnExportDirectorioExcel" title="Exportar listado visible a Excel (CSV)" style="height:32px;padding:0 10px;font-size:0.75rem;display:inline-flex;align-items:center;gap:6px">
            ${icon("download", 13)}
            <span>Exportar Excel</span>
          </button>
        </div>
      `;

      if (directorioViewMode === "table") {
        const prvTableHTML = showProveedores ? `
          <div style="margin-bottom:28px">
            <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4px;gap:12px;flex-wrap:wrap">
              <h3 style="margin:0;font-size:0.92rem;color:var(--entity-text);display:flex;align-items:center;gap:8px">
                Proveedores
                <span class="dossier-chip" style="font-size:0.7rem">${prvActiveList.length} ${prvActiveList.length === 1 ? 'proveedor' : 'proveedores'}</span>
              </h3>
              ${filterBarHTML}
            </div>
            <div class="b2b-dir-table-wrap">
              <table class="b2b-dir-table">
                <thead>
                  <tr>
                    ${visiblePrvCols.map(colId => {
                      const colDef = ALL_DIR_PRV_COL_DEFS[colId] || { label: colId };
                      const isSorted = directorioPrvSortCol === colId;
                      const isConf = colId === "conformidades";
                      return `
                        <th class="is-sortable ${isSorted ? 'is-sorted' : ''}"
                            data-sort-dir-prv="${colId}"
                            data-dir-col-id="${colId}"
                            data-dir-entity="proveedor"
                            draggable="true"
                            title="${isConf ? 'Verde: Normas y homologaciones · Ámbar: Tratamientos · Gris: Otras certificaciones · Clic para ordenar' : 'Clic para ordenar · Arrastra para reordenar columna'}"
                            style="min-width:${colDef.minWidth || '85px'}">
                          <div class="th-sort-wrap" style="display:flex;align-items:center;justify-content:space-between;gap:4px">
                            <div style="display:flex;align-items:center;gap:4px;min-width:0">
                              <span class="dir-th-drag-grip" title="Arrastrar para mover">⠿</span>
                              <span>${colDef.label}</span>
                              ${isConf ? `
                                <span class="dir-conf-legend-trigger" title="Ver leyenda de colores de conformidades">
                                  ${icon("info", 12)}
                                  <span class="dir-conf-legend-popover">
                                    <strong style="display:block;margin-bottom:6px;font-size:0.75rem;color:var(--entity-text)">Leyenda de Conformidades</strong>
                                    <span class="dir-conf-legend-row">
                                      <span class="dir-tag dir-tag-iso" style="font-size:0.68rem;padding:2px 6px">Verde</span>
                                      <span style="font-size:0.72rem;color:var(--entity-muted)">Normas y homologaciones oficiales (ISO, CE, AENOR, Adif, UNE-EN)</span>
                                    </span>
                                    <span class="dir-conf-legend-row" style="margin-top:6px">
                                      <span class="dir-tag dir-tag-treatment" style="font-size:0.68rem;padding:2px 6px">Ámbar</span>
                                      <span style="font-size:0.72rem;color:var(--entity-muted)">Tratamientos químicos y conservación (creosota, autoclave)</span>
                                    </span>
                                    <span class="dir-conf-legend-row" style="margin-top:6px">
                                      <span class="dir-tag" style="font-size:0.68rem;padding:2px 6px">Gris</span>
                                      <span style="font-size:0.72rem;color:var(--entity-muted)">Otras certificaciones y sostenibilidad (FSC, PEFC)</span>
                                    </span>
                                  </span>
                                </span>
                              ` : ''}
                              ${getDirectorioSortIcon(colId, directorioPrvSortCol, directorioPrvSortDir)}
                            </div>
                            <button type="button" class="dir-th-hide-btn" data-hide-dir-col="${colId}" data-dir-entity="proveedor" title="Ocultar columna «${colDef.label}»" aria-label="Ocultar columna «${colDef.label}»">
                              ${icon("eyeOff", 12)}
                            </button>
                          </div>
                        </th>
                      `;
                    }).join("")}
                    <th style="text-align:right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${prvActiveList.length === 0 ? `
                    <tr>
                      <td colspan="${visiblePrvCols.length + 1}" style="text-align:center;padding:32px;color:var(--entity-muted)">
                        No se encontraron proveedores que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ` : prvActiveList.map((p, idx) => `
                    <tr>
                      ${visiblePrvCols.map(colId => renderPrvCell(p, colId, idx, prvActiveList.length)).join("")}
                      <td style="text-align:right">
                        <button class="admin-quiet-button" type="button" data-edit-dir="proveedor" data-id="${p.id}">
                          ${icon("edit", 13)} Editar
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : "";

        const cliTableHTML = showClientes ? `
          <div ${showProveedores ? 'style="margin-top:24px"' : ''}>
            <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4px;gap:12px;flex-wrap:wrap">
              <h3 style="margin:0;font-size:0.92rem;color:var(--entity-text);display:flex;align-items:center;gap:8px">
                Clientes
                <span class="dossier-chip" style="font-size:0.7rem">${cliActiveList.length} ${cliActiveList.length === 1 ? 'cliente' : 'clientes'}</span>
              </h3>
              ${!showProveedores ? filterBarHTML : ''}
            </div>
            <div class="b2b-dir-table-wrap">
              <table class="b2b-dir-table">
                <thead>
                  <tr>
                    ${visibleCliCols.map(colId => {
                      const colDef = ALL_DIR_CLI_COL_DEFS[colId] || { label: colId };
                      const isSorted = directorioCliSortCol === colId;
                      return `
                        <th class="is-sortable ${isSorted ? 'is-sorted' : ''}"
                            data-sort-dir-cli="${colId}"
                            data-dir-col-id="${colId}"
                            data-dir-entity="cliente"
                            draggable="true"
                            title="Clic para ordenar · Arrastra para reordenar columna"
                            style="min-width:${colDef.minWidth || '85px'}">
                          <div class="th-sort-wrap" style="display:flex;align-items:center;justify-content:space-between;gap:4px">
                            <div style="display:flex;align-items:center;gap:4px;min-width:0">
                              <span class="dir-th-drag-grip" title="Arrastrar para mover">⠿</span>
                              <span>${colDef.label}</span>
                              ${getDirectorioSortIcon(colId, directorioCliSortCol, directorioCliSortDir)}
                            </div>
                            <button type="button" class="dir-th-hide-btn" data-hide-dir-col="${colId}" data-dir-entity="cliente" title="Ocultar columna «${colDef.label}»" aria-label="Ocultar columna «${colDef.label}»">
                              ${icon("eyeOff", 12)}
                            </button>
                          </div>
                        </th>
                      `;
                    }).join("")}
                    <th style="text-align:right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${cliActiveList.length === 0 ? `
                    <tr>
                      <td colspan="${visibleCliCols.length + 1}" style="text-align:center;padding:32px;color:var(--entity-muted)">
                        No se encontraron clientes que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ` : cliActiveList.map((c, idx) => `
                    <tr>
                      ${visibleCliCols.map(colId => renderCliCell(c, colId, idx, cliActiveList.length)).join("")}
                      <td style="text-align:right">
                        <button class="admin-quiet-button" type="button" data-edit-dir="cliente" data-id="${c.id}">
                          ${icon("edit", 13)} Editar
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : "";

        contentHTML = prvTableHTML + cliTableHTML;
      } else {
        // Modo Mosaico
        const prvCards = prvActiveList.map((p, idx) => `
          <article class="admin-client-card">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span class="admin-client-initials">${p.nombre.slice(0, 2).toUpperCase()}</span>
              <span class="admin-verified">${icon("shield", 14)} Homologado</span>
            </div>
            <h2 style="margin:16px 0 4px">${p.nombre}</h2>
            <div style="display:flex;gap:8px;font-size:0.75rem;color:var(--entity-muted);margin-bottom:12px">
              <span><b>CIF:</b> ${p.cif}</span>
              <span>·</span>
              <span><b>Sede:</b> ${p.sede}</span>
            </div>
            <dl>
              <div>
                <dt>Suministros</dt>
                <dd>${renderSuministrosTags(p.suministros || [p.materiales])}</dd>
              </div>
              <div>
                <dt>Suministros activos</dt>
                <dd>${renderProveedorActivosCell(p, idx, prvActiveList.length)}</dd>
              </div>
              <div>
                <dt>Conformidades</dt>
                <dd>${renderConformidadesTags(p.conformidades || p.homologaciones)}</dd>
              </div>
            </dl>
            <footer style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--entity-line)">
              <div style="display:flex;flex-direction:column;gap:3px;font-size:0.75rem">
                ${renderEmailCell(p.email || p.contacto)}
                ${p.telefono ? renderTelefonoCell(p.telefono) : ''}
              </div>
              <button class="admin-quiet-button" type="button" data-edit-dir="proveedor" data-id="${p.id}">
                ${icon("edit", 13)} Editar
              </button>
            </footer>
          </article>
        `).join("");

        const cliCards = cliActiveList.map((c, idx) => `
          <article class="admin-client-card">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span class="admin-client-initials" style="background:#1d426b">${c.nombre.slice(0, 2).toUpperCase()}</span>
              <span class="admin-verified" style="color:#60a5fa">${icon("shield", 14)} Contratista Activo</span>
            </div>
            <h2 style="margin:16px 0 4px">${c.nombre}</h2>
            <div style="display:flex;gap:8px;font-size:0.75rem;color:var(--entity-muted);margin-bottom:12px">
              <span><b>CIF:</b> ${c.cif}</span>
              <span>·</span>
              <span><b>Sede:</b> ${c.sede}</span>
            </div>
            <dl>
              <div>
                <dt>Actividad</dt>
                <dd style="font-size:0.74rem;color:var(--entity-muted)">${c.actividad}</dd>
              </div>
              <div>
                <dt>Expedientes en curso</dt>
                <dd>${renderClienteActivosCell(c, idx, cliActiveList.length)}</dd>
              </div>
            </dl>
            <footer style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--entity-line)">
              <div style="display:flex;flex-direction:column;gap:3px;font-size:0.75rem">
                ${renderEmailCell(c.email || c.contacto)}
                ${c.telefono ? renderTelefonoCell(c.telefono) : ''}
              </div>
              <button class="admin-quiet-button" type="button" data-edit-dir="cliente" data-id="${c.id}">
                ${icon("edit", 13)} Editar
              </button>
            </footer>
          </article>
        `).join("");

        contentHTML = `
          <div style="display:flex;align-items:flex-end;justify-content:${directorioTypeFilter === 'all' ? 'flex-end' : 'space-between'};margin-bottom:10px;gap:12px;flex-wrap:wrap">
            ${directorioTypeFilter !== 'all' ? `
              <h3 style="margin:0;font-size:0.92rem;color:var(--entity-text);display:flex;align-items:center;gap:8px">
                ${directorioTypeFilter === 'clientes' ? 'Clientes' : 'Proveedores'}
                <span class="dossier-chip" style="font-size:0.7rem">${currentTotalCount}</span>
              </h3>
            ` : ''}
            ${filterBarHTML}
          </div>

          ${showProveedores ? `
            <div style="margin-bottom:28px">
              ${directorioTypeFilter === 'all' ? `
                <h4 style="margin:0 0 10px;font-size:0.86rem;color:var(--entity-muted);font-weight:600">Proveedores (${prvActiveList.length})</h4>
              ` : ''}
              <div class="admin-client-grid">${prvCards || '<p style="color:var(--entity-muted);font-size:0.8rem">No hay proveedores que coincidan.</p>'}</div>
            </div>
          ` : ''}

          ${showClientes ? `
            <div>
              ${directorioTypeFilter === 'all' ? `
                <h4 style="margin:0 0 10px;font-size:0.86rem;color:var(--entity-muted);font-weight:600">Clientes (${cliActiveList.length})</h4>
              ` : ''}
              <div class="admin-client-grid" style="grid-template-columns:repeat(2,1fr)">${cliCards || '<p style="color:var(--entity-muted);font-size:0.8rem">No hay clientes que coincidan.</p>'}</div>
            </div>
          ` : ''}
        `;
      }

      return `
        <!-- Fila superior: Título 'Clientes y Proveedores' y acciones principales -->
        <div class="admin-view-head" style="margin-bottom:22px">
          <div class="b2b-dir-header-title">
            <h1 style="margin:0;font-size:1.75rem;font-weight:600;display:flex;align-items:center;gap:10px;letter-spacing:-0.03em">
              Clientes y Proveedores
              <span class="dir-count-pill" style="font-size:0.8rem;height:24px;padding:0 8px;border-radius:12px;background:var(--entity-panel-2);border:1px solid var(--entity-line);color:var(--entity-text);font-weight:600">
                ${currentTotalCount}
              </span>
            </h1>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="view-mode-toggle" style="height:34px">
              <button class="view-mode-btn ${directorioViewMode === 'table' ? 'is-active' : ''}" type="button" data-dir-mode="table" style="padding:0 9px;font-size:0.75rem">
                ${icon("table", 13)} Tabla
              </button>
              <button class="view-mode-btn ${directorioViewMode === 'grid' ? 'is-active' : ''}" type="button" data-dir-mode="grid" style="padding:0 9px;font-size:0.75rem">
                ${icon("grid", 13)} Mosaico
              </button>
            </div>
            <button class="admin-primary-button" type="button" data-open-add-dir-modal style="height:34px;padding:0 14px;font-size:0.76rem">
              ${icon("plus", 13)} Añadir
            </button>
          </div>
        </div>

        ${contentHTML}
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

      `;
    }

    // Default
    return renderDossierBuilder("SFN-2026-H6T4");
  }

  /* ============================================================
     VISTAS: CLIENTE (CONSTRUCTOR DE VÍA)
     ============================================================ */
  function renderClienteView(section, param) {
    if (section === "selector") {
      return renderSelectorProveedoresView(param || "SFN-2026-K9M2");
    }

    if (section === "nuevo" || (section === "expedientes" && param === "nuevo")) {
      return renderCreateExpedienteView("cliente");
    }

    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);
      return renderExpedientesBandejaVisual("cliente", getExpedientesForRole("cliente"));
    }
    if (section === "suministros") {
      return renderSuministrosSection("cliente");
    }

    if (section === "avisos" || section === "inbox") {
      return renderAvisosSection("cliente");
    }

    if (section === "perfil") {
      return renderProfileView("cliente");
    }

    // Default
    return renderDossierBuilder("SFN-2026-H6T4");
  }

  /* ============================================================
     VISTAS: PROVEEDOR HOMOLOGADO
     ============================================================ */
  function renderProveedorView(section, param) {
    if (section === "selector") {
      return renderSelectorProveedoresView(param || "SFN-2026-K9M2");
    }

    if (section === "expedientes") {
      if (param) return renderDossierBuilder(param);

      return renderExpedientesBandejaVisual("proveedor", getExpedientesForRole("proveedor"));
    }

    if (section === "cotizaciones") {
      return renderProveedorCotizacionesView();
    }
    if (section === "suministros") {
      return renderSuministrosSection("proveedor");
    }

    if (section === "avisos" || section === "inbox") {
      return renderAvisosSection("proveedor");
    }

    if (section === "perfil") {
      return renderProfileView("proveedor");
    }

    // Default
    return renderDossierBuilder("SFN-2026-H6T4");
  }

  /* ============================================================
     VISTA DE PERFIL B2B: CLIENTE Y PROVEEDOR HOMOLOGADO (v28)
     ============================================================ */
  function renderProfileView(role) {
    if (role === "proveedor") {
      const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === "PRV-01") || DIRECTORIO_PROVEEDORES[0];
      const prvSums = SUMINISTROS.filter(s => s.proveedor && s.proveedor.toLowerCase().includes("iberrail"));
      const activeSums = prvSums.filter(s => s.estado !== "cerrado" && s.faseActual < 3);
      const completedSums = prvSums.filter(s => s.estado === "cerrado" || s.faseActual >= 3);
      const prvExps = EXPEDIENTES.filter(e =>
        (e.proveedor && e.proveedor.toLowerCase().includes("iberrail")) ||
        e.id === "SFN-2026-K9M2" ||
        e.id === "SFN-2026-W4P7"
      );

      const certs = prv.certificadosDetalle || [
        { nombre: "ISO 9001", norma: "ISO 9001:2015", entidad: "AENOR Internacional", vigencia: "20 oct 2027", estado: "Vigente", archivo: "Certificado-ISO9001-IberRail.pdf", hash: "2d95c6b1a403e874" },
        { nombre: "ISO 14001", norma: "ISO 14001:2015", entidad: "AENOR Internacional", vigencia: "20 oct 2027", estado: "Vigente", archivo: "Certificado-ISO14001-IberRail.pdf", hash: "5b17c0e2d93a4f68" },
        { nombre: "AENOR EN 13230", norma: "UNE-EN 13230-1 / 13230-2", entidad: "AENOR / Laboratorio ENAC", vigencia: "15 nov 2027", estado: "Vigente", archivo: "Certificado-AENOR-EN13230-PR22.pdf", hash: "4a18d7e3b920f651" },
        { nombre: "Adif NAV-2026", norma: "ET Adif 03.360.571", entidad: "Adif · Dirección Técnica", vigencia: "31 dic 2028", estado: "Vigente", archivo: "Homologacion-Adif-NAV-2026-IberRail.pdf", hash: "9f84b2c0e71a4d39" }
      ];
      prv.certificadosDetalle = certs;
      const acuerdoMarco = prv.acuerdoMarco || {
        estado: "Firmado",
        vigencia: "Renovación anual automática",
        archivo: "Acuerdo-Marco-Proveedor-SOFEIN-2026.pdf",
        hash: "6e02f4d8c197a360"
      };
      prv.acuerdoMarco = acuerdoMarco;
      const confRows = [...new Set([...(prv.conformidades || prv.homologaciones || []), ...certs.map(c => c.nombre)])]
        .map(conf => ({ conf, cert: certs.find(c => c.nombre === conf) || null }));

      const requisitos = prv.requisitosQueCumple && prv.requisitosQueCumple.length
        ? prv.requisitosQueCumple
        : [
            "Trazabilidad lote a lote con código QR indeleble",
            "Ensayos de rotura dinámica en laboratorio acreditado ENAC",
            "Transporte y descarga a pie de vía con camión grúa o tren",
            "Garantía anticorrosión y estructural de 10 años"
          ];

      const initials = (prv.nombre || "IR").slice(0, 2).toUpperCase();

      return `
        <div class="admin-view-head" style="margin-bottom:14px">
          <div>
            <h1 style="margin:0;font-size:1.65rem;font-weight:600;letter-spacing:-0.03em">Perfil de proveedor</h1>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <button class="admin-quiet-button" type="button" data-open-upload-profile-cert="proveedor">
              ${icon("upload", 13)} Subir certificado
            </button>
            <button class="admin-primary-button" type="button" data-edit-dir="proveedor" data-id="${prv.id}">
              ${icon("edit", 13)} Editar datos del perfil
            </button>
          </div>
        </div>

        <!-- Mini resumen en línea -->
        <div class="exp-bandeja-summary-strip" style="margin-bottom:14px">
          <span><strong>${prvSums.length}</strong> suministros asignados</span>
          <span class="exp-strip-dot">·</span>
          <span><strong>${activeSums.length}</strong> en ejecución activa</span>
          <span class="exp-strip-dot">·</span>
          <span><strong>${completedSums.length}</strong> completados</span>
          <span class="exp-strip-dot">·</span>
          <span><strong>${confRows.length}</strong> conformidades</span>
        </div>

        <!-- Parte superior: tarjetas KPI -->
        <div class="exp-kpi-filter-grid" style="margin-bottom:18px;grid-template-columns:repeat(2,minmax(0,1fr))">
          <div class="exp-kpi-filter-card" style="cursor:default">
            <div class="exp-kpi-filter-top">
              <span class="exp-kpi-label">Suministros activos</span>
              <span class="exp-kpi-dot is-active"></span>
            </div>
            <strong class="exp-kpi-value">${activeSums.length}</strong>
            <small class="exp-kpi-sub">De ${prvSums.length} suministros adjudicados</small>
          </div>
          <div class="exp-kpi-filter-card" style="cursor:default">
            <div class="exp-kpi-filter-top">
              <span class="exp-kpi-label">Expedientes vinculados</span>
              <span class="exp-kpi-dot" style="background:#60a5fa"></span>
            </div>
            <strong class="exp-kpi-value">${prvExps.length}</strong>
            <small class="exp-kpi-sub">En ejecución o fase de oferta</small>
          </div>
        </div>

        <!-- Bloque Flotante 1: Ficha Corporativa e Industrial (Colapsable) -->
        <details class="b2b-profile-card is-collapsible" data-profile-collapse="prvFicha" ${profileCollapseState.prvFicha ? "open" : ""}>
          <summary class="b2b-profile-header is-collapsible-summary">
            <div style="display:flex;align-items:center;gap:14px;min-width:0">
              <span class="admin-client-initials" style="width:48px;height:48px;font-size:1.1rem;background:#523d1d;flex-shrink:0">${initials}</span>
              <div style="min-width:0">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="entity-code" style="font-size:0.72rem">${prv.id}</span>
                  <h2 style="margin:0;font-size:1.22rem;font-weight:700;color:var(--entity-text)">${prv.nombre}</h2>
                  <span class="dossier-chip is-active-chip" style="color:var(--entity-accent);border-color:rgba(16,185,129,0.3)">
                    ${icon("shield", 12)} Proveedor Homologado SOFEIN
                  </span>
                </div>
                <p style="margin:4px 0 0;font-size:0.78rem;color:var(--entity-muted)">
                  ${prv.materiales || "Fabricante homologado de superestructura y armamento de vía ferroviaria"}
                </p>
              </div>
            </div>
            <div class="b2b-profile-summary-actions">
              <button class="admin-quiet-button" type="button" data-edit-dir="proveedor" data-id="${prv.id}">
                ${icon("edit", 13)} Editar ficha
              </button>
              <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
            </div>
          </summary>

          <div class="b2b-profile-card-body">
            <div class="b2b-profile-meta-grid">
              <div class="b2b-profile-meta-item">
                <span class="b2b-profile-meta-label">CIF / NIF</span>
                <strong class="b2b-profile-meta-val">${prv.cif}</strong>
              </div>
              <div class="b2b-profile-meta-item">
                <span class="b2b-profile-meta-label">Planta Principal y Sede</span>
                <strong class="b2b-profile-meta-val">${prv.sede}</strong>
              </div>
              <div class="b2b-profile-meta-item">
                <span class="b2b-profile-meta-label">Contacto Comercial / Técnico</span>
                <strong class="b2b-profile-meta-val">${renderEmailCell(prv.email || prv.contacto)}</strong>
              </div>
              <div class="b2b-profile-meta-item">
                <span class="b2b-profile-meta-label">Teléfono Directo</span>
                <strong class="b2b-profile-meta-val">${prv.telefono ? renderTelefonoCell(prv.telefono) : "—"}</strong>
              </div>
              <div class="b2b-profile-meta-item">
                <span class="b2b-profile-meta-label">Condiciones de Pago Marco</span>
                <strong class="b2b-profile-meta-val">${prv.condicionesPago || "60 días confirmada"}</strong>
              </div>
            </div>
            <div class="b2b-profile-cert-row" style="margin-top:14px">
              <div style="min-width:0;flex:1">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                  <strong style="font-size:0.8rem;color:var(--entity-text)">${icon("file", 13)} Acuerdo marco con SOFEIN</strong>
                  <span class="b2b-cert-badge is-valid">${acuerdoMarco.estado}</span>
                </div>
                <div style="font-size:0.72rem;color:var(--entity-muted);margin-top:2px">${acuerdoMarco.archivo} · ${acuerdoMarco.vigencia}</div>
              </div>
              <button class="admin-quiet-button" type="button"
                data-inspect-cert="${acuerdoMarco.hash}"
                data-cert-name="Acuerdo marco de proveedor SOFEIN"
                data-cert-file="${acuerdoMarco.archivo}"
                data-cert-lab="SOFEIN Procurement"
                data-cert-norm="Acuerdo marco proveedor - SOFEIN"
                data-cert-res="${acuerdoMarco.estado} (${acuerdoMarco.vigencia})"
                style="padding:4px 9px;font-size:0.72rem">
                ${icon("file", 12)} Ver
              </button>
            </div>
          </div>
        </details>

        <!-- Bloque Flotante 2: Dos columnas asimétricas independientes (1fr | 1.15fr), cada una colapsable -->
        <div class="b2b-profile-two-col">
          <!-- Columna Izquierda: Catálogo Homologado y Capacidad Técnica -->
          <details class="b2b-profile-card is-collapsible" style="margin-bottom:0" data-profile-collapse="prvCatalog" ${profileCollapseState.prvCatalog ? "open" : ""}>
            <summary class="b2b-profile-section-head is-collapsible-summary">
              <div>
                <h3>${icon("box", 15)} Suministros ofrecidos</h3>
              </div>
              <div class="b2b-profile-summary-actions">
                <button class="admin-quiet-button" type="button" data-edit-dir="proveedor" data-id="${prv.id}">
                  ${icon("edit", 12)} Editar
                </button>
                <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
              </div>
            </summary>
            <div class="b2b-profile-card-body">
              ${(prv.suministros || []).length ? `
                <div class="selector-homologations">
                  ${prv.suministros.map(t => `<span class="selector-homologation-chip">${icon(getSuministroTypeIcon(t), 12)} ${escHTML(t.charAt(0).toUpperCase() + t.slice(1))}</span>`).join("")}
                </div>
              ` : `<p class="reg-empty">Sin suministros registrados.</p>`}
            </div>
          </details>

          <!-- Columna Derecha: Homologaciones, Certificados y Acuerdo Marco -->
          <details class="b2b-profile-card is-collapsible" style="margin-bottom:0" data-profile-collapse="prvCerts" ${profileCollapseState.prvCerts ? "open" : ""}>
            <summary class="b2b-profile-section-head is-collapsible-summary">
              <div>
                <h3>${icon("shield", 15)} Conformidades</h3>
              </div>
              <div class="b2b-profile-summary-actions">
                <button class="admin-quiet-button" type="button" data-open-upload-profile-cert="proveedor">
                  ${icon("upload", 12)} Añadir
                </button>
                <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
              </div>
            </summary>
            <div class="b2b-profile-card-body">
              <div class="b2b-profile-cert-list">
                ${confRows.map(({ conf, cert }) => `
                  <div class="b2b-profile-cert-row">
                    <div style="min-width:0;flex:1;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                      <span class="selector-homologation-chip">${icon("shield", 12)} ${escHTML(conf)}</span>
                      ${cert ? `<span style="font-size:0.72rem;color:var(--entity-muted)">${icon("file", 11)} ${escHTML(cert.archivo)}</span>` : `<span style="font-size:0.72rem;color:var(--entity-warning)">Sin documento acreditativo</span>`}
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                      <div style="text-align:right">
                        <span style="display:block;font-size:0.66rem;color:var(--entity-faint);text-transform:uppercase">Vigencia</span>
                        <strong style="font-size:0.73rem;color:var(--entity-text)">${cert ? cert.vigencia : "-"}</strong>
                      </div>
                      ${cert ? `
                        <button class="admin-quiet-button" type="button"
                          data-inspect-cert="${cert.hash || ""}"
                          data-cert-name="${escHTML(cert.nombre)}"
                          data-cert-file="${escHTML(cert.archivo)}"
                          data-cert-lab="${escHTML(cert.entidad || "")}"
                          data-cert-norm="${escHTML(cert.norma || "")}"
                          data-cert-res="CONFORME Y VIGENTE (${escHTML(cert.vigencia)})"
                          style="padding:4px 9px;font-size:0.72rem">
                          ${icon("file", 12)} Ver
                        </button>
                      ` : `
                        <button class="admin-quiet-button" type="button" data-open-upload-profile-cert="proveedor" style="padding:4px 9px;font-size:0.72rem">${icon("upload", 12)} Subir</button>
                      `}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </details>
        </div>

        <!-- Bloque Flotante 3: Mis Suministros Vinculados (Colapsable) -->
        <details class="b2b-profile-card is-collapsible" style="margin-top:18px;margin-bottom:0" data-profile-collapse="prvSums" ${profileCollapseState.prvSums ? "open" : ""}>
          <summary class="b2b-profile-section-head is-collapsible-summary">
            <div>
              <h3>${icon("layers", 15)} Mis suministros adjudicados en plataforma (${prvSums.length})</h3>
              <p>Trazabilidad directa de los lotes contratados con ${prv.nombre}.</p>
            </div>
            <div class="b2b-profile-summary-actions">
              <button class="admin-quiet-button" type="button" data-go="#proveedor/suministros">
                Ver bandeja de suministros ${icon("arrow", 12)}
              </button>
              <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
            </div>
          </summary>

          <div class="b2b-profile-card-body">
            <div class="b2b-dir-table-wrap">
              <table class="b2b-dir-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Suministro y Volumen</th>
                    <th>Expediente</th>
                    <th>Destino de Obra</th>
                    <th>Fase Actual</th>
                    <th>Entrega Prevista</th>
                    <th>Presupuesto</th>
                    <th style="text-align:right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  ${prvSums.map(s => `
                    <tr>
                      <td><span class="entity-code" style="font-size:0.74rem">${s.id}</span></td>
                      <td>
                        <strong style="display:block;font-size:0.78rem;color:var(--entity-text)">${s.tipo}</strong>
                        <span style="font-size:0.71rem;color:var(--entity-muted)">${s.unidades}</span>
                      </td>
                      <td><span class="entity-code" style="font-size:0.73rem">${s.expId}</span></td>
                      <td><span style="font-size:0.75rem;color:var(--entity-muted)">${s.destino}</span></td>
                      <td><span class="dossier-chip" style="font-size:0.7rem">${SHORT_PHASE_NAMES[s.faseActual] || s.faseNombre}</span></td>
                      <td><strong style="font-size:0.75rem;color:var(--entity-text)">${s.fechaEntrega}</strong></td>
                      <td><strong style="font-size:0.76rem;color:var(--entity-text)">${s.presupuesto || "—"}</strong></td>
                      <td style="text-align:right">
                        <button class="admin-quiet-button" type="button" data-go="#proveedor/expedientes/${s.expId}" style="padding:4px 9px;font-size:0.72rem">
                          Abrir expediente ${icon("arrow", 11)}
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      `;
    }

    // PERFIL DE CLIENTE (CONSTRUCTOR DE VÍA)
    const cli = DIRECTORIO_CLIENTES.find(c => c.id === "CLI-01") || DIRECTORIO_CLIENTES[0];
    const cliExps = EXPEDIENTES.filter(e =>
      e.cliente && (
        e.cliente.toLowerCase().includes("infraestructuras") ||
        e.cliente.toLowerCase().includes((cli.nombre || "").split(",")[0].toLowerCase())
      )
    );
    const cliSums = SUMINISTROS.filter(s =>
      s.cliente && (
        s.cliente.toLowerCase().includes("infraestructuras") ||
        s.cliente.toLowerCase().includes((cli.nombre || "").split(",")[0].toLowerCase())
      )
    );
    const activeCliExps = cliExps.filter(e => !e.cerradoManual && e.faseActual < 3);

    const totalBudgetNum = cliSums.reduce((acc, s) => {
      const n = parseInt(String(s.presupuesto || "0").replace(/[^\d]/g, ""), 10);
      return acc + (isNaN(n) ? 0 : n);
    }, 0);
    const formattedBudget = totalBudgetNum > 0
      ? totalBudgetNum.toLocaleString("es-ES") + " €"
      : "853.150 €";

    const cliCerts = cli.certificadosDetalle || [
      {
        nombre: "Acuerdo Marco de Gestión de Compras y Suministros SOFEIN",
        norma: "Mandato de homologación, mediación técnica y Pasaporte Digital",
        entidad: "SOFEIN Procurement B2B",
        vigencia: "Vigente 2026–2028",
        estado: "Firmado",
        archivo: "Acuerdo-Marco-Constructor-SOFEIN-2026.pdf",
        hash: "1a94e3c7b208d519"
      },
      {
        nombre: "Clasificación Empresarial de Contratista Ferroviario",
        norma: "Grupo B (Puentes y Viaductos) · Grupo D (Ferrocarriles Subgrupo 1-5)",
        entidad: "ROLECE · Ministerio de Hacienda",
        vigencia: "Indefinida (Anualidad al día)",
        estado: "Vigente",
        archivo: "Certificado-ROLECE-InfraestructurasNorte.pdf",
        hash: "8b27f1d4c639a052"
      },
      {
        nombre: "Certificación de Calidad y Gestión Ambiental en Obra Civil",
        norma: "UNE-EN ISO 9001:2015 · UNE-EN ISO 14001:2015 · ISO 45001",
        entidad: "AENOR Internacional",
        vigencia: "12 dic 2027",
        estado: "Vigente",
        archivo: "Certificados-ISO-InfraestructurasNorte.pdf",
        hash: "3c61a8f2e514b907"
      },
      {
        nombre: "Escritura de Apoderamiento y Firma Digital Autorizada",
        norma: "Representación legal para adjudicaciones, hojas de pedido y adendas",
        entidad: "Registro Mercantil de Bizkaia",
        vigencia: "Verificada",
        estado: "Verificado",
        archivo: "Poderes-Firma-InfraestructurasNorte.pdf",
        hash: "5d83b0e9a142c768"
      }
    ];
    cli.certificadosDetalle = cliCerts;

    const reglasCliente = cli.reglasContratacion || [
      "Exigencia obligatoria en pliego: Trazabilidad lote a lote y ensayos en laboratorio ENAC",
      "Registro de incidencias y cambios por SOFEIN con firma de cliente y proveedor",
      "Emisión de Pasaporte Digital criptográfico al cierre de recepción en obra"
    ];

    const cliInitials = (cli.nombre || "IN").slice(0, 2).toUpperCase();

    return `
      <div class="admin-view-head" style="margin-bottom:14px">
        <div>
          <h1 style="margin:0;font-size:1.65rem;font-weight:600;letter-spacing:-0.03em">Perfil de cliente</h1>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <button class="admin-primary-button" type="button" data-edit-dir="cliente" data-id="${cli.id}">
            ${icon("edit", 13)} Editar datos corporativos
          </button>
        </div>
      </div>

      <!-- Mini resumen en línea -->
      <div class="exp-bandeja-summary-strip" style="margin-bottom:14px">
        <span><strong>${cliExps.length}</strong> expedientes registrados</span>
        <span class="exp-strip-dot">·</span>
        <span><strong>${activeCliExps.length}</strong> en curso</span>
        <span class="exp-strip-dot">·</span>
        <span><strong>${cliSums.length}</strong> suministros gestionados</span>
        <span class="exp-strip-dot">·</span>
        <span><strong>${formattedBudget}</strong> volumen en plataforma</span>
      </div>

      <!-- Parte superior: 4 Tarjetas KPI en 4 columnas -->
      <div class="exp-kpi-filter-grid" style="margin-bottom:18px">
        <div class="exp-kpi-filter-card" style="cursor:default">
          <div class="exp-kpi-filter-top">
            <span class="exp-kpi-label">Expedientes en curso</span>
            <span class="exp-kpi-dot is-active"></span>
          </div>
          <strong class="exp-kpi-value">${activeCliExps.length}</strong>
          <small class="exp-kpi-sub">De ${cliExps.length} expedientes totales en plataforma</small>
        </div>
        <div class="exp-kpi-filter-card" style="cursor:default">
          <div class="exp-kpi-filter-top">
            <span class="exp-kpi-label">Suministros contratados</span>
            <span class="exp-kpi-dot" style="background:#60a5fa"></span>
          </div>
          <strong class="exp-kpi-value">${cliSums.length}</strong>
          <small class="exp-kpi-sub">Lotes supervisados por SOFEIN</small>
        </div>
        <div class="exp-kpi-filter-card" style="cursor:default">
          <div class="exp-kpi-filter-top">
            <span class="exp-kpi-label">Volumen presupuestario</span>
            <span class="exp-kpi-dot" style="background:#a78bfa"></span>
          </div>
          <strong class="exp-kpi-value">${formattedBudget}</strong>
          <small class="exp-kpi-sub">Presupuesto estimado acumulado</small>
        </div>
        <div class="exp-kpi-filter-card" style="cursor:default">
          <div class="exp-kpi-filter-top">
            <span class="exp-kpi-label">Estado de entidad</span>
            <span class="exp-kpi-dot is-complete"></span>
          </div>
          <strong class="exp-kpi-value" style="color:var(--entity-accent)">Verificado</strong>
          <small class="exp-kpi-sub">Acuerdo Marco SOFEIN activo</small>
        </div>
      </div>

      <!-- Bloque Flotante 1: Ficha Corporativa y de Contratación (Colapsable) -->
      <details class="b2b-profile-card is-collapsible" data-profile-collapse="cliFicha" ${profileCollapseState.cliFicha ? "open" : ""}>
        <summary class="b2b-profile-header is-collapsible-summary">
          <div style="display:flex;align-items:center;gap:14px;min-width:0">
            <span class="admin-client-initials" style="width:48px;height:48px;font-size:1.1rem;background:#1d426b;flex-shrink:0">${cliInitials}</span>
            <div style="min-width:0">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span class="entity-code" style="font-size:0.72rem">${cli.id}</span>
                <h2 style="margin:0;font-size:1.22rem;font-weight:700;color:var(--entity-text)">${cli.nombre}</h2>
                <span class="dossier-chip is-active-chip" style="color:#60a5fa;border-color:rgba(96,165,250,0.3)">
                  ${icon("shield", 12)} Contratista Verificado SOFEIN
                </span>
              </div>
              <p style="margin:4px 0 0;font-size:0.78rem;color:var(--entity-muted)">
                ${cli.actividad || "Constructora Ferroviaria (Licitaciones Adif / Metro)"}
              </p>
            </div>
          </div>
          <div class="b2b-profile-summary-actions">
            <button class="admin-quiet-button" type="button" data-edit-dir="cliente" data-id="${cli.id}">
              ${icon("edit", 13)} Editar ficha
            </button>
            <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
          </div>
        </summary>

        <div class="b2b-profile-card-body">
          <div class="b2b-profile-meta-grid">
            <div class="b2b-profile-meta-item">
              <span class="b2b-profile-meta-label">CIF / NIF</span>
              <strong class="b2b-profile-meta-val">${cli.cif}</strong>
            </div>
            <div class="b2b-profile-meta-item">
              <span class="b2b-profile-meta-label">Sede Corporativa / Delegaciones</span>
              <strong class="b2b-profile-meta-val">${cli.sede}</strong>
            </div>
            <div class="b2b-profile-meta-item">
              <span class="b2b-profile-meta-label">Representante Legal / Compras</span>
              <strong class="b2b-profile-meta-val">${cli.representante || "María González López (Dir. Compras)"}</strong>
            </div>
            <div class="b2b-profile-meta-item">
              <span class="b2b-profile-meta-label">Contacto Técnico y Licitaciones</span>
              <strong class="b2b-profile-meta-val">${renderEmailCell(cli.email || cli.contacto)}</strong>
            </div>
            <div class="b2b-profile-meta-item">
              <span class="b2b-profile-meta-label">Teléfono Corporativo</span>
              <strong class="b2b-profile-meta-val">${cli.telefono ? renderTelefonoCell(cli.telefono) : "—"}</strong>
            </div>
            <div class="b2b-profile-meta-item">
              <span class="b2b-profile-meta-label">Condiciones de Pago Estándar</span>
              <strong class="b2b-profile-meta-val">${cli.condicionesPago || "Confirming 60 días tras acta recepción"}</strong>
            </div>
          </div>
        </div>
      </details>

      <!-- Bloque Flotante 2: Acuerdo marco y acreditaciones -->
      <div>
        <!-- Columna Derecha: Acreditaciones Corporativas y Acuerdo Marco -->
        <details class="b2b-profile-card is-collapsible" style="margin-bottom:0" data-profile-collapse="cliCerts" ${profileCollapseState.cliCerts ? "open" : ""}>
          <summary class="b2b-profile-section-head is-collapsible-summary">
            <div>
              <h3>${icon("shield", 15)} Acuerdo marco y acreditaciones registradas</h3>
              <p>Documentación legal y certificaciones de contratista verificadas en plataforma.</p>
            </div>
            <div class="b2b-profile-summary-actions">
              <button class="admin-quiet-button" type="button" data-open-upload-profile-cert="cliente">
                ${icon("upload", 12)} Añadir
              </button>
              <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
            </div>
          </summary>

          <div class="b2b-profile-card-body">
            <div class="b2b-profile-cert-list">
              ${cliCerts.map(c => `
                <div class="b2b-profile-cert-row">
                  <div style="min-width:0;flex:1">
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                      <strong style="font-size:0.8rem;color:var(--entity-text)">${c.nombre}</strong>
                      <span class="b2b-cert-badge is-valid">${c.estado}</span>
                    </div>
                    <div style="font-size:0.72rem;color:var(--entity-muted);margin-top:2px">
                      ${c.norma} · <span style="color:var(--entity-faint)">${c.entidad}</span>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                    <div style="text-align:right">
                      <span style="display:block;font-size:0.66rem;color:var(--entity-faint);text-transform:uppercase">Estado</span>
                      <strong style="font-size:0.73rem;color:var(--entity-text)">${c.vigencia}</strong>
                    </div>
                    <button class="admin-quiet-button" type="button"
                      data-inspect-cert="${c.hash}"
                      data-cert-name="${c.nombre}"
                      data-cert-file="${c.archivo}"
                      data-cert-lab="${c.entidad}"
                      data-cert-norm="${c.norma}"
                      data-cert-res="DOCUMENTO VERIFICADO (${c.vigencia})"
                      style="padding:4px 9px;font-size:0.72rem">
                        ${icon("file", 12)} Ver
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </details>
      </div>

      <!-- Bloque Flotante 3: Mis Expedientes de Suministro (Colapsable) -->
      <details class="b2b-profile-card is-collapsible" style="margin-top:18px;margin-bottom:0" data-profile-collapse="cliExps" ${profileCollapseState.cliExps ? "open" : ""}>
        <summary class="b2b-profile-section-head is-collapsible-summary">
          <div>
            <h3>${icon("folder", 15)} Mis expedientes de suministro en curso e histórico (${cliExps.length})</h3>
            <p>Resumen ejecutivo de los expedientes contratados por ${cli.nombre}.</p>
          </div>
          <div class="b2b-profile-summary-actions">
            <button class="admin-quiet-button" type="button" data-go="#cliente/expedientes">
              Ver todos mis expedientes ${icon("arrow", 12)}
            </button>
            <span class="b2b-profile-chevron" title="Mostrar / ocultar sección">${icon("chevronDown", 16)}</span>
          </div>
        </summary>

        <div class="b2b-profile-card-body">
          <div class="b2b-dir-table-wrap">
            <table class="b2b-dir-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Título del Expediente</th>
                  <th>Destino de Obra</th>
                  <th>Suministros</th>
                  <th>Fase Actual</th>
                  <th>Presupuesto Total</th>
                  <th style="text-align:right">Acción</th>
                </tr>
              </thead>
              <tbody>
                ${cliExps.map(exp => {
                  const meta = getExpVisualMeta(exp);
                  return `
                    <tr>
                      <td><span class="entity-code" style="font-size:0.74rem">${exp.id}</span></td>
                      <td>
                        <strong style="display:block;font-size:0.78rem;color:var(--entity-text)">${meta.tituloGenerico}</strong>
                        <span style="font-size:0.71rem;color:var(--entity-muted)">${exp.unidades || exp.subtipo}</span>
                      </td>
                      <td><span style="font-size:0.75rem;color:var(--entity-muted)">${exp.destinatarioFinal}</span></td>
                      <td><span class="dossier-chip" style="font-size:0.7rem">${meta.numSuministros} ${meta.numSuministros === 1 ? 'suministro' : 'suministros'}</span></td>
                      <td><span class="dossier-chip" style="font-size:0.7rem">${meta.shortPhase}</span></td>
                      <td><strong style="font-size:0.76rem;color:var(--entity-text)">${exp.presupuestoTotal || "—"}</strong></td>
                      <td style="text-align:right">
                        <button class="admin-quiet-button" type="button" data-go="#cliente/expedientes/${exp.id}" style="padding:4px 9px;font-size:0.72rem">
                          Abrir expediente ${icon("arrow", 11)}
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    `;
  }

  /* ============================================================
     PANTALLA 7: PASAPORTE DIGITAL SOFEIN (CONSOLIDACIÓN Y CIERRE)
     ============================================================ */
  function renderPassportSection(expIdOrObj, isDestinatario = false) {
    const exp = typeof expIdOrObj === "string" ? getActiveExpediente(expIdOrObj) : expIdOrObj;
    if (!exp) return `<div style="padding:40px;text-align:center;color:var(--entity-muted)">Expediente no encontrado</div>`;

    const passportId = `PASAPORTE-SOFEIN-${exp.id}`;
    const globalHash = "SHA256: 7f8a91c0e392da54bf618b049d21e8ac8564177d6438902b4d9981ef0351f2bc";

    // Hitos certificados de las 4 fases
    const certifiedMilestones = [
      {
        phase: "Fase 1: Alcance",
        fecha: "12 jun 2026",
        actor: exp.cliente,
        estado: "Validado por SOFEIN Admin",
        desc: "Pliego de prescripciones técnicas Adif y replanteo de vía aprobados"
      },
      {
        phase: "Fase 2: Proveedores",
        fecha: "16 jun 2026",
        actor: "SOFEIN Digital",
        estado: "Adjudicado a " + exp.proveedor,
        desc: "Búsqueda y preselección de proveedores, cotizaciones y adjudicación"
      },
      {
        phase: "Fase 3: Gestión del pedido",
        fecha: "02 jul 2026",
        actor: exp.proveedor,
        estado: "Lote Homologado y Expedido",
        desc: "Hoja de pedido formalizada, ensayos de laboratorio ENAC y logística de entrega"
      },
      {
        phase: "Fase 4: Cierre",
        fecha: "16 jul 2026",
        actor: exp.destinatarioFinal,
        estado: "Recepción Técnica y Pasaporte",
        desc: "Acta de descarga a pie de vía y sellado final de Pasaporte Digital SOFEIN"
      }
    ];
    // Ensayos y auditoría de documentos
    const certifiedCertificates = [
      {
        titulo: "Certificado de Ensayos Mecánicos y Rotura Dinámica EN 13230-2",
        norma: "UNE-EN 13230-2:2016",
        laboratorio: "Laboratorio Central de Estructuras (Acreditación ENAC nº 204/LE)",
        fecha: "02 jul 2026",
        resultado: "CONFORME (62.4 MPa)",
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        archivo: "Ensayo-Fatiga-EN13230-Lote44.pdf"
      },
      {
        titulo: "Declaración de Prestaciones (DoP) y Marcado CE Ferroviario",
        norma: "Directiva (UE) 2016/797 / RD 929/2020 (Interoperabilidad)",
        laboratorio: "Organismo Notificado NoBo 0098",
        fecha: "19 jun 2026",
        resultado: "CONFORME CE",
        hash: "8a72b0c14f89d341908b7a62e30129cd887198fb2910384a921008129e71ab32",
        archivo: "Marcado-CE-IberRail-2026.pdf"
      },
      {
        titulo: "Trazabilidad de Acero y Armadura Activa de Pretensado",
        norma: "UNE-EN 10138-3 (Cordón Y1860S7)",
        laboratorio: "Control Metalúrgico Acería Homologada",
        fecha: "18 jun 2026",
        resultado: "CONFORME LOTE",
        hash: "c4180f983a12984b9012cd764501a9b128710398402918237190283012938102",
        archivo: "Trazabilidad-Acero-Armadura.pdf"
      },
      {
        titulo: "Declaración Ambiental de Producto (DAP) y Huella de Carbono",
        norma: "ISO 14025 / EN 15804",
        laboratorio: "Instituto de Sostenibilidad y Ciclo de Vida",
        fecha: "14 jun 2026",
        resultado: "VERIFICADO ESG",
        hash: "9182730192840192830192830192840192830192840192830192840192830192",
        archivo: "DAP-Traviesa-Hormigon-2026.pdf"
      }
    ];

    const consolidatedIncidents = exp.incidencias ? exp.incidencias.filter(i => i.adendaId) : [];
    const pendingIncidents = exp.incidencias ? exp.incidencias.filter(i => !i.adendaId) : [];

    // El pasaporte solo se emite (sello, firmas) cuando el expediente está cerrado (Fase 7 completada).
    const isClosed = !!exp.cerrado;
    const doneCount = isClosed ? PHASES.length : exp.faseActual;
    if (exp.hitosFechas) certifiedMilestones.forEach((m, i) => { if (exp.hitosFechas[i]) m.fecha = exp.hitosFechas[i]; });
    // Los ensayos solo existen una vez completada la fase 4 (Fabricación & Calidad).
    // Catálogo de ensayos según el tipo de material del expediente.
    const materialKey = /madera/i.test(exp.tipoMaterial + " " + exp.subtipo + " " + exp.producto) ? "madera"
      : /fijaci|tirafondo|clip|sujeci|placa/i.test(exp.tipoMaterial + " " + exp.producto) ? "fijaciones"
      : "hormigon";
    const certsByMaterial = {
      hormigon: certifiedCertificates,
      madera: [{ titulo: "Certificado de Tratamiento de Preservación (Creosota / Vacío-Presión)", norma: "UNE-EN 351-1 / UNE-EN 599-1", laboratorio: "Laboratorio de Tecnología de la Madera (ENAC)", resultado: "CONFORME CLASE 4", hash: "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90", archivo: "Cert-Tratamiento-Madera.pdf" },
        { titulo: "Clasificación Estructural y Humedad de Traviesas", norma: "UNE-EN 13145 / UNE-EN 14081", laboratorio: "Organismo de Control Forestal Acreditado", resultado: "CONFORME LOTE", hash: "b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1", archivo: "Clasificacion-Madera-Lote.pdf" },
        { titulo: "Declaración de Prestaciones (DoP) y Marcado CE", norma: "Directiva (UE) 2016/797 / RD 929/2020 (Interoperabilidad)", laboratorio: "Organismo Notificado NoBo 0098", resultado: "CONFORME CE", hash: "c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2", archivo: "Marcado-CE-Madera.pdf" },
        { titulo: "Certificación de Procedencia Sostenible (cadena de custodia)", norma: "FSC / PEFC · ISO 14025", laboratorio: "Entidad Certificadora de Gestión Forestal", resultado: "VERIFICADO ESG", hash: "d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3", archivo: "Cadena-Custodia-Forestal.pdf" }],
      fijaciones: [{ titulo: "Ensayo de Fatiga Dinámica y Fuerza de Sujeción", norma: "UNE-EN 13481 / UNE-EN 13146", laboratorio: "Laboratorio Central de Estructuras (Acreditación ENAC)", resultado: "CONFORME", hash: "e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4", archivo: "Cert-Fatiga-Fijaciones.pdf" },
        { titulo: "Certificado de Colada Siderúrgica y Propiedades Mecánicas del Acero", norma: "UNE-EN 10204 tipo 3.1", laboratorio: "Control Metalúrgico Acería Homologada", resultado: "CONFORME LOTE", hash: "f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5", archivo: "Cert-Colada-Acero.pdf" },
        { titulo: "Protección Anticorrosión (Galvanizado)", norma: "UNE-EN ISO 1461", laboratorio: "Laboratorio de Recubrimientos Metálicos", resultado: "CONFORME", hash: "0718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f6", archivo: "Cert-Galvanizado.pdf" },
        { titulo: "Declaración de Prestaciones (DoP) y Marcado CE", norma: "Directiva (UE) 2016/797 / RD 929/2020 (Interoperabilidad)", laboratorio: "Organismo Notificado NoBo 0098", resultado: "CONFORME CE", hash: "18293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f607", archivo: "Marcado-CE-Fijaciones.pdf" }]
    };
    const visibleCertificates = doneCount >= 2 ? certsByMaterial[materialKey] : [];
    const materialNorm = { hormigon: "EN 13230", madera: "EN 13145", fijaciones: "EN 13481" }[materialKey];
    const materialDescs = {
      madera: ["Tratamiento de preservación y clasificación estructural de traviesas", "Ensayos de humedad, preservante y resistencia mecánica"],
      fijaciones: ["Fabricación y galvanizado de lote con trazabilidad de colada", "Ensayo de fatiga dinámica y fuerza de sujeción"]
    }[materialKey];
    if (materialDescs) { certifiedMilestones[2].desc = materialDescs[0] + " · " + materialDescs[1]; certifiedMilestones[2].estado = "Conforme " + materialNorm; }

    return `
      <section class="passport-card">
        <header class="passport-hero">
          <div class="passport-hero-brand">
            <img src="assets/sofein-logo.svg" alt="SOFEIN" />
            <span>Procurement</span>
          </div>
          <div class="passport-hero-main">
            <span class="passport-hero-kicker">${isClosed ? "Documento oficial" : "Borrador"} · ${exp.id}</span>
            <h1>Pasaporte Digital</h1>
            <p>${escHTML(getExpVisualMeta(exp).tituloGenerico)}</p>
          </div>
          <div class="passport-hero-meta">
            <div><span>Cliente</span><strong>${escHTML(exp.cliente)}</strong></div>
            <div><span>Destino</span><strong>${escHTML(exp.destinatarioFinal)}</strong></div>
            <div><span>Estado</span><strong>${isClosed ? `Sellado ${exp.fechaCierre ? `· ${exp.fechaCierre}` : ""}` : `Fase ${Math.min(exp.faseActual + 1, PHASES.length)} de ${PHASES.length}`}</strong></div>
          </div>
        </header>
        <!-- Cabecera Oficial y Sello Criptográfico -->
        <div class="passport-official-head">
          <div class="passport-official-title">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              ${isClosed
                ? `<span class="entity-status complete"><i></i>Documento Oficial Auditado</span>`
                : `<span class="entity-status review"><i></i>Borrador en curso · Fase ${exp.faseActual + 1} de ${PHASES.length}</span>`}
              <span class="dossier-chip">${materialNorm}</span>
            </div>
            <h2>Pasaporte Digital de Suministro Ferroviario</h2>
            <p>
              ${isClosed ? "Registro inmutable de trazabilidad, ensayos y conformidad del suministro" : "Registro provisional: se sella y emite al cerrar el expediente. Suministro"} <b>${exp.id}</b>.
            </p>
          </div>

          <div class="passport-stamp">
            <span class="stamp-label">${icon("shield", 12)} ${isClosed ? "Sello de Conformidad" : "Sello pendiente"}</span>
            <span class="stamp-id">${passportId}</span>
            ${isClosed ? `<span class="stamp-hash">${globalHash}</span>
            <div style="margin-top:6px;font-size:0.68rem;color:var(--entity-accent);font-weight:600">✓ Cadena de Custodia Certificada</div>`
            : `<span class="stamp-hash">Se emitirá al completar la Fase 4</span>`}
          </div>
        </div>

        <!-- 1. Especificaciones del Suministro -->
        <div class="passport-section-title">
          <h3>${icon("file", 16)} 1. Resumen del suministro</h3>
        </div>

        <div class="passport-spec-grid">
          <div class="passport-spec-box">
            <span class="label">Material Homologado</span>
            <strong class="val">${exp.producto}</strong>
            <span class="sub">${exp.tipoMaterial || "Superestructura"} · ${exp.subtipo}</span>
          </div>
          <div class="passport-spec-box">
            <span class="label">Volumen Total</span>
            <strong class="val">${exp.unidades}</strong>
            <span class="sub">Tolerancia dimensional ±1mm</span>
          </div>
          <div class="passport-spec-box">
            <span class="label">Contratista Adjudicatario</span>
            <strong class="val">${exp.cliente}</strong>
            <span class="sub">Constructor y ejecutor de vía</span>
          </div>
          <div class="passport-spec-box">
            <span class="label">Taller / Fabricante</span>
            <strong class="val">${!isDestinatario ? exp.proveedor : exp.proveedor.split(",")[0]}</strong>
            <span class="sub">Planta homologada Adif</span>
          </div>
          <div class="passport-spec-box">
            <span class="label">Destinatario Final de la Vía</span>
            <strong class="val">${exp.destinatarioFinal}</strong>
            <span class="sub">Titular de la infraestructura</span>
          </div>
          <div class="passport-spec-box">
            <span class="label">Presupuesto Formalizado</span>
            <strong class="val" style="color:var(--entity-accent)">${!isDestinatario ? exp.presupuestoTotal : "[Dato Comercial Reservado por Contratista]"}</strong>
            <span class="sub">${!isDestinatario ? "Hoja de Pedido Vinculante" : "Confidencial Comercial"}</span>
          </div>
        </div>

        <!-- 2. Cronología Certificada de las 7 Fases -->
        <div class="passport-section-title">
          <h3>${icon("calendar", 16)} 2. Trazabilidad (4 fases)</h3>
          <span style="font-size:0.75rem;color:var(--entity-accent);font-weight:600">${doneCount} de ${PHASES.length} fases verificadas</span>
        </div>

        <div class="passport-timeline">
          ${certifiedMilestones.map((m, i) => i >= doneCount ? `
            <div class="passport-timeline-item" style="opacity:.55">
              <div class="passport-timeline-dot" style="background:var(--entity-line);color:var(--entity-faint)"></div>
              <div><strong style="color:var(--entity-text);display:block;font-size:0.78rem">${m.phase}</strong><span style="font-size:0.7rem;color:var(--entity-muted)">${i === exp.faseActual ? "En curso" : "—"}</span></div>
              <div><span style="color:var(--entity-muted);display:block">Pendiente de certificar</span></div>
              <div style="text-align:right"><span class="entity-status ${i === exp.faseActual ? "review" : "not-required"}" style="font-size:0.68rem"><i></i>${i === exp.faseActual ? "En curso" : "Pendiente"}</span></div>
            </div>` : `
            <div class="passport-timeline-item">
              <div class="passport-timeline-dot">
                ${icon("check", 14)}
              </div>
              <div>
                <strong style="color:var(--entity-text);display:block;font-size:0.78rem">${m.phase}</strong>
                <span style="font-size:0.7rem;color:var(--entity-muted)">${m.fecha}</span>
              </div>
              <div>
                <span style="color:var(--entity-text);display:block">${m.desc}</span>
                <span style="font-size:0.7rem;color:var(--entity-faint)">Responsable: <b>${m.actor}</b></span>
              </div>
              <div style="text-align:right">
                <span class="entity-status complete" style="font-size:0.68rem"><i></i>${m.estado}</span>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- 3. Auditoría de Calidad y Ensayos de Laboratorio -->
        <div class="passport-section-title">
          <h3>${icon("award", 16)} 3. Ensayos y certificaciones</h3>
        </div>

        <div class="passport-certs-wrap">
          <table class="passport-certs-table">
            <thead>
              <tr>
                <th>Ensayo / Certificación</th>
                <th>Laboratorio</th>
                <th>Resultado</th>
                <th>Hash SHA-256</th>
                <th style="text-align:right"></th>
              </tr>
            </thead>
            <tbody>
              ${visibleCertificates.map(c => `
                <tr>
                  <td>
                    <strong class="cert-title">${c.titulo}</strong>
                    <small class="cert-sub">${c.norma} · ${c.archivo}</small>
                  </td>
                  <td><span class="cert-lab">${c.laboratorio}</span></td>
                  <td><span class="entity-status complete"><i></i>${c.resultado}</span></td>
                  <td><span class="passport-hash-pill" title="${c.hash}">${c.hash.slice(0, 8)}…${c.hash.slice(-6)}</span></td>
                  <td style="text-align:right">
                    <button class="admin-quiet-button" type="button" data-inspect-cert="${c.hash}" data-cert-name="${c.titulo}" data-cert-file="${c.archivo}" data-cert-lab="${c.laboratorio}" data-cert-norm="${c.norma}" data-cert-res="${c.resultado}" style="padding:4px 8px;font-size:0.72rem;white-space:nowrap">
                      ${icon("shield", 12)} Verificar
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          ${visibleCertificates.length ? "" : `<div style="padding:16px 20px;font-size:0.8rem;color:var(--entity-muted)">Los ensayos y certificados aparecerán al completar la Fase 3 (Gestión del pedido).</div>`}
        </div>

        <!-- 4. Histórico de Modificaciones y Adendas Consolidadas -->
        <div class="passport-section-title">
          <h3>${icon("alert", 16)} 4. Incidencias y adendas</h3>
        </div>

        ${pendingIncidents.length ? `
          <div style="display:grid;gap:10px;margin-bottom:12px">
            ${pendingIncidents.map(inc => `
              <div style="padding:12px 16px;border-radius:8px;background:var(--entity-panel-2);border:1px solid var(--entity-line);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
                <div>
                  <strong style="color:var(--entity-text);font-size:0.84rem;display:block">${inc.id}: ${inc.tipo}</strong>
                  <span style="font-size:0.74rem;color:var(--entity-muted)">Pendiente de firma de las partes · se consolidará como adenda al aprobarse</span>
                </div>
                <span class="entity-status pending"><i></i>${inc.estado}</span>
              </div>`).join("")}
          </div>` : ""}
        ${consolidatedIncidents.length ? `
          <div style="display:grid;gap:12px">
            ${consolidatedIncidents.map(inc => `
              <div style="padding:14px 18px;border-radius:8px;background:var(--entity-panel-2);border:1px solid var(--entity-line);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
                <div style="display:flex;align-items:center;gap:12px">
                  <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:rgba(0,135,81,0.12);color:var(--entity-accent)">
                    ${icon("award", 18)}
                  </span>
                  <div>
                    <strong style="color:var(--entity-text);font-size:0.86rem;display:block">
                      ${inc.adendaId}: Modificación y Mediación por ${inc.titulo}
                    </strong>
                    <span style="font-size:0.74rem;color:var(--entity-muted);display:block;margin-top:2px">
                      Consolidada el ${inc.adendaFecha}${isDestinatario ? "" : ` · Desvío: <b>${inc.nuevoCosteAcordado || inc.impactoCoste || "0 €"}</b>`} · Firmada por cliente y proveedor.
                    </span>
                    <span class="passport-hash-pill" style="margin-top:4px;display:inline-block">Hash: ${inc.adendaHash || "SHA256: 9e8a71c0b...44"}</span>
                  </div>
                </div>
                <button class="admin-quiet-button" type="button" data-view-addendum="${exp.id}" data-incident-id="${inc.id}" style="font-size:0.75rem">
                  ${icon("file", 14)} Consultar Adenda Oficial
                </button>
              </div>
            `).join("")}
          </div>
        ` : pendingIncidents.length ? "" : `
          <div style="padding:16px 20px;border-radius:8px;background:var(--entity-panel-2);border:1px solid var(--entity-line);font-size:0.8rem;color:var(--entity-muted)">
            ${isClosed ? "✓ Suministro ejecutado con pleno cumplimiento de pliegos, sin incidencias contractuales ni alteraciones de alcance." : "✓ Sin incidencias consolidadas hasta la fecha."}
          </div>
        `}

        <!-- 5. Cláusula de Delimitación de Responsabilidad Legal -->
        <div class="passport-legal-clause">
          <strong>${icon("shield", 14)} Delimitación Legal de Responsabilidad y Declaración de Garante de Proceso</strong>
          SOFEIN Digital interviene exclusivamente como plataforma tecnológica y garante fehaciente de trazabilidad documental, cronológica y procedimental. La garantía de los materiales, propiedades físicas, resistencia mecánica y ensayos de laboratorio corresponde de forma exclusiva y directa al Fabricante Homologado (<b>${exp.proveedor}</b>) conforme a la legislación aplicable y normativa ferroviaria. La correcta colocación, montaje y supervisión en obra corresponde al Contratista Adjudicatario (<b>${exp.cliente}</b>).
        </div>

        ${isClosed ? `
        <!-- 6. Firmas Digitales Tripartitas -->
        <div class="passport-signatures-row">
          <div class="passport-signature-card">
            <div>
              <span class="role-label">Garante de Proceso & Trazabilidad</span>
              <strong class="signer-name">Ángel Plaza</strong>
              <span class="signer-meta">Director de Operaciones, SOFEIN Digital</span>
            </div>
            <div class="passport-signature-seal">
              <span>${icon("check", 12)} Sello eIDAS / FNMT</span>
              <span>${exp.fechaCierre || "16 jun 2026"}</span>
            </div>
          </div>
          <div class="passport-signature-card">
            <div>
              <span class="role-label">Fabricante Homologado</span>
              <strong class="signer-name">Carlos Mendía</strong>
              <span class="signer-meta">Director Industrial, ${exp.proveedor.split(",")[0]}</span>
            </div>
            <div class="passport-signature-seal">
              <span>${icon("check", 12)} Firma Cualificada</span>
              <span>${exp.fechaCierre || "16 jun 2026"}</span>
            </div>
          </div>
          <div class="passport-signature-card">
            <div>
              <span class="role-label">Contratista Adjudicatario</span>
              <strong class="signer-name">Javier Ruiz</strong>
              <span class="signer-meta">Jefe de Obra Vía, ${exp.cliente}</span>
            </div>
            <div class="passport-signature-seal">
              <span>${icon("check", 12)} Conformidad de Recepción</span>
              <span>${exp.fechaCierre || "16 jun 2026"}</span>
            </div>
          </div>
        </div>

        ` : `<div style="margin-top:18px;padding:14px 18px;border-radius:8px;border:1px dashed var(--entity-line-strong);font-size:0.78rem;color:var(--entity-muted)">Las firmas de garante, fabricante y contratista se recogerán al cierre del expediente (Fase 7).</div>`}

        <!-- 7. Barra de Acciones y Descarga de Certificado -->
        <div class="passport-actions-bar">
          <div style="display:flex;align-items:center;gap:10px">
            <button class="admin-primary-button" type="button" data-print-passport ${isClosed ? "" : 'disabled title="Disponible al cerrar el expediente"'}>
              ${icon("award", 16)} Descargar / Imprimir Pasaporte Digital (PDF)
            </button>
            <button class="admin-quiet-button" type="button" data-inspect-passport-crypto="${exp.id}" ${isClosed ? "" : "disabled"}>
              ${icon("shield", 16)} Inspeccionar Sellado Criptográfico SHA-256
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="admin-quiet-button" type="button" data-toast="Generando paquete ZIP consolidado con todos los certificados y albaranes...">
              ${icon("download", 14)} Descargar Expediente Completo (ZIP)
            </button>
          </div>
        </div>
      </section>
    `;
  }

  function openCertificateAuditModal(cert) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="certAuditModalBackdrop">
        <div class="procurement-modal" style="width:min(580px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Auditoría Criptográfica de Ensayo Técnico</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Verificación fehaciente de integridad y acreditación normativa</p>
            </div>
            <button type="button" id="closeCertAuditModalBtn">×</button>
          </div>
          <div class="procurement-modal-body" style="gap:14px">
            <div style="padding:14px;border-radius:8px;background:var(--entity-panel-2);border:1px solid var(--entity-line);display:grid;gap:6px">
              <strong style="color:var(--entity-text);font-size:0.92rem">${cert.titulo}</strong>
              <span style="font-size:0.75rem;color:var(--entity-muted)">Archivo: <b>${cert.archivo}</b></span>
              <div style="display:flex;gap:8px;margin-top:4px">
                <span class="dossier-chip">${cert.norma}</span>
                <span class="entity-status complete"><i></i>${cert.resultado}</span>
              </div>
            </div>

            <div style="display:grid;gap:6px">
              <span style="font-size:0.72rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Entidad Emisora / Laboratorio</span>
              <div style="padding:10px 12px;background:var(--entity-panel-2);border-radius:6px;font-size:0.8rem;color:var(--entity-text)">
                ${cert.laboratorio}
              </div>
            </div>

            <div style="display:grid;gap:6px">
              <span style="font-size:0.72rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Hash SHA-256 Inmutable</span>
              <code style="padding:10px 12px;background:var(--entity-panel-2);border-radius:6px;font-size:0.72rem;font-family:monospace;word-break:break-all;color:var(--entity-text);border:1px solid var(--entity-line)">
                ${cert.hash}
              </code>
            </div>

            <div style="padding:10px 12px;background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.2);border-radius:6px;font-size:0.75rem;color:var(--entity-accent)">
              ✓ Sello temporal RFC 3161 auditado. El documento depositado coincide exactamente con la copia validada por SOFEIN Digital y el laboratorio emisor.
            </div>
          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="cancelCertAuditModalBtn">Cerrar</button>
            <button class="admin-primary-button" type="button" data-download="${cert.archivo}">
              ${icon("download", 14)} Descargar Certificado Original
            </button>
          </div>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeCertAuditModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelCertAuditModalBtn")?.addEventListener("click", close);
    document.getElementById("certAuditModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "certAuditModalBackdrop") close();
    });
  }

  function openPassportCryptoModal(exp) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="passportCryptoModalBackdrop">
        <div class="procurement-modal" style="width:min(680px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Cadena de Custodia Criptográfica (SHA-256)</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Sellado inmutable de bloques y entregables para ${exp.id}</p>
            </div>
            <button type="button" id="closePassportCryptoModalBtn" aria-label="Cerrar">×</button>
          </div>
          <div class="procurement-modal-body" style="gap:14px;max-height:calc(85vh - 140px);overflow-y:auto;padding-right:12px">
            
            <div style="padding:14px;background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.25);border-radius:8px">
              <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-accent);font-weight:700">Hash Raíz del Pasaporte Digital</span>
              <strong style="display:block;font-family:monospace;font-size:0.82rem;margin-top:4px;word-break:break-all;color:var(--entity-text)">
                SHA-256: 7f8a91c0e392da54bf618b049d21e8ac8564177d6438902b4d9981ef0351f2bc
              </strong>
              <small style="display:block;margin-top:4px;font-size:0.72rem;color:var(--entity-muted)">
                Sellado de tiempo RFC 3161 emitido por Autoridad de Certificación SOFEIN Trust · Timestamp: 16-OCT-2026 12:45:00 UTC
              </small>
            </div>

            <div style="display:grid;gap:10px;margin-top:6px">
              <strong style="font-size:0.78rem;color:var(--entity-faint);text-transform:uppercase;letter-spacing:0.06em">Bloques Auditados del Expediente</strong>
              
              <div style="padding:10px 12px;border:1px solid var(--entity-line);border-radius:6px;background:var(--entity-panel-2);display:grid;gap:3px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <strong style="font-size:0.78rem">Bloque 1: Pliegos Iniciales y PPT Adif NAV</strong>
                  <span class="entity-status complete" style="font-size:0.65rem"><i></i>Certificado</span>
                </div>
                <span style="font-family:monospace;font-size:0.7rem;color:var(--entity-muted)">SHA-256: d5a4e21980f7a63b401928371290384a92817263541290384712903847120938</span>
              </div>

              <div style="padding:10px 12px;border:1px solid var(--entity-line);border-radius:6px;background:var(--entity-panel-2);display:grid;gap:3px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <strong style="font-size:0.78rem">Bloque 2: Oferta Vinculante y Adjudicación a ${exp.proveedor.split(",")[0]}</strong>
                  <span class="entity-status complete" style="font-size:0.65rem"><i></i>Certificado</span>
                </div>
                <span style="font-family:monospace;font-size:0.7rem;color:var(--entity-muted)">SHA-256: a8f9213847129038471209384712093847120938471209384712093847120938</span>
              </div>

              <div style="padding:10px 12px;border:1px solid var(--entity-line);border-radius:6px;background:var(--entity-panel-2);display:grid;gap:3px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <strong style="font-size:0.78rem">Bloque 3: Hoja de Pedido y Póliza Tripartita</strong>
                  <span class="entity-status complete" style="font-size:0.65rem"><i></i>Certificado</span>
                </div>
                <span style="font-family:monospace;font-size:0.7rem;color:var(--entity-muted)">SHA-256: 3120948120938471209384712093847120938471209384712093847120938471</span>
              </div>

              <div style="padding:10px 12px;border:1px solid var(--entity-line);border-radius:6px;background:var(--entity-panel-2);display:grid;gap:3px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <strong style="font-size:0.78rem">Bloque 4: Ensayos Mecánicos EN 13230 y Marcado CE</strong>
                  <span class="entity-status complete" style="font-size:0.65rem"><i></i>Certificado</span>
                </div>
                <span style="font-family:monospace;font-size:0.7rem;color:var(--entity-muted)">SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
              </div>

              ${exp.incidencias && exp.incidencias.some(i => i.adendaId) ? `
                <div style="padding:10px 12px;border:1px solid var(--entity-line);border-radius:6px;background:var(--entity-panel-2);display:grid;gap:3px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <strong style="font-size:0.78rem">Bloque 5: ${exp.incidencias.filter(i => i.adendaId).length > 1 ? "Adendas" : "Adenda"} (${exp.incidencias.filter(i => i.adendaId).map(i => i.adendaId).join(", ")})</strong>
                    <span class="entity-status complete" style="font-size:0.65rem"><i></i>Certificado</span>
                  </div>
                  <span style="font-family:monospace;font-size:0.7rem;color:var(--entity-muted)">SHA-256: ad7f9c2041b3e851a02938471209384712093847120938471209384712093847</span>
                </div>
              ` : ""}

            </div>

          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="closePassportCryptoBtn">Cerrar Inspector</button>
            <button class="admin-primary-button" type="button" data-toast="Hash de integridad copiado al portapapeles">Copiar Hash Raíz</button>
          </div>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closePassportCryptoModalBtn")?.addEventListener("click", close);
    document.getElementById("closePassportCryptoBtn")?.addEventListener("click", close);
    document.getElementById("passportCryptoModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "passportCryptoModalBackdrop") close();
    });
  }

  /* ============================================================
     VISTAS: DESTINATARIO FINAL (AUDITOR / ESPECTADOR DE VÍA)
     ============================================================ */
  function renderDestinatarioView(dossierId = null) {
    const exp = getActiveExpediente(dossierId || activeParam || "SFN-2026-H6T4");

    return `
      <div class="admin-view-head">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span class="dossier-chip" style="background:rgba(0,135,81,0.15);color:var(--entity-accent)">Vista Espectador / Auditoría</span>
            <span style="font-size:0.75rem;color:var(--entity-muted)">Propietario de la Infraestructura</span>
          </div>
          <h1>Pasaporte Digital del Tramo Ferroviario</h1>
          <p>${exp.destinatarioFinal} · Acceso técnico oficial con confidencialidad de datos financieros de contratista</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button class="admin-primary-button" type="button" data-print-passport>
            ${icon("award", 16)} Descargar Pasaporte de Vía (PDF)
          </button>
          <button class="admin-quiet-button" type="button" data-inspect-passport-crypto="${exp.id}">
            ${icon("shield", 16)} Sellado Criptográfico
          </button>
        </div>
      </div>

      <div class="destinatario-confidential-notice" style="margin-bottom:20px">
        ${icon("shield", 18)}
        <span><b>Aviso de Confidencialidad Comercial:</b> Como destinatario final de la infraestructura dispones de acceso íntegro a certificaciones técnicas, trazabilidad y normativas. Los datos financieros bilaterales y márgenes entre contratista y proveedor quedan reservados conforme a los acuerdos del expediente.</span>
      </div>

      ${renderPassportSection(exp, true)}
    `;
  }

  /* ---------- Render Principal ---------- */
  function renderApp() {
    parseHash();

    const currentRouteKey = `${activeRole}/${activeSection}/${activeParam || ""}`;
    const routeChanged = previousRouteKey !== currentRouteKey;
    previousRouteKey = currentRouteKey;

    let viewHTML = "";
    if (activeRole === "admin") {
      viewHTML = renderAdminView(activeSection, activeParam);
    } else if (activeRole === "cliente") {
      viewHTML = renderClienteView(activeSection, activeParam);
    } else if (activeRole === "proveedor") {
      viewHTML = renderProveedorView(activeSection, activeParam);
    } else if (activeRole === "destinatario") {
      viewHTML = renderDestinatarioView(activeParam);
    }

    const appRoot = document.getElementById("app");
    if (!appRoot) return;

    appRoot.innerHTML = `
      ${renderSidebar()}
      <div class="admin-scrim" id="adminScrim" aria-hidden="true"></div>
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
    if (routeChanged) {
      window.scrollTo(0, 0);
    }
    if (pendingOpenMediation) {
      const incId = pendingOpenMediation;
      pendingOpenMediation = null;
      setTimeout(() => {
        const targetCard = document.getElementById(`reg-card-${incId}`) || document.querySelector(".reg-card");
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          targetCard.style.outline = "2px solid var(--entity-accent)";
          setTimeout(() => { targetCard.style.outline = ""; }, 2500);
        }
      }, 120);
    }
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
    try {
    // Popover del Selector de Rol Sutil
    const roleBtn = document.getElementById("roleDropdownBtn");
    const roleMenu = document.getElementById("roleDropdownMenu");
    roleBtn?.addEventListener("click", e => {
      e.stopPropagation();
      // Cerrar menú de notificaciones si estuviera abierto
      document.getElementById("notifDropdownMenu")?.setAttribute("hidden", "");
      document.getElementById("notifDropdownBtn")?.setAttribute("aria-expanded", "false");

      const isHidden = roleMenu.hasAttribute("hidden");
      if (isHidden) {
        roleMenu.removeAttribute("hidden");
        roleBtn.setAttribute("aria-expanded", "true");
      } else {
        roleMenu.setAttribute("hidden", "");
        roleBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Popover de Notificaciones / Avisos Bell
    const notifBtn = document.getElementById("notifDropdownBtn");
    const notifMenu = document.getElementById("notifDropdownMenu");

    function updateTopbarNotifPopoverUI() {
      const menu = document.getElementById("notifDropdownMenu");
      const btn = document.getElementById("notifDropdownBtn");
      if (!menu || !btn) return;
      const rNotices = NOTICES.filter(n => canRoleSeeNotice(n, activeRole));
      const uCount = rNotices.filter(n => !completedNotices.has(n.id)).length;
      btn.className = `topbar-icon-btn notif-bell-btn ${uCount > 0 ? "has-unread" : ""}`;
      btn.title = uCount > 0 ? `${uCount} ${uCount === 1 ? 'aviso pendiente' : 'avisos pendientes'}` : 'Sin avisos pendientes';
      btn.innerHTML = `${icon("bell", 16)}${uCount > 0 ? `<span class="bell-count-badge">${uCount > 9 ? "9+" : uCount}</span>` : ""}`;
      menu.innerHTML = renderTopbarNotifPopoverHTML();
      const sideAvisos = document.querySelector('.admin-nav-link[data-go*="avisos"] b');
      if (sideAvisos) sideAvisos.textContent = uCount;
    }

    notifBtn?.addEventListener("click", e => {
      e.stopPropagation();
      // Cerrar role switcher si estuviera abierto
      document.getElementById("roleDropdownMenu")?.setAttribute("hidden", "");
      document.getElementById("roleDropdownBtn")?.setAttribute("aria-expanded", "false");

      const isHidden = notifMenu.hasAttribute("hidden");
      if (isHidden) {
        notifMenu.removeAttribute("hidden");
        notifBtn.setAttribute("aria-expanded", "true");
      } else {
        notifMenu.setAttribute("hidden", "");
        notifBtn.setAttribute("aria-expanded", "false");
      }
    });

    if (notifMenu) {
      notifMenu.addEventListener("click", e => {
        // 1. Pestañas de filtro
        const filterBtn = e.target.closest("[data-topbar-notif-filter]");
        if (filterBtn) {
          e.stopPropagation();
          topbarNotifFilter = filterBtn.dataset.topbarNotifFilter;
          updateTopbarNotifPopoverUI();
          return;
        }

        // 2. Marcar todos como leídos
        const markAllBtn = e.target.closest("#notifMarkAllReadBtn");
        if (markAllBtn) {
          e.stopPropagation();
          const rNotices = NOTICES.filter(n => canRoleSeeNotice(n, activeRole));
          rNotices.forEach(n => completedNotices.add(n.id));
          showToast("Todos los avisos marcados como leídos");
          updateTopbarNotifPopoverUI();
          if (activeSection === "avisos") {
            renderApp();
          }
          return;
        }

        // 3. Toggle de aviso individual
        const toggleBtn = e.target.closest("[data-topbar-toggle-notice]");
        if (toggleBtn) {
          e.stopPropagation();
          const id = toggleBtn.dataset.topbarToggleNotice;
          if (completedNotices.has(id)) {
            completedNotices.delete(id);
            showToast(`Aviso ${id} reabierto`);
          } else {
            completedNotices.add(id);
            showToast(`Aviso ${id} completado`);
          }
          updateTopbarNotifPopoverUI();
          if (activeSection === "avisos") {
            renderApp();
          }
          return;
        }

        // 4. Marcar al hacer clic en enlace/acción o tarjeta
        const markOnClick = e.target.closest("[data-mark-notif-on-click]");
        if (markOnClick) {
          const id = markOnClick.dataset.markNotifOnClick;
          completedNotices.add(id);
          notifMenu.setAttribute("hidden", "");
          notifBtn?.setAttribute("aria-expanded", "false");
          return;
        }

        // 5. Ver todos los avisos
        const viewAll = e.target.closest(".notif-view-all-link");
        if (viewAll) {
          notifMenu.setAttribute("hidden", "");
          notifBtn?.setAttribute("aria-expanded", "false");
          return;
        }
      });
    }

    document.addEventListener("click", e => {
      if (!e.target.closest("#roleSwitcherWrap")) {
        document.getElementById("roleDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("roleDropdownBtn")?.setAttribute("aria-expanded", "false");
      }
      if (!e.target.closest("#notifDropdownWrap")) {
        document.getElementById("notifDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("notifDropdownBtn")?.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        document.getElementById("roleDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("roleDropdownBtn")?.setAttribute("aria-expanded", "false");
        document.getElementById("notifDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("notifDropdownBtn")?.setAttribute("aria-expanded", "false");
      }
    });

    // Cambio de Player / Rol con preservación contextual de página equivalente
    function getEquivalentPath(targetRole) {
      if (targetRole === activeRole) {
        return location.hash || `#${targetRole}`;
      }
      // Mantener query params existentes (ej. tab, phase)
      const rawHash = location.hash.replace(/^#\/?/, "");
      const qIdx = rawHash.indexOf("?");
      const querySuffix = qIdx !== -1 ? rawHash.slice(qIdx) : "";

      // 1. Destinatario Final (solo tiene vista de pasaporte de expediente)
      if (targetRole === "destinatario") {
        return activeParam ? `#destinatario/pasaporte/${activeParam}${querySuffix}` : `#destinatario/pasaporte/SFN-2026-H6T4${querySuffix}`;
      }
      if (activeRole === "destinatario") {
        return `#${targetRole}/expedientes/${activeParam || "SFN-2026-H6T4"}${querySuffix}`;
      }

      // 2. Ficha o detalle de expediente
      if (activeSection === "expedientes" && activeParam) {
        return `#${targetRole}/expedientes/${activeParam}${querySuffix}`;
      }

      // 3. Selector & Matching de ofertas de un expediente
      if (activeSection === "selector" && activeParam) {
        return `#${targetRole}/selector/${activeParam}${querySuffix}`;
      }

      // 4. Creación de nuevo expediente
      if (activeSection === "nuevo" || (activeSection === "expedientes" && activeParam === "nuevo")) {
        return (targetRole === "admin" || targetRole === "cliente") ? `#${targetRole}/nuevo` : `#${targetRole}/expedientes`;
      }

      // 5. Suministros (compartido por admin, cliente y proveedor)
      if (activeSection === "suministros") {
        return (targetRole === "admin" || targetRole === "cliente" || targetRole === "proveedor")
          ? `#${targetRole}/suministros${querySuffix}`
          : `#${targetRole}/expedientes${querySuffix}`;
      }

      // 6. Bandeja de Avisos / Inbox
      if (activeSection === "avisos" || activeSection === "inbox") {
        return `#${targetRole}/avisos${querySuffix}`;
      }

      // 7. Perfil corporativo (cliente y proveedor)
      if (activeSection === "perfil") {
        if (targetRole === "cliente" || targetRole === "proveedor") {
          return `#${targetRole}/perfil${querySuffix}`;
        }
        return `#admin/overview${querySuffix}`;
      }

      // 8. Visión global (exclusiva de admin)
      if (activeSection === "overview") {
        if (targetRole === "admin") return `#admin/overview${querySuffix}`;
        if (targetRole === "cliente" || targetRole === "proveedor") return `#${targetRole}/perfil${querySuffix}`;
        return `#${targetRole}/expedientes${querySuffix}`;
      }

      // 9. Directorio (exclusivo de admin)
      if (activeSection === "directorio") {
        return targetRole === "admin" ? `#admin/directorio${querySuffix}` : `#${targetRole}/expedientes${querySuffix}`;
      }

      // 10. Cotizaciones (exclusivo de proveedor)
      if (activeSection === "cotizaciones") {
        return targetRole === "proveedor" ? `#proveedor/cotizaciones${querySuffix}` : `#${targetRole}/expedientes${querySuffix}`;
      }

      // 11. Preservar sección activa si existe en el menú de navegación del rol de destino
      const targetNav = (PLAYERS[targetRole] && PLAYERS[targetRole].nav) || [];
      if (targetNav.some(n => n.id === activeSection)) {
        return `#${targetRole}/${activeSection}${activeParam ? "/" + activeParam : ""}${querySuffix}`;
      }

      // 12. Listado general de expedientes
      if (activeSection === "expedientes") {
        return `#${targetRole}/expedientes${querySuffix}`;
      }

      // Fallback predeterminado del rol destino
      const defaultNav = (PLAYERS[targetRole] && PLAYERS[targetRole].defaultNav) || "expedientes";
      return `#${targetRole}/${defaultNav}${querySuffix}`;
    }

    document.querySelectorAll("[data-switch-role]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetRole = btn.dataset.switchRole;
        document.getElementById("roleDropdownMenu")?.setAttribute("hidden", "");
        document.getElementById("roleDropdownBtn")?.setAttribute("aria-expanded", "false");
        location.hash = getEquivalentPath(targetRole);
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
    document.getElementById("adminScrim")?.addEventListener("click", () => {
      document.getElementById("app")?.classList.remove("nav-open");
    });

    // Cambio de fase en el Constructor de Expedientes
    document.querySelectorAll("[data-select-dossier-phase]").forEach(btn => {
      btn.addEventListener("click", () => {
        const newPhase = Number(btn.dataset.selectDossierPhase);
        activeDossierPhase = newPhase;
        const [path, query] = (location.hash || "").split("?");
        if (query && query.includes("phase=")) {
          const q = new URLSearchParams(query);
          q.set("phase", newPhase);
          const newHash = `#${path.replace(/^#\/?/, "")}?${q.toString()}`;
          lastAppliedPhaseHash = newHash;
          location.hash = newHash;
        } else {
          renderApp();
        }
      });
    });

    // Cambio de pestaña dentro del expediente
    document.querySelectorAll("[data-switch-dossier-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const newTab = btn.dataset.switchDossierTab;
        activeDossierTab = newTab;
        const [path, query] = (location.hash || "").split("?");
        if (query) {
          const q = new URLSearchParams(query);
          q.set("tab", newTab);
          const newHash = `#${path.replace(/^#\/?/, "")}?${q.toString()}`;
          lastAppliedTabHash = newHash;
          location.hash = newHash;
        } else {
          renderApp();
        }
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
        const phaseIdx = dropzone.dataset.phase !== undefined ? Number(dropzone.dataset.phase) : activeDossierPhase;
        const slotIdx = Number(dropzone.dataset.slot);
        simulateFileUpload(expId, slotIdx, phaseIdx);
      });
      dropzone.addEventListener("click", () => {
        const expId = dropzone.dataset.dropzoneExp;
        const phaseIdx = dropzone.dataset.phase !== undefined ? Number(dropzone.dataset.phase) : activeDossierPhase;
        const slotIdx = Number(dropzone.dataset.slot);
        simulateFileUpload(expId, slotIdx, phaseIdx);
      });
    });

    // Subir versión subsanada en ranura rechazada (Pantalla 4)
    document.querySelectorAll("[data-reupload-exp]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.reuploadExp;
        const phaseIdx = Number(btn.dataset.phase);
        const slotIdx = Number(btn.dataset.slot);
        simulateFileUpload(expId, slotIdx, phaseIdx, true);
      });
    });

    // Filtros de Alcance y Estado de Gestión Documental (Pantalla 4)
    document.querySelectorAll("[data-doc-scope]").forEach(btn => {
      btn.addEventListener("click", () => {
        docScopeMode = btn.dataset.docScope;
        renderApp();
      });
    });

    document.querySelectorAll("[data-doc-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        docStatusFilter = btn.dataset.docFilter;
        renderApp();
      });
    });

    // Alcance en Avisos & Hitos (filtra esta fase o todas, y este suministro o todos)
    document.querySelectorAll("[data-comms-phase-scope]").forEach(btn => {
      btn.addEventListener("click", () => {
        commsPhaseScope = btn.dataset.commsPhaseScope;
        renderApp();
      });
    });

    document.querySelectorAll("[data-comms-sum-scope]").forEach(btn => {
      btn.addEventListener("click", () => {
        commsSumScope = btn.dataset.commsSumScope;
        renderApp();
      });
    });

    // Recordar estado de bloques colapsables dentro del expediente y en bandeja de expedientes
    document.querySelectorAll("details[data-profile-collapse] summary button, details[data-profile-collapse] summary [data-edit-dir], details[data-profile-collapse] summary [data-open-upload-profile-cert], details[data-profile-collapse] summary [data-go]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
      });
    });

    document.querySelectorAll("details[data-profile-collapse]").forEach(det => {
      det.addEventListener("toggle", () => {
        const k = det.dataset.profileCollapse;
        if (k) profileCollapseState[k] = det.open;
      });
    });

    document.querySelectorAll("details[data-collapse-key]").forEach(det => {
      det.addEventListener("toggle", () => {
        const k = det.dataset.collapseKey;
        if (k) dossierCollapseState[k] = det.open;
      });
    });

    document.querySelectorAll("details[data-exp-collapse]").forEach(det => {
      det.addEventListener("toggle", () => {
        const k = det.dataset.expCollapse;
        if (k) expBandejaCollapseState[k] = det.open;
      });
    });

    // Documentación: Ver / Descargar abren el archivo; Editar y Eliminar (SOFEIN Admin)
    const getDocFromBtn = btn => {
      const exp = getActiveExpediente(btn.dataset.exp);
      const delivMap = getActiveDeliverablesMap(exp);
      const phaseIdx = Number(btn.dataset.phase);
      const slotIdx = Number(btn.dataset.slot);
      return { exp, delivMap, phaseIdx, slotIdx, del: delivMap[phaseIdx] && delivMap[phaseIdx][slotIdx] };
    };
    document.querySelectorAll("[data-view-doc]").forEach(btn => {
      btn.addEventListener("click", () => viewDocFile(getDocFromBtn(btn).del));
    });
    document.querySelectorAll("[data-download-doc]").forEach(btn => {
      btn.addEventListener("click", () => downloadDocFile(getDocFromBtn(btn).del));
    });
    document.querySelectorAll("[data-edit-doc]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "admin") return;
        const ref = getDocFromBtn(btn);
        if (ref.del) openEditDocModal(ref);
      });
    });
    document.querySelectorAll("[data-delete-doc]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "admin") return;
        const ref = getDocFromBtn(btn);
        if (ref.del) openDeleteDocModal(ref);
      });
    });

    // Adjuntar Documento Adicional Libre (Pantalla 4)
    document.querySelectorAll("[data-open-upload-free-doc]").forEach(btn => {
      btn.addEventListener("click", () => {
        openUploadFreeDocModal(btn.dataset.openUploadFreeDoc);
      });
    });

    // Selección de suministro dentro del expediente (filtra fases y documentación)
    document.querySelectorAll("[data-select-exp-suministro]").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest("[data-toggle-suministro-closed]")) return;
        const sumId = card.dataset.selectExpSuministro;
        if (sumId && activeDossierSuministroId !== sumId) {
          activeDossierSuministroId = sumId;
          const selectedSum = SUMINISTROS.find(s => s.id === sumId);
          if (selectedSum) {
            activeDossierPhase = Math.min(selectedSum.faseActual ?? 0, PHASES.length - 1);
          }
          renderApp();
        }
      });
    });

    // Cerrar o Reabrir expediente con confirmación (SOFEIN Admin)
    document.querySelectorAll("[data-toggle-exp-closed]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const expId = btn.dataset.toggleExpClosed;
        openConfirmToggleExpClosedModal(expId);
      });
    });

    // Cerrar o Reabrir suministro individual con confirmación (SOFEIN Admin)
    document.querySelectorAll("[data-toggle-suministro-closed]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const sumId = btn.dataset.toggleSuministroClosed;
        const expId = btn.dataset.expId;
        openConfirmToggleSuministroClosedModal(sumId, expId);
      });
    });

    // Editar nota directamente desde la tabla "Documentación"
    document.querySelectorAll("[data-edit-doc-note]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const expId = btn.dataset.editDocNote;
        const phaseIdx = Number(btn.dataset.phase);
        const slotIdx = Number(btn.dataset.slot);
        openEditDocNoteModal(expId, phaseIdx, slotIdx);
      });
    });

    // Añadir nuevo cambio / anotación en la sección "Registro"
    document.querySelectorAll("[data-open-change-log-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        openAddCambioLogModal(btn.dataset.openChangeLogModal);
      });
    });

    // Subir documento a una ranura requerida existente (abre modal con visibilidad para Admin)
    document.querySelectorAll("[data-upload-slot-doc]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.uploadSlotDoc;
        const phaseIdx = Number(btn.dataset.phase);
        const slotIdx = Number(btn.dataset.slot);
        openUploadSlotDocModal(expId, phaseIdx, slotIdx);
      });
    });

    // Validar documento (SOFEIN Admin elige quién puede verlo y notas)
    document.querySelectorAll("[data-admin-approve]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.adminApprove;
        const phaseIdx = btn.dataset.phase !== undefined ? Number(btn.dataset.phase) : activeDossierPhase;
        const slot = Number(btn.dataset.slot);
        openValidateDeliverableModal(expId, phaseIdx, slot);
      });
    });
    document.querySelectorAll("[data-admin-reject]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.adminReject;
        const phaseIdx = btn.dataset.phase !== undefined ? Number(btn.dataset.phase) : activeDossierPhase;
        const slot = Number(btn.dataset.slot);
        openRejectDeliverableModal(expId, phaseIdx, slot);
      });
    });

    // Validación de Expediente Pendiente (Admin valida solicitud de Cliente - Apuntes 06)
    document.querySelectorAll("[data-validate-exp]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "admin") return;
        openValidateExpedienteModal(btn.dataset.validateExp);
      });
    });

    // Constructor de Expediente: Añadir Fila de Suministro Dinámico
    const mainFechaInput = document.querySelector('#createExpedienteFullForm input[name="fechaObjetivo"]');

    function bindSuministroFileInputs(root = document) {
      root.querySelectorAll(".suministro-item").forEach(row => {
        const fechaInput = row.querySelector(".suministro-fecha-input");
        if (fechaInput && !fechaInput.dataset.bound) {
          fechaInput.dataset.bound = "1";
          fechaInput.addEventListener("input", () => {
            fechaInput.dataset.customDate = "1";
            fechaInput.style.color = "var(--entity-text)";
          });
          fechaInput.addEventListener("change", () => {
            fechaInput.dataset.customDate = "1";
            fechaInput.style.color = "var(--entity-text)";
          });
        }
      });
    }
    bindSuministroFileInputs();
    bindCreateAttachments();
    const createSumsWrap = document.getElementById("suministrosContainer");
    if (createSumsWrap) {
      createSumsWrap.addEventListener("input", syncCreateExpSummary);
      createSumsWrap.addEventListener("change", syncCreateExpSummary);
      syncCreateExpSummary();
    }

    if (mainFechaInput && !mainFechaInput.dataset.syncBound) {
      mainFechaInput.dataset.syncBound = "1";
      const syncInheritedDates = () => {
        const val = mainFechaInput.value;
        document.querySelectorAll("#suministrosContainer .suministro-fecha-input").forEach(inp => {
          if (inp.dataset.customDate !== "1") {
            inp.value = val;
            inp.style.color = "#9ca3af";
          }
        });
      };
      mainFechaInput.addEventListener("input", syncInheritedDates);
      mainFechaInput.addEventListener("change", syncInheritedDates);
    }

    const addSuministroBtn = document.getElementById("addSuministroRowBtn");
    const suministrosWrap = document.getElementById("suministrosContainer");
    if (addSuministroBtn && suministrosWrap) {
      const renumberSuministroRows = () => {
        suministrosWrap.querySelectorAll(".suministro-item-num").forEach((el, i) => { el.textContent = i + 1; });
      };
      addSuministroBtn.addEventListener("click", () => {
        suministroRowCount++;
        const defaultDate = mainFechaInput ? mainFechaInput.value : "2026-11-30";
        const holder = document.createElement("div");
        holder.innerHTML = renderCreateSuministroRowHTML(suministroRowCount, activeRole === "admin", defaultDate, true);
        const item = holder.firstElementChild;
        suministrosWrap.appendChild(item);
        renumberSuministroRows();
        bindSuministroFileInputs(item);
        bindCreateAttachments(item);
        syncCreateExpSummary();
        item.querySelector("[data-remove-suministro]")?.addEventListener("click", () => {
          item.remove();
          renumberSuministroRows();
          syncCreateExpSummary();
        });
      });
    }

    // Constructor de Expediente: Envío del Formulario (Pantalla 1)
    const createForm = document.getElementById("createExpedienteFullForm");
    if (createForm) {
      createForm.addEventListener("submit", e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const titulo = (form.get("titulo") || "").trim();
        const cliente = (form.get("cliente") || "Infraestructuras del Norte, S.A.").trim();
        const dest = (form.get("destinatarioFinal") || "").trim();
        const totals = readCreateExpTotals();
        const fechaObj = totals.last; // fecha objetivo del expediente = última entrega
        const presupuesto = totals.budget ? formatEuro(totals.budget) : "En licitación";

        // Recopilar lotes de suministros (cada uno con sus adjuntos)
        const items = document.querySelectorAll("#suministrosContainer .suministro-item");
        const suministrosList = [];
        items.forEach(it => {
          const mat = it.querySelector("select")?.value || "Otros";
          const units = it.querySelector('[name^="suministro_unidades"]')?.value.trim() || "Cantidad según pliego";
          const espec = it.querySelector('[name^="suministro_especificaciones"]')?.value.trim() || "";
          const pres = it.querySelector('[name^="suministro_presupuesto"]')?.value.trim() || "";
          const fechaSum = it.querySelector('[name^="suministro_fecha"]')?.value || "";
          suministrosList.push({
            material: mat,
            unidades: units,
            especificaciones: espec,
            presupuesto: pres,
            fechaObjetivo: fechaSum,
            adjuntos: readCreateAttachments(it.querySelector(".create-attach"))
          });
        });
        const notasExpediente = (form.get("notasExpediente") || "").trim();
        const adjuntosGenerales = readCreateAttachments(document.querySelector('#createExpedienteFullForm .create-attach[data-attach-scope="general"]'));

        const primaryMat = suministrosList[0] ? suministrosList[0].material : "Material Ferroviario";
        const unitsSummary = suministrosList.map(s => s.especificaciones ? `${s.unidades} (${s.especificaciones})` : s.unidades).join(" + ");

        const newYear = new Date().getFullYear(); // año de alta del expediente
        const newId = generateExpedienteId(newYear);

        const isRoleAdmin = activeRole === "admin";
        const todayStr = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");

        // Adjunto de creación → documento de Fase 1 (Alcance). SOFEIN fija la visibilidad al crear;
        // si lo solicita el cliente, queda visible solo para SOFEIN y el cliente hasta que SOFEIN valide.
        const toCreationDoc = (att, scope) => {
          const ext = (att.fileName.split(".").pop() || "").toUpperCase();
          return {
            docId: `DOC-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
            fromCreation: true,
            scope,
            name: att.nombre,
            reqDate: null,
            owner: isRoleAdmin ? "SOFEIN" : "Cliente",
            state: isRoleAdmin ? "complete" : "review",
            format: ext || "Archivo",
            file: att.fileName,
            fileUrl: att.fileUrl,
            date: todayStr,
            visibleTo: att.visibleTo || ["admin", "cliente"],
            notes: "Adjunto de la creación del expediente"
          };
        };
        const generalDocs = adjuntosGenerales.map(a => toCreationDoc(a, "General"));
        const fase2Docs = isRoleAdmin ? [
          { name: "Preselección de 3 Proveedores Homologados", owner: "SOFEIN", state: "review", format: "PDF", file: null, date: "Listo para lanzar" }
        ] : [];

        const newExpediente = {
          id: newId,
          tituloGenerico: titulo || `Suministro ferroviario — ${dest.split("(")[0].trim()}`,
          numSuministros: suministrosList.length || 1,
          proximaEntregaFecha: totals.first ? formatIsoDateEs(totals.first) : "Sin fecha",
          proximaEntregaDiff: "En plazo",
          proximaEntregaTone: "ontime",
          producto: primaryMat,
          tipoMaterial: "Superestructura Ferroviaria",
          subtipo: suministrosList.length > 1 ? `${suministrosList.length} lotes de suministro coordinados` : primaryMat,
          unidades: unitsSummary,
          cliente: cliente,
          destinatarioFinal: dest,
          proveedor: isRoleAdmin ? "Pendiente de matching y cotización" : "Pendiente de asignación por SOFEIN",
          presupuestoTotal: presupuesto,
          notas: notasExpediente,
          faseActual: isRoleAdmin ? 1 : 0, // Admin valida directo a Fase 1 (Apuntes 06); Cliente requiere validación previa
          plazoPactado: isRoleAdmin ? "45 días" : "Pendiente de cotización",
          plazoRealEstimado: isRoleAdmin ? "45 días" : "Pendiente de validación",
          desviacionDias: isRoleAdmin ? "0 días (En plazo)" : "Pendiente de validación SOFEIN",
          estado: isRoleAdmin ? "review" : "pending_validation",
          incidencias: [],
          deliverables: {
            0: [...generalDocs],
            1: fase2Docs.map(d => ({ ...d })),
            2: [], 3: [], 4: [], 5: [], 6: []
          }
        };

        EXPEDIENTES.unshift(newExpediente);

        const isMultiSum = suministrosList.length > 1;
        const newSums = [];
        suministrosList.forEach((s, i) => {
          const nextIndex = SUMINISTROS.length + 1 + i;
          const numStr = String(nextIndex).padStart(2, "0");
          const effectiveDate = s.fechaObjetivo || fechaObj;
          const sumId = `SUM-${numStr}`;
          const sumDocs = s.adjuntos.map(a => toCreationDoc(a, sumId));
          const newSum = {
            id: sumId,
            num: numStr,
            tipo: s.material,
            descripcion: s.especificaciones,
            unidades: s.unidades,
            unidadesNum: parseInt(s.unidades.replace(/\D/g, ""), 10) || 1,
            especificaciones: s.especificaciones,
            presupuesto: s.presupuesto || null,
            adjunto: sumDocs[0] ? sumDocs[0].file : null,
            expId: newId,
            proveedor: "Por determinar",
            cliente: cliente,
            destino: dest,
            ano: 2026,
            faseActual: isRoleAdmin ? 1 : 0,
            faseNombre: isRoleAdmin ? "Fase 2: Cotización" : "Fase 1: Alcance",
            accionesPendientes: isRoleAdmin ? 1 : 0,
            fechaEntrega: effectiveDate ? new Date(effectiveDate).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }) : "10 nov 2026",
            fechaEntregaIso: effectiveDate || "2026-11-10",
            estado: "activo"
          };
          if (isMultiSum) {
            // Con varios suministros, cada uno tiene su propia Documentación: adjuntos generales + los suyos
            newSum.deliverables = {
              0: [...generalDocs.map(d => ({ ...d, visibleTo: [...d.visibleTo] })), ...sumDocs],
              1: fase2Docs.map(d => ({ ...d })),
              2: [], 3: []
            };
          } else {
            newExpediente.deliverables[0].push(...sumDocs);
          }
          newSums.push(newSum);
        });
        SUMINISTROS.unshift(...newSums);

        addExpedienteCambioLog(newExpediente, {
          tipo: "Alta de expediente", suministro: "General", fase: 0,
          titulo: isRoleAdmin ? `SOFEIN crea el expediente para ${cliente}` : `${cliente} solicita el expediente`,
          detalle: `${newSums.length} ${newSums.length === 1 ? "suministro" : "suministros"}: ${newSums.map(x => `${x.id} ${x.tipo}`).join(", ")}`
        });
        if (isRoleAdmin) {
          // El cliente recibe el expediente y debe confirmar que está correcto
          newExpediente.confirmacionCliente = "pendiente";
          pushAutoNotice({
            exp: newExpediente,
            roles: ["cliente"],
            categoria: "Nuevo Expediente",
            titulo: `SOFEIN ha creado el expediente ${newId} para ti`,
            descripcion: `Revisa el expediente "${newExpediente.tituloGenerico}" y confirma que los datos son correctos.`,
            accion: "Confirmar expediente"
          });
          showToast(`✓ Expediente ${newId} creado. El cliente ha recibido un aviso para confirmarlo.`);
          location.hash = `#admin/expedientes/${newId}`;
        } else {
          pushAutoNotice({
            exp: newExpediente,
            roles: ["admin"],
            categoria: "Validación de Expediente",
            titulo: `Solicitud de nuevo expediente (${newId})`,
            descripcion: `${cliente} ha solicitado el expediente "${newExpediente.tituloGenerico}". Revísalo y valídalo.`,
            accion: "Validar expediente"
          });
          showToast(`✓ Solicitud ${newId} enviada a SOFEIN para validación.`);
          location.hash = `#cliente/expedientes/${newId}`;
        }
      });
    }

    // ============================================================
    // PANTALLA 5: REGISTRO DE INCIDENCIAS, MEDIACIÓN Y ADENDAS
    // ============================================================
    // Filtro de estado de incidencias
    document.querySelectorAll("[data-incident-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        incidentStatusFilter = btn.dataset.incidentFilter;
        renderApp();
      });
    });

    // Registro de incidencias y cambios: registrar / editar / eliminar (SOFEIN Admin) y firmar (Cliente o Proveedor)
    document.querySelectorAll("[data-open-reg-modal]").forEach(btn => {
      btn.addEventListener("click", () => openRegistroModal(btn.dataset.openRegModal));
    });
    document.querySelectorAll("[data-reg-edit]").forEach(btn => {
      btn.addEventListener("click", () => openRegistroModal(btn.dataset.expId, btn.dataset.regEdit));
    });
    document.querySelectorAll("[data-reg-delete]").forEach(btn => {
      btn.addEventListener("click", () => openDeleteRegistroModal(btn.dataset.expId, btn.dataset.regDelete));
    });
    document.querySelectorAll("[data-sign-incident-party]").forEach(btn => {
      btn.addEventListener("click", () => openSignIncidentModal(btn.dataset.expId, btn.dataset.incidentId, btn.dataset.signIncidentParty));
    });
    // El cliente confirma el expediente que SOFEIN creó para él
    document.querySelectorAll("[data-confirm-exp]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "cliente") return;
        const exp = getActiveExpediente(btn.dataset.confirmExp);
        if (!exp) return;
        exp.confirmacionCliente = "confirmado";
        exp.confirmacionClienteFecha = todayDocDate();
        addExpedienteCambioLog(exp, { tipo: "Confirmación del cliente", suministro: "Expediente", titulo: `${exp.cliente} confirma el expediente` });
        showToast(`✓ Expediente ${exp.id} confirmado`);
        renderApp();
      });
    });
    document.querySelectorAll("[data-history-filter]").forEach(ctrl => {
      ctrl.addEventListener("change", () => {
        const kind = ctrl.dataset.historyFilter;
        if (kind === "phase") historyPhaseFilter = ctrl.value;
        else if (kind === "sum") historySumFilter = ctrl.value;
        else if (kind === "notes") historyIncludeNotes = ctrl.checked;
        renderApp();
      });
    });
    document.querySelectorAll("[data-open-exp-notice-modal]").forEach(btn => {
      btn.addEventListener("click", () => openEmitExpNoticeModal(btn.dataset.openExpNoticeModal));
    });
    document.querySelectorAll("[data-reg-view-attach]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente(btn.dataset.exp);
        const reg = (exp?.incidencias || []).find(r => r.id === btn.dataset.reg);
        const att = reg?.adjuntos?.[Number(btn.dataset.regViewAttach)];
        if (att) viewDocFile({ name: att.name, file: att.file, fileUrl: att.fileUrl });
      });
    });

    // Ver Documento Oficial de Adenda Consolidada
    document.querySelectorAll("[data-view-addendum]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.viewAddendum;
        const incId = btn.dataset.incidentId;
        openConsolidatedAddendumModal(expId, incId);
      });
    });

    // Modal de Alta en Directorio (Clientes y Proveedores)
    document.querySelectorAll("[data-open-add-dir-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        openAddEntityModal();
      });
    });

    // Filtrado interactivo en Visión Global (gráficos y métricas sin recarga total ni saltos)
    function applyOverviewFilter(target) {
      overviewFilter = overviewFilter === target ? null : target;
      const dynamicWrap = document.getElementById("overviewDynamicContent");
      if (!dynamicWrap) {
        renderApp();
        return;
      }

      // 1. Alternar clases activas en tarjetas métricas
      document.querySelectorAll(".admin-metric[data-overview-filter]").forEach(m => {
        m.classList.toggle("is-active-filter", m.dataset.overviewFilter === overviewFilter);
      });

      // 2. Alternar clases activas en barras del histograma (sin recargar el DOM ni re-disparar barGrow)
      document.querySelectorAll(".admin-histogram-bars article[data-overview-filter]").forEach(a => {
        a.classList.toggle("is-active-filter", a.dataset.overviewFilter === overviewFilter);
      });

      // 3. Reemplazar únicamente el bloque inferior dinámico con animación suave en fade
      dynamicWrap.innerHTML = getOverviewFilterHTML(overviewFilter);

      // 4. Vincular el botón de limpiar filtro si se renderizó
      dynamicWrap.querySelectorAll("[data-clear-overview-filter]").forEach(btn => {
        btn.addEventListener("click", () => applyOverviewFilter(null));
      });
    }

    document.querySelectorAll("[data-overview-filter]").forEach(el => {
      el.addEventListener("click", () => {
        applyOverviewFilter(el.dataset.overviewFilter);
      });
    });

    document.querySelectorAll("[data-clear-overview-filter]").forEach(el => {
      el.addEventListener("click", () => {
        applyOverviewFilter(null);
      });
    });

    // Buscador en directo de Expedientes
    const searchInput = document.getElementById("expSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        expSearchQuery = e.target.value;
        const pos = e.target.selectionStart || expSearchQuery.length;
        renderApp();
        const newInput = document.getElementById("expSearchInput");
        if (newInput) {
          newInput.focus();
          try { newInput.setSelectionRange(pos, pos); } catch (_) {}
        }
      });
    }

    document.getElementById("clearExpSearchBtn")?.addEventListener("click", () => {
      expSearchQuery = "";
      renderApp();
    });

    // Filtros KPI clicables en Expedientes (Activos, Acción pendiente, Completados, Cerrados)
    document.querySelectorAll("[data-exp-kpi]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const kpi = btn.dataset.expKpi;
        expKpiFilter = expKpiFilter === kpi ? "all" : kpi;
        renderApp();
      });
    });

    // Selectores de filtro por datos de la tarjeta de expediente
    document.querySelectorAll("[data-exp-card-filter]").forEach(sel => {
      sel.addEventListener("change", e => {
        const field = sel.dataset.expCardFilter;
        if (field && field in expCardFilters) {
          expCardFilters[field] = e.target.value;
          renderApp();
        }
      });
    });

    // Botón para limpiar todos los filtros de expedientes
    document.querySelectorAll("[data-reset-exp-filters]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        expKpiFilter = "all";
        expSearchQuery = "";
        expCardFilters = {
          fase: "all",
          cliente: "all",
          destino: "all",
          entrega: "all",
          presupuesto: "all"
        };
        renderApp();
      });
    });

    // Selectores de Filtro en Suministros (Cabeceras de tabla TH y selectores legacy)
    document.querySelectorAll("[data-th-filter], [data-suministro-filter]").forEach(sel => {
      sel.addEventListener("change", (e) => {
        e.stopPropagation();
        const key = sel.dataset.thFilter || sel.dataset.suministroFilter;
        if (key && suministrosFilters.hasOwnProperty(key)) {
          suministrosFilters[key] = sel.value;
          renderApp();
        }
      });
      sel.addEventListener("mousedown", (e) => e.stopPropagation());
      sel.addEventListener("click", (e) => e.stopPropagation());
    });

    // Botones de restablecer/limpiar filtros en Suministros
    document.querySelectorAll("[data-reset-suministros-filters]").forEach(btn => {
      btn.addEventListener("click", () => {
        suministrosFilters = {
          suministro: "all",
          tipo: "all",
          descripcion: "all",
          unidades: "all",
          expediente: "all",
          proveedor: "all",
          cliente: "all",
          destino: "all",
          ano: "all",
          fase: "all",
          acciones: "all",
          fechaEntrega: "all"
        };
        suministrosSearchQuery = "";
        renderApp();
      });
    });

    // Toggle Popover Gestor de Columnas
    const btnToggleCols = document.getElementById("btnToggleColsMenu");
    if (btnToggleCols) {
      btnToggleCols.addEventListener("click", (e) => {
        e.stopPropagation();
        isColsMenuOpen = !isColsMenuOpen;
        const popover = document.getElementById("suministrosColsPopover");
        if (popover) {
          popover.hidden = !isColsMenuOpen;
          btnToggleCols.setAttribute("aria-expanded", String(isColsMenuOpen));
        }
      });
    }

    // Ocultar/Mostrar Columnas con Checkbox
    document.querySelectorAll("[data-col-toggle]").forEach(chk => {
      chk.addEventListener("change", () => {
        const colId = chk.dataset.colToggle;
        if (!chk.checked) {
          const visibleCount = suministrosColumnOrder.filter(c => !suministrosHiddenCols.has(c)).length;
          if (visibleCount <= 1) {
            showToast("Al menos una columna debe permanecer visible");
            chk.checked = true;
            return;
          }
          suministrosHiddenCols.add(colId);
        } else {
          suministrosHiddenCols.delete(colId);
        }
        saveSuministrosColPrefs();
        renderApp();
      });
    });

    // Reordenar Columnas con Botones Arriba/Abajo
    document.querySelectorAll("[data-col-move]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dir = btn.dataset.colMove;
        const colId = btn.dataset.colId;
        const idx = suministrosColumnOrder.indexOf(colId);
        if (idx === -1) return;

        if (dir === "up" && idx > 0) {
          const temp = suministrosColumnOrder[idx - 1];
          suministrosColumnOrder[idx - 1] = colId;
          suministrosColumnOrder[idx] = temp;
          saveSuministrosColPrefs();
          renderApp();
        } else if (dir === "down" && idx < suministrosColumnOrder.length - 1) {
          const temp = suministrosColumnOrder[idx + 1];
          suministrosColumnOrder[idx + 1] = colId;
          suministrosColumnOrder[idx] = temp;
          saveSuministrosColPrefs();
          renderApp();
        }
      });
    });

    // Botón hover de ocultar columna directa desde cabecera TH
    document.querySelectorAll("[data-hide-col]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const colId = btn.dataset.hideCol;
        const colDef = ALL_SUMINISTROS_COL_DEFS[colId] || { label: colId };
        const visibleCount = suministrosColumnOrder.filter(c => !suministrosHiddenCols.has(c)).length;
        if (visibleCount <= 1) {
          showToast("Al menos una columna debe permanecer visible");
          return;
        }
        suministrosHiddenCols.add(colId);
        saveSuministrosColPrefs();
        showToast(`Columna "${colDef.label}" ocultada. Puedes reactivarla desde "Columnas".`);
        renderApp();
      });
    });

    // Restablecer Columnas a Valores por Defecto (respetando las 4 ocultas para evitar scroll)
    const btnResetCols = document.getElementById("btnResetColsConfig");
    if (btnResetCols) {
      btnResetCols.addEventListener("click", (e) => {
        e.stopPropagation();
        suministrosColumnOrder = [...DEFAULT_SUMINISTROS_COL_ORDER];
        suministrosHiddenCols = new Set(DEFAULT_SUMINISTROS_HIDDEN_COLS);
        saveSuministrosColPrefs();
        showToast("Columnas restablecidas al orden y visibilidad por defecto");
        renderApp();
      });
    }

    // Exportar suministros visibles a Excel (CSV ; con BOM UTF-8)
    document.getElementById("btnExportSuministrosExcel")?.addEventListener("click", (e) => {
      e.stopPropagation();
      exportSuministrosCSV();
    });

    // Mantener estado del bloque colapsado de suministros finalizados
    const closedBlock = document.getElementById("suministrosClosedBlock");
    if (closedBlock) {
      closedBlock.addEventListener("toggle", () => {
        isClosedTableOpen = closedBlock.open;
      });
    }

    // Drag and Drop & Ordenación en Cabeceras de Suministros
    let draggedColId = null;
    let isDraggingColumn = false;

    document.querySelectorAll(".suministros-th[draggable]").forEach(th => {
      th.addEventListener("dragstart", (e) => {
        if (
          e.target.closest(".suministros-th-filter-wrap") ||
          e.target.closest(".suministros-th-filter-select") ||
          e.target.closest("[data-th-filter]") ||
          e.target.closest("[data-hide-col]") ||
          e.target.closest("select") ||
          e.target.closest("button")
        ) {
          e.preventDefault();
          return;
        }

        draggedColId = th.dataset.colId;
        isDraggingColumn = true;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", draggedColId);
        th.classList.add("is-dragging");
      });

      th.addEventListener("dragend", () => {
        th.classList.remove("is-dragging");
        document.querySelectorAll(".suministros-th").forEach(t => t.classList.remove("drag-over-left", "drag-over-right"));
        setTimeout(() => { isDraggingColumn = false; }, 80);
      });

      th.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const targetId = th.dataset.colId;
        if (!draggedColId || targetId === draggedColId) return;

        const rect = th.getBoundingClientRect();
        const isLeft = e.clientX < rect.left + rect.width / 2;
        if (isLeft) {
          th.classList.add("drag-over-left");
          th.classList.remove("drag-over-right");
        } else {
          th.classList.add("drag-over-right");
          th.classList.remove("drag-over-left");
        }
      });

      th.addEventListener("dragleave", () => {
        th.classList.remove("drag-over-left", "drag-over-right");
      });

      th.addEventListener("drop", (e) => {
        e.preventDefault();
        th.classList.remove("drag-over-left", "drag-over-right");
        const targetId = th.dataset.colId;
        if (!draggedColId || !targetId || draggedColId === targetId) return;

        const rect = th.getBoundingClientRect();
        const isInsertAfter = e.clientX >= rect.left + rect.width / 2;

        const fromIdx = suministrosColumnOrder.indexOf(draggedColId);
        if (fromIdx === -1) return;
        suministrosColumnOrder.splice(fromIdx, 1);

        let toIdx = suministrosColumnOrder.indexOf(targetId);
        if (toIdx === -1) toIdx = suministrosColumnOrder.length;
        if (isInsertAfter) toIdx += 1;

        suministrosColumnOrder.splice(toIdx, 0, draggedColId);
        saveSuministrosColPrefs();
        renderApp();
      });

      // Clic para ordenar columna (solo si no se estaba arrastrando ni pulsando controles)
      th.addEventListener("click", (e) => {
        if (isDraggingColumn) return;
        if (
          e.target.closest(".suministros-th-drag-grip") ||
          e.target.closest("[data-hide-col]") ||
          e.target.closest(".suministros-th-filter-wrap") ||
          e.target.closest(".suministros-th-filter-select") ||
          e.target.closest("[data-th-filter]") ||
          e.target.closest("select") ||
          e.target.closest("button")
        ) {
          return;
        }

        const col = th.dataset.colId;
        if (!col) return;

        if (suministrosSortCol === col) {
          suministrosSortDir = suministrosSortDir === "asc" ? "desc" : "asc";
        } else {
          suministrosSortCol = col;
          suministrosSortDir = "asc";
        }
        renderApp();
      });
    });

    // Cerrar menú de columnas al hacer clic fuera
    document.addEventListener("click", (e) => {
      const wrap = document.getElementById("suministrosColsWrap");
      const popover = document.getElementById("suministrosColsPopover");
      if (wrap && popover && !popover.hidden) {
        if (!wrap.contains(e.target)) {
          isColsMenuOpen = false;
          popover.hidden = true;
          document.getElementById("btnToggleColsMenu")?.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Buscador en directo de Suministros
    const sumSearchInput = document.getElementById("suministrosSearchInput");
    if (sumSearchInput) {
      sumSearchInput.addEventListener("input", e => {
        suministrosSearchQuery = e.target.value;
        renderApp();
        const inputNow = document.getElementById("suministrosSearchInput");
        if (inputNow) {
          inputNow.focus();
          const len = inputNow.value.length;
          inputNow.setSelectionRange(len, len);
        }
      });
    }

    const clearSumSearchBtn = document.getElementById("clearSuministrosSearchBtn");
    if (clearSumSearchBtn) {
      clearSumSearchBtn.addEventListener("click", () => {
        suministrosSearchQuery = "";
        renderApp();
      });
    }

    // Agrupación en Avisos
    document.querySelectorAll("[data-group-avisos]").forEach(btn => {
      btn.addEventListener("click", () => {
        avisosGroup = btn.dataset.groupAvisos;
        renderApp();
      });
    });

    // Ordenación por columnas en Avisos
    document.querySelectorAll("[data-sort-aviso]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.sortAviso;
        if (avisosSortCol === col) {
          avisosSortDir = avisosSortDir === "asc" ? "desc" : "asc";
        } else {
          avisosSortCol = col;
          avisosSortDir = col === "fecha" ? "desc" : "asc";
        }
        renderApp();
      });
    });

    // Completar y Reabrir Avisos
    document.querySelectorAll("[data-complete-notice], [data-dismiss-notice]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const id = btn.dataset.completeNotice || btn.dataset.dismissNotice;
        completedNotices.add(id);
        showToast(`Aviso ${id} completado`);
        renderApp();
      });
    });

    document.querySelectorAll("[data-restore-notice]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const id = btn.dataset.restoreNotice;
        completedNotices.delete(id);
        showToast(`Aviso ${id} reabierto`);
        renderApp();
      });
    });

    // Modo Tabla / Mosaico en Directorio de Clientes y Proveedores
    document.querySelectorAll("[data-dir-mode]").forEach(btn => {
      btn.addEventListener("click", () => {
        directorioViewMode = btn.dataset.dirMode;
        renderApp();
      });
    });

    // Exportar listado de Directorio visible a Excel (CSV con BOM UTF-8)
    document.getElementById("btnExportDirectorioExcel")?.addEventListener("click", (e) => {
      e.stopPropagation();
      exportDirectorioCSV();
    });

    // Filtros de Tipo en Directorio (Todos, Proveedores, Clientes)
    document.querySelectorAll("[data-dir-type]").forEach(btn => {
      btn.addEventListener("click", () => {
        directorioTypeFilter = btn.dataset.dirType;
        renderApp();
      });
    });

    // Menú Popover de Columnas en Directorio
    const btnToggleDirCols = document.getElementById("btnToggleDirColsMenu");
    if (btnToggleDirCols) {
      btnToggleDirCols.addEventListener("click", (e) => {
        e.stopPropagation();
        isDirColsMenuOpen = !isDirColsMenuOpen;
        const popover = document.getElementById("directorioColsPopover");
        if (popover) {
          popover.hidden = !isDirColsMenuOpen;
          btnToggleDirCols.setAttribute("aria-expanded", String(isDirColsMenuOpen));
        }
      });
    }

    // Cerrar menú de columnas de Directorio al hacer clic fuera
    document.addEventListener("click", (e) => {
      const wrap = document.getElementById("directorioColsWrap");
      const popover = document.getElementById("directorioColsPopover");
      if (wrap && popover && !popover.hidden) {
        if (!wrap.contains(e.target)) {
          isDirColsMenuOpen = false;
          popover.hidden = true;
          document.getElementById("btnToggleDirColsMenu")?.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Selector Proveedor / Cliente dentro del Popover de Columnas en modo 'Todos'
    document.querySelectorAll("[data-dir-pop-entity]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        directorioPopoverEntity = btn.dataset.dirPopEntity;
        renderApp();
      });
    });

    // Ocultar/Mostrar Columnas de Directorio con Checkbox
    document.querySelectorAll("[data-dir-col-toggle]").forEach(chk => {
      chk.addEventListener("change", () => {
        const colId = chk.dataset.dirColToggle;
        const popEntity = chk.dataset.popoverEntity;
        const isCli = popEntity ? popEntity === "cliente" : (directorioTypeFilter === "clientes");
        const activeOrder = isCli ? dirCliColOrder : dirPrvColOrder;
        const activeHidden = isCli ? dirCliHiddenCols : dirPrvHiddenCols;

        if (!chk.checked) {
          const visibleCount = activeOrder.filter(c => !activeHidden.has(c)).length;
          if (visibleCount <= 1) {
            showToast("Al menos una columna debe permanecer visible");
            chk.checked = true;
            return;
          }
          activeHidden.add(colId);
        } else {
          activeHidden.delete(colId);
        }
        saveDirColPrefs();
        renderApp();
      });
    });

    // Reordenar Columnas de Directorio con Flechas
    document.querySelectorAll("[data-dir-col-move]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dir = btn.dataset.dirColMove;
        const colId = btn.dataset.colId;
        const popEntity = btn.dataset.popoverEntity;
        const isCli = popEntity ? popEntity === "cliente" : (directorioTypeFilter === "clientes");
        const activeOrder = isCli ? dirCliColOrder : dirPrvColOrder;
        const idx = activeOrder.indexOf(colId);
        if (idx === -1) return;

        if (dir === "up" && idx > 0) {
          const temp = activeOrder[idx - 1];
          activeOrder[idx - 1] = colId;
          activeOrder[idx] = temp;
          saveDirColPrefs();
          renderApp();
        } else if (dir === "down" && idx < activeOrder.length - 1) {
          const temp = activeOrder[idx + 1];
          activeOrder[idx + 1] = colId;
          activeOrder[idx] = temp;
          saveDirColPrefs();
          renderApp();
        }
      });
    });

    // Ocultar columna directa desde cabecera (botón hover ojo tachado)
    document.querySelectorAll("[data-hide-dir-col]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const colId = btn.dataset.hideDirCol;
        const entity = btn.dataset.dirEntity;
        const isCli = entity === "cliente";
        const activeOrder = isCli ? dirCliColOrder : dirPrvColOrder;
        const activeHidden = isCli ? dirCliHiddenCols : dirPrvHiddenCols;
        const colDef = (isCli ? ALL_DIR_CLI_COL_DEFS : ALL_DIR_PRV_COL_DEFS)[colId] || { label: colId };

        const visibleCount = activeOrder.filter(c => !activeHidden.has(c)).length;
        if (visibleCount <= 1) {
          showToast("Al menos una columna debe permanecer visible");
          return;
        }
        activeHidden.add(colId);
        saveDirColPrefs();
        showToast(`Columna "${colDef.label}" ocultada. Puedes reactivarla desde "Columnas".`);
        renderApp();
      });
    });

    // Restablecer Columnas de Directorio por Defecto
    const btnResetDirCols = document.getElementById("btnResetDirColsConfig");
    if (btnResetDirCols) {
      btnResetDirCols.addEventListener("click", (e) => {
        e.stopPropagation();
        dirPrvColOrder = [...DEFAULT_DIR_PRV_COL_ORDER];
        dirPrvHiddenCols.clear();
        dirCliColOrder = [...DEFAULT_DIR_CLI_COL_ORDER];
        dirCliHiddenCols.clear();
        saveDirColPrefs();
        showToast("Columnas de directorio restablecidas al orden y visibilidad por defecto");
        renderApp();
      });
    }

    // Drag and Drop & Ordenación en Cabeceras de Directorio
    let draggedDirColId = null;
    let draggedDirEntity = null;
    let isDraggingDirColumn = false;

    document.querySelectorAll(".b2b-dir-table th.is-sortable[draggable]").forEach(th => {
      th.addEventListener("dragstart", (e) => {
        draggedDirColId = th.dataset.dirColId;
        draggedDirEntity = th.dataset.dirEntity;
        isDraggingDirColumn = true;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", draggedDirColId);
        th.classList.add("is-dragging");
      });

      th.addEventListener("dragend", () => {
        th.classList.remove("is-dragging");
        document.querySelectorAll(".b2b-dir-table th").forEach(t => t.classList.remove("drag-over-left", "drag-over-right"));
        setTimeout(() => { isDraggingDirColumn = false; }, 80);
      });

      th.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const targetId = th.dataset.dirColId;
        const targetEntity = th.dataset.dirEntity;
        if (!draggedDirColId || targetId === draggedDirColId || targetEntity !== draggedDirEntity) return;

        const rect = th.getBoundingClientRect();
        const isLeft = e.clientX < rect.left + rect.width / 2;
        if (isLeft) {
          th.classList.add("drag-over-left");
          th.classList.remove("drag-over-right");
        } else {
          th.classList.add("drag-over-right");
          th.classList.remove("drag-over-left");
        }
      });

      th.addEventListener("dragleave", () => {
        th.classList.remove("drag-over-left", "drag-over-right");
      });

      th.addEventListener("drop", (e) => {
        e.preventDefault();
        th.classList.remove("drag-over-left", "drag-over-right");
        const targetId = th.dataset.dirColId;
        const targetEntity = th.dataset.dirEntity;
        if (!draggedDirColId || !targetId || draggedDirColId === targetId || targetEntity !== draggedDirEntity) return;

        const isCli = targetEntity === "cliente";
        const activeOrder = isCli ? dirCliColOrder : dirPrvColOrder;

        const rect = th.getBoundingClientRect();
        const isInsertAfter = e.clientX >= rect.left + rect.width / 2;

        const fromIdx = activeOrder.indexOf(draggedDirColId);
        if (fromIdx === -1) return;
        activeOrder.splice(fromIdx, 1);

        let toIdx = activeOrder.indexOf(targetId);
        if (toIdx === -1) toIdx = activeOrder.length;
        if (isInsertAfter) toIdx += 1;

        activeOrder.splice(toIdx, 0, draggedDirColId);
        saveDirColPrefs();
        renderApp();
      });

      // Clic para ordenar columna (solo si no se estaba arrastrando)
      th.addEventListener("click", (e) => {
        if (isDraggingDirColumn) return;
        if (e.target.closest(".dir-th-drag-grip") || e.target.closest("[data-hide-dir-col]")) return;

        if (th.dataset.sortDirPrv) {
          const col = th.dataset.sortDirPrv;
          if (directorioPrvSortCol === col) {
            directorioPrvSortDir = directorioPrvSortDir === "asc" ? "desc" : "asc";
          } else {
            directorioPrvSortCol = col;
            directorioPrvSortDir = "asc";
          }
          renderApp();
        } else if (th.dataset.sortDirCli) {
          const col = th.dataset.sortDirCli;
          if (directorioCliSortCol === col) {
            directorioCliSortDir = directorioCliSortDir === "asc" ? "desc" : "asc";
          } else {
            directorioCliSortCol = col;
            directorioCliSortDir = "asc";
          }
          renderApp();
        }
      });
    });

    // Buscador en directo de Directorio (manteniendo el foco y posición del cursor)
    const dirSearchInput = document.getElementById("directorioSearchInput");
    if (dirSearchInput) {
      dirSearchInput.addEventListener("input", e => {
        directorioSearchQuery = e.target.value;
        const pos = e.target.selectionStart || directorioSearchQuery.length;
        renderApp();
        const newInput = document.getElementById("directorioSearchInput");
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(pos, pos);
        }
      });
    }

    const clearDirSearchBtn = document.getElementById("clearDirectorioSearchBtn");
    if (clearDirSearchBtn) {
      clearDirSearchBtn.addEventListener("click", () => {
        directorioSearchQuery = "";
        renderApp();
      });
    }

    // Botones de Editar en Directorio
    document.querySelectorAll("[data-edit-dir]").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.editDir;
        const id = btn.dataset.id;
        const entity = type === "proveedor" 
          ? DIRECTORIO_PROVEEDORES.find(p => p.id === id)
          : DIRECTORIO_CLIENTES.find(c => c.id === id);
        if (entity) {
          openAddOrEditEntityModal(entity, type);
        }
      });
    });

    /* ---------- Eventos del Selector de Proveedores (por suministro) ---------- */
    const selCtx = el => {
      const exp = getActiveExpediente(el.dataset.expId);
      const sum = SUMINISTROS.find(s => s.id === el.dataset.sumId) || null;
      return { exp, sum, matching: ensureSuministroMatching(exp, sum), ruta: `selector/${exp.id}${sum ? `?sum=${sum.id}` : ""}`, sumRef: sum ? sum.id : "General", sumLabel: sum ? `${sum.id} (${sum.tipo})` : exp.id };
    };
    const selLog = (c, titulo, detalle = "") => addExpedienteCambioLog(c.exp, { tipo: "Selección de proveedores", suministro: c.sumRef, fase: 1, titulo, detalle });

    // Navegación entre pasos (solo consulta; el estado avanza con los botones de cada paso)
    document.querySelectorAll("[data-switch-selector-step]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole === "cliente" && btn.dataset.switchSelectorStep === "preseleccion") return;
        selectorViewStep = btn.dataset.switchSelectorStep;
        renderApp();
      });
    });

    // 1. Búsqueda: SOFEIN marca los proveedores a incluir
    document.querySelectorAll("[data-preselect-prv]").forEach(chk => {
      chk.addEventListener("change", e => {
        const c = selCtx(chk);
        const set = new Set(c.matching.proveedoresPreseleccionadosPorAdmin);
        e.target.checked ? set.add(chk.dataset.preselectPrv) : set.delete(chk.dataset.preselectPrv);
        c.matching.proveedoresPreseleccionadosPorAdmin = Array.from(set);
        renderApp();
      });
    });

    document.getElementById("approvePreselectionBtn")?.addEventListener("click", e => {
      const c = selCtx(e.currentTarget);
      const m = c.matching;
      if (!m.proveedoresPreseleccionadosPorAdmin.length) {
        showToast("⚠️ Incluye al menos un proveedor");
        return;
      }
      m.faseSelector = "seleccion_cliente";
      selectorViewStep = null;
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["cliente"],
        categoria: "Selección de Proveedores",
        titulo: `SOFEIN te propone ${m.proveedoresPreseleccionadosPorAdmin.length} proveedores para ${c.sumLabel}`,
        descripcion: "Preselecciona a qué proveedores quieres pedir cotización.",
        accion: "Preseleccionar proveedores", ruta: c.ruta
      });
      selLog(c, `SOFEIN valida la búsqueda: ${m.proveedoresPreseleccionadosPorAdmin.length} proveedores para ${c.sumLabel}`);
      showToast("✓ Búsqueda validada. El cliente ha recibido aviso para preseleccionar.");
      renderApp();
    });

    // 2. Preselección: el cliente (o SOFEIN en su nombre) marca a quién pedir cotización
    document.querySelectorAll("[data-client-select-prv]").forEach(chk => {
      chk.addEventListener("change", e => {
        const c = selCtx(chk);
        const set = new Set(c.matching.proveedoresSeleccionadosPorCliente);
        e.target.checked ? set.add(chk.dataset.clientSelectPrv) : set.delete(chk.dataset.clientSelectPrv);
        c.matching.proveedoresSeleccionadosPorCliente = Array.from(set);
        renderApp();
      });
    });

    document.getElementById("requestClientQuotesBtn")?.addEventListener("click", e => {
      const c = selCtx(e.currentTarget);
      const m = c.matching;
      if (!m.proveedoresSeleccionadosPorCliente.length) {
        showToast("⚠️ Marca al menos un proveedor al que pedir cotización");
        return;
      }
      m.seleccionClienteEnviada = true;
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["admin"],
        categoria: "Selección de Proveedores",
        titulo: `El cliente ha preseleccionado ${m.proveedoresSeleccionadosPorCliente.length} proveedores (${c.sumLabel})`,
        descripcion: "Confirma la preselección y solicita las ofertas.",
        accion: "Confirmar preselección", ruta: c.ruta
      });
      selLog(c, `El cliente preselecciona ${m.proveedoresSeleccionadosPorCliente.length} proveedores para ${c.sumLabel}`);
      showToast("✓ Preselección enviada a SOFEIN.");
      renderApp();
    });

    // SOFEIN confirma la preselección y pide las ofertas
    document.getElementById("emitRfqOrdersBtn")?.addEventListener("click", e => {
      const c = selCtx(e.currentTarget);
      const m = c.matching;
      if (!m.proveedoresSeleccionadosPorCliente.length) {
        showToast("⚠️ No hay proveedores preseleccionados");
        return;
      }
      m.proveedoresSeleccionadosPorCliente.forEach(pId => {
        if (!m.cotizaciones[pId]) {
          const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === pId);
          if (prv) m.cotizaciones[pId] = emptyQuote(prv);
        }
      });
      m.seleccionClienteEnviada = true;
      m.faseSelector = "peticion_cotizaciones";
      selectorViewStep = null;
      if (m.proveedoresSeleccionadosPorCliente.includes(SELECTOR_MY_PROVIDER_ID)) {
        pushAutoNotice({
          exp: c.exp, sumId: c.sum?.id || null, roles: ["proveedor"],
          categoria: "Cotización",
          titulo: `SOFEIN te pide cotización para ${c.sumLabel}`,
          descripcion: `Expediente ${c.exp.id} · ${c.sum ? `${c.sum.unidades} uds · entrega objetivo ${c.sum.fechaEntrega}` : ""}`,
          accion: "Presentar oferta", ruta: c.ruta
        });
      }
      selLog(c, `SOFEIN confirma la preselección y pide oferta a ${m.proveedoresSeleccionadosPorCliente.length} proveedores (${c.sumLabel})`);
      showToast(`✓ Ofertas solicitadas a ${m.proveedoresSeleccionadosPorCliente.length} proveedores.`);
      renderApp();
    });

    // Demo: simular que responden los proveedores pendientes
    document.getElementById("simulateAllQuotesBtn")?.addEventListener("click", e => {
      const c = selCtx(e.currentTarget);
      const m = c.matching;
      m.proveedoresSeleccionadosPorCliente.forEach((pId, idx) => {
        if (getQuoteEstado(m, pId) === "pendiente") {
          const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === pId);
          if (prv) m.cotizaciones[pId] = { ...buildDemoQuote(prv, c.sum, idx), fechaEnvio: "Hoy, ahora" };
        }
      });
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["admin"],
        categoria: "Cotización",
        titulo: `Ofertas recibidas para ${c.sumLabel}`,
        descripcion: "Valida las cotizaciones para que el cliente pueda compararlas.",
        accion: "Validar cotizaciones", ruta: c.ruta
      });
      selLog(c, `Ofertas recibidas para ${c.sumLabel} (simulación)`);
      showToast("✓ Ofertas recibidas. Pendientes de validación por SOFEIN.");
      renderApp();
    });

    // Precio total en vivo (precio unitario × unidades)
    const unitInput = document.getElementById("quoteUnitPrice");
    const totalInput = document.getElementById("quoteTotalPrice");
    if (unitInput && totalInput) {
      const syncTotal = () => {
        const unit = parseFloat(unitInput.value);
        totalInput.value = unit > 0 ? formatEuro(unit * Number(totalInput.dataset.units || 1)) : "";
      };
      unitInput.addEventListener("input", syncTotal);
    }

    // 3. El proveedor envía o actualiza su oferta
    document.getElementById("providerQuoteForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const c = selCtx(form);
      const m = c.matching;
      const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === SELECTOR_MY_PROVIDER_ID);
      const unit = parseFloat(document.getElementById("quoteUnitPrice")?.value);
      const validez = parseInt(document.getElementById("quoteValidity")?.value, 10);
      if (!(unit > 0)) return;
      if (!(validez >= QUOTE_MIN_VALIDEZ_DIAS)) {
        showToast(`⚠️ La validez mínima de la oferta es de ${QUOTE_MIN_VALIDEZ_DIAS} días naturales`);
        return;
      }
      const units = getSumUnidadesNum(c.sum);
      const isUpdate = getQuoteEstado(m, SELECTOR_MY_PROVIDER_ID) === "enviada";
      const now = new Date();
      m.cotizaciones[SELECTOR_MY_PROVIDER_ID] = {
        proveedorId: prv.id,
        nombre: prv.nombre,
        cif: prv.cif,
        sede: prv.sede,
        precioUnitario: Math.round(unit * 100) / 100,
        precioTotal: Math.round(unit * units * 100) / 100,
        fechaEntregaIso: document.getElementById("quoteDeliveryDate")?.value || c.sum?.fechaEntregaIso || "",
        condicionesPago: document.getElementById("quotePaymentCond")?.value || prv.condicionesPago,
        validezDias: validez,
        conformidades: Array.from(form.querySelectorAll('input[name="quoteConf"]:checked')).map(i => i.value),
        estado: "enviada",
        fechaEnvio: `${now.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }).replace(/\./g, "")}, ${now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`
      };
      const q = m.cotizaciones[SELECTOR_MY_PROVIDER_ID];
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["admin"],
        categoria: "Cotización",
        titulo: `${prv.nombre} ha ${isUpdate ? "actualizado" : "enviado"} su cotización (${c.sumLabel})`,
        descripcion: `${formatEuro(q.precioTotal)} · entrega ${formatIsoDateEs(q.fechaEntregaIso)}. Valídala para que el cliente pueda compararla.`,
        accion: "Validar cotización", ruta: c.ruta
      });
      selLog(c, `${prv.nombre} ${isUpdate ? "actualiza" : "envía"} su cotización: ${formatEuro(q.precioTotal)}`, `Entrega ${formatIsoDateEs(q.fechaEntregaIso)} · ${q.condicionesPago} · validez ${q.validezDias} días`);
      showToast(`✓ Cotización ${isUpdate ? "actualizada" : "enviada"} a SOFEIN.`);
      renderApp();
    });

    // SOFEIN valida las ofertas → el cliente pasa a 4. Selección
    document.getElementById("goToComparisonBtn")?.addEventListener("click", e => {
      if (activeRole !== "admin") return;
      const c = selCtx(e.currentTarget);
      c.matching.faseSelector = "comparativa";
      selectorViewStep = null;
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["cliente"],
        categoria: "Cotización",
        titulo: `Ofertas disponibles para ${c.sumLabel}`,
        descripcion: "SOFEIN ha validado las ofertas. Compáralas y elige proveedor.",
        accion: "Elegir proveedor", ruta: c.ruta
      });
      selLog(c, `SOFEIN valida las ofertas de ${c.sumLabel} y las muestra al cliente`);
      showToast("✓ Ofertas validadas. El cliente ya puede compararlas.");
      renderApp();
    });

    // 4. El cliente elige proveedor y los requisitos exigibles
    document.querySelectorAll("[data-select-winning-prv]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "cliente") return;
        const c = selCtx(btn);
        const m = c.matching;
        m.proveedorAdjudicado = btn.dataset.selectWinningPrv;
        const q = Object.values(m.cotizaciones).find(x => x.nombre === m.proveedorAdjudicado);
        m.requisitosExigidosCliente = [...(q?.conformidades || [])];
        renderApp();
      });
    });

    document.querySelectorAll("[data-req-exigible-check]").forEach(chk => {
      chk.addEventListener("change", e => {
        const c = selCtx(chk);
        const set = new Set(c.matching.requisitosExigidosCliente);
        e.target.checked ? set.add(chk.dataset.reqExigibleCheck) : set.delete(chk.dataset.reqExigibleCheck);
        c.matching.requisitosExigidosCliente = Array.from(set);
      });
    });

    document.getElementById("confirmAwardBtn")?.addEventListener("click", e => {
      const c = selCtx(e.currentTarget);
      const m = c.matching;
      if (!m.proveedorAdjudicado) {
        showToast("⚠️ Elige primero un proveedor");
        return;
      }
      m.adjudicacionConfirmadaCliente = true;
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["admin"],
        categoria: "Adjudicación",
        titulo: `El cliente ha elegido a ${m.proveedorAdjudicado} (${c.sumLabel})`,
        descripcion: `Requisitos exigidos: ${(m.requisitosExigidosCliente || []).join(", ") || "ninguno"}. Valida la adjudicación.`,
        accion: "Validar adjudicación", ruta: c.ruta
      });
      selLog(c, `El cliente elige a ${m.proveedorAdjudicado} para ${c.sumLabel}`, `Requisitos: ${(m.requisitosExigidosCliente || []).join(", ") || "ninguno"}`);
      showToast(`✓ Adjudicación a ${m.proveedorAdjudicado} enviada a SOFEIN.`);
      renderApp();
    });

    // SOFEIN valida la adjudicación: el suministro pasa a Gestión del pedido con el proveedor elegido
    document.getElementById("formalizePedidoBtn")?.addEventListener("click", e => {
      if (activeRole !== "admin") return;
      const c = selCtx(e.currentTarget);
      const m = c.matching;
      if (!m.proveedorAdjudicado || !m.adjudicacionConfirmadaCliente) return;
      const q = Object.values(m.cotizaciones).find(x => x.nombre === m.proveedorAdjudicado);
      m.faseSelector = "adjudicado";
      selectorViewStep = null;
      if (c.sum) {
        c.sum.proveedor = m.proveedorAdjudicado;
        c.sum.faseActual = Math.max(c.sum.faseActual ?? 0, 2);
        c.sum.faseNombre = `3. ${PHASES[2].name}`;
        if (q) {
          c.sum.presupuesto = formatEuro(q.precioTotal);
          if (q.fechaEntregaIso) {
            c.sum.fechaEntregaIso = q.fechaEntregaIso;
            c.sum.fechaEntrega = formatIsoDateEs(q.fechaEntregaIso);
          }
        }
        const map = getSumDelivMap(c.exp, c.sum);
        if (!map[2]) map[2] = [];
        map[2].push({ name: `Hoja de Pedido · ${c.sum.id} · ${m.proveedorAdjudicado}`, reqDate: null, owner: "SOFEIN", uploadedBy: "SOFEIN", state: "review", format: "PDF", file: `Hoja-Pedido-${c.exp.id}-${c.sum.id}.pdf`, date: todayDocDate(), visibleTo: ["admin", "cliente", "proveedor"], notes: `Requisitos: ${(m.requisitosExigidosCliente || []).join(", ") || "—"}` });
        activeDossierSuministroId = c.sum.id;
      }
      const expSums = SUMINISTROS.filter(s => s.expId === c.exp.id);
      c.exp.faseActual = Math.max(c.exp.faseActual ?? 0, ...expSums.map(s => s.faseActual ?? 0));
      if (expSums.length <= 1) c.exp.proveedor = m.proveedorAdjudicado;
      activeDossierPhase = 2;

      if (/iberrail/i.test(m.proveedorAdjudicado || "")) {
        pushAutoNotice({
          exp: c.exp, sumId: c.sum?.id || null, roles: ["proveedor"],
          categoria: "Formalización",
          titulo: `Tu oferta para ${c.sumLabel} ha sido adjudicada`,
          descripcion: "SOFEIN te pide formalizar el pedido: revisa y firma la hoja de pedido.",
          accion: "Formalizar pedido", tab: "deliverables"
        });
      }
      pushAutoNotice({
        exp: c.exp, sumId: c.sum?.id || null, roles: ["cliente"],
        categoria: "Formalización", tagClass: "complete",
        titulo: `SOFEIN ha formalizado el pedido de ${c.sumLabel} con ${m.proveedorAdjudicado}`,
        descripcion: "El suministro pasa a Gestión del pedido.",
        accion: "Ver pedido", tab: "deliverables"
      });
      selLog(c, `SOFEIN valida la adjudicación de ${c.sumLabel} a ${m.proveedorAdjudicado}`, q ? `${formatEuro(q.precioTotal)} · entrega ${formatIsoDateEs(q.fechaEntregaIso)}` : "");
      showToast(`✓ Adjudicación validada. ${c.sumLabel} pasa a Gestión del pedido.`);
      location.hash = `#admin/expedientes/${c.exp.id}?sumId=${c.sum ? c.sum.id : ""}`;
    });

    /* ---------- Eventos de Pantalla 3: Formalización del Acuerdo y Gestión Operativa ---------- */
    // 1. Firma digital de Hoja de Pedido por Cliente o Proveedor
    document.querySelectorAll("[data-sign-contract-role]").forEach(btn => {
      btn.addEventListener("click", () => {
        const signRole = btn.dataset.signContractRole;
        const exp = getActiveExpediente(btn.dataset.expId);
        const formalizacion = ensureExpedienteFormalizacion(exp);
        if (signRole === "cliente") {
          formalizacion.firmaCliente = true;
          formalizacion.fechaFirmaCliente = "Hoy, ahora";
          addExpedienteCambioLog(exp, { tipo: "Formalización", suministro: "General", fase: 2, titulo: "El cliente firma la hoja de pedido" });
          showToast(`✓ Hoja de Pedido firmada digitalmente por ${exp.cliente}`);
        } else if (signRole === "proveedor") {
          formalizacion.firmaProveedor = true;
          formalizacion.fechaFirmaProveedor = "Hoy, ahora";
          addExpedienteCambioLog(exp, { tipo: "Formalización", suministro: "General", fase: 2, titulo: "El proveedor firma la hoja de pedido" });
          showToast(`✓ Compromiso de suministro firmado por ${exp.proveedor}`);
        }
        renderApp();
      });
    });

    // 2. Validación de Acuerdo por SOFEIN Admin y Arranque de Fabricación (Fase 3 -> Fase 4)
    document.querySelectorAll("[data-validate-contract-sofein]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente(btn.dataset.validateContractSofein);
        const formalizacion = ensureExpedienteFormalizacion(exp);
        formalizacion.firmaCliente = true;
        if (!formalizacion.fechaFirmaCliente) formalizacion.fechaFirmaCliente = "Hoy";
        formalizacion.firmaProveedor = true;
        if (!formalizacion.fechaFirmaProveedor) formalizacion.fechaFirmaProveedor = "Hoy";
        formalizacion.validadoSofein = true;
        formalizacion.fechaValidacionSofein = "Hoy, ahora";

        // Marcar entregables de Fase 3 como validados
        if (exp.deliverables[2] && exp.deliverables[2].length) {
          exp.deliverables[2].forEach(d => { d.state = "complete"; });
        } else {
          exp.deliverables[2] = [
            { name: "Hoja de Pedido Formalizada (Delimitación Responsabilidad)", owner: "SOFEIN", state: "complete", format: "PDF", file: `Hoja-Pedido-${exp.id}.pdf`, date: "Hoy" },
            { name: "Acuerdo Marco Plataforma Firmado", owner: "Cliente", state: "complete", format: "Digital", file: `Acuerdo-Marco-${exp.id}.pdf`, date: "Hoy" }
          ];
        }

        // Avanzar a Fase 4 (Fabricación & Calidad) si estaba en Fase 3 o anterior
        if (exp.faseActual <= 2) {
          exp.faseActual = 3;
          activeDossierPhase = 3;
          if (!exp.deliverables[3] || exp.deliverables[3].length === 0) {
            exp.deliverables[3] = [
              { name: "Orden de Fabricación y Programa de Ensayos", owner: "SOFEIN", state: "complete", format: "PDF", file: `OF-${exp.id}.pdf`, date: "Hoy" },
              { name: "Ficha Técnica de Lote y Análisis de Material", owner: "Proveedor", state: "pending", format: "PDF", file: null, date: "Requerido en fabricación" },
              { name: "Certificado de Ensayos en Laboratorio Acreditado ENAC", owner: "Proveedor", state: "pending", format: "PDF / Lab", file: null, date: "Requerido en fabricación" }
            ];
          }
        }

        NOTICES.unshift({
          id: `AV-0${NOTICES.length + 1}`,
          expId: exp.id,
          categoria: "Formalización",
          tagClass: "complete",
          titulo: `Acuerdo formalizado y Orden de Fabricación activada (${exp.id})`,
          descripcion: `SOFEIN ha validado la Hoja de Pedido ${formalizacion.codigoContrato}. El expediente avanza a Fase 4: Fabricación & Calidad.`,
          fecha: "Hoy, ahora",
          roles: ["admin", "cliente", "proveedor"],
          accion: "Ver Fabricación",
          enlace: `#admin/expedientes/${exp.id}`
        });

        addExpedienteCambioLog(exp, { tipo: "Formalización", suministro: "General", fase: 2, titulo: `SOFEIN valida la hoja de pedido ${formalizacion.codigoContrato}` });
        showToast(`✓ Acuerdo ${formalizacion.codigoContrato} validado. Fase 4 (Fabricación) activada.`);
        renderApp();
      });
    });

    // 3. Completar Fase Actual y Avanzar a la Siguiente (Exclusivo SOFEIN Admin y solo si la fase no está ya completada)
    document.querySelectorAll("[data-advance-dossier-phase]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "admin" || btn.disabled) return;
        const exp = getActiveExpediente(btn.dataset.advanceDossierPhase);
        const currentSum = getActiveExpSuministro(exp);
        const expSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
        const activeEntityPhaseActual = (currentSum && expSuministros.length > 1)
          ? Math.min(currentSum.faseActual, PHASES.length - 1)
          : Math.min(exp.faseActual, PHASES.length - 1);
        const currentIdx = activeDossierPhase;
        const isAlreadyDone = currentIdx < activeEntityPhaseActual || !!exp.cerrado || (currentSum && currentSum.estado === "cerrado") || (currentIdx === PHASES.length - 1 && (exp.finalizado || (currentSum && currentSum.estado === "finalizado")));
        if (isAlreadyDone) {
          showToast("Esta fase ya está completada.");
          return;
        }
        const delivMap = getActiveDeliverablesMap(exp);

        // Se puede avanzar con documentación incompleta, pero se avisa antes (los pendientes quedan a la vista en la fase)
        const incompletos = getPhaseIncompleteDocs(delivMap, currentIdx);
        if (incompletos.length && btn.dataset.confirmed !== "1") {
          openAdvancePhaseWarningModal(currentIdx, incompletos, () => {
            btn.dataset.confirmed = "1";
            btn.click();
          });
          return;
        }

        if (currentIdx < PHASES.length - 1) {
          const nextIdx = currentIdx + 1;
          activeDossierPhase = nextIdx;
          if (currentSum && expSuministros.length > 1) {
            currentSum.faseActual = Math.max(currentSum.faseActual, nextIdx);
            currentSum.faseNombre = `${nextIdx + 1}. ${PHASES[nextIdx].name}`;
            // Actualizar fase general del expediente a la mínima/media activa
            exp.faseActual = Math.max(exp.faseActual, nextIdx);
          } else {
            exp.faseActual = nextIdx;
          }

          if (!delivMap[nextIdx] || delivMap[nextIdx].length === 0) {
            const defaultByPhase = {
              1: [{ name: "Comparativa de Proveedores Homologados", reqDate: "Hoy", owner: "SOFEIN", state: "review", format: "PDF", file: null, date: "En curso", visibleTo: ["admin", "cliente"], notes: "Fase de selección de proveedor" }],
              2: [
                { name: "Hoja de Pedido Formalizada", reqDate: "Hoy", owner: "SOFEIN", state: "review", format: "PDF", file: `Hoja-Pedido-${exp.id}.pdf`, date: "Hoy", visibleTo: ["admin", "cliente", "proveedor"], notes: "Acuerdo vinculante" },
                { name: "Certificado de Ensayos de Calidad ENAC", reqDate: "Hoy", owner: "Proveedor", state: "pending", format: "PDF / Lab", file: null, date: "Pendiente", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Control de fabricación" }
              ],
              3: [
                { name: "Acta de Recepción en Destino", reqDate: "Hoy", owner: "Cliente", state: "pending", format: "PDF", file: null, date: "Pendiente", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Descarga a pie de vía" },
                { name: "Pasaporte Digital SOFEIN", reqDate: "Hoy", owner: "SOFEIN", state: "pending", format: "Certificado", file: null, date: "Al cierre", visibleTo: ["admin", "cliente", "proveedor", "destinatario"], notes: "Trazabilidad consolidada" }
              ]
            };
            delivMap[nextIdx] = defaultByPhase[nextIdx] || [];
          }

          addExpedienteCambioLog(exp, {
            tipo: "Avance de fase",
            suministro: currentSum && expSuministros.length > 1 ? currentSum.id : "Expediente",
            titulo: `Fase ${currentIdx + 1} (${PHASES[currentIdx].name}) completada · Avance a ${PHASES[nextIdx].name}`,
            detalle: "Hitos de la fase validados por SOFEIN Admin.",
            fase: currentIdx
          });
          pushAutoNotice({
            exp, sumId: currentSum ? currentSum.id : null, roles: ["cliente", "proveedor"],
            categoria: "Avance de Fase", tagClass: "complete",
            titulo: `${currentSum ? currentSum.id : exp.id} pasa a la fase ${PHASES[nextIdx].num}. ${PHASES[nextIdx].name}`,
            descripcion: `SOFEIN ha completado la fase ${currentIdx + 1} (${PHASES[currentIdx].name}).`,
            accion: "Ver expediente", tab: "deliverables"
          });
          showToast(`✓ Fase ${currentIdx + 1} completada. Avanzado a ${PHASES[nextIdx].num}. ${PHASES[nextIdx].name}`);
          renderApp();
        } else {
          // Si está en la última fase (Fase 4: Cierre), marca finalizado/cerrado
          if (currentSum && expSuministros.length > 1) {
            currentSum.estado = "finalizado";
            currentSum.accionesPendientes = 0;
            showToast(`✓ Fase 4 completada para el suministro ${currentSum.id}.`);
          } else {
            exp.finalizado = true;
            showToast(`✓ Fase 4 (Cierre) completada para el expediente ${exp.id}.`);
          }
          renderApp();
        }
      });
    });
    // 3a. Reabrir una fase ya completada (Exclusivo SOFEIN Admin): la fase seleccionada vuelve a quedar en curso
    document.querySelectorAll("[data-reopen-dossier-phase]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (activeRole !== "admin" || btn.disabled) return;
        const exp = getActiveExpediente(btn.dataset.reopenDossierPhase);
        const currentSum = getActiveExpSuministro(exp);
        const expSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
        const isMultiSum = currentSum && expSuministros.length > 1;
        if (exp.cerrado || (currentSum && currentSum.estado === "cerrado")) return;

        const reopenIdx = activeDossierPhase;
        if (isMultiSum) {
          currentSum.faseActual = reopenIdx;
          currentSum.faseNombre = `${reopenIdx + 1}. ${PHASES[reopenIdx].name}`;
          if (currentSum.estado === "finalizado") currentSum.estado = "activo";
          exp.faseActual = Math.max(...expSuministros.map(s => s.faseActual ?? 0));
        } else {
          exp.faseActual = reopenIdx;
          exp.finalizado = false;
          if (currentSum) {
            currentSum.faseActual = reopenIdx;
            currentSum.faseNombre = `${reopenIdx + 1}. ${PHASES[reopenIdx].name}`;
            if (currentSum.estado === "finalizado") currentSum.estado = "activo";
          }
        }

        addExpedienteCambioLog(exp, {
          tipo: "Reapertura de fase",
          suministro: isMultiSum ? currentSum.id : "Expediente",
          titulo: `Fase ${reopenIdx + 1} (${PHASES[reopenIdx].name}) reabierta`,
          detalle: "Fase reabierta por SOFEIN Admin.",
          fase: reopenIdx
        });
        showToast(`✓ Fase ${reopenIdx + 1} (${PHASES[reopenIdx].name}) reabierta.`);
        renderApp();
      });
    });

    // 3b. Cierre del expediente (Fase 7): emite y sella el Pasaporte Digital
    document.querySelectorAll("[data-close-dossier]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente(btn.dataset.closeDossier);
        if (exp.cerrado || exp.faseActual !== PHASES.length - 1) return;

        const openIncidents = (exp.incidencias || []).filter(i => !i.adendaId);
        if (openIncidents.length) {
          showToast(`No se puede cerrar: hay ${openIncidents.length} incidencia(s) sin consolidar (${openIncidents.map(i => i.id).join(", ")}).`);
          return;
        }
        const missing = PHASES.reduce((n, _, idx) => n + (idx === PHASES.length - 1 ? 0 : (exp.deliverables[idx] || []).filter(d => d.state !== "complete").length), 0);
        if (missing) {
          showToast(`No se puede cerrar: faltan ${missing} documento(s) por validar en fases anteriores.`);
          return;
        }

        const today = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");
        (exp.deliverables[PHASES.length - 1] || []).forEach(d => {
          d.state = "complete";
          d.date = "Hoy";
          if (!d.file) d.file = `Pasaporte-Digital-${exp.id}.pdf`;
        });
        exp.cerrado = true;
        exp.estado = "complete";
        exp.fechaCierre = today;

        NOTICES.unshift({
          id: `AV-0${NOTICES.length + 1}`,
          expId: exp.id,
          categoria: "Avance de Fase",
          tagClass: "complete",
          titulo: `Expediente ${exp.id} cerrado · Pasaporte Digital emitido`,
          descripcion: "SOFEIN ha cerrado el expediente y emitido el Pasaporte Digital con la trazabilidad consolidada.",
          fecha: "Hoy, ahora",
          roles: ["admin", "cliente", "proveedor"],
          accion: "Ver Pasaporte",
          enlace: `#admin/expedientes/${exp.id}?tab=passport`
        });

        addExpedienteCambioLog(exp, { tipo: "Cierre", suministro: "General", fase: PHASES.length - 1, titulo: "Expediente cerrado y pasaporte digital emitido" });
        showToast(`✓ Expediente ${exp.id} cerrado. Pasaporte Digital emitido.`);
        renderApp();
      });
    });

    // 4. Modal para Actualizar Plazo / Fase del Expediente
    document.querySelectorAll("[data-open-timeline-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        openUpdateTimelineModal(btn.dataset.openTimelineModal);
      });
    });

    // 5. Modal para Requerir / Añadir Ranura Documental a la Fase
    document.querySelectorAll("[data-open-add-slot-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        openAddDeliverableModal(btn.dataset.openAddSlotModal);
      });
    });

    // Recordar apertura/cierre de descartados en Avisos
    document.querySelector(".admin-discarded-details")?.addEventListener("toggle", e => {
      showCompletedAvisos = e.currentTarget.open;
      showDiscardedAvisos = showCompletedAvisos;
    });

    // Toasts genéricos
    document.querySelectorAll("[data-toast]").forEach(el => {
      el.addEventListener("click", () => showToast(el.dataset.toast));
    });

    document.querySelectorAll("[data-download]").forEach(el => {
      el.addEventListener("click", () => showToast(`Descarga iniciada: ${el.dataset.download}`));
    });
    } catch (err) {
      console.error("CRITICAL ERROR in bindEvents:", err);
    }
  }

  function openUpdateTimelineModal(expId) {
    const exp = getActiveExpediente(expId);
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="timelineModalBackdrop">
        <div class="procurement-modal" style="width:min(520px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Gestión Operativa del Expediente (${exp.id})</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Actualiza la fase activa y el seguimiento de plazos reales vs. pactados</p>
            </div>
            <button type="button" id="closeTimelineModalBtn">×</button>
          </div>
          <form id="modalTimelineForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Fase Activa del Expediente
                <select name="faseActual" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                  ${PHASES.map((p, idx) => `<option value="${idx}" ${exp.faseActual === idx ? "selected" : ""}>Fase ${p.num}: ${p.name}</option>`).join("")}
                </select>
              </label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;min-width:0;box-sizing:border-box">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Plazo Pactado Contractual
                  <input name="plazoPactado" value="${exp.plazoPactado}" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Plazo Real Estimado
                  <input name="plazoRealEstimado" value="${exp.plazoRealEstimado}" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Estado de Desviación / Nota de Seguimiento
                <input name="desviacionDias" value="${exp.desviacionDias}" required placeholder="Ej: 0 días (En cronograma) o +4 días (Ajuste logístico)" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelTimelineModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">Guardar Actualización</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeTimelineModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelTimelineModalBtn")?.addEventListener("click", close);
    document.getElementById("timelineModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "timelineModalBackdrop") close();
    });

    document.getElementById("modalTimelineForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const newPhase = parseInt(form.get("faseActual"), 10);
      exp.faseActual = newPhase;
      if (exp.cerrado && newPhase < PHASES.length - 1) { exp.cerrado = false; exp.estado = "review"; }
      activeDossierPhase = newPhase;
      exp.plazoPactado = (form.get("plazoPactado") || "").trim();
      exp.plazoRealEstimado = (form.get("plazoRealEstimado") || "").trim();
      exp.desviacionDias = (form.get("desviacionDias") || "").trim();
      close();
      showToast(`✓ Seguimiento operativo de ${exp.id} actualizado`);
      renderApp();
    });
  }

  function renderVisibilityCheckboxesHTML(selectedRoles = ["admin", "cliente", "proveedor"]) {
    const opt = (role, label) => `
      <label class="doc-vis-check-item">
        <input type="checkbox" name="vis_${role}" value="${role}" ${selectedRoles.includes(role) ? "checked" : ""} />
        <span>${label}</span>
      </label>
    `;
    return `
      <div class="doc-visibility-box">
        <span class="doc-visibility-title">${icon("eye", 14)} ¿Quién puede ver este documento?</span>
        <div class="doc-visibility-checks">
          <span class="doc-vis-check-item is-fixed" title="SOFEIN siempre puede ver los documentos">${icon("check", 13)} SOFEIN</span>
          ${opt("cliente", "Cliente")}
          ${opt("proveedor", "Proveedor")}
          ${opt("destinatario", "Destinatario final")}
        </div>
      </div>
    `;
  }

  function readVisibilityFromForm(form) {
    const roles = ["admin"];
    if (form.get("vis_cliente")) roles.push("cliente");
    if (form.get("vis_proveedor")) roles.push("proveedor");
    if (form.get("vis_destinatario")) roles.push("destinatario");
    return roles;
  }

  // Adjuntos de la creación del expediente (uno por docId: los generales se copian en cada suministro)
  function getExpCreationDocs(exp) {
    const all = [];
    (exp.deliverables?.[0] || []).forEach(d => all.push(d));
    SUMINISTROS.filter(s => s.expId === exp.id).forEach(s => (s.deliverables?.[0] || []).forEach(d => all.push(d)));
    return all.filter(d => d.fromCreation);
  }

  // SOFEIN valida la solicitud de un cliente y decide quién ve cada adjunto
  function openValidateExpedienteModal(expId) {
    const exp = getActiveExpediente(expId);
    const modalWrap = document.getElementById("modalContainer");
    if (!exp || !modalWrap) return;

    const allDocs = getExpCreationDocs(exp);
    const uniqueDocs = [];
    const seen = new Set();
    allDocs.forEach(d => {
      if (seen.has(d.docId)) return;
      seen.add(d.docId);
      uniqueDocs.push(d);
    });

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="validateExpModalBackdrop">
        <div class="procurement-modal" style="width:min(640px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Validar solicitud (${exp.id})</h3>
            </div>
            <button type="button" id="closeValidateExpModalBtn">×</button>
          </div>
          <form id="modalValidateExpForm">
            <div class="procurement-modal-body" style="gap:14px">
              ${exp.notas ? `
                <div class="dossier-exp-notes" style="margin:0">
                  <span class="exp-v2-label">${icon("edit", 12)} Notas del cliente</span>
                  <p>${escHTML(exp.notas)}</p>
                </div>
              ` : ""}
              <div style="display:grid;gap:8px">
                <span style="font-size:0.75rem;font-weight:650;color:var(--entity-muted)">Adjuntos de la solicitud · ¿Quién puede ver cada uno?</span>
                ${uniqueDocs.length ? uniqueDocs.map(d => `
                  <div class="validate-exp-doc-row">
                    <div class="validate-exp-doc-info">
                      <strong>${escHTML(d.name)}</strong>
                      <span>${icon("file", 11)} ${escHTML(d.file)} · ${d.scope === "General" ? "General del expediente" : escHTML(d.scope)}</span>
                    </div>
                    <div class="create-attach-vis">
                      <span class="create-attach-vis-fixed">${icon("eye", 12)} SOFEIN</span>
                      <label><input type="checkbox" name="${d.docId}_cliente" checked /> Cliente</label>
                      <label><input type="checkbox" name="${d.docId}_proveedor" checked /> Proveedor</label>
                    </div>
                  </div>
                `).join("") : `<p style="margin:0;font-size:0.78rem;color:var(--entity-muted)">La solicitud no incluye adjuntos.</p>`}
              </div>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelValidateExpModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Validar y Activar Expediente</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeValidateExpModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelValidateExpModalBtn")?.addEventListener("click", close);
    document.getElementById("validateExpModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "validateExpModalBackdrop") close();
    });

    document.getElementById("modalValidateExpForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const visById = {};
      uniqueDocs.forEach(d => {
        const roles = ["admin"];
        if (form.get(`${d.docId}_cliente`)) roles.push("cliente");
        if (form.get(`${d.docId}_proveedor`)) roles.push("proveedor");
        visById[d.docId] = roles;
      });
      allDocs.forEach(d => {
        d.visibleTo = [...(visById[d.docId] || d.visibleTo)];
        d.state = "complete";
      });

      exp.estado = "review";
      exp.faseActual = 1;
      exp.desviacionDias = "0 días (En plazo)";
      exp.plazoRealEstimado = "45 días";
      exp.plazoPactado = "45 días";
      const preseleccion = { name: "Preselección de 3 Proveedores Homologados", owner: "SOFEIN", state: "review", format: "PDF", file: null, date: "Listo para lanzar" };
      if (!exp.deliverables[1] || !exp.deliverables[1].length) exp.deliverables[1] = [{ ...preseleccion }];
      SUMINISTROS.filter(s => s.expId === exp.id).forEach(s => {
        if ((s.faseActual ?? 0) < 1) {
          s.faseActual = 1;
          s.faseNombre = "Fase 2: Cotización";
        }
        if (s.deliverables && (!s.deliverables[1] || !s.deliverables[1].length)) s.deliverables[1] = [{ ...preseleccion }];
      });

      addExpedienteCambioLog(exp, { tipo: "Validación de solicitud", suministro: "General", fase: 0, titulo: "SOFEIN valida la solicitud del cliente", detalle: `${uniqueDocs.length} adjunto(s) con visibilidad asignada` });
      close();
      showToast(`✓ Expediente ${exp.id} validado por SOFEIN. Avanza a Fase 2: Proveedores`);
      renderApp();
    });
  }

  function openAddDeliverableModal(expId) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const reqSum = getActiveExpSuministro(exp);
    const reqProveedorName = reqSum && reqSum.proveedor && reqSum.proveedor !== "Por determinar" ? reqSum.proveedor : "";

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="addSlotModalBackdrop">
        <div class="procurement-modal" style="width:min(540px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>+ Requerir Documento (${exp.id})</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Añade un nuevo requerimiento en la tabla de Documentación</p>
            </div>
            <button type="button" id="closeAddSlotModalBtn">×</button>
          </div>
          <form id="modalAddSlotForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Nombre del Documento Requerido
                <input name="name" required placeholder="Ej: Certificado de Ultrasonidos y Colada EN 10204 3.1" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Fase
                  <select name="phaseIdx" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    ${PHASES.map((p, idx) => `<option value="${idx}" ${idx === activeDossierPhase ? "selected" : ""}>${p.num}. ${p.name}</option>`).join("")}
                  </select>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Requerido a
                  <select name="owner" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="Proveedor">Proveedor${reqProveedorName ? ` · ${reqProveedorName}` : ""}</option>
                    <option value="Cliente">Cliente · ${exp.cliente}</option>
                  </select>
                </label>
              </div>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Notas / Indicaciones
                <input name="notes" placeholder="Ej: Imprescindible sello de laboratorio ENAC" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              ${activeRole === "admin" ? renderVisibilityCheckboxesHTML(["admin", "cliente", "proveedor"]) : ""}
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelAddSlotModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">Requerir Documento</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeAddSlotModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelAddSlotModalBtn")?.addEventListener("click", close);
    document.getElementById("addSlotModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "addSlotModalBackdrop") close();
    });

    document.getElementById("modalAddSlotForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const docName = (form.get("name") || "").trim();
      const targetPhase = parseInt(form.get("phaseIdx"), 10);
      const owner = form.get("owner") || "Proveedor";
      const notes = (form.get("notes") || "").trim();
      const visibleTo = activeRole === "admin" ? readVisibilityFromForm(form) : ["admin", "cliente", "proveedor"];
      const todayStr = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");

      if (!delivMap[targetPhase]) delivMap[targetPhase] = [];
      delivMap[targetPhase].push({
        name: docName,
        reqDate: todayStr,
        owner,
        state: "pending",
        format: "PDF",
        file: null,
        date: "Pendiente",
        visibleTo,
        notes: notes || "Requerido por SOFEIN"
      });

      addExpedienteCambioLog(exp, { tipo: "Documentación", suministro: reqSum?.id || "General", fase: targetPhase, titulo: `Documento requerido al ${owner === "Cliente" ? "cliente" : "proveedor"}: «${docName}»`, detalle: notes });
      const reqRole = ownerToRole(owner);
      if (reqRole) {
        pushAutoNotice({
          exp, sumId: reqSum?.id || null, roles: [reqRole],
          categoria: "Requerimiento Documental",
          titulo: `SOFEIN te requiere «${docName}»`,
          descripcion: `Sube el documento en la fase ${PHASES[targetPhase].num}. ${PHASES[targetPhase].name}.${notes ? ` Indicaciones: ${notes}` : ""}`,
          accion: "Subir documento", tab: "deliverables"
        });
      }
      activeDossierPhase = targetPhase;
      close();
      showToast(`✓ Documento "${docName}" requerido en ${PHASES[targetPhase].name}`);
      renderApp();
    });
  }

  // Fase en la que está guardado un documento (para el historial)
  function getDocPhaseIdx(exp, del) {
    const map = getActiveDeliverablesMap(exp);
    const found = Object.keys(map).find(k => (map[k] || []).includes(del));
    return found !== undefined ? Number(found) : activeDossierPhase;
  }

  // Aviso al subir un documento: si sube SOFEIN, a las partes que lo ven; si sube cliente/proveedor, a SOFEIN para validar
  function notifyDocUploaded(exp, del) {
    const sumId = getActiveExpSuministro(exp)?.id || null;
    addExpedienteCambioLog(exp, { tipo: "Documentación", suministro: sumId || "General", fase: getDocPhaseIdx(exp, del), titulo: `Documento subido: «${del.name}»`, detalle: del.file });
    if (activeRole === "admin") {
      pushAutoNotice({
        exp, sumId, roles: docAudience(del),
        categoria: "Documentación", tagClass: "review",
        titulo: `SOFEIN ha subido «${del.name}»`,
        descripcion: `Nuevo documento disponible en ${exp.id}: ${del.file}.`,
        accion: "Ver documentación", tab: "deliverables"
      });
    } else {
      pushAutoNotice({
        exp, sumId, roles: ["admin"],
        categoria: "Validación Documental",
        titulo: `${roleLabel(activeRole)} ha subido «${del.name}»`,
        descripcion: `Documento pendiente de validar en ${exp.id}: ${del.file}.`,
        accion: "Validar documento", tab: "deliverables"
      });
    }
  }

  // Editar documento (SOFEIN Admin): nombre, fase y quién lo ve
  function openEditDocModal({ exp, delivMap, phaseIdx, slotIdx, del }) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="editDocModalBackdrop">
        <div class="procurement-modal" style="width:min(540px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Editar documento</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${escHTML(del.file || "Sin archivo")} · ${exp.id}</p>
            </div>
            <button type="button" id="closeEditDocModalBtn">×</button>
          </div>
          <form id="modalEditDocForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Nombre del documento
                <input name="name" required value="${escHTML(del.name)}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Fase
                <select name="phaseIdx" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                  ${PHASES.map((p, idx) => `<option value="${idx}" ${idx === phaseIdx ? "selected" : ""}>${p.num}. ${p.name}</option>`).join("")}
                </select>
              </label>
              ${renderVisibilityCheckboxesHTML(del.visibleTo || ["admin", "cliente", "proveedor"])}
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelEditDocModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeEditDocModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelEditDocModalBtn")?.addEventListener("click", close);
    document.getElementById("editDocModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "editDocModalBackdrop") close();
    });

    document.getElementById("modalEditDocForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      del.name = (form.get("name") || "").trim() || del.name;
      del.visibleTo = readVisibilityFromForm(form);
      const newPhase = parseInt(form.get("phaseIdx"), 10);
      if (!isNaN(newPhase) && newPhase !== phaseIdx) {
        delivMap[phaseIdx].splice(slotIdx, 1);
        if (!delivMap[newPhase]) delivMap[newPhase] = [];
        delivMap[newPhase].push(del);
      }
      addExpedienteCambioLog(exp, { tipo: "Documentación", suministro: getActiveExpSuministro(exp)?.id || "General", fase: isNaN(newPhase) ? phaseIdx : newPhase, titulo: `Documento editado: «${del.name}»`, detalle: `Visible: ${formatVisibleToLabel(del.visibleTo)}` });
      close();
      showToast(`✓ Documento "${del.name}" actualizado`);
      renderApp();
    });
  }

  function openDeleteDocModal({ exp, delivMap, phaseIdx, slotIdx, del }) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="deleteDocModalBackdrop">
        <div class="procurement-modal" style="width:min(460px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Eliminar documento</h3>
            </div>
            <button type="button" id="closeDeleteDocModalBtn">×</button>
          </div>
          <div class="procurement-modal-body">
            <p style="margin:0;font-size:0.82rem;color:var(--entity-text)">
              Se eliminará <b>${escHTML(del.name)}</b>${del.file ? ` (${escHTML(del.file)})` : ""} de la documentación de ${exp.id}. Esta acción no se puede deshacer.
            </p>
          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="cancelDeleteDocModalBtn">Cancelar</button>
            <button class="admin-primary-button is-danger" type="button" id="confirmDeleteDocBtn">${icon("x", 14)} Eliminar</button>
          </div>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeDeleteDocModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelDeleteDocModalBtn")?.addEventListener("click", close);
    document.getElementById("deleteDocModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "deleteDocModalBackdrop") close();
    });
    document.getElementById("confirmDeleteDocBtn")?.addEventListener("click", () => {
      delivMap[phaseIdx].splice(slotIdx, 1);
      addExpedienteCambioLog(exp, { tipo: "Documentación", suministro: getActiveExpSuministro(exp)?.id || "General", fase: phaseIdx, titulo: `Documento eliminado: «${del.name}»`, detalle: del.file || "" });
      close();
      showToast(`✓ Documento "${del.name}" eliminado`);
      renderApp();
    });
  }

  function openUploadFreeDocModal(expId) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const defaultOwner = activeRole === "cliente" ? "Cliente" : activeRole === "proveedor" ? "Proveedor" : "SOFEIN";
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="freeDocModalBackdrop">
        <div class="procurement-modal" style="width:min(540px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Subir Documento (${exp.id})</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Sube un documento a la tabla de Documentación${activeRole === "admin" ? " y elige quién puede verlo" : ""}</p>
            </div>
            <button type="button" id="closeFreeDocModalBtn">×</button>
          </div>
          <form id="modalFreeDocForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Nombre del Documento
                <input name="name" required placeholder="Ej: Informe Complementario de Trazabilidad de Lote" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Fase
                  <select name="phaseIdx" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    ${PHASES.map((p, idx) => `<option value="${idx}" ${idx === activeDossierPhase ? "selected" : ""}>${p.num}. ${p.name}</option>`).join("")}
                  </select>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Archivo
                  <input name="file" type="file" required accept=".pdf,.dwg,.xlsx,.docx,.jpg,.png" style="padding:7px 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.8rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Notas (Opcional)
                <input name="notes" placeholder="Añade una nota sobre este documento..." style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              ${activeRole === "admin" ? renderVisibilityCheckboxesHTML(["admin", "cliente", "proveedor"]) : ""}
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelFreeDocModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("upload", 14)} Subir Documento</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeFreeDocModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelFreeDocModalBtn")?.addEventListener("click", close);
    document.getElementById("freeDocModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "freeDocModalBackdrop") close();
    });

    document.getElementById("modalFreeDocForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const docName = (form.get("name") || "").trim();
      const targetPhase = parseInt(form.get("phaseIdx"), 10);
      const file = form.get("file");
      if (!file || !file.name) return;
      const notes = (form.get("notes") || "").trim();
      const visibleTo = activeRole === "admin" ? readVisibilityFromForm(form) : ["admin", activeRole];

      if (!delivMap[targetPhase]) delivMap[targetPhase] = [];
      const newDoc = {
        name: docName,
        reqDate: null, // subido sin requerimiento previo
        owner: defaultOwner,
        state: activeRole === "admin" ? "complete" : "review",
        visibleTo,
        notes: notes || (activeRole === "admin" ? `Validado · Visible: ${formatVisibleToLabel(visibleTo)}` : "Pendiente de validación SOFEIN")
      };
      applyUploadedFileToDoc(newDoc, file);
      delivMap[targetPhase].push(newDoc);
      notifyDocUploaded(exp, newDoc);

      activeDossierPhase = targetPhase;
      close();
      showToast(`✓ Documento "${newDoc.file}" subido en ${PHASES[targetPhase].name}`);
      renderApp();
    });
  }

  function openUploadSlotDocModal(expId, phaseIdx, slotIdx) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const del = delivMap[phaseIdx] && delivMap[phaseIdx][slotIdx];
    if (!del) return;
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    const isReplacing = !!del.file;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="slotUploadModalBackdrop">
        <div class="procurement-modal" style="width:min(540px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>${isReplacing ? "Subsanar documento" : "Subir Documento Requerido"}</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${escHTML(del.name)} (${exp.id})${isReplacing ? ` · Sustituye a ${escHTML(del.file)}` : ""}</p>
            </div>
            <button type="button" id="closeSlotUploadModalBtn">×</button>
          </div>
          <form id="modalSlotUploadForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                ${isReplacing ? "Nuevo archivo" : "Archivo a subir"}
                <input name="file" type="file" required accept=".pdf,.dwg,.xlsx,.docx,.jpg,.png" style="padding:7px 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.8rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Notas
                <input name="notes" value="${del.notes || ""}" placeholder="Añade notas o comentarios..." style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              ${activeRole === "admin" ? renderVisibilityCheckboxesHTML(del.visibleTo || ["admin", "cliente", "proveedor"]) : ""}
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelSlotUploadModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("upload", 14)} Subir Documento</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeSlotUploadModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelSlotUploadModalBtn")?.addEventListener("click", close);
    document.getElementById("slotUploadModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "slotUploadModalBackdrop") close();
    });

    document.getElementById("modalSlotUploadForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const file = form.get("file");
      if (!file || !file.name) return;
      applyUploadedFileToDoc(del, file);
      del.rejectReason = null;
      notifyDocUploaded(exp, del);
      const notes = (form.get("notes") || "").trim();
      if (activeRole === "admin") {
        del.state = "complete";
        del.visibleTo = readVisibilityFromForm(form);
        del.notes = notes || `Validado · Visible: ${formatVisibleToLabel(del.visibleTo)}`;
      } else {
        del.state = "review";
        del.notes = notes || "Subido · En revisión por SOFEIN";
      }
      close();
      showToast(`✓ Archivo "${del.file}" registrado correctamente`);
      renderApp();
    });
  }

  function openValidateDeliverableModal(expId, phaseIdx, slotIdx) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const del = delivMap[phaseIdx] && delivMap[phaseIdx][slotIdx];
    if (!del) return;
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="validateDocModalBackdrop">
        <div class="procurement-modal" style="width:min(540px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Validar Documento y Visibilidad (SOFEIN Admin)</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${del.name} · Origen: <b>${del.owner}</b></p>
            </div>
            <button type="button" id="closeValidateDocModalBtn">×</button>
          </div>
          <form id="modalValidateDocForm">
            <div class="procurement-modal-body" style="gap:14px">
              <div style="padding:10px 12px;border-radius:8px;background:var(--entity-panel-2);border:1px solid var(--entity-line);display:flex;align-items:center;justify-content:space-between;gap:10px">
                <span style="font-size:0.78rem;color:var(--entity-text);font-weight:600">${icon("file", 14)} ${del.file || "Documento pendiente de archivo (se certificará de oficio)"}</span>
                <span class="dossier-chip">${PHASES[phaseIdx]?.name || ""}</span>
              </div>

              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Resolución de SOFEIN Admin
                <select name="decision" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                  <option value="complete" ${del.state !== "rejected" ? "selected" : ""}>✓ Validado (Aprobar y certificar)</option>
                  <option value="review" ${del.state === "review" ? "" : ""}>En revisión</option>
                  <option value="rejected" ${del.state === "rejected" ? "selected" : ""}>⚠️ Con observaciones (Solicitar subsanación)</option>
                </select>
              </label>

              ${renderVisibilityCheckboxesHTML(del.visibleTo || ["admin", "cliente", "proveedor"])}

              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Notas / Observaciones
                <textarea name="notes" rows="2" placeholder="Añade notas de validación o instrucciones..." style="padding:8px 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem">${del.notes || ""}</textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelValidateDocModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Guardar Validación y Permisos</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeValidateDocModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelValidateDocModalBtn")?.addEventListener("click", close);
    document.getElementById("validateDocModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "validateDocModalBackdrop") close();
    });

    document.getElementById("modalValidateDocForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const decision = form.get("decision") || "complete";
      const visibleTo = readVisibilityFromForm(form);
      const notes = (form.get("notes") || "").trim();

      if (!del.file && decision === "complete") {
        del.file = `${del.name.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 26)}-${exp.id}.pdf`;
      }
      del.state = decision;
      del.visibleTo = visibleTo;
      if (decision === "rejected") {
        del.rejectReason = notes || "Subsanación requerida por SOFEIN";
        del.notes = del.rejectReason;
      } else {
        del.rejectReason = null;
        del.notes = notes || `Validado · Visible: ${formatVisibleToLabel(visibleTo)}`;
      }
      addExpedienteCambioLog(exp, {
        tipo: "Documentación", suministro: getActiveExpSuministro(exp)?.id || "General", fase: phaseIdx,
        titulo: `Documento ${decision === "complete" ? "validado" : decision === "rejected" ? "con observaciones" : "en revisión"}: «${del.name}»`,
        detalle: `Visible: ${formatVisibleToLabel(visibleTo)}`
      });
      const uploaderRole = ownerToRole(del.uploadedBy || del.owner);
      if (decision === "complete" && del.file) {
        pushAutoNotice({
          exp, sumId: getActiveExpSuministro(exp)?.id || null, roles: docAudience(del, uploaderRole),
          categoria: "Documentación", tagClass: "review",
          titulo: `SOFEIN ha validado «${del.name}»`,
          descripcion: `Documento validado y disponible en ${exp.id}: ${del.file}.`,
          accion: "Ver documentación", tab: "deliverables"
        });
      }
      close();
      showToast(`✓ Documento actualizado (${decision === "complete" ? "Validado" : decision === "rejected" ? "Con observaciones" : "En revisión"}) · Visibilidad: ${formatVisibleToLabel(visibleTo)}`);
      renderApp();
    });
  }
  function openConfirmToggleExpClosedModal(expId) {
    const exp = getActiveExpediente(expId);
    if (!exp) return;
    const isReopen = !!exp.cerrado;
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="toggleExpClosedBackdrop">
        <div class="procurement-modal" style="width:min(460px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>${isReopen ? "Reabrir expediente" : "Confirmar cierre de expediente"}</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Expediente <b>${exp.id}</b></p>
            </div>
            <button type="button" id="closeToggleExpModalBtn">×</button>
          </div>
          <form id="modalToggleExpForm">
            <div class="procurement-modal-body" style="gap:12px">
              <p style="margin:0;font-size:0.83rem;color:var(--entity-text);line-height:1.5">
                ${isReopen
                  ? `¿Deseas <b>reabrir</b> el expediente <b>${exp.id}</b> para volver a habilitar la gestión operativa de sus fases y suministros?`
                  : `¿Confirmas que deseas <b>cerrar</b> el expediente <b>${exp.id}</b> en este momento? Podrás volver a hacer clic cuando quieras si necesitas reabrirlo.`
                }
              </p>
              <label style="display:grid;gap:6px;font-size:0.74rem;font-weight:600;color:var(--entity-muted)">
                Motivo o anotación para el Registro (opcional)
                <input name="motivo" placeholder="${isReopen ? "Ej: Reapertura para adjuntar adenda complementaria" : "Ej: Cierre administrativo validado por SOFEIN"}" style="height:36px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.8rem" />
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelToggleExpModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">
                ${isReopen ? "Sí, reabrir expediente" : "Sí, cerrar expediente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeToggleExpModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelToggleExpModalBtn")?.addEventListener("click", close);
    document.getElementById("toggleExpClosedBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "toggleExpClosedBackdrop") close();
    });

    document.getElementById("modalToggleExpForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const motivo = (form.get("motivo") || "").trim();
      const today = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");

      if (isReopen) {
        exp.cerrado = false;
        exp.finalizado = false;
        exp.estado = "review";
        exp.fechaCierre = null;
        if (exp.faseActual >= PHASES.length - 1) {
          exp.faseActual = PHASES.length - 2; // Gestión del pedido
        }
        SUMINISTROS.filter(s => s.expId === exp.id).forEach(s => {
          if (s.estado === "cerrado") {
            s.estado = "activo";
            if (s.faseActual >= PHASES.length - 1) s.faseActual = PHASES.length - 2;
            s.faseNombre = `${s.faseActual + 1}. ${PHASES[s.faseActual].name}`;
          }
        });
        addExpedienteCambioLog(exp, {
          tipo: "Reapertura",
          suministro: "Expediente",
          titulo: `Expediente ${exp.id} reabierto por SOFEIN Admin`,
          detalle: motivo || "Reapertura administrativa del expediente."
        });
        close();
        showToast(`✓ Expediente ${exp.id} reabierto correctamente.`);
      } else {
        exp.cerrado = true;
        exp.estado = "complete";
        exp.faseActual = PHASES.length - 1;
        exp.fechaCierre = today;
        activeDossierPhase = PHASES.length - 1;
        SUMINISTROS.filter(s => s.expId === exp.id).forEach(s => {
          s.estado = "cerrado";
          s.faseActual = PHASES.length - 1;
          s.faseNombre = `${PHASES.length}. ${PHASES[PHASES.length - 1].name}`;
          s.accionesPendientes = 0;
        });
        addExpedienteCambioLog(exp, {
          tipo: "Cierre de expediente",
          suministro: "Todos",
          titulo: `Expediente ${exp.id} cerrado por SOFEIN Admin`,
          detalle: motivo || "Cierre formal del expediente y sus suministros."
        });
        close();
        showToast(`✓ Expediente ${exp.id} cerrado por SOFEIN Admin.`);
      }
      renderApp();
    });
  }

  function openConfirmToggleSuministroClosedModal(sumId, expId) {
    const sum = SUMINISTROS.find(s => s.id === sumId);
    if (!sum) return;
    const exp = getActiveExpediente(expId || sum.expId);
    const isReopen = sum.estado === "cerrado" || (exp && exp.cerrado);
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="toggleSumClosedBackdrop">
        <div class="procurement-modal" style="width:min(460px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>${isReopen ? "Reabrir suministro" : "Confirmar cierre de suministro"}</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${sum.id} · ${sum.tipo}</p>
            </div>
            <button type="button" id="closeToggleSumModalBtn">×</button>
          </div>
          <form id="modalToggleSumForm">
            <div class="procurement-modal-body" style="gap:12px">
              <p style="margin:0;font-size:0.83rem;color:var(--entity-text);line-height:1.5">
                ${isReopen
                  ? `¿Deseas <b>reabrir</b> el suministro <b>${sum.id} (${sum.tipo})</b> para continuar su gestión por fases?`
                  : `¿Confirmas que deseas <b>cerrar</b> el suministro <b>${sum.id} (${sum.tipo})</b>? Si vuelves a hacer clic sobre él podrás reabrirlo.`
                }
              </p>
              <label style="display:grid;gap:6px;font-size:0.74rem;font-weight:600;color:var(--entity-muted)">
                Motivo o anotación para el Registro (opcional)
                <input name="motivo" placeholder="${isReopen ? "Ej: Reapertura de suministro por ajuste de lote" : "Ej: Recepción completada y validada"}" style="height:36px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.8rem" />
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelToggleSumModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">
                ${isReopen ? "Sí, reabrir suministro" : "Sí, cerrar suministro"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeToggleSumModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelToggleSumModalBtn")?.addEventListener("click", close);
    document.getElementById("toggleSumClosedBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "toggleSumClosedBackdrop") close();
    });

    document.getElementById("modalToggleSumForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const motivo = (form.get("motivo") || "").trim();

      if (isReopen) {
        sum.estado = "activo";
        if (sum.faseActual >= PHASES.length - 1) {
          sum.faseActual = PHASES.length - 2;
        }
        sum.faseNombre = `${sum.faseActual + 1}. ${PHASES[sum.faseActual].name}`;
        if (exp && exp.cerrado) {
          exp.cerrado = false;
          exp.estado = "review";
          exp.fechaCierre = null;
        }
        if (activeDossierSuministroId === sum.id) {
          activeDossierPhase = sum.faseActual;
        }
        addExpedienteCambioLog(exp, {
          tipo: "Reapertura de suministro",
          suministro: sum.id,
          titulo: `Suministro ${sum.id} (${sum.tipo}) reabierto`,
          detalle: motivo || "Suministro reabierto por SOFEIN Admin."
        });
        close();
        showToast(`✓ Suministro ${sum.id} reabierto correctamente.`);
      } else {
        sum.estado = "cerrado";
        sum.faseActual = PHASES.length - 1;
        sum.faseNombre = `${PHASES.length}. ${PHASES[PHASES.length - 1].name}`;
        sum.accionesPendientes = 0;

        if (activeDossierSuministroId === sum.id) {
          activeDossierPhase = PHASES.length - 1;
        }

        const allSum = SUMINISTROS.filter(s => s.expId === exp.id);
        if (allSum.length > 0 && allSum.every(s => s.estado === "cerrado")) {
          exp.cerrado = true;
          exp.estado = "complete";
          exp.faseActual = PHASES.length - 1;
          exp.fechaCierre = "Hoy";
        }
        addExpedienteCambioLog(exp, {
          tipo: "Cierre de suministro",
          suministro: sum.id,
          titulo: `Suministro ${sum.id} (${sum.tipo}) cerrado`,
          detalle: motivo || "Suministro cerrado formalmente por SOFEIN Admin."
        });
        close();
        showToast(`✓ Suministro ${sum.id} cerrado por SOFEIN Admin.`);
      }
      renderApp();
    });
  }

  function openEditDocNoteModal(expId, phaseIdx, slotIdx) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const del = delivMap[phaseIdx] && delivMap[phaseIdx][slotIdx];
    if (!del) return;
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    const currentNote = del.rejectReason || del.notes || "";

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="editDocNoteBackdrop">
        <div class="procurement-modal" style="width:min(480px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Editar Nota del Documento</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${del.name} (${exp.id})</p>
            </div>
            <button type="button" id="closeEditDocNoteBtn">×</button>
          </div>
          <form id="modalEditDocNoteForm">
            <div class="procurement-modal-body" style="gap:12px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Nota / Comentario en tabla de Documentación
                <textarea name="notes" rows="3" placeholder="Escribe una nota o indicación para este documento..." style="padding:9px 11px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.45">${currentNote}</textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelEditDocNoteBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Guardar nota</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeEditDocNoteBtn")?.addEventListener("click", close);
    document.getElementById("cancelEditDocNoteBtn")?.addEventListener("click", close);
    document.getElementById("editDocNoteBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "editDocNoteBackdrop") close();
    });

    document.getElementById("modalEditDocNoteForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const newNote = (form.get("notes") || "").trim();
      del.notes = newNote;
      if (del.rejectReason && newNote) {
        del.rejectReason = newNote;
      }
      addExpedienteCambioLog(exp, {
        tipo: "Nota documental",
        suministro: activeDossierSuministroId || "General",
        titulo: `Nota actualizada en "${del.name}"`,
        detalle: newNote || "Nota limpiada."
      });
      close();
      showToast(`✓ Nota actualizada en "${del.name}"`);
      renderApp();
    });
  }

  // Anotación interna (solo SOFEIN) en el registro privado del expediente
  function openAddCambioLogModal(expId) {
    const exp = getActiveExpediente(expId);
    if (!exp || activeRole !== "admin") return;
    const expSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const inputStyle = "height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0";

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="addCambioLogBackdrop">
        <div class="procurement-modal" style="width:min(520px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>${icon("lock", 15)} Añadir anotación interna</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Solo la ve SOFEIN. No aparece al cliente ni al proveedor.</p>
            </div>
            <button type="button" id="closeAddCambioLogBtn">×</button>
          </div>
          <form id="modalAddCambioLogForm">
            <div class="procurement-modal-body" style="gap:12px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Suministro
                <select name="suministro" style="${inputStyle}">
                  <option value="General">Todo el expediente</option>
                  ${expSuministros.map(s => `<option value="${s.id}" ${activeDossierSuministroId === s.id ? "selected" : ""}>${s.id} · ${s.tipo}</option>`).join("")}
                </select>
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Título
                <input name="titulo" required placeholder="Ej: Llamada con jefe de obra sobre ventana de descarga" style="${inputStyle}" />
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Detalle
                <textarea name="detalle" rows="3" placeholder="Notas internas de seguimiento…" style="padding:9px 11px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.45"></textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelAddCambioLogBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Guardar anotación</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeAddCambioLogBtn")?.addEventListener("click", close);
    document.getElementById("cancelAddCambioLogBtn")?.addEventListener("click", close);
    document.getElementById("addCambioLogBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "addCambioLogBackdrop") close();
    });

    document.getElementById("modalAddCambioLogForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      addExpedienteCambioLog(exp, {
        tipo: "Anotación interna (SOFEIN)",
        suministro: form.get("suministro") || "General",
        titulo: (form.get("titulo") || "").trim(),
        detalle: (form.get("detalle") || "").trim(),
        soloAdmin: true
      });
      close();
      showToast(`✓ Anotación interna añadida a ${exp.id}`);
      renderApp();
    });
  }

  function openRejectDeliverableModal(expId, phaseIdx, slotIdx) {
    const exp = getActiveExpediente(expId);
    const del = exp.deliverables[phaseIdx] && exp.deliverables[phaseIdx][slotIdx];
    if (!del) return;
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="rejectDocModalBackdrop">
        <div class="procurement-modal" style="width:min(520px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Rechazar Documento con Observaciones</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${del.name} (${exp.id})</p>
            </div>
            <button type="button" id="closeRejectDocModalBtn">×</button>
          </div>
          <form id="modalRejectDocForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Motivo Técnico del Rechazo / Subsanación Requerida
                <textarea name="motivo" rows="3" required style="padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem">Falta el sello y firma del laboratorio acreditado ENAC en el anexo de resultados de la página 4.</textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelRejectDocModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit" style="background:#dc2626;border-color:#dc2626">Notificar Rechazo a ${del.owner}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeRejectDocModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelRejectDocModalBtn")?.addEventListener("click", close);
    document.getElementById("rejectDocModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "rejectDocModalBackdrop") close();
    });

    document.getElementById("modalRejectDocForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const motivo = (form.get("motivo") || "").trim();
      addExpedienteCambioLog(exp, { tipo: "Documentación", suministro: getActiveExpSuministro(exp)?.id || "General", fase: phaseIdx, titulo: `Documento con observaciones: «${del.name}»`, detalle: motivo });
      del.state = "rejected";
      del.rejectReason = motivo;

      NOTICES.unshift({
        id: `AV-0${NOTICES.length + 1}`,
        expId: exp.id,
        categoria: "Documentación Observada",
        tagClass: "warning",
        titulo: `Subsanación requerida en "${del.name}" (${exp.id})`,
        descripcion: `SOFEIN ha rechazado el documento con observaciones: "${motivo}".`,
        fecha: "Hoy, ahora",
        roles: ["admin", del.owner === "Cliente" ? "cliente" : "proveedor"],
        accion: "Subsanar Documento",
        enlace: `#${del.owner === "Cliente" ? "cliente" : "proveedor"}/expedientes/${exp.id}`
      });

      close();
      showToast(`⚠️ Documento rechazado. Se ha enviado aviso de subsanación a ${del.owner}.`);
      renderApp();
    });
  }

  function openInspectDeliverableModal(expId, phaseIdx, slotIdx) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const del = delivMap[phaseIdx] && delivMap[phaseIdx][slotIdx];
    if (!del) return;
    const phaseObj = PHASES[phaseIdx] || PHASES[0];
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="inspectDocModalBackdrop">
        <div class="procurement-modal" style="width:min(580px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Auditoría y Trazabilidad Documental</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Expediente ${exp.id} · ${phaseObj.name}</p>
            </div>
            <button type="button" id="closeInspectDocModalBtn">×</button>
          </div>
          <div class="procurement-modal-body" style="gap:14px">
            <div style="padding:16px;border-radius:10px;background:var(--entity-panel-2);border:1px solid var(--entity-line);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
              <div style="display:flex;align-items:center;gap:12px">
                <span style="display:grid;place-items:center;width:42px;height:42px;border-radius:8px;background:var(--entity-accent-soft);color:var(--entity-accent)">
                  ${icon("file", 22)}
                </span>
                <div>
                  <strong style="display:block;font-size:0.94rem;color:var(--entity-text)">${del.file || del.name}</strong>
                  <small style="color:var(--entity-muted);font-size:0.75rem">${del.name} · Formato ${del.format}</small>
                </div>
              </div>
              ${getStatusPill(del.state)}
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div style="padding:12px;border-radius:8px;border:1px solid var(--entity-line);background:var(--entity-bg)">
                <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:600">Entidad Emisora / Responsable</span>
                <strong style="display:block;margin-top:4px;font-size:0.84rem;color:var(--entity-text)">${del.owner}</strong>
              </div>
              <div style="padding:12px;border-radius:8px;border:1px solid var(--entity-line);background:var(--entity-bg)">
                <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:600">Sello Temporal de Registro</span>
                <strong style="display:block;margin-top:4px;font-size:0.84rem;color:var(--entity-text)">${del.date || "Registrado"}</strong>
              </div>
            </div>

            <div style="padding:12px 14px;border-radius:8px;border:1px solid var(--entity-line);background:var(--entity-bg)">
              <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:600">Huella Digital de Trazabilidad (Pasaporte Digital SOFEIN)</span>
              <code style="display:block;margin-top:4px;font-size:0.73rem;color:var(--entity-accent);word-break:break-all">SHA256: 8f94e2c1a04d73b912e85b02c48f19a7d6c31f09e2a4b78c9d01f3a6e4c1928d</code>
            </div>

            ${del.rejectReason ? `
              <div class="slot-rejection-box" style="margin-top:0">
                <div>
                  <strong>Observación Técnica Registrada por SOFEIN:</strong>
                  <p>${del.rejectReason}</p>
                </div>
              </div>
            ` : ""}
          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="closeInspectDocFooterBtn">Cerrar</button>
            <button class="admin-primary-button" type="button" id="downloadInspectedDocBtn">${icon("download", 14)} Descargar Original (${del.file})</button>
          </div>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeInspectDocModalBtn")?.addEventListener("click", close);
    document.getElementById("closeInspectDocFooterBtn")?.addEventListener("click", close);
    document.getElementById("inspectDocModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "inspectDocModalBackdrop") close();
    });
    document.getElementById("downloadInspectedDocBtn")?.addEventListener("click", () => {
      close();
      showToast(`Descarga iniciada: ${del.file}`);
    });
  }

  function simulateFileUpload(expId, slotIdx, phaseIdx = activeDossierPhase, isReupload = false) {
    const exp = getActiveExpediente(expId);
    showToast(isReupload ? "Subiendo versión corregida a la ranura..." : "Subiendo entregable a la ranura documental...");
    setTimeout(() => {
      if (exp.deliverables[phaseIdx] && exp.deliverables[phaseIdx][slotIdx]) {
        const suffix = isReupload ? "rev02-subsanado.pdf" : "subido.pdf";
        exp.deliverables[phaseIdx][slotIdx].file = `${exp.deliverables[phaseIdx][slotIdx].name.replace(/[^a-zA-Z0-9]/g, "-")}-${suffix}`;
        exp.deliverables[phaseIdx][slotIdx].state = "review";
        exp.deliverables[phaseIdx][slotIdx].rejectReason = null;
        exp.deliverables[phaseIdx][slotIdx].date = isReupload ? "Hoy, versión subsanada" : "Hoy, recién subido";
        showToast("✓ Archivo subido. Estado actualizado a: 'En revisión por SOFEIN'");
        renderApp();
      }
    }, 500);
  }

  // Registrar (regId vacío) o editar una incidencia/cambio. Solo SOFEIN Admin.
  function openRegistroModal(expId, regId = null) {
    const exp = getActiveExpediente(expId);
    const modalWrap = document.getElementById("modalContainer");
    if (!exp || !modalWrap || activeRole !== "admin") return;
    const reg = regId ? (exp.incidencias || []).find(r => r.id === regId) : null;
    const expSums = SUMINISTROS.filter(s => s.expId === exp.id);
    const defaultSumId = reg ? reg.sumId : (getActiveExpSuministro(exp)?.id || expSums[0]?.id || "");
    const code = reg ? reg.id : nextRegistroId(exp);
    const inputStyle = "height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0";
    const labelStyle = "display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)";
    const areaStyle = "padding:9px 11px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.45;width:100%;box-sizing:border-box;resize:vertical";

    // Valores "igual" de referencia: los del registro (al editar con el mismo suministro) o los actuales del suministro
    const previoFor = sumId => {
      if (reg && reg.sumId === sumId && reg.previo) return reg.previo;
      const s = expSums.find(x => x.id === sumId) || {};
      return { fechaEntrega: s.fechaEntrega || "", fechaEntregaIso: s.fechaEntregaIso || "", unidades: s.unidades || "", presupuesto: s.presupuesto || "" };
    };
    const changeRow = (key, label, type, currentVal, newVal, placeholder) => `
      <div class="reg-change-row" data-reg-change="${key}">
        <span class="reg-change-label">${label}</span>
        <label class="reg-change-opt"><input type="radio" name="${key}_mode" value="igual" ${newVal ? "" : "checked"} /> Igual <em data-reg-current="${key}">(${escHTML(currentVal || "—")})</em></label>
        <label class="reg-change-opt"><input type="radio" name="${key}_mode" value="nuevo" ${newVal ? "checked" : ""} /> Nuevo</label>
        <input name="${key}_valor" type="${type}" value="${escHTML(newVal || "")}" placeholder="${placeholder}" style="${inputStyle};height:34px" ${newVal ? "" : "disabled"} />
      </div>
    `;
    const prev0 = previoFor(defaultSumId);

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="regModalBackdrop">
        <div class="procurement-modal" style="width:min(680px,100%);max-height:92vh;overflow-y:auto">
          <div class="procurement-modal-head">
            <div>
              <h3>${reg ? "Editar Mediación" : "Registrar incidencia/cambio"}</h3>
            </div>
            <button type="button" id="closeRegModalBtn">×</button>
          </div>
          <form id="modalRegForm">
            <div class="procurement-modal-body" style="gap:14px">
              ${reg && (reg.firmaCliente || reg.firmaProveedor) ? `
                <p class="reg-edit-warning">${icon("alert", 14)} Al guardar los cambios se borrarán las firmas actuales y habrá que volver a pedirlas al cliente y al proveedor.</p>
              ` : ""}
              <div style="display:grid;grid-template-columns:140px 1fr;gap:12px">
                <label style="${labelStyle}">
                  Código
                  <input value="${code}" readonly style="${inputStyle};opacity:0.8;cursor:not-allowed;font-family:ui-monospace,monospace" />
                </label>
                <label style="${labelStyle}">
                  Suministro afectado
                  <select name="sumId" required style="${inputStyle}">
                    ${expSums.map(s => `<option value="${s.id}" ${s.id === defaultSumId ? "selected" : ""}>${s.id} · ${escHTML(s.tipo)}${s.descripcion ? ` — ${escHTML(s.descripcion)}` : ""}</option>`).join("")}
                  </select>
                </label>
              </div>
              <label style="${labelStyle}">
                Título de la incidencia/cambio
                <input name="titulo" required value="${escHTML(reg?.titulo || "")}" placeholder="Ej: Retraso en la expedición del segundo lote" style="${inputStyle}" />
              </label>
              <label style="${labelStyle}">
                Descripción detallada
                <textarea name="descripcion" rows="4" required placeholder="Qué ha ocurrido, quién lo comunica y cómo afecta al suministro…" style="${areaStyle}">${escHTML(reg?.descripcion || "")}</textarea>
              </label>
              <label style="${labelStyle}">
                Solución propuesta por SOFEIN
                <textarea name="solucion" rows="3" required placeholder="Acuerdo que SOFEIN propone a cliente y proveedor…" style="${areaStyle}">${escHTML(reg?.solucion || "")}</textarea>
              </label>
              <div class="reg-change-grid">
                ${changeRow("fecha", "Nueva fecha de entrega", "date", prev0.fechaEntrega, reg?.nuevaFechaEntregaIso, "")}
                ${changeRow("unidades", "Nueva cantidad de unidades", "text", prev0.unidades, reg?.nuevasUnidades, "Ej: 15.000")}
                ${changeRow("presupuesto", "Nuevo presupuesto", "text", prev0.presupuesto, reg?.nuevoPresupuesto, "Ej: 295.000 €")}
              </div>
              ${renderCreateAttachHTML("registro", true, Infinity)}
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelRegModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} ${reg ? "Guardar y pedir firmas" : "Registrar"}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const form = document.getElementById("modalRegForm");
    const attachBox = form.querySelector(".create-attach");
    bindCreateAttachments(form);
    (reg?.adjuntos || []).forEach(a => addCreateAttachRow(attachBox, null, a));

    form.querySelectorAll(".reg-change-row").forEach(row => {
      const valInput = row.querySelector('input[name$="_valor"]');
      row.querySelectorAll('input[type="radio"]').forEach(radio => radio.addEventListener("change", () => {
        valInput.disabled = radio.value === "igual" && radio.checked;
        if (!valInput.disabled) valInput.focus();
      }));
    });
    form.querySelector('[name="sumId"]').addEventListener("change", e => {
      const p = previoFor(e.target.value);
      form.querySelector('[data-reg-current="fecha"]').textContent = `(${p.fechaEntrega || "—"})`;
      form.querySelector('[data-reg-current="unidades"]').textContent = `(${p.unidades || "—"})`;
      form.querySelector('[data-reg-current="presupuesto"]').textContent = `(${p.presupuesto || "—"})`;
    });

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeRegModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelRegModalBtn")?.addEventListener("click", close);
    document.getElementById("regModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "regModalBackdrop") close();
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(form);
      const valueOf = key => fd.get(`${key}_mode`) === "nuevo" ? (fd.get(`${key}_valor`) || "").trim() || null : null;
      const sumId = fd.get("sumId");
      const target = reg || { id: code, fechaRegistro: todayDocDate(), adendaId: null };
      Object.assign(target, {
        sumId,
        titulo: (fd.get("titulo") || "").trim(),
        descripcion: (fd.get("descripcion") || "").trim(),
        solucion: (fd.get("solucion") || "").trim(),
        previo: previoFor(sumId),
        nuevaFechaEntregaIso: valueOf("fecha"),
        nuevasUnidades: valueOf("unidades"),
        nuevoPresupuesto: valueOf("presupuesto"),
        adjuntos: readCreateAttachments(attachBox).map(a => ({ name: a.nombre, file: a.fileName, fileUrl: a.fileUrl, visibleTo: a.visibleTo }))
      });
      // Registro nuevo o editado: las firmas se (re)piden
      Object.assign(target, {
        firmaCliente: false, firmaClienteFecha: null, firmaClienteUsuario: null,
        firmaProveedor: false, firmaProveedorFecha: null, firmaProveedorUsuario: null
      });
      syncRegistroLegacyFields(target);
      if (!reg) exp.incidencias.unshift(target);

      pushAutoNotice({
        exp, sumId, roles: ["cliente", "proveedor"],
        categoria: "Incidencia / cambio",
        titulo: reg ? `${target.id} modificado: vuelve a firmarlo` : `SOFEIN ha registrado ${target.id}: pendiente de tu firma`,
        descripcion: target.titulo,
        accion: "Firmar", tab: "incidents"
      });
      addExpedienteCambioLog(exp, {
        tipo: reg ? "Edición de registro" : "Nuevo registro",
        suministro: sumId,
        titulo: `${target.id} ${reg ? "editado (firmas reiniciadas)" : "registrado"} · ${target.titulo}`
      });
      close();
      showToast(reg ? `✓ ${target.id} actualizado. Se han reiniciado las firmas.` : `✓ ${target.id} registrado. Pendiente de firma de cliente y proveedor.`);
      renderApp();
    });
  }

  function openDeleteRegistroModal(expId, regId) {
    const exp = getActiveExpediente(expId);
    const reg = exp ? (exp.incidencias || []).find(r => r.id === regId) : null;
    const modalWrap = document.getElementById("modalContainer");
    if (!reg || !modalWrap || activeRole !== "admin") return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="delRegModalBackdrop">
        <div class="procurement-modal" style="width:min(460px,100%)">
          <div class="procurement-modal-head">
            <div><h3>Eliminar ${reg.id}</h3></div>
            <button type="button" id="closeDelRegModalBtn">×</button>
          </div>
          <div class="procurement-modal-body">
            <p style="margin:0;font-size:0.82rem;color:var(--entity-text)">Se eliminará <b>${reg.id} · ${escHTML(reg.titulo)}</b> del registro de ${exp.id}, con sus firmas. Esta acción no se puede deshacer.</p>
          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="cancelDelRegModalBtn">Cancelar</button>
            <button class="admin-primary-button is-danger" type="button" id="confirmDelRegBtn">${icon("x", 14)} Eliminar</button>
          </div>
        </div>
      </div>
    `;
    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeDelRegModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelDelRegModalBtn")?.addEventListener("click", close);
    document.getElementById("delRegModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "delRegModalBackdrop") close();
    });
    document.getElementById("confirmDelRegBtn")?.addEventListener("click", () => {
      exp.incidencias = exp.incidencias.filter(r => r.id !== reg.id);
      addExpedienteCambioLog(exp, { tipo: "Eliminación de registro", suministro: reg.sumId || "General", titulo: `${reg.id} eliminado · ${reg.titulo}` });
      close();
      showToast(`✓ ${reg.id} eliminado del registro`);
      renderApp();
    });
  }

  function openSignIncidentModal(expId, incId, signerRole) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const exp = getActiveExpediente(expId);
    const inc = exp ? exp.incidencias.find(i => i.id === incId) : null;
    if (!inc || activeRole !== signerRole) return;

    const isCliente = signerRole === "cliente";
    const sum = SUMINISTROS.find(s => s.id === inc.sumId);
    const partyName = isCliente ? exp.cliente : (sum?.proveedor || exp.proveedor || "Proveedor");
    const imp = describeRegistroImpact(inc);

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="signModalBackdrop">
        <div class="procurement-modal" style="width:min(580px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Firmar ${inc.id}</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${escHTML(inc.titulo)} · ${exp.id}</p>
            </div>
            <button type="button" id="closeSignModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalSignForm">
            <div class="procurement-modal-body" style="gap:14px">
              <div class="reg-sign-summary">
                <span class="reg-section-label">Solución propuesta por SOFEIN</span>
                <p>${escHTML(inc.solucion || "")}</p>
                <div class="reg-sign-impacts">
                  <span><b>Plazo:</b> ${imp.plazo}</span>
                  <span><b>Unidades:</b> ${imp.unidades}</span>
                  <span><b>Presupuesto:</b> ${imp.coste}</span>
                </div>
              </div>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Persona que firma
                <input name="signerUser" required value="${isCliente ? `Luis M. Aranzadi (${partyName})` : `Carlos Mendía (${partyName})`}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              <label style="display:flex;align-items:flex-start;gap:10px;font-size:0.77rem;line-height:1.5;color:var(--entity-text);cursor:pointer;padding:10px 12px;background:var(--entity-panel-2);border-radius:6px;border:1px solid var(--entity-line)">
                <input type="checkbox" required style="margin-top:2px;accent-color:var(--entity-accent)" />
                <span>Acepto, en representación de <b>${escHTML(partyName)}</b>, la solución y los nuevos términos de este registro.</span>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelSignModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Firmar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeSignModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelSignModalBtn")?.addEventListener("click", close);
    document.getElementById("signModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "signModalBackdrop") close();
    });

    document.getElementById("modalSignForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const user = form.get("signerUser");
      const nowStr = `${todayDocDate()}, ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;

      if (isCliente) {
        inc.firmaCliente = true;
        inc.firmaClienteFecha = nowStr;
        inc.firmaClienteUsuario = user;
      } else {
        inc.firmaProveedor = true;
        inc.firmaProveedorFecha = nowStr;
        inc.firmaProveedorUsuario = user;
      }
      addExpedienteCambioLog(exp, { tipo: "Firma de registro", suministro: inc.sumId || "General", titulo: `${roleLabel(signerRole)} firma ${inc.id}`, detalle: `${user} · ${inc.titulo}` });
      syncRegistroLegacyFields(inc);
      const closed = closeRegistroIfSigned(exp, inc);
      pushAutoNotice({
        exp, sumId: inc.sumId, roles: ["admin", isCliente ? "proveedor" : "cliente"],
        categoria: "Incidencia / cambio", tagClass: closed ? "complete" : "review",
        titulo: `${roleLabel(signerRole)} ha firmado ${inc.id}`,
        descripcion: closed ? `${inc.titulo}. Con las dos firmas, el registro queda cerrado con la ${inc.adendaId}.` : inc.titulo,
        accion: "Ver registro", tab: "incidents"
      });

      close();
      showToast(closed
        ? `✓ ${inc.id} firmado por las dos partes. Cerrado con la ${inc.adendaId}.`
        : `✓ ${inc.id} firmado. Pendiente de la firma del ${isCliente ? "proveedor" : "cliente"}.`);
      renderApp();
    });
  }

  function openConsolidatedAddendumModal(expId, incId) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const exp = getActiveExpediente(expId);
    const inc = exp ? exp.incidencias.find(i => i.id === incId) : null;
    if (!inc) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="addendumDocBackdrop">
        <div class="procurement-modal" style="width:min(780px,100%);max-height:92vh;overflow-y:auto">
          <div class="procurement-modal-head">
            <div>
              <h3>Documento Oficial de Adenda Contractual Consolidada</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Sello Oficial SOFEIN Digital · Trazabilidad Inmutable</p>
            </div>
            <button type="button" id="closeAddendumDocBtn" aria-label="Cerrar">×</button>
          </div>
          
          <div class="procurement-modal-body" style="gap:20px;padding:24px">
            
            <div class="addendum-official-doc">
              <!-- Membrete Oficial -->
              <div class="addendum-doc-header">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                    <span style="font-size:0.75rem;font-weight:800;letter-spacing:0.08em;color:var(--entity-accent);text-transform:uppercase">SOFEIN Digital HQ</span>
                    <span class="dossier-chip" style="font-size:0.68rem;background:rgba(16, 185, 129, 0.12);color:#065F46">Certificado Oficial</span>
                  </div>
                  <h4 style="margin:0 0 4px;font-size:1.15rem;color:var(--entity-text);letter-spacing:-0.02em">
                    ADENDA CONTRACTUAL VINCULANTE AL EXPEDIENTE ${exp.id}
                  </h4>
                  <span style="font-size:0.76rem;color:var(--entity-muted)">Código Registral: <b>${inc.adendaId || "ADENDA-014-01"}</b> · Fecha de emisión: <b>${inc.adendaFecha || "Hoy"}</b></span>
                </div>
                <div style="text-align:right">
                  <span style="display:inline-block;padding:4px 10px;border-radius:4px;background:var(--entity-panel-2);border:1px solid var(--entity-line);font-size:0.72rem;font-family:monospace;font-weight:600">
                    LOTE: ${exp.producto.split(" ")[0]}
                  </span>
                </div>
              </div>

              <!-- Comparecencia -->
              <div class="addendum-doc-clause">
                <h5>1. Comparecencia de las Partes</h5>
                <p>
                  Intervienen en el presente instrumento contractual: de una parte, <b>SOFEIN Digital, S.L.</b>, en calidad de plataforma gestora imparcial y garante del protocolo de suministro; de segunda parte, <b>${exp.cliente}</b>, en calidad de Cliente Contratista principal de obra; y de tercera parte, <b>${exp.proveedor || "Taller Homologado"}</b>, en calidad de Proveedor Industrial Suministrador.
                </p>
              </div>

              <!-- Exposición de Motivos -->
              <div class="addendum-doc-clause">
                <h5>2. Antecedentes y Hechos Sobrevenidos (Registro ${inc.id})</h5>
                <p>
                  Con fecha <b>${inc.fecha}</b> se comunicó formalmente la alteración calificada como <i>"${inc.tipo}"</i> (${inc.categoria}), consistente en: "${inc.descripcion}". Analizado el impacto operativo por el gabinete técnico de SOFEIN, se formuló propuesta de mediación resolutiva.
                </p>
              </div>

              <!-- Cláusulas Vinculantes -->
              <div class="addendum-doc-clause">
                <h5>3. Cláusula Primera — Modificación del Cronograma y Entregas de Vía</h5>
                <p>
                  Las partes pactan formalmente la reestructuración de la entrega en los siguientes términos definitivos: <b>${inc.nuevoPlazoAcordado || "Cronograma reajustado"}</b>. El suministrador se compromete a priorizar la expedición para evitar la alteración del plan de obra.
                </p>
              </div>

              <div class="addendum-doc-clause">
                <h5>4. Cláusula Segunda — Régimen Económico y Precios</h5>
                <p>
                  El régimen económico del expediente se fija en <b>${inc.nuevoCosteAcordado || "Sin alteración económica"}</b>, ratificando las condiciones de pago del Acuerdo Marco original sin sobrecostes indebidos para el constructor.
                </p>
              </div>

              <div class="addendum-doc-clause">
                <h5>5. Cláusula Tercera — Garantías Técnicas y Homologación Adif</h5>
                <p>
                  ${inc.resolucionTecnica || "Se mantiene la obligatoriedad de aportar los certificados de ensayo destructivo de laboratorio conforme a norma europea EN y pliego técnico de Adif para cada partida expedida."}
                </p>
              </div>

              <div class="addendum-doc-clause">
                <h5>6. Cláusula Cuarta — Eficacia Jurídica</h5>
                <p>
                  La presente adenda tiene plenos efectos vinculantes entre las partes, habiendo sido ratificada mediante firma electrónica del cliente y del proveedor en la plataforma SOFEIN.
                </p>
              </div>

              <!-- Cuadro de Firmas Electrónicas Acreditadas -->
              <div class="addendum-signatures-box">
                <div class="addendum-sign-block">
                  <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:700">Validación Garante SOFEIN</span>
                  <strong>${inc.firmaSofeinUsuario || "Ángel Plaza (SOFEIN HQ)"}</strong>
                  <span>✓ Certificado digitalmente</span>
                  <small style="color:var(--entity-muted);font-size:0.68rem">${inc.firmaSofeinFecha || "Fecha de emisión"}</small>
                </div>
                <div class="addendum-sign-block">
                  <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:700">Firma Proveedor</span>
                  <strong>${inc.firmaProveedorUsuario || "Proveedor"}</strong>
                  <span>${inc.firmaProveedor ? "✓ Firma electrónica acreditada" : "⏳ Pendiente de firma"}</span>
                  <small style="color:var(--entity-muted);font-size:0.68rem">${inc.firmaProveedorFecha || "Conforme"}</small>
                </div>
                <div class="addendum-sign-block">
                  <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:700">Firma Cliente</span>
                  <strong>${inc.firmaClienteUsuario || "Cliente"}</strong>
                  <span>${inc.firmaCliente ? "✓ Firma electrónica acreditada" : "⏳ Pendiente de firma"}</span>
                  <small style="color:var(--entity-muted);font-size:0.68rem">${inc.firmaClienteFecha || "Conforme"}</small>
                </div>
              </div>

              <!-- Huella Criptográfica SHA-256 -->
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:10px;border-top:1px solid var(--entity-line);font-size:0.72rem;color:var(--entity-muted)">
                <span>Huella Digital Inmutable: <code style="font-family:monospace;background:var(--entity-panel-2);padding:2px 6px;border-radius:4px">${inc.adendaHash || "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}</code></span>
                <span style="font-weight:600;color:#10B981">✓ Incorporado al Pasaporte Digital</span>
              </div>
            </div>

          </div>
          <div class="procurement-modal-footer">
            <button class="admin-quiet-button" type="button" id="closeAddendumFooterBtn">Cerrar</button>
            <button class="admin-primary-button" type="button" id="printAddendumBtn">${icon("download", 14)} Imprimir / Guardar Copia PDF</button>
          </div>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeAddendumDocBtn")?.addEventListener("click", close);
    document.getElementById("closeAddendumFooterBtn")?.addEventListener("click", close);
    document.getElementById("addendumDocBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "addendumDocBackdrop") close();
    });
    document.getElementById("printAddendumBtn")?.addEventListener("click", () => {
      document.body.classList.add("printing-modal");
      const cleanup = () => {
        document.body.classList.remove("printing-modal");
        window.removeEventListener("afterprint", cleanup);
      };
      window.addEventListener("afterprint", cleanup);
      window.print();
      setTimeout(cleanup, 2000);
    });
  }

  // Emitir aviso desde un expediente (solo SOFEIN Admin). General → solo Cliente; suministro → Cliente, Proveedor o ambos.
  const NOTICE_PRIORIDADES = {
    normal: { label: "Normal", tagClass: "review" },
    alta: { label: "Alta", tagClass: "warning" },
    urgente: { label: "Urgente", tagClass: "warning" }
  };

  const NOTICE_CATEGORIAS = ["Aviso SOFEIN", "Requerimiento documental", "Plazo / calendario", "Instrucción técnica", "Coordinación", "Información de suministro"];

  // pickExp: desde la bandeja de Avisos se elige el expediente (código y título) y la categoría
  function openEmitExpNoticeModal(expId, { pickExp = false, keep = {} } = {}) {
    const exp = getActiveExpediente(expId || EXPEDIENTES[0]?.id);
    const modalWrap = document.getElementById("modalContainer");
    if (!exp || !modalWrap || activeRole !== "admin") return;
    const expSums = SUMINISTROS.filter(s => s.expId === exp.id);
    const inputStyle = "height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0";
    const labelStyle = "display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)";
    const proveedorOf = sumId => {
      const s = expSums.find(x => x.id === sumId);
      return s && s.proveedor && s.proveedor !== "Por determinar" ? s.proveedor : "";
    };

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="expNoticeModalBackdrop">
        <div class="procurement-modal" style="width:min(560px,100%)">
          <div class="procurement-modal-head">
            <div><h3>Emitir Aviso</h3></div>
            <button type="button" id="closeExpNoticeModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalExpNoticeForm">
            <div class="procurement-modal-body" style="gap:14px">
              <div style="display:grid;grid-template-columns:${pickExp ? "1fr" : "minmax(0,0.8fr) minmax(0,1.2fr)"};gap:12px">
                <label style="${labelStyle}">
                  Expediente
                  ${pickExp ? `
                    <select name="expId" style="${inputStyle}">
                      ${EXPEDIENTES.map(e => `<option value="${e.id}" ${e.id === exp.id ? "selected" : ""}>${e.id} · ${escHTML(getExpVisualMeta(e).tituloGenerico)}</option>`).join("")}
                    </select>
                  ` : `<input value="${exp.id}" readonly style="${inputStyle};opacity:0.8;cursor:not-allowed;font-family:ui-monospace,monospace" />`}
                </label>
                <label style="${labelStyle}">
                  Suministro
                  <select name="sumId" style="${inputStyle}">
                    <option value="">General del expediente</option>
                    ${expSums.map(s => `<option value="${s.id}">${s.id} · ${escHTML(s.tipo)}</option>`).join("")}
                  </select>
                </label>
              </div>
              <fieldset class="exp-notice-recipients">
                <legend>Destinatarios</legend>
                <label><input type="radio" name="destino" value="cliente" checked /> Cliente <em>${escHTML(exp.cliente)}</em></label>
                <label data-needs-sum><input type="radio" name="destino" value="proveedor" disabled /> Proveedor <em data-proveedor-name></em></label>
                <label data-needs-sum><input type="radio" name="destino" value="ambos" disabled /> Ambos</label>
                <p class="exp-notice-hint" data-general-hint>Un aviso general del expediente solo puede ir al cliente, porque puede haber varios proveedores.</p>
              </fieldset>
              ${pickExp ? `
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  <label style="${labelStyle}">
                    Categoría
                    <select name="categoria" style="${inputStyle}">
                      ${NOTICE_CATEGORIAS.map(c => `<option value="${escHTML(c)}" ${keep.categoria === c ? "selected" : ""}>${escHTML(c)}</option>`).join("")}
                    </select>
                  </label>
                  <label style="${labelStyle}">
                    Prioridad (opcional)
                    <select name="prioridad" style="${inputStyle}">
                      ${Object.entries(NOTICE_PRIORIDADES).map(([k, p]) => `<option value="${k}" ${keep.prioridad === k ? "selected" : ""}>${p.label}</option>`).join("")}
                    </select>
                  </label>
                </div>
              ` : ""}
              <label style="${labelStyle}">
                Título del aviso
                <input name="titulo" required placeholder="Ej: Confirmar ventana de descarga en obra" value="${escHTML(keep.titulo || "")}" style="${inputStyle}" />
              </label>
              ${pickExp ? "" : `
                <label style="${labelStyle}">
                  Prioridad (opcional)
                  <select name="prioridad" style="${inputStyle}">
                    ${Object.entries(NOTICE_PRIORIDADES).map(([k, p]) => `<option value="${k}">${p.label}</option>`).join("")}
                  </select>
                </label>
              `}
              <label style="${labelStyle}">
                Descripción del aviso
                <textarea name="descripcion" rows="4" required placeholder="Qué debe saber o hacer el destinatario…" style="padding:9px 11px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.45;resize:vertical">${escHTML(keep.descripcion || "")}</textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelExpNoticeModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("inbox", 14)} Emitir Aviso</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const form = document.getElementById("modalExpNoticeForm");
    const sumSelect = form.querySelector('[name="sumId"]');
    const syncRecipients = () => {
      const isGeneral = !sumSelect.value;
      form.querySelectorAll("[data-needs-sum] input").forEach(inp => { inp.disabled = isGeneral; });
      form.querySelectorAll("[data-needs-sum]").forEach(l => l.classList.toggle("is-disabled", isGeneral));
      form.querySelector("[data-general-hint]").style.display = isGeneral ? "" : "none";
      form.querySelector("[data-proveedor-name]").textContent = isGeneral ? "" : (proveedorOf(sumSelect.value) || "por asignar");
      if (isGeneral) form.querySelector('input[name="destino"][value="cliente"]').checked = true;
    };
    sumSelect.addEventListener("change", syncRecipients);
    syncRecipients();
    form.querySelector('[name="expId"]')?.addEventListener("change", e => {
      const fd = new FormData(form);
      openEmitExpNoticeModal(e.target.value, {
        pickExp: true,
        keep: { titulo: fd.get("titulo"), descripcion: fd.get("descripcion"), categoria: fd.get("categoria"), prioridad: fd.get("prioridad") }
      });
    });

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeExpNoticeModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelExpNoticeModalBtn")?.addEventListener("click", close);
    document.getElementById("expNoticeModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "expNoticeModalBackdrop") close();
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(form);
      const sumId = fd.get("sumId") || null;
      const destino = sumId ? fd.get("destino") : "cliente";
      const prioridad = NOTICE_PRIORIDADES[fd.get("prioridad")] ? fd.get("prioridad") : "normal";
      const sum = sumId ? expSums.find(s => s.id === sumId) : null;
      const roles = ["admin", ...(destino === "ambos" ? ["cliente", "proveedor"] : [destino])];

      NOTICES.unshift({
        id: `AV-${Date.now()}`,
        expId: exp.id,
        sumId,
        suministro: sum ? `${sum.num} · ${sum.tipo}` : "General del Expediente",
        categoria: (() => {
          const base = (pickExp && fd.get("categoria")) || "Aviso SOFEIN";
          return prioridad === "normal" ? base : `${base} · ${NOTICE_PRIORIDADES[prioridad].label}`;
        })(),
        prioridad,
        tagClass: NOTICE_PRIORIDADES[prioridad].tagClass,
        titulo: (fd.get("titulo") || "").trim(),
        descripcion: (fd.get("descripcion") || "").trim(),
        fecha: "Hoy, recién emitido",
        roles,
        accion: "Ver expediente",
        enlace: `#${activeRole}/expedientes/${exp.id}?tab=comms`
      });
      close();
      addExpedienteCambioLog(exp, { tipo: "Aviso emitido", suministro: sumId || "General", titulo: `Aviso a ${destino === "ambos" ? "cliente y proveedor" : destino}: ${(fd.get("titulo") || "").trim()}`, detalle: NOTICE_PRIORIDADES[prioridad].label });
      const destLabel = destino === "ambos" ? "cliente y proveedor" : destino;
      showToast(`✓ Aviso emitido al ${destLabel === "cliente y proveedor" ? "cliente y al proveedor" : destLabel}`);
      renderApp();
    });
  }

  function openAddOrEditEntityModal(entityToEdit = null, defaultType = "proveedor") {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    const isEdit = !!entityToEdit;
    const targetType = isEdit ? (entityToEdit.id && entityToEdit.id.startsWith("CLI") ? "cliente" : "proveedor") : defaultType;

    // Título limpio sin subtítulo
    const modalTitle = isEdit 
      ? (targetType === "proveedor" ? "Editar proveedor" : "Editar cliente")
      : "Añadir cliente o proveedor";

    // Conformidades disponibles: catálogo de conformidades SOFEIN + ya asignadas
    const catalogConfList = getActiveConformidades().map(c => c.nombre);
    const initialConf = entityToEdit?.conformidades || entityToEdit?.homologaciones || (isEdit ? [] : ["ISO 9001", "ISO 14001"]);
    const allConfOptions = Array.from(new Set([...catalogConfList, ...initialConf]));

    // Suministros iniciales y condiciones por suministro
    const rawInitialSums = entityToEdit?.suministros || (entityToEdit?.materiales ? [entityToEdit.materiales] : []);
    const initialSums = getGenericSuministrosList(rawInitialSums);
    const selectedSuministrosSet = new Set(initialSums);

    // Mapa de condiciones por suministro
    const suministrosCondMap = {};
    const existingCondMap = entityToEdit?.suministrosCondiciones || {};
    GENERIC_SUMINISTROS.forEach(s => {
      suministrosCondMap[s] = {
        leadTime: existingCondMap[s]?.leadTime || (entityToEdit?.leadTimeMedio && initialSums.includes(s) ? entityToEdit.leadTimeMedio : ""),
        condicionesPago: existingCondMap[s]?.condicionesPago || (entityToEdit?.condicionesPago && initialSums.includes(s) ? entityToEdit.condicionesPago : "")
      };
    });

    const selectedConformidadesSet = new Set(initialConf);

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="addEntityModalBackdrop">
        <div class="procurement-modal" style="width:min(600px,100%)">
          <div class="procurement-modal-head" style="padding:18px 24px">
            <h3 style="margin:0;font-size:1.15rem;font-weight:600">${modalTitle}</h3>
            <button type="button" id="closeAddEntityModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalAddEntityForm">
            <div class="procurement-modal-body" style="gap:16px;max-height:calc(85vh - 130px);overflow-y:auto;overflow-x:hidden;padding:20px 24px;box-sizing:border-box">
              
              <!-- Tipo -->
              <div style="display:grid;gap:6px">
                <label style="font-size:0.75rem;font-weight:600;color:var(--entity-muted)">Tipo <span style="color:#ef4444">*</span></label>
                <select id="entityTypeSelect" name="tipo" ${isEdit ? "disabled" : ""} required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box">
                  <option value="proveedor" ${targetType === "proveedor" ? "selected" : ""}>Proveedor</option>
                  <option value="cliente" ${targetType === "cliente" ? "selected" : ""}>Cliente</option>
                </select>
                ${isEdit ? `<input type="hidden" name="tipo" value="${targetType}">` : ''}
              </div>

              <!-- Razón Social / Nombre (Obligatorio) y CIF (Opcional) -->
              <div style="display:grid;grid-template-columns:1fr 140px;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  <span>Razón Social / Nombre <span style="color:#ef4444">*</span></span>
                  <input name="nombre" required value="${(entityToEdit?.nombre || '').replace(/"/g, '&quot;')}" placeholder="Ej: Aceros Ferroviarios, S.L." style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  CIF
                  <input name="cif" value="${(entityToEdit?.cif || '').replace(/"/g, '&quot;')}" placeholder="Ej: B-48192837" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
              </div>

              <!-- Sede (Opcional) -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Sede / Fábrica principal
                <input name="sede" value="${(entityToEdit?.sede || '').replace(/"/g, '&quot;')}" placeholder="Ej: Amurrio (Álava) / Bilbao" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
              </label>

              <!-- Email y Teléfono (Opcionales) -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Email de contacto
                  <input name="email" type="email" value="${(entityToEdit?.email || entityToEdit?.contacto || '').replace(/"/g, '&quot;')}" placeholder="contacto@empresa.es" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Teléfono de contacto
                  <input name="telefono" type="tel" value="${(entityToEdit?.telefono || '').replace(/"/g, '&quot;')}" placeholder="Ej: +34 945 393 210" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
              </div>

              <!-- CAMPOS DE PROVEEDOR -->
              <div id="proveedorFields" style="display:${targetType === 'proveedor' ? 'grid' : 'none'};gap:16px">
                
                <!-- Dropdown de Suministros -->
                <div style="display:grid;gap:6px">
                  <label style="font-size:0.75rem;font-weight:600;color:var(--entity-muted)">Suministros</label>
                  <div class="dir-multiselect-wrap" id="wrapDropSuministros">
                    <div class="dir-multiselect-box" id="btnDropSuministros" tabindex="0">
                      <div class="dir-multiselect-tags" id="tagsSelectedSuministros"></div>
                      <span style="color:var(--entity-muted);display:inline-flex">${icon("chevronDown", 13)}</span>
                    </div>
                    <div class="dir-multiselect-menu" id="menuDropSuministros" hidden>
                      ${GENERIC_SUMINISTROS.map(s => `
                        <label class="dir-multiselect-option">
                          <input type="checkbox" data-opt-suministro="${s}" ${selectedSuministrosSet.has(s) ? 'checked' : ''} />
                          <span class="dir-tag dir-tag-sum" style="font-size:0.74rem">${s}</span>
                        </label>
                      `).join("")}
                    </div>
                  </div>
                </div>

                <!-- Dropdown de Conformidades -->
                <div style="display:grid;gap:6px">
                  <label style="font-size:0.75rem;font-weight:600;color:var(--entity-muted)">Conformidades</label>
                  <div class="dir-multiselect-wrap" id="wrapDropConformidades">
                    <div class="dir-multiselect-box" id="btnDropConformidades" tabindex="0">
                      <div class="dir-multiselect-tags" id="tagsSelectedConformidades"></div>
                      <span style="color:var(--entity-muted);display:inline-flex">${icon("chevronDown", 13)}</span>
                    </div>
                    <div class="dir-multiselect-menu" id="menuDropConformidades" hidden>
                      ${allConfOptions.map(c => {
                        const cl = c.toLowerCase();
                        let tagClass = "";
                        if (cl.includes("tratamiento") || cl.includes("creosota") || cl.includes("autoclave")) tagClass = "dir-tag-treatment";
                        else if (cl.includes("iso") || cl.includes("ce") || cl.includes("aenor") || cl.includes("en ") || cl.includes("nav-") || cl.includes("tipo 1")) tagClass = "dir-tag-iso";
                        return `
                          <label class="dir-multiselect-option">
                            <input type="checkbox" data-opt-conformidad="${escHTML(c)}" ${selectedConformidadesSet.has(c) ? 'checked' : ''} />
                            <span class="dir-tag ${tagClass}" style="font-size:0.72rem">${c}</span>
                          </label>
                        `;
                      }).join("")}
                    </div>
                  </div>
                </div>

                <!-- Cajas específicas de Plazo Medio y Condiciones de Pago por cada suministro -->
                <div style="display:grid;gap:10px;margin-top:2px">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:0.75rem;font-weight:600;color:var(--entity-muted)">Condiciones por suministro</span>
                    <small style="font-size:0.7rem;color:var(--entity-muted)">(Plazo medio y condiciones habituales específicas)</small>
                  </div>
                  <div id="suministrosCondBoxesWrap" style="display:grid;gap:10px"></div>
                </div>

              </div>

              <!-- CAMPOS DE CLIENTE -->
              <div id="clienteFields" style="display:${targetType === 'cliente' ? 'grid' : 'none'};gap:14px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Actividad / Especialidad ferroviaria
                  <input name="actividad" value="${(entityToEdit?.actividad || '').replace(/"/g, '&quot;')}" placeholder="Ej: Constructora Ferroviaria (Licitaciones Adif / Metro)" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                    Representante Legal / Dirección Compras
                    <input name="representante" value="${(entityToEdit?.representante || '').replace(/"/g, '&quot;')}" placeholder="Ej: María González López" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                  </label>
                  <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                    Condiciones de pago habituales
                    <input name="condicionesPagoCli" value="${(entityToEdit?.condicionesPago || '').replace(/"/g, '&quot;')}" placeholder="Ej: Confirming 60 días" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                  </label>
                </div>
              </div>

            </div>
            <div class="procurement-modal-footer" style="padding:16px 24px">
              <button class="admin-quiet-button" type="button" id="cancelAddEntityBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${isEdit ? 'Guardar cambios' : 'Dar de alta'}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeAddEntityModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelAddEntityBtn")?.addEventListener("click", close);
    document.getElementById("addEntityModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "addEntityModalBackdrop") close();
    });

    const typeSelect = document.getElementById("entityTypeSelect");
    const prvFields = document.getElementById("proveedorFields");
    const cliFields = document.getElementById("clienteFields");

    typeSelect?.addEventListener("change", e => {
      if (e.target.value === "proveedor") {
        prvFields.style.display = "grid";
        cliFields.style.display = "none";
      } else {
        prvFields.style.display = "none";
        cliFields.style.display = "grid";
      }
    });

    // Renderizar tags de Suministros seleccionados
    const tagsSuministrosEl = document.getElementById("tagsSelectedSuministros");
    const renderSuministrosTagsUI = () => {
      if (!tagsSuministrosEl) return;
      if (selectedSuministrosSet.size === 0) {
        tagsSuministrosEl.innerHTML = `<span class="dir-multiselect-placeholder">Seleccionar suministros...</span>`;
      } else {
        tagsSuministrosEl.innerHTML = Array.from(selectedSuministrosSet).map(s => `
          <span class="dir-tag dir-tag-sum dir-multiselect-tag">
            ${s}
            <button type="button" class="dir-multiselect-tag-remove" data-remove-sum="${s}">×</button>
          </span>
        `).join("");
      }
    };

    // Renderizar cajas de Condiciones por cada suministro
    const condBoxesWrap = document.getElementById("suministrosCondBoxesWrap");
    const renderCondBoxesUI = () => {
      if (!condBoxesWrap) return;
      const sums = Array.from(selectedSuministrosSet);
      if (sums.length === 0) {
        condBoxesWrap.innerHTML = `
          <div style="padding:12px;border:1px dashed var(--entity-line);border-radius:6px;text-align:center;font-size:0.75rem;color:var(--entity-muted)">
            Selecciona uno o más suministros en el desplegable superior para indicar su plazo y condiciones.
          </div>
        `;
        return;
      }
      condBoxesWrap.innerHTML = sums.map(s => {
        const cond = suministrosCondMap[s] || { leadTime: "", condicionesPago: "" };
        return `
          <div style="padding:10px 12px;border-radius:6px;background:var(--entity-panel-2, rgba(255,255,255,0.03));border:1px solid var(--entity-line);display:grid;gap:8px">
            <div style="display:flex;align-items:center;gap:6px">
              <span class="dir-tag dir-tag-sum" style="font-weight:600;font-size:0.74rem">${s}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <label style="display:grid;gap:4px;font-size:0.72rem;font-weight:500;color:var(--entity-muted)">
                Plazo medio (lead time)
                <input type="text" data-sum-lead-time="${s}" value="${(cond.leadTime || '').replace(/"/g, '&quot;')}" placeholder="Ej: 42 días" style="height:34px;padding:0 8px;border-radius:5px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.78rem" />
              </label>
              <label style="display:grid;gap:4px;font-size:0.72rem;font-weight:500;color:var(--entity-muted)">
                Condiciones de pago habituales
                <input type="text" data-sum-cond-pago="${s}" value="${(cond.condicionesPago || '').replace(/"/g, '&quot;')}" placeholder="Ej: Confirming 60 días" style="height:34px;padding:0 8px;border-radius:5px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.78rem" />
              </label>
            </div>
          </div>
        `;
      }).join("");

      // Listeners de input en cajas de condiciones
      condBoxesWrap.querySelectorAll("[data-sum-lead-time]").forEach(inp => {
        inp.addEventListener("input", e => {
          const s = inp.dataset.sumLeadTime;
          if (!suministrosCondMap[s]) suministrosCondMap[s] = {};
          suministrosCondMap[s].leadTime = e.target.value.trim();
        });
      });
      condBoxesWrap.querySelectorAll("[data-sum-cond-pago]").forEach(inp => {
        inp.addEventListener("input", e => {
          const s = inp.dataset.sumCondPago;
          if (!suministrosCondMap[s]) suministrosCondMap[s] = {};
          suministrosCondMap[s].condicionesPago = e.target.value.trim();
        });
      });
    };

    // Renderizar tags de Conformidades seleccionadas
    const tagsConformidadesEl = document.getElementById("tagsSelectedConformidades");
    const renderConformidadesTagsUI = () => {
      if (!tagsConformidadesEl) return;
      if (selectedConformidadesSet.size === 0) {
        tagsConformidadesEl.innerHTML = `<span class="dir-multiselect-placeholder">Seleccionar conformidades...</span>`;
      } else {
        tagsConformidadesEl.innerHTML = Array.from(selectedConformidadesSet).map(c => {
          const cl = c.toLowerCase();
          let tagClass = "";
          if (cl.includes("tratamiento") || cl.includes("creosota") || cl.includes("autoclave")) tagClass = "dir-tag-treatment";
          else if (cl.includes("iso") || cl.includes("ce") || cl.includes("aenor") || cl.includes("en ") || cl.includes("nav-") || cl.includes("tipo 1")) tagClass = "dir-tag-iso";
          return `
            <span class="dir-tag ${tagClass} dir-multiselect-tag">
              ${c}
              <button type="button" class="dir-multiselect-tag-remove" data-remove-conf="${escHTML(c)}">×</button>
            </span>
          `;
        }).join("");
      }
    };

    renderSuministrosTagsUI();
    renderCondBoxesUI();
    renderConformidadesTagsUI();

    // Toggle Dropdown Suministros
    const btnDropSum = document.getElementById("btnDropSuministros");
    const menuDropSum = document.getElementById("menuDropSuministros");
    btnDropSum?.addEventListener("click", e => {
      if (e.target.closest(".dir-multiselect-tag-remove")) return;
      menuDropSum.hidden = !menuDropSum.hidden;
      if (!menuDropSum.hidden && menuDropConf) menuDropConf.hidden = true;
    });

    // Checkboxes en Dropdown Suministros
    menuDropSum?.querySelectorAll("[data-opt-suministro]").forEach(chk => {
      chk.addEventListener("change", e => {
        const sum = chk.dataset.optSuministro;
        if (e.target.checked) {
          selectedSuministrosSet.add(sum);
        } else {
          selectedSuministrosSet.delete(sum);
        }
        renderSuministrosTagsUI();
        renderCondBoxesUI();
      });
    });

    // Quitar tag individual de suministro
    tagsSuministrosEl?.addEventListener("click", e => {
      const rmBtn = e.target.closest("[data-remove-sum]");
      if (!rmBtn) return;
      e.stopPropagation();
      const sum = rmBtn.dataset.removeSum;
      selectedSuministrosSet.delete(sum);
      const chk = menuDropSum?.querySelector(`[data-opt-suministro="${sum}"]`);
      if (chk) chk.checked = false;
      renderSuministrosTagsUI();
      renderCondBoxesUI();
    });

    // Toggle Dropdown Conformidades
    const btnDropConf = document.getElementById("btnDropConformidades");
    const menuDropConf = document.getElementById("menuDropConformidades");
    btnDropConf?.addEventListener("click", e => {
      if (e.target.closest(".dir-multiselect-tag-remove")) return;
      menuDropConf.hidden = !menuDropConf.hidden;
      if (!menuDropConf.hidden && menuDropSum) menuDropSum.hidden = true;
    });

    // Checkboxes en Dropdown Conformidades
    menuDropConf?.querySelectorAll("[data-opt-conformidad]").forEach(chk => {
      chk.addEventListener("change", e => {
        const conf = chk.dataset.optConformidad;
        if (e.target.checked) {
          selectedConformidadesSet.add(conf);
        } else {
          selectedConformidadesSet.delete(conf);
        }
        renderConformidadesTagsUI();
      });
    });

    // Quitar tag individual de conformidad
    tagsConformidadesEl?.addEventListener("click", e => {
      const rmBtn = e.target.closest("[data-remove-conf]");
      if (!rmBtn) return;
      e.stopPropagation();
      const conf = rmBtn.dataset.removeConf;
      selectedConformidadesSet.delete(conf);
      const chk = menuDropConf?.querySelector(`[data-opt-conformidad="${conf}"]`);
      if (chk) chk.checked = false;
      renderConformidadesTagsUI();
    });

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener("click", e => {
      if (!document.getElementById("wrapDropSuministros")?.contains(e.target)) {
        if (menuDropSum) menuDropSum.hidden = true;
      }
      if (!document.getElementById("wrapDropConformidades")?.contains(e.target)) {
        if (menuDropConf) menuDropConf.hidden = true;
      }
    });

    // Envío del formulario
    document.getElementById("modalAddEntityForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const tipo = form.get("tipo");
      const nombre = (form.get("nombre") || "").trim();
      const cif = (form.get("cif") || "").trim() || "B-00000000";
      const sede = (form.get("sede") || "").trim() || "España";
      const email = (form.get("email") || "").trim();
      const telefono = (form.get("telefono") || "").trim();

      if (tipo === "proveedor") {
        let suministros = Array.from(selectedSuministrosSet);
        if (!suministros.length) suministros = ["otros"];
        let conformidades = Array.from(selectedConformidadesSet);
        if (!conformidades.length) conformidades = ["ISO 9001"];

        // Recoger condiciones por suministro
        const finalCondMap = {};
        let firstLeadTime = "";
        let firstCondPago = "";
        suministros.forEach(s => {
          finalCondMap[s] = suministrosCondMap[s] || { leadTime: "", condicionesPago: "" };
          if (!firstLeadTime && finalCondMap[s].leadTime) firstLeadTime = finalCondMap[s].leadTime;
          if (!firstCondPago && finalCondMap[s].condicionesPago) firstCondPago = finalCondMap[s].condicionesPago;
        });

        const generalLeadTime = firstLeadTime || "42 días";
        const generalCondPago = firstCondPago || "60 días confirmada";

        if (isEdit && entityToEdit) {
          const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === entityToEdit.id);
          if (prv) {
            prv.nombre = nombre;
            prv.cif = cif;
            prv.sede = sede;
            prv.email = email;
            prv.contacto = email;
            prv.telefono = telefono;
            prv.suministros = suministros;
            prv.suministrosCondiciones = finalCondMap;
            prv.conformidades = conformidades;
            prv.leadTimeMedio = generalLeadTime;
            prv.condicionesPago = generalCondPago;
            showToast(`✓ Proveedor "${prv.nombre}" actualizado correctamente`);
          }
        } else {
          const newPrv = {
            id: `PRV-0${DIRECTORIO_PROVEEDORES.length + 1}`,
            nombre,
            cif,
            sede,
            suministros,
            suministrosCondiciones: finalCondMap,
            conformidades,
            materiales: suministros.join(" · "),
            homologado: true,
            leadTimeMedio: generalLeadTime,
            condicionesPago: generalCondPago,
            email,
            telefono,
            contacto: email
          };
          DIRECTORIO_PROVEEDORES.unshift(newPrv);
          showToast(`✓ Proveedor "${newPrv.nombre}" añadido correctamente`);
        }
      } else {
        const actividad = (form.get("actividad") || "").trim() || "Constructora Ferroviaria";
        const representante = (form.get("representante") || "").trim();
        const condicionesPago = (form.get("condicionesPagoCli") || "").trim() || "Confirming 60 días tras acta recepción";

        if (isEdit && entityToEdit) {
          const cli = DIRECTORIO_CLIENTES.find(c => c.id === entityToEdit.id);
          if (cli) {
            cli.nombre = nombre;
            cli.cif = cif;
            cli.sede = sede;
            cli.actividad = actividad;
            cli.email = email;
            cli.contacto = email;
            cli.telefono = telefono;
            cli.representante = representante || cli.representante || "Dirección de Compras";
            cli.condicionesPago = condicionesPago;
            showToast(`✓ Cliente "${cli.nombre}" actualizado correctamente`);
          }
        } else {
          const newCli = {
            id: `CLI-0${DIRECTORIO_CLIENTES.length + 1}`,
            nombre,
            cif,
            sede,
            actividad,
            expedientesActivos: 0,
            homologado: true,
            email,
            telefono,
            contacto: email,
            representante: representante || "Dirección de Compras",
            condicionesPago: condicionesPago
          };
          DIRECTORIO_CLIENTES.unshift(newCli);
          showToast(`✓ Cliente "${newCli.nombre}" añadido correctamente`);
        }
      }
      close();
      renderApp();
    });
  }

    function openUploadProfileCertModal(roleType = "proveedor") {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    const isPrv = roleType === "proveedor";
    const entity = isPrv
      ? (DIRECTORIO_PROVEEDORES.find(p => p.id === "PRV-01") || DIRECTORIO_PROVEEDORES[0])
      : (DIRECTORIO_CLIENTES.find(c => c.id === "CLI-01") || DIRECTORIO_CLIENTES[0]);

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="uploadProfileCertBackdrop">
        <div class="procurement-modal" style="width:min(520px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>${isPrv ? "Subir certificado u homologación" : "Subir acreditación corporativa"}</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">
                Se registrará en el perfil de <b>${entity.nombre}</b> para validación SOFEIN.
              </p>
            </div>
            <button type="button" id="closeUploadProfileCertBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="uploadProfileCertForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Nombre del certificado / acreditación
                <input name="nombre" required ${isPrv ? 'list="catalogConformidadesList"' : ""} autocomplete="off" placeholder="${isPrv ? 'Ej: Homologación Adif Eje Ancho / ISO 45001' : 'Ej: Certificado ROLECE actualizado / ISO 45001'}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                ${isPrv ? `<datalist id="catalogConformidadesList">${getActiveConformidades().map(c => `<option value="${escHTML(c.nombre)}">${escHTML([c.tipo, toCatalogList(c.emisor).join(" / ")].filter(Boolean).join(" · "))}</option>`).join("")}</datalist>` : ""}
              </label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Norma / Alcance técnico
                  <input name="norma" required placeholder="${isPrv ? 'Ej: UNE-EN 13230 / ET Adif' : 'Ej: Grupo D Subgrupo 1'}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Entidad emisora / Laboratorio
                  <input name="entidad" required placeholder="Ej: AENOR / ENAC / Adif" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Fecha de vigencia / renovación
                  <input name="vigencia" required value="31 dic 2028" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Archivo PDF acreditativo
                  <input name="archivo" type="file" accept=".pdf" style="padding:6px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.76rem;width:100%;box-sizing:border-box" />
                </label>
              </div>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelUploadProfileCertBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("upload", 13)} Registrar y vincular al perfil</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeUploadProfileCertBtn")?.addEventListener("click", close);
    document.getElementById("cancelUploadProfileCertBtn")?.addEventListener("click", close);
    document.getElementById("uploadProfileCertBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "uploadProfileCertBackdrop") close();
    });

    document.getElementById("uploadProfileCertForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const nombre = (form.get("nombre") || "").trim();
      const norma = (form.get("norma") || "").trim();
      const entidad = (form.get("entidad") || "").trim();
      const vigencia = (form.get("vigencia") || "").trim();
      const fileObj = e.currentTarget.querySelector('input[type="file"]')?.files?.[0];
      const archivo = fileObj ? fileObj.name : `${nombre.replace(/\s+/g, "-")}.pdf`;

      if (!entity.certificadosDetalle) entity.certificadosDetalle = [];
      entity.certificadosDetalle.unshift({
        nombre,
        norma,
        entidad,
        vigencia,
        estado: "Vigente",
        archivo,
        hash: Math.random().toString(16).slice(2, 18)
      });
      if (isPrv) {
        if (!entity.conformidades) entity.conformidades = [];
        if (!entity.conformidades.includes(nombre)) entity.conformidades.push(nombre);
      }
      close();
      showToast(`✓ Certificado "${nombre}" registrado en tu perfil`);
      renderApp();
    });
  }

  function openAddEntityModal() {
    openAddOrEditEntityModal(null, directorioTypeFilter === "clientes" ? "cliente" : "proveedor");
  }

  // Navegación y acciones delegadas globales
  document.addEventListener("click", e => {
    // El mini icono de fases por suministro solo muestra tooltip: no navega al expediente
    if (e.target.closest("[data-exp-sum-info]")) {
      e.preventDefault();
      return;
    }

    const go = e.target.closest("[data-go]");
    // En filas de Suministros, los enlaces internos (p. ej. el del expediente) siguen su propio href
    if (go && go.classList.contains("suministros-row") && e.target.closest("a[href]")) {
      return;
    }
    if (go) {
      e.preventDefault();
      let target = go.dataset.go;
      if (target.startsWith("#")) {
        target = target.replace(/^#(admin|cliente|proveedor|destinatario)\//, `#${activeRole}/`);
      }
      location.hash = target;
      document.getElementById("app")?.classList.remove("nav-open");
      return;
    }

    // Catálogos maestros de Administración (Productos / Conformidades)
    const catAdd = e.target.closest("[data-cat-add]");
    if (catAdd) {
      catalogEditing = { kind: catAdd.dataset.catAdd, id: "__new" };
      renderApp();
      document.querySelector('[data-cat-row="__new"] [data-cat-field="nombre"]')?.focus();
      return;
    }
    const catEdit = e.target.closest("[data-cat-edit]");
    if (catEdit) {
      catalogEditing = { kind: catEdit.dataset.catKind, id: catEdit.dataset.catEdit };
      renderApp();
      document.querySelector(`[data-cat-row="${catEdit.dataset.catEdit}"] [data-cat-field="nombre"]`)?.focus();
      return;
    }
    const catSave = e.target.closest("[data-cat-save]");
    if (catSave) {
      saveCatalogRow(catSave.dataset.catKind, catSave.dataset.catSave);
      return;
    }
    if (e.target.closest("[data-cat-cancel]")) {
      catalogEditing = null;
      renderApp();
      return;
    }
    const catToggle = e.target.closest("[data-cat-toggle]");
    if (catToggle) {
      const kind = catToggle.dataset.catKind;
      const item = CATALOGOS[kind].find(i => i.id === catToggle.dataset.catToggle);
      if (item) {
        item.activo = item.activo === false;
        saveCatalog(kind);
        showToast(`"${item.nombre}" ${item.activo ? "activado" : "desactivado"} en los selectores`);
        renderApp();
      }
      return;
    }
    const catDelete = e.target.closest("[data-cat-delete]");
    if (catDelete) {
      const kind = catDelete.dataset.catKind;
      const list = CATALOGOS[kind];
      const idx = list.findIndex(i => i.id === catDelete.dataset.catDelete);
      if (idx === -1) return;
      const item = list[idx];
      const enUso = CATALOG_DEFS[kind].usage(item);
      const aviso = enUso ? `\n\nLo usan ${enUso} proveedor(es); sus fichas lo conservarán como histórico.` : "";
      if (!window.confirm(`¿Eliminar "${item.nombre}" del catálogo de ${CATALOG_DEFS[kind].title.toLowerCase()}?${aviso}`)) return;
      list.splice(idx, 1);
      saveCatalog(kind);
      showToast(`"${item.nombre}" eliminado del catálogo`);
      renderApp();
      return;
    }

    const createNoticeBtn = e.target.closest("[data-open-create-notice-modal]");
    if (createNoticeBtn) {
      e.preventDefault();
      if (activeRole === "admin") openEmitExpNoticeModal(createNoticeBtn.dataset.openCreateNoticeModal || null, { pickExp: true });
      return;
    }

    const viewAddendumBtn = e.target.closest("[data-view-addendum]");
    if (viewAddendumBtn) {
      e.preventDefault();
      openConsolidatedAddendumModal(viewAddendumBtn.dataset.viewAddendum, viewAddendumBtn.dataset.incidentId);
      return;
    }

    const printPassportBtn = e.target.closest("[data-print-passport]");
    if (printPassportBtn) {
      e.preventDefault();
      document.body.classList.add("printing-passport");
      window.addEventListener("afterprint", () => document.body.classList.remove("printing-passport"), { once: true });
      window.print();
      return;
    }

    const cryptoPassportBtn = e.target.closest("[data-inspect-passport-crypto]");
    if (cryptoPassportBtn) {
      e.preventDefault();
      const exp = getActiveExpediente(cryptoPassportBtn.dataset.inspectPassportCrypto);
      openPassportCryptoModal(exp);
      return;
    }

    const uploadProfileCertBtn = e.target.closest("[data-open-upload-profile-cert]");
    if (uploadProfileCertBtn) {
      e.preventDefault();
      openUploadProfileCertModal(uploadProfileCertBtn.dataset.openUploadProfileCert);
      return;
    }

    const inspectCertBtn = e.target.closest("[data-inspect-cert]");
    if (inspectCertBtn) {
      e.preventDefault();
      openCertificateAuditModal({
        titulo: inspectCertBtn.dataset.certName,
        archivo: inspectCertBtn.dataset.certFile,
        laboratorio: inspectCertBtn.dataset.certLab,
        norma: inspectCertBtn.dataset.certNorm,
        resultado: inspectCertBtn.dataset.certRes,
        hash: inspectCertBtn.dataset.inspectCert
      });
      return;
    }

    const filterBtn = e.target.closest("[data-incident-filter]");
    if (filterBtn) {
      e.preventDefault();
      incidentStatusFilter = filterBtn.dataset.incidentFilter;
      renderApp();
      return;
    }
  });

  // Accesibilidad de modales (procurement-modal): role="dialog", aria-modal
  // y cierre con Escape. Observador único (no se re-asocia por apertura,
  // evitando fugas de listeners) porque #modalContainer se recrea en cada renderApp().
  new MutationObserver(() => {
    const modal = document.querySelector(".procurement-modal-backdrop .procurement-modal");
    if (modal && !modal.hasAttribute("role")) {
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
    }
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const modalWrap = document.getElementById("modalContainer");
    if (modalWrap && modalWrap.firstElementChild) modalWrap.innerHTML = "";
  });

  // Filas de Suministros como enlace: nota flotante inmediata que sigue al cursor y Enter para abrir
  const rowHint = document.createElement("div");
  rowHint.className = "suministros-row-hint";
  rowHint.setAttribute("aria-hidden", "true");
  document.body.appendChild(rowHint);
  const hideRowHint = () => rowHint.classList.remove("is-visible");
  document.addEventListener("mousemove", e => {
    const row = e.target.closest?.(".suministros-row");
    // Texto dinámico: el de la celda/enlace bajo el cursor (proveedor, expediente…) o, si no, el de la fila
    const hintEl = row && e.target.closest("[data-row-hint]");
    if (!hintEl || e.target.closest("button, select, input")) {
      hideRowHint();
      return;
    }
    const hintText = hintEl.dataset.rowHint;
    if (rowHint.dataset.text !== hintText) {
      rowHint.dataset.text = hintText;
      rowHint.innerHTML = `<span>${escHTML(hintText)}</span>${icon("arrow", 12)}`;
    }
    const pad = 14;
    const w = rowHint.offsetWidth;
    const x = Math.min(e.clientX + pad, window.innerWidth - w - 8);
    rowHint.style.transform = `translate(${Math.max(8, x)}px, ${e.clientY + pad}px)`;
    rowHint.classList.add("is-visible");
  });
  document.addEventListener("scroll", hideRowHint, true);
  window.addEventListener("hashchange", hideRowHint);
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const row = e.target.closest?.(".suministros-row[data-go]");
    if (row && e.target === row) row.click();
  });

  // Catálogos: Enter guarda y Escape cancela la fila en edición
  document.addEventListener("keydown", e => {
    const field = e.target.closest?.("[data-cat-field], .tag-input-text");
    if (!field || !catalogEditing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      saveCatalogRow(catalogEditing.kind, catalogEditing.id);
    } else if (e.key === "Escape") {
      catalogEditing = null;
      renderApp();
    }
  });

  // Cabecera fija de la ficha del expediente: visible cuando la tarjeta del expediente sale de pantalla
  function syncDossierStickyBar() {
    const bar = document.getElementById("dossierStickyBar");
    const card = document.querySelector(".dossier-exp-summary-card");
    if (!bar || !card) return;
    bar.classList.toggle("is-visible", card.getBoundingClientRect().bottom < 0);
  }
  document.addEventListener("scroll", syncDossierStickyBar, { capture: true, passive: true });
  document.addEventListener("click", e => {
    const jump = e.target.closest?.("[data-sticky-jump]");
    if (!jump) return;
    const target = document.getElementById(jump.dataset.stickyJump);
    if (!target) return;
    if (target.tagName === "DETAILS") target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  window.addEventListener("resize", syncDossierStickyBar, { passive: true });

  // Campo de etiquetas: sugerencias, crear/añadir, quitar
  function tagInputAdd(box, value) {
    const v = String(value || "").trim();
    if (!v) return;
    const single = box.dataset.tagSingle === "1";
    const inner = box.querySelector(".tag-input-box");
    const input = box.querySelector(".tag-input-text");
    if (single) inner.querySelectorAll(".tag-chip").forEach(c => c.remove());
    else if (Array.from(inner.querySelectorAll(".tag-chip")).some(c => c.dataset.tagValue.toLowerCase() === v.toLowerCase())) { input.value = ""; return; }
    const chip = document.createElement("span");
    chip.className = "tag-chip";
    chip.dataset.tagValue = v;
    chip.innerHTML = `${escHTML(v)}<button type="button" data-tag-remove aria-label="Quitar ${escHTML(v)}">×</button>`;
    inner.insertBefore(chip, input);
    input.value = "";
    if (single) input.style.display = "none";
    const sug = box.querySelector(".tag-input-suggest");
    sug.hidden = true;
    sug.innerHTML = "";
    if (!single) input.focus();
  }

  function tagInputSuggest(box) {
    const input = box.querySelector(".tag-input-text");
    const sug = box.querySelector(".tag-input-suggest");
    const q = input.value.trim().toLowerCase();
    let all = [];
    try { all = JSON.parse(box.dataset.tagSuggest || "[]"); } catch (err) { all = []; }
    const chosen = Array.from(box.querySelectorAll(".tag-chip")).map(c => c.dataset.tagValue.toLowerCase());
    const matches = all.filter(v => !chosen.includes(v.toLowerCase()) && (!q || v.toLowerCase().includes(q))).slice(0, 8);
    const exact = all.some(v => v.toLowerCase() === q);
    const items = matches.map(v => `<button type="button" class="tag-suggest-item" data-tag-pick="${escHTML(v)}">${escHTML(v)}</button>`);
    if (q && !exact) items.push(`<button type="button" class="tag-suggest-item is-create" data-tag-pick="${escHTML(input.value.trim())}">«${escHTML(input.value.trim())}» <em>(${escHTML(box.dataset.tagCreate || "Añadir")})</em></button>`);
    sug.innerHTML = items.join("");
    sug.hidden = !items.length;
  }

  document.addEventListener("input", e => {
    const input = e.target.closest?.(".tag-input-text");
    if (input) tagInputSuggest(input.closest(".tag-input"));
  });
  document.addEventListener("focusin", e => {
    const input = e.target.closest?.(".tag-input-text");
    if (input) tagInputSuggest(input.closest(".tag-input"));
  });
  document.addEventListener("mousedown", e => {
    const pick = e.target.closest?.("[data-tag-pick]");
    if (pick) {
      e.preventDefault();
      tagInputAdd(pick.closest(".tag-input"), pick.dataset.tagPick);
      return;
    }
    const remove = e.target.closest?.("[data-tag-remove]");
    if (remove) {
      e.preventDefault();
      const box = remove.closest(".tag-input");
      remove.closest(".tag-chip").remove();
      const input = box.querySelector(".tag-input-text");
      input.style.display = "";
      input.focus();
      return;
    }
    document.querySelectorAll(".tag-input-suggest").forEach(sug => {
      if (!sug.closest(".tag-input").contains(e.target)) sug.hidden = true;
    });
  });
  document.addEventListener("keydown", e => {
    const input = e.target.closest?.(".tag-input-text");
    if (!input) return;
    const box = input.closest(".tag-input");
    if (e.key === "Enter" || e.key === ",") {
      if (!input.value.trim()) return; // Enter vacío: deja que la fila se guarde
      e.preventDefault();
      e.stopPropagation();
      const first = box.querySelector(".tag-suggest-item:not(.is-create)");
      const q = input.value.trim().toLowerCase();
      const exactMatch = first && first.dataset.tagPick.toLowerCase() === q;
      tagInputAdd(box, exactMatch ? first.dataset.tagPick : input.value);
    } else if (e.key === "Backspace" && !input.value) {
      const chips = box.querySelectorAll(".tag-chip");
      if (chips.length) chips[chips.length - 1].remove();
    } else if (e.key === "Escape") {
      box.querySelector(".tag-input-suggest").hidden = true;
      e.stopPropagation();
    }
  }, true);

  // Catálogos: filtrado en vivo sin re-renderizar (conserva el foco del buscador)
  document.addEventListener("input", e => {
    const input = e.target.closest?.("[data-catalog-search]");
    if (!input) return;
    const kind = input.dataset.catalogSearch;
    const q = input.value.toLowerCase().trim();
    catalogSearch[kind] = input.value;
    let visible = 0;
    document.querySelectorAll(".catalog-table tbody tr[data-cat-search]").forEach(tr => {
      const match = !q || tr.dataset.catSearch.includes(q);
      tr.hidden = !match;
      if (match) visible++;
    });
    const emptyRow = document.querySelector(".catalog-table .catalog-empty-row");
    if (emptyRow) emptyRow.hidden = visible > 0 || !!document.querySelector(".catalog-table tr.is-editing");
  });

  window.addEventListener("hashchange", () => {
    catalogEditing = null;
    renderApp();
  });

  // Inicializar al cargar
  if (!location.hash) {
    location.hash = "#admin/expedientes";
  }
  renderApp();
})();
