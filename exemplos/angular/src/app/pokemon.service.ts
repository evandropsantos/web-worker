import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  }
}

// async function api() {
//   const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
//   const { results } = await response.json();
//   return results;
// }
