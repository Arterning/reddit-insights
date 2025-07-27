import { z } from "zod";

export const ideaSchema = z.object({
  ideaDescription: z.string().min(10, {
    message: "Please provide a more detailed description (at least 10 characters).",
  }),
  problemStatement: z.string().min(10, {
    message: "Problem statement must be at least 10 characters.",
  }),
  targetAudience: z.string().min(3, {
    message: "Target audience must be at least 3 characters.",
  }),
});

export type IdeaFormValues = z.infer<typeof ideaSchema>;
