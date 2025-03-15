import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

/**
 * 目录导航组件
 * @param toc
 * @returns {JSX.Element}
 * @constructor
 */
const Catalog = ({ toc }) => {
  const { locale } = useGlobal()

  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)
  
  // 使用ref跟踪目录容器
  const catalogRef = useRef(null)
  
  // 目录项refs，用于跟踪每个目录项
  const itemRefs = useRef({})

  // 监听滚动事件，更新当前活动目录
  useEffect(() => {
    const throttleMs = 200
    const actionSectionScrollSpy = throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }
      setActiveSection(currentSectionId)
    }, throttleMs)

    actionSectionScrollSpy()
    window.addEventListener('scroll', actionSectionScrollSpy)
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [toc, activeSection])
  
  // 当活动章节变化时，自动滚动目录
  useEffect(() => {
    if (activeSection && catalogRef.current && itemRefs.current[activeSection]) {
      const catalogContainer = catalogRef.current
      const activeItem = itemRefs.current[activeSection]
      
      // 计算当前激活项目的位置
      const containerTop = catalogContainer.getBoundingClientRect().top
      const activeItemTop = activeItem.getBoundingClientRect().top
      const relativeTop = activeItemTop - containerTop
      
      // 如果激活项不在可视区域内，滚动使其可见
      if (relativeTop < 0 || relativeTop > catalogContainer.clientHeight - 50) {
        // 滚动位置计算: 当前项偏移 - 容器高度/2 (居中显示)
        catalogContainer.scrollTop = activeItem.offsetTop - (catalogContainer.clientHeight / 2) + (activeItem.clientHeight / 2)
      }
    }
  }, [activeSection])

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // 无目录就直接返回空
  if (!toc || toc?.length < 1) {
    return <></>
  }
  
  return (
    <div id='catalog' className='flex-1 flex-col'>
      <div ref={catalogRef} className='catalog-content' style={{ maxHeight: '70vh', overflowY: 'auto', scrollBehavior: 'smooth' }}>
        {toc.map((tocItem) => {
          const indentLevel = tocItem.depth - 1
          const indentSpace = indentLevel * 1
          const id = uuidToId(tocItem.id)
          return (
            <a
              key={id}
              ref={el => itemRefs.current[id] = el}
              href={`#${id}`}
              className={`${activeSection === id ? 'dark:border-white border-gray-800 text-gray-800 font-bold' : ''} hover:font-semibold border-l pl-4 block hover:text-gray-800 border-l mb-1 py-1 transform dark:text-gray-400 dark:border-gray-400
        notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item cursor-pointer`}
              style={{ paddingLeft: indentSpace + 'rem' }}
              onClick={(e) => handleClick(e, id)}
            >
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: tocItem.indentLevel * 16
                }}
                className={`truncate ${activeSection === id ? 'font-bold text-black dark:text-white underline' : ''}`}>
                {tocItem.text}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Catalog
