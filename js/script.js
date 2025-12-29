const pomoStr = document.getElementById("pomoStr");
const levelStr = document.getElementById("levelStr");
const usernameStr = document.getElementById("usernameStr");

const pageStr = document.getElementById("pageTitle");

const homePageStr = document.getElementById("HomePageStr");
const cardPageStr = document.getElementById("CardPageStr");
const notePageStr = document.getElementById("NotePageStr");
const todoPageStr = document.getElementById("TodoPageStr");
const calendarPageStr = document.getElementById("CalendarPageStr");

const pomoBtn = document.querySelector(".timer div");

const username = getUsername();

const taskXP = 15;
const cardHitXP = 25;

const pages = [homePageStr, cardPageStr, notePageStr, todoPageStr, calendarPageStr];

let selectedP = 0;

let streak = localStorage.getItem("streak") || 0;
let night = false;
let level = 1;
let xp = 0;
let levelUpValue = 300;
let pomo;
let timer = 600;
let timeStep = 0;
let taskAmount = 0;
let taskRemaing = 0;
let taskFinish = 0;
let noteAmount = localStorage.getItem("noteAmount") || 0;
let noteWords = localStorage.getItem("noteWords") || 0;
let cardAmount = localStorage.getItem("cardAmount") || 0;
let cardHit = localStorage.getItem("cardPer") || 0;

let selectedDay;

let currentDate = new Date();

const colors = {
    red: "#EA4335",
    green: "#34A853"
}

const calendar = {
    render(date){
        const year = date.getFullYear();
        const month = date.getMonth();
        const calendarDB = getDB("calendarDB");

        monthYear.textContent = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        daysContainer.innerHTML = '';
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            daysContainer.appendChild(emptyDiv);
        }
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');

            const today = new Date();
            if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
                dayDiv.classList.add('today');
            }

            const dayStr = `${year}-${month + 1}-${i}`;

            const hasNote = calendarDB.some(note => note.date === dayStr);
            if(hasNote){
                dayDiv.classList.add("has");
            }

            dayDiv.textContent = i;

            dayDiv.addEventListener('click', () => {
                const allDays = daysContainer.querySelectorAll('div');
                allDays.forEach(d => d.classList.remove('selectedDay'));

                dayDiv.classList.add("selectedDay");

                selectedDay = dayStr;

                this.showNotes(selectedDay);
            });

            daysContainer.appendChild(dayDiv);
        }
    },
    add(){
        const calendarDB = getDB("calendarDB");
        let input = prompt("Qual é o nome do lembrente?");
        let id = generateId();
        if(!input){
            input = `Novo lembrente #${id}`;
        }
        if(!selectedDay){
            this.getDate();
        }
        const note = {
            id: id,
            title: input,
            note: "",
            date: selectedDay
        }
        calendarDB.push(note);
        storage("calendarDB", true, calendarDB);
        this.render(new Date(selectedDay));
        this.showNotes(selectedDay);
    },
    getDate(){
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        selectedDay = todayStr;
    },
    showNotes(date){
        const calendarDB = getDB("calendarDB");
        notesTitle.textContent = `Lembretes de ${date}`;
        notesList.innerHTML = '';

        const notesOfDay = calendarDB.filter(note => note.date === date);

        notesOfDay.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add("noteItem");
            noteDiv.textContent = note.title + (note.note ? `: ${note.note}` : '');

            noteDiv.addEventListener('click', () => {
                const input = prompt("Digite sua nota:", note.note || "");
                if(input !== null){
                    note.note = input;
                    storage("calendarDB", true, calendarDB);
                    this.showNotes(date);
                    this.render(new Date(date));
                }
            });

            notesList.appendChild(noteDiv);
        });
    }
}

