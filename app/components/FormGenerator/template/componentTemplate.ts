const componentTemplate = (states: { name: string; fieldType: string; type: string }[]) => `
'use client'
import React from 'react';
import useComponent from './useComponent';

const Component: React.FC = () => {
  const { state, handleChange } = useComponent();

  return (
    <form className="space-y-4">
      ${states
        .map((state) => {
          const { name, fieldType, type } = state;

          if (fieldType === 'textarea') {
            return `
      <label htmlFor="${name}" className="block text-sm font-medium text-gray-700">${name}:</label>
      <textarea
        id="${name}"
        name="${name}"
        value={state.${name}}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      ></textarea>`;
          } else if (fieldType === 'checkbox') {
            return `
      <label htmlFor="${name}" className="inline-flex items-center">
        <input
          type="checkbox"
          id="${name}"
          name="${name}"
          checked={state.${name}}
          onChange={handleChange}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="ml-2">${name}</span>
      </label>`;
          } else if (fieldType === 'radio') {
            return `
      <label className="inline-flex items-center">
        <input
          type="radio"
          id="${name}"
          name="${name}"
          value="${name}"
          onChange={handleChange}
          className="rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="ml-2">${name}</span>
      </label>`;
          } else if (fieldType === 'select') {
            return `
      <label htmlFor="${name}" className="block text-sm font-medium text-gray-700">${name}:</label>
      <select
        id="${name}"
        name="${name}"
        value={state.${name}}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select an option</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
      </select>`;
          } else {
            return `
      <label htmlFor="${name}" className="block text-sm font-medium text-gray-700">${name} (${type}):</label>
      <input
        type="${fieldType === 'number' ? 'number' : 'text'}"
        id="${name}"
        name="${name}"
        value={state.${name}}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />`;
          }
        })
        .join('\n')}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Component;
`;

export default componentTemplate;
