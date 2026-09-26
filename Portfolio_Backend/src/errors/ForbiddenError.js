import { AppError } from "./App.Error.js"

export class ForbiddenError extends AppError {

    constructor(message = "Forbidden") {

        super(message, 403);

    }

}