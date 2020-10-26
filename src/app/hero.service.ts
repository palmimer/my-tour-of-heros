import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  getHeroes(): Observable<Hero[]>{
    // TODO: send the message _after_ fetching the heroes
    this.log('HeroService: fetched heroes');
    // return of(HEROES); // returns the mock-heroes as an Observable
    return this.http.get<Hero[]>(this.heroesUrl) // returns the heroes from the in-memory-data-service
      .pipe(
        // tap() operator looks at the observable values, does something with those values and passes them along
        tap(_ => this.log('fetched heroes')),
        // The catchError() operator intercepts an Observable that failed.
        // The operator then passes the error to the error handling function.
        catchError(this.handleError<Hero[]>('getHeroes', []))
      ); // returns the heroes from the in-memory-data-service
  }

  getHero(id: number): Observable<Hero>{
    // fetch the hero from the mock-list
    // const selectedHero = HEROES.find(hero => hero.id === id);
    // of will make it an observable
    // return of(selectedHero);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      ); // returns the hero from the in-memory-data-service
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
