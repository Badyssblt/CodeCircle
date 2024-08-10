const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.update = async (req, res) => {
  const answer = await prisma.answer.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      content: req.body.content,
    },
  });

  res.json(answer);
};

module.exports.deleteAnswer = async (req, res) => {
  const answer = await prisma.answer.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(204).json();
};
