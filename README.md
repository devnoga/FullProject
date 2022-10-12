# StoreFront Project

## Frontend project link on aws

http://projectbucket11.s3-website-us-east-1.amazonaws.com/

## Description

    This is a full project. It contains 2 sub projects
    1. StoreFront-BackEnd: This is the backend API of the application. It is a RestFul application communicating with a postgres database to save and fetch data about the different products available in the store.

    2. StoreFront-FrontEnd: This is the frontend app of the application. It is an Angular app, it displays the different products in the store, allow users to add them to the cart and checkout the cart

### Infrastructure of the FrontEnd APP and dependencies

        Angular App

### Infrastructure of the Backend API and dependencies

        a Restful API
        Postgres db

## Project Setup

    1. Clone the app from the github repo
    2. Backend API Setup:
        - Create an AWS RDS database instance for a postgres database with a default database named "postgres", keep the username and password of the master user.
        - Using pgAdmin connect to the created RDS database, then create the different tables needed for our application. SQL statements for those tables are in the /migrations folder of the backend API
        - Change the .env file entries to connect to the newly created RDS database
        - Install Dependencies
            ```npm install```
        - Run the application locally.
        - Deployment on AWS EB: using the eb cli
            - First, using the AWS web console, Create IAM user, keep the access keys.
            - Configure the AWS CLI with the IAM access keys:
                ```aws configure```
            - Now initializa the EB environment
                 ```eb init````
            - Create the environment
                 ```eb create --sample --single --instance-types t2.small```
            - Deploy your API to the created environment
                ```eb use [env-name]```
                ```eb deploy```
        - From the AWS web console, EB -> Environments
            - Check the health of your app
            - Use the url of the environment to run the API

    3. FrontEnd APP Setup:
        - Use the url of the deployed backend API to connect frontend App to the Backend API in the following files
            - Mainly the products service module: src/app/services/products.service.ts
            ```const serverURL =
    		'[deployed backend API URL on AWS Elastic Beanstack]';```
        - Install Dependencies
            ```npm install```
        - Run the application locally.
        -Deploy the FronEnd App to an S3 Bucket
            - Create a public S3 bucket that supports static website hosting.
            - Go to /bin/deploy.sh file and update the bucket name with the newly created bucket
            ```aws s3 cp --recursive --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./build s3://[bucket-name]/```

## CI/CD Pipline Process

    a config.yml file inside .circleci folder configure the CI/CD process of the project
    - Start by connecting your github repo to your circleci account
    - The pipline process is triggered each time you push new code changes to your repo, the process consists of the following jobs
        1. Install dependecies of the Frontend App
        2. Install dependecies of the Backend API
        3. Run the Build script of the Frontend App
        4. Run the Build script of the Backend API
        5. Run the test script of the Backend API
        6. Run the deploy script of the Backend API
        7. Run the deploy script of the Frontend App
