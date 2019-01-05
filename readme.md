# Backend Configuration Library

- Queue based dynamic configuration settings management system.
- Configuration settings of various applications are managed from client applications by making crud operations using configuration server apis
- Configuration server also periodically fetches configuration settings and publish them on rabbitmq channel by ConfigurationManager.Publisher
- Registered apps which are using ConfigurationManager.Listener are informed with their configuration settings changes according to their application names and they can access their configuration setting values thanks ConfigurationManager.Listener

### To run all system on docker containers

    docker-compose up
    
### To run manually

#### Client application 

    cd configuration-client
	npm install
	npm start
	
#### Server Application

Start Configuration Server application for interact with client application for crud operations and publish configuration settings to rabbitmq queue periodically to inform listener applications according to their applications settings changes

### Registered (Consumer) Applications

As an example of Listener Application (SampleConsumerWebApiApp), this application will listen rabbitmq queue for their configuration setting changes with their app name and updates itself otomatically according to this changes. So it can otomatically access their configuration values
by calling

    _configurationListener.GetValue<string>(name);
	_configurationListener.GetValue<bool>(name);
	_configurationListener.GetValue<int>(name);
	_configurationListener.GetValue<double>(name);

### Component Diagram

![image001](https://user-images.githubusercontent.com/11095906/50729227-5e107d80-1147-11e9-8216-65f04324db3e.png)

### Screens

![capture1](https://user-images.githubusercontent.com/11095906/50729514-5dc6b100-114c-11e9-8c28-4b3bff03f2bb.PNG)

![capture2](https://user-images.githubusercontent.com/11095906/50729506-3e2f8880-114c-11e9-84da-a80534f8a8f4.PNG)

![capture3](https://user-images.githubusercontent.com/11095906/50729507-3e2f8880-114c-11e9-977c-ca23e704c0b4.PNG)
