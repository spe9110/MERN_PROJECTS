import Joi from "joi";

export const createAccountSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(250).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required(),
    password_confirm: Joi.any().valid(Joi.ref('password')).required(),
    role: Joi.string().trim().valid('user', 'admin').default('user').optional(), 
});