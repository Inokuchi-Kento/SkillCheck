import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

async function Delete() {
    const { data, error } = await supabase
    .from('skills')
    .delete()
    .eq('item', 'Python')

    location.reload()
}

export default Delete;

