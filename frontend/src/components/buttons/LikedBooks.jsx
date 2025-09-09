const LikedBooks = ({ label = 'Liked Books', count = 0 }) => {
  return (
    <>
        <span className='bg-red-200 ml-3 ring-1 ring-red-400 px-2 py-2 rounded-xl'>
            {label} {count}
        </span>
    </>
  )
}

export default LikedBooks