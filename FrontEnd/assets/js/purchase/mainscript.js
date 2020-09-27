$(document).ready(function(){

	loadAll();

	$("#submitBtn").click(function(){
		createPurchase();
	});

	$("#addSupplier").click(function(){
		addSupplier();
	});

	$("#invoiceNo").focusout(function(){
			invoiceIsUnique();
			openProductSelection();

	});

	$("#supplierSelection").change(function(){
		openProductSelection();
	});

	$("#categorySelection").change(function(){
		openPurchaseDetails();
		loadProducts()
	});

	$("#productSelections").change(function(){
		openPurchaseDetails();
		loadPurchaseDetails()
		// alert($("#categorySelection").val());
	});

	$("#quantity").keyup(function(){
			calTotalPrice();
	});

	$("#unitPrice").keyup(function(){
		calTotalPrice();
	});

function invoiceIsUnique(){
	var invoice=$("#pInvoiceNo").html()+$("#invoiceNo").val();
	// alert(invoice);
	$.ajax({
			url:"http://localhost:11917/api/purchases/checkInvoice",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password")),
			},
			data:{
				invoice:invoice
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					//alert(data);
					// var str='';
					// var len=data.length-1;
					if(data==null){
						openProductSelection();
					}
					else{
						$('#invoiceError').empty().show().html("Invoice number Used !").delay(1000).fadeOut(10);
						$("#invoiceNo").val("");
						openProductSelection();
					}
				}
		}
		});
	// $.ajax({
	// 		url:"http://localhost:11917/api/purchases/checkInvoice/"+invoice,
	// 		method:"get",
	// 		headers:{
	// 			contentType:"application/json"
	// 		},
	// 		data:{
	// 		},
	// 		complete:function(xmlHttp,status){
	// 			if(xmlHttp.status==200)
	// 			{
	// 				var data=xmlHttp.responseJSON;
	// 				alert(data);
	// 				// var str='';
	// 				// var len=data.length-1;
	// 				if(data==null){
	// 					return true;
	// 				}
	// 				else{
	// 					$('#invoiceError').empty().show().html("Invoice number Used !").delay(1000).fadeOut(10);
	// 					$("#invoiceNo").val("");
	// 					return false;
	// 				}
	// 			}
	// 			else
	// 			{
	// 				return false;
	// 			}
	// 		}
	// 	});
}

