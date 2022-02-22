const express = require('express');
const model = require('../models/history-consult');

exports.getHistories = async (req, res, next) => {

    const result = await model.getName(req.params.nome)
           .then(result => {  
               res.status(200).send({ data:result }) })        
}