import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // create a schema validation using joi
    const { password, student: studentData } = req.body;

    const result = await UserService.createStudentIntoDB(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
