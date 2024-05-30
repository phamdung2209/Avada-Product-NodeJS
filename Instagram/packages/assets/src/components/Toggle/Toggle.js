import React from 'react';

// eslint-disable-next-line react/prop-types
export default function Toggle({disabled, checked, onChange, size = 'medium'}) {
  return (
    <label className={`MP-Switch ${size} ${disabled ? 'disabled' : ''}`}>
      <input
        className="MP-Switch_Checkbox"
        type="checkbox"
        checked={!!checked}
        onChange={v => onChange(v.target.checked)}
      />
      <span className={`MP-Switch_Slider ${size} ${checked ? 'right' : 'left'}`} />
    </label>
  );
}
