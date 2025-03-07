/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
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

    /* 确保侧边栏宽度固定 */
    #theme-fukasawa .sideLeft:not(.w-0) {
        width: 20rem !important;
        min-width: 20rem !important;
        max-width: 20rem !important;
        flex: 0 0 20rem !important;
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

    .container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
            padding: 10px;
        }

  `}</style>
}

export { Style }