const achievements = {
    async json(){
        try{
            const response = await fetch("./json/achievements.json");
            return await response.json();
        } catch(error){
            console.error("Erro ao carregar JSON:", error);
        }
    },
    async get(){
        try{
            const data = storage("achievementsDB", false);
            return data;
        }
        catch{
            const data = await this.json(); 
            storage("achievementsDB", true, data);
            return data;
        }
    },
    async build(){
        const achievementsDB = await this.get();
        const achvDiv = document.querySelector(".achv");

        achvDiv.innerHTML = "";
        for(let i=0; i <= 14; i++){
            const icon = document.createElement("img");
            icon.src = achievementsDB[i].icon;
            if(achievementsDB[i].done){
                icon.classList.add("unlock");
            }
            achvDiv.appendChild(icon);
        }
    },
    check(){
        if(taskFinish > 0){
            this.unlock(0);
        }
        if(taskFinish >= 100){
            this.unlock(1);
        }
        if(xp >= 1000){
            this.unlock(2);
        }
        if(streak >= 7){
            this.unlock(3);
        }
        if(cardAmount >= 20){
            this.unlock(4);
        }
        if(level >= 10){
            this.unlock(9);
        }
        if(streak >= 30){
            this.unlock(10);
        }
        if(streak >= 60){
            this.unlock(11);
        }
        if(cardAmount >= 50){
            this.unlock(12);
        }

        this.build();
    },
    async unlock(id){
        const achievementsDB = await achievements.get();
        const index = achievementsDB.findIndex(n => n.id === id);

        if(index !== -1){
            achievementsDB[index].done = true;
            storage("achievementsDB", true, achievementsDB);
        } else {
            console.log("Achievement não encontrado");
        }
    }
}

const card = {
    addCard(){
        const cardsDB = getDB("cardsDB");;
        while(true){
            const question = prompt("Qual é a pergunta?");
            if(question){
                while(true){
                    const answer = prompt("Qual é a resposta?");
                    if(answer){
                        const card = {
                            id: generateId(),
                            question: question,
                            answer: answer,
                            correct: 0,
                            fail: 0
                        }
                        loadOrCreate("cardAmount", cardAmount);
                        cardAmount++;
                        storage("cardAmount", true, cardAmount);
                        cardsDB.push(card);
                        storage("cardsDB", true, cardsDB);
                        break;
                    }
                }
                break;
            }
        }
    },
    response(value, id){
        const cardsDB = getDB("cardsDB");
        const index = cardsDB.findIndex(n => n.id === id);
        if(index !== -1){
            if(value){
                cardsDB[index].correct = cardsDB[index].correct + 1;
                addStreak();
            }
            else{
                cardsDB[index].fail = cardsDB[index].fail+1;
            }
            storage("cardsDB", true, cardsDB);
        }
    },
    refreshStatus(){
        cardsCreated.innerHTML = cardAmount;
        cardsHitStr.innerHTML = card.correctPer();
    },
    load(){
        const cardsDB = getDB("cardsDB");
        const contentDiv = document.getElementById("cardDiv");
        contentDiv.innerHTML = "";
        for(let i = 0; i < cardsDB.length; i++){
            const newCard = document.createElement("div");
            const question = document.createElement("p");
            const response = document.createElement("p");
            const choose = document.createElement("div");
            const correctBtn = document.createElement("div");
            const failBtn = document.createElement("div");
            const iconCorrect = document.createElement("img");
            const iconIncorrect = document.createElement("img");
            
            newCard.id = "card";
            question.id = "question";
            response.id = "response";
            correctBtn.id = "correct";
            failBtn.id = "fail";

            iconCorrect.src = "./icons/correct.svg";
            iconIncorrect.src = "./icons/incorrect.svg";

            newCard.appendChild(question);
            newCard.appendChild(response);
            newCard.appendChild(choose);
            choose.appendChild(correctBtn);
            correctBtn.appendChild(iconCorrect);
            choose.appendChild(failBtn);
            failBtn.appendChild(iconIncorrect);

            question.innerHTML = cardsDB[i].question;
            response.innerHTML = cardsDB[i].answer;

            contentDiv.appendChild(newCard);

            newCard.addEventListener("click", () => {
                response.classList.add("confirm");
                choose.classList.add("confirm");
                const cardID = cardsDB[i].id;

                correctBtn.addEventListener("click", () => {
                    choose.remove();
                    card.response(true, cardID);
                    newCard.classList.add("correctResponse");
                    xp += cardHitXP;
                    storage("xp", true, xp);
                });
                failBtn.addEventListener("click", () => {
                    choose.remove();
                    card.response(false, cardID)
                    newCard.classList.add("failResponse");
                });
            });
        }

    },
    correctPer(){
        const cardsDB = getDB("cardsDB");
        loadOrCreate("cardsPer");
        let correct = 0;
        let incorrect = 0;
        for(let i = 0; i < cardsDB.length; i++){
            correct+= cardsDB[i].correct;
            incorrect+= cardsDB[i].fail;
        }

        let per = (correct/(correct+incorrect))*100;
        per = `${per.toFixed(2)}%`
        storage("cardsPer", true, per);
        return per;
    }
}

