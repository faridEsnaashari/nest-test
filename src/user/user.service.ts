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
        const queryStatement = `insert into users_tbl(name, age, gender, phonenumber) values('${ userDetails.name }', ${ userDetails.age }, '${ userDetails.gender }', '${ userDetails.phonenumber }')`;

        let result: ReturnMessage = {};
        try{
            await this.dbManager.executeQuery(queryStatement);
            result.message = "user created";
            return result;
        }
        catch(err){
            console.error(err);
            if(err.code === "23505"){
                result.message = "user existed";
                return result;
            }
            else{
                result.message = "internal server error";
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
            return result;
        }
        catch(err){
            console.error(err);
            if(err.message === "user not found"){
                result.message = err.message;
                return result;
            }
            else{
                result.message = "internal server error";
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
            return result;
        }
        catch(err){
            console.error(err);
            if(err.message === "user not found"){
                result.message = err.message;
                return result;
            }
            else{
                result.message = "internal server error";
                return result;
            }
        }
    }
}

