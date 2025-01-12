import useFormGenerator from "./hooks/useFormGenerator";

const FormGenerator = () => {
  const tsTypes = [
    "string",
    "number",
    "boolean",
    "array",
    "object",
    "null",
    "undefined",
    "any",
    "unknown",
    "void",
  ];

  const {
    states,
    stateName,
    stateType,
    fieldType,
    setStateName,
    setStateType,
    setFieldType,
    addState,
    deleteState,
    downloadAsFolder,
  } = useFormGenerator();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">React Form Generator</h1>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="State name"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="block px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          
          <select
            value={stateType}
            onChange={(e) => setStateType(e.target.value)}
            className="block px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select State Type</option>
            {tsTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
            className="block px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Field Type</option>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio Button</option>
            <option value="select">Select</option>
          </select>
          <button
            onClick={addState}
            className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600"
          >
            Add
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold">List of States:</h3>
          <ul className="list-disc list-inside">
            {states.map((state, index) => (
              <li key={index}>
                {state.name}: {state.type} ({state.fieldType})
                <button
                  onClick={() => deleteState(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={downloadAsFolder}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600"
        >
          Download as Folder
        </button>
      </div>
    </div>
  );
};

export default FormGenerator;
