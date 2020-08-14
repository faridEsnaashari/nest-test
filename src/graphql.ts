
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface UserCreateInput {
    name: string;
    age: number;
    gender: string;
    phonenumber: string;
}

export interface UserUpdateInput {
    id: number;
    name: string;
    age: number;
    gender: string;
    phonenumber: string;
}

export interface ReturnMessage {
    user_id?: number;
    statusCode?: number;
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
    createUser(userDetails: UserCreateInput): ReturnMessage | Promise<ReturnMessage>;
    updateUser(userDetails: UserUpdateInput): ReturnMessage | Promise<ReturnMessage>;
    deleteUser(user_id: number): ReturnMessage | Promise<ReturnMessage>;
}
