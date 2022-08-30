import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
  
async function Insert() {
    const { data, error } = await supabase
    .from('skills')
    .insert([{ item: 'Python'}])

    location.reload()
}

export default Insert;
  