import { I18nPluralPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog/blog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogentriesService } from '../blogentries.service';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Comment } from './comment';
import { Blogentry } from './blogentry'
import {TokenStorageService} from "../token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  updateForm = "";
  isBlogCreator = false;

  constructor( private route: ActivatedRoute, private location: Location, private blogentriesService: BlogentriesService, private tokenStorage: TokenStorageService, private blogService: BlogService, private commentService: CommentService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  getBlogentries(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogentriesService.getBlogsentries(id)
      .subscribe(
        blogentries => {
          this.blogentries = blogentries;
        });
  };

  ngOnInit(): void {
    this.getBlogentries();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.userId = this.tokenStorage.getUserId();
      this.isBlogOfUser();
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'blogid': [null, Validators.required],
      'imageid': [null, Validators.required]
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

  uploadEvent($event: any) {
    if($event.event.body){
      let imageId = $event.event.body[0]._id;
      console.log(imageId)
      this.formGroup.controls['imageid'].setValue(imageId)
    }
  }

  showUpdateForm(blogentry: Blogentry):void{
    if(this.updateForm){
      this.updateForm= "";
    }else{
      this.createForm();
      this.updateForm = blogentry._id;
    }
  }

  loadComments(blogentryId: string): void{
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

  deleteBlogentry(id: string): void {
    this.blogentriesService.deleteBlogentry(id)
    .subscribe(() => {
      this.blogentries = this.blogentries.filter((blogentry) => blogentry._id !== id);
      this.openSnackBar("Blogentry gelöscht!");
    });
  }

  updateBlogentry(blogentry: Blogentry, blogentryId: string):void{
    this.blogentriesService.updateBlogentry(blogentry, blogentryId)
    .subscribe((updatedBlogentry) => {
      const indexOfBlog = this.blogentries.findIndex(x => x._id === blogentryId);
      this.blogentries[indexOfBlog] = updatedBlogentry;
      this.updateForm = "";
      this.openSnackBar("Blogentry aktualisiert!");
    });
  }

  postComment(blogentryId: string): void{
    this.commentService.addComment({"text": this.commentText, "blogentry": blogentryId}).subscribe(comment => {
      this.blogentries.forEach((blogentry) => {
        if (blogentry._id === blogentryId) { blogentry.comments.push(comment); }
      });
    });
    this.commentText = '';
  }
  deleteComment(commentId: string, blogentryId: string): void {
    this.commentService.deleteComment(commentId).subscribe();
    this.blogentries.forEach((blogentry) => {
      if (blogentry._id === blogentryId) {
        blogentry.comments = blogentry.comments.filter((comment) => comment._id !== commentId);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  addBlogentry(blogentry: Blogentry): void {
    this.blogentriesService.addBlogentry(blogentry)
    .subscribe((blogentry) => {
      this.blogentries.push(blogentry);
      this.openSnackBar("Blogentry erstellt!");
      this.addForm = false;
    });
  }

  goBack(): void {
    this.location.back();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2000,
    });
  }

  isBlogOfUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id)
      .subscribe((blog) => {
        console.log(blog);
        console.log(this.userId);
        if (blog.creator._id === this.userId) {
          this.isBlogCreator = true;
        } else {
          this.isBlogCreator = false;
        }
      });

  }

}
