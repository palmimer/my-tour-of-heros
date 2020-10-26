import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
  // This component is interested in the route's parameters extracted from the URL.
  // The "id" parameter is the id of the hero to display.
  // The location is an Angular service for interacting with the browser.
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // get the id from ActivatedRout
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    // Route parameters are always strings. The JavaScript (+) operator converts the string to a number.
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
