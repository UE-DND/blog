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
      --animation-duration: 300ms;
      --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* 彻底禁用深色模式切换的过渡效果 */
    html, body, body *, .dark, .dark *, [class*='dark:'], [class*='dark:'] * {
      transition: none !important;
    }
    
    /* 仅保留必要的过渡效果 */
    .sidebar-transition {
      transition: width var(--animation-duration) var(--animation-timing) !important;
    }
    
    /* 为按钮保留hover效果 */
    button:hover, a:hover {
      transition: transform 0.2s ease !important;
    }

    ${GLOBAL_CSS}

  `}</style>)
}

export { GlobalStyle }
