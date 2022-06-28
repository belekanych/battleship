import { BotInterface } from './bot.interface'
import { Player } from '../entities/player.entity'
import Cell from '../enums/cell.enum'
import { Field } from '../entities/field.entity'
import Move from '../types/move.type'

export abstract class Base extends Player implements BotInterface {
  protected previousMove: Move|null

  protected getRandomMove(field: Field): Move {
    let row = 0;
    let col = 0;

    do {
      row = this.getRandom(field.size())
      col = this.getRandom(field.size())
    } while (field.get(row, col) !== Cell.EMPTY)

    return {
      row,
      col,
    }
  }

  protected getRandom(max: number): number {
    return Math.floor(Math.random() * max)
  }

  protected saveMove(move: Move): Move {
    this.previousMove = move

    return move
  }
}