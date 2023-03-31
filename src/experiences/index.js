import express from "express";
import createHttpError from "http-errors";
import ExperiencesModel from "./model.js";

const experiencesRouter = express.Router();

experiencesRouter.post("/:userId/experiences", async (req, res, next) => {
  try {
    const { experienceId } = await ExperiencesModel.create({
      ...req.body,
      userId: req.params.userId,
    });
    res.status(201).send({ experienceId });
  } catch (error) {
    next(error);
  }
});
experiencesRouter.get("/:userId/experiences", async (req, res, next) => {
  try {
    const experiences = await ExperiencesModel.findAll({
      where: { userId: req.params.userId },
    });
    res.send(experiences);
  } catch (error) {
    next(error);
  }
});
experiencesRouter.get(
  "/:userId/experiences/:experienceId",
  async (req, res, next) => {
    try {
      const experience = await ExperiencesModel.findByPk(
        req.params.experienceId
      );
      if (experience) {
        res.send(experience);
      } else {
        next(
          createHttpError(
            404,
            `Experience with id ${req.params.experienceId} was not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);
experiencesRouter.put(
  "/:userId/experiences/:experienceId",
  async (req, res, next) => {
    try {
      const [numberOfUpdatedRows, updatedRecords] =
        await ExperiencesModel.update(req.body, {
          where: { userId: req.params.experienceId },
          returning: true,
        });
      if (numberOfUpdatedRows === 1) {
        res.send(updatedRecords[0]);
      } else {
        next(
          createHttpError(
            404,
            `Experience with id ${req.params.experienceId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);
experiencesRouter.delete(
  "/:userId/experiences/:experienceId",
  async (req, res, next) => {
    try {
      const numberOfDeletedRows = await ExperiencesModel.destroy({
        where: { experienceId: req.params.experienceId },
      });
      if (numberOfDeletedRows === 1) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `Experience with id ${req.params.experienceId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default experiencesRouter;
