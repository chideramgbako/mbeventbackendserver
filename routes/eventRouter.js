const router = require("express").Router();
const {
  createEvent,
  getUpcomingEvents,
  getFreeEvents,
  getSingleEvent,
  getAllEvents,
  payForAnEvent,
  getHostedEvents,
  getEventsToAttend,
  getpreviousEvents,
} = require("../controllers/eventController");

const auth = require("../middleware/auth");

router.post("/", auth, createEvent);
router.get("/upcoming", getUpcomingEvents);
router.get("/free", getFreeEvents);
router.get("/", getAllEvents);
router.get("/hosted",auth, getHostedEvents);
router.post("/pay/:eventId", auth, payForAnEvent);
router.get("/previous", auth, getpreviousEvents);
router.get("/attending", auth, getEventsToAttend);
router.get("/:eventId", getSingleEvent);

module.exports = router;
