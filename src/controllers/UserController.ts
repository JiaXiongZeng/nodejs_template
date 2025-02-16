// src/controllers/UserController.ts

import { UserModel } from '@models/User';
import { Request, Response } from 'express';

export class UserController {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  public getUsers = (req: Request, res: Response): void => {
    res.json(this.userModel.allUsers);
  };

  public addUser = (req: Request, res: Response): void => {
    const { name, age } = req.body;

    if (!name || typeof age !== 'number') {
      res.status(400).json({ error: 'Name and age are required and must be valid' });
      return;
    }

    const newUser = this.userModel.createUser(name, age);
    res.status(201).json(newUser);
  };

  public getUserById = (req: Request, res: Response): void => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    const user = this.userModel.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  };
}