import { Injectable } from '@nestjs/common';
import {User, UserInput, ReturnMessage} from 'src/graphql';
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

    public async createUser(userDetails: UserInput): Promise<ReturnMessage>{
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
        }
    }
}

