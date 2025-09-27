"use strict";
import dotenv from "dotenv";
import assert from "assert";
dotenv.config({ path: ".env.local" });
const env = process.env;
console.log(`Current environment: ${env.NODE_ENV} Running on port: ${env.PORT}`);
const { PORT, HOST, HOST_URL, API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, EMAIL_ADDRESS, EMAIL_PASSWORD, } = process.env;
assert(PORT, "PORT IS REQUIRED");
assert(HOST, "HOST is required");
export default {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
    },
    email: EMAIL_ADDRESS,
    password: EMAIL_PASSWORD,
};
//# sourceMappingURL=config.js.map