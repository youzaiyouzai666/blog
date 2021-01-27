[LeetCode 股票问题的一种通用解法](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484509&idx=1&sn=21ace57f19d996d46e82bd7d806a2e3c&source=41#wechat_redirect)

## 1.Best Time to Buy and Sell Stock 





## 2.[买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

[四种实现+详细图解 122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/si-chong-shi-xian-xiang-xi-tu-jie-122-mai-mai-gu-p/)

给定一个数组(length=n)，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

### 暴力解法

> 穷举：求得所有可能的买卖组合的获利，然后将获利最高的组合输出作为结果。

核心是 构建遍历树

假设如下一个数组：

```text
prices = [1,2,3,4,5,...]
```

我们可以考虑第一笔交易是第一天买入，然后第二天卖出，那么这种情况下的最好收益可以写为：

```text
收益1 = 1 + 最佳收益([3,4,5,...])
```

也可以考虑第一笔交易是第一天买入，第三天卖出，这种情况下的最好收益可以写为：

```text
收益2 = (3-1)+ 最佳收益([4,5,...])
```

如此类推，假设第一笔交易共有n种可能，那么最佳收益就是上述n种收益中的最大值。

得到遍历树

![image-20200820175329766](/Users/eleme/Library/Application Support/typora-user-images/image-20200820175329766.png)

将遍历树转代码，显然这是一个标准的递归算法，可以实现如下：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices=[]) {
  return calc(prices, 0)
};
//第二个参数：start
function calc(prices=[], start=0) {
  let max = 0
  //买
  //第一步：从买入，
  for (let startIndex = start, len = prices.length; startIndex < len; startIndex++) {
    let maxProfit = 0
    //第二步：第i天卖出
    for (let i = startIndex + 1; i < len; i++) {//卖
      //如果能赚到钱
      if (prices[i] > prices[startIndex]) {
        //收益计算：（卖出-买入）+ calc(后面最大收益)
        let profit = prices[i] - prices[startIndex] + calc(prices, i + 1)
        maxProfit = Math.max(maxProfit,profit)
      }
    }
    max = Math.max(max,maxProfit)
  }
  return max
}
```

// 超出时间限制

执行树





![image-20200820105952774](/Users/eleme/Library/Application Support/typora-user-images/image-20200820105952774.png)



![image-20200820110122649](/Users/eleme/Library/Application Support/typora-user-images/image-20200820110122649.png)





### 贪心算法

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/tan-xin-suan-fa-by-liweiwei1419-2/

![image-20200820215643551](/Users/eleme/Library/Application Support/typora-user-images/image-20200820215643551.png)





## 动态规划

每天都有三种动作：买入（buy）、卖出（sell）、无操作（rest）。

因为不限制交易次数，因此交易次数这个因素不影响题目，不必考虑。DP Table 是二维的，两个维度分别是天数（0,1,...,n-1）和是否持有股票（1 表持有，0 表不持有）。

状态转移方程

*Case 1，今天我没有股票，有两种可能：*

*昨天我手上就没有股票，今天不做任何操作（rest）；*
*昨天我手上有一只股票，今天按照时价卖掉了（sell），收获了一笔钱*

*Case 2，今天持有一只股票，有两种可能：*

*昨天我手上就有这只股票，今天不做任何操作（rest）；*
*昨天我没有股票，今天按照时价买入一只（sell），花掉了一笔钱*

综上，第 i 天的状态转移方程为：

```javascript
dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
```



注意上面的转移方程只是对某一天而言的，要求出整个 DP Table 的状态，需要对 i 进行遍历。

边界状态
观察状态转移方程，第 i 天的状态只由第 i-1 天状态推导而来，因此边界状态只需要定义 i=0（也就是第一天）即可：

```javascript
dp[0][0] = 0        //第一天没有股票，说明没买没卖，获利为0
dp[0][1] = -prices[0]   // 第一天持有股票，说明买入了，花掉一笔钱
```

作者：cheng-cheng-16
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/gu-piao-jiao-yi-xi-lie-tan-xin-si-xiang-he-dong-2/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

