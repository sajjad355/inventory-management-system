$(document).ready(function(){

	categoryListLoad();
	$("#edtCategorydiv").hide();
	
	$("#saveCatBtn").hide();
	
	

$("#createBtn").click(function(){
	var res;
	clearCreateErr();

	res=validCreateOperation();

	if(res=="valid")
	{
		createCategory();
	
	}

});


$("#saveCatBtn").click(function(){

   var res;
	clearCreateErr();

	res=validEditOperation();

	if(res=="valid")
	{
		editCategory();
	}



});

function editCategory()
{
	
	$.ajax({
			url:"http://localhost:11917/api/categories/"+ $("#catId").html(),
			method:"put",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},
			data:{
				categoryName:$("#editCatname").val()
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					alert("Category edited");
					$("#saveCatBtn").hide();
					$("#edtCategorydiv").hide();
				
					$("#editCatname").val("");
					categoryListLoad();
			
				}
				else
				{
					$("#editMsg").html("Error");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function createCategory()
{
	$.ajax({
			url:"http://localhost:11917/api/categories/",
			method:"post",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},
			data:{
				categoryName:$("#createCatname").val()
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==201)
				{
					alert("Category created");
					$("#createCatname").val("");
					categoryListLoad();

				}
				else
				{
					$("#createMsg").html("Error");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function validCreateOperation()
{
	var flag="valid";

	if($("#createCatname").val()=="")
	{
		$("#crtCatErr").html("* Provide Category Name!");
		flag="invalid";
	}




	return flag;
}

function validEditOperation()
{
	var flag="valid";

	if($("#editCatname").val()=="")
	{
		$("#edtCatErr").html("* Can not empty!");
		flag="invalid";
	}




	return flag;
}
function clearCreateErr()
{
	$("#crtCatErr").html("");
	$("#edtCatErr").html("");
}

	


	
});