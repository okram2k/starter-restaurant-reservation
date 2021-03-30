/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");



router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);
router.route("/:tablesId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);
router.route("/:tablesId/seat")
    .put(controller.seat)
    .delete(controller.unseat)
    .all(methodNotAllowed);

module.exports = router;
