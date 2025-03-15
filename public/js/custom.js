// 这里编写自定义js脚本；将被静态引入到页面中

// 初始化时隐藏滚动条
document.addEventListener('DOMContentLoaded', () => {
  // 设置滚动条为细样式
  document.documentElement.style.scrollbarWidth = 'thin';
  // 默认隐藏滚动条
  document.documentElement.classList.remove('scrolling');
});

// 监听滚动事件控制滚动条显示
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', function() {
  const images = document.querySelectorAll('#container > div > img, .notion-image');
  
  if (!isScrolling) {
    isScrolling = true;
    document.documentElement.classList.add('scrolling');
    images.forEach(img => img.classList.add('scrolling'));
  }
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.documentElement.classList.remove('scrolling');
    images.forEach(img => img.classList.remove('scrolling'));
  }, 1200);
}, { passive: true });