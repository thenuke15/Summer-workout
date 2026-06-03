import { ProgramMetadata, Category, WeekSchedule, PresetChallenge } from '../types';

export const programMetadata: ProgramMetadata = {
  program_name: "Summer Conditioning & Explosiveness Tracker",
  target_outcomes: [
    "Explosiveness",
    "Endurance",
    "Sports Transfer (Soccer, Baseball, Football WR/DB, volleyball)"
  ],
  core_philosophy: [
    "Choose exercises you enjoy within each category to maximize adherence.",
    "Progression Rule: Beat the previous entry. Increase reps until you can increase weight. Safely push past plateaus.",
    "Intensity Goal: Lift 2-3 sets (after moderate warmup). Target muscle 'FAILURE' (absolute inability to move the weight) over 'FATIGUE' (just tired)."
  ],
  scheduling_logic: {
    ideal_split: "Cardio in Morning | Strength Training in Afternoon",
    alternative_split: "Alternate Cardio days and Strength days if time is limited",
    frequency: "Work major muscle groups every other day. Core can be trained EVERY DAY."
  }
};

export const categories: Category[] = [
  {
    id: "cardio",
    name: "Category 1: Cardio Engine",
    exercises: [
      {
        name: "Long Slow Runs",
        objective: "Increase baseline endurance (\"5th set\" preparation) and aid muscle recovery.",
        protocol: "Start at a slow pace for 20 minutes. Gradually work up to 1 hour.",
        treadmill_setting: "Pace 5.0 to 5.5",
        intensity_check: "Conversational pace (should be able to talk while running)."
      },
      {
        name: "30-60's",
        objective: "Build your engine and increase rally endurance.",
        protocol: [
          "3-minute slow jog (Warm-up)",
          "Sprint for 30 seconds (Maximum effort / 100% output)",
          "Walk for 60 seconds (Catch breath, drop heart rate)",
          "Repeat steps 2 and 3 for exactly 8 rotations.",
          "3-minute slow jog (Cool-down)"
        ]
      },
      {
        name: "Sprint-Run Variation",
        protocol: [
          "Same structure as 30-60's, but syncs to a 10-song playlist:",
          "Song 1: Slow jog",
          "Songs 2-9 (8 songs): Walk during the verses, Sprint during the choruses.",
          "Song 10: Slow jog"
        ]
      },
      {
        name: "Burpees Challenge",
        protocol: "Perform maximum burpees possible within a strict 5-minute timer. Log total count and attempt to increase over time."
      }
    ]
  },
  {
    id: "upper",
    name: "Category 2: Upper Body (Shoulder Health, Pull/Press, Rotational Power)",
    subcategories: [
      {
        name: "Shoulder Health",
        safety_note: "Be smart with overhead weights. No ego lifting.",
        exercises: [
          {
            name: "Band External Rotations",
            protocol: "2-3 sets x 12-20 reps (Strengthens rotator cuff / protects from swinging)."
          },
          {
            name: "Face Pulls",
            protocol: "2-3 sets x 12-20 reps (Rear delts, upper back, scapular control / counters forward swings)."
          }
        ]
      },
      {
        name: "Pulling Strength (Power for Serves and Hits)",
        exercises: [
          {
            name: "Pullups",
            objective: "Target is 15+ consecutive reps.",
            protocol: "Progression for beginners: Jump up, hold chin above bar max time, lower down as slowly as possible. Repeat until failure. Do this several times a day, every other day. Once 1 rep is achieved, perform 1 rep every hour, then 2, then 3 (every hour, every other day)."
          },
          {
            name: "Rows",
            protocol: "Warm up with moderate weight, then scale to the heaviest weight possible while maintaining proper form. 2-3 sets to failure."
          }
        ]
      },
      {
        name: "Pressing Strength (Jousts, Passes, and Counter-balance)",
        exercises: [
          {
            name: "Pushups (EMOM)",
            protocol: "Perform 10 pushups every minute for 10 minutes (EMOM).",
            variations: [
              "Regular",
              "Tempo",
              "Clapping",
              "Wide Arm",
              "Diamond",
              "Offset (one hand above shoulder, one below)"
            ]
          },
          {
            name: "Landmine Press",
            protocol: "2-3 sets. Start moderate, progress to heaviest safe weight. Preferred over standard overhead barbell press."
          },
          {
            name: "Inclined Dumbbell Press",
            protocol: "Targets a blend of shoulders and chest. 2-3 sets to failure."
          }
        ]
      }
    ]
  },
  {
    id: "lower",
    name: "Category 3: Lower Body & Plyometrics (Roadmap to Jumping Higher)",
    core_strategy: "Vert growth slows down if you only do plyos and lift legs. To break plateaus, you must integrate weekly max-effort Jump Sessions (used by 40-inch vertical athletes).",
    ultimate_warmup: "Jump Rope. Jump short and rapidly to train the nervous system to fire muscles faster.",
    subcategories: [
      {
        name: "Exercise Routines",
        exercises: [
          {
            name: "Power Movements",
            protocol: "Power Cleans | Weighted Jumps"
          },
          {
            name: "Knee Dominant",
            protocol: "Bulgarian Split Squat | Heavy Half Squat"
          },
          {
            name: "Hip Hinge",
            protocol: "Romanian Deadlifts (RDL) | Barbell Deadlift | Hip Thrusts"
          },
          {
            name: "Calf Raise Movements",
            protocol: "Soleus (Seated) | Gastrocnemius (Standing)"
          },
          {
            name: "Hamstring Curls (Ranked by Effectiveness)",
            protocol: "Hamstring curls rank as follows:",
            ranking: [
              "Nordic Curl (Far superior to any other hamstring workout)",
              "Lying Hamstring Curl Machine",
              "Seated Hamstring Curl Machine"
            ]
          },
          {
            name: "Step Ups (Sartorius Isolation)",
            protocol: "Front Step Ups | Lateral Step Ups | Crossover Step Ups (Add weight optionally)."
          },
          {
            name: "Sled Pushes (Weighted Running Analogue)",
            safety_note: "CRITICAL SAFETY: Use appropriate weight to avoid overstressing tendons. High weight + weak tendons = high injury risk.",
            protocol: [
              "Driving Load: Teaches how to push load at an incline. Reduces Achilles tear risk by strengthening the tendon/calf with low-impact, consistent loading.",
              "Backward Sled Pushes: Aids deceleration and the final absorption phase of a jump approach."
            ]
          }
        ]
      },
      {
        name: "Plyometrics Sequence",
        exercises: [
          {
            name: "Depth Jumps",
            protocol: "Stand on a box, step/fall off, and the instant your feet touch the floor, explode and jump as high as possible. (Ref: https://www.youtube.com/shorts/HSLCfruScKU)"
          },
          {
            name: "Pogos",
            protocol: "Begin with small, low hops and finish with maximum effort, max-height hops."
          },
          {
            name: "3 Step Max Approach",
            protocol: "Execute a standard 3 or 4 step approach jump at 100% max height. Target: 3 sets of low, high quality reps."
          },
          {
            name: "RFE Reactive Cycles",
            protocol: "RFE Reactive Cycles. (Ref: https://www.youtube.com/shorts/1kyvyiekNmw)"
          },
          {
            name: "Rocket Box Jumps",
            protocol: "Jump straight up and land on top of the box *without* bending your knees upon landing. (Ref: https://www.youtube.com/shorts/1kyvyiekNmw)"
          },
          {
            name: "Alternating Lunge Jumps",
            protocol: "Perform lunges with an explosive jump at the top. Go deep-almost tapping the back knee to the floor for maximum muscle growth. (Ref: https://www.youtube.com/watch?v=FyxFYIV8WKU)"
          }
        ]
      }
    ]
  },
  {
    id: "core",
    name: "Category 4: Core Engine (Every Day Linkage)",
    philosophy: "Your core connects leg power to arm release. Train it daily.",
    exercises: [
      {
        name: "Planks Routine",
        safety_note: "Must alternate variations to progress:",
        variations: [
          "Side planks on elbows (Left/Right)",
          "Extended arm planks",
          "Extended arm side planks (one arm extended to the sky)",
          "Extended-arm side-plank with Hip Dips (drop hip to ground, pull back to start position)"
        ],
        protocol: "Perform variations alternatively to keep core guessing and progressing."
      },
      {
        name: "Farmers Carries",
        protocol: "Pick up a heavy weight or a sand-filled bucket in one hand. Walk 50 meters with a perfectly straight back. Switch hands and walk 50 meters back. Heavier = better."
      },
      {
        name: "Dead Bug",
        protocol: "Execute movements slowly and deliberately to maintain core tension."
      }
    ]
  }
];

