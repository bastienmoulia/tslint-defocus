[![Build Status](https://travis-ci.org/Sergiioo/tslint-defocus.svg?branch=master)](https://travis-ci.org/Sergiioo/tslint-defocus)
[![NPM Version](https://img.shields.io/npm/v/tslint-defocus.svg)](https://www.npmjs.com/package/tslint-defocus)
[![License](https://img.shields.io/npm/l/tslint-defocus.svg)](LICENSE)

# tslint-defocus

## About
This is a tslint rule that warns about focussed Jasmine tests - fdescribe and fit

## Usage
* Install with: `npm install tslint-defocus --save-dev`
* Add the rule to your `.tslint.json` file:
```
  "rulesDirectory": "./node_modules/tslint-defocus/dist",
  "rules": {
    "defocus": true,
    ...
```
(as per the [instructions for custom rules](http://palantir.github.io/tslint/usage/custom-rules/))
* Run tslint as you usually would (gulp plugin, directly from node, etc)
* If you forget to remove a call to `fdescribe` or `fit` then you will see something like from tslint:
```
(defocus) app.ts[4, 1]: Calls to 'fdescribe' are not allowed.
(defocus) app.ts[8, 5]: Calls to 'fit' are not allowed.
```

You can add the `deexclude` parameter to warn also for `xdescribe` and `xit`:
```
"rules": {
    "defocus": [true, "deexclude"],
    ...
```

## Dependencies

Version 2.0.x of this rule requires version 5.x of tslint.

## Developer instructions
* installed the required global npm packages: `npm install gulp --global --no-optional`.
* Clone [from github](https://github.com/Sergiioo/tslint-defocus)
* Run `npm run setup` to install and get started
* Build, lint and unit test by running the default gulp task with: `gulp`

## License
MIT
