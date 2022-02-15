export interface Note {
  id?: number,
  text: string,
  date?: Date,
  deadline?: Date,
  checked: boolean
}

export interface AuthRequest {
  login: string
  password: string
}

export interface Token {
  token: string
}
