'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 오류 보고 서비스에 오류 기록
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>ㅈ됐다 에러 났다!</h2>
      <button
        onClick={
          // A세그먼트를 다시 렌더링하여 복구를 시도합니다.
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}