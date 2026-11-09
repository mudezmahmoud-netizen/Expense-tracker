class Storage {
  static saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  static loadExpenses() {
    try {
      const data = localStorage.getItem("expenses");

      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Unable to load expenses:", error);
      return [];
    }
  }
}
module.exports = Storage;
