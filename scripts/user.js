// ham hien thi danh sach user
function registerUser() {
  var username = document.getElementById("register-username").value;
  var password = document.getElementById("register-password").value;
  var fullName = document.getElementById("register-fullname").value;
  var address = document.getElementById("register-address").value;
  var phone = document.getElementById("register-phone").value;
  var signupSince = new Date().toLocaleDateString(); // Lấy ngày đăng ký hiện tại

  var newUser = {
    username: username,
    password: password,
    fullName: fullName,
    address: address,
    phone: phone,
    signupSince: signupSince,
  };

  var users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  showUserList(); // Hiển thị danh sách người dùng sau khi đăng ký
}
function showUserList() {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var tr =
    "<tr><th>STT</th><th>HỌ TÊN KHÁCH HÀNG</th><th>TÊN ĐĂNG NHẬP</th><th>SĐT</th><th>ĐỊA CHỈ</th><th>NGÀY ĐĂNG KÝ</th><th>Xóa</th></tr>";
  for (var i = 1; i < users.length; i++) {
    tr +=
      '<tr><td style="text-align:center;">' +
      i +
      "</td><td>" +
      users[i].fullName +
      "</td><td>" +
      users[i].username +
      "</td><td>" +
      users[i].phone +
      "</td><td>" +
      users[i].address +
      "</td><td>" +
      users[i].signupSince +
      '</td><td><button class="delete" onClick="deleteUser(\'' +
      users[i].username +
      '\')" style="align-items: center;cursor: pointer; border-radius: 50%; width: 20px; height: 20px; background-color: #6495ED;font-size:15px; color: white;">&times;</button></td></tr>';
  }
  document.getElementById("userlist").innerHTML = tr;
}
function deleteUser(usernamedelete) {
  var users = JSON.parse(localStorage.getItem("users")) || [];

  for (var i = 0; i < users.length; i++) {
    if (users[i].username === usernamedelete) {
      // Use prompt for confirmation
      var confirmation = prompt(
        'Bạn có chắc chắn muốn xóa tài khoản này? Nhập "YES" để xác nhận.'
      );

      if (confirmation && confirmation.toUpperCase() === "YES") {
        users.splice(i, 1);
        localStorage.setItem("users", JSON.stringify(users));
        showUserList();
      } else {
        alert("Xóa tài khoản đã bị hủy.");
      }
    }
  }
}
// Hàm tìm kiếm người dùng
function searchUser() {
  var query = document.getElementById("query").value;
  var results = [];

  if (query.trim() == "") {
    alert("Vui lòng nhập kí tự");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  for (var i = 1; i < users.length; i++) {
    if (
      users[i].fullName.toLowerCase().includes(query.toLowerCase()) ||
      users[i].username.toLowerCase().includes(query.toLowerCase()) ||
      users[i].signupSince.toLowerCase().includes(query.toLowerCase()) ||
      users[i].phone.toLowerCase().includes(query.toLowerCase()) ||
      users[i].address.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push(users[i]);
    }
  }

  // Hiển thị kết quả tìm kiếm
  if (results.length === 0) {
    alert("Không tìm thấy kết quả, mời nhập lại.");
  } else {
    showSearchResults(results);
  }
}

// Hàm hiển thị kết quả tìm kiếm
function showSearchResults(results) {
  var tr =
    "<tr><th>STT</th><th>HỌ TÊN KHÁCH HÀNG</th><th>TÊN ĐĂNG NHẬP</th><th>SĐT</th><th>ĐỊA CHỈ</th><th>NGÀY ĐĂNG KÝ</th></tr>";
  for (var i = 0; i < results.length; i++) {
    tr +=
      '<tr><td style="text-align:center;">' +
      (i + 1) +
      "</td><td>" +
      results[i].fullName +
      "</td><td>" +
      results[i].username +
      "</td><td>" +
      results[i].phone +
      "</td><td>" +
      results[i].address +
      "</td><td>" +
      results[i].signupSince +
      "</td></tr>";
  }
  document.getElementById("searchresults").innerHTML = tr;
}

// Hàm xóa nội dung kết quả tìm kiếm
function clearSearchResults() {
  document.getElementById("searchresults").innerHTML =
    "<tr><th>STT</th><th>HỌ TÊN KHÁCH HÀNG</th><th>TÊN ĐĂNG NHẬP</th><th>SĐT</th><th>ĐỊA CHỈ</th><th>NGÀY ĐĂNG KÝ</th></tr>";
}
