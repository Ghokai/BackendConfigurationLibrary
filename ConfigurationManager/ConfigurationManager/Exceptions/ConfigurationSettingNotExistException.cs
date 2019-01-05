using System;

namespace ConfigurationManager.Exceptions
{
    public class ConfigurationSettingNotExistException : Exception
    {
        public ConfigurationSettingNotExistException() { }
        public ConfigurationSettingNotExistException(string message) : base(message) { }
        public ConfigurationSettingNotExistException(string message, Exception inner) : base(message, inner) { }
        protected ConfigurationSettingNotExistException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }
   
}
