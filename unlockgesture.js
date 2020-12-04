const DomSelect = function (domroot) {
    var _this = this
    if (!domroot) throw new TypeError("You are propbably not give the root element or the element doesn't init")

    this.ballWrap = domroot[0];
    const _ball = document.createElement('div');
    const _progress = document.createElement('div');
    const _text = document.createElement('span');

    _ball.setAttribute('id', 'scrollBall')
    _progress.setAttribute('id', 'progress')
    _text.classList.add('text')
    _text.innerHTML = '滑动图形来解开验证'

    this.ball = _ball;
    this.progress = _progress;
    this.text = _text;


    const nodes = [];
    nodes.push(_progress, _text, _ball)
    for (let i = 0; i < nodes.length; i++) {
        this.ballWrap.appendChild(nodes[i])
    }

    //依照瀏覽裝置給予監聽事件
    let stopplace = 0, isMove = false;
    const startEvent = isMobileAccess() ? 'touchstart' : 'mousedown'
    const moveEvent = isMobileAccess() ? 'touchmove' : 'mousemove'
    const endEvent = isMobileAccess() ? 'touchend' : 'mouseup'

    this.ball.addEventListener(startEvent, function (e) {
        isMove = true
    })
    function check(move, offset) {
        if (move - offset + 25 > MYcanvas.canvasWrap.offsetWidth || move - offset < 0) {
            MYcanvas.render(0)
            _this.progress.style.width = 0
            _this.ball.style.left = 0
            return false
        }
        return true
    }

    // 控制是否移動、圖片跟滑動條的移動距離邏輯
    this.ballWrap.addEventListener(moveEvent, function (e) {
        let checkmove = e.clientX || e.touches[0].clientX
        wrapOffset = _this.ballWrap.offsetLeft
        // 移動距離扣除外層的offset距離，即為初始移動位置
        if (isMove) {
            if (check(checkmove, wrapOffset)) { // 確認邊界Fn
                MYcanvas.render((checkmove - wrapOffset))
                _this.progress.style.width = checkmove - wrapOffset - 25 + 'px'
                _this.ball.style.left = checkmove - wrapOffset - 25 + 'px'
            }
        }
    })

    this.ball.addEventListener(endEvent, function (e) {
        isMove = false
        let checkmove = e.clientX || e.changedTouches[0].clientX
        stopplace = (checkmove - wrapOffset)
        if (stopplace > MYcanvas.initplace - 5 && stopplace < MYcanvas.initplace + 5) {
            alert('成功')
        }
    })
}

class initCanvas {
    constructor(props) {
        this.canvas = props.canvas
        this.ctx = this.canvas[0].getContext('2d')
        this.canvasWrap = props.canvasWrap[0]
        this.image = new Image(this.imgWidth, this.imgWidth);
        this.imgWidth = 40 // 解鎖圖片可客製調整寬高
    }
    drawImageActualSize() {
        return this.ctx.drawImage(this, 0, 20); // drawImage第三個參數可調整高度
    }
    getRandomValue(min, max) {
        return min + (max - min) * Math.random();
    };
    imgLoader(url) {
        this.image.src = url;
        this.image.onload = () => this.ctx.drawImage(this.image, 0, 20); // drawImage第三個參數可調整高度
    }
    init() {
        this.canvas.attr({ width: this.canvasWrap.offsetWidth, height: this.canvasWrap.offsetHeight })
        this.initplace = Math.floor(this.getRandomValue(51, this.canvasWrap.offsetWidth - this.imgWidth))
        this.imgLoader('https://picsum.photos/seed/picsum/40/40') // 圖片載入高度需跟 this.imgWidth 參數一致
        this.ctx.rect(this.initplace, this.imgWidth / 2, this.imgWidth, this.imgWidth);
        this.ctx.fill();
    }
    render(move) {
        this.ctx.clearRect(0, 0, this.canvasWrap.offsetWidth, this.canvasWrap.offsetHeight);
        this.ctx.fill();
        this.ctx.drawImage(this.image, move, 20); // drawImage第三個參數可調整高度
    }
}

console.log(DomSelect)

