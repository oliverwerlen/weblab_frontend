import { Injectable } from '@angular/core';
import { Blog } from './blog/blog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }
  
  private blogsUrl = 'http://localhost:3000/api/blog';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl)
    .pipe(
      catchError(this.handleError<Blog[]>('getBlogs', []))
    );
  }

  getBlog(id: string):Observable<Blog>{
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
    );
  }

  deleteBlog(id: string):Observable<Blog>{
    const url = `${this.blogsUrl}/${id}`;
    return this.http.delete<Blog>(url).pipe(
      tap(_ => console.log(`deleted blog id=${id}`)),
      catchError(this.handleError<Blog>(`delete Blog id=${id}`))
    );
  }

  updateBlog(blog: Blog, blogId: string):Observable<any>{
    console.log(blogId)
    const url = `${this.blogsUrl}/${blogId}`;
    console.log(url)
    return this.http.patch(url, blog, this.httpOptions).pipe(
      tap(_ => console.log(`updated blog`)),
      catchError(this.handleError<Blog>(`updated blog`))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
