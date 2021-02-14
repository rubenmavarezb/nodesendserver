const Links = require('../models/Link');
const shortId = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newLink = async (req, res, next) => {
    //Check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    //Save in DB
    const { original_name, name } = req.body;

    const link = new Links();
    link.url = shortId.generate();
    link.name = name;
    link.original_name = original_name;
    

    //If user is auth
    if(req.user) {
        const { password, downloads } = req.body;

        if(downloads) {
            link.downloads = downloads;
        }

        if(password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt);
        }

        link.author = req.user.id
    }

    try {
        await link.save();
        res.json({ msg: `${link.url}`});
        return next();
    } catch (error) {
        console.log(error)
    }
}

//Get all links
exports.allLinks = async (req,res) => {
    try {
        const links = await Links.find({}).select('url -_id');
        res.json({links})
    } catch (error) {
        console.log(error)
    }
}

//Get link
exports.getLink = async (req, res, next) => {
    const {url} = req.params;

    //Check if link exists
    const link = await Links.findOne({ url });

    if(!link) {
        res.status(400).json({msg: "Link unavailable or doesn't exists"})
        return next();
    }
    res.json({file: link.name, password: false})

    next();
}

exports.hasPassword = async (req, res, next) => {
    const {url} = req.params;

    //Check if link exists
    const link = await Links.findOne({ url });

    if(!link) {
        res.status(400).json({msg: "Link unavailable or doesn't exists"})
        return next();
    }

    if(link.password) {
        return res.json({password: true, link: link.url})
    }

    next();
}

exports.verifyPassword = async (req, res, next) => {
    const { url } = req.params;
    const { password } = req.body;

    const link = await Links.findOne({url});

    if(bcrypt.compareSync(password, link.password)){
        next();
    } else {
        return res.status(401).json({msg: "Wrong password"})
    }
}