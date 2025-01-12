const schemaTemplate = (states: { name: string; type: string }[]) => `
import { z } from 'zod';

export const schema = z.object({
  ${states
    .map((state) => {
      if (state.type === 'boolean') {
        return `${state.name}: z.boolean(),`;
      } else if (state.type === 'number') {
        return `${state.name}: z.number(),`;
      } else if (state.type === 'array') {
        return `${state.name}: z.array(z.any()),`;
      } else if (state.type === 'object') {
        return `${state.name}: z.object({}).optional(),`;
      } else {
        return `${state.name}: z.string().nonempty(),`;
      }
    })
    .join('\n')}
});
`;

export default schemaTemplate;
