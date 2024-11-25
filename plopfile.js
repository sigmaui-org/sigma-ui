const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};
  
const workspaces = ["components", "core"];
const componentType = ["atoms", "layouts", "molecules"];
const plopGenerators = ["component", "package"];
  
const defaultOutDirs = {
  component: "components",
  package: "core",
};
  
export default function(plop) {
  plop.setHelper("capitalize", (text) => {
    return capitalize(camelCase(text));
  });

  plop.setHelper("camelCase", (text) => {
    return camelCase(text);
  });
  
  plopGenerators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: "input",
          name: `${gen}Name`,
          message: `Enter ${gen} name:`,
          validate: (value) => {
            if (!value) {
              return `${gen} name is required`;
            }

            // Check is case is correct
            if (value !== value.toLowerCase()) {
              return `${gen} name must be in lowercase`;
            }

            // Cannot have spaces
            if (value.includes(" ")) {
              return `${gen} name cannot have spaces`;
            }

            return true;
          },
        },
        {
          type: "input",
          name: "description",
          message: `The description of this ${gen}:`,
        },
        {
          when: (gen == 'component' ? true : false),
          type: 'list',
          name: 'componentType',
          message: 'Where do you want to place the component in group?',
          choices: ['🧬 Atoms', '📐 Layout', '🔩 Molecules'],
        },
        {
          when: (gen == 'component' ? true : false),
          type: 'confirm',
          name: 'includeCustomClassId',
          message: 'Does your component accept customClass and customId?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'includeSamples',
          message:
            'Do you want to include samples? (Select no, if you just want to create plain files).',
          default: true,
        },
        {
          type: "list",
          name: "outputDir",
          message: `Where do you want to place the ${gen}?`,
          default: defaultOutDirs[gen],
          choices: workspaces,
          validate: (value) => {
            if (!value) {
              return `Output Directory is required`;
            }

            return true;
          },
        },
      ],
      actions(answers) {
        const actions = [];

        if (!answers) return actions;

        const {description, outputDir} = answers;
        const generatorName = answers[`${gen}Name`] ?? "";

        const data = {
          [`${gen}Name`]: generatorName,
          description,
          outputDir,
        };

        actions.push({
          type: "addMany",
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outputDir}}/{{dashCase ${gen}Name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        });

        return actions;
      },
    });
  });
};