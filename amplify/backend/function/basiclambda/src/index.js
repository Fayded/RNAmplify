exports.handler = (event, context, callback) => {
    console.log('event: ', event)
    const body = {
      message: "Hello world!"
    }
    const response = {
      statusCode: 200,
      body
    }
    callback(null, response)
}