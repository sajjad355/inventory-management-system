$(document).ready(function(){


	var qua;
	var up;
	var PN;
    var a;
	var flag;
	var flag1=0;
	var updateQuantity;
	$("#Productdiv").hide();
	$("#Registrationdiv").hide();
	$("#Salediv").hide();
	ComboSelectLoadCategory();
    ComboSelectLoadSaler();
	$("#Invoice").change(function()
	{
		CheckInvoice();
	});
	
	
	$("#Addsalerdiv").click(function(){
			
       $("#Registrationdiv").slideDown(1000);
	   	$("#Productdiv").hide();
			$("#Salediv").hide();

	});
	
	
	
	$("#fName").change(function()
	{
     $("#namemess").html("");
	});
	
	$("#address").change(function()
	{
     $("#addmess").html("");
	});
		$("#phone").change(function()
	{
     $("#phonemess").html("");
	});
	
	$("#acc").change(function()
	{
     $("#accmess").html("");
	});
	
	
	
	$("#SQ").change(function()
	{
     $("#SQmess").html("");
	});
	
	$("#UN").change(function()
	{
     $("#UNmess").html("");
	});
		$("#Expiredate").change(function()
	{
     $("#Expiredatemess").html("");
	});
	
	$("#remarks").change(function()
	{
     $("#remarksmess").html("");
	});
	
	
	
	$("#selectsaler").change(function()
	{
	if($("#selectsaler").val()==null ||	$("#Invoice").val()=="")
	{
		
	}
	else{
	$("#Productdiv").slideDown(1000);
	$("#Registrationdiv").hide();
	
	}
	});
	
	
		$("#Invoice").change(function()
	{
	if($("#selectsaler").val()==null ||	$("#Invoice").val()=="")
	{
		
	}
	else{
	$("#Productdiv").slideDown(1000);
		$("#Registrationdiv").hide();
	
	}
	});
	

	
	
	$("#proselect").change(function()
	{
	if($("#proselect").val()==null)
	{
		
	}
	else{
	$("#Salediv").slideDown(1000);
		$("#Registrationdiv").hide();
	}
	});
	
	
	$("#UN").change(function()
	{
	if($("#UN").val()>0 && $("#SQ").val()>0 )
	{
    $("#TPmess").html("");
	}
	});
	
	$("#SQ").change(function()
	{
	if($("#UN").val()>0 && $("#SQ").val()>0 )
	{
    $("#TPmess").html("");
	}
	});
	
	
	
	
	$("#submitBtn").click(function(){
		
				flag=0;
      	if($("#SQ").val()=="")
		{
           $("#SQmess").html("Enter quantity!");
		   flag=1;
		}
		
		if($("#UN").val()=="")
		{
           $("#UNmess").html("Enter unit price!");
		   		   flag=1;
		}
		
		if($("#Expiredate").val()=="")
		{
           $("#Expiredatemess").html("Enter expire date!");
		   		   flag=1;
		}
		if($("#TP").html()==0)
		{
           $("#TPmess").html("Total price can not zero !");
		   flag=1;
		}


		if(flag==0)
		{
		createsaletransaction();
		UpdateProductQuantity();
		}
	});
	
	$("#Registrationsubmit").click(function(){
		
		flag1=0;
		if($("#fName").val()=="")
		{
           $("#namemess").html("First name can not empty!");
		   flag1=1;
		}
		if($("#address").val()=="")
		{
           $("#addmess").html("Address can not empty!");
		   		   flag1=1;
		}
		if($("#phone").val()=="")
		{
           $("#phonemess").html("Phone number can not empty!");
		   		   		   flag1=1;
		}
		if($("#acc").val()=="")
		{
           $("#accmess").html("Account number can not empty!");
		   		   		   flag1=1;
		}

		if(flag1==0)
		{
        createsalerinformation();
		}

	});
	

function createsaletransaction()
{
			
	$.ajax({
			url:"http://localhost:11917/api/sales/",
			method:"post",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				invoice:$("#Invoice").val(),
		        date:$("#currentdate").html(),
            	expireDate:$("#Expiredate").val(),
		        quantity:$("#SQ").val(),
				preUnitPrice:$("#Aprice").html(),
		        remarks:$("#remarks").val(),
            	newUnitPrice:$("#UN").val(),
		        totalPrice:$("#TP").html(),
                informationId:$("#selectsaler").val(),			
		        catagoryId:$("#catselect").val(),
            	productId:$("#proselect").val(),
		        category_Id:$("#catselect").val()
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
                alert("Successfully Sold this Product!");
				$("#Invoice").val("");
            	$("#Expiredate").val("");
		        $("#SQ").val("");
				$("#Aprice").html("Available Price");
				$("#Aquantity").html("Available Quantity");
		        $("#remarks").val("");
            	$("#UN").val("");
		        $("#TP").html("Total Price");
                $("#selectsaler").val("");			
		        $("#catselect").val("");
            	$("#proselect").val("");
		        $("#catselect").val("");
					
				}
				else
				{
                  console.log(xmlHttp.status);
				}
			}
		});
}






