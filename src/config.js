const dev = {
  REACT_APP_BASE_ENDPOINT_URL: process.env.REACT_APP_BASE_ENDPOINT_URL,
}

const prod = {
  REACT_APP_BASE_ENDPOINT_URL: process.env.REACT_APP_BASE_ENDPOINT_URL,
}

export const config = process.env.REACT_APP_BUILD_ENV === 'production' ? prod : dev;
