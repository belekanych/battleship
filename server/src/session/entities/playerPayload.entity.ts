import Cell from '../enums/cell.enum'

export class PlayerPayload {
  public field: Cell[][] = []

  constructor() {
    this.field = this.generate(10)
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
