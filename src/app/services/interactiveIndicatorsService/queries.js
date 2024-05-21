import { gql } from "@apollo/client";

export const GET_ALL_USERS_SPECIFIC_OBJECTS_ON_A_CERTAIN_ASSET = gql`
    query getAllUsersSpecificObjectsOnACretainAsset($objectName: String!, $userId: String!, $abbreviation: String!, $backtestingId: String) {
        getAllUsersSpecificObjectsOnACretainAsset(objectName: $objectName, userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId) {
            id
            objectName
            objectBody
        }
    }
`

export const CREATE_DRAWN_OBJECT = gql`
    mutation createDrawnObject($objectName: String!, $objectBody: String!, $userId: String!, $abbreviation: String!, $backtestingId: String) {
        createDrawnObject(createDrawnObjectData: {objectName: $objectName, objectBody: $objectBody, userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId}) {
            id
            objectName
            objectBody
            userId
            abbreviation
            backtestingId
        }
    }
`

export const DELETE_DRAWN_OBJECT = gql`
    mutation deleteDrawnObject($drawnObjectId: String!) {
        deleteDrawnObject(drawnObjectId: $drawnObjectId) {
            id
            objectName
            objectBody
        }
    }
`

export const UPDATE_DRAWN_OBJECT = gql`
    mutation updateDrawnObject($id: String!, $objectName: String!, $objectBody: String!, $userId: String!, $abbreviation: String!) {
        updateDrawnObject(updateDrawnObjectData: {id: $id, objectName: $objectName, objectBody: $objectBody, userId: $userId, abbreviation: $abbreviation}) {
            id
            objectName
            objectBody
        }
    }
`