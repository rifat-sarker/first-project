import { z } from 'zod';

// Subschemas
const userValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "First name can't be more than 20 characters")
    .nonempty('First name is required'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name is not valid',
    }),
});

const updateUserValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "First name can't be more than 20 characters")
    .nonempty('First name is required')
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name is not valid',
    })
    .optional(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Main Student Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .nonempty('Email is required'),
      contactNo: z.string().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: guardianValidationSchema,
      localguardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .nonempty('Email is required')
        .optional(),
      contactNo: z.string().nonempty('Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .nonempty('Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .nonempty('Permanent address is required')
        .optional(),
      guardian: guardianValidationSchema.optional(),
      localgurdian: localGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
