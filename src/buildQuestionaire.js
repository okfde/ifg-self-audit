const fs = require('fs-extra');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const marked = require('marked');
const defaults = require('./data/defaults.json');

const random = () =>
  Math.random()
    .toString(36)
    .substring(7);

async function main() {
  const dir = path.join(__dirname, 'data', 'questions');
  const files = (await fs.readdir(dir))
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dir, f));

  const queue = files.map(async file => {
    const data = await fs.readFile(file, 'utf-8');
    const { __content, ...meta } = yamlFront.loadFront(data);
    const body = marked(__content.trim());
    const id = random();

    return { ...defaults, ...meta, id, body };
  });

  const questionaire = await Promise.all(queue);
  const totalPoints = questionaire.reduce(
    (a, q) =>
      (a += Math.max(...((q.options && q.options.map(o => o.points)) || [0]))),
    0
  );

  const version = random();
  const out = path.join(__dirname, 'data', 'questionaire.json');
  await fs.writeJSON(out, { questionaire, totalPoints, version });
}

main();
