import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {UserCreateInput, UserUpdateInput} from 'src/graphql';
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

    @SubscribeMessage('getAllUsers')
    async getAllUsers(client: Socket){
        const result = await this.userServices.getAllUsers();
        client.emit("getAllUsers", result);
    }

    @SubscribeMessage('createUser')
    async createUser(client: Socket, userDetails: UserCreateInput){
        const result = await this.userServices.createUser(userDetails);
        client.emit("createUser", result);
    }

    @SubscribeMessage('updateUser')
    async updateUser(client: Socket, userDetails: UserUpdateInput){
        const result = await this.userServices.updateUser(userDetails);
        client.emit("updateUser", result);
    }

    @SubscribeMessage('deleteUser')
    async deleteUser(client: Socket, user_id: number){
        const result = await this.userServices.deleteUser(user_id);
        client.emit("deleteUser", result);
    }
}
