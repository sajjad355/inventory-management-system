$(document).ready(function(){




	$("#back").click(function(){

			location.href = 'index.html';



	});

		$("#send").click(function(){
         if($("#to").val()=="")
		 {
			 alert("Please specify at least one recipient.");
		 }
		 else
		 {
			  if($("#subject").val()=="")
		      {

			 	 alert("Send this message without a subject?");
			 	 sendmail();

		      }
		 else
		 {
      	  sendmail();
		 }
		 }





	    });


function sendmail()
{

	$.ajax({
			url:"http://localhost:11917/api/mails",
			method:"post",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
              mailId:$("#to").val(),
			  subject:$("#subject").val(),
			  body:$("#EmailBody").val()
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
                alert("Successfully send!");
		        $("#to").val("");
			    $("#subject").val("");
			    $("#EmailBody").val("");
				}
				else
				{
                  console.log(xmlHttp.status);
				}
			}
		});
}
});
