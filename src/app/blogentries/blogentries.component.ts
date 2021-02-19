import { I18nPluralPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { Blogentry } from '../blogentries/blogentry'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BLOGENTRIES } from '../mock-blogs';
import { BlogentriesService } from '../blogentries.service';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import { NgForm } from '@angular/forms';
import { Comment } from './comment';

@Component({
  selector: 'app-blogentries',
  templateUrl: './blogentries.component.html',
  styleUrls: ['./blogentries.component.css']
})
export class BlogentriesComponent implements OnInit {

  blog: Blog;
  comments: Comment[];
  commentText: string;
  
  constructor(  private route: ActivatedRoute,
    private location: Location, private blogentriesService: BlogentriesService, private blogService: BlogService, private commentService: CommentService
    ) { }
  
  getBlogentries(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id)
      .subscribe(blog => this.blog = blog);
  }
  ngOnInit(): void {
    console.log("init"); 
    this.getBlogentries();
  }
  loadComments(blogentryId: string): void{
    console.log("load comments" + blogentryId);
    this.commentService.getCommentsByBlogentry(blogentryId)
    .subscribe(comments => this.comments = comments);
  }

  postComment(blogentryId: string): void{
    console.log("posted" + this.commentText);
    this.commentService.addComment({"text": this.commentText, "blogentry": blogentryId}).subscribe(comment => {
      this.comments.push(comment);
    });;
  }

  goBack(): void {
    this.location.back();
  }

}
