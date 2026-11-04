class Expense {
    constructor(id, description,amount,category) {
        this.id = id;
        this.description = description;
        this.amount = Number(amount);
        this.category = category;
    }
}

module.exports = Expense;


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


export class Storage {
    static saveExpenses(expenses) {
        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );
    }

    static loadExpenses() {
        const data = localStorage.getItem("expenses");

        return data ? JSON.parse(data) : [];
    }
}

globalThis.localStorage = {
    data: {},

    setItem(key, value) {
        this.data[key] = String(value);
    },

    getItem(key) {
        return this.data[key] ?? null;
    },

    removeItem(key) {
        delete this.data[key];
    },

    clear() {
        this.data = {};
    }
};

describe("ExpenseTracker Tests", () => {
    let tracker;

    beforeEach(() => {
        localStorage.clear();

        tracker = new ExpenseTracker();

        tracker.addExpense(
            new Expense(1, "Lunch", 250, "Food")
        );

        tracker.addExpense(
            new Expense(2, "Bus Fare", 100, "Transport")
        );

        tracker.addExpense(
            new Expense(3, "Dinner", 300, "Food")
        );
    });

    
    test("adds an expense", () => {
        tracker.addExpense(
            new Expense(4, "Shopping", 500, "Shopping")
        );

        expect(tracker.getExpenses()).toHaveLength(4);
    });

    
    test("removes an expense", () => {
        tracker.removeExpense(2);

        expect(tracker.getExpenses()).toHaveLength(2);

        expect(
            tracker.getExpenses().some(expense => expense.id === 2)
        ).toBe(false);
    });

    
    test("calculates total expenses", () => {
        expect(tracker.getTotalExpenses()).toBe(650);
    });

    
    test("filters expenses by category", () => {
        const foodExpenses = tracker.filterByCategory("Food");

        expect(foodExpenses).toHaveLength(2);

        expect(
            foodExpenses.every(expense => expense.category === "Food")
        ).toBe(true);
    });
});
