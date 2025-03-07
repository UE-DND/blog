/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    /* 全局深色模式切换策略 */
    :root {
      --transition-duration: 0ms; /* 颜色过渡时间设为0，以避免延迟 */
      --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
      --animation-duration: 300ms; /* 位置动画时间保持为300ms */
    }
    
    /* 立即切换颜色相关属性 */
    body, div, span, h1, h2, h3, h4, h5, p, a, button, input, textarea, footer, header, nav, article {
      transition-property: none !important; /* 禁用所有过渡属性 */
    }
    
    /* 仅对位置和尺寸属性使用过渡 */
    .position-transition {
      transition-property: transform, width, height, top, bottom, left, right, margin, padding !important;
      transition-duration: var(--animation-duration) !important;
      transition-timing-function: var(--animation-timing) !important;
    }
    
    /* 确保侧边栏收缩有动画效果 */
    #theme-fukasawa .sideLeft, #theme-fukasawa #wrapper {
      transition: width var(--animation-duration) var(--animation-timing) !important;
    }
    
    // 底色
    body{
        background-color: #eeedee;
    }
    .dark body{
        background-color: black;
    }
    
    /* fukasawa的首页响应式分栏 */
    #theme-fukasawa .grid-item {
        height: auto;
        break-inside: avoid-column;
        margin-bottom: .5rem;
    }
    
    /* 大屏幕（宽度≥1024px）下显示3列 */
    @media (min-width: 1024px) {
        #theme-fukasawa .grid-container {
        column-count: 3;
        column-gap: .5rem;
        }
    }
    
    /* 小屏幕（宽度≥640px）下显示2列 */
    @media (min-width: 640px) and (max-width: 1023px) {
        #theme-fukasawa .grid-container {
        column-count: 2;
        column-gap: .5rem;
        }
    }
    
    /* 移动端（宽度<640px）下显示1列 */
    @media (max-width: 639px) {
        #theme-fukasawa .grid-container {
        column-count: 1;
        column-gap: .5rem;
        }
    }

    /* 确保侧边栏宽度固定并具有动画效果 */
    #theme-fukasawa .sideLeft:not(.w-0) {
        width: 20rem !important;
        min-width: 20rem !important;
        max-width: 20rem !important;
        flex: 0 0 20rem !important;
        transition: width var(--animation-duration) var(--animation-timing), min-width var(--animation-duration) var(--animation-timing) !important;
    }
    
    /* 为Live2D预留固定空间 */
    #theme-fukasawa .sideLeft #live2d-container,
    #theme-fukasawa .sideLeft #live2d-wrapper {
        width: 280px;
        height: 250px;
        margin: 0 auto;
        display: block;
    }
    
    /* 确保主内容区域适当填充剩余空间和动画效果 */
    #theme-fukasawa #wrapper {
        flex: 1 1 auto;
        width: calc(100% - 20rem);
        transition: width var(--animation-duration) var(--animation-timing) !important;
        will-change: width;
    }
    
    /* 当侧边栏折叠时的主内容区域 */
    #theme-fukasawa .w-0 + #wrapper {
        width: 100%;
    }

    /* 文章目录样式优化 */
    #theme-fukasawa .catalog-wrapper {
        scrollbar-width: thin;
        scrollbar-color: rgba(100, 100, 100, 0.4) transparent;
        border-radius: 0.375rem;
        padding: 0.5rem 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        transition: none !important;
    }
    
    #theme-fukasawa .catalog-wrapper::-webkit-scrollbar {
        width: 4px;
    }
    
    #theme-fukasawa .catalog-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }
    
    #theme-fukasawa .catalog-wrapper::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.4);
        border-radius: 3px;
    }
    
    #theme-fukasawa .catalog-item {
        transition: none !important;
    }
    
    /* 确保收缩按钮和深色模式按钮可以使用动画 */
    .animated-button {
      transition: transform 0.2s ease !important;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        padding: 10px;
    }

  `}</style>
}

export { Style }

