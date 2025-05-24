export interface LoginUser {
    Id: string,
    Name?: Nullable<string>,
    Email?: Nullable<string>,
    NickName?: Nullable<string>,
    Phone?: Nullable<string>,
    Roles: string[],
    Resources: string[]
}