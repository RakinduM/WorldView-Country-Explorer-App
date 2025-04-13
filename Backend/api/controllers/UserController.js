import User from "../models/User.js";
import ApiError from "../utils/apiError.js";

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("favoriteCountries");
    res.status(200).json({
      success: true,
      favorites: user.favoriteCountries,
    });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { countryCode } = req.body;

    if (!countryCode) {
      throw new ApiError(400, "Country code is required");
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favoriteCountries: countryCode } },
      { new: true }
    ).select("favoriteCountries");

    res.status(200).json({
      success: true,
      favorites: user.favoriteCountries,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { countryCode } = req.params; // Now getting from URL params

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favoriteCountries: countryCode } },
      { new: true }
    ).select("favoriteCountries");

    res.status(200).json({
      success: true,
      favorites: user.favoriteCountries,
    });
  } catch (error) {
    next(error);
  }
};
