import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static('build'));

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.post('/exercises', (req, res) => {
    if (typeof req.body.name != 'string' || req.body.name.length < 1) {
        res.status(400).json({ Error: 'Invalid Request' });
    }
    else if (isNaN((Number(req.body.reps))) || !Number.isInteger(Number(req.body.reps))  || req.body.reps < 1) {
        res.status(400).json({ Error: 'Invalid Request' });
    }
    else if (isNaN((Number(req.body.weight))) || !Number.isInteger(Number(req.body.weight))  || req.body.weight < 1) {
        res.status(400).json({ Error: 'Invalid Request' });
    } 
    else if (req.body.unit != 'kgs' & req.body.unit != 'lbs') {
        res.status(400).json({ Error: 'Invalid Request' });
    }
    else if (!isDateValid(req.body.date)) { 
        res.status(400).json({ Error: 'Invalid Request' });
    }else {
        exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                res.status(201).json(exercise);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Invalid Request' });
            });
        }
});

app.get('/exercises', (req, res) => {
    const filter = {};
    exercises.findExercises(filter)
        .then(exercises => {
            res.send(exercises);
        })
});

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
});

app.put('/exercises/:_id', (req, res) => {
    if (typeof req.body.name != 'string' || req.body.name.length < 1) {
        res.status(400).json({ Error: 'Invalid Request' });
    }
    else if (isNaN((Number(req.body.reps))) || !Number.isInteger(Number(req.body.reps))  || req.body.reps < 1) {
        res.status(400).json({ Error: 'Invalid Request' });
    }
    else if (isNaN((Number(req.body.weight))) || !Number.isInteger(Number(req.body.weight))  || req.body.weight < 1) {
        res.status(400).json({ Error: 'Invalid Request' });
    } 
    else if (req.body.unit != 'kgs' & req.body.unit != 'lbs') {
        res.status(400).json({ Error: 'Invalid Request' });
    }
    else if (!isDateValid(req.body.date)) { 
        res.status(400).json({ Error: 'Invalid Request' });
    }else {
        exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(numUpdated => {
                if (numUpdated === 1) {
                    res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
                } else {
                    res.status(404).json({ Error: 'Not found' });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Invalid request' });
            });
    }
});

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Not found' });
        }
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${PORT}...`);
});