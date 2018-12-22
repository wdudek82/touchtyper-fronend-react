import {
  CLEAR_TIMESTAMPS,
  CREATE_EXERCISE,
  INITIALIZE_UNFIXED_MISTAKES,
  UPDATE_MISTAKE_INDEXES,
  UPDATE_TIMESTAMP,
  UPDATE_TYPED_TEXT,
  UPDATE_UNFIXED_MISTAKES,
} from '../actions/types';

const initialState = {
  exercises: [
    {
      id: 1,
      title: "Kerghan's Story",
      text:
        'And finally, I came to the place where souls go to die. Where the mirrored and worn spirits fall into an endless sea of grey, mirrored glass... and I lowered myself within... and lay among them... and I almost did not return. And do you know what I found there? There, among the silent and battered shells of the innumerable? Peace. Enlightenment. Truth.',
      isPrivate: true,
    },
    {
      id: 2,
      title: 'Present Continuous',
      text:
        'The present continuous (also called present progressive) is a verb tense which is used to show that an ongoing action is happening now, either at the moment of speech or now in a larger sense. The present continuous can also be used to show that an action is going to take place in the near future. Read on for detailed descriptions, examples, and present continuous exercises.',
      isPrivate: false,
    },
    {
      id: 3,
      title: 'The quick brown fox',
      text: 'The quick brown fox jumps over the lazy dog.',
      isPrivate: false,
    },
    {
      id: 4,
      title: 'Lorem ipsum',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, omnis!',
      isPrivate: false,
    },
    {
      id: 5,
      title: 'Pater Noster',
      text:
        'PATER NOSTER, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
      isPrivate: false,
    },
  ],
  typedText: '',
  mistakeIndexes: [],
  unfixedMistakes: [],
  timestamps: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
      };
    case UPDATE_TYPED_TEXT:
      return {
        ...state,
        typedText: action.payload,
      };
    case UPDATE_MISTAKE_INDEXES: {
      const updMistakeIndexes = state.mistakeIndexes;
      updMistakeIndexes[action.payload] = 1;

      return {
        ...state,
        mistakeIndexes: updMistakeIndexes,
      };
    }
    case INITIALIZE_UNFIXED_MISTAKES:
      return {
        ...state,
        unfixedMistakes: action.payload,
      };
    case UPDATE_UNFIXED_MISTAKES: {
      const updUnfixesMistakes = state.unfixedMistakes.map((e, index) =>
        index === action.payload.index ? action.payload.value : e,
      );

      return {
        ...state,
        unfixedMistakes: updUnfixesMistakes,
      };
    }
    case UPDATE_TIMESTAMP:
      return {
        ...state,
        timestamps: [
          ...state.timestamps,
          action.payload,
        ],
      };
    case CLEAR_TIMESTAMPS:
      return {
        ...state,
        timestamps: [],
      };
    default:
      return state;
  }
}
