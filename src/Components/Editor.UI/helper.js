import { Raw } from 'slate'
/**
 * 从state中获取字数
 * @param {object} state 
 */
export const getNumberOfWordsFromState = (state) => {
    const options = { terse: true }

    const serialize = ({ editorState }) => ({
        serialized: Raw.serialize(editorState, options)
    })

    let number = 0

    const each = (state) => {
        state.forEach(item => {
            const {
                cells,
                rows,
                content
            } = item
            if (cells && cells.length) {
                each(item.cells)
            }
            if (rows && rows.length) {
                each(item.rows)
            }
            if (content && content.state) {
                //slate
                if (content.state.editorState) {
                    const { serialized } = serialize(content.state)
                    const eachSlateNodes = (nodes) => {
                        nodes.forEach(node => {
                            if (node.nodes) {
                                eachSlateNodes(node.nodes)
                            }
                            if (node.text) {
                                number += node.text.length
                            }
                        })
                    }
                    eachSlateNodes(serialized.nodes)
                }
                //anchorTitle
                if (content.state.value) {
                    number += content.state.value.length
                }
            }
        })
    }
    each(state)

    return number
}