import { AppError } from "./App.Error.js"

export class ConflictError extends AppError {

    constructor(message) {

        super(message, 409);

    }

}