import Expense from "./Expense.js";
import ExpenseTracker from "./ExpenseTracker.js";
import { Storage } from "./Storage.js";

const tracker = new ExpenseTracker();

const form = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const filterCategory = document.getElementById("filter-category");
const expensesList = document.getElementById("expenses-list");
const totalElement = document.getElementById("Total");

const savedExpenses = Storage.loadExpenses();

tracker.addMultipleExpenses(
  ...savedExpenses.map(
    (expense) =>
      new Expense(
        expense.id,
        expense.description,
        expense.amount,
        expense.category,
      ),
  ),
);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const expense = new Expense(
    crypto.randomUUID(),
    description.value.trim(),
    amount.value,
    category.value,
  );

  tracker.addExpense(expense);

  Storage.saveExpenses(tracker.getExpenses());

  form.reset();

  renderExpenses();
});

function renderExpenses() {
  expensesList.innerHTML = "";

  const selectedCategory = filterCategory.value;

  const expenses =
    selectedCategory === "All"
      ? tracker.getExpenses()
      : tracker.filterByCategory(selectedCategory);

  expenses.forEach((expense) => {
    const item = document.createElement("div");
    item.className = "expense-item";

    const details = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = expense.description;

    const categoryText = document.createElement("p");
    categoryText.textContent = expense.category;

    const price = document.createElement("p");
    price.textContent = `KES ${expense.amount.toFixed(2)}`;

    details.append(title, categoryText, price);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", () => {
      tracker.removeExpense(expense.id);

      Storage.saveExpenses(tracker.getExpenses());

      renderExpenses();
    });

    item.append(details, deleteButton);
    expensesList.appendChild(item);
  });

  totalElement.textContent = `KES ${tracker.getTotalExpenses().toFixed(2)}`;
}

filterCategory.addEventListener("change", renderExpenses);

renderExpenses();

