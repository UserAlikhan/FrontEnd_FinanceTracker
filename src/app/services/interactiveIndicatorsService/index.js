import { apolloClient } from "../../graphql"
import { CREATE_DRAWN_OBJECT, DELETE_DRAWN_OBJECT, GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET, UPDATE_DRAWN_OBJECT } from "./queries"

class InteractiveIndicatorsService {
    async getAllUsersTrendlineObjectsOnSpecificAsset(userId, abbreviation, backtestingId=null) {
        try {
            const response_trends1 = await apolloClient.query({
                query: GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET,
                variables: { objectName: 'trends_1', userId, abbreviation, backtestingId }
            })

            const response_trends3 = await apolloClient.query({
                query: GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET,
                variables: { objectName: 'trends_3', userId, abbreviation, backtestingId }
            })

            return {
                trends_1: response_trends1.data ? response_trends1.data.getAllUsersSpecificObjectsOnACretainAsset : null,
                trends_3: response_trends3.data ? response_trends3.data.getAllUsersSpecificObjectsOnACretainAsset : null,
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllUsersFibbonaciObjectsOnSpecificAsset(userId, abbreviation, backtestingId=null) {
        try {
            const response_fibbonaci1 = await apolloClient.query({
                query: GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET,
                variables: { objectName: 'fibbonaci_1', userId, abbreviation, backtestingId }
            })

            const response_fibbonaci3 = await apolloClient.query({
                query: GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET,
                variables: { objectName: 'fibbonaci_3', userId, abbreviation, backtestingId }
            })

            return {
                fibbonaci_1: response_fibbonaci1.data ? response_fibbonaci1.data.getAllUsersSpecificObjectsOnACretainAsset : null,
                fibbonaci_3: response_fibbonaci3.data ? response_fibbonaci3.data.getAllUsersSpecificObjectsOnACretainAsset : null,
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllUsersInteractiveTextObjectsOnSpecificAsset(userId, abbreviation, backtestingId=null) {
        try {
            const response_interactiveText1 = await apolloClient.query({
                query: GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET,
                variables: { objectName: 'interactiveText_1', userId, abbreviation, backtestingId }
            })

            const response_interactiveText3 = await apolloClient.query({
                query: GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET,
                variables: { objectName: 'interactiveText_3', userId, abbreviation, backtestingId }
            })

            return {
                interactiveText_1: response_interactiveText1.data ? response_interactiveText1.data.getAllUsersSpecificObjectsOnACretainAsset : null,
                interactiveText_3: response_interactiveText3.data ? response_interactiveText3.data.getAllUsersSpecificObjectsOnACretainAsset : null,
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async createDrawnObject(objectName, objectBody, userId, abbreviation, backtestingId=null) {
        try {
            const response = await apolloClient.mutate({
                mutation: CREATE_DRAWN_OBJECT,
                variables: {objectName, objectBody, userId, abbreviation, backtestingId}
            })
            
            if (response) {
                return response
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteDrawnObject(drawnObjectId) {
        try {
            const response = await apolloClient.mutate({
                mutation: DELETE_DRAWN_OBJECT,
                variables: {drawnObjectId}
            })

            if (response) {
                return response
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateDrawnObject(id, objectName, objectBody, userId, abbreviation, backtestingId=null) {
        try {
            const response = await apolloClient.mutate({
                mutation: UPDATE_DRAWN_OBJECT,
                variables: {id, objectName, objectBody, userId, abbreviation}
            })

            if (response) {
                return response
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new InteractiveIndicatorsService()