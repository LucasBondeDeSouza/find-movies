import React from "react"
import { useParams } from "react-router-dom"

export default () => {
    const { id, type } = useParams()

    return (
        <div>
            <h1>{id} - {type}</h1>
        </div>
    )
}