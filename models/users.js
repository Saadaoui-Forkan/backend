const mongoose = require("mongoose")

const User = mongoose.model("User", {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    }
})

module.exports = User;