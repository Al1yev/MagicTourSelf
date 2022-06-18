const express = require("express");
const router = express.Router();

const tourController = require("../controller/tourController.js");

router.use(
  "/the-best-3-tours",
  (req, res, next) => {
    req.query.sort = "-price";
    req.query.limit = 3;
    next();
  },
  tourController.getToursAll
);

router.route("/stats").get(tourController.tourStats);

router
  .route("/")
  .get(tourController.getToursAll)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

module.exports = router;
