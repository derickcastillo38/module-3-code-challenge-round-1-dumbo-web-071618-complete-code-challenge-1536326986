document.addEventListener('DOMContentLoaded', function() {

  const imageId = 72 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(response => response.json())
  .then(image =>{
  imageImg = document.getElementById('image')
  imageImg.src = `${image.url}`
  imageImg.dataset.id = image.id
  imageName = document.getElementById('name')
  imageName.innerText = `${image.name}`
  imageLikes = document.getElementById('likes')
  imageLikes.innerText = `${image.like_count}`
  imageComments = document.getElementById('comments')
  imageLi = document.createElement('li')
  imageLi.innerText = `${image.comments}`

  likeButton = document.getElementById('like_button')
    likeButton.addEventListener('click', (event) => {
      ++imageLikes.innerText
      fetch(likeURL, {
        method: "POST",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          image_id: image.id
        })
      })
    })
  })
  commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    userInput = document.getElementById('comment_input')
    newLi = document.createElement('li')
    newLi.innerText = userInput.value
    imageComments.appendChild(newLi)
    userInput.value = ''
      fetch(commentsURL, {
        method: "POST",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          image_id: image.id,
          content: userInput.value
        })

      })
  })

})
