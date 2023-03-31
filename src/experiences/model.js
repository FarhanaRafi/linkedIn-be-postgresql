import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const ExperiencesModel = sequelize.define("experience", {
  experienceId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://res.cloudinary.com/dgfcfb0rr/image/upload/v1679050140/BE-DB/marketPlace/l6dtx2vynowveank1tmn.jpg",
  },
});

export default ExperiencesModel;
