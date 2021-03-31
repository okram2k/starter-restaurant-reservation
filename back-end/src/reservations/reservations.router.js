/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 * Routes available: / for search and create. /byDate to list all
 * reservations on a date in YYYY-MM-DD format. /:reservationId which
 * allows to get, put, or delete. and /:reservationID/status which allows
 * updating of a reservation's status.
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");



router
  .route("/")
  .get(controller.search)
  .post(controller.create)
  .all(methodNotAllowed);
router.route("/byDate").get(controller.listByDate).all(methodNotAllowed);
router
  .route("/:reservationId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);
router
  .route("/:reservationId/status")
  .put(controller.statusUpdate)
  .all(methodNotAllowed);
module.exports = router;
