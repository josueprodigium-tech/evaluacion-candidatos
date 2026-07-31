import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable("applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  education: text("education").notNull(),
  experience: text("experience").notNull(),
  availability: text("availability").notNull(),
  instructions: text("instructions").notNull(),
  priorities: text("priorities").notNull(),
  feedback: text("feedback").notNull(),
  interview: text("interview").notNull(),
  score: integer("score").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
