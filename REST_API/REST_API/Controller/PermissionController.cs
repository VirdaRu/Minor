using Microsoft.AspNetCore.Mvc;
using REST_API.Model;
using REST_API.Repository;
using System.Text.Json;

namespace REST_API.Controller
{
    [ApiController]
    [Route("api/[action]")]
    public class PermissionController
    {
        public static PermissionRepository PermissionRepo = 
                                           new PermissionRepository();

        public static OfferRepository OfferRepo =
                                           new OfferRepository();
        
        public static List<Permission> Permissions =
                                           new List<Permission>();

        /// <summary>
        /// adds a permission item to the database
        /// </summary>
        /// <param name="p">permission to add to the database</param>
        /// <param name="senderid">user that gained permission to offer</param>
        [HttpPost]
        [ActionName("permission")]
        public void Add([FromBody] Permission p, int senderid)
        {
            int offerid = OfferRepo.GetByID(senderid).ElementAt(0).OfferID;
            p.OfferID = offerid;
            //Permissions.Add(p);
            PermissionRepo.Add(p);
        }

        /// <summary>
        /// Deletes a permission item
        /// </summary>
        /// <param name="id">id of permission to be deleted</param>
        [HttpDelete]
        [ActionName("permission")]
        public void Delete(int id)
        {
            PermissionRepo.Delete(id);
        }
        
        /// <summary>
        /// Updates permission
        /// </summary>
        /// <param name="permission">permission item to be updated</param>
        /// <param name="id">id of permission to be updated</param>
        [HttpPut]
        [ActionName("permission")]
        public void Update(Permission permission, int id)
        {
            PermissionRepo.Update(permission, id);
        }

        /// <summary>
        /// Gets list of all permissions in database
        /// </summary>
        /// <returns>all permissions in json format</returns>
        [HttpGet]
        [ActionName("permission/all-permissions")]
        public string GetPermissionsList()
        {
            Permissions = PermissionRepo.Get();
            var json = JsonSerializer.Serialize(Permissions);
            return json;
        }

        /// <summary>
        /// Gets permission of an offer belonging to the corresponding userid.
        /// </summary>
        /// <param name="id">id of user that needs to be checked</param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("permission")]
        public string GetPermissionsByID(int id)
        {
            try
            {
                int OfferID = OfferRepo.GetByID(id).ElementAt(0).OfferID;

                Permission? result = PermissionRepo.GetByID(OfferID).Find(x => x.OfferID == OfferID);
                var json = JsonSerializer.Serialize(result);
                return json;
            }
            catch (Exception e)
            {
                return "Error, geen permissions gevonden.";
            }
        }

        /// <summary>
        /// Gets all permissions that the user has
        /// </summary>
        /// <param name="id">id of user</param>
        /// <returns>list of permission items in json format</returns>
        [HttpGet]
        [ActionName("permission/for-employer")]
        public string GetPermissionsByEmployer(int id)
        {
            List<Permission> result = PermissionRepo.GetByEmployer(id);
            var json = JsonSerializer.Serialize(result);

            return json;
        }


    }
}
