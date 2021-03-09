import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {Blog} from "../blog/blog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../blog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User;
  roles: string[] = [];
  blogs: Blog[];
  updateForm = "";
  addForm = false;
  formGroup: FormGroup;

  constructor(private tokenStorage: TokenStorageService,
              private location: Location,
              private router: Router,
              private blogService: BlogService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUserRole();
      this.getUserDetails();
    }
    this.getBlogs();
  }

  getUserDetails(): void {
      this.authService.getUser().subscribe(
        data => {
          console.log(data);
          this.isLoggedIn = true;
          this.currentUser = data;
        },
        err => {
          console.log("Error in geting Userdetails");
          console.log(err);
        }
      );

  }

  goToLogin(): void{
    this.router.navigate(["/login"]);
  }

  getBlogs(): void {
    this.blogService.getBlogs()
      .subscribe(blogs => {
        this.blogs = blogs.filter((blog) => blog.creator._id === this.tokenStorage.getUserId());
      });
  }

  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id)
      .subscribe(() => {
        this.blogs = this.blogs.filter((blog) => blog._id !== id);
        this.openSnackBar('Blog gelöscht!');
      });
  }

  addBlog(blog: Blog): void {
    this.blogService.addBlog(blog)
      .subscribe((newBlog) => {
        this.blogs.push(newBlog);
        this.openSnackBar('Blog erstellt!');
      });
  }

  updateBlog(blog: Blog, blogId: string): void {
    this.blogService.updateBlog(blog, blogId)
      .subscribe((updatedBlog) => {
        const indexOfBlog = this.blogs.findIndex(x => x._id === blogId);
        this.blogs[indexOfBlog] = updatedBlog;
        this.updateForm = '';
        this.openSnackBar('Blog aktualisiert!');
      });
  }

  isCreatedByCurrentUser(createdUserId: String) {
    if (this.isLoggedIn) {
      if (this.tokenStorage.getUserId() == createdUserId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  showUpdateForm(blog: Blog): void {
    if (this.updateForm) {
      this.updateForm = '';
    } else {
      this.createForm();
      this.formGroup.controls['title'].setValue(blog.title);
      this.formGroup.controls['description'].setValue(blog.description);
      this.updateForm = blog._id;
      this.updateForm = blog._id;
    }
  }

  showAddForm(): void {
    if (this.addForm) {
      this.addForm = false;
    } else {
      this.addForm = true;
      this.createForm();
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
