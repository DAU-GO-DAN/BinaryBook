function currency(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND';
}

function closechangebox(){

	document.getElementById('modal1').style.display = 'none';
}


// function hello(){
// 	var user = JSON.parse(localStorage.getItem('userlogin'));
// 	document.getElementById('hello').innerHTML= user.fullname +'<button onclick="logout()">Đăng xuất</button>';
// }

createProduct();

function createProduct() {
  if (localStorage.getItem('books') === null) {
    var productArray = [
      {
        id: '10001',
        image: "images/python-crash-course.jpg",
        title:
          "Python Crash Course: A Hands-On, Project-Based Introduction to Programming",
        authors: ["Eric Matthes"],
        oldPrice: 1099000,
        newPrice: 1029000,
        category: "python",
        otherDetails: ["No Starch Press", 552, 2023],
      },
      {
        id: "10002",
        image: "images/head-first-design-patterns.jpg",
        title:
          "Head First Design Patterns: Building Extensible and Maintainable Object-Oriented Software",
        authors: ["Eric Freeman", "Elisabeth Robson"],
        oldPrice: 1959000,
        newPrice: 1829000,
        category: "design-pattern",
        otherDetails: ["O'Reilly Media", 669, 2021],
      },
      {
        id: "10003",
        image: "images/eloquent-javascript.jpg",
        title:
          "Eloquent Javascript, 3rd Edition: A Modern Introduction to Programming",
        authors: ["Marijn Haverbeke"],
        oldPrice: 979000,
        newPrice: 909000,
        category: "javascript",
        otherDetails: [""],
      },
      {
        id: "10004",
        image: "images/effective-java.jpg",
        title: "Effective Java",
        authors: ["Joshua Bloch"],
        oldPrice: 1449000,
        newPrice: 1249000,
        category: "java",
        otherDetails: ["No Starch Press", 472, 2018],
      },
      {
        id: "10005",
        image: "images/dsa-made-easy.jpg",
        title:
          "Data Structures and Algorithms Made Easy: Data Structures and Algorithmic Puzzles",
        authors: ["Narasimha Karumanchi"],
        oldPrice: 1129000,
        newPrice: 989000,
        category: "dsa",
        otherDetails: ["Careermonk Publications", 418, 2016],
      },
      {
        id: "10006",
        image: "images/head-first-ooad.jpg",
        title:
          "Head First Object-Oriented Analysis and Design: A Brain Friendly Guide to OOA&D",
        authors: ["Brett McLaughlin", "Gary Pollice", "David West"],
        oldPrice: 1719000,
        newPrice: 1599000,
        category: "ooad",
        otherDetails: ["O'Reilly Media", 634, 2007],
      },
      {
        id: "10007",
        image: "images/effective-c.jpg",
        title: "Effective C: An Introduction to Professional C Programming",
        authors: ["Robert C Seacord"],
        oldPrice: 1229000,
        newPrice: 1139000,
        category: "c/cpp",
        otherDetails: ["No Starch Press", 272, 2020],
      },
      {
        id: "10008",
        image: "images/spring-in-action.jpg",
        title: "Spring in Action",
        authors: ["Craig Walls"],
        oldPrice: 1699000,
        newPrice: 1449000,
        category: "spring",
        otherDetails: ["Manning Publications", 520, 2022],
      },
      {
        id: "10009",
        image: "images/practical-sql.jpg",
        title: "Practical SQL: A Beginner's Guide to Storytelling with Data",
        authors: ["Anthony Debarros"],
        oldPrice: 979000,
        newPrice: 909000,
        category: "database",
        otherDetails: ["No Starch Press", 464, 2022],
      },
      {
        id: "10010",
        image: "images/javascript-cookbook.jpg",
        title: "JavaScript Cookbook: Programming the Web",
        authors: ["Matthew MacDonald", "Shelley Powers", "Adam Scott"],
        oldPrice: 1959000,
        newPrice: 1819000,
        category: "javascript",
        otherDetails: ["O'Reilly Media", 535, 2021],
      },
      {
        id: "10011",
        image: "images/mastering-regex.jpg",
        title:
          "Mastering Regular Expressions: Understand Your Data and Be More Productive",
        authors: ["Jeffrey Friedl"],
        oldPrice: 1469000,
        newPrice: 1369000,
        category: "regex",
        otherDetails: ["O'Reilly Media", 542, 2006],
      },
      {
        id: "10012",
        image: "images/algorithms-to-live-by.jpg",
        title: "Algorithms to Live by: The Computer Science of Human Decisions",
        authors: ["Brian Christian", "Tom Griffiths"],
        oldPrice: 489000,
        newPrice: 449000,
        category: "dsa",
        otherDetails: ["Holt McDougal", 368, 2017],
      },
      {
        id: "10013",
        image: "images/css-definitive-guide.jpg",
        title: "CSS: The Definitive Guide",
        authors: ["Eric Meyer", "Estelle Weyl"],
        oldPrice: 2209000,
        newPrice: 2049000,
        category: "css",
        otherDetails: ["O'Reilly Media", 1126, 2023],
      },
      {
        id: "10014",
        image: "images/java-beginners-guide.jpg",
        title: "Java: A Beginner's Guide",
        authors: ["Herbert Schildt"],
        oldPrice: 979000,
        newPrice: 909000,
        category: "java",
        otherDetails: ["McGraw-Hill Companies", 752, 2022],
      },
      {
        id: "10015",
        image: "images/cpp-programming-language.jpg",
        title: "The C++ Programming Language (Revised)",
        authors: ["Bjarne Stroustrup"],
        oldPrice: "2089000",
        newPrice: "1969000",
        category: "c/cpp",
        otherDetails: ["Addison-Wesley Professional", 1376, 2013],
      },
      {
        id: "10016",
        image: "images/effective-java.jpg",
        title: "Effective Java",
        authors: ["Joshua Bloch"],
        oldPrice: 1449000,
        newPrice: 1249000,
        category: "java",
        otherDetails: ["Addison-Wesley Professional", 416, 2018],
      },
      {
        id: "10017",
        image: "images/js-the-good-part.jpg",
        title: "Javascript: The Good Parts",
        authors: ["Douglas Crockford"],
        oldPrice: 739000,
        newPrice: 679000,
        category: "javascript",
        otherDetails: ["Yahoo Press", 172, 2008],
      },
      {
        id: "10018",
        image: "images/programming-typescript.jpg",
        title: "Programming Typescript: Making Your JavaScript Applications Scale",
        authors: ["Boris Cherny"],
        oldPrice: 1369000,
        newPrice: 1269000,
        category: "typescript",
        otherDetails: ["O'Reilly Media", 322, 2019],
      },
      {
        id: "10019",
        image: "images/head-first-c-sharp.jpg",
        title:
          "Head First C#: A Learner's Guide to Real-World Programming with C# and .Net Core",
        authors: ["Jennifer Greene", "Andrew Stellman"],
        oldPrice: 1719000,
        newPrice: 1599000,
        category: "csharp",
        otherDetails: ["O'Reilly Media", 785, 2021],
      },
      {
        id: "10020",
        image: "images/spring-in-action.jpg",
        title: "Spring in Action",
        authors: ["Craig Walls"],
        oldPrice: 1699000,
        newPrice: 1449000,
        category: "spring",
        otherDetails: ["Manning Publications", 520, 2022],
      },
      {
        id: "10021",
        image: "images/css-definitive-guide.jpg",
        title: "CSS: The Definitive Guide",
        authors: ["Eric Meyer", "Estelle Weyl"],
        oldPrice: 2209000,
        newPrice: 2049000,
        category: "css",
        otherDetails: ["O'Reilly Media", 1126, 2023],
      },
      {
        id: "10022",
        image: "images/cpp-crash-course.jpg",
        title: "C++ Crash Course: A Fast-Paced Introduction",
        authors: ["Josh Lospinoso"],
        oldPrice: 949000,
        newPrice: 889000,
        category: "c/cpp",
        otherDetails: ["No Starch Press", 792, 2019],
      },
      {
        id: "10023",
        image: "images/pro-angular.jpg",
        title: "Pro Angular: Build Powerful and Dynamic Web Apps",
        authors: ["Adam Freeman"],
        oldPrice: 1469000,
        newPrice: 1369000,
        category: "angular",
        otherDetails: ["Apress", 880, 2022],
      },
      {
        id: "10024",
        image: "images/regular-expression-recipes.jpg",
        title: "Regular Expression Recipes: A Problem-Solution Approach",
        authors: ["Nathan A. Good"],
        oldPrice: 859000,
        newPrice: 799000,
        category: "regex",
        otherDetails: ["Apress", 324, 2004],
      },
      {
        id: "10025",
        image: "images/sql-cookbook.jpg",
        title: "SQL Cookbook: Query Solutions and Techniques for All SQL Users",
        authors: ["Anthony Molinaro", "Robert de Graaf"],
        oldPrice: 1619000,
        newPrice: 1499000,
        category: "database",
        otherDetails: ["O'Reilly Media", 567, 2020],
      },
      {
        id: "10026",
        image: "images/fluent-python.jpg",
        title: "Fluent Python: Clear, Concise, and Effective Programming",
        authors: ["Luciano Ramalho"],
        oldPrice: 1959000,
        newPrice: 1819000,
        category: "python",
        otherDetails: ["O'Reilly Media", 1012, 2022],
      },
      {
        id: "10027",
        image: "images/head-first-java.jpg",
        title: "Head First Java: A Brain-Friendly Guide",
        authors: ["Trisha Gee", "Kathy Sierra", "Bert Bates"],
        oldPrice: 1959000,
        newPrice: 1829000,
        category: "java",
        otherDetails: ["O'Reilly Media", 752, 2022],
      },
      {
        id: "10028",
        image: "images/cpp-programming-language.jpg",
        title: "The C++ Programming Language (Revised)",
        authors: ["Bjarne Stroustrup"],
        oldPrice: 2089000,
        newPrice: 1969000,
        category: "c/cpp",
        otherDetails: ["Addison-Wesley Professional", 1376, 2013],
      },
      {
        id: "10029",
        image: "images/csharp-in-one-day.jpg",
        title:
          "Learn C# in One Day and Learn It Well: C# for Beginners with Hands-on Project",
        authors: ["Jamie Chan"],
        oldPrice: 399000,
        newPrice: 329000,
        category: "csharp",
        otherDetails: ["CreateSpace Independent Publishing Platform", 160, 2015],
      },
      {
        id: "10030",
        image: "images/head-first-c.jpg",
        title: "Head First C: A Brain-Friendly Guide",
        authors: ["Dawn Griffiths", "David Griffiths"],
        oldPrice: 1469000,
        newPrice: 1389000,
        category: "c/cpp",
        otherDetails: ["O'Reilly Media", 629, 2012],
      },
    ];
    localStorage.setItem('books', JSON.stringify(productArray));
  }
}


