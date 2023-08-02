import { colorsArray } from './colorsArray.js';
import fs from 'fs';
import inquirer from 'inquirer';
import { Triangle, Circle, Square } from './lib/shapes.js';

const canvasWidth = 300;
const canvasHeight = 200;

// Use inquirer to prompt the user for input
inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (hexadecimal, i.e.#CD5C5C) or keyword (refer to colorsArray.js)):',
      validate: (input) => isValidColor(input),
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (hexadecimal or keyword):',
      validate: (input) => isValidColor(input),
    },
  ])
  .then((answers) => {
    let shape;
    const text = {
      _attributes: {
        x: canvasWidth / 2,
        y: canvasHeight / 1.35,
        'text-anchor': 'middle',
        fill: answers.textColor,
      },
      _text: answers.text.toUpperCase(),
      render: function() { 
        return ` 
          <text x="${this._attributes.x}" y="${this._attributes.y}" 
                text-anchor="${this._attributes['text-anchor']}"
                fill="${this._attributes.fill}" font-size="${fontSize}">
            ${this._text}
          </text>
        `;
      },
    };

    let fontSize;
    switch (answers.shape) {
      case 'Circle':
        const circleRadius = Math.min(canvasWidth, canvasHeight) * 0.45;
        shape = new Circle(canvasWidth / 2, canvasHeight / 2, circleRadius);
        text._attributes.y = canvasHeight / 1.65;
        fontSize = 56;
        break;
      case 'Triangle':
        const triangleHeight = Math.min(canvasWidth, canvasHeight) * 1.1;
        shape = new Triangle(canvasWidth / 2, canvasHeight / 2, triangleHeight);
        fontSize = 48;
        break;
      case 'Square':
        const squareSize = Math.min(canvasWidth, canvasHeight) * 0.8;
        shape = new Square(canvasWidth / 2, canvasHeight / 2, squareSize);
        text._attributes.y = canvasHeight / 1.65;
        fontSize = 64;
        break;
    }

    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
        ${shape.render(answers.shapeColor)}
        ${text.render()}
      </svg>`;

    const filename = 'logo.svg'; // Replace with the desired filename
    fs.writeFileSync(filename, svgData.toString());

    console.log(`Generated ${filename}`);
  })
  .catch((error) => {
    console.error(error);
  });

// Helper function to validate color input
function isValidColor(input) {
  const isColorName = colorsArray.includes(input.toLowerCase());
  const isHexCode = /^#[0-9A-F]{6}$/i.test(input);
  return isColorName || isHexCode;
}
