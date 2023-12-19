const XLSX = require('xlsx');

const employees = [
    { name: "Andreas Andreasen", birthday: "01-27", project: "projekt1" },
    { name: "Anne-Sophie Tulinius", birthday: "11-14", project: "projekt2" },
    { name: "Birgitte Wendelboe", birthday: "11-19", project: "projekt3" },
    { name: "Jesper Dall-Hansen", birthday: "08-07", project: "projekt4" },
    { name: "Julie Kristoffersen Bendtsen", birthday: "09-13", project: "projekt1" },
    { name: "Jørgen Malmgart", birthday: "04-15", project: "projekt2" },
    { name: "Kasper Clemensen", birthday: "06-06", project: "projekt3" },
    { name: "Line Lund", birthday: "10-14", project: "projekt4" },
    { name: "Mads Pagh Engel Jensen", birthday: "01-07", project: "projekt4" },
    { name: "Marcus Møller Hansen", birthday: "12-31", project: "projekt4" },
    { name: "Maria Bertelsen", birthday: "08-03", project: "projekt4" },
    { name: "Mette Jespersen", birthday: "06-16", project: "projekt4" },
    { name: "Morten Balstrup", birthday: "12-23", project: "projekt4" },
    { name: "Nicoline Krintel", birthday: "06-04", project: "projekt4" },
    { name: "Olivier Bélanger", birthday: "12-02", project: "projekt4" },
    { name: "Rune Mikkel Jensen", birthday: "02-12", project: "projekt4" },
    { name: "Jens Kastenskov", birthday: "10-17", project: "projekt4" },
    { name: "Simone Andersen", birthday: "07-06", project: "projekt4" },
    { name: "Bente Marie Elstrøm Jørgensen", birthday: "05-24", project: "projekt4" }
    // Tilføj flere medarbejdere her
];

// Create a worksheet
const ws = XLSX.utils.json_to_sheet(employees);

// Create a workbook with the worksheet
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Employees');

// Write the workbook to a file
XLSX.writeFile(wb, 'employees.xlsx');
