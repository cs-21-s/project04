const fs = require('fs');
const path = require('path');

class Database {
    constructor(filename) {
        this.filepath = path.join(__dirname, filename);
        this.data = [];
        this.loadData();
    }

    loadData() {
        const fileData = fs.readFileSync(this.filepath, 'utf8');
        this.data = JSON.parse(fileData) || [];
        } 

    saveData() {
        fs.writeFileSync(this.filepath, JSON.stringify(this.data, null, 2));
    }

    insert(record) {
        this.data.push(record);
        this.saveData();
        return record;
    }

    findAll() {
        return this.data;
    }

    findByName(name) {
        return this.data.filter(record => 
            record.name.toLowerCase() === name.toLowerCase()
        );
    }

    findByEvent(eventName) {
        return this.data.filter(record => 
            record.eventName.toLowerCase() === eventName.toLowerCase()
        );
    }

    deleteByTicket(ticketNumber) {
        const initialLength = this.data.length;
        this.data = this.data.filter(record => record.ticketNumber !== ticketNumber);
        if (this.data.length < initialLength) {
            this.saveData();
            return true;
        }
        return false;
    }

    generateTicketNumber() {
        return 'T' + Math.floor(10000 + Math.random() * 90000);
    }
}

module.exports = Database;