import { Env_connect } from "./config/env.js";
Env_connect();

import { Database_connect } from "./config/db.js";

import app from "./app.js";

const PORT = process.env.PORT || 8080;


const startServer = async () => {

    await Database_connect();


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

};


startServer();