import { Injectable } from '@nestjs/common';
import {User} from 'src/graphql';
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
}

