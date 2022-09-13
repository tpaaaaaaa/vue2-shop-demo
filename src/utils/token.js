// 对外暴露函数
export const seToken = (token) => {
    localStorage.setItem('TOKEN', token);
}

export const getToken = () => localStorage.getItem('TOKEN');

export const removeToken = () => localStorage.removeItem('TOKEN');