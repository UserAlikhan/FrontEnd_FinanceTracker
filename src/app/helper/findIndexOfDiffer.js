export async function findIndexOfDiffer(arr1, arr2) {

    const arr1XStart = await arr1.map(arr => arr.start[0])
    const arr2XStart = await arr2.map(arr => arr.start[0])
    const arr1YStart = await arr1.map(arr => arr.start[1])
    const arr2YStart = await arr2.map(arr => arr.start[1])

    const arr1XEnd = await arr1.map(arr => arr.end[0])
    const arr2XEnd = await arr2.map(arr => arr.end[0])
    const arr1YEnd = await arr1.map(arr => arr.end[1])
    const arr2YEnd = await arr2.map(arr => arr.end[1])

    const seachDiffer = (arr1, arr2) => {
        return arr1.findIndex((element, index) => element !== arr2[index]);
    }

    const xDifferStart = await seachDiffer(arr1XStart, arr2XStart)
    const yDifferStart = await seachDiffer(arr1YStart, arr2YStart)
    const xDifferEnd = await seachDiffer(arr1XEnd, arr2XEnd)
    const yDifferEnd = await seachDiffer(arr1YEnd, arr2YEnd)

    if (xDifferStart && xDifferStart !== -1) {
        return await xDifferStart
    } else if (yDifferStart && yDifferStart !== -1) {
        return await yDifferStart
    } else if (xDifferEnd && xDifferEnd !== -1) {
        return await xDifferEnd
    } else if (yDifferEnd && yDifferEnd !== -1) {
        return await yDifferEnd
    } else {
        return 0
    }
}