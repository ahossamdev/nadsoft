const { PrismaClient } = require("@prisma/client");
const e = require("express");
const { isUserExist } = require("../helpers");
const { authenticate } = require("../middleware/authentication");
const { validationRules, validate } = require("../middleware/user");
const router = require("express").Router();
const prisma = new PrismaClient();

const creation_router = router.post(
  "/create",
  validationRules(),
  validate,
  async (req, res, next) => {
    try {
      const { name, age, country, email, mobile } = req.body;
      const user = await prisma.user.create({
        data: {
          name,
          age,
          country,
          email,
          mobile,
        },
      });
      res.json(user);
      await prisma.$disconnect();
    } catch (err) {
      await prisma.$disconnect();
      console.log("ERROR:", err);
      process.exit(1);
    }
  }
);

const deletion_router = router.delete(
  "/delete/:id",
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userExists = await isUserExist(id);
      if (!userExists) {
        res.status(404).send("No User Found");
      } else {
        const user = await prisma.user.delete({
          where: {
            id: id,
          },
        });
        res.json(user);
      }
      await prisma.$disconnect();
    } catch (err) {
      await prisma.$disconnect();
      console.log("ERROR:", err);
      process.exit(1);
    }
  }
);

const retreiving_router = router.get("/", async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({});
    res.json(user);
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    console.log("ERROR:", err);
    process.exit(1);
  }
});

const updating_router = router.patch("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userExists = await isUserExist(id);
    if (!userExists) {
      res.status(404).send("No User Found");
    } else {
      const { name, age, country, email, mobile } = req.body;
      const tempUser = { name, age, country, email, mobile };
      const updateData = {};
      for (const key in tempUser) {
        if (tempUser[key] !== undefined) {
          updateData[key] = tempUser[key];
        }
      }

      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: updateData,
      });
      res.json(user);
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    console.log("ERROR:", err);
    process.exit(1);
  }
});

module.exports = {
  creation_router,
  deletion_router,
  retreiving_router,
  updating_router,
};
