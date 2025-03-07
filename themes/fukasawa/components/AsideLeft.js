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
import SiteInfo from './SiteInfo'
import SocialButton from './SocialButton'

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
  const { fullWidth } = useGlobal()

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

  // 侧边栏折叠从 本地存储中获取 open 状态的初始值
  const [isCollapsed, setIsCollapse] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('fukasawa-sidebar-collapse') === 'true' ||
        FUKASAWA_SIDEBAR_COLLAPSE_SATUS_DEFAULT
      )
    }
    return FUKASAWA_SIDEBAR_COLLAPSE_SATUS_DEFAULT
  })

  // 在组件卸载时保存 open 状态到本地存储中
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('fukasawa-sidebar-collapse', isCollapsed)
    }
  }, [isCollapsed])

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

  // 折叠侧边栏
  const toggleOpen = () => {
    setIsCollapse(!isCollapsed)
  }

  // 自动折叠侧边栏 onResize 窗口宽度小于1366 || 滚动条滚动至页面的300px时 ; 将open设置为false
  useEffect(() => {
    if (!FUKASAWA_SIDEBAR_COLLAPSE_ON_SCROLL) {
      return
    }
    const handleResize = debounce(() => {
      if (window.innerWidth < 1366 || window.scrollY >= 1366) {
        setIsCollapse(true)
      } else {
        setIsCollapse(false)
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
      className={`sideLeft relative ${isCollapsed ? 'w-0' : 'w-80'} transition-all ease-in-out duration-200 bg-white dark:bg-hexo-black-gray min-h-screen hidden lg:block z-20 overflow-hidden`}
      style={{ width: isCollapsed ? '0' : '20rem' }}>
      
      {/* 重新样式化的折叠按钮，放在右下角深色模式切换按钮上方 */}
      {FUKASAWA_SIDEBAR_COLLAPSE_BUTTON && (
        <div
          className="fixed right-4 bottom-20 z-50 border dark:border-gray-600 p-3 rounded-full shadow-lg hover:scale-110 duration-200 cursor-pointer bg-white dark:bg-black dark:text-white flex items-center justify-center"
          onClick={toggleOpen}>
          <div className="w-5 h-5 flex items-center justify-center dark:text-gray-200 text-gray-800">
            {isCollapsed ? (
              <i className='fas fa-angle-right'></i>
            ) : (
              <i className='fas fa-angle-left'></i>
            )}
          </div>
        </div>
      )}

      <div 
        className="absolute inset-0 w-80 transition-transform duration-200 ease-in-out"
        style={{ 
          transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)', 
          opacity: isCollapsed ? 0 : 1,
          transitionProperty: 'transform, opacity',
          padding: '2rem'
        }}>
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

        {router.asPath !== '/tag' && (
          <section className='flex flex-col'>
            <div className='w-12 my-4' />
            <GroupTag tags={tagOptions} currentTag={currentTag} />
          </section>
        )}

        <section className='flex flex-col'>
          <div className='w-12 my-4' />
          <SocialButton />
          <SiteInfo />
        </section>

        <section className='flex justify-center dark:text-gray-200 pt-4'>
          <DarkModeButton />
        </section>

        <section className='sticky top-0 pt-12 flex flex-col max-h-screen'>
          <Catalog toc={post?.toc} />
          <div id="live2d-container" className='flex justify-center' style={{ height: '250px', minHeight: '250px' }}>
            {slot && <div>{slot}</div>}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AsideLeft
