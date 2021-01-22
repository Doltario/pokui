import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootObject as PokeApiPokemon } from 'src/app/models/pokeApiPokemon.type';
import { RootObject as PokeApiPokemons } from 'src/app/models/pokeApiPokemons.type';
import { RootObject as PokeApiAbility } from 'src/app/models/pokeApiAbility.type';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private readonly FAVORITE_KEY = 'favorites';
  private defaultFavorites: string[] = [];

  constructor(private http: HttpClient, private settingsService: SettingsService) {
    if (!this.getFavorites()) this.setFavorites(this.defaultFavorites);
  }

  getPokemons(page: number = 0): Observable<PokeApiPokemons> {
    const limit = this.settingsService.getSettings().pageSize;
    const offset = page ? (page - 1) * limit : 0;

    return this.http.get<PokeApiPokemons>(`${environment.POKE_API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonFromName(pokemonName: string): Observable<PokeApiPokemon> {
    return this.http.get<PokeApiPokemon>(`${environment.POKE_API_URL}/pokemon/${pokemonName}`);
  }

  getAbilityFromName(abilityName: string): Observable<PokeApiAbility> {
    return this.http.get<PokeApiAbility>(`${environment.POKE_API_URL}/ability/${abilityName}`);
  }

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.FAVORITE_KEY));
  }

  setFavorites(favorites: string[]) {
    localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(favorites));
  }

  addToFavorites(pokemonName: string): void {
    let favorites: string[] = this.getFavorites();
    favorites.push(pokemonName);
    this.setFavorites([...new Set(favorites)]); // The Set ensures there is no duplicate
  }

  removeFromFavorites(pokemonName: string): void {
    let favorites: string[] = this.getFavorites();
    const newFavorites = favorites.filter(favorite => favorite !== pokemonName);
    this.setFavorites(newFavorites);
  }
}
