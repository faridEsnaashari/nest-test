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
        return this.userServices.getOneUser(user_id)
    }

    @Query('users')
    async getAllUsers(){
        return this.userServices.getAllUsers();
    }
}
