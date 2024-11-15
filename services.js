function showPage (index) {
    const pageList = document.querySelectorAll('.page');
    pageList.forEach(page => page.classList.remove('active'));
    const pageBtnList = document.querySelectorAll('.page_btn');
    pageBtnList.forEach(page => page.classList.remove('active'));
    pageBtnList[index].classList.add('active');
    pageList[index].classList.add('active');
}

function loadPage(pageIndex) {
    const pageArea = document.getElementById("page_area");
    pageArea.innerHTML = ''; // 清空当前页面内容

    // 根据页面索引加载对应的 HTML 文件
    const pages = [
        '/pages/page_1/index.html',
        '/pages/page_2/index.html',
        '/pages/page_3/index.html',
        '/pages/page_4/index.html',
    ];
    fetch(pages[pageIndex])
        .then(response => response.text())
        .then(data => {
            pageArea.innerHTML = data; // 加载 HTML 内容
            updateActiveTab(pageIndex); // 更新按钮的激活状态
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

// 初次加载页面 1
window.onload = function() {
    loadPage(0); // 默认加载第一页
}