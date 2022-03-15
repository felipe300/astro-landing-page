const reviewSlider = document.querySelector('.reviews')
const reviewBtns = document.querySelectorAll('.review-btn')
const reviews = [...document.querySelectorAll('.review')]
const indicators = [...document.querySelectorAll('.indicator')]

let isMoving = false
let currentReview = 1

const showActiveIndicator = () => {
  indicators.forEach((indicator) => indicator.classList.remove('active'))
  let activeIndicator

  if (activeIndicator === 0 || currentReview === reviews.length - 2) {
    activeIndicator = indicators.length - 1
  } else if (currentReview === 1 || currentReview === reviews.length - 1) {
    activeIndicator = 0
  } else {
    activeIndicator = currentReview - 1
  }

  indicators[activeIndicator].classList.add('active')
}

const moveSlider = () => {
  reviewSlider.style.transform = `translateX(-${currentReview * 100}%)`
  showActiveIndicator()
}

const handleReviewBtnClick = (e) => {
  if (isMoving) return
  isMoving = true
  e.currentTarget.id === 'next' ? currentReview++ : currentReview--
  moveSlider()
}

const handleIndicatorClick = (e) => {
  if (isMoving) return
  isMoving = true
  currentReview = indicators.indexOf(e.target) + 1
  moveSlider()
}

reviewBtns.forEach((btn) => {
  btn.addEventListener('click', handleReviewBtnClick)
})

indicators.forEach((indicator) => {
  indicator.addEventListener('click', handleIndicatorClick)
})

reviewSlider.addEventListener('transitionend', () => {
  isMoving = false
  if (currentReview === 0) {
    currentReview = reviews.length - 2
    reviewSlider.style.transitionDuration = '1ms'
    return moveSlider()
  }

  if (currentReview === reviews.length - 1) {
    currentReview = 1
    reviewSlider.style.transitionDuration = '1ms'
    return moveSlider()
  }

  reviewSlider.style.transitionDuration = '300ms'
})
