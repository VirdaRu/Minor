using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS;
using MySqlX.XDevAPI.Common;
using REST_API.Model;
using REST_API.Repository;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web.Http.Results;
using System.Xml.Linq;

namespace REST_API.Controller
{
    [ApiController]
    [Route("api/[action]")]
    public class ResumeController
    {
        public static ResumeRepository ResumeRepo = new ResumeRepository();
        public static PermissionRepository PermissionRepo = new PermissionRepository();
        public static OfferRepository OfferRepo = new OfferRepository();

        public static List<Resume> resumeCollection = new List<Resume>();

        /// <summary>
        /// Adds resume to the database
        /// </summary>
        /// <param name="resume">resume item to be added</param>
        [HttpPost]
        [ActionName("resume")]
        public void Add([FromBody] Resume resume)
        {
            //resumeCollection.Add(resume);
            ResumeRepo.Add(resume);
        }

        /// <summary>
        /// Deletes resume item with corresponding id
        /// </summary>
        /// <param name="id">id of resume item to be deleted</param>
        [HttpDelete]
        [ActionName("resume")]
        public void Delete(int id)
        {
            ResumeRepo.Delete(id);
        }

        /// <summary>
        /// Updates a resume item with corresponding id
        /// </summary>
        /// <param name="updatedResume">The updated resume</param>
        /// <param name="id">The corresponding id of resume</param>
        [HttpPut]
        [ActionName("resume")]
        public void Update(Resume updatedResume, int id)
        {
            ResumeRepo.Update(updatedResume, id);
        }

        /// <summary>
        /// Full list of all resume items in database
        /// </summary>
        /// <returns>list of resumes in json format</returns>
        [HttpGet]
        [ActionName("resume/full-resume-list")]
        public string GetResumeList()
        {
            resumeCollection = ResumeRepo.Get();
            var json = JsonSerializer.Serialize(resumeCollection);
            return json;
        }

        /// <summary>
        /// Gets censored resume from user with corresponding userid
        /// </summary>
        /// <param name="userID">id of resume owner</param>
        /// <returns>PDF file in bytestream</returns>
        [HttpGet]
        [ActionName("resume")]
        public IActionResult GetResumeByID(int offerID)
        {
            
            List<Resume> resume = ResumeRepo.GetByID(offerID);

            var stream = new FileStream(Path.Combine(Environment.CurrentDirectory, resume[0].CensoredResume), FileMode.Open);

            return new FileStreamResult(stream, "application/pdf");

        }

        /// <summary>
        /// Decides whether the full resume or censored resume should be gotten
        /// </summary>
        /// <param name="offerID">offerID to get resume from</param>
        /// <param name="userID">Id of user attempting to view Resume</param>
        /// <returns>full or censored resume depending on user's permissions</returns>
        [HttpGet]
        [ActionName("resume/for-offer")]
        public IActionResult GetResumeByOfferID(int offerID, int userID)
        {
            int userOfferID = OfferRepo.UserHasOffer(userID);
            //Get Resume Item by corresponding offerID
            List<Resume> resume = ResumeRepo.GetByID(offerID);

            //If person is the owner of resume show full resume
            if (offerID == userOfferID)
            {
                Console.WriteLine("You own this resume!");
                var Fullstream = new FileStream(Path.Combine(Environment.CurrentDirectory, resume[0].FullResume), FileMode.Open);
                return new FileStreamResult(Fullstream, "application/pdf");
            }

            //Look whether user has permission to view full resume
            foreach (var permission in PermissionRepo.GetByEmployer(userID))
            {
                //if the user has permission, resume will be shown in full
                if (permission.OfferID == offerID)
                {
                    Console.WriteLine("User has permission for this resume");
                    var Fullstream = new FileStream(Path.Combine(Environment.CurrentDirectory, resume[0].FullResume), FileMode.Open);
                    return new FileStreamResult(Fullstream, "application/pdf");
                }
            }
            Console.WriteLine("User has no permission for this resume");

            var Filestream = new FileStream(Path.Combine(Environment.CurrentDirectory, resume[0].CensoredResume), FileMode.Open);
            return new FileStreamResult(Filestream, "application/pdf");
        }

        /// <summary>
        /// Gets Full Resume by userID
        /// </summary>
        /// <param name="userID">ID of user that owns a resume</param>
        /// <returns>full resume pdf in bytestream</returns>
        [HttpGet]
        [ActionName("resume/full-resume")]
        public IActionResult GetFullResumeByOfferID(int userID)
        {
            int offerID = OfferRepo.UserHasOffer(userID);

            List<Resume> resume = ResumeRepo.GetByID(offerID);


            var Fullstream = new FileStream(Path.Combine(Environment.CurrentDirectory, resume[0].FullResume), FileMode.Open);
            return new FileStreamResult(Fullstream, "application/pdf");
        }

