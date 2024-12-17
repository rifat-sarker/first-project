import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.face';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  { timestamps: true },
);

// check year and name if exists
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists');
  }
  next();
});

// academicSemesterSchema.pre('findOne', async function (next) {
//   const query = this.getQuery()
//   // console.log(query); // {_id: 6753a3dc3785d5230afddc17}
//   const isSemesterExists = await AcademicSemester.findOne(query);
//   if (!isSemesterExists) {
//     throw new Error('This semester does not exist!!😁');
//   }
//   next();
// });

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isSemesterExists = await AcademicSemester.findOne(query);
  if (!isSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester does not exist!!😁',
    );
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
