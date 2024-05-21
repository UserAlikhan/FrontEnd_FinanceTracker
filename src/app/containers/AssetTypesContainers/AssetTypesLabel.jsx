import React from 'react'
import { useSelector } from 'react-redux'

function AssetTypesLabel() {
    const assetTypes = useSelector(state => state.assetTypes)

    if (assetTypes.loading) {
        return <p>Loading ...</p>
    }
    if (assetTypes.error) {
        return <p>Something get wrong...</p>
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'start' }}>
                {assetTypes.assetTypes.map((assetType) => {
                    return (
                        <h1 style={{ color: 'red', fontSize: '36px', fontWeight: 'bold' }}>{assetType.name}</h1>
                    )
                })}
            </div>
        </>
    )
}

export default AssetTypesLabel