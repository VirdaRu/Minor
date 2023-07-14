using System.ComponentModel;
using Newtonsoft.Json;

namespace REST_API.Model
{
    public class SavedOffers
    {
        [Bindable(true)]
        public int SavedID { get; set; }
        [Bindable(true)]
        public int EmployerID { get; set; }
        [Bindable(true)]
        public int OfferID { get; set; }


        [JsonConstructor]
        public SavedOffers()
        {

        }
    }
}
