using Dapper;
using MySql.Data.MySqlClient;
using REST_API.Model;
using System;

namespace REST_API.Repository
{
    public class MessageRepository : IRepository<Message>
    {
        /// <summary>
        /// Using a single instance to connect to database.
        /// </summary>
        public static MySqlConnection con = DBConnection.getInstance().GetConnectionMSQL();

        public int Add(Message message)
        {
            string Query = $@"INSERT INTO Message(
                            JobSeekerID, EmployerID, Subject, Message)
                            VALUES (@JobSeekerID, @EmployerID, @Subject, @Message);";

            con.QueryFirstOrDefault<Message>(Query,
                new
                {
                    JobSeekerID = message.JobSeekerID,
                    EmployerID = message.EmployerID,
                    Subject = message.Subject,
                    Message = message.message
                });
            con.Close();
            return 200;
        }

        public void Delete(int id)
        {
            string Query = $@"DELETE FROM Message
                              WHERE MessageID = @MessageID";

            con.Execute(Query, new { MessageID = id });
            con.Close();
        }

        public List<Message> Get()
        {
            string Query = $@"SELECT * FROM Message;";
            List<Message> Messages = con.Query<Message>(Query).ToList();
            con.Close();
            return Messages;
        }

        public List<Message> GetByID(int id)
        {
               string Query = $@"SELECT * FROM Message 
                              WHERE JobseekerID = @JobSeekerID;";
            IEnumerable<Message> message = con.Query<Message>(Query,
                new
                {
                    JobseekerID = id
                });
            con.Close();
            return message.ToList();
        }

        public void Update(Message updatedObject, int id)
        {
            throw new NotImplementedException();
        }
    }
}
