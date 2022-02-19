import EventEmitter from 'eventemitter3';
const emitter = new EventEmitter();

export const EE = emitter;
export const modalEmitter = {
  add: function add(component, options) {
    //console.log("modal component>>>>>>>", component);
    //console.log("modal options>>>>>>>>>", options);
    return emitter.emit('add/modal', { component: component, options: options });
  },
  remove: function remove(id) {
    return emitter.emit('remove/modal', id);
  },
  clear: function clear() {
    return emitter.emit('clear/all');
  }
  /*add: (component, options) => emitter.emit('add/modal', {component, options}),
  remove: id => emitter.emit('remove/modal', id),
  clear: () => emitter.emit('clear/all')*/
};
