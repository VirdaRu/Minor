using System.Diagnostics;

namespace REST_API
{
    public class Redactor
    {
        public static string Redact(int userID, string toRedact) 
        {
            
            toRedact = toRedact.Replace(" ", ",");
            
            ProcessStartInfo proc = new ProcessStartInfo();

            // zet hier de path naar je python.exe
            proc.FileName = "C:\\Python310\\python.exe";
            proc.Arguments = Path.Combine(Environment.CurrentDirectory, $"PDFer.py " + $"{userID} \"{toRedact}\"");


            proc.UseShellExecute = false;
            proc.RedirectStandardOutput = true;
            using (Process process = Process.Start(proc))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    Console.WriteLine(result);
                }
            }
            return $"PDF-testopslag\\Censored{userID}.pdf";
        }
    }
}
