# Phone Number Cleaner

This is an application that cleans up user entered phone-numbers so that they can be sent messages. The numbering format used is the [North American Numbering Plan (NANP)](https://en.wikipedia.org/wiki/North_American_Numbering_Plan).

The format is usually represented as (NXX)-NXX-XXXX where N is any digit from 2 through 9 and X is any digit from 0 through 9.

The application cleans up differently formatted telephone numbers by removing punctuation and the country code (1) if present.

# Installation and Setup
Clone the repository from GitHub:
```
https://github.com/WNjihia/phone-number-cleaner.git
```

Install the required packages:
```
npm Install
```

Install http-server:
```
npm install -g http-server
```

Then run:
```
http-server .
```

Open the browser and go to:
```
localhost:8080
```

### Testing
To run the unit tests, click on the `Run Unit Tests` link on the far right corner on your browser.
Kindly note that you'll need to start your server and load `localhost:8080` to be able to access the link.

To run the ui tests, run the following command on your terminal:
```
npm run test tests/test-ui.js
```
