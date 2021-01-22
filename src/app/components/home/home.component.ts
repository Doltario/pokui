import { Component, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons/pokemons.service';
import { RootObject as PokeApiPokemon } from 'src/app/models/pokeApiPokemon.type';
import { Ability } from 'src/app/models/ability.type';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { faHeart as plainFaHeart, faSpinner, faArrowsAltV, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
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
  faArrowsAltV = faArrowsAltV;
  faWeightHanging = faWeightHanging

  pokemons: Object[] = [];
  pokemon: PokeApiPokemon;
  abilities: Ability[] = [];
  totalPokemons: number = 0;
  currentPage: number = 0;
  pageSize: number = this.settingsService.getSettings().pageSize;
  favorites: string[] = this.pokemonsService.getFavorites();
  loading: boolean = false;
  loadingPokemon: boolean = false;

  constructor(private pokemonsService: PokemonsService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.pokemonsService.getPokemons().subscribe(({ results, count }) => {
      this.pokemons = results;
      this.totalPokemons = count;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      console.error(error);
    })
  }

  showPokemonDetails(pokemon): void {
    this.abilities = [];
    this.loadingPokemon = true;
    this.pokemonsService.getPokemonFromName(pokemon.name).subscribe(pokemon => {
      this.pokemon = pokemon;
      this.loadingPokemon = false;
      pokemon.abilities.forEach(({ ability }) => {
        this.pokemonsService.getAbilityFromName(ability.name).subscribe(ability => {
          const { name } = ability;
          const effect = ability.effect_entries.filter(effect_entry => effect_entry.language.name === "en");
          this.abilities.push({ name, effect: effect[0].effect });
        }, (error) => {
          console.error(error);
        })
      });
    }, (error) => {
      console.error(error);
    })
  }

  changePage(page): void {
    this.pokemonsService.getPokemons(page).subscribe(({ results }) => {
      this.pokemons = results;
      this.currentPage = page;
    }, (error) => {
      console.error(error);
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
