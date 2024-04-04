import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

async function seed() {
  const db = drizzle(
    postgres({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }),
    {
      schema,
    },
  );

  await db.insert(schema.events).values([
    {
      id: "e467417f-97cf-4124-b633-b0f69596167d",
      name: "Drumsheds SS24",
      description:
        "A unique space for all, Drumsheds has been reimagined from unused warehouses, breaking from the constraints of traditional spaces, where nothing is fixed. This blank canvas design and state-of-the-art infrastructure hosts a variety of festivals, large-scale entertainment, fashion shows and exhibitions: offering something for every community.",
      date: new Date("2024-04-12T23:00:00.000Z"),
    },
    {
      id: "f2d2f4db-84a1-4897-968f-a29dac51de9e",
      name: "Snowbombing Festival",
      description:
        "Welcome to Snowbombing. The ultimate alpine adventure. The luxury ski holiday in the midst of a music festival. A completely unique way to explore the mountains. Voted ‘Best European Festival’ at the UK Festival Awards, Snowbombing is the world’s leading music festival on snow, boasting 25 years of setting the benchmark for quality festival production and unique music and adventure-led holiday experiences in one of Europe’s finest ski resorts - Mayrhofen, Austria.  Days are spent skiing, snowboarding and exploring, enjoying music on mountaintop stages or relaxing at rooftop spas. Evenings deliver cutting edge performances from world class acts in unique venues that have hosted The Prodigy, Fatboy Slim, Liam Gallagher, Bicep, Chase & Status, Peggy Gou, Honey Dijon and Skrillex to name a few. But it’s not solely about our pioneering lineups - it’s the adventurous community, the original experiences and the unforgettable stories that really set Snowbombing apart from the crowd.",
      date: new Date("2024-04-13T23:00:00.000Z"),
    },
    {
      id: "efb10fe0-4565-4eab-b3bb-b44afce56735",
      name: "Terminal V Festival",
      description:
        "TERMINAL V FESTIVAL returns in spring 2024 for the biggest Terminal V Festival to date marking the 10th ever edition of Terminal V in Edinburgh!\nUp to 20,000 techno fans EACH DAY from across the world will descend upon Edinburgh for two days of Techno and so much more.\nAre you ready for a weekend partying in the Scottish capital? SIGN UP now!\nExpect another 2 unforgettable days of incredible global acts and mind blowing stages on the most unique indoor and outdoor festival site at The Royal Highland Centre + Showground in 2024.",
      date: new Date("2024-04-14T23:00:00.000Z"),
    },
  ]);

  await db.insert(schema.tickets).values([
    {
      id: "54a55321-0793-494a-a722-2befef39e34c",
      eventId: "e467417f-97cf-4124-b633-b0f69596167d",
      type: "Child",
      priceCentAmount: 8999,
      bookingFeeCentAmount: 499,
      quantity: 124,
    },
    {
      id: "0abc59ba-d85a-47d6-b86a-7d38a9a3e28e",
      eventId: "e467417f-97cf-4124-b633-b0f69596167d",
      type: "Adult",
      priceCentAmount: 24900,
      bookingFeeCentAmount: 499,
      quantity: 349,
    },
    {
      id: "4af33227-8648-4d4e-b3ed-4a6a01ec4c39",
      eventId: "f2d2f4db-84a1-4897-968f-a29dac51de9e",
      type: "Adult",
      priceCentAmount: 48999,
      bookingFeeCentAmount: 999,
      quantity: 258,
    },
    {
      id: "c435f422-c319-4594-856e-584b52634754",
      eventId: "f2d2f4db-84a1-4897-968f-a29dac51de9e",
      type: "Child",
      priceCentAmount: 23499,
      bookingFeeCentAmount: 499,
      quantity: 196,
    },
    {
      id: "e70f7996-700b-4dd9-833c-a4b38e9c4d60",
      eventId: "f2d2f4db-84a1-4897-968f-a29dac51de9e",
      type: "Family",
      priceCentAmount: 74999,
      bookingFeeCentAmount: 999,
      quantity: 46,
    },
  ]);

  process.exit(0);
}

seed();
