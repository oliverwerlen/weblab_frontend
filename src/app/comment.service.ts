import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Comment } from './blogentries/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = 'http://localhost:3000/api/comment';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  postId: number;

  constructor(private http: HttpClient) { }

  getCommentsByBlogentry(id: string):Observable<Comment[]>{
    const url = `${this.commentUrl}/${id}`;
    console.log(url);
    return this.http.get<Comment[]>(this.commentUrl)
    .pipe(
      catchError(this.handleError<Comment[]>('getComment', []))
    );
  }

  getComment(id: string):Observable<Comment[]>{
    const url = `${this.commentUrl}/${id}`;
    console.log(url);
    return this.http.get<Comment[]>(this.commentUrl)
    .pipe(
      catchError(this.handleError<Comment[]>('getComment', []))
    );
  }
  addComment(comment: Comment):Observable<Comment>{
    return this.http.post<Comment>(this.commentUrl, JSON.stringify(comment), this.httpOptions).pipe(
      tap((newComment: Comment) => console.log(`added comment w/ `)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  deleteComment(commentId: string): Observable<Comment> {
    const url = `${this.commentUrl}/${commentId}`;
    return this.http.delete<Comment>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted comment id=${commentId}`)),
      catchError(this.handleError<Comment>('deletedComment'))
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
