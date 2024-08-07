const express = require("express");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.getAll = async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    res.json(posts);
}


module.exports.get = async (req, res) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    res.json(post);
}

module.exports.create = async (req, res) => {
    const post = await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            authorId: req.body.authorId
        }
    })

    res.json(post);
}


module.exports.update = async (req, res) => {
    const post = await prisma.post.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            title: req.body.title,
            content: req.body.content,
        }
    })

    res.json(post);
}

module.exports.deletePost = async (req, res) => {
    const post = await prisma.post.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.status(204).json();
}