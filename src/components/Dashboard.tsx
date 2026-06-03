import React from 'react';
import { WeekSchedule, DayWorkoutSplit, UserAdjustments } from '../types';

interface DashboardProps {
  schedule: WeekSchedule;
  selectedDay: string | null;
  onSelectDay: (dayName: string) => void;
  adjustments: UserAdjustments;
}

export const Dashboard: React.FC<DashboardProps> = ({
  schedule,
  selectedDay,
  onSelectDay,
  adjustments
}) => {
  // Get date and week information
  const today = new Date();
  const todayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedToday = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const getWeekNumber = (d: Date): number => {
    const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number (Sunday is 7)
    target.setUTCDate(target.getUTCDate() + 4 - (target.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
    return Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const currentWeekNum = getWeekNumber(today);
  const calculatedAutoWeekId = currentWeekNum % 2 === 0 ? 'B' : 'A';
  const isWeekSynced = calculatedAutoWeekId === schedule.id;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Week Info Banner */}
      <div className="week-info-banner">
        <span>📅 <strong>{formattedToday}</strong></span>
        <span style={{ color: 'var(--text-muted)' }}>•</span>
        <span>Week <span className="week-num-highlight">{currentWeekNum}</span> of {today.getFullYear()}</span>
        <span style={{ color: 'var(--text-muted)' }}>•</span>
        <span style={{ fontSize: '0.75rem', color: isWeekSynced ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
          {isWeekSynced ? '🔄 Synced with Split' : '⚠️ Manual Override'}
        </span>
      </div>

      {/* Info card */}
      <div className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-cyan)' }}>
        <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
          🗓️ Weekly Split Calendar
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Swipe horizontally to see the full week. Tap any day to select your workout duration and begin.
        </p>
      </div>

      {/* Grid containing days as columns */}
      <div className="calendar-grid">
        {schedule.days.map((daySplit: DayWorkoutSplit) => {
          const isSelected = selectedDay === daySplit.day;
          const isToday = daySplit.day === todayName;
          
          const adjKey = `${schedule.id}-${daySplit.day}`;
          const customAdj = adjustments[adjKey];
          
          let splitTypeClass = 'rest';
          if (daySplit.morning.type !== 'rest') {
            splitTypeClass = daySplit.morning.type; // run, sprint
          } else if (daySplit.afternoon.type !== 'rest') {
            splitTypeClass = daySplit.afternoon.type; // upper_core, lower_core, easy_walk
          }

          // Format duration label
          let durationLabel = '';
          if (customAdj?.duration) {
            if (customAdj.duration === '15min') durationLabel = '⏱️ 15m';
            else if (customAdj.duration === '30min') durationLabel = '⏱️ 30m';
            else if (customAdj.duration === '45min') durationLabel = '⏱️ 45m';
            else if (customAdj.duration === 'full') durationLabel = '⏱️ Full';
          }

          return (
            <div
              key={daySplit.day}
              className={`card day-card ${splitTypeClass} ${isSelected ? 'active-day' : ''} ${isToday ? 'today-highlight' : ''}`}
              onClick={() => onSelectDay(daySplit.day)}
            >
              <div className="day-card-left">
                <div className="day-name" style={{ color: isToday ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                  {daySplit.day}
                </div>
                
                {customAdj?.customName && (
                  <span className="custom-reminder-badge">
                    ✏️ {customAdj.customName}
                  </span>
                )}
                
                <div className="day-splits" style={{ marginTop: '4px' }}>
                  {daySplit.morning.type !== 'rest' && (
                    <span className={`split-badge ${daySplit.morning.type}`}>
                      AM: {daySplit.morning.label}
                    </span>
                  )}
                  {daySplit.afternoon.type !== 'rest' && (
                    <span className={`split-badge ${daySplit.afternoon.type}`}>
                      PM: {daySplit.afternoon.label}
                    </span>
                  )}
                  {daySplit.morning.type === 'rest' && daySplit.afternoon.type === 'rest' && (
                    <span className="split-badge rest">
                      RECOVERY
                    </span>
                  )}
                </div>
              </div>

              <div className="day-card-right">
                {durationLabel ? (
                  <span className="time-label">{durationLabel}</span>
                ) : (
                  daySplit.morning.type !== 'rest' || daySplit.afternoon.type !== 'rest' ? (
                    <span className="time-label" style={{ opacity: 0.4 }}>Select Length</span>
                  ) : (
                    <span className="time-label" style={{ opacity: 0.2 }}>Rest</span>
                  )
                )}
                <svg 
                  className="arrow-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
