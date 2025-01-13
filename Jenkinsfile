pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'  // this value is taken from Manage "Jenkins > tool"
        SONAR_PROJECT_KEY = 'nodejsapptwo'    // Project key was taken from SonarQube where we configured the project.
        // DOCKER_HUB_REPO = 'valerydolce/nodejsapptwo'
        //JOB_NAME_NOW = 'cicd-image01'
        ECR_REGISTRY = '454292818931.dkr.ecr.us-east-1.amazonaws.com/nodejsapptwo'  //This is the ECR's URI
        ECR_REPO = 'nodejsapptwo' // Should be the repository name on AWS ECR
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('GitHub') {
            steps {
                git branch: 'main', credentialsId: 'nodejsapptwo', url: 'https://github.com/Valerydolce/nodejsapptwo.git'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npm test'
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonar-nodejsapptwo', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        // // some block
                        sh """
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://192.168.56.6:9000 \
                        -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {                    
                    docker.build("${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}")
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy --severity HIGH,CRITICAL --no-progress --format table -o trivy-report.html image ${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                //command was copied from AWS ECR object created (View push commands)
                sh """
                aws ecr get-login-password --region us-east-1 | docker login --username yval --password-stdin 454292818931.dkr.ecr.us-east-1.amazonaws.com
                   """
            }
        }

        stage('Push Image to ECR') {
            steps {
                script {
                    //Since we created the DOCKER build step with the "JOB_NAME_NOW", and that we have a new registry info,
                    //we need to replace it with the image information below, then create their variables in the envrionment section
                    docker.image("${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}").push()
                }
            }
        }
    }
}

