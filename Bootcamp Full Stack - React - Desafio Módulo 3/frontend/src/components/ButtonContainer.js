import React from 'react';
import * as api from '../api/apiService.js';
import Button from './Button.js';
const YEAR = 'Y';
const MONTH = 'M';

export default function ButtonContainer({
  onSelectYear,
  onSelectMonth,
  selectedYear,
}) {
  const years = api.getYears();
  const isShow = selectedYear !== 0 ? true : false;
  const handleActionClick = (key, type, name) => {
    //const grade = grades.find((grade) => grade.id === id);
    if (type === YEAR) {
      onSelectYear(name);
    }

    if (type === MONTH) {
      onSelectMonth(name);
    }
  };

  return (
    <div className="container center">
      <div style={styles.flexRow}>
        {years.map((year, index) => {
          return (
            <Button
              onActionClick={handleActionClick}
              key={year + index}
              type={YEAR}
              buttonName={year}
              isShow={true}
            />
          );
        })}
      </div>
      <div style={styles.flexRow}>
        {api.getMonths().map((month, index) => {
          return (
            <Button
              onActionClick={handleActionClick}
              key={index}
              type={MONTH}
              buttonName={month}
              isShow={isShow}
            />
          );
        })}
      </div>
    </div>
  );
}
const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
};
