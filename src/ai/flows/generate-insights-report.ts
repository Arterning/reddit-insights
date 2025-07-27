'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an insights report from Reddit data.
 *
 * - generateInsightsReport - A function that generates the insights report.
 * - GenerateInsightsReportInput - The input type for the generateInsightsReport function.
 * - GenerateInsightsReportOutput - The return type for the generateInsightsReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsReportInputSchema = z.object({
  ideaDescription: z.string().describe('A detailed description of the idea.'),
  problemStatement: z.string().describe('The problem that the idea solves.'),
  targetAudience: z.string().describe('The target audience for the idea.'),
  redditData: z.string().describe('Aggregated relevant Reddit data in JSON format.'),
});
export type GenerateInsightsReportInput = z.infer<typeof GenerateInsightsReportInputSchema>;

const GenerateInsightsReportOutputSchema = z.object({
  report: z.string().describe('The generated insights report.'),
});
export type GenerateInsightsReportOutput = z.infer<typeof GenerateInsightsReportOutputSchema>;

export async function generateInsightsReport(input: GenerateInsightsReportInput): Promise<GenerateInsightsReportOutput> {
  return generateInsightsReportFlow(input);
}

const generateInsightsReportPrompt = ai.definePrompt({
  name: 'generateInsightsReportPrompt',
  input: {schema: GenerateInsightsReportInputSchema},
  output: {schema: GenerateInsightsReportOutputSchema},
  prompt: `You are an expert market research analyst. You will analyze Reddit data to generate an insights report for a given idea.

  Idea Description: {{{ideaDescription}}}
  Problem Statement: {{{problemStatement}}}
  Target Audience: {{{targetAudience}}}
  Reddit Data: {{{redditData}}}

  Based on the above information, generate a comprehensive insights report highlighting key trends, sentiments, and potential market validation for the idea.
  The report should include actionable recommendations.
  `,
});

const generateInsightsReportFlow = ai.defineFlow(
  {
    name: 'generateInsightsReportFlow',
    inputSchema: GenerateInsightsReportInputSchema,
    outputSchema: GenerateInsightsReportOutputSchema,
  },
  async input => {
    const {output} = await generateInsightsReportPrompt(input);
    return output!;
  }
);
