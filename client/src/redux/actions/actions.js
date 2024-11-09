export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';


export const increaseCount = ((itemId) => ({
    type: INCREASE_COUNT,
    payload: itemId
}))

export const decreaseCount = ((itemId) =>({
    type: DECREASE_COUNT,
    payload: itemId
}))