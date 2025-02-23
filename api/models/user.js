import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    }
})

export const user = mongoose.model("user", UserSchema)