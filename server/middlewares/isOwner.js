const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const isOwner = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Veuillez vous connecter" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    req.user = decoded;

    const postId = parseInt(req.params.postId);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    if (post.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
    }

    req.post = post;

    next();
  });
};

module.exports = isOwner;
