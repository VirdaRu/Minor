using Newtonsoft.Json;
using System.ComponentModel;

namespace REST_API.Model
{
    public class User
    {
        [Bindable(true)]
        public int UserID { get; set; }
        [Bindable(true)]
        public string EmailAddress { get; set; }
        [Bindable(true)]
        public string Password { get; set; }
        [Bindable(true)]
        public string PhoneNumber { get; set; }
        [Bindable(true)]
        public bool IsEmployer { get; set; }
        [Bindable(true)]
        public string ThirdPartyID { get; set; }

        [JsonConstructor]
        public User()
        {

        }
    }
}
