export default function(question, answers) {
  const conditionRegex = /'(.+)' ([!=]=) (\d+)/;
  const [, id, op, com] = conditionRegex.exec(question.condition) || [];

  if (!id || !op || !com) return true;

  const p = answers.find(a => a.id === id)?.choice?.points;
  let state = true;

  switch (op) {
    case '==':
      state = p == com;
      break;
    case '!=':
      state = p != com;
      break;
    case '<=':
      state = p <= com;
      break;
    case '>=':
      state = p >= com;
      break;
  }

  return state;
}
