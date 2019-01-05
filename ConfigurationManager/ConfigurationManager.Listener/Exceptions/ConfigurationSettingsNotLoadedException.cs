using System;

namespace ConfigurationManager.Listener.Exceptions
{
    public class ConfigurationSettingsNotLoadedException : Exception
    {
        public ConfigurationSettingsNotLoadedException() { }
        public ConfigurationSettingsNotLoadedException(string message) : base(message) { }
        public ConfigurationSettingsNotLoadedException(string message, Exception inner) : base(message, inner) { }
        protected ConfigurationSettingsNotLoadedException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }
}


