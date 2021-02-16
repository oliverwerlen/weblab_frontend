import { User } from '../user/user';

export interface Blogentry{
    id: number
    title: string
    destination: string
    description: string
    createDate: Date
    user: User
    updateDate: Date
}
