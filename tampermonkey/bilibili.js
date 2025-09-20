// ==UserScript==
// @name         BilibiliVideo
// @namespace    http://tampermonkey.net/
// @version      2025-09-15
// @description  try to take over the world!
// @author       You
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    // 立即注入样式
    const style = document.createElement('style');
    style.id = 'hide-unwanted';
    style.textContent = `
        /* 你的选择器 */
        #biliMainHeader, .right-container, .strip-ad-inner, .bpx-player-ending, .act-end, .recommended-swipe, aside.right, div.trending{
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            overflow: hidden !important;
        }
    `;
    // 确保样式被添加到最早的可用位置
    if (document.documentElement) {
        document.documentElement.appendChild(style);
    }
    // 需要移除的参数列表
    const paramsToRemove = [
        'spm_id_from',
        'vd_source',
        'from_spmid',
        'share_source',
        'share_medium',
        'share_plat',
        'share_session_id',
        'share_tag',
        'share_times',
        'timestamp',
        'unique_k',
        'from',
        'seid'
    ];
    function cleanURL() {
        const url = new URL(window.location.href);
        let hasChanged = false;

        // 检查并移除指定参数
        paramsToRemove.forEach(param => {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
                hasChanged = true;
            }
        });

        // 如果URL有变化，使用replaceState更新地址栏
        if (hasChanged) {
            const cleanedURL = url.toString();
            window.history.replaceState(null, '', cleanedURL);
            console.log('已清理URL参数');
        }
    }

    // 立即执行一次
    cleanURL();
    // 监听页面变化（针对单页应用）
    let lastURL = window.location.href;
    const urlObserver = new MutationObserver(() => {
        const currentURL = window.location.href;
        if (currentURL !== lastURL) {
            lastURL = currentURL;
            cleanURL();
        }
    });
    // 开始监听
    urlObserver.observe(document, {
        subtree: true,
        childList: true
    });
})();
