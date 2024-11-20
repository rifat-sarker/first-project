import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    // create a schema validation using joi
    const { student: studentData } = req.body;
    const { error } = studentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDB(studentData);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!!',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getASingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Get a student successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
  getASingleStudent,
};
