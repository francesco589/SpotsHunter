import multer from "multer";

const dat = `-${new Date().getHours()}-${new Date().getMinutes()}`

var storage = multer.diskStorage(
    {
        destination: './images/posts',
        filename: function ( req, file, cb ) {
            cb( null, `${req.body.name.trim()}${dat}.${file.originalname.split('.').splice(1).join()}` )
        }
    }
);


const uploadPost = multer({storage: storage})

export default uploadPost