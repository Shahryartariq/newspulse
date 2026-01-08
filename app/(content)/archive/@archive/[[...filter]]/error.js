"use client";

import React from 'react'

const FilterError = ({error}) => {
  return (
    <div id="error">
        <h2>An Error Occured!</h2>
        <p>{error.message}</p>
    </div>
  )
}

export default FilterError