import Cell from '@/enums/Cell'

export default class Ship {
  constructor(public cell: Cell, public name: string, public length: number) {
  }
}
