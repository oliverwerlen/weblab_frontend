import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Blog } from './blog';
import { BlogService} from '../blog.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Blog[];
  constructor(private blogService: BlogService) { }

  getBlogs(): void{
    this.blogService.getBlogs()
    .subscribe(blogs => this.blogs = blogs);
  }
  ngOnInit(): void {
    this.getBlogs();
  }

}
