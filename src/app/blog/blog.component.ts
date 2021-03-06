import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Blog } from './blog';
import { BlogService} from '../blog.service';
import { Observable, of } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Blog[];
  isLoggedIn = false;
  updateForm = "";
  addForm = false;
  roles: string[] = [];
  formGroup: FormGroup;

  constructor(private blogService: BlogService, private tokenStorage: TokenStorageService, private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router ) { }


  getBlogs(): void{
    this.blogService.getBlogs()
    .subscribe(blogs => this.blogs = blogs);
  }

  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id)
    .subscribe(() => this.openSnackBar("deleted"));
    this.reloadPage();
  }

  addBlog(blog: Blog): void {
    this.blogService.addBlog(blog)
    .subscribe(() => this.openSnackBar("added"));
    this.reloadPage();
  }

  updateBlog(blog: Blog, blogId: string): void {
    console.log(blog);
    this.blogService.updateBlog(blog, blogId)
    .subscribe(() => this.openSnackBar("updated"));
    this.reloadPage();
  }


  isCreatedByCurrentUser(createdUserId: String){
    if(this.isLoggedIn){
      if(this.tokenStorage.getUserId() == createdUserId){
        return true;
      }else{return false;}
    }else{return false;}
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  showUpdateForm(blog: Blog):void{
    if(this.updateForm){
      this.updateForm= "";
    }else{
      this.createForm();
      this.formGroup.controls['title'].setValue(blog.title)
      this.formGroup.controls['description'].setValue(blog.description)
      this.updateForm = blog._id;
      this.updateForm = blog._id;
    }
  }

  showAddForm():void{
    if(this.addForm){
      this.addForm = false;
    }else{
      this.addForm=true
      this.createForm();
    }
  }
  ngOnInit(): void {
    this.getBlogs();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUserRole();
      //this.goToLogin();
      console.log(this.roles);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2000,
    });
  }

}
