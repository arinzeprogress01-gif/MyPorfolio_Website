import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../app.js";

test("GET /health should return API health status", async () => {

    try{
        const response = await request(app)
        .get("/health");

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.message, "Portfolio API is healthy");
    }catch(error) {
        console.error("Test Error!", error.message)
    }
    
});
