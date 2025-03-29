# Overview

This is a simple  calculator microservice built with Node.js and Express, featuring comprehensive logging capabilities using Winston, which offers basic arithmetic operations.

## Features

- Basic arithmetic operations:
  - Addition
  - Subtraction
  - Multiplication
  - Division
- Input validation
- Comprehensive logging system
- Error handling
- RESTful API endpoints

## Prerequisites

- Node.js 
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```
git clone <repository-url>
cd calculator
```

2. Install dependencies:

```
npm install
```

3. Create a  logs directory in the project root:

```
mkdir logs
```

## Running the Service

Start the server:

```
node week02.js
```

The service will start on port 3040.

Example
To perform the addition opearation, navigate to the following URL 
```
http://localhost:3040/add?n1=10&n2=5
```

## API Endpoints

### Add

```
GET /add?n1=<number1>&n2=<number2>
```

### Subtract

```
GET /subtract?n1=<number1>&n2=<number2>
```

### Multiply

```
GET /multiply?n1=<number1>&n2=<number2>
```

### Divide

```
GET /divide?n1=<number1>&n2=<number2>
```

### Exponentiation
```
GET /exponentiation?n1=<number1>&n2=<number2>
```

### Square_root
```
GET /square_root?n1=<number1>
```

### Modulo
```
GET /modulo?n1=<number1>&n2=<number2>
```

## Response Format

### Success Response

```json
{
    "statuscode": 200,
    "data": <result>
}
```

### Error Response

```json
{
    "statuscode": 400/500,
    "msg": "<error message>"
}
```
