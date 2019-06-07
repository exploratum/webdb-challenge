const express = require('express');
const router = express.Router();

const projectsModel = require('../models/projectsModel');

/****************************************************************************/
/*                              Get all project                             */
/****************************************************************************/
router.get('/', async (req, res) => {
    try {
        projects = await projectsModel.get();
        res.status(200).json(projects);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get record(s) from database"})
    }

});

/****************************************************************************/
/*                   Get a project By Id with all related actions           */
/****************************************************************************/
router.get('/:id', async (req, res) => {
    try {
        project_actions = await projectsModel.get(req.params.id);
        res.status(200).json(project_actions);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get record(s) from database"})
    }

});

/****************************************************************************/
/*                              Add a new  project                          */
/****************************************************************************/

router.post('/', validateBodyInfo, async (req,res) => {

    try {
        id = await projectsModel.add(req.body);
        res.status(201).json({message: `id of new project: ${id}`});
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding the record(s)"})
    }
})

/****************************************************************************/
/*                              update a new  project                       */
/****************************************************************************/

router.put('/:id', validateBodyInfo, async (req,res) => {

    try {
        count = await projectsModel.update(req.params.id, req.body);
        res.status(200).json({count: `${count} record(s) updated`});
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem updating the record(s)"})
    }
})

/****************************************************************************/
/*                              Delete a project                            */
/****************************************************************************/

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const count = await projectsModel.remove(id);
        res.status(200).json(`message: ${count} record(s) deleted`);
    }
    catch {
        res.status(500).json({"errorMessage": "Record(s) could not be deleted from database"});
    }
}) 


/****************************************************************************/
/*                          Validate project info                           */
/****************************************************************************/
async function validateBodyInfo(req, res, next) {
    const body = req.body

    if(body.name && body.description) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name and description are required"});
    }
}


module.exports = router

