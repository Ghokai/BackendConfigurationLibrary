using ConfigurationManager.EventArguments;

namespace ConfigurationManager.Publisher
{
    public interface IConfigurationPublisher
    {
        void ConfigurationParametersRefreshedHandler(object sender, ConfigurationParametersRefreshedEventArgs e);
    }
}