// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL: string = "http://localhost:8001/";
export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
