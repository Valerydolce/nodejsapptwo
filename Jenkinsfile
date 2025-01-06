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
                sh 'npm install'  # Install NodeJS dependencies 
            }
        }
    }
}
