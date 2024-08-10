const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getAll = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.json(posts);
};

module.exports.get = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      answers: {
        select: {
          id: true,
          content: true,
        },
        orderBy: {
          created_at: "asc",
        },
      },
    },
  });
  res.json(post);
};

module.exports.create = async (req, res) => {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      authorId: req.user.id,
    },
  });

  res.json(post);
};

module.exports.update = async (req, res) => {
  const post = await prisma.post.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });

  res.json(post);
};

module.exports.deletePost = async (req, res) => {
  const post = await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(204).json();
};

module.exports.answer = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  const content = req.body.content;

  const answer = await prisma.answer.create({
    data: {
      postId: post.id,
      authorId: req.user.id,
      content,
    },
  });

  res.json(answer);
};

module.exports.search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query)
      return res
        .status(400)
        .json({ error: "Veuillez fournir un terme de recherche" });

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
