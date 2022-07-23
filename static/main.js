let enterBut = document.querySelector('#enter')
let blackBack = document.querySelector('.black')

enterBut.addEventListener('click', function() {
    // console.log(event.target)
    // blackBack.style.animation = "3s fadeOut forward"
    blackBack.style.backgroundColor = "rgba(255, 0, 0, 0);"
})