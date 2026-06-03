export interface SchedulingLogic {
  ideal_split: string;
  alternative_split: string;
  frequency: string;
}

export interface ProgramMetadata {
  program_name: string;
  target_outcomes: string[];
  core_philosophy: string[];
  scheduling_logic: SchedulingLogic;
}

export interface ExerciseProtocolStep {
  text: string;
  substeps?: string[];
}

export interface ExerciseDetail {
  name: string;
  objective?: string;
  protocol: string | string[];
  treadmill_setting?: string;
  intensity_check?: string;
  ranking?: string[];
  safety_note?: string;
  variations?: string[];
}

export interface SubCategory {
  name: string;
  safety_note?: string;
  exercises: ExerciseDetail[];
}

export interface Category {
  id: string;
  name: string;
  core_strategy?: string;
  ultimate_warmup?: string;
  subcategories?: SubCategory[];
  exercises?: ExerciseDetail[];
  philosophy?: string;
}

export interface DayWorkoutSplit {
  day: string; // "Monday", "Tuesday", etc.
  morning: {
    type: 'run' | 'sprint' | 'rest' | 'easy_walk';
    label: string;
    description: string;
  };
  afternoon: {
    type: 'upper_core' | 'lower_core' | 'rest' | 'easy_walk';
    label: string;
    description: string;
  };
}

export interface WeekSchedule {
  id: 'A' | 'B';
  name: string;
  days: DayWorkoutSplit[];
}

export interface PresetChallenge {
  id: string;
  name: string;
  format?: string;
  sequence?: string[];
  volume_targets?: string[];
  stations?: string[];
}

export type WorkoutDuration = '15min' | '30min' | '45min' | 'full';

export interface DayAdjustment {
  duration: WorkoutDuration;
  customName: string;
}

export interface UserAdjustments {
  [key: string]: DayAdjustment; // key format: `week-day` e.g., `A-Monday`
}

export interface ActiveStep {
  name: string;
  categoryName: string;
  description: string;
  instructions: string[];
  durationSeconds?: number; // if undefined, it is rep-based
  repsText?: string;
  safetyNote?: string;
  refUrl?: string;
}

