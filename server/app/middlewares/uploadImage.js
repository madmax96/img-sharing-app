const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        
      const extension = file.mimetype.split('/')[1];
      const fileName = `${req.user.userName}-${Date.now()}.${extension}`;
      req.storedFileName = fileName;
      cb(null, fileName);
    }
  })
var upload = multer({ storage });

module.exports = upload.single('image');

