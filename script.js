'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);

//chuyển đến trang tìm kiếm 

const searchBtn = document.querySelector("#search-btn");
if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    window.location.href = "search.html";
  });
}

//đã đăng nhập hay chưa
const authBtn = document.querySelector('#auth-btn');
const authSpan = authBtn.querySelector('.span');
const token = localStorage.getItem('authToken');

if (authBtn) {
  if (token) {
    // Người dùng đã đăng nhập
    authSpan.textContent = 'Đăng xuất';
    authBtn.addEventListener('click', function () {
      alert('Bạn có muốn đăng xuất không?');
      localStorage.removeItem('authToken');
      window.location.href = '../pages/login.html';
    });
  } else {
    // Người dùng chưa đăng nhập
    authSpan.textContent = 'Đăng nhập';
    authBtn.addEventListener('click', function () {
      window.location.href = '../pages/login.html';
    });
  }
}

//cart
const cartBtn = document.querySelector('#cart-btn');
if (cartBtn) {
  cartBtn.addEventListener('click', function () {
    window.location.href = 'cart.html';
  });
}