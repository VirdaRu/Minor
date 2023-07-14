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
    public class MessageController
    {
        public static MessageRepository MessageRepo = new MessageRepository();

        public static List<Message> messageCollection = new List<Message>();

        /// <summary>
        /// Add message to database
        /// </summary>
        /// <param name="message">message item to be added to database</param>
        [HttpPost]
        [ActionName("message")]
        public void Add([FromBody] Message message)
        {
            //messageCollection.Add(message);
            MessageRepo.Add(message);
        }

        /// <summary>
        /// Deletes a message with corresponding id
        /// </summary>
        /// <param name="id">id of message item to be deleted</param>
        [HttpDelete]
        [ActionName("message")]
        public void Delete(int id)
        {
            MessageRepo.Delete(id);
        }

        /// <summary>
        /// gets all sent messages from database
        /// </summary>
        /// <returns>list of messages in json format</returns>
        [HttpGet]
        [ActionName("message/all-messages")]
        public string GetMessageList()
        {
            messageCollection = MessageRepo.Get();
            var json = JsonSerializer.Serialize(messageCollection);
            return json;
        }

        /// <summary>
        /// gets all messages that the user has received
        /// </summary>
        /// <param name="userid">id of user that received the messages</param>
        /// <returns>list of messages in json format</returns>
        [HttpGet]
        [ActionName("message")]
        public string GetMessageByID(int userid)
        {
            var json = JsonSerializer.Serialize(MessageRepo.GetByID(userid));
            return json;
        }
    }
}
