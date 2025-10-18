import { supabase } from './supabase';

export const getAllTodos = async () => {
  const todos = await supabase.from('todo').select('*');
  return todos;
};

export const getAllHyakumeizan = async () => {
  const mountains = await supabase.from('hyakumeizan').select('*');
  return mountains;
};

export const getAllGeoparks = async () => {
  const geoparks = await supabase.from('world_geopark').select('*');
  return geoparks;
};
