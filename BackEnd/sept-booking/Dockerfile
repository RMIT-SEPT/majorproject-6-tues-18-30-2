FROM openjdk:8-jdk-alpine

ARG JAR_FILE=target/booking-0.0.1-SNAPSHOT

WORKDIR /opt/app

COPY ${JAR_FILE} booking-0.0.1-SNAPSHOT
ENTRYPOINT ["java", "-jar", "booking-0.0.1-SNAPSHOT"]