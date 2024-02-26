hooks与mixins、utils区别：

hooks和utils的最大区别就是hooks是特定的业务场景的衍生物，而utils更偏向通用工具。
hooks其实和mixins最大的区别在思想上，vue hooks是利用Vue的组合式 API （Composition API）来封装和复用有状态逻辑的函数、耦合度更低。而mixins是基于potions Api,使用自由度更低、存在命名冲突，这一点也让维护难度增大。


Hooks 是 Vue 3 Composition API 的一部分，用于在函数式组件中复用逻辑代码。
Hooks 可以提供状态管理、生命周期管理、副作用处理等功能。
Hooks 可以使函数式组件更灵活、可读性更好，以及更易于测试和维护。
公共方法:
公共方法通常是普通的 JavaScript 函数，用于处理特定的逻辑功能。
公共方法可以在 Vue 组件中被调用，用于处理业务逻辑或操作。
公共方法可以是通用的，被多个组件共享，用于提供一些通用的功能。