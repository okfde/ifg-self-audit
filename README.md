# IFG Self Audit

## Installation

```bash
yarn install
yarn serve # Devserver starten
yarn build # Productionbuild
```

Entwicklungshinweis: Der Fragenkatalog wird von einem Node-Skript aus den Markdown-Dateien zusammengebaut. Nach Veränderung der Markdowndateien muss daher `yarn build:questionaire` ausgeführt werden.

## Fragen hinzufügen

Die Fragen liegen unter `src/data/questions` im Markdown-Format. Die Reihenfolge wird bestimmt durch die alphabetische Sortierung der Dateinamen (`A.md` kommt vor `B.md`).

Beispieldatei:

```markdown
---
title: Haben Sie ein IFG?
options:
  - text: Ja
    points: 1
  - text: Nein
    points: 0
problem: Sie haben kein IFG.
guidance: Schaffen Sie ein IFG.
priority: 2
---

IFG steht für _Informationsfreiheitsgesetz_.
```

Dabei ist `title` der Titel der Frage. Nach dem Frontmatter kann ein Beschreibungstext zur Frage geschrieben werden.

Mit `options` können die Multiple-Choice-Fragen festgelegt werden - wird es weggelassen, greifen die Standardoptionen, die unter `src/data/defaults.json` definiert sind. Die Punkte werden dem Gesamtpunktestand addiert, negative Werte sind möglich. Sollen keine Antwortoptionen angezeigt werden, kann `options: false` verwendet werden (etwa bei der Willkommensnachricht).

Wird nicht die Option mit der höchsten Punktzahl ausgewählt, erscheint in der Auswahlseite der unter `problem` gesetzte Text sowie der mit `guidance` bestimmte Hilfstext.

Je höher die optionale Zahl `priority`, desto weiter oben erscheint das Problem in der Auswertung. Sie beträgt standardmäßig `0`.
