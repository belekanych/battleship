import Move from '../types/move.type'
import { Base } from './base.bot'
import { BotInterface } from './bot.interface'
import { Field } from '../entities/field.entity'

export class Easy extends Base implements BotInterface {
  public getNextMove(field: Field): Move {
    return this.getRandomMove(field)
  }
}