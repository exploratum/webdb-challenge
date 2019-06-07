const express = require('express');
router = express.Router(); 


const actionsModel = require('../models/actionsModel');

/****************************************************************************/
/*                              Get all actions                             */
/****************************************************************************/
router.get('/', async (req, res) => {
    try {
        actions = await actionsModel.get();
        res.status(200).json(actions);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get record(s) from database"})
    }

});

/****************************************************************************/
/*                              Get action by id                            */
/****************************************************************************/
router.get('/:id', async (req, res) => {

    try {
        action = await actionsModel.get(req.params.id);
        res.status(200).json(action);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get record(s) from database"})
    }

});

/****************************************************************************/
/*                              Add a new  action                           */
/****************************************************************************/

router.post('/', validateBodyInfo, async (req,res) => {

    try {
        console.log('trying adding in router')
        id = await actionsModel.add(req.body);
        res.status(201).json({message: `new action id: ${id}`});
    }
    catch {
        res.status(500).json({"errorMessage": "There is a problem adding the record"})
    }
})

/****************************************************************************/
/*                              update a new  action                        */
/****************************************************************************/

router.put('/:id', validateBodyInfo, async (req,res) => {

    try {
        count = await actionsModel.update(req.params.id, req.body);
        res.status(200).json({count: `${count} record(s) updated`});
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem updating the record(s)"})
    }
})

/****************************************************************************/
/*                              Delete an action                            */
/****************************************************************************/

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const count = await actionsModel.remove(id);
        res.status(200).json(`message: ${count} record(s) deleted`);
    }
    catch {
        res.status(500).json({"errorMessage": "Record(s) could not be deleted from database"});
    }
}) 

/****************************************************************************/
/*                          Validate action info                           */
/****************************************************************************/
async function validateBodyInfo(req, res, next) {
    const body = req.body;
    console.log(body);
    if(body.note && body.description && body.project_id) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"note description and project_id are required"});
    }
}


module.exports = router