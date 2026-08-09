import { useState, useEffect } from 'react'

function useResponsiveValue(mobileValue, desktopValue, breakpoint = 768) {
    const [value, setValue] = useState(
        typeof window !== 'undefined' && window.innerWidth < breakpoint 
            ? mobileValue 
            : desktopValue
    )

    useEffect(() => {
        const handleResize = () => {
            setValue(window.innerWidth < breakpoint ? mobileValue : desktopValue)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [mobileValue, desktopValue, breakpoint])

    return value
}

export default useResponsiveValue