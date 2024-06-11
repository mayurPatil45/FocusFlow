const {check} = require('express-validator')

const registerRules = [
    check("name", "Name is required").notEmpty().trim().escape(),
    check("phone", "Mobile Number is required").notEmpty().trim().escape().isNumeric(),
    check("email", "Please enter your email").isEmail().normalizeEmail(),
    check("password", "Password should be of 6 or more characters").isLength({ min: 6 }),
    check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
];

const loginRules = [
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("password", "Password should be of 6 or more characters").isLength({ min: 6 }),
]

const updateDetailsRules = [
    check("name", "Name is required").notEmpty().trim().escape(),
    check("phone", "Mobile Number is required").notEmpty().trim().escape().isNumeric(),
    check("email", "Please enter your email").isEmail().normalizeEmail(),
    check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
]

const updatePasswordRules = [
    check("password", "Password should be of 6 or more characters").isLength({ min: 6 }),
    check("newPassword", "Password should be of 6 or more characters").isLength({ min: 6 }),
]

const createTodoRules = [
    check('topic', "Topic is required").notEmpty().trim().escape(),
    check('title', "Title is requird").notEmpty().trim().escape(),
    check('description', "Description is requird").notEmpty().trim().escape(),
]

const updateTodoRules = [
    check('topic', "Topic is required").notEmpty().trim().escape(),
    check('title', "Title is requird").notEmpty().trim().escape(),
    check('description', "Description is requird").notEmpty().trim().escape(),
    check('completed', "Completion is required").notEmpty().trim().escape().isBoolean()
]

const createTopicRules = [
    check("heading", "Heading Is Required").notEmpty().trim().escape(),
    check("brief", "Brief Is Required").notEmpty().trim().escape(),
];

const updateTopicRules = [
    check("heading", "Heading Is Required").notEmpty().trim().escape(),
    check("brief", "Brief Is Required").notEmpty().trim().escape(),
];

module.exports = { 
    registerRules, 
    loginRules, 
    updateDetailsRules, 
    updatePasswordRules, 
    createTodoRules, 
    updateTodoRules,
    createTopicRules,
    updateTopicRules
}