import { Injectable } from '@nestjs/common';
import {User, ReturnMessage, UserUpdateInput, UserCreateInput} from 'src/graphql';
import {DataBaseService} from 'src/dataBase.service';

@Injectable()
export class UserService {

    private dbManager: DataBaseService;
    constructor(){
        this.dbManager = new DataBaseService(); 
    }

    public async getOneUser(user_id: number): Promise<User>{
        const queryStatement = `select * from users_tbl where id = ${ user_id }`;

        let result: User;
        try{
            const queryResult = await this.dbManager.executeQuery(queryStatement);
            result = queryResult.rows[0];
            return result;
        }
        catch(err){
            console.error(err);
        }
    }

    public async getAllUsers(): Promise<User[]>{
        const queryStatement = `select * from users_tbl`;

        let result: User[];
        try{
            const queryResult = await this.dbManager.executeQuery(queryStatement);
            result = queryResult.rows;
            return result;
        }
        catch(err){
            console.error(err);
        }
    }

    public async createUser(userDetails: UserCreateInput): Promise<ReturnMessage>{
        const queryStatement = `insert into users_tbl(name, age, gender, phonenumber) values('${ userDetails.name }', ${ userDetails.age }, '${ userDetails.gender }', '${ userDetails.phonenumber }') RETURNING id`;

        let result: ReturnMessage = {};
        try{
            const queryResult = await this.dbManager.executeQuery(queryStatement);
            result.user_id = <number>queryResult.rows[0].id;
            result.message = "user created";
            result.statusCode = 201;
            return result;
        }
        catch(err){
            console.error(err);
            if(err.code === "23505"){
                result.message = "user existed";
                result.statusCode = 409;
                return result;
            }
            else{
                result.message = "internal server error";
                result.statusCode = 500;
                return result;
            }
        }
    }

    public async updateUser(userDetails: UserUpdateInput): Promise<ReturnMessage>{
        const queryStatement = `update users_tbl set name = '${ userDetails.name }', age = ${ userDetails.age }, gender = '${ userDetails.gender }', phonenumber = '${ userDetails.phonenumber }' where id = ${ userDetails.id }`;

        let result: ReturnMessage = {};
        try{
            const queryResult = await this.dbManager.executeQuery(queryStatement);
            if(queryResult.rowCount < 1){
                throw new Error("user not found");
            }
            result.message = "user updated";
            result.statusCode = 200;
            return result;
        }
        catch(err){
            console.error(err);
            if(err.message === "user not found"){
                result.message = err.message;
                result.statusCode = 404;
                return result;
            }
            else if(err.code === "23505"){
                result.message = "duplicate phonenumber";
                result.statusCode = 409;
                return result;
            }
            else{
                result.message = "internal server error";
                result.statusCode = 500;
                return result;
            }
        }
    }

    public async deleteUser(user_id: number): Promise<ReturnMessage>{
        const queryStatement = `delete from users_tbl where id = ${ user_id }`;

        let result: ReturnMessage = {};
        try{
            const queryResult = await this.dbManager.executeQuery(queryStatement);
            if(queryResult.rowCount < 1){
                throw new Error("user not found");
            }
            result.message = "user deleted";
            result.statusCode = 200;
            return result;
        }
        catch(err){
            console.error(err);
            if(err.message === "user not found"){
                result.message = err.message;
                result.statusCode = 404;
                return result;
            }
            else{
                result.message = "internal server error";
                result.statusCode = 500;
                return result;
            }
        }
    }
}

