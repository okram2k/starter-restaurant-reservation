/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(controller.search)
    .post(controller.create)
    .all(methodNotAllowed);
router.route("/byDate")
    .get(controller.listByDate)
    .all(methodNotAllowed);
router.route("/:reservationId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);
router.route("/:reservationId/status")
    .put(controller.statusUpdate)
    .all(methodNotAllowed);
module.exports = router;
