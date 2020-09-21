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

