import express from 'express';
import { StudentController } from './student/student.controller';

const router = express.Router();

// will call a controller func
router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getAllStudent);

router.get('/:studentId', StudentController.getASingleStudent);

export const StudentRoutes = router;
