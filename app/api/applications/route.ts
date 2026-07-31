import { getDb } from "../../../db";
import { applications } from "../../../db/schema";

const required = [
  "name",
  "phone",
  "city",
  "education",
  "experience",
  "availability",
  "instructions",
  "priorities",
  "feedback",
  "interview",
] as const;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      answers?: Record<string, string>;
      score?: number;
    };
    const answers = payload.answers ?? {};

    for (const field of required) {
      if (!answers[field]?.trim()) {
        return Response.json(
          { error: `La respuesta ${field} es obligatoria.` },
          { status: 400 },
        );
      }
    }

    const db = getDb();
    const [application] = await db
      .insert(applications)
      .values({
        name: answers.name.trim(),
        phone: answers.phone.trim(),
        city: answers.city.trim(),
        education: answers.education.trim(),
        experience: answers.experience.trim(),
        availability: answers.availability.trim(),
        instructions: answers.instructions.trim(),
        priorities: answers.priorities.trim(),
        feedback: answers.feedback.trim(),
        interview: answers.interview.trim(),
        score: Math.max(0, Math.min(9, Number(payload.score) || 0)),
        createdAt: new Date(),
      })
      .returning({ id: applications.id });

    return Response.json({ ok: true, id: application.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error inesperado";
    return Response.json({ error: message }, { status: 500 });
  }
}
