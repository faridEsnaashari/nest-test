import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {UserService} from './user.service';
import {UserCreateInput, UserUpdateInput} from '../../graphql';

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

    @Mutation('createUser')
    async createUser(@Args('userDetails') userDetails: UserCreateInput){
        const result = await this.userServices.createUser(userDetails);
        return result;
    }

    @Mutation('updateUser')
    async updateUser(@Args('userDetails') userDetails: UserUpdateInput){
        const result = await this.userServices.updateUser(userDetails);
        return result;
    }

    @Mutation('deleteUser')
    async deleteUser(@Args('user_id') user_id: number){
        const result = await this.userServices.deleteUser(user_id);
        return result;
    }
}
