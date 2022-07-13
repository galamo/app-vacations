import express from "express"
import mongooseConnectionModule from "./mongodb/mongodbConnection"
import EventEmitter from "node:events"
import { User } from "./mongodb/usersSchema"

mongooseConnectionModule()

const app = express()
const port = 3000
app.get("/check", (req, res, next) => {
    myEmitter.emit('api_check_called');
    res.json({ message: "ok" })
})
// How the mongoose implemented:
class UserModelMongoDB {
    public userName: string
    public password: string
    constructor({ userName, password }) {
        this.userName = userName
        this.password = password
    }

    async save() {
        const collection = { insert: (a) => { } };
        await collection.insert(this);
    }
}

app.get("/create-user", async (req, res, next) => {
    const userName = `user_${Math.random() * 100}`
    const password = `password_${Math.random() * 100}`
    const userObj = { userName, password }
    const user = new User(userObj)
    await user.save()
    // const User2 = new UserModelMongoDB(userObj)
    // User2.save()
    res.json({ message: "ok", userObj })
})



app.get("/users", async (req, res, next) => {
    const users = await User.find({ userName: { "$regex": req.query.userName } })
    res.json({ message: "ok", users })
})



console.log("starting application")



const myEmitter = new EventEmitter();
myEmitter.on('api_check_called', () => {
    console.log('someone has requested the healthcheck!');
});



app.listen(port)
