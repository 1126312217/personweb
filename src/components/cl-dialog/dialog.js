import Vue from 'vue'
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            const clientWidth = document.body.clientWidth;
            const clientHeight = document.body.clientHeight;
            // 相对定位的left/top偏移量
            let styL, styT;
            if (sty.left.includes('%')) {
                styL = +clientWidth * (+sty.left.replace(/%/g, '') / 100);
            } else if (sty.left.includes('px')) {
                styL = +sty.left.replace(/\px/g, '');
            } else {
                styL = 0
            }
            if (sty.top.includes('%')) {
                styT = +clientHeight * (+sty.top.replace(/%/g, '') / 100);
            } else if (sty.top.includes('px')) {
                styT = +sty.top.replace(/\px/g, '');
            } else {
                styT = 0
            }
            // dialog的宽高
            let styW, styH;
            if (sty.width.includes('%')) {
                styW = +clientWidth * (+sty.width.replace(/%/g, '') / 100);
            } else if (sty.width.includes('px')) {
                styW = +sty.width.replace(/\px/g, '');
            } else {
                styW = dragDom.offsetWidth
            }
            if (sty.height.includes('%')) {
                styH = +clientHeight * (+sty.height.replace(/%/g, '') / 100);
            } else if (sty.height.includes('px')) {
                styH = +sty.height.replace(/\px/g, '');
            } else {
                styH = dragDom.offsetHeight
            }
            // 最大移动距离
            let maxMoveToLeft = -(clientWidth / 2 - styW / 2);
            let maxMoveToRight = clientWidth / 2 - styW / 2;
            let maxMoveToTop = -(clientHeight / 2 - styH / 2);
            let maxMoveToBottom = clientHeight / 2 - styH / 2;
            document.onmousemove = function (ev) {
                // 通过事件委托，计算移动的距离
                let l = ev.clientX - disX;
                let resL = l + (styL - 0);
                // 限制弹窗不可移出窗口可视区
                if (resL <= maxMoveToLeft) {
                    resL = maxMoveToLeft
                }
                if (resL >= maxMoveToRight) {
                    resL = maxMoveToRight
                }
                let t = ev.clientY - disY;
                let resT = t + (styT - 0);
                if (resT <= maxMoveToTop) {
                    resT = maxMoveToTop
                }
                if (resT >= maxMoveToBottom) {
                    resT = maxMoveToBottom
                }
                // 移动当前元素
                dragDom.style.left = `${resL}px`;
                dragDom.style.top = `${resT}px`;
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
})