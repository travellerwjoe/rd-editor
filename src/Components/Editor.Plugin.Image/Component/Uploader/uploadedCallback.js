export default (res) => {
    const data = res.data
    if (data.Error) {
        alert('上传失败')
        return
    }
    const result = JSON.parse(data.Result)
    const img = result.FilePath.split('|')[0]
    const titleArr = /.*\/(.*\.(jpg|gif|png))/.exec(img)
    const title = titleArr ? titleArr[1] : '未命名'
    return {
        img,
        title
    }
}