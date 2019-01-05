using ConfigurationManager.Exceptions;
using ConfigurationManager.Models;
using MongoDB.Driver;
using System.Collections.Generic;

namespace ConfigurationManager.Repositories
{
    public class MongoConfigurationSettingRepository : IConfigurationSettingRepository
    {
        private IMongoCollection<ConfigurationSetting> _configSettingCollection;

        public MongoConfigurationSettingRepository(string connectionString)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("configurationdb");
            _configSettingCollection = database.GetCollection<ConfigurationSetting>("configurationsettings");
        }

        public List<ConfigurationSetting> Get()
        {
            var items = _configSettingCollection.Find(_ => true).ToList();
            return items;
        }

        public ConfigurationSetting Get(string id)
        {
            var item = _configSettingCollection.Find(c => c.Id == id).FirstOrDefault();
            if (item == null)
            {
                throw new ConfigurationSettingNotExistException("Configuration Setting is not exist!");
            }
            return item;
        }

        public ConfigurationSetting Create(ConfigurationSetting configSetting)
        {
            ConfigurationSetting hasAlreadyExists = _configSettingCollection.Find(
                x => x.ApplicationName.ToLower() == configSetting.ApplicationName.ToLower() && x.Name.ToLower() == configSetting.Name.ToLower())
                .FirstOrDefault();

            if (hasAlreadyExists != null)
            {
                throw new ConfigurationSettingAlreadyExistException("Configuration Setting with same name for this application is already exist!");
            }

            ConfigurationSetting csWithMaxId = _configSettingCollection.Find(x => true).SortByDescending(cs => cs.ConfigurationSettingId).Limit(1).FirstOrDefault();
            var nextId = 1;
            if (csWithMaxId != null)
            {
                nextId = csWithMaxId.ConfigurationSettingId + 1;
            }
            configSetting.ConfigurationSettingId = nextId;

            _configSettingCollection.InsertOne(configSetting);
            return configSetting;
        }

        public void Update(string id, ConfigurationSetting configSetting)
        {
            _configSettingCollection.ReplaceOne(c => c.Id == id, configSetting);
        }

        public void Remove(ConfigurationSetting configSetting)
        {
            _configSettingCollection.DeleteOne(c => c.Id == configSetting.Id);
        }

        public void Remove(string id)
        {
            _configSettingCollection.DeleteOne(c => c.Id == id);
        }
    }
}

