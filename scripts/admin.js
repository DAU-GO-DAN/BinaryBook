function currency(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VND";
}

function closechangebox() {
  document.getElementById("modal1").style.display = "none";
  document.getElementById("modal2").style.display = "none";
}

function hello() {
  var user = JSON.parse(localStorage.getItem("activeUser"));
  document.getElementById("hello").innerHTML =
    user.fullName + '<button onclick="logout()">Đăng xuất</button>';
}

function showProductList(index) {
  var booksArray = JSON.parse(localStorage.getItem("wellKnownBooks")).concat(
    JSON.parse(localStorage.getItem("bestSellerBooks"))
  );
  var s =
    "<tr><th>ID</th><th>ẢNH</th><th>TÊN SẢN PHẨM</th><th>TÁC GIẢ</th><th>THỂ LOẠI</th><th>GIÁ</th><th></th></tr>";
  var dem = 0;
  for (var i = index; i < booksArray.length; i++) {
    s +=
      '<tr style="border: 1px solid rgba(0,0,0,0.4);">' +
      "<td>" +
      booksArray[i].id +
      "</td>" +
      '<td><img src="../' +
      booksArray[i].image +
      '"></td>' +
      "<td>" +
      booksArray[i].title +
      "</td>" +
      "<td>" +
      booksArray[i].authors +
      "</td>" +
      "<td>" +
      booksArray[i].category +
      "</td>" +
      "<td>" +
      currency(booksArray[i].oldPrice) +
      "</td>" +
      '<td style="display: flex; border: none; align-items: center; justify-content: center;">' +
      '<button class="delete" onClick="deleteproduct(\'' +
      booksArray[i].id +
      "')\">" +
      '<ion-icon name="trash"></ion-icon>' +
      "</button>" +
      '<button class="change" onClick="showchangeproductbox(\'' +
      booksArray[i].id +
      "')\">" +
      '<ion-icon name="create"></ion-icon>' +
      "</button>" +
      "</td>" +
      "</tr>";
    dem++;
    if (dem == 10) {
      break;
    }
  }
  document.getElementById("productlist").innerHTML = s;
  setPagination();
}

function setPagination() {
  var booksArray = JSON.parse(localStorage.getItem("wellKnownBooks")).concat(
    JSON.parse(localStorage.getItem("bestSellerBooks"))
  );
  var sotrang = Math.ceil(booksArray.length / 10);
  var button = "";
  for (var i = 1; i <= sotrang; i++) {
    vitri = (i - 1) * 10;
    button +=
      '<button class="pageNumber" onClick="showProductList(' +
      vitri +
      ')">' +
      i +
      "</button>";
  }
  document.getElementById("pagination").innerHTML = button;
}

function deleteproduct(id) {
  var wkList = JSON.parse(localStorage.getItem("wellKnownBooks"));
  var bsList = JSON.parse(localStorage.getItem("bestSellerBooks"));
  var vitri;
  if (id.slice(0, 2) === "bs") {
    for (var i = 0; i < bsList.length; i++) {
      if (bsList[i].id == id) {
        if (confirm("Bạn có muốn xóa sản phẩm này?")) {
          bsList.splice(i, 1);
        }
        vitri = Math.floor(i / 10) * 10;
      }
    }
  } else {
    for (var i = 0; i < wkList.length; i++) {
      if (wkList[i].id == id) {
        if (confirm("Bạn có muốn xóa sản phẩm này?")) {
          wkList.splice(i, 1);
        }
        vitri = Math.floor(i / 10) * 10;
      }
    }
  }
  localStorage.setItem("wellKnownBooks", JSON.stringify(wkList));
  localStorage.setItem("bestSellerBooks", JSON.stringify(bsList));
  showProductList(vitri);
}

