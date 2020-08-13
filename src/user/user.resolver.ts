import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {UserService} from './user.service';
import {UserCreateInput, UserUpdateInput} from 'src/graphql';

@Resolver('User')
export class UserResolver {
    private readonly userServices: UserService;

    constructor(){
        this.userServices = new UserService();
    }

    @Query('user')
    getOneUser(@Args('user_id') user_id: number){
        const result = this.userServices.getOneUser(user_id);
        return result;
    }

    @Query('users')
    getAllUsers(){
        const result = this.userServices.getAllUsers();
        return result;
    }

    @Mutation('createUser')
    createUser(@Args('userDetails') userDetails: UserCreateInput){
        const result = this.userServices.createUser(userDetails);
        return result;
    }

    @Mutation('updateUser')
    updateUser(@Args('userDetails') userDetails: UserUpdateInput){
        const result = this.userServices.updateUser(userDetails);
        return result;
    }
}
