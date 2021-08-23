const BASE_URL: string = "http://localhost:8001/";
export const environment = {
  production: true,
  API: {
    AUTH: `${BASE_URL}oauth/token`,
    USERS: `${BASE_URL}user`,
    AIRCRAFT: `${BASE_URL}aircraft`,
    RENT: `${BASE_URL}rental`,
  },
  KEYS: {
    AUTHINFO_KEY: 'auth_27f59024a905f48688220274cd0fb635',
    JWT_KEY: 'jwt_d266cef3180eba3130754bb0bc161cca',
  },
  CREDENTIAL: {
    CLIENT_ID: "RENT_APP",
    ANGULAR_APP: "12345"
  }
};