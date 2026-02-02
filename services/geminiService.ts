
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { UserProfile, AssessmentResult, ChatMessage, DietPlan, WorkoutPlan } from "../types";
import { MODEL_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const FORMAT_RULES = `
FORMATTING RULES:
- Use friendly emojis.
- Keep bullets short and clear.
- Use encouraging language.
- Avoid technical jargon.`;

export const getFitnessAssessment = async (profile: UserProfile): Promise<AssessmentResult> => {
  const prompt = `
    Hello! Please analyze this person's wellness profile for a highly personalized plan. 
    
    Vitals:
    - ${profile.age}y, ${profile.gender}, ${profile.height_cm}cm, ${profile.weight_kg}kg.
    
    Lifestyle & Goals:
    - Activity: ${profile.activityLevel}, Goal: ${profile.goal}.
    - Training: ${profile.experienceLevel} level, Prefers ${profile.workoutPreference}.
    - Nutrition: ${profile.cuisineStyle} style, ${profile.dietType} diet, ${profile.mealPattern} pattern.
    - Habits: Sleep ${profile.sleepHours}h, Water ${profile.waterIntake} glasses, Stress ${profile.stressLevel}/10.
    - Health: ${profile.injuries || 'No injuries'}.
    
    Task:
    1. Calculate BMI and give a friendly classification.
    2. Estimate daily calorie needs (TDEE).
    3. Identify 3-5 main focus areas (incorporate lifestyle habits like sleep/water/stress).
    4. Provide a core "Focus Area" tag (2-3 words).
    5. Daily nutritional targets (Protein, Carbs, Fats in grams).
    6. Friendly advice for starting out.
    
    ${FORMAT_RULES}
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bmi: { type: Type.NUMBER },
          bmiClassification: { type: Type.STRING },
          tdee: { type: Type.NUMBER },
          issues: { type: Type.ARRAY, items: { type: Type.STRING } },
          primaryFocus: { type: Type.STRING },
          recommendations: { type: Type.STRING },
          macros: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fats: { type: Type.NUMBER }
            },
            required: ["protein", "carbs", "fats"]
          }
        },
        required: ["bmi", "bmiClassification", "tdee", "issues", "primaryFocus", "recommendations", "macros"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getDietPlan = async (assessment: AssessmentResult, profile: UserProfile): Promise<DietPlan> => {
  const prompt = `
    Create a highly realistic meal plan based on these preferences:
    - Style: ${profile.cuisineStyle} (e.g. if Indian, include healthy dahl/roti options).
    - Pattern: ${profile.mealPattern} (Very important: if skip breakfast, adjust accordingly).
    - Calories: ${assessment.tdee} kcal.
    - Protein: ${assessment.macros.protein}g.
    
    Make it feel culturally relevant and easy to cook.
    ${FORMAT_RULES}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          weeklyPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                breakfast: { type: Type.STRING },
                lunch: { type: Type.STRING },
                dinner: { type: Type.STRING },
                snacks: { type: Type.ARRAY, items: { type: Type.STRING } },
                totalCalories: { type: Type.NUMBER }
              },
              required: ["day", "breakfast", "lunch", "dinner", "snacks", "totalCalories"]
            }
          },
          generalAdvice: { type: Type.STRING }
        },
        required: ["weeklyPlan", "generalAdvice"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getWorkoutPlan = async (assessment: AssessmentResult, profile: UserProfile): Promise<WorkoutPlan> => {
  const prompt = `
    Design a workout routine tailored to:
    - Level: ${profile.experienceLevel}.
    - Preference: ${profile.workoutPreference}.
    - Limitations: ${profile.injuries || 'None'}.
    - Goal: ${profile.goal}.
    
    Focus on sustainable progress and safety.
    ${FORMAT_RULES}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          weeklySplit: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                focus: { type: Type.STRING },
                warmup: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.NUMBER },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING }
                    },
                    required: ["name", "sets", "reps", "rest"]
                  }
                },
                cooldown: { type: Type.STRING }
              },
              required: ["day", "focus", "warmup", "exercises", "cooldown"]
            }
          },
          progressiveOverloadGuidance: { type: Type.STRING },
          safetyTips: { type: Type.STRING }
        },
        required: ["weeklySplit", "progressiveOverloadGuidance", "safetyTips"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const chatWithCoach = async (history: ChatMessage[], message: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `Persona: A kind, supportive wellness coach.
Tone: Encouraging, patient, and wise. Avoid robotic or hyper-technical language.

Structure:
1. Warm Response: (Friendly acknowledgment)
2. Helpful Suggestion: (1-2 clear ideas)
3. Closing: (A positive wish for their day)

${FORMAT_RULES}`,
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text || "I'm having a little trouble connecting. Let's try chatting again in a moment!";
};

export const analyzeHealthImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: `Look at this health-related image. Provide encouraging feedback and simple observations. ${FORMAT_RULES}` }
      ]
    }
  });
  return response.text || "I couldn't quite see that. Could you try taking the photo again?";
};
