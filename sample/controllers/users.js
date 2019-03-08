import { mongoose } from "@dekproject/scope";
import "../model/users";

var User = mongoose.model("User");

export let createUser = (req, res) => {
    var user = new User(req.body);

    user.save(function (err) {
        if (err) res.status(500).send(err.message).end();
        else res.send(user).end();
    });
}

export let getAllUsers = (req, res) => {
    User.find(function (err, users) {
        if (err) res.status(500).send(err.message).end();
        else res.send(users).end();
    });
}