function createsalerinformation()
{
			
	$.ajax({
			url:"http://localhost:11917/api/informations",
			method:"post",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				fullName:$("#fName").val(),
		        address:$("#address").val(),
            	phone:$("#phone").val(),
		        accNumber:$("#acc").val(),
				balance:$("#balance").val(),
		        workPosition:$("#WP").val(),
            	userType:$("#UT").val()
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==201)
				{
             alert("New saler Added!");
			$("#fName").val("");
			$("#address").val("");
			$("#acc").val("");
			$("#phone").val("");
			$("#namemess").html("");
		    $("#addmess").html("");
			$("#accmess").html("");
		    $("#phonemess").html("");
					ComboSelectLoadSaler();
					$("#Registrationdiv").slideUp("slow");;
					
				}
				else
				{
                  console.log(xmlHttp.status);
				}
			}
		});
}






function UpdateProductQuantity()
{
	updateQuantity=$("#Aquantity").html() -$("#SQ").val();    
     a="#"+$("#proselect").val();

	
	
	$.ajax({
			url:"http://localhost:11917/api/products/"+$("#proselect").val(),
			method:"put",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				productName:$(a).html(),
				price:$("#Aprice").html(),
				quantity:updateQuantity,
				categoryId:$("#catselect").val()
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{

						   	$("#Productdiv").hide();
							$("#Salediv").hide();
							$("#Registrationdiv").hide();
					

				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}


	
function CheckInvoice()
{
	$.ajax({
			url:"http://localhost:11917/api/sales/"+ $("#Invoice").val(),
			method:"Get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{

			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
                    alert("Invoice is used!");
					$("#Invoice").val("");
						$("#Productdiv").hide();
				}
				else
				{
                  console.log(xmlHttp.status);
				}
			}
		});
}


$("#catselect").change(function()
{
		$.ajax({
			url:"http://localhost:11917/api/categories/"+$("#catselect").val()+"/products",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
                	str+="<option selected disabled>Please select a Product</option> ";
              	    $("#proselect").html(str);
					for (var i = 0; i < data.length; i++) {

                        str+="<option value="+data[i].id+" id="+data[i].id+"> "+data[i].productName+" </option>";
						
		            	$("#proselect").html(str);

					};
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
	
});

$("#proselect").change(function()
{
			$.ajax({
			url:"http://localhost:11917/api/products/"+$("#proselect").val(),
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
						
		            	$("#Aquantity").html(data.quantity);
						qua=data.quantity;
                    	$("#Aprice").html(data.price);
						
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
});

$("#SQ").change(function()
{
 	if(qua<$("#SQ").val())
	{
		
		alert("Exceed maximum quantity!","Alert!");
		$("#SQ").val(0);
	}
	
	 if($("#SQ").val()<0)
	{
		
		alert("Quantity can not negative!");
		$("#SQ").val(0);
	}
		
});

$("#UN").change(function()
{
	 if($("#UN").val()<0)
	{
		
		alert("Unit price can not negative!");
		$("#UN").val(0);
	}
		
});






$("#UN").change(function()
{


var a=$("#SQ").val()*$("#UN").val();
$("#TP").html(a);

		
});


$("#SQ").change(function()
{


var a=$("#SQ").val()*$("#UN").val();
$("#TP").html(a);

		
});

function ComboSelectLoadSaler()
{
	$.ajax({
			url:"http://localhost:11917/api/informations/salers",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
                 	str+="<option selected disabled>Please select a Saler</option> ";
                 	$("#selectsaler").html(str);

					for (var i = 0; i < data.length; i++) {

                        str+='<option value='+data[i].informationId+'> '+data[i].fullName+' </option>';						
		            	$("#selectsaler").html(str);

					};
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}

function ComboSelectLoadCategory()
{
	$.ajax({
			url:"http://localhost:11917/api/categories/",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
                 	str+="<option selected disabled>Please select a Category</option> ";
                 	$("#catselect").html(str);

					for (var i = 0; i < data.length; i++) {

                        str+='<option value='+data[i].id+'> '+data[i].categoryName+' </option>';						
		            	$("#catselect").html(str);

					};
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}


function ComboSelectLoadProduct()
{
	$.ajax({
			url:"http://localhost:11917/api/categories/"+id+"/products",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
                	str+="<option selected disabled>Please select a Product</option> ";
              	    $("#proselect").html(str);
					for (var i = 0; i < data.length; i++) {

                        str+="<option value="+data[i].id+"> "+data[i].productName+" </option>";
						
		            	$("#proselect").html(str);

					};
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}




	
});