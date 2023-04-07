const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    hobbies: {
        type: String,
        required: true,
    },
    datecreated: Date,
    dateUpdated: Date
});

// model
const users = new mongoose.model("users", usersSchema);

module.exports = users;