//----------CHỈNH SỬA----------//
//Hiển thị form thay đổi thông tin sản phẩm
function showchangeproductbox(id) {
  document.getElementById("modal1").style.display = "block";
  var wkList = JSON.parse(localStorage.getItem("wellKnownBooks"));
  var bsList = JSON.parse(localStorage.getItem("bestSellerBooks"));
  var booksArray = wkList.concat(bsList);
  for (var i = 0; i < booksArray.length; i++) {
    if (booksArray[i].id == id) {
      document.getElementById("productId").value = booksArray[i].id;
      document.getElementById("productname").value = booksArray[i].title;
      document.getElementById("imgbefore").src = "../" + booksArray[i].image;
      document.getElementById("imgafter").src = "../images/temp2.jpg";
      document.getElementById("category").value = booksArray[i].category;
      document.getElementById("authors").value = booksArray[i].authors;
      document.getElementById("originPrice").value = booksArray[i].oldPrice;
      document.getElementById("salePrice").value = booksArray[i].newPrice;
      document.getElementById("pubCompany").value =
        booksArray[i].otherDetails[0];
      document.getElementById("pageNum").value = booksArray[i].otherDetails[1];
      document.getElementById("pubYear").value = booksArray[i].otherDetails[2];
      document
        .getElementById("save")
        .setAttribute("onClick", "changeproduct('" + booksArray[i].id + "')");
    }
  }
}
//Thay đổi thông tin tại localStorage
function changeproduct(id) {
  var wkList = JSON.parse(localStorage.getItem("wellKnownBooks"));
  var bsList = JSON.parse(localStorage.getItem("bestSellerBooks"));
  var vitri;
  var productname = document.getElementById("productname");
  var category = document.getElementById("category");
  var authors = document.getElementById("authors");
  var salePrice = document.getElementById("salePrice");
  var originPrice = document.getElementById("originPrice");
  var pubCompany = document.getElementById("pubCompany");
  var pageNum = document.getElementById("pageNum");
  var pubYear = document.getElementById("pubYear");
  if (
    !category.value ||
    !productname.value ||
    !salePrice.value ||
    !originPrice.value ||
    !authors.value ||
    !pubCompany.value ||
    !pageNum.value ||
    !pubYear.value
  ) {
    customAlert("Bạn chưa nhập đủ thông tin sản phẩm", "warning");
    return false;
  }
  if (
    isNaN(Number(salePrice.value)) ||
    isNaN(Number(originPrice.value)) ||
    isNaN(Number(pageNum.value)) ||
    isNaN(Number(pubYear.value))
  ) {
    customAlert("Thông tin không hợp lệ", "warning");
    return false;
  }
  if (id.slice(0, 2) === "bs") {
    for (var i = 0; i < bsList.length; i++) {
      if (bsList[i].id == id) {
        bsList[i].image = "images/" + document.getElementById("imgafter").value;
        bsList[i].title = document.getElementById("productname").value;
        bsList[i].category = document.getElementById("category").value;
        bsList[i].newPrice = document.getElementById("salePrice").value;
        bsList[i].oldPrice = document.getElementById("originPrice").value;
        var arrayResult = document.getElementById("authors").value.includes(",")
          ? document.getElementById("authors").value.split(",")
          : [document.getElementById("authors").value];
        bsList[i].authors = arrayResult;
        bsList[i].otherDetails[0] = document.getElementById("pubCompany").value;
        bsList[i].otherDetails[1] = document.getElementById("pageNum").value;
        bsList[i].otherDetails[2] = document.getElementById("pubYear").value;
        vitri = Math.floor(i / 10) * 10;
      }
      localStorage.setItem("bestSellerBooks", JSON.stringify(bsList));
      document.getElementById("modal1").style.display = "none";
    }
  } else {
    for (var i = 0; i < wkList.length; i++) {
      if (wkList[i].id == id) {
        wkList[i].image = "images/" + document.getElementById("imgafter").value;
        wkList[i].title = document.getElementById("productname").value;
        wkList[i].category = document.getElementById("category").value;
        wkList[i].newPrice = document.getElementById("salePrice").value;
        wkList[i].oldPrice = document.getElementById("originPrice").value;
        var arrayResult = document.getElementById("authors").value.includes(",")
          ? document.getElementById("authors").value.split(",")
          : [document.getElementById("authors").value];
        wkList[i].authors = arrayResult;
        wkList[i].otherDetails[0] = document.getElementById("pubCompany").value;
        wkList[i].otherDetails[1] = document.getElementById("pageNum").value;
        wkList[i].otherDetails[2] = document.getElementById("pubYear").value;
        vitri = Math.floor(i / 10) * 10;
      }
      localStorage.setItem("wellKnownBooks", JSON.stringify(wkList));
      document.getElementById("modal1").style.display = "none";
    }
  }
  showProductList(vitri);
  customAlert("Sửa sản phẩm thành công", "success");
}
//Hiển thị ảnh khi chọn ảnh khác
function changeimg(input) {
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("imgafter").src = e.target.result;
    document.getElementById("imgafter").value = input.files[0].name;
  };
  reader.readAsDataURL(input.files[0]);
}

