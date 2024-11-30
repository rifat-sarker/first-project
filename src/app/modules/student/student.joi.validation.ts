import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': "First name can't be more than 20 characters",
      'string.pattern.name': '{#value} is not in capitalize format',
    }),
  middleName: Joi.string().trim().allow(''), // Optional
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/, 'alphabetic characters')
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.pattern.name': '{#value} is not valid',
    }),
});

// Sub-schema for Guardian
const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father occupation must be a string',
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father contact number must be a string',
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother occupation must be a string',
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother contact number must be a string',
    'string.empty': 'Mother contact number is required',
  }),
});

// Sub-schema for Local Guardian
const localGuardianSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local guardian occupation must be a string',
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local guardian contact number must be a string',
    'string.empty': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local guardian address must be a string',
    'string.empty': 'Local guardian address is required',
  }),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID is required',
  }),
  name: userNameSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'any.only': '{#value} is not a supported gender',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().isoDate().allow('').messages({
    'string.base': 'Date of birth must be a valid ISO date string',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': '{#value} is not a valid email address',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
  }),
  gurdian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localgurdian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().uri().allow('').messages({
    'string.uri': 'Profile image must be a valid URI',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
});

export default studentValidationSchema;
