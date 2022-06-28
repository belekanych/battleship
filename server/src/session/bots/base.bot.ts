import Cell from '../enums/cell.enum'
import Direction from '../enums/direction.enum';
import Move from '../types/move.type'
import { BotInterface } from './bot.interface'
import { Field } from '../entities/field.entity'
import { Player } from '../entities/player.entity'

const DIRECTIONS: Direction[] = [
  Direction.TOP,
  Direction.RIGHT,
  Direction.BOTTOM,
  Direction.LEFT,
]

const DEFAULT_DIRECTION = 0
const DEFAULT_OFFSET = 1

export abstract class Base extends Player implements BotInterface {
  protected previousMove: Move|null
  protected currentDirection: number = DEFAULT_DIRECTION
  protected target: Move|null

  public getNextMove(field: Field): Move {
    if (!this.target) {
      if (this.wasHit(field)) {
        this.target = this.previousMove
      }
    } else {
      if (this.wasDestroyed(field)) {
        this.target = this.findNewTarget(field)
        this.currentDirection = DEFAULT_DIRECTION
      }
    }

    if (!this.target) {
      return this.saveMove(this.getSpecificMove(field))
    }

    return this.saveMove(this.findNextHit(field))
  }

  protected getSpecificMove(field: Field): Move {
    return this.getRandomMove(field)
  }

  protected wasHit(field: Field): boolean {
    if (!this.previousMove) {
      return false
    }

    return field.get(this.previousMove.row, this.previousMove.col) === Cell.HIT
  }

  protected wasDestroyed(field: Field): boolean {
    return field.rows[this.previousMove.row][this.previousMove.col] === Cell.DESTROYED
  }

  protected findNewTarget(field: Field): Move|null {
    for (let row = 0; row < field.rows.length; row++) {
      for (let col = 0; col < field.rows[row].length; col++) {
        if (field.rows[row][col] === Cell.HIT) {
          return {
            row,
            col,
          }
        }
      }
    }

    // Target not found
    return null
  }
  
  protected findNextHit(field: Field): Move {
    let direction: Direction
    let offset = DEFAULT_OFFSET
    let move: Move

    do {
      direction = DIRECTIONS[this.currentDirection]
      const possibleMove = this.getByDirection(direction, offset)

      if (this.canHit(field, possibleMove)) {
        if (this.isHit(field, possibleMove)) {
          offset++
        } else {
          move = possibleMove
        }
      } else {
        offset = DEFAULT_OFFSET
        this.currentDirection++
      }
    } while (!move)

    return move
  }

  protected getByDirection(direction: Direction, offset: number): Move {
    let { row, col } = this.target

    switch (direction) {
      case Direction.TOP:
        row -= offset
        break
      case Direction.RIGHT:
        col += offset
        break
      case Direction.BOTTOM:
        row += offset
        break
      case Direction.LEFT:
        col -= offset
        break
    }

    return {
      row,
      col,
    }
  }

  protected canHit(field: Field, move: Move): boolean {
    if (move.row < 0 || move.col < 0 || move.row >= field.size() || move.col >= field.size()) {
      return false
    }

    if (field.get(move.row, move.col) === Cell.MISS) {
      return false
    }

    if (field.get(move.row, move.col) === Cell.DESTROYED) {
      return false
    }

    return true
  }

  protected isHit(field: Field, move: Move): boolean {
    return field.get(move.row, move.col) === Cell.HIT
  }

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