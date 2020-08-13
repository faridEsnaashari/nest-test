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
        try{
            const result = await this.dbManager.executeQuery(queryStatement);
            return result.rows[0];
        }
        catch(err){
            console.error(err);
        }
    }

//    getAllUsers(): User[]{
//
//    }
}

