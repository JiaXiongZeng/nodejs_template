export interface LoginUser {
    Id: string,
    Name: Nullable<string>,
    Password: Nullable<string>,
    Email: Nullable<string>,
    Roles: string[],
    Resources: string[]
}