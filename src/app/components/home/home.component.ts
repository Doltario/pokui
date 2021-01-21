import { Component, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons/pokemons.service';
import { RootObject as PokeApiPokemon } from 'src/app/models/pokeApiPokemon.type';

@Component({
  selector: 'pokui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemons: Object[] = [];
  pokemon: PokeApiPokemon;
  totalPokemons: number = 0;
  currentPage: number = 0;

  constructor(private pokemonsService: PokemonsService) { }

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe(({ results, count }) => {
      this.pokemons = results;
      this.totalPokemons = count;
    })
  }

  showPokemonDetails(pokemon): void {
    this.pokemonsService.getPokemonFromUrl(pokemon.url).subscribe((pokemon) => {
      this.pokemon = pokemon;
    })
  }

  changePage(page) {
    this.pokemonsService.getPokemons(page).subscribe(({ results }) => {
      this.pokemons = results;
      this.currentPage = page;
    })
  }
}
