const fs = require('fs-extra');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const yaml = require('js-yaml');
const marked = require('marked');
const dataDir = path.join(__dirname, 'data');

const random = () =>
  Math.random()
    .toString(36)
    .substring(7);

async function readYaml(file) {
  const d = await fs.readFile(path.join(dataDir, file), 'utf-8');
  return yaml.load(d);
}

async function main() {
  const defaults = await readYaml('defaults.yml');
  const sections = await readYaml('sections.yml');

  const dir = path.join(dataDir, 'questions');
  const files = (await fs.readdir(dir))
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dir, f));

  const queue = files.map(async file => {
    const data = await fs.readFile(file, 'utf-8');
    const { __content, ...meta } = yamlFront.loadFront(data);
    const [body, guidance] = marked(__content.trim()).split('<hr>');
    const id = meta.id || path.basename(file, '.md');

    return { ...defaults, ...meta, id, body, guidance };
  });

  const questionnaire = await Promise.all(queue);
  const totalPoints = questionnaire.reduce(
    (a, q) =>
      (a += Math.max(...((q.options && q.options.map(o => o.points)) || [0]))),
    0
  );

  const out = path.join(dataDir, 'questionnaire.json');
  await fs.writeJSON(out, { questionnaire, totalPoints, sections });
}

main().then(() => console.log('Built questionnaire.'));
