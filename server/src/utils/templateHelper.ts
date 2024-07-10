import path from 'path';
import pug from 'pug';

export const renderTemplate = (templateName: string, variables: { [key: string]: string }) => {
  const templatePath = path.join(__dirname, `../templates/${templateName}.pug`);
  const compiledFunction = pug.compileFile(templatePath);
  return compiledFunction(variables);
};
