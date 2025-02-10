// ==UserScript==
// @name         Bilibili净化
// @namespace    http://tampermonkey.net/
// @version      2025-02-09
// @description  高斯模糊图片，隐藏热搜
// @author       You
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 你要模糊的 div 的选择器
    const unwantedDivSelectors = ['img', '.trending'];

    // 模糊处理函数
    function blurDivs(selector) {
        const divs = document.querySelectorAll(selector);
        divs.forEach(div => {
            div.style.filter = 'blur(5px)';
        });
    }

    // 初始模糊处理
    unwantedDivSelectors.forEach((s) => {
        blurDivs(s);
    });

    // 监听 DOM 变化并处理新加载的内容
    const observer = new MutationObserver((mutations) => {
        console.log("muting: ", mutations[0].type);
        const input = document.querySelectorAll('.nav-search-input');
        input.forEach((i => { i.placeholder = ''; }));

        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                unwantedDivSelectors.forEach((s) => {
                    blurDivs(s);
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
