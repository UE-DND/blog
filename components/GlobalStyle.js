/* eslint-disable react/no-unknown-property */

import { siteConfig } from '@/lib/config'

/**
 * 这里的css样式对全局生效
 * 主题客制化css
 * @returns
 */
const GlobalStyle = () => {
  // 从NotionConfig中读取样式
  const GLOBAL_CSS = siteConfig('GLOBAL_CSS')
  return (<style jsx global>{`
    /* 全局变量定义 */
    :root {
      --motion-transition: 300ms;
      --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* 禁用深色模式颜色类属性的过渡效果 */
    html.dark [class*='dark:'],
    html.dark [class*='dark:'] *,
    html.light [class*='dark:'],
    html.light [class*='dark:'] * {
      transition-property: none !important;
    }
    
    /* 为其他元素保留过渡效果 */
    .transition-motion {
      transition: transform var(--motion-transition) var(--animation-timing),
                 box-shadow var(--motion-transition) var(--animation-timing),
                 opacity var(--motion-transition) var(--animation-timing) !important;
    }
    
    /* 让黑暗模式切换更快 */
    *, .dark *, html, body {
      transition-property: none !important;
    }
    
    /* 特殊处理按钮和交互元素 */
    button, a {
      transition: transform 200ms ease, box-shadow 200ms ease !important;
    }
    
    /* 修复图片hover效果 */
    img {
      transition: transform var(--motion-transition) var(--animation-timing) !important;
    }

    ${GLOBAL_CSS}

  `}</style>)
}

export { GlobalStyle }
