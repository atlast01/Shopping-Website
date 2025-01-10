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
        html += `<div class="product-item ${produck[i].type}">
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
            html += `<div class="product-item ${produck[i].type}">
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