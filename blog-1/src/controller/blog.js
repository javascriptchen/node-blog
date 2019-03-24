/*
 * @Author: chenchen 
 * @Date: 2019-03-24 16:23:56 
 * @Last Modified by: chenchen
 * @Last Modified time: 2019-03-24 22:42:22
 */
const getList = (author, keyword) => {
  // 先返回假数据
  return [{
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

const getDetail = id => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1553414865089,
    author: "zhansan"
  };
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象 ，包含title,content属性
  return {
    id: 3 // 表示新建博客，插入到数据表的id
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = id=>{
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};