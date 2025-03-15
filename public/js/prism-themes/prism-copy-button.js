/**
 * 自定义Prism.js复制按钮文本
 * 根据浏览器语言环境显示不同的文本
 */
document.addEventListener('DOMContentLoaded', function() {
  // 获取浏览器语言
  const userLang = navigator.language || navigator.userLanguage;
  const isChinese = userLang.toLowerCase().startsWith('zh');
  
  // 设置复制按钮文本
  const copyText = isChinese ? '复制' : 'Copy';
  const copiedText = isChinese ? '已复制！' : 'Copied!';
  
  // 立即检查并更新现有按钮
  function updateExistingButtons() {
    const copyButtons = document.querySelectorAll('.toolbar-item button[data-copy-state="copy"]');
    copyButtons.forEach(function(button) {
      button.textContent = copyText;
    });
    
    const copiedButtons = document.querySelectorAll('.toolbar-item button[data-copy-state="copy-success"]');
    copiedButtons.forEach(function(button) {
      button.textContent = copiedText;
    });
  }
  
  // 初始运行一次更新现有按钮
  updateExistingButtons();
  
  // 监听DOM变化，为新添加的复制按钮设置文本
  const observer = new MutationObserver(function(mutations) {
    let shouldUpdate = false;
    
    mutations.forEach(function(mutation) {
      // 检查是否有新节点添加
      if (mutation.addedNodes.length) {
        shouldUpdate = true;
      }
      
      // 检查属性变化
      if (mutation.type === 'attributes' && 
          mutation.target.classList && 
          mutation.target.classList.contains('toolbar-item')) {
        shouldUpdate = true;
      }
    });
    
    if (shouldUpdate) {
      updateExistingButtons();
    }
  });
  
  // 开始观察document.body的变化，包括子树和属性
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'data-copy-state']
  });
  
  // 修改Prism.js的复制按钮点击事件
  const originalCopyToClipboard = Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(env) {
    const linkCopy = document.createElement('button');
    linkCopy.textContent = copyText;
    linkCopy.setAttribute('data-copy-state', 'copy');
    
    linkCopy.addEventListener('click', function() {
      // 复制成功后修改按钮文本
      setTimeout(function() {
        const copiedButtons = document.querySelectorAll('.toolbar-item button[data-copy-state="copy-success"]');
        copiedButtons.forEach(function(button) {
          button.textContent = copiedText;
        });
      }, 100);
    });
    
    return linkCopy;
  });
});