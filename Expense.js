class Expense {
    constructor(id, description, amount, category) {
        this.id = id;
        this.description = description;
        this.amount = Number(amount);
        this.category = category;
        this.date = new Date().toLocaleDateString("en-CA");
    }
}

module.exports = Expense;
