"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  eyebrow: string;
  title: string;
  hint?: string;
  type: "text" | "tel" | "textarea" | "choice" | "select";
  placeholder?: string;
  options?: string[];
  dimension?: Dimension;
};

type Dimension =
  | "responsibility"
  | "organization"
  | "communication"
  | "adaptability"
  | "service";

const questions: Question[] = [
  {
    id: "name",
    eyebrow: "Para conocerte",
    title: "¿Cuál es tu nombre completo?",
    type: "text",
    placeholder: "Escribe tu nombre y apellidos",
  },
  {
    id: "phone",
    eyebrow: "Datos de contacto",
    title: "¿Cuál es tu número de WhatsApp?",
    hint: "Lo usaremos únicamente para dar seguimiento a tu solicitud.",
    type: "tel",
    placeholder: "Ej. 871 123 4567",
  },
  {
    id: "age_range",
    eyebrow: "Tu perfil",
    title: "¿Cuál es tu edad?",
    hint: "Este dato es únicamente informativo y no afecta tu puntuación.",
    type: "select",
    options: Array.from({ length: 13 }, (_, index) => `${index + 18} años`),
  },
  {
    id: "education",
    eyebrow: "Tu perfil",
    title: "¿Cuál es tu último grado de estudios?",
    type: "choice",
    options: [
      "Secundaria",
      "Preparatoria",
      "Carrera técnica",
      "Licenciatura",
      "Posgrado",
    ],
  },
  {
    id: "availability",
    eyebrow: "Disponibilidad",
    title: "¿Tienes disponibilidad para trabajar tiempo completo?",
    type: "choice",
    options: ["Sí", "No", "Necesito conocer el horario"],
  },
  {
    id: "r1",
    eyebrow: "Responsabilidad y disciplina",
    title: "Si sabes que llegarás tarde por una situación imprevista, ¿qué haces?",
    type: "choice",
    dimension: "responsibility",
    options: [
      "Aviso lo antes posible y explico la situación",
      "Aviso cuando ya debería haber llegado",
      "Llego y después explico lo sucedido",
      "No aviso porque fue algo imprevisto",
    ],
  },
  {
    id: "r2",
    eyebrow: "Responsabilidad y disciplina",
    title: "Cometes un error que todavía nadie ha notado. ¿Qué haces?",
    type: "choice",
    dimension: "responsibility",
    options: [
      "Lo informo y busco corregirlo inmediatamente",
      "Intento corregirlo y aviso si no puedo",
      "Espero para comprobar si causa algún problema",
      "No lo menciono mientras nadie lo descubra",
    ],
  },
  {
    id: "r3",
    eyebrow: "Responsabilidad y disciplina",
    title: "Te asignan una tarea repetitiva que debes realizar diariamente. ¿Qué haces?",
    type: "choice",
    dimension: "responsibility",
    options: [
      "La incorporo a mi rutina y verifico que quede terminada",
      "La realizo cuando recuerdo que está pendiente",
      "Espero a que mi responsable me la solicite",
      "Le doy prioridad solamente cuando hay supervisión",
    ],
  },
  {
    id: "o1",
    eyebrow: "Organización y prioridades",
    title: "Recibes tres tareas importantes para el mismo día. ¿Cómo comienzas?",
    type: "choice",
    dimension: "organization",
    options: [
      "Comparo urgencia, impacto y hora de entrega",
      "Empiezo por la más sencilla",
      "Trabajo un poco en cada una sin establecer un orden",
      "Espero a que alguien decida por mí",
    ],
  },
  {
    id: "o2",
    eyebrow: "Organización y prioridades",
    title: "Una tarea está tomando más tiempo del previsto. ¿Qué haces?",
    type: "choice",
    dimension: "organization",
    options: [
      "Informo el retraso y propongo una nueva hora de entrega",
      "Continúo sin avisar hasta terminarla",
      "La entrego incompleta para cumplir el horario",
      "La dejo pendiente y comienzo otra actividad",
    ],
  },
  {
    id: "o3",
    eyebrow: "Organización y prioridades",
    title: "Mientras realizas una tarea urgente, un compañero te pide ayuda. ¿Qué haces?",
    type: "choice",
    dimension: "organization",
    options: [
      "Explico mi prioridad y acuerdo cuándo podré ayudarle",
      "Dejo inmediatamente mi tarea para ayudarle",
      "Le digo que no puedo sin ofrecer otra alternativa",
      "Intento realizar ambas tareas al mismo tiempo",
    ],
  },
  {
    id: "c1",
    eyebrow: "Comunicación y trabajo en equipo",
    title: "Recibes una instrucción que no comprendes completamente. ¿Qué haces?",
    type: "choice",
    dimension: "communication",
    options: [
      "Explico qué entendí y pregunto lo que falta aclarar",
      "Intento realizarla y pregunto si algo sale mal",
      "Pregunto a varios compañeros antes de hablar con el responsable",
      "Hago lo que creo que se me pidió",
    ],
  },
  {
    id: "c2",
    eyebrow: "Comunicación y trabajo en equipo",
    title: "Un compañero nuevo no sabe realizar una actividad que tú conoces. ¿Qué haces?",
    type: "choice",
    dimension: "communication",
    options: [
      "Le explico el proceso y verifico que lo comprenda",
      "Hago la actividad por él para terminar más rápido",
      "Le indico que pregunte directamente al responsable",
      "Continúo con mis tareas porque no es mi responsabilidad",
    ],
  },
  {
    id: "c3",
    eyebrow: "Comunicación y trabajo en equipo",
    title: "No estás de acuerdo con una decisión de tu responsable. ¿Qué haces?",
    type: "choice",
    dimension: "communication",
    options: [
      "Expreso mi opinión con respeto y sigo la decisión acordada",
      "Comento mi desacuerdo únicamente con mis compañeros",
      "Ignoro la decisión y trabajo como considero conveniente",
      "No digo nada, pero realizo la tarea sin interés",
    ],
  },
  {
    id: "a1",
    eyebrow: "Adaptabilidad y aprendizaje",
    title: "Cambian un procedimiento que ya dominabas. ¿Cómo reaccionas?",
    type: "choice",
    dimension: "adaptability",
    options: [
      "Aprendo el nuevo proceso y pregunto la razón del cambio",
      "Uso el proceso anterior mientras me acostumbro",
      "Espero para comprobar si el cambio será permanente",
      "Me molesta tener que cambiar algo que funcionaba",
    ],
  },
  {
    id: "a2",
    eyebrow: "Adaptabilidad y aprendizaje",
    title: "Te asignan una actividad que nunca has realizado. ¿Qué haces?",
    type: "choice",
    dimension: "adaptability",
    options: [
      "Solicito orientación, tomo notas y comienzo a practicar",
      "Digo que no sé realizarla y espero otra asignación",
      "Intento hacerla sin preguntar para demostrar iniciativa",
      "Busco que un compañero la realice por mí",
    ],
  },
  {
    id: "a3",
    eyebrow: "Adaptabilidad y aprendizaje",
    title: "Recibes retroalimentación sobre algo que considerabas correcto. ¿Qué haces?",
    type: "choice",
    dimension: "adaptability",
    options: [
      "Escucho, solicito ejemplos y aplico las mejoras",
      "Explico por qué mi manera también es válida",
      "Acepto el comentario, pero continúo igual",
      "Evito volver a realizar esa actividad",
    ],
  },
  {
    id: "s1",
    eyebrow: "Servicio y resolución de problemas",
    title: "Un cliente está molesto y habla en un tono fuerte. ¿Cómo reaccionas?",
    type: "choice",
    dimension: "service",
    options: [
      "Mantengo la calma, escucho y busco entender el problema",
      "Explico inmediatamente por qué no es mi responsabilidad",
      "Evito responder hasta que se tranquilice",
      "Respondo con el mismo tono para defenderme",
    ],
  },
  {
    id: "s2",
    eyebrow: "Servicio y resolución de problemas",
    title: "Detectas un problema que ocurre frecuentemente. ¿Qué haces?",
    type: "choice",
    dimension: "service",
    options: [
      "Investigo la causa y propongo una solución preventiva",
      "Lo resuelvo cada vez que aparece",
      "Espero que alguien con más experiencia lo atienda",
      "Me acostumbro porque forma parte del trabajo",
    ],
  },
  {
    id: "s3",
    eyebrow: "Servicio y resolución de problemas",
    title: "Un cliente solicita algo que no puedes autorizar. ¿Qué haces?",
    type: "choice",
    dimension: "service",
    options: [
      "Explico el límite y busco una alternativa permitida",
      "Le digo simplemente que no es posible",
      "Hago una excepción para evitar que se moleste",
      "Lo envío con otra persona sin explicar la situación",
    ],
  },
  {
    id: "interview",
    eyebrow: "Último paso",
    title: "¿Qué horario prefieres para tu entrevista virtual del martes 4 de agosto?",
    hint: "Esta es la única fecha disponible. El lunes 3 de agosto te enviaremos por WhatsApp el enlace de Zoom.",
    type: "choice",
    options: [
      "12:00 p. m.",
      "2:00 p. m.",
      "4:00 p. m.",
    ],
  },
];

