const countriesList = require("countries-list");
const { countries } = countriesList;
const { body, validationResult } = require("express-validator");
// console.log(countries);

const countriesName = Object.values(countries).map((country) =>
  country.name.toLowerCase()
);

const validationRules = () => {
  console.log("validationRules");
  return [
    body("country").custom((value) => {
      if (!value || !countriesName.includes(value?.toLowerCase())) {
        throw new Error("Country name must be valid");
      }
      return true;
    }),

    body("mobile").isMobilePhone().withMessage("Mobile number must be valid"),

    body("name")
      .exists()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 char")
      .isString()
      .withMessage("Name must be valid"),

    body("age")
      .exists()
      .withMessage("Age is required")
      .isNumeric()
      .withMessage("Age must be valid"),

    body("email")
      .exists()
      .withMessage("ُEmail is required")
      .isEmail()
      .withMessage("Email must be valid"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validationRules, validate };
