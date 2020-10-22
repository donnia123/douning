$(document).ready(function() {

    // 图片上下滚动

    var count = $("#imageMenu li").length - 5; /* 显示 6 个 li标签内容 */

    var interval = $("#imageMenu li:first").width();

    var curIndex = 0;



    $('.scrollbutton').click(function() {

        if ($(this).hasClass('disabled')) return false;



        if ($(this).hasClass('smallImgUp')) --curIndex;

        else ++curIndex;



        $('.scrollbutton').removeClass('disabled');

        if (curIndex == 0) $('.smallImgUp').addClass('disabled');

        if (curIndex == count - 1) $('.smallImgDown').addClass('disabled');



        $("#imageMenu ul").stop(false, true).animate({
            "marginLeft": -curIndex * interval + "px"
        }, 600);

    });

    // 解决 ie6 select框 问题

    $.fn.decorateIframe = function(options) {

        if ($.browser.msie && $.browser.version < 7) {

            var opts = $.extend({}, $.fn.decorateIframe.defaults, options);

            $(this).each(function() {

                var $myThis = $(this);

                //创建一个IFRAME

                var divIframe = $("<iframe />");

                divIframe.attr("id", opts.iframeId);

                divIframe.css("position", "absolute");

                divIframe.css("display", "none");

                divIframe.css("display", "block");

                divIframe.css("z-index", opts.iframeZIndex);

                divIframe.css("border");

                divIframe.css("top", "0");

                divIframe.css("left", "0");

                if (opts.width == 0) {

                    divIframe.css("width", $myThis.width() + parseInt($myThis.css("padding")) * 2 + "px");

                }

                if (opts.height == 0) {

                    divIframe.css("height", $myThis.height() + parseInt($myThis.css("padding")) * 2 + "px");

                }

                divIframe.css("filter", "mask(color=#fff)");

                $myThis.append(divIframe);

            });

        }

    }

    $.fn.decorateIframe.defaults = {

        iframeId: "decorateIframe1",

        iframeZIndex: -1,

        width: 0,

        height: 0

    }

    //放大镜视窗

    $("#bigView").decorateIframe();

    //点击到中图

    var midChangeHandler = null;



    $("#imageMenu li img").bind("click", function() {

        if ($(this).attr("id") != "onlickImg") {

            midChange($(this).attr("src").replace("small", "mid"));

            $("#imageMenu li").removeAttr("id");

            $(this).parent().attr("id", "onlickImg");

        }

    }).bind("mouseover", function() {

        if ($(this).attr("id") != "onlickImg") {

            window.clearTimeout(midChangeHandler);

            midChange($(this).attr("src").replace("small", "mid"));

            $(this).css({
                "border": "3px solid #959595"
            });

        }

    }).bind("mouseout", function() {

        if ($(this).attr("id") != "onlickImg") {

            $(this).removeAttr("style");

            midChangeHandler = window.setTimeout(function() {

                midChange($("#onlickImg img").attr("src").replace("small", "mid"));

            }, 1000);

        }

    });

    function midChange(src) {

        $("#midimg").attr("src", src).load(function() {

            changeViewImg();

        });

    }

    //大视窗看图

    function mouseover(e) {

        if ($("#winSelector").css("display") == "none") {

            $("#winSelector,#bigView").show();

        }

        $("#winSelector").css(fixedPosition(e));

        e.stopPropagation();

    }

    function mouseOut(e) {

        if ($("#winSelector").css("display") != "none") {

            $("#winSelector,#bigView").hide();

        }

        e.stopPropagation();

    }

    $("#midimg").mouseover(mouseover); //中图事件

    $("#midimg,#winSelector").mousemove(mouseover).mouseout(mouseOut); //选择器事件



    var $divWidth = $("#winSelector").width(); //选择器宽度

    var $divHeight = $("#winSelector").height(); //选择器高度

    var $imgWidth = $("#midimg").width(); //中图宽度

    var $imgHeight = $("#midimg").height(); //中图高度

    var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度



    function changeViewImg() {

        $("#bigView img").attr("src", $("#midimg").attr("src").replace("mid", "big"));

    }

    changeViewImg();

    $("#bigView").scrollLeft(0).scrollTop(0);

    function fixedPosition(e) {

        if (e == null) {

            return;

        }

        var $imgLeft = $("#midimg").offset().left; //中图左边距

        var $imgTop = $("#midimg").offset().top; //中图上边距

        X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X

        Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y

        X = X < 0 ? 0 : X;

        Y = Y < 0 ? 0 : Y;

        X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;

        Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;



        if ($viewImgWidth == null) {

            $viewImgWidth = $("#bigView img").outerWidth();

            $viewImgHeight = $("#bigView img").height();

            if ($viewImgWidth < 200 || $viewImgHeight < 200) {

                $viewImgWidth = $viewImgHeight = 800;

            }

            $height = $divHeight * $viewImgHeight / $imgHeight;

            $("#bigView").width($divWidth * $viewImgWidth / $imgWidth);

            $("#bigView").height($height);

        }

        var scrollX = X * $viewImgWidth / $imgWidth;

        var scrollY = Y * $viewImgHeight / $imgHeight;

        $("#bigView img").css({
            "left": scrollX * -1,
            "top": scrollY * -1
        });

        $("#bigView").css({
            "top": 0,
            "left": $(".preview").offset().left + $(".preview").width() - 180
        });

        return {
            left: X,
            top: Y
        };

    }

});

$(".sp-info-specs").click(function() {
    $(this).siblings().css({
        "border": "2px solid #aaa"
    })
    $(this).css({
        "border": "2px solid #FF0036"
    })
})

$(".add").click(function() {
    var n = $(this).prev().val();
    var num = parseInt(n) + 1;
    if (num == 99) { return; }
    $(this).prev().val(num);

});
$(".jian").click(function() {
    var n = $(this).next().val();
    var num = parseInt(n) - 1;
    if (num == 0) { return; }
    $(this).next().val(num);

});

$(".add-cart").click(function() {
    var num = parseInt($(".sp-info>input").val());
    var cartnum = parseInt($("#pro-num").html());
    $("#pro-num").html(num + cartnum);
});

// 购物车

$('.add-cart').click(function() {
        $name = $(".pro-inf>h2").html();
        $price = $(".sp-info-val").html();
        $img = $("#onlickImg>img").attr("src");
        $.ajax({
            url: 'http://localhost/interface/addwq.php',
            data: {
                id: '1321324214324',
                name: $name,
                price: $price,
                img: $img,
                num: $('input').val()
            },
            success: function(res) {
                if (res.code) {
                    alert('商品加入成功')
                }
            },
            dataType: 'json'
        })
    })
    //点击查看购物车,进入购物车页面
$('.go-cart').click(function() {
    location.href = "./baoxue-cart copy.html"
})