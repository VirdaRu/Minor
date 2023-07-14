using Dapper;
using MySql.Data.MySqlClient;
using REST_API.Model;

namespace REST_API.Repository
{
    public class ResumeRepository : IRepository<Resume>
    {
        /// <summary>
        /// Using a single instance to connect to database.
        /// </summary>
        public static MySqlConnection con = DBConnection.getInstance()
                                                  .GetConnectionMSQL();

        public int Add(Resume resume)
        {
            string Query = $@"INSERT INTO Resume(
                            FullResume, CensoredResume, OfferID)
                            VALUES (@FullResume, @CensoredResume, @OfferID);";

            con.QueryFirstOrDefault<Resume>(Query,
                new
                {
                    FullResume = resume.FullResume,
                    CensoredResume = resume.CensoredResume,
                    OfferID = resume.OfferID
                });
            con.Close();
            return 200;
        }

        public void Delete(int id)
        {
            string Query = $@"DELETE FROM Resume
                              WHERE ResumeID = @ResumeID";

            con.Execute(Query, new { ResumeID = id });
            con.Close();
        }

        public List<Resume> Get()
        {
            string Query = $@"SELECT * FROM Resume;";

            List<Resume> ResumeList = con.Query<Resume>(Query).ToList();
            con.Close();
            return ResumeList;
        }

        public List<Resume> GetByID(int id)
        {
            Console.WriteLine("2");
            string Query = $@"SELECT * FROM Resume
                              WHERE OfferID = @id;";

            IEnumerable<Resume> UsersList = con.Query<Resume>(Query, new
            {
                id
            });
            con.Close();
            return UsersList.ToList();
        }

        public void Update(Resume updatedResume, int id)
        {
            string Query = $@"UPDATE Resume SET
                             FullResume = @FullResume,
                             CensoredResume = @CensoredResume
                             WHERE OfferID = @OfferID";

            con.Execute(Query,
                            new
                            {
                                FullResume = updatedResume.FullResume,
                                CensoredResume = updatedResume.CensoredResume,
                                OfferID = id
                            });
            con.Close();
        }
    }
}
