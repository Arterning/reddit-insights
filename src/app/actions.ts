'use server';

import { analyzeRedditData, AnalyzeRedditDataInput, AnalyzeRedditDataOutput } from "@/ai/flows/analyze-reddit-data";
import { generateInsightsReport, GenerateInsightsReportInput, GenerateInsightsReportOutput } from "@/ai/flows/generate-insights-report";
import { ideaSchema } from "@/lib/schemas";

export async function analyzeRedditDataAction(input: AnalyzeRedditDataInput): Promise<AnalyzeRedditDataOutput> {
  const validatedInput = ideaSchema.parse(input);
  try {
    const output = await analyzeRedditData(validatedInput);
    return output;
  } catch (error) {
    console.error("Error in analyzeRedditDataAction:", error);
    throw new Error("Failed to analyze Reddit data.");
  }
}

export async function chatWithReportAction(input: GenerateInsightsReportInput): Promise<GenerateInsightsReportOutput> {
    try {
        const output = await generateInsightsReport(input);
        return output;
    } catch (error) {
        console.error("Error in chatWithReportAction:", error);
        throw new Error("Failed to generate chat response.");
    }
}
