import mongoose from "mongoose"

const UsersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true

    },
    password: {
        type: String,
        default: ""
    }
})

export const User = mongoose.model("User", UsersSchema)

