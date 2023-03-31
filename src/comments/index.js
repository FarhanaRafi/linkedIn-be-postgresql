import express from "express";
import createHttpError from "http-errors";
import CommentsModel from "./model.js";
import UsersModel from "../users/model.js";

const commentsRouter = express.Router();

commentsRouter.post("/:postId/comments", async (req, res, next) => {
  try {
    const { commentId } = await CommentsModel.create({
      ...req.body,
      postId: req.params.postId,
    });
    res.status(201).send({ commentId });
  } catch (error) {
    next(error);
  }
});

commentsRouter.get("/:postId/comments", async (req, res, next) => {
  try {
    const comments = await CommentsModel.findAll({
      where: { postId: req.params.postId },
      include: [{ model: UsersModel, attributes: ["name", "surname"] }],
    });
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.get("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await CommentsModel.findByPk(req.params.commentId);
    if (comment) {
      res.send(comment);
    } else {
      next(
        createHttpError(
          404,
          `Comment with id ${req.params.commentId} was not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

commentsRouter.put("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await CommentsModel.update(
      req.body,
      {
        where: { id: req.params.commentId },
        returning: true,
      }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(
        createHttpError(
          404,
          `Comment with id ${req.params.commentId} was not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

commentsRouter.delete(
  "/:postId/comments/:commentId",
  async (req, res, next) => {
    try {
      const numberOfDeletedRows = await CommentsModel.destroy({
        where: { id: req.params.commentId },
      });
      if (numberOfDeletedRows === 1) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.commentId} was not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default commentsRouter;
