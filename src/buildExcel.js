const fs = require('fs-extra');
const path = require('path');
const xl = require('excel4node');
const _ = require('lodash');
const buildQuestionaire = require('./buildQuestionnaire');

async function main() {
  const dir = path.join(__dirname, '../', 'dist');
  const logo = path.join(__dirname, 'assets', 'logo.png');
  const file = path.join(dir, 'questionnaire.xlsx');
  await fs.mkdirp(dir);

  // Create a new instance of a Workbook class
  const wb = new xl.Workbook();

  // Add Worksheets to the workbook
  const ws = wb.addWorksheet('Fragebogen', {
    sheetView: {
      showGridLines: false
    }
  });

  // Create a reusable style
  const style = {
    font: {
      color: '#001C5A',
      size: 12,
      name: 'Inter'
    },
    alignment: {
      wrapText: true,
      vertical: 'top'
    }
  };

  const bold = _.merge({}, style, { font: { bold: true } });
  const h1 = _.merge({}, bold, {
    font: { size: 16 },
    alignment: { wrapText: false }
  });

  ws.addImage({
    path: logo,
    type: 'picture',
    position: {
      type: 'oneCellAnchor',
      from: {
        col: 1,
        colOff: 0,
        row: 1,
        rowOff: 0
      }
    }
  });
  ws.row(1).setHeight(50);

  ws.cell(2, 1)
    .string('IFG Self-Audit')
    .style(h1);
  ws.row(2).setHeight(30);

  const { questionnaire, totalPoints } = await buildQuestionaire();

  questionnaire.shift();
  questionnaire.pop();

  ws.column(2).setWidth(70);
  ws.column(4).hide();
  ws.column(5).setWidth(50);

  let row = 4;
  for (const question of questionnaire) {
    const [, part, title] = /((?:Teil \d+)|(?:\d\.?)+):? (.*)/.exec(
      question.title
    );

    let localStyle = style;

    if (part.startsWith('Teil')) {
      localStyle = bold;
      row++;
    }

    ws.cell(row, 1)
      .string(part)
      .style(localStyle);
    ws.cell(row, 2)
      .string(title)
      .style(localStyle);

    if (question.options) {
      let col = 3;

      const ref = xl.getExcelCellRef(row, col);
      const formula = `INDIRECT(ADDRESS(${row}; (${ref} + 5)))`;

      const borderStyle = {
        style: 'medium',
        color: '#0047E1'
      };

      ws.cell(row, col++).style(
        _.merge(
          {},
          {
            alignment: { horizontal: 'center', vertical: 'center' },
            fill: {
              type: 'pattern',
              patternType: 'solid',
              fgColor: '#F6F7F9',
              bgColor: '#F6F7F9'
            },
            border: {
              left: borderStyle,
              right: borderStyle,
              top: borderStyle,
              bottom: borderStyle
            }
          },
          bold
        )
      );

      ws.cell(row, col++).formula(formula);

      const options = question.options
        .map((q, i) => `(${i + 1}) ${q.text}`)
        .join('; ');
      ws.cell(row, col++)
        .string(options)
        .style(style);

      for (const option of question.options) {
        ws.cell(row, col).number(option.points);
        ws.column(col++).hide();
      }
    }

    row++;
  }

  row += 2;

  ws.cell(row, 2)
    .string('Erreichte Punkte')
    .style(bold);
  ws.cell(row++, 3)
    .formula(`SUM(D1:D${row - 2})`)
    .style(bold);

  ws.cell(row, 2)
    .string('Erreichbare Punkte')
    .style(bold);
  ws.cell(row++, 3)
    .number(totalPoints)
    .style(bold);

  wb.write(file);
}

main();
