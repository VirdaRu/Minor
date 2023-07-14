using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using REST_API.Model;
using REST_API.Repository;

namespace REST_API.Controller
{
    [ApiController]
    [Route("api/[action]")]
    public class SavedOfferController
    {
        public static SavedOffersRepository SavedOfferRepo =
                                 new SavedOffersRepository();

        public static List<SavedOffers> savedOffers = 
                                        new List<SavedOffers>();

        /// <summary>
        /// Adds a saved-offer item to the database
        /// </summary>
        /// <param name="offer">offer to add to database</param>
        [HttpPost]
        [ActionName("saved-offer")]
        public void Add([FromBody]SavedOffers offer)
        {
            //savedOffers.Add(offer);
            SavedOfferRepo.Add(offer);
        }

        /// <summary>
        /// Deletes a saved-offer item from the database using userid + offerid
        /// </summary>
        /// <param name="userid">userid of the user that saved an offer</param>
        /// <param name="offerid">offerid of offer that user saved</param>
        [HttpDelete]
        [ActionName("saved-offer")]
        public void Delete(int userid, int offerid)
        {
            int IDtoDelete = SavedOfferRepo.GetByID(userid, offerid);
            SavedOfferRepo.Delete(IDtoDelete);
        }

        /// <summary>
        /// Gets full list of all saved offers in the database
        /// </summary>
        /// <returns>full list in json format</returns>
        [HttpGet]
        [ActionName("saved-offer/full-saved-offers-list")]
        public string GetSavedOffersList()
        {
            savedOffers = SavedOfferRepo.Get();
            var json = JsonSerializer.Serialize(savedOffers);
            return json;
        }

        /// <summary>
        /// Gets all Offers that a user has saved
        /// </summary>
        /// <param name="userid">id of user that saved offers</param>
        /// <returns>list of offers in json format</returns>
        [HttpGet]
        [ActionName("saved-offer")]
        public string GetOfferByID(int userid)
        {
            var json = JsonSerializer.Serialize(SavedOfferRepo.GetByID(userid));
            return json;
        }

        /// <summary>
        /// Gets id of saved-offer item, by combination of user- and offerid
        /// </summary>
        /// <param name="userid">id of user that saved an item</param>
        /// <param name="offerid">id of offer that has been saved</param>
        /// <returns>id of saved-offer item</returns>
        [HttpGet]
        [ActionName("saved-offer/user-saved-offer")]
        public string GetOfferByID(int userid, int offerid)
        {
            var json = JsonSerializer.Serialize(SavedOfferRepo.GetByID(userid,offerid));
            return json;
        }
    }
}

