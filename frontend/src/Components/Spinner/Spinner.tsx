import React from 'react'
import { ClipLoader } from 'react-spinners'
import "./Spinner.css"

type Props = {
    isLoading?: boolean
}

const Spinners = ({ isLoading = true }: Props) => {
    return (
        <>
            <div id='loading-spinner'>
                <ClipLoader size={35} color='#36d7b7' loading={isLoading} aria-label='spinner loading' />
            </div>

        </>
    )
}

export default Spinners