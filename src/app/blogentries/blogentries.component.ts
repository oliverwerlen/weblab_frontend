import { I18nPluralPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { Blogentry } from '../blogentries/blogentry'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BLOGENTRIES } from '../mock-blogs';
import { BlogentriesService } from '../blogentries.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogentries',
  templateUrl: './blogentries.component.html',
  styleUrls: ['./blogentries.component.css']
})
export class BlogentriesComponent implements OnInit {

  blog: Blog;
  blogentries: Blogentry[];
  
  constructor(  private route: ActivatedRoute,
    private location: Location, private blogentriesService: BlogentriesService, private blogService: BlogService
    ) { }

  ngOnInit(): void {
    this.getBlogentries();
  }

  getBlogentries(): void {
    const id = +this.route.snapshot.paramMap.get('_id');
    this.blogService.getBlog(id)
      .subscribe(blog => this.blog = blog);
      this.blogentries = this.blog.blogentries;
  }

  goBack(): void {
    this.location.back();
  }

}
