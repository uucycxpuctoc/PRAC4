const Storage = {
    save(character, tasks) {
        localStorage.setItem("character", JSON.stringify(character));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },

    load() {
        return {
            character: JSON.parse(localStorage.getItem("character")),
            tasks: JSON.parse(localStorage.getItem("tasks")) || []
        };
    },

    clear() {
        localStorage.clear();
        location.reload();
    }
};
