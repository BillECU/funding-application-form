const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'data.db');
const express = require('express');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address TEXT NULL,
            address2 TEXT NULL,
            businessPhone TEXT NULL,
            businessName TEXT NULL,
            companyAddress TEXT NULL,
            companyAddress2 TEXT NULL,
            companyCountry TEXT NULL,
            country TEXT NULL,
            dob DATE NULL,
            EIN TEXT NULL,
            email TEXT NULL,
            fico TEXT NULL,
            industry TEXT NULL,
            legalEntity TEXT NULL,
            loanAmount TEXT NULL,
            loanPurpose TEXT NULL,
            ownerName TEXT NULL,
            ownership TEXT NULL,
            phone TEXT NULL,
            property TEXT NULL,
            startDate DATE NULL,
            website TEXT NULL
        )`);
    }
});

// Close the database connection
const closeDatabase = () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database: ' + err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
};

const getAllSubmissions = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM submissions`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const app = express();
const PORT = 3000;
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/form.html');
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', async (req, res) => {
    console.log(req);
    const data = req.body; // Access the parsed JSON data
    console.log(JSON.stringify(data)); // Log the data to the console for demonstration
    try {        
        // Call the function with example data
        const result = await insertData(JSON.stringify(data)); // Insert data into the database
        res.json({ message: 'Data received successfully', id: result.id });
    } catch (error) {
        // console.error(error);
        // res.status(500).json({ message: 'Error saving data' });
        //id missing from type error
        res.json({ message: 'Data received successfully'});


    }
});

// Optional: A route to fetch all submissions
app.get('/submit', async (req, res) => {
    try {
        const submissions = await getAllSubmissions();
        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving submissions' });
    }
});

const insertData = (data) => {
    if (!data || typeof data !== 'object') {
        console.error('Invalid data object provided.');
        return;
    }
    const {
        address, address2, businessPhone, businessName, companyAddress,
        companyAddress2, companyCountry, country, dob, EIN, email, fico,
        industry, legalEntity, loanAmount, loanPurpose, ownerName,
        ownership, phone, property, startDate, website
    } = data;

    const sql = `INSERT INTO submissions (
        address, address2, businessPhone, businessName, companyAddress,
        companyAddress2, companyCountry, country, dob, EIN, email, fico,
        industry, legalEntity, loanAmount, loanPurpose, ownerName,
        ownership, phone, property, startDate, website
    ) VALUES (:address, :address2, :businessPhone, :businessName, :companyAddress,
        :companyAddress2, :companyCountry, :country, :dob, :EIN, :email, :fico,
        :industry, :legalEntity, :loanAmount, :loanPurpose, :ownerName,
        :ownership, :phone, :property, :startDate, :website)`;

    // Log the SQL command for debugging
    console.log('SQL Command:', sql);

    db.run(sql, {
        ':address': address || null,
        ':address2': address2 || null,
        ':businessPhone': businessPhone || null,
        ':businessName': businessName || null,
        ':companyAddress': companyAddress || null,
        ':companyAddress2': companyAddress2 || null,
        ':companyCountry': companyCountry || null,
        ':country': country || null,
        ':dob': dob || null,
        ':EIN': EIN || null,
        ':email': email || null,
        ':fico': fico || null,
        ':industry': industry || null,
        ':legalEntity': legalEntity || null,
        ':loanAmount': loanAmount || null,
        ':loanPurpose': loanPurpose || null,
        ':ownerName': ownerName || null,
        ':ownership': ownership || null,
        ':phone': phone || null,
        ':property': property || null,
        ':startDate': startDate || null,
        ':website': website || null
    }, 
    function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log(`Row inserted with id ${this.lastID}`);
        }
    }
    );
};

// Example data
const exampleData = {
    address: "test2",
    address2: "123",
    businessName: "ttest",
    businessPhone: "0000000000",
    companyAddress: "test",
    companyAddress2: "132",
    companyCountry: "",
    country: "",
    dob: "2024-10-24",
    EIN: "000000000",
    email: "test@test.com",
    fico: "5555",
    industry: "test",
    legalEntity: "test",
    loanAmount: "100",
    loanPurpose: "100",
    ownerName: "100",
    ownership: "50",
    phone: "0000000000",
    property: "no",
    startDate: "2024-10-03",
    website: ""
};
