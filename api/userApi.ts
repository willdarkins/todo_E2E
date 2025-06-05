import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class UserApi {
    async signUp(request:APIRequestContext, user: User) {
            return await request.post('/api/v1/users/register', {
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.email
        }
    })
    }
}