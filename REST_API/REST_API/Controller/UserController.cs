using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Primitives;
using REST_API.Model;
using REST_API.Repository;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace REST_API.Controller
{
    [ApiController]
    [Route("api/[action]")]
    public class UserController
    {
        public UserRepository UserRepo = new UserRepository();
        public static List<User> userCollection = new List<User>();

        /// <summary>
        /// Gets all the Users
        /// </summary>
        /// <returns>All Users in json format</returns>
        [HttpGet]
        [ActionName("user")]
        public string Get() 
        {
            userCollection = UserRepo.Get();
            var json = JsonSerializer.Serialize(userCollection);
            return json;
        }

        /// <summary>
        /// Add user to the database
        /// </summary>
        /// <param name="users">array of users that needs to be added.</param>
        [HttpPost]
        [ActionName("user")]
        public void Add([FromBody] User[] users)
        {
            foreach (var user in users)
            {
                //userCollection.Add(user);
                UserRepo.Add(user);
            }
        }

        /// <summary>
        /// Add a user to the database that used the social login functionality
        /// </summary>
        /// <param name="user">user to be added to database</param>
        /// <returns>The UserID to start a session for the user</returns>
        [HttpPost]
        [ActionName("user/third-party")]
        public int Add([FromBody]User user)
        {
            //userCollection.Add(user);
            UserRepo.AddUsingThirdParty(user);
            return UserRepo.GetByThirdPartyID(user.ThirdPartyID);
        }

        /// <summary>
        /// Update an already exsisting user by id
        /// </summary>
        /// <param name="user">user to be updated</param>
        /// <param name="id">id of user to be updated</param>
        [HttpPut]
        [ActionName("user")]
        public void Update([FromBody]User user, int id)
        {
            UserRepo.Update(user, id);
        }

        /// <summary>
        /// remove user from database
        /// </summary>
        /// <param name="id">id of the user to be removed</param>
        [HttpDelete]
        [ActionName("user")]
        public void Delete(int id)
        {
            //var element = userCollection.Find(user => user.UserID == id);
            UserRepo.Delete(id);
        }

        /// <summary>
        /// Check whether the combination of email and password exist
        /// </summary>
        /// <param name="email">email of the user to check</param>
        /// <param name="password">password of the user to check</param>
        /// <returns>The User if it exists in, json format </returns>
        [HttpGet]
        [ActionName("user/user-exist")]
        public string UserExist(string email, string password)
        {
            var json = JsonSerializer.Serialize(UserRepo.UserExist(email, password));
            return json;
        }

        /// <summary>
        /// Check whether a user exist with the given email
        /// </summary>
        /// <param name="email">email of the user to check</param>
        /// <returns>user if it exists, in json format</returns>
        [HttpGet]
        [ActionName("user/user-exist-email")]
        public string UserExist(string email)
        {
            var json = JsonSerializer.Serialize(UserRepo.UserExist(email));
            return json;
        }

        /// <summary>
        /// search whether a user exist with the given thirdpartyid
        /// </summary>
        /// <param name="id">third-partyID of user to check</param>
        /// <returns>1 if user with thirdpartyid exists, else 0</returns>
        [HttpGet]
        [ActionName("user/user-with-thirdpartyid")]
        public int UserThirdParty(string id)
        {
            int userfound = UserRepo.GetByThirdPartyID(id);
            if (userfound == 0)
            {
                return 0;
            }

            return userfound;
        }

        /// <summary>
        /// Gets the usertype of the user with the given id
        /// </summary>
        /// <param name="id">id of the user to check</param>
        /// <returns>1 if usertype is employer and 0 if jobseeker</returns>
        [HttpGet]
        [ActionName("user/usertype")]
        public int UserType(int id)
        {
            int isEmployer = UserRepo.GetUsertypeByID(id);

            return isEmployer;

        }
    }
}
