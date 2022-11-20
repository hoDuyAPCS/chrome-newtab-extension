document.addEventListener('DOMContentLoaded', function () {
    var Clock = (function () {
        var exports = function (element) {
            this._element = element;
            var html = '';
            for (var i = 0; i < 6; i++) {
                html += '<span>&nbsp;</span>';
            }
            this._element.innerHTML = html;
            this._slots = this._element.getElementsByTagName('span');
            this._tick();
        };

        exports.prototype = {
            _tick: function () {
                var time = new Date();
                this._update(
                    this._pad(time.getHours()) +
                        this._pad(time.getMinutes()) +
                        this._pad(time.getSeconds())
                );
                var self = this;
                setTimeout(function () {
                    self._tick();
                }, 1000);
            },

            _pad: function (value) {
                return ('0' + value).slice(-2);
            },

            _update: function (timeString) {
                var i = 0,
                    l = this._slots.length,
                    value,
                    slot,
                    now;
                for (; i < l; i++) {
                    value = timeString.charAt(i);
                    slot = this._slots[i];
                    now = slot.dataset.now;
                    if (!now) {
                        slot.dataset.now = value;
                        slot.dataset.old = value;
                        continue;
                    }
                    if (now !== value) {
                        this._flip(slot, value);
                    }
                }
            },

            _flip: function (slot, value) {
                slot.classList.remove('flip');
                slot.dataset.old = slot.dataset.now;
                slot.dataset.now = value;
                slot.offsetLeft;
                slot.classList.add('flip');
            },
        };
        return exports;
    })();

    var i = 0,
        clocks = document.querySelectorAll('.clock'),
        l = clocks.length;
    for (; i < l; i++) {
        new Clock(clocks[i]);
    }


    //I add a cat
    
    const catWrapper = document.querySelector('.cat_wrapper')
    const wrapper = document.querySelector('.wrapper')
    const cat = document.querySelector('.cat')
    const head = document.querySelector('.cat_head')
    const legs = document.querySelectorAll('.leg')
    const pos = {
      x: null,
      y: null
    }
  
    const walk = () =>{
      cat.classList.remove('first_pose')
      legs.forEach(leg=>leg.classList.add('walk'))
    }
  
    const handleMouseMotion = e =>{
      pos.x = e.clientX
      pos.y = e.clientY
      walk()
    }
  
    const handleTouchMotion = e =>{
      if (!e.targetTouches) return
      pos.x = e.targetTouches[0].offsetX
      pos.y = e.targetTouches[0].offsetY
      walk()
    }
  
    const turnRight = () =>{
      cat.style.left = `${pos.x - 90}px`
      cat.classList.remove('face_left')
      cat.classList.add('face_right')
    }
  
    const turnLeft = () =>{
      cat.style.left = `${pos.x + 10}px`
      cat.classList.remove('face_right')
      cat.classList.add('face_left')
    }
  
    const decideTurnDirection = () =>{
      cat.getBoundingClientRect().x < pos.x ?
        turnRight()
        :
        turnLeft()
    }
  
    const headMotion = () =>{
      pos.y > (wrapper.clientHeight - 100) ?
        head.style.top = '-15px'
        :
        head.style.top = '-30px'
    }
  
    const jump = () =>{
      catWrapper.classList.remove('jump')
      if (pos.y < (wrapper.clientHeight - 250)) {
        setTimeout(()=>{
          catWrapper.classList.add('jump')
        },100)
      } 
    }
  
    const decideStop = ()=>{
      if (cat.classList.contains('face_right') && pos.x - 90 === cat.offsetLeft ||
          cat.classList.contains('face_left') && pos.x + 10 === cat.offsetLeft) {
        legs.forEach(leg=>leg.classList.remove('walk'))    
      }
    }
    
    setInterval(()=>{
      if (!pos.x || !pos.y) return
      decideTurnDirection()
      headMotion()
      decideStop()
    },100)
  
    setInterval(()=>{
      if (!pos.x || !pos.y) return
      jump()
    },1000)
  
    document.addEventListener('mousemove', handleMouseMotion)
    document.addEventListener('mousemove', handleTouchMotion)
});
