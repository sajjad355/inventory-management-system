using ATP2_Term_Project.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

 

namespace ATP2_Term_Project.Controllers
{
    public class Email
    {
        public string MailId { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

 

    }
    [RoutePrefix("api/mails")]
    public class MailController : ApiController
    {
        [Route("")]
        [BasicAuthorization]
        public IHttpActionResult Post([FromBody]Email email)
        {

 

                MailMessage m = new MailMessage("sajjadurrahman3434@gmail.com", email.MailId);
                m.Subject = email.Subject;
                m.Body = email.Body;
                m.IsBodyHtml = false;

 

                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;

 

                NetworkCredential nc = new NetworkCredential("sajjadurrahman3434@gmail.com", "Sajjad3434#");
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = nc;
                smtp.Send(m);
                return Ok();

 


        }
    }
}
 