import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RootObject as PokeApiPokemon } from 'src/app/models/pokeApiPokemon.type';
import { RootObject as PokeApiPokemons } from 'src/app/models/pokeApiPokemons.type';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  getPokemons(page = 0) {
    const limit = 20;
    const offset = page ? (page - 1) * limit : 0;

    return this.http.get<PokeApiPokemons>(`${environment.POKE_API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonFromUrl(url) {
    return this.http.get<PokeApiPokemon>(`${url}`);
  }
}
