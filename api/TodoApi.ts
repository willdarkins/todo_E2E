import { APIRequestContext } from '@playwright/test';
import User from '../models/User';
import { faker } from '@faker-js/faker';

export default class TodoApi {
	async addTodo(request: APIRequestContext, user: User) {
		return await request.post('/api/v1/tasks', {
			data: {
				isCompleted: false,
				item: faker.lorem.sentence({ min: 3, max: 7 })
			},
			headers: {
				Authorization: `Bearer ${user.getAccessToken()}`,
			},
		});
	}
}