using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ConfigurationManager.Models
{
    public class ConfigurationSetting
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("ConfigurationSettingId")]
        public int ConfigurationSettingId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Type")]
        public string Type { get; set; }

        [BsonElement("Value")]
        public string Value { get; set; }

        [BsonElement("IsActive")]
        public int IsActive { get; set; }

        [BsonElement("ApplicationName")]
        public string ApplicationName { get; set; }
    }
}