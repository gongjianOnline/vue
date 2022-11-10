function Vue (options){
  console.log("构建了Vue")
  this._init(options)
}

Vue.prototype._init = function (options){
  // 合并option
  this.$options = options
  // 初始化核心方法
  this.$parent = this.$options.parent
  // 调用 beforeCreate
  callHook(this,"beforeCreate")
  // 初始化 state

  // 调用 created
  callHook(this,"created")
}


function callHook(vm,hook){
  const hooks = vm.$options[hook]
  if(hooks){
    hooks.call(vm)
  }
}

Vue.prototype.$mount = function(el){
  // 找到 parent
  const parent = document.querySelector(el)
  // 获取状态data
  const data = this.$options.data()
  // 获取节点
  const node = this.$options.render.call(data)
  // 追加节点
  parent.appendChild(node)
}


