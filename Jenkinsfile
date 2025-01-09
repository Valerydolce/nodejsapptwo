pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'  // this value is taken from Manage "Jenkins > tool"
        SONAR_PROJECT_KEY = 'nodejsapptwo'    // Project key was taken from SonarQube where we configured the project.
        DOCKER_HUB_REPO = 'valerydolce/nodejsapptwo'
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
                    docker.build("${DOCKER_HUB_REPO}:latest")
                }
            }
        }
    }
}