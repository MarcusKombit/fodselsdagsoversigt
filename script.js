// Simuler en liste over medarbejdere med fødselsdage
const employees = [
    { name: "Medarbejder 1", birthday: "2023-10-02", project: "projekt1" },
    { name: "Medarbejder 2", birthday: "2023-10-05", project: "projekt2" },
    { name: "Medarbejder 3", birthday: "2023-09-30", project: "projekt3" },
    { name: "Medarbejder 4", birthday: "2023-10-01", project: "projekt4" },
    // Tilføj flere medarbejdere her
];

// Funktion for at opdatere datoen
function updateDate() {
    const currentDate = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("da-DK", options);
    document.getElementById("dateDisplay").textContent = formattedDate;
}

// Funktion for at finde og vise fødselsdage i dag
function showBirthdaysToday() {
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0];
    const filteredEmployees = employees.filter(employee => employee.birthday === today);

    if (filteredEmployees.length > 0) {
        const names = filteredEmployees.map(employee => employee.name);
        const birthdayText = `Fødselsdag i dag: ${names.join(", ")}`;
        document.getElementById("birthdayDisplay").textContent = birthdayText;
    } else {
        document.getElementById("birthdayDisplay").textContent = "Ingen fødselsdag i dag.";
    }
}

// Funktion for at vise medarbejdere med fødselsdag i dag for det valgte projekt eller alle projekter
function showBirthdaysTodayByProject() {
    const selectedProject = projectFilter.value;
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0];

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
            selectedProject === "alle" ? "" : ` (${selectedProject})`;
        const birthdayText = `Fødselsdag i dag${projectText}: ${names.join(", ")}`;
        document.getElementById("birthdayDisplay").textContent = birthdayText;
        birthdayGif.src = "Fødselsdagsgif.gif";
    } else {
        document.getElementById("birthdayDisplay").textContent =
            selectedProject === "alle"
                ? "Ingen fødselsdag i dag."
                : `Ingen fødselsdag i dag for ${selectedProject}.`;
        birthdayGif.src = ""; // Skjul GIF'en, hvis der ikke er fødselsdag i dag
    }
}

// Funktion for at vise kommende fødselsdage baseret på projektfilteret
function showUpcomingBirthdaysByProject() {
    const selectedProject = projectFilter.value;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Gå til næste dag
    const oneWeekLater = new Date(currentDate);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const upcomingEmployees = employees.filter(employee => {
        const birthdayDate = new Date(employee.birthday);
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
            const listItem = document.createElement("li");
            listItem.textContent = `${employee.name} (${employee.project}) - ${employee.birthday}`;
            birthdayList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.textContent =
            selectedProject === "alle"
                ? "Ingen kommende fødselsdage inden for en uge."
                : `Ingen kommende fødselsdage for ${selectedProject} inden for en uge.`;
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