const { info } = require("console");
const express = require("express");
const app = express();
const winston = require('winston');

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
            new winston.transports.Console({
            format: winston.format.simple(), 
            }),            
            new winston.transports.File({ filename: 'logs/error.log', level:'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' }),           
            ],
        //
        // - Write all logs with level `info` and below to `combined.log` 
        // - Write all logs with level `error` or below to `error.log`
        //
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Arithmetic operations
const operations = {
    add: (n1, n2) => n1 + n2,
    subtract: (n1, n2) => n1 - n2,
    multiply: (n1, n2) => n1 * n2,
    divide: (n1, n2) => {
        if (n2 === 0) throw new Error("Division by zero is not allowed");
        return n1 / n2;
    },
    exponentiation: (n1, n2) => n1 ** n2,
    square_root: (n1) => Math.sqrt(n1),
    modulo: (n1, n2) => n1 % n2,
};

// Middleware to validate numbers
const validateNumbers = (req, res, next) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
     //check if n1 is a valid number
    if (isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        return res.status(400).json({ statuscode: 400, msg: "n1 is not a valid number" });
    }
    //check if n2 is a valid number
    if (isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        return res.status(400).json({ statuscode: 400, msg: "n2 is not a valid number" });
    }

    req.n1 = n1;
    req.n2 = n2;
    next();
};

// Arithmetic operation endpoints
//add endpoint
app.get("/add", validateNumbers, (req, res) => {
    try {
        logger.info(`Addition operation with parameters ${req.n1} and ${req.n2}`); //log the operation
        const result = operations.add(req.n1, req.n2); //perform the operation
        res.status(200).json({ statuscode: 200, data: result }); //send the result
    } catch (error) {
        logger.error(`Addition error: ${error.message}`); //log the error
        res.status(500).json({ statuscode: 500, msg: error.message }); //send the error
    }
});
//subtract endpoint
app.get("/subtract", validateNumbers, (req, res) => {
    try {
        logger.info(`Subtraction operation with parameters ${req.n1} and ${req.n2}`);
        const result = operations.subtract(req.n1, req.n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(`Subtraction error: ${error.message}`);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
});
//multiply endpoint
app.get("/multiply", validateNumbers, (req, res) => {
    try {
        logger.info(`Multiplication operation with parameters ${req.n1} and ${req.n2}`);
        const result = operations.multiply(req.n1, req.n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(`Multiplication error: ${error.message}`);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
});
//divide endpoint
app.get("/divide", validateNumbers, (req, res) => {
    try {
        logger.info(`Division operation with parameters ${req.n1} and ${req.n2}`);
        const result = operations.divide(req.n1, req.n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(`Division error: ${error.message}`);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
});
//exponentiation endpoint
app.get("/exponentiation", validateNumbers, (req, res) => {
    try {
        logger.info(`Exponentiation operation with parameters ${req.n1} and ${req.n2}`);
        const result = operations.exponentiation(req.n1, req.n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(`Exponentiation error: ${error.message}`);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
});
//square_root endpoint
app.get("/square_root", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        
        // Validate input
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            return res.status(400).json({ statuscode: 400, msg: "n1 is not a valid number" });
        }

        if (n1 < 0) {
            logger.error("Cannot calculate square root of negative number");
            return res.status(400).json({ statuscode: 400, msg: "Cannot calculate square root of negative number" });
        }

        logger.info(`Square root operation with parameter ${n1}`);
        const result = operations.square_root(n1);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(`Square root error: ${error.message}`);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
});
//modulo endpoint
app.get("/modulo", validateNumbers, (req, res) => {
    try {
        logger.info(`Modulo operation with parameters ${req.n1} and ${req.n2}`);
        const result = operations.modulo(req.n1, req.n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(`Modulo error: ${error.message}`);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
});

//start the server
const port = 3040;
app.listen(port, () => {
    logger.info(`Arithmetic microservice is listening on port ${port}`);
    console.log(`Server is running on port ${port}`);
});