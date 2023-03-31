import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const PostsModel = sequelize.define("post", {
  postId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://res.cloudinary.com/dgfcfb0rr/image/upload/v1679050140/BE-DB/marketPlace/l6dtx2vynowveank1tmn.jpg",
  },
});

export default PostsModel;
