随机壁纸1
==

## 搏天壁纸

|名称|类型|
|:--:|:---|
|请求方式|`get`|
|请求地址|https://api.btstu.cn/sjbz/api.php|
|返回格式|`json/images`|
|请求示例|https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images|



请求参数：
--

|名称|必填|类型|说明|
|:--:|:--:|:--:|:---:|
|method|否|string|输出壁纸端[mobile\|pc\|zsy]默认为pc|
|lx|否|string|选择输出分类[meizi\|dongman\|fengjing\|suiji]，为空随机输出|
|format|否|string|输出壁纸格式[json\|images]默认为images|



返回参数：
--

|名称|类型|说明|
|:--:|:--:|:--:|
|code|string|返回的状态码|
|imgurl|string|返回图片地址|
|width|string|返回图片宽度|
|height|string|返回图片高度|



返回示例：
--

```json
{"code":"200","imgurl":"https:\/\/tva4.sinaimg.cn\/large\/9bd9b167gy1g2qkr95hylj21hc0u01kx.jpg","width":"1920","height":"1080"}
```

https://tva4.sinaimg.cn/large/9bd9b167gy1g2qkr95hylj21hc0u01kx.jpg