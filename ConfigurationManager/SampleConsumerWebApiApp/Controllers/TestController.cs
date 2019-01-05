using System;
using Microsoft.AspNetCore.Mvc;
using ConfigurationManager.Listener;
using ConfigurationManager.Listener.Exceptions;

namespace SampleWebApiApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private IConfigurationListener _configurationListener;

        public TestController(IConfigurationListener configurationListener)
        {
            this._configurationListener = configurationListener;
        }
        //[HttpGet("{id}", Name = "Get")]
        // [Route("[action]")]
        [HttpGet("[action]/{name}")]
        public string GetDynamic(string name)
        {
            try
            {
                string typeName = this._configurationListener.GetTypeName(name);
                dynamic value = null;

                if (typeName == "String")
                {
                    value = GetString(name);
                }
                else if (typeName == "Int")
                {
                    value = GetInt(name);
                }
                else if (typeName == "Double")
                {
                    value = GetDouble(name);
                }
                else if (typeName == "Boolean")
                {
                    value = GetBoolean(name);
                }

                return typeName + " : " + Convert.ToString(value);
            }
            catch (ConfigurationSettingNotFoundException ex)
            {
                return ex.Message;
            }
            catch (ConfigurationSettingsNotLoadedException ex)
            {
                return ex.Message;
            }
            catch (ConfigurationSettingTypeIsNotSupportedException ex)
            {
                return ex.Message;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("[action]/{name}")]
        public string GetString(string name)
        {
            return _configurationListener.GetValue<string>(name);

        }

        [HttpGet("[action]/{name}")]
        public bool GetBoolean(string name)
        {
            return _configurationListener.GetValue<bool>(name);

        }

        [HttpGet("[action]/{name}")]
        public int GetInt(string name)
        {
            return _configurationListener.GetValue<int>(name);

        }

        [HttpGet("[action]/{name}")]
        public double GetDouble(string name)
        {
            return _configurationListener.GetValue<double>(name);
        }
    }
}