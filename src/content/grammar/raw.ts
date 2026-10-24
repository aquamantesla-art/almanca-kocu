export interface RawTopic {
  id: string
  title: string
  titleTr: string
  level: 'A2' | 'B1'
  summary: string
  lesson: string
  /** exercise lines, see parseExercises */
  ex: string
}
