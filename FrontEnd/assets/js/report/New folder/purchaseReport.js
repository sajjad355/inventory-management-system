$(document).ready(function(){

	loadAllPurchases();

  $("#searchBtn").click(function(){
    if($("#dateFrom").val()==="" && $("#dateTo").val()===""){
      alert("Please Fill up Date box");
    }
    else if($("#dateFrom").val()===""){
      dateTo();
    }
    else if($("#dateTo").val()===""){
      dateFrom();
    }
    else{
      dateBetween();
    }
  });

function loadAllPurchases(){
		$.ajax({
			url:"http://localhost:11917/api/report/purchase",
			method:"get",
			headers:{
				contentType:"application/json"
			},
			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					var len=data.length-1;
					for (var i = len; i >=0; i--) {
            str+='<tr>';
            str+='<td>'+data[i].invoice+'</td>';
            str+='<td>'+data[i].product.productName+'</td>';
            str+='<td>'+data[i].information.fullName+'</td>';
            str+='<td>'+data[i].date+'</td>';
            str+='<td>'+data[i].quantity+'</td>';
            str+='<td>'+data[i].newUnitPrice+'</td>';
            str+='<td>'+data[i].totalPrice+'</td>';
						str+='<td>'+data[i].remarks+'</td>';
            str+='</tr>'
					}
						$("#purchaseReport").html(str);
				}
				else
				{
					$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function dateTo(){
  // alert("Date To Called");
		$.ajax({
			url:"http://localhost:11917/api/report/purchase/to/"+$("#dateTo").val(),
			method:"get",
			headers:{
				contentType:"application/json"
			},
			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					var len=data.length-1;
					for (var i = len; i >=0; i--) {
            str+='<tr>';
            str+='<td>'+data[i].invoice+'</td>';
            str+='<td>'+data[i].product.productName+'</td>';
            str+='<td>'+data[i].information.fullName+'</td>';
            str+='<td>'+data[i].date+'</td>';
            str+='<td>'+data[i].quantity+'</td>';
            str+='<td>'+data[i].newUnitPrice+'</td>';
            str+='<td>'+data[i].totalPrice+'</td>';
            str+='</tr>'
					}
						$("#purchaseReport").html(str);
				}
				else
				{
					$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function dateFrom(){
  // alert("Date From Called");
		$.ajax({
			url:"http://localhost:11917/api/report/purchase/from/"+$("#dateFrom").val(),
			method:"get",
			headers:{
				contentType:"application/json"
			},
			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					var len=data.length-1;
					for (var i = len; i >=0; i--) {
            str+='<tr>';
            str+='<td>'+data[i].invoice+'</td>';
            str+='<td>'+data[i].product.productName+'</td>';
            str+='<td>'+data[i].information.fullName+'</td>';
            str+='<td>'+data[i].date+'</td>';
            str+='<td>'+data[i].quantity+'</td>';
            str+='<td>'+data[i].newUnitPrice+'</td>';
            str+='<td>'+data[i].totalPrice+'</td>';
            str+='</tr>'
					}
						$("#purchaseReport").html(str);
				}
				else
				{
					$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}

function dateBetween(){
  // alert("Date Between Called");
		$.ajax({
			url:"http://localhost:11917/api/report/purchase/"+$("#dateFrom").val()+"/"+$("#dateTo").val(),
			method:"get",
			headers:{
				contentType:"application/json"
			},
			data:{
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200)
				{
					var data=xmlHttp.responseJSON;
					var str='';
					var len=data.length-1;
					for (var i = len; i >=0; i--) {
            str+='<tr>';
            str+='<td>'+data[i].invoice+'</td>';
            str+='<td>'+data[i].product.productName+'</td>';
            str+='<td>'+data[i].information.fullName+'</td>';
            str+='<td>'+data[i].date+'</td>';
            str+='<td>'+data[i].quantity+'</td>';
            str+='<td>'+data[i].newUnitPrice+'</td>';
            str+='<td>'+data[i].totalPrice+'</td>';
            str+='</tr>'
					}
						$("#purchaseReport").html(str);
				}
				else
				{
					$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
			}
		});
}
});
