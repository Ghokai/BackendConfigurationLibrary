using ConfigurationManager.Listener.Exceptions;
using ConfigurationManager.Models;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConfigurationManager.Listener
{
    public class ConfigurationListener : IConfigurationListener
    {
        private const string _cnstExchangeName = "ConfigurationSetting";
        private const string _cnstExchangeType = "direct";

        private string _appName;
        private ConnectionFactory _factory { get; set; } = null;
        private IConnection _connection { get; set; } = null;
        private IModel _channel { get; set; } = null;
        private EventingBasicConsumer _consumer { get; set; } = null;
        private List<ConfigurationSetting> _configurationSettingList { get; set; } = null;

        public ConfigurationListener(string appName)
        {
            this._appName = appName.ToLower();
            this._configurationSettingList = new List<ConfigurationSetting>();

            string hostName = Environment.GetEnvironmentVariable("RabbitMq/Host");
            string userName = Environment.GetEnvironmentVariable("RabbitMq/Username");
            string passWord = Environment.GetEnvironmentVariable("RabbitMq/Password");

            if (hostName == null)
            {
                _factory = new ConnectionFactory()
                {
                    HostName = "localhost"
                };
            }
            else
            {
                _factory = new ConnectionFactory()
                {
                    HostName = hostName,
                    UserName = userName,
                    Password = passWord
                };
            }

            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: _cnstExchangeName, type: _cnstExchangeType);
            var queueName = _channel.QueueDeclare().QueueName;
            _channel.QueueBind(queue: queueName, exchange: _cnstExchangeName, routingKey: _appName);
            _consumer = new EventingBasicConsumer(_channel);
            //registering to receive event
            _consumer.Received += ReceiveHandler;
            _channel.BasicConsume(queue: queueName, autoAck: true, consumer: _consumer);
        }

        private void ReceiveHandler(object model, BasicDeliverEventArgs ea)
        {
            //deserialize received object
            var body = ea.Body;
            var message = Encoding.UTF8.GetString(body);
            ConfigurationSetting recievedConfigurationSetting = JsonConvert.DeserializeObject<ConfigurationSetting>(message);

            if (this._configurationSettingList == null)
            {
                this._configurationSettingList = new List<ConfigurationSetting>();
            }

            var alreadyExist = _configurationSettingList.Find(cs => cs.Name.ToLower() == recievedConfigurationSetting.Name.ToLower());
            if (alreadyExist == null && recievedConfigurationSetting.IsActive == 1)
            {
                //newly added item => insert
                _configurationSettingList.Add(recievedConfigurationSetting);
            }
            else if (alreadyExist != null)
            {
                if (recievedConfigurationSetting.IsActive == 0)
                {
                    //deactivated => remove
                    _configurationSettingList.Remove(alreadyExist);
                }
                else if (alreadyExist.Value != recievedConfigurationSetting.Value || alreadyExist.Type != recievedConfigurationSetting.Type)
                {
                    //changed => remove old insert new
                    _configurationSettingList.Remove(alreadyExist);
                    _configurationSettingList.Add(recievedConfigurationSetting);
                }
            }
        }

        private ConfigurationSetting getConfigurationSetting(string name)
        {
            ConfigurationSetting found = null;

            if (_configurationSettingList == null)
            {
                throw new ConfigurationSettingsNotLoadedException("Configuration setting is not loaded yet!");
            }
            found = _configurationSettingList.Find((c) => c.Name.ToLower() == name.ToLower());
            if (found == null)
            {
                throw new ConfigurationSettingNotFoundException($"Configuration setting({_appName}:{name}) is not exist!");
            }
            if (found.Type != "String" &&
                found.Type != "Int" &&
                found.Type != "Double" &&
                found.Type != "Boolean")
            {
                throw new ConfigurationSettingTypeIsNotSupportedException($"configuration setting type({found.Type}) is not supporting!");
            }
            return found;
        }

        public T GetValue<T>(string key)
        {
            ConfigurationSetting found = getConfigurationSetting(key);
            return (T)Convert.ChangeType(found.Value, typeof(T));
        }

        public string GetTypeName(string key)
        {
            ConfigurationSetting found = getConfigurationSetting(key);
            return found.Type;
        }
    }
}
