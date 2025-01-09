pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
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

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonar-nodejsapptwo', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        // // some block
                        // sh """
						// ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
						// -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
						// -Dsonar.sources=. \
						// -Dsonar.host.url=http://sonarqube-dind:9000 \
						// -Dsonar.login=${SONAR_TOKEN}
						// """
                    }
                }
            }
        }
    }
}