## CI/CD Pipline Process

    a config.yml file inside .circleci folder configure the CI/CD process of the project
    - Start by connecting your github repo to your circleci account
    - The pipline process is triggered each time you push new code changes to your repo, the process consists of the following jobs
        1. Install dependecies of the Frontend App
        2. Install dependecies of the Backend API
        3. Run the Build script of the Frontend App
        4. Run the Build script of the Backend API
        5. Run the deploy script of the Backend API
        6. Run the deploy script of the Frontend App
