import { User } from "./user.schema.js";

async function saveUser(params) {
  try {
    await User.create({
      id: params.id,
      googleId: params.googleId,
      name: params.name,
      email: params.email,
      avatar: params.avatar,
    });
  } catch (error) {
    console.error("Saving user in DB showing error", error);
  }
}

async function findUser(googleId) {
  try {
    const user = await User.findOne({ googleId });
    return user;
  } catch (error) {
    console.error("Finding user in DB showing error", error);
  }
}

export { saveUser, findUser };
