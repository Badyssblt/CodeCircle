const express = require("express");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports.create = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }
    })

    res.json(user);
}

module.exports.login = async (req, res) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: req.body.email
        }
    })

    if(bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
        res.json({token});
    }else {
        res.status(401).json({message: "Le mot de passe est incorrect"});
    }




}