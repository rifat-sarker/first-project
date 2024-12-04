import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call a controller func

router.get('/', StudentController.getAllStudent);

router.get('/:studentId', StudentController.getASingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
