using ConfigurationManager.EventArguments;
using System;

namespace ConfigurationManager.Readers
{
    public interface IConfigurationReader
    {
        void StartReading();
        event EventHandler<ConfigurationParametersRefreshedEventArgs> ConfigurationParametersRefreshed;

    }
}
