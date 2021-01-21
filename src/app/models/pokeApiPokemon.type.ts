export interface RootObject {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: NameAndUrl[];
  game_indices: Gameindex[];
  held_items: Helditem[];
  location_area_encounters: string;
  moves: Move[];
  species: NameAndUrl;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
}

interface NameAndUrl {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: NameAndUrl;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NameAndUrl;
}

interface Sprites {
  back_female: string;
  back_shiny_female: string;
  back_default: string;
  front_female: string;
  front_shiny_female: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  other: Other;
  versions: Versions;
}

interface Versions {
  'generation-i': Generationi;
  'generation-ii': Generationii;
  'generation-iii': Generationiii;
  'generation-iv': Generationiv;
  'generation-v': Generationv;
  'generation-vi': Generationvi;
  'generation-vii': Generationvii;
  'generation-viii': Generationviii;
}

interface Generationviii {
  icons: {};
}

interface Generationvii {
  icons: {};
  'ultra-sun-ultra-moon': {};
}

interface Generationvi {
  'omegaruby-alphasapphire': {};
  'x-y': {};
}

interface Generationv {
  'black-white': {};
}

interface Generationiv {
  'diamond-pearl': {};
  'heartgold-soulsilver': {};
  platinum: {};
}

interface Generationiii {
  emerald: {};
  'firered-leafgreen': {};
  'ruby-sapphire': {};
}

interface Generationii {
  crystal: {};
  gold: {};
  silver: {};
}

interface Generationi {
  'red-blue': {};
  yellow: {};
}

interface Other {
  dream_world: {};
  'official-artwork': {};
}

interface Move {
  move: NameAndUrl;
  version_group_details: VersionGroupDetails[];
}

interface VersionGroupDetails {
  level_learned_at: number;
  version_group: NameAndUrl;
  move_learn_method: NameAndUrl;
}

interface Helditem {
  item: NameAndUrl;
  version_details: Versiondetail[];
}

interface Versiondetail {
  rarity: number;
  version: NameAndUrl;
}

interface Gameindex {
  game_index: number;
  version: NameAndUrl;
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: NameAndUrl;
}
