import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Chat } from "~/components/Chat";

export const loader: LoaderFunction = async ({ params }) => {
  return { id: params.id };
};

export default function SharedChat() {
  const { id } = useLoaderData<{ id: string }>();
  return <Chat key={id} />;
}