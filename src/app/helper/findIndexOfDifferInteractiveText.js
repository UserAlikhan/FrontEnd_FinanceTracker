export async function findIndexOfDifferInteractiveText(arr1, arr2, text1, text2) {

    const arr1X = await arr1.map((arr) => arr.x)
    const arr1Y = await arr1.map((arr) => arr.y)
    const arr2X = await arr2.map((arr) => arr.x)
    const arr2Y = await arr2.map((arr) => arr.y)

    const searchDiffer = async (arr1, arr2) => {
        return await arr1.findIndex((element, index) => element !== arr2[index])
    }

    const XDiffer = await searchDiffer(arr1X, arr2X)
    const YDIffer = await searchDiffer(arr1Y, arr2Y)
    const textDiffer = await searchDiffer(text1, text2)

    if (XDiffer && XDiffer !== -1) {
        return await XDiffer
    } else if (YDIffer && YDIffer !== -1) {
        return await YDIffer
    } else if (textDiffer && textDiffer !== -1) {
        return textDiffer
    } else {
        return 0
    }
}