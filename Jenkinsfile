pipeline{
    agent any

    options {
        buildDiscarder(logRotator(artifactDaysToKeepStr: '1', artifactNumToKeepStr: '1', daysToKeepStr: '5', numToKeepStr: '50'))
        // Disable concurrent builds. It will wait until the pipeline finish before start a new one
        disableConcurrentBuilds()
    }

    tools {
        nodejs "NodeJS 10.14.0"
        
        oc "OpenShiftv3.11.0"
        
    }

    environment {
        // Script for build the application. Defined at package.json
        buildScript = 'build'
        // Script for lint the application. Defined at package.json
        lintScript = 'lint'
        // Script for test the application. Defined at package.json
        testScript = 'test:ci'
        // SRC folder.
        srcDir = 'src'
        // Name of the custom tool for chrome stable
        chrome = 'Chrome-stable'

        // sonarQube
        // Name of the sonarQube tool
        sonarTool = 'SonarQube'
        // Name of the sonarQube environment
        sonarEnv = "SonarQube"

        // Nexus
        // Artifact groupId
        groupId = 'com.devonfw'
        // Nexus repository ID
        repositoryId = 'pl-nexus'
        // Nexus internal URL
        repositoryUrl = 'http://nexus3-core:8081/nexus3/repository/'
        // Maven global settings configuration ID
        globalSettingsId = 'MavenSettings'
        // Maven tool id
        mavenInstallation = 'Maven3'

        
        // Docker
        dockerFileName = 'Dockerfile.ci'
        dockerRegistry = 'docker-registry-devon.s2-eu.capgemini.com'
        dockerRegistryCredentials = 'nexus-docker'
        
        

        
        // Openshift
        openshiftUrl = 'https://ocp.itaas.s2-eu.capgemini.com'
        openShiftNamespace = 's2portaldev'
        timeToCheckApp = 1
        
    }

    stages {
        stage ('Loading Custom Tools') {
            when {
               anyOf {
                   branch 'master'
                   branch 'develop'
                   branch 'release/*'
                   branch 'feature/*'
                   branch 'hotfix/*'
                   changeRequest()
               }
            }
            steps {
                tool chrome
                


                script {
                    if (env.BRANCH_NAME.startsWith('release')) {
                        dockerTag = "release"
                        repositoryName = 'maven-releases'
                        dockerEnvironment = "-uat"
                        sonarProjectKey = '-release'
                    }

                    if (env.BRANCH_NAME == 'develop') {
                        dockerTag = "latest"
                        repositoryName = 'maven-snapshots'
                        dockerEnvironment = "-dev"
                        sonarProjectKey = '-develop'
                    }

                    if (env.BRANCH_NAME == 'master') {
                        dockerTag = "production"
                        repositoryName = 'maven-releases'
                        dockerEnvironment = '-prod'
                        sonarProjectKey = ''
                        
                    }
                }
            }
        }

        stage ('Fresh Dependency Installation') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                    branch 'release/*'
                    branch 'feature/*'
                    branch 'hotfix/*'
                    changeRequest()
                }
            }
            steps {
                sh "yarn"
            }
        }

        stage ('Build Application') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                    branch 'release/*'
                    branch 'feature/*'
                    branch 'hotfix/*'
                    changeRequest()
                }
            }
            steps {
                sh """
                    yarn ${buildScript}
                    cp ${dockerFileName} dist/Dockerfile
                    cp nginx.conf dist/nginx.conf
                """
            }
        }

        stage ('Create the Docker image') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                    branch 'release/*'

                }
            }
            steps {
                script {
                    props = readJSON file: 'package.json'
                    def appName = "${props.name}${dockerEnvironment}"
                    dir('dist') {
                        openshift.withCluster('default'){
                            openshift.withProject(openShiftNamespace) {
                                try {
                                   openshift.startBuild("${props.name}${dockerEnvironment} --from-dir=. --wait") 
                                } catch (e) {
                                    def latestBuildVersion = openshift.selector('bc',"${appName}").object().status.lastVersion
                                    def buildName = "${appName}-${latestBuildVersion}"

                                    echo "Checking ${buildName} build"
                                    def build = openshift.selector("build ${buildName}")
                                    def status = build.object().status.phase

                                    try {
                                        sh "echo logs for ${build.name()}:"
                                        build.logs()
                                    } catch (eLog) {
                                        sh "echo error reading logs"
                                    }

                                    if (!status) {
                                        error ("" + e)
                                    } else if (status == "Failed") {
                                        error("[FAILED] - The build is not complete, status: " + status + ".\n" + e)
                                    } else if (status) {
                                        error("[TIMEOUT] - The build is not complete, status: " + status + ".\n" + e)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        stage ('Deploy the new image') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'release/*'
                }
            }
            steps{
                script {
                    props = readJSON file: 'package.json'
                    openshift.withCluster('default'){
                        openshift.withProject(openShiftNamespace) {
                            openshift.raw("import-image ${props.name}${dockerEnvironment}:${dockerTag}")
                        }
                    }
                }
            }
        }

        stage ('Check pod status') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'release/*'
                }
            }
            steps{
                script {
                    props = readJSON file: 'package.json'
                    def appName = "${props.name}${dockerEnvironment}"
                    openshift.withCluster('default'){
                        openshift.withProject(openShiftNamespace) {
                            def latestDeploymentVersion = openshift.selector('dc',"${appName}").object().status.latestVersion
                            def deployment = "${appName}-${latestDeploymentVersion}"

                            echo "Checking ${deployment} pod"
                            def pod = openshift.selector('pod', [deployment: "${deployment}"])
                            def status
                            try {
                                timeout(5) {
                                    pod.untilEach(1) {
                                        echo "pod: ${it.name()}"
                                        status = it.object().status.phase
                                        return (status == "Running" || status == "Failed")
                                    }
                                }
                                if (status != "Running") {
                                    error("")
                                }
                                try {
                                    timeout(timeToCheckApp) {
                                        pod.untilEach(1) {
                                            status = it.object().status.phase
                                            return (status == "Failed")
                                        }
                                    }
                                    error("")
                                } catch (checked) {
                                    if (status == "Running") {
                                        sh "echo Checked: pod running during ${timeToCheckApp} minutes."
                                    } else {
                                        error("")
                                    }
                                }
                            } catch (e) {
                                try {
                                    sh "echo logs for ${pod.name()}:"
                                    pod.logs()
                                } catch (eLog) {
                                    sh "echo error reading logs"
                                }
                                if (!status) {
                                    error ("" + e)
                                } else if (status == "Failed") {
                                    error("[FAILED] - The pod is not running, status: " + status + ".\n" + e)
                                } else {
                                    error("[TIMEOUT] - The pod is not running, status: " + status + ".\n" + e)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        cleanup {
            cleanWs()
        }
    }
}
