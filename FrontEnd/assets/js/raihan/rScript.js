$(document).ready(function(){

	$("#fullname").change(function(){

		if($("#fullname").val()=="")
		{
			$("#nameErr").html("* Provide your Full Name");

		}
		else
		{
			$("#nameErr").html("");
	


		}
		
	});
		$("#address").change(function(){

		if($("#address").val()=="")
		{
			
			$("#addErr").html("* Provide your Email Address");
	

		}
		else
		{
			$("#addErr").html("");
			
		}
	
	});
		$("#phone").change(function(){

			
		if($("#phone").val()=="")
		{
			$("#numErr").html("* Provide your mobile number");


		}
		else
		{
			
		$("#numErr").html("");
		

		
		}
		
	});
		$("#acc").change(function(){

		
		if($("#acc").val()=="")
		{
			$("#accErr").html("* Provide your Account Number");
		}
		else
		{

	
			
		$("#accErr").html("");
	
		}
	
	});
		$("#bal").change(function(){


		if($("#bal").val()=="")
		{
			$("#balErr").html("* Provide your Account Balance");
		}
		else if($("#bal").val()<0)
		{
			flag="invalid";
			$("#balErr").html("* Account Balance Can not be negetive");
		}
		else
		{

		$("#balErr").html("");
	
			
		}
	});

	$("#registerbtn").click(function(){
		clear();
		var res=validateInfo();
		if(res=="valid")
		{
			createInformation();

          
		}


	});



function createInformation()
{
	
	$.ajax({
			url:"http://localhost:11917/api/informations/",
			method:"post",
			headers:{
				contentType:"application/json"
			},
			data:{
				"fullName":$("#fullname").val(),
				"address":$("#address").val(),
				"phone":$("#phone").val(),
				"accNumber":$("#acc").val(),
				"balance":$("#bal").val(),
				"workPosition":$("#wp").val(),
				"userType":$("#userType").html(),
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==201)
				{
					alert("Registered Successfully");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
					clearVal();
					location.href = 'page-login.html';
				}
				else
				{
					
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}


function clear()
	{
		$("#nameErr").html("");
		$("#addErr").html("");
		$("#accErr").html("");
		$("#balErr").html("");
		$("#numErr").html("");
		$("#posErr").html("");


	}
	function clearVal()
	{
		$("#fullname").val("");
		$("#address").val("");
		$("#phone").val("");
		$("#acc").val("");
		$("#bal").val("");
       
	
	}


   function validateInfo()
   {
   	var flag="valid";
   
   		if($("#fullname").val()=="")
		{
			flag="invalid";
			$("#nameErr").html("* Provide your Full Name");
		}
		
		if($("#address").val()=="")
		{
			flag="invalid";
			$("#addErr").html("* Provide your Email Address");
		}
		
		if($("#acc").val()=="")
		{
			flag="invalid";
			$("#accErr").html("* Provide your Account Number");
		}
		
		if($("#bal").val()=="")
		{
			flag="invalid";
			$("#balErr").html("* Provide your Account Balance");
		}
		if($("#bal").val()=="")
		{
			flag="invalid";
			$("#balErr").html("* Provide your Account Balance");
		}
		if($("#bal").val()<0)
		{
			flag="invalid";
			$("#balErr").html("* Account Balance Can not be negetive");
		}
		
		if($("#phone").val()=="")
		{
			flag="invalid";
			$("#numErr").html("* Provide your mobile number");
		}
		
	
     
		
		
		if($("#wp").val()==null)
		{
			flag="invalid";
			$("#posErr").html("* Select your work position");

		}
		
		

		return flag;
   }





	
});