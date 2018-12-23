import React from 'react';
import { connect } from 'react-redux';
import './CharacterSpan.css';

class CharacterSpan extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = false;
    const { typedText } = this.props.exercises;
    const { charIndex, classes } = this.props;
    const nextTypedText = nextProps.exercises.typedText;

    if (
      typedText[charIndex] !== nextTypedText[charIndex] ||
      classes !== nextProps.classes
    ) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  render() {
    const { classes, children } = this.props;

    return (
      <span className={`char ${classes}`}>
        {children !== ' ' ? children : <i>&nbsp;</i>}
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

export default connect(mapStateToProps)(CharacterSpan);
