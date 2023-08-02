export class Triangle {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
  }

  render(color) {
    const height = (Math.sqrt(3) / 2) * this.side;
    const path = `M ${this.x} ${this.y - height / 2} ` +
                 `L ${this.x - this.side / 2} ${this.y + height / 2} ` +
                 `L ${this.x + this.side / 2} ${this.y + height / 2} ` +
                 `Z`;
    const fill = color ? `fill="${color}"` : '';
    return `<path d="${path}" ${fill}/>`;
  }
}

export class Circle {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  render(color) {
    const fill = color ? `fill="${color}"` : '';
    return `<circle cx="${this.cx}" cy="${this.cy}" r="${this.r}" ${fill}/>`;
  }
}

export class Square {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
  }

  render(color) {
    const fill = color ? `fill="${color}"` : '';
    return `<rect x="${this.x - this.side / 2}" y="${this.y - this.side / 2}" width="${this.side}" height="${this.side}" ${fill}/>`;
  }
}