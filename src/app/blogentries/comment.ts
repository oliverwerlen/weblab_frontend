import {User} from '../user/user';

export interface Comment {
    _id?: string;
    text: string;
    blogentry: string;
    creator?: User;
    createDate?: Date;
}
