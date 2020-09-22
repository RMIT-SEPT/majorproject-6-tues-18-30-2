FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
COPY deployment/application.yml application.yml
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]