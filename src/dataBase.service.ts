import {Injectable} from "@nestjs/common";
import {Client} from "pg";

@Injectable()
export class DataBaseService{
    private client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'nest_test',
        password: '13578642sqps',
        port: 5432,
    });

    constructor(){
        this.connectToDBServer();
    }


    public async executeQuery(queryStatement: String): Promise<any>{
        return await this.client.query(queryStatement); 
    }

    private async connectToDBServer(){
        await this.client.connect();
    }
}

export enum Errors{
    DUPLICATE = "23505",
    NOT_FOUND = "not found",
}
