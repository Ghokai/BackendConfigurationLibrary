using Microsoft.AspNetCore.Mvc;
using ConfigurationManager.Listener;

namespace SampleConsumerWebApiApp.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private IConfigurationListener _configurationListener;

        public ValuesController(IConfigurationListener configurationListener)
        {      
            this._configurationListener = configurationListener;
        }

        // GET api/values
        [HttpGet]
        public string Get()
        {
            return "you can access & test configuration values with this url= '/api/test/getdynamic/{ConfigurationSettingName}'";
        }

        // GET api/values/5
        [HttpGet("{name}")]
        public string Get(string name)
        {
            return "you can access & test configuration values with this url= '/api/test/getdynamic/{ConfigurationSettingName}'";
        }
    }
}