function createPurchase(){
	if(allFilledUp())
	{
		$.ajax({
				url:"http://localhost:11917/api/purchases",
				method:"post",
				headers:{
					contentType:"application/json",
					Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},

				data:{
					date:$("#todayDate").html(),
					invoice:$("#pInvoiceNo").html()+$("#invoiceNo").val(),
					expireDate:$("#expDate").val(),
					quantity:$("#quantity").val(),
					preUnitPrice:$("#pUnitPrice").html(),
					remarks:$("#remarks").val(),
					newUnitPrice:$("#unitPrice").val(),
					totalPrice:$("#totalPrice").html(),
					informationId:$("#supplierSelection").val(),
					catagoryId:$("#categorySelection").val(),
					productId:$("#productSelections").val()
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==200)
					{
						$('#createMsg').empty().show().html("Successfully Purchased").delay(1000).fadeOut(10);
						location.reload();
					}
					else
					{
						$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
	}
}

function openProductSelection(){

	if($("#invoiceNo").val()!="" && $("#supplierSelection").val()!="")
	{
		// document.getElementById("purchaseDetails").style.visibility = "visible";
		document.getElementById("productSelection").style.visibility = "visible";
	}
	else{
		// document.getElementById("purchaseDetails").style.visibility = "hidden";
		document.getElementById("productSelection").style.visibility = "hidden";
	}
}

function openPurchaseDetails(){
	if($("#categorySelection").val()!="" && $("#productSelections").val()!="")
	{
		document.getElementById("purchaseDetails").style.visibility = "visible";
		// document.getElementById("productSelection").style.visibility = "visible";
	}
	else{
		document.getElementById("purchaseDetails").style.visibility = "hidden";
		// document.getElementById("productSelection").style.visibility = "hidden";
	}
}

function loadProducts(){
	$.ajax({
			url:"http://localhost:11917/api/purchases/products/"+$("#categorySelection").val(),
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},

			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					var len=data.length-1;
					str+='<option value="">Please select a Product</option>';
					for (var i = len; i >=0; i--) {
						str+='<option value="'+data[i].id+'">'+data[i].productName+'</option>';
					}
						$("#productSelections").html(str);
				}
				else
				{
					// $('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function loadPurchaseDetails(){
	$.ajax({
			url:"http://localhost:11917/api/purchases/products/"+$("#productSelections").val()+"/details",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},

			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					$("#aQuantity").html(data.aQuantity);
					$("#pUnitPrice").html(data.pUnitPrice);
				}
				else
				{
					// $('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function calTotalPrice(){
	if($("#unitPrice").val()!="" && $("#quantity").val()!="")
	{
		$("#totalPrice").html($("#unitPrice").val()*$("#quantity").val());
	}
	else{
		$("#totalPrice").html("0");
	}
}

function allFilledUp(){
	if($("#quantity").val()!=""){
		if($("#unitPrice").val()!=""){
			if($("#expDate").val()!=""){
				if($("#quantity").val()>=1){
					if($("#unitPrice").val()>=1){
					return true;
					}
					else {
						$('#errorForUnitPrice').empty().show().html("Min quantity is 1").delay(2000).fadeOut(10);
					}
				}
				else{
					$('#errorForQuantity').empty().show().html("Min quantity is 1").delay(2000).fadeOut(10);
				}
			}
			else{
				$('#errorForExpDate').empty().show().html("Please Enter expDate").delay(2000).fadeOut(10);
			}
		}
		else{
			$('#errorForUnitPrice').empty().show().html("Please Enter Unit Price").delay(2000).fadeOut(10);
		}
	}
	else{
		$('#errorForQuantity').empty().show().html("Please Enter Quantity").delay(2000).fadeOut(10);
	}
}

function loadAll(){
		$.ajax({
			url:"http://localhost:11917/api/purchases/suppliers",
			method:"get",
			headers:{
				contentType:"application/json",
				Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},

			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					var len=data.length-1;
					str+='<option value="">Please select</option>';
					for (var i = len; i >=0; i--) {
						str+='<option value="'+data[i].informationId+'">'+data[i].fullName+'</option>';
					}
						$("#supplierSelection").html(str);
				}
				else
				{
					$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});

		$.ajax({
				url:"http://localhost:11917/api/categories",
				method:"get",
				headers:{
					contentType:"application/json",
					Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},

				data:{
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==200)
					{
						var data=xmlHttp.responseJSON;
						var str='';
						var len=data.length-1;
						str+='<option value="">Please select a Category</option>';
						for (var i = len; i >=0; i--) {
							str+='<option value="'+data[i].id+'">'+data[i].categoryName+'</option>';
						}
							$("#categorySelection").html(str);
					}
					else
					{
						// $('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
}


function addSupplier(){
		$.ajax({
				url:"http://localhost:11917/api/purchases/addSupplier",
				method:"post",
				headers:{
					contentType:"application/json",
					Authorization:"Basic "+btoa(sessionStorage.getItem("userName")+":" + sessionStorage.getItem("password"))			},
				
				data:{
					fullName:$("#fullName").val(),
					phone:$("#phone").val(),
					address:$("#address").val(),
					accNumber:$("#accNumber").val(),
					balance:$("#balance").val()
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==200)
					{
						alert("Successfully Add New Supplier");
						document.getElementById("addSupplierModal").style.display = "none";
						loadAll();
					}
					else
					{
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
}



var modal = document.getElementById("addSupplierModal");

// Get the button that opens the modal
var btn = document.getElementById("addSupplierBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("addSupplierModalclose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

});
