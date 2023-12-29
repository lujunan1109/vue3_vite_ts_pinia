# 解决的问题

1. 解决引入Dialog去定义一个visible变量  => 但是同时引入一个ref节点；

2. 减少一些重复的dom，比如每个dialog都带有的确定和取消

3. 统一去配置elementPlus的Dialog的api

4. 利用computed处理数据单向传递问题