using Newtonsoft.Json;
using System.ComponentModel;

namespace REST_API.Model
{
    public class Message
    {
        [Bindable(true)]
        public int MessageID { get; set; }
        [Bindable(true)]
        public int JobSeekerID { get; set; }
        [Bindable(true)]
        public int EmployerID { get; set; }
        [Bindable(true)]
        public string Subject { get; set; }
        [Bindable(true)]
        public string message { get; set; }
        [Bindable(true)]
        public string Attachment { get; set; }
        [Bindable(true)]
        public string DateSent { get; set; }

        [JsonConstructor]
        public Message()
        {

        }
    }
}