//----------TÌM KIẾM----------//
function searchproduct() {
  var booksArray = JSON.parse(localStorage.getItem("wellKnownBooks")).concat(
    JSON.parse(localStorage.getItem("bestSellerBooks"))
  );
  var name = document.getElementById("searchproductname").value.toLowerCase();
  var category = document
    .getElementById("searchproductcategory")
    .value.toLowerCase();
  var s =
    "<tr><th>ID</th><th>ẢNH</th><th>TÊN SẢN PHẨM</th><th>TÁC GIẢ</th><th>THỂ LOẠI</th><th>GIÁ</th><th></th></tr>";
  if (category == "all") {
    if (!name) {
      showProductList(0);
    } else {
      for (var i = 0; i < booksArray.length; i++) {
        if (booksArray[i].title.toLowerCase().search(name) >= 0) {
          s +=
            '<tr style="border: 1px solid rgba(0,0,0,0.4);">' +
            "<td>" +
            booksArray[i].id +
            "</td>" +
            '<td><img src="../' +
            booksArray[i].image +
            '"></td>' +
            "<td>" +
            booksArray[i].title +
            "</td>" +
            "<td>" +
            booksArray[i].authors +
            "</td>" +
            "<td>" +
            booksArray[i].category +
            "</td>" +
            "<td>" +
            currency(booksArray[i].oldPrice) +
            "</td>" +
            '<td style="display: flex; border: none; align-items: center; justify-content: center;">' +
            '<button class="delete" onClick="deleteproduct(\'' +
            booksArray[i].id +
            "')\">" +
            '<ion-icon name="trash"></ion-icon>' +
            "</button>" +
            '<button class="change" onClick="showchangeproductbox(\'' +
            booksArray[i].id +
            "')\">" +
            '<ion-icon name="create"></ion-icon>' +
            "</button>" +
            "</td>" +
            "</tr>";
        }
      }
      document.getElementById("productlist").innerHTML = s;
    }
  } else {
    for (var i = 0; i < booksArray.length; i++) {
      if (
        booksArray[i].title.toLowerCase().search(name) >= 0 &&
        booksArray[i].category == category
      ) {
        s +=
          '<tr style="border: 1px solid rgba(0,0,0,0.4);">' +
          "<td>" +
          booksArray[i].id +
          "</td>" +
          '<td><img src="../' +
          booksArray[i].image +
          '"></td>' +
          "<td>" +
          booksArray[i].title +
          "</td>" +
          "<td>" +
          booksArray[i].authors +
          "</td>" +
          "<td>" +
          booksArray[i].category +
          "</td>" +
          "<td>" +
          currency(booksArray[i].oldPrice) +
          "</td>" +
          '<td style="display: flex; border: none; align-items: center; justify-content: center;">' +
          '<button class="delete" onClick="deleteproduct(\'' +
          booksArray[i].id +
          "')\">" +
          '<ion-icon name="trash"></ion-icon>' +
          "</button>" +
          '<button class="change" onClick="showchangeproductbox(\'' +
          booksArray[i].id +
          "')\">" +
          '<ion-icon name="create"></ion-icon>' +
          "</button>" +
          "</td>" +
          "</tr>";
      }
    }
    document.getElementById("productlist").innerHTML = s;
  }
}

