using Newtonsoft.Json;

namespace CustomersAPI.Models
{
    public class Customer
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }

        [JsonProperty("createdDateTime")]
        public DateTimeOffset CreatedDateTime { get; set; }

        [JsonProperty("updatedDateTime")]
        public DateTimeOffset UpdatedDateTime { get; set; }
    }
}
