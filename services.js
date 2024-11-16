let cleanupFunction = null;

function loadPage(pageIndex) {
    const pageArea = document.getElementById("page_area");
    pageArea.innerHTML = ''; // 清空当前页面内容

    // 根据页面索引加载对应的 HTML 文件
    const pages = [
        '/pages/Home.html',
        '/pages/DCPower.html',
        '/pages/LAN.html',
        '/pages/Help.html',
    ];

    if (cleanupFunction) {
        cleanupFunction();
        cleanupFunction = null;
    }

    fetch(pages[pageIndex])
        .then(response => response.text())
        .then(data => {
            pageArea.innerHTML = data; // 加载 HTML 内容
            updateActiveTab(pageIndex); // 更新按钮的激活状态

            const existScript = document.getElementById('page_script');
            if (existScript) {
                existScript.remove();
            }
            const scripts = pageArea.querySelectorAll('script');
            scripts.forEach((script) => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                newScript.id = 'page_script';
                document.body.appendChild(newScript);
                script.remove();
            });
            if (typeof window.setupPageCleanup === 'function') {
                cleanupFunction = window.setupPageCleanup;
            }
        })
        .catch(error => console.error('加载页面失败:', error));
}

// 更新按钮的激活状态
function updateActiveTab(pageIndex) {
    const tabs = document.querySelectorAll('.page_btn');
    tabs.forEach((tab, index) => {
        if (index === pageIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// 初次加载页面
window.onload = function() {
    loadPage(1);
}
