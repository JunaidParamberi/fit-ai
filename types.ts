
export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';
export type Goal = 'fat loss' | 'muscle gain' | 'recomposition' | 'endurance';
export type DietType = 'veg' | 'non-veg' | 'mixed' | 'eggetarian' | 'vegan';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type CuisineStyle = 'Indian' | 'Western' | 'Middle Eastern' | 'Asian' | 'Mixed';
export type MealPattern = '2 meals' | '3 meals' | 'snacker' | 'skip breakfast';

export interface UserProfile {
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  experienceLevel: ExperienceLevel;
  workoutPreference: 'gym' | 'home' | 'both';
  cuisineStyle: CuisineStyle;
  dietType: DietType;
  mealPattern: MealPattern;
  sleepHours: number;
  waterIntake: number; // glasses
  stressLevel: number; // 1-10
  injuries: string;
  gymAccess: boolean; // Derived or explicitly set
  schedule: string;
  workoutDays: number;
  workoutDuration: number;
}

export interface AssessmentResult {
  bmi: number;
  bmiClassification: string;
  tdee: number;
  issues: string[];
  primaryFocus: string;
  recommendations: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface StrengthMetric {
  name: string;
  previousWeight: number;
  currentWeight: number;
  unit: string;
}

export interface DailyPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  totalCalories: number;
}

export interface DietPlan {
  weeklyPlan: DailyPlan[];
  generalAdvice: string;
}

export interface LoggedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  image?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  warmup: string;
  exercises: Exercise[];
  cooldown: string;
}

export interface WorkoutPlan {
  weeklySplit: DailyWorkout[];
  progressiveOverloadGuidance: string;
  safetyTips: string;
}

export interface WeeklyProgress {
  weightChange: number;
  workoutCompletion: number;
  dietAdherence: number;
  energyLevel: number;
  sleepQuality: number;
}

export interface ProgressAnalysis {
  status: string;
  adjustments: string;
  motivation: string;
  habitImprovement: string;
  plateauRisk: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
