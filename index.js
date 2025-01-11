var produck = [{
    id: 1,
    img: './img/my-notion-face-customized.png',
    name: 'My Notion Face boy',
    price: 700,
    description: 'Face boy Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus excepturi voluptatum nobis voluptatem tempora culpa!',
    type: 'Face boy'
}, {
    id: 2,
    img: './img/my-notion-face-customized (1).png',
    name: 'My Notion Face girl',
    price: 1500,
    description: 'Face girl Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus excepturi voluptatum nobis voluptatem tempora culpa!',
    type: 'Face girl'
}, {
    id: 3,
    img: './img/my-notion-face-customized (2).png',
    name: 'My Notion sigma boy',
    price: 4500,
    description: 'Face sigma boy Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus excepturi voluptatum nobis voluptatem tempora culpa!',
    type: 'Face sigma boy'
}];

$(document).ready(() => { 
    var html = '';
    for (let i = 0; i < produck.length; i++) {
        html += `<div onclick="openProduckDetail(${i})" class="product-item ${produck[i].type}">
                    <img src="${produck[i].img}" alt="product-image" class="product-image">
                    <p class="product-name">${produck[i].name}</p>
                    <p class="product-price">$ ${ numberWithCommas (produck[i].price) }</p>
                </div>`;
    }
    $("#productlist").html(html);
})

function numberWithCommas(x) {
    x = x.toString();
    var Patern = /(-?\d+)(\d{3})/;
    while (Patern.test(x)) 
        x = x.replace(Patern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    // console.log('#'+elem.id);
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < produck.length; i++) {
        if( produck[i].name.includes(value) ) {
            html += `<div onclick="openProduckDetail(${i})" class="product-item ${produck[i].type}">
                    <img src="${produck[i].img}" alt="product-image" class="product-image">
                    <p class="product-name">${produck[i].name}</p>
                    <p class="product-price">$ ${ numberWithCommas (produck[i].price) }</p>
                </div>`;
        }
    }
    if(html == '') {
    $("#productlist").html('<p>Not Found product</p>');
    } else {
        $("#productlist").html(html);
    }
    
}

function searchproduck(param) {
    console.log(param)
    $('.product-item').css('display', 'none')
    if (param == 'all') {
        $('.product-item').css('display', 'block')
    } else {
        $('.'+param).css('display', 'block')
    }
}

var produckindex = 0;
function openProduckDetail(index) {
    produckindex = index;
    console.log(produckindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', produck[index].img);
    $("#mdd-name").text(produck[index].name);
    $("#mdd-price").text('$ '+ numberWithCommas (produck[index].price));
    $("#mdd-desc").text(produck[index].description);
}

function closeModal() {
    $(".modal").css('display', 'none') 
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (produckindex == cart[i].index) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if (pass) {
        var obj = {
            index: produckindex,
            id: produck[produckindex].id,
            name: produck[produckindex].name,
            price: produck[produckindex].price,
            img: produck[produckindex].img,
            count: 1
        };
        //console.log(obj)
        cart.push(obj);
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + produck[produckindex].name + ' to cart !'
    })
    $("#cartcount").css('display', 'flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display', 'flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="Cartlist-img">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${'$ '+ numberWithCommas(cart[i].price * cart[i].count) }</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    } 
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action, index) {
    if (action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Are you sure want to delete?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    cancelButtonText: "Cancel"
                }).then((res) => {
                    if(res.isConfirmed) {
                        cart.splice(index, 1)
                        console.log(cart)
                        rendercart();
                        $("#cartcount").css('display', 'flex').text(cart.length)

                        if(cart.length <= 0) {
                            $("#cartcount").css('display', 'none')
                        }
                    }else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count)
                    }
                    
                })
            }
        }
    }
    if (action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
    }
}