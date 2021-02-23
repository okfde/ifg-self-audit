# Self-Audit für Informationsfreiheit

Mehr Informationen im [Blog](https://fragdenstaat.de/blog/2021/02/23/self-audit-fuer-informationsfreiheit/).

## Installation

```bash
yarn install
yarn dev # Devserver starten
yarn build # Productionbuild
```

## Fragen hinzufügen

Die Fragen liegen unter [`src/data/questions`](https://github.com/okfde/ifg-self-audit/tree/master/src/data/questions) im Markdown-Format. Die Reihenfolge wird bestimmt durch die alphabetische Sortierung der Dateinamen (`A.md` kommt vor `B.md`).

Beispieldatei:

```markdown
---
title: Haben Sie ein IFG?
options: # optional
  - text: Ja
    points: 1
  - text: Nein
    points: 0
id: '1.2' # optional
condition: "'1.1' == 3" # optional
section: '1' # optional
---

IFG steht für _Informationsfreiheitsgesetz_.

---

## Sie haben kein IFG.

Ein IFG ist aber wichtig.
```

Dabei ist `title` der Titel der Frage. Nach dem Frontmatter kann ein Beschreibungstext zur Frage geschrieben werden.

Mit `options` können die Multiple-Choice-Fragen festgelegt werden - wird es weggelassen, greifen die Standardoptionen, die unter [`src/data/defaults.yml`](https://github.com/okfde/ifg-self-audit/blob/master/src/data/defaults.yml) definiert sind. Die Punkte werden dem Gesamtpunktestand addiert, negative Werte sind möglich. Sollen keine Antwortoptionen angezeigt werden, kann `options: false` verwendet werden (etwa bei der Willkommensnachricht).

Wird nicht die Option mit der höchsten Punktzahl ausgewählt, erscheint in der Auswertung der nach `---` geschriebene Hilfstext.

Mit `condition` kann eine Bedingung formuliert werden. Diese besteht aus der `id` einer vorangegangenen Frage, einem Operator `==` `!=` `<=` `>=`, sowie einer Punktzahl. Die Frage wird nur gezeigt, wenn die Punktzahl der vorangeganenen Frage mit Bedingung übereinstimmt. Die `id` ist standardmäßig der Dateiname ohne `.md`.

Zudem können mit `section` mehrere Fragen gruppiert werden - alle Fragen mit derselben Angabe erscheinen in einem Schritt. Der mit `section` referenzierte Sektionstitel kann unter [`src/data/sections.yml`](https://github.com/okfde/ifg-self-audit/blob/master/src/data/sections.yml) gesetzt werden.

## Punktesystem

Die Maximalpunktzahl ergibt sich aus den addierten Höchstpunktzahlen aller Fragen. Die niedrigste Punktzahl ist 0, selbst wenn Minuspunkte erzielt wurden.
