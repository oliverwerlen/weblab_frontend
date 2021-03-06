import { from } from 'rxjs';
import { User } from '../user/user';
import { Comment } from './comment';

export interface Blogentry {
    id: string;
    title: string;
    destination: string;
    description: string;
    createDate: Date;
    creator: User;
    updateDate: Date;
    comments: Comment[];
}
