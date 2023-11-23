function currency(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND';
  }

  function showbilllist() {
    var table = document.getElementById('table-body');
    
    table.innerHTML = '';

    if (localStorage.getItem('invoice') === null) {
        var row = '<tr><td colspan=4>Không có đơn hàng nào</td></tr>';
        table.innerHTML = row;
        return false;
    }
    var invoices = JSON.parse(localStorage.getItem('invoice'));
    for (var i = 0; i < invoices.length; i++) {
        var invoice = invoices[i];
        if(invoice.status == "Chưa xử lý"){
          var row = '<tr onClick = "Showinfobill('+ invoice.id +')">' +
              '<td>' + invoice.date + '</td>' +
              '<td>' + invoice.customer + '</td>' +
              '<td>' + currency(invoice.price) + '</td>' +
              '<td style = "color: red">' + invoice.status + '</td>' +
              '</tr>';
          table.innerHTML += row;
        }else{
          var row = '<tr onClick = "Showinfobill('+ invoice.id +')">' +
              '<td>' + invoice.date + '</td>' +
              '<td>' + invoice.customer + '</td>' +
              '<td>' + currency(invoice.price) + '</td>' +
              '<td style = "color: green">' + invoice.status + '</td>' +
              '</tr>';
          table.innerHTML += row;
        }
    }
}
