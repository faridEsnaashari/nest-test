import { Resolver, Query, Args } from '@nestjs/graphql';
import {UserService} from './user.service';

@Resolver('User')
export class UserResolver {
    private readonly userServices: UserService;

    constructor(){
        this.userServices = new UserService();
    }

    @Query('user')
    async getOneUser(@Args('user_id') user_id: number){
        const result = await this.userServices.getOneUser(user_id);
        return result;
    }

    @Query('users')
    async getAllUsers(){
        const result = await this.userServices.getAllUsers();
        return result;
    }
}
