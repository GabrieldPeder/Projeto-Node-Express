const express = require("express");
const router = express.Router();
const missionController = require("../controllers/missionController");

router.post("/", missionController.createMission);
router.get("/", missionController.getMissions);
router.get("/:id", missionController.getMissionById);
router.put("/:id", missionController.updateMission);
router.delete("/:id", missionController.deleteMission);

module.exports = router;
