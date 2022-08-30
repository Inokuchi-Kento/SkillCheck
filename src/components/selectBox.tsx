import { useEffect, useState ,FC } from 'react';

export const selectBox = ()=> {
    return(
        <select name="column">
            <option value="id">ID</option>
            <option value="name">名前</option>
            <option value="department">役職</option>
            <option value="grade">グレード</option>
        </select>
    )
}