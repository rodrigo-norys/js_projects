import { Router } from 'express';
import multer from 'multer';
import photoController from '../controllers/PhotoController.js';

import loginRequired from '../middlewares/loginRequired.js';
import validateStudentId from '../middlewares/validateStudentId.js';

const router = new Router();
const upload = multer()

router.post('/', loginRequired,
  upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'student_id', maxCount: 1 }]),
  validateStudentId,
  photoController.create);

export default router;
