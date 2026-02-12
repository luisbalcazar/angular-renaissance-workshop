import { HeroInterface, Powerstat } from './hero.interface';

export interface HeroPowerstatsChange {
  hero: HeroInterface;
  powerstat: Powerstat;
  value: number;
}
