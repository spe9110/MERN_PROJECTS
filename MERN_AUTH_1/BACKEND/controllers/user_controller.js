import User from "../models/user.model.js";
import AppError from "../middlewares/AppError.js";

export const getUserData = async (req, res, next) => {
    try {
        const userId = req.user; // ✅ get userId from req.user, not req.body

        const user = await User.findById(userId);

        if (!user) {
            return next(new AppError(404, "User not found."));
        }

        return res.status(200).json({ success: true, message: "User data fetched successfully.",
            user: {
                name: user.name,
                isAccountVerified: user.isAccountVerified,
            }
        });

    } catch (error) {
        next(error);
    }
};
