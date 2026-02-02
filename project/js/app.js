let data = Storage.load();
let character;

if (data.character) {
    character = Object.assign(new Character(), data.character);
} else {
    const name = prompt("Введите имя героя:");
    character = new Character(name || "Герой");
}

const manager = new TaskManager();
manager.tasks = data.tasks || [];

const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const diffSelect = document.getElementById('task-difficulty');

const xpMap = {
    easy: 10,
    medium: 25,
    hard: 50,
    epic: 100
};

document.getElementById('add-task').onclick = () => {
    if (!titleInput.value) return alert("Введите название задачи");

    const xp = xpMap[diffSelect.value];
    const task = new Task(titleInput.value, descInput.value, diffSelect.value, xp);
    manager.add(task);

    titleInput.value = '';
    descInput.value = '';

    render();
};

document.getElementById('reset').onclick = () => {
    if (confirm("Сбросить весь прогресс?")) Storage.clear();
};

function render() {
    document.getElementById('char-name').textContent = character.name;
    document.getElementById('char-level').textContent = character.level;
    document.getElementById('xp-current').textContent = character.xp;
    document.getElementById('xp-needed').textContent = character.xpToNext();

    document.getElementById('xp-fill').style.width =
        (character.xp / character.xpToNext()) * 100 + "%";

    const list = document.getElementById('task-list');
    const done = document.getElementById('completed-list');
    list.innerHTML = done.innerHTML = '';

    manager.active.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            ${t.title} (+${t.xp} XP)
            <button>❌</button>
        `;
        li.querySelector('input').onclick = () => {
            t.completed = true;
            character.addExperience(t.xp);
            render();
        };
        li.querySelector('button').onclick = () => {
            manager.remove(t.id);
            render();
        };
        list.appendChild(li);
    });

    manager.completed.forEach(t => {
        const li = document.createElement('li');
        li.classList.add('completed');
        li.textContent = `${t.title} ✔ (${t.date})`;
        done.appendChild(li);
    });

    document.getElementById('stats-tasks').textContent = manager.completed.length;
    document.getElementById('stats-xp').textContent = character.totalXp;

    Storage.save(character, manager.tasks);
}

render();
