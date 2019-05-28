

const Level = require("../Models/level.model.js");
const jsonMessages = require("../Assets/jsonMessages/bd.js");


// GET ALL LEVELS
async function getLevels(req, res) {
    try {
        const count = await Level.countDocuments();
        const result = await Level.find();

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            return res.send(result);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET LEVEL BY ID
async function getLevelByID(req, res) {
    const _id = req.params.id;

    try {
        const result = await Level.findOne({ _id });

        if (result) {
            return res.send(result);
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// ADD NEW LEVEL
async function addLevel(req, res) {
    let newLevel = new Level(req.body);

    try {
        newLevel.save(function (err, level) {
            if (err) {
                return res.status(jsonMessages.error.errorInsert.status).send(jsonMessages.error.errorInsert);
            }
            else {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: level });
            }
        });
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// REMOVE LEVEL BY ID
async function removeLevelByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Level.findOne({ _id });
        const result = await Level.findByIdAndDelete({ _id });
        
        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successDelete.status).send(jsonMessages.success.successDelete);
            }
            else {
                return res.status(jsonMessages.error.errorDelete.status).send(jsonMessages.error.errorDelete);
            }
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// EDIT LEVEL BY ID
async function editLevelByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Level.findOne({ _id });
        const result = await Level.findByIdAndUpdate({ _id });
        
        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successEdit.status).send(jsonMessages.success.successEdit);
            }
            else {
                return res.status(jsonMessages.error.errorDelete.status).send(jsonMessages.error.errorDelete);
            }
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getLevels,
    getLevelByID,
    addLevel,
    removeLevelByID,
    editLevelByID
};
