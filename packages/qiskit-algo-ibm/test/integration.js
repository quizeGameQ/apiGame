/**
 * @license
 *
 * Copyright (c) 2017, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const assert = require('assert');

const genBin = require('../lib/genBin');

describe('algo:ibm:genBin', () => {
  it('should return a jobId', async function t() {
    if (!global.qiskit || !global.qiskit.cloud) {
      this.skip();
    }
    const res = await genBin(global.qiskit.cloud);

    assert.equal(typeof res, 'string');
    assert(res.length >= 0);
  });
});
