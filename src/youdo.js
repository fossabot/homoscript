const {
  triggerEvent,
  strokeKey,
  highlight,
} = require('./actions');
const {
  getLastSeen,
} = require('./yousee');

const delegate = (action, target, payload) => {
  switch(action) {
    case 'focus':
      triggerEvent(target, 'focus');
      break;
    case 'input':
      triggerEvent(target, 'click');
      triggerEvent(target, 'focus');
      target.value = payload;
      triggerEvent(target, 'change');
      triggerEvent(target, 'blur');
      break;
    case 'submit':
      triggerEvent(target, 'click');
      triggerEvent(target, 'focus');
      strokeKey(target, 13);
      const form = target.form || target;
      form.submit();
      break;
    case 'highlight':
    default:
      highlight(target);
      break;
  }
}

const YouDo = sth => {
  let action, target, payload;
  if (typeof sth === 'string') {
    action = sth;
    target = getLastSeen();
  } else if (typeof sth === 'object') {
    action = sth.action;
    target = sth.target || getLastSeen();
    payload = sth.payload;
  }
  if (!target ) {
    return;
  }
  delegate(action, target, payload);
};

module.exports = YouDo;
