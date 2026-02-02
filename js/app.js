document.addEventListener("DOMContentLoaded", () => {

    const data = Storage.load();
    let character;

    if (data.character) {
        character = Object.assign(
            new Character(data.character.name),
            data.character
        );
    } else {
        const name = prompt("Введите имя героя:");
        character = new Character(name || "Герой");
    }

    const manager = new TaskManager();
    manager.tasks = data.tasks;

    const xpMap = {
        easy: 10,
        medium: 25,
        hard: 50,
        epic: 100
    };

    document.getElementById("add-task").onclick = () => {
        const title = document.getElementById("task-title").value;
        const desc = document.getElementById("task-desc").value;
        const diff = document.getElementById("task-difficulty").value;

        if (!title) return alert("Введите название задачи");

        manager.add(new Task(title, desc, diff, xpMap[diff]));

        document.getElementById("task-title").value = "";
        document.getElementById("task-desc").value = "";

        render();
    };

    document.getElementById("reset").onclick = () => {
        if (confirm("Сбросить весь прогресс?")) Storage.clear();
    };

    function render() {
        document.getElementById("char-name").textContent = character.name;
        document.getElementById("char-level").textContent = character.level;
        document.getElementById("xp-current").textContent = character.xp;
        document.getElementById("xp-needed").textContent = character.xpToNext();

        document.getElementById("xp-fill").style.width =
            (character.xp / character.xpToNext()) * 100 + "%";

        const active = document.getElementById("task-list");
        const done = document.getElementById("completed-list");
        active.innerHTML = "";
        done.innerHTML = "";

        manager.active.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <label>
                    <input type="checkbox"> ${task.title} (+${task.xp} XP)
                </label>
                <button>❌</button>
            `;

            li.querySelector("input").onchange = () => {
                manager.complete(task);
                character.addExperience(task.xp);
                render();
            };

            li.querySelector("button").onclick = () => {
                manager.remove(task.id);
                render();
            };

            active.appendChild(li);
        });

        manager.completed.forEach(task => {
            const li = document.createElement("li");
            li.className = "completed";
            li.textContent = `${task.title} ✔ ${task.completedAt}`;
            done.appendChild(li);
        });

        document.getElementById("stats-tasks").textContent =
            manager.completed.length;
        document.getElementById("stats-xp").textContent =
            character.totalXp;

        Storage.save(character, manager.tasks);
    }

    render();
});
