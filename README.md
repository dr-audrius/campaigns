How to install and run:

    - clone 
    - npm install
    - npm start

Production version hosted at:
    http://bendras.lt.alka.serveriai.lt/


Requirements

    The application should be accessible from a public repository on Github - Done
    There is no restriction on the libraries/tools to use during the development - Done
    The look and feel of the application is left to the taste of the candidate - Done
    The application must be written as if it would be released in production - Done
    External API must be called (details below) - Done

Bonus points

    Unit test(s)
    Usage of React - Done
    Error handling and loading progress indication
    Ability to sort columns - Done (Fix needed: sorting with date column)

Application Requirements

The application should be a simple page with the following elements:

    A list of Campaigns which shows:
    The name of the campaign - Done
    The start date - Done
    The end date - Done
    A flag to state if the Campaign is active (a campaign is running when the current date is inside the start-end date range) - Done
    The Budget (in USD dollar) - Done
    User name (can be Unknown user, if the user's data is missing for specified userId) - Done
    If the endDate is before the start date, the campaign should not be shown.