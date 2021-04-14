import React from 'react';
export default function Button({
  isShow,
  buttonKey,
  type,
  buttonName,
  onActionClick,
}) {
  const handleButtonClick = () => {
    onActionClick(buttonKey, type, buttonName);
  };

  return (
    <div style={styles.flexRow}>
      <a
        id={buttonKey}
        style={isShow ? { display: 'block' } : { display: 'none' }}
        className="waves-effect waves-light btn-small"
        onClick={handleButtonClick}
      >
        {buttonName}
      </a>
    </div>
  );
}

const styles = {
  flexRow: {
    marginLeft: '5px',
  },
};
