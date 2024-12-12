import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  /* 
  {email : {$reges: query.searchTerm, $options: "i"}}
  {firstName : {$reges: query.searchTerm, $options: "i"}}
  {presentAddress : {$reges: query.searchTerm, $options: "i"}}
  */

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filetering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log({ query, queryObj });

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  if (query.limit) {
    limit = Number(query.limit);
  }

  const paginationQuery = sortQuery.skip(skip);
  const limitQuery = paginationQuery.limit(limit);

  //field filtering
  let fields = '__v';

  // fields : 'name,email'
  // fields: 'name email'
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log(fields);
  }

  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const {
    name,
    guardian,
    localguardian: localgurdian,
    ...remainingStudentData
  } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /* 
  guradian : {
  fatherOccupation : "Teacher"
  }
  
  guradian.fatherOccupation = "Teacher"
  name.firstName = 'Rifat'
  name.lastName = 'Sarker'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localgurdian && Object.keys(localgurdian).length) {
    for (const [key, value] of Object.entries(localgurdian)) {
      modifiedUpdateData[`localgurdian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deleteUser = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
