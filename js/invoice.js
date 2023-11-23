function currency(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND';
  }

  function showbilllist() {
    var table = document.getElementById('table-body');
    
    table.innerHTML = '';

    if (localStorage.getItem('bills') === null) {
        var row = '<tr><td colspan=4>Không có đơn hàng nào</td></tr>';
        table.innerHTML = row;
        return false;
    }
    var invoices = JSON.parse(localStorage.getItem('bills'));
    for (var i = 0; i < invoices.length; i++) {
        var invoice = invoices[i];
        var color = (invoice.status === 'Chưa xử lý') ? 'red' : 'green';
        var row = '<tr class="rowShow" onClick="showinfobill(' + invoice.id + ')">' +
        '<td>' + invoice.orderDate + '</td>' +
        '<td>' + invoice.customer.fullName + '</td>' +
        '<td>' + currency(invoice.finalTotalCost) + '</td>' +
        '<td style="color: ' + color + '">' + invoice.status + '</td>' +
        '</tr>';
        table.innerHTML += row;
    }
    
}
function showinfobill(id){
  var modal = document.getElementById('modal1');
  var info = document.getElementById('info');
  modal.style.display = 'block';
  var invoices = JSON.parse(localStorage.getItem('bills'));
  var s='<button class="close" onClick="closeinfobill()">&times;</button>';
  for (var i = 0; i < invoices.length; i++) {
    var invoice = invoices[i];
    if(invoice.id==id){
      s +='<h4>Thông tin đơn hàng:</h4>'+
      '<p>'+invoice.orderInformation+'</p>'+
      '<h4>Ngày tạo đơn hàng:</h4>'+
      '<p>'+invoice.orderDate+'</p>'+
      '<h4>Tên khách hàng:</h4>'+
      '<p>'+invoice.customer.fullName+'</p>'+
      '<h4>Địa chỉ:</h4>'+
      '<p>'+invoice.customer.address+'</p>'+
      '<h4>Số điện thoại liên lạc:</h4>'+
      '<p>'+invoice.customer.phone+'</p>'+
      '<h4>Tổng giá tiền:</h4>'+
      '<p>'+currency(invoice.finalTotalCost)+'</p>';
      if (invoice.status=="Chưa xử lý") {
        s+='<h4>Tình trạng:</h4>'+
          '<div><span id="status" style="color:red">'+invoice.status+'</span><label><input type="checkbox" onchange="changeStatus(this,'+invoice.id+')" ><span class="slider"></span></label></div>';
      }
      else {
        s+='<h4>Tình trạng:</h4>'+
          '<div><span id="status" style="color:blue">'+invoice.status+'</span><label><input type="checkbox" checked onchange="changeStatus(this,'+invoice.id+')" ><span class="slider"></span></label></div>';
      }
      s+='<button class="printbtn" onClick="window.print()">In đơn hàng</button>';
    }
  }
  info.innerHTML = s;
}
function changeStatus(checkbox,id){
  var status = document.getElementById('status');
	var invoices = JSON.parse(localStorage.getItem('bills'));
	if (checkbox.checked==true) {
		for (var i = 0; i < invoices.length; i++) {
      var invoice = invoices[i];
			if(invoice.id==id){
				invoice.status = 'Đã xử lý';
			}
		}
		status.innerHTML="Đã xử lý";
		status.style.color = 'blue';
	}else {
		for (var i = 0; i < invoices.length; i++) {
      var invoice = invoices[i];  
			if(invoice.id==id){
				invoice.status = 'Chưa xử lý';
			}
		}
		status.innerHTML="Chưa xử lý";
		status.style.color = 'red';
	}
	localStorage.setItem('bills',JSON.stringify(invoices));
	showbilllist();
}
function closeinfobill(){
	
	document.getElementById('modal1').style.display = 'none';
}

document.getElementById('name').addEventListener('input', function() {
  searchBill();
});

function searchBill() {
  var invoices = JSON.parse(localStorage.getItem('bills'));
  var status = document.getElementById('statussearch').value;
  var table = document.getElementById('table-body');
  var inputName = document.getElementById('name').value.toLowerCase();
  var nameWithoutAccents = removeAccents(inputName);
  var nameKeywords = nameWithoutAccents.split(' ');

  var invoicesTemp = [];

  for (var i = 0; i < invoices.length; i++) {
    var invoice = invoices[i];
    var customerNameWithoutAccents = removeAccents(invoice.customer.fullName.toLowerCase());

    var isMatch = true;
    // Kiểm tra từng từ trong từ khóa tìm kiếm
    for (var j = 0; j < nameKeywords.length; j++) {
      var keyword = nameKeywords[j];
      if (!customerNameWithoutAccents.includes(keyword)) {
        isMatch = false;
        break; // Nếu một từ không khớp, thoát khỏi vòng lặp
      }
    }

    if (status == invoice.status && isMatch) {
      invoicesTemp.push(invoice);
    }
  }

  var row = '';
  for (var i = 0; i < invoicesTemp.length; i++) {
    var invoiceTemp = invoicesTemp[i];
    var statusColor = (invoiceTemp.status === 'Chưa xử lý') ? 'red' : 'green';

    row += '<tr onClick="showinfobill(' + invoiceTemp.id + ')">' +
      '<td>' + invoiceTemp.orderDate + '</td>' +
      '<td>' + invoiceTemp.customer.fullName + '</td>' +
      '<td>' + currency(invoiceTemp.finalTotalCost) + '</td>' +
      '<td style="color: ' + statusColor + '">' + invoiceTemp.status + '</td>' +
      '</tr>';
  }

  table.innerHTML = row;
}

function removeAccents(str) {
  str = str.replace(/đ/g, 'd');
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

