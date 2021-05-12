export default {
  bind (el, binding) {
    let oDiv = el
    let canDrag = false
    oDiv.onmousedown = function (e) {
      canDrag = true
      let oX = e.target.offsetLeft
      let oY = e.target.offsetTop
      let startX = e.clientX
      let startY = e.clientY
      document.onmousemove = function (e) {
        if (canDrag) {
          let endX = e.clientX
          let endY = e.clientY
          let diffX = endX - startX + oX
          let diffY = endY - startY + oY
          binding.value({x: diffX, y: diffY})
          return false
        }
      }
      document.onmouseup = function (e) {
        canDrag = false
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  update () {

  },
  unbind (el, binding) {

  }
}
