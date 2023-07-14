using Newtonsoft.Json;
using System.ComponentModel;

namespace REST_API.Model
{
    public class JobSeeker
    {
        [Bindable(true)]
        public int JobSeekerID { get; set; }

        [JsonConstructor]
        public JobSeeker()
        {

        }
    }
}
