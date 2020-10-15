FROM openjdk:8-jdk-alpine

ARG JAR_FILE=target/dashboard-0.0.1-SNAPSHOT

WORKDIR /opt/app

COPY ${JAR_FILE} dashboard-0.0.1-SNAPSHOT
ENTRYPOINT ["java", "-jar", "dashboard-0.0.1-SNAPSHOT"]