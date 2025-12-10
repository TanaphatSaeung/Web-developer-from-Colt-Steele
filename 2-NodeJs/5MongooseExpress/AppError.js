class AppError extends Error {
  constructor(message, status) {
    super(message)          // ✅ pass the message to Error
    this.status = status
  }
}

module.exports = AppError
