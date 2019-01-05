using ConfigurationManager.Repositories;
using ConfigurationManager.Models;
using System;
using System.Collections.Generic;
using ConfigurationManager.EventArguments;
using ConfigurationManager.AsyncPeriodicHelpers;

namespace ConfigurationManager.Readers
{
    public class ConfigurationReader : IConfigurationReader
    {
        private IConfigurationSettingRepository _configurationSettingRepository = null;
        private int _refreshTimerIntervalInMs = 0;
        private List<ConfigurationSetting> _configSettings = null;
        private int _refreshCounter = 0;

        public event EventHandler<ConfigurationParametersRefreshedEventArgs> ConfigurationParametersRefreshed;

        public ConfigurationReader(string connectionString, int refreshTimerIntervalInMs)
        {
            _refreshTimerIntervalInMs = refreshTimerIntervalInMs;
            _configurationSettingRepository = new MongoConfigurationSettingRepository(connectionString);
        }

        public void StartReading()
        {
            LoadConfigurationSettings();
            PeriodicTask.Run(LoadConfigurationSettings, TimeSpan.FromMilliseconds(_refreshTimerIntervalInMs));
        }

        public void LoadConfigurationSettings()
        {
                this._refreshCounter++;
                this._configSettings = _configurationSettingRepository.Get();
                ConfigurationParametersRefreshedEventArgs args = new ConfigurationParametersRefreshedEventArgs
                {
                    Counter = _refreshCounter,
                    Settings = _configSettings
                };
                OnConfigurationParametersRefreshed(args);
        }

        protected virtual void OnConfigurationParametersRefreshed(ConfigurationParametersRefreshedEventArgs e)
        {
            EventHandler<ConfigurationParametersRefreshedEventArgs> handler = ConfigurationParametersRefreshed;
            if (handler != null)
            {
                handler(this, e);
            }
        }
    }
}
