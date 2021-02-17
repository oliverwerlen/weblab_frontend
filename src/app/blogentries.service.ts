import { Injectable } from '@angular/core';
import { BLOGENTRIES } from './mock-blogs';
import { Blogentry } from './blogentries/blogentry';

@Injectable({
  providedIn: 'root'
})
export class BlogentriesService {

  getBlogentries(): Blogentry[] {
    //data fetch goes here
    return BLOGENTRIES;
  }
  constructor() { }
}
