function constraintOf(error) {
  return error?.original?.constraint || error?.parent?.constraint || null;
}

module.exports = { constraintOf };