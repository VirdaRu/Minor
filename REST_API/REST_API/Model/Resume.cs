using System.ComponentModel;
using Newtonsoft.Json;

namespace REST_API.Model
{
    public class Resume
    {
        [Bindable(true)]
        public int ResumeID { get; set; }

        [Bindable(true)]
        public string FullResume { get; set; }

        [Bindable(true)]
        public string CensoredResume { get; set; }

        [Bindable(true)]
        public int OfferID { get; set; }

        [JsonConstructor]
        public Resume()
        {

        }
    }
}
