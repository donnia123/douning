function Broadcast() {
    //小圆点点亮
    $(".bannernav li").eq(0).addClass("active");
    var index = 0;
    var timer = null;
    $(".bannernav li").hover(function() {
        clearInterval(timer);
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".bannerlist li").eq(index).css('opacity', 0).animate({
            'opacity': 1
        }, 300);
        $(".bannerlist li").eq(index).siblings().css('opacity', 1).animate({
            'opacity': 0
        }, 300);
    }, function() {
        auto();
    });

    auto();
    //图片自动轮播
    function auto() {
        timer = setInterval(function() {
            index++;
            if (index > 3) {
                index = 0;
            }
            $(".bannernav li").eq(index).addClass("active").siblings().removeClass("active");
            $(".bannerlist li").eq(index).css('opacity', 0).animate({
                'opacity': 1
            }, 300);
            $(".bannerlist li").eq(index).siblings().css('opacity', 1).animate({
                'opacity': 0
            }, 300);
        }, 5000);
    }

    //鼠标移入移除事件
    $(".banner").mouseover(function() {
        $("#leftBtn").css("display", "block");
        $("#rightBtn").css("display", "block");
        clearInterval(timer);
    });
    $(".banner").mouseleave(function() {
        $("#leftBtn").css("display", "none");
        $("#rightBtn").css("display", "none");
        timer = setInterval(function() {
            index++;
            if (index > 3) {
                index = 0;
            }
            $(".bannernav li").eq(index).addClass("active").siblings().removeClass("active");
            $(".bannerlist li").eq(index).css('opacity', 0).animate({
                'opacity': 1
            }, 300);
            $(".bannerlist li").eq(index).siblings().css('opacity', 1).animate({
                'opacity': 0
            }, 300);
        }, 5000);
    });
    // 左右方向键
    $("#leftBtn").click(function() {
        index += -1;
        if (index < 0) {
            index = 3;
        }
        $(".bannernav li").eq(index).addClass("active").siblings().removeClass("active");
        $(".bannerlist li").eq(index).css('opacity', 0).animate({
            'opacity': 1
        }, 300);
        $(".bannerlist li").eq(index).siblings().css('opacity', 1).animate({
            'opacity': 0
        }, 300);
    });
    $("#rightBtn").click(function() {
        index += 1;
        if (index > 3) {
            index = 0;
        }
        $(".bannernav li").eq(index).addClass("active").siblings().removeClass("active");
        $(".bannerlist li").eq(index).css('opacity', 0).animate({
            'opacity': 1
        }, 300);
        $(".bannerlist li").eq(index).siblings().css('opacity', 1).animate({
            'opacity': 0
        }, 300);
    })

}
Broadcast()

// 导航下拉固定
$(function() {
    $(".nav2").hide();
    $(window).scroll(function() {
        if ($(document).scrollTop() >= 180) {
            $(".nav2").addClass("fixnav").slideDown();
        } else {
            $(".nav2").hide();
        }
    })
})

// 第二个轮播图
$('.rvc').rvc({
    liNum: 4, //2~5之间的整数
    spaceBetween: 0, //li项之间的距离  为什么？？？？
    plr: 20, //当屏幕小于1024时，rvc的padding-left，padding-right值
    time: 400, //动画时间
    prv: '.rvc-prv', //前一个按钮
    next: '.rvc-next' //下一个按钮
})


$(function() {
    $(".bbox4").hide();
    $(window).scroll(function() {
        if ($(document).scrollTop() > 0) {
            $(".bbox4").addClass("shown").slideDown();
        } else {
            $(".bbox4").hide();
        }
    });
    $(".bbox4").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 1000);
        return false;
    });
})

// json数据渲染

// $.ajax({
//     url: "./data/index.json",
//     type: 'get',
//     success: function(res) {
//         console.log(res);
//         // console.log(this)
//         res.forEach(item => {

//             $(".rvc-wrapper>ul")[0].innerHTML += `<li class="rvc-li">
//         <img  src="${item.picUrl}" alt="">
//         <span class="rvc-name">${item.name}</span>
//         <span class="rvc-price">${item.price}</span>
//     </li>`;

//         })
//     },
//     error: function() {
//         console.log('失败的回调')
//     },
// })

// 倒计时

var hour = document.querySelector(".hours");
var minute = document.querySelector(".minutes");
var second = document.querySelector(".seconds");
var inputTime = +new Date("2020-10-26 00:00:00"); //倒计时的结束时间，自己设置时间
countDown(); //先调用一次这个函数 防止第一次刷新页面有空白
//2、开启定时器
setInterval(countDown, 1000); //
//3、倒计时-时分秒函数
function countDown() {
    var nowTime = +new Date();
    var times = (inputTime - nowTime) / 1000; // 
    var h = parseInt(times / 60 / 60 % 24);
    h = h < 10 ? '0' + h : h;
    hour.innerHTML = h; //
    var m = parseInt(times / 60 % 60);
    m = m < 10 ? "0" + m : m;
    minute.innerHTML = m; //同上
    var s = parseInt(times % 60);
    s = s < 10 ? "0" + s : s;
    second.innerHTML = s; //同上
}