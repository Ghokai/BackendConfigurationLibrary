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
	
	
![cli1](https://user-images.githubusercontent.com/11095906/50729995-4e1d7d00-10f8-11e9-8310-93c235ac9de2.png)
![client2](https://user-images.githubusercontent.com/11095906/50729997-4e1d7d00-10f8-11e9-81a3-b7a862ccc93a.png)
![cli3](https://user-images.githubusercontent.com/11095906/50729996-4e1d7d00-10f8-11e9-92d9-e01d9dcc45c9.png)




	
	
#### Server Application

Start Configuration Server application for interact with client application for crud operations and publish configuration settings to rabbitmq queue periodically to inform listener applications according to their applications settings changes

![server](https://user-images.githubusercontent.com/11095906/50730001-4fe74080-10f8-11e9-8897-e6146e475507.png)


### Registered (Consumer) Applications

As an example of Listener Application (SampleConsumerWebApiApp), this application will listen rabbitmq queue for their configuration setting changes with their app name and updates itself otomatically according to this changes. So it can otomatically access their configuration values
by calling

    _configurationListener.GetValue<string>(name);
	_configurationListener.GetValue<bool>(name);
	_configurationListener.GetValue<int>(name);
	_configurationListener.GetValue<double>(name);
	
	
![sample1](https://user-images.githubusercontent.com/11095906/50729998-4eb61380-10f8-11e9-81b6-b1273bd385f3.png)
![sample2](https://user-images.githubusercontent.com/11095906/50729999-4f4eaa00-10f8-11e9-8c40-d0e91424165a.png)
![sample3](https://user-images.githubusercontent.com/11095906/50730000-4f4eaa00-10f8-11e9-895f-73d88aaa3500.png)	

### Component Diagram of System

![image001](https://user-images.githubusercontent.com/11095906/50729227-5e107d80-1147-11e9-8216-65f04324db3e.png)


