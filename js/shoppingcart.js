// 渲染加入的商品

showTbody();

function showTbody() {
    $.ajax({
        url: 'http://localhost/interface/showlist.php',
        success: function(res) {
            if (res.code) {
                var arr = res.data;
                if (res.data) {

                    $.each(arr, function(index, item) {
                        $('.product').append(`<div class="product-box" id = "${item.product_id}">
            <div class="product-ckb"><em class="product-em"></em></div>
            <div class="product-sx">
                <a href="../baoxue-details.html">
                    <img src=".${item.product_img}"" class="product-img" />
                    <span class="product-name">${item.product_name}</span>
                </a>
                <span class="product-price">¥&thinsp;<span class="price">${item.product_price}</span></span>
                <div class="product-amount">
                    <div class="product_gw">
                        <em class="product-jian">-</em>
                        <input type="text" value="${item.product_num}" class="product-num" />
                        <em class="product-add">+</em>
                    </div>
                </div>
                <img class="product-del" src="../img/deleteico.png" />
            </div>
        </div>`)
                    })
                }
            } else {
                //如果没有商品,table隐藏,div显示
                $('.product-box').hide();
                $('.kon-cat').show();
            }
        },
        dataType: 'json',
        cache: false
    })
}

$(".wrap").click(function(e) {
    var target = e.target;
    console.log(target)

    // target是一个dom节点
    if ((target.className == 'product-add') || (target.className == 'product-jian')) {
        // 点击+增加一个商品数量,点击-减少一个商品数量
        $.ajax({
            url: 'http://localhost/interface/updatewq.php',
            data: {
                type: target.className,
                id: $(target).parents('.product-box').attr('id')
            },
            success: function(res) {
                if (target.className == 'product-add') {
                    var n = $(".product-add").prev().val();
                    var num = parseInt(n) + 1;
                    if (num == 99) { return; }
                    $(".product-add").prev().val(num);
                    TotalPrice();
                } else {
                    var n = $(".product-jian").next().val();
                    var num = parseInt(n) - 1;
                    if (num == 0) { return; }
                    $(".product-jian").next().val(num);
                    TotalPrice();
                }
            },
            dataType: 'json'
        })

    } else if (target.className == 'product-del') {
        // 点击删除按钮删除一个商品
        $.ajax({
            url: 'http://localhost/interface/delwq.php',
            data: {
                id: $(target).parents('.product-box').attr('id')
            },
            success: function(res) {
                console.log(res)
                if (res.code) {
                    $('.product-box').hide();
                    $(".kon-cat").show();
                }
            },
            dataType: 'json'
        })
    } else if ($(target).hasClass('product-em')) {
        $(target).toggleClass("product-xz");
        TotalPrice();
        productxz();
    }
})

function shuliang() {
    $(".product-all-sl").text("");
    var cd = $(".product-xz").length;
    $(".product-all-sl").text(cd);
    if (cd > 0) {
        $(".product-all-qx").text("已选");
        $(".all-sl").css("display", "inline-block");
        $(".product-sett").removeClass("product-sett-a");
    } else {
        $(".product-all-qx").text("全选");
        $(".all-sl").css("display", "none");
        $(".product-sett").addClass("product-sett-a");
    }
}

function koncat() {
    var pic = $(".product-box").length;
    if (pic <= 0) {
        $(".all-price").text("0.00");
        $(".product-all-qx").text("全选");
        $(".all-sl").css("display", "none");
        $(".product-sett").addClass("product-sett-a");
        $(".product-all em").removeClass("product-all-on");
        $(".kon-cat").css("display", "block");
    } else { $(".kon-cat").css("display", "none"); }
}

function productxz() {
    var xz = $(".product-em");
    var xz1 = $(".product-xz");
    if (xz1.length == xz.length) { $(".product-all em").addClass("product-all-on"); } else { $(".product-all em").removeClass("product-all-on"); }
    shuliang();
    TotalPrice();
}

function TotalPrice() {
    var total = 0;
    $(".product-em").each(function() {
        if ($(this).is(".product-xz")) {
            var price = parseInt($(this).parents(".product-ckb").siblings().find(".price").text());
            var slproice = parseInt($(this).parents(".product-ckb").siblings().find(".product-num").val());
            var dgtotal = price * slproice;
            total += dgtotal;
        }
        $(".all-price").text(total.toFixed(2));
    });
}

$(".product-al").click(function() {
    var fxk = $(".product-em");
    var qx = $(".product-all em");
    qx.toggleClass("product-all-on");
    if ($(this).find(".product-all em").is(".product-all-on")) { fxk.addClass("product-xz"); } else { fxk.removeClass("product-xz"); }
    TotalPrice();
    shuliang()
});