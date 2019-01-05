using ConfigurationManager.Models;
using System;
using System.Collections.Generic;

namespace ConfigurationManager.EventArguments
{
    public class ConfigurationParametersRefreshedEventArgs : EventArgs
    {
        public int Counter { get; set; }
        public List<ConfigurationSetting> Settings { get; set; }
    }
}
