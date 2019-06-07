const express = require('express');
router = express.Router(); 


const actionsModel = require('../models/actionsModel');

/****************************************************************************/
/*                              Ad a new  action                           */
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