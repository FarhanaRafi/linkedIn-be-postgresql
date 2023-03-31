import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import UsersModel from "../users/model.js";
import PostsModel from "../posts/model.js";

const CommentsModel = sequelize.define("comment", {
  commentId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UsersModel.hasMany(CommentsModel, {
  foreignKey: { name: "userId", allowNull: false },
});
CommentsModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: false },
});

PostsModel.hasMany(CommentsModel, {
  foreignKey: { name: "postId", allowNull: false },
});
CommentsModel.belongsTo(PostsModel, {
  foreignKey: { name: "postId", allowNull: false },
});

export default CommentsModel;
