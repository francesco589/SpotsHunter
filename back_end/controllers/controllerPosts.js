import { Spot } from "../config/db.js"
import fs from 'fs'


class ControllerPosts {

    static async getPosts(req, res) {
        const posts = await Spot.find()
        res.json(posts)
    }

    static addPost(req, res) {
        const spot = new Spot({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            userID: req.body.userID,
            image: req.file.filename,
            date: new Date()
        })
        spot.save()
            .then(obj => {
                res.json(obj)
            })
            .catch(
                err => {
                    res.status(500).json({ error: true, message: err.message })
                })
    }
    static async deletePost(req, res) {

        const posts = await Spot.find()
        const img = posts.filter(e => e._id == req.params.id)[0].image;
        fs.rm(`./images/posts/${img}`, () => console.log('removed'))

        const respon = await Spot.findByIdAndDelete(req.params.id)
        res.json(respon)
    }

    static async editPost(req, res) {
        let uPost
        let uresp
        let posts

        if (!req.file) {
            uPost = {
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                date: new Date()
            }
            uresp = await Spot.findByIdAndUpdate(req.params.id, uPost, {new:true})
            res.json(uresp)
        }
        else {
            uPost = {
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                image: req.file.filename,
                date: new Date()
            },
            posts = await Spot.find()
            const img = posts.filter(e => e._id == req.params.id)[0].image;
            fs.rm(`./images/posts/${img}`, () => console.log('removed'))
                
            uresp = await Spot.findByIdAndUpdate(req.params.id, uPost, {new:true})
            res.json(uresp)
        }



    }
}

export default ControllerPosts