/* =====================================================
   VISION MIND — BASE DE CONOCIMIENTO DEL CHATBOT
   Edita este archivo para entrenar al asistente.
   ===================================================== */

window.CONOCIMIENTO = {

  nombreBot: "Nexus IA — Vision Mind",
  avatarEmoji: "🤖",

  bienvenida: "¡Hola! Soy **Nexus**, el asistente inteligente de **Vision Mind**. 🤖✨\nPuedo ayudarte con información sobre nuestros servicios, experiencias VR, carreras profesionales y mucho más. ¿En qué te puedo ayudar hoy?",

  noEntiendo: "Hmm, no encontré información exacta sobre eso. 🤔 Puedes escribirnos directamente a **visionmind@correo.com** o intentar con una de estas opciones:",

  sugerencias: ["¿Qué es Vision Mind?", "Ver servicios", "Experiencias VR", "Contacto"],

  temas: [
    /* ─── EMPRESA ─── */
    {
      preguntas: ["que es vision mind", "quienes son", "de que trata", "empresa", "sobre ustedes", "a que se dedican", "que hacen", "vision mind que es", "informacion de la empresa"],
      respuesta: "**Vision Mind** es una empresa de tecnología inmersiva especializada en **Realidad Virtual**, **Inteligencia Artificial** y **Desarrollo Web 3D**. 🚀\n\nNuestra misión es llevar el aprendizaje y la transformación digital al siguiente nivel, permitiendo a personas y empresas *Simular sin riesgos* y *Descubrir su futuro* a través de experiencias hiperrealistas.",
      accion: { texto: "Explorar la plataforma", url: "#inicio" }
    },

    /* ─── MISIÓN Y VISIÓN ─── */
    {
      preguntas: ["mision", "vision", "valores", "proposito", "objetivo de la empresa", "filosofia"],
      respuesta: "🎯 **Nuestra Misión:** Democratizar la formación profesional mediante simulaciones de realidad virtual sin riesgos, accesibles desde cualquier dispositivo.\n\n🌐 **Nuestra Visión:** Ser la plataforma líder en Latinoamérica para educación inmersiva y transformación digital empresarial con IA.\n\n💡 **Valores:** Innovación · Accesibilidad · Impacto Social · Tecnología de Vanguardia"
    },

    /* ─── SERVICIOS GENERALES ─── */
    {
      preguntas: ["servicios", "que ofrecen", "productos", "soluciones", "que tienen", "portafolio", "catalogo"],
      respuesta: "En **Vision Mind** ofrecemos tres grandes líneas de servicio: 🏆\n\n🥽 **1. Realidad Virtual** — Simulaciones 3D interactivas para educación y empresas\n💻 **2. Desarrollo Web & 3D** — Plataformas WebGL/A-Frame de alto impacto\n🤖 **3. Innovación Digital con IA** — Transformación digital impulsada por inteligencia artificial\n\n¿Sobre cuál quieres saber más?",
      accion: { texto: "Ver todos los servicios", url: "#servicios" }
    },

    /* ─── REALIDAD VIRTUAL ─── */
    {
      preguntas: ["realidad virtual", "vr", "simulacion", "experiencia vr", "inmersiva", "3d", "entorno virtual", "visor", "webvr", "aframe"],
      respuesta: "Nuestras **experiencias de Realidad Virtual** son 100% accesibles desde el navegador con tecnología **WebVR y A-Frame**. 🥽\n\nPuedes explorar entornos como:\n• 🩺 Medicina — sala clínica interactiva\n• 🍳 Gastronomía — cocina profesional 3D\n• ⚖️ Derecho — sala de audiencias judicial\n• ✈️ Carrera de Piloto — cabina de simulación\n• 🌐 Recorrido 360° — tour virtual\n\nSin instalar nada, desde cualquier dispositivo.",
      accion: { texto: "Explorar experiencias VR", url: "#vr" }
    },

    /* ─── MEDICINA ─── */
    {
      preguntas: ["medicina", "medico", "salud", "clinica", "hospital", "ciencias de la salud", "simulacion medica"],
      respuesta: "🩺 El entorno de **Medicina** de Vision Mind te sumerge en una sala clínica virtual interactiva donde puedes explorar equipos médicos, protocolos y procedimientos sin ningún riesgo.\n\nIdeal para estudiantes de ciencias de la salud que buscan práctica antes de entrar al entorno real.",
      accion: { texto: "Ver simulación de Medicina", url: "#vr" }
    },

    /* ─── GASTRONOMÍA ─── */
    {
      preguntas: ["gastronomia", "cocina", "chef", "culinario", "alimentos", "restaurante", "cocinar"],
      respuesta: "🍳 El escenario de **Gastronomía** recrea una cocina profesional 3D de alta fidelidad donde puedes familiarizarte con utensilios, técnicas y flujos de trabajo culinarios antes de pisarla en la vida real.",
      accion: { texto: "Ver simulación de Gastronomía", url: "#vr" }
    },

    /* ─── DERECHO ─── */
    {
      preguntas: ["derecho", "abogado", "juridico", "juicio", "tribunal", "audiencia", "ley", "sala de audiencias", "fiscalia", "defensa"],
      respuesta: "⚖️ El entorno de **Derecho** recrea una sala de audiencias judiciales colombiana de forma hiperrealista, con el estrado del juez, la fiscalía, la defensa, testigos y elementos procesales interactivos.\n\nPerfecto para estudiantes de ciencias jurídicas que quieren practicar técnica oral y argumentación.",
      accion: { texto: "Ver simulación de Derecho", url: "#vr" }
    },

    /* ─── PILOTO ─── */
    {
      preguntas: ["piloto", "aviacion", "vuelo", "avion", "cabina", "aeronautica", "aerolinea"],
      respuesta: "✈️ La simulación de **Carrera de Piloto** te introduce en una cabina de vuelo interactiva con instrumentos reales.\n\nUna experiencia única para explorar la aeronáutica sin salir de tu pantalla.",
      accion: { texto: "Ver simulación de Piloto", url: "#vr" }
    },

    /* ─── RECORRIDO 360 ─── */
    {
      preguntas: ["recorrido", "360", "tour virtual", "panoramico", "recorrido 360"],
      respuesta: "🌐 El **Recorrido 360°** de Vision Mind te permite navegar por espacios virtuales de manera panorámica e inmersiva, ideal para presentaciones de instalaciones, campus o espacios comerciales.",
      accion: { texto: "Iniciar Recorrido 360°", url: "#vr" }
    },

    /* ─── DESARROLLO WEB ─── */
    {
      preguntas: ["desarrollo web", "pagina web", "sitio web", "webgl", "plataforma digital", "diseño web", "aplicacion web"],
      respuesta: "💻 En **Desarrollo Web & 3D** construimos sitios modernos y plataformas **WebGL/A-Frame** adaptables a cualquier dispositivo.\n\nNuestros proyectos combinan máxima fluidez visual con integración de IA, logrando alto impacto sin sacrificar rendimiento.",
      accion: { texto: "Ver servicios digitales", url: "#servicios" }
    },

    /* ─── INTELIGENCIA ARTIFICIAL ─── */
    {
      preguntas: ["inteligencia artificial", "ia", "ai", "chatbot", "automatizacion", "machine learning", "transformacion digital", "innovacion"],
      respuesta: "🤖 Vision Mind lidera la **innovación con IA** integrando asistentes inteligentes, automatización de procesos y simuladores potenciados por modelos de lenguaje.\n\nNuestra plataforma ya incorpora IA para orientar vocaciones, responder preguntas y personalizar la experiencia de cada usuario.",
      accion: { texto: "Conocer más sobre IA", url: "#servicios" }
    },

    /* ─── CARRERAS PROFESIONALES ─── */
    {
      preguntas: ["carreras", "profesiones", "vocaciones", "que carreras tienen", "orientacion vocacional", "carrera profesional", "estudiar"],
      respuesta: "🎓 Vision Mind tiene simuladores para explorar estas carreras:\n\n• 🩺 Medicina\n• 🍳 Gastronomía\n• ⚖️ Derecho\n• ✈️ Aviación / Piloto\n\nCada entorno te permite vivir la profesión antes de elegirla, orientando tu decisión vocacional con evidencia real.",
      accion: { texto: "Explorar carreras VR", url: "#vr" }
    },

    /* ─── PRECIOS / COTIZACIÓN ─── */
    {
      preguntas: ["precio", "costo", "cuanto vale", "tarifa", "cotizacion", "valor", "cuanto cuesta", "presupuesto", "planes"],
      respuesta: "Los precios de nuestros proyectos dependen del tipo de solución, alcance y personalización requerida. 💰\n\nEscríbenos para recibir una **cotización sin costo** adaptada a tus necesidades:",
      accion: { texto: "Solicitar cotización", url: "mailto:visionmind@correo.com?subject=Cotización Vision Mind" }
    },

    /* ─── CONTACTO ─── */
    {
      preguntas: ["contacto", "como los contacto", "telefono", "correo", "email", "whatsapp", "hablar con alguien", "asesor", "comunicarme", "escribirles"],
      respuesta: "¡Con gusto te conectamos! 📬 Puedes contactarnos por:\n\n📧 **Correo:** visionmind@correo.com\n📞 **Teléfono:** +57 300 000 0000\n\nRespondemos en horario de atención: lunes a viernes, 8:00 a.m. – 6:00 p.m.",
      accion: { texto: "Enviar correo", url: "mailto:visionmind@correo.com" }
    },

    /* ─── HORARIO ─── */
    {
      preguntas: ["horario", "a que hora abren", "cuando atienden", "dias de atencion", "horario de atencion"],
      respuesta: "⏰ Atendemos de **lunes a viernes, de 8:00 a.m. a 6:00 p.m.** (hora Colombia).\n\nFuera de ese horario puedes dejarnos un mensaje en **visionmind@correo.com** y te responderemos al inicio del siguiente día hábil."
    },

    /* ─── UBICACIÓN ─── */
    {
      preguntas: ["donde estan", "direccion", "ubicacion", "como llego", "en que ciudad", "colombia", "bogota"],
      respuesta: "📍 Estamos en **Colombia** y atendemos de forma virtual a todo el país y Latinoamérica.\n\nTodos nuestros servicios son 100% digitales, por lo que puedes acceder desde cualquier lugar sin necesidad de visita presencial."
    },

    /* ─── INICIAR SESIÓN / CUENTA ─── */
    {
      preguntas: ["iniciar sesion", "login", "cuenta", "registrarse", "crear cuenta", "acceder", "plataforma", "entrar"],
      respuesta: "🔐 Para acceder a la plataforma completa de **Vision Mind**, puedes iniciar sesión o crear tu cuenta gratuita en nuestra terminal de acceso seguro.",
      accion: { texto: "Ir al acceso seguro", url: "login.html" }
    },

    /* ─── CATÁLOGO ─── */
    {
      preguntas: ["catalogo", "showroom", "tienda", "productos disponibles", "que venden"],
      respuesta: "🛒 Tenemos un **catálogo** con todos nuestros productos y soluciones tecnológicas disponibles. Puedes explorar las opciones y contactarnos para adquirir o personalizar cualquier producto.",
      accion: { texto: "Ver catálogo", url: "catalogo.html" }
    },

    /* ─── TECNOLOGÍA ─── */
    {
      preguntas: ["tecnologia", "que tecnologias usan", "aframe", "webgl", "gemini", "stack", "herramientas"],
      respuesta: "⚙️ En Vision Mind usamos tecnologías de punta:\n\n• 🥽 **A-Frame** — entornos VR en el navegador\n• 🌐 **WebGL** — renderizado 3D nativo\n• 🤖 **Google Gemini** — IA conversacional\n• 💻 **HTML5 / CSS3 / JS** — plataforma web moderna\n• 🎨 **Orbitron + Rajdhani** — identidad visual futurista"
    },

    /* ─── SALUDO ─── */
    {
      preguntas: ["hola", "buenos dias", "buenas tardes", "buenas noches", "hey", "hi", "saludos", "que tal", "como estas"],
      respuesta: "¡Hola! 👋 Bienvenido a **Vision Mind**. Soy **Nexus**, tu asistente IA. Estoy aquí para ayudarte con todo lo que necesites sobre nuestra plataforma, servicios y experiencias VR. ¿Qué quieres explorar hoy?"
    },

    /* ─── DESPEDIDA ─── */
    {
      preguntas: ["adios", "hasta luego", "chao", "bye", "hasta pronto", "nos vemos", "gracias"],
      respuesta: "¡Hasta pronto! 🚀 Fue un gusto ayudarte. Recuerda que en **Vision Mind** estamos aquí para acompañarte en tu transformación digital. ¡Que tengas un excelente día! ✨"
    }
  ]
};