const tasks = {
    add(){
        const tasksDB = getDB("tasksDB");
        while(true){
            const input = prompt("Qual é a tarefa?");
            if(input){
                const task = {
                    id: generateId(),
                    task: input,
                    done: false
                }
                tasksDB.push(task);
                storage("tasksDB", true, tasksDB);
                this.refreshStatus();
                break;
            }
        }
    },
    edit(id){
        tasksDB = getDB("tasksDB");
        const index = tasksDB.findIndex(n => n.id === id);
        if(index !== -1){
            const input = prompt("Qual é a tarefa?");
            if(input){
                tasksDB[index].task = input;
            }
            
        }
        try{
                tier.refreshStr();
        }
        catch{
            console.log("Fora da Home");
        }
        storage("tasksDB", true, tasksDB);
        
        this.refreshStatus();
    },
    refreshStatus(){
        const tasksDB = getDB("tasksDB");

        taskDiv.innerHTML = "";

        taskAmount = getDB("tasksDB").length;
        
        if(selectedP == 0){
            taskDiv.innerHTML = "<p>Tarefas</p>";
            x = 10
        }
        else{
            x = tasksDB.length;
        }

        for(let i = 0; i < x; i++){
            const newTask = document.createElement("div");
            const newMark = document.createElement("div");
            const taskStr = document.createElement("p");
            try{
                taskStr.innerHTML = tasksDB[i].task;
                if(tasksDB[i].done){
                    newTask.classList.add("scratch")
                }

                newTask.appendChild(newMark);
                newTask.appendChild(taskStr);
                newTask.id = "task";

                taskDiv.appendChild(newTask);
                if(selectedP == 1){
                    const buttons = document.createElement("div");
                    const removeBtn = document.createElement("div");
                    const editBtn = document.createElement("div");
                    const editIcon = document.createElement("img");
                    editIcon.src = "./icons/pen.svg"
                    removeBtn.innerHTML = "Remover";
                    editBtn.id = "editBtn";
                    removeBtn.id = "removeBtn";
                    buttons.id = "buttonsTask";
                    newTask.appendChild(buttons);
                    buttons.appendChild(removeBtn);
                    buttons.appendChild(editBtn);
                    editBtn.appendChild(editIcon);

                    removeBtn.addEventListener("click", () => {tasks.remove(tasksDB[i].id)})
                    editBtn.addEventListener("click", () => {tasks.edit(tasksDB[i].id)})
                    
                }

                newMark.addEventListener("click", () => {tasks.checker(tasksDB[i].id)})
            }
            catch{
                continue;
            }
        }

        taskRemaing = tasksDB.length;

        for(let i = 0; i < tasksDB.length; i++){
            if(tasksDB[i].done){
                taskRemaing -= 1;
            }
        }

        loadOrCreate("taskRemaing", 0);
        loadOrCreate("taskFinish", 0);

        if(taskAmount > 10 && selectedP == 0){
            const moreStr = document.createElement("p");
            moreStr.id = "levelStats";
            moreStr.innerHTML = "Ver mais..."
            moreStr.style.cursor = "pointer";
            
            taskDiv.appendChild(moreStr);
            moreStr.addEventListener("click", () => {loadPage.todo();})
        }
        try{
            tasksReamingStr.innerHTML = taskRemaing;
            tasksCreatedStr.innerHTML = taskAmount;
            tasksFinishedStr.innerHTML = taskFinish;
        }
        catch{
            console.log("Fora da Home");
        }

        
    },
    checker(id){
        tasksDB = getDB("tasksDB");
        const index = tasksDB.findIndex(n => n.id === id);
        if(index !== -1){
            tasksDB[index].done = !tasksDB[index].done;
            tier.get();
            if(tasksDB[index].done){
                xp += taskXP;
                taskFinish += 1;
                addStreak();
            }
            else{
                xp -= taskXP;
                taskFinish -= 1;
            }
            storage("taskFinish", false, taskFinish);
            storage("taskFinish", true, taskFinish);
            storage("xp", true, xp);
            try{
                tier.refreshStr();
            }
            catch{
                console.log("Fora da Home");
            }
        }
        storage("tasksDB", true, tasksDB);
        try{
            tasksFinishedStr.innerHTML = taskFinish;
            achievements.check();
        }
        catch{
            console.log("Fora da Home");
        }
        
        this.refreshStatus();
    },
    remove(id){
        tasksDB = getDB("tasksDB");
        const index = tasksDB.findIndex(n => n.id === id);
        if(index !== -1){
            tasksDB.splice(index, 1);
            try{
                tier.refreshStr();
            }
            catch{
                console.log("Fora da Home");
            }
        }
        storage("tasksDB", true, tasksDB);
        
        this.refreshStatus();
    }
}

