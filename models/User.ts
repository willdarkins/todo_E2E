export default class User {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    private accessToken: string;
    private userId: string;

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
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