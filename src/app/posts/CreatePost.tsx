'use client'


import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreatePost = () => {

  // state 변경 시 사용할 기본값 설정
  const [title, setTitle] = useState('')
  // 라우터 리프레시를 위해 useRouter 가져오기
  const router = useRouter()

  // 입력 버튼을 눌렀을 때 작성한 내용을 어느 데이터베이스에 넣을지 설정.
  // <HTMLFormElement>은 DOM의 요소입니다. 이는 양식의 측면에 대한 액세스 및 경우에 따라 수정은 물론 해당 구성요소 요소에 대한 액세스도 허용합니다.
  // 옵션 객체: fetch 함수의 두 번째 인자로, 요청에 대한 설정을 포함합니다.
  // method: 이 요청의 HTTP 메소드를 지정합니다. 여기서는 'POST'를 사용하여 서버로 데이터를 전송합니다.
  // headers: 이 요청의 헤더를 지정합니다. 여기서는 JSON 형식의 데이터를 전송할 것이므로, 'Content-Type'을 'application/json'으로 설정합니다.
  // body: 요청의 본문에 해당하는 데이터를 지정합니다. 여기서는 JavaScript의 JSON.stringify 함수를 사용하여 JavaScript 객체를 JSON 문자열로 변환합니다. 이때 객체에는 'title'이라는 키에 해당하는 값을 가지고 있습니다.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch('http://127.0.0.1:8090/api/collections/posts/records', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title
        })
      })
      // 입력 작업에 사용할 수 있도록 setTitle을 다시 빈 string으로 만들어준다.
      setTitle('')
      // 다음과 같이 써주면 input에 입력한 뒤 클릭을 하거나 엔터 키를 눌렀을 때 서버에 올라가며 리프레시된다.
      router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className=' bg-orange-300'
        type='text'
        placeholder='TITLE'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit' className=' bg-blue-300'>
        CREATE POST!
      </button>
    </form>
  )
}

export default CreatePost