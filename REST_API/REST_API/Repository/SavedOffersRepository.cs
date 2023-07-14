using Dapper;
using MySql.Data.MySqlClient;
using REST_API.Model;

namespace REST_API.Repository
{
    public class SavedOffersRepository : IRepository<SavedOffers>
    {

        /// <summary>
        /// Using à single instance to connect to database.
        /// </summary>
        public static MySqlConnection con = DBConnection.getInstance().GetConnectionMSQL();

        public int Add(SavedOffers offer)
        {
            string Query = $@"INSERT INTO SavedOffers(
                            EmployerID, OfferID)
                            VALUES (@EmployerID, @OfferID);";

            con.QueryFirstOrDefault<SavedOffers>(Query,
                new
                {
                    EmployerID = offer.EmployerID,
                    OfferID = offer.OfferID,
                });
            con.Close();
            return 200;
        }

        public void Delete(int SavedID)
        {
            string Query = $@"DELETE FROM SavedOffers
                              WHERE SavedID = @SavedID";
                             
            con.Execute(Query, new 
            { 
                 SavedID = SavedID,
            });
            con.Close();
        }

        public List<SavedOffers> Get()
        {
            string Query = $@"SELECT * FROM SavedOffers;";
            List<SavedOffers> savedOffers = 
                con.Query<SavedOffers>(Query).ToList();
            con.Close();
            return savedOffers;
        }

        public List<Offer> GetByID(int id)
        {
            string Query = $@"SELECT O.* FROM Offer O
                              INNER JOIN SavedOffers S
                              ON O.OfferID = S.OfferID
                              WHERE S.EmployerID = @id";
            IEnumerable<Offer> savedOffers =
                con.Query<Offer>(Query, new
                {
                    id = id
                }) ;
            con.Close();
            return savedOffers.ToList();
        }

        public int GetByID(int userid, int offerid)
        {
            string Query = $@"SELECT SavedID 
                              FROM SavedOffers
                              WHERE EmployerID = @userid
                              AND OfferID = @offerid";
            int ID = con.ExecuteScalar<int>(Query, new
            {
                userid = userid,
                offerid = offerid
            });
            con.Close();
            return ID;
        }

        public void Update(SavedOffers updatedObject, int id)
        {
            throw new NotImplementedException();
        }


        List<SavedOffers> IRepository<SavedOffers>.GetByID(int id)
        {
            throw new NotImplementedException();
        }
    }
}
