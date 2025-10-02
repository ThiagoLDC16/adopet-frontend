interface User {
    id: number
    email: string
    name: string
    type: UserType
}

enum UserType {
    USER = 'USER',
    ONG = 'ONG',
}