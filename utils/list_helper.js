const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) =>{
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => {
    return (blog.likes || 0) > (favorite.likes || 0) ? blog : favorite
  }, {})
}

export default {
  dummy,
  totalLikes,
  favoriteBlog

}