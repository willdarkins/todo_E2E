import { faker } from "@faker-js/faker";

export default class User {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    private accessToken: string;
    private userId: string;

    constructor() {
        this.firstName = faker.person.firstName(),
        this.lastName = faker.person.lastName(),
        this.email = `${faker.internet.username()}_${Date.now()}@test.com`,
        this.password = faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*()_+-]/ });
    }

	getAccessToken() {
		return this.accessToken;
	}

	setAccessToken(accessToken: string) {
		this.accessToken = accessToken;
	}

	getUserID() {
		return this.userId;
	}
    
	setUserID(userID: string) {
		this.userId = userID;
	}
}