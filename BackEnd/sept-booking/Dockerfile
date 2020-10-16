FROM openjdk:8-jdk-alpine

ARG JAR_FILE=target/booking-0.0.1-SNAPSHOT.jar

WORKDIR /opt/app

COPY ${JAR_FILE} booking-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "booking-0.0.1-SNAPSHOT.jar"]