export const schedules: WeekSchedule[] = [
  {
    id: 'A',
    name: "Week A Schedule",
    days: [
      {
        day: "Monday",
        morning: { type: 'run', label: "Long Slow Run", description: "Increase baseline endurance" },
        afternoon: { type: 'upper_core', label: "Upper Body + Core", description: "Shoulder Health, Pull/Press, Core Engine" }
      },
      {
        day: "Tuesday",
        morning: { type: 'sprint', label: "Sprints", description: "Build your engine (30-60's / playlist / burpees)" },
        afternoon: { type: 'lower_core', label: "Lower Body + Core", description: "Lower Body Routines, Plyometrics, Core Engine" }
      },
      {
        day: "Wednesday",
        morning: { type: 'run', label: "Long Slow Run", description: "Increase baseline endurance" },
        afternoon: { type: 'upper_core', label: "Upper Body + Core", description: "Shoulder Health, Pull/Press, Core Engine" }
      },
      {
        day: "Thursday",
        morning: { type: 'sprint', label: "Sprints", description: "Build your engine (30-60's / playlist / burpees)" },
        afternoon: { type: 'lower_core', label: "Lower Body + Core", description: "Lower Body Routines, Plyometrics, Core Engine" }
      },
      {
        day: "Friday",
        morning: { type: 'run', label: "Long Slow Run", description: "Increase baseline endurance" },
        afternoon: { type: 'upper_core', label: "Upper Body + Core", description: "Shoulder Health, Pull/Press, Core Engine" }
      },
      {
        day: "Saturday",
        morning: { type: 'rest', label: "Rest", description: "Muscle recovery and hydration" },
        afternoon: { type: 'easy_walk', label: "Easy Walk", description: "Light active recovery walk" }
      },
      {
        day: "Sunday",
        morning: { type: 'rest', label: "Rest", description: "Complete physical & mental rest" },
        afternoon: { type: 'rest', label: "Rest", description: "Complete physical & mental rest" }
      }
    ]
  },
  {
    id: 'B',
    name: "Week B Schedule",
    days: [
      {
        day: "Monday",
        morning: { type: 'sprint', label: "Sprints", description: "Build your engine (30-60's / playlist / burpees)" },
        afternoon: { type: 'lower_core', label: "Lower Body + Core", description: "Lower Body Routines, Plyometrics, Core Engine" }
      },
      {
        day: "Tuesday",
        morning: { type: 'run', label: "Long Slow Run", description: "Increase baseline endurance" },
        afternoon: { type: 'upper_core', label: "Upper Body + Core", description: "Shoulder Health, Pull/Press, Core Engine" }
      },
      {
        day: "Wednesday",
        morning: { type: 'sprint', label: "Sprints", description: "Build your engine (30-60's / playlist / burpees)" },
        afternoon: { type: 'lower_core', label: "Lower Body + Core", description: "Lower Body Routines, Plyometrics, Core Engine" }
      },
      {
        day: "Thursday",
        morning: { type: 'run', label: "Long Slow Run", description: "Increase baseline endurance" },
        afternoon: { type: 'upper_core', label: "Upper Body + Core", description: "Shoulder Health, Pull/Press, Core Engine" }
      },
      {
        day: "Friday",
        morning: { type: 'sprint', label: "Sprints", description: "Build your engine (30-60's / playlist / burpees)" },
        afternoon: { type: 'lower_core', label: "Lower Body + Core", description: "Lower Body Routines, Plyometrics, Core Engine" }
      },
      {
        day: "Saturday",
        morning: { type: 'rest', label: "Rest", description: "Muscle recovery and hydration" },
        afternoon: { type: 'easy_walk', label: "Easy Walk", description: "Light active recovery walk" }
      },
      {
        day: "Sunday",
        morning: { type: 'rest', label: "Rest", description: "Complete physical & mental rest" },
        afternoon: { type: 'rest', label: "Rest", description: "Complete physical & mental rest" }
      }
    ]
  }
];

export const presetChallenges: PresetChallenge[] = [
  {
    id: "rhabdo",
    name: "Preset 1: Fun Times with Rhabdo",
    format: "4 Rounds | 1 Min Rest Between Rounds",
    stations: [
      "Station 1: Max flutter kicks (1 minute)",
      "Station 2: Max pushups (1 minute)",
      "Station 3: Dead bug (1 minute)",
      "Station 4: Max burpees (driving arms over an imaginary net) (1 minute)"
    ]
  },
  {
    id: "onepunch",
    name: "Preset 2: One Punch Man Workout",
    volume_targets: [
      "100 Pushups",
      "100 Situps",
      "100 Squats",
      "10 km Run"
    ]
  },
  {
    id: "murph",
    name: "Preset 3: Murph Challenge",
    sequence: [
      "1 Mile Run",
      "100 Pullups",
      "200 Pushups",
      "300 Air Squats",
      "1 Mile Run"
    ]
  }
];
