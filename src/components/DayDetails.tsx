import React from 'react';
import { DayWorkoutSplit, UserAdjustments, ExerciseDetail, WorkoutDuration } from '../types';
import { categories } from '../data/workoutData';

interface DayDetailsProps {
  daySplit: DayWorkoutSplit;
  scheduleId: 'A' | 'B';
  adjustments: UserAdjustments;
  onUpdateAdjustment: (dayName: string, field: 'duration' | 'customName', value: string) => void;
  onStartWorkout: (duration: WorkoutDuration, session: 'morning' | 'afternoon') => void;
  onClose: () => void;
}

export const DayDetails: React.FC<DayDetailsProps> = ({
  daySplit,
  scheduleId,
  adjustments,
  onUpdateAdjustment,
  onStartWorkout,
  onClose
}) => {
  const adjKey = `${scheduleId}-${daySplit.day}`;
  const durationVal = adjustments[adjKey]?.duration || 'full';
  const customNameVal = adjustments[adjKey]?.customName || '';

  // Find workout categories
  const cardioCategory = categories.find(c => c.id === 'cardio');
  const upperCategory = categories.find(c => c.id === 'upper');
  const lowerCategory = categories.find(c => c.id === 'lower');
  const coreCategory = categories.find(c => c.id === 'core');

  const renderExercise = (ex: ExerciseDetail) => {
    return (
      <div key={ex.name} className="ex-card">
        <div className="ex-name">
          💪 {ex.name}
        </div>
        
        {ex.objective && (
          <div className="ex-obj">
            <strong>Target Objective:</strong> {ex.objective}
          </div>
        )}

        {ex.treadmill_setting && (
          <div className="ex-meta">
            <strong>Treadmill Setting:</strong> {ex.treadmill_setting}
          </div>
        )}

        {ex.intensity_check && (
          <div className="ex-meta" style={{ borderLeftColor: 'var(--accent-green)' }}>
            <strong>Intensity Check:</strong> {ex.intensity_check}
          </div>
        )}

        <div className="ex-protocol">
          <strong>Protocol:</strong>
          {Array.isArray(ex.protocol) ? (
            <ol>
              {ex.protocol.map((step, idx) => (
                <li key={idx}>
                  {renderTextWithLinks(step)}
                </li>
              ))}
            </ol>
          ) : (
            <p style={{ marginTop: '2px' }}>{renderTextWithLinks(ex.protocol)}</p>
          )}
        </div>

        {ex.ranking && (
          <div className="ex-protocol" style={{ marginTop: '8px' }}>
            <ol>
              {ex.ranking.map((rank, idx) => (
                <li key={idx} style={{ listStyleType: 'decimal', color: 'var(--text-primary)' }}>
                  {rank}
                </li>
              ))}
            </ol>
          </div>
        )}

        {ex.safety_note && (
          <div className="ex-safety">
            <strong>⚠️ Safety:</strong> {ex.safety_note}
          </div>
        )}

        {ex.variations && (
          <div className="ex-variations">
            <span className="ex-variation-title">Variations:</span>
            <div className="ex-var-list">
              {ex.variations.map((v) => (
                <span key={v} className="ex-var-chip">{v}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
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

  return (
    <div className="detail-view">
      {/* Header */}
      <div className="detail-header">
        <div>
          <div className="detail-header-title">{daySplit.day} Routine</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Week {scheduleId} • Active Split Guide
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Customizer */}
      {(daySplit.morning.type !== 'rest' || daySplit.afternoon.type !== 'rest') && (
        <div className="customizer-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="custom-input-group" style={{ width: '100%' }}>
            <label style={{ marginBottom: '6px', display: 'block' }}>Choose Workout Length</label>
            <div className="duration-select-grid">
              {(['15min', '30min', '45min', 'full'] as WorkoutDuration[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`duration-btn ${durationVal === d ? 'active' : ''}`}
                  onClick={() => onUpdateAdjustment(daySplit.day, 'duration', d)}
                >
                  {d === '15min' ? '15 Min' : d === '30min' ? '30 Min' : d === '45min' ? '45 Min' : 'Full'}
                </button>
              ))}
            </div>
          </div>
          <div className="custom-input-group" style={{ width: '100%' }}>
            <label htmlFor="custom-name">Custom Routine Reminder</label>
            <input
              id="custom-name"
              type="text"
              className="custom-input"
              placeholder="e.g., Beach Gym, Track session..."
              value={customNameVal}
              onChange={(e) => onUpdateAdjustment(daySplit.day, 'customName', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Start Session Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
        {daySplit.morning.type !== 'rest' && (
          <button 
            className="start-workout-btn"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)', boxShadow: '0 8px 20px -6px rgba(56, 189, 248, 0.4)' }}
            onClick={() => onStartWorkout(durationVal, 'morning')}
          >
            🌅 Start Morning Session ({durationVal === '15min' ? '15m' : durationVal === '30min' ? '30m' : durationVal === '45min' ? '45m' : 'Full'})
          </button>
        )}
        {daySplit.afternoon.type !== 'rest' && (
          <button 
            className="start-workout-btn"
            style={{ background: 'linear-gradient(135deg, var(--accent-orange), #ea580c)', boxShadow: '0 8px 20px -6px rgba(249, 115, 22, 0.4)' }}
            onClick={() => onStartWorkout(durationVal, 'afternoon')}
          >
            🌇 Start Afternoon Session ({durationVal === '15min' ? '15m' : durationVal === '30min' ? '30m' : durationVal === '45min' ? '45m' : 'Full'})
          </button>
        )}
      </div>

      {/* Morning Section */}
      <div className="card">
        <div className="session-block">
          <div className="session-title-row">
            <span className="session-period morning">Morning Session</span>
            <span className={`split-badge ${daySplit.morning.type}`}>
              {daySplit.morning.label}
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {daySplit.morning.description}
          </div>

          {daySplit.morning.type === 'run' && cardioCategory && (
            <div className="exercise-detail-list">
              {cardioCategory.exercises
                ?.filter(e => e.name === 'Long Slow Runs')
                .map(renderExercise)}
            </div>
          )}

          {daySplit.morning.type === 'sprint' && cardioCategory && (
            <div className="exercise-detail-list">
              <div className="jump-banner" style={{ borderLeft: '3px solid var(--accent-cyan)', background: 'rgba(56, 189, 248, 0.05)' }}>
                <div className="jump-banner-title" style={{ color: 'var(--accent-cyan)' }}>
                  🏃 Sprint Options
                </div>
                Select one of the following sprints based on energy levels and available music:
              </div>
              {cardioCategory.exercises
                ?.filter(e => e.name !== 'Long Slow Runs')
                .map(renderExercise)}
            </div>
          )}

          {daySplit.morning.type === 'rest' && (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', padding: '0.5rem 0' }}>
              No morning session scheduled. Allow your body to recover or focus on joint mobility.
            </div>
          )}
        </div>
      </div>

      {/* Afternoon Section */}
      <div className="card">
        <div className="session-block">
          <div className="session-title-row">
            <span className="session-period afternoon">Afternoon Session</span>
            <span className={`split-badge ${daySplit.afternoon.type}`}>
              {daySplit.afternoon.label}
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {daySplit.afternoon.description}
          </div>

          {/* Upper Body + Core */}
          {daySplit.afternoon.type === 'upper_core' && (
            <div className="exercise-detail-list">
              {upperCategory?.subcategories?.map(sub => (
                <div key={sub.name} style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                    🎯 {sub.name}
                  </h4>
                  {sub.safety_note && (
                    <div className="ex-safety" style={{ margin: '0 0 8px 0', fontSize: '0.75rem' }}>
                      <strong>Note:</strong> {sub.safety_note}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sub.exercises.map(renderExercise)}
                  </div>
                </div>
              ))}
              
              {/* Daily Core linkage */}
              {coreCategory && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-orange)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>
                    🔥 Category 4: Core Engine (Daily Linkage)
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                    {coreCategory.philosophy}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {coreCategory.exercises?.map(renderExercise)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lower Body + Core */}
          {daySplit.afternoon.type === 'lower_core' && (
            <div className="exercise-detail-list">
              {/* Core Strategy Banner */}
              {lowerCategory?.core_strategy && (
                <div className="jump-banner">
                  <div className="jump-banner-title">
                    ⚡ Vertical Jump Strategy
                  </div>
                  <p>{lowerCategory.core_strategy}</p>
                  {lowerCategory.ultimate_warmup && (
                    <p style={{ marginTop: '6px', fontWeight: '500', color: 'var(--text-primary)' }}>
                      <strong>Ultimate Warmup:</strong> {lowerCategory.ultimate_warmup}
                    </p>
                  )}
                </div>
              )}

              {lowerCategory?.subcategories?.map(sub => (
                <div key={sub.name} style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-orange)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                    🎯 {sub.name}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sub.exercises.map(renderExercise)}
                  </div>
                </div>
              ))}

              {/* Daily Core linkage */}
              {coreCategory && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-orange)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>
                    🔥 Category 4: Core Engine (Daily Linkage)
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                    {coreCategory.philosophy}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {coreCategory.exercises?.map(renderExercise)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Easy Walk */}
          {daySplit.afternoon.type === 'easy_walk' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '0.5rem' }}>
              <div className="ex-card">
                <div className="ex-name">
                  🚶 Easy Active Recovery Walk
                </div>
                <div className="ex-protocol">
                  <strong>Protocol:</strong> Perform a light, low-intensity walk for 30-45 minutes. Keep heart rate low to promote blood flow, ease muscle tightness, and flush out lactic acid from the week's training.
                </div>
              </div>
            </div>
          )}

          {daySplit.afternoon.type === 'rest' && (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', padding: '0.5rem 0' }}>
              Complete recovery day. Ensure adequate nutrition, hydration, and sleep to rebuild muscle fibers.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
