

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
  initState(this)
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


// 实现数据响应式
function initState(vm){
  const opts = vm.$options
  // props
  // setup
  // methods
  // data
  if(opts.data){
    initData(vm)
  }
  // computed
  // watch
}

function initData(vm){
  // 获取data函数返回值
  const data = vm._data = vm.$options.data.call(vm,vm)
  // 遍历 data 中所有的 key, 对他们做代理
  const keys = Object.keys(data)
  let i = keys.length;
  while (i--) {
    const  key = keys[i]
    proxy(vm,'_data',key)
  }
  // 对 Data 做响应式
  observe(data)
}

// 代理指定对象的某个 key 到 sourceKey 上
function proxy (target,sourceKey,key){
  Object.defineProperty(target,key,{
    get(){
      return this[sourceKey][key]
    },
    set(val){
      this[sourceKey][key] = val
    }
  })
}

// 将传入的 obj, key 做拦截, 从而显示响应式
function defineReactive(obj,key,val={}){
  // 递归处理
  observe(val)
  Object.defineProperty(obj,key,{
    get(){
      console.log("get" , key)
      return  val
    },
    set(newVal){
      val = newVal;
      console.log("set ",key)
    }
  })
}
function observe(obj){
  // 判断参数一定是对象
  if(!(obj !== null && typeof obj === "object")){
    return 
  }
  // 创建 Observer 实例
  let ob;
  if(Object.prototype.hasOwnProperty.call(obj,"__ob__")){
    ob = value.__ob__
  }else{
    new Observer(obj)
  }
  return  ob
}

class Observer {
  constructor(value){
    // 定义 __ob__属性
    Object.defineProperty(value,"__ob__",{
      value:this,
      enumerable:false,
      writable:false,
      configurable:false
    })
    if(Array.isArray(value)){
      return 
    }else{
      this.walk(value)
    }
  }
  walk(obj){
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val = obj[key]
      // 响应式处理
      defineReactive(obj, key, val)
    }
  }

}


