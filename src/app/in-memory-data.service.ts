import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const heroes = [
      { id: 11, name: 'Bóbita' },
      { id: 12, name: 'Naruto' },
      { id: 13, name: 'Bombarto' },
      { id: 14, name: 'Cerbona' },
      { id: 15, name: 'Magnum' },
      { id: 16, name: 'Rágógumi' },
      { id: 17, name: 'Dinamit' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Vulkán' },
      { id: 20, name: 'Láva' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
