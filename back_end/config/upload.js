import multer from "multer";

const dat = `${new Date().getHours()}-${new Date().getMinutes()}`

var storage = multer.diskStorage(
    {
        destination: './public',
        filename: function ( req, file, cb ) {
            cb( null, `${req.body.name}${req.body.surname}${dat}.${file.originalname.split('.').splice(1).join()}` )
        }
    }
);


const upload = multer({storage: storage})

export default upload