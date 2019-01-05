using System;

namespace ConfigurationManager.Exceptions
{
    public class ConfigurationSettingAlreadyExistException : Exception
    {
        public ConfigurationSettingAlreadyExistException() { }
        public ConfigurationSettingAlreadyExistException(string message) : base(message) { }
        public ConfigurationSettingAlreadyExistException(string message, Exception inner) : base(message, inner) { }
        protected ConfigurationSettingAlreadyExistException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }
  
}
