import { $ } from "@dekproject/scope";
import mongoose from 'mongoose';

export default () => {
    try{
        let dbConfig = {};
        let env = process.env;
        let authUrl = null;
        let configApproved = true;

        // Check the existence of the parameters below in .env

        if(env.hasOwnProperty('MONGO_USER') || !!env.MONGO_USER)
            dbConfig['MONGO_USER'] = env.MONGO_USER

        if(env.hasOwnProperty('MONGO_PASSWORD') || !!env.MONGO_PASSWORD)
            dbConfig['MONGO_PASSWORD'] = env.MONGO_PASSWORD

        if(env.hasOwnProperty('MONGO_PATH') || !!env.MONGO_PATH){
            dbConfig['MONGO_PATH'] = env.MONGO_PATH
        }
        else{
            if(env.hasOwnProperty('MONGO_HOST') && !!env.MONGO_HOST)
                dbConfig['MONGO_HOST'] = env.MONGO_HOST
            else {
                configApproved = false
                console.log('[ Mongoose ] - There is no MONGO_HOST variable in the .env file.')
            }

            if(env.hasOwnProperty('MONGO_PORT') && !!env.MONGO_PORT)
                dbConfig['MONGO_PORT'] = env.MONGO_PORT
            else {
                configApproved = false
                console.log('[ Mongoose ] - There is no MONGO_PORT variable in the .env file.')
            }
        }

        if(env.hasOwnProperty('MONGO_DB') && !!env.MONGO_DB)
            dbConfig['MONGO_DB'] = env.MONGO_DB
        else {
            configApproved = false
            console.log('[ Mongoose ] - There is no MONGO_DB variable in the .env file')
        }

        if((dbConfig.hasOwnProperty('MONGO_USER') && !!env.MONGO_USER) &&
           (dbConfig.hasOwnProperty('MONGO_PASSWORD') && !!env.MONGO_PASSWORD))
           authUrl = `${dbConfig.MONGO_USER}:${dbConfig.MONGO_PASSWORD}@`

        if(!configApproved){
            console.log('[ Mongoose ] - Please correct the above errors before restarting the application.')
            process.exit(-1);
        }
        else {
            try {
                if(dbConfig.hasOwnProperty('MONGO_PATH'))
                    var connectionUrl = `${dbConfig['MONGO_PATH']}`
                else
                    var connectionUrl = `${dbConfig['MONGO_HOST']}:${dbConfig['MONGO_PORT']}/${dbConfig['MONGO_DB']}`;

                if(authUrl) connectionUrl =  `${authUrl}${connectionUrl}`;

                mongoose.connect(`mongodb://${connectionUrl}`, {useNewUrlParser: true}).then(res => {
                    $.set("mongoose", mongoose);

                    if(process.env.DEBUG == 'true')
                        console.log(`[ Mongoose ] - MongoDB successfully signed`);
                }).catch(err => {
                    console.log(`[ Mongoose ] - ${err}`);
                });
            }
            catch (e) {
                console.log(`[ Mongoose ] - ${e.message}`);
            }
        }
    }
    catch (e) {
        console.log(`[ Mongoose ] - ${e.message}`);
    }
}
