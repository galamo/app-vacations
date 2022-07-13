import mongoose from "mongoose";

export default function init() {
    mongoose.connect("mongodb://localhost:27017/usersdb", {
    }, (err) => {
        console.log(err)
    })

    const myConnection = mongoose.connection;
    myConnection.on("error", (err) => {
        console.log("Mongo db connection error")
    })

    myConnection.on("open", () => {
        console.log("Mongo db connection Success")
    })
};