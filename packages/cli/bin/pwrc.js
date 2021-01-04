#!/usr/bin/env node

'use strict'

const pwrc = require('../index')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');

(
  () => yargs(hideBin(process.argv))
    .command(
      'build',
      'build the application for production',
      () => {},
      (argv) => {
        pwrc('build', argv)
      }
    )
    .command(
      'dev',
      'start the application in watch mode',
      () => {},
      (argv) => {
        pwrc('dev', argv)
      }
    ).argv
)()
