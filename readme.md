# Backend Configuration Library

- Queue based dynamic configuration settings management system.
- Configuration settings of various applications are managed from client applications by making crud operations using configuration server apis
- Configuration server also periodically fetches configuration settings and publish them on rabbitmq channel by ConfigurationManager.Publisher
- Registered apps which are using ConfigurationManager.Listener are informed according to their configuration settings changes and they can access their configuration settings values thanks ConfigurationManager.Listener



### To run all system on docker containers

    docker-compose up
    
### Component Diagram

![image001](https://user-images.githubusercontent.com/11095906/50729227-5e107d80-1147-11e9-8216-65f04324db3e.png)

### Screens

![capture1](https://user-images.githubusercontent.com/11095906/50729514-5dc6b100-114c-11e9-8c28-4b3bff03f2bb.PNG)

![capture2](https://user-images.githubusercontent.com/11095906/50729506-3e2f8880-114c-11e9-84da-a80534f8a8f4.PNG)

![capture3](https://user-images.githubusercontent.com/11095906/50729507-3e2f8880-114c-11e9-977c-ca23e704c0b4.PNG)

#End
