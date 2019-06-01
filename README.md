# Loopback Default Filter

[![Build Status](https://travis-ci.com/Danwakeem/loopback-default-filter.svg?branch=master)](https://travis-ci.com/Danwakeem/loopback-default-filter)
[![Coverage Status](https://coveralls.io/repos/github/Danwakeem/loopback-default-filter/badge.svg?branch=master)](https://coveralls.io/github/Danwakeem/loopback-default-filter?branch=master)

This loopback middleware adds a default filter to requests that accept a query

## Useage

## Install
`npm i loopback-default-filter --save`

## Integrate with Loopback
Include the mixin in your `model-config.json` file

```json
{
  "mixins": [
    "../node_modules/loopback-default-filter"
  ]
}
```

Then add the mix in to your `model.json` file
```json
"mixins": {
  "DefaultFilter": {
    "limit": 10,
    "offset": 0
  }
},
```

## Options
> I know there is supposed to be a way to do this through the loopback scope but it had some strange behavior so I just made a mixin to fix this

You can put whatever where filter you want in the mixin opitons
```json
"mixins": {
  "DefaultFilter": {
    "where": {
      "field": 10,
    },
    "offset": 100,
    "limit": 20,
  }
},
```
