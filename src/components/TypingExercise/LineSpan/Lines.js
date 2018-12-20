import React from 'react';
import LineSpan from '../TypingExercise';

const Lines = (props) => {
  const pattern = /[\w\W]{1,55}\W/g;
  const lines = props.text.match(pattern);
  let totalLength = 0;

  return lines.map((line) => {
    const startIndex = totalLength;
    totalLength += line.length;

    return (
      <LineSpan
        key={line}
        line={line}
        startIndex={startIndex}
        typedText={props.typedText}
        mistakeIndexes={props.mistakeIndexes}
        unfixedMistakes={props.unfixedMistakes}
      />
    );
  });
};

export default Lines;
