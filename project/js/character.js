class Character {
    constructor(name) {
        this.name = name;
        this.level = 1;
        this.xp = 0;
        this.totalXp = 0;
    }

    xpToNext() {
        return 100 * this.level;
    }

    addExperience(amount) {
        this.xp += amount;
        this.totalXp += amount;

        if (this.xp >= this.xpToNext()) {
            this.xp -= this.xpToNext();
            this.level++;
            alert(`🎉 Уровень повышен! Теперь уровень ${this.level}`);
        }
    }
}
