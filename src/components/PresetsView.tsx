import React from 'react';
import { presetChallenges } from '../data/workoutData';

export const PresetsView: React.FC = () => {
  return (
    <div className="presets-grid">
      <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-purple)' }}>
        <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          ⏱️ Challenge Benchmarks
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          These are pre-configured test routines to measure your physical capacity and mental toughness. Use them to break plateaus or track monthly improvements.
        </p>
      </div>

      {presetChallenges.map((preset) => (
        <div key={preset.id} className="card preset-card">
          <h3 className="preset-title">{preset.name}</h3>
          
          {preset.format && (
            <div className="preset-format">
              {preset.format}
            </div>
          )}

          {preset.stations && (
            <div className="preset-item-list">
              {preset.stations.map((station, idx) => (
                <div key={idx} className="preset-item">
                  <span className="preset-num">{idx + 1}.</span>
                  <span>{station}</span>
                </div>
              ))}
            </div>
          )}

          {preset.volume_targets && (
            <div className="preset-item-list">
              {preset.volume_targets.map((target, idx) => (
                <div key={idx} className="preset-item">
                  <span className="preset-num">⚡</span>
                  <span>{target}</span>
                </div>
              ))}
            </div>
          )}

          {preset.sequence && (
            <div className="preset-item-list">
              {preset.sequence.map((step, idx) => (
                <div key={idx} className="preset-item">
                  <span className="preset-num">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
