import { autoInjectable } from 'tsyringe';
import { User } from '../interfaces/user.interface';
import { sign } from 'jsonwebtoken';

@autoInjectable()
export class UserService {
  private users: User[] = [];

  login(user: User) {
    const userDB = this.users.find((u) => u.username === user.username);
    if (userDB && userDB.password === user.password) {
      return { msg: 'Login successful', token: sign({ user: user.username }, 'SECRET_KEY') };
    } else {
      throw new Error('Invalid username or password');
    }
  }

  register(user: User) {
    const userDB = this.users.find((u) => u.username === user.username);
    if (userDB) {
      throw new Error('Username already exists');
    } else {
      this.users.push(user);
    }
  }
}
