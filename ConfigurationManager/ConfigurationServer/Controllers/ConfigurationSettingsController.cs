using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ConfigurationManager.Repositories;
using ConfigurationManager.Models;
using ConfigurationManager.Publisher;

namespace ConfigurationServer.Controllers
{
    [Produces("application/json")]
    [Route("api/ConfigurationSettings")]
    public class ConfigurationSettings : Controller
    {
        private IConfigurationSettingRepository _configurationSettingRepository;
        private IConfigurationPublisher _publisher;

        public ConfigurationSettings(IConfigurationSettingRepository configurationSettingRepository, IConfigurationPublisher publisher)
        {
            this._configurationSettingRepository = configurationSettingRepository;
            this._publisher = publisher;
        }

        // GET: api/ConfigSettings
        [HttpGet]
        public IEnumerable<ConfigurationSetting> Get()
        {
            return _configurationSettingRepository.Get();
        }

        // GET: api/ConfigSettings/5
        [HttpGet("{id}", Name = "Get")]
        public ConfigurationSetting Get(string id)
        {
            return _configurationSettingRepository.Get(id);
        }
        
        // POST: api/ConfigSettings
        [HttpPost]
        public void Post([FromBody]ConfigurationSetting configSetting)
        {
            _configurationSettingRepository.Create(configSetting);
        }
        
        // PUT: api/ConfigSettings/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]ConfigurationSetting configSetting)
        {
            _configurationSettingRepository.Update(id, configSetting);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _configurationSettingRepository.Remove(id);
        }
    }
}
