import React from 'react';
import Todo from './Todo';

export default function Todos({ display, selectedTodos, onUpdate }) {
  const divStyle = display
    ? {
        display: {
          padding: '5px',
          margin: '10px',
          display: 'block',
        },
      }
    : {
        display: {
          display: 'none',
        },
      };
  const handleUpdate = (value) => {
    onUpdate(value);
  };
  return (
    <div style={divStyle.display}>
      {selectedTodos !== undefined &&
        selectedTodos.map((todo) => {
          return <Todo key={todo.id} value={todo} onUpdate={handleUpdate} />;
        })}
    </div>
  );
}
