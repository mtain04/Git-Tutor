export type ExerciseChoice = {
  name: string
  value: string
}

export type ExerciseStep = {
  title: string
  description: string
  commands: string[]
  expected: string[]
}
