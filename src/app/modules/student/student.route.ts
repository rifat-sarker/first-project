import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// will call a controller func

router.get('/', StudentController.getAllStudent);

router.get('/:studentId', StudentController.getASingleStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
