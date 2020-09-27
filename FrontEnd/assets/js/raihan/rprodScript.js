$(document).ready(function(){
	$("#edtBtn").hide();
	$("#edtProductDiv").hide();
	loadProductList();
	

	categoryListComboLoad();
	$("#createBtn").click(function(){

		clearCreate();
		var res=validateCreateProduct();
		if(res=="valid")
		{
			createProduct();
		}

	});


	$("#edtBtn").click(function(){
		var res;
	clearEdit();

	res=validateEditProduct();

	if(res=="valid")
	{
		editProduct();
	
	}




	});
function editProduct()
{
	
	$.ajax({
			url:"http://localhost:11917/api/products/"+ $("#pId").html(),
			method:"put",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				productName:$("#edtProname").val(),
					categoryId:$("#edtCatname").val(),
					price:$("#edtProPrice").val(),
					quantity:$("#edtProQuantity").val()
				
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					alert("Product Edited!");
					$("#edtProname").val("");
					$("#edtCatname").val("");
					$("#edtProPrice").val("");
					$("#edtProQuantity").val("");

					loadProductList();
					$("#edtBtn").hide();
					$("#edtProductDiv").hide();
			
				}
				else
				{
					$("#editMsg").html("Error");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}
	
function createProduct()
{
	$.ajax({
			url:"http://localhost:11917/api/products/",
			method:"post",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
					productName:$("#createProname").val(),
					categoryId:$("#createCatname").val(),
					price:$("#createProPrice").val(),
					quantity:$("#createProQuantity").val()
				
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==201)
				{
					alert("Product created");
					$("#createProname").val("");
					$("#createCatname").val("");
					$("#createProPrice").val("");
					$("#createProQuantity").val("");

					loadProductList();

				}
				else
				{
					$("#createMsg").html("Error");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function validateCreateProduct()
{
	var flag="valid";
	if($("#createProname").val()=="")
	{
		$("#createPronameErr").html("* Provide Name");
		flag="invalid";
	}
	if($("#createCatname").val()==null)
	{
		$("#createCatnameErr").html("* Select Category");
		flag="invalid";
	}
	if($("#createProPrice").val()=="")
	{
		$("#createProPriceErr").html("* Provide Price");
		flag="invalid";
	}
	if($("#createProQuantity").val()=="")
	{
		$("#createProQuantityErr").html("* Provide Quantity");
		flag="invalid";
	}
	if($("#createProPrice").val()<=0)
	{
		$("#createProPriceErr").html("* Can not be negetive or 0");
		flag="invalid";
	}
	if($("#createProQuantity").val()<=0)
	{
		$("#createProQuantityErr").html("* Can not be negetive or 0");
		flag="invalid";
	}
	return flag;

}
function validateEditProduct()
{
	var flag="valid";
	if($("#edtProname").val()=="")
	{
		$("#edtPronameErr").html("* Provide Name");
		flag="invalid";
	}
	if($("#edtCatname").val()==null)
	{
		$("#edtCatnameErr").html("* Select Category");
		flag="invalid";
	}
	if($("#edtProPrice").val()=="")
	{
		$("#edtProPriceErr").html("* Provide Price");
		flag="invalid";
	}
	if($("#edtProQuantity").val()=="")
	{
		$("#edtProQuantityErr").html("* Provide Quantity");
		flag="invalid";
	}
	if($("#edtProPrice").val()<=0)
	{
		$("#edtProPriceErr").html("* Can not be negetive or 0");
		flag="invalid";
	}
	if($("#edtProQuantity").val()<=0)
	{
		$("#edtProQuantityErr").html("* Can not be negetive or 0");
		flag="invalid";
	}
	return flag;

}

function clearCreate()
{

		$("#createPronameErr").html("");
	
		$("#createCatnameErr").html("");
	
	
		$("#createProPriceErr").html("");
	
		$("#createProQuantityErr").html("");
}
function clearEdit()
{

		$("#edtPronameErr").html("");
	
		$("#edtCatnameErr").html("");
	
	
		$("#edtProPriceErr").html("");
	
		$("#edtProQuantityErr").html("");
}


});