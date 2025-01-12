const hookTemplate = (states: { name: string; fieldType: string; type: string }[]) => `
'use client'
import { useState } from 'react';

const useComponent = () => {
  const [state, setState] = useState({
    ${states
      .map((state) => {
        if (state.type === 'boolean') {
          return `${state.name}: false,`;
        } else if (state.type === 'number') {
          return `${state.name}: 0,`;
        } else if (state.type === 'array') {
          return `${state.name}: [],`;
        } else if (state.type === 'object') {
          return `${state.name}: {},`;
        } else {
          return `${state.name}: '',`; // Default to string
        }
      })
      .join('\n')}
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? +value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('formState', JSON.stringify(state));
    alert('Form submitted and saved to localStorage!');
  };

  return { state, handleChange, handleSubmit };
};

export default useComponent;
`;

export default hookTemplate;
