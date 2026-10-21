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
      shortLabel: "Admin (SOFEIN)",
      label: "SOFEIN Admin",
      badge: "Administración Central",
      entity: "SOFEIN Digital HQ",
      avatar: "SF",
      defaultNav: "expedientes",
      nav: [
        { id: "expedientes", label: "Expedientes", icon: "folder", count: 5 },
        { id: "suministros", label: "Suministros", icon: "box", count: 8 },
        { id: "directorio", label: "Clientes y Proveedores", icon: "users" },
        { id: "avisos", label: "Avisos", icon: "inbox", count: 2 }
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
        { id: "suministros", label: "Suministros", icon: "box", count: 3 },
        { id: "avisos", label: "Avisos", icon: "inbox", count: 1 }
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
          id: "INC-014-1",
          fecha: "16 jun 2026, 10:20",
          origen: "Proveedor (IberRail Components)",
          origenRol: "proveedor",
          tipo: "Demora de curado por ola de calor en factoría",
          categoria: "Retraso de fabricación",
          descripcion: "Se ha detectado una desaceleración crítica en el proceso de fraguado y curado térmico de las 14.500 traviesas monobloque PR-22 en la factoría de Vitoria debido a temperaturas extremas sostenidas (+39ºC). Desmoldar prematuramente comprometería la resistencia característica a compresión y flexión exigida por la norma EN 13230-2.",
          impactoPlazo: "+6 días (afectando a la 2ª mitad del lote)",
          impactoCoste: "0 € (Sin sobrecoste de fabricación para el contratista)",
          impacto: "+6 días en 2ª mitad · 0 €",
          evidenciaDoc: "Informe-Laboratorio-Curado-IberRail.pdf",
          estado: "En mediación SOFEIN",
          propuestaMediacion: "SOFEIN propone articular un suministro fraccionado en dos entregas operativas: Sub-lote A (7.000 unidades) expedido en el plazo original pactado (42 días), y Sub-lote B (7.500 unidades) expedido 6 días después (48 días). Con ello, el constructor mantiene el ritmo de acopio sin paralizar el montaje de vía en la Factoría Volkswagen.",
          nuevoPlazoAcordado: "48 días (Sub-lote A: 42d / Sub-lote B: 48d)",
          nuevoCosteAcordado: "482.000 € (Sin alteración económica)",
          resolucionTecnica: "Mantenimiento estricto de los ensayos destructivos de rotura según norma EN 13230-2. Emisión de albaranes y certificados de lote individualizados con marcaje CE para cada envío por el laboratorio homologado.",
          fechaNotificacionPropuesta: "16 jun 2026, 10:35",
          fechaLimiteRespuesta: "23 jun 2026 (5 días hábiles)",
          diasHabilesRestantes: 3,
          silencioPositivoAplicado: false,
          firmaSofein: true,
          firmaSofeinFecha: "16 jun 2026, 10:35",
          firmaSofeinUsuario: "Ángel Plaza (SOFEIN Digital HQ)",
          firmaProveedor: true,
          firmaProveedorFecha: "16 jun 2026, 11:45",
          firmaProveedorUsuario: "Carlos Mendía (Director Industrial, IberRail)",
          firmaCliente: false,
          firmaClienteFecha: null,
          firmaClienteUsuario: null,
          adendaId: null,
          adendaFecha: null,
          adendaHash: null
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
      tipo: "Traviesas de hormigón monobloque PR-22",
      unidades: "14.500 uds (7.250 m)",
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
      fechaEntrega: "14 oct 2026",
      fechaEntregaIso: "2026-10-14",
      estado: "activo"
    },
    {
      id: "SUM-02",
      num: "02",
      tipo: "Sujeciones elásticas y placas de asiento PR-22",
      unidades: "29.000 cjtos",
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
      fechaEntrega: "18 oct 2026",
      fechaEntregaIso: "2026-10-18",
      estado: "activo"
    },
    {
      id: "SUM-03",
      num: "03",
      tipo: "Balasto silíceo certificado Tipo 1",
      unidades: "8.500 t",
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
      fechaEntrega: "28 oct 2026",
      fechaEntregaIso: "2026-10-28",
      estado: "activo"
    },
    {
      id: "SUM-04",
      num: "01",
      tipo: "Carril laminado 54E1 Grado R260",
      unidades: "1.200 t (18 km)",
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
      fechaEntrega: "04 nov 2026",
      fechaEntregaIso: "2026-11-04",
      estado: "activo"
    },
    {
      id: "SUM-05",
      num: "02",
      tipo: "Aparatos de dilatación y bridas aislantes 54E1",
      unidades: "24 parejas",
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
      fechaEntrega: "12 nov 2026",
      fechaEntregaIso: "2026-11-12",
      estado: "activo"
    },
    {
      id: "SUM-06",
      num: "01",
      tipo: "Traviesas de madera tratada creosotada",
      unidades: "3.200 uds",
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
      fechaEntrega: "25 oct 2026",
      fechaEntregaIso: "2026-10-25",
      estado: "activo"
    },
    {
      id: "SUM-07",
      num: "02",
      tipo: "Desvíos y cruzamientos monobloque tipo C",
      unidades: "4 desvíos cjtos",
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
      fechaEntrega: "15 nov 2026",
      fechaEntregaIso: "2026-11-15",
      estado: "activo"
    },
    {
      id: "SUM-08",
      num: "03",
      tipo: "Placas de asiento para traviesa de madera",
      unidades: "6.400 uds",
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
      fechaEntrega: "20 nov 2026",
      fechaEntregaIso: "2026-11-20",
      estado: "activo"
    },
    {
      id: "SUM-09",
      num: "01",
      tipo: "Sujeciones elásticas y fijaciones SKL-14",
      unidades: "29.000 cjtos",
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
      fechaEntrega: "18 oct 2026",
      fechaEntregaIso: "2026-10-18",
      estado: "finalizado"
    },
    {
      id: "SUM-10",
      num: "02",
      tipo: "Suelas bajo traviesa y elastómeros antivibratorios",
      unidades: "14.500 uds",
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
      fechaEntrega: "18 oct 2026",
      fechaEntregaIso: "2026-10-18",
      estado: "finalizado"
    },
    {
      id: "SUM-11",
      num: "01",
      tipo: "Tirafondos de acero tratado TF-24",
      unidades: "62.000 uds",
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
      fechaEntrega: "29 abr 2026",
      fechaEntregaIso: "2026-04-29",
      estado: "cerrado"
    },
    {
      id: "SUM-12",
      num: "02",
      tipo: "Arandelas elásticas dobles Fe6",
      unidades: "124.000 uds",
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
      fechaEntrega: "29 abr 2026",
      fechaEntregaIso: "2026-04-29",
      estado: "cerrado"
    }
  ];

  let SUMINISTROS = [...INITIAL_SUMINISTROS];

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
      enlace: "#cliente/expedientes/SFN-2026-H6T4?tab=incidents&openMediation=INC-014-1"
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
      descripcion: "SOFEIN ha fijado los 3 proveedores de carril 54E1. El cliente debe seleccionar a quién solicitar oferta vinculante.",
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
      suministros: ["Traviesas", "Fijaciones"],
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
      suministros: ["Carril", "Aparatos de vía"],
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
      suministros: ["Traviesas de madera", "Creosota"],
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
      suministros: ["Carril 54E1", "Carril 60E1"],
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
      suministros: ["Carril", "Desvíos"],
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
      suministros: ["Traviesas"],
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
      suministros: ["Traviesas monobloque"],
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
      suministros: ["Traviesas de madera", "Roble"],
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
      suministros: ["Traviesas especiales"],
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
      suministros: ["Fijaciones", "Tirafondos"],
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
      suministros: ["Fijaciones SKL-14"],
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
      suministros: ["Balasto"],
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
      suministros: ["Balasto"],
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
      suministros: ["Balasto AV"],
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

  // Nuevos Estados Interactivos
  let overviewFilter = null; // "validados" | "review" | "pending" | "futuras" | "expedientes" | "incidencias" | "proveedores"
  let expSearchQuery = "";
  let suministrosFilters = {
    fase: "all",
    proveedor: "all",
    cliente: "all",
    ano: "all",
    acciones: "all"
  };
  let suministrosSortCol = "suministro";
  let suministrosSortDir = "asc";
  let suministrosSearchQuery = "";
  let isColsMenuOpen = false;

  const ALL_SUMINISTROS_COL_DEFS = {
    suministro: { id: "suministro", label: "Suministro", minWidth: "90px" },
    tipo: { id: "tipo", label: "Tipo", minWidth: "220px" },
    unidades: { id: "unidades", label: "Unidades", minWidth: "125px" },
    expediente: { id: "expediente", label: "Expediente", minWidth: "135px" },
    proveedor: { id: "proveedor", label: "Proveedor", minWidth: "165px" },
    cliente: { id: "cliente", label: "Cliente", minWidth: "165px" },
    destino: { id: "destino", label: "Destino", minWidth: "180px" },
    ano: { id: "ano", label: "Año", minWidth: "75px" },
    fase: { id: "fase", label: "Fase", minWidth: "145px" },
    acciones: { id: "acciones", label: "Acciones pendientes", minWidth: "125px" },
    fechaEntrega: { id: "fechaEntrega", label: "Fecha entrega", minWidth: "130px" }
  };

  const DEFAULT_SUMINISTROS_COL_ORDER = [
    "suministro",
    "tipo",
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

  let suministrosColumnOrder = [...DEFAULT_SUMINISTROS_COL_ORDER];
  let suministrosHiddenCols = new Set();

  function loadSuministrosColPrefs() {
    try {
      const saved = localStorage.getItem("sofein_suministros_columns_cfg");
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
      }
    } catch (e) {}
  }
  loadSuministrosColPrefs();

  function saveSuministrosColPrefs() {
    try {
      localStorage.setItem("sofein_suministros_columns_cfg", JSON.stringify({
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
    if (!suministrosList || !suministrosList.length) return `<span style="color:var(--entity-faint);font-size:0.75rem">—</span>`;
    const items = Array.isArray(suministrosList) ? suministrosList : suministrosList.split(/[·,]/).map(s => s.trim()).filter(Boolean);
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
  let stagedPliegoFile = null;
  let suministroRowCount = 1;
  let docScopeMode = "phase"; // "phase" | "all"
  let commsPhaseScope = "all"; // "phase" | "all"
  let commsSumScope = "all"; // "current" | "all"
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

  function getExpVisualMeta(exp) {
    const preset = EXP_GENERIC_META[exp.id] || {};
    const isClosed = !!exp.cerrado;
    const isCompleted = !isClosed && (!!preset.isFinalizado || !!exp.finalizado || exp.faseActual >= 3);
    const hasOpenInc = (exp.incidencias || []).some(i => !i.adendaId);
    const hasPendingAction = !isClosed && !isCompleted && (
      preset.forcePendingAction !== undefined
        ? preset.forcePendingAction
        : (exp.estado === "pending_validation" || hasOpenInc || exp.faseActual === 1)
    );

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
    const budgetNum = parseBudgetNumber(exp.presupuestoTotal);
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
      budgetRange
    };
  }

  function renderVisualExpCard(exp, role = "admin") {
    const v = getExpVisualMeta(exp);
    const goTarget = `#${role}/expedientes/${exp.id}`;

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
          </div>
        </div>

        <!-- Fila 2: Título genérico de expediente (tamaño reducido) -->
        <h3 class="exp-v2-title">${v.tituloGenerico}</h3>

        <!-- Fila 3: Datos estructurados -->
        <div class="exp-v2-data-grid">
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Suministros</span>
            <strong class="exp-v2-val">${v.numSuministros} suministros</strong>
          </div>
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Destino</span>
            <strong class="exp-v2-val" title="${exp.destinatarioFinal}">${exp.destinatarioFinal}</strong>
          </div>
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Cliente</span>
            <strong class="exp-v2-val" title="${exp.cliente}">${exp.cliente}</strong>
          </div>
          <div class="exp-v2-data-row">
            <span class="exp-v2-label">Presupuesto est.</span>
            <strong class="exp-v2-val">${exp.presupuestoTotal}</strong>
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
    const enriched = roleExpedientes.map(exp => ({ exp, meta: getExpVisualMeta(exp) }));
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
        const haystack = `${exp.id} ${meta.tituloGenerico} ${exp.producto} ${exp.cliente} ${exp.destinatarioFinal} ${exp.presupuestoTotal} ${meta.shortPhase} ${meta.proximaEntregaFecha}`.toLowerCase();
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

      <!-- Bloque principal de expedientes (plegable/desplegable con diseño sutil) -->
      <details class="exp-collapsible-details is-main-active" data-exp-collapse="activos" ${expBandejaCollapseState.activos !== false ? "open" : ""}>
        <summary>
          <div class="exp-collapsible-summary-left">
            <span class="scope-dot ${expKpiFilter === "accion_pendiente" ? "is-pending-pulse" : expKpiFilter === "completados" ? "info" : expKpiFilter === "cerrados" ? "closed" : "active"}"></span>
            <strong>${
              expKpiFilter === "completados"
                ? `Expedientes completados (${mainListToRender.length})`
                : expKpiFilter === "cerrados"
                  ? `Expedientes cerrados (${mainListToRender.length})`
                  : expKpiFilter === "accion_pendiente"
                    ? `Expedientes con acción pendiente (${mainListToRender.length})`
                    : `Expedientes activos (${mainListToRender.length})`
            }</strong>
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
    if (queryPart) {
      const qParams = new URLSearchParams(queryPart);
      if (qParams.get("tab")) {
        activeDossierTab = qParams.get("tab");
      }
      if (qParams.get("phase")) {
        activeDossierPhase = parseInt(qParams.get("phase"), 10) || 0;
      }
      if (qParams.get("openMediation")) {
        pendingOpenMediation = qParams.get("openMediation");
      }
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
          <div class="admin-admin-user has-profile-link${((activeRole === "admin" && activeSection === "overview") || ((activeRole === "cliente" || activeRole === "proveedor") && activeSection === "perfil")) ? " is-active" : ""}" data-go="#${activeRole === "admin" ? "admin/overview" : activeRole + "/perfil"}" style="cursor:pointer" title="${activeRole === "admin" ? "Ver visión global de métricas" : "Ver perfil corporativo"}">
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

  /* ---------- Componente: Topbar Interna con Switcher Sutil ---------- */
  function renderTopbar() {
    const player = PLAYERS[activeRole];
    const sectionName = activeSection === "perfil" ? "Perfil corporativo" : (activeSection === "overview" ? "Visión global" : ((player.nav.find(n => n.id === activeSection) || {}).label || activeSection));
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

          <!-- Notificaciones Bell -->
          <button class="topbar-icon-btn" type="button" data-toast="Tienes 1 notificación de actualización en SFN-2026-H6T4" aria-label="Notificaciones" title="Notificaciones de inbox">
            ${icon("bell", 16)}<i class="bell-unread-dot"></i>
          </button>
        </div>
      </header>
    `;
  }

  /* ============================================================
     CONSTRUCTOR DE EXPEDIENTES (PANTALLA 1 - APUNTES 05 Y 06)
     ============================================================ */
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
            ${icon("file", 15)} Solicitud constructor · Requiere validación SOFEIN
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
                Destinatario Final / Administrador de la Infraestructura
                <select name="destinatarioFinal" class="create-exp-select" required>
                  <option value="Adif Alta Velocidad (Línea Sur)">Adif Alta Velocidad (Línea Sur)</option>
                  <option value="Adif Red Convencional">Adif Red Convencional</option>
                  <option value="Metro de Bilbao (Línea 4)">Metro de Bilbao (Línea 4)</option>
                  <option value="Ferrocarrils de la Generalitat de Catalunya (FGC)">Ferrocarrils de la Generalitat de Catalunya (FGC)</option>
                  <option value="Línea de Acceso y Vías Factoría Volkswagen (Red Adif)">Factoría Volkswagen (Red Ferroviaria Industrial)</option>
                  <option value="Consorcio Autonómico de Transportes">Consorcio Autonómico de Transportes</option>
                </select>
              </label>
            </div>

            <div class="create-exp-grid-2">
              <label class="create-exp-label">
                Fecha Objetivo
                <input type="date" name="fechaObjetivo" class="create-exp-input" required value="2026-11-30" />
              </label>

              <label class="create-exp-label">
                Presupuesto Estimado (Opcional)
                <input name="presupuestoTotal" class="create-exp-input" placeholder="Ej: 450.000 € (En licitación)" />
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
            <div class="suministro-item" data-suministro-index="0">
              <div class="suministro-item-top">
                <span class="suministro-item-title">${icon("route", 14)} Lote de Suministro 1</span>
              </div>
              <div class="create-exp-grid-3" style="margin-bottom:10px">
                <label class="create-exp-label">
                  Tipo de Suministro
                  <select name="suministro_material_0" class="create-exp-select" required>
                    <option value="Traviesas de madera">Traviesas de madera</option>
                    <option value="Traviesas de hormigón">Traviesas de hormigón</option>
                    <option value="Carril ferroviario">Carril ferroviario</option>
                    <option value="Sujeciones y fijaciones">Sujeciones y fijaciones</option>
                    <option value="Placas de asiento">Placas de asiento</option>
                    <option value="Aparatos de vía">Aparatos de vía</option>
                    <option value="Balasto">Balasto</option>
                    <option value="Otro suministro">Otro suministro</option>
                  </select>
                </label>
                <label class="create-exp-label">
                  Volumen / Unidades
                  <input name="suministro_unidades_0" class="create-exp-input" required placeholder="Ej: 14.500 unidades" />
                </label>
                <label class="create-exp-label">
                  Especificaciones
                  <input name="suministro_especificaciones_0" class="create-exp-input" placeholder="Ej: Madera de roble tratada, 2,60 m" />
                </label>
              </div>
              <div class="create-exp-grid-3">
                <label class="create-exp-label">
                  Presupuesto Estimado (Opcional)
                  <input name="suministro_presupuesto_0" class="create-exp-input" placeholder="Ej: 120.000 €" />
                </label>
                <label class="create-exp-label">
                  Fecha Objetivo (Opcional)
                  <input type="date" name="suministro_fecha_0" class="create-exp-input suministro-fecha-input" value="2026-11-30" data-custom-date="0" style="color:#9ca3af" />
                </label>
                <label class="create-exp-label">
                  Adjunto (Opcional)
                  <div style="display:flex;align-items:center;gap:8px">
                    <input type="file" class="suministro-file-input" style="display:none" accept=".pdf,.dwg,.xlsx,.docx" multiple />
                    <button type="button" class="slot-upload-btn suministro-file-trigger" style="height:38px;width:100%;justify-content:center">
                      ${icon("upload", 14)} <span class="suministro-file-label">Subir docs</span>
                    </button>
                  </div>
                </label>
              </div>
            </div>
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
              Notas (Opcional)
              <textarea name="notasExpediente" class="create-exp-input" rows="2" style="height:auto;padding:10px 12px;resize:vertical" placeholder="Añade notas o comentarios adicionales del expediente..."></textarea>
            </label>

            <input type="file" id="createExpFileInput" style="display:none" accept=".pdf,.dwg,.xlsx" />
            
            <div class="slot-dropzone" id="createExpDropzone">
              <div class="slot-dropzone-copy">
                ${icon("upload", 24)}
                <div>
                  <div><b>Añadir adjuntos</b></div>
                  <span class="sub">Formatos admitidos: .pdf, .dwg, .xlsx (Máximo 25 MB)</span>
                </div>
              </div>
              <button class="slot-upload-btn" type="button" id="triggerFileSelectBtn">
                ${icon("plus", 14)} Añadir adjuntos
              </button>
            </div>

            <div id="fileUploadedPreview" style="display:none;margin-top:4px"></div>
          </div>
        </section>

        <!-- Acciones Finales -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding-top:10px">
          <button class="admin-quiet-button" type="button" data-go="${isRoleAdmin ? '#admin/expedientes' : '#cliente/expedientes'}">
            ← Expedientes
          </button>
          <button class="admin-primary-button" type="submit" id="submitCreateExpBtn" style="padding:10px 22px;font-size:0.85rem">
            ${icon("check", 16)} Crear Expediente
          </button>
        </div>
      </form>
    `;
  }

  /* ============================================================
     PANTALLA 2: SELECTOR Y MATCHING DE PROVEEDORES (FASE DE COTIZACIONES)
     Apuntes 06 - Tablas 2 y 3 (Preselección SOFEIN, Selección Cliente, Cotizaciones, Comparativa)
     ============================================================ */
  function renderSelectorProveedoresView(expId = "SFN-2026-K9M2") {
    const exp = getActiveExpediente(expId);
    const matching = ensureExpedienteMatching(exp);
    const isRoleAdmin = activeRole === "admin";
    const isRoleCliente = activeRole === "cliente";
    const isRoleProveedor = activeRole === "proveedor";

    // Sub-fase efectiva: en la vista de cliente no se muestra la fase 1 (preselección SOFEIN)
    const effectiveFaseSelector = (isRoleCliente && matching.faseSelector === "preseleccion")
      ? "seleccion_cliente"
      : matching.faseSelector;

    // 4 Sub-fases oficiales del Selector de Proveedores
    const SUBSTEPS = [
      { id: "preseleccion", num: 1, title: "1. Preselección" },
      { id: "seleccion_cliente", num: 2, title: "2. Selección" },
      { id: "peticion_cotizaciones", num: 3, title: "3. Cotizaciones" },
      { id: "comparativa", num: 4, title: "4. Elección" }
    ];

    const currentStepIdx = SUBSTEPS.findIndex(s => s.id === effectiveFaseSelector);
    const activeStepIndex = currentStepIdx >= 0 ? currentStepIdx : (effectiveFaseSelector === "adjudicado" ? 3 : 0);

    const stepperHTML = SUBSTEPS.map((step, idx) => {
      const isClientDisabled = isRoleCliente && step.id === "preseleccion";
      const isActive = !isClientDisabled && idx === activeStepIndex;
      const isDone = !isClientDisabled && (effectiveFaseSelector === "adjudicado" || idx < activeStepIndex);

      if (isClientDisabled) {
        return `
          <div class="selector-substep is-disabled-client" style="opacity:0.38;cursor:not-allowed;pointer-events:none;filter:grayscale(1)" title="Fase previa interna gestionada por SOFEIN">
            <span class="selector-substep-num">${step.num}</span>
            <div class="selector-substep-text">
              <strong>${step.title}</strong>
            </div>
          </div>
        `;
      }

      return `
        <div class="selector-substep ${isActive ? "is-active" : isDone ? "is-done" : ""}" data-switch-selector-step="${step.id}" data-exp-id="${exp.id}" style="cursor:pointer" title="Ver sub-fase ${step.title}">
          <span class="selector-substep-num">${isDone ? icon("check", 13) : step.num}</span>
          <div class="selector-substep-text">
            <strong>${step.title}</strong>
          </div>
        </div>
      `;
    }).join("");

    // Breadcrumb
    const breadcrumbBase = `
      <div class="dossier-breadcrumb" style="margin-bottom:14px">
        <a href="#${activeRole}/expedientes">← Volver a expedientes</a> / 
        <a href="#${activeRole}/expedientes/${exp.id}">${exp.id}</a> / 
        <span>Cotizaciones</span>
      </div>
    `;

    // Datos resumidos de cabecera: sólo suministro, tipo, unidades, fecha
    const sumItem = (typeof SUMINISTROS !== "undefined" ? SUMINISTROS : INITIAL_SUMINISTROS).find(s => s.expId === exp.id);
    const sumNombre = exp.producto || exp.tituloGenerico || (sumItem ? sumItem.tipo : "Suministro Ferroviario");
    const sumTipo = exp.tipoMaterial || (sumItem ? sumItem.tipo : "Superestructura");
    const sumUnidades = exp.unidades || (sumItem ? sumItem.unidades : "Según pliego");
    const sumFecha = exp.fechaEntrega || (sumItem ? sumItem.fechaEntrega : null) || exp.fechaCierre || "14 oct 2026";

    // Candidate providers for preselection
    const matQuery = (exp.tipoMaterial || exp.producto || "").toLowerCase();
    let candidateProviders = DIRECTORIO_PROVEEDORES.filter(p => {
      if (!p.categorias) return true;
      return p.categorias.some(c => matQuery.includes(c.toLowerCase().split(" ")[0]));
    });
    if (candidateProviders.length < 3) {
      candidateProviders = DIRECTORIO_PROVEEDORES.slice(0, 3);
    }

    let dynamicContentHTML = "";

    // -------------------------------------------------------------
    // SUB-FASE 1: PRESELECCIÓN SOFEIN (ADMIN)
    // -------------------------------------------------------------
    if (matching.faseSelector === "preseleccion") {
      const preselectedIds = new Set(matching.proveedoresPreseleccionadosPorAdmin);
      const cardsHTML = candidateProviders.map(prv => {
        const isPreselected = preselectedIds.has(prv.id);
        return `
          <article class="selector-provider-card ${isPreselected ? "is-selected" : ""}">
            <div class="selector-card-head">
              <div>
                <strong style="font-size:0.95rem;color:var(--entity-text);display:block">${prv.nombre}</strong>
                <small style="color:var(--entity-muted);font-size:0.72rem">${prv.sede} · CIF ${prv.cif}</small>
              </div>
              <span class="selector-provider-badge-score">${prv.score || "98% Conforme"}</span>
            </div>

            <div class="selector-homologations">
              ${(prv.homologaciones || ["Adif NAV Vigente", "CE", "ENAC"]).map(h => `<span class="selector-homologation-chip">${icon("shield", 12)} ${h}</span>`).join("")}
            </div>

            <div class="selector-metrics-row">
              <div class="selector-metric-item">
                <span>Plazo Medio</span>
                <strong>${prv.leadTimeMedio}</strong>
              </div>
              <div class="selector-metric-item">
                <span>Precio Orientativo</span>
                <strong>${prv.precioEstimado || "A cotizar"}</strong>
              </div>
            </div>

            <div style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:600;margin-bottom:6px">Requisitos que puede cumplir:</div>
            <ul class="selector-reqs-list">
              ${(prv.requisitosQueCumple || ["Trazabilidad completa"]).map(r => `<li>${icon("check", 13)} <span>${r}</span></li>`).join("")}
            </ul>

            <div class="selector-card-foot">
              <span style="font-size:0.72rem;color:var(--entity-muted)">${prv.condicionesPago || "60 días confirmada"}</span>
              ${isRoleAdmin ? `
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.76rem;color:var(--entity-text);font-weight:600">
                  <input type="checkbox" data-preselect-prv="${prv.id}" data-exp-id="${exp.id}" ${isPreselected ? "checked" : ""} style="accent-color:var(--entity-accent);width:15px;height:15px">
                  <span>Preseleccionar</span>
                </label>
              ` : `
                <span class="dossier-chip" style="font-size:0.68rem;color:var(--entity-accent)">Homologado</span>
              `}
            </div>
          </article>
        `;
      }).join("");

      dynamicContentHTML = `
        <div style="margin-bottom:18px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
            <div>
              <h2 style="margin:0 0 4px;font-size:1.15rem;color:var(--entity-text)">Paso 1: Preselección Técnica por SOFEIN</h2>
              <p style="margin:0;font-size:0.8rem;color:var(--entity-muted)">SOFEIN filtra los talleres homologados aptos para este pliego antes de habilitar la selección al cliente.</p>
            </div>
            ${isRoleAdmin ? `
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:0.76rem;color:var(--entity-muted)"><b style="color:var(--entity-accent)">${matching.proveedoresPreseleccionadosPorAdmin.length}</b> seleccionados</span>
              </div>
            ` : ""}
          </div>

          <div class="selector-cards-grid">
            ${cardsHTML}
          </div>

          <div class="selector-action-bar">
            <div>
              <strong style="display:block;font-size:0.85rem;color:var(--entity-text)">
                ${isRoleAdmin ? "Validación de la Preselección" : "Esperando Validación de SOFEIN"}
              </strong>
              <small style="color:var(--entity-muted);font-size:0.75rem">
                ${isRoleAdmin ? "Al validar, el cliente recibirá aviso en su bandeja para seleccionar a quién solicitar cotización." : "SOFEIN está revisando los pliegos técnicos para autorizar el paso a selección de cliente."}
              </small>
            </div>
            ${isRoleAdmin ? `
              <button class="admin-primary-button" id="approvePreselectionBtn" data-exp-id="${exp.id}" type="button">
                ${icon("check", 14)} Aprobar Preselección Oficial y Habilitar para Cliente
              </button>
            ` : `
              <span class="dossier-chip info">${icon("file", 14)} En validación técnica</span>
            `}
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // SUB-FASE 2: SELECCIÓN DEL CLIENTE (CONSTRUCTOR)
    // -------------------------------------------------------------
    else if (matching.faseSelector === "seleccion_cliente") {
      const preselectedPrvs = candidateProviders.filter(p => matching.proveedoresPreseleccionadosPorAdmin.includes(p.id));
      const clientSelectedSet = new Set(matching.proveedoresSeleccionadosPorCliente);

      const cardsHTML = preselectedPrvs.map(prv => {
        const isSelectedByClient = clientSelectedSet.has(prv.id);
        return `
          <article class="selector-provider-card ${isSelectedByClient ? "is-selected" : ""}">
            <div class="selector-card-head">
              <div>
                <strong style="font-size:0.95rem;color:var(--entity-text);display:block">${prv.nombre}</strong>
                <small style="color:var(--entity-muted);font-size:0.72rem">${prv.sede}</small>
              </div>
              <span class="selector-provider-badge-score">${prv.score || "98% Conforme"}</span>
            </div>

            <div class="selector-homologations">
              ${(prv.homologaciones || ["Adif NAV", "CE"]).map(h => `<span class="selector-homologation-chip">${icon("shield", 12)} ${h}</span>`).join("")}
            </div>

            <div class="selector-metrics-row">
              <div class="selector-metric-item">
                <span>Plazo Comprometido</span>
                <strong>${prv.leadTimeMedio}</strong>
              </div>
              <div class="selector-metric-item">
                <span>Precio Estimativo</span>
                <strong>${prv.precioEstimado || "Según pliego"}</strong>
              </div>
            </div>

            <div style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:600;margin-bottom:6px">Requisitos acreditados:</div>
            <ul class="selector-reqs-list">
              ${(prv.requisitosQueCumple || []).slice(0, 3).map(r => `<li>${icon("check", 13)} <span>${r}</span></li>`).join("")}
            </ul>

            <div class="selector-card-foot">
              <span style="font-size:0.72rem;color:var(--entity-muted)">Pago: ${prv.condicionesPago || "60 días"}</span>
              ${isRoleCliente ? `
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.76rem;color:var(--entity-accent);font-weight:600">
                  <input type="checkbox" data-client-select-prv="${prv.id}" data-exp-id="${exp.id}" ${isSelectedByClient ? "checked" : ""} style="accent-color:var(--entity-accent);width:16px;height:16px">
                  <span>Pedir Cotización</span>
                </label>
              ` : `
                <span class="dossier-chip ${isSelectedByClient ? "complete" : ""}">
                  ${isSelectedByClient ? "✓ Elegido por cliente" : "Opción disponible"}
                </span>
              `}
            </div>
          </article>
        `;
      }).join("");

      dynamicContentHTML = `
        <div style="margin-bottom:18px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
            <div>
              <h2 style="margin:0 0 4px;font-size:1.15rem;color:var(--entity-text)">Paso 2: Selección de Talleres para Petición de Oferta Ciega</h2>
              <p style="margin:0;font-size:0.8rem;color:var(--entity-muted)">Elige los proveedores a los que SOFEIN solicitará cotización vinculante de precio, plazo y ensayos técnicos.</p>
            </div>
            <span class="dossier-chip" style="color:var(--entity-accent)">${matching.proveedoresSeleccionadosPorCliente.length} Seleccionados para cotizar</span>
          </div>

          <div class="selector-cards-grid">
            ${cardsHTML}
          </div>

          <div class="selector-action-bar">
            <div>
              <strong style="display:block;font-size:0.85rem;color:var(--entity-text)">Confirmación de Petición de Ofertas</strong>
              <small style="color:var(--entity-muted);font-size:0.75rem">Se emitirá la solicitud formal con los pliegos técnicos adjuntos del expediente ${exp.id}.</small>
            </div>
            ${isRoleCliente ? `
              <button class="admin-primary-button" id="requestClientQuotesBtn" data-exp-id="${exp.id}" type="button">
                ${icon("file", 14)} Solicitar Cotización Formal a Seleccionados (${matching.proveedoresSeleccionadosPorCliente.length})
              </button>
            ` : isRoleAdmin ? `
              <button class="admin-primary-button" id="emitRfqOrdersBtn" data-exp-id="${exp.id}" type="button">
                ${icon("file", 14)} Emitir Petición de Ofertas Ciega a Talleres
              </button>
            ` : `
              <span class="dossier-chip info">Fase de selección por el constructor</span>
            `}
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // SUB-FASE 3: RECEPCIÓN DE COTIZACIONES DE TALLERES
    // -------------------------------------------------------------
    else if (matching.faseSelector === "peticion_cotizaciones") {
      const selectedPrvs = candidateProviders.filter(p => matching.proveedoresSeleccionadosPorCliente.includes(p.id));
      const quotesObj = matching.cotizaciones || {};

      const listHTML = selectedPrvs.map(prv => {
        const quote = quotesObj[prv.id];
        const hasQuote = Boolean(quote && quote.estado !== "pendiente");
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-radius:8px;background:var(--entity-panel);border:1px solid var(--entity-line);margin-bottom:12px;gap:16px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:${hasQuote ? "rgba(82,223,127,0.12)" : "rgba(234,179,8,0.12)"};color:${hasQuote ? "var(--entity-accent)" : "var(--entity-warning)"}">
                ${icon(hasQuote ? "check" : "file", 18)}
              </span>
              <div>
                <strong style="color:var(--entity-text);font-size:0.9rem">${prv.nombre}</strong>
                <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${prv.sede} · Plazo orientativo: ${prv.leadTimeMedio}</p>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              ${hasQuote ? `
                <div style="text-align:right">
                  <strong style="color:var(--entity-text);font-size:0.85rem">${quote.precioTotal || quote.precioUnitario}</strong>
                  <small style="display:block;color:var(--entity-muted);font-size:0.7rem">${quote.plazoSemanas}</small>
                </div>
                <span class="dossier-chip complete">✓ Cotización Recibida</span>
              ` : `
                <span class="dossier-chip pending">⏳ Pendiente de Respuesta</span>
              `}
            </div>
          </div>
        `;
      }).join("");

      // Proveedor Formulario de Cotización
      let providerFormHTML = "";
      if (isRoleProveedor) {
        providerFormHTML = `
          <form id="providerQuoteForm" data-exp-id="${exp.id}" style="padding:22px;border-radius:10px;background:var(--entity-panel);border:1px solid var(--entity-accent-soft);margin-top:20px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
              <span style="color:var(--entity-accent)">${icon("file", 20)}</span>
              <div>
                <h3 style="margin:0;font-size:1.05rem;color:var(--entity-text)">Enviar Cotización Vinculante para ${exp.id}</h3>
                <small style="color:var(--entity-muted)">Suministro: ${exp.producto} (${exp.unidades}) · Destino: ${exp.destinatarioFinal}</small>
              </div>
            </div>

            <div class="create-exp-grid-3" style="margin-bottom:14px">
              <label class="create-exp-label">
                <span>Precio Unitario Ofertado</span>
                <input type="text" class="create-exp-input" id="quoteUnitPrice" placeholder="Ej: 945 €/t o 33,50 €/ud" required>
              </label>
              <label class="create-exp-label">
                <span>Importe Total Calculado</span>
                <input type="text" class="create-exp-input" id="quoteTotalPrice" placeholder="Ej: 1.134.000 €" required>
              </label>
              <label class="create-exp-label">
                <span>Plazo Garantizado de Entrega</span>
                <input type="text" class="create-exp-input" id="quoteDeliveryTime" placeholder="Ej: 8 semanas (56 días)" required>
              </label>
            </div>

            <div class="create-exp-grid-2" style="margin-bottom:16px">
              <label class="create-exp-label">
                <span>Condiciones de Pago Propuestas</span>
                <select class="create-exp-select" id="quotePaymentCond">
                  <option value="60 días fecha factura">60 días fecha factura (Estándar SOFEIN)</option>
                  <option value="60 días confirming">60 días confirming bancario</option>
                  <option value="90 días confirming">90 días confirming</option>
                </select>
              </label>
              <label class="create-exp-label">
                <span>Validez de la Oferta</span>
                <select class="create-exp-select" id="quoteValidity">
                  <option value="45 días">45 días naturales</option>
                  <option value="60 días">60 días naturales</option>
                  <option value="30 días">30 días naturales</option>
                </select>
              </label>
            </div>

            <div style="margin-bottom:16px">
              <span class="create-exp-label" style="margin-bottom:8px">Confirmación de Requisitos Técnicos del Pliego:</span>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <label class="selector-req-check-item">
                  <input type="checkbox" checked required>
                  <span>Certificación de ensayos mecánicos en laboratorio ENAC</span>
                </label>
                <label class="selector-req-check-item">
                  <input type="checkbox" checked required>
                  <span>Trazabilidad de colada / lote con código individual QR</span>
                </label>
                <label class="selector-req-check-item">
                  <input type="checkbox" checked required>
                  <span>Cumplimiento estricto de especificación técnica y tolerancias</span>
                </label>
                <label class="selector-req-check-item">
                  <input type="checkbox" checked>
                  <span>Plan de transporte y acopio coordinado a pie de vía</span>
                </label>
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:10px">
              <button class="admin-primary-button" type="submit" style="padding:9px 20px">
                ${icon("check", 14)} Enviar Cotización Oficial a SOFEIN
              </button>
            </div>
          </form>
        `;
      }

      dynamicContentHTML = `
        <div style="margin-bottom:18px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
            <div>
              <h2 style="margin:0 0 4px;font-size:1.15rem;color:var(--entity-text)">Paso 3: Recepción de Cotizaciones Vinculantes</h2>
              <p style="margin:0;font-size:0.8rem;color:var(--entity-muted)">Petición formal remitida a los proveedores seleccionados. A medida que responden, SOFEIN revisa y valida sus ofertas.</p>
            </div>
            <div style="display:flex;gap:8px">
              <button class="admin-quiet-button" type="button" id="simulateAllQuotesBtn" data-exp-id="${exp.id}">
                ${icon("check", 13)} Simular recepción de todas las ofertas
              </button>
            </div>
          </div>

          <div>
            ${listHTML}
          </div>

          ${providerFormHTML}

          <div class="selector-action-bar" style="margin-top:20px">
            <div>
              <strong style="display:block;font-size:0.85rem;color:var(--entity-text)">Paso a la Comparativa</strong>
              <small style="color:var(--entity-muted);font-size:0.75rem">Cuando se hayan recibido las cotizaciones, se habilitará la matriz comparativa de ofertas.</small>
            </div>
            <button class="admin-primary-button" id="goToComparisonBtn" data-exp-id="${exp.id}" type="button">
              ${icon("arrow", 14)} Abrir Matriz Comparativa de Cotizaciones
            </button>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // SUB-FASE 4: COMPARATIVA DE OFERTAS & ADJUDICACIÓN FINAL
    // -------------------------------------------------------------
    else if (matching.faseSelector === "comparativa") {
      const quotes = Object.values(matching.cotizaciones || {});
      const reqsExigidosSet = new Set(matching.requisitosExigidosCliente || []);

      const isRoleProveedor = activeRole === "proveedor";
      const myEntityName = PLAYERS.proveedor?.entity || "IberRail Components, S.L.";

      const tableColsHTML = quotes.map(q => {
        const isWinner = matching.proveedorAdjudicado === q.nombre;
        const isOwn = !isRoleProveedor || q.nombre === myEntityName || q.proveedorId === "PRV-01";
        const displayName = isOwn ? q.nombre : "Taller Homologado Competidor";
        const displaySede = isOwn ? q.sede : "Centro de Fabricación Homologado";
        return `
          <th style="min-width:240px;text-align:left;background:${isWinner ? "rgba(82,223,127,0.06)" : "var(--entity-panel-2)"};border-left:1px solid var(--entity-line)">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <strong style="color:var(--entity-text);font-size:0.88rem">${displayName}</strong>
              ${isWinner ? `<span class="dossier-chip complete" style="font-size:0.68rem">✓ Adjudicado</span>` : (!isOwn ? `<span class="dossier-chip" style="font-size:0.65rem;color:var(--entity-muted)">Competidor</span>` : "")}
            </div>
            <small style="color:var(--entity-muted);font-size:0.7rem">${displaySede}</small>
          </th>
        `;
      }).join("");

      const priceRowHTML = quotes.map(q => {
        const isOwn = !isRoleProveedor || q.nombre === myEntityName || q.proveedorId === "PRV-01";
        if (!isOwn) {
          return `
            <td style="border-left:1px solid var(--entity-line)">
              <div class="selector-quote-price" style="font-size:0.82rem;color:var(--entity-muted)">[Confidencial]</div>
              <span class="selector-quote-unit" style="font-size:0.68rem;color:var(--entity-faint)">Oferta de taller competidor</span>
            </td>
          `;
        }
        return `
          <td style="border-left:1px solid var(--entity-line)">
            <div class="selector-quote-price">${q.precioTotal}</div>
            <span class="selector-quote-unit">${q.precioUnitario}</span>
          </td>
        `;
      }).join("");

      const plazoRowHTML = quotes.map(q => {
        const isOwn = !isRoleProveedor || q.nombre === myEntityName || q.proveedorId === "PRV-01";
        const diff = q.desviacionPlazoDias || 0;
        const diffClass = diff < 0 ? "complete" : diff === 0 ? "info" : "warning";
        const diffText = diff < 0 ? `${Math.abs(diff)} días antes` : diff === 0 ? "Exacto a fecha" : `+${diff} días`;
        return `
          <td style="border-left:1px solid var(--entity-line)">
            <strong style="color:var(--entity-text);font-size:0.82rem">${isOwn ? q.plazoSemanas : "Plazo en pliego"}</strong>
            <span class="dossier-chip ${diffClass}" style="display:inline-block;margin-top:4px;font-size:0.68rem">${diffText}</span>
          </td>
        `;
      }).join("");

      const condRowHTML = quotes.map(q => {
        const isOwn = !isRoleProveedor || q.nombre === myEntityName || q.proveedorId === "PRV-01";
        if (!isOwn) {
          return `
            <td style="border-left:1px solid var(--entity-line)">
              <div style="font-size:0.78rem;color:var(--entity-muted)">[Condiciones Reservadas]</div>
              <small style="color:var(--entity-muted);font-size:0.7rem">Garantía homologada</small>
            </td>
          `;
        }
        return `
          <td style="border-left:1px solid var(--entity-line)">
            <div style="font-size:0.78rem;color:var(--entity-text)">${q.condicionesPago}</div>
            <small style="color:var(--entity-muted);font-size:0.7rem">Garantía: ${q.garantia}</small>
          </td>
        `;
      }).join("");

      const reqsRowHTML = quotes.map(q => `
        <td style="border-left:1px solid var(--entity-line)">
          <ul class="selector-reqs-list" style="margin:0">
            ${(q.requisitosConfirmados || []).map(r => `<li>${icon("check", 13)} <span>${r}</span></li>`).join("")}
          </ul>
        </td>
      `).join("");

      const fileRowHTML = quotes.map(q => {
        const isOwn = !isRoleProveedor || q.nombre === myEntityName || q.proveedorId === "PRV-01";
        if (!isOwn) {
          return `
            <td style="border-left:1px solid var(--entity-line)">
              <span class="dossier-chip" style="font-size:0.7rem;color:var(--entity-muted)">${icon("lock", 12)} Oferta Privada</span>
            </td>
          `;
        }
        return `
          <td style="border-left:1px solid var(--entity-line)">
            <button class="slot-action-btn" type="button" data-download="${q.archivoOferta}">
              ${icon("download", 13)} ${q.archivoOferta}
            </button>
          </td>
        `;
      }).join("");

      const actionRowHTML = quotes.map(q => {
        const isWinner = matching.proveedorAdjudicado === q.nombre;
        const isOwn = !isRoleProveedor || q.nombre === myEntityName || q.proveedorId === "PRV-01";
        return `
          <td style="border-left:1px solid var(--entity-line);padding:14px">
            ${isRoleCliente ? `
              <button class="admin-primary-button" type="button" data-select-winning-prv="${q.nombre}" data-exp-id="${exp.id}" style="width:100%;padding:8px;font-size:0.78rem;background:${isWinner ? "var(--entity-accent)" : "transparent"};color:${isWinner ? "var(--entity-accent-ink)" : "var(--entity-accent)"};border:1px solid var(--entity-accent)">
                ${isWinner ? `${icon("check", 14)} Proveedor Seleccionado` : "Elegir este Proveedor"}
              </button>
            ` : isRoleProveedor && !isOwn ? `
              <span class="dossier-chip" style="width:100%;text-align:center;display:block;color:var(--entity-muted)">
                ${isWinner ? "Adjudicado" : "Oferta competidora"}
              </span>
            ` : `
              <span class="dossier-chip ${isWinner ? "complete" : ""}" style="width:100%;text-align:center;display:block">
                ${isWinner ? "✓ Oferta Adjudicada" : "Oferta evaluada"}
              </span>
            `}
          </td>
        `;
      }).join("");

      // Lista de requisitos exigibles (Apuntes 06: marcación/desmarcación)
      const allRequirements = [
        "Barra larga soldada (tramos hasta 108 m con transporte especial)",
        "Ensayos no destructivos ultrasonidos al 100% en taller",
        "Certificado de colada siderúrgica trazable lote a lote con QR",
        "Cumplimiento estricto perfil 54E1 Grado R260 según norma EN 13674-1",
        "Entrega fraccionada a pie de vía según ritmo de montaje"
      ];

      const reqChecksHTML = allRequirements.map(req => {
        const isChecked = reqsExigidosSet.has(req);
        return `
          <label class="selector-req-check-item">
            <input type="checkbox" data-req-exigible-check="${req}" data-exp-id="${exp.id}" ${isChecked ? "checked" : ""}>
            <span>${req}</span>
          </label>
        `;
      }).join("");

      dynamicContentHTML = `
        <div style="margin-bottom:18px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
            <div>
              <h2 style="margin:0 0 4px;font-size:1.15rem;color:var(--entity-text)">Paso 4: Matriz Comparativa de Ofertas Vinculantes</h2>
              <p style="margin:0;font-size:0.8rem;color:var(--entity-muted)">Analiza las propuestas técnicas y económicas. Selecciona el taller adjudicatario y marca los requisitos contractuales exigibles (Apuntes 06).</p>
            </div>
            ${matching.proveedorAdjudicado ? `
              <span class="dossier-chip complete" style="font-size:0.75rem">
                ${icon("award", 14)} Adjudicado a: <b>${matching.proveedorAdjudicado}</b>
              </span>
            ` : ""}
          </div>

          <!-- Matriz Comparativa B2B -->
          <div class="selector-matrix-wrap">
            <table class="selector-matrix-table">
              <thead>
                <tr>
                  <th style="width:180px">Concepto</th>
                  ${tableColsHTML}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Oferta Económica</strong></td>
                  ${priceRowHTML}
                </tr>
                <tr>
                  <td><strong>Plazo de Entrega</strong></td>
                  ${plazoRowHTML}
                </tr>
                <tr>
                  <td><strong>Condiciones & Pago</strong></td>
                  ${condRowHTML}
                </tr>
                <tr>
                  <td><strong>Requisitos Técnicos</strong></td>
                  ${reqsRowHTML}
                </tr>
                <tr>
                  <td><strong>Ficha de Oferta (PDF)</strong></td>
                  ${fileRowHTML}
                </tr>
                <tr>
                  <td><strong>Acción</strong></td>
                  ${actionRowHTML}
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bloque de Marcación de Requisitos Acordados (Apuntes 06 - Tabla 3) -->
          <div style="padding:20px;border-radius:10px;background:var(--entity-panel);border:1px solid var(--entity-line);margin-bottom:20px">
            <div style="margin-bottom:12px">
              <strong style="color:var(--entity-text);font-size:0.9rem">Requisitos Contractuales Exigibles al Proveedor</strong>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">
                Marca los requisitos que quedarán formalmente estipulados en la hoja de pedido y delimitación de responsabilidad SOFEIN.
              </p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:10px">
              ${reqChecksHTML}
            </div>
          </div>

          <!-- Barra de Acción de Adjudicación -->
          <div class="selector-action-bar">
            <div>
              <strong style="display:block;font-size:0.85rem;color:var(--entity-text)">
                ${matching.proveedorAdjudicado ? `Adjudicación Seleccionada: ${matching.proveedorAdjudicado}` : "Selecciona un proveedor en la matriz"}
              </strong>
              <small style="color:var(--entity-muted);font-size:0.75rem">
                ${isRoleCliente ? "Al confirmar la adjudicación, SOFEIN validará el pedido para emitir la hoja de contrato (Fase 3)." : "Como Administrador SOFEIN, puedes validar la adjudicación final del cliente."}
              </small>
            </div>
            <div style="display:flex;gap:10px">
              ${isRoleCliente && matching.proveedorAdjudicado ? `
                <button class="admin-primary-button" id="confirmAwardBtn" data-exp-id="${exp.id}" type="button">
                  ${icon("award", 14)} Confirmar Selección de Proveedor y Requisitos
                </button>
              ` : isRoleAdmin ? `
                <button class="admin-primary-button" id="formalizePedidoBtn" data-exp-id="${exp.id}" type="button">
                  ${icon("check", 14)} Validar Adjudicación y Pasar a Fase 3: Formalización
                </button>
              ` : `
                <span class="dossier-chip info">Esperando confirmación</span>
              `}
            </div>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // SUB-FASE 5: ADJUDICADO (PROVEEDOR CONFIRMADO)
    // -------------------------------------------------------------
    else if (matching.faseSelector === "adjudicado") {
      dynamicContentHTML = `
        <div style="padding:28px;border-radius:12px;background:var(--entity-panel);border:1px solid rgba(82,223,127,0.3);margin-bottom:20px;animation:filterFadeIn 0.25s ease-out">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
            <span style="display:grid;place-items:center;width:48px;height:48px;border-radius:10px;background:rgba(82,223,127,0.12);color:var(--entity-accent)">
              ${icon("award", 26)}
            </span>
            <div>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="dossier-chip complete">✓ Proceso de Selección Completado</span>
                <span style="font-size:0.75rem;color:var(--entity-muted)">Fase 2 de Cotización Finalizada</span>
              </div>
              <h2 style="margin:4px 0 0;font-size:1.4rem;color:var(--entity-text)">Proveedor Adjudicatario: ${matching.proveedorAdjudicado || exp.proveedor}</h2>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;padding:16px 0;border-top:1px solid var(--entity-line);border-bottom:1px solid var(--entity-line);margin-bottom:20px">
            <div>
              <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Presupuesto Cerrado</span>
              <strong style="display:block;margin-top:4px;color:var(--entity-text);font-size:1.05rem">${exp.presupuestoTotal}</strong>
            </div>
            <div>
              <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Plazo Acordado</span>
              <strong style="display:block;margin-top:4px;color:var(--entity-text);font-size:1.05rem">${exp.plazoPactado}</strong>
            </div>
            <div>
              <span style="font-size:0.68rem;color:var(--entity-faint);text-transform:uppercase;font-weight:600">Responsabilidad Técnica</span>
              <strong style="display:block;margin-top:4px;color:var(--entity-accent);font-size:0.85rem">Fabricante Homologado (Delimitada SOFEIN)</strong>
            </div>
          </div>

          <div style="margin-bottom:24px">
            <strong style="font-size:0.82rem;color:var(--entity-text);display:block;margin-bottom:8px">Requisitos Contractuales Firmados:</strong>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              ${(matching.requisitosExigidosCliente || []).map(r => `<span class="dossier-chip complete">${icon("check", 12)} ${r}</span>`).join("")}
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
            <button class="admin-quiet-button" type="button" data-switch-selector-step="comparativa" data-exp-id="${exp.id}">
              ${icon("table", 14)} Volver a consultar la Matriz Comparativa
            </button>
            <button class="admin-primary-button" type="button" data-go="#${activeRole}/expedientes/${exp.id}">
              ${icon("arrow", 14)} Ir al Expediente (Fase 3: Formalización de Pedido)
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="selector-view-wrap" style="max-width:1200px;margin:0 auto">
        ${breadcrumbBase}

        <div class="admin-view-head" style="margin-bottom:18px">
          <div>
            <h1>Selector y Matching de Proveedores</h1>
            <p>Expediente estanco <b>${exp.id}</b> · ${exp.producto} (${exp.unidades}) · Destino: <b>${exp.destinatarioFinal}</b></p>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <button class="admin-quiet-button" type="button" data-go="#${activeRole}/expedientes/${exp.id}">
              ${icon("folder", 14)} Ver Expediente
            </button>
          </div>
        </div>

        <!-- Stepper de 4 Sub-pasos -->
        <div class="selector-stepper-wrap">
          ${stepperHTML}
        </div>

        <!-- Banner de Cumplimiento Legal (Mínimo 3) -->
        ${legalBannerHTML}

        <!-- Contenido Dinámico de la Sub-fase -->
        ${dynamicContentHTML}
      </div>
    `;
  }

  /* ============================================================
     HELPERS DE SUMINISTROS, ICONOS, REGISTRO Y VISIBILIDAD DOCUMENTAL
     ============================================================ */
  function getSuministroTypeIcon(tipo = "") {
    const t = String(tipo).toLowerCase();
    if (t.includes("traviesa")) return "route";
    if (t.includes("carril")) return "activity";
    if (t.includes("sujeci") || t.includes("fijaci") || t.includes("clip") || t.includes("tirafondo") || t.includes("placa") || t.includes("arandela") || t.includes("clavaz")) return "cog";
    if (t.includes("balasto") || t.includes("cantera") || t.includes("árido")) return "box";
    if (t.includes("desv") || t.includes("aparato") || t.includes("cruzamiento")) return "shield";
    return "packageCheck";
  }

  function getNoticePhaseIdx(n) {
    if (typeof n.phaseIdx === "number") return n.phaseIdx;
    const cat = String(n.categoria || "").toLowerCase();
    const text = `${n.titulo || ""} ${n.descripcion || ""}`.toLowerCase();
    if (cat.includes("cotizaci") || cat.includes("preselecci") || text.includes("fase 2") || text.includes("selector")) return 1;
    if (cat.includes("cierre") || cat.includes("pasaporte") || text.includes("pasaporte") || text.includes("cerrado")) return 3;
    if (text.includes("fase 1") || text.includes("pliego inicial")) return 0;
    return 2; // Gestión del pedido (Formalización, Calidad / Ensayo, Incidencia / Mediación, Logística)
  }

  function ensureExpedienteRegistroCambios(exp) {
    if (!exp) return [];
    if (Array.isArray(exp.registroCambios)) return exp.registroCambios;

    exp.registroCambios = [
      {
        id: `REG-${exp.id.slice(-4)}-03`,
        fecha: "16 jun 2026 · 14:20",
        autor: "SOFEIN Admin",
        tipo: "Avance de fase",
        suministro: "General",
        titulo: `Actualización de fase activa a ${PHASES[Math.min(exp.faseActual, PHASES.length - 1)]?.name || "Gestión del pedido"}`,
        detalle: "Verificación de hitos documentales y sincronización del cronograma de entregas."
      },
      {
        id: `REG-${exp.id.slice(-4)}-02`,
        fecha: "12 jun 2026 · 10:05",
        autor: `Cliente (${exp.cliente})`,
        tipo: "Cambio documental",
        suministro: "SUM-01",
        titulo: "Validación de especificaciones técnicas y pliego base",
        detalle: "Pliego técnico revisado y permisos de lectura asignados a los actores del expediente."
      },
      {
        id: `REG-${exp.id.slice(-4)}-01`,
        fecha: exp.fechaAlta || "10 jun 2026 · 09:00",
        autor: "SOFEIN Digital",
        tipo: "Alta de expediente",
        suministro: "Todos",
        titulo: `Apertura e inicialización del expediente ${exp.id}`,
        detalle: `Constitución de bandeja estanca para ${exp.destinatarioFinal}.`
      }
    ];
    return exp.registroCambios;
  }

  function addExpedienteCambioLog(exp, { tipo = "Cambio operativo", suministro = "General", titulo, detalle = "" }) {
    if (!exp) return;
    const list = ensureExpedienteRegistroCambios(exp);
    const nowStr = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "") + " · Ahora";
    const actorLabel = activeRole === "admin" ? "SOFEIN Admin" : activeRole === "cliente" ? `Cliente (${exp.cliente})` : activeRole === "proveedor" ? `Proveedor (${exp.proveedor})` : "Auditor";
    list.unshift({
      id: `REG-${exp.id.slice(-4)}-0${list.length + 1}`,
      fecha: nowStr,
      autor: actorLabel,
      tipo,
      suministro,
      titulo,
      detalle
    });
  }

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
    const list = SUMINISTROS.filter(s => s.expId === exp.id);
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
    const list = SUMINISTROS.filter(s => s.expId === exp.id);
    if (sum && list.length > 1) {
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
     EL CONSTRUCTOR DE EXPEDIENTES (GESTIÓN DEL EXPEDIENTE)
     ============================================================ */
  function renderDossierBuilder(expId) {
    const exp = getActiveExpediente(expId);
    const expSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
    const cambiosLog = ensureExpedienteRegistroCambios(exp);

    if (lastOpenedExpId !== exp.id) {
      lastOpenedExpId = exp.id;
      activeDossierSuministroId = expSuministros.length ? expSuministros[0].id : null;
      const firstSum = expSuministros[0];
      activeDossierPhase = firstSum ? Math.min(firstSum.faseActual, PHASES.length - 1) : Math.min(exp.faseActual, PHASES.length - 1);
    }

    // Si algún enlace apuntaba a passport como pestaña global, redirigirlo a la Fase 4 (Cierre) dentro de Documentación
    if (activeDossierTab === "passport") {
      activeDossierPhase = PHASES.length - 1;
      activeDossierTab = "deliverables";
    }

    const currentSum = getActiveExpSuministro(exp);
    const activeEntityPhaseActual = (currentSum && expSuministros.length > 1)
      ? Math.min(currentSum.faseActual, PHASES.length - 1)
      : Math.min(exp.faseActual, PHASES.length - 1);

    if (activeDossierPhase >= PHASES.length) {
      activeDossierPhase = PHASES.length - 1;
    }

    const delivMap = getActiveDeliverablesMap(exp);
    const rawPhaseDeliverables = delivMap[activeDossierPhase] || [];
    const isDestinatario = activeRole === "destinatario";
    const isRoleAdmin = activeRole === "admin";

    // Metadatos visuales resumidos del expediente
    const v = getExpVisualMeta(exp);
    const miniBarsHTML = PHASES.map((p, idx) => {
      const isDone = idx < exp.faseActual || v.isClosed || v.isCompleted;
      const isCurrent = !v.isClosed && !v.isCompleted && idx === exp.faseActual;
      return `<i class="exp-v2-bar ${isDone ? "is-done" : isCurrent ? "is-current" : ""}" title="${p.name}"></i>`;
    }).join("");

    const currentSumIconName = currentSum ? getSuministroTypeIcon(currentSum.tipo) : getSuministroTypeIcon(exp.producto);

    // 1. Sección plegable de Tarjetas por Suministro (con mayor espaciado vertical y barra separadora)
    const suministrosCardsHTML = expSuministros.length > 1 ? `
      <hr class="dossier-section-divider" />
      <details class="dossier-collapsible-block" data-collapse-key="suministros" ${dossierCollapseState.suministros !== false ? "open" : ""}>
        <summary class="dossier-collapsible-summary">
          <div class="dossier-collapsible-summary-left">
            <span class="dossier-section-kicker">Suministros del expediente (${expSuministros.length})</span>
            ${currentSum ? `
              <span class="dossier-active-sum-pill">
                ${icon(currentSumIconName, 12)} Activo: <b>${currentSum.id}</b> · ${currentSum.tipo}
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
              const sumIconName = getSuministroTypeIcon(s.tipo);
              return `
                <article class="dossier-sum-card ${isSelected ? "is-selected" : ""} ${isSumClosed ? "is-closed" : ""}" data-select-exp-suministro="${s.id}">
                  <div class="dossier-sum-card-top">
                    <div class="exp-v2-identity">
                      <i class="exp-v2-dot ${sDotClass}"></i>
                      <span class="sum-type-icon-badge" title="${s.tipo}">${icon(sumIconName, 13)}</span>
                      <span class="dossier-sum-code">${s.id}</span>
                    </div>
                    <div style="display:inline-flex;align-items:center;gap:8px">
                      <div class="exp-v2-phase-row phase-tone-${sStep}">
                        <span class="exp-v2-phase-num">${sStep}/${PHASES.length}</span>
                        <span class="exp-v2-phase-name">${sPhaseName}</span>
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
                  <div class="dossier-sum-meta-rows">
                    <div class="dossier-sum-meta-row">
                      <span>Código de suministro</span>
                      <strong>${s.id}</strong>
                    </div>
                    <div class="dossier-sum-meta-row">
                      <span>Presupuesto estimado</span>
                      <strong>${!isDestinatario ? (s.presupuesto || exp.presupuestoTotal) : "[Reservado]"}</strong>
                    </div>
                    <div class="dossier-sum-meta-row">
                      <span>Fecha de entrega</span>
                      <strong>${s.fechaEntrega}</strong>
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
    const stepperHTML = PHASES.map((p, idx) => {
      const isCurrent = idx === activeDossierPhase;
      const isDone = idx < activeEntityPhaseActual || isCurrentContextClosed;
      return `
        <div class="dossier-step ${isCurrent ? "is-current" : isDone ? "is-done" : ""}" data-select-dossier-phase="${idx}">
          <div class="dossier-step-top">
            <span class="dossier-step-icon-label">
              ${icon(p.icon, 15)}
              <span class="dossier-step-num">Fase ${p.num}</span>
            </span>
            ${isDone ? `<span style="color:var(--entity-accent)">${icon("check", 14)}</span>` : ""}
          </div>
          <div class="dossier-step-title">${p.name}</div>
          <div class="dossier-step-meta">${isCurrentContextClosed ? "Completada" : idx === activeEntityPhaseActual ? "En curso" : idx < activeEntityPhaseActual ? "Completada" : "Pendiente"}</div>
        </div>
      `;
    }).join("");

    // 3. Barra de Estado, Fase, Nombre y Botones (Completar fase, Requerir, Subir) DEBAJO de las fases y ENCIMA de las secciones
    const phaseStateLabel = (activeDossierPhase < activeEntityPhaseActual || isCurrentContextClosed)
      ? `<span class="entity-status complete"><i></i>Completada</span>`
      : activeDossierPhase === activeEntityPhaseActual
        ? `<span class="entity-status review"><i></i>En curso</span>`
        : `<span class="entity-status pending"><i></i>Pendiente</span>`;

    const phaseOpsPanelBelowStepperHTML = !isDestinatario ? `
      <div class="phase-ops-panel is-simplified">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          ${phaseStateLabel}
          <strong style="font-size:0.86rem;color:var(--entity-text)">Fase ${PHASES[activeDossierPhase].num}: ${PHASES[activeDossierPhase].name}</strong>
          ${currentSum && expSuministros.length > 1 ? `
            <span class="dossier-chip" style="font-size:0.71rem;display:inline-flex;align-items:center;gap:5px">
              ${icon(currentSumIconName, 12)} ${currentSum.id} · ${currentSum.tipo}
            </span>
          ` : ""}
        </div>
        <div class="phase-ops-controls">
          ${isRoleAdmin && !isCurrentContextClosed ? `
            <button class="admin-primary-button" type="button" data-advance-dossier-phase="${exp.id}">
              ${icon("check", 14)} Completar fase
            </button>
            <button class="admin-quiet-button" type="button" data-open-add-slot-modal="${exp.id}">
              ${icon("plus", 14)} Requerir
            </button>
          ` : ""}
          <button class="admin-quiet-button" type="button" data-open-upload-free-doc="${exp.id}">
            ${icon("upload", 14)} Subir
          </button>
        </div>
      </div>
    ` : "";

    // 4. Selector y Matching de Proveedores ENCIMA del menú y SÓLO en la Fase 2 (Proveedores, idx === 1)
    const selectorAboveMenuHTML = activeDossierPhase === 1 ? `
      <div class="selector-above-menu-bar">
        <div style="display:flex;align-items:center;gap:12px">
          <span class="selector-above-menu-icon">
            ${icon("users", 18)}
          </span>
          <div>
            <strong style="color:var(--entity-text);font-size:0.86rem">Selector y Matching de Proveedores${currentSum && expSuministros.length > 1 ? ` · ${currentSum.id} (${currentSum.tipo})` : ""}</strong>
            <p style="margin:2px 0 0;font-size:0.74rem;color:var(--entity-muted)">Preselección de 3 homologados, solicitud de cotizaciones vinculantes y matriz comparativa de adjudicación.</p>
          </div>
        </div>
        <button class="admin-primary-button" type="button" data-go="#${activeRole}/selector/${exp.id}" style="white-space:nowrap">
          ${icon("users", 14)} Abrir Selector y Matching
        </button>
      </div>
    ` : "";

    // 5. Contenido de la pestaña activa
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

      // Filtro de Alcance Documental
      const docManagerBarHTML = `
        <div class="doc-manager-bar">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span style="font-size:0.74rem;font-weight:650;color:var(--entity-muted)">Alcance documental:</span>
            <div class="avisos-group-buttons">
              <button class="avisos-group-btn ${docScopeMode === "phase" ? "is-active" : ""}" type="button" data-doc-scope="phase">
                Fase ${activeDossierPhase + 1} (${phaseVisibleDocs.length})
              </button>
              <button class="avisos-group-btn ${docScopeMode === "all" ? "is-active" : ""}" type="button" data-doc-scope="all">
                Todo el Expediente (${allExpDocs.length})
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

      // Tabla "Documentación" sin scroll lateral:
      // Columnas: Nombre | Requerimiento | Origen | Fase | Estado | Acciones (multilínea) | Notas (multilínea y editables)
      const tableRowsHTML = filteredDocs.length ? filteredDocs.map(({ del, phaseIdx, phaseName, slotIdx }) => {
        const reqDateText = del.reqDate || del.date || "12 jun 2026";
        const notesText = del.rejectReason
          ? `⚠️ ${del.rejectReason}`
          : (del.notes || "Añadir nota...");
        const hasRealNote = Boolean(del.rejectReason || (del.notes && del.notes.trim()));
        const visLabel = formatVisibleToLabel(del.visibleTo);

        return `
          <tr>
            <td class="col-doc-name">
              <div class="doc-tbl-name-wrap">
                <strong class="doc-tbl-name">${del.name}</strong>
                <div class="doc-tbl-submeta">
                  ${del.file ? `<span class="doc-tbl-file">${icon("file", 11)} ${del.file}</span>` : `<span class="doc-tbl-nofile">Sin archivo subido</span>`}
                  ${isRoleAdmin ? `<span class="doc-tbl-vis-chip" title="Actores con permiso de lectura">${icon("eye", 11)} ${visLabel}</span>` : ""}
                </div>
              </div>
            </td>
            <td class="col-doc-req"><span class="doc-tbl-date">${reqDateText}</span></td>
            <td class="col-doc-origin"><span class="doc-tbl-origin">${del.owner}</span></td>
            <td class="col-doc-phase"><span class="doc-tbl-phase">${phaseIdx + 1}. ${SHORT_PHASE_NAMES[phaseIdx] || phaseName}</span></td>
            <td class="col-doc-state">${getTableDocStatusBadge(del.state)}</td>
            <td class="col-doc-actions">
              <div class="doc-tbl-actions">
                ${del.file ? `
                  <button class="doc-tbl-action-btn" type="button" data-inspect-doc="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" title="Ver documento">
                    ${icon("eye", 13)} Ver
                  </button>
                  <button class="doc-tbl-action-btn" type="button" data-download="${del.file}" title="Descargar documento">
                    ${icon("download", 13)} Descargar
                  </button>
                ` : (!isDestinatario ? `
                  <button class="doc-tbl-action-btn is-upload" type="button" data-upload-slot-doc="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" title="Subir archivo a esta ranura">
                    ${icon("upload", 13)} Subir
                  </button>
                ` : "")}
                ${isRoleAdmin ? `
                  <button class="doc-tbl-action-btn is-validate" type="button" data-admin-approve="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" title="Validar documento y configurar quién puede verlo">
                    ${icon("check", 13)} Validar
                  </button>
                ` : ""}
              </div>
            </td>
            <td class="col-doc-notes">
              <button type="button" class="doc-tbl-notes-edit-btn ${hasRealNote ? "" : "is-empty"}" data-edit-doc-note="${exp.id}" data-phase="${phaseIdx}" data-slot="${slotIdx}" title="Haz clic para editar la nota">
                <span class="doc-tbl-notes-text">${notesText}</span>
                <span class="doc-tbl-notes-edit-icon">✎</span>
              </button>
            </td>
          </tr>
        `;
      }).join("") : `
        <tr>
          <td colspan="7" style="padding:28px;text-align:center;color:var(--entity-muted)">
            No hay documentos que coincidan con el filtro seleccionado.
          </td>
        </tr>
      `;

      const docTableHTML = `
        <section class="doc-clean-table-card">
          <div class="doc-clean-table-head">
            <h3>Documentación</h3>
            <span>${filteredDocs.length} documento(s) · Haz clic en cualquier nota para editarla</span>
          </div>
          <div class="doc-clean-table-wrap">
            <table class="doc-clean-table">
              <thead>
                <tr>
                  <th class="col-doc-name">Nombre</th>
                  <th class="col-doc-req">Requerimiento</th>
                  <th class="col-doc-origin">Origen</th>
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

      // En Fase 4 (Cierre, activeDossierPhase === 3), el Pasaporte Digital SOFEIN aparece integrado en un bloque colapsable/expandible
      const passportInClosureHTML = activeDossierPhase === (PHASES.length - 1) ? `
        <hr class="dossier-section-divider" />
        <details class="dossier-collapsible-block" data-collapse-key="passportClosure" ${dossierCollapseState.passportClosure !== false ? "open" : ""}>
          <summary class="dossier-collapsible-summary">
            <div class="dossier-collapsible-summary-left">
              <span class="dossier-section-kicker" style="color:var(--entity-accent)">
                ${icon("award", 15)} Pasaporte Digital SOFEIN · Parte del Cierre (Fase 4)
              </span>
            </div>
            <span class="dossier-collapsible-chevron" title="Colapsar / Expandir Pasaporte Digital">
              ${icon("chevronDown", 15)}
            </span>
          </summary>
          <div class="dossier-collapsible-body">
            ${renderPassportSection(exp, isDestinatario)}
          </div>
        </details>
      ` : "";

      tabContent = `${docManagerBarHTML}${docTableHTML}${passportInClosureHTML}`;
    } else if (activeDossierTab === "incidents") {
      // Sección "Registro de incidencias": Incidencias y Cambios del expediente (con bloques colapsables para mayor legibilidad)
      const totalInc = exp.incidencias.length;
      const totalCambios = cambiosLog.length;
      const totalRegistros = totalInc + totalCambios;
      const inMediationInc = exp.incidencias.filter(i => (!i.adendaId && !i.estado.includes("Consolidada") && !i.estado.includes("formalizada")) && (i.estado.includes("mediación") || i.estado.includes("Registrada"))).length;
      const consolidatedInc = exp.incidencias.filter(i => !!i.adendaId || i.estado.includes("Consolidada") || i.estado.includes("formalizada")).length;

      const showIncidentsBlock = incidentStatusFilter !== "changes_only";
      const showChangesBlock = incidentStatusFilter === "all" || incidentStatusFilter === "changes_only";

      let filteredIncidents = exp.incidencias;
      if (incidentStatusFilter === "in_mediation") {
        filteredIncidents = exp.incidencias.filter(i => (!i.adendaId && !i.estado.includes("Consolidada") && !i.estado.includes("formalizada")) && (i.estado.includes("mediación") || i.estado.includes("Registrada")));
      } else if (incidentStatusFilter === "pending_signs") {
        filteredIncidents = exp.incidencias.filter(i => (!i.adendaId && !i.estado.includes("Consolidada") && !i.estado.includes("formalizada")) && i.propuestaMediacion && (!i.firmaCliente || !i.firmaProveedor));
      } else if (incidentStatusFilter === "consolidated") {
        filteredIncidents = exp.incidencias.filter(i => !!i.adendaId || i.estado.includes("Consolidada") || i.estado.includes("formalizada"));
      }

      const changesTableHTML = showChangesBlock ? `
        <details class="dossier-collapsible-block" data-collapse-key="changesLog" ${dossierCollapseState.changesLog !== false ? "open" : ""}>
          <summary class="dossier-collapsible-summary">
            <div class="dossier-collapsible-summary-left">
              <span class="dossier-section-kicker">${icon("activity", 14)} Historial de Cambios y Actividad del Expediente (${cambiosLog.length})</span>
            </div>
            <span class="dossier-collapsible-chevron" title="Colapsar / Expandir historial de cambios">
              ${icon("chevronDown", 15)}
            </span>
          </summary>
          <div class="dossier-collapsible-body">
            <section class="doc-clean-table-card">
              <div class="doc-clean-table-wrap">
                <table class="doc-clean-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Fecha</th>
                      <th>Tipo de Cambio</th>
                      <th>Suministro</th>
                      <th>Descripción / Cambio registrado</th>
                      <th>Autor</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${cambiosLog.map(c => `
                      <tr>
                        <td><span class="dossier-sum-code">${c.id}</span></td>
                        <td><span class="doc-tbl-date">${c.fecha}</span></td>
                        <td><span class="dossier-chip" style="font-size:0.68rem">${c.tipo}</span></td>
                        <td><span class="doc-tbl-phase">${c.suministro || "General"}</span></td>
                        <td>
                          <div class="doc-tbl-name-wrap">
                            <strong class="doc-tbl-name">${c.titulo}</strong>
                            ${c.detalle ? `<span style="font-size:0.72rem;color:var(--entity-muted)">${c.detalle}</span>` : ""}
                          </div>
                        </td>
                        <td><span class="doc-tbl-origin">${c.autor}</span></td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </details>
      ` : "";

      const incidentsCardsHTML = showIncidentsBlock ? (filteredIncidents.length ? filteredIncidents.map((inc) => {
        const isConsolidated = !!inc.adendaId || inc.estado.includes("Consolidada") || inc.estado.includes("formalizada");
        const isPendingSigns = !isConsolidated && inc.propuestaMediacion && (!inc.firmaCliente || !inc.firmaProveedor);
        const cardClass = isConsolidated ? "is-consolidated" : isPendingSigns ? "is-pending-signs" : inc.estado.includes("mediación") ? "is-mediated" : "is-open";

        const statusBadgeHTML = isConsolidated ?
          `<span class="entity-status complete"><i></i>Adenda Consolidada</span>` :
          isPendingSigns ?
          `<span class="entity-status review" style="color:#0F766E"><i></i>Pendiente de firmas</span>` :
          `<span class="entity-status warning"><i></i>${inc.estado}</span>`;

        return `
          <article class="incident-card ${cardClass}" id="card-${inc.id}">
            <div class="incident-card-top">
              <div>
                <div class="incident-card-meta">
                  <span class="incident-chip-id">${inc.id}</span>
                  <span class="dossier-chip" style="font-size:0.68rem">${inc.categoria || "Incidencia de vía"}</span>
                  ${statusBadgeHTML}
                </div>
                <div class="incident-card-title">
                  <h3>${inc.tipo}</h3>
                  <p>Comunicada el ${inc.fecha} por <b>${inc.origen}</b></p>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                ${isRoleAdmin && !isConsolidated ? `
                  <button class="admin-quiet-button" type="button" data-open-mediation-modal="${exp.id}" data-incident-id="${inc.id}" style="font-size:0.75rem">
                    ${icon("shield", 13)} ${inc.propuestaMediacion ? "Editar Mediación" : "Redactar Mediación"}
                  </button>
                ` : ""}
              </div>
            </div>

            <p style="margin:0;font-size:0.83rem;color:var(--entity-text);line-height:1.55">
              ${inc.descripcion || "Registro formal de alteración operativa sobrevenido en la cadena de suministro de vía."}
            </p>

            <div class="incident-impact-grid">
              <div class="incident-impact-item">
                <span class="impact-label">Impacto en Plazo</span>
                <strong class="impact-val" style="color:var(--entity-warning)">
                  ${icon("activity", 14)} ${inc.impactoPlazo || inc.impacto || "A cuantificar"}
                </strong>
              </div>
              <div class="incident-impact-item">
                <span class="impact-label">Impacto Económico</span>
                <strong class="impact-val">
                  ${inc.impactoCoste || "0 € (Sin alteración)"}
                </strong>
              </div>
              <div class="incident-impact-item">
                <span class="impact-label">Evidencia Técnica Adjunta</span>
                <strong class="impact-val" style="font-size:0.78rem;font-weight:500;color:var(--entity-accent)">
                  ${icon("file", 14)} <span style="text-decoration:underline;text-underline-offset:2px;cursor:pointer" title="Previsualizar documento probatorio">${inc.evidenciaDoc || "Informe-Tecnico-Soporte.pdf"}</span>
                </strong>
              </div>
            </div>

            <!-- Desplegable de Mediación SOFEIN y Firmas para reducir densidad visual -->
            <details class="dossier-inner-collapsible" ${!isConsolidated ? "open" : ""}>
              <summary class="dossier-inner-collapsible-summary">
                <span>${icon("shield", 14)} Resolución de Mediación SOFEIN, Cláusula de Silencio Positivo y Firmas</span>
                <span class="dossier-collapsible-chevron">${icon("chevronDown", 14)}</span>
              </summary>
              <div class="dossier-inner-collapsible-body">
                ${inc.propuestaMediacion ? `
                  <div class="incident-mediation-panel">
                    <div class="incident-mediation-head">
                      <h4>${icon("shield", 16)} Propuesta de Mediación & Adenda SOFEIN</h4>
                      <span style="font-size:0.72rem;color:var(--entity-muted)">Notificada el ${inc.fechaNotificacionPropuesta || inc.fecha}</span>
                    </div>
                    <p class="incident-mediation-body">${inc.propuestaMediacion}</p>
                    
                    <div class="incident-terms-grid">
                      <div class="incident-term-box">
                        <span class="term-label">Nuevo Plazo Oficial Pactado</span>
                        <strong class="term-val">${inc.nuevoPlazoAcordado || "Reajustado en propuesta"}</strong>
                      </div>
                      <div class="incident-term-box">
                        <span class="term-label">Ajuste Económico Vinculante</span>
                        <strong class="term-val">${inc.nuevoCosteAcordado || "Sin variación de importe"}</strong>
                      </div>
                      <div class="incident-term-box">
                        <span class="term-label">Garantías Técnicas & Ensayos</span>
                        <strong class="term-val" style="font-size:0.75rem">${inc.resolucionTecnica || "Ensayos EN 13230 verificados"}</strong>
                      </div>
                    </div>

                    <div class="incident-silence-box">
                      <div class="incident-silence-icon">${icon("activity", 18)}</div>
                      <div class="incident-silence-text">
                        <strong>Cláusula de Silencio Positivo (5 Días Hábiles):</strong>
                        ${isConsolidated ?
                          ` Adenda contractual formalizada y consolidada oficialmente el ${inc.adendaFecha || "recientemente"}.` :
                          ` Fecha límite de alegaciones: <b>${inc.fechaLimiteRespuesta || "5 días hábiles"}</b> (${inc.diasHabilesRestantes > 0 ? `quedan <b>${inc.diasHabilesRestantes} días hábiles</b>` : "Plazo legal transcurrido"}). La ausencia de oposición formal expresa opera como <b>aprobación tácita por SILENCIO POSITIVO</b>.`
                        }
                      </div>
                      ${isRoleAdmin && !isConsolidated ? `
                        <button class="admin-quiet-button" type="button" data-open-mediation-modal="${exp.id}" data-incident-id="${inc.id}" style="font-size:0.72rem;white-space:nowrap;margin-left:auto">
                          Editar términos
                        </button>
                      ` : ""}
                    </div>
                  </div>
                ` : `
                  <div style="padding:16px 20px;background:var(--entity-panel-2);border:1px dashed var(--entity-line);border-radius:10px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
                    <div>
                      <strong style="display:block;font-size:0.84rem;color:var(--entity-text);margin-bottom:2px">Propuesta de Mediación SOFEIN Pendiente</strong>
                      <span style="font-size:0.76rem;color:var(--entity-muted)">Esta alteración requiere que el mediador de SOFEIN evalúe la solución técnica y plantee la adenda correspondiente.</span>
                    </div>
                    ${isRoleAdmin ? `
                      <button class="admin-primary-button" type="button" data-open-mediation-modal="${exp.id}" data-incident-id="${inc.id}">
                        ${icon("shield", 14)} Redactar Propuesta de Mediación & Adenda
                      </button>
                    ` : `
                      <span style="font-size:0.75rem;color:var(--entity-accent);font-weight:600">En evaluación técnica por SOFEIN (< 24h)</span>
                    `}
                  </div>
                `}

                <div class="incident-signers-grid">
                  <div class="incident-signer-card">
                    <div class="incident-signer-head">
                      <span class="incident-signer-role">Mediador SOFEIN</span>
                      <span class="incident-signer-status signed">${icon("check", 13)} Emitida</span>
                    </div>
                    <div class="incident-signer-user" title="${inc.firmaSofeinUsuario || "Ángel Plaza (SOFEIN HQ)"}">
                      ${inc.firmaSofeinUsuario || "Ángel Plaza (SOFEIN HQ)"}
                    </div>
                    <div class="incident-signer-date">${inc.firmaSofeinFecha || inc.fecha}</div>
                  </div>

                  <div class="incident-signer-card">
                    <div class="incident-signer-head">
                      <span class="incident-signer-role">Proveedor (Taller)</span>
                      ${inc.firmaProveedor ?
                        `<span class="incident-signer-status signed">${icon("check", 13)} Conforme</span>` :
                        `<span class="incident-signer-status pending">${icon("alert", 13)} Pendiente</span>`
                      }
                    </div>
                    ${inc.firmaProveedor ? `
                      <div class="incident-signer-user" title="${inc.firmaProveedorUsuario || "Representante de Taller"}">
                        ${inc.firmaProveedorUsuario || "Representante de Taller"}
                      </div>
                      <div class="incident-signer-date">${inc.firmaProveedorFecha || "Firmado electrónicamente"}</div>
                    ` : activeRole === "proveedor" ? `
                      <button class="admin-primary-button" type="button" data-sign-incident-party="proveedor" data-incident-id="${inc.id}" data-exp-id="${exp.id}" style="padding:4px 8px;font-size:0.72rem;margin-top:2px">
                        ${icon("check", 12)} Firmar y Aceptar Propuesta
                      </button>
                    ` : `
                      <div class="incident-signer-user" style="color:var(--entity-muted);font-style:italic">Firma de taller requerida</div>
                      <div class="incident-signer-date">Plazo 5 días hábiles</div>
                    `}
                  </div>

                  <div class="incident-signer-card">
                    <div class="incident-signer-head">
                      <span class="incident-signer-role">Cliente (Constructor)</span>
                      ${inc.firmaCliente ?
                        `<span class="incident-signer-status signed">${icon("check", 13)} Conforme</span>` :
                        `<span class="incident-signer-status pending">${icon("alert", 13)} Pendiente</span>`
                      }
                    </div>
                    ${inc.firmaCliente ? `
                      <div class="incident-signer-user" title="${inc.firmaClienteUsuario || "Jefe de Obra (Constructor)"}">
                        ${inc.firmaClienteUsuario || "Jefe de Obra (Constructor)"}
                      </div>
                      <div class="incident-signer-date">${inc.firmaClienteFecha || "Firmado electrónicamente"}</div>
                    ` : activeRole === "cliente" ? `
                      <button class="admin-primary-button" type="button" data-sign-incident-party="cliente" data-incident-id="${inc.id}" data-exp-id="${exp.id}" style="padding:4px 8px;font-size:0.72rem;margin-top:2px">
                        ${icon("check", 12)} Firmar y Aceptar Propuesta
                      </button>
                    ` : `
                      <div class="incident-signer-user" style="color:var(--entity-muted);font-style:italic">Firma de cliente requerida</div>
                      <div class="incident-signer-date">Plazo 5 días hábiles</div>
                    `}
                  </div>
                </div>
              </div>
            </details>

            ${isConsolidated ? `
              <div class="incident-consolidation-bar" style="background:rgba(16, 185, 129, 0.05);border-color:rgba(16, 185, 129, 0.28)">
                <div class="incident-consolidated-seal">
                  ${icon("check", 18)}
                  <span>Adenda Oficial Consolidada <b>${inc.adendaId || "ADENDA-014-01"}</b></span>
                  <span class="dossier-chip" style="font-size:0.68rem;padding:2px 7px;background:rgba(16, 185, 129, 0.15);color:#065F46">Sello Oficial Pasaporte</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
                  <span style="font-size:0.72rem;color:var(--entity-muted);font-family:monospace">${inc.adendaHash ? `Hash: ${inc.adendaHash.slice(0, 18)}...` : "SHA-256 Verificado"}</span>
                  <button class="admin-quiet-button" type="button" data-view-addendum="${exp.id}" data-incident-id="${inc.id}" style="color:#0F766E;font-weight:600">
                    ${icon("file", 14)} Ver Documento de Adenda Oficial Firmada
                  </button>
                </div>
              </div>
            ` : isRoleAdmin ? `
              <div class="incident-consolidation-bar">
                <div class="incident-consolidation-info">
                  ${inc.firmaCliente && inc.firmaProveedor ?
                    `<span style="color:#10B981;font-weight:600;display:flex;align-items:center;gap:6px">${icon("check", 14)} Ambas partes han firmado la propuesta de mediación.</span>` :
                    `<span style="color:var(--entity-muted);display:flex;align-items:center;gap:6px">${icon("activity", 14)} Pendiente de ratificación bilateral. Vencimiento en 5 días hábiles.</span>`
                  }
                </div>
                <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  ${inc.firmaCliente && inc.firmaProveedor ? `
                    <button class="admin-primary-button" type="button" data-consolidate-addendum="${exp.id}" data-incident-id="${inc.id}">
                      ${icon("shield", 14)} Consolidar Adenda Oficial y Actualizar Expediente
                    </button>
                  ` : `
                    <button class="admin-quiet-button" type="button" data-apply-silence-incident="${exp.id}" data-incident-id="${inc.id}" title="Aplica formalmente el Silencio Positivo de 5 días hábiles sin oposición y consolida la adenda" style="color:#C89D54;font-weight:600;border-color:rgba(200, 157, 84, 0.45)">
                      ${icon("activity", 14)} ⚡ Aplicar Silencio Positivo (5 días) y Consolidar
                    </button>
                    ${!inc.firmaCliente ? `
                      <button class="admin-quiet-button" type="button" data-sign-incident-party="cliente" data-incident-id="${inc.id}" data-exp-id="${exp.id}" title="Simular firma por el constructor">
                        Simular Firma Cliente
                      </button>
                    ` : ""}
                  `}
                </div>
              </div>
            ` : `
              <div class="incident-consolidation-bar">
                <div class="incident-consolidation-info">
                  <span style="font-size:0.75rem;color:var(--entity-muted)">
                    ${inc.firmaCliente && inc.firmaProveedor ?
                      "Firmas completadas. Pendiente de consolidación formal por SOFEIN Digital." :
                      "En proceso de validación cruzada. La ausencia de alegaciones en 5 días hábiles consolida la adenda por silencio positivo."
                    }
                  </span>
                </div>
              </div>
            `}
          </article>
        `;
      }).join("") : `
        <div style="padding:32px;background:var(--entity-panel);border:1px solid var(--entity-line);border-radius:12px;text-align:center;color:var(--entity-muted)">
          <p style="margin:0 0 6px;font-size:0.88rem;font-weight:500;color:var(--entity-text)">No hay incidencias que coincidan con el filtro seleccionado.</p>
          <span style="font-size:0.78rem">Toda la operativa del suministro transcurre conforme al pliego y cronograma.</span>
        </div>
      `) : "";

      tabContent = `
        <div class="incident-container">
          <!-- Barra de Filtros y Acciones de Registro de incidencias -->
          <div class="incident-filter-bar">
            <div class="incident-filter-pills">
              <button type="button" class="incident-filter-pill ${incidentStatusFilter === "all" ? "is-active" : ""}" data-incident-filter="all">
                Todo el Registro <span class="pill-count">${totalRegistros}</span>
              </button>
              <button type="button" class="incident-filter-pill ${incidentStatusFilter === "in_mediation" ? "is-active" : ""}" data-incident-filter="in_mediation">
                Incidencias en Mediación <span class="pill-count">${inMediationInc}</span>
              </button>
              <button type="button" class="incident-filter-pill ${incidentStatusFilter === "consolidated" ? "is-active" : ""}" data-incident-filter="consolidated">
                Adendas Consolidadas <span class="pill-count">${consolidatedInc}</span>
              </button>
              <button type="button" class="incident-filter-pill ${incidentStatusFilter === "changes_only" ? "is-active" : ""}" data-incident-filter="changes_only">
                Historial de Cambios <span class="pill-count">${totalCambios}</span>
              </button>
            </div>
            ${activeRole !== "destinatario" ? `
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <button class="admin-quiet-button" type="button" data-open-change-log-modal="${exp.id}">
                  ${icon("plus", 14)} Añadir cambio
                </button>
                <button class="admin-primary-button" type="button" data-open-incident-modal="${exp.id}">
                  ${icon("plus", 14)} Añadir incidencia
                </button>
              </div>
            ` : ""}
          </div>

          <!-- Tarjetas de Incidencias y Adendas -->
          ${incidentsCardsHTML}

          <!-- Historial de Cambios y Actividad del Expediente (Plegable) -->
          ${changesTableHTML}
        </div>
      `;
    } else if (activeDossierTab === "comms") {
      // Pantalla 6: Avisos & Hitos del Expediente con mini sección de Alcance (Fase y Suministro)
      const allRoleNotices = NOTICES.filter(n => n.expId === exp.id && n.roles.includes(activeRole));

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

      // Mini sección de Alcance (idéntica a Alcance Documental: filtra esta fase o todas, y este suministro o todos)
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
                    Todos los suministros (${countAllSums})
                  </button>
                </div>
              </div>
            ` : ""}
          </div>

          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <button class="admin-quiet-button" type="button" data-go="#${activeRole}/avisos" style="font-size:0.74rem">
              ${icon("folder", 13)} Bandeja Central
            </button>
            ${isRoleAdmin ? `
              <button class="admin-primary-button" type="button" data-open-create-notice-modal="${exp.id}" style="font-size:0.74rem">
                ${icon("plus", 13)} Emitir Aviso
              </button>
            ` : ""}
          </div>
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
              <button class="avisos-sum-chip" type="button" data-go="#${activeRole}/expedientes/${n.expId}?tab=overview" title="Suministro: ${sumLabel}">
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

    const expNotices = NOTICES.filter(n => n.expId === exp.id && n.roles.includes(activeRole) && !completedNotices.has(n.id));
    const totalRegistroBadge = exp.incidencias.length;

    return `
      <div class="dossier-builder">
        <div class="dossier-breadcrumb" style="margin-bottom:12px">
          <a href="#${activeRole}/expedientes">← Volver a expedientes</a> / <span>${exp.id}</span>
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

        <!-- 1. Tarjeta de Expediente (Datos resumidos + botón discreto de cerrar/reabrir con confirmación) -->
        <section class="dossier-exp-summary-card">
          <div class="dossier-exp-summary-top">
            <div class="dossier-exp-summary-left">
              <span class="dossier-exp-state-pill">
                <i class="exp-v2-dot ${v.estadoDotClass}"></i>
                <span>${v.estadoLabel}</span>
              </span>
              <span class="exp-v2-code">${exp.id}</span>
              <div class="exp-v2-phase-row phase-tone-${v.currentStep}" title="Fase ${v.currentStep} de ${v.totalPhases}: ${v.shortPhase}">
                <span class="exp-v2-phase-num">${v.currentStep}/${v.totalPhases}</span>
                <span class="exp-v2-phase-name">${v.shortPhase}</span>
                <div class="exp-v2-minichart" aria-label="Fase ${v.currentStep} de ${v.totalPhases}">
                  ${miniBarsHTML}
                </div>
              </div>
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
              <span class="exp-v2-label">Número de suministros</span>
              <strong class="exp-v2-val">${expSuministros.length || v.numSuministros} suministros</strong>
            </div>
            <div class="dossier-exp-summary-item">
              <span class="exp-v2-label">Presupuesto estimado</span>
              <strong class="exp-v2-val">${!isDestinatario ? exp.presupuestoTotal : "[Reservado]"}</strong>
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
                <strong class="exp-v2-delivery-date">${v.proximaEntregaFecha}</strong>
                <span class="exp-v2-delivery-diff is-${v.proximaEntregaTone}">${v.proximaEntregaDiff}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Suministros del expediente (Sección diferenciada con barra horizontal y colapsable) -->
        ${suministrosCardsHTML}

        <hr class="dossier-section-divider" />

        <!-- 3. Stepper de las 4 Fases (con el icono del suministro elegido al lado del título) -->
        <div class="dossier-phases-block">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px">
            <span class="dossier-phases-heading-with-icon">
              <span class="sum-type-icon-badge is-small">${icon(currentSumIconName, 13)}</span>
              <span>Fases${currentSum && expSuministros.length > 1 ? ` del suministro ${currentSum.id} (${currentSum.tipo})` : " del expediente"}</span>
            </span>
            <span style="font-size:0.75rem;color:var(--entity-accent);font-weight:600">
              ${isCurrentContextClosed ? `Cerrado · 4/4 fases completadas` : `Fase activa: ${PHASES[activeEntityPhaseActual].num}. ${PHASES[activeEntityPhaseActual].name}`}
            </span>
          </div>
          <div class="dossier-stepper is-4-phases">
            ${stepperHTML}
          </div>
        </div>

        <!-- 4. Barra de Estado, Fase, Nombre y Botones (Completar, Requerir, Subir) DEBAJO de las fases y ENCIMA de las secciones -->
        ${phaseOpsPanelBelowStepperHTML}

        <!-- 5. Selector y Matching ENCIMA del menú (sólo visible en Fase 2: Proveedores) -->
        ${selectorAboveMenuHTML}

        <hr class="dossier-section-divider" />

        <!-- 6. Menú de Secciones del Expediente -->
        <div class="dossier-tabs">
          <button class="dossier-tab-btn ${activeDossierTab === "deliverables" ? "is-active" : ""}" type="button" data-switch-dossier-tab="deliverables">
            ${icon("file", 16)} Documentación
          </button>
          <button class="dossier-tab-btn ${activeDossierTab === "incidents" ? "is-active" : ""}" type="button" data-switch-dossier-tab="incidents">
            ${icon("alert", 16)} Registro de incidencias
            ${totalRegistroBadge ? `<b class="badge">${totalRegistroBadge}</b>` : ""}
          </button>
          <button class="dossier-tab-btn ${activeDossierTab === "comms" ? "is-active" : ""}" type="button" data-switch-dossier-tab="comms">
            ${icon("inbox", 16)} Avisos & Hitos
            ${expNotices.length ? `<b class="badge">${expNotices.length}</b>` : ""}
          </button>
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
    const roleNotices = NOTICES.filter(n => n.roles.includes(role));
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
              <button class="avisos-sum-chip" type="button" data-go="#${role}/expedientes/${n.expId}?tab=overview" title="Suministro: ${sumLabel}">
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
          <p>Registro unificado de avisos, requerimientos de documentación e incidencias de los expedientes.</p>
        </div>
        ${role === "admin" ? `
          <button class="admin-primary-button" type="button" data-open-create-notice-modal>
            ${icon("plus", 14)} Emitir Aviso / Requerimiento
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

  // Cálculo reactivo de pendientes para las burbujas del menú lateral (pendientes, no activos)
  function getRolePendingCount(role, navId) {
    if (navId === "suministros") {
      // Cuenta suministros con acciones pendientes en ese rol, o suministros activos pendientes de cierre
      // Ejemplo del usuario: 5 suministros pendientes
      const sumList = getSuministrosForRole(role);
      const withActions = sumList.filter(s => (s.accionesPendientes || 0) > 0).length;
      if (withActions > 0) return withActions;
      return sumList.filter(s => s.estado === "activo").length;
    }
    if (navId === "expedientes") {
      let roleExps = EXPEDIENTES;
      if (role === "cliente") {
        roleExps = EXPEDIENTES.filter(e => e.cliente.toLowerCase().includes("infraestructuras"));
      } else if (role === "proveedor") {
        roleExps = EXPEDIENTES.filter(e => e.proveedor.toLowerCase().includes("iberrail") || e.id === "SFN-2026-K9M2" || e.id === "SFN-2026-W4P7");
      }
      const pendingActionCount = roleExps.filter(e => {
        const meta = getExpVisualMeta(e);
        return meta.hasPendingAction;
      }).length;
      return pendingActionCount > 0 ? pendingActionCount : roleExps.filter(e => !e.cerrado).length;
    }
    if (navId === "avisos") {
      return NOTICES.filter(n => n.roles.includes(role) && !discardedNotices.has(n.id)).length;
    }
    if (navId === "cotizaciones") {
      return 1; // 1 RFQ pendiente de responder oferta
    }
    const player = PLAYERS[role];
    const item = player ? player.nav.find(n => n.id === navId) : null;
    return item ? (item.count || 0) : 0;
  }

  function renderSuministrosSection(role) {
    loadSuministrosColPrefs();
    const roleAll = getSuministrosForRole(role);

    // Opciones dinámicas para los filtros selectores
    const uniquePhaseIndices = Array.from(new Set(roleAll.map(s => s.faseActual))).sort((a, b) => a - b);
    const uniqueProveedores = Array.from(new Set(roleAll.map(s => s.proveedor))).sort();
    const uniqueClientes = Array.from(new Set(roleAll.map(s => s.cliente))).sort();
    const uniqueAnos = Array.from(new Set(roleAll.map(s => s.ano))).sort((a, b) => b - a);

    // Filtrar según búsqueda y selectores
    const q = suministrosSearchQuery.trim().toLowerCase();
    const filtered = roleAll.filter(s => {
      // 1. Buscador libre
      if (q) {
        const haystack = `${s.num} ${s.tipo} ${s.unidades} ${s.expId} ${s.proveedor} ${s.cliente} ${s.destino} ${s.ano} ${s.faseNombre} ${s.fechaEntrega}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // 2. Filtro por Fase
      if (suministrosFilters.fase !== "all" && String(s.faseActual) !== suministrosFilters.fase) {
        return false;
      }

      // 3. Filtro por Proveedor
      if (suministrosFilters.proveedor !== "all" && s.proveedor !== suministrosFilters.proveedor) {
        return false;
      }

      // 4. Filtro por Cliente
      if (suministrosFilters.cliente !== "all" && s.cliente !== suministrosFilters.cliente) {
        return false;
      }

      // 5. Filtro por Año
      if (suministrosFilters.ano !== "all" && String(s.ano) !== suministrosFilters.ano) {
        return false;
      }

      // 6. Filtro por Acciones pendientes
      if (suministrosFilters.acciones === "has_pending" && s.accionesPendientes === 0) {
        return false;
      }
      if (suministrosFilters.acciones === "none" && s.accionesPendientes > 0) {
        return false;
      }

      return true;
    });

    const hasActiveFilters =
      suministrosSearchQuery.trim() !== "" ||
      Object.values(suministrosFilters).some(v => v !== "all");

    // Ordenación por columnas
    const mult = suministrosSortDir === "desc" ? -1 : 1;
    const sorted = [...filtered].sort((a, b) => {
      let valA, valB;
      switch (suministrosSortCol) {
        case "suministro":
        case "num":
          return (parseInt(a.num, 10) - parseInt(b.num, 10)) * mult;
        case "tipo":
          return a.tipo.localeCompare(b.tipo, "es") * mult;
        case "unidades":
          valA = a.unidadesNum || 0;
          valB = b.unidadesNum || 0;
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
          return ((a.accionesPendientes || 0) - (b.accionesPendientes || 0)) * mult;
        case "fechaEntrega":
          valA = new Date(a.fechaEntregaIso || a.fechaEntrega).getTime() || 0;
          valB = new Date(b.fechaEntregaIso || b.fechaEntrega).getTime() || 0;
          return (valA - valB) * mult;
        default:
          return 0;
      }
    });

    // Columnas visibles calculadas
    const visibleCols = suministrosColumnOrder.filter(cId => !suministrosHiddenCols.has(cId));
    if (visibleCols.length === 0) {
      visibleCols.push("suministro", "tipo");
    }

    const renderTableHeadHTML = () => `
      <thead>
        <tr>
          ${visibleCols.map(colId => {
            const colDef = ALL_SUMINISTROS_COL_DEFS[colId] || { label: colId };
            const isSorted = suministrosSortCol === colId || (colId === "suministro" && suministrosSortCol === "num");
            const sortIndicator = isSorted
              ? `<span class="suministros-sort-icon is-active">${suministrosSortDir === "asc" ? "↑" : "↓"}</span>`
              : '<span class="suministros-sort-icon">↕</span>';
            return `
              <th class="suministros-th ${isSorted ? 'is-sorted' : ''}"
                  data-sort-suministro="${colId}"
                  data-col-id="${colId}"
                  draggable="true"
                  title="Clic para ordenar · Arrastra para reordenar columna"
                  style="min-width:${colDef.minWidth || '100px'}">
                <div class="suministros-th-inner">
                  <span class="suministros-th-drag-grip" title="Arrastrar para mover">⠿</span>
                  <span class="suministros-th-label">${colDef.label}</span>
                  ${sortIndicator}
                  <button type="button" class="suministros-th-hide-btn" data-hide-col="${colId}" title="Ocultar columna «${colDef.label}»" aria-label="Ocultar columna «${colDef.label}»">
                    ${icon("eyeOff", 12)}
                  </button>
                </div>
              </th>
            `;
          }).join("")}
        </tr>
      </thead>
    `;

    const renderCellHTML = (s, colId) => {
      switch (colId) {
        case "suministro":
          return `
            <td class="suministro-num-cell">
              <span class="suministro-badge-num" title="Suministro ${s.num} del expediente ${s.expId}">${s.num}</span>
            </td>
          `;
        case "tipo":
          return `
            <td class="suministro-tipo-cell">
              <strong title="${s.tipo}">${s.tipo}</strong>
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
              <a href="#${role}/expedientes/${s.expId}" class="suministro-exp-link" title="Abrir expediente ${s.expId}">
                ${icon("folder", 12)}
                <span>${s.expId}</span>
              </a>
            </td>
          `;
        case "proveedor":
          return `
            <td>
              ${s.proveedor === "Por determinar" ? `
                <span class="suministro-prv-tbd">Por determinar</span>
              ` : `
                <span class="suministro-supplier-name" title="${s.proveedor}">${s.proveedor}</span>
              `}
            </td>
          `;
        case "cliente":
          return `
            <td>
              <span class="suministro-client-name" title="${s.cliente}">${s.cliente}</span>
            </td>
          `;
        case "destino":
          return `
            <td>
              <span class="suministro-dest-name" title="${s.destino}">${s.destino}</span>
            </td>
          `;
        case "ano":
          return `
            <td style="text-align:center">
              <span class="suministro-year-badge">${s.ano}</span>
            </td>
          `;
        case "fase":
          return `
            <td>
              <span class="suministro-phase-tag fase-${s.faseActual}">
                ${s.faseNombre || `Fase ${s.faseActual + 1}`}
              </span>
            </td>
          `;
        case "acciones":
          return `
            <td style="text-align:center">
              ${s.accionesPendientes > 0 ? `
                <button class="suministro-actions-chip has-pending" type="button" data-go="#${role}/expedientes/${s.expId}" title="Ver ${s.accionesPendientes} acción(es) pendiente(s) en ${s.expId}">
                  ${icon("alert", 11)} <span>${s.accionesPendientes}</span>
                </button>
              ` : `
                <span class="suministro-actions-chip is-zero">0</span>
              `}
            </td>
          `;
        case "fechaEntrega":
          return `
            <td>
              <div class="suministro-date-cell">
                ${icon("calendar", 12)}
                <span>${s.fechaEntrega}</span>
              </div>
            </td>
          `;
        default:
          return `<td></td>`;
      }
    };

    const renderRowHTML = (s) => `
      <tr class="suministros-tr status-${s.estado || 'activo'}" data-suministro-id="${s.id}">
        ${visibleCols.map(colId => renderCellHTML(s, colId)).join("")}
      </tr>
    `;

    let mainContentHTML = "";

    if (sorted.length === 0) {
      mainContentHTML = `
        <div class="suministros-empty-state">
          ${icon("box", 32)}
          <h3>No se han encontrado suministros</h3>
          <p>${q ? `No hay resultados para "<b>${q}</b>"` : "No hay suministros que cumplan los filtros seleccionados."}</p>
          ${hasActiveFilters ? `
            <button class="admin-primary-button" type="button" data-reset-suministros-filters style="margin-top:12px;font-size:0.78rem">
              ${icon("x", 14)} Limpiar todos los filtros
            </button>
          ` : ""}
        </div>
      `;
    } else {
      mainContentHTML = `
        <div class="suministros-table-wrap">
          <table class="suministros-table">
            ${renderTableHeadHTML()}
            <tbody>
              ${sorted.map(s => renderRowHTML(s)).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    const titles = {
      admin: {
        h1: "Suministros",
        p: "Registro integral de lotes de material ferroviario, unidades, expedientes vinculados y plazos de entrega."
      },
      cliente: {
        h1: "Mis Suministros",
        p: "Seguimiento operativo de los lotes de material contratados para tus obras, unidades y fechas de recepción a pie de vía."
      },
      proveedor: {
        h1: "Suministros Adjudicados",
        p: "Control de producción y expedición de tus lotes homologados, plazos de entrega y estado de fabricación."
      }
    };
    const headerInfo = titles[role] || titles.admin;

    return `
      <div class="admin-view-head">
        <div>
          <h1>${headerInfo.h1}</h1>
          <p>${headerInfo.p}</p>
        </div>
        ${role === "admin" ? `
          <button class="admin-primary-button" type="button" data-go="#admin/nuevo">
            ${icon("plus", 14)} Nuevo Expediente
          </button>
        ` : role === "cliente" ? `
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

          <div class="suministros-filters-wrap">
            <select class="exp-filter-select ${suministrosFilters.fase !== 'all' ? 'is-filtered' : ''}" id="suministroFilterFase" name="filter_fase" data-suministro-filter="fase" aria-label="Fase">
              <option value="all" ${suministrosFilters.fase === "all" ? "selected" : ""}>Fase</option>
              ${uniquePhaseIndices.map(fIdx => {
                const fInfo = PHASES[fIdx] || {};
                const name = SHORT_PHASE_NAMES[fIdx] || fInfo.name || `Fase ${fIdx + 1}`;
                return `<option value="${fIdx}" ${suministrosFilters.fase === String(fIdx) ? "selected" : ""}>Fase ${fIdx + 1}: ${name}</option>`;
              }).join("")}
            </select>

            ${role !== "proveedor" ? `
              <select class="exp-filter-select ${suministrosFilters.proveedor !== 'all' ? 'is-filtered' : ''}" id="suministroFilterProveedor" name="filter_proveedor" data-suministro-filter="proveedor" aria-label="Proveedor">
                <option value="all" ${suministrosFilters.proveedor === "all" ? "selected" : ""}>Proveedor</option>
                ${uniqueProveedores.map(p => `<option value="${p}" ${suministrosFilters.proveedor === p ? "selected" : ""}>${p}</option>`).join("")}
              </select>
            ` : ""}

            ${role !== "cliente" ? `
              <select class="exp-filter-select ${suministrosFilters.cliente !== 'all' ? 'is-filtered' : ''}" id="suministroFilterCliente" name="filter_cliente" data-suministro-filter="cliente" aria-label="Cliente">
                <option value="all" ${suministrosFilters.cliente === "all" ? "selected" : ""}>Cliente</option>
                ${uniqueClientes.map(c => `<option value="${c}" ${suministrosFilters.cliente === c ? "selected" : ""}>${c}</option>`).join("")}
              </select>
            ` : ""}

            <select class="exp-filter-select ${suministrosFilters.ano !== 'all' ? 'is-filtered' : ''}" id="suministroFilterAno" name="filter_ano" data-suministro-filter="ano" aria-label="Año">
              <option value="all" ${suministrosFilters.ano === "all" ? "selected" : ""}>Año</option>
              ${uniqueAnos.map(a => `<option value="${a}" ${suministrosFilters.ano === String(a) ? "selected" : ""}>Año ${a}</option>`).join("")}
            </select>

            <select class="exp-filter-select ${suministrosFilters.acciones !== 'all' ? 'is-filtered' : ''}" id="suministroFilterAcciones" name="filter_acciones" data-suministro-filter="acciones" aria-label="Acciones pendientes">
              <option value="all" ${suministrosFilters.acciones === "all" ? "selected" : ""}>Acciones pendientes</option>
              <option value="has_pending" ${suministrosFilters.acciones === "has_pending" ? "selected" : ""}>Con acciones pendientes</option>
              <option value="none" ${suministrosFilters.acciones === "none" ? "selected" : ""}>Sin acciones pendientes</option>
            </select>

            ${hasActiveFilters ? `
              <button type="button" class="admin-quiet-button" data-reset-suministros-filters style="color:var(--entity-accent);padding:4px 8px;font-size:0.75rem;white-space:nowrap" title="Limpiar todos los filtros">
                ${icon("x", 12)} Limpiar filtros
              </button>
            ` : ""}
          </div>
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

          <span class="suministros-count-badge">
            <b>${sorted.length}</b> de ${roleAll.length} suministros
          </span>
        </div>
      </div>

      ${mainContentHTML}
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

      let contentHTML = "";

      if (directorioViewMode === "table") {
        const prvTableHTML = showProveedores ? `
          <div style="margin-bottom:28px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <h3 style="margin:0;font-size:0.95rem;color:var(--entity-text);display:flex;align-items:center;gap:8px">
                Proveedores homologados
                <span class="dossier-chip" style="font-size:0.7rem">${prvActiveList.length} ${prvActiveList.length === 1 ? 'proveedor' : 'proveedores'}</span>
              </h3>
            </div>
            <div class="b2b-dir-table-wrap">
              <table class="b2b-dir-table">
                <thead>
                  <tr>
                    <th class="is-sortable ${directorioPrvSortCol === 'nombre' ? 'is-sorted' : ''}" data-sort-dir-prv="nombre">
                      <div class="th-sort-wrap">
                        <span>Nombre</span>
                        ${getDirectorioSortIcon('nombre', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioPrvSortCol === 'cif' ? 'is-sorted' : ''}" data-sort-dir-prv="cif">
                      <div class="th-sort-wrap">
                        <span>CIF</span>
                        ${getDirectorioSortIcon('cif', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioPrvSortCol === 'sede' ? 'is-sorted' : ''}" data-sort-dir-prv="sede">
                      <div class="th-sort-wrap">
                        <span>Sede</span>
                        ${getDirectorioSortIcon('sede', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioPrvSortCol === 'suministros' ? 'is-sorted' : ''}" data-sort-dir-prv="suministros">
                      <div class="th-sort-wrap">
                        <span>Suministros</span>
                        ${getDirectorioSortIcon('suministros', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioPrvSortCol === 'activos' ? 'is-sorted' : ''}" data-sort-dir-prv="activos">
                      <div class="th-sort-wrap">
                        <span>Activos</span>
                        ${getDirectorioSortIcon('activos', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioPrvSortCol === 'conformidades' ? 'is-sorted' : ''}" data-sort-dir-prv="conformidades">
                      <div class="th-sort-wrap">
                        <span>Conformidades</span>
                        ${getDirectorioSortIcon('conformidades', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioPrvSortCol === 'contacto' ? 'is-sorted' : ''}" data-sort-dir-prv="contacto">
                      <div class="th-sort-wrap">
                        <span>Contacto</span>
                        ${getDirectorioSortIcon('contacto', directorioPrvSortCol, directorioPrvSortDir)}
                      </div>
                    </th>
                    <th style="text-align:right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${prvActiveList.length === 0 ? `
                    <tr>
                      <td colspan="9" style="text-align:center;padding:32px;color:var(--entity-muted)">
                        No se encontraron proveedores que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ` : prvActiveList.map((p, idx) => `
                    <tr>
                      <td>
                        <div style="display:flex;align-items:center;gap:10px">
                          <span class="admin-client-initials" style="width:26px;height:26px;min-width:26px;min-height:26px;max-width:26px;max-height:26px;flex:0 0 26px;flex-shrink:0;border-radius:50%;font-size:0.68rem;aspect-ratio:1">${p.nombre.slice(0, 2).toUpperCase()}</span>
                          <strong style="font-size:0.78rem">${p.nombre}</strong>
                        </div>
                      </td>
                      <td><span class="entity-code" style="font-size:0.75rem">${p.cif}</span></td>
                      <td><span style="color:var(--entity-muted);font-size:0.78rem">${p.sede}</span></td>
                      <td>${renderSuministrosTags(p.suministros || [p.materiales])}</td>
                      <td>${renderProveedorActivosCell(p, idx, prvActiveList.length)}</td>
                      <td>${renderConformidadesTags(p.conformidades || p.homologaciones)}</td>
                      <td class="dir-cell-contact">
                        <div style="display:flex;flex-direction:column;gap:3px;min-width:0">
                          ${renderEmailCell(p.email || p.contacto)}
                          ${p.telefono ? renderTelefonoCell(p.telefono) : ''}
                        </div>
                      </td>
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
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <h3 style="margin:0;font-size:0.95rem;color:var(--entity-text);display:flex;align-items:gap:8px">
                Clientes (Constructores de vía)
                <span class="dossier-chip" style="font-size:0.7rem">${cliActiveList.length} ${cliActiveList.length === 1 ? 'cliente' : 'clientes'}</span>
              </h3>
            </div>
            <div class="b2b-dir-table-wrap">
              <table class="b2b-dir-table">
                <thead>
                  <tr>
                    <th class="is-sortable ${directorioCliSortCol === 'nombre' ? 'is-sorted' : ''}" data-sort-dir-cli="nombre">
                      <div class="th-sort-wrap">
                        <span>Nombre</span>
                        ${getDirectorioSortIcon('nombre', directorioCliSortCol, directorioCliSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioCliSortCol === 'cif' ? 'is-sorted' : ''}" data-sort-dir-cli="cif">
                      <div class="th-sort-wrap">
                        <span>CIF</span>
                        ${getDirectorioSortIcon('cif', directorioCliSortCol, directorioCliSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioCliSortCol === 'sede' ? 'is-sorted' : ''}" data-sort-dir-cli="sede">
                      <div class="th-sort-wrap">
                        <span>Sede</span>
                        ${getDirectorioSortIcon('sede', directorioCliSortCol, directorioCliSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioCliSortCol === 'actividad' ? 'is-sorted' : ''}" data-sort-dir-cli="actividad">
                      <div class="th-sort-wrap">
                        <span>Actividad</span>
                        ${getDirectorioSortIcon('actividad', directorioCliSortCol, directorioCliSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioCliSortCol === 'activos' ? 'is-sorted' : ''}" data-sort-dir-cli="activos">
                      <div class="th-sort-wrap">
                        <span>Activos</span>
                        ${getDirectorioSortIcon('activos', directorioCliSortCol, directorioCliSortDir)}
                      </div>
                    </th>
                    <th class="is-sortable ${directorioCliSortCol === 'contacto' ? 'is-sorted' : ''}" data-sort-dir-cli="contacto">
                      <div class="th-sort-wrap">
                        <span>Contacto</span>
                        ${getDirectorioSortIcon('contacto', directorioCliSortCol, directorioCliSortDir)}
                      </div>
                    </th>
                    <th style="text-align:right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${cliActiveList.length === 0 ? `
                    <tr>
                      <td colspan="8" style="text-align:center;padding:32px;color:var(--entity-muted)">
                        No se encontraron clientes que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ` : cliActiveList.map((c, idx) => `
                    <tr>
                      <td>
                        <div style="display:flex;align-items:center;gap:10px">
                          <span class="admin-client-initials" style="width:26px;height:26px;min-width:26px;min-height:26px;max-width:26px;max-height:26px;flex:0 0 26px;flex-shrink:0;border-radius:50%;font-size:0.68rem;aspect-ratio:1;background:#1d426b">${c.nombre.slice(0, 2).toUpperCase()}</span>
                          <strong style="font-size:0.78rem">${c.nombre}</strong>
                        </div>
                      </td>
                      <td><span class="entity-code" style="font-size:0.75rem">${c.cif}</span></td>
                      <td><span style="color:var(--entity-muted);font-size:0.78rem">${c.sede}</span></td>
                      <td><span style="font-size:0.75rem;color:var(--entity-muted)">${c.actividad}</span></td>
                      <td>${renderClienteActivosCell(c, idx, cliActiveList.length)}</td>
                      <td class="dir-cell-contact">
                        <div style="display:flex;flex-direction:column;gap:3px;min-width:0">
                          ${renderEmailCell(c.email || c.contacto)}
                          ${c.telefono ? renderTelefonoCell(c.telefono) : ''}
                        </div>
                      </td>
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
          ${showProveedores ? `
            <div style="margin-bottom:28px">
              <h3 style="margin:0 0 14px;font-size:0.95rem;color:var(--entity-text);display:flex;align-items:center;gap:8px">
                Proveedores homologados
                <span class="dossier-chip" style="font-size:0.7rem">${prvActiveList.length} proveedores</span>
              </h3>
              <div class="admin-client-grid">${prvCards || '<p style="color:var(--entity-muted);font-size:0.8rem">No hay proveedores que coincidan.</p>'}</div>
            </div>
          ` : ''}

          ${showClientes ? `
            <div>
              <h3 style="margin:0 0 14px;font-size:0.95rem;color:var(--entity-text);display:flex;align-items:center;gap:8px">
                Clientes (Constructores de vía)
                <span class="dossier-chip" style="font-size:0.7rem">${cliActiveList.length} clientes</span>
              </h3>
              <div class="admin-client-grid" style="grid-template-columns:repeat(2,1fr)">${cliCards || '<p style="color:var(--entity-muted);font-size:0.8rem">No hay clientes que coincidan.</p>'}</div>
            </div>
          ` : ''}
        `;
      }

      const currentTotalCount = (directorioTypeFilter === "proveedores") 
        ? prvActiveList.length 
        : (directorioTypeFilter === "clientes") 
          ? cliActiveList.length 
          : (prvActiveList.length + cliActiveList.length);

      return `
        <!-- Fila superior: Título 'Listado' y acciones principales -->
        <div class="admin-view-head" style="margin-bottom:18px">
          <div class="b2b-dir-header-title">
            <h1 style="margin:0;font-size:1.75rem;font-weight:600;display:flex;align-items:center;gap:10px;letter-spacing:-0.03em">
              Listado
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

        <!-- Fila inferior de filtros y buscador: situada cerca de la tabla -->
        <div class="b2b-dir-filter-bar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px">
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

          <div class="b2b-dir-search-wrap" style="max-width:320px;min-width:220px">
            <span class="dir-search-icon" style="left:10px">${icon("search", 14)}</span>
            <input 
              type="search" 
              id="directorioSearchInput" 
              class="b2b-dir-search-input" 
              placeholder="Buscar por nombre, CIF, sede, suministro..." 
              value="${directorioSearchQuery.replace(/"/g, '&quot;')}"
              autocomplete="off"
              style="height:34px;font-size:0.78rem;padding-left:32px"
            />
            ${directorioSearchQuery ? `
              <button type="button" id="clearDirectorioSearchBtn" class="dir-search-clear" title="Limpiar búsqueda">
                ${icon("x", 12)}
              </button>
            ` : ''}
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
      const clientAll = EXPEDIENTES.filter(e => e.cliente.includes("Infraestructuras") || e.cliente.includes("Adif") || e.cliente.includes("Metro") || e.cliente.includes("Ferrocarrils"));
      return renderExpedientesBandejaVisual("cliente", clientAll);
    }
    if (section === "suministros") {
      return renderSuministrosSection("cliente");
    }

    if (section === "avisos" || section === "inbox") {
      return renderAvisosSection("cliente");
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

      const prvAll = EXPEDIENTES.filter(e => e.proveedor.includes("IberRail") || e.id === "SFN-2026-K9M2" || e.id === "SFN-2026-W4P7");
      return renderExpedientesBandejaVisual("proveedor", prvAll);
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
              <h3 style="margin:4px 0;font-size:1.15rem;color:var(--entity-text)">Carril laminado 54E1 Grado R260 · SFN-2026-K9M2</h3>
              <p style="margin:0;color:var(--entity-muted);font-size:0.8rem">Volumen solicitado: 1.200 toneladas · Plazo objetivo cliente: 60 días</p>
            </div>
            <div style="display:flex;gap:10px">
              <button class="admin-primary-button" type="button" data-go="#proveedor/selector/SFN-2026-K9M2">
                ${icon("file", 14)} Abrir Cotización & Responder Oferta
              </button>
            </div>
          </div>
        </article>
      `;
    }
    if (section === "suministros") {
      return renderSuministrosSection("proveedor");
    }

    if (section === "avisos" || section === "inbox") {
      return renderAvisosSection("proveedor");
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
    return renderDossierBuilder("SFN-2026-H6T4");
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
        desc: "Preselección de 3 homologados, matriz comparativa y adjudicación vinculante"
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
                      Consolidada el ${inc.adendaFecha} · Desvío: <b>${inc.nuevoCosteAcordado || inc.impactoCoste || "0 €"}</b> · ${inc.silencioPositivoAplicado ? "Aprobada por silencio positivo (5 días hábiles sin oposición)." : "Firmada por las partes."}
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
                    <strong style="font-size:0.78rem">Bloque 5: Adenda Oficial Consolidada (ADENDA-014-01)</strong>
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
      if (activeRole === "admin") {
        setTimeout(() => {
          openMediationModal(activeParam || "SFN-2026-H6T4", incId);
        }, 70);
      } else {
        setTimeout(() => {
          const targetCard = document.querySelector(`[data-incident-id="${incId}"]`) || document.querySelector(".incident-card");
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
            targetCard.style.outline = "2px solid var(--entity-accent)";
            setTimeout(() => { targetCard.style.outline = ""; }, 2500);
          }
        }, 120);
      }
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

      // 5. Bandeja de Avisos / Inbox
      if (activeSection === "avisos" || activeSection === "inbox") {
        return `#${targetRole}/avisos`;
      }

      // 6. Perfil corporativo
      if (activeSection === "perfil") {
        return (targetRole === "cliente" || targetRole === "proveedor") ? `#${targetRole}/perfil` : `#${targetRole}/expedientes`;
      }

      // 7. Visión global (exclusiva de admin)
      if (activeSection === "overview") {
        return targetRole === "admin" ? `#admin/overview` : `#${targetRole}/expedientes`;
      }

      // 8. Directorio (exclusivo de admin)
      if (activeSection === "directorio") {
        return targetRole === "admin" ? `#admin/directorio` : `#${targetRole}/expedientes`;
      }

      // 9. Cotizaciones (exclusivo de proveedor)
      if (activeSection === "cotizaciones") {
        return targetRole === "proveedor" ? `#proveedor/cotizaciones` : `#${targetRole}/expedientes`;
      }

      // 10. Listado general de expedientes
      if (activeSection === "expedientes") {
        return `#${targetRole}/expedientes`;
      }

      // Fallback predeterminado del rol destino
      const defaultNav = (PLAYERS[targetRole] && PLAYERS[targetRole].defaultNav) || "expedientes";
      return `#${targetRole}/${defaultNav}`;
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

    // Inspector / Visor de Auditoría Documental (Pantalla 4)
    document.querySelectorAll("[data-inspect-doc]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.inspectDoc;
        const phaseIdx = Number(btn.dataset.phase);
        const slotIdx = Number(btn.dataset.slot);
        openInspectDeliverableModal(expId, phaseIdx, slotIdx);
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
        const id = btn.dataset.validateExp;
        const targetExp = getActiveExpediente(id);
        if (targetExp) {
          targetExp.estado = "review";
          targetExp.faseActual = 1;
          targetExp.desviacionDias = "0 días (En plazo)";
          targetExp.plazoRealEstimado = "45 días";
          targetExp.plazoPactado = "45 días";
          if (targetExp.deliverables[0] && targetExp.deliverables[0][0]) {
            targetExp.deliverables[0][0].state = "complete";
          }
          if (!targetExp.deliverables[1] || !targetExp.deliverables[1].length) {
            targetExp.deliverables[1] = [
              { name: "Preselección de 3 Proveedores Homologados", owner: "SOFEIN", state: "review", format: "PDF", file: null, date: "Listo para lanzar" }
            ];
          }
          showToast(`✓ Expediente ${id} validado por SOFEIN. Avanza a Fase 1: Preselección`);
          renderApp();
        }
      });
    });

    // Constructor de Expediente: Añadir Fila de Suministro Dinámico
    const mainFechaInput = document.querySelector('#createExpedienteFullForm input[name="fechaObjetivo"]');

    function bindSuministroFileInputs(root = document) {
      root.querySelectorAll(".suministro-item").forEach(row => {
        const trigger = row.querySelector(".suministro-file-trigger");
        const input = row.querySelector(".suministro-file-input");
        const label = row.querySelector(".suministro-file-label");
        if (trigger && input && !trigger.dataset.bound) {
          trigger.dataset.bound = "1";
          trigger.addEventListener("click", () => input.click());
          input.addEventListener("change", e => {
            const files = e.target.files;
            if (files && files.length > 0 && label) {
              label.textContent = files.length === 1 ? files[0].name : `${files.length} archivos`;
            }
          });
        }

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
      addSuministroBtn.addEventListener("click", () => {
        suministroRowCount++;
        const defaultDate = mainFechaInput ? mainFechaInput.value : "2026-11-30";
        const item = document.createElement("div");
        item.className = "suministro-item";
        item.dataset.suministroIndex = suministroRowCount;
        item.innerHTML = `
          <div class="suministro-item-top">
            <span class="suministro-item-title">${icon("route", 14)} Lote de Suministro ${suministroRowCount}</span>
            <button type="button" class="suministro-remove-btn" data-remove-suministro>${icon("x", 12)} Eliminar lote</button>
          </div>
          <div class="create-exp-grid-3" style="margin-bottom:10px">
            <label class="create-exp-label">
              Tipo de Suministro
              <select name="suministro_material_${suministroRowCount}" class="create-exp-select" required>
                <option value="Traviesas de madera">Traviesas de madera</option>
                <option value="Traviesas de hormigón">Traviesas de hormigón</option>
                <option value="Carril ferroviario">Carril ferroviario</option>
                <option value="Sujeciones y fijaciones">Sujeciones y fijaciones</option>
                <option value="Placas de asiento">Placas de asiento</option>
                <option value="Aparatos de vía">Aparatos de vía</option>
                <option value="Balasto">Balasto</option>
                <option value="Otro suministro">Otro suministro</option>
              </select>
            </label>
            <label class="create-exp-label">
              Volumen / Unidades
              <input name="suministro_unidades_${suministroRowCount}" class="create-exp-input" required placeholder="Ej: 5.000 unidades o 12 km" />
            </label>
            <label class="create-exp-label">
              Especificaciones
              <input name="suministro_especificaciones_${suministroRowCount}" class="create-exp-input" placeholder="Ej: Madera de roble tratada, 2,60 m" />
            </label>
          </div>
          <div class="create-exp-grid-3">
            <label class="create-exp-label">
              Presupuesto Estimado (Opcional)
              <input name="suministro_presupuesto_${suministroRowCount}" class="create-exp-input" placeholder="Ej: 120.000 €" />
            </label>
            <label class="create-exp-label">
              Fecha Objetivo (Opcional)
              <input type="date" name="suministro_fecha_${suministroRowCount}" class="create-exp-input suministro-fecha-input" value="${defaultDate}" data-custom-date="0" style="color:#9ca3af" />
            </label>
            <label class="create-exp-label">
              Adjunto (Opcional)
              <div style="display:flex;align-items:center;gap:8px">
                <input type="file" class="suministro-file-input" style="display:none" accept=".pdf,.dwg,.xlsx,.docx" multiple />
                <button type="button" class="slot-upload-btn suministro-file-trigger" style="height:38px;width:100%;justify-content:center">
                  ${icon("upload", 14)} <span class="suministro-file-label">Subir docs</span>
                </button>
              </div>
            </label>
          </div>
        `;
        suministrosWrap.appendChild(item);
        bindSuministroFileInputs(item);
        item.querySelector("[data-remove-suministro]")?.addEventListener("click", () => {
          item.remove();
        });
      });
    }

    // Constructor de Expediente: Dropzone de Pliegos Técnicos
    const dropzone = document.getElementById("createExpDropzone");
    const fileInput = document.getElementById("createExpFileInput");
    const previewWrap = document.getElementById("fileUploadedPreview");
    const triggerBtn = document.getElementById("triggerFileSelectBtn");

    function displaySelectedFile(fileName) {
      stagedPliegoFile = fileName;
      if (previewWrap) {
        previewWrap.style.display = "block";
        previewWrap.innerHTML = `
          <div class="file-preview-card">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="display:grid;place-items:center;width:34px;height:34px;border-radius:6px;background:rgba(82,223,127,0.12);color:var(--entity-accent)">
                ${icon("file", 18)}
              </span>
              <div>
                <strong style="color:var(--entity-text);font-size:0.84rem">${fileName}</strong>
                <p style="margin:2px 0 0;font-size:0.72rem;color:var(--entity-muted)">2.4 MB · Indexado para ranura de Fase 0 (Alcance y Requisitos)</p>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span class="dossier-chip" style="color:var(--entity-accent)">✓ Listo</span>
              <button type="button" id="removePliegoBtn" class="suministro-remove-btn">${icon("x", 12)} Quitar</button>
            </div>
          </div>
        `;
        document.getElementById("removePliegoBtn")?.addEventListener("click", () => {
          stagedPliegoFile = null;
          previewWrap.style.display = "none";
          previewWrap.innerHTML = "";
          if (fileInput) fileInput.value = "";
        });
      }
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());
      triggerBtn?.addEventListener("click", e => {
        e.stopPropagation();
        fileInput.click();
      });

      fileInput.addEventListener("change", e => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          displaySelectedFile(file.name);
        }
      });

      dropzone.addEventListener("dragover", e => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
      });
      dropzone.addEventListener("drop", e => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        displaySelectedFile(file ? file.name : "PPTP-Suministro-Ferroviario-2026.pdf");
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
        const fechaObj = form.get("fechaObjetivo");
        const presupuesto = (form.get("presupuestoTotal") || "").trim() || "En licitación";

        // Recopilar lotes de suministros
        const items = document.querySelectorAll("#suministrosContainer .suministro-item");
        const suministrosList = [];
        items.forEach(it => {
          const mat = it.querySelector("select")?.value || "Traviesas de madera";
          const units = it.querySelector('input[name^="suministro_unidades"]')?.value.trim() || "Cantidad según pliego";
          const espec = it.querySelector('input[name^="suministro_especificaciones"]')?.value.trim() || "Especificación estándar";
          const pres = it.querySelector('input[name^="suministro_presupuesto"]')?.value.trim() || "";
          const fechaSum = it.querySelector('input[name^="suministro_fecha"]')?.value || "";
          const fileSum = it.querySelector('.suministro-file-input')?.files?.[0]?.name || null;
          suministrosList.push({
            material: mat,
            unidades: units,
            tramo: espec,
            especificaciones: espec,
            presupuesto: pres,
            fechaObjetivo: fechaSum,
            adjunto: fileSum
          });
        });

        const primaryMat = suministrosList[0] ? suministrosList[0].material : "Material Ferroviario";
        const unitsSummary = suministrosList.map(s => `${s.unidades} (${s.especificaciones})`).join(" + ");
        const fileName = stagedPliegoFile || "Pliego-Prescripciones-Tecnicas-PPTP.pdf";

        // Generar ID correlativo
        const existingNums = EXPEDIENTES.map(exp => {
          const m = exp.id.match(/\d+$/);
          return m ? parseInt(m[0], 10) : 0;
        });
        const nextNum = Math.max(...existingNums, 22) + 1;
        const newYear = fechaObj ? new Date(fechaObj).getFullYear() : 2026;
        const newId = generateExpedienteId(newYear);

        const isRoleAdmin = activeRole === "admin";

        const newExpediente = {
          id: newId,
          tituloGenerico: titulo || `Suministro ferroviario — ${dest.split("(")[0].trim()}`,
          numSuministros: suministrosList.length || 1,
          proximaEntregaFecha: fechaObj ? new Date(fechaObj).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }) : "10 nov 2026",
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
          faseActual: isRoleAdmin ? 1 : 0, // Admin valida directo a Fase 1 (Apuntes 06); Cliente requiere validación previa
          plazoPactado: isRoleAdmin ? "45 días" : "Pendiente de cotización",
          plazoRealEstimado: isRoleAdmin ? "45 días" : "Pendiente de validación",
          desviacionDias: isRoleAdmin ? "0 días (En plazo)" : "Pendiente de validación SOFEIN",
          estado: isRoleAdmin ? "review" : "pending_validation",
          incidencias: [],
          deliverables: {
            0: [
              {
                name: "Pliego de Prescripciones Técnicas Particulares (PPTP)",
                owner: "Cliente",
                state: isRoleAdmin ? "complete" : "review",
                format: fileName.toLowerCase().endsWith(".dwg") ? "DWG / PDF" : "PDF",
                file: fileName,
                date: "Hoy, recién indexado"
              }
            ],
            1: isRoleAdmin ? [
              { name: "Preselección de 3 Proveedores Homologados", owner: "SOFEIN", state: "review", format: "PDF", file: null, date: "Listo para lanzar" }
            ] : [],
            2: [], 3: [], 4: [], 5: [], 6: []
          }
        };

        EXPEDIENTES.unshift(newExpediente);

        suministrosList.forEach((s) => {
          const nextIndex = SUMINISTROS.length + 1;
          const numStr = String(nextIndex).padStart(2, "0");
          const effectiveDate = s.fechaObjetivo || fechaObj;
          SUMINISTROS.unshift({
            id: `SUM-${numStr}`,
            num: numStr,
            tipo: s.material,
            unidades: s.unidades,
            unidadesNum: parseInt(s.unidades.replace(/\D/g, ""), 10) || 1,
            especificaciones: s.especificaciones,
            presupuesto: s.presupuesto || null,
            adjunto: s.adjunto || null,
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
          });
        });

        if (isRoleAdmin) {
          NOTICES.unshift({
            id: `AV-0${NOTICES.length + 1}`,
            expId: newId,
            categoria: "Nuevo Expediente",
            tagClass: "complete",
            titulo: `Expediente ${newId} creado y validado`,
            descripcion: `SOFEIN ha emitido y validado el expediente para "${titulo}". Fase 1 activada para preselección de 3 talleres homologados.`,
            fecha: "Hoy, ahora",
            roles: ["admin", "cliente"],
            accion: "Ver Expediente",
            enlace: `#admin/expedientes/${newId}`
          });
          showToast(`✓ Expediente ${newId} creado y validado. Listo para matching.`);
          location.hash = `#admin/expedientes/${newId}`;
        } else {
          NOTICES.unshift({
            id: `AV-0${NOTICES.length + 1}`,
            expId: newId,
            categoria: "Validación de Expediente",
            tagClass: "warning",
            titulo: `Solicitud de nuevo expediente (${newId})`,
            descripcion: `Infraestructuras del Norte ha configurado una solicitud de suministro para "${titulo}". Requiere verificación y validación técnica por SOFEIN.`,
            fecha: "Hoy, ahora",
            roles: ["admin", "cliente"],
            accion: "Validar Expediente",
            enlace: `#admin/expedientes/${newId}`
          });
          showToast(`✓ Solicitud ${newId} enviada a SOFEIN para validación técnica.`);
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

    // Abrir modal de nueva incidencia / modificación
    document.querySelectorAll("[data-open-incident-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.openIncidentModal;
        openIncidentModal(expId);
      });
    });

    // Abrir modal de mediación SOFEIN (redactar o editar propuesta)
    document.querySelectorAll("[data-open-mediation-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.openMediationModal;
        const incId = btn.dataset.incidentId;
        openMediationModal(expId, incId);
      });
    });

    // Ratificación y firma electrónica de propuesta (Cliente o Proveedor)
    document.querySelectorAll("[data-sign-incident-party]").forEach(btn => {
      btn.addEventListener("click", () => {
        const signerRole = btn.dataset.signIncidentParty;
        const expId = btn.dataset.expId;
        const incId = btn.dataset.incidentId;
        openSignIncidentModal(expId, incId, signerRole);
      });
    });

    // Aplicar Silencio Positivo (5 días transcurridos) y Consolidar
    document.querySelectorAll("[data-apply-silence-incident]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.applySilenceIncident;
        const incId = btn.dataset.incidentId;
        applySilencePositive(expId, incId);
      });
    });

    // Consolidar Adenda Contractual Oficial (SOFEIN Admin)
    document.querySelectorAll("[data-consolidate-addendum]").forEach(btn => {
      btn.addEventListener("click", () => {
        const expId = btn.dataset.consolidateAddendum;
        const incId = btn.dataset.incidentId;
        consolidateAddendum(expId, incId);
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

    // Selectores de Filtro en Suministros (Fase, Proveedor, Cliente, Año, Acciones)
    document.querySelectorAll("[data-suministro-filter]").forEach(sel => {
      sel.addEventListener("change", () => {
        const key = sel.dataset.suministroFilter;
        if (key && suministrosFilters.hasOwnProperty(key)) {
          suministrosFilters[key] = sel.value;
          renderApp();
        }
      });
    });

    // Botones de restablecer/limpiar filtros en Suministros
    document.querySelectorAll("[data-reset-suministros-filters]").forEach(btn => {
      btn.addEventListener("click", () => {
        suministrosFilters = {
          fase: "all",
          proveedor: "all",
          cliente: "all",
          ano: "all",
          acciones: "all"
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

    // Restablecer Columnas a Valores por Defecto
    const btnResetCols = document.getElementById("btnResetColsConfig");
    if (btnResetCols) {
      btnResetCols.addEventListener("click", (e) => {
        e.stopPropagation();
        suministrosColumnOrder = [...DEFAULT_SUMINISTROS_COL_ORDER];
        suministrosHiddenCols.clear();
        saveSuministrosColPrefs();
        showToast("Columnas restablecidas al orden y visibilidad por defecto");
        renderApp();
      });
    }

    // Drag and Drop & Ordenación en Cabeceras de Suministros
    let draggedColId = null;
    let isDraggingColumn = false;

    document.querySelectorAll(".suministros-th[draggable]").forEach(th => {
      th.addEventListener("dragstart", (e) => {
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

      // Clic para ordenar columna (solo si no se estaba arrastrando)
      th.addEventListener("click", (e) => {
        if (isDraggingColumn) return;
        if (e.target.closest(".suministros-th-drag-grip") || e.target.closest("[data-hide-col]")) return;
        const col = th.dataset.sortSuministro;
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

    // Filtros de Tipo en Directorio (Todos, Proveedores, Clientes)
    document.querySelectorAll("[data-dir-type]").forEach(btn => {
      btn.addEventListener("click", () => {
        directorioTypeFilter = btn.dataset.dirType;
        renderApp();
      });
    });

    // Clic en Cabeceras para ordenar Proveedores
    document.querySelectorAll("[data-sort-dir-prv]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.sortDirPrv;
        if (directorioPrvSortCol === col) {
          directorioPrvSortDir = directorioPrvSortDir === "asc" ? "desc" : "asc";
        } else {
          directorioPrvSortCol = col;
          directorioPrvSortDir = "asc";
        }
        renderApp();
      });
    });

    // Clic en Cabeceras para ordenar Clientes
    document.querySelectorAll("[data-sort-dir-cli]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.sortDirCli;
        if (directorioCliSortCol === col) {
          directorioCliSortDir = directorioCliSortDir === "asc" ? "desc" : "asc";
        } else {
          directorioCliSortCol = col;
          directorioCliSortDir = "asc";
        }
        renderApp();
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

    /* ---------- Eventos del Selector y Matching de Proveedores (Pantalla 2) ---------- */
    // 1. Navegación directa entre sub-fases del selector (stepper)
    document.querySelectorAll("[data-switch-selector-step]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetStep = btn.dataset.switchSelectorStep;
        const expId = btn.dataset.expId;
        const exp = getActiveExpediente(expId);
        const matching = ensureExpedienteMatching(exp);
        matching.faseSelector = targetStep;
        renderApp();
      });
    });

    // 2. Toggle de preselección por SOFEIN Admin (Paso 1)
    document.querySelectorAll("[data-preselect-prv]").forEach(chk => {
      chk.addEventListener("change", e => {
        const prvId = chk.dataset.preselectPrv;
        const exp = getActiveExpediente(chk.dataset.expId);
        const matching = ensureExpedienteMatching(exp);
        const set = new Set(matching.proveedoresPreseleccionadosPorAdmin);
        if (e.target.checked) {
          set.add(prvId);
        } else {
          set.delete(prvId);
        }
        matching.proveedoresPreseleccionadosPorAdmin = Array.from(set);
        renderApp();
      });
    });

    // 3. SOFEIN Admin aprueba preselección (Paso 1 -> Paso 2)
    document.getElementById("approvePreselectionBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      if (matching.proveedoresPreseleccionadosPorAdmin.length < 3) {
        showToast("⚠️ Debes preseleccionar al menos 3 proveedores para cumplir la normativa ferroviaria");
        return;
      }
      matching.faseSelector = "seleccion_cliente";
      // Inicializar selección cliente si estaba vacía
      if (!matching.proveedoresSeleccionadosPorCliente.length) {
        matching.proveedoresSeleccionadosPorCliente = [...matching.proveedoresPreseleccionadosPorAdmin.slice(0, 3)];
      }
      NOTICES.unshift({
        id: `AV-0${NOTICES.length + 1}`,
        expId: exp.id,
        categoria: "Matching / Cotizaciones",
        tagClass: "complete",
        titulo: `Preselección de proveedores completada (${exp.id})`,
        descripcion: `SOFEIN ha aprobado la preselección de ${matching.proveedoresPreseleccionadosPorAdmin.length} talleres homologados. El constructor ya puede seleccionar a quién solicitar oferta.`,
        fecha: "Hoy, ahora",
        roles: ["admin", "cliente"],
        accion: "Ver Preselección",
        enlace: `#cliente/selector/${exp.id}`
      });
      showToast(`✓ Preselección aprobada. El constructor ha recibido aviso para seleccionar talleres.`);
      renderApp();
    });

    // 4. Toggle de selección por el Cliente (Paso 2)
    document.querySelectorAll("[data-client-select-prv]").forEach(chk => {
      chk.addEventListener("change", e => {
        const prvId = chk.dataset.clientSelectPrv;
        const exp = getActiveExpediente(chk.dataset.expId);
        const matching = ensureExpedienteMatching(exp);
        const set = new Set(matching.proveedoresSeleccionadosPorCliente);
        if (e.target.checked) {
          set.add(prvId);
        } else {
          set.delete(prvId);
        }
        matching.proveedoresSeleccionadosPorCliente = Array.from(set);
        renderApp();
      });
    });

    // 5. Cliente solicita cotizaciones formales (Paso 2 -> Paso 3)
    document.getElementById("requestClientQuotesBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      if (matching.proveedoresSeleccionadosPorCliente.length === 0) {
        showToast("⚠️ Selecciona al menos un taller para solicitar cotización");
        return;
      }
      matching.faseSelector = "peticion_cotizaciones";
      // Inicializar estado de cotizaciones
      matching.proveedoresSeleccionadosPorCliente.forEach(pId => {
        if (!matching.cotizaciones[pId]) {
          const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === pId);
          matching.cotizaciones[pId] = {
            proveedorId: pId,
            nombre: prv ? prv.nombre : pId,
            cif: prv ? prv.cif : "",
            sede: prv ? prv.sede : "",
            estado: "pendiente"
          };
        }
      });
      NOTICES.unshift({
        id: `AV-0${NOTICES.length + 1}`,
        expId: exp.id,
        categoria: "Cotización Vinculante",
        tagClass: "warning",
        titulo: `Nueva solicitud de cotización para ${exp.id}`,
        descripcion: `SOFEIN ha remitido la solicitud de oferta económica y técnica para el suministro de ${exp.producto}.`,
        fecha: "Hoy, ahora",
        roles: ["admin", "proveedor"],
        accion: "Enviar Cotización",
        enlace: `#proveedor/selector/${exp.id}`
      });
      showToast(`✓ Petición formal de cotización enviada a ${matching.proveedoresSeleccionadosPorCliente.length} talleres.`);
      renderApp();
    });

    // 5B. Admin emite petición de ofertas ciega
    document.getElementById("emitRfqOrdersBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      matching.faseSelector = "peticion_cotizaciones";
      showToast("✓ Petición de cotizaciones ciega emitida a talleres.");
      renderApp();
    });

    // 6. Simular recepción de cotizaciones (Helper Demo para reuniones)
    document.getElementById("simulateAllQuotesBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      const selectedIds = matching.proveedoresSeleccionadosPorCliente.length
        ? matching.proveedoresSeleccionadosPorCliente
        : matching.proveedoresPreseleccionadosPorAdmin.slice(0, 3);

      selectedIds.forEach((pId, idx) => {
        const prv = DIRECTORIO_PROVEEDORES.find(p => p.id === pId) || DIRECTORIO_PROVEEDORES[0];
        const prices = ["945 €/t", "960 €/t", "930 €/t", "33,50 €/ud", "34,20 €/ud", "32,80 €/ud"];
        const totals = ["1.134.000 €", "1.152.000 €", "1.116.000 €", "485.750 €", "495.900 €", "475.600 €"];
        const delivery = ["8 semanas (56 días)", "7 semanas (49 días)", "9 semanas (63 días)"];
        matching.cotizaciones[pId] = {
          proveedorId: pId,
          nombre: prv.nombre,
          cif: prv.cif,
          sede: prv.sede,
          precioUnitario: prices[idx % prices.length],
          precioTotal: totals[idx % totals.length],
          plazoSemanas: delivery[idx % delivery.length],
          desviacionPlazoDias: idx === 1 ? -7 : idx === 2 ? +3 : -4,
          validezOferta: "45 días",
          condicionesPago: prv.condicionesPago || "60 días confirmada",
          garantia: "10 años trazabilidad total",
          puntuacionTecnica: `${95 + idx}/100`,
          requisitosConfirmados: prv.requisitosQueCumple || ["Trazabilidad completa"],
          archivoOferta: `Oferta-${prv.nombre.split(" ")[0]}-${exp.id}.pdf`,
          estado: "recibida",
          fechaEnvio: "Hoy, hace unos minutos"
        };
      });
      matching.faseSelector = "comparativa";
      showToast("✓ Todas las cotizaciones recibidas. Matriz comparativa habilitada.");
      renderApp();
    });

    // 7. Formulario de cotización de Proveedor (Paso 3)
    document.getElementById("providerQuoteForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const expId = e.currentTarget.dataset.expId;
      const exp = getActiveExpediente(expId);
      const matching = ensureExpedienteMatching(exp);
      const unitPrice = document.getElementById("quoteUnitPrice")?.value || "945 €/t";
      const totalPrice = document.getElementById("quoteTotalPrice")?.value || "1.134.000 €";
      const delivery = document.getElementById("quoteDeliveryTime")?.value || "8 semanas";
      const payment = document.getElementById("quotePaymentCond")?.value || "60 días confirmada";
      const validity = document.getElementById("quoteValidity")?.value || "45 días";

      const prvId = "PRV-01"; // Proveedor por defecto IberRail
      matching.cotizaciones[prvId] = {
        proveedorId: prvId,
        nombre: "IberRail Components, S.L.",
        cif: "B-48192837",
        sede: "Amurrio (Álava) / Bilbao",
        precioUnitario: unitPrice,
        precioTotal: totalPrice,
        plazoSemanas: delivery,
        desviacionPlazoDias: 0,
        validezOferta: validity,
        condicionesPago: payment,
        garantia: "10 años trazabilidad total",
        puntuacionTecnica: "98/100",
        requisitosConfirmados: [
          "Certificación de ensayos mecánicos en laboratorio ENAC",
          "Trazabilidad de colada / lote con código individual QR",
          "Cumplimiento estricto de especificación técnica y tolerancias"
        ],
        archivoOferta: `Oferta-IberRail-${exp.id}.pdf`,
        estado: "recibida",
        fechaEnvio: "Hoy, ahora"
      };

      NOTICES.unshift({
        id: `AV-0${NOTICES.length + 1}`,
        expId: exp.id,
        categoria: "Cotización Recibida",
        tagClass: "complete",
        titulo: `Cotización recibida de IberRail Components (${exp.id})`,
        descripcion: `Oferta vinculante de ${totalPrice} con plazo de ${delivery}. Disponible para validación en la matriz comparativa.`,
        fecha: "Hoy, ahora",
        roles: ["admin", "cliente"],
        accion: "Ver Comparativa",
        enlace: `#admin/selector/${exp.id}`
      });

      matching.faseSelector = "comparativa";
      showToast("✓ Cotización vinculante remitida con éxito a SOFEIN.");
      renderApp();
    });

    // 8. Botón rápido "Abrir Matriz Comparativa"
    document.getElementById("goToComparisonBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      matching.faseSelector = "comparativa";
      renderApp();
    });

    // 9. Cliente selecciona proveedor ganador en la matriz (Paso 4)
    document.querySelectorAll("[data-select-winning-prv]").forEach(btn => {
      btn.addEventListener("click", () => {
        const prvName = btn.dataset.selectWinningPrv;
        const exp = getActiveExpediente(btn.dataset.expId);
        const matching = ensureExpedienteMatching(exp);
        matching.proveedorAdjudicado = prvName;
        showToast(`Proveedor seleccionado: ${prvName}`);
        renderApp();
      });
    });

    // 10. Checkboxes de requisitos exigibles en adjudicación (Apuntes 06)
    document.querySelectorAll("[data-req-exigible-check]").forEach(chk => {
      chk.addEventListener("change", e => {
        const reqText = chk.dataset.reqExigibleCheck;
        const exp = getActiveExpediente(chk.dataset.expId);
        const matching = ensureExpedienteMatching(exp);
        const set = new Set(matching.requisitosExigidosCliente);
        if (e.target.checked) {
          set.add(reqText);
        } else {
          set.delete(reqText);
        }
        matching.requisitosExigidosCliente = Array.from(set);
      });
    });

    // 11. Confirmar adjudicación (Cliente)
    document.getElementById("confirmAwardBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      if (!matching.proveedorAdjudicado) {
        showToast("⚠️ Selecciona primero un proveedor de la matriz");
        return;
      }
      matching.faseSelector = "adjudicado";
      exp.proveedor = matching.proveedorAdjudicado;
      // Actualizar presupuesto del expediente al precio de la oferta adjudicada
      const quote = Object.values(matching.cotizaciones).find(q => q.nombre === matching.proveedorAdjudicado);
      if (quote && quote.precioTotal) {
        exp.presupuestoTotal = quote.precioTotal;
        exp.plazoPactado = quote.plazoSemanas;
      }

      NOTICES.unshift({
        id: `AV-0${NOTICES.length + 1}`,
        expId: exp.id,
        categoria: "Adjudicación Formal",
        tagClass: "complete",
        titulo: `Proveedor adjudicado para ${exp.id}: ${matching.proveedorAdjudicado}`,
        descripcion: `El constructor ha seleccionado a ${matching.proveedorAdjudicado}. Requisitos exigidos registrados. SOFEIN debe formalizar la hoja de pedido.`,
        fecha: "Hoy, ahora",
        roles: ["admin", "cliente", "proveedor"],
        accion: "Formalizar Pedido",
        enlace: `#admin/selector/${exp.id}`
      });

      showToast(`✓ Adjudicación confirmada para ${matching.proveedorAdjudicado}.`);
      renderApp();
    });

    // 12. Admin valida adjudicación y avanza a Formalización de Pedido (Fase 3)
    document.getElementById("formalizePedidoBtn")?.addEventListener("click", e => {
      const exp = getActiveExpediente(e.currentTarget.dataset.expId);
      const matching = ensureExpedienteMatching(exp);
      if (!matching.proveedorAdjudicado) {
        const firstQuote = Object.values(matching.cotizaciones)[0];
        matching.proveedorAdjudicado = firstQuote ? firstQuote.nombre : exp.proveedor;
      }
      matching.faseSelector = "adjudicado";
      exp.proveedor = matching.proveedorAdjudicado;
      exp.faseActual = 2; // Avanza a Fase 3 (num 3: Formalización de Pedido)
      activeDossierPhase = 2;

      // Registrar entregable de formalización
      if (!exp.deliverables[2] || exp.deliverables[2].length === 0) {
        exp.deliverables[2] = [
          { name: "Hoja de Pedido Formalizada (Delimitación Responsabilidad)", owner: "SOFEIN", state: "review", format: "PDF", file: `Hoja-Pedido-${exp.id}.pdf`, date: "Hoy" },
          { name: "Acuerdo Marco Plataforma y Condiciones de Suministro", owner: "Cliente", state: "complete", format: "Digital", file: `Acuerdo-Marco-${exp.cliente.split(" ")[0]}.pdf`, date: "Hoy" }
        ];
      }

      NOTICES.unshift({
        id: `AV-0${NOTICES.length + 1}`,
        expId: exp.id,
        categoria: "Formalización",
        tagClass: "complete",
        titulo: `Expediente ${exp.id} avanzado a Formalización de Pedido`,
        descripcion: `Adjudicación acreditada para ${matching.proveedorAdjudicado}. Hoja de pedido y acuerdo tripartito emitidos.`,
        fecha: "Hoy, ahora",
        roles: ["admin", "cliente"],
        accion: "Ver Pedido",
        enlace: `#admin/expedientes/${exp.id}`
      });

      showToast(`✓ Adjudicación validada. Expediente avanzado a Fase 3 (Formalización).`);
      location.hash = `#admin/expedientes/${exp.id}`;
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
          showToast(`✓ Hoja de Pedido firmada digitalmente por ${exp.cliente}`);
        } else if (signRole === "proveedor") {
          formalizacion.firmaProveedor = true;
          formalizacion.fechaFirmaProveedor = "Hoy, ahora";
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

        showToast(`✓ Acuerdo ${formalizacion.codigoContrato} validado. Fase 4 (Fabricación) activada.`);
        renderApp();
      });
    });

    // 3. Completar Fase Actual y Avanzar a la Siguiente (Gestión Operativa SOFEIN)
    document.querySelectorAll("[data-advance-dossier-phase]").forEach(btn => {
      btn.addEventListener("click", () => {
        const exp = getActiveExpediente(btn.dataset.advanceDossierPhase);
        const currentSum = getActiveExpSuministro(exp);
        const expSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
        const delivMap = getActiveDeliverablesMap(exp);
        const currentIdx = activeDossierPhase;

        // Marcar ranuras de la fase actual como completas
        if (delivMap[currentIdx]) {
          delivMap[currentIdx].forEach(d => {
            if (!d.file) d.file = `${d.name.replace(/[^a-zA-Z0-9]/g, "-")}-${exp.id}.pdf`;
            d.state = "complete";
          });
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
            detalle: "Hitos de la fase validados por SOFEIN Admin."
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
    const hasCliente = selectedRoles.includes("cliente");
    const hasProveedor = selectedRoles.includes("proveedor");
    const hasDestinatario = selectedRoles.includes("destinatario");
    return `
      <div class="doc-visibility-box">
        <span class="doc-visibility-title">${icon("eye", 14)} ¿Quién puede ver este documento? (Permisos SOFEIN Admin)</span>
        <div class="doc-visibility-checks">
          <label class="doc-vis-check-item">
            <input type="checkbox" name="vis_cliente" value="cliente" ${hasCliente ? "checked" : ""} />
            <span>Cliente (Constructor)</span>
          </label>
          <label class="doc-vis-check-item">
            <input type="checkbox" name="vis_proveedor" value="proveedor" ${hasProveedor ? "checked" : ""} />
            <span>Proveedor Homologado</span>
          </label>
          <label class="doc-vis-check-item">
            <input type="checkbox" name="vis_destinatario" value="destinatario" ${hasDestinatario ? "checked" : ""} />
            <span>Destinatario Final (Auditor)</span>
          </label>
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

  function openAddDeliverableModal(expId) {
    const exp = getActiveExpediente(expId);
    const delivMap = getActiveDeliverablesMap(exp);
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

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
                  Origen / Responsable
                  <select name="owner" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="Proveedor">Proveedor</option>
                    <option value="Cliente">Cliente</option>
                    <option value="SOFEIN">SOFEIN</option>
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

      activeDossierPhase = targetPhase;
      close();
      showToast(`✓ Documento "${docName}" requerido en ${PHASES[targetPhase].name}`);
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
                  <input name="fileName" value="Documento-${exp.id}.pdf" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
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
      const fileName = (form.get("fileName") || "").trim() || `${docName.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`;
      const notes = (form.get("notes") || "").trim();
      const visibleTo = activeRole === "admin" ? readVisibilityFromForm(form) : ["admin", activeRole];
      const todayStr = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "");

      if (!delivMap[targetPhase]) delivMap[targetPhase] = [];
      delivMap[targetPhase].push({
        name: docName,
        reqDate: todayStr,
        owner: defaultOwner,
        state: activeRole === "admin" ? "complete" : "review",
        format: "PDF",
        file: fileName,
        date: "Hoy",
        visibleTo,
        notes: notes || (activeRole === "admin" ? `Validado · Visible: ${formatVisibleToLabel(visibleTo)}` : "Pendiente de validación SOFEIN")
      });

      activeDossierPhase = targetPhase;
      close();
      showToast(`✓ Documento "${fileName}" subido en ${PHASES[targetPhase].name}`);
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

    const suggestedFile = `${del.name.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 28)}-${exp.id}.pdf`;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="slotUploadModalBackdrop">
        <div class="procurement-modal" style="width:min(540px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Subir Documento Requerido</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">${del.name} (${exp.id})</p>
            </div>
            <button type="button" id="closeSlotUploadModalBtn">×</button>
          </div>
          <form id="modalSlotUploadForm">
            <div class="procurement-modal-body" style="gap:14px">
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Archivo a subir
                <input name="fileName" value="${suggestedFile}" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
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
      del.file = (form.get("fileName") || "").trim() || suggestedFile;
      del.date = "Hoy";
      del.rejectReason = null;
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

  function openAddCambioLogModal(expId) {
    const exp = getActiveExpediente(expId);
    if (!exp) return;
    const expSuministros = SUMINISTROS.filter(s => s.expId === exp.id);
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="addCambioLogBackdrop">
        <div class="procurement-modal" style="width:min(520px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>+ Añadir Cambio al Registro</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Registra un cambio operativo, ajuste técnico o anotación en ${exp.id}</p>
            </div>
            <button type="button" id="closeAddCambioLogBtn">×</button>
          </div>
          <form id="modalAddCambioLogForm">
            <div class="procurement-modal-body" style="gap:12px">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Tipo de cambio
                  <select name="tipo" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="Cambio operativo">Cambio operativo</option>
                    <option value="Ajuste de entrega">Ajuste de fecha / entrega</option>
                    <option value="Modificación de alcance">Modificación de alcance</option>
                    <option value="Validación técnica">Validación técnica</option>
                  </select>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Suministro afectado
                  <select name="suministro" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="General">Todo el expediente</option>
                    ${expSuministros.map(s => `<option value="${s.id}" ${activeDossierSuministroId === s.id ? "selected" : ""}>${s.id} · ${s.tipo}</option>`).join("")}
                  </select>
                </label>
              </div>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Título del cambio
                <input name="titulo" required placeholder="Ej: Actualización de ventana de descarga en tajo de vía" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Detalle / Observaciones
                <textarea name="detalle" rows="3" placeholder="Describe el cambio acordado o registrado..." style="padding:9px 11px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.45"></textarea>
              </label>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelAddCambioLogBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Guardar en Registro</button>
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
      const tipo = form.get("tipo") || "Cambio operativo";
      const suministro = form.get("suministro") || "General";
      const titulo = (form.get("titulo") || "").trim();
      const detalle = (form.get("detalle") || "").trim();
      addExpedienteCambioLog(exp, { tipo, suministro, titulo, detalle });
      close();
      showToast(`✓ Cambio añadido al Registro de ${exp.id}`);
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

  function openIncidentModal(expId) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const exp = getActiveExpediente(expId);
    if (!exp) return;

    const isRoleAdmin = activeRole === "admin";
    const defaultOrigin = activeRole === "cliente" ? `Cliente (${exp.cliente})` : activeRole === "proveedor" ? `Proveedor (${exp.proveedor || "Taller Homologado"})` : "SOFEIN (De Oficio)";

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="incidentModalBackdrop">
        <div class="procurement-modal" style="width:min(660px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Notificar Incidencia / Modificación de Alcance</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Expediente <b>${exp.id}</b> · ${exp.producto}</p>
            </div>
            <button type="button" id="closeIncidentModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalIncidentForm">
            <div class="procurement-modal-body" style="gap:14px;max-height:calc(85vh - 140px);overflow-y:auto;padding-right:12px">
              
              <!-- Notificante y Categoría -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Notificante / Origen
                  <select name="origen" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="Cliente (${exp.cliente})" ${activeRole === "cliente" ? "selected" : ""}>Cliente (${exp.cliente})</option>
                    <option value="Proveedor (${exp.proveedor || "Taller Homologado"})" ${activeRole === "proveedor" ? "selected" : ""}>Proveedor (${exp.proveedor || "Taller Homologado"})</option>
                    <option value="SOFEIN (De Oficio)" ${activeRole === "admin" ? "selected" : ""}>SOFEIN (De Oficio / Mediador)</option>
                  </select>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Tipología de la Alteración
                  <select name="categoria" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="Retraso de fabricación">Retraso en fabricación / curado en taller</option>
                    <option value="No conformidad técnica / calidad">No conformidad técnica / ensayo de calidad</option>
                    <option value="Modificación de alcance / adenda">Modificación de alcance / unidades de vía (Cliente)</option>
                    <option value="Incidencia logística">Incidencia logística / transporte a tajo de vía</option>
                  </select>
                </label>
              </div>

              <!-- Título de la Incidencia -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Título Resumen de la Alteración
                <input name="tipo" placeholder="Ej: Demora en secado de hormigón por ola de calor" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>

              <!-- Descripción técnica -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Detalle y Justificación Técnica de los Hechos
                <textarea name="descripcion" rows="3" required style="padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.5" placeholder="Describir los hechos sobrevenidos, motivos técnicos y afectación a la cadena de suministro de vía..."></textarea>
              </label>

              <!-- Impactos reportados -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Impacto Estimado en Plazo
                  <input name="impactoPlazo" placeholder="Ej: +6 días en la segunda mitad del lote" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Impacto Económico (€)
                  <input name="impactoCoste" placeholder="Ej: 0 € (Sin coste) o +1.500 €" required value="0 € (Sin alteración económica)" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>

              <!-- Evidencia técnica adjunta -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Documento de Evidencia / Soporte Técnico
                <input name="evidenciaDoc" placeholder="Ej: Informe-Laboratorio-Curado-Taller.pdf" value="Informe-Tecnico-Soporte.pdf" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>

              ${isRoleAdmin ? `
                <!-- Propuesta inicial opcional de SOFEIN -->
                <div style="padding:12px 14px;background:rgba(15, 118, 110, 0.05);border:1px solid rgba(15, 118, 110, 0.2);border-radius:8px;display:grid;gap:8px">
                  <div style="display:flex;align-items:center;gap:6px;color:#0F766E;font-size:0.78rem;font-weight:600">
                    ${icon("shield", 14)} Redacción Inmediata de Propuesta de Mediación SOFEIN (Opcional)
                  </div>
                  <textarea name="propuestaMediacion" rows="2" style="padding:8px 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.8rem;line-height:1.4" placeholder="Si deseas formular ya la propuesta resolutiva imparcial, descríbela aquí. De lo contrario, podrás redactarla tras evaluar los hechos."></textarea>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                    <input name="nuevoPlazo" placeholder="Nuevo plazo pactado (ej: 48 días)" style="height:34px;padding:0 8px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.78rem" />
                    <input name="nuevoCoste" placeholder="Ajuste económico (ej: Sin variación)" style="height:34px;padding:0 8px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.78rem" />
                  </div>
                </div>
              ` : `
                <div style="padding:10px 12px;background:var(--entity-panel-2);border-radius:6px;font-size:0.76rem;color:var(--entity-muted);line-height:1.4">
                  ${icon("info", 14)} Tras registrar la alteración, el mediador de SOFEIN evaluará la viabilidad técnica y emitirá la Propuesta de Acuerdo sujeta a 5 días hábiles de respuesta con cláusula de silencio positivo.
                </div>
              `}

            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelIncidentModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("plus", 14)} Registrar Formalmente Incidencia</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeIncidentModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelIncidentModalBtn")?.addEventListener("click", close);
    document.getElementById("incidentModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "incidentModalBackdrop") close();
    });

    document.getElementById("modalIncidentForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const origenVal = form.get("origen") || defaultOrigin;
      const categoriaVal = form.get("categoria");
      const tipoVal = form.get("tipo");
      const descripcionVal = form.get("descripcion");
      const impactoPlazoVal = form.get("impactoPlazo");
      const impactoCosteVal = form.get("impactoCoste");
      const evidenciaDocVal = form.get("evidenciaDoc") || "Informe-Tecnico-Soporte.pdf";
      const propuestaVal = form.get("propuestaMediacion");
      const nuevoPlazoVal = form.get("nuevoPlazo");
      const nuevoCosteVal = form.get("nuevoCoste");

      const newId = `INC-${exp.id.replace(/[^0-9]/g, "")}-${exp.incidencias.length + 1}`;
      const nowStr = "Hoy, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const newIncident = {
        id: newId,
        fecha: nowStr,
        origen: origenVal,
        origenRol: activeRole,
        tipo: tipoVal,
        categoria: categoriaVal,
        descripcion: descripcionVal,
        impactoPlazo: impactoPlazoVal,
        impactoCoste: impactoCosteVal,
        impacto: `${impactoPlazoVal} · ${impactoCosteVal}`,
        evidenciaDoc: evidenciaDocVal,
        estado: propuestaVal ? "En mediación SOFEIN" : "Registrada (Pendiente de mediación)",
        propuestaMediacion: propuestaVal || null,
        nuevoPlazoAcordado: nuevoPlazoVal || null,
        nuevoCosteAcordado: nuevoCosteVal || null,
        resolucionTecnica: propuestaVal ? "Cumplimiento estricto de norma EN y certificación técnica de lote." : null,
        fechaNotificacionPropuesta: propuestaVal ? nowStr : null,
        fechaLimiteRespuesta: propuestaVal ? "5 días hábiles desde notificación" : null,
        diasHabilesRestantes: propuestaVal ? 5 : null,
        silencioPositivoAplicado: false,
        firmaSofein: !!propuestaVal,
        firmaSofeinFecha: propuestaVal ? nowStr : null,
        firmaSofeinUsuario: propuestaVal ? "Ángel Plaza (SOFEIN Digital HQ)" : null,
        firmaProveedor: activeRole === "proveedor",
        firmaProveedorFecha: activeRole === "proveedor" ? nowStr : null,
        firmaProveedorUsuario: activeRole === "proveedor" ? "Representante Autorizado de Taller" : null,
        firmaCliente: activeRole === "cliente",
        firmaClienteFecha: activeRole === "cliente" ? nowStr : null,
        firmaClienteUsuario: activeRole === "cliente" ? "Jefe de Obra (Constructor)" : null,
        adendaId: null,
        adendaFecha: null,
        adendaHash: null
      };

      exp.incidencias.unshift(newIncident);

      // Notificación automática en Avisos
      NOTICES.unshift({
        id: `AV-${Date.now()}`,
        expId: exp.id,
        categoria: "Incidencia / Mediación",
        tagClass: "warning",
        titulo: `Nueva incidencia registrada: ${tipoVal}`,
        descripcion: `${origenVal} ha notificado una alteración con impacto ${impactoPlazoVal}. SOFEIN actúa como mediador garante.`,
        fecha: "Hoy, recién comunicada",
        roles: ["admin", "cliente", "proveedor"],
        accion: "Ver Incidencia",
        enlace: `#${activeRole}/expedientes/${exp.id}?tab=incidents`
      });

      close();
      showToast(`✓ Incidencia ${newId} registrada formalmente. SOFEIN abre expediente de mediación.`);
      renderApp();
    });
  }

  function openMediationModal(expId, incId) {
    if (activeRole !== "admin") return;
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const exp = getActiveExpediente(expId);
    const normalizedIncId = String(incId || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const inc = exp && exp.incidencias ? (
      exp.incidencias.find(i => i.id === incId) ||
      exp.incidencias.find(i => String(i.id).replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === normalizedIncId)
    ) : null;
    if (!inc) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="mediationModalBackdrop">
        <div class="procurement-modal" style="width:min(660px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Propuesta Oficial de Mediación & Adenda SOFEIN</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Incidencia <b>${inc.id}</b> · Expediente <b>${exp.id}</b></p>
            </div>
            <button type="button" id="closeMediationModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalMediationForm">
            <div class="procurement-modal-body" style="gap:14px;max-height:calc(85vh - 140px);overflow-y:auto;padding-right:12px">
              
              <!-- Hechos notificados -->
              <div style="padding:10px 12px;background:var(--entity-panel-2);border-radius:6px;font-size:0.78rem;border:1px solid var(--entity-line)">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-weight:600;color:var(--entity-text)">${inc.tipo} (${inc.categoria})</span>
                  <span style="color:var(--entity-muted)">Notificado por: <b>${inc.origen}</b></span>
                </div>
                <div style="color:var(--entity-muted);font-size:0.76rem;line-height:1.4">${inc.descripcion}</div>
                <div style="margin-top:6px;font-size:0.74rem;color:var(--entity-warning);font-weight:600">Impacto manifestado: ${inc.impactoPlazo} · ${inc.impactoCoste}</div>
              </div>

              <!-- Solución Técnica / Operativa Propuesta por SOFEIN -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Solución Técnica y Reestructuración del Suministro
                <textarea name="propuesta" rows="3" required style="padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.5" placeholder="Articular la propuesta imparcial (ej: desdoblar envíos, suministro parcial, sustitución de partidas o reajuste de plazos)...">${inc.propuestaMediacion || "SOFEIN propone articular un suministro fraccionado en dos entregas operativas para no paralizar el montaje de vía en la obra..."}</textarea>
              </label>

              <!-- Nuevo plazo y coste acordados -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Nuevo Plazo Oficial Comprometido
                  <input name="nuevoPlazo" required value="${inc.nuevoPlazoAcordado || "48 días (Lote A: 42d / Lote B: 48d)"}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Ajuste Económico Pactado
                  <input name="nuevoCoste" required value="${inc.nuevoCosteAcordado || "482.000 € (Sin alteración económica)"}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>

              <!-- Garantías y Ensayos Técnicos -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Garantías Técnicas y Normativa de Aplicación
                <textarea name="resolucionTecnica" rows="2" required style="padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.4" placeholder="Ensayos destructivos de lote, certificados CE y controles de laboratorio requeridos...">${inc.resolucionTecnica || "Mantenimiento estricto de los ensayos destructivos de rotura según norma EN 13230-2. Certificados de lote individualizados con marcaje CE para cada envío."}</textarea>
              </label>

              <!-- Cláusula de Silencio Positivo (5 días hábiles) -->
              <div class="incident-silence-box" style="margin:0">
                <div class="incident-silence-icon">${icon("activity", 18)}</div>
                <div class="incident-silence-text">
                  <strong>Eficacia Contractual y Plazo de Respuesta (5 Días Hábiles):</strong>
                  Se concede un plazo perentorio de <b>5 días hábiles</b> desde esta notificación para formular alegaciones. La ausencia de manifestación expresa en contrario dentro de este plazo implicará la <b>aceptación íntegra por silencio positivo</b> de la adenda contractual por ambas partes.
                </div>
              </div>

            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelMediationModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("shield", 14)} Emitir Propuesta de Mediación y Notificar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeMediationModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelMediationModalBtn")?.addEventListener("click", close);
    document.getElementById("mediationModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "mediationModalBackdrop") close();
    });

    document.getElementById("modalMediationForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const nowStr = "Hoy, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      inc.propuestaMediacion = form.get("propuesta");
      inc.nuevoPlazoAcordado = form.get("nuevoPlazo");
      inc.nuevoCosteAcordado = form.get("nuevoCoste");
      inc.resolucionTecnica = form.get("resolucionTecnica");
      inc.fechaNotificacionPropuesta = nowStr;
      inc.fechaLimiteRespuesta = "5 días hábiles desde notificación";
      inc.diasHabilesRestantes = 5;
      inc.estado = "En mediación SOFEIN";
      inc.firmaSofein = true;
      inc.firmaSofeinFecha = nowStr;
      inc.firmaSofeinUsuario = "Ángel Plaza (SOFEIN Digital HQ)";

      // Notificación automática en Avisos
      NOTICES.unshift({
        id: `AV-MED-${Date.now()}`,
        expId: exp.id,
        categoria: "Incidencia / Mediación",
        tagClass: "warning",
        titulo: `Propuesta de mediación emitida para ${inc.id}`,
        descripcion: `SOFEIN ha fijado la propuesta técnica de acuerdo con nuevo plazo (${inc.nuevoPlazoAcordado}). Plazo de 5 días hábiles para firma bilateral.`,
        fecha: "Hoy, recién emitida",
        roles: ["cliente", "proveedor", "admin"],
        accion: "Firmar Propuesta",
        enlace: `#${activeRole}/expedientes/${exp.id}?tab=incidents`
      });

      close();
      showToast("✓ Propuesta de mediación oficial emitida y notificada con 5 días hábiles de plazo.");
      renderApp();
    });
  }

  function openSignIncidentModal(expId, incId, signerRole) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;
    const exp = getActiveExpediente(expId);
    const inc = exp ? exp.incidencias.find(i => i.id === incId) : null;
    if (!inc) return;

    const isCliente = signerRole === "cliente";
    const partyName = isCliente ? exp.cliente : (exp.proveedor || "Taller Homologado");

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="signModalBackdrop">
        <div class="procurement-modal" style="width:min(580px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Ratificación y Firma Digital de Mediación</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Propuesta <b>${inc.id}</b> · Expediente <b>${exp.id}</b></p>
            </div>
            <button type="button" id="closeSignModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalSignForm">
            <div class="procurement-modal-body" style="gap:14px">
              
              <!-- Resumen de condiciones acordadas -->
              <div style="padding:14px;background:rgba(15, 118, 110, 0.05);border:1px solid rgba(15, 118, 110, 0.2);border-radius:8px;display:grid;gap:8px">
                <span style="font-size:0.72rem;font-weight:700;text-transform:uppercase;color:#0F766E">Términos Oficiales de la Propuesta SOFEIN</span>
                <p style="margin:0;font-size:0.8rem;line-height:1.5;color:var(--entity-text)">${inc.propuestaMediacion}</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px">
                  <div style="font-size:0.75rem"><b>Nuevo Plazo:</b> ${inc.nuevoPlazoAcordado}</div>
                  <div style="font-size:0.75rem"><b>Ajuste Coste:</b> ${inc.nuevoCosteAcordado}</div>
                </div>
              </div>

              <!-- Identidad del firmante -->
              <div style="display:grid;gap:6px">
                <label style="font-size:0.75rem;font-weight:600;color:var(--entity-muted)">Entidad y Apoderado Firmante</label>
                <input name="signerUser" required value="${isCliente ? `Luis M. Aranzadi (Jefe de Obra, ${partyName})` : `Carlos Mendía (Director Industrial, ${partyName})`}" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </div>

              <!-- Declaración legal de conformidad -->
              <label style="display:flex;align-items:flex-start;gap:10px;font-size:0.77rem;line-height:1.5;color:var(--entity-text);cursor:pointer;padding:10px 12px;background:var(--entity-panel-2);border-radius:6px;border:1px solid var(--entity-line)">
                <input type="checkbox" required style="margin-top:2px;accent-color:var(--entity-accent)" />
                <span>
                  Declaro que ostento facultades suficientes en representación de <b>${partyName}</b> para aceptar los términos de la presente propuesta de mediación, ratificando la delimitación de responsabilidad de SOFEIN y reconociendo el carácter contractual vinculante de la futura adenda.
                </span>
              </label>

            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelSignModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("check", 14)} Firmar y Aceptar Propuesta</button>
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
      const nowStr = "Hoy, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (isCliente) {
        inc.firmaCliente = true;
        inc.firmaClienteFecha = nowStr;
        inc.firmaClienteUsuario = user;
      } else {
        inc.firmaProveedor = true;
        inc.firmaProveedorFecha = nowStr;
        inc.firmaProveedorUsuario = user;
      }

      if (inc.firmaCliente && inc.firmaProveedor) {
        inc.estado = "Pendiente de consolidación por SOFEIN";
      }

      close();
      showToast(`✓ Propuesta de mediación firmada digitalmente por ${isCliente ? "el constructor" : "el taller suministrador"}.`);
      renderApp();
    });
  }

  function consolidateAddendum(expId, incId) {
    const exp = getActiveExpediente(expId);
    const inc = exp ? exp.incidencias.find(i => i.id === incId) : null;
    if (!inc) return;

    const addendaNum = "01";
    inc.adendaId = `ADENDA-${exp.id.replace(/[^0-9]/g, "")}-${addendaNum}`;
    inc.adendaFecha = "Hoy, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    inc.adendaHash = "sha256-" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    inc.estado = "Adenda Oficial Consolidada";

    // Actualizar expediente
    if (inc.nuevoPlazoAcordado) {
      exp.plazoRealEstimado = inc.nuevoPlazoAcordado;
      exp.desviacionDias = `Ajustado según Adenda Oficial ${inc.adendaId}`;
    }
    if (inc.nuevoCosteAcordado && !inc.nuevoCosteAcordado.includes("Sin")) {
      exp.presupuestoTotal = inc.nuevoCosteAcordado;
    }

    // Insertar ranura documental oficial en deliverables de la fase activa
    if (!exp.deliverables[exp.faseActual]) exp.deliverables[exp.faseActual] = [];
    const alreadyExists = exp.deliverables[exp.faseActual].some(d => d.file && d.file.includes(inc.adendaId));
    if (!alreadyExists) {
      exp.deliverables[exp.faseActual].push({
        name: `Adenda Oficial de Suministro ${inc.adendaId} (Resolución de Incidencia)`,
        owner: "SOFEIN",
        state: "complete",
        format: "PDF",
        file: `Adenda-Oficial-${inc.adendaId}-Consolidada.pdf`,
        date: "Hoy, consolidada",
        hash: inc.adendaHash
      });
    }

    // Notificación en Avisos
    NOTICES.unshift({
      id: `AV-ADENDA-${Date.now()}`,
      expId: exp.id,
      categoria: "Incidencia / Mediación",
      tagClass: "complete",
      titulo: `Adenda contractual oficial consolidada ${inc.adendaId}`,
      descripcion: `La mediación de la incidencia ${inc.id} ha culminado en adenda contractual vinculante con plenos efectos jurídicos.`,
      fecha: "Hoy, recién consolidada",
      roles: ["admin", "cliente", "proveedor"],
      accion: "Ver Adenda",
      enlace: `#${activeRole}/expedientes/${exp.id}?tab=incidents`
    });

    showToast(`✓ Adenda contractual ${inc.adendaId} consolidada oficialmente. Entregable y plazos de expediente actualizados.`);
    renderApp();
  }

  function applySilencePositive(expId, incId) {
    const exp = getActiveExpediente(expId);
    const inc = exp ? exp.incidencias.find(i => i.id === incId) : null;
    if (!inc) return;

    inc.silencioPositivoAplicado = true;
    inc.diasHabilesRestantes = 0;
    const nowStr = "Hoy (5 días hábiles transcurridos)";

    if (!inc.firmaCliente) {
      inc.firmaCliente = true;
      inc.firmaClienteUsuario = "Aprobado por Silencio Positivo (5 días hábiles sin oposición formal)";
      inc.firmaClienteFecha = nowStr;
    }
    if (!inc.firmaProveedor) {
      inc.firmaProveedor = true;
      inc.firmaProveedorUsuario = "Aprobado por Silencio Positivo (5 días hábiles sin oposición formal)";
      inc.firmaProveedorFecha = nowStr;
    }

    consolidateAddendum(expId, incId);
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
                <h5>2. Antecedentes y Hechos Sobrevenidos (Incidencia ${inc.id})</h5>
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
                <h5>6. Cláusula Cuarta — Eficacia Jurídica y Silencio Positivo</h5>
                <p>
                  La presente adenda tiene plenos efectos vinculantes entre las partes, habiendo sido ratificada mediante firma electrónica y/o mediante la aplicación de la cláusula de <b>Silencio Positivo tras 5 días hábiles</b> estipulada en las condiciones generales de la plataforma SOFEIN.
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
                  <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:700">Firma Proveedor (Taller)</span>
                  <strong>${inc.firmaProveedorUsuario || "Representante de Taller"}</strong>
                  <span>${inc.firmaProveedor ? "✓ Firma electrónica acreditada" : "⏳ Ratificado por Silencio Positivo"}</span>
                  <small style="color:var(--entity-muted);font-size:0.68rem">${inc.firmaProveedorFecha || "Conforme"}</small>
                </div>
                <div class="addendum-sign-block">
                  <span style="font-size:0.68rem;text-transform:uppercase;color:var(--entity-faint);font-weight:700">Firma Cliente (Constructor)</span>
                  <strong>${inc.firmaClienteUsuario || "Jefe de Obra (Constructor)"}</strong>
                  <span>${inc.firmaCliente ? "✓ Firma electrónica acreditada" : "⏳ Ratificado por Silencio Positivo"}</span>
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

  function openCreateNoticeModal(preselectedExpId = null) {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="createNoticeModalBackdrop">
        <div class="procurement-modal" style="width:min(620px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>Emitir Aviso / Requerimiento Oficial</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">Notificación trazable para clientes y talleres proveedores</p>
            </div>
            <button type="button" id="closeCreateNoticeModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalCreateNoticeForm">
            <div class="procurement-modal-body" style="gap:14px;max-height:calc(85vh - 140px);overflow-y:auto;padding-right:12px">
              
              <!-- Expediente Vinculado y Suministro -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Expediente Vinculado
                  <select name="expId" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    ${EXPEDIENTES.map(e => `
                      <option value="${e.id}" ${preselectedExpId === e.id ? "selected" : ""}>
                        ${e.id} · ${e.producto.split(" ")[0]} (${e.cliente.split(" ")[0]})
                      </option>
                    `).join("")}
                  </select>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Suministro Vinculado
                  <select name="suministro" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="General del Expediente">General del Expediente</option>
                    ${SUMINISTROS.map(s => `
                      <option value="${s.num} · ${s.tipo.split(' ')[0]} ${s.tipo.split(' ')[1] || ''}">
                        ${s.num} · ${s.tipo} (${s.expId})
                      </option>
                    `).join("")}
                  </select>
                </label>
              </div>

              <!-- Destinatarios -->
              <div>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Destinatarios
                  <select name="targetRoles" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="both">Ambos (Cliente & Proveedor)</option>
                    <option value="cliente">Solo Constructor (Cliente)</option>
                    <option value="proveedor">Solo Taller (Proveedor)</option>
                  </select>
                </label>
              </div>

              <!-- Categoría y Prioridad -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Categoría del Aviso
                  <select name="categoria" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="Requerimiento Documental">Requerimiento Documental (Certificados / Ensayos)</option>
                    <option value="Aviso de Plazo / Calendario">Aviso de Plazo / Calendario de Fabricación</option>
                    <option value="Instrucción Técnica de Obra">Instrucción Técnica de Obra / Replanteo</option>
                    <option value="Convocatoria de Coordinación">Convocatoria de Coordinación y Seguimiento</option>
                    <option value="Información de Suministro">Información General de Suministro</option>
                  </select>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Nivel de Prioridad / Urgencia
                  <select name="prioridad" required style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                    <option value="normal">Normal (Informativa)</option>
                    <option value="urgente">Urgente (Respuesta en < 24h)</option>
                    <option value="critica">Crítica (Riesgo de paralización de vía)</option>
                  </select>
                </label>
              </div>

              <!-- Asunto -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Asunto del Aviso
                <input name="titulo" required placeholder="Ej: Aportar certificado de tracción EN 13230 antes del despacho" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>

              <!-- Mensaje Detallado -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Mensaje / Detalle del Requerimiento
                <textarea name="descripcion" rows="3" required placeholder="Explicar con precisión el requerimiento oficial, documentos pendientes o fechas límite de respuesta..." style="padding:10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;line-height:1.5"></textarea>
              </label>

              <!-- Botón de Acción Sugerida -->
              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Etiqueta del Botón de Acción
                <input name="accion" value="Subir Documento" required placeholder="Ej: Subir Certificado, Revisar Oferta, etc." style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>

            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelCreateNoticeModalBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${icon("inbox", 14)} Emitir y Notificar Aviso</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { modalWrap.innerHTML = ""; };
    document.getElementById("closeCreateNoticeModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelCreateNoticeModalBtn")?.addEventListener("click", close);
    document.getElementById("createNoticeModalBackdrop")?.addEventListener("click", e => {
      if (e.target.id === "createNoticeModalBackdrop") close();
    });

    document.getElementById("modalCreateNoticeForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const targetExpId = form.get("expId");
      const targetRolesVal = form.get("targetRoles");
      const categoriaVal = form.get("categoria");
      const prioridadVal = form.get("prioridad");
      const tituloVal = form.get("titulo");
      const descripcionVal = form.get("descripcion");
      const accionVal = form.get("accion") || "Ver";

      let rolesArr = ["admin"];
      if (targetRolesVal === "both") {
        rolesArr.push("cliente", "proveedor");
      } else if (targetRolesVal === "cliente") {
        rolesArr.push("cliente");
      } else if (targetRolesVal === "proveedor") {
        rolesArr.push("proveedor");
      }

      const tagClass = prioridadVal === "critica" ? "review" : prioridadVal === "urgente" ? "warning" : "complete";

      let targetTab = "comms";
      if (categoriaVal === "Requerimiento Documental") targetTab = "deliverables";
      else if (categoriaVal === "Incidencia / Mediación") targetTab = "incidents";
      else if (categoriaVal === "Aviso de Plazo / Calendario") targetTab = "deliverables";

      const suministroVal = form.get("suministro") || "General del Expediente";

      const newNotice = {
        id: `AV-${Date.now()}`,
        expId: targetExpId,
        suministro: suministroVal,
        categoria: categoriaVal,
        tagClass: tagClass,
        titulo: tituloVal,
        descripcion: descripcionVal,
        fecha: "Hoy, recién emitido",
        roles: rolesArr,
        accion: accionVal,
        enlace: `#${activeRole}/expedientes/${targetExpId}?tab=${targetTab}`
      };

      NOTICES.unshift(newNotice);
      close();
      showToast(`✓ Aviso formal emitido para el expediente ${targetExpId}`);
      renderApp();
    });
  }

  function openAddOrEditEntityModal(entityToEdit = null, defaultType = "proveedor") {
    const modalWrap = document.getElementById("modalContainer");
    if (!modalWrap) return;

    const isEdit = !!entityToEdit;
    const targetType = isEdit ? (entityToEdit.id && entityToEdit.id.startsWith("CLI") ? "cliente" : "proveedor") : defaultType;

    modalWrap.innerHTML = `
      <div class="procurement-modal-backdrop" id="addEntityModalBackdrop">
        <div class="procurement-modal" style="width:min(580px,100%)">
          <div class="procurement-modal-head">
            <div>
              <h3>${isEdit ? `Editar ${targetType === 'proveedor' ? 'Proveedor' : 'Cliente'}` : 'Añadir al Directorio'}</h3>
              <p style="margin:2px 0 0;font-size:0.75rem;color:var(--entity-muted)">
                ${isEdit ? `Actualización de datos técnicos y operativos de ${entityToEdit.nombre}` : 'Alta de nuevo proveedor homologado o cliente constructor de vía'}
              </p>
            </div>
            <button type="button" id="closeAddEntityModalBtn" aria-label="Cerrar">×</button>
          </div>
          <form id="modalAddEntityForm">
            <div class="procurement-modal-body" style="gap:14px;max-height:calc(85vh - 140px);overflow-y:auto;overflow-x:hidden;padding:20px 24px;box-sizing:border-box">
              <div style="display:grid;gap:6px">
                <label style="font-size:0.75rem;font-weight:600;color:var(--entity-muted)">Tipo de entidad</label>
                <select id="entityTypeSelect" name="tipo" ${isEdit ? "disabled" : ""} style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0">
                  <option value="proveedor" ${targetType === "proveedor" ? "selected" : ""}>Proveedor Homologado (Fabricante / Distribuidor)</option>
                  <option value="cliente" ${targetType === "cliente" ? "selected" : ""}>Cliente (Constructor de vía / Contratista)</option>
                </select>
                ${isEdit ? `<input type="hidden" name="tipo" value="${targetType}">` : ''}
              </div>

              <div style="display:grid;grid-template-columns:1fr 140px;gap:12px;min-width:0;box-sizing:border-box">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Razón Social / Nombre
                  <input name="nombre" required value="${(entityToEdit?.nombre || '').replace(/"/g, '&quot;')}" placeholder="Ej: Aceros Ferroviarios del Cantábrico, S.L." style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  CIF
                  <input name="cif" required value="${(entityToEdit?.cif || '').replace(/"/g, '&quot;')}" placeholder="Ej: B-48192837" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>

              <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                Sede / Fábrica principal
                <input name="sede" required value="${(entityToEdit?.sede || '').replace(/"/g, '&quot;')}" placeholder="Ej: Amurrio (Álava) / Bilbao" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
              </label>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Email de contacto
                  <input name="email" type="email" required value="${(entityToEdit?.email || entityToEdit?.contacto || '').replace(/"/g, '&quot;')}" placeholder="contacto@empresa.es" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Teléfono de contacto
                  <input name="telefono" type="tel" value="${(entityToEdit?.telefono || '').replace(/"/g, '&quot;')}" placeholder="Ej: +34 945 393 210" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>

              <!-- Campos específicos para Proveedor -->
              <div id="proveedorFields" style="display:${targetType === 'proveedor' ? 'grid' : 'none'};gap:14px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Suministros acreditados (etiquetas breves separadas por coma)
                  <input name="suministros" value="${(entityToEdit?.suministros ? entityToEdit.suministros.join(', ') : (entityToEdit?.materiales || '')).replace(/"/g, '&quot;')}" placeholder="Ej: Traviesas, Fijaciones, Carril" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                  <span style="font-size:0.7rem;color:var(--entity-muted)">Etiquetas breves: Traviesas, Fijaciones, Carril 54E1, Balasto</span>
                </label>
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Conformidades y certificaciones (etiquetas separadas por coma)
                  <input name="conformidades" value="${(entityToEdit?.conformidades ? entityToEdit.conformidades.join(', ') : (entityToEdit?.homologaciones ? entityToEdit.homologaciones.join(', ') : 'ISO 9001, ISO 14001, Adif NAV-2026')).replace(/"/g, '&quot;')}" placeholder="Ej: ISO 9001, ISO 14001, Tratamiento UNE-EN 13145, Marcado CE" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                  <span style="font-size:0.7rem;color:var(--entity-muted)">Ejemplos: ISO 9001, Tratamiento UNE-EN 13145, AENOR EN 13230, Adif NAV-2026</span>
                </label>
              </div>

              <!-- Campos específicos para Cliente -->
              <div id="clienteFields" style="display:${targetType === 'cliente' ? 'grid' : 'none'};gap:14px">
                <label style="display:grid;gap:6px;font-size:0.75rem;font-weight:600;color:var(--entity-muted)">
                  Actividad / Especialidad ferroviaria
                  <input name="actividad" value="${(entityToEdit?.actividad || '').replace(/"/g, '&quot;')}" placeholder="Ej: Constructora Ferroviaria (Licitaciones Adif / Metro)" style="height:38px;padding:0 10px;border-radius:6px;border:1px solid var(--entity-line);background:var(--entity-bg);color:var(--entity-text);font:inherit;font-size:0.82rem;width:100%;box-sizing:border-box;min-width:0" />
                </label>
              </div>
            </div>
            <div class="procurement-modal-footer">
              <button class="admin-quiet-button" type="button" id="cancelAddEntityBtn">Cancelar</button>
              <button class="admin-primary-button" type="submit">${isEdit ? 'Guardar cambios' : 'Dar de alta en directorio'}</button>
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

    document.getElementById("modalAddEntityForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const tipo = form.get("tipo");
      const nombre = (form.get("nombre") || "").trim();
      const cif = (form.get("cif") || "").trim();
      const sede = (form.get("sede") || "").trim();
      const email = (form.get("email") || "").trim();
      const telefono = (form.get("telefono") || "").trim();

      const parseTags = str => (str || "").split(",").map(t => t.trim()).filter(Boolean);

      if (tipo === "proveedor") {
        const rawSum = form.get("suministros") || "";
        const rawConf = form.get("conformidades") || "";
        let suministros = parseTags(rawSum);
        if (!suministros.length) suministros = ["Suministros homologados"];
        let conformidades = parseTags(rawConf);
        if (!conformidades.length) conformidades = ["ISO 9001"];

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
            prv.conformidades = conformidades;
            prv.materiales = suministros.join(" · ");
            showToast(`✓ Proveedor "${prv.nombre}" actualizado correctamente`);
          }
        } else {
          const newPrv = {
            id: `PRV-0${DIRECTORIO_PROVEEDORES.length + 1}`,
            nombre,
            cif,
            sede,
            suministros,
            conformidades,
            materiales: suministros.join(" · "),
            homologado: true,
            email,
            telefono,
            contacto: email
          };
          DIRECTORIO_PROVEEDORES.unshift(newPrv);
          showToast(`✓ Proveedor "${newPrv.nombre}" añadido al directorio homologado`);
        }
      } else {
        const actividad = (form.get("actividad") || "").trim() || "Constructora Ferroviaria";

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
            contacto: email
          };
          DIRECTORIO_CLIENTES.unshift(newCli);
          showToast(`✓ Cliente "${newCli.nombre}" añadido al directorio`);
        }
      }
      close();
      renderApp();
    });
  }

  function openAddEntityModal() {
    openAddOrEditEntityModal(null, directorioTypeFilter === "clientes" ? "cliente" : "proveedor");
  }

  // Navegación y acciones delegadas globales
  document.addEventListener("click", e => {
    const go = e.target.closest("[data-go]");
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

    const createNoticeBtn = e.target.closest("[data-open-create-notice-modal]");
    if (createNoticeBtn) {
      e.preventDefault();
      openCreateNoticeModal(createNoticeBtn.dataset.openCreateNoticeModal || null);
      return;
    }

    const openInc = e.target.closest("[data-open-incident-modal]");
    if (openInc) {
      e.preventDefault();
      openIncidentModal(openInc.dataset.openIncidentModal);
      return;
    }

    const medBtn = e.target.closest("[data-open-mediation-modal]");
    if (medBtn) {
      e.preventDefault();
      openMediationModal(medBtn.dataset.openMediationModal, medBtn.dataset.incidentId);
      return;
    }

    const signBtn = e.target.closest("[data-sign-incident-party]");
    if (signBtn) {
      e.preventDefault();
      openSignIncidentModal(signBtn.dataset.expId, signBtn.dataset.incidentId, signBtn.dataset.signIncidentParty);
      return;
    }

    const silenceBtn = e.target.closest("[data-apply-silence-incident]");
    if (silenceBtn) {
      e.preventDefault();
      applySilencePositive(silenceBtn.dataset.applySilenceIncident, silenceBtn.dataset.incidentId);
      return;
    }

    const consolBtn = e.target.closest("[data-consolidate-addendum]");
    if (consolBtn) {
      e.preventDefault();
      consolidateAddendum(consolBtn.dataset.consolidateAddendum, consolBtn.dataset.incidentId);
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

  window.addEventListener("hashchange", renderApp);

  // Inicializar al cargar
  if (!location.hash) {
    location.hash = "#admin/expedientes";
  }
  renderApp();
})();
