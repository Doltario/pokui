export interface RootObject {
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: NameAndUrl;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

interface Language {
  name: string;
  url: string;
}

interface EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: NameAndUrl;
  version_group: NameAndUrl;
}

interface Name {
  language: NameAndUrl;
  name: string;
}

interface NameAndUrl {
  name: string;
  url: string;
}

interface Pokemon {
  is_hidden: boolean;
  pokemon: NameAndUrl;
  slot: number;
}
