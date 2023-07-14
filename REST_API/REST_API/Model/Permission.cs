using System.ComponentModel;
using Newtonsoft.Json;

namespace REST_API.Model
{
    public class Permission
    {
        [Bindable(true)]
        public int PermissionID { get; set; }
        [Bindable(true)]
        public int OfferID { get; set; }
        [Bindable(true)]
        public int EmployerID { get; set; }


        [JsonConstructor]
        public Permission()
        {

        }
    }
}
