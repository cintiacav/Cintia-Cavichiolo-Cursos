import React, { Component } from 'react';
import InputComponent from './components/Input/InputComponent.js';
import {
  invert,
  numeric,
  csv,
  slug,
  camelCase,
  vowel,
  consonant,
} from './helpers/textTransformerHelper.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: 'Estou aprendendo React',
    };
  }

  handleChangeFilter = (newText) => {
    this.setState({
      userInput: newText,
    });
  };
  render() {
    const { userInput } = this.state;
    let id = 0;
    return (
      <div className="container">
        <h2 style={style.centeredTitleBold}>react-text-transformer</h2>

        <InputComponent
          userInput={userInput}
          readOnly="false"
          allowCopy="false"
          id={id++}
          label="Digite um texto qualquer:"
          onChangeFilter={this.handleChangeFilter}
        />

        <h1 style={style.centeredTitle}>Transformações</h1>

        <InputComponent
          userInput={invert(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="Texto Invertido:"
        />

        <InputComponent
          userInput={numeric(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="Texto Numérico:"
        />

        <InputComponent
          userInput={csv(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="CSV:"
        />

        <InputComponent
          userInput={slug(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="Slug:"
        />

        <InputComponent
          userInput={vowel(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="Somente vogais:"
        />

        <InputComponent
          userInput={consonant(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="Somente consoantes:"
        />

        <InputComponent
          userInput={camelCase(userInput)}
          readOnly="true"
          allowCopy="true"
          id={id++}
          label="Variável:"
        />
      </div>
    );
  }
}
const style = {
  centeredTitleBold: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontFamily: 'Consolas, monospace',
    fontWeight: 'bold',
  },
  centeredTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontFamily: 'Consolas, monospace',
  },
};
