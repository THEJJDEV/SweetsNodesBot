import "./lib/setup";
import { SweetsClient } from "./structures/SweetsClient";

export let client: SweetsClient = new SweetsClient();
client.connect();
