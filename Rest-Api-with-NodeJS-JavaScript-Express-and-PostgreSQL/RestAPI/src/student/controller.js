//these are imports
const pool = require('../../db');
const queries = require('./queries');
const e = require("express");

//create route for all students
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        //if there was a successful query (the response state is ok), then send back the json of all students from the database
        res.status(200).json(results.rows);
    });
};

//create route for student with id
const getStudentById = (req, res) => {
    //we want the id parameter
    const id = parseInt(req.params.id);
    //if we want to pass multiple parameters, we can write [id, name, ...]
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//we send objects using json
//req = request = we get info from it
//res = response
//dob = date of birth
const addStudent = (req, res) => {
    //to get info from our request body, we use javascript destructuring
    const { name, email, age, dob} = req.body;

    //check if email already exists
    //the email is the variable that we're passing
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        //if the length == 1
        if (results.rows.length) {
            res.send("Email already exists")
        }
        //add student to database
        // (error, results) => this is the callback function
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            //response status = 201 = means that the student has been created successfully
            res.status(201).send("Student Created Successfully!");
        });
    });
};

//we look for the student by id and remove him
const removeStudent = (req, res) => {
    //we get the id out of the request parameters
    //the id comes in a string so we parse it
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        //if the student is not in the database => noStudentFound = 1 => results.rows.length = 0
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        }
        //after checking if the student exists, we remove him
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student removed successfully.");
        });
    });
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    //check if the student exists
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        //if the student is not in the database => noStudentFound = 1 => results.rows.length = 0
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        }
        //if the student exists, update
        // [name, id] = [$1, $2]
        pool.query(queries.updateStudent, [name, id], (error, results) => {
           if (error) throw error;
           res.status(200).send("Student updated successfully");
        });
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};