import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, fetch }) => {
    const data = await request.formData();

    const response = await fetch("/api/ideas", {
      method: "PUT",
      body: data
    })
    const idea = await response.json()
    
		redirect(303, "/idea/" + idea.id)
	},
} satisfies Actions;