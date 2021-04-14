import React, { useState, useEffect } from 'react';
import ButtonContainer from './components/ButtonContainer.js';
import Summary from './components/Summary.js';
import Todos from './components/Todos.js';
import * as api from './api/apiService.js';
export default function App() {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);

  useEffect(() => {
    if (selectedYear !== 0 && selectedMonth !== '') {
      const month = api.findMonth(selectedMonth);

      const getTodos = async () => {
        let todos = await api.getTodosFilterByYearAndMonth(
          selectedYear,
          month.id
        );

        todos = todos.data.map((todo) => {
          return {
            ...todo,
            dateFormatted: api.convertData(todo.date),
          };
        });
        todos = todos.sort((a, b) => a.done === b.done);
        todos = todos.sort((a, b) =>
          a.description.localeCompare(b.description)
        );
        todos = todos.sort((a, b) => a.date.localeCompare(b.date));
        setSelectedTodos(todos);
      };

      getTodos();
    }
  }, [selectedMonth, selectedYear]); // Monitora alterações em selectedMonth e selectedYears

  const handleYear = (year) => {
    setSelectedYear(year);
  };

  const handleMonth = async (month) => {
    setSelectedMonth(month);
  };

  const handlePersistData = async (newTodo) => {
    const newTodos = Object.assign([], selectedTodos);
    const todoToPersist = newTodos.find((todo) => {
      return todo.id === newTodo.id;
    });
    todoToPersist.done = newTodo.done;

    const update = await api.updateTodo(todoToPersist);
    if (update === 'OK') {
      const todosOriginais = selectedTodos.filter(
        (todo) => todo.id !== newTodo.id
      );
      todosOriginais.push(todoToPersist);
      setSelectedTodos(todosOriginais);
    }
    setSelectedTodos(selectedTodos);
  };
  const total = selectedTodos.length;
  const finished = selectedTodos.filter((todo) => todo.done === true).length;
  const unfinished = selectedTodos.filter((todo) => todo.done === false).length;
  return (
    <div className="container center">
      <h4>React Todos</h4>
      <ButtonContainer
        onSelectYear={handleYear}
        onSelectMonth={handleMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <Summary
        display={selectedYear !== 0 && selectedMonth !== ''}
        total={total}
        finished={finished}
        unfinished={unfinished}
      />
      {selectedTodos.length > 0 && (
        <Todos
          onUpdate={handlePersistData}
          selectedTodos={selectedTodos}
          display={selectedYear !== 0 && selectedMonth !== ''}
        />
      )}
    </div>
  );
}
