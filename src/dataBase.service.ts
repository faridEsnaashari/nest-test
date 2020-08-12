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
        this.client.connect();
    }
}
