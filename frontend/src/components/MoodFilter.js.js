import React from 'react';

const MoodFilter = ({ currentFilter, onFilterChange }) => {
  const moods = [
    { value: 'all', label: 'Toutes les humeurs', emoji: '🌈' },
    { value: 'triste', label: 'Triste', emoji: '😔' },
    { value: 'anxieux', label: 'Anxieux', emoji: '😰' },
    { value: 'colère', label: 'Colère', emoji: '😠' },
    { value: 'calme', label: 'Calme', emoji: '😌' },
    { value: 'espoir', label: 'Plein d\'espoir', emoji: '✨' },
    { value: 'mélancolique', label: 'Mélancolique', emoji: '🌧️' },
    { value: 'confus', label: 'Confus', emoji: '😵' },
    { value: 'fatigué', label: 'Fatigué', emoji: '😴' }
  ];

  return (
    <div className="mood-filter">
      <label>Filtrer par humeur :</label>
      <select 
        value={currentFilter} 
        onChange={(e) => onFilterChange(e.target.value)}
        className="mood-select"
      >
        {moods.map(mood => (
          <option key={mood.value} value={mood.value}>
            {mood.emoji} {mood.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoodFilter;