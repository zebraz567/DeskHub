function f1() 
{ const d = new Date();
       const h = d.getHours();
    let g = "Good Evening";
    if(h < 12)    
    {  
        g = "Good Morning";
    }
    else if(h < 18) {
        g= "Good Afternoon";
    }
    else if(h   < 5) 
    {
        g ="Good Night , You need some sleep!";
    }
    document.getElementById("greeting").textContent = g;
    document.getElementById("time").textContent = d.toLocaleTimeString();
    document.getElementById("date").textContent =
        d.toLocaleDateString(undefined, {
            weekday: "long ",
            year : " numeric",
            month :  " long",
            day: "   numeric"  });
}
f1();
setInterval(f1, 1000) ;

const a = document.getElementById("notesInput");
a.value = localStorage.getItem("stickyNote") || "";
a.addEventListener("input", () =>
    {
    localStorage.setItem("stickyNote", a.value);
});

const b = document.getElementById("focusInput");
b.value = localStorage.getItem("dailyFocus") || "";
b.addEventListener("input", () => {
    localStorage.setItem("dailyFocus", b.value);  } );

const c = document.getElementById("taskInput");
const btn1 = document.getElementById("addTask");
const lst = document.getElementById("taskList");

let arr = JSON.parse(localStorage.getItem("tasks")) || [];

function s1() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}
function r1()
{
    lst.innerHTML = "";
    arr.forEach((x, i) => {

        const li = document.createElement("li");

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = x.completed;
        cb.addEventListener("change", () => {
            arr[i].completed = cb.checked;
            s1();
            r1();  });

        const sp = document.createElement("span");
        sp.textContent = x.text;
        if(x.completed)
        {
            sp.style.textDecoration = "line-through";
            sp.style.opacity = "0.6";
        }

        const db = document.createElement("button");
        db.className = "deleteButton";
        db.textContent = "🗑️";

        db.addEventListener("click",  () => {
            arr.splice(i, 1);
            s1();
            r1();
        }  );
        li.appendChild(cb);
        li.appendChild(sp);
        li.appendChild(db);

        lst.appendChild(li);

    });
}

    btn1.addEventListener("click",    () =>   
        {
        const t = c.value.trim();
        if(t === "")  return;

        arr.push  ( {
            text: t,
            completed: false
        });

        c.value = "";
        s1();
        r1();

    });
    r1();
    c.addEventListener("keypress", (e) => {
        if(e.key ===  "Enter")
        {
            btn1.click();
        }
    });

    const tm = document.getElementById("timer");
    const p1 = document.getElementById("startTimer");
    const p2 = document.getElementById("pauseTimer");
    const p3 = document.getElementById("resetTimer");
    let n = 25*60;
    let iv = null;
    function u1()
    {
        const mm = Math.floor(n/60);
        const ss = n % 60;

        tm.textContent =
             `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    }
    p1.addEventListener("click", () => {

        if(iv) return;
        iv = setInterval(() => {
            if(n > 0 ) {
                n--;
                u1();
            } else {
                clearInterval(iv);
                iv = null;
                alert("🎉 Pomodoro Finished!")
            }
        }, 1000);
    });

    p2.addEventListener("click", () => {
        clearInterval(iv);
        iv = null;
    });

    p3.addEventListener("click", () => {
        clearInterval(iv);
        iv = null;
        n = 25*60;
        u1();
    });

    u1();

   const tb = document.getElementById("themeButton");

   const st = localStorage.getItem("theme");
   if(st === "light") {

       document.body.classList.add("light");
       tb.textContent = "☀️";

   }

   tb.addEventListener("click", () => {
       
         document.body.classList.toggle("light");
    if(document.body.classList.contains("light") )
    {
        localStorage.setItem("theme", "light");
        tb.textContent = "☀️";

   } else {
    localStorage.setItem("theme", "dark");
    tb.textContent = "🌙" ;
   }
   });
   const hl = document.getElementById("habitList");
   const arr2 = [
    "💧 Drink 2L of Water",
    "📚 Study 1 Hour",
    "💻 Code Today",
    `🏃 Exercise`,
    "😴 Sleep Before 11 P.M"
   ];
   let obj1 =
    JSON.parse(localStorage.getItem("habits")) || {};

   function r2() {
      hl.innerHTML = "";
     arr2.forEach((x) => {
        const row = document.createElement("div");
        row.className =  "habitItem";

        const cb2 = document.createElement("input");
        cb2.type = "checkbox";
        cb2.checked = obj1[x] || false;
        cb2.addEventListener("change", () => {
            obj1[x] = cb2.checked;

            localStorage.setItem(
                "habits",
                JSON.stringify(obj1)
            );  }  );

        const lb = document.createElement("span");
        lb.textContent = x;

        row.appendChild(cb2);
        row.appendChild(lb);
        hl.appendChild(row);
    });
   }

   r2();
