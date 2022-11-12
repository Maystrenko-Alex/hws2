import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            let copyState = state.map(st => ({...st}))
            return (action.payload === 'up') 
              ? copyState.sort( (a,b) => a.name < b.name ? -1 : 1 )
              : copyState.sort( (a,b) => a.name > b.name ? -1 : 1 )
              
            
        }
        case 'check': {
            let copyState = state.map(st => ({...st}))
            return copyState.filter(st => st.age >=action.payload)
        }
        default:
            return state
    }
}
