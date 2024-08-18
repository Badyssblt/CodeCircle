const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getAll = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
