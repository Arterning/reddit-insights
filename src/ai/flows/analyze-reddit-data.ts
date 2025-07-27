// src/ai/flows/analyze-reddit-data.ts
'use server';

/**
 * @fileOverview Analyzes Reddit data based on user input to provide a market demand analysis report.
 *
 * - analyzeRedditData - A function that handles the Reddit data analysis process.
 * - AnalyzeRedditDataInput - The input type for the analyzeRedditData function.
 * - AnalyzeRedditDataOutput - The return type for the analyzeRedditData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRedditDataInputSchema = z.object({
  ideaDescription: z.string().describe('A detailed description of the business idea.'),
  problemStatement: z.string().describe('The problem that the business idea aims to solve.'),
  targetAudience: z.string().describe('The specific target audience for the business idea.'),
});
export type AnalyzeRedditDataInput = z.infer<typeof AnalyzeRedditDataInputSchema>;

const AnalyzeRedditDataOutputSchema = z.object({
  marketDemandAnalysis: z.string().describe('An overall market demand analysis report based on Reddit data.'),
  relevantPosts: z.array(
    z.object({
      title: z.string().describe('Title of the Reddit post.'),
      url: z.string().url().describe('URL of the Reddit post.'),
      snippet: z.string().describe('A snippet of the Reddit post content.'),
    })
  ).optional().describe('Relevant Reddit posts used for the analysis.'),
});
export type AnalyzeRedditDataOutput = z.infer<typeof AnalyzeRedditDataOutputSchema>;

export async function analyzeRedditData(input: AnalyzeRedditDataInput): Promise<AnalyzeRedditDataOutput> {
  return analyzeRedditDataFlow(input);
}

const analyzeRedditDataPrompt = ai.definePrompt({
  name: 'analyzeRedditDataPrompt',
  input: {schema: AnalyzeRedditDataInputSchema},
  output: {schema: AnalyzeRedditDataOutputSchema},
  prompt: `You are a market research expert specializing in analyzing online discussions to determine market demand.

  Analyze Reddit discussions based on the provided business idea description, problem statement, and target audience to formulate an overall market demand analysis report.
  Include relevant Reddit posts that support your analysis. If no relevant posts are found, omit the relevantPosts field.

  Business Idea Description: {{{ideaDescription}}}
  Problem Statement: {{{problemStatement}}}
  Target Audience: {{{targetAudience}}}

  Format the output as a JSON object with 'marketDemandAnalysis' and optional 'relevantPosts' fields.
  Include at least 3 relevant posts in 'relevantPosts' field if present.
  Posts should have a title, url, and a snippet of the content.
  Ensure that the marketDemandAnalysis is concise but thorough, providing actionable insights.
  `,
});

const analyzeRedditDataFlow = ai.defineFlow(
  {
    name: 'analyzeRedditDataFlow',
    inputSchema: AnalyzeRedditDataInputSchema,
    outputSchema: AnalyzeRedditDataOutputSchema,
  },
  async input => {
    const {output} = await analyzeRedditDataPrompt(input);
    return output!;
  }
);
