import { Blog } from './blog/blog';
import { Blogentry } from './blogentries/blogentry';
import { User } from './user/user';
import { Comment } from './blogentries/comment';

export const USERS: User[] = [
    { id: "1", username: 'test1', password: 'test1', email: 'test1@gmail.com', createdate: new Date(), role: 'ROLE_USER' }

]
export const BLOGENTRIES: Blogentry[] = [
    { id: "1", title: 'Test1', destination: 'Griechenland', description: 'Wunderbares Land, es ist super hier', createDate: new Date(), user: USERS[0], updateDate: new Date()}
]
export const BLOGS: Blog[] = [
    { id: "1", name: 'First Blog', createDate: new Date(), creator: USERS[0], description: 'This is a demo', blogentries: BLOGENTRIES }, 
    { id: "2", name: 'Second Blog', createDate: new Date(), creator: USERS[0], description: 'This is a demo', blogentries: BLOGENTRIES }, 
    { id: "3", name: 'Third Blog', createDate: new Date(), creator: USERS[0], description: 'This is a demo', blogentries: BLOGENTRIES }, 
    { id: "4", name: 'Fourth Blog', createDate: new Date(), creator: USERS[0], description: 'This is a demo', blogentries: BLOGENTRIES }

]
export const COMMENTS: Comment[] = [
    { id: "12",  text: "Was fuer ein geiler schiess", blogentry: BLOGENTRIES[2].id}
]

