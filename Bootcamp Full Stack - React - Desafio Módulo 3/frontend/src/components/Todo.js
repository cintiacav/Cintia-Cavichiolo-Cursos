import React from 'react';

import * as api from '../api/apiService.js';

export default function Todo({ todoKey, value, onUpdate }) {
  const { dateFormatted, description, done } = value;
  const buttonClass = `waves-effect waves-light btn-small  ${
    done ? '#c8e6c9 green lighten-4 ' : '#ff9e80 deep-orange accent-1'
  }`;
  const handleTodoChange = () => {
    const valueChanged = value;
    valueChanged.done = !value.done;
    onUpdate(valueChanged);
  };
  return (
    <div className="container" id={todoKey} style={styles.div}>
      <a
        style={styles.button}
        className={buttonClass}
        onClick={handleTodoChange}
      >
        <span style={styles.date}>{dateFormatted}</span>
        <label style={styles.label}>{description}</label>
      </a>
    </div>
  );
}

const styles = {
  button: {
    width: '100%',
    textAlign: 'left',
  },
  date: {
    padding: '5px',
    fontWeight: 'bold',
    marginLeft: '5px',
    color: 'black',
    fontSize: '1.2rem',
  },
  label: {
    color: 'black',
  },
  div: {
    color: 'black',
    padding: '5px',
  },
};
