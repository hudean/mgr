import store from '@/store';

export const getClassifyTitleById = (id) => {
    const one = store.state.articleClassify.find((item) => (item._id === id));

    return one && one.title || '未知分类';
}