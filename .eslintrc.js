module.exports = {
  'parser': "babel-eslint",
  'env': {
    'node': true,
    'browser': true,
  },
  "extends": ["airbnb", "eslint:recommended"],
  "globals": {
    "atom": true
  },
  "rules": {
    "no-unused-vars": 0,
    "indent": [
            "error",
            2,
      {
        "SwitchCase": 1
      }
        ],
    "linebreak-style": [
            "error",
            "unix"
        ],
    "quotes": [
            "error",
            "single"
        ],
    "semi": [
            "error",
            "always"
        ]
  }
};