//確認瀏覽裝置回傳布林
const isMobileAccess = function () {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Windows CE', 'iPad', 'iPhone', 'iPod', 'Android', 'android', 'Windows Phone', 'Symbian', 'BlackBerry', 'Linux'];
    for (var i = 0, len = mobileAgents.length; i < len; i++) {
        if (sUserAgent.indexOf(mobileAgents[i]) !== -1) {
            return true;
        }
    }
    return false;
}





//select DOM node
//     let canvasWrap = $('.canvasWrap')
//     let canvas = $('#verify')
//     canvas.attr({ width: canvasWrap.width(), height: canvasWrap.height() }) // canvas寬高只能以外層來控制，不然offset會不準
//     let imgWidth = 40
//     let initplace = Math.floor(getRandomValue(51, canvasWrap.width()-imgWidth)), //確保空洞的x位置必在畫布內
//     stopplace=0,isMove = false;
//     let ball = $('#scrollBall')
//     let progress = $('#progress')
//     let ballWrap = $('.scrollWrap')
//     let wrapOffset;
//     const ctx = canvas[0].getContext('2d');
//     //初始化圖片跟模擬空洞
//     const image = new Image(imgWidth, imgWidth); // Using optional size for image
//     image.onload = drawImageActualSize; // Draw when image has loaded
//     image.src = 'https://picsum.photos/seed/picsum/40/40';
//     ctx.rect(initplace,imgWidth/2,imgWidth,imgWidth);
//     // ctx.save()
//     ctx.fill();
//     function drawImageActualSize() {
//         ctx.drawImage(this, 0, 20);
//     }
//     function getRandomValue(min,max) {
//         return min + (max - min) * Math.random();
//     };
//     //確認瀏覽裝置回傳布林
// const isMobileAccess = function () {
//     var sUserAgent = navigator.userAgent;
//     var mobileAgents = ['Windows CE', 'iPad', 'iPhone', 'iPod', 'Android','android','Windows Phone', 'Symbian', 'BlackBerry', 'Linux'];
//     for (var i = 0, len = mobileAgents.length; i < len; i++) {
//         if (sUserAgent.indexOf(mobileAgents[i]) !== -1) {
//             return true;
//         }
//     }
//     return false;
// }
// //依照瀏覽裝置給予監聽事件
//     const startEvent = isMobileAccess()? 'touchstart' : 'mousedown'
//     const moveEvent = isMobileAccess()? 'touchmove' : 'mousemove'
//     const endEvent = isMobileAccess()? 'touchend' : 'mouseup'

//     initlist.ball.on( startEvent ,function(e){
//         isMove = true
//     })

//     function check(move,offset){
//         if(move-offset+25>MYcanvas.canvasWrap.width() || move-offset<0){
//             ctx.clearRect(0, 0, canvas.width(), canvas.height());
//                 ctx.fill();
//                 ctx.drawImage(image, 0, 20);
//                 MYcanvas.render(0)
//                 initlist.progress.css('width',0) 
//                 initlist.ball.css('left',0) 
//                 return false
//         }
//         return true
//     }

//     // 控制是否移動、圖片跟滑動條的移動距離邏輯
//     initlist.ballWrap.on( moveEvent ,function(e){
//         let checkmove = e.clientX || e.touches[0].clientX
//         wrapOffset = initlist.ballWrap.offset().left
//         // 移動距離扣除外層的offset距離，即為初始移動位置
//         if(isMove){
//             if(check(checkmove,wrapOffset)){ // 確認邊界Fn
//                 ctx.clearRect(0, 0, incanvas.width(), canvas.height());
//                 ctx.fill();
//                 ctx.drawImage(image, (checkmove-wrapOffset-imgWidth), 20);
//                 MYcanvas.render((checkmove-wrapOffset))
//                 initlist.progress.css('width',checkmove-wrapOffset-25 + 'px') 
//                 initlist.ball.css('left',checkmove-wrapOffset-25 + 'px')
//             }
//         }
//     })

//     initlist.ball.on( endEvent ,function(e){
//         isMove = false
//         let checkmove = e.clientX || e.changedTouches[0].clientX
//         stopplace = (checkmove-wrapOffset)
//         if(stopplace>MYcanvas.initplace-5 && stopplace<MYcanvas.initplace + 5){
//             alert('成功')
//         }
//     })
