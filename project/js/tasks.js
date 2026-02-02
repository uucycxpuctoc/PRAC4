class Task {
    constructor(title, desc, difficulty, xp) {
        this.id = Date.now();
        this.title = title;
        this.desc = desc;
        this.difficulty = difficulty;
        this.xp = xp;
        this.completed = false;
        this.createdAt = new Date().toLocaleString();
        this.completedAt = null;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        this.tasks.push(task);
    }

    remove(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    complete(task) {
        task.completed = true;
        task.completedAt = new Date().toLocaleString();
    }

    get active() {
        return this.tasks.filter(t => !t.completed);
    }

    get completed() {
        return this.tasks.filter(t => t.completed);
    }
}
