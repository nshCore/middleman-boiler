/**
 * @type {{root: boolean, parser: string, parserOptions: {sourceType: string}, env: {browser: boolean}, extends: string[], plugins: Array, globals: {DEV: boolean, PROD: boolean}, rules: {"arrow-parens": number, "one-var": number, "import/first": number, "import/named": number, "import/namespace": number, "import/default": number, "import/export": number, "no-debugger": number, "brace-style": *[]}}}
 */
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard'
  ],
  plugins: [],
  globals: {
    'DEV': true,
    'PROD': true,
    'waypoint': true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'one-var': 0,
    'import/first': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }]
  }
}
