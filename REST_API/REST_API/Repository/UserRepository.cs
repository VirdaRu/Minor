using Dapper;
using MySql.Data.MySqlClient;
using REST_API.Model;

namespace REST_API.Repository
{
    public class UserRepository : IRepository<User>
    {

        /// <summary>
        /// Using à single instance to connect to database.
        /// </summary>
        public static MySqlConnection con = DBConnection.getInstance().GetConnectionMSQL();

        public User UserExist(string email, string password)
        {
            string Query = $@"SELECT * FROM Users
                              WHERE EmailAddress = @EmailAddress AND
                              Password = @Password";
            var user = con.QueryFirstOrDefault<User>(Query, new
            {
                EmailAddress = email,
                Password = password
            });

            return user;
        }

        public User UserExist(string email)
        {
            string Query = $@"SELECT * FROM Users
                              WHERE EmailAddress = @EmailAddress";

            var user = con.QueryFirstOrDefault<User>(Query, new
            {
                EmailAddress = email
            });

            return user;
        }

        public List<User> Get()
        {
            string Query = $@"SELECT * FROM Users;";
            List<User> UsersList = con.Query<User>(Query).ToList();
            con.Close();
            return UsersList;
        }

        public int Add(User user)
        {
            if (UserExist(user.EmailAddress) != null)
            {
                return 400;
            }
            else
            {
                string Query = $@"INSERT INTO Users(
                            EmailAddress, Password, PhoneNumber, IsEmployer)
                            VALUES (@EmailAddress, @Password, @PhoneNumber, @IsEmployer);";

                con.QueryFirstOrDefault<User>(Query,
                    new
                    {
                        user.EmailAddress,
                        user.Password,
                        user.PhoneNumber,
                        user.IsEmployer
                    });
                return 200;
            }
        }

        public void AddUsingThirdParty(User user)
        {
            string Query = $@"INSERT INTO Users(
                            EmailAddress, ThirdPartyID, isEmployer)
                            VALUES (@EmailAddress, @ThirdPartyID, @isEmployer);";

            con.QueryFirstOrDefault<User>(Query,
                new
                {
                    user.EmailAddress,
                    user.ThirdPartyID,
                    user.IsEmployer
                });
            //con.Close();
        }

        public void Update(User user, int id)
        {
            string Query = $@"UPDATE Users SET
                             PhoneNumber = @PhoneNumber,
                             Password = @Password
                             WHERE UserID = @UserID";

            con.Execute(Query,
                            new
                            {
                                user.PhoneNumber,
                                user.Password,
                                UserID = id
                            });
            con.Close();
        }

        public void Delete(int id)
        {
            string Query = $@"DELETE FROM Users
                              WHERE UserID = @UserID";

            con.Execute(Query, new { UserID = id });
            con.Close();
        }

        public List<User> GetByID(int id)
        {
            string Query = $@"SELECT * FROM Users WHERE UserID = @UserID;";

            IEnumerable<User> UsersList = con.Query<User>(Query, new
            {
                UserID = id
            });
            con.Close();
            return UsersList.ToList();
        }

        public int GetByThirdPartyID(string id)
        {
            string Query = $@"SELECT UserID FROM Users WHERE ThirdPartyID = @ThirdPartyID;";

            int userid = con.ExecuteScalar<int>(Query, new
            {
                ThirdPartyID = id
            });
            //con.Close();
            return userid;
        }

        public int GetUsertypeByID(int id)
        {
            string Query = $@"SELECT IsEmployer FROM Users WHERE UserID = @UserID;";

            int userid = con.ExecuteScalar<int>(Query, new
            {
                UserID = id
            });
            //con.Close();
            return userid;
        }

    }
}
