import { User } from '../user/user';
import { Blogentry } from '../blogentries/blogentry';

export interface Blog {
    _id: string;
    title: string;
    createDate: Date;
    updateDate: Date;
    creator: User;
    description: string;
    blogentries: Blogentry[];
}