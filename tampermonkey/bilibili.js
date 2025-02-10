// ==UserScript==
// @name         Bilibili净化
// @namespace    http://tampermonkey.net/
// @version      2025-02-09
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/*
// @match        https://t.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 你要模糊的 div 的选择器
    const blurSelectors = ['.bili-dyn-card-video__stat__item', '.view', '.playinfo', '.carousel-inner__img', '.cover', '.bili-video-card__cover', '.bpx-player-ending-related', '.pic-box', '.bili-video-card__stats--left'];
    const hideSelectors = ['.loc-mc-box', '.bili-dyn-topic-box', '.bili-dyn-live-users__item__living', '.bili-dyn-banner', '.trending'];

    // 模糊处理函数
    function blurDivs(selector) {
        const divs = document.querySelectorAll(selector);
        divs.forEach(div => {
            div.style.filter = 'blur(5px)';
        });
    }
    function hideDivs(selector) {
        const divs = document.querySelectorAll(selector);
        divs.forEach(div => {
            div.style.display = 'none';
        });
    }

    // 初始模糊处理
    blurSelectors.forEach((s) => {
        blurDivs(s);
    });
    hideSelectors.forEach((s) => {
        hideDivs(s);
    });

    // 监听 DOM 变化并处理新加载的内容
    const observer = new MutationObserver((mutations) => {
        console.log("muting: ", mutations[0].type);
        const input = document.querySelectorAll('.nav-search-input');
        input.forEach((i => { i.placeholder = ''; }));

        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                blurSelectors.forEach((s) => {
                    blurDivs(s);
                });
                hideSelectors.forEach((s) => {
                    hideDivs(s);
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
