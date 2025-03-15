import { siteConfig } from '@/lib/config'
import Link from 'next/link'

const Logo = props => {
  return (
    <section className='flex'>
      <Link
        href="/"
        className="logo group relative overflow-hidden rounded-lg px-6 py-3 text-lg font-bold tracking-wider text-black hover:text-white dark:text-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2),0_6px_6px_rgba(0,0,0,0.15)] before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-gray-400/40 before:to-gray-500/40 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300 border-2 border-black/80 dark:border-gray-300/80 shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:translate-y-[-2px] font-[system-ui] text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white hover:from-white hover:to-white dark:hover:from-white dark:hover:to-white [text-shadow:_3px_3px_2px_rgb(0_0_0_/_20%)]">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-full">
          <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
          </svg>
          回到首页
        </span>
        <span className="group-hover:opacity-0 transition-opacity duration-300">{siteConfig('TITLE')}</span>
      </Link>
    </section>
  )
}

export default Logo
