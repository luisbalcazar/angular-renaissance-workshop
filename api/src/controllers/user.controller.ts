import { Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { UserService } from '../services/user.service';

@autoInjectable()
export class UserController {
  public router = Router();

  constructor(private userService: UserService) {
    this.setRoutes();
  }

  private setRoutes() {
    this.router.route('/login').post(this.login);
    this.router.route('/register').post(this.register);
  }

  private login = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.login(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  };

  private register = async (req: Request, res: Response) => {
    try {
      this.userService.register(req.body);
      res.status(201).send({ msg: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register' });
    }
  };
}
