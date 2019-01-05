namespace ConfigurationManager.Listener
{
    public interface IConfigurationListener
    {
        T GetValue<T>(string key);
        string GetTypeName(string key);
    }
}
