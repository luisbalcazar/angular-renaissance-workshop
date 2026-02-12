import express from 'express';
import { autoInjectable } from 'tsyringe';
import cors from 'cors';
import { HeroController } from '../controllers/hero.controller';
import { UserController } from '../controllers/user.controller';

@autoInjectable()
export class ExpressApplicationService {
  private application: express.Application = express();

  constructor(
    private heroController: HeroController,
    private userController: UserController,
  ) {
    this.setConfig();
    this.setControllers();
    this.setErrorHandlingMiddleware();
  }

  get app() {
    return this.application;
  }

  private setConfig() {
    this.application.use(express.json({ limit: '50mb' }));
    this.application.use(cors());
  }

  private setControllers() {
    this.application.use('/heroes', this.heroController.router);
    this.application.use('/user', this.userController.router);
  }

  private setErrorHandlingMiddleware() {
    this.app.use(
      (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
      },
    );
  }
}