const pomodoro = {
    play() {
        if(pomo) return;
        pomo = setInterval(() => {
            if(timeStep >= timer){
                this.reset();
            }
            else{
                timeStep++;
                this.refresh();
                this.setStore();
            }
        }, 1000);
        pomoBtn.style.backgroundColor = colors.green;
    },
    pause(){
        clearInterval(pomo);
        pomo = null;
        pomoBtn.style.backgroundColor = colors.red;
    },
    reset(){
        timeStep = 0;
        this.pause();
        this.setStore();
    },
    formated(sec) {
        const h = String(Math.floor(sec / 3600)).padStart(2, "0");
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    },
    setStore(){
        storage("timeStep", true, timeStep);
        storage("timer", true, timer);
    },
    setTimer(sec){
        timer = sec;
        this.setStore();
    },
    toggle(){
        if(pomo){
            this.pause();
        }else{
            this.play();
        }
    },
    refresh(){
        pomoStr.innerHTML = this.formated(timeStep);
    }
}

const tier = {
    progress(){
        if(xp >= levelUpValue){
            this.levelUp();
        }
        let progress = ((100*xp)/(levelUpValue));
        return progress;
    },
    get(){
        xp = loadOrCreate("xp", 0);
        levelUpValue = loadOrCreate("levelUpValue", 300);
        level = loadOrCreate("level", 1);
        taskFinish = loadOrCreate("taskFinish", 0);
    },
    levelUp(){
        while(xp >= levelUpValue){
            level++
            levelUpValue = levelUpValue * 2;
            console.log("Level up!");
            storage("xp", true, xp);
            storage("levelUpValue", true, levelUpValue);
            storage("level", true, level);
        }
    },
    refreshStr(){
        this.get();
        progressBar.style.width = `${this.progress()}%`;
        levelStr.innerHTML = level;
        levelStats.innerHTML = `Level ${level}`;
        xpStats.innerHTML = `${xp} XP`
    }
}

