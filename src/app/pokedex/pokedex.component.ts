import {Component, OnInit} from '@angular/core';
import {PokemonDetail, PokemonResult, PokemonSimple} from "../models/pokemon.model";
import {PokemonService} from "../services/pokemon.service";
import {HttpClient} from "@angular/common/http";
import {forkJoin, mergeMap, Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonResult!: PokemonResult;
  currentPokemon?: PokemonDetail;

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getMany("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  }

  getMany(url: string) {
    this._pokemonService.getMany(url).subscribe((data) => {
      this.pokemonResult = data;
      for(let pokemon of this.pokemonResult.results){
        this._http.get<any>(pokemon.url).subscribe((detail) => {
          pokemon.sprite = detail.sprites.front_default;
        });
      }
      // let obs : Observable<any>[] = [];
      // for(let pokemon of this.pokemonResult.results){
      //   obs.push(this._http.get<any>(pokemon.url));
      // }
      // forkJoin(obs).subscribe((data)=>{
      //   for (let i in this.pokemonResult.results){
      //     this.pokemonResult.results[i].sprite = data[i].sprites.front_default;
      //   }
      // });
    });
    // this._pokemonService.getMany(url)
    //   .pipe(switchMap((data: PokemonResult)=>{
    //     this.pokemonResult=data;
    //     return forkJoin(data.results.map(d => this._pokemonService.getOne(d.url)))
    //   })).subscribe((details) =>{
    //   console.log(details)
    //   for (let i in this.pokemonResult.results){
    //         this.pokemonResult.results[i].sprite = details[i].sprites.front_default;
    //       }
    // });
  }

  getOne(url: string) {
    this._pokemonService.getOne(url).subscribe((data) => this.currentPokemon = data);
  }

  next(){
    if(!this.pokemonResult.next){
      return;
    }
    this.getMany(this.pokemonResult.next);
  }

  previous(){
    if(!this.pokemonResult.previous){
      return;
    }
    this.getMany(this.pokemonResult.previous);
  }
}
