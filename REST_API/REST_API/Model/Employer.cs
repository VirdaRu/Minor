using Newtonsoft.Json;
using System.ComponentModel;

namespace REST_API.Model
{
    public class Employer
    {
        [Bindable(true)]
        public int EmployerID { get; set; }

        [Bindable(true)]
        public int Credits { get; set; }

        [JsonConstructor]
        public Employer()
        {

        }
    }
}
