import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import ExperiencesModel from "../experiences/model.js";
import PostsModel from "../posts/model.js";

const UsersModel = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(55),
    allowNull: false,
    unique: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://res.cloudinary.com/dgfcfb0rr/image/upload/v1679050140/BE-DB/marketPlace/l6dtx2vynowveank1tmn.jpg",
  },
});

UsersModel.hasMany(ExperiencesModel, {
  foreignKey: { name: "userId", allowNull: false },
});
ExperiencesModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: false },
});

UsersModel.hasMany(PostsModel, {
  foreignKey: { name: "userId", allowNull: false },
});
PostsModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: false },
});

export default UsersModel;
