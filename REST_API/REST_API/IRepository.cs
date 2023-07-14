namespace REST_API
{
    //Repository Pattern
    public interface IRepository<T>
    {
        /// <summary>
        /// Method that handles the GET Request
        /// </summary>
        /// <returns>List of desired type</returns>
        List<T> Get();
        /// <summary>
        /// Method that Handles the GET Request with an id parameter
        /// </summary>
        /// <param name="id">id of item that needs to be recieved</param>
        /// <returns>List of desired type</returns>
        List<T> GetByID(int id);

        /// <summary>
        /// Method that handles the POST Request
        /// </summary>
        /// <param name="objectsToAdd">An object of the given type, to be added
        /// to the database</param>
        /// <returns>string response to inform user of status</returns>
        int Add(T objectsToAdd);
        /// <summary>
        /// Method that handles the PUT Request
        /// </summary>
        /// <param name="updatedObject">An object of the given type, to be 
        /// updated in the database</param>
        /// <param name="id">id of the item that ought to be updated</param>
        void Update(T updatedObject, int id);
        /// <summary>
        /// Method that handles the DELETE Request
        /// </summary>
        /// <param name="id">id of the item that needs to be deleted</param>
        void Delete(int id);
    }
}
