import Link from 'next/link'
import React from 'react'
import CreatePost from './CreatePost'


//   -----   Static Data Fetching  -----  //
// 데이터 가져오는 함수 만들기: fetch 사용
// '주소/api/collections(데이터 콜렉션)/콜렉션 이름/레코드하기'
// json 데이터 불러오기
// 데이터 받아와서 return하기

// 한 번 데이터를 가져오면 캐시가 된다. 
// 캐시를 하지 않고 데이터를 요청할 때마다 가져오게 하려면
// getPost() 안에 cache에 대한 옵션을 주면 된다.

async function getPost() {
  const response = await fetch('http://127.0.0.1:8090/api/collections/posts/records', 
    {cache: 'no-store'}
  )
  const data = await response.json()
  return data?.items as any[]
}

const PostPage = async() => {
// getPost 함수 실행
  const posts = await getPost()
  console.log('posts', posts)

  return (
    <div>
      <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>Posts</h1>
      {/* post 내용이 존재하는지? (있다면) map을 이용해 post의 내용을 출력한다 */}
      {posts?.map((post) => {
        return <PostItem key={post.id} post={post}/>
      })}
      <CreatePost/>
    </div>
  )
}

export default PostPage

// 서버 데이터의 id값으로 링크 달아주기
// Posts 콜렉션의 정보 가져오기(id, title, created)
const PostItem = ({post}: any) => {
  const {id, title, created, updated} = post || {}
  return (
    <Link href={`/posts/${id}`}>
      <div>
        <h3 style={{fontWeight: 'bold'}}>
          {title}
        </h3>
        <p>[{created}], [{updated}]
        </p>
      </div>
    </Link>
  )
}