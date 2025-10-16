@Library('shared') _
pipeline {
    agent { label 'aman' }
    
    stages {
        stage('Code') {
            steps {
                echo 'Cloning code from GitHub...'
                git branch: 'main', url: 'https://github.com/Aman-Vishwakarma1/E-Commerce-API.git'
            }
        }

        stage('Build') {
            steps {
                DockerBuild("ecommerce-backend", "latest")
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Uploading Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'DockerHubCredential', usernameVariable: 'dockerHubUser', passwordVariable: 'dockerHubPass')]) {
                    uploadToDockerHub(env.dockerHubUser, env.dockerHubPass, "ecommerce-backend", "latest")
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh 'docker rm -f ecommerce-backend || true'
                sh 'docker run -d -p 4800:4800 --name ecommerce-backend ecommerce-backend:latest'
            }
        }
    }
}
