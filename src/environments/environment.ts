// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: true,
  appUrlBase: "https://buenrollo.github.io/noGroupSpam/",
  firebaseUrls: {
    buenrollo: "https://bdbuenrollo.firebaseio.com/tests/"
  },
  firebase: {
    apiKey: "AIzaSyCm2YEZnthvwcZ0u6ULte0mNHVn6Dd9v1Q",
    authDomain: "bdbuenrollo.firebaseapp.com",
    databaseURL: "https://bdbuenrollo.firebaseio.com",
    projectId: "bdbuenrollo",
    storageBucket: "bdbuenrollo.appspot.com",
    messagingSenderId: "415920198869",
    appId: "1:415920198869:web:955b84b5eb8f29b3b7fe5c",
    measurementId: "G-TNGBF733BM"
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
