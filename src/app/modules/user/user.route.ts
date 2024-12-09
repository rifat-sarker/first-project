import express from 'express';
import { UserControllers } from './user.controller';
import { updateStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(updateStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
