module.exports = {
  extends: ['react-app', 'airbnb'],
  plugins: ['babel'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'quotes': ['error', 'single'],
    'arrow-body-style': 0,
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [''],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/forbid-prop-types': [
      2,
      {
        forbid: ['any'],
        checkContextTypes: false,
        checkChildContextTypes: false,
      },
    ],
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': 0,
    'function-paren-newline': ['error', 'consistent'],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'all',
      },
    ],
    'no-unused-expressions': ['error', {allowTaggedTemplates: true}],
    'no-underscore-dangle': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-boolean-value': 'always',
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-tag-spacing': [
      'error',
      {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'allow-multiline',
        'beforeClosing': 'never'
      }
    ],
    'object-curly-newline': ['error', {consistent: true}],
    'operator-linebreak': 0,
    'jsx-a11y/label-has-for': 0,
    'implicit-arrow-linebreak': 0,
    'no-confusing-arrow': 0,
  },
};
