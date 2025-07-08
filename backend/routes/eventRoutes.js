import express from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  buyTicket
} from "../controllers/eventControllers.js";

const router = express.Router();

router.route("/")
  .post(createEvent)
  .get(getEvents);

router.route("/:id")
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

router.post("/buy/:id", buyTicket);

export default router;
