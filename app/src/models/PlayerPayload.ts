import Field from '@/types/Field'
import Props from '@/types/PlayerPayload'

export default class PlayerPayload {
  public field: Field

  constructor({ field }: Props) {
    this.field = field
  }
}
