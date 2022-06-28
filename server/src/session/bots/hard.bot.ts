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
    return this.findMax(
      this.calculateProbability(
        field,
        this.findShip(field)
      )
    )
  }

  protected findShip(field): number {
    this.detectDestroyed(field)

    return Math.max(...this.ships)
  }

  protected detectDestroyed(field: Field): void {
    const destroyed = field.getAmount(cell => cell === Cell.DESTROYED)

    const destroyedShip =  destroyed - this.destroyed
    const destroyedShipIndex = this.ships.findIndex(ship => ship === destroyedShip)

    if (destroyedShipIndex !== -1) {
      this.ships.splice(destroyedShipIndex, 1)
    }

    this.destroyed = destroyed
  }

  protected calculateProbability(field: Field, ship: number): Field {
    const probability = new Field(field.size())
    
    for (let isHorizontal = 0; isHorizontal <= 1; isHorizontal++) {
      for (let i = 0; i < field.size(); i++) {
        for (let j = 0; j < field.size() - ship + 1; j++) {
          let hasConflict = false
  
          for (let offset = 0; offset < ship; offset++) {
            const rowIndex = isHorizontal ? i : j + offset
            const colIndex = isHorizontal ? j + offset : i

            if (field.get(rowIndex, colIndex) !== Cell.EMPTY) {
              hasConflict = true
              break
            }
          }
  
          if (!hasConflict) {
            for (let offset = 0; offset < ship; offset++) {
              const rowIndex = isHorizontal ? i : j + offset
              const colIndex = isHorizontal ? j + offset : i

              probability.rows[rowIndex][colIndex + offset]++
            }
          }
        }
      }
    }

    return probability
  }

  protected findMax(probability: Field): Move {
    let max = {
      value: -1,
      row: null,
      col: null,
    }

    probability.forEach((value, row, col) => {
      if (value > max.value) {
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
}