function showProductList(index) {
  var booksArray = JSON.parse(localStorage.getItem('books'));
  var s = '<tr><th>ID</th><th>ẢNH</th><th>TÊN SẢN PHẨM</th><th>TÁC GIẢ</th><th>THỂ LOẠI</th><th>GIÁ</th><th></th></tr>';
  var dem = 0;
  for (var i = index; i < booksArray.length; i++) {
    s += '<tr style="border: 1px solid rgba(0,0,0,0.4);">' +
      '<td>' + booksArray[i].id + '</td>'
      + '<td><img src="../' + booksArray[i].image + '"></td>'
      + '<td>' + booksArray[i].title + '</td>'
      + '<td>' + booksArray[i].authors + '</td>'
      + '<td>' + booksArray[i].category + '</td>'
      + '<td>' + currency(booksArray[i].oldPrice) + '</td>'
      + '<td style="display: flex; border: none; align-items: center; justify-content: center;">'
      + '<button class="delete" onClick="deleteproduct(\'' + booksArray[i].id + '\')">'
      + '<ion-icon name="trash"></ion-icon>'
      + '</button>'
      + '<button class="change" onClick="showchangeproductbox(\'' + booksArray[i].id + '\')">'
      + '<ion-icon name="create"></ion-icon>'
      + '</button>'
      + '</td>'
      + '</tr>';
    dem++;
    if (dem == 10) {
      break;
    }
  }
  document.getElementById('productlist').innerHTML = s;
  setPagination();
}

function setPagination() {
  var booksArray = JSON.parse(localStorage.getItem('books'));
  var sotrang = Math.ceil(booksArray.length / 10);
  var button = '';
  for (var i = 1; i <= sotrang; i++) {
    vitri = (i - 1) * 10;
    button += '<button class="pageNumber" onClick="showProductList(' + vitri + ')">' + i + '</button>';
  }
  document.getElementById('pagination').innerHTML = button;
}

function deleteproduct(id) {
  var booksArray = JSON.parse(localStorage.getItem('books'));
  var vitri;
  for (var i = 0; i < booksArray.length; i++) {
    if (booksArray[i].id == id) {
      if (confirm('Bạn có muốn xóa sản phẩm này?')) {
        booksArray.splice(i, 1);
      }
      vitri = (Math.floor(i / 10) * 10);
    }
  }
  localStorage.setItem('books', JSON.stringify(booksArray));
  showProductList(vitri);
}

function showchangeproductbox(id) {
  document.getElementById('modal1').style.display = 'block';
  var booksArray = JSON.parse(localStorage.getItem('books'));
  for (var i = 0; i < booksArray.length; i++) {
    if (booksArray[i].id == id) {
      document.getElementById('imgbefore').src = "../" + booksArray[i].image;
      document.getElementById('imgafter').src = "../images/temp2.jpg";
      document.getElementById('name').value = booksArray[i].title;
      document.getElementById('originPrice').value = booksArray[i].oldPrice;
      document.getElementById('salePrice').value = booksArray[i].newPrice;
      document.getElementById('save').setAttribute('onClick', 'changeproduct(' + booksArray[i].id + ')');
    }
  }
}

function changeproduct(id){
	document.getElementById('modal1').style.display = 'none';
	var booksArray = JSON.parse(localStorage.getItem('books'));
	var vitri;
	for(var i=0;i<booksArray.length;i++){
		if(booksArray[i].id == id){
			booksArray[i].image=document.getElementById('imgbefore').src;
			booksArray[i].title=document.getElementById('name').value;
      booksArray[i].newPrice=document.getElementById('salePrice')
			booksArray[i].oldPrice=document.getElementById('originPrice').value;
			vitri = (Math.floor(i/10))*10;
		}
	}
	localStorage.setItem('books', JSON.stringify(booksArray));
	showProductList(vitri);
}

function changeimg(input){
  var reader = new FileReader();
  reader.onload = function (e) {
      document.getElementById('imgafter').src = e.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}

function changeimgadd(input){
  var reader = new FileReader();
  reader.onload = function (e) {
      document.getElementById('imgadd').src = e.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}

function showMenuMobile(){
	var btn = document.getElementById('btnmenu');
	if(btn.className==""){
		document.getElementById('btnmenu').classList.add('show');
		document.getElementById('btnmenu').innerHTML = '&times;' ;
		document.getElementById('navmenu').classList.add('active') ;

	}else {
		document.getElementById('btnmenu').classList.remove('show');
		document.getElementById('btnmenu').innerHTML = '&#9776;' ;
		document.getElementById('navmenu').classList.remove('active') ;
	}

}