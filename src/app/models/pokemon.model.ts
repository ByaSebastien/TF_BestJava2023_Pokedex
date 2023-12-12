export interface PokemonResult {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonSimple[];
}

export interface PokemonSimple {
  name: string;
  url: string;
  sprite: string;
}

export interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: Sprite;
}

export interface Sprite {
  front_default: string;
  back_default: string;
}
