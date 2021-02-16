import { Component, OnInit } from '@angular/core';
import { BLOGS } from '../mock-blogs';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }

  blogs = BLOGS;

  ngOnInit(): void {
  }

}
