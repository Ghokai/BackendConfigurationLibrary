using System;

namespace ConfigurationManager.Listener.Exceptions
{
    public class ConfigurationSettingNotFoundException : Exception
    {
        public ConfigurationSettingNotFoundException() { }
        public ConfigurationSettingNotFoundException(string message) : base(message) { }
        public ConfigurationSettingNotFoundException(string message, Exception inner) : base(message, inner) { }
        protected ConfigurationSettingNotFoundException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }
}
