import FieldType from '@/types/Field'
import FieldRow from '@/types/FieldRow'

export default class Field {
  public rows: FieldRow[]

  constructor({ rows }: FieldType = { rows: [] }) {
    this.rows = rows
  }
}
