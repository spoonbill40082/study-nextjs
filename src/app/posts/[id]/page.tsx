import React from 'react'


//  -----   아이디에 맞는 디테일한 정보 가져오기  -----   //

// fetch 사용해 데이터 불러오기
// ID에 맞는 정보를 가져와야 하므로 post의 Id를 인수로 삼아야 한다.

// revalidating data: 캐시된 데이터를 일정 시간 간격으로 재검증하려면 next revalidate 옵션을 사용하면 된다(단위: 초).
async function getPost(postId: string) {
  const response = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
    {next: {revalidate: 10}}
  ) 

  if (!response.ok) {
    // if문을 통해 에러 잡아내기.
    // 이 컴포넌트와 가장 가까이에 있는 error.js 파일이 활성화된다.
    // 이 경우에는 같은 폴더에 있는 error.tsx 파일이 활성화된다.
    throw new Error("FAIL TO FETCH DATA!")
  }
  const data = await response.json()
  return data

}

// generateStaticParams 사용하기
// 레이아웃 또는 페이지가 생성되기 전에, 빌드 시간에 실행된다.
// revalidation 중에는 다시 호출되지 않는다.
// parameter: 변수

const PostdetailPage = async ({params}: any) => {    
  const post = await getPost(params.id)

  return (
    <div>
      <h1>posts/{post.id}</h1>
      <div>
        <h3>TITLE: {post.title}</h3>
        <p>CREATED: {post.created}</p>
        <p>UPDATED: {post.updated}</p>
      </div>
    </div>
    
  )
}

export default PostdetailPage
