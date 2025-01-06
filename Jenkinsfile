pipeline {
    agent any

    stages {
        stage('GitHub') {
            steps {
                git branch: 'main', credentialsId: 'nodejsapptwo', url: 'https://github.com/Valerydolce/nodejsapptwo.git'
            }
        }
    }
}
