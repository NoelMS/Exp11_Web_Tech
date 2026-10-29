// Sample question 5: insert three student records and display the CSE students.
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');

        const students = client.db('CollegeDB').collection('Students');
        await students.deleteMany({});

        const result = await students.insertMany([
            { name: 'Arun', department: 'CSE', year: 2 },
            { name: 'Priya', department: 'IT', year: 3 },
            { name: 'Kumar', department: 'CSE', year: 1 }
        ]);
        console.log('Inserted documents:', result.insertedCount);

        const cse = await students.find({ department: 'CSE' }).toArray();
        console.log('CSE students:', cse);
    } catch (error) {
        console.error('Database error:', error.message);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

main();
