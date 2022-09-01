/*!
 * Select.JS
 * Version: 1.0.24
 *
 * Copyright 2017 Wolfgang Kurz
 * Released under the MIT license
 * https://github.com/WolfgangKurz/Select-JS
 */
'use strict';
!(function () {
  HTMLElement.prototype.addClass = function (x) {
    var y = x.split(' '),
      z = this.className.split(' ');
    for (var i = 0; i < y.length; i++) {
      if (y[i].trim().length == 0) continue;
      if (z.indexOf(y[i]) >= 0) continue;
      z.push(y[i]);
    }
    this.className = z
      .filter(function (_) {
        return _.length > 0;
      })
      .join(' ');
    return this;
  };
  HTMLElement.prototype.removeClass = function (x) {
    var y = x.split(' '),
      z = this.className.split(' ');
    for (var i = 0, j; i < y.length; i++) {
      if (y[i].trim().length == 0) continue;
      while ((j = z.indexOf(y[i])) >= 0) z.splice(j, 1);
    }
    this.className = z
      .filter(function (_) {
        return _.length > 0;
      })
      .join(' ');
    return this;
  };
  HTMLElement.prototype.hasClass = function (x) {
    var y = this.className.split(' ');
    for (var i = 0, j; i < y.length; i++) {
      if (y[i].trim().length == 0) continue;
      if (y[i] == x) return true;
    }
    return false;
  };

  var selectjs = {
    initialized: false,
    global_optlist: null,
  };
  var selectjs_initialize = function () {
    document.addEventListener('click', function (e) {
      var x = e.target,
        obj = null;
      while (x != null) {
        if (!('tagName' in x)) break;
        if (x.tagName.toLowerCase() == 'body') break;
        if (x.hasClass('select-js') || x.hasClass('select-js-global-optlist')) {
          obj = x;
          break;
        }
        x = x.parentNode;
      }
      var ex = '';
      if (obj === null || !obj.hasClass('select-js-global'))
        ex = ',.select-js-global-optlist.dropdown';

      var selects = document.querySelectorAll('.select-js.dropdown' + ex);
      for (var i = 0; i < selects.length; i++) {
        if (obj == selects[i]) continue;
        selects[i].removeClass('dropdown');
      }
    });

    var global_optlist = document.createElement('div');
    global_optlist.addClass('select-js-global-optlist select-js-optlist');
    selectjs.global_optlist = global_optlist;

    var global_opt_test = document.createElement('div');
    global_opt_test.addClass(
      'select-js-global-optlist select-js-optlist select-js-test'
    );
    selectjs.global_opt_test = global_opt_test;

    document.querySelector('body').appendChild(selectjs.global_optlist);
    document.querySelector('body').appendChild(selectjs.global_opt_test);
    selectjs.initialized = true;

    selectjs.scrollsize =
      selectjs.global_opt_test.offsetHeight -
      selectjs.global_opt_test.clientHeight;
  };

  HTMLElement.prototype.selectjs = function (params) {
    var paramlist = {};
    if (typeof params != 'undefined') {
      for (var i in params) paramlist[i] = params[i];
    }

    var target = this;
    if (!selectjs.initialized) selectjs_initialize();

    var editable = target.hasClass('select-js-editable'),
      is_autofilter = target.hasClass('select-js-autofilter'),
      is_customfilter = target.hasClass('select-js-customfilter'),
      is_nofocus = target.hasClass('select-js-nofocus'),
      is_global = target.hasClass('select-js-global'),
      is_inline = target.hasClass('select-js-inline'),
      is_fullsize = target.hasClass('select-js-fullsize'),
      is_noadjust = target.hasClass('select-js-noadjust');

    if (is_fullsize) {
      is_global = true;
      this.addClass('select-js-global');
    }

    var ismobile = function () {
      var check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    if (ismobile()) is_nofocus = true;

    var prev = target.parentNode;
    if (!prev.hasClass('select-js')) prev = null;
    else prev.parentNode.insertBefore(target, prev);

    var wrapper = document.createElement('div');
    var opts = document.createElement('div');
    var focuser = document.createElement('input');
    var display;

    if (editable) {
      display = document.createElement('input');
      display.addClass(target.className);
      display.autocomplete = 'off';

      if (target.name.length > 0) display.name = target.name;
      if (target.id.length > 0) display.id = target.id;
      if (target.getAttribute('placeholder') != null)
        display.placeholder = target.getAttribute('placeholder');

      focuser = display;
    } else {
      display = document.createElement('div');

      if (!is_nofocus) {
        focuser = document.createElement('input');
        focuser.style.width = '1px';
        focuser.style.height = '1px';
        focuser.style.overflow = 'hidden';
        focuser.style.opacity = '0';
        focuser.style.position = 'absolute';
      } else {
        focuser = display;
      }
    }

    var focusIdx = null;
    var updateFocus = function () {
      var all = opts.querySelectorAll('.select-js-option.select-js-focus');
      for (var i = 0; i < all.length; i++)
        all[i].removeClass('select-js-focus');

      all = opts.querySelectorAll('.select-js-option');
      if (focusIdx >= all.length) focusIdx = all.length - 1;
      if (focusIdx < 0) focusIdx = 0;

      all[focusIdx].addClass('select-js-focus');

      if (is_global) {
        var m = focusIdx;
        all = selectjs.global_optlist.querySelectorAll('.select-js-option');
        if (m >= all.length) m = all.length - 1;
        if (m < 0) m = 0;

        all[m].addClass('select-js-focus');
      }
    };
    var setFocus = function (idx, target) {
      if (target === null || typeof target == 'undefined') target = opts;

      if (idx === null || typeof idx == 'undefined') {
        idx = 0;

        var elem = target.querySelector(
          '.select-js-option[data-value="' + target.value + '"]'
        );
        if (elem != null) {
          var all = target.querySelectorAll('.select-js-option');
          for (var i = 0; i < all.length; i++) {
            if (all[i] == elem) {
              idx = i;
              break;
            }
          }
        }
      }
      if (is_global && target != selectjs.global_optlist)
        setFocus(idx, selectjs.global_optlist);

      focusIdx = idx;
      updateFocus();
    };
    var moveFocus = function (value) {
      focusIdx += value;
      updateFocus();
    };

    var toggle = function (open) {
      if (is_global) {
        var m = selectjs.global_optlist;

        if (typeof open == 'undefined') open = !m.hasClass('dropdown');

        m.innerHTML = '';
        for (var i = 0; i < opts.children.length; i++) {
          !(function (ch, src) {
            ch.addEventListener('click', function () {
              if (document.createEventObject) {
                src.fireEvent('onclick');
              } else {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('click', false, true);
                src.dispatchEvent(evt);
              }
            });
            ch.addEventListener('mousemove', function () {
              if (document.createEventObject) {
                src.fireEvent('onmousemove');
              } else {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('mousemove', false, true);
                src.dispatchEvent(evt);
              }
            });
            m.appendChild(ch);
          })(opts.children[i].cloneNode(true), opts.children[i]);
        }

        m.removeClass('select-js-inline select-js-fullsize');

        m.addClass(is_inline ? 'select-js-inline' : '').addClass(
          is_fullsize ? 'select-js-fullsize' : ''
        );

        if (open) m.addClass(!m.hasClass('dropdown') ? 'dropdown' : '');
        else {
          m.removeClass('dropdown');
          return;
        }

        m.style.left = '-99999px';
        m.style.top = '-99999px';

        var style = window.getComputedStyle(wrapper);
        m.style.fontFamily = style.fontFamily;
        m.style.fontStyle = style.fontStyle;
        m.style.fontSize = style.fontSize;

        m.style.marginLeft = '';
        m.style.marginTop = '';
        m.style.columnCount = '';

        if (!is_fullsize && !is_inline) {
          m.style.width = wrapper.clientWidth + 3 + 'px';
        } else if (!is_fullsize) {
          m.style.width = '';
        }

        var current = m.querySelector('.select-js-option.selected');
        if (current != null) {
          if (m.scrollTo) m.scrollTo(0, current.offsetTop - m.clientHeight / 2);
          else m.scrollTop = current.offsetTop - m.clientHeight / 2;
        }

        var left = 0,
          top = 0,
          x = wrapper,
          dy = 0;
        /* Uncomment for material
				if(!is_fullsize) dy = current.offsetTop - m.scrollTop;
				// */
        while (x !== null && x.tagName.toUpperCase() != 'BODY') {
          left += x.offsetLeft;
          top += x.offsetTop;

          x = x.offsetParent;
        }

        if (!is_fullsize && !is_inline) {
          m.style.left = left + 'px';
          m.style.top = top + wrapper.clientHeight - dy + 'px';
        } else if (is_fullsize) {
          var _left = left + wrapper.clientWidth / 2;

          if (is_inline) m.style.width = wrapper.clientWidth + 3 + 'px';
          else {
            var fs = parseFloat(getComputedStyle(m).fontSize);
            var v_items = Math.round((27.8 * fs) / m.children[0].clientHeight);

            var cols = parseInt(m.children.length / v_items) + 1,
              _cols = cols;
            var ss = document.body.clientWidth;

            while (true) {
              var a = _left + (wrapper.clientWidth * cols + 3) / 2 > ss;
              var b = _left - (wrapper.clientWidth * cols + 3) / 2 < 0;

              if (a && b) _left += wrapper.clientWidth;
              else if (a) cols--;
              else if (b) _left += wrapper.clientWidth;
              else break;
            }
            m.style.columnCount = cols;
            m.style.width = wrapper.clientWidth * cols + 3 + 'px';
            m.style.maxHeight =
              27.8 * fs + (cols != _cols ? selectjs.scrollsize : 0) + 'px';
          }

          var _top = top + wrapper.clientHeight / 2 - dy;
          while (_top - m.clientHeight / 2 < 10) _top += 20;
          if (_top + m.clientWidth / 2 < 20) _top += 20;
          if (_left + m.clientWidth / 2 + 20 > ss) _left -= 20;

          m.style.overflowX = 'hidden';
          m.style.marginLeft = -(m.clientWidth / 2) + 'px';
          m.style.marginTop = -(m.clientHeight / 2) + 'px';
          m.style.left = _left + 'px';
          m.style.top = _top + 'px';
          m.style.overflowX = 'auto';
        } else {
          m.style.left = left + 'px';
          m.style.top = top + wrapper.clientHeight - dy + 'px';
        }
      } else {
        if (typeof open == 'undefined') open = !wrapper.hasClass('dropdown');

        if (open)
          wrapper.addClass(!wrapper.hasClass('dropdown') ? 'dropdown' : '');
        else {
          wrapper.removeClass('dropdown');
          return;
        }

        var current = opts.querySelector('.select-js-option.selected');
        if (current != null) {
          if (opts.scrollTo)
            opts.scrollTo(0, current.offsetTop - opts.clientHeight / 2);
          else opts.scrollTop = current.offsetTop - opts.clientHeight / 2;
        }

        /* Uncomment for material
				var dy = current.offsetTop - opts.scrollTop;
				opts.style.marginTop = -(dy+4) + "px";
				// */
      }

      if (open) {
        setFocus(null, m);
        focuser.focus();
      }
    };
    var update = function (lazyfilter) {
      if (typeof lazyfilter == 'undefined') lazyfilter = null;

      var all = opts.querySelectorAll('.select-js-option.selected');
      for (var i = 0; i < all.length; i++) all[i].removeClass('selected');

      if (
        is_customfilter &&
        (lazyfilter != null || 'customfilter' in paramlist)
      ) {
        all = opts.querySelectorAll('.select-js-option.select-js-customopt');
        for (var i = 0; i < all.length; i++)
          all[i].parentNode.removeChild(all[i]);

        all = opts.querySelectorAll('.select-js-option');
        for (var i = 0; i < all.length; i++) {
          all[i].removeClass('select-js-filtered');

          if (
            target.value.length == 0 ||
            all[i].innerHTML.indexOf(target.value) >= 0
          )
            all[i].addClass('select-js-filtered');
        }

        all = opts.querySelectorAll('.select-js-option');
        all =
          lazyfilter != null
            ? lazyfilter
            : paramlist['customfilter'](target.value, all);
        for (var i = 0; i < all.length; i++) {
          var opt = document.createElement('div');
          opt.addClass(
            'select-js-option select-js-filtered select-js-customopt'
          );
          opt.innerHTML = all[i].display;
          opt.setAttribute('data-value', all[i].value);
          opt.addEventListener('click', function () {
            target.value = this.getAttribute('data-value');

            if (document.createEventObject) {
              target.fireEvent('onchange');
            } else {
              var evt = document.createEvent('HTMLEvents');
              evt.initEvent('change', false, true);
              target.dispatchEvent(evt);
            }

            update();
            toggle();
          });
          opts.appendChild(opt);
        }

        all = opts.querySelectorAll('.select-js-optgroup');
        for (var i = 0; i < all.length; i++) {
          all[i].removeClass('select-js-filteredless');

          var selector =
            '.select-js-option.select-js-filtered' +
            '[select-js-optgroup="' +
            all[i].getAttribute('select-js-optgroup') +
            '"]';

          if (opts.querySelectorAll(selector).length == 0)
            all[i].addClass('select-js-filteredless');
        }
      } else if (is_autofilter) {
        all = opts.querySelectorAll('.select-js-option');
        for (var i = 0; i < all.length; i++) {
          all[i].removeClass('select-js-filtered');

          if (
            target.value.length == 0 ||
            all[i].innerHTML.indexOf(target.value) >= 0
          )
            all[i].addClass('select-js-filtered');
        }

        all = opts.querySelectorAll('.select-js-optgroup');
        for (var i = 0; i < all.length; i++) {
          all[i].removeClass('select-js-filteredless');

          var selector =
            '.select-js-option.select-js-filtered' +
            '[select-js-optgroup="' +
            all[i].getAttribute('select-js-optgroup') +
            '"]';

          if (opts.querySelectorAll(selector).length == 0)
            all[i].addClass('select-js-filteredless');
        }
      }

      var current = opts.querySelector(
        '.select-js-option[data-value="' + target.value + '"]'
      );
      if (current != null) {
        current.addClass('selected');
        if (!editable) display.innerHTML = current.innerHTML;
      }
    };

    wrapper.addClass('select-js ' + target.className);
    display.addClass('select-js-display');
    opts.addClass('select-js-optlist');

    var ops = target.children,
      ow = 0,
      tfs = 0;
    !(function (x) {
      var y = window.getComputedStyle(x);
      selectjs.global_opt_test.style.fontSize = y.fontSize;
      selectjs.global_opt_test.style.fontFamily = y.fontFamily;
      selectjs.global_opt_test.style.fontWeight = y.fontWeight;
    })(target);

    for (var i = 0; i < ops.length; i++) {
      var opt = document.createElement('div'),
        test,
        _s;

      if (ops[i].tagName.toLowerCase() == 'option') {
        opt.addClass('select-js-option ' + ops[i].className);
        opt.innerHTML = ops[i].innerHTML;
        opt.setAttribute('data-value', ops[i].value);
        opt.addEventListener('click', function () {
          target.value = this.getAttribute('data-value');

          if (document.createEventObject) {
            target.fireEvent('onchange');
          } else {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            target.dispatchEvent(evt);
          }

          update();
          toggle();
        });
        opt.addEventListener('mousemove', function () {
          var idx = -1;
          var all = opts.querySelectorAll('.select-js-option');
          for (var i = 0; i < all.length; i++) {
            if (all[i] == this) {
              idx = i;
              break;
            }
          }
          if (idx >= 0) setFocus(idx);
        });

        test = opt.cloneNode(true);
        selectjs.global_opt_test.appendChild(test);
        _s = window.getComputedStyle(test);
        test.style.fontSize = _s.fontSize;
        test.style.fontWeight = _s.fontWeight;
        test.style.fontFamily = _s.fontFamily;
        ow = Math.max(ow, test.clientWidth);
        selectjs.global_opt_test.removeChild(test);
      } else {
        var grpId = Math.random().toFixed(6).substr(2);
        opt.innerHTML = ops[i].label;
        opt.addClass('select-js-optgroup');
        opt.setAttribute('select-js-optgroup', 'grp' + grpId);
        opts.appendChild(opt);

        var ops2 = ops[i].querySelectorAll('option');
        for (var j = 0; j < ops2.length; j++) {
          var opt = document.createElement('div');

          opt.addClass(
            'select-js-option select-js-indent ' + ops2[j].className
          );
          opt.innerHTML = ops2[j].innerHTML;
          opt.setAttribute('data-value', ops2[j].value);
          opt.setAttribute('select-js-optgroup', 'grp' + grpId);
          opt.addEventListener('click', function () {
            target.value = this.getAttribute('data-value');

            if (document.createEventObject) {
              target.fireEvent('onchange');
            } else {
              var evt = document.createEvent('HTMLEvents');
              evt.initEvent('change', false, true);
              target.dispatchEvent(evt);
            }

            update();
            toggle();
          });
          opt.addEventListener('mousemove', function () {
            var idx = -1;
            var all = opts.querySelectorAll('.select-js-option');
            for (var i = 0; i < all.length; i++) {
              if (all[i] == this) {
                idx = i;
                break;
              }
            }
            if (idx >= 0) setFocus(idx);
          });
          opts.appendChild(opt);

          test = opt.cloneNode(true);
          selectjs.global_opt_test.appendChild(test);
          _s = window.getComputedStyle(test);
          test.style.fontSize = _s.fontSize;
          test.style.fontWeight = _s.fontWeight;
          test.style.fontFamily = _s.fontFamily;
          ow = Math.max(ow, test.clientWidth);
          selectjs.global_opt_test.removeChild(test);
        }
      }
      opts.appendChild(opt);
    }

    target.parentNode.insertBefore(wrapper, target);
    if (editable) {
      display.value = target.getAttribute('value');

      target.parentNode.removeChild(target);
      target = display;
    } else target.style.display = 'none';

    wrapper.appendChild(focuser);
    wrapper.appendChild(target);
    wrapper.appendChild(display);
    wrapper.appendChild(opts);
    if (prev != null) prev.parentNode.removeChild(prev);

    if (!is_noadjust) {
      wrapper.appendChild(display);

      var s = window.getComputedStyle(display);
      var pw =
        parseFloat(s.marginLeft) +
        parseFloat(s.marginRight) +
        parseFloat(s.paddingLeft) +
        parseFloat(s.paddingRight);
      display.style.minWidth = pw + ow + selectjs.scrollsize + 'px';
    }

    display.addEventListener('click', function () {
      if (!editable) toggle();
      else toggle(true);
    });
    if (editable) {
      var val = '';
      display.addEventListener('change', function () {
        update();
      });
      display.addEventListener('keyup', function () {
        if (target.value != val) {
          val = target.value;
          update();
        }
      });
    }

    focuser.addEventListener('keydown', function (e) {
      if (e.keyCode == 38) {
        // Up
        moveFocus(-1);
      } else if (e.keyCode == 40) {
        // Down
        var open = wrapper.hasClass('dropdown');
        if (!open) toggle(true);

        moveFocus(+1);
      } else if (e.keyCode == 13) {
        // Enter
        var focused = opts.querySelector('.select-js-option.select-js-focus');
        if (focused != null) target.value = focused.getAttribute('data-value');

        if (document.createEventObject) {
          target.fireEvent('onchange');
        } else {
          var evt = document.createEvent('HTMLEvents');
          evt.initEvent('change', false, true);
          target.dispatchEvent(evt);
        }

        update();
        toggle();

        e.preventDefault();
        return false;
      } else if (e.keyCode == 27) {
        // ESC
        toggle(false);

        e.preventDefault();
        return false;
      }
    });

    update();

    return {
      lazyfilter: function (data) {
        update(data);
      },
    };
  };
})();
