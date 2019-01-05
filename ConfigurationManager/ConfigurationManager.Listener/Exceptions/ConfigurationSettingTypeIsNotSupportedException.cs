using System;

namespace ConfigurationManager.Listener.Exceptions
{
    public class ConfigurationSettingTypeIsNotSupportedException:Exception
    {
        public ConfigurationSettingTypeIsNotSupportedException() { }
        public ConfigurationSettingTypeIsNotSupportedException(string message) : base(message) { }
        public ConfigurationSettingTypeIsNotSupportedException(string message, Exception inner) : base(message, inner) { }
        protected ConfigurationSettingTypeIsNotSupportedException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }
}
