// Simuler en liste over medarbejdere med fødselsdage
const employees = [
    { name: "Andreas Andreasen", birthday: "01-27", project: "TMB" },
    { name: "Anne-Sophie Tulinius", birthday: "11-04", project: "TMB" },
    { name: "Birgitte Wendelboe", birthday: "11-19", project: "TMB" },
    { name: "Jesper Dall-Hansen", birthday: "08-07", project: "TMB" },
    { name: "Julie Kristoffersen Bendtsen", birthday: "09-13", project: "TMB" },
    { name: "Jørgen Malmgart", birthday: "04-15", project: "TMB" },
    { name: "Kasper Clemensen", birthday: "06-06", project: "TMB" },
    { name: "Line Lund", birthday: "10-14", project: "TMB" },
    { name: "Mads Pagh Engel Jensen", birthday: "01-07", project: "TMB" },
    { name: "Marcus Møller Hansen", birthday: "12-31", project: "TMB" },
    { name: "Maria Bertelsen", birthday: "08-03", project: "TMB" },
    { name: "Mette Jespersen", birthday: "06-16", project: "TMB" },
    { name: "Morten Balstrup", birthday: "12-23", project: "TMB" },
    { name: "Nicoline Krintel", birthday: "06-04", project: "TMB" },
    { name: "Olivier Bélanger", birthday: "12-02", project: "TMB" },
    { name: "Rune Mikkel Jensen", birthday: "02-13", project: "TMB" },
    { name: "Jens Kastenskov", birthday: "10-17", project: "TMB" },
    { name: "Simone Andersen", birthday: "07-06", project: "TMB" },
    { name: "Bente Marie Elstrøm Jørgensen", birthday: "05-24", project: "TMB" }
    // Tilføj flere medarbejdere her
];


// Funktion for at opdatere datoen
function updateDate() {
    const currentDate = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("da-DK", options);
    document.getElementById("dateDisplay").textContent = formattedDate;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return `${month}-${day}`;
}

function formatDate2(dateString) {
    const [month, day] = dateString.split('-').map(Number);
    return `${day}/${month}`;
}

// Funktion for at finde og vise fødselsdage i dag
function showBirthdaysToday() {
    const currentDate = new Date();
    const today1 = currentDate.toISOString().split("T")[0];
    const today = formatDate(today1)
    const filteredEmployees = employees.filter(employee => employee.birthday === today);

    if (filteredEmployees.length > 0) {
        const names = filteredEmployees.map(employee => employee.name);
        const birthdayText = `Følgende kollegaer har fødselsdag i dag:<br>${names.join("<br>")}`;
        document.getElementById("birthdayDisplay").innerHTML = birthdayText;
    } else {
        document.getElementById("birthdayDisplay").textContent = "Ingen fødselsdag i dag. Hold øje med kommende fødselsdage nedenfor!";
    }
}

// Funktion for at vise medarbejdere med fødselsdag i dag for det valgte projekt eller alle projekter
function showBirthdaysTodayByProject() {
    const selectedProject = projectFilter.value;
    const currentDate = new Date();
    const today1 = currentDate.toISOString().split("T")[0];
    const today = formatDate(today1)

    const filteredEmployees = employees.filter(employee => {
        return (
            employee.birthday === today &&
            (selectedProject === "alle" || employee.project === selectedProject)
        );
    });

    const birthdayGif = document.getElementById("birthdayGif");

    if (filteredEmployees.length > 0) {
        const names = filteredEmployees.map(employee => employee.name);
        const projectText =
            selectedProject === "alle" ? "" : ` i ${selectedProject}`;
            const birthdayText = `<p class="birthday-heading">Følgende kollegaer${projectText} har fødselsdag i dag:</p><br><br>`;
        
        const nameList = names.map(name => `<p class="birthday-name">${name}</p>`).join("<br>");
        
        document.getElementById("birthdayDisplay").innerHTML = birthdayText + nameList;
        birthdayGif.src = "Fødselsdagsgif.gif";
    } else {
        document.getElementById("birthdayDisplay").textContent =
            selectedProject === "alle"
                ? "Ingen kollegaer har fødselsdag i dag. Hold øje med kommende fødselsdage nedenfor!"
                : `Ingen i ${selectedProject} har fødselsdag i dag.`;
        birthdayGif.src = "arrow1.gif"; // Skjul GIF'en, hvis der ikke er fødselsdag i dag
    }
}

// Funktion for at vise kommende fødselsdage baseret på projektfilteret
function showUpcomingBirthdaysByProject() {
    const selectedProject = projectFilter.value;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()); // Gå til næste dag
    const oneWeekLater = new Date();
    oneWeekLater.setDate(currentDate.getDate() + 7);

    const upcomingEmployees = employees.filter(employee => {
        const currentYear = new Date().getFullYear().toString();
        const birthdayDate = new Date(`${currentYear}-${employee.birthday}`);
        return (
            birthdayDate >= currentDate &&
            birthdayDate <= oneWeekLater &&
            (selectedProject === "alle" || employee.project === selectedProject)
        );
    });

    const birthdayList = document.getElementById("birthdayList");
    birthdayList.innerHTML = "";

    if (upcomingEmployees.length > 0) {
        upcomingEmployees.forEach(employee => {
            const listItem = document.createElement("li")
            const birthdayText = formatDate2(employee.birthday);
            listItem.textContent = `${employee.name} - ${birthdayText}`;
            birthdayList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.textContent =
            selectedProject === "alle"
                ? "Ingen kommende fødselsdage inden for den næste uge."
                : `Ingen kommende fødselsdage i ${selectedProject} inden for den næste uge.`;
        birthdayList.appendChild(listItem);
    }
}



// Event-lyttere
document.addEventListener("DOMContentLoaded", () => {
    updateDate();
    showBirthdaysTodayByProject(); // Opdater medarbejdere med fødselsdag i dag ved start
    showUpcomingBirthdaysByProject(); // Opdater medarbejdere baseret på projektfilter ved start
});

// Opdatering af fødselsdage, når projektfilteret ændres
projectFilter.addEventListener("change", () => {
    showBirthdaysTodayByProject();
    showUpcomingBirthdaysByProject();
});