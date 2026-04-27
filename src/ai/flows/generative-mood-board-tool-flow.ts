'use server';
/**
 * @fileOverview An AI-powered tool to generate preliminary visual mood boards and design concepts based on client input.
 *
 * - generativeMoodBoardTool - A function that orchestrates the generation of a mood board image and design concept description.
 * - GenerativeMoodBoardToolInput - The input type for the generativeMoodBoardTool function.
 * - GenerativeMoodBoardToolOutput - The return type for the generativeMoodBoardTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerativeMoodBoardToolInputSchema = z.object({
  designBrief: z
    .string()
    .describe("A detailed design brief and preferences for the mood board and design concept. This should include desired colors, textures, styles, and overall atmosphere."),
});
export type GenerativeMoodBoardToolInput = z.infer<typeof GenerativeMoodBoardToolInputSchema>;

const GenerativeMoodBoardToolOutputSchema = z.object({
  moodBoardImage: z
    .string()
    .describe('The generated mood board image as a data URI (data:image/png;base64,<encoded_data>).'),
  designConceptDescription: z.string().describe('A textual description of the generated design concept.'),
});
export type GenerativeMoodBoardToolOutput = z.infer<typeof GenerativeMoodBoardToolOutputSchema>;

const DesignConceptPromptOutputSchema = z.object({
  imagePrompt: z
    .string()
    .describe('A detailed, descriptive prompt suitable for an image generation model.'),
  designConceptDescription: z.string().describe('A textual description of the generated design concept.'),
});

const generativeMoodBoardPrompt = ai.definePrompt({
  name: 'generativeMoodBoardPrompt',
  input: {schema: GenerativeMoodBoardToolInputSchema},
  output: {schema: DesignConceptPromptOutputSchema},
  prompt: `You are an expert design conceptualizer for 'napau Design & Arte'. Based on the client's design brief, generate a highly detailed prompt for an image generation AI model to create a visual mood board, and also provide a concise textual description of the core design concept. Focus on colors, textures, styles, and overall atmosphere. The image prompt should be vivid and detailed enough for a visual AI to create a compelling image.

Client Brief: {{{designBrief}}}

Output must be in JSON format with two fields: 'imagePrompt' and 'designConceptDescription'.`,
});

export async function generativeMoodBoardTool(
  input: GenerativeMoodBoardToolInput
): Promise<GenerativeMoodBoardToolOutput> {
  return generativeMoodBoardToolFlow(input);
}

const generativeMoodBoardToolFlow = ai.defineFlow(
  {
    name: 'generativeMoodBoardToolFlow',
    inputSchema: GenerativeMoodBoardToolInputSchema,
    outputSchema: GenerativeMoodBoardToolOutputSchema,
  },
  async (input) => {
    // Step 1: Generate a detailed image prompt and design concept description from the client's brief.
    const {output: promptOutput} = await generativeMoodBoardPrompt(input);

    if (!promptOutput) {
      throw new Error('Failed to generate image prompt or design concept description.');
    }

    // Step 2: Use the generated image prompt to create the mood board image.
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: promptOutput.imagePrompt,
    });

    if (!media) {
      throw new Error('Failed to generate mood board image.');
    }

    return {
      moodBoardImage: media.url,
      designConceptDescription: promptOutput.designConceptDescription,
    };
  }
);
