"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  eyebrow: string;
  title: string;
  hint?: string;
  type: "text" | "tel" | "textarea" | "choice";
  placeholder?: string;
  options?: string[];
};

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
    id: "city",
    eyebrow: "Ubicación",
    title: "¿En qué ciudad o zona vives?",
    type: "text",
    placeholder: "Ej. Torreón, Coahuila",
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
    id: "experience",
    eyebrow: "Experiencia",
    title: "Cuéntanos brevemente sobre tu experiencia laboral",
    hint: "Si buscas tu primera oportunidad, también puedes decirnos qué te gustaría aprender.",
    type: "textarea",
    placeholder: "Escribe una respuesta breve…",
  },
  {
    id: "availability",
    eyebrow: "Disponibilidad",
    title: "¿Tienes disponibilidad para trabajar tiempo completo?",
    type: "choice",
    options: ["Sí", "No", "Necesito conocer el horario"],
  },
  {
    id: "instructions",
    eyebrow: "Situaciones de trabajo",
    title: "Si recibes una indicación que no entiendes, ¿qué haces?",
    type: "choice",
    options: [
      "Pregunto para asegurarme de realizarla correctamente",
      "Intento resolverla y después consulto",
      "Espero a que alguien vuelva a explicarla",
      "Hago lo que entendí sin preguntar",
    ],
  },
  {
    id: "priorities",
    eyebrow: "Situaciones de trabajo",
    title: "Cuando tienes varias tareas pendientes, ¿cómo te organizas?",
    type: "choice",
    options: [
      "Priorizo por importancia y fecha de entrega",
      "Comienzo por las tareas más sencillas",
      "Pido a mi responsable que elija por mí",
      "Trabajo en lo que vaya surgiendo",
    ],
  },
  {
    id: "feedback",
    eyebrow: "Situaciones de trabajo",
    title: "¿Cómo reaccionas cuando recibes retroalimentación?",
    type: "choice",
    options: [
      "La escucho y la utilizo para mejorar",
      "Pido ejemplos para entenderla mejor",
      "Me cuesta aceptarla, pero trato de mejorar",
      "Prefiero evitarla",
    ],
  },
  {
    id: "interview",
    eyebrow: "Último paso",
    title: "¿Qué horario prefieres para una entrevista?",
    hint: "El horario queda sujeto a confirmación por WhatsApp.",
    type: "choice",
    options: [
      "10:00 a. m.",
      "11:30 a. m.",
      "1:00 p. m.",
      "Necesito otra fecha u horario",
    ],
  },
];

const scoreMap: Record<string, Record<string, number>> = {
  instructions: {
    "Pregunto para asegurarme de realizarla correctamente": 3,
    "Intento resolverla y después consulto": 2,
    "Espero a que alguien vuelva a explicarla": 1,
    "Hago lo que entendí sin preguntar": 0,
  },
  priorities: {
    "Priorizo por importancia y fecha de entrega": 3,
    "Comienzo por las tareas más sencillas": 2,
    "Pido a mi responsable que elija por mí": 1,
    "Trabajo en lo que vaya surgiendo": 0,
  },
  feedback: {
    "La escucho y la utilizo para mejorar": 3,
    "Pido ejemplos para entenderla mejor": 3,
    "Me cuesta aceptarla, pero trato de mejorar": 1,
    "Prefiero evitarla": 0,
  },
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const question = questions[step];
  const answer = question ? answers[question.id] ?? "" : "";
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const score = useMemo(
    () =>
      Object.entries(scoreMap).reduce(
        (total, [id, values]) => total + (values[answers[id]] ?? 0),
        0,
      ),
    [answers],
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
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, score }),
      });
      if (!response.ok) throw new Error("No se pudo guardar");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hola, soy ${answers.name || ""}. Ya terminé mi evaluación inicial y elegí ${answers.interview || "un horario por confirmar"}. Quedo pendiente de la confirmación.`,
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
              Queremos conocerte un poco mejor. Responde 10 preguntas sencillas
              y selecciona tu horario preferido para una entrevista.
            </p>
          </div>
          <div className="facts">
            <div><strong>10</strong><span>preguntas</span></div>
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
            Recibimos tus respuestas correctamente. El último paso es volver a
            WhatsApp para que nuestro equipo confirme tu entrevista.
          </p>
          <div className="summary">
            <span>Horario solicitado</span>
            <strong>{answers.interview}</strong>
          </div>
          <a
            className="whatsapp-button"
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Continuar en WhatsApp <span aria-hidden="true">↗</span>
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
