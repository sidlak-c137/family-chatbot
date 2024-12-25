import type { MetaFunction } from "@remix-run/node";
import { Chat } from "~/components/Chat";

export const meta: MetaFunction = () => {
  return [
    { title: "Christmas Letter" },
    { name: "description", content: "The Lakshmanan Family Christmas Letter" },
  ];
};

export default function Index() {
  return (
    <Chat />
  );
}