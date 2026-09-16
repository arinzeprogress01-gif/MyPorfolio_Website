import { AppError } from "./App.Error.js"

export class NotFoundError extends AppError {

    constructor(

        message = "Resource not found."

    ) {

        super(

            message,

            404

        );

        this.name = "NotFoundError";

    }

}