import { Component, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons/pokemons.service';
import { RootObject as PokeApiPokemon } from 'src/app/models/pokeApiPokemon.type';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { faHeart as plainFaHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'pokui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faHeart = faHeart;
  plainFaHeart = plainFaHeart;
  faSpinner = faSpinner;

  pokemons: Object[] = [];
  pokemon: PokeApiPokemon;
  totalPokemons: number = 0;
  currentPage: number = 0;
  pageSize: number = this.settingsService.getSettings().pageSize;
  favorites: string[] = this.pokemonsService.getFavorites();
  loading: boolean = false;

  constructor(private pokemonsService: PokemonsService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.pokemonsService.getPokemons().subscribe(({ results, count }) => {
      this.pokemons = results;
      this.totalPokemons = count;
      this.loading = false;
    })
  }

  showPokemonDetails(pokemon): void {
    this.pokemonsService.getPokemonFromUrl(pokemon.url).subscribe((pokemon) => {
      this.pokemon = pokemon;
    })
  }

  changePage(page): void {
    this.pokemonsService.getPokemons(page).subscribe(({ results }) => {
      this.pokemons = results;
      this.currentPage = page;
    })
  }

  addToFavorites(pokemon: PokeApiPokemon, $event): void {
    this.pokemonsService.addToFavorites(pokemon.name);
    this.favorites = this.pokemonsService.getFavorites();
    $event.stopPropagation();
  }

  removeFromFavorites(pokemon: PokeApiPokemon, $event): void {
    this.pokemonsService.removeFromFavorites(pokemon.name);
    this.favorites = this.pokemonsService.getFavorites();
    $event.stopPropagation();
  }

  isInFavorite(pokemon: PokeApiPokemon): boolean {
    return this.favorites.includes(pokemon.name);
  }
}
