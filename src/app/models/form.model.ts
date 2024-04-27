export interface Form {
  id: string,
  date: string,
  patientId: string,
  doctorId: string,
  score: number,
  answers: Answer[]
}

export interface Question {
  id: string,
  content: string,
}

export interface Answer extends Question {
  answer: number
}
