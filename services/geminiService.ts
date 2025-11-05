
import { GoogleGenAI, Type } from "@google/genai";
import { KeywordResponse, KeywordWithScore } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        keywords: {
            type: Type.ARRAY,
            description: "A list of 20-30 SEO-optimized YouTube keywords, each with an SEO score.",
            items: {
                type: Type.OBJECT,
                properties: {
                    keyword: {
                        type: Type.STRING,
                        description: "The SEO keyword.",
                    },
                    score: {
                        type: Type.NUMBER,
                        description: "An SEO score from 1 to 100, where 100 is best. The score should represent a combination of relevance, potential search volume, and moderate competition.",
                    },
                },
                required: ["keyword", "score"],
            },
        },
    },
    required: ["keywords"],
};


export const generateKeywordsFromApi = async (topic: string): Promise<KeywordWithScore[]> => {
    const prompt = `
        Act as a YouTube SEO expert.
        Generate a list of 20-30 highly relevant and SEO-optimized YouTube video keywords for the following topic: "${topic}".
        For each keyword, provide an SEO score from 1 to 100. The score should represent a combination of relevance, potential search volume, and moderate competition (a higher score is better).
        The keywords should include a mix of short-tail (1-2 words), long-tail (3+ words), and LSI (Latent Semantic Indexing) keywords.
        Also, include some keywords structured as questions that people might search for.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse: KeywordResponse = JSON.parse(jsonText);
        
        if (parsedResponse && Array.isArray(parsedResponse.keywords)) {
            return parsedResponse.keywords;
        } else {
            console.error("Unexpected JSON structure:", parsedResponse);
            throw new Error("Failed to parse keywords from API response.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("An error occurred while communicating with the AI model.");
    }
};
