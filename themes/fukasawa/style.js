/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    /* 全局动画配置 */
    :root {
      --color-transition: 0ms;
      --motion-transition: 300ms;
      --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* 针对深色模式特殊处理 */
    html.dark *, html.light * {
      transition-property: color, background-color, border-color;
      transition-duration: 0ms !important;
    }
    
    /* 保留基本动画和过渡效果 */
    .blog-item, .blog-item img, a, button, .hover\:scale-110, .hover\:shadow-lg, .transform, .transition, .duration-200, .transition-all {
      transition: transform var(--motion-transition) var(--animation-timing),
                opacity var(--motion-transition) var(--animation-timing),
                box-shadow var(--motion-transition) var(--animation-timing) !important;
    }
    
    /* 特别处理博客文章卡片 */
    .blog-item img, .hover\:scale-105 {
      transition: transform var(--motion-transition) var(--animation-timing) !important;
    }
    
    /* 确保侧边栏收缩有动画效果 */
    .sidebar-transition, #theme-fukasawa .sideLeft, #theme-fukasawa #wrapper {
      transition: width var(--motion-transition) var(--animation-timing) !important;
    }
    
    // 底色立即切换
    body{
        background-color: #eeedee;
        transition: background-color 0ms !important;
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
        transition: width var(--motion-transition) var(--animation-timing), min-width var(--motion-transition) var(--animation-timing) !important;
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
        transition: width var(--motion-transition) var(--animation-timing) !important;
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
    }
    
    /* 目录项不需要滚动条 */
    #theme-fukasawa .catalog-item {
        color: inherit;
        transition: none !important;
    }
    
    /* 按钮动画效果 */
    .animated-button {
      transition: transform 0.2s ease, opacity 0.2s ease !important;
    }
    
    /* Hover动画效果 */
    .hover\:scale-110:hover {
      transform: scale(1.1);
    }
    
    /* 图片放大效果 */
    .blog-item:hover img {
      transform: scale(1.03);
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

