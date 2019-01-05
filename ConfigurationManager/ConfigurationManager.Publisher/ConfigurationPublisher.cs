using ConfigurationManager.EventArguments;
using ConfigurationManager.Models;
using ConfigurationManager.Readers;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Text;

namespace ConfigurationManager.Publisher
{


    public class ConfigurationPublisher : IConfigurationPublisher
    {
        private const string _cnstExchangeName = "ConfigurationSetting";
        private const string _cnstExchangeType = "direct";

        private ConnectionFactory _factory { get; set; } = null;
        private IConnection _connection { get; set; } = null;
        private IModel _channel { get; set; } = null;
        private IConfigurationReader _configReader { get; set; } = null;

        public ConfigurationPublisher(string connectionString, int refreshTimerIntervalInMs)
        {
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

            _configReader = new ConfigurationReader(connectionString, refreshTimerIntervalInMs);
            //this event will be called after each periodic (according to timer interval) reading operation
            _configReader.ConfigurationParametersRefreshed += ConfigurationParametersRefreshedHandler;
            _configReader.StartReading();
        }

        public void ConfigurationParametersRefreshedHandler(object sender, ConfigurationParametersRefreshedEventArgs e)
        {
            foreach (ConfigurationSetting item in e.Settings)
            {
                var jsonStr = JsonConvert.SerializeObject(item);
                var bytes = Encoding.UTF8.GetBytes(jsonStr);
                //publish configuration settings
                _channel.BasicPublish(exchange: _cnstExchangeName,routingKey: item.ApplicationName.ToLower(),basicProperties: null,body: bytes);
            }
        }
    }
}
