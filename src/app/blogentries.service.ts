import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Blogentry } from './blogentries/blogentry';

@Injectable({
  providedIn: 'root'
})
export class BlogentriesService {

  private commentUrl = 'http://localhost:3000/api/comment';

  constructor(private http: HttpClient) { }


  private blogsUrl = 'http://localhost:3000/api/blog';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBlogsentries(blogId: string): Observable<Blogentry[]> {
    const url = `${this.blogsUrl}/${blogId}/blogentries`;
    return this.http.get<Blogentry[]>(url)
    .pipe(
      catchError(this.handleError<Blogentry[]>('getBlogentries', []))
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
