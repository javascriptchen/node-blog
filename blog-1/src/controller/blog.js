/*
 * @Author: chenchen 
 * @Date: 2019-03-24 16:23:56 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-24 16:24:38
 */
// 获取博客列表
const getList = (author, keyword) => {
  // 先返回假数据
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1553414865089,
      author: "zhansan"
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1553414965089,
      author: "lisi"
    }
  ];
};

// 获取博客详情
const getDetail = id => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1553414865089,
    author: "zhansan"
  };
};

module.exports = {
  getList,
  getDetail
};
