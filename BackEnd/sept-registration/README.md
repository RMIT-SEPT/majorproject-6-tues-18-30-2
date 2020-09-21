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

POST http://localhost:8080/api/login

```
{
	"username": "johndoe@gmail.com",
	"password": "123456"
	
}
```

POST http://localhost:8081/api/register

```
{
	"username": "johndoe@gmail.com",
	"password": "123456",
	"first_name": "John",
	"last_name": "Doe",
	"street_name": "Smith",
	"street_no": "123",
	"phone": "1233545",
	"postcode": "12345"
}
```

# Building Docker image
```
docker build --build-arg JAR_FILE=target/*.jar -t sept/registration .
```

# Running Docker image
1. Copy file **env_file.example** into **env_file**
```
APP_PORT=8081
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
docker run -p 8081:8081 -d --env-file=env_file sept/registration
```
8. 
