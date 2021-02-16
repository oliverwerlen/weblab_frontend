import { User } from "../user/user";
import { Blogentry } from "./blogentry";

export interface Comment {
    user: User;
    text: string;
    blogentry: Blogentry;
    createDate: Date;
