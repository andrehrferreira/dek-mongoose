'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require('@dekproject/scope');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    try {
        var dbConfig = {};
        var env = process.env;
        var authUrl = null;
        var configApproved = true;

        // Check the existence of the parameters below in .env

        if (env.hasOwnProperty('MONGO_USER') || !!env.MONGO_USER) dbConfig['MONGO_USER'] = env.MONGO_USER;

        if (env.hasOwnProperty('MONGO_PASSWORD') || !!env.MONGO_PASSWORD) dbConfig['MONGO_PASSWORD'] = env.MONGO_PASSWORD;

        if (env.hasOwnProperty('MONGO_PATH') || !!env.MONGO_PATH) {
            dbConfig['MONGO_PATH'] = env.MONGO_PATH;
        } else {
            if (env.hasOwnProperty('MONGO_HOST') && !!env.MONGO_HOST) dbConfig['MONGO_HOST'] = env.MONGO_HOST;else {
                configApproved = false;
                console.log('[ Mongoose ] - There is no MONGO_HOST variable in the .env file.');
            }

            if (env.hasOwnProperty('MONGO_PORT') && !!env.MONGO_PORT) dbConfig['MONGO_PORT'] = env.MONGO_PORT;else {
                configApproved = false;
                console.log('[ Mongoose ] - There is no MONGO_PORT variable in the .env file.');
            }
        }

        if (env.hasOwnProperty('MONGO_DB') && !!env.MONGO_DB) dbConfig['MONGO_DB'] = env.MONGO_DB;else {
            configApproved = false;
            console.log('[ Mongoose ] - There is no MONGO_DB variable in the .env file');
        }

        if (dbConfig.hasOwnProperty('MONGO_USER') && !!env.MONGO_USER && dbConfig.hasOwnProperty('MONGO_PASSWORD') && !!env.MONGO_PASSWORD) authUrl = dbConfig.MONGO_USER + ':' + dbConfig.MONGO_PASSWORD + '@';

        if (!configApproved) {
            console.log('[ Mongoose ] - Please correct the above errors before restarting the application.');
            process.exit(-1);
        } else {
            try {
                if (dbConfig.hasOwnProperty('MONGO_PATH')) var connectionUrl = '' + dbConfig['MONGO_PATH'];else var connectionUrl = dbConfig['MONGO_HOST'] + ':' + dbConfig['MONGO_PORT'] + '/' + dbConfig['MONGO_DB'];

                if (authUrl) connectionUrl = '' + authUrl + connectionUrl;

                _mongoose2.default.connect('mongodb://' + connectionUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }).then(function (res) {
                    _scope.$.set("mongoose", _mongoose2.default);

                    if (process.env.DEBUG == 'true') console.log('[ Mongoose ] - MongoDB successfully signed');
                }).catch(function (err) {
                    console.log('[ Mongoose ] - ' + err);
                });
            } catch (e) {
                console.log('[ Mongoose ] - ' + e.message);
            }
        }
    } catch (e) {
        console.log('[ Mongoose ] - ' + e.message);
    }
};
//# sourceMappingURL=index.js.map