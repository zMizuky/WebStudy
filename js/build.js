const contentArea = document.getElementById("contentArea");

const build = {
    home(){
        contentArea.innerHTML = "";

        const pageTitle = document.createElement("p");
        const divTop = document.createElement("div");
        const divLeft = document.createElement("div");
        const taskStr = document.createElement("p");
        const rightDiv = document.createElement("div");
        const nameStatsStr = document.createElement("p");
        const levelStatsStr = document.createElement("p");
        const levelBar = document.createElement("div");
        const progressBar = document.createElement("div");
        const xpStatsStr = document.createElement("p");
        const topRowBottom = document.createElement("div");
        const topRowBottomGroup = document.createElement("div");
        const taskStatsStr = document.createElement("p");
        const taskStatsDiv = document.createElement("div");
        const taskCreatedDiv = document.createElement("div");
        const taskCreatedNumber = document.createElement("p");
        const taskCreatedTitle = document.createElement("p");
        const tasksRemaingDiv = document.createElement("div");
        const tasksRemaingNumber = document.createElement("p");
        const tasksRemaingTitle = document.createElement("p");
        const tasksFinishedDiv = document.createElement("div");
        const tasksFinishedNumber = document.createElement("p");
        const tasksFinishedTitle = document.createElement("p");
        const noteStatsStr = document.createElement("p");
        const noteStatsDiv = document.createElement("div");
        const noteCreatedDiv = document.createElement("div");
        const noteCreatedNumber = document.createElement("p");
        const noteCreatedTitle = document.createElement("p");
        const noteWordsDiv = document.createElement("div");
        const noteWordsNumber = document.createElement("p");
        const noteWordsTitle = document.createElement("p");
        const cardStatsStr = document.createElement("p");
        const cardStatsDiv = document.createElement("div");
        const cardCreatedDiv = document.createElement("div");
        const cardCreatedNumber = document.createElement("p");
        const cardCreatedTitle = document.createElement("p");
        const cardHitDiv = document.createElement("div");
        const cardHitNumber = document.createElement("p");
        const cardHitTitle = document.createElement("p");

        const streakDiv = document.createElement("div");
        const streakStr = document.createElement("p");
        const streakTitle = document.createElement("p");
        const dayList = document.createElement("div");

        const bottomRow = document.createElement("div");
        const achievementsStr = document.createElement("p");
        const achievementsDiv = document.createElement("div");
        const quoteTitle = document.createElement("p");
        const quoteDiv = document.createElement("div");
        const quoteIcon1 = document.createElement("a");
        const quoteIcon1img = document.createElement("img");
        const quoteIcon2 = document.createElement("a");
        const quoteIcon2img = document.createElement("img");
        const italic = document.createElement("i");
        const quoteStr = document.createElement("p");
        const authorStr = document.createElement("p");
        const reloadBtn = document.createElement("a");

        pageTitle.id = "pageTitle";
        divTop.classList.add("top-row");
        divLeft.id = "leftDiv";
        rightDiv.id = "rightDiv";
        nameStatsStr.id = "nameStats";
        levelStatsStr.id = "levelStats";
        levelBar.id = "levelBar";
        progressBar.id = "progressBar";
        xpStatsStr.id = "xpStats";
        topRowBottom.id = "top-row-bottom";

        taskStatsDiv.id = "status";
        cardStatsDiv.id = "status";
        noteStatsDiv.id = "status";

        cardCreatedTitle.classList.add("title");
        cardHitTitle.classList.add("title");
        noteWordsTitle.classList.add("title");
        noteCreatedTitle.classList.add("title");
        tasksFinishedTitle.classList.add("title");
        tasksRemaingTitle.classList.add("title");
        taskCreatedTitle.classList.add("title");
        streakTitle.classList.add("title");

        streakTitle.id = "streakStr";

        taskCreatedNumber.id = "tasksCreated";
        tasksRemaingNumber.id = "tasksRemaing";
        tasksFinishedNumber.id = "tasksFinished";
        noteCreatedNumber.id = "notesCreated";
        noteWordsNumber.id = "notesWords";
        cardCreatedNumber.id = "cardsCreated";
        cardHitNumber.id = "cardsHit";
        
        streakStr.id = "streakStr";
        dayList.classList.add("daysList");

        bottomRow.classList.add("bottom-row");
        achievementsDiv.classList.add("achv");
        quoteDiv.classList.add("quote");
        quoteIcon1.id = "quoteIcon";
        quoteIcon2.id = "quoteIconR";
        quoteStr.id = "quoteStr";
        authorStr.id = "authorStr";
        reloadBtn.id = "reloadBtn";

        taskStr.innerHTML = "Tarefas";

        taskStatsStr.innerHTML = "Tarefas";
        taskCreatedTitle.innerHTML = "CRIADAS";
        tasksRemaingTitle.innerHTML = "RESTANTES";
        tasksFinishedTitle.innerHTML = "FINALIZADAS";
        noteStatsStr.innerHTML = "Notas";
        noteCreatedTitle.innerHTML = "CRIADAS";
        noteWordsTitle.innerHTML = "PALAVRAS";
        cardStatsStr.innerHTML = "Cartas";
        cardCreatedTitle.innerHTML = "CRIADAS";
        cardHitTitle.innerHTML = "ACERTO";

        streakTitle.innerHTML = "STREAK";
        achievementsStr.innerHTML = "Conquistas";
        quoteTitle.innerHTML = "Conquistas";

        quoteIcon1img.src = "./icons/quote.svg";
        quoteIcon2img.src = "./icons/quote.svg";
        reloadBtn.src = "./icons/reload.svg";

        divTop.appendChild(divLeft);
        divTop.appendChild(rightDiv);
        divLeft.appendChild(taskStr);
        rightDiv.appendChild(nameStatsStr);
        rightDiv.appendChild(levelStatsStr);
        rightDiv.appendChild(levelBar);
        levelBar.appendChild(progressBar);
        rightDiv.appendChild(xpStatsStr);
        rightDiv.appendChild(topRowBottom);
        topRowBottom.appendChild(topRowBottomGroup);

        topRowBottomGroup.appendChild(taskStatsStr);
        topRowBottomGroup.appendChild(taskStatsDiv);
        taskStatsDiv.appendChild(taskCreatedDiv);
        taskCreatedDiv.appendChild(taskCreatedNumber);
        taskCreatedDiv.appendChild(taskCreatedTitle);
        taskStatsDiv.appendChild(tasksRemaingDiv);
        tasksRemaingDiv.appendChild(tasksRemaingNumber);
        tasksRemaingDiv.appendChild(tasksRemaingTitle);
        taskStatsDiv.appendChild(tasksFinishedDiv);
        tasksFinishedDiv.appendChild(tasksFinishedNumber);
        tasksFinishedDiv.appendChild(tasksFinishedTitle);

        topRowBottomGroup.appendChild(noteStatsStr);
        topRowBottomGroup.appendChild(noteStatsDiv);
        noteStatsDiv.appendChild(noteCreatedDiv);
        noteCreatedDiv.appendChild(noteCreatedNumber);
        noteCreatedDiv.appendChild(noteCreatedTitle);
        noteStatsDiv.appendChild(noteWordsDiv);
        noteWordsDiv.appendChild(noteWordsNumber);
        noteWordsDiv.appendChild(noteWordsTitle);

        topRowBottomGroup.appendChild(cardStatsStr);
        topRowBottomGroup.appendChild(cardStatsDiv);
        cardStatsDiv.appendChild(cardCreatedDiv);
        cardCreatedDiv.appendChild(cardCreatedNumber);
        cardCreatedDiv.appendChild(cardCreatedTitle);
        cardStatsDiv.appendChild(cardHitDiv);
        cardHitDiv.appendChild(cardHitNumber);
        cardHitDiv.appendChild(cardHitTitle);

        topRowBottom.appendChild(streakDiv);
        streakDiv.appendChild(streakStr);
        streakDiv.appendChild(streakTitle);
        streakDiv.appendChild(dayList);

        bottomRow.appendChild(achievementsStr);
        bottomRow.appendChild(achievementsDiv);
        bottomRow.appendChild(quoteStr);
        bottomRow.appendChild(quoteDiv);
        quoteDiv.appendChild(quoteIcon1);
        quoteIcon1.appendChild(quoteIcon1img);

        quoteDiv.appendChild(reloadBtn);

        quoteDiv.appendChild(italic);
        italic.appendChild(quoteStr);
        quoteDiv.appendChild(authorStr);

        quoteDiv.appendChild(quoteIcon2);
        quoteIcon2.appendChild(quoteIcon2img);

        contentArea.appendChild(pageTitle);
        contentArea.appendChild(divTop);
        contentArea.appendChild(bottomRow);
    },
    task(){
        contentArea.innerHTML = "";

        const pageTitle = document.createElement("p");
        const divTop = document.createElement("div");
        const rightDiv = document.createElement("div");
        const addBtn = document.createElement("div");

        addBtn.innerHTML = "Adicionar";

        pageTitle.id = "pageTitle";
        divTop.classList.add("top-row");
        rightDiv.id = "rightDiv";
        addBtn.id = "addBtn";

        contentArea.appendChild(pageTitle);
        contentArea.appendChild(divTop);
        divTop.appendChild(rightDiv);
        contentArea.appendChild(addBtn);
    },
    card(){
        contentArea.innerHTML = "";

        const pageTitle = document.createElement("p");
        const divTop = document.createElement("div");
        const rightDiv = document.createElement("div");
        const cardDiv = document.createElement("div");
        const addBtn = document.createElement("div");
        

        addBtn.innerHTML = "Adicionar";

        
        pageTitle.id = "pageTitle";
        divTop.classList.add("top-row");
        addBtn.id = "addBtn";
        rightDiv.id = "rightDiv";
        cardDiv.id = "cardDiv";

        contentArea.appendChild(pageTitle);
        contentArea.appendChild(divTop);
        divTop.appendChild(rightDiv);
        rightDiv.appendChild(cardDiv);
        contentArea.appendChild(addBtn);
    },
    note(){
        contentArea.innerHTML = "";

        const pageTitle = document.createElement("p");
        const divTop = document.createElement("div");
        const rightDiv = document.createElement("div");
        const leftDiv = document.createElement("div");
        const addBtn = document.createElement("div");

        addBtn.innerHTML = "Adicionar";

        pageTitle.id = "pageTitle";
        divTop.classList.add("top-row");
        rightDiv.id = "rightDiv";
        leftDiv.id = "leftDiv";
        addBtn.id = "addBtn";

        contentArea.appendChild(pageTitle);
        contentArea.appendChild(divTop);
        divTop.appendChild(leftDiv);
        divTop.appendChild(rightDiv);
        contentArea.appendChild(addBtn);
    },
    calendar(){
        contentArea.innerHTML = "";

        const pageTitle = document.createElement("p");
        const rightDiv = document.createElement("div");
        const addBtn = document.createElement("div");
        const calendarContainer = document.createElement("div");
        const calendarHeader = document.createElement("div");
        const prevBtn = document.createElement("button");
        const monthYear = document.createElement("h2");
        const nextBtn = document.createElement("button");
        const weekdays = document.createElement("div");
        weekdays.classList.add("weekdays");
        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day => {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            weekdays.appendChild(dayDiv);
        });
        const days = document.createElement("div");

        const notesList = document.createElement("div");
        const notesTitle = document.createElement("h3");
        const notesPanel = document.createElement("div");

        addBtn.innerHTML = "Adicionar";
        

        pageTitle.id = "pageTitle";
        rightDiv.id = "rightDiv";
        calendarContainer.classList.add("calendar-container");
        calendarHeader.classList.add("calendar-header");
        prevBtn.id = "prev";
        nextBtn.id = "next";
        monthYear.id = "monthYear";
        days.classList.add("days");
        days.id = "days";
        addBtn.id = "addBtn";
        notesList.id = "notesList";
        notesPanel.id = "notesPanel";
        notesTitle.id = "notesTitle";

        prevBtn.innerHTML = "◀";
        nextBtn.innerHTML = "▶";

        contentArea.appendChild(pageTitle);
        contentArea.appendChild(rightDiv);
        rightDiv.appendChild(calendarContainer);
        calendarContainer.appendChild(calendarHeader);
        calendarHeader.appendChild(prevBtn);
        calendarHeader.appendChild(monthYear);
        calendarHeader.appendChild(nextBtn);
        calendarContainer.appendChild(weekdays);
        calendarContainer.appendChild(days);
        calendarContainer.appendChild(notesPanel);
        notesPanel.appendChild(notesTitle);
        notesPanel.appendChild(notesList);

        contentArea.appendChild(addBtn);
    }
}