import express from "express"
import mongooseConnectionModule from "./mongodb/mongodbConnection"
import EventEmitter from "node:events"
import { User } from "./mongodb/usersSchema"
import { Account } from "./mongodb/accountSchema"

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
    try {
        const userName = `user_${Math.random() * 100}`
        const password = `password_${Math.random() * 100}`
        const userObj = { userNamea: userName, password }
        const user = new User(userObj)
        await user.save()
        // const User2 = new UserModelMongoDB(userObj)
        // User2.save()
        res.json({ message: "ok", userObj })
    } catch (ex) {
        return next(ex)
    }
})



app.get("/users", async (req, res, next) => {
    const users = await User.find({ userName: { "$regex": req.query.userName } })
    res.json({ message: "ok", users })
})

app.get("/accounts", async (req, res, next) => {
    try {
        const result = await Account.find({})
        res.json({ message: "ok", result })
    } catch (ex) {
        return next(ex)
    }
})

app.get("/create-account", async (req, res, next) => {
    try {
        const type = req.query.p
        const balance = req.query.b
        const accountId = Math.ceil(Math.random() * 999999)
        // ObjectId("62cee796ebf79fe4f325e385")
        const account = new Account({ accountId, type, owners: ["62cee796ebf79fe4f325e385"] })
        await account.save()
        res.json({ message: "ok", account })
    } catch (ex) {
        return next(ex)
    }
})

app.get("/update-balance", async (req, res, next) => {
    try {
        const accountId = req.query.accountId
        const balance = req.query.balance
        const updatedRecord = await Account.findOneAndUpdate({ accountId }, { balance }, { new: true })
        res.json({ message: "updated successfully", updatedRecord })
    } catch (ex) {
        return next(ex)
    }
})

app.get("/deposit", async (req, res, next) => {
    try {
        const accountId = req.query.accountId
        const balance = req.query.balance
        const accountToUpdate = await Account.findOne({ accountId })
        if (!accountToUpdate) throw new Error()
        accountToUpdate.balance = accountToUpdate.balance + Number(balance)
        await accountToUpdate.save()
        res.json({ message: "updated successfully" })
    } catch (ex) {
        return next(ex)
    }
})

app.use((error, req, res, next) => {
    console.log(error)
    res.send("something went wrong")
})



const myEmitter = new EventEmitter();
myEmitter.on('api_check_called', () => {
    console.log('someone has requested the healthcheck!');
});



app.listen(port)
