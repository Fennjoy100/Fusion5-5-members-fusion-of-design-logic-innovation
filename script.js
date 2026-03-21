var checkbox = document.getElementsByName("Product")
var products = document.querySelectorAll(".Products")

checkbox.forEach(function (box) {
    box.addEventListener("change", filter)
})

function filter() {
    var checkedvalue = []
    checkbox.forEach(function (box) {
        if (box.checked) {
            checkedvalue.push(box.value.toLowerCase())
        }
    })
    products.forEach(function (product) {
        var category = product.dataset.category.toLowerCase().split(" ")

        if (checkedvalue.length === 0) {
            product.style.display = "block"
        }
        else {

            var match = checkedvalue.some(function (value) {
                return category.includes(value)
            })

            if (match) {
                product.style.display = "block"
            }
            else {
                product.style.display = "none"
            }
        }
    })
}

// Search Box functionality

var search = document.getElementById("Search")
var products = document.querySelectorAll(".Products")

search.addEventListener("keyup", function () {
    var Entered = search.value.toLowerCase()

    products.forEach(function (product) {
        var category = product.dataset.category.toLowerCase()

        if (Entered.length === 0) {
            product.style.display = "block"
        }
        else {
            if (category.indexOf(Entered) < 0) {
                product.style.display = "none"
            }
            else {
                product.style.display = "block"
            }
        }
    })
})

// Cart
var cartbtn = document.querySelector(".cart")
var cartslidebar = document.querySelector(".cartslidebar")

cartbtn.addEventListener("click", function () {
    cartslidebar.style.right = "10px"
})

var cartslideclose = document.querySelector(".cartslidebar_close")

cartslideclose.addEventListener("click", function () {
    cartslidebar.style.right = "-80%"
})

// Add to cart
var orderbtn = document.querySelector(".orderbtn")
orderbtn.style.display = "none"
var addtocartnotify = document.querySelector(".cart-count")
var cartcount = 0

var addtocartbtn = document.querySelectorAll(".Addtocart")
var cartslidebarcontainer = document.querySelector(".cartslidebar_container")
addtocartbtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        btn.disabled = true
        var div = btn.parentElement

        var name = div.querySelector("h2").textContent
        var price = div.querySelector("h3").textContent
        var image = div.querySelector("img").src

        var cartItem = document.createElement("div")
        cartItem.classList.add("slideproducts")

        cartItem.innerHTML = `
                                    <img src="${image}">
                                    <div>
                                        <p>${name}</p>
                                        <h3>${price}</h3>
                                        <div class="quantity">
                                            <button class="remove">-</button>
                                            <span class="quantitycount">1</span>
                                            <button class="add">+</button>
                                            <button class="removeproduct">Remove</button>
                                        </div>
                                    </div>`

        cartslidebarcontainer.append(cartItem)
        cartcount++
        addtocartnotify.textContent = cartcount
        orderbtn.style.display = "block"

        var count = 1
        var quantitycount = cartItem.querySelector(".quantitycount")
        var remove = cartItem.querySelector(".remove")
        var add = cartItem.querySelector(".add")

        remove.addEventListener("click", function () {
            if (count > 1) {
                count--
                quantitycount.textContent = count
            }
        })

        add.addEventListener("click", function () {
            count++
            quantitycount.textContent = count
        })

        var removebtn = cartItem.querySelector(".removeproduct")
        removebtn.addEventListener("click", function () {
            cartItem.remove()
            btn.disabled = false
            cartcount--
            addtocartnotify.textContent = cartcount
            if (cartcount == 0) {
                orderbtn.style.display = "none"
            }
            else {
                orderbtn.style.display = "block"
            }
        })
    })
})

// Dark mode
var darkbtn = document.querySelector(".darkbtn")
var offer = document.querySelector(".offer")
var productsection1 = document.querySelector(".Products_section1")
var productsection2 = document.querySelector(".Products_section2")
var products = document.querySelectorAll(".Products")
var body = document.querySelector("body")
darkbtn.addEventListener("click", function () {
    offer.classList.toggle("dark")
    productsection1.classList.toggle("dark")
    productsection2.classList.toggle("dark")
    body.classList.toggle("darkbody")
    products.forEach(function (product) {
        product.classList.toggle("gold")
    })
})

// Order Overlay
var orderbtn = document.querySelector(".orderbtn")
var overlay = document.querySelector(".orderoverlay")
var orderpopup = document.querySelector(".orderpopup")
orderbtn.addEventListener("click", function () {
    overlay.style.display = "block"
    orderpopup.style.display = "flex"
})

var backtoshop = document.querySelector(".backtoshop")
backtoshop.addEventListener("click", function () {
    overlay.style.display = "none"
    orderpopup.style.display = "none"
    location.reload()
})