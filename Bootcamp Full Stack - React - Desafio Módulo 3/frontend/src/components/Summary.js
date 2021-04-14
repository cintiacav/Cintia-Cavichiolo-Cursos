import React from 'react';

export default function Summary({ display, total, finished, unfinished }) {
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
  return (
    <div style={divStyle.display}>
      <label style={styles.label}>Total de Tarefas:</label>
      <span style={{ ...styles.span, color: 'blue' }}>{total}</span>
      <label style={styles.label}>Tarefas Cumpridas:</label>
      <span style={{ ...styles.span, color: 'green' }}>{finished}</span>
      <label style={styles.label}>Tarefas não Cumpridas:</label>
      <span style={{ ...styles.span, color: 'red' }}>{unfinished}</span>
    </div>
  );
}
const styles = {
  flexRow: {
    padding: '5px',
    margin: '10px',
  },
  span: {
    padding: '5px',
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginLeft: '10px',
  },
};
