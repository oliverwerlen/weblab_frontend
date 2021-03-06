import { I18nPluralPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogentriesService } from '../blogentries.service';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Comment } from './comment';
import { Blogentry } from './blogentry'
import {TokenStorageService} from "../token-storage.service";
import {MatSnackBar} from '@angular/material/snack-bar';

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
  addForm = false;
  showAddBlogentry = false;
  userId = '';
  formGroup: FormGroup;

  constructor( private route: ActivatedRoute, private location: Location, private blogentriesService: BlogentriesService, private tokenStorage: TokenStorageService, private blogService: BlogService, private commentService: CommentService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  getBlogentries(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogentriesService.getBlogsentries(id)
      .subscribe(
        blogentries => this.blogentries = blogentries
        );
        console.log(this.blogentries)
  }
  ngOnInit(): void {
    this.getBlogentries();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.userId = this.tokenStorage.getUserId();
    }
  }
  createForm(){
    this.formGroup = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required], 
      'blogid': [null, Validators.required]
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.formGroup.controls['blogid'].setValue(id)
  }

  showAddForm():void{
    if(this.addForm){
      this.addForm = false;
    }else{
      this.addForm=true
      this.createForm();
    }
  }

  loadComments(blogentryId: string): void{
    console.log(this.blogentries);
    console.log("load comments" + blogentryId);
    this.commentService.getCommentsByBlogentry(blogentryId)
    .subscribe(comments => this.comments = comments);
  }

  isCreatedByCurrentUser(createdUserId: String){
    if(this.isLoggedIn){
      if(this.tokenStorage.getUserId() == createdUserId){
        return true;
      }else{
        return false;}
    }else{return false;}
  }

  deleteBlogentry(id: string):void{
    this.blogentriesService.deleteBlogentry(id)
    .subscribe(() => this.openSnackBar("deleted"))
    //this.reloadPage()
  }


  updateBlogentry(blogentry: Blogentry, blogentryId: string):void{
    this.blogentriesService.updateBlogentry(blogentry, blogentryId)
    .subscribe(() => this.openSnackBar("updated"))
    this.reloadPage()
  }

  postComment(blogentryId: string): void{
    console.log("posted" + this.commentText);
    this.commentService.addComment({"text": this.commentText, "blogentry": blogentryId}).subscribe(comment => {
      this.comments.push(comment);
    });
  }
  deleteComment(commentId: string):void{
    this.commentService.deleteComment(commentId).subscribe();
  }

  reloadPage(): void {
    window.location.reload();
  }

  addBlogentry(blogentry: Blogentry):void{
    this.blogentriesService.addBlogentry(blogentry)
    .subscribe(() => this.openSnackBar("added"))
    this.reloadPage()
  }
  goBack(): void {
    this.location.back();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2000, 
    });
  }

}
