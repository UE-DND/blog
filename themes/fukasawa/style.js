/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    /* 全局过渡效果 */
    .transition-all {
      transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
    }

    /* 侧边栏动画 */
    #theme-fukasawa .sideLeft {
      transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
    }
    
    /* 主内容区域动画 */
    #theme-fukasawa #wrapper {
      transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
    }

    /* 博客卡片图片动画 */
    .blog-item {
      overflow: hidden;
    }

    .blog-item img {
      transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
      transform: scale(1);
    }

    .blog-item:hover img {
      transform: scale(1.1);
    }

    /* 按钮动画 */
    .hover\\:scale-110 {
      transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
    }

    .hover\\:scale-110:hover {
      transform: scale(1.1);
    }

    /* 深色模式切换动画 */
    .dark .dark\\:text-white,
    .dark .dark\\:bg-black,
    .dark .dark\\:border-gray-600,
    .dark .dark\\:bg-hexo-black-gray {
      transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
    }

    /* 确保侧边栏宽度固定 */
    #theme-fukasawa .sideLeft:not(.w-0) {
      width: 20rem !important;
      min-width: 20rem !important;
      max-width: 20rem !important;
      flex: 0 0 20rem !important;
    }
    
    // 底色
    body{
        background-color: #eeedee;
    }
    .dark body{
        background-color: #111827;
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

    /* 为Live2D预留固定空间 */
    #theme-fukasawa .sideLeft #live2d-container,
    #theme-fukasawa .sideLeft #live2d-wrapper {
        width: 280px;
        height: 250px;
        margin: 0 auto;
        display: block;
    }
    
    /* 确保主内容区域适当填充剩余空间 */
    #theme-fukasawa #wrapper {
        flex: 1 1 auto;
        width: calc(100% - 20rem);
    }
    
    /* 当侧边栏折叠时的主内容区域 */
    #theme-fukasawa .w-0 + #wrapper {
        width: 100%;
    }

    /* 目录容器样式 */
    #theme-fukasawa .catalog-content {
        scrollbar-width: none;
        -ms-overflow-style: none;
        max-height: calc(100vh - 400px);
        overflow-y: auto;
        padding-right: 10px;
    }
    
    /* 滚动条样式 */
    #theme-fukasawa .catalog-content::-webkit-scrollbar {
        width: 4px;
        background: transparent;
    }
    
    #theme-fukasawa .catalog-content::-webkit-scrollbar-track {
        background: transparent;
        border: none;
    }
    
    #theme-fukasawa .catalog-content::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.2);
        border-radius: 4px;
        border: none;
    }
    
    #theme-fukasawa .catalog-content:hover::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.4);
    }
    
    /* 目录项目样式 */
    #theme-fukasawa .catalog-item {
        color: inherit;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
    
    /* 深色模式下的目录字体颜色 */
    .dark #theme-fukasawa .catalog-content .catalog-item {
        color: #9ca3af;  /* 使用浅灰色 */
    }
    
    .dark #theme-fukasawa .catalog-content .catalog-item.active {
        color: #fff;  /* 当前阅读段落保持白色 */
    }
    
    /* 目录项文本样式 */
    #theme-fukasawa .catalog-item span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 10px);
        display: inline-block;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        padding: 10px;
    }

    /* 联系方式图标和文本间距调整 */
    #theme-fukasawa .sideLeft section:nth-child(9) .w-full.justify-center.flex-wrap.flex {
      margin-bottom: 0.5rem;
    }

  `}</style>
}

export { Style }

