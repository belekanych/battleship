import Cell from '../enums/cell.enum'
import { Field } from './field.entity'

export class PlayerPayload {
  public locationMap: Field
  public hitMap: Field

  constructor() {
    const size: number = 10

    this.locationMap = new Field(size)
    this.hitMap = new Field(size)
  }

  /**
   * True if all ships are destroyed.
   * False if at least one ship is alive.
   *
   * @returns boolean
   */
  public isLost(): boolean {
    const ships = this.locationMap.getAmount(cell => cell >= Cell.S1 && cell <= Cell.S5)
    const destroyed = this.hitMap.getAmount(cell => cell === Cell.DESTROYED)

    if (!ships) {
      return false
    }

    return ships === destroyed
  }
  
  /**
   * Returns true if all cells of this type are hit.
   *
   * @param ship 
   * @returns 
   */
  public isAllHit(ship: Cell): boolean {
    for (let rowIndex = 0; rowIndex < this.locationMap.rows.length; rowIndex++) {
      const row = this.locationMap.rows[rowIndex]

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const isShip = this.locationMap.rows[rowIndex][colIndex] === ship
        const isHit = this.hitMap.rows[rowIndex][colIndex] === Cell.HIT
        
        if (isShip && !isHit) {
          return false
        }
      }
    }

    return true
  }

  /**
   * Updates the hit map to mark a ship as destroyed.
   *
   * @param ship 
   */
  public setDestroyed(ship: Cell): void {
    this.locationMap.rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === ship) {
          this.hitMap.rows[rowIndex][colIndex] = Cell.DESTROYED
        }
      })
    })
  }
}
