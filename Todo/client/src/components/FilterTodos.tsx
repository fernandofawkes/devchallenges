import React, { useState, useEffect } from 'react';
enum TodoFilter {
  Active,
  Completed,
  All
}
type Props = {
  todos: ITodo[],
  filterTodos: (state: TodoFilter) => void
}

const FilterTodos: React.FC<Props> = ({todos, filterTodos}) => {
  const [selectedState, setSelectedState] = useState(TodoFilter.All);

  const handleSelectChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedState(+e.currentTarget.value);
  }

  useEffect(() => {
    filterTodos(selectedState);
  }, [selectedState, filterTodos]);

  return (
    <nav>
      <label htmlFor="filter-all">
        <input type="radio" name="filter" id="filter-all" defaultChecked value={TodoFilter.All} onChange={handleSelectChange} />
        All
      </label>
      <label htmlFor="filter-active">
        <input type="radio" name="filter" id="filter-active" value={TodoFilter.Active} onChange={handleSelectChange} />
        Active
      </label>
      <label htmlFor="filter-completed">
        <input type="radio" name="filter" id="filter-completed" value={TodoFilter.Completed} onChange={handleSelectChange} />
        Completed
      </label>
    </nav>
  );
}

export {TodoFilter};

export default FilterTodos;