
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface UserInput {
    name: string;
    age: number;
    gender: string;
    phonenumber: string;
}

export interface ReturnMessage {
    message?: string;
}

export interface User {
    id?: number;
    name?: string;
    age?: number;
    gender?: string;
    phonenumber?: string;
}

export interface IQuery {
    user(user_id: number): User | Promise<User>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(userDetails: UserInput): ReturnMessage | Promise<ReturnMessage>;
    updateUser(userDetails: UserInput): ReturnMessage | Promise<ReturnMessage>;
    deleteUser(user_id: number): ReturnMessage | Promise<ReturnMessage>;
}
