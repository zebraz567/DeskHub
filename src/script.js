console.log("Script is running");
function updateClock() {

    const now = new Date();

    const hour = now.getHours();

    let greeting = "Good Evening";

    if(hour < 12) {
        greeting = "Good Morning";
    } else if(hour < 18) {
        greeting = "Good Afternoon";
    }

    document.getElementById("greeting").textContent = greeting;

    document.getElementById("time").textContent=
        now.toLocaleTimeString();

    document.getElementById("date").textContent=
        now.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });    

}

updateClock();
setInterval(updateClock, 1000);


const notesInput = document.getElementById("notesInput");

console.log(notesInput);

notesInput.value = localStorage.getItem("stickyNote") || "";

notesInput.addEventListener("input", () => {
    console.log("Saving:", notesInput.value);
    localStorage.setItem("stickyNote", notesInput.value);

});


const focusInput = document.getElementById("focusInput");

console.log("Focus element", focusInput);

focusInput.value = localStorage.getItem("dailyFocus") || "";

focusInput.addEventListener("input", () => {
    console.log("Focus typing");
    localStorage.setItem("dailyFocus", focusInput.value);

});


const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task,index) => {

        const li = document.createElement("li");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;

        checkBox.addEventListener("change", () => {
            tasks[index].completed = checkBox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.textContent = task.text;

        if(task.completed){
            text.style.textDecoration = "line-through";
            text.style.opacity = "0.6";
        }

        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.textContent = "🗑️";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkBox);
        li.appendChild(text);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });
}    

    addTask.addEventListener("click", () => {
        const text = taskInput.value.trim();

        if(text === "") return;

        tasks.push({
            text: text,
            completed: false
        });

        taskInput.value = "";

        saveTasks();

        renderTasks();

    });

    renderTasks();

    taskInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            addTask.click();
        }
    });


    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("startTimer");
    const pauseButton = document.getElementById("pauseTimer");
    const resetButton = document.getElementById("resetTimer");

    let timeLeft = 25*60;
    let timerInterval= null;

    function updateTimer() {

        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent = 
             `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    }

    startButton.addEventListener("click", () => {

        if(timerInterval) return;

        timerInterval = setInterval(() => {

            if(timeLeft > 0 ){
                timeLeft--;
                updateTimer();
            }else{
                clearInterval(timerInterval);
                timerInterval = null;
                alert("🎉 Pomodoro Finished!")
            }
        },1000);
    });

    pauseButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerInterval=null;
    });

    resetButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 25*60;
        updateTimer();
    });

    updateTimer();


   const themeButton = document.getElementById("themeButton");

   const savedTheme = localStorage.getItem("theme");

   if(savedTheme === "light"){

       document.body.classList.add("light");
       themeButton.textContent = "☀️";
                
   }

   themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if(document.body.classList.contains("light")){
        localStorage.setItem("theme", "light");
        themeButton.textContent = "☀️";

   }else{
    localStorage.setItem("theme","dark");
    themeButton.textContent = "🌙" ; 
   }
   });


   const habitList = document.getElementById("habitList");

   const habits = [
    "💧 Drink 2L of Water",
    "📚 Study 1 Hour",
    "💻 Code Today",
    "🏃 Exercise",
    "😴 Sleep Before 11 P.M"
   ];

   let completedHabits =
    JSON.parse(localStorage.getItem("habits")) || {};

   function renderHabits() {
    habitList.innerHTML = "";
    habits.forEach((habit) => {
        const row = document.createElement("div");
        row.className = "habitItem";

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = completedHabits[habit] || false;

        check.addEventListener("change", () => {
            completedHabits[habit] = check.checked;

            localStorage.setItem(
                "habits",
                JSON.stringify(completedHabits)
            );
        });

        const label = document.createElement("span");
        label.textContent = habit;

        row.appendChild(check);
        row.appendChild(label);

        habitList.appendChild(row);

    });
   }

   renderHabits();