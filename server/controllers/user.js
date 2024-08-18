const pkg = require("@prisma/client");
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.upload = async (req, res) => {
  const { image } = req.files;
  const path = require("path");

  if (!image) return res.sendStatus(400);

  if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

  const user = req.user;

  if (!user) res.status(400);

  const uniqueId = uuidv4();
  const fileExtension = path.extname(image.name);
  const newFileName = `${uniqueId}${fileExtension}`;

  const uploadDir = path.join(__dirname, "../uploads/images/users");
  const uploadPath = path.join(uploadDir, newFileName);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { imageName: true },
    });

    if (existingUser && existingUser.imageName) {
      const oldImagePath = path.join(uploadDir, existingUser.imageName);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { imageName: newFileName },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  image.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  res.status(200).json();
};
