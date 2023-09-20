import mongoose from "mongoose";

const psw = 's40T3bCetfpJ6O0A'
const database = 'spotshunter'
const url = `mongodb+srv://fra89:${psw}@cluster0.6ctbtkw.mongodb.net/${database}`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`db ${database} connected`)
    })
    .catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: {type: String, required: true}
})

const spotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userID: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true }
})

const User = mongoose.model('user', userSchema, 'users')
const Spot = mongoose.model('spot', spotSchema, 'spots')

export {User, Spot}