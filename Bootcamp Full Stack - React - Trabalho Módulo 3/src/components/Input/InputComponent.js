import React, { Component } from 'react';
import css from './input.module.css';

export default class InputComponent extends Component {
  handleCopyText = (event) => {
    /* Get the text field */
    var copyText = document.getElementById('input' + event.target.id);
    console.log(copyText);
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, copyText.length); /* For mobile devices */
    /* Copy the text inside the text field */
    document.execCommand('copy');
    /* Alert the copied text */
    alert('Copied the text: ' + copyText.value);
  };
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };
  render() {
    const { userInput, readOnly, allowCopy, label, id } = this.props;
    return (
      <div className={css.general}>
        <label>{label}</label>
        <div className={css.flexRow}>
          {readOnly === 'false' && (
            <input
              id={`input${id}`}
              type="text"
              value={userInput}
              onChange={this.handleInputChange}
            />
          )}
          {readOnly === 'true' && (
            <input
              id={`input${id}`}
              type="text"
              readOnly={1}
              value={userInput}
            />
          )}
          {allowCopy === 'true' && (
            <button
              id={`btn${id}`}
              className="btn-floating  btn-min  waves-effect waves-light grey "
              onClick={this.handleCopyText}
            >
              <i id={`${id}`} className="material-icons">
                content_copy
              </i>
            </button>
          )}
        </div>
      </div>
    );
  }
}