const note = {
    refreshStr(){
        this.words();
        noteCreatedStr.innerHTML = noteAmount;
        noteWordsStr.innerHTML = noteWords;
    },
    add(){
        const noteDB = getDB("noteDB");
        let input = prompt("Qual é o nome da nota?");
        let id = generateId();
        if(!input){
            input = `Nova nota #${id}`;
        }
        const note = {
            id: id,
            title: input,
            note: ""
        }
        noteDB.push(note);
        noteAmount++;
        storage("noteAmount", true, noteAmount);
        storage("noteDB", true, noteDB);
    },
    refreshStatus(){
        const noteDB = getDB("noteDB");
        const noteDiv = document.getElementById("leftDiv");

        noteDiv.innerHTML = "";

        noteAmount = getDB("noteDB").length;

        for(let i = 0; i < noteDB.length; i++){
            const newNote = document.createElement("div");
            const noteTitle = document.createElement("p");
            try{
                noteTitle.innerHTML = noteDB[i].title;

                newNote.appendChild(noteTitle);
                newNote.id = "note";

                noteDiv.appendChild(newNote);
                const buttons = document.createElement("div");
                const removeBtn = document.createElement("div");
                const editBtn = document.createElement("div");
                const editIcon = document.createElement("img");
                editIcon.src = "./icons/pen.svg"
                removeBtn.innerHTML = "Remover";
                removeBtn.id = "removeBtn";
                buttons.id = "buttonsTask";
                newNote.appendChild(buttons);
                buttons.appendChild(removeBtn);
                buttons.appendChild(editBtn);
                editBtn.appendChild(editIcon);

                noteTitle.addEventListener("click", () => note.show(noteDB[i].id));
                removeBtn.addEventListener("click", () => {note.remove(noteDB[i].id)})

            }
            catch{
                continue;
            }
        }
    },
    show(id){
        const noteDB = getDB("noteDB");
        const noteDiv = document.getElementById("rightDiv");
        noteDiv.innerHTML = "";
        const title = document.createElement("h1");
        const content = document.createElement("textarea");

        const index = noteDB.findIndex(n => n.id === id);
        if(index !== -1){
            const noteContent = noteDB[index].note;
            content.value = noteContent;
            title.id = "noteTitle";
            content.id = "noteInput";
            const noteTitle = noteDB[index].title;
            title.innerHTML = noteTitle;
        }

        noteDiv.appendChild(title);
        noteDiv.appendChild(content);

        content.focus();
        content.addEventListener("blur", () => {
            const index = noteDB.findIndex(n => n.id === id);
            if(index !== -1){
                noteDB[index].note = content.value;
            }
            localStorage.setItem("noteDB", JSON.stringify(noteDB));
            this.refreshStatus();
        })

        const h1 = document.getElementById("noteTitle");
        h1.addEventListener("click", () => {note.editTitle(id); note.refreshStatus(); note.show(id);});
    },
    words(){
        const noteDB = getDB("noteDB");
        let wordsNumber = 0;
        for(let i = 0; i < noteDB.length; i++){
            const input = noteDB[i].note;
            count = countWords(input);
            wordsNumber+= count;
        }
        localStorage.setItem("noteWords", wordsNumber);
    },
    remove(id){
        noteDB = getDB("noteDB");
        const index = noteDB.findIndex(n => n.id === id);
        if(index !== -1){
            noteDB.splice(index, 1);
        }
        storage("noteDB", true, noteDB);
        
        this.refreshStatus();
        this.words();
    },
    editTitle(id){
        const noteDB = getDB("noteDB");
        let input = prompt("Qual é o nome da nota?");
        if(!input){
            input = `Nova nota #${id}`;
        }
        const index = noteDB.findIndex(n => n.id === id);
        if(index !== -1){
            noteDB[index].title = input;
        }
        storage("noteDB", true, noteDB);
    }
}

const loadPage = {
    home(){
        selectedP = 0;
        build.home();
        tasksCreatedStr = document.getElementById("tasksCreated");
        tasksReamingStr = document.getElementById("tasksRemaing");
        tasksFinishedStr = document.getElementById("tasksFinished");

        noteCreatedStr = document.getElementById("notesCreated");
        noteWordsStr = document.getElementById("notesWords");

        cardsHitStr = document.getElementById("cardsHit");
        cardsCreated = document.getElementById("cardsCreated");

        progressBar = document.getElementById("progressBar");
        nameStats = document.getElementById("nameStats");
        levelStats = document.getElementById("levelStats");
        xpStats = document.getElementById("xpStats");
        streakStr = document.getElementById("streakStr");
        quoteStr = document.getElementById("quoteStr");
        authorStr = document.getElementById("authorStr");
        reloadBtn = document.getElementById("reloadBtn");

        taskDiv = document.getElementById("leftDiv");

        selectedPage(homePageStr);
        note.refreshStr();
        card.correctPer();
        tier.progress();
        tasks.refreshStatus();
        card.refreshStatus();
        tier.refreshStr();
        refreshStreak(streak);
        refreshUsernameStr(getUsername());
        aleatoryQuote();
        cardsDB = getDB("cardsDB");
        tasksDB = getDB("tasksDB");
        achievementsDB = achievements.get();
        achievements.build();
        pageTitle.innerHTML = "Início";
        reloadBtn.addEventListener("click", () => {aleatoryQuote();});
    },
    cards(){
        selectedP = 2;
        build.card();
        card.load();
        addBtn = document.getElementById("addBtn");
        selectedPage(cardPageStr);
        pageTitle.innerHTML = "Cartas";
        addBtn.addEventListener("click", () => {card.addCard(); card.load();});
    },
    notes(){
        selectedP = 3;
        noteDiv = document.getElementById("rightDiv");
        notesDiv = document.getElementById("leftDiv");
        build.note();
        note.refreshStatus();
        addBtn = document.getElementById("addBtn");
        selectedPage(notePageStr);
        pageTitle.innerHTML = "Notas";
        addBtn.addEventListener("click", () => {note.add(); this.notes();});
    },
    todo(){
        selectedP = 1;
        build.task();
        addBtn = document.getElementById("addBtn");
        taskDiv = document.getElementById("rightDiv");
        tasks.refreshStatus();
        selectedPage(todoPageStr);
        pageTitle.innerHTML = "Tarefas";
        addBtn.addEventListener("click", () => {tasks.add();});
    },
    calendar(){
        selectedP = 4;
        build.calendar();
        selectedPage(calendarPageStr);
        pageTitle.innerHTML = "Calendário";
        daysContainer = document.getElementById('days');
        monthYear = document.getElementById('monthYear');
        prevBtn = document.getElementById('prev');
        nextBtn = document.getElementById('next');
        notesPanel = document.getElementById("notesPanel");
        notesTitle = document.getElementById("notesTitle");
        notesList = document.getElementById("notesList");
        calendar.render(currentDate);
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            calendar.render(currentDate);
        });

        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            calendar.render(currentDate);
        });

        addBtn.addEventListener("click", () => {calendar.add(); this.calendar();});

    }
}

function generateId(){
    const idGenerator = parseInt(Date.now().toString(36), 36);
    return idGenerator;
}

function storage(item, make, value=null){
    if(make){
        localStorage.setItem(item, JSON.stringify(value))
    }
    else{
        const data = localStorage.getItem(item);
        if(data == null){
            throw new Error(`Não existe ${item}.`);
        }
        else{
            return JSON.parse(data);
        }
        
    }
}

function countWords(inputText) {
  const words = inputText.trim().split(/\s+/);

  const filteredWords = words.filter(word => word !== '');

  return filteredWords.length;
}

function loadOrCreate(key, defaultValue) {
    try {
        return storage(key, false);
    } catch {
        storage(key, true, defaultValue);
        return defaultValue;
    }
}

async function aleatoryQuote() {
    await fetch("./json/quotes.json")
    .then(response => response.json())
    .then(data => {
        const aleatoryId = Math.floor(Math.random() * data.length);
        const {quote, author} = data[aleatoryId];
        quoteStr.innerHTML = quote;
        authorStr.innerHTML = author;
        console.log(quote, author);
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));
}

function getUsername(){
    try{
        input = storage("username", false);
        return input;
    }
    catch(error){
        console.log("Erro: ", error.message);
        while(true){
            let input = prompt("Qual é o seu nome?");
            if(input){
                input = input.charAt(0).toUpperCase() + input.slice(1);
                storage("username", true, input);
                return input;
            }
        }
    }
}

function getDB(key) {
    return loadOrCreate(key, []);
}

function refreshUsernameStr(str){
    usernameStr.innerHTML = `Olá, ${str}!`;
    nameStats.innerHTML = str;
}

function addStreak(){
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    
    const lastVisit = localStorage.getItem("lastVisit")
    streak = localStorage.getItem("streak") || 0;

    if (lastVisit) {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (lastVisit === yesterdayStr) {
            streak++;
        } else if (lastVisit === todayStr) {
        } else {
            streak = 1;
        }
    } else {
        streak = 1;
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastVisit", todayStr);
    try{
        refreshStreak(streak);
    }
    catch{
        console.log("Fora da Home");
    }
    
}

function refreshStreak(str){
    streakStr.innerHTML = `${str} dias consecutivos!`;
    const daysList = document.querySelector(".daysList");
    daysList.innerHTML = "";
    for(let i = 1; i <= 91; i++){
        const div = document.createElement("div");
        div.id = "day";
        daysList.appendChild(div);
    }

    let daysCheck = document.querySelectorAll("#day");
    daysCheck = Array.from(daysCheck);

    if(streak >= 1){
        
        for(let i = 1; i <= streak; i++){
            if(i <= 91){
                daysCheck[i-1].classList.add("dayCheck");
            }
        }
    }
    
}

function selectedPage(page){
    pages.forEach(p => p.classList.remove("selected"));
    page.classList.add("selected");
}

loadPage.home();

tier.get();
timeStep = loadOrCreate("timeStep", 0);
pomodoro.refresh();
pomodoro.pause();

pomoBtn.addEventListener("click", () => {pomodoro.toggle();});
homePageStr.addEventListener("click", () => {loadPage.home();});
cardPageStr.addEventListener("click", () => {loadPage.cards();});
notePageStr.addEventListener("click", () => {loadPage.notes();});
todoPageStr.addEventListener("click", () => {loadPage.todo();});
calendarPageStr.addEventListener("click", () => {loadPage.calendar();});