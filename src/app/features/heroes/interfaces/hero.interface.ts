export interface HeroInterface {
  id: number;
  name: string;
  powerstats: Powerstats;
  image: string;
  alignment: 'good' | 'bad' | 'neutral';
}

export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export type Powerstat = keyof Powerstats;
