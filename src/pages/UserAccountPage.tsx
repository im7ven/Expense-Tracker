import { useState } from "react";
import { ExpenseFilter } from "../components/ExpenseFilter";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";

export const UserAccountPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <ExpenseFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleSelectedCategory}
      />
      <ExpenseForm />
      <ExpenseList selectedCategory={selectedCategory} />
    </div>
  );
};
