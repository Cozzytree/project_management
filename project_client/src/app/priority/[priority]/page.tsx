import { Priority } from "@/state/api";
import Index from "../reusablePage";

type props = {
   params: { priority: Priority };
};

export default function PriorityPage({ params }: props) {
   return <Index priority={params.priority} />;
}
