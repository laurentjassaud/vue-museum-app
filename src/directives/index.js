import Vue from 'vue'

let setValue = function (el, binding) {
    let img = new Image()
    img.src = binding.value

    img.onload = () => {
        el.src = img.src
        el.classList.add("is-loaded")
    }
}

Vue.directive('img', {

    bind: function (el, binding) {
        setValue(el, binding)
    },

    update: function (el, binding) {        
        setValue(el, binding)
    }
})
