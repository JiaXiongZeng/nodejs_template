import { Router } from 'express';
import { UserController } from '@controllers/UserController';
import { UserModel } from '@models/User';

export class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();

    // Initialize the UserModel with some default users
    const userModel = new UserModel([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ]);

    this.userController = new UserController(userModel);

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.userController.getUsers);
    this.router.post('/', this.userController.addUser);
    this.router.get('/:id', this.userController.getUserById); // New route
  }
}
