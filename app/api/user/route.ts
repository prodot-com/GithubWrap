import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json([]);
    }

    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `
          query SearchUsers($query: String!) {
            search(query: $query, type: USER, first: 1) {
              nodes {
                ... on User {
                  login
                  avatarUrl
                  location
                  name
                  bio
                }
              }
            }
          }
        `,
        variables: {
          query: `${username} in:login`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const users = response.data.data.search.nodes[0];

    return NextResponse.json(users);
  } catch (error) {
    console.error("GitHub GraphQL Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
