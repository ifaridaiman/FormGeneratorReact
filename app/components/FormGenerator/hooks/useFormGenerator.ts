import { useState } from 'react';
import JSZip from 'jszip';
import componentTemplate from '../template/componentTemplate';
import hookTemplate from '../template/hookTemplate';
import schemaTemplate from '../template/schemaTemplate';

const useFormGenerator = () => {
    const [states, setStates] = useState<{ name: string; type: string; fieldType: string }[]>([]);
    const [stateName, setStateName] = useState('');
    const [stateType, setStateType] = useState('');
    const [fieldType, setFieldType] = useState('');

    // Add a new state definition
    
    const addState = () => {
        if (stateName && stateType && fieldType) {
            setStates([...states, { name: stateName, type: stateType, fieldType }]);
            setStateName('');
            setStateType('');
            setFieldType('');
        }
    };

    const deleteState = (index: number) => {
        const updatedStates = states.filter((_, i) => i !== index);
        setStates(updatedStates);
    };

    const downloadAsFolder = () => {
        const zip = new JSZip();

        zip.file('Component.tsx', componentTemplate(states));
        zip.file('useComponent.ts', hookTemplate(states));
        zip.file('schema.ts', schemaTemplate(states));

        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'form-generator.zip';
            a.click();
        });
    };

    return {
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
    };
};

export default useFormGenerator;
