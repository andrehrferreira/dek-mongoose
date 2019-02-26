import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { $, plugins } from "@dekproject/scope";
import routes from "@dekproject/routes";

(async () => {
    dotenv.config({ path: "./sample/.env" });
    await plugins("");

    $.set("app", express());
    $.app.use(bodyParser.urlencoded({ extended: false }));
    $.app.use(bodyParser.json());

    const PORT = process.env.PORT || 5555;

    $.wait("mongoose").then(async () => {
        $.app.use(await routes("./sample/routes"));

        $.app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
    });
})();
