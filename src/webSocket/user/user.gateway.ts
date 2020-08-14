import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {} from 'src/graphql';
import {UserService} from './user.service';

@WebSocketGateway({namespace: "websocket"})

export class UserGateway {

    private readonly userServices: UserService;

    constructor(){
        this.userServices = new UserService();
    }

    @SubscribeMessage('getOneUser')
    async getOneUser(client: Socket, user_id: number){
        const result = await this.userServices.getOneUser(user_id);
        client.emit("getOneUser", result);
    }
}
