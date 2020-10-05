import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { $, plugins, routes } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("./build");

    $.set("app", express());
    $.app.use(bodyParser.urlencoded({ extended: false }));
    $.app.use(bodyParser.json());

    const PORT = process.env.PORT || 5555;

    $.wait("mongoose").then(async () => {
        let routesController = await routes("./sample/routes").catch(() => {});

        if(routesController)
            $.app.use(routesController);

        $.app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
    }).catch((err) => {
        console.log(err);
    });
})();
