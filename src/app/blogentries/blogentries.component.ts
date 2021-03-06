import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogentriesService } from '../blogentries.service';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import { Comment } from './comment';
import { Blogentry } from './blogentry';
import {TokenStorageService} from "../token-storage.service";

@Component({
  selector: 'app-blogentries',
  templateUrl: './blogentries.component.html',
  styleUrls: ['./blogentries.component.css']
})
export class BlogentriesComponent implements OnInit {

  blogentries: Blogentry[];
  comments: Comment[];
  commentText: string;
  loaded = false;
  isLoggedIn = false;
  userId = '';

  constructor( private route: ActivatedRoute, private location: Location, private blogentriesService: BlogentriesService, private tokenStorage: TokenStorageService, private blogService: BlogService, private commentService: CommentService
    ) { }

  getBlogentries(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogentriesService.getBlogsentries(id)
      .subscribe(
        blogentries => this.blogentries = blogentries
        );
  };

  ngOnInit(): void {
    console.log("init");
    this.getBlogentries();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.userId = this.tokenStorage.getUserId();
    }
  }

  loadComments(blogentryId: string): void{
    console.log(this.blogentries);
    console.log("load comments" + blogentryId);
    this.commentService.getCommentsByBlogentry(blogentryId)
    .subscribe(comments => this.comments = comments);
  }

  postComment(blogentryId: string): void{
    console.log("Create " + this.commentText + " with " + blogentryId);
    this.commentService.addComment({"text": this.commentText, "blogentry": blogentryId}).subscribe(comment => {
      this.blogentries.forEach((blogentry) => {
        if (blogentry._id === blogentryId) { blogentry.comments.push(comment); }
      });
    });
    this.commentText = '';
  }
  deleteComment(commentId: string, blogentryId: string): void {
    this.commentService.deleteComment(commentId).subscribe();
    // tslint:disable-next-line:triple-equals
    this.blogentries.forEach((blogentry) => {
      if (blogentry._id === blogentryId) {
        blogentry.comments = blogentry.comments.filter((comment) => comment._id !== commentId);
        console.log(blogentry.comments);
      }
    });
    console.log(this.blogentries);
  }

  goBack(): void {
    this.location.back();
  }

}