//----------THÊM----------//
//Hiển thị form thêm mới sản phẩm
function showAddProduct() {
  document.getElementById("modal2").style.display = "block";
}
//Hiển thị ảnh khi chọn ảnh mới
function changeimgadd(input) {
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("imgadd").src = e.target.result;
    document.getElementById("imgadd").value = input.files[0].name;
  };
  reader.readAsDataURL(input.files[0]);
}
//Thay đổi thông tin tại localStorage
function addProduct() {
  var selectedValue = document.querySelector('input[name="typeId"]:checked');
  var productid = autoCreateId(selectedValue);
  var productname = document.getElementById("newName");
  var category = document.getElementById("newCategory");
  var authors = document.getElementById("newAuthors");
  var salePrice = document.getElementById("newSalePrice");
  var originPrice = document.getElementById("newOriginPrice");
  var pubCompany = document.getElementById("newPubCompany");
  var pageNum = document.getElementById("newPageNum");
  var pubYear = document.getElementById("newPubYear");
  var image = document.getElementById("imgadd");
  if (
    !category.value ||
    !productname.value ||
    !salePrice.value ||
    !originPrice.value ||
    !authors.value ||
    !pubCompany.value ||
    !pageNum.value ||
    !pubYear.value
  ) {
    customAlert("Bạn chưa nhập đủ thông tin sản phẩm", "warning");
    return false;
  }
  if (
    isNaN(Number(salePrice.value)) ||
    isNaN(Number(originPrice.value)) ||
    isNaN(Number(pageNum.value)) ||
    isNaN(Number(pubYear.value))
  ) {
    customAlert("Thông tin không hợp lệ", "warning");
    return false;
  }
  var arrayResult = document.getElementById("newAuthors").value.includes(",")
    ? document.getElementById("newAuthors").value.split(",")
    : [document.getElementById("newAuthors").value];
  var newDescription = [
    pubCompany.value,
    parseInt(pageNum.value),
    parseInt(pubYear.value),
  ];
  var producttemp = {
    id: productid,
    title: productname.value,
    image: "images/" + image.value,
    category: category.value,
    authors: arrayResult,
    newPrice: parseInt(salePrice.value),
    oldPrice: parseInt(originPrice.value),
    otherDetails: newDescription,
  };
  if (productid.slice(0, 2) === "bs") {
    var bsList = JSON.parse(localStorage.getItem("bestSellerBooks"));
    bsList.unshift(producttemp);
    localStorage.setItem("bestSellerBooks", JSON.stringify(bsList));
    document.getElementById("modal2").style.display = "none";
  } else {
    var wkList = JSON.parse(localStorage.getItem("wellKnownBooks"));
    wkList.unshift(producttemp);
    localStorage.setItem("wellKnownBooks", JSON.stringify(wkList));
    document.getElementById("modal2").style.display = "none";
  }
  showProductList(0);
  customAlert("Thêm sản phẩm thành công", "success");
}
//Tự động tạo id
function autoCreateId(typeId) {
  if (typeId.value === "bs") {
    return (
      "bs" + (JSON.parse(localStorage.getItem("bestSellerBooks")).length + 1)
    );
  }
  return "wk" + (JSON.parse(localStorage.getItem("wellKnownBooks")).length + 1);
}
//----------ALERT----------//
function customAlert(message, type) {
  if (type == "success") {
    document.getElementById("customalert").style.backgroundColor = "#4CAF50";
  }
  if (type == "warning") {
    document.getElementById("customalert").style.backgroundColor = "#f44336";
  }
  document.getElementById("customalert").innerHTML = message;
  var x = document.getElementById("customalert");
  x.className = "show";
  setTimeout(function () {
    x.className = x.classList.remove("show");
  }, 3500);
}
