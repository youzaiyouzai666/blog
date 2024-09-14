
# Python
[Python数据科学手册](https://yun.weicheng.men/Book/Python%E6%95%B0%E6%8D%AE%E7%A7%91%E5%AD%A6%E6%89%8B%E5%86%8C.pdf)
# 环境
## 安装
```
brew install python3
python3
print('hello, world')
exit()
```
## pypi
[pypi](https://pypi.org/)

#### 如何将自己的Python包发布到PyPI上
[参考](https://packaging.python.org/tutorials/packaging-projects/)
[中文参考](https://developer.aliyun.com/article/936284)

## pip
[pip](https://pip.pypa.io/en/stable/)


## Miniconda安装与使用
[参考](https://lfpara.com/docs/hpc/tools/miniconda3/miniconda3.html)
> 类似node nvm + npm



```sh
## 创建虚拟环境
conda create -n test python=3.8.3  ##创建名字为test，python版本为3.8.3的环境
## 启动虚拟环境
conda activate test  ##启动test虚拟环境
## 退出虚拟环境
conda deactivate

## 配置国内源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes

```

#### Conda是什么？
Conda 是为 Python 程序创建的，目前最流行的环境管理工具。

它是开源的软件包管理系统和环境管理系统，用于安装多个版本的软件包及其依赖关系，并在它们之间轻松切换，
#### Conda vs pip
普通安装 Python 的时候一般都是自带 pip 管理器的。 Conda 与 pip 最大的不同之处是，当我们需要管理的packages不仅仅局限于 Python 语言时，Conda 是更好的选择。如果不用 Conda 也是可以的，但是就需要用 pip + 其他语言管理器实现替代。

所以 Conda 要做比 pip 更多的事情，在 python-site-packages 之外管理 Python 库依赖关系，让你同时管理安装处理你有关Python的任务和跟Python无关的任务。

另外，Conda 使用了一个新的包格式，pip 不能安装和解析 Conda 的包格式，你可以使用这两个工具，但是他们是不能交互的。

#### Conda - AnaConda - MiniConda
网络上比较常见的是AnaConda，这里来具体说明三者的关系：

Anaconda：用于科学计算的Python发行版，里面预装好了Conda，某个版本的Python，众多packages，科学计算工具（Jupyter Notebook、Spyder）等。 Anaconda利用工具/Conda命令来进行package和environment的管理。
Conda：可以理解为一个工具，也是一个可执行命令，其核心功能是包管理与环境管理。包管理与pip的使用类似，环境管理则允许用户方便地安装不同版本的python并可以快速切换。
Miniconda：只含有最基本的内容python、conda，以及相关的必须依赖项，对于空间要求严格/希望精简编程的用户，Miniconda是一个很好的选择。

一般，Anaconda需要2G左右，Miniconda不到100M，而且Anaconda中的很多功能用不到，所以科学环境初步搭建推荐大家使用Miniconda~


## 版本
```
python3 -version
python3 -V
```


# Python 数据处理

```
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```
## Pandas
[Pandas](https://pandas.liuzaoqi.com/doc/chapter0/%E5%85%A5%E9%97%A8pandas.html)是一种基于 Python 的快速、强大、灵活且易于使用的开源数据分析和操作工具。

以下是 Pandas 擅长的一些事情：
  轻松处理浮点和非浮点数据中的缺失数据

  强大、灵活的分组功能，可对数据集执行拆分-应用-组合操作，用于聚合和转换数据

  简单的将其他Python和NumPy的数据结构不同索引的数据转换成pandas对象

  直观的合并和连接数据集

  灵活地重塑和旋转数据集

  强大的 IO 工具，用于从平面文件（CSV 和分隔符）、Excel 文件、数据库加载数据，以及从超快HDF5 格式保存/加载数据

  时间序列特定功能：日期范围生成和频率转换、移动窗口统计、日期偏移和滞后。

##  NumPy
  [NumPy](https://www.numpy.org.cn/user/setting-up.html)是Python中科学计算的基础包。它是一个Python库，提供多维数组对象，各种派生对象（如掩码数组和矩阵），以及用于数组快速操作的各种API，有包括数学、逻辑、形状操作、排序、选择、输入输出、离散傅立叶变换、基本线性代数，基本统计运算和随机模拟等等。

