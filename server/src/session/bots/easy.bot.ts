import Move from '../types/move.type'
import { Base } from './base.bot'
import { BotInterface } from './bot.interface'
import { Field } from '../entities/field.entity'
import Cell from '../enums/cell.enum';

export class Easy extends Base implements BotInterface {
  public getNextMove(field: Field): Move {
    let row = 0;
    let col = 0;

    do {
      row = this.getRandom(field.rows.length)
      col = this.getRandom(field.rows[row].length)
    } while (field.rows[row][col] !== Cell.EMPTY)

    return {
      row,
      col,
    }
  }

  private getRandom(max: number): number {
    return Math.floor(Math.random() * max)
  }
}