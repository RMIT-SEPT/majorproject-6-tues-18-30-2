FROM openjdk:8-jdk-alpine

ARG JAR_FILE=target/dashboard-0.0.1-SNAPSHOT.jar

WORKDIR /opt/app

COPY ${JAR_FILE} dashboard-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "dashboard-0.0.1-SNAPSHOT.jar"]