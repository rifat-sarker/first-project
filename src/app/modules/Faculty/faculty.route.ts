import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validatiion';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/create-faculty', FacultyControllers.createFaculty);

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);
export const FacultyRoutes = router;
