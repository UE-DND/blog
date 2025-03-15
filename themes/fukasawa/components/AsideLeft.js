import DarkModeButton from '@/components/DarkModeButton'
import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import CONFIG from '@/themes/fukasawa/config'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Announcement from './Announcement'
import Catalog from './Catalog'
import GroupCategory from './GroupCategory'
import GroupTag from './GroupTag'
import Logo from './Logo'
import MailChimpForm from './MailChimpForm'
import { MenuList } from './MenuList'
import SearchInput from './SearchInput'
import SocialButton from './SocialButton'
import { useFukasawaGlobal } from '../index'

/**
 * 侧边栏
 * @param {*} props
 * @returns
 */
function AsideLeft(props) {
  const {
    tagOptions,
    currentTag,
    categoryOptions,
    currentCategory,
    post,
    slot,
    notice
  } = props
  const router = useRouter()
  const { fullWidth, isDarkMode, toggleDarkMode } = useGlobal()
  const { isCollapsed } = useFukasawaGlobal() // 使用主题全局状态

  const FUKASAWA_SIDEBAR_COLLAPSE_SATUS_DEFAULT =
    fullWidth ||
    siteConfig('FUKASAWA_SIDEBAR_COLLAPSE_SATUS_DEFAULT', null, CONFIG)

  const FUKASAWA_SIDEBAR_COLLAPSE_ON_SCROLL = siteConfig(
    'FUKASAWA_SIDEBAR_COLLAPSE_ON_SCROLL',
    false,
    CONFIG
  )

  const FUKASAWA_SIDEBAR_COLLAPSE_BUTTON = siteConfig(
    'FUKASAWA_SIDEBAR_COLLAPSE_BUTTON',
    null,
    CONFIG
  )

  const isReverse = siteConfig('LAYOUT_SIDEBAR_REVERSE')
  const position = useMemo(() => {
    if (isCollapsed) {
      if (isReverse) {
        return 'right-2'
      } else {
        return 'left-2'
      }
    } else {
      if (isReverse) {
        return 'right-80'
      } else {
        return 'left-80'
      }
    }
  }, [isCollapsed])

  // 检查是否是首页
  const isHomePage = router.pathname === '/' || router.pathname === '/page/[page]'
  const isPostPage = router.pathname.indexOf('/[slug]') > -1

  // 自动折叠侧边栏 onResize 窗口宽度小于1366 || 滚动条滚动至页面的300px时 ; 将open设置为false
  useEffect(() => {
    if (!FUKASAWA_SIDEBAR_COLLAPSE_ON_SCROLL) {
      return
    }
    const handleResize = debounce(() => {
      if (window.innerWidth < 1366 || window.scrollY >= 1366) {
        // setIsCollapse(true)
      } else {
        // setIsCollapse(false)
      }
    }, 100)

    if (post) {
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleResize, { passive: true })
    }

    return () => {
      if (post) {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleResize, { passive: true })
      }
    }
  }, [])

  return (
    <div
      className={`sideLeft relative duration-500 transition-all bg-white dark:bg-hexo-black-gray min-h-screen hidden lg:block z-20 ${isCollapsed ? 'w-0 opacity-0 invisible' : 'w-80 opacity-100 visible'}`}>
      
      <div className={`h-full ${isCollapsed ? 'hidden' : 'p-8'}`}>
        <Logo {...props} />

        <section className='siteInfo flex flex-col dark:text-gray-300 pt-8'>
          {siteConfig('DESCRIPTION')}
        </section>

        {/* 分类部分 - 移到菜单前面 */}
        {router.asPath !== '/category' && (
          <section className='flex flex-col'>
            <div className='w-12 my-4' />
            <GroupCategory
              categories={categoryOptions}
              currentCategory={currentCategory}
            />
          </section>
        )}

        <section className='flex flex-col text-gray-600'>
          <div className='w-12 my-4' />
          <MenuList {...props} />
        </section>

        <section className='flex flex-col text-gray-600'>
          <div className='w-12 my-4' />
          <SearchInput {...props} />
        </section>

        <section className='flex flex-col dark:text-gray-300'>
          <div className='w-12 my-4' />
          <Announcement post={notice} />
        </section>

        <section>
          <MailChimpForm />
        </section>

        <section>
          <AdSlot type='in-article' />
        </section>

        <section className='flex flex-col'>
          <div className='w-12 my-4' />
          <SocialButton />
          <footer className='relative leading-6 justify-start w-full text-gray-600 dark:text-gray-300 text-xs'>
            <span>Copyright © 2025 UE-DND. 保留所有权利。</span>
          </footer>
        </section>

        {/* 文章目录和Live2D组件包装在一个section内，使用sticky定位 */}
        {isPostPage && post?.toc && post.toc.length > 0 && (
          <section className='sticky top-0 pt-12' style={{ position: 'sticky', top: 0 }}>
            <div className='text-sm font-bold dark:text-gray-300 mb-3'>
              <i className='mr-1 fas fa-stream' />
              文章目录
            </div>
            <div className='catalog-wrapper bg-white dark:bg-hexo-black-gray w-full overflow-hidden'>
              <Catalog toc={post.toc} />
            </div>
            
            {/* Live2D组件 */}
            {post && (
              <div id="live2d-container" className='flex justify-center mt-4' style={{ height: '250px', minHeight: '250px' }}>
                {slot && <div>{slot}</div>}
              </div>
            )}
          </section>
        )}
        
        {/* 非文章页面只显示Live2D组件 */}
        {(!isPostPage || !post?.toc || post.toc.length === 0) && post && (
          <section className='pt-4'>
            <div id="live2d-container" className='flex justify-center' style={{ height: '250px', minHeight: '250px' }}>
              {slot && <div>{slot}</div>}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default AsideLeft

/* 将按钮添加到组件外部，确保它们在正确的位置 */
export function SidebarButtons() {
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const { isCollapsed, toggleSidebar } = useFukasawaGlobal() // 使用主题全局状态
  const FUKASAWA_SIDEBAR_COLLAPSE_BUTTON = siteConfig(
    'FUKASAWA_SIDEBAR_COLLAPSE_BUTTON',
    null,
    CONFIG
  )
  
  return (
    <>
      {/* 重新样式化的折叠按钮，固定在右下角 */}
      {FUKASAWA_SIDEBAR_COLLAPSE_BUTTON && (
        <div
          className="fixed z-50 border dark:border-gray-600 p-3 rounded-full shadow-lg hover:scale-110 cursor-pointer bg-white dark:bg-black dark:text-white flex items-center justify-center"
          style={{ 
            position: 'fixed', 
            right: '1rem', 
            bottom: '11rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onClick={toggleSidebar}>
          <div className="w-5 h-5 flex items-center justify-center dark:text-gray-200 text-gray-800">
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <i className='fas fa-angle-left'></i>
            )}
          </div>
        </div>
      )}
      
      {/* 深色模式切换按钮，固定在折叠按钮下方 */}
      <div
        className="fixed z-50 border dark:border-gray-600 p-3 rounded-full shadow-lg hover:scale-110 cursor-pointer bg-white dark:bg-black dark:text-white flex items-center justify-center"
        style={{ 
          position: 'fixed', 
          right: '1rem', 
          bottom: '7rem',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onClick={toggleDarkMode}
      >
        <div className="w-5 h-5 flex items-center justify-center dark:text-gray-200 text-gray-800">
          {isDarkMode ? 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>}
        </div>
      </div>

      {/* 回到顶部按钮 */}
      <div
        className="fixed z-50 border dark:border-gray-600 p-3 rounded-full shadow-lg hover:scale-110 cursor-pointer bg-white dark:bg-black dark:text-white flex items-center justify-center"
        style={{ 
          position: 'fixed', 
          right: '1rem', 
          bottom: '3rem',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
      >
        <div className="w-5 h-5 flex items-center justify-center dark:text-gray-200 text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </>
  )
}
