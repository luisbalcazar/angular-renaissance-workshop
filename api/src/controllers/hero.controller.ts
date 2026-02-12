import { Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { HeroService } from '../services/hero.service';
import { HeroDTO } from '../interfaces/hero.dto';
import { Hero } from '../interfaces/hero.interface';

@autoInjectable()
export class HeroController {
  public router = Router();

  constructor(private heroService: HeroService) {
    this.setRoutes();
  }

  private setRoutes() {
    this.router.route('/').get(this.findAll);
    this.router.route('/:id').get(this.findOne);
    this.router.route('/').post(this.add);
    this.router.route('/:id').delete(this.delete);
    this.router.route('/:id').put(this.update);
    this.router.route('/:id').patch(this.update);
  }

  private findAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const heroes = await this.heroService.findAll(page, limit);
      res.status(200).send(heroes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch heroes' });
    }
  };

  private findOne = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const hero = await this.heroService.findOne(id);

      if (hero) {
        res.status(200).send(hero);
      } else {
        res.status(404).json({ error: 'Hero not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hero' });
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const heroDTO = new HeroDTO().fromJSON(req.body).toJSON();
      const newHero = await this.heroService.add(heroDTO);
      res.status(201).send(newHero);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add hero' });
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const hero = await this.heroService.findOne(id);
      if (hero) {
        this.heroService.delete(id);
        res.status(200).json({ message: 'Hero deleted successfully' });
      } else {
        res.status(404).json({ error: 'Hero not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete hero' });
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const existingHero = await this.heroService.findOne(id);
      if (!existingHero) {
        return res.status(404).json({ error: 'Hero not found' });
      }

      const { name, image, alignment, powerstats } = req.body;

      const mergedData: Hero = {
        ...existingHero,
        ...(name !== undefined && { name }),
        ...(image !== undefined && { image }),
        ...(alignment !== undefined && { alignment }),
        ...(powerstats !== undefined && {
          powerstats: { ...existingHero.powerstats, ...powerstats },
        }),
        id,
      };

      const heroDTO = new HeroDTO().fromJSON(mergedData).toJSON();
      const updatedHero = await this.heroService.update(id, heroDTO);
      res.status(200).send(updatedHero);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update hero' });
    }
  };
}