const dimensions: Dimension[] = [
  "responsibility",
  "organization",
  "communication",
  "adaptability",
  "service",
];

function questionScore(question: Question, answer?: string) {
  if (!question.dimension || !answer) return 0;
  const index = question.options?.indexOf(answer) ?? -1;
  return index >= 0 ? Math.max(0, 3 - index) : 0;
}

const SUPABASE_URL = "https://mqzmgmpyyyzyzcoseiqv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_xv8a0kgXHwMn8JWWrwKBUg_5S_LwA-Y";
const WHATSAPP_NUMBER = "528716052401";
const ZOOM_LINK =
  "https://us06web.zoom.us/j/3949784856?pwd=NkVVYndncm9jNkJjZmkyKy9hVldYQT09";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const question = questions[step];
  const answer = question ? answers[question.id] ?? "" : "";
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const dimensionScores = useMemo(
    () =>
      Object.fromEntries(
        dimensions.map((dimension) => [
          dimension,
          questions
            .filter((item) => item.dimension === dimension)
            .reduce(
              (total, item) => total + questionScore(item, answers[item.id]),
              0,
            ),
        ]),
      ) as Record<Dimension, number>,
    [answers],
  );
  const score = useMemo(
    () => dimensions.reduce((total, dimension) => total + dimensionScores[dimension], 0),
    [dimensionScores],
  );

  function setAnswer(value: string) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  async function next() {
    if (!answer.trim()) return;
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setStatus("saving");
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: answers.name.trim(),
          phone: answers.phone.trim(),
          city: "Ciudad Juárez, Chihuahua",
          age_range: answers.age_range,
          education: answers.education,
          experience: "No solicitado",
          availability: answers.availability,
          vacancy: "Vacante actual",
          instructions: answers.c1,
          priorities: answers.o1,
          feedback: answers.a3,
          interview: answers.interview,
          score,
          responsibility_score: dimensionScores.responsibility,
          organization_score: dimensionScores.organization,
          communication_score: dimensionScores.communication,
          adaptability_score: dimensionScores.adaptability,
          service_score: dimensionScores.service,
          assessment_answers: Object.fromEntries(
            questions
              .filter((item) => item.dimension)
              .map((item) => [item.id, answers[item.id]]),
          ),
        }),
      });
      if (!response.ok) throw new Error("No se pudo guardar");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hola, soy ${answers.name || ""}. Confirmo mi entrevista virtual para el martes 4 de agosto a las ${answers.interview || "hora por confirmar"}.\n\nEnlace de Zoom:\n${ZOOM_LINK}`,
  );

  if (!started) {
    return (
      <main className="shell intro-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <section className="intro-card">
          <div className="brand-row">
            <div className="brand-mark">P</div>
            <span>Proceso de selección</span>
          </div>
          <div className="intro-copy">
            <span className="pill">Evaluación inicial</span>
            <h1>Tu próxima oportunidad empieza aquí.</h1>
            <p>
              Queremos conocer tu forma de trabajar. Responde 15 situaciones
              laborales y completa tus datos para continuar con el proceso.
              La vacante es presencial en Ciudad Juárez, Chihuahua.
            </p>
          </div>
          <div className="facts">
            <div><strong>15</strong><span>situaciones evaluadas</span></div>
            <div><strong>100%</strong><span>desde tu celular</span></div>
          </div>
          <button className="primary-button start-button" onClick={() => setStarted(true)}>
            Comenzar evaluación <span aria-hidden="true">→</span>
          </button>
          <p className="privacy">
            Al continuar aceptas que tus datos se utilicen únicamente para este
            proceso de reclutamiento.
          </p>
        </section>
      </main>
    );
  }

  if (status === "done") {
    return (
      <main className="shell">
        <section className="result-card">
          <div className="success-icon" aria-hidden="true">✓</div>
          <span className="pill">Evaluación completada</span>
          <h1>¡Gracias, {answers.name?.split(" ")[0]}!</h1>
          <p>
            Recibimos tus respuestas correctamente. Tu entrevista virtual será
            el martes 4 de agosto en el horario elegido. Da clic en el botón
            para confirmar y guardar el enlace de Zoom en tu conversación.
          </p>
          <div className="summary">
            <span>Martes 4 de agosto</span>
            <strong>{answers.interview}</strong>
          </div>
          <a
            className="whatsapp-button"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Confirmar entrevista <span aria-hidden="true">↗</span>
          </a>
          <small>Completar esta evaluación no garantiza la contratación.</small>
        </section>
      </main>
    );
  }

  return (
    <main className="shell question-shell">
      <section className="question-card">
        <header className="question-header">
          <div className="brand-row compact">
            <div className="brand-mark">P</div>
            <span>Evaluación inicial</span>
          </div>
          <span className="counter">{step + 1} / {questions.length}</span>
        </header>

        <div className="progress-track" aria-label={`Progreso: ${progress}%`}>
          <div className="progress-value" style={{ width: `${progress}%` }} />
        </div>

        <div className="question-copy" key={question.id}>
          <span className="eyebrow">{question.eyebrow}</span>
          <h1>{question.title}</h1>
          {question.hint && <p>{question.hint}</p>}
        </div>

        <div className="answer-area">
          {question.type === "choice" ? (
            <div className="choices">
              {question.options?.map((option, index) => (
                <button
                  key={option}
                  className={`choice ${answer === option ? "selected" : ""}`}
                  onClick={() => setAnswer(option)}
                  aria-pressed={answer === option}
                >
                  <span className="choice-key">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  <span className="choice-check" aria-hidden="true">✓</span>
                </button>
              ))}
            </div>
          ) : question.type === "select" ? (
            <select
              autoFocus
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              aria-label={question.title}
            >
              <option value="" disabled>Selecciona tu edad</option>
              {question.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : question.type === "textarea" ? (
            <textarea
              autoFocus
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={question.placeholder}
              rows={5}
            />
          ) : (
            <input
              autoFocus
              type={question.type}
              inputMode={question.type === "tel" ? "tel" : "text"}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && next()}
              placeholder={question.placeholder}
            />
          )}
        </div>

        {status === "error" && (
          <p className="error-message">
            No pudimos guardar tus respuestas. Revisa tu conexión e inténtalo otra vez.
          </p>
        )}

        <footer className="actions">
          <button
            className="back-button"
            onClick={() => (step === 0 ? setStarted(false) : setStep((current) => current - 1))}
          >
            ← Atrás
          </button>
          <button
            className="primary-button"
            disabled={!answer.trim() || status === "saving"}
            onClick={next}
          >
            {status === "saving"
              ? "Guardando…"
              : step === questions.length - 1
                ? "Finalizar"
                : "Continuar →"}
          </button>
        </footer>
      </section>
    </main>
  );
}
