const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const isWriter = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Veuillez vous connecter" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    req.user = decoded;

    const answerId = parseInt(req.params.id);

    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
    });

    if (!answer) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    if (answer.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
    }

    req.answer = answer;

    next();
  });
};

module.exports = isWriter;
