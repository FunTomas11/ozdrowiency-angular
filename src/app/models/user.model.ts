export interface User {
  id: string,
  email: string,
  password: string,
  name: string,
  surname: string
}

export interface Doctor extends User {
  specialization: string,
  phone: string
}

export interface Patient extends User {
  pesel: string,
  phone: string,
  dateOfBirth: string
}
