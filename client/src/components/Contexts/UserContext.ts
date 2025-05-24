import { createContext, Dispatch } from 'react';

/**
 * UserContext Schema
 * @description This schema defines the structure of the user context used in the application.
 * @property {string} Id - The unique identifier for the user.
 * @property {string} Name - The name of the user.
 * @property {string} NickName - The nickname of the user.
 * @property {string} Email - The email address of the user.
 * @property {string} Phone - The phone number of the user. 
 */
export type UserInfo = {
    Id: string,
    Name?: string,
    NickName?: string,
    Email?: string,
    Phone?: string
}

export enum UserContextActionType {
    SET,
    CLEAR
}

export type UserContextAction ={
    type: UserContextActionType,
    data?: UserInfo,
    onChanged?: () => void
}

export const UserContext = createContext<Nullable<UserInfo>>(null);

export const UserReducerContext = createContext<Nullable<Dispatch<UserContextAction>>>(null);



