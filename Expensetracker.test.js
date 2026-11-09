const ExpenseTracker = require("./ExpenseTracker");
const Expense = require("./Expense");
const Storage = require("./Storage");

describe("ExpenseTracker tests", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test("adds an expense", () => {
        const tracker = new ExpenseTracker();
        const expense = new Expense(1, "Lunch", 500, "Food");

        tracker.addExpense(expense);

        expect(tracker.getExpenses()).toHaveLength(1);
    });

    test("adds multiple expenses", () => {
        const tracker = new ExpenseTracker();

        tracker.addMultipleExpenses(
            new Expense(1, "Lunch", 500, "Food"),
            new Expense(2, "Bus", 100, "Transport")
        );

        expect(tracker.getExpenses()).toHaveLength(2);
    });

    test("removes an expense", () => {
        const tracker = new ExpenseTracker();
        const expense = new Expense(1, "Lunch", 500, "Food");

        tracker.addExpense(expense);
        tracker.removeExpense(1);

        expect(tracker.getExpenses()).toHaveLength(0);
    });

    test("filters expenses by category", () => {
        const tracker = new ExpenseTracker();

        tracker.addMultipleExpenses(
            new Expense(1, "Lunch", 500, "Food"),
            new Expense(2, "Bus", 100, "Transport")
        );

        expect(tracker.filterByCategory("Food")).toHaveLength(1);
    });

    test("calculates total expenses", () => {
        const tracker = new ExpenseTracker();

        tracker.addMultipleExpenses(
            new Expense(1, "Lunch", 500, "Food"),
            new Expense(2, "Bus", 100, "Transport")
        );

        expect(tracker.getTotalExpenses()).toBe(600);
    });

    test("calculates today's expenses", () => {
        const tracker = new ExpenseTracker();

        tracker.addExpense(
            new Expense(1, "Lunch", 500, "Food")
        );

        expect(tracker.getTodayTotal()).toBe(500);
    });

    test("saves expenses to localStorage", () => {
        const tracker = new ExpenseTracker();

        tracker.addExpense(
            new Expense(1, "Lunch", 500, "Food")
        );

        expect(Storage.loadExpenses()).toHaveLength(1);
    });

});



    
   
