import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added exercise");
        }else { 
            alert("Failed to add exercise, Invalid request");
        }
        navigate("/");
    };

    return (
        <div>
            <h2>Enter values for the exercise</h2>
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option>lbs</option>
                <option>kgs</option>
            </select>
            <input
                type="text"
                placeholder="mm-dd-yy"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button onClick={addExercise}>Add</button>
        </div>
    );
}

export default AddExercisePage;