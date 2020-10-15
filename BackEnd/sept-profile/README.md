# Booking

# Test the application

```
	./mvnw test
```

Specific test

```
    ./mvnw test -Dtest=SecurityUtilTests
```

# Run the application - Development Mode

```
	./mvnw spring-boot:run
```
Wait until the application started

```
....
2020-09-18 13:34:58.343  INFO 1130 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2020-09-18 13:34:58.387  INFO 1130 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2020-09-18 13:34:58.389  INFO 1130 --- [  restartedMain] DeferredRepositoryInitializationListener : Triggering deferred initialization of Spring Data repositories…
2020-09-18 13:34:58.608  INFO 1130 --- [         task-1] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2020-09-18 13:34:58.613  INFO 1130 --- [         task-1] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2020-09-18 13:34:58.819  INFO 1130 --- [  restartedMain] DeferredRepositoryInitializationListener : Spring Data repositories initialized!
2020-09-18 13:34:58.826  INFO 1130 --- [  restartedMain] com.booking.auth.AuthApplication         : Started AuthApplication in 3.238 seconds (JVM running for 3.645)

```

# Available API

GET http://localhost:8082/me

RESPONSE:

```
{
    "username": "pat@gmail.com",
    "first_name": "Patriszky",
    "last_name": "Thoeng",
    "street_no": "6735",
    "street_name": "York Rd",
    "postcode": "12345",
    "phone": "04327765568",
    "organization": "",
    "country": "",
    "department": ""
}
```

# Building Docker image

Makesure use the latest .jar by running ./mvnw install
```
docker build --build-arg JAR_FILE=target/*.jar -t sept/profile .
```

# Running Docker image
1. Copy file **env_file.example** into **env_file**
```
APP_PORT=8082
JWT_SECRET=
DATABASE_URL=jdbc:mysql://host:port/dbname
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_DRIVER=com.mysql.jdbc.Driver
```
2. Set the APP_PORT
3. Set the JWT_SECRET with a confidential string (random). Once set, don't change again to avoid issues
4. Set the DATABASE_URL e.g:
	host: localhost / AWS database endpoint
	port: 3306
	dbname: sept
5. Set the DATABASE_USER
6. Set the DATABASE_PASSWORD
7. 
```
docker run -p 8082:8082 --env-file=env_file sept/profile
```
8. 