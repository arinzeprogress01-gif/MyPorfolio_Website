import { AppError } from "./App.Error.js";

export class UnauthorizedError extends AppError {

    constructor(message = "Unauthorized") {

        super(message, 401);

    }

};