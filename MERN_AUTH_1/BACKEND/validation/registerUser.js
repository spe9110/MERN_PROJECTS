import Joi from 'joi';

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  verifyOtp: Joi.string().optional().allow(''),
  verifyOtpExpireAt: Joi.number().optional().default(0),
  isAccountVerified: Joi.boolean().optional().default(false),
  resetOtp: Joi.string().optional().allow(''),
  resetOtpExpireAt: Joi.number().optional().default(0)
});

export default userValidationSchema;
