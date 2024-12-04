import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
// import studentValidationSchema from './student.validation';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getASingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getASingleStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get a student successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getAllStudent,
  getASingleStudent,
  deleteStudent,
};
