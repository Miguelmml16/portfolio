import type { Lang } from "@/lib/i18n";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    langToggle: { label: "ES", ariaLabel: "Switch to Spanish" },
    hero: {
      badge: "Open to internships & software projects",
      role: "Computer Science Student & Software Developer",
      description:
        "Computer Science student at ESPOL. I build software across the stack — AI agents, FastAPI/Django backends and data-driven interfaces — and I care about systems that stay honest about the data they show. Recently won the Agentic Scale 2026 hackathon.",
      viewProjects: "View projects",
      downloadCV: "Download CV",
    },
    about: {
      eyebrow: "About",
      title: "Who I am",
      paragraphs: [
        "I'm a Computer Science student at ESPOL in Guayaquil, Ecuador. I like taking a problem from a rough idea all the way to a working product — designing the data model, building the API, and putting a clean interface on top.",
        "My recent work sits at the intersection of AI and solid backend engineering. In Brokeate, the project my team won the Agentic Scale 2026 hackathon with, we built a robo-advisor where a LangGraph agent explains investment proposals but is never allowed to invent a number: every figure is computed in Postgres and validated against a closed context before it reaches the user.",
        "I also enjoy the fundamentals — implementing graph algorithms (Dijkstra, Kosaraju, Kruskal) in Java and visualizing them, or modeling a full library system in Django. I'm keen to keep learning, contribute to real projects, and grow through internships and hands-on collaboration.",
      ],
      facts: [
        {
          title: "Full-stack builder",
          body: "From React Native and React front-ends to FastAPI and Django back-ends.",
        },
        {
          title: "AI-focused",
          body: "Conversational agents with LangGraph and strict anti-hallucination guardrails.",
        },
        {
          title: "Data at the core",
          body: "PostgreSQL, Supabase and MySQL — business rules enforced in the database.",
        },
        {
          title: "Strong CS fundamentals",
          body: "Graphs, algorithms and data structures implemented and tested from scratch.",
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      description:
        "A few projects that show how I work across AI, backend and the fundamentals. Each opens for a deeper technical look.",
      all: "All",
      featured: "Featured",
      details: "Details",
      viewRepository: "View Repository",
      liveDemo: "Live Demo",
      addScreenshot: "[Add project screenshot]",
      categories: {
        AI: "AI",
        "Full Stack": "Full Stack",
        Backend: "Backend",
        Frontend: "Frontend",
        Java: "Java",
        "Data Structures": "Data Structures",
      } as Record<string, string>,
      modal: {
        problem: "The problem",
        overview: "Overview",
        keyFeatures: "Key features",
        technicalHighlights: "Technical highlights",
        myRole: "My role",
        techStack: "Tech stack",
        close: "Close",
      },
      items: {
        brokeate: {
          name: "Brokeate",
          tagline: "Robo-advisor with a human advisor in the loop.",
          problem:
            "Automated investment advice tends to invent numbers and act without oversight. Brokeate keeps a human advisor in control and forbids the AI from producing any figure the database can't back.",
          description:
            "A robo-advisory platform, built for a financial-AI hackathon (Track 3: Robo-Advisory). A client answers a risk questionnaire, the system scores their profile in the database, assembles a portfolio proposal from the bank's catalog, and a human advisor approves, edits or rejects it before it becomes final. A LangGraph conversational agent explains the numbers but never invents them.",
          features: [
            "Risk profiling scored in Postgres (not in the client or the LLM) with a transparent answer → points → threshold breakdown",
            "Explainable portfolio proposals with USD amounts computed in SQL, expected risk and per-issuer credit ratings",
            "Advisor review queue with deterministic flags (approve / edit / reject), each decision audited with date, rules version and owner",
            "Sub-accounts that split total capital across goals, enforced by a Postgres trigger against race conditions",
            "LangGraph agent with a 3-route state graph and anti-hallucination guardrails; provider-swappable (Gemini / OpenAI / Anthropic)",
            "External-markets module (Alpha Vantage) with a 1-hour cache and deterministic simulated fallback, plus a GNews feed and a Twilio WhatsApp bot",
          ],
          role:
            "Developer on the winning team. The work was shared equally across the group — I contributed to both the front-end (the React Native app and the React web client) and the FastAPI + Postgres backend, as well as the AI layer (the LangGraph agent and its anti-hallucination guardrails).",
          highlights: [
            "Anti-hallucination by construction: every generated text is validated against a closed 'allowed context'; if the model invents a value the text is discarded, retried once, then falls back to a deterministic template.",
            "Business rules enforced in the database via triggers and GENERATED columns, so guarantees hold even against direct SQL — not just application code.",
            "Clean layered backend: routes handle only HTTP, controllers hold business logic, services own the AI engine — with a pytest suite that runs against the real seeded database.",
          ],
        },
        "gestion-de-aeropuertos": {
          name: "Airport Management (Graphs)",
          tagline: "Graph algorithms over airports and flight routes, visualized live.",
          problem:
            "Classic graph algorithms are hard to grasp as pseudocode. This desktop app models airports and flights as a directed graph and animates each algorithm on an interactive canvas.",
          description:
            "A Java 21 + JavaFX desktop application that models airports and flight routes as a directed graph with an adjacency list. It manages the data, computes routes, and runs and visualizes classic graph algorithms on an interactive, zoomable canvas. Built for a Data Structures course as a refactored, extended version of the original project.",
          features: [
            "Directed graph with adjacency list — O(1) vertex lookup backed by a LinkedHashMap",
            "BFS, DFS, Dijkstra (priority queue with lazy deletion), weakly/strongly connected components (Kosaraju) and minimum spanning tree (Kruskal + Union-Find)",
            "Strategy pattern for edge weight — switch between time, distance and cost, recomputing every weighted algorithm on the fly",
            "Interactive canvas: drag nodes, zoom, pan, and color-coded animations per algorithm",
            "CSV import/export, and PBKDF2-HMAC-SHA256 hashed user accounts persisted to disk",
          ],
          role:
            "Sole author. Designed the data-structures core, the JavaFX UI and the JUnit 5 test suite.",
          highlights: [
            "Data-structures core kept fully independent of JavaFX, which makes it directly unit-testable (GraphALTest covers Dijkstra, BFS/DFS, components and MST).",
            "Layered architecture (domain / graph / index / repo / service / persistence / auth / ui) with a single service orchestrating the graph, a TreeMap/TreeSet index and the weight strategy.",
            "Concrete algorithmic improvements over the original: O(1) vertex search, Dijkstra without O(n) queue removal, and passwords hashed with salt instead of stored in plain text.",
          ],
        },
        bibliored: {
          name: "BiblioRed",
          tagline: "Django library-management system with full CRUD and reporting.",
          problem:
            "Community libraries need to track their catalog, members and loans in one place. BiblioRed provides a complete web system to manage all three.",
          description:
            "A Django web application for managing community libraries, organized into three modules — catalog, members and loans — plus a reports dashboard, authentication and full CRUD. Built for a Web & Mobile Application Development course, with a Bootstrap 5 interface and a clean SQLite → MySQL migration path.",
          features: [
            "Three Django apps: catalog (categories, authors, books, copies), members and loans",
            "Full CRUD across every entity plus a login-protected reports dashboard",
            "Automatic business rule: registering a loan marks the copy as borrowed and computes the +15-day due date; a return flips it back to available",
            "Authentication and Django admin panel",
            "Configurable persistence — starts on SQLite, migrates to MySQL by switching the settings block",
          ],
          role:
            "Author. Modeled the domain, implemented the CRUD modules and the loan/return business logic in the model layer.",
          highlights: [
            "Loan lifecycle handled directly in the model's save() method (no signals), as required by the assignment.",
            "Clear separation into focused apps, each owning its own models.",
            "Database-agnostic design with a documented migration to MySQL.",
          ],
        },
      } as Record<
        string,
        {
          name: string;
          tagline: string;
          problem: string;
          description: string;
          features: string[];
          role: string;
          highlights: string[];
        }
      >,
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical toolbox",
      description:
        "Grouped by how confidently I use each — every item here is backed by a project or coursework, not a self-assigned percentage.",
      legend: {
        main: "Main tools",
        familiar: "Familiar with",
        learning: "Currently learning",
      },
      categories: {
        Languages: "Languages",
        Frontend: "Frontend",
        Backend: "Backend",
        Databases: "Databases",
        AI: "AI",
        Testing: "Testing",
        "Tools & DevOps": "Tools & DevOps",
      } as Record<string, string>,
    },
    experience: {
      eyebrow: "Experience",
      title: "Achievements & involvement",
      description:
        "Hackathon wins, community work and the academic projects behind the skills above.",
      items: [
        {
          title: "Winner — Agentic Scale 2026 Hackathon",
          org: "ESPOL · organized by TAWS",
          period: "2026",
          description:
            "Part of the winning team with Brokeate, a robo-advisory platform pairing a LangGraph AI agent with a human advisor and database-enforced anti-hallucination guardrails.",
        },
        {
          title: "Student Volunteer",
          org: "IEEE ESPOL Student Branch — Computer Society",
          period: "2026 — Present",
          description:
            "Volunteer in the IEEE ESPOL Computer Society student branch, taking part in the community's activities and events.",
        },
        {
          title: "Airport Management — Graph Algorithms",
          org: "Data Structures course · ESPOL",
          period: "Academic project",
          description:
            "Java 21 + JavaFX application implementing and visualizing BFS, DFS, Dijkstra, connected components and MST over a directed graph, with a JUnit 5 test suite.",
        },
        {
          title: "BiblioRed — Library Management System",
          org: "Web & Mobile App Development course · ESPOL",
          period: "Academic project",
          description:
            "Django system to manage a community library's catalog, members and loans, with a reports dashboard, authentication and full CRUD.",
        },
        {
          title: "B.Sc. Computer Science (in progress)",
          org: "ESPOL — Escuela Superior Politécnica del Litoral",
          period: "Guayaquil, Ecuador",
          description:
            "Studying software development, artificial intelligence, data structures, databases and software engineering.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something",
      description:
        "Open to internships and software projects. Send a message or reach me directly on any channel below.",
      channels: {
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        location: "Location",
      },
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        namePlaceholder: "Jane Doe",
        emailPlaceholder: "jane@company.com",
        messagePlaceholder: "Tell me about the role, project or idea…",
        send: "Send message",
        sending: "Sending…",
        successMsg: "Thanks — I'll get back to you soon.",
        errorDefault:
          "Something went wrong sending your message. Please try again.",
        networkError: "Network error. Please check your connection and retry.",
        note: "Your details are only used to reply. Nothing is stored in the browser.",
      },
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email.",
        emailInvalid: "That email looks invalid.",
        message: "Please write a message.",
        messageShort: "A little more detail, please (10+ characters).",
      },
    },
    footer: {
      description:
        "Computer Science student at ESPOL, building software that solves real problems — from AI agents to solid backends.",
      rights: (year: number) =>
        `© ${year} Miguel Medina. Built to keep shipping real, useful software.`,
      madeWithPrefix: "Made with",
      madeWithSuffix: "using Next.js & Tailwind CSS",
    },
    github: {
      eyebrow: "Activity",
      title: "On GitHub",
      description:
        "Public repositories, most-used languages and a few highlights. Data comes straight from the GitHub API.",
      publicRepos: (n: number) => `${n} public repositories`,
      mostUsedLanguages: "Most used languages",
      visitProfile: "Visit full profile",
      liveDataFallback:
        "Live language data will appear once deployed. Highlights are shown alongside.",
      repos: {
        "BROKEATE-BACKEND":
          "Robo-advisory API — FastAPI + Postgres + a LangGraph agent with anti-hallucination guardrails.",
        "Gestion-de-Aeropuertos":
          "Java + JavaFX app that visualizes graph algorithms over airports and flight routes.",
        BIblioRed:
          "Django library-management system: catalog, members, loans and reporting.",
      } as Record<string, string>,
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      experience: "Experiencia",
      contact: "Contacto",
    },
    langToggle: { label: "EN", ariaLabel: "Cambiar a inglés" },
    hero: {
      badge: "Abierto a pasantías y proyectos de software",
      role: "Estudiante de Ciencias de la Computación y Desarrollador de Software",
      description:
        "Estudiante de Ciencias de la Computación en ESPOL. Construyo software en todo el stack — agentes de IA, backends con FastAPI/Django e interfaces basadas en datos — y me importa que los sistemas sean honestos con los datos que muestran. Recientemente gané el hackathon Agentic Scale 2026.",
      viewProjects: "Ver proyectos",
      downloadCV: "Descargar CV",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Quién soy",
      paragraphs: [
        "Soy estudiante de Ciencias de la Computación en ESPOL, en Guayaquil, Ecuador. Me gusta llevar un problema desde una idea inicial hasta un producto funcional — diseñando el modelo de datos, construyendo la API y poniendo una interfaz limpia por encima.",
        "Mi trabajo reciente está en la intersección entre IA e ingeniería de backend sólida. En Brokeate, el proyecto con el que mi equipo ganó el hackathon Agentic Scale 2026, construimos un roboasesor donde un agente de LangGraph explica propuestas de inversión pero nunca puede inventar una cifra: cada número se calcula en Postgres y se valida contra un contexto cerrado antes de llegar al usuario.",
        "También disfruto los fundamentos — implementar algoritmos de grafos (Dijkstra, Kosaraju, Kruskal) en Java y visualizarlos, o modelar un sistema de biblioteca completo en Django. Me interesa seguir aprendiendo, contribuir a proyectos reales y crecer a través de pasantías y colaboración práctica.",
      ],
      facts: [
        {
          title: "Desarrollador full-stack",
          body: "Desde front-ends en React Native y React hasta back-ends en FastAPI y Django.",
        },
        {
          title: "Enfocado en IA",
          body: "Agentes conversacionales con LangGraph y estrictas salvaguardas anti-alucinación.",
        },
        {
          title: "Los datos en el centro",
          body: "PostgreSQL, Supabase y MySQL — reglas de negocio aplicadas en la base de datos.",
        },
        {
          title: "Fundamentos sólidos de CS",
          body: "Grafos, algoritmos y estructuras de datos implementados y probados desde cero.",
        },
      ],
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Trabajo seleccionado",
      description:
        "Algunos proyectos que muestran cómo trabajo en IA, backend y los fundamentos. Cada uno se abre para un vistazo técnico más profundo.",
      all: "Todos",
      featured: "Destacado",
      details: "Detalles",
      viewRepository: "Ver repositorio",
      liveDemo: "Demo en vivo",
      addScreenshot: "[Agregar captura del proyecto]",
      categories: {
        AI: "IA",
        "Full Stack": "Full Stack",
        Backend: "Backend",
        Frontend: "Frontend",
        Java: "Java",
        "Data Structures": "Estructuras de Datos",
      } as Record<string, string>,
      modal: {
        problem: "El problema",
        overview: "Resumen",
        keyFeatures: "Funcionalidades clave",
        technicalHighlights: "Aspectos técnicos destacados",
        myRole: "Mi rol",
        techStack: "Stack tecnológico",
        close: "Cerrar",
      },
      items: {
        brokeate: {
          name: "Brokeate",
          tagline: "Roboasesor con un asesor humano en el circuito de decisión.",
          problem:
            "El asesoramiento de inversión automatizado tiende a inventar cifras y actuar sin supervisión. Brokeate mantiene a un asesor humano en control y prohíbe que la IA produzca cualquier cifra que la base de datos no pueda respaldar.",
          description:
            "Una plataforma de roboasesoría, construida para un hackathon de IA financiera (Track 3: Robo-Advisory). Un cliente responde un cuestionario de riesgo, el sistema califica su perfil en la base de datos, arma una propuesta de portafolio a partir del catálogo del banco, y un asesor humano la aprueba, edita o rechaza antes de que sea definitiva. Un agente conversacional con LangGraph explica las cifras pero nunca las inventa.",
          features: [
            "Perfilamiento de riesgo calculado en Postgres (no en el cliente ni en el LLM), con un desglose transparente de respuesta → puntos → umbral",
            "Propuestas de portafolio explicables con montos en USD calculados en SQL, riesgo esperado y calificaciones crediticias por emisor",
            "Cola de revisión del asesor con estados deterministas (aprobar / editar / rechazar), cada decisión auditada con fecha, versión de reglas y responsable",
            "Subcuentas que dividen el capital total entre metas, garantizado por un trigger de Postgres contra condiciones de carrera",
            "Agente LangGraph con un grafo de estados de 3 rutas y salvaguardas anti-alucinación; intercambiable entre proveedores (Gemini / OpenAI / Anthropic)",
            "Módulo de mercados externos (Alpha Vantage) con caché de 1 hora y respaldo simulado determinista, más un feed de GNews y un bot de WhatsApp con Twilio",
          ],
          role:
            "Desarrollador en el equipo ganador. El trabajo se repartió equitativamente entre el grupo — contribuí tanto al front-end (la app en React Native y el cliente web en React) como al backend en FastAPI + Postgres, además de la capa de IA (el agente LangGraph y sus salvaguardas anti-alucinación).",
          highlights: [
            "Anti-alucinación por diseño: cada texto generado se valida contra un 'contexto permitido' cerrado; si el modelo inventa un valor, el texto se descarta, se reintenta una vez y luego recurre a una plantilla determinista.",
            "Reglas de negocio aplicadas en la base de datos mediante triggers y columnas GENERATED, de modo que las garantías se mantienen incluso frente a SQL directo, no solo desde el código de la aplicación.",
            "Backend en capas bien definidas: las rutas solo manejan HTTP, los controladores contienen la lógica de negocio, los servicios son dueños del motor de IA — con un conjunto de pruebas en pytest que corre contra la base de datos real con datos de prueba.",
          ],
        },
        "gestion-de-aeropuertos": {
          name: "Gestión de Aeropuertos (Grafos)",
          tagline:
            "Algoritmos de grafos sobre aeropuertos y rutas de vuelo, visualizados en vivo.",
          problem:
            "Los algoritmos clásicos de grafos son difíciles de entender como pseudocódigo. Esta aplicación de escritorio modela aeropuertos y vuelos como un grafo dirigido y anima cada algoritmo en un lienzo interactivo.",
          description:
            "Una aplicación de escritorio en Java 21 + JavaFX que modela aeropuertos y rutas de vuelo como un grafo dirigido con lista de adyacencia. Gestiona los datos, calcula rutas, y ejecuta y visualiza algoritmos clásicos de grafos en un lienzo interactivo con zoom. Construida para un curso de Estructuras de Datos como una versión refactorizada y extendida del proyecto original.",
          features: [
            "Grafo dirigido con lista de adyacencia — búsqueda de vértices O(1) respaldada por un LinkedHashMap",
            "BFS, DFS, Dijkstra (cola de prioridad con eliminación diferida), componentes débil/fuertemente conexos (Kosaraju) y árbol de expansión mínima (Kruskal + Union-Find)",
            "Patrón Strategy para el peso de las aristas — cambia entre tiempo, distancia y costo, recalculando cada algoritmo ponderado al instante",
            "Lienzo interactivo: arrastra nodos, haz zoom, desplázate, y animaciones con código de colores por algoritmo",
            "Importación/exportación CSV, y cuentas de usuario con hash PBKDF2-HMAC-SHA256 persistidas en disco",
          ],
          role:
            "Autor único. Diseñé el núcleo de estructuras de datos, la interfaz en JavaFX y el conjunto de pruebas en JUnit 5.",
          highlights: [
            "El núcleo de estructuras de datos se mantiene totalmente independiente de JavaFX, lo que lo hace directamente testeable con pruebas unitarias (GraphALTest cubre Dijkstra, BFS/DFS, componentes y MST).",
            "Arquitectura en capas (domain / graph / index / repo / service / persistence / auth / ui) con un único servicio orquestando el grafo, un índice TreeMap/TreeSet y la estrategia de peso.",
            "Mejoras algorítmicas concretas sobre el original: búsqueda de vértices O(1), Dijkstra sin eliminación O(n) de la cola, y contraseñas con hash y sal en lugar de texto plano.",
          ],
        },
        bibliored: {
          name: "BiblioRed",
          tagline:
            "Sistema de gestión de bibliotecas en Django con CRUD completo y reportes.",
          problem:
            "Las bibliotecas comunitarias necesitan llevar el control de su catálogo, socios y préstamos en un solo lugar. BiblioRed ofrece un sistema web completo para gestionar los tres.",
          description:
            "Una aplicación web en Django para gestionar bibliotecas comunitarias, organizada en tres módulos — catálogo, socios y préstamos — más un panel de reportes, autenticación y CRUD completo. Construida para un curso de Desarrollo de Aplicaciones Web y Móviles, con una interfaz en Bootstrap 5 y una ruta de migración limpia de SQLite a MySQL.",
          features: [
            "Tres apps de Django: catálogo (categorías, autores, libros, ejemplares), socios y préstamos",
            "CRUD completo en todas las entidades, más un panel de reportes protegido por inicio de sesión",
            "Regla de negocio automática: registrar un préstamo marca el ejemplar como prestado y calcula la fecha de vencimiento a +15 días; una devolución lo vuelve a marcar como disponible",
            "Autenticación y panel de administración de Django",
            "Persistencia configurable — inicia en SQLite y migra a MySQL cambiando el bloque de configuración",
          ],
          role:
            "Autor. Modelé el dominio, implementé los módulos CRUD y la lógica de negocio de préstamo/devolución en la capa de modelos.",
          highlights: [
            "El ciclo de vida del préstamo se maneja directamente en el método save() del modelo (sin signals), como lo requería la asignación.",
            "Separación clara en apps enfocadas, cada una dueña de sus propios modelos.",
            "Diseño agnóstico de base de datos con una migración documentada a MySQL.",
          ],
        },
      } as Record<
        string,
        {
          name: string;
          tagline: string;
          problem: string;
          description: string;
          features: string[];
          role: string;
          highlights: string[];
        }
      >,
    },
    skills: {
      eyebrow: "Habilidades",
      title: "Caja de herramientas técnica",
      description:
        "Agrupadas según qué tan cómodo me siento usando cada una — cada elemento está respaldado por un proyecto o curso, no por un porcentaje autoasignado.",
      legend: {
        main: "Herramientas principales",
        familiar: "Con experiencia",
        learning: "Aprendiendo actualmente",
      },
      categories: {
        Languages: "Lenguajes",
        Frontend: "Frontend",
        Backend: "Backend",
        Databases: "Bases de datos",
        AI: "IA",
        Testing: "Pruebas",
        "Tools & DevOps": "Herramientas y DevOps",
      } as Record<string, string>,
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Logros y participación",
      description:
        "Victorias en hackathons, trabajo comunitario y los proyectos académicos detrás de las habilidades anteriores.",
      items: [
        {
          title: "Ganador — Hackathon Agentic Scale 2026",
          org: "ESPOL · organizado por TAWS",
          period: "2026",
          description:
            "Parte del equipo ganador con Brokeate, una plataforma de roboasesoría que combina un agente de IA con LangGraph y un asesor humano, con salvaguardas anti-alucinación reforzadas en la base de datos.",
        },
        {
          title: "Voluntario estudiantil",
          org: "Rama Estudiantil IEEE ESPOL — Computer Society",
          period: "2026 — Presente",
          description:
            "Voluntario en la rama estudiantil de IEEE ESPOL Computer Society, participando en las actividades y eventos de la comunidad.",
        },
        {
          title: "Gestión de Aeropuertos — Algoritmos de Grafos",
          org: "Curso de Estructuras de Datos · ESPOL",
          period: "Proyecto académico",
          description:
            "Aplicación en Java 21 + JavaFX que implementa y visualiza BFS, DFS, Dijkstra, componentes conexos y MST sobre un grafo dirigido, con un conjunto de pruebas en JUnit 5.",
        },
        {
          title: "BiblioRed — Sistema de Gestión de Bibliotecas",
          org: "Curso de Desarrollo de Aplicaciones Web y Móviles · ESPOL",
          period: "Proyecto académico",
          description:
            "Sistema en Django para gestionar el catálogo, los socios y los préstamos de una biblioteca comunitaria, con un panel de reportes, autenticación y CRUD completo.",
        },
        {
          title: "Lic. en Ciencias de la Computación (en curso)",
          org: "ESPOL — Escuela Superior Politécnica del Litoral",
          period: "Guayaquil, Ecuador",
          description:
            "Estudiando desarrollo de software, inteligencia artificial, estructuras de datos, bases de datos e ingeniería de software.",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Construyamos algo",
      description:
        "Abierto a pasantías y proyectos de software. Envía un mensaje o contáctame directamente por cualquiera de los canales de abajo.",
      channels: {
        email: "Correo",
        github: "GitHub",
        linkedin: "LinkedIn",
        location: "Ubicación",
      },
      form: {
        nameLabel: "Nombre",
        emailLabel: "Correo electrónico",
        messageLabel: "Mensaje",
        namePlaceholder: "Juana Pérez",
        emailPlaceholder: "juana@empresa.com",
        messagePlaceholder: "Cuéntame sobre el puesto, proyecto o idea…",
        send: "Enviar mensaje",
        sending: "Enviando…",
        successMsg: "Gracias — te responderé pronto.",
        errorDefault:
          "Algo salió mal al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        networkError: "Error de red. Verifica tu conexión e inténtalo de nuevo.",
        note: "Tus datos solo se usan para responderte. No se almacena nada en el navegador.",
      },
      errors: {
        name: "Por favor ingresa tu nombre.",
        email: "Por favor ingresa tu correo electrónico.",
        emailInvalid: "Ese correo no parece válido.",
        message: "Por favor escribe un mensaje.",
        messageShort: "Un poco más de detalle, por favor (10+ caracteres).",
      },
    },
    footer: {
      description:
        "Estudiante de Ciencias de la Computación en ESPOL, construyendo software que resuelve problemas reales — desde agentes de IA hasta backends sólidos.",
      rights: (year: number) =>
        `© ${year} Miguel Medina. Construido para seguir entregando software real y útil.`,
      madeWithPrefix: "Hecho con",
      madeWithSuffix: "usando Next.js y Tailwind CSS",
    },
    github: {
      eyebrow: "Actividad",
      title: "En GitHub",
      description:
        "Repositorios públicos, lenguajes más usados y algunos destacados. Los datos provienen directamente de la API de GitHub.",
      publicRepos: (n: number) => `${n} repositorios públicos`,
      mostUsedLanguages: "Lenguajes más usados",
      visitProfile: "Ver perfil completo",
      liveDataFallback:
        "Los datos de lenguajes en vivo aparecerán una vez desplegado. Mientras tanto, se muestran los destacados.",
      repos: {
        "BROKEATE-BACKEND":
          "API de roboasesoría — FastAPI + Postgres + un agente LangGraph con salvaguardas anti-alucinación.",
        "Gestion-de-Aeropuertos":
          "Aplicación en Java + JavaFX que visualiza algoritmos de grafos sobre aeropuertos y rutas de vuelo.",
        BIblioRed:
          "Sistema de gestión de bibliotecas en Django: catálogo, socios, préstamos y reportes.",
      } as Record<string, string>,
    },
  },
} satisfies Record<Lang, unknown>;

export function getTranslation(lang: Lang) {
  return translations[lang];
}
