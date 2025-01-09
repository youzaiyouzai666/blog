# 背景

Transformer 由论文《Attention is All You Need》提出，现在是谷歌云 TPU 推荐的参考模型。论文相关的 Tensorflow 的代码可以从 GitHub 获取，其作为 Tensor2Tensor 包的一部分。哈佛的 NLP 团队也实现了一个基于 PyTorch 的版本，并注释该论文。
在本文中，我们将试图把模型简化一点，并逐一介绍里面的核心概念，希望让普通读者也能轻易理解。
Attention is All You Need：Attention Is All You Need

Transformer 诞生的故事：https://www.douyin.com/video/7353557232883223808

[完全图解 RNN、RNN 变体、Seq2Seq、Attention 机制](https://zhuanlan.zhihu.com/p/28054589)

# 原理

[Transformer 原理
](https://mp.weixin.qq.com/s?__biz=MzI2ODM3NDUwMQ==&mid=2247485014&idx=1&sn=b5b008e91428467b5c1f50e816ab5981&chksm=eaf1dedcdd8657ca78534151ccf2e7755004851d845819e715ebdccedc5807b027622904a986&scene=21#wechat_redirect)
