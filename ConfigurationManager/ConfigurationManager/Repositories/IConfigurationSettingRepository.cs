using ConfigurationManager.Models;
using System.Collections.Generic;

namespace ConfigurationManager.Repositories
{
    //crud repository interface
    //we are supporting mongodb with implementing this interface for mongo db
    //we can also support other db and structures too as implementing this interface
    public interface IConfigurationSettingRepository
    {
        List<ConfigurationSetting> Get();
        ConfigurationSetting Get(string id);
        ConfigurationSetting Create(ConfigurationSetting configSetting);
        void Update(string id, ConfigurationSetting configSetting);
        void Remove(ConfigurationSetting configSetting);
        void Remove(string id);
    }
}
