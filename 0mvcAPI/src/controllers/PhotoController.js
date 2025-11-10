import multer from 'multer';
import multerConfig from '../config/multer.js';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        console.log(error)
        return res.status(400).json({
          errors: [error.code]
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({ originalname, filename, student_id });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['Student cannot be found']
        });
      }
    });
  }
}

export default new PhotoController();
