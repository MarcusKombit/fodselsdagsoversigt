document.addEventListener("DOMContentLoaded", function () {
    // Hent datoen
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('da-DK', options);
    
    // Opdater datofeltet
    const dateElement = document.getElementById("current-date");
    dateElement.textContent = formattedDate;
    
    // Eksempel: Kollegaers fødselsdage
    const birthdays = [
        { name: "Marcus", birthdate: "2000-09-29" },
        { name: "Mads", birthdate: "1997-09-29" },
        { name: "Kasper", birthdate: "1997-09-29" },
    ];
    
    // Tjek fødselsdage og tilføj til listen
    const birthdayList = document.getElementById("birthday-list");
    birthdays.forEach((colleague) => {
        const colleagueBirthday = new Date(colleague.birthdate);
        if (
            currentDate.getDate() === colleagueBirthday.getDate() &&
            currentDate.getMonth() === colleagueBirthday.getMonth()
        ) {
            const listItem = document.createElement("li");
            listItem.textContent = `${colleague.name}' fødselsdag i dag!`;
            birthdayList.appendChild(listItem);
        }
    });
});
