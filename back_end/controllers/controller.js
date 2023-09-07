import { User, Spot } from "../config/db.js"


class Controller {


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
}

export default Controller