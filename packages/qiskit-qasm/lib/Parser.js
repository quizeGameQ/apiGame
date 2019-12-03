/**
 * @license
 *
 * Copyright (c) 2017, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const jison = require('jison');

// const util = require('util');
const path = require('path');
const fs = require('fs');
const utils = require('./utils');

const dbg = utils.dbg(__filename);

const QasmError = require('./QasmError');

// TODO: Do async?
const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), 'utf8');

class Parser {
  constructor(opts = {}) {
    dbg('Starting', opts);
    this.parser = new jison.Parser(bnf);

    if (opts.core !== false) {
      // TODO: Parse all core libraries (when we have more)
      const qelib1 = fs.readFileSync(
        path.resolve(__dirname, '../core/qelib1.inc'),
        'utf8',
      );
      this.qelibParsed = this.parser.parse(qelib1);
    }
  }

  parse(circuit) {
    if (!circuit) {
      throw new TypeError('Required param: circuit');
    }

    let res;

    try {
      res = this.parser.parse(circuit, this.qelibParsed);
    } catch (err) {
      if (err instanceof QasmError) {
        throw err;
      }
      throw new QasmError(err.message)
    }

    return res;
  }
}

module.exports = Parser;
