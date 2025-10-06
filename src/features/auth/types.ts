export interface User {
    id: number
    email: string
    name: string
    type: UserType
}

export enum UserType {
    USER = 'USER',
    ONG = 'ONG',
}