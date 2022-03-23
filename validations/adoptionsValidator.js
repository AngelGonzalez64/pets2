const { check, validationResult } = require('express-validator');
const { DATETIME } = require('mysql/lib/protocol/constants/types');

const generateAdoptionValidators = () => [
   check('user_id').notEmpty().isLength({max:11}).withMessage("Invalid user_id"),
   check('pet_id').notEmpty().isLength({max:11}).withMessage("Invalid pet_id"),
   check('date').notEmpty().isLength(DATETIME).isNumeric().withMessage("Invalid date")
  
]


const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
]
const updateAdoptionValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('user_id').isLength({max:11}).withMessage("Invalid user_id"),
    check('pet_id').isLength({max:11}).withMessage("Invalid pet_id")
 ]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "success" : false,
            "code" : 404,
            "message" : errors,
            "data" : []

        });
    }
  next();  
}

module.exports = {
    add: [
        generateAdoptionValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update:
    [
        updateAdoptionValidators(),
        reporter
    ]
};