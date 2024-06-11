const express = require('express')
const authorize = require('../middlewares/authorize')
const {
    getTopic,
    getTopics,
    createTopic,
    updateTopic,
    deleteTopic,
} = require("../controllers/todosController")
const {createTopicRules, updateTopicRules}  = require("../middlewares/validator")
const validateResult = require("../middlewares/validationResults");

const router = express.Router();

router.get("/", authorize, getTopics);
router.get("/:id", authorize, getTopic);
router.post("/create", authorize, createTopicRules, validateResult, createTopic);
router.put("/update/:id", authorize, updateTopicRules, validateResult, updateTopic);
router.delete("/delete/:id", authorize, deleteTopic);

module.exports = router;