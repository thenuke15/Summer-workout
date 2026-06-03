import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DayWorkoutSplit, WorkoutDuration, ActiveStep } from '../types';

interface ActiveWorkoutProps {
  daySplit: DayWorkoutSplit;
  duration: WorkoutDuration;
  sessionType: 'morning' | 'afternoon';
  onQuit: () => void;
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({
  daySplit,
  duration,
  sessionType,
  onQuit
}) => {
  // Generate active steps based on day splits, selected duration, and sessionType
  const steps = useMemo((): ActiveStep[] => {
    const list: ActiveStep[] = [];
    const setsCount = duration === '15min' ? 1 : duration === '30min' ? 2 : duration === '45min' ? 2 : 3;

    // 1. MORNING SESSION
    if (sessionType === 'morning') {
      if (daySplit.morning.type === 'run') {
        let seconds = 3600; // default 60min
        if (duration === '15min') seconds = 900;
        else if (duration === '30min') seconds = 1800;
        else if (duration === '45min') seconds = 2700;

        list.push({
          name: "Long Slow Run",
          categoryName: "Morning Cardio Engine",
          description: "Conversational pace slow run to build baseline endurance.",
          instructions: [
            "Start running at a slow, controlled pace for 20 minutes.",
            "Gradually work your way up to a total duration of 1 hour.",
            "If you are training on a treadmill, set the pace strictly between 5.0 and 5.5.",
            "Maintain a speed relaxed enough that you can easily hold a conversation while running."
          ],
          durationSeconds: seconds
        });
      } else if (daySplit.morning.type === 'sprint') {
        const rotations = duration === '15min' ? 2 : duration === '30min' ? 4 : duration === '45min' ? 6 : 8;
        const warmupSecs = duration === '15min' ? 90 : 180;

        // Warm-up
        list.push({
          name: "Warm-up Slow Jog",
          categoryName: "Morning Cardio Engine (Sprints)",
          description: "Slow jog to prepare your muscles and tendons for sprints.",
          instructions: [
            "Begin with a slow 3-minute jog to warm up."
          ],
          durationSeconds: warmupSecs
        });

        // Sprint Rotations
        for (let i = 1; i <= rotations; i++) {
          list.push({
            name: `Sprint (Interval ${i}/${rotations})`,
            categoryName: "Morning Cardio Engine (Sprints)",
            description: "Maximum effort sprint to build your core engine.",
            instructions: [
              "Sprint as hard as you possibly can for exactly 30 seconds, exerting maximum effort."
            ],
            durationSeconds: 30
          });
          list.push({
            name: `Recovery Walk (Interval ${i}/${rotations})`,
            categoryName: "Morning Cardio Engine (Sprints)",
            description: "Walk slowly to lower your heart rate.",
            instructions: [
              "Walk calmly for 60 seconds to catch your breath and drop your heart rate."
            ],
            durationSeconds: 60
          });
        }

        // Cool-down
        list.push({
          name: "Cool-down Jog",
          categoryName: "Morning Cardio Engine (Sprints)",
          description: "Gradually bring your heart rate back to resting levels.",
          instructions: [
            "Finish the session with a slow 3-minute jog to cool down."
          ],
          durationSeconds: warmupSecs
        });
      }
    }

    // 2. AFTERNOON SESSION
    if (sessionType === 'afternoon') {
      if (daySplit.afternoon.type === 'upper_core') {
        // Shoulder Health
        list.push({
          name: "Band External Rotations",
          categoryName: "Upper Body (Shoulder Health)",
          description: "Strengthens rotator cuff & protects shoulder joints.",
          instructions: [
            "Attach a resistance band at elbow height.",
            "Keep your elbow tucked firmly against your side at a 90-degree angle.",
            "Rotate your hand outward away from your body while keeping the elbow pinned.",
            "Control the band back to the starting position.",
            "Complete 2 to 3 sets of 12 to 20 reps."
          ],
          repsText: `${setsCount} sets x 12-20 reps`,
          safetyNote: "Be smart with overhead weights. No ego lifting."
        });
        list.push({
          name: "Face Pulls",
          categoryName: "Upper Body (Shoulder Health)",
          description: "Rear delts, upper back, and scapular control.",
          instructions: [
            "Set a resistance band or cable machine pulley at upper-chest or eye height.",
            "Hold the handles or rope, step back, and pull straight toward your face.",
            "Flare your elbows out horizontally and actively squeeze your shoulder blades together at the peak of the movement.",
            "Complete 2 to 3 sets of 12 to 20 reps."
          ],
          repsText: `${setsCount} sets x 12-20 reps`
        });

        // Pulling Strength
        list.push({
          name: "Pullups",
          categoryName: "Upper Body (Pulling Strength)",
          description: "Target is 15+ consecutive reps.",
          instructions: [
            "Target: Work up to completing more than 15 consecutive reps in a row.",
            "Progression if you cannot do a pullup yet:",
            "1. Jump up to the bar so your chin is completely held above it.",
            "2. Hold your chin above the bar for as long as possible.",
            "3. Lower your body down as slowly and controlled as possible.",
            "4. Repeat this sequence until you can no longer hold yourself up. Do this several times a day, every other day.",
            "Greasing the groove progression: Once you can do 1 strict pullup, perform exactly 1 rep every hour. As your strength builds, increase it to 2 reps every hour, then 3 reps every hour, continuing this every other day."
          ],
          repsText: `${setsCount} sets to failure`
        });
        list.push({
          name: "Rows",
          categoryName: "Upper Body (Pulling Strength)",
          description: "Warm up with moderate weight, then scale up.",
          instructions: [
            "Begin with a moderate weight to properly warm up.",
            "Quickly scale up to the heaviest weight you can correctly move.",
            "Pull the weight while maintaining strict, proper body form. Perform 2 to 3 sets to muscle failure."
          ],
          repsText: `${setsCount} sets to failure`
        });

        // Pressing Strength
        list.push({
          name: "Pushups (EMOM)",
          categoryName: "Upper Body (Pressing Strength)",
          description: "Perform 10 pushups every minute for 10 minutes.",
          instructions: [
            "Core Challenge: Attempt to complete 10 pushups every single minute for 10 consecutive minutes (100 total pushups).",
            "Cycle through these variations: Regular, Tempo, Clapping, Wide Arm, Diamond, and Offset (positioning one hand above the shoulder line and the other hand below it)."
          ],
          repsText: "10 reps every minute for 10 minutes"
        });
        list.push({
          name: "Landmine Press",
          categoryName: "Upper Body (Pressing Strength)",
          description: "Start moderate and progress.",
          instructions: [
            "Secure one end of a barbell into a landmine base or corner intersection.",
            "Load weights onto the opposite end, lift it up, and hold it at shoulder height.",
            "Press the barbell upward and forward diagonally.",
            "Complete 2 to 3 sets; start with a moderate weight and quickly progress to the heaviest weight you can safely lift."
          ],
          repsText: `${setsCount} sets to failure`
        });
        list.push({
          name: "Inclined Dumbbell Press",
          categoryName: "Upper Body (Pressing Strength)",
          description: "Targets a blend of shoulders and chest.",
          instructions: [
            "Position yourself on an exercise bench set to a standard incline angle.",
            "Press dumbbells straight up from your upper chest area.",
            "Complete 2 to 3 sets, progressing quickly from a warm-up weight to your heaviest safe weight to hit absolute muscle failure."
          ],
          repsText: `${setsCount} sets to failure`
        });
      } else if (daySplit.afternoon.type === 'lower_core') {
        // Ultimate Warmup
        list.push({
          name: "Jump Rope Warmup",
          categoryName: "Lower Body & Plyos (Warm-up)",
          description: "Jump short and rapidly to train the nervous system.",
          instructions: [
            "Jump rapidly making short, fast bounces off the ground.",
            "Focus on foot speed to train your nervous system to fire your muscles faster."
          ],
          durationSeconds: duration === '15min' ? 60 : duration === '30min' ? 120 : 180
        });

        // Power Movements
        list.push({
          name: "Power Movements (Power Cleans | Weighted Jumps)",
          categoryName: "Lower Body Routines",
          description: "Focus on maximum vertical drive and speed.",
          instructions: [
            "Execute Power Cleans and Weighted Jumps."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "Knee Dominant (Bulgarian Split Squat | Heavy Half Squat)",
          categoryName: "Lower Body Routines",
          description: "Focus on single leg strength and balance.",
          instructions: [
            "Execute Bulgarian Split Squats (one foot elevated behind you on a bench) and Heavy Half Squats."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "Hip Hinge (Romanian Deadlifts | Barbell Deadlift | Hip Thrusts)",
          categoryName: "Lower Body Routines",
          description: "Activate posterior chain.",
          instructions: [
            "Execute Romanian Deadlifts (RDLs), Barbell Deadlifts, and Hip Thrusts."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "Calf Raise Movements (Soleus | Gastrocnemius)",
          categoryName: "Lower Body Routines",
          description: "Soleus (Seated) and Gastrocnemius (Standing) to protect tendons.",
          instructions: [
            "Execute Seated Calf Raises (isolating the soleus muscle) and Standing Calf Raises (targeting the gastrocnemius)."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "Hamstring Curls",
          categoryName: "Lower Body Routines",
          description: "Select hamstring curls based on effectiveness priority.",
          instructions: [
            "Ranked by selection priority:",
            "1. Nordic Curl: Kneel on the floor with your ankles securely anchored, then lower your upper body toward the floor as slowly as possible using only your hamstrings.",
            "2. Lying Hamstring Curl Machine.",
            "3. Seated Hamstring Curl Machine."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "Step Ups (Sartorius Isolation)",
          categoryName: "Lower Body Routines",
          description: "Perform step-ups onto a box or bench.",
          instructions: [
            "Perform Front, Lateral, and Crossover step-ups onto a box or bench.",
            "Add handheld weights optionally to increase load."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "Sled Pushes (Weighted Running Analogue)",
          categoryName: "Lower Body Routines",
          description: "Push the sled forward at an incline, and backward.",
          instructions: [
            "Driving Load: Push the sled forward while keeping your body at a consistent incline to load the Achilles tendon and calf muscles safely.",
            "Backward Sled Pushes: Face the sled and pull or push it while walking backward to build deceleration control for your approach."
          ],
          repsText: `${setsCount} sets`,
          safetyNote: "Do not load excessive weight if you have weak tendons, as higher weight spikes injury risks. Always consistently push with a managed, appropriate weight."
        });

        // Plyometrics Sequence
        list.push({
          name: "Depth Jumps",
          categoryName: "Lower Body (Plyometrics)",
          description: "Stand on a box, fall off, explode and jump straight up.",
          instructions: [
            "Stand on a box, step/fall off of it to the floor, and the exact instant your feet touch the ground, explode and jump straight up as high as you can."
          ],
          repsText: `${setsCount} sets of low, high quality reps`,
          refUrl: "https://www.youtube.com/shorts/HSLCfruScKU"
        });
        list.push({
          name: "Pogos",
          categoryName: "Lower Body (Plyometrics)",
          description: "Continuous hops progressing to max effort height.",
          instructions: [
            "Begin with small, fast continuous ankle hops and finish the set with maximum-effort hops, jumping as high as possible on each rep."
          ],
          repsText: `${setsCount} sets`
        });
        list.push({
          name: "3-Step Max Approach Jumps",
          categoryName: "Lower Body (Plyometrics)",
          description: "Approach and jump as high as you can.",
          instructions: [
            "Perform your normal 3-step or 4-step volleyball approach and jump as high as you can.",
            "Aim for exactly 3 sets of low, maximum-quality reps."
          ],
          repsText: "3 sets of low, high quality reps"
        });
        list.push({
          name: "RFE Reactive Cycles",
          categoryName: "Lower Body (Plyometrics)",
          description: "Perform explosive plyometric jumps.",
          instructions: [
            "Execute rear-foot elevated reactive jumps."
          ],
          repsText: `${setsCount} sets`,
          refUrl: "https://www.youtube.com/shorts/1kyvyiekNmw"
        });
        list.push({
          name: "Rocket Box Jumps",
          categoryName: "Lower Body (Plyometrics)",
          description: "Jump onto a box focusing on landing cleanly without bending knees.",
          instructions: [
            "Jump straight up from the floor onto a box, focusing on landing cleanly on top of the box without bending your knees to absorb the landing."
          ],
          repsText: `${setsCount} sets`,
          refUrl: "https://www.youtube.com/shorts/1kyvyiekNmw"
        });
        list.push({
          name: "Alternating Lunge Jumps",
          categoryName: "Lower Body (Plyometrics)",
          description: "Explode straight up from deep lunge and switch legs in mid-air.",
          instructions: [
            "Drop into a deep lunge position, explode straight up into a jump at the top, and switch legs in mid-air.",
            "Go all the way down on each rep, bringing your back knee almost to the floor."
          ],
          repsText: `${setsCount} sets`,
          refUrl: "https://www.youtube.com/watch?v=FyxFYIV8WKU"
        });
      } else if (daySplit.afternoon.type === 'easy_walk') {
        let seconds = 2700; // 45m
        if (duration === '15min') seconds = 900;
        else if (duration === '30min') seconds = 1800;
        else if (duration === '45min') seconds = 2700;

        list.push({
          name: "Easy Active Recovery Walk",
          categoryName: "Recovery Walk",
          description: "Light walk to promote blood flow and ease tightness.",
          instructions: [
            "Perform a light, low-intensity walk.",
            "Keep heart rate low to promote blood flow, ease muscle tightness, and flush out lactic acid from the week's training."
          ],
          durationSeconds: seconds
        });
      }

      // 3. CORE LINKAGE (Only if strength training upper or lower body is active)
      if (daySplit.afternoon.type === 'upper_core' || daySplit.afternoon.type === 'lower_core') {
        const plankSeconds = duration === '15min' ? 30 : duration === '30min' ? 45 : 60;
        
        list.push({
          name: "Plank Routine",
          categoryName: "Core Engine (Daily Linkage)",
          description: "Connect leg power to arm release by training daily.",
          instructions: [
            "Complete the routine by shifting through these variations consecutively:",
            "• Side Planks on Your Elbows: Hold a rigid side plank resting on your forearm (complete on both left and right sides).",
            "• Extended Arm Planks: Hold a standard front plank resting fully on your hands with locked-out arms.",
            "• Extended Arm Side Planks: Balance in a side plank on a single locked-out arm, reaching your top hand straight up to the sky.",
            "• Extended-Arm Side-Plank with Hip Dips: From the extended side plank position, drop your hip smoothly down to the ground, then squeeze your obliques to pull it back up to the starting line."
          ],
          durationSeconds: plankSeconds,
          safetyNote: "Hold correct form throughout the duration. Alternate variations."
        });

        list.push({
          name: "Farmers Carries",
          categoryName: "Core Engine (Daily Linkage)",
          description: "Heavy loaded carries to build core engine.",
          instructions: [
            "Pick up a heavy weight, dumbbell, or a bucket packed with sand in one hand.",
            "Walk forward with a perfectly straight back for exactly 50 meters.",
            "Turn around, switch the weight to your opposite hand, and walk 50 meters back to your starting point.",
            "Keep the load as heavy as you can manage."
          ],
          repsText: `${setsCount} rounds (50m each hand)`
        });

        list.push({
          name: "Dead Bug",
          categoryName: "Core Engine (Daily Linkage)",
          description: "Slow movements to maintain core tension.",
          instructions: [
            "Lie flat on your back with your knees bent at 90 degrees and arms pointing straight up.",
            "Lower one arm backward overhead while extending the opposite leg straight out just above the floor.",
            "Execute these movements very slowly and deliberately, keeping your lower back pressed to the floor. Alternate sides."
          ],
          repsText: `${setsCount} sets`
        });
      }
    }

    // Fallback Rest Step
    if (list.length === 0) {
      list.push({
        name: "Recovery & Rest Protocols",
        categoryName: "Recovery Rest Day",
        description: "No structured workouts scheduled. Allow your body to recover.",
        instructions: [
          "No structured workouts scheduled for this session.",
          "Focus on hydration, stretching, and 8+ hours of sleep to rebuild muscle fibers and recharge energy."
        ],
        repsText: "Active Rest"
      });
    }

    return list;
  }, [daySplit, duration, sessionType]);

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentStep = steps[currentStepIdx];

  // Timer states
  const [timeLeft, setTimeLeft] = useState(currentStep?.durationSeconds || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Sound Synth beep using Web Audio API
  const playFinishBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Triple beep sequence
      const playSingleBeep = (timeOffset: number, pitch: number, length: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, ctx.currentTime + timeOffset);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + timeOffset + length);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + length);
      };

      playSingleBeep(0, 880, 0.25);
      playSingleBeep(0.3, 880, 0.25);
      playSingleBeep(0.6, 1200, 0.4);
    } catch (e) {
      console.warn("AudioContext failed or blocked by autoplay rules:", e);
    }
  };

  // Sync timer and instructions state when step changes
  useEffect(() => {
    if (currentStep?.durationSeconds !== undefined) {
      setTimeLeft(currentStep.durationSeconds);
    } else {
      setTimeLeft(0);
    }
    setIsRunning(false);
    setShowInstructions(false);
  }, [currentStepIdx, steps, currentStep]);

  // Timer countdown loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playFinishBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      setIsCompleted(true);
      playFinishBeep();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  // Calculations for progress bar
  const progressPercent = Math.round(((currentStepIdx) / steps.length) * 100);
  const currentDurationTotal = currentStep?.durationSeconds || 1;
  const timerCircleOffset = 471.24 - (471.24 * (timeLeft / currentDurationTotal));

  // Time formatter (MM:SS)
  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ref-link"
          >
            Ref Video ↗
          </a>
        );
      }
      return part;
    });
  };

  if (isCompleted) {
    return (
      <div className="card congrats-card">
        <div className="congrats-icon">🏆</div>
        <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)' }}>
          Workout Complete!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px' }}>
          Amazing job! You finished the <strong>{daySplit.day}</strong> {sessionType} routine ({duration === '15min' ? '15m' : duration === '30min' ? '30m' : duration === '45min' ? '45m' : 'Full'}) split guide.
        </p>
        <button
          className="reps-complete-btn"
          style={{ background: 'linear-gradient(135deg, var(--accent-green), #059669)', marginTop: '1rem' }}
          onClick={onQuit}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="active-workout-container">
      {/* Progress header */}
      <div className="workout-progress-header">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <strong>Session:</strong> {daySplit.day} {sessionType === 'morning' ? 'Morning' : 'Afternoon'} ({duration === '15min' ? '15m' : duration === '30min' ? '30m' : duration === '45min' ? '45m' : 'Full'})
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
          Step {currentStepIdx + 1} of {steps.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Exit Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button 
          onClick={onQuit}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#f87171',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          🛑 Stop & Exit Workout
        </button>
      </div>

      {/* Active Step Panel */}
      <div className="card active-step-card">
        <div className="active-step-category">
          {currentStep.categoryName}
        </div>
        
        <div className="active-step-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentStep.name}
          <button 
            type="button"
            className="info-toggle-btn"
            title="View detailed instructions"
            onClick={() => setShowInstructions(!showInstructions)}
            style={{ padding: 0 }}
          >
            ?
          </button>
        </div>

        {/* Expandable instruction drawer */}
        {showInstructions && (
          <div className="instructions-drawer">
            <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📖 How to Perform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentStep.instructions.map((line, idx) => (
                <p key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {renderTextWithLinks(line)}
                </p>
              ))}
            </div>
            {currentStep.repsText && (
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: '700', marginTop: '0.75rem' }}>
                🎯 Target sets/reps: {currentStep.repsText}
              </div>
            )}
            {currentStep.safetyNote && (
              <div style={{ fontSize: '0.8rem', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.08)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.15)', marginTop: '0.75rem' }}>
                <strong>⚠️ Safety:</strong> {currentStep.safetyNote}
              </div>
            )}
            {currentStep.refUrl && (
              <div style={{ marginTop: '0.75rem' }}>
                <a
                  href={currentStep.refUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link"
                  style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  🎬 Watch Reference Video ↗
                </a>
              </div>
            )}
          </div>
        )}

        {/* Short inline description if drawer is closed */}
        {!showInstructions && (
          <div className="active-step-desc">
            {currentStep.description}
          </div>
        )}

        {/* Display visual reps badge if rep-based */}
        {currentStep.repsText && !showInstructions && (
          <div 
            style={{ 
              background: 'var(--accent-orange-glow)', 
              color: 'var(--accent-orange)', 
              fontWeight: '700',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '1rem',
              border: '1px solid rgba(249, 115, 22, 0.2)',
              marginTop: '0.5rem'
            }}
          >
            🎯 Goal: {currentStep.repsText}
          </div>
        )}

        {/* Timer view if exercise has duration */}
        {currentStep.durationSeconds !== undefined ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
            <div className="timer-display-circle">
              <svg className="timer-svg" viewBox="0 0 160 160">
                <circle className="timer-circle-bg" cx="80" cy="80" r="75" />
                <circle 
                  className="timer-circle-fill" 
                  cx="80" 
                  cy="80" 
                  r="75"
                  strokeDasharray="471.24"
                  strokeDashoffset={timerCircleOffset} 
                />
              </svg>
              <div className="timer-text">
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Play/Pause controls */}
            <div className="player-controls">
              <button 
                type="button" 
                className="control-btn play-pause-btn"
                onClick={handleToggleTimer}
              >
                {isRunning ? (
                  /* Pause Icon */
                  <svg style={{ width: '28px', height: '28px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  /* Play Icon */
                  <svg style={{ width: '28px', height: '28px', marginLeft: '4px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* If timer finished, show immediate advance indicator */}
            {timeLeft === 0 && (
              <div style={{ color: 'var(--accent-green)', fontWeight: '700', fontSize: '0.85rem', marginTop: '4px', animation: 'fadeIn 0.5s' }}>
                🎉 Timer complete! Ready to move on.
              </div>
            )}
          </div>
        ) : (
          /* Repetition complete button */
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              className="reps-complete-btn"
              onClick={handleNextStep}
            >
              ✔️ Done with Reps
            </button>
          </div>
        )}

        {/* Lower navigation bar */}
        <div className="navigation-bar">
          <button
            className="nav-link-btn"
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
          >
            ← Previous
          </button>
          
          {/* Show Next button only for timer steps (since rep steps advance automatically via reps-button) */}
          {currentStep.durationSeconds !== undefined && (
            <button
              className="nav-link-btn"
              onClick={handleNextStep}
              style={{ color: 'var(--text-primary)' }}
            >
              Skip / Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
