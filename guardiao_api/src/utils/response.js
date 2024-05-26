module.exports = {
    success: (data, message = 'Request successful') => {
      return {
        success: true,
        message,
        data
      };
    },
    error: (message, data = null) => {
      return {
        success: false,
        message,
        data
      };
    }
  };