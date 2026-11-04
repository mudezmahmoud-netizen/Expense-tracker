
class ExpenseTracker {
    constructor() {
        this.expenses = [];
    }

    
    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
    }

    
    addMultipleExpenses(...expenses) {
        this.expenses = [...this.expenses, ...expenses];
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
    }

    
    filterByCategory(category) {
        return this.expenses.filter(
            expense => expense.category === category
        );
    }

    
    getTotalExpenses() {
        return this.expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );
    }

    
    getExpenses() {
        return [...this.expenses];
    }
}

module.exports = ExpenseTracker;