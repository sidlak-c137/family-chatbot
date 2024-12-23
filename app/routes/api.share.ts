import { ActionFunction, json } from "@remix-run/node";
import { supabase } from "~/lib/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "save") {
    const conversationData = formData.get("conversationData");
    if (typeof conversationData !== "string") {
      return json({ error: "Invalid conversation data" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('shared_conversations')
      .insert({ conversation: JSON.parse(conversationData) })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving conversation:', error);
      return new Response(JSON.stringify({ error: "Failed to save conversation" }), {
        status: 500,
      });
    }

    const id = data.id;
    return new Response(JSON.stringify({ id, shareLink: `/share/${id}` }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else if (action === "load") {
    const id = formData.get("id");
    if (typeof id !== "string") {
      return new Response(JSON.stringify({ error: "Invalid conversation ID" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from('shared_conversations')
      .select('conversation')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error loading conversation:', error);
      return new Response(JSON.stringify({ error: "Failed to load conversation" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ conversation: data.conversation }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ error: "Invalid action" }), {
    status: 400,
  });
};
