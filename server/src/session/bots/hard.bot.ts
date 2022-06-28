import Move from '../types/move.type'
import { Base } from './base.bot'
import { BotInterface } from './bot.interface'
import { Field } from '../entities/field.entity'
import Cell from '../enums/cell.enum'

export class Hard extends Base implements BotInterface {
  protected ships = [
    5,
    4,
    3,
    3,
    2,
  ]

  protected destroyed = 0

  protected getSpecificMove(field: Field): Move {
    this.detectDeleted(field)

    const ship = Math.max(...this.ships)

    // Calculate probability
    const probability = new Field(field.size())
    
    for (let rowIndex = 0; rowIndex < field.size(); rowIndex++) {
      for (let colIndex = 0; colIndex < field.size() - ship + 1; colIndex++) {
        let hasConflict = false

        for (let offset = 0; offset < ship; offset++) {
          if (field.get(rowIndex, colIndex + offset) !== Cell.EMPTY) {
            hasConflict = true
            break
          }
        }

        if (!hasConflict) {
          for (let offset = 0; offset < ship; offset++) {
            probability.rows[rowIndex][colIndex + offset]++
          }
        }
      }
    }
        
    for (let colIndex = 0; colIndex < field.size(); colIndex++) {
      for (let rowIndex = 0; rowIndex < field.size() - ship + 1; rowIndex++) {
        let hasConflict = false

        for (let offset = 0; offset < ship; offset++) {
          if (field.get(rowIndex + offset, colIndex) !== Cell.EMPTY) {
            hasConflict = true
            break
          }
        }

        if (!hasConflict) {
          for (let offset = 0; offset < ship; offset++) {
            probability.rows[rowIndex + offset][colIndex]++
          }
        }
      }
    }

    let max = {
      value: 0,
      row: null,
      col: null,
    }

    probability.forEach((value, row, col) => {
      if (value >= max.value) {
        max = {
          value,
          row,
          col,
        }
      }
    })

    return {
      row: max.row,
      col: max.col,
    }
  }

  protected detectDeleted(field: Field): void {
    const destroyed = field.getAmount(cell => cell === Cell.DESTROYED)

    const destroyedShip =  destroyed - this.destroyed
    const destroyedShipIndex = this.ships.findIndex(ship => ship === destroyedShip)

    if (destroyedShipIndex !== -1) {
      this.ships.splice(destroyedShipIndex, 1)
    }

    this.destroyed = destroyed
  }
}