# Qiskit for developers

:atom_symbol: Quantum Information Science Kit algorithms for developers. The idea is to hide all quantum mechanics complexity exposing only the upper layer.

Please visit the [main repository](https://github.com/Qiskit/qiskit-js) of the project to know about the rest of the tools.

## Install

:coffee: Install lastest [Node.js](https://nodejs.org/download) stable version (or LTS) and then:

```sh
npm i @qiskit/algo
```

## Use

:pencil: As you can see in the next section, we have to use it like in the rest of independent modules. The only difference is we need to pass the engine as any other option.

```js
const qiskit = require('@qiskit/algo');

// With the default engine and length.
qiskit.random().then(rand => console.log(`Random number(default): ${rand}`));

qiskit
  .random({
    engine: 'anu',
    length: 8,
  })
  .then(rand => console.log(`Random number: ${rand}`));
```

## API

:eyes: Full specification. Here are reflected the common options among the different engines, but some of them can receive (even need) extra ones, ie: an API key. Please check the [packages].

### `version`

The actual version of the library.

- `version` (string) - Version number.

### `async random(opts) -> rand | jobId`

Generate a true random number among 0 and 1.

- `opts` (object) - Optional parameters:
  - `engine` (string) - Where to run the operation. Please visit the [packages] to see the supported ones. The number of digits depends on the selected engine. (default: "js")
  - `length` (number) - Number of random hex characters to ask for to the engine. As you can see in the doc referenced before each engine has different limit, they will throw in it's overpassed. (default: 16)
  - `format` (string) - To ask for the result in a different format, supported ("hex").
  - `custom` (string/object) - Custom stuff (API key, inited connector instance, etc) needed for some backends (visit each specific doc).
- `rand` (number) - Generated random number in the desired format if the operation doesn't involves a background job.
- `jobId` (string) - Identifier for the generated background job (see next method).

### `async result(jobId, opts) -> result`

Get the result of a background job generated by an algorithm method. The engine is ommited because IBM Q is the unique which uses background jobs for now.

- `jobId` (string) - Job identifier got as initial response.
- `opts`(object) - Optional parameters:
  - `custom`
- `result` (?) - Depending on the used agorithm:
  - "random": (object) - With nex fields:
    - `status` (string) - To know if the job has finished correctly. Supported: "running", "completed", TODO.
    - `data` (number) - Generated random number. Only present if "status" is "completed".

### `async factor(number) -> prime`

Integer factorization in prime numbers using [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm). **Only supported in the local simulator for now**, so the engine is also ommited here for now. The result can be invalid, retry in this clase.

- `number` (number/string) - Number to factorize, an integer for now.
- `prime` (number) - Prime factor of the passed one.

[packages]: ./..