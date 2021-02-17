import { User } from '../user/user';
import { Blogentry } from '../blogentries/blogentry';

export interface Blog {
    id: string;
    name: string;
    createDate: Date;
    creator: User;
    description: string;
    blogentries: Blogentry[];
}