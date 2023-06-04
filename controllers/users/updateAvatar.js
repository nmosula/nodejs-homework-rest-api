const { User } = require("../../models/user");

const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

console.log("avatarsDir=", avatarsDir);

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    console.log("tempUpload=", req.file);
  const { _id } = req.user;
  const newAvatarName = `${_id}_${originalname}`;

  try {
    const reworkedAvatar = await Jimp.read(tempUpload);
    await reworkedAvatar
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, newAvatarName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", newAvatarName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    res.json({
      message: "Avatar was updated",
      data: {
        avatarURL,
      },
    });
  }
  catch (error) {
    await fs.unlink(tempUpload);

    res.status(417).json({
      status: "Expectation Failed",
      code: 417,
    });
  }
};

module.exports = updateAvatar;