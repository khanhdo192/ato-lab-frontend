import React, { useState } from 'react';
import { IcoSelectArrow } from '@/components/icons';

export default function InputNumberSteps({ max, min, value, onChange, id }) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(id, value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(id, value - 1);
    }
  };

  return (
    <div className="flex items-center justify-between relative border border-solid rounded-lg border-b-700 w-13 h-10 pl-2">
      <input
        type="number"
        value={value}
        id={id}
        onChange={v => onChange(v.target.id, Number(v.target.value))}
        className="focus:outline-none w-13"
      />
      <button
        className="btn absolute right-1 top-0 focus:outline-none active:bg-gr-100"
        onClick={() => handleIncrement()}
      >
        <IcoSelectArrow className="w-25 h-25 transform rotate-180" />
      </button>
      <button
        className="btn btn-primary absolute right-1 bottom-0 focus:outline-none active:bg-gr-100"
        onClick={() => handleDecrement()}
      >
        <IcoSelectArrow className="w-25 h-25" />
      </button>
    </div>
  );
}
