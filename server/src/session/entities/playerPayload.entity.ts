import Cell from '../enums/cell.enum'

export class PlayerPayload {
  public field: Cell[][] = []

  constructor() {
    this.field = this.generate(10)
  }

  /**
   * True if all ships are destroyed.
   * False if at least one ship is alive.
   *
   * @returns boolean
   */
  public isLost(): boolean {
    for (const row of this.field) {
      for (const cell of row) {
        if (cell >= Cell.S1 && cell <= Cell.S5) {
          return false
        }
      }
    }
    
    return true
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
