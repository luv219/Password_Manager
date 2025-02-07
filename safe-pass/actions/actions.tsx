"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNo: string;
  expiry: string;
  cvv: number;
}

interface Password {
  website: string;
  username: string;
  password: string;
}

export async function AddCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let cards: Card[] = [];
  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards || [];
    cards.push({ cardNo, expiry, cvv });
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: cards,
      },
    });
  } else {
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: [{ cardNo, expiry, cvv }],
      },
    });
  }
}

export async function AddPasswordServer(
  website: string,
  username: string,
  password: string,
  userId: string
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let passwords: Password[] = [];
  if (Array.isArray(user.privateMetadata.passwords)) {
    passwords = user.privateMetadata.passwords || [];
    passwords.push({ website, username, password });

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: passwords,
      },
    });
  } else {
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: [{ website, username, password }],
      },
    });
  }
}