        /// <summary>
        /// Checks whether user has a resume
        /// </summary>
        /// <param name="userID">id of user to check</param>
        /// <returns>0 if user has no resume, else 1</returns>
        [HttpGet]
        [ActionName("resume/user-has-resume")]
        public int GetUserHasResume(int userID)
        {
            //int offerID = OfferRepo.UserHasOffer(userID);
            //return ResumeRepo.GetByID(offerID).Count;

            return 1;
        }

        /// <summary>
        /// Add resume to filesystem, and the database
        /// </summary>
        /// <param name="file">file to be added to database</param>
        /// <param name="userID">id of user that owns the resume</param>
        /// <param name="offerID">offerid connected to the resume</param>
        /// <returns>1 if transmission was successful, else 0</returns>
        public int AddTest(IFormFile file, int userID, int offerID)
        {
            Resume resume = new Resume();

            var File = file;
            //System.Console.WriteLine(File.FileName + File.ContentType + " " + userID);

            if (File.ContentType == "application/pdf")
            {
                if (file.Length > 0)
                {
                    // haal slashes uit de filenaam
                    //string untrustedFileName = Path.GetFileName(File.FileName);
                    string localFilePath = @"PDF-testopslag\" + userID + ".pdf";
                    string filePath = Path.Combine(Environment.CurrentDirectory, localFilePath);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                    {
                        File.CopyTo(fileStream);
                        fileStream.Close();
                    }
                    resume.FullResume = localFilePath;
                    resume.CensoredResume = localFilePath;
                    resume.OfferID = offerID;
                   // System.Console.WriteLine("add");

                    ResumeRepo.Add(resume);
                    // zet filepath en andere data in database

                }
                return 1;
            }

            return 0;
        }

        /// <summary>
        /// Update already existing resume in filesystem, and in the database
        /// </summary>
        /// <param name="file">file to be added to database</param>
        /// <param name="userID">id of user that owns the resume</param>
        /// <param name="offerID">offerid connected to the resume</param>
        /// <returns>1 if transmission was successful, else 0</returns>
        public int UpdateTest(IFormFile file, int userID, int offerID)
        {
            Resume resume = new Resume();

            System.Console.WriteLine(file.FileName + file.ContentType + " " + userID);


            if (file.ContentType == "application/pdf")
            {
                if (file.Length > 0)
                {
                    // haal slashes uit de filenaam
                    string untrustedFileName = Path.GetFileName(file.FileName);
                    string localFilePath = @"PDF-testopslag\" + userID + ".pdf";
                    string filePath = Path.Combine(Environment.CurrentDirectory, localFilePath);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                    {
                        file.CopyTo(fileStream);
                        fileStream.Close();
                    }
                    resume.FullResume = localFilePath;
                    resume.CensoredResume = localFilePath;
                    resume.OfferID = offerID;
                    System.Console.WriteLine("update");

                    ResumeRepo.Update(resume, offerID);
                    // zet filepath en andere data in database

                }
                return 1;
            }

            return 0;
        }

        /// <summary>
        /// Check whether the file is too big in size to be added to database 
        /// </summary>
        /// <param name="file">file that needs to be checked</param>
        /// <returns>2 if file is too big, 1
        /// if size is right and in pdf format
        /// else 0</returns>
        [HttpPost]
        [ActionName("resume/check")]
        public int CheckFile(IFormFile file)
        {
            // do checks on file before uploading to server
            var File = file;
            int maxSize = 2000000;
            // size check can use different value
            if (File.Length > maxSize)
            {
                return 2;
            }

            if (File.ContentType == "application/pdf")
            {
                return 1;
            }

            return 0;
        }

        /// <summary>
        /// redacts resume of owner, with the given words
        /// </summary>
        /// <param name="userID">id of resume owner</param>
        /// <param name="toRedact">Information that needs to be redacted</param>
        /// <returns>200 if successful</returns>
        [HttpGet]
        [ActionName("resume/redact-resume")]
        public int Redact(int userID, string toRedact) 
        {
            string censoredResumeLoc = Redactor.Redact(userID, toRedact);
            int offerIDOfUser = OfferRepo.GetByID(userID)[0].OfferID;
            Resume updatedResume =
                new Resume
                {
                    ResumeID = 0,
                    FullResume = $"PDF-testopslag\\{userID}.pdf",
                    CensoredResume = censoredResumeLoc,
                    OfferID = offerIDOfUser
                };
            
            ResumeRepo.Update(updatedResume,offerIDOfUser);
            return 200;
        }
    }
}
