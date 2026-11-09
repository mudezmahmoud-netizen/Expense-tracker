const Storage = require("./Storage");

class ExpenseTracker {
    constructor() {
        this.expenses = Storage.loadExpenses();
    }

    addExpense(expense) {
        this.expenses.push(expense);
        Storage.saveExpenses(this.expenses);
    }

    addMultipleExpenses(...expenses) {
        this.expenses.push(...expenses);
        Storage.saveExpenses(this.expenses);
    }

    getExpenseDetails() {
        return this.expenses.map(
            ({ description, amount, category }) => ({
                description,
                amount,
                category
            })
        );
    }

    removeExpense(id) {
        this.expenses = this.expenses.filter(
            expense => expense.id !== id
        );

        Storage.saveExpenses(this.expenses);
    }

    filterByCategory(category) {
        return this.expenses.filter(
            expense => expense.category === category
        );
    }

    getTotalExpenses() {
        return this.expenses.reduce(
            (total, expense) => total + Number(expense.amount), 0
        );
    }

    getTodayTotal() {
        const today = new Date().toLocaleDateString("en-CA");

        return this.expenses
            .filter(expense => expense.date === today)
            .reduce(
                (total, expense) => total + Number(expense.amount), 0
            );
    }

    getExpenses() {
        return [...this.expenses];
    }
}

module.exports = ExpenseTracker;
