
function categoryListLoad()
{
	$.ajax({
			url:"http://localhost:11917/api/categories/",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					for (var i = 0; i < data.length; i++) {
						str+='<tr><td>'+i+'</td> <td>'+data[i].categoryName+'</td><td><button id="'+data[i].id+'" class="btn btn-primary" onclick="editCategory(this.id);">Edit</button></td><td><button id="'+data[i].id+'" onclick="deleteCategory(this.id);" class="btn btn-danger">Delete</button></td></tr>';						
						$("#categoryList").html(str);
					};
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	
		});
}


function categoryListComboLoad()
{
	$.ajax({
			url:"http://localhost:11917/api/categories/",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					str+="<option disabled selected>---Select a category---</option>";

					$("#createCatname").html(str);
					$("#edtCatname").html(str);
					for (var i = 0; i < data.length; i++) {
					str+="<option value="+data[i].id+">"+data[i].categoryName+"</option>";
					$("#createCatname").html(str);
					$("#edtCatname").html(str);
					};
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	
		});
}


function loadProductList()
{
	$.ajax({
			url:"http://localhost:11917/api/products/",
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
					for (var i = 0; i < data.length; i++) {
						str+='<tr><td>'+data[i].productName+'</td> <td>'+data[i].category.categoryName+'</td> <td>'+data[i].price+'</td><td>'+data[i].quantity+'</td><td><button id="'+data[i].id+'" class="btn btn-primary" onclick="editProduct(this.id);">Edit</button>&nbsp<button id="'+data[i].id+'" onclick="deleteProduct(this.id);" class="btn btn-danger">Delete</button></td></tr>';
						$("#proList").html(str);
					};

				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	

		});
}
function editCategory(id)
{
	$.ajax({
			url:"http://localhost:11917/api/categories/"+id,
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					$("#editCatname").val(data.categoryName);
					$("#catId").html(id);
					$("#saveCatBtn").show();
					$("#edtCategorydiv").show();
					console.log(data.categoryName);
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	
		});

}
function deleteCategory(id)
{
	$.ajax({
			url:"http://localhost:11917/api/categories/"+id,
			method:"Delete",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==204)
				{
					alert("Category deleted");
			
					categoryListLoad();
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText+":"+id);
				}
			}	
		});

}
function editProduct(id)
{
	$.ajax({
			url:"http://localhost:11917/api/products/"+id,
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					$("#pId").html(id);
					$("#edtProname").val(data.productName);
					$("#edtCatname").select($("#edtCatname").val(data.categoryId));
					
					$("#edtProPrice").val(data.price);
					$("#edtProQuantity").val(data.quantity);
			       $("#edtBtn").show();
			       $("#edtProductDiv").show();
					console.log(data.productName);
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	
		});

}
function deleteProduct(id)
{
	$.ajax({
			url:"http://localhost:11917/api/products/"+id,
			method:"Delete",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==204)
				{
					alert("Products deleted");
			
					loadProductList();
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText+":"+id);
				}
			}	
		});

}


function newUser(id)
{
	$.ajax({
			url:"http://localhost:11917/api/informations/"+id,
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
			
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;

					var name=data.fullName;
					var add=data.address;

					var idinfo=data.informationId;
					var phn=data.phone;
					var bal=data.balance;

					var acc=data.accNumber;
					var tp=data.workPosition;
					var uname=name+id;
					var per="Valid";
                      console.log(uname);

							$.ajax({
								url:"http://localhost:11917/api/users/",
								method:"post",
								headers:{
											contentType:"application/json",
											Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
										},
								data:{
									"userName":uname,
									"password":acc,
									"type":tp,
									"permission":per,
									"infoId":idinfo,
									"info_InformationId":idinfo
									
								},
								complete:function(xmlHttp,status){
									if(xmlHttp.status==201)
									{
											$.ajax({
											url:"http://localhost:11917/api/informations/"+id,
											method:"put",
											headers:{
														contentType:"application/json",
														Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
													},
											data:{
												"fullName":name,
												"address":add,
												"phone":phn,
												"accNumber":acc,
												"balance":bal,
												"workPosition":tp,
												"userType":tp,
											
											},
											complete:function(xmlHttp,status){
												if(xmlHttp.status==200)
												{
													$("#userDiv").html("");
													$("#workerDiv").html("");
													loadUser();
													loadWorker();
													alert("Succesfully added!")
													
												}
												else
												{
													console.log(xmlHttp.status+":"+xmlHttp.statusText);
												}
											}	
										});
										
									}
									else
									{
										
										console.log(xmlHttp.status+":"+xmlHttp.statusText);
									}
								}
							});
					
				}
				else
				{
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}	
		});

}
function changePermission(id)
{
	$.ajax({
			url:"http://localhost:11917/api/users/"+id,
			method:"GET",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				

			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					
					var data=xmlHttp.responseJSON;

					var uname=data.userName;
					var acc=data.password;
					var tp=data.type;
					var per;
					if(data.permission=="Valid")
					{
						 per="Invalid";
					}
					else
					{
						per="Valid";
					}
					var idinfo=data.infoId;

					


					$.ajax({
											url:"http://localhost:11917/api/users/"+id,
											method:"put",
											headers:{
														contentType:"application/json",
														Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
													},
											data:{
												"userName":uname,
												"password":acc,
												"type":tp,
												"permission":per,
												"infoId":idinfo,
												"info_InformationId":idinfo
											
											},
											complete:function(xmlHttp,status){
												if(xmlHttp.status==200)
												{
													$("#userDiv").html("");
													$("#workerDiv").html("");
													loadUser();
													loadWorker();
													alert("Succesfully Changed!")
													
												}
												else
												{
													console.log(xmlHttp.status+":"+xmlHttp.statusText);
												}
											}	
										});
					
					
				}
				else
				{
					
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
	});

}

function loadUser()
{
		$.ajax({
			url:"http://localhost:11917/api/informations/users",
			method:"GET",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				

			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					
					var data=xmlHttp.responseJSON;
					var str='';
					for (var i = 0; i < data.length; i++) {
						
						str+='<tr><td>'+i+'</td> <td>'+data[i].fullName+'</td><td>'+data[i].address+'</td><td>'+data[i].workPosition+'</td><td>'+data[i].userType+'</td><td><button id="'+data[i].informationId+'" class="btn btn-primary" onclick="newUser(this.id);">Add</button></td></tr>';						
						$("#userDiv").html(str);
					};
					
				}
				else
				{
					
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
	});
}

function loadWorker()
{
		$.ajax({
			url:"http://localhost:11917/api/users",
			method:"GET",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))
			},
			data:{
				

			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					
					var data=xmlHttp.responseJSON;
					var str='';
					for (var i = 0; i < data.length; i++) {
						
						str+='<tr><td>'+i+'</td> <td>'+data[i].userName+'</td><td>'+data[i].permission+'</td><td>'+data[i].type+'</td><td><button id="'+data[i].id+'" class="btn btn-primary" onclick="changePermission(this.id);">Change Permission</button></td></tr>';						
						$("#workerDiv").html(str);
					};
					
				}
				else
				{
					
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
	});
}

