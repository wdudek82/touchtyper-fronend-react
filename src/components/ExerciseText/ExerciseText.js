import React, { Component } from 'react';

class ExerciseText extends Component {
  state = {
    originalText: this.props.text.text,
  };

  render() {
    return (
      <div>
        {/*<div className="text-container">{this.state.cachedHtml}</div>*/}
        <h1>{this.props.text.title}</h1>
        <p>{this.state.originalText}</p>
      </div>
    );
  }
}

export default ExerciseText;
