pipeline {
    agent any

    tools {
        terraform 'terraform-1.11.4'
        nodejs 'NodeJS'
    }

    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP       = 'WebServiceRG'
        APP_SERVICE_NAME     = 'react-assignment-041425'
        TF_WORKING_DIR       = '.'
        AZ_CLI_PATH          = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Atishay-Jain01/PhoneBook.git'
            }
        }
         stage('Terraform Init, Plan & Apply') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    bat """
                    set PATH=C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin;%PATH%
                    echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
                    cd %TF_WORKING_DIR%
                    echo "Initializing Terraform..."
                    terraform init
                    terraform plan -out=tfplan
                    terraform apply -auto-approve tfplan
                    """
                }
            }
        }


        stage('Build') {
            steps {
                bat 'npm install'        // Install dependencies
                bat 'npm run build'      // Build the production-ready React app
            }    
        }


       stage('Deploy') {
           steps {
               withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                   bat "tar -a -c -f build.zip build"
                   bat "%AZ_CLI_PATH%\\az.cmd webapp deploy --resource-group %RESOURCE_GROUP% --name %APP_SERVICE_NAME% --src-path build.zip --type zip"
                }
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
