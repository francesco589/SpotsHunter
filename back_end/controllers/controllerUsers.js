import { User } from "../config/db.js"
import fs from 'fs'

class ControllerUsers {


    static async getUsers(req, res) {
        const users = await User.find()
        res.json(users)
    }

    static newUser(req, res) {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            location: req.body.location,
            email: req.body.email,
            password: req.body.password,
            img: req.file.filename
        })
        user.save()
            .then(obj => {
                res.json(obj)
            })
            .catch(
                err => {
                    res.status(500).json({ error: true, message: err.message })
                })
    }

    static async deleteUser(req, res) {

        const users = await User.find()
        const img = users.filter(e => e._id == req.params.id)[0].img;
        fs.rm(`./images/users/${img}`, () => console.log('removed'))

        const respon = await User.findByIdAndDelete(req.params.id)
        res.json(respon)
    }

    static async editUser(req, res) {
        let updatedUser
        let upResp
        let users

        if (!req.file) {
            updatedUser = {
                name: req.body.name,
                surname: req.body.surname,
                location: req.body.location,
                email: req.body.email,
                password: req.body.password
            }
            upResp = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
            res.json(upResp)
        }
        else {
            updatedUser = {
                name: req.body.name,
                surname: req.body.surname,
                location: req.body.location,
                email: req.body.email,
                password: req.body.password,
                img: req.file.filename
            },
                users = await User.find()
            const img = users.filter(e => e._id == req.params.id)[0].img;
            fs.rm(`./images/users/${img}`, () => console.log('removed'))

            upResp = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
            res.json(upResp)
        }
    }

}

export default ControllerUsers