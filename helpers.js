const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isUserExist = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
module.exports = {
  isUserExist,
};
