import Cell from '../enums/cell.enum'

export class Field {
  public rows: Cell[][] = []

  constructor(size: number = 0) {
    this.rows = this.generate(size)
  }

  public getAmount(condition: (cell: Cell) => boolean): number {
    let amount = 0

    this.rows.forEach(row => {
      row.forEach(cell => {
        if (condition(cell)) {
          amount++
        }
      })
    })

    return amount
  }

  public size(): number {
    return this.rows.length
  }

  public get(row: number, col: number): Cell {
    return this.rows[row][col]
  }

  public getRow(row: number): Cell[] {
    return this.rows[row]
  }

  public forEach(handle: (cell: Cell, rowIndex: number|null, colIndex: number|null) => void): void {
    this.rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        handle(cell, rowIndex, colIndex)
      })
    })
  }

  private generate(size: number): Cell[][] {
    const field: Cell[][] = [];

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const row = []
      for (let colIndex = 0; colIndex < size; colIndex++) {
        row.push(Cell.EMPTY)
      }
      field.push(row)
    }

    return field
  }
}
