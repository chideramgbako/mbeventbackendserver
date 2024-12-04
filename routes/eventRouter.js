const router = require("express").Router()
const {
  createEvent,
  getUpcomingEvents,
  getFreeEvents,
  getSingleEvent
} = require("../controllers/eventController");

const auth = require("../middleware/auth")

router.post("/", auth, createEvent)
router.get("/upcoming", getUpcomingEvents)
router.get("/free", getFreeEvents)
router.get("/eventId", getSingleEvent)

module.exports = router