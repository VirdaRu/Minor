using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Primitives;
using REST_API.Model;
using REST_API.Repository;
using System.Collections.Generic;
using System.Net;
using System;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.Json;

namespace REST_API.Controller
{
    [ApiController]
    [Route("api/[action]")]
    public class OfferController : ControllerBase
    {
        public static OfferRepository OfferRepo = new OfferRepository();
        public static ResumeController resumeController = new ResumeController();   
        public static List<Offer> offersCollection = new List<Offer>();
        


        /// <summary>
        /// Adds offer along with resume to database and file storage
        /// </summary>
        /// <param name="file">file to be added to file storage</param>
        /// <param name="offer">offer to be added to database</param>
        /// <returns></returns>
        [HttpPost]
        [ActionName("offer")]
        public HttpStatusCode Add(IFormFile file, string offer)
        {
            System.Console.WriteLine("got here");
            Offer offerRec = JsonSerializer.Deserialize<Offer>(offer);



            System.Console.WriteLine(offerRec.Province);
            System.Console.WriteLine(file.FileName);

            int offerID = OfferRepo.Add(offerRec);
            resumeController.AddTest(file, offerRec.JobSeekerID, offerID);

            //OfferRepo.AddOrUpdate(offerRec, file);
            return HttpStatusCode.OK;

        }

        /// <summary>
        /// Deletes offer with corresponding id
        /// </summary>
        /// <param name="id">id of offer to be deleted</param>
        [HttpDelete]
        [ActionName("offer")]
        public void Delete(int id)
        {
            OfferRepo.Delete(id);
        }

        /// <summary>
        /// Updates existing offer along with resume
        /// </summary>
        /// <param name="file">file to be updated to file storage</param>
        /// <param name="updatedOffer">offer to be updated to database</param>
        /// <returns></returns>
        [HttpPut]
        [ActionName("offer")]
        public void Update(IFormFile file, string updatedOffer)
        {
            Offer offer = JsonSerializer.Deserialize<Offer>(updatedOffer);
            OfferRepo.Update(offer, offer.OfferID);
            resumeController.UpdateTest(file, offer.JobSeekerID, offer.OfferID);
        }

        /// <summary>
        /// Gets all offers from database
        /// </summary>
        /// <returns>All existing offers in json format</returns>
        [HttpGet]
        [ActionName("offer/all-offers-list")]
        public string GetOffersList()
        {
            offersCollection = OfferRepo.Get();
            var json = JsonSerializer.Serialize(offersCollection);
            return json;
        }

        /// <summary>
        /// Gets offer that a user owns
        /// </summary>
        /// <param name="userid">id of user that owns the offer</param>
        /// <returns>existing offer in json format</returns>
        [HttpGet]
        [ActionName("offer/limit-offers-list")]
        public string GetOffersList(int limit)
        {
            offersCollection = OfferRepo.GetLimit(limit);   
            var json = JsonSerializer.Serialize(offersCollection);
            return json;
        }

        [HttpGet]
        [ActionName("offer")]
        public string GetOfferByID(int userid) 
        {
            var json = JsonSerializer.Serialize(OfferRepo.GetByID(userid));
            return json;
        }

        /// <summary>
        /// Handles the search functionality
        /// </summary>
        /// <param name="query">search query from user</param>
        /// <returns>offers that match the search query</returns>
        [HttpGet]
        [ActionName("offer/search-offers")]
        public string GetOfferByInput(string query)
        {
            var json = JsonSerializer.Serialize(OfferRepo.getOffersByName(query));

            return json;
        }

        /// <summary>
        /// Checks whether user has an offer
        /// </summary>
        /// <param name="userid">id of user to check</param>
        /// <returns>OfferID if User has offer</returns>
        [HttpGet]
        [ActionName("offer/user-has-offer")]
        public int GetUserHasOffer(int userid) 
        {
            return OfferRepo.UserHasOffer(userid);
        }

    }
}
