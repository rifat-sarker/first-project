import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationsSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRoutes = router;
