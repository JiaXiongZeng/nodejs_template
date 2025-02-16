// src/models/UserModel.ts

interface IUser {
    id: number;
    name: string;
    age: number;
}
  
export class UserModel {
    private users: IUser[] = [];
    private idCounter: number;
  
    // Constructor to initialize default values
    constructor(initialUsers: IUser[] = []) {
      this.users = initialUsers;
      this.idCounter = initialUsers.length > 0 ? Math.max(...initialUsers.map(user => user.id)) + 1 : 1;
    }
  
    // Getter for retrieving all users
    public get allUsers(): IUser[] {
      return this.users;
    }
  
    // Setter for adding a batch of users
    public set addUsers(newUsers: IUser[]) {
      newUsers.forEach(user => {
        this.users.push({ ...user, id: this.idCounter++ });
      });
    }
  
    // Create a new user and return it
    public createUser(name: string, age: number): IUser {
      const newUser: IUser = { id: this.idCounter++, name, age };
      this.users.push(newUser);
      return newUser;
    }
  
    // Getter for retrieving a specific user by ID
    public getUserById(id: number): IUser | undefined {
      return this.users.find(user => user.id === id);
    }
}