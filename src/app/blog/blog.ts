import { User } from '../user/user';
import { Blogentry } from '../blogentries/blogentry';

export interface Blog {
    id: number;
    name: string;
    createDate: Date;
    creator: User;
    description: string;
    blogentries: Blogentry[];
}