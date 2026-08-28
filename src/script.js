function refreshClock() {
    const rightNow = new Date();
    const hr = rightNow.getHours();
    let msg = "Good Evening";

    if (hr < 12) {
        msg = "Good Morning";
    } else if (hr < 18) {
        msg = "Good Afternoon";
    } else if (hr < 5) {
        msg = "Good Night , You need some sleep!";}

    document.getElementById("greeting").textContent = msg;
     document.getElementById("time").textContent = rightNow.toLocaleTimeString();
    document.getElementById("date").textContent =
        rightNow.toLocaleDateString(undefined, {
            weekday: "long ",
            year: " numeric",
            month: " long",
            day: "   numeric"
        });
}
refreshClock();
setInterval(refreshClock, 1000);

const stickyBox = document.getElementById("notesInput");
stickyBox.value = localStorage.getItem("stickyNote") || "";
stickyBox.addEventListener("input", () => {
    localStorage.setItem("stickyNote", stickyBox.value);
});

const focusBox = document.getElementById("focusInput");
focusBox.value = localStorage.getItem("dailyFocus") || "";
focusBox.addEventListener("input", () => {
    localStorage.setItem("dailyFocus", focusBox.value);
});

const newTaskBox = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const todoListEl = document.getElementById("taskList");

let myTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(myTasks));
}

function showTasks() {
    todoListEl.innerHTML = "";
    myTasks.forEach((t, i) => {
        const row = document.createElement("li");

        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = t.completed;
        box.addEventListener("change", () => {
            myTasks[i].completed = box.checked;
            storeTasks();
            showTasks();
        });

        const label = document.createElement("span");
        label.textContent = t.text;
        if (t.completed) {
            label.style.textDecoration = "line-through";
            label.style.opacity = "0.6";
        }

        const delBtn = document.createElement("button");
        delBtn.className = "deleteButton";
        delBtn.textContent = "🗑️";
        delBtn.addEventListener("click", () => {
            myTasks.splice(i, 1);
            storeTasks();
            showTasks();
        });

        row.appendChild(box);
        row.appendChild(label);
        row.appendChild(delBtn);
        todoListEl.appendChild(row);
    });
}

addTaskBtn.addEventListener("click", () => {
    const val = newTaskBox.value.trim();
    if (val === "") return;

    myTasks.push({
        text: val,
        completed: false
    });

    newTaskBox.value = "";
    storeTasks();
    showTasks();
});
showTasks();

newTaskBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

const timeLeftEl = document.getElementById("timer");
const playBtn = document.getElementById("startTimer");
const stopBtn = document.getElementById("pauseTimer");
const clearBtn = document.getElementById("resetTimer");
let secsLeft = 25 * 60;
let clockId = null;

function paintTimer() {
    const mins = Math.floor(secsLeft / 60);
    const secs = secsLeft % 60;
    timeLeftEl.textContent =
        `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

playBtn.addEventListener("click", () => {
    if (clockId) return;
    clockId = setInterval(() => {
        if (secsLeft > 0) {
            secsLeft--;
            paintTimer();
        } else {
            clearInterval(clockId);
            clockId = null;
            alert("🎉 Pomodoro Finished!");
        }
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(clockId);
    clockId = null;
});

clearBtn.addEventListener("click", () => {
    clearInterval(clockId);
    clockId = null;
    secsLeft = 25 * 60;
    paintTimer();
});
paintTimer();

const modeBtn = document.getElementById("themeButton");
const prevMode = localStorage.getItem("theme") ;
if (prevMode ===   "light") {
    document.body.classList.add("light");
    modeBtn.textContent = "☀️";
}

modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        modeBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        modeBtn.textContent = " 🌙";
    }
});

const habitBox = document.getElementById("habitList");
const dailyHabits = [
    "💧 Drink 2L of Water",
    "📚 Study 1 Hour",
    "💻 Code Today",
    "🏃 Exercise",
    "😴  Sleep Before 11 P.M"];
let doneHabits = JSON.parse(localStorage.getItem("habits" ))  || {};

function showHabits()   {
    habitBox.innerHTML = "" ;
    dailyHabits.forEach((h) => {  const line = document.createElement("div");
        line.className = "habitItem";

        const box = document.createElement("input");
           box.type = "checkbox" ;
        box.checked = doneHabits[h] || false;
        box.addEventListener("change", () => {
            doneHabits[h] = box.checked;
            localStorage.setItem("habits", JSON.stringify(doneHabits));
        });

        const txt = document.createElement("span");
        txt.textContent = h;

        line.appendChild(box);
        line.appendChild(txt);
        habitBox.appendChild(line);
    });
}
showHabits